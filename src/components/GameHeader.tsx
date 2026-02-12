'use client';

import { useMemo, useState } from 'react';
import { useProgress, useGameStore, useFilters, useActiveMKModes, useActivePKMNSections, calculateCollectedValue, calculateTotalValue } from '@/store/game-store';
import { getGame, getGameStats, isMarioKartGame, isPokemonGame, isLuigisMansionGame, getMarioKartGame, getPokemonGame, allStakes, gimmighoulTowers, wildTeraPokemon, flyingTaxiPoints, pokemonCenters, dittoSpawns, allSixStarRaids, sandwichRecipes, rotomPhoneCases, emotes, tablecloths, paldeaSights, kitakamiWonders, pokemonMarks, pokemonRibbons, leagueOfficials, miniGames, allPokedexEntries } from '@/data';
import { createCupCompletionId } from '@/types/mario-kart';
import { createStoryId, createLegendaryId, createPostGameId, createDLCId, createStakeId, createTowerId, createTeraId, createTaxiId, createCenterId, createDittoId, createRaidId, createRecipeId, createCaseId, createEmoteId, createTableclothId, createSightId, createWonderId, createMarkId, createRibbonId, createLeagueOfficialId, createMiniGameId, createPokedexId } from '@/types/pokemon';
import { CollectibleType, MKModeFilter, PKMNSectionFilter } from '@/types';
import { Trophy, Moon, Coins, Camera, Shirt, Flag, Image, Gift, Sticker, Music, Search, Eye, EyeOff, X, Timer, Crown, Swords, Star, Milestone, Zap, BookOpen, UtensilsCrossed, Smartphone, Medal, ChevronDown, ChevronRight, Gem, Ghost, DoorOpen, Skull, Wrench } from 'lucide-react';

interface GameHeaderProps {
  gameId: string;
}

// Mario Kart mode filter config
const mkModeConfig: Record<MKModeFilter, { label: string; icon: React.ReactNode; color: string }> = {
  gp: { label: 'Grand Prix', icon: <Trophy className="w-4 h-4" />, color: 'yellow' },
  tt: { label: 'Time Trials', icon: <Timer className="w-4 h-4" />, color: 'blue' },
  ko: { label: 'Knockout', icon: <Crown className="w-4 h-4" />, color: 'purple' },
};

// Pokemon section filter config
const pkmnSectionConfig: Record<PKMNSectionFilter, { label: string; icon: React.ReactNode; color: string }> = {
  story: { label: 'Story', icon: <Swords className="w-4 h-4" />, color: 'violet' },
  legendaries: { label: 'Legendaries', icon: <Crown className="w-4 h-4" />, color: 'yellow' },
  pokedex: { label: 'Pokedex', icon: <BookOpen className="w-4 h-4" />, color: 'blue' },
  raids: { label: 'Raids', icon: <Zap className="w-4 h-4" />, color: 'red' },
  'post-game': { label: 'Post-Game', icon: <Star className="w-4 h-4" />, color: 'orange' },
  dlc: { label: 'DLC', icon: <Gift className="w-4 h-4" />, color: 'teal' },
  collectibles: { label: 'Collectibles', icon: <Milestone className="w-4 h-4" />, color: 'emerald' },
  recipes: { label: 'Recipes', icon: <UtensilsCrossed className="w-4 h-4" />, color: 'amber' },
  cosmetics: { label: 'Cosmetics', icon: <Smartphone className="w-4 h-4" />, color: 'pink' },
  sights: { label: 'Sights', icon: <Eye className="w-4 h-4" />, color: 'cyan' },
  marks: { label: 'Marks', icon: <Medal className="w-4 h-4" />, color: 'indigo' },
};

interface StatItem {
  label: string;
  icon: React.ReactNode;
  collected: number;
  total: number;
  color: string;
}

// Color classes for stat cards
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
  red: { bg: 'bg-red-500/10', text: 'text-red-400', bar: 'bg-red-500' },
  violet: { bg: 'bg-violet-500/10', text: 'text-violet-400', bar: 'bg-violet-500' },
  teal: { bg: 'bg-teal-500/10', text: 'text-teal-400', bar: 'bg-teal-500' },
  emerald: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', bar: 'bg-emerald-500' },
  amber: { bg: 'bg-amber-500/10', text: 'text-amber-400', bar: 'bg-amber-500' },
  green: { bg: 'bg-green-500/10', text: 'text-green-400', bar: 'bg-green-500' },
};

