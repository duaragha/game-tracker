'use client';

import { useGameStore } from '@/store/game-store';
import { getMarioKartGame } from '@/data';
import { MarioKartGame, createCupCompletionId, EngineClass } from '@/types/mario-kart';
import { Trophy, Timer, Crown, Target } from 'lucide-react';

interface MarioKartStatsProps {
  gameId: string;
}

export function MarioKartStats({ gameId }: MarioKartStatsProps) {
  const game = getMarioKartGame(gameId);
  const progress = useGameStore((s) => s.progress[gameId]);

  if (!game) return null;

  const collected = progress?.collected ?? new Set<string>();

  // Calculate Grand Prix stats
  const gpTotalCompletions = game.cups.length * game.engineClasses.length;
  const gpCompleted = game.cups.reduce((sum, cup) => {
    return sum + game.engineClasses.filter((ec) => collected.has(createCupCompletionId(cup.id, ec))).length;
  }, 0);
  const gpPercentage = gpTotalCompletions > 0 ? Math.round((gpCompleted / gpTotalCompletions) * 100) : 0;

  // Calculate Knockout stats (if applicable)
  let koTotalCompletions = 0;
  let koCompleted = 0;
  let koPercentage = 0;
  if (game.knockoutRallies && game.knockoutEngineClasses) {
    koTotalCompletions = game.knockoutRallies.length * game.knockoutEngineClasses.length;
    koCompleted = game.knockoutRallies.reduce((sum, rally) => {
      return sum + game.knockoutEngineClasses!.filter((ec) => collected.has(createCupCompletionId(rally.id, ec))).length;
    }, 0);
    koPercentage = koTotalCompletions > 0 ? Math.round((koCompleted / koTotalCompletions) * 100) : 0;
  }

  // Calculate Time Trials stats (150cc for each track)
  const TIME_TRIAL_CLASSES = ['150cc'] as const;
  const allTracks = game.cups.flatMap((c) => c.tracks);
  const ttTotal = allTracks.length * TIME_TRIAL_CLASSES.length;
  const ttCompleted = allTracks.reduce((sum, t) => {
    return sum + TIME_TRIAL_CLASSES.filter((ec) => collected.has(`tt-${t.id}-${ec}`)).length;
  }, 0);
  const ttPercentage = ttTotal > 0 ? Math.round((ttCompleted / ttTotal) * 100) : 0;

  // Overall percentage
  const totalItems = gpTotalCompletions + koTotalCompletions + ttTotal;
  const totalCompleted = gpCompleted + koCompleted + ttCompleted;
  const overallPercentage = totalItems > 0 ? Math.round((totalCompleted / totalItems) * 100) : 0;

  return (
    <div className="bg-zinc-900 border-b border-zinc-800 px-4 py-3">
      <div className="flex flex-wrap items-center gap-4">
        {/* Overall Progress */}
        <div className="flex items-center gap-3 pr-4 border-r border-zinc-700">
          <Target className="w-5 h-5 text-yellow-500" />
          <div>
            <div className="text-xs text-zinc-500">Overall</div>
            <div className="font-bold text-yellow-400">{overallPercentage}%</div>
          </div>
        </div>

        {/* Grand Prix */}
        <div className="flex items-center gap-2">
          <Trophy className="w-4 h-4 text-yellow-500" />
          <div className="flex items-center gap-2">
            <span className="text-sm text-zinc-400">GP:</span>
            <span className="font-medium">{gpCompleted}/{gpTotalCompletions}</span>
            <span className="text-xs text-zinc-500">({gpPercentage}%)</span>
          </div>
        </div>

        {/* Knockout Tour (if applicable) */}
        {koTotalCompletions > 0 && (
          <div className="flex items-center gap-2">
            <Crown className="w-4 h-4 text-purple-400" />
            <div className="flex items-center gap-2">
              <span className="text-sm text-zinc-400">KO:</span>
              <span className="font-medium">{koCompleted}/{koTotalCompletions}</span>
              <span className="text-xs text-zinc-500">({koPercentage}%)</span>
            </div>
          </div>
        )}

        {/* Time Trials */}
        <div className="flex items-center gap-2">
          <Timer className="w-4 h-4 text-blue-400" />
          <div className="flex items-center gap-2">
            <span className="text-sm text-zinc-400">TT:</span>
            <span className="font-medium">{ttCompleted}/{ttTotal}</span>
            <span className="text-xs text-zinc-500">({ttPercentage}%)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
