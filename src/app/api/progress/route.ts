import { NextRequest, NextResponse } from 'next/server';
import { getProgress, saveAllProgress, ProgressData } from '@/lib/db';

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

    await saveAllProgress(userId, progress);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to save progress:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to save progress' },
      { status: 500 }
    );
  }
}