// Filter button color classes
const filterColorClasses: Record<string, string> = {
  yellow: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50',
  purple: 'bg-purple-500/20 text-purple-400 border-purple-500/50',
  blue: 'bg-blue-500/20 text-blue-400 border-blue-500/50',
  pink: 'bg-pink-500/20 text-pink-400 border-pink-500/50',
  cyan: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/50',
  indigo: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/50',
  orange: 'bg-orange-500/20 text-orange-400 border-orange-500/50',
  lime: 'bg-lime-500/20 text-lime-400 border-lime-500/50',
  rose: 'bg-rose-500/20 text-rose-400 border-rose-500/50',
  violet: 'bg-violet-500/20 text-violet-400 border-violet-500/50',
  red: 'bg-red-500/20 text-red-400 border-red-500/50',
  teal: 'bg-teal-500/20 text-teal-400 border-teal-500/50',
  emerald: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50',
  amber: 'bg-amber-500/20 text-amber-400 border-amber-500/50',
};

// SMO type filter config
const smoTypeConfig: Partial<Record<CollectibleType, { label: string; icon: React.ReactNode; color: string }>> = {
  moon: { label: 'Moons', icon: <Moon className="w-4 h-4" />, color: 'yellow' },
  purple_coin: { label: 'Coins', icon: <Coins className="w-4 h-4" />, color: 'purple' },
  capture: { label: 'Captures', icon: <Camera className="w-4 h-4" />, color: 'blue' },
  outfit: { label: 'Outfits', icon: <Shirt className="w-4 h-4" />, color: 'pink' },
  checkpoint: { label: 'Checkpoints', icon: <Flag className="w-4 h-4" />, color: 'cyan' },
  painting: { label: 'Paintings', icon: <Image className="w-4 h-4" />, color: 'indigo' },
  souvenir: { label: 'Souvenirs', icon: <Gift className="w-4 h-4" />, color: 'orange' },
  sticker: { label: 'Stickers', icon: <Sticker className="w-4 h-4" />, color: 'lime' },
  music: { label: 'Music', icon: <Music className="w-4 h-4" />, color: 'rose' },
};

// LM2 type filter config
const lm2TypeConfig: Partial<Record<CollectibleType, { label: string; icon: React.ReactNode; color: string }>> = {
  gem: { label: 'Gems', icon: <Gem className="w-4 h-4" />, color: 'emerald' },
  boo: { label: 'Boos', icon: <Ghost className="w-4 h-4" />, color: 'purple' },
  dark_moon_piece: { label: 'Dark Moon', icon: <Moon className="w-4 h-4" />, color: 'yellow' },
  secret_door: { label: 'Secret Doors', icon: <DoorOpen className="w-4 h-4" />, color: 'cyan' },
  mission: { label: 'Missions', icon: <Star className="w-4 h-4" />, color: 'orange' },
  ghost: { label: 'Ghosts', icon: <Skull className="w-4 h-4" />, color: 'red' },
  upgrade: { label: 'Upgrades', icon: <Wrench className="w-4 h-4" />, color: 'blue' },
};

