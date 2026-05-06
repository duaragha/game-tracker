import { NextRequest, NextResponse } from 'next/server';
import { getProgress, saveAllProgress, ProgressData } from '@/lib/db';
import { triggerDrain } from '@/lib/outbox';

export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get('userId') || 'default';
    const progress = await getProgress(userId);
    return NextResponse.json({ success: true, progress });
  } catch (error) {
    console.error('Failed to get progress:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to load progress' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId = 'default', progress } = body as {
      userId?: string;
      progress: Record<string, ProgressData>;
    };

    if (!progress || typeof progress !== 'object') {
      return NextResponse.json(
        { success: false, error: 'Invalid progress data' },
        { status: 400 }
      );
    }

    const { outboxIds } = await saveAllProgress(userId, progress);
    // Eager-drain any newly enqueued webhook deliveries so changes
    // reach downstream within ~1s on the happy path. The drain is
    // also called by /api/internal/drain-outbox on a cron, which
    // covers the unhappy paths (process restart between save and
    // drain, network hiccup, receiver down).
    if (outboxIds.length > 0) triggerDrain();
    return NextResponse.json({ success: true, enqueued: outboxIds.length });
  } catch (error) {
    console.error('Failed to save progress:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to save progress' },
      { status: 500 }
    );
  }
}
