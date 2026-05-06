import { NextRequest, NextResponse } from 'next/server';

import { getProgress } from '@/lib/db';
import { getAllGameMetas, getGameMeta } from '@/lib/totals';

// ============================================================================
// /api/games-summary
//
// Public read-only endpoint that returns every known game with its
// total collectible count, the user's current collected count, and
// the derived percentage. Powers full_tracker's reconciler cron — a
// single round-trip carries everything it needs.
//
// No auth (matches /api/progress). Add an auth header here later if
// the deployment ever turns multi-tenant.
// ============================================================================

export const dynamic = 'force-dynamic';

interface GameSummary {
  gameId: string;
  name: string;
  collected: number;
  total: number;
  percent: number; // 0..100, 1 decimal
  lastUpdated: string | null;
}

export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get('userId') || 'default';
    const progress = await getProgress(userId);

    // Walk the static metadata table so games with no progress yet
    // still appear (collected=0). Anything in progress that's NOT in
    // the metadata table is also surfaced (with total=0) so the
    // reconciler can flag it for the user instead of silently
    // dropping it.
    const summaries: GameSummary[] = [];
    const seen = new Set<string>();

    for (const meta of getAllGameMetas()) {
      const p = progress[meta.id];
      const collected = p?.collected.length ?? 0;
      const percent = meta.total > 0
        ? Math.round((collected / meta.total) * 1000) / 10
        : 0;
      summaries.push({
        gameId: meta.id,
        name: meta.name,
        collected,
        total: meta.total,
        percent,
        lastUpdated: p?.lastUpdated ?? null,
      });
      seen.add(meta.id);
    }

    // Surface any progress entries we don't have static metadata for.
    // total=0 makes percent=0; full_tracker can still log the raw
    // change but won't have a sensible percent until we add the meta.
    for (const [gameId, p] of Object.entries(progress)) {
      if (seen.has(gameId)) continue;
      summaries.push({
        gameId,
        name: gameId,
        collected: p.collected.length,
        total: 0,
        percent: 0,
        lastUpdated: p.lastUpdated,
      });
    }

    return NextResponse.json({ success: true, summaries });
  } catch (error) {
    console.error('games-summary failed:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to compute summary' },
      { status: 500 },
    );
  }
}

// Single-game variant for receiver-side enrichment. Pass ?gameId=…
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const gameId = String(body?.gameId ?? '');
    const userId = String(body?.userId ?? 'default');
    if (!gameId) {
      return NextResponse.json({ success: false, error: 'gameId required' }, { status: 400 });
    }

    const meta = getGameMeta(gameId);
    const progress = await getProgress(userId);
    const p = progress[gameId];
    const collected = p?.collected.length ?? 0;
    const total = meta?.total ?? 0;
    const percent = total > 0 ? Math.round((collected / total) * 1000) / 10 : 0;

    const summary: GameSummary = {
      gameId,
      name: meta?.name ?? gameId,
      collected,
      total,
      percent,
      lastUpdated: p?.lastUpdated ?? null,
    };
    return NextResponse.json({ success: true, summary });
  } catch (error) {
    console.error('games-summary single failed:', error);
    return NextResponse.json(
      { success: false, error: 'Failed' },
      { status: 500 },
    );
  }
}