// Calculate SMO stats
function useSMOStats(gameId: string): { stats: StatItem[]; overall: { collected: number; total: number } } | null {
  const progress = useProgress(gameId);
  const game = getGame(gameId);
  const gameStats = getGameStats(gameId);
  const collectedSize = useGameStore((s) => s.progress[gameId]?.collected?.size ?? 0);

  return useMemo(() => {
    if (!game || !gameStats) return null;

    const moonCollectibles = game.collectibles.filter((c) => c.type === 'moon');
    const moonsCollected = calculateCollectedValue(progress.collected, moonCollectibles);
    const totalMoonValue = calculateTotalValue(moonCollectibles);

    const coinsCollected = game.collectibles.filter((c) => c.type === 'purple_coin' && progress.collected.has(c.id)).length;
    const capturesCollected = game.collectibles.filter((c) => c.type === 'capture' && progress.collected.has(c.id)).length;
    const outfitsCollected = game.collectibles.filter((c) => c.type === 'outfit' && progress.collected.has(c.id)).length;
    const checkpointsCollected = game.collectibles.filter((c) => c.type === 'checkpoint' && progress.collected.has(c.id)).length;
    const paintingsCollected = game.collectibles.filter((c) => c.type === 'painting' && progress.collected.has(c.id)).length;
    const souvenirsCollected = game.collectibles.filter((c) => c.type === 'souvenir' && progress.collected.has(c.id)).length;
    const stickersCollected = game.collectibles.filter((c) => c.type === 'sticker' && progress.collected.has(c.id)).length;
    const musicCollected = game.collectibles.filter((c) => c.type === 'music' && progress.collected.has(c.id)).length;

    const totalCollectedValue = moonsCollected + coinsCollected + capturesCollected + outfitsCollected + checkpointsCollected + paintingsCollected + souvenirsCollected + stickersCollected + musicCollected;
    const totalPossibleValue = totalMoonValue + gameStats.totalPurpleCoins + gameStats.totalCaptures + gameStats.totalOutfits + gameStats.totalCheckpoints + gameStats.totalPaintings + gameStats.totalSouvenirs + gameStats.totalStickers + gameStats.totalMusic;

    return {
      stats: [
        { label: 'Power Moons', icon: <Moon className="w-5 h-5" />, collected: moonsCollected, total: totalMoonValue, color: 'yellow' },
        { label: 'Purple Coins', icon: <Coins className="w-5 h-5" />, collected: coinsCollected, total: gameStats.totalPurpleCoins, color: 'purple' },
        { label: 'Captures', icon: <Camera className="w-5 h-5" />, collected: capturesCollected, total: gameStats.totalCaptures, color: 'blue' },
        { label: 'Outfits', icon: <Shirt className="w-5 h-5" />, collected: outfitsCollected, total: gameStats.totalOutfits, color: 'pink' },
        { label: 'Checkpoints', icon: <Flag className="w-5 h-5" />, collected: checkpointsCollected, total: gameStats.totalCheckpoints, color: 'cyan' },
        { label: 'Paintings', icon: <Image className="w-5 h-5" />, collected: paintingsCollected, total: gameStats.totalPaintings, color: 'indigo' },
        { label: 'Souvenirs', icon: <Gift className="w-5 h-5" />, collected: souvenirsCollected, total: gameStats.totalSouvenirs, color: 'orange' },
        { label: 'Stickers', icon: <Sticker className="w-5 h-5" />, collected: stickersCollected, total: gameStats.totalStickers, color: 'lime' },
        { label: 'Music', icon: <Music className="w-5 h-5" />, collected: musicCollected, total: gameStats.totalMusic, color: 'rose' },
      ],
      overall: { collected: totalCollectedValue, total: totalPossibleValue },
    };
  }, [game, gameStats, collectedSize, progress.collected]);
}

// Calculate Mario Kart stats
function useMarioKartStats(gameId: string): { stats: StatItem[]; overall: { collected: number; total: number } } | null {
  const game = getMarioKartGame(gameId);
  const progress = useGameStore((s) => s.progress[gameId]);
  const collectedSize = useGameStore((s) => s.progress[gameId]?.collected?.size ?? 0);

  return useMemo(() => {
    if (!game) return null;

    const collected = progress?.collected ?? new Set<string>();

    // Grand Prix stats
    const gpTotalCompletions = game.cups.length * game.engineClasses.length;
    const gpCompleted = game.cups.reduce((sum, cup) => {
      return sum + game.engineClasses.filter((ec) => collected.has(createCupCompletionId(cup.id, ec))).length;
    }, 0);

    // Knockout stats (if applicable)
    let koTotalCompletions = 0;
    let koCompleted = 0;
    if (game.knockoutRallies && game.knockoutEngineClasses) {
      koTotalCompletions = game.knockoutRallies.length * game.knockoutEngineClasses.length;
      koCompleted = game.knockoutRallies.reduce((sum, rally) => {
        return sum + game.knockoutEngineClasses!.filter((ec) => collected.has(createCupCompletionId(rally.id, ec))).length;
      }, 0);
    }

    // Time Trials stats - MK World only has 150cc, MK8 has both 150cc and 200cc
    const TIME_TRIAL_CLASSES = gameId === 'mkworld' ? ['150cc'] as const : ['150cc', '200cc'] as const;
    const allTracks = game.cups.flatMap((c) => c.tracks);
    const ttTotal = allTracks.length * TIME_TRIAL_CLASSES.length;
    const ttCompleted = allTracks.reduce((sum, t) => {
      return sum + TIME_TRIAL_CLASSES.filter((ec) => collected.has(`tt-${t.id}-${ec}`)).length;
    }, 0);

    const totalItems = gpTotalCompletions + koTotalCompletions + ttTotal;
    const totalCompleted = gpCompleted + koCompleted + ttCompleted;

    const stats: StatItem[] = [
      { label: 'Grand Prix', icon: <Trophy className="w-5 h-5" />, collected: gpCompleted, total: gpTotalCompletions, color: 'yellow' },
    ];

    if (koTotalCompletions > 0) {
      stats.push({ label: 'Knockout', icon: <Crown className="w-5 h-5" />, collected: koCompleted, total: koTotalCompletions, color: 'purple' });
    }

    stats.push({ label: 'Time Trials', icon: <Timer className="w-5 h-5" />, collected: ttCompleted, total: ttTotal, color: 'blue' });

    return {
      stats,
      overall: { collected: totalCompleted, total: totalItems },
    };
  }, [game, progress, collectedSize]);
}

