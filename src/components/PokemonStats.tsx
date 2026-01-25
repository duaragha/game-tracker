'use client';

import { useGameStore } from '@/store/game-store';
import {
  getPokemonGame,
  allStakes,
  gimmighoulTowers,
  wildTeraPokemon,
  flyingTaxiPoints,
  pokemonCenters,
  dittoSpawns,
} from '@/data';
import {
  createStoryId,
  createLegendaryId,
  createPostGameId,
  createDLCId,
  createStakeId,
  createTowerId,
  createTeraId,
  createTaxiId,
  createCenterId,
  createDittoId,
} from '@/types/pokemon';
import { Target, Swords, Crown, Star, Gift, Milestone } from 'lucide-react';

interface PokemonStatsProps {
  gameId: string;
}

export function PokemonStats({ gameId }: PokemonStatsProps) {
  const game = getPokemonGame(gameId);
  const progress = useGameStore((s) => s.progress[gameId]);

  if (!game) return null;

  const collected = progress?.collected ?? new Set<string>();

  // Calculate Story stats
  const storyTotal = game.storyCheckpoints.length;
  const storyCompleted = game.storyCheckpoints.filter((c) => collected.has(createStoryId(c.id))).length;
  const storyPercentage = storyTotal > 0 ? Math.round((storyCompleted / storyTotal) * 100) : 0;

  // Calculate Legendary stats
  const legendaryTotal = game.legendaries.length;
  const legendaryCaught = game.legendaries.filter((l) => collected.has(createLegendaryId(l.id))).length;
  const legendaryPercentage = legendaryTotal > 0 ? Math.round((legendaryCaught / legendaryTotal) * 100) : 0;

  // Calculate Post-Game stats
  const postGameTotal = game.postGame.length;
  const postGameCompleted = game.postGame.filter((i) => collected.has(createPostGameId(i.id))).length;
  const postGamePercentage = postGameTotal > 0 ? Math.round((postGameCompleted / postGameTotal) * 100) : 0;

  // Calculate DLC stats
  const dlcTotal = game.dlcContent.length;
  const dlcCompleted = game.dlcContent.filter((c) => collected.has(createDLCId(c.id))).length;
  const dlcPercentage = dlcTotal > 0 ? Math.round((dlcCompleted / dlcTotal) * 100) : 0;

  // Calculate Collectibles stats
  const collectiblesTotal = allStakes.length + gimmighoulTowers.length + wildTeraPokemon.length +
    flyingTaxiPoints.length + pokemonCenters.length + dittoSpawns.length;
  const collectiblesCompleted =
    allStakes.filter((s) => collected.has(createStakeId(s.id))).length +
    gimmighoulTowers.filter((t) => collected.has(createTowerId(t.id))).length +
    wildTeraPokemon.filter((t) => collected.has(createTeraId(t.id))).length +
    flyingTaxiPoints.filter((t) => collected.has(createTaxiId(t.id))).length +
    pokemonCenters.filter((c) => collected.has(createCenterId(c.id))).length +
    dittoSpawns.filter((d) => collected.has(createDittoId(d.id))).length;
  const collectiblesPercentage = collectiblesTotal > 0 ? Math.round((collectiblesCompleted / collectiblesTotal) * 100) : 0;

  // Overall percentage
  const totalItems = storyTotal + legendaryTotal + postGameTotal + dlcTotal + collectiblesTotal;
  const totalCompleted = storyCompleted + legendaryCaught + postGameCompleted + dlcCompleted + collectiblesCompleted;
  const overallPercentage = totalItems > 0 ? Math.round((totalCompleted / totalItems) * 100) : 0;

  return (
    <div className="bg-zinc-900 border-b border-zinc-800 px-4 py-3">
      <div className="flex flex-wrap items-center gap-4">
        {/* Overall Progress */}
        <div className="flex items-center gap-3 pr-4 border-r border-zinc-700">
          <Target className="w-5 h-5 text-violet-500" />
          <div>
            <div className="text-xs text-zinc-500">Overall</div>
            <div className="font-bold text-violet-400">{overallPercentage}%</div>
          </div>
        </div>

        {/* Story */}
        <div className="flex items-center gap-2">
          <Swords className="w-4 h-4 text-violet-400" />
          <div className="flex items-center gap-2">
            <span className="text-sm text-zinc-400">Story:</span>
            <span className="font-medium">{storyCompleted}/{storyTotal}</span>
            <span className="text-xs text-zinc-500">({storyPercentage}%)</span>
          </div>
        </div>

        {/* Legendaries */}
        <div className="flex items-center gap-2">
          <Crown className="w-4 h-4 text-yellow-400" />
          <div className="flex items-center gap-2">
            <span className="text-sm text-zinc-400">Legendaries:</span>
            <span className="font-medium">{legendaryCaught}/{legendaryTotal}</span>
            <span className="text-xs text-zinc-500">({legendaryPercentage}%)</span>
          </div>
        </div>

        {/* Post-Game */}
        <div className="flex items-center gap-2">
          <Star className="w-4 h-4 text-orange-400" />
          <div className="flex items-center gap-2">
            <span className="text-sm text-zinc-400">Post-Game:</span>
            <span className="font-medium">{postGameCompleted}/{postGameTotal}</span>
            <span className="text-xs text-zinc-500">({postGamePercentage}%)</span>
          </div>
        </div>

        {/* DLC */}
        <div className="flex items-center gap-2">
          <Gift className="w-4 h-4 text-teal-400" />
          <div className="flex items-center gap-2">
            <span className="text-sm text-zinc-400">DLC:</span>
            <span className="font-medium">{dlcCompleted}/{dlcTotal}</span>
            <span className="text-xs text-zinc-500">({dlcPercentage}%)</span>
          </div>
        </div>

        {/* Collectibles */}
        <div className="flex items-center gap-2">
          <Milestone className="w-4 h-4 text-emerald-400" />
          <div className="flex items-center gap-2">
            <span className="text-sm text-zinc-400">Collectibles:</span>
            <span className="font-medium">{collectiblesCompleted}/{collectiblesTotal}</span>
            <span className="text-xs text-zinc-500">({collectiblesPercentage}%)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
