import { NextRequest, NextResponse } from 'next/server';

import { drainOutbox } from '@/lib/outbox';

// ============================================================================
// Drain endpoint — call from a Railway cron service every minute or two
// to clear any backlog the eager drain missed (process restarts, network
// hiccups, receiver downtime).
//
// Auth: shared `INTERNAL_CRON_SECRET` env var, sent as a header.
// ============================================================================

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const expected = process.env.INTERNAL_CRON_SECRET;
  if (!expected) {
    return NextResponse.json(
      { success: false, error: 'INTERNAL_CRON_SECRET not configured' },
      { status: 503 },
    );
  }

  const provided = request.headers.get('x-cron-secret');
  if (!provided || provided !== expected) {
    return NextResponse.json({ success: false, error: 'unauthorized' }, { status: 401 });
  }

  try {
    const result = await drainOutbox();
    return NextResponse.json({ success: true, ...result });
  } catch (err) {
    console.error('drain-outbox failed:', err);
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : 'unknown' },
      { status: 500 },
    );
  }
}

// Also allow GET for easy curl-from-cron testing. Same auth.
export async function GET(request: NextRequest) {
  return POST(request);
}
