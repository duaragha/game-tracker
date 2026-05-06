import { Pool } from 'pg';

// Railway connections (internal or proxy) don't use SSL
const isRailway = process.env.DATABASE_URL?.includes('.railway.internal') ||
                  process.env.DATABASE_URL?.includes('.rlwy.net');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: isRailway ? false : (process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false),
  max: 5,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// One-time bootstrap. Idempotent — safe to call on every request.
let bootstrapped = false;
export async function initDb() {
  if (bootstrapped) return;
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS user_progress (
        id SERIAL PRIMARY KEY,
        user_id TEXT NOT NULL DEFAULT 'default',
        game_id TEXT NOT NULL,
        collected TEXT[] DEFAULT '{}',
        notes JSONB DEFAULT '{}',
        last_updated TIMESTAMP DEFAULT NOW(),
        UNIQUE(user_id, game_id)
      )
    `);

    // Transactional outbox for webhook delivery to downstream
    // services (e.g. full_tracker). Rows are written inside the same
    // transaction as the user_progress mutation, then drained by
    // `drainOutbox()` either eagerly (post-save) or via a cron-style
    // hit on /api/internal/drain-outbox.
    await client.query(`
      CREATE TABLE IF NOT EXISTS webhook_outbox (
        id              SERIAL PRIMARY KEY,
        event_type      TEXT NOT NULL,
        idempotency_key UUID NOT NULL UNIQUE,
        payload         JSONB NOT NULL,
        status          TEXT NOT NULL DEFAULT 'pending'
                        CHECK (status IN ('pending','delivered','failed')),
        attempts        INTEGER NOT NULL DEFAULT 0,
        last_error      TEXT,
        created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        next_attempt_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        delivered_at    TIMESTAMPTZ
      )
    `);
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_webhook_outbox_pending
      ON webhook_outbox (next_attempt_at)
      WHERE status = 'pending'
    `);

    bootstrapped = true;
  } finally {
    client.release();
  }
}

export interface ProgressData {
  gameId: string;
  collected: string[];
  notes: Record<string, string>;
  lastUpdated: string;
}

export async function getProgress(userId: string = 'default'): Promise<Record<string, ProgressData>> {
  const client = await pool.connect();
  try {
    await initDb();
    const result = await client.query(
      'SELECT game_id, collected, notes, last_updated FROM user_progress WHERE user_id = $1',
      [userId]
    );

    const progress: Record<string, ProgressData> = {};
    for (const row of result.rows) {
      progress[row.game_id] = {
        gameId: row.game_id,
        collected: row.collected || [],
        notes: row.notes || {},
        lastUpdated: row.last_updated?.toISOString() || new Date().toISOString(),
      };
    }
    return progress;
  } finally {
    client.release();
  }
}

/**
 * Save progress for one or more games. Each (userId, gameId) tuple is
 * upserted, and an outbox row is enqueued in the same transaction so
 * the webhook delivery can never get out of sync with the data
 * itself.
 *
 * Returns the list of newly-enqueued outbox row IDs so the caller can
 * trigger an eager drain after the transaction commits.
 */
export async function saveAllProgress(
  userId: string = 'default',
  progress: Record<string, ProgressData>
): Promise<{ outboxIds: number[] }> {
  const client = await pool.connect();
  const outboxIds: number[] = [];
  try {
    await initDb();
    await client.query('BEGIN');

    for (const [gameId, data] of Object.entries(progress)) {
      // Read prior state so we can diff and skip the outbox write
      // when nothing actually changed (avoids spamming the receiver
      // on save-with-no-mutation).
      const prior = await client.query<{ collected: string[] | null }>(
        `SELECT collected FROM user_progress
         WHERE user_id = $1 AND game_id = $2`,
        [userId, gameId]
      );
      const priorCount = prior.rows[0]?.collected?.length ?? 0;
      const nextCount = data.collected.length;

      await client.query(
        `INSERT INTO user_progress (user_id, game_id, collected, notes, last_updated)
         VALUES ($1, $2, $3, $4, NOW())
         ON CONFLICT (user_id, game_id)
         DO UPDATE SET collected = $3, notes = $4, last_updated = NOW()`,
        [userId, gameId, data.collected, JSON.stringify(data.notes)]
      );

      // Skip outbox if collected count is unchanged. Notes-only
      // edits don't need to flow downstream.
      if (priorCount === nextCount) continue;

      const outboxResult = await client.query<{ id: number }>(
        `INSERT INTO webhook_outbox (event_type, idempotency_key, payload)
         VALUES ($1, gen_random_uuid(), $2::jsonb)
         RETURNING id`,
        [
          'game_progress.changed',
          JSON.stringify({
            userId,
            gameId,
            collectedCount: nextCount,
            priorCollectedCount: priorCount,
            ts: new Date().toISOString(),
          }),
        ]
      );
      outboxIds.push(outboxResult.rows[0].id);
    }

    await client.query('COMMIT');
    return { outboxIds };
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

export default pool;
