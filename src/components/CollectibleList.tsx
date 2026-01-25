'use client';

import { useMemo, useState } from 'react';
import { useGameStore, useCurrentGame, useCurrentKingdom, useFilters, useProgress, calculateCollectedValue, calculateTotalValue } from '@/store/game-store';
import { getGame, getCollectiblesForKingdom, getKingdom } from '@/data';
import { Collectible } from '@/types';
import { CollectibleItem } from './CollectibleItem';
import { Check, Circle, Moon, Coins, Shirt, Camera, ChevronDown, ChevronRight, Flag, Image, Gift, Sticker, Music } from 'lucide-react';

export function CollectibleList() {
  const currentGame = useCurrentGame();
  const currentKingdom = useCurrentKingdom();
  const filters = useFilters();
  const progress = useProgress(currentGame || '');
  // Force re-render when collected size changes
  const collectedSize = useGameStore((s) => s.progress[currentGame || '']?.collected?.size ?? 0);

  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});

  const game = currentGame ? getGame(currentGame) : null;
  const kingdom = currentGame && currentKingdom ? getKingdom(currentGame, currentKingdom) : null;

  const filteredCollectibles = useMemo(() => {
    if (!game) return [];

    let collectibles = currentKingdom
      ? getCollectiblesForKingdom(currentGame!, currentKingdom)
      : game.collectibles;

    // Apply filters
    collectibles = collectibles.filter((c) => {
      // Type filter
      if (!filters.types.includes(c.type)) return false;

      // Category filter
      if (c.category && !filters.categories.includes(c.category)) return false;

      // Collected/uncollected filter
      const isCollected = progress.collected.has(c.id);
      if (isCollected && !filters.showCollected) return false;
      if (!isCollected && !filters.showUncollected) return false;

      // Search filter
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        if (
          !c.name.toLowerCase().includes(query) &&
          !c.description?.toLowerCase().includes(query) &&
          !c.hint?.toLowerCase().includes(query)
        ) {
          return false;
        }
      }

      return true;
    });

    return collectibles;
  }, [game, currentGame, currentKingdom, filters, collectedSize]);

  // Group by type
  const groupedCollectibles = useMemo(() => {
    const groups: Record<string, Collectible[]> = {
      moon: [],
      purple_coin: [],
      capture: [],
      outfit: [],
      checkpoint: [],
      painting: [],
      souvenir: [],
      sticker: [],
      music: [],
    };

    filteredCollectibles.forEach((c) => {
      if (groups[c.type]) {
        groups[c.type].push(c);
      }
    });

    // Sort moons and coins by order
    groups.moon.sort((a, b) => (a.order || 0) - (b.order || 0));
    groups.purple_coin.sort((a, b) => (a.order || 0) - (b.order || 0));

    return groups;
  }, [filteredCollectibles]);

  const toggleSection = (section: string, currentlyCollapsed: boolean) => {
    setCollapsedSections((prev) => ({ ...prev, [section]: !currentlyCollapsed }));
  };

  const typeConfig: Record<string, { label: string; icon: React.ReactNode; color: string }> = {
    moon: { label: 'Power Moons', icon: <Moon className="w-5 h-5" />, color: 'text-yellow-400' },
    purple_coin: { label: 'Purple Coins', icon: <Coins className="w-5 h-5" />, color: 'text-purple-400' },
    capture: { label: 'Captures', icon: <Camera className="w-5 h-5" />, color: 'text-blue-400' },
    outfit: { label: 'Outfits', icon: <Shirt className="w-5 h-5" />, color: 'text-pink-400' },
    checkpoint: { label: 'Checkpoints', icon: <Flag className="w-5 h-5" />, color: 'text-cyan-400' },
    painting: { label: 'Paintings', icon: <Image className="w-5 h-5" />, color: 'text-indigo-400' },
    souvenir: { label: 'Souvenirs', icon: <Gift className="w-5 h-5" />, color: 'text-orange-400' },
    sticker: { label: 'Stickers', icon: <Sticker className="w-5 h-5" />, color: 'text-lime-400' },
    music: { label: 'Music', icon: <Music className="w-5 h-5" />, color: 'text-rose-400' },
  };

  if (!game) {
    return (
      <div className="flex-1 flex items-center justify-center text-zinc-500">
        Select a game to get started
      </div>
    );
  }

  const totalFiltered = filteredCollectibles.length;
  const collectedFiltered = filteredCollectibles.filter((c) => progress.collected.has(c.id)).length;

  return (
    <div className="flex-1 overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 bg-zinc-900/95 backdrop-blur-sm border-b border-zinc-800 px-4 py-2 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-base font-bold">
              {kingdom ? kingdom.name : 'All Collectibles'}
            </h2>
            <span className="text-xs text-zinc-400">
              {collectedFiltered}/{totalFiltered}
              {filters.searchQuery && ` (filtered)`}
            </span>
          </div>
          <div className="flex items-center gap-3">
            {/* Quick stats */}
            <div className="flex items-center gap-2 text-xs">
              <span className="flex items-center gap-1 text-green-400">
                <Check className="w-3.5 h-3.5" />
                {collectedFiltered}
              </span>
              <span className="flex items-center gap-1 text-zinc-400">
                <Circle className="w-3.5 h-3.5" />
                {totalFiltered - collectedFiltered}
              </span>
            </div>
            {/* Progress bar */}
            <div className="w-24 bg-zinc-800 rounded-full h-1.5">
              <div
                className="bg-gradient-to-r from-yellow-500 to-green-500 h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${totalFiltered > 0 ? (collectedFiltered / totalFiltered) * 100 : 0}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Collectibles by Type */}
      <div className="p-3 space-y-3">
        {Object.entries(groupedCollectibles).map(([type, items]) => {
          if (items.length === 0) return null;

          const config = typeConfig[type] || { label: type, icon: null, color: 'text-zinc-400' };
          const typeCollected = items.filter((c) => progress.collected.has(c.id)).length;
          const isComplete = type === 'moon'
            ? calculateCollectedValue(progress.collected, items) === calculateTotalValue(items)
            : typeCollected === items.length;

          // Default to collapsed if complete, unless user has explicitly toggled
          const hasExplicitState = type in collapsedSections;
          const isCollapsed = hasExplicitState ? collapsedSections[type] : isComplete;

          return (
            <div key={type} className="bg-zinc-800/50 rounded-lg overflow-hidden">
              {/* Section Header */}
              <button
                onClick={() => toggleSection(type, isCollapsed)}
                className="w-full px-3 py-2 flex items-center justify-between hover:bg-zinc-800 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className={`${config.color} [&>svg]:w-4 [&>svg]:h-4`}>{config.icon}</span>
                  <span className="font-medium text-sm">{config.label}</span>
                  <span className="text-xs text-zinc-400">
                    {type === 'moon'
                      ? `${calculateCollectedValue(progress.collected, items)}/${calculateTotalValue(items)}`
                      : `${typeCollected}/${items.length}`
                    }
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {isComplete && (
                    <span className="text-[10px] bg-green-500/20 text-green-400 px-1.5 py-0.5 rounded">
                      Done
                    </span>
                  )}
                  {isCollapsed ? (
                    <ChevronRight className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </div>
              </button>

              {/* Items */}
              {!isCollapsed && (
                <div className="px-3 pb-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1.5">
                    {items.map((collectible) => (
                      <CollectibleItem
                        key={collectible.id}
                        collectible={collectible}
                        isCollected={progress.collected.has(collectible.id)}
                        note={progress.notes[collectible.id]}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {filteredCollectibles.length === 0 && (
          <div className="text-center py-12 text-zinc-500">
            <p>No collectibles match your filters</p>
            <p className="text-sm mt-2">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
