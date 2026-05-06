import { createHmac, timingSafeEqual } from 'crypto';

import pool, { initDb } from './db';

// ============================================================================
// WEBHOOK OUTBOX DRAINER
//
// Reads pending rows from `webhook_outbox`, signs each payload with
// HMAC-SHA256 using WEBHOOK_SECRET, POSTs to WEBHOOK_TARGET_URL.
//
// On success: status → 'delivered', delivered_at = NOW().
// On failure: attempts += 1, next_attempt_at = NOW() + backoff(attempts),
//             last_error = err.message. After MAX_ATTEMPTS the row is
//             marked 'failed' so it stops being retried; the
//             reconciler cron in full_tracker handles backstop sync.
//
// Idempotency: the receiver uses idempotency_key to dedupe, so retrying
// a successful-but-acked-late delivery is harmless.
// ============================================================================

const MAX_ATTEMPTS = 6;
const BATCH_SIZE = 25;

interface OutboxRow {
  id: number;
  event_type: string;
  idempotency_key: string;
  payload: Record<string, unknown>;
  attempts: number;
}

export interface DrainResult {
  picked: number;
  delivered: number;
  failed: number;
  retryable: number;
}

/** Exponential backoff in seconds: 30, 90, 300, 900, 1800, 3600. */
function backoffSeconds(attempt: number): number {
  const ladder = [30, 90, 300, 900, 1800, 3600];
  return ladder[Math.min(attempt, ladder.length - 1)];
}

/** Constant-time HMAC compare wrapper (sender side only signs, but the
 *  helper is shared if we ever verify ack signatures). */
export function signPayload(rawBody: string, secret: string): string {
  return createHmac('sha256', secret).update(rawBody).digest('hex');
}

/** Pulled out so unit tests can call it without the full drain loop. */
export function verifySignature(rawBody: string, secret: string, signature: string): boolean {
  const expected = signPayload(rawBody, secret);
  const a = Buffer.from(expected, 'utf8');
  const b = Buffer.from(signature, 'utf8');
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

/**
 * Drain up to BATCH_SIZE pending rows whose next_attempt_at is due.
 * Safe to call concurrently — uses SELECT … FOR UPDATE SKIP LOCKED so
 * two workers won't fight over the same row.
 */
export async function drainOutbox(): Promise<DrainResult> {
  const targetUrl = process.env.WEBHOOK_TARGET_URL;
  const secret = process.env.WEBHOOK_SECRET;

  if (!targetUrl || !secret) {
    // Not configured = silent no-op. The outbox keeps queuing rows;
    // the moment env vars are set, the next drain catches up.
    return { picked: 0, delivered: 0, failed: 0, retryable: 0 };
  }

  await initDb();
  const client = await pool.connect();
  let picked: OutboxRow[] = [];

  try {
    await client.query('BEGIN');
    const res = await client.query<OutboxRow>(
      `SELECT id, event_type, idempotency_key, payload, attempts
       FROM webhook_outbox
       WHERE status = 'pending' AND next_attempt_at <= NOW()
       ORDER BY id ASC
       LIMIT $1
       FOR UPDATE SKIP LOCKED`,
      [BATCH_SIZE],
    );
    picked = res.rows;
    // Lock held until COMMIT; rows are now ours.
    await client.query('COMMIT');
  } catch (err) {
    await client.query('ROLLBACK');
    client.release();
    throw err;
  }
  client.release();

  if (picked.length === 0) {
    return { picked: 0, delivered: 0, failed: 0, retryable: 0 };
  }

  let delivered = 0;
  let failed = 0;
  let retryable = 0;

  await Promise.all(
    picked.map(async (row) => {
      const body = JSON.stringify({
        eventType: row.event_type,
        idempotencyKey: row.idempotency_key,
        payload: row.payload,
      });
      const signature = signPayload(body, secret);

      try {
        const response = await fetch(targetUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Signature': `sha256=${signature}`,
            'X-Idempotency-Key': row.idempotency_key,
            'X-Event-Type': row.event_type,
          },
          body,
          // Hard cap so a hung receiver can't park the worker forever.
          signal: AbortSignal.timeout(15_000),
        });

        if (response.ok) {
          await pool.query(
            `UPDATE webhook_outbox
             SET status = 'delivered',
                 delivered_at = NOW(),
                 last_error = NULL
             WHERE id = $1`,
            [row.id],
          );
          delivered += 1;
          return;
        }

        // 4xx (other than 429) = permanent fail; receiver rejected
        // the payload. No point retrying with the same body.
        if (response.status >= 400 && response.status < 500 && response.status !== 429) {
          await pool.query(
            `UPDATE webhook_outbox
             SET status = 'failed',
                 attempts = attempts + 1,
                 last_error = $2
             WHERE id = $1`,
            [row.id, `HTTP ${response.status}: ${(await safeText(response)).slice(0, 500)}`],
          );
          failed += 1;
          return;
        }

        throw new Error(`HTTP ${response.status}: ${(await safeText(response)).slice(0, 500)}`);
      } catch (err) {
        const nextAttempt = row.attempts + 1;
        const isTerminal = nextAttempt >= MAX_ATTEMPTS;
        const errorText = err instanceof Error ? err.message : String(err);

        await pool.query(
          `UPDATE webhook_outbox
           SET status = $2,
               attempts = $3,
               next_attempt_at = NOW() + ($4 || ' seconds')::interval,
               last_error = $5
           WHERE id = $1`,
          [
            row.id,
            isTerminal ? 'failed' : 'pending',
            nextAttempt,
            String(backoffSeconds(nextAttempt)),
            errorText.slice(0, 500),
          ],
        );

        if (isTerminal) failed += 1;
        else retryable += 1;
      }
    }),
  );

  return { picked: picked.length, delivered, failed, retryable };
}

async function safeText(response: Response): Promise<string> {
  try {
    return await response.text();
  } catch {
    return '';
  }
}

/** Fire-and-forget eager drain — call right after a save so changes
 *  flow downstream within ~1 second under normal conditions. Errors
 *  swallowed; the cron-driven drain plus full_tracker's reconciler
 *  cover any gaps. */
export function triggerDrain(): void {
  drainOutbox().catch((err) => {
    console.error('[outbox] eager drain failed:', err);
  });
}
