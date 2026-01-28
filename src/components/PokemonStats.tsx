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
  allSixStarRaids,
  sandwichRecipes,
  rotomPhoneCases,
  emotes,
  tablecloths,
  paldeaSights,
  kitakamiWonders,
  pokemonMarks,
  pokemonRibbons,
  leagueOfficials,
  miniGames,
  allPokedexEntries,
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
  createRaidId,
  createRecipeId,
  createCaseId,
  createEmoteId,
  createTableclothId,
  createSightId,
  createWonderId,
  createMarkId,
  createRibbonId,
  createLeagueOfficialId,
  createMiniGameId,
  createPokedexId,
} from '@/types/pokemon';
import { Target, Swords, Crown, Star, Gift, Milestone, Zap, BookOpen, UtensilsCrossed, Smartphone, Eye, Medal } from 'lucide-react';

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

  // Calculate Legendary stats
  const legendaryTotal = game.legendaries.length;
  const legendaryCaught = game.legendaries.filter((l) => collected.has(createLegendaryId(l.id))).length;

  // Calculate Post-Game stats (including officials and mini-games)
  const postGameBase = game.postGame.filter((i) => collected.has(createPostGameId(i.id))).length;
  const officialsCompleted = leagueOfficials.filter((o) => collected.has(createLeagueOfficialId(o.id))).length;
  const miniGamesCompleted = miniGames.filter((g) => collected.has(createMiniGameId(g.id))).length;
  const postGameTotal = game.postGame.length + leagueOfficials.length + miniGames.length;
  const postGameCompleted = postGameBase + officialsCompleted + miniGamesCompleted;

  // Calculate DLC stats
  const dlcTotal = game.dlcContent.length;
  const dlcCompleted = game.dlcContent.filter((c) => collected.has(createDLCId(c.id))).length;

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

  // Calculate Pokedex stats
  const pokedexTotal = allPokedexEntries.length;
  const pokedexCompleted = allPokedexEntries.filter((p) => collected.has(createPokedexId(p.id))).length;

  // Calculate Raids stats
  const raidsTotal = allSixStarRaids.length;
  const raidsCompleted = allSixStarRaids.filter((r) => collected.has(createRaidId(r.id))).length;

  // Calculate Recipes stats
  const recipesTotal = sandwichRecipes.length;
  const recipesCompleted = sandwichRecipes.filter((r) => collected.has(createRecipeId(r.number))).length;

  // Calculate Cosmetics stats
  const cosmeticsTotal = rotomPhoneCases.length + emotes.length + tablecloths.length;
  const cosmeticsCompleted =
    rotomPhoneCases.filter((c) => collected.has(createCaseId(c.id))).length +
    emotes.filter((e) => collected.has(createEmoteId(e.id))).length +
    tablecloths.filter((t) => collected.has(createTableclothId(t.id))).length;

  // Calculate Sightseeing stats
  const sightseeingTotal = paldeaSights.length + kitakamiWonders.length;
  const sightseeingCompleted =
    paldeaSights.filter((s) => collected.has(createSightId(s.id))).length +
    kitakamiWonders.filter((w) => collected.has(createWonderId(w.id))).length;

  // Calculate Marks & Ribbons stats
  const marksRibbonsTotal = pokemonMarks.length + pokemonRibbons.length;
  const marksRibbonsCompleted =
    pokemonMarks.filter((m) => collected.has(createMarkId(m.id))).length +
    pokemonRibbons.filter((r) => collected.has(createRibbonId(r.id))).length;

  // Overall percentage
  const totalItems = storyTotal + legendaryTotal + postGameTotal + dlcTotal + collectiblesTotal +
    pokedexTotal + raidsTotal + recipesTotal + cosmeticsTotal + sightseeingTotal + marksRibbonsTotal;
  const totalCompleted = storyCompleted + legendaryCaught + postGameCompleted + dlcCompleted + collectiblesCompleted +
    pokedexCompleted + raidsCompleted + recipesCompleted + cosmeticsCompleted + sightseeingCompleted + marksRibbonsCompleted;
  const overallPercentage = totalItems > 0 ? Math.round((totalCompleted / totalItems) * 100) : 0;

  // Stats array for easier rendering
  const stats = [
    { icon: Swords, color: 'text-violet-400', label: 'Story', completed: storyCompleted, total: storyTotal },
    { icon: Crown, color: 'text-yellow-400', label: 'Legendaries', completed: legendaryCaught, total: legendaryTotal },
    { icon: BookOpen, color: 'text-blue-400', label: 'Pokedex', completed: pokedexCompleted, total: pokedexTotal },
    { icon: Zap, color: 'text-red-400', label: 'Raids', completed: raidsCompleted, total: raidsTotal },
    { icon: Star, color: 'text-orange-400', label: 'Post-Game', completed: postGameCompleted, total: postGameTotal },
    { icon: Gift, color: 'text-teal-400', label: 'DLC', completed: dlcCompleted, total: dlcTotal },
    { icon: Milestone, color: 'text-emerald-400', label: 'Collectibles', completed: collectiblesCompleted, total: collectiblesTotal },
    { icon: UtensilsCrossed, color: 'text-amber-400', label: 'Recipes', completed: recipesCompleted, total: recipesTotal },
    { icon: Smartphone, color: 'text-pink-400', label: 'Cosmetics', completed: cosmeticsCompleted, total: cosmeticsTotal },
    { icon: Eye, color: 'text-cyan-400', label: 'Sights', completed: sightseeingCompleted, total: sightseeingTotal },
    { icon: Medal, color: 'text-indigo-400', label: 'Marks', completed: marksRibbonsCompleted, total: marksRibbonsTotal },
  ];

  return (
    <div className="bg-zinc-900 border-b border-zinc-800 px-4 py-2">
      <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-zinc-700">
        {/* Overall Progress */}
        <div className="flex items-center gap-2 pr-3 border-r border-zinc-700 shrink-0">
          <Target className="w-4 h-4 text-violet-500" />
          <div className="flex items-center gap-1">
            <span className="text-xs text-zinc-500">Overall</span>
            <span className="font-bold text-violet-400">{overallPercentage}%</span>
          </div>
        </div>

        {/* All Stats */}
        {stats.map((stat) => {
          const Icon = stat.icon;
          const percentage = stat.total > 0 ? Math.round((stat.completed / stat.total) * 100) : 0;
          const isComplete = stat.completed === stat.total && stat.total > 0;

          return (
            <div key={stat.label} className="flex items-center gap-1.5 shrink-0">
              <Icon className={`w-3.5 h-3.5 ${stat.color}`} />
              <span className="text-xs text-zinc-500">{stat.label}:</span>
              <span className={`text-xs font-medium ${isComplete ? 'text-green-400' : ''}`}>
                {stat.completed}/{stat.total}
              </span>
              <span className="text-[10px] text-zinc-600">({percentage}%)</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