// Calculate Pokemon stats
function usePokemonStats(gameId: string): { stats: StatItem[]; overall: { collected: number; total: number } } | null {
  const game = getPokemonGame(gameId);
  const progress = useGameStore((s) => s.progress[gameId]);
  const collectedSize = useGameStore((s) => s.progress[gameId]?.collected?.size ?? 0);

  return useMemo(() => {
    if (!game) return null;

    const collected = progress?.collected ?? new Set<string>();

    const storyCompleted = game.storyCheckpoints.filter((c) => collected.has(createStoryId(c.id))).length;
    const storyTotal = game.storyCheckpoints.length;

    const legendaryCaught = game.legendaries.filter((l) => collected.has(createLegendaryId(l.id))).length;
    const legendaryTotal = game.legendaries.length;

    const pokedexCompleted = allPokedexEntries.filter((p) => collected.has(createPokedexId(p.id))).length;
    const pokedexTotal = allPokedexEntries.length;

    const raidsCompleted = allSixStarRaids.filter((r) => collected.has(createRaidId(r.id))).length;
    const raidsTotal = allSixStarRaids.length;

    const postGameBase = game.postGame.filter((i) => collected.has(createPostGameId(i.id))).length;
    const officialsCompleted = leagueOfficials.filter((o) => collected.has(createLeagueOfficialId(o.id))).length;
    const miniGamesCompleted = miniGames.filter((g) => collected.has(createMiniGameId(g.id))).length;
    const postGameTotal = game.postGame.length + leagueOfficials.length + miniGames.length;
    const postGameCompleted = postGameBase + officialsCompleted + miniGamesCompleted;

    const dlcCompleted = game.dlcContent.filter((c) => collected.has(createDLCId(c.id))).length;
    const dlcTotal = game.dlcContent.length;

    const collectiblesTotal = allStakes.length + gimmighoulTowers.length + wildTeraPokemon.length + flyingTaxiPoints.length + pokemonCenters.length + dittoSpawns.length;
    const collectiblesCompleted =
      allStakes.filter((s) => collected.has(createStakeId(s.id))).length +
      gimmighoulTowers.filter((t) => collected.has(createTowerId(t.id))).length +
      wildTeraPokemon.filter((t) => collected.has(createTeraId(t.id))).length +
      flyingTaxiPoints.filter((t) => collected.has(createTaxiId(t.id))).length +
      pokemonCenters.filter((c) => collected.has(createCenterId(c.id))).length +
      dittoSpawns.filter((d) => collected.has(createDittoId(d.id))).length;

    const recipesCompleted = sandwichRecipes.filter((r) => collected.has(createRecipeId(r.number))).length;
    const recipesTotal = sandwichRecipes.length;

    const cosmeticsTotal = rotomPhoneCases.length + emotes.length + tablecloths.length;
    const cosmeticsCompleted =
      rotomPhoneCases.filter((c) => collected.has(createCaseId(c.id))).length +
      emotes.filter((e) => collected.has(createEmoteId(e.id))).length +
      tablecloths.filter((t) => collected.has(createTableclothId(t.id))).length;

    const sightseeingTotal = paldeaSights.length + kitakamiWonders.length;
    const sightseeingCompleted =
      paldeaSights.filter((s) => collected.has(createSightId(s.id))).length +
      kitakamiWonders.filter((w) => collected.has(createWonderId(w.id))).length;

    const marksRibbonsTotal = pokemonMarks.length + pokemonRibbons.length;
    const marksRibbonsCompleted =
      pokemonMarks.filter((m) => collected.has(createMarkId(m.id))).length +
      pokemonRibbons.filter((r) => collected.has(createRibbonId(r.id))).length;

    const totalItems = storyTotal + legendaryTotal + postGameTotal + dlcTotal + collectiblesTotal + pokedexTotal + raidsTotal + recipesTotal + cosmeticsTotal + sightseeingTotal + marksRibbonsTotal;
    const totalCompleted = storyCompleted + legendaryCaught + postGameCompleted + dlcCompleted + collectiblesCompleted + pokedexCompleted + raidsCompleted + recipesCompleted + cosmeticsCompleted + sightseeingCompleted + marksRibbonsCompleted;

    return {
      stats: [
        { label: 'Story', icon: <Swords className="w-5 h-5" />, collected: storyCompleted, total: storyTotal, color: 'violet' },
        { label: 'Legendaries', icon: <Crown className="w-5 h-5" />, collected: legendaryCaught, total: legendaryTotal, color: 'yellow' },
        { label: 'Pokedex', icon: <BookOpen className="w-5 h-5" />, collected: pokedexCompleted, total: pokedexTotal, color: 'blue' },
        { label: 'Raids', icon: <Zap className="w-5 h-5" />, collected: raidsCompleted, total: raidsTotal, color: 'red' },
        { label: 'Post-Game', icon: <Star className="w-5 h-5" />, collected: postGameCompleted, total: postGameTotal, color: 'orange' },
        { label: 'DLC', icon: <Gift className="w-5 h-5" />, collected: dlcCompleted, total: dlcTotal, color: 'teal' },
        { label: 'Collectibles', icon: <Milestone className="w-5 h-5" />, collected: collectiblesCompleted, total: collectiblesTotal, color: 'emerald' },
        { label: 'Recipes', icon: <UtensilsCrossed className="w-5 h-5" />, collected: recipesCompleted, total: recipesTotal, color: 'amber' },
        { label: 'Cosmetics', icon: <Smartphone className="w-5 h-5" />, collected: cosmeticsCompleted, total: cosmeticsTotal, color: 'pink' },
        { label: 'Sights', icon: <Eye className="w-5 h-5" />, collected: sightseeingCompleted, total: sightseeingTotal, color: 'cyan' },
        { label: 'Marks', icon: <Medal className="w-5 h-5" />, collected: marksRibbonsCompleted, total: marksRibbonsTotal, color: 'indigo' },
      ],
      overall: { collected: totalCompleted, total: totalItems },
    };
  }, [game, progress, collectedSize]);
}

