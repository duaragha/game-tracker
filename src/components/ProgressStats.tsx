'use client';

import { useMemo, useState } from 'react';
import { useCurrentGame, useProgress, useGameStore, calculateCollectedValue, calculateTotalValue } from '@/store/game-store';
import { getGame, getGameStats } from '@/data';
import { Moon, Coins, Camera, Shirt, Trophy, Target, Flag, Image, Gift, Sticker, Music, ChevronDown, ChevronRight } from 'lucide-react';

export function ProgressStats() {
  const currentGame = useCurrentGame();
  const progress = useProgress(currentGame || '');
  const game = currentGame ? getGame(currentGame) : null;
  const stats = currentGame ? getGameStats(currentGame) : null;
  // Force re-render when collected size changes
  const collectedSize = useGameStore((s) => s.progress[currentGame || '']?.collected?.size ?? 0);

  const detailedStats = useMemo(() => {
    if (!game || !stats) return null;

    // Calculate moon value (Multi Moons count as 3)
    const moonCollectibles = game.collectibles.filter((c) => c.type === 'moon');
    const moonsCollected = calculateCollectedValue(progress.collected, moonCollectibles);
    const totalMoonValue = calculateTotalValue(moonCollectibles);

    const coinsCollected = game.collectibles.filter(
      (c) => c.type === 'purple_coin' && progress.collected.has(c.id)
    ).length;

    const capturesCollected = game.collectibles.filter(
      (c) => c.type === 'capture' && progress.collected.has(c.id)
    ).length;

    const outfitsCollected = game.collectibles.filter(
      (c) => c.type === 'outfit' && progress.collected.has(c.id)
    ).length;

    const checkpointsCollected = game.collectibles.filter(
      (c) => c.type === 'checkpoint' && progress.collected.has(c.id)
    ).length;

    const paintingsCollected = game.collectibles.filter(
      (c) => c.type === 'painting' && progress.collected.has(c.id)
    ).length;

    const souvenirsCollected = game.collectibles.filter(
      (c) => c.type === 'souvenir' && progress.collected.has(c.id)
    ).length;

    const stickersCollected = game.collectibles.filter(
      (c) => c.type === 'sticker' && progress.collected.has(c.id)
    ).length;

    const musicCollected = game.collectibles.filter(
      (c) => c.type === 'music' && progress.collected.has(c.id)
    ).length;

    // Calculate overall value-based totals (Multi Moons count as 3, everything else as 1)
    const totalCollectedValue = moonsCollected + coinsCollected + capturesCollected + outfitsCollected + checkpointsCollected + paintingsCollected + souvenirsCollected + stickersCollected + musicCollected;
    const totalPossibleValue = totalMoonValue + stats.totalPurpleCoins + stats.totalCaptures + stats.totalOutfits + stats.totalCheckpoints + stats.totalPaintings + stats.totalSouvenirs + stats.totalStickers + stats.totalMusic;

    return {
      moons: { collected: moonsCollected, total: totalMoonValue },
      coins: { collected: coinsCollected, total: stats.totalPurpleCoins },
      captures: { collected: capturesCollected, total: stats.totalCaptures },
      outfits: { collected: outfitsCollected, total: stats.totalOutfits },
      checkpoints: { collected: checkpointsCollected, total: stats.totalCheckpoints },
      paintings: { collected: paintingsCollected, total: stats.totalPaintings },
      souvenirs: { collected: souvenirsCollected, total: stats.totalSouvenirs },
      stickers: { collected: stickersCollected, total: stats.totalStickers },
      music: { collected: musicCollected, total: stats.totalMusic },
      overall: { collected: totalCollectedValue, total: totalPossibleValue },
    };
  }, [game, stats, collectedSize]);

  const [isExpanded, setIsExpanded] = useState(false);

  if (!game || !stats || !detailedStats) {
    return null;
  }

  const overallProgress = detailedStats.overall.total > 0
    ? (detailedStats.overall.collected / detailedStats.overall.total) * 100
    : 0;

  const statItems = [
    {
      label: 'Power Moons',
      icon: <Moon className="w-5 h-5" />,
      ...detailedStats.moons,
      color: 'yellow',
    },
    {
      label: 'Purple Coins',
      icon: <Coins className="w-5 h-5" />,
      ...detailedStats.coins,
      color: 'purple',
    },
    {
      label: 'Captures',
      icon: <Camera className="w-5 h-5" />,
      ...detailedStats.captures,
      color: 'blue',
    },
    {
      label: 'Outfits',
      icon: <Shirt className="w-5 h-5" />,
      ...detailedStats.outfits,
      color: 'pink',
    },
    {
      label: 'Checkpoints',
      icon: <Flag className="w-5 h-5" />,
      ...detailedStats.checkpoints,
      color: 'cyan',
    },
    {
      label: 'Paintings',
      icon: <Image className="w-5 h-5" />,
      ...detailedStats.paintings,
      color: 'indigo',
    },
    {
      label: 'Souvenirs',
      icon: <Gift className="w-5 h-5" />,
      ...detailedStats.souvenirs,
      color: 'orange',
    },
    {
      label: 'Stickers',
      icon: <Sticker className="w-5 h-5" />,
      ...detailedStats.stickers,
      color: 'lime',
    },
    {
      label: 'Music',
      icon: <Music className="w-5 h-5" />,
      ...detailedStats.music,
      color: 'rose',
    },
  ];

  const colorClasses: Record<string, { bg: string; text: string; bar: string }> = {
    yellow: { bg: 'bg-yellow-500/10', text: 'text-yellow-400', bar: 'bg-yellow-500' },
    purple: { bg: 'bg-purple-500/10', text: 'text-purple-400', bar: 'bg-purple-500' },
    blue: { bg: 'bg-blue-500/10', text: 'text-blue-400', bar: 'bg-blue-500' },
    pink: { bg: 'bg-pink-500/10', text: 'text-pink-400', bar: 'bg-pink-500' },
    cyan: { bg: 'bg-cyan-500/10', text: 'text-cyan-400', bar: 'bg-cyan-500' },
    indigo: { bg: 'bg-indigo-500/10', text: 'text-indigo-400', bar: 'bg-indigo-500' },
    orange: { bg: 'bg-orange-500/10', text: 'text-orange-400', bar: 'bg-orange-500' },
    lime: { bg: 'bg-lime-500/10', text: 'text-lime-400', bar: 'bg-lime-500' },
    rose: { bg: 'bg-rose-500/10', text: 'text-rose-400', bar: 'bg-rose-500' },
  };

  return (
    <div className="bg-zinc-900 border-b border-zinc-800">
      {/* Compact Header - Always Visible */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-2 flex items-center justify-between hover:bg-zinc-800/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
            <Trophy className="w-4 h-4 text-white" />
          </div>
          <div className="text-left">
            <span className="font-semibold text-sm">Progress: </span>
            <span className="text-sm text-zinc-400">
              {detailedStats.overall.collected} / {detailedStats.overall.total}
            </span>
          </div>
          {/* Mini Progress Bar */}
          <div className="w-32 bg-zinc-800 rounded-full h-2 hidden sm:block">
            <div
              className="bg-gradient-to-r from-yellow-500 to-green-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-lg font-bold text-yellow-400">{overallProgress.toFixed(1)}%</span>
          {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </div>
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="px-4 pb-3">
          {/* Progress Bar (Full Width) */}
          <div className="w-full bg-zinc-800 rounded-full h-2 mb-3">
            <div
              className="bg-gradient-to-r from-yellow-500 via-green-500 to-emerald-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${overallProgress}%` }}
            />
          </div>

          {/* Detailed Stats Grid - Compact */}
          <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-2">
            {statItems.map((item) => {
              const colors = colorClasses[item.color];
              const pct = item.total > 0 ? (item.collected / item.total) * 100 : 0;

              return (
                <div key={item.label} className={`${colors.bg} rounded-lg p-2`}>
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className={`${colors.text} [&>svg]:w-3.5 [&>svg]:h-3.5`}>{item.icon}</span>
                    <span className="text-xs font-medium truncate">{item.label}</span>
                  </div>
                  <div className="flex items-end justify-between">
                    <span className={`text-sm font-bold ${colors.text}`}>
                      {item.collected}
                      <span className="text-zinc-500 text-xs">/{item.total}</span>
                    </span>
                    <span className="text-[10px] text-zinc-400">{pct.toFixed(0)}%</span>
                  </div>
                  <div className="w-full bg-zinc-800 rounded-full h-1 mt-1">
                    <div
                      className={`${colors.bar} h-1 rounded-full transition-all duration-300`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Milestones - Compact */}
          <div className="mt-3 pt-2 border-t border-zinc-800">
            <div className="flex items-center gap-2 text-xs text-zinc-400 mb-1.5">
              <Target className="w-3 h-3" />
              <span>Milestones</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {[
                { moons: 124, label: 'Story' },
                { moons: 250, label: 'Dark Side' },
                { moons: 500, label: 'Darker Side' },
                { moons: 880, label: 'All Unique' },
                { moons: 999, label: '100%' },
              ].map((milestone) => {
                const isReached = detailedStats.moons.collected >= milestone.moons;
                return (
                  <div
                    key={milestone.moons}
                    className={`px-2 py-0.5 rounded-full text-[10px] ${
                      isReached
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-zinc-800 text-zinc-500'
                    }`}
                  >
                    {milestone.moons} - {milestone.label}
                    {isReached && ' ✓'}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
