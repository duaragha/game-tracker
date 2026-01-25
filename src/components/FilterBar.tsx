'use client';

import { useGameStore, useFilters } from '@/store/game-store';
import { CollectibleType } from '@/types';
import { Search, Moon, Coins, Shirt, Camera, Eye, EyeOff, Filter, X, Flag, Image, Gift, Sticker, Music } from 'lucide-react';
import { useState } from 'react';

const typeConfig: Record<CollectibleType, { label: string; icon: React.ReactNode; color: string }> = {
  moon: { label: 'Moons', icon: <Moon className="w-4 h-4" />, color: 'yellow' },
  purple_coin: { label: 'Purple Coins', icon: <Coins className="w-4 h-4" />, color: 'purple' },
  capture: { label: 'Captures', icon: <Camera className="w-4 h-4" />, color: 'blue' },
  outfit: { label: 'Outfits', icon: <Shirt className="w-4 h-4" />, color: 'pink' },
  checkpoint: { label: 'Checkpoints', icon: <Flag className="w-4 h-4" />, color: 'cyan' },
  painting: { label: 'Paintings', icon: <Image className="w-4 h-4" />, color: 'indigo' },
  souvenir: { label: 'Souvenirs', icon: <Gift className="w-4 h-4" />, color: 'orange' },
  sticker: { label: 'Stickers', icon: <Sticker className="w-4 h-4" />, color: 'lime' },
  music: { label: 'Music', icon: <Music className="w-4 h-4" />, color: 'rose' },
};

export function FilterBar() {
  const filters = useFilters();
  const setFilters = useGameStore((s) => s.setFilters);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const toggleType = (type: CollectibleType) => {
    const newTypes = filters.types.includes(type)
      ? filters.types.filter((t) => t !== type)
      : [...filters.types, type];
    setFilters({ types: newTypes });
  };

  const colorClasses: Record<string, string> = {
    yellow: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50',
    purple: 'bg-purple-500/20 text-purple-400 border-purple-500/50',
    blue: 'bg-blue-500/20 text-blue-400 border-blue-500/50',
    pink: 'bg-pink-500/20 text-pink-400 border-pink-500/50',
    green: 'bg-green-500/20 text-green-400 border-green-500/50',
    orange: 'bg-orange-500/20 text-orange-400 border-orange-500/50',
    cyan: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/50',
    indigo: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/50',
    lime: 'bg-lime-500/20 text-lime-400 border-lime-500/50',
    rose: 'bg-rose-500/20 text-rose-400 border-rose-500/50',
  };

  return (
    <div className="bg-zinc-900 border-b border-zinc-800 px-4 py-2">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
        <input
          type="text"
          placeholder="Search collectibles..."
          value={filters.searchQuery}
          onChange={(e) => setFilters({ searchQuery: e.target.value })}
          className="w-full bg-zinc-800 border border-zinc-700 rounded-lg pl-8 pr-8 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500"
        />
        {filters.searchQuery && (
          <button
            onClick={() => setFilters({ searchQuery: '' })}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Quick Filters */}
      <div className="flex flex-wrap items-center gap-1.5 mt-2">
        {/* Show/Hide Collected */}
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

        <div className="w-px h-5 bg-zinc-700 mx-0.5" />

        {/* Type Filters */}
        {(Object.entries(typeConfig) as [CollectibleType, typeof typeConfig[CollectibleType]][]).map(
          ([type, config]) => (
            <button
              key={type}
              onClick={() => toggleType(type)}
              className={`flex items-center gap-1 px-2 py-1 rounded-md border transition-colors text-xs ${
                filters.types.includes(type)
                  ? colorClasses[config.color]
                  : 'bg-zinc-800 text-zinc-500 border-zinc-700'
              }`}
            >
              <span className="[&>svg]:w-3.5 [&>svg]:h-3.5">{config.icon}</span>
              <span className="hidden sm:inline">{config.label}</span>
            </button>
          )
        )}

        {/* Advanced Filters Toggle */}
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className={`ml-auto flex items-center gap-1 px-2 py-1 rounded-md border transition-colors text-xs ${
            showAdvanced
              ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50'
              : 'bg-zinc-800 text-zinc-400 border-zinc-700'
          }`}
        >
          <Filter className="w-3.5 h-3.5" />
          <span>More</span>
        </button>
      </div>

      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="mt-2 pt-2 border-t border-zinc-800">
          <p className="text-xs text-zinc-400 mb-1.5">Categories:</p>
          <div className="flex flex-wrap gap-1.5">
            {['story', 'moon_rock', 'shop', 'hint_art', 'peach', 'toadette', 'luigi_balloon'].map(
              (cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    const newCats = filters.categories.includes(cat as any)
                      ? filters.categories.filter((c) => c !== cat)
                      : [...filters.categories, cat as any];
                    setFilters({ categories: newCats });
                  }}
                  className={`px-1.5 py-0.5 rounded text-[10px] transition-colors ${
                    filters.categories.includes(cat as any)
                      ? 'bg-zinc-700 text-white'
                      : 'bg-zinc-800 text-zinc-500'
                  }`}
                >
                  {cat.replace('_', ' ')}
                </button>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}