// Calculate LM2 stats
function useLM2Stats(gameId: string): { stats: StatItem[]; overall: { collected: number; total: number } } | null {
  const game = getGame(gameId);
  const progress = useProgress(gameId);
  const collectedSize = useGameStore((s) => s.progress[gameId]?.collected?.size ?? 0);

  return useMemo(() => {
    if (!game) return null;

    const countType = (type: string) => {
      const items = game.collectibles.filter((c) => c.type === type);
      const collected = items.filter((c) => progress.collected.has(c.id)).length;
      return { collected, total: items.length };
    };

    const gems = countType('gem');
    const boos = countType('boo');
    const dmp = countType('dark_moon_piece');
    const sd = countType('secret_door');
    const missions = countType('mission');
    const ghosts = countType('ghost');
    const upgrades = countType('upgrade');

    const totalItems = gems.total + boos.total + dmp.total + sd.total + missions.total + ghosts.total + upgrades.total;
    const totalCompleted = gems.collected + boos.collected + dmp.collected + sd.collected + missions.collected + ghosts.collected + upgrades.collected;

    const stats: StatItem[] = [
      { label: 'Gems', icon: <Gem className="w-5 h-5" />, collected: gems.collected, total: gems.total, color: 'emerald' },
      { label: 'Boos', icon: <Ghost className="w-5 h-5" />, collected: boos.collected, total: boos.total, color: 'purple' },
      { label: 'Missions', icon: <Star className="w-5 h-5" />, collected: missions.collected, total: missions.total, color: 'orange' },
      { label: 'Dark Moon', icon: <Moon className="w-5 h-5" />, collected: dmp.collected, total: dmp.total, color: 'yellow' },
      { label: 'Secret Doors', icon: <DoorOpen className="w-5 h-5" />, collected: sd.collected, total: sd.total, color: 'cyan' },
    ];

    if (ghosts.total > 0) {
      stats.push({ label: 'Ghosts', icon: <Skull className="w-5 h-5" />, collected: ghosts.collected, total: ghosts.total, color: 'red' });
    }

    stats.push({ label: 'Upgrades', icon: <Wrench className="w-5 h-5" />, collected: upgrades.collected, total: upgrades.total, color: 'blue' });

    return {
      stats,
      overall: { collected: totalCompleted, total: totalItems },
    };
  }, [game, collectedSize, progress.collected]);
}

