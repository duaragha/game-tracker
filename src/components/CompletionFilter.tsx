'use client';

import { useGameStore, useFilters } from '@/store/game-store';
import { Eye, EyeOff } from 'lucide-react';

/**
 * Reusable completion filter buttons component
 * Shows Collected/Uncollected toggle buttons that work with the global filter state
 * Used by SMO, Pokemon, MarioKart, and other game trackers
 */
export function CompletionFilter() {
  const filters = useFilters();
  const setFilters = useGameStore((s) => s.setFilters);

  return (
    <div className="flex items-center gap-1.5">
      <button
        onClick={() => setFilters({ showCollected: !filters.showCollected })}
        className={`flex items-center gap-1 px-2 py-1 rounded-md border transition-colors text-xs ${
          filters.showCollected
            ? 'bg-green-500/20 text-green-400 border-green-500/50'
            : 'bg-zinc-800 text-zinc-400 border-zinc-700'
        }`}
      >
        {filters.showCollected ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
        <span>Collected</span>
      </button>

      <button
        onClick={() => setFilters({ showUncollected: !filters.showUncollected })}
        className={`flex items-center gap-1 px-2 py-1 rounded-md border transition-colors text-xs ${
          filters.showUncollected
            ? 'bg-red-500/20 text-red-400 border-red-500/50'
            : 'bg-zinc-800 text-zinc-400 border-zinc-700'
        }`}
      >
        {filters.showUncollected ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
        <span>Uncollected</span>
      </button>
    </div>
  );
}

/**
 * Hook to get filter functions for completion status
 * Returns functions to check if an item should be shown based on filter state
 */
export function useCompletionFilter() {
  const filters = useFilters();

  /**
   * Check if an item should be shown based on its completion status
   * @param isCompleted - Whether the item is completed/collected
   * @returns true if the item should be shown, false if it should be filtered out
   */
  const shouldShowItem = (isCompleted: boolean): boolean => {
    if (isCompleted && !filters.showCollected) return false;
    if (!isCompleted && !filters.showUncollected) return false;
    return true;
  };

  /**
   * Filter an array of items based on completion status
   * @param items - Array of items to filter
   * @param isCompletedFn - Function that returns true if an item is completed
   * @returns Filtered array of items
   */
  const filterByCompletion = <T,>(items: T[], isCompletedFn: (item: T) => boolean): T[] => {
    return items.filter((item) => shouldShowItem(isCompletedFn(item)));
  };

  return {
    showCollected: filters.showCollected,
    showUncollected: filters.showUncollected,
    shouldShowItem,
    filterByCompletion,
  };
}