export function GameHeader({ gameId }: GameHeaderProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const filters = useFilters();
  const setFilters = useGameStore((s) => s.setFilters);
  const activeMKModes = useActiveMKModes();
  const activePKMNSections = useActivePKMNSections();
  const toggleMKMode = useGameStore((s) => s.toggleMKMode);
  const togglePKMNSection = useGameStore((s) => s.togglePKMNSection);

  const isMK = isMarioKartGame(gameId);
  const isPKMN = isPokemonGame(gameId);
  const isLM2 = isLuigisMansionGame(gameId);

  // Get available MK modes (knockout only for MK World)
  const mkGame = isMK ? getMarioKartGame(gameId) : null;
  const hasKnockout = mkGame?.knockoutRallies && mkGame.knockoutRallies.length > 0;
  const availableMKModes: MKModeFilter[] = hasKnockout ? ['gp', 'tt', 'ko'] : ['gp', 'tt'];

  // Get stats based on game type
  const smoStats = useSMOStats(gameId);
  const mkStats = useMarioKartStats(gameId);
  const pkmnStats = usePokemonStats(gameId);
  const lm2Stats = useLM2Stats(gameId);

  const data = isMK ? mkStats : isPKMN ? pkmnStats : isLM2 ? lm2Stats : smoStats;

  if (!data) return null;

  const { stats, overall } = data;
  const overallPercentage = overall.total > 0 ? (overall.collected / overall.total) * 100 : 0;

  // Toggle type filter (SMO only)
  const toggleType = (type: CollectibleType) => {
    const newTypes = filters.types.includes(type)
      ? filters.types.filter((t) => t !== type)
      : [...filters.types, type];
    setFilters({ types: newTypes });
  };

  return (
    <div className="bg-zinc-900 border-b border-zinc-800">
      {/* Compact Header - Always Visible */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-2 flex items-center justify-between hover:bg-zinc-800/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            isMK ? 'bg-gradient-to-br from-red-500 to-red-600' :
            isPKMN ? 'bg-gradient-to-br from-violet-500 to-purple-600' :
            isLM2 ? 'bg-gradient-to-br from-green-500 to-emerald-600' :
            'bg-gradient-to-br from-yellow-500 to-orange-500'
          }`}>
            <Trophy className="w-4 h-4 text-white" />
          </div>
          <div className="text-left">
            <span className="font-semibold text-sm">Progress: </span>
            <span className="text-sm text-zinc-400">
              {overall.collected} / {overall.total}
            </span>
          </div>
          {/* Mini Progress Bar */}
          <div className="w-32 bg-zinc-800 rounded-full h-2 hidden sm:block">
            <div
              className={`h-2 rounded-full transition-all duration-500 ${
                isMK ? 'bg-gradient-to-r from-red-500 to-green-500' :
                isPKMN ? 'bg-gradient-to-r from-violet-500 to-green-500' :
                isLM2 ? 'bg-gradient-to-r from-green-500 to-emerald-400' :
                'bg-gradient-to-r from-yellow-500 to-green-500'
              }`}
              style={{ width: `${overallPercentage}%` }}
            />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className={`text-lg font-bold ${
            isMK ? 'text-red-400' : isPKMN ? 'text-violet-400' : isLM2 ? 'text-green-400' : 'text-yellow-400'
          }`}>
            {overallPercentage.toFixed(1)}%
          </span>
          {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </div>
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="px-4 pb-3">
          {/* Progress Bar (Full Width) */}
          <div className="w-full bg-zinc-800 rounded-full h-2 mb-3">
            <div
              className={`h-2 rounded-full transition-all duration-500 ${
                isMK ? 'bg-gradient-to-r from-red-500 via-green-500 to-emerald-500' :
                isPKMN ? 'bg-gradient-to-r from-violet-500 via-green-500 to-emerald-500' :
                isLM2 ? 'bg-gradient-to-r from-green-500 via-emerald-400 to-teal-500' :
                'bg-gradient-to-r from-yellow-500 via-green-500 to-emerald-500'
              }`}
              style={{ width: `${overallPercentage}%` }}
            />
          </div>

          {/* Detailed Stats Grid - Compact */}
          <div className={`grid gap-2 ${
            stats.length <= 3 ? 'grid-cols-3' :
            stats.length <= 6 ? 'grid-cols-3 md:grid-cols-6' :
            'grid-cols-3 md:grid-cols-5 lg:grid-cols-9'
          }`}>
            {stats.map((item) => {
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
        </div>
      )}

      {/* Search and Filters */}
      <div className="px-4 py-2 border-t border-zinc-800">
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

          {/* Filter Chips */}
          <div className="flex flex-wrap items-center gap-1.5 mt-2">
            {/* Collected Toggle */}
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

            {/* Uncollected Toggle */}
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

            {/* Divider + Game-specific filters */}
            <div className="w-px h-5 bg-zinc-700 mx-0.5" />

            {/* Mario Kart Mode Filters */}
            {isMK && availableMKModes.map((mode) => {
              const config = mkModeConfig[mode];
              const isActive = activeMKModes.has(mode);
              return (
                <button
                  key={mode}
                  onClick={() => toggleMKMode(mode)}
                  className={`flex items-center gap-1 px-2 py-1 rounded-md border transition-colors text-xs ${
                    isActive
                      ? filterColorClasses[config.color]
                      : 'bg-zinc-800 text-zinc-500 border-zinc-700'
                  }`}
                >
                  <span className="[&>svg]:w-3.5 [&>svg]:h-3.5">{config.icon}</span>
                  <span className="hidden sm:inline">{config.label}</span>
                </button>
              );
            })}

            {/* Pokemon Section Filters */}
            {isPKMN && (Object.keys(pkmnSectionConfig) as PKMNSectionFilter[]).map((section) => {
              const config = pkmnSectionConfig[section];
              const isActive = activePKMNSections.has(section);
              return (
                <button
                  key={section}
                  onClick={() => togglePKMNSection(section)}
                  className={`flex items-center gap-1 px-2 py-1 rounded-md border transition-colors text-xs ${
                    isActive
                      ? filterColorClasses[config.color]
                      : 'bg-zinc-800 text-zinc-500 border-zinc-700'
                  }`}
                >
                  <span className="[&>svg]:w-3.5 [&>svg]:h-3.5">{config.icon}</span>
                  <span className="hidden sm:inline">{config.label}</span>
                </button>
              );
            })}

            {/* SMO Type Filters */}
            {!isMK && !isPKMN && !isLM2 && (Object.entries(smoTypeConfig) as [CollectibleType, { label: string; icon: React.ReactNode; color: string }][]).map(
              ([type, config]) => (
                <button
                  key={type}
                  onClick={() => toggleType(type)}
                  className={`flex items-center gap-1 px-2 py-1 rounded-md border transition-colors text-xs ${
                    filters.types.includes(type)
                      ? filterColorClasses[config.color]
                      : 'bg-zinc-800 text-zinc-500 border-zinc-700'
                  }`}
                >
                  <span className="[&>svg]:w-3.5 [&>svg]:h-3.5">{config.icon}</span>
                  <span className="hidden sm:inline">{config.label}</span>
                </button>
              )
            )}

            {/* LM2 Type Filters */}
            {isLM2 && (Object.entries(lm2TypeConfig) as [CollectibleType, { label: string; icon: React.ReactNode; color: string }][]).map(
              ([type, config]) => (
                <button
                  key={type}
                  onClick={() => toggleType(type)}
                  className={`flex items-center gap-1 px-2 py-1 rounded-md border transition-colors text-xs ${
                    filters.types.includes(type)
                      ? filterColorClasses[config.color]
                      : 'bg-zinc-800 text-zinc-500 border-zinc-700'
                  }`}
                >
                  <span className="[&>svg]:w-3.5 [&>svg]:h-3.5">{config.icon}</span>
                  <span className="hidden sm:inline">{config.label}</span>
                </button>
              )
            )}
          </div>
        </div>
    </div>
  );
}
