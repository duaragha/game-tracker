'use client';

import { useState, useMemo } from 'react';
import { useGameStore, useCurrentGame, useCurrentKingdom, useCurrentPokemonSection, useCurrentMarioKartSection, useProgress, calculateCollectedValue, calculateTotalValue } from '@/store/game-store';
import { games, getGame, getCollectiblesForKingdom, getGameStats, marioKartGames, getMarioKartGame, isMarioKartGame, pokemonGames, getPokemonGame, isPokemonGame, allStakes, gimmighoulTowers, wildTeraPokemon, flyingTaxiPoints, pokemonCenters, dittoSpawns } from '@/data';
import { Kingdom } from '@/types';
import { createCupCompletionId } from '@/types/mario-kart';
import {
  createStoryId, createLegendaryId, createPostGameId, createDLCId, createStakeId,
  createTowerId, createTeraId, createTaxiId, createCenterId, createDittoId,
  createRaidId, createRecipeId, createCaseId, createEmoteId,
  createTableclothId, createSightId, createWonderId, createMarkId, createRibbonId,
  createLeagueOfficialId, createMiniGameId, createPokedexId, createShinyId, createHiddenAbilityId,
} from '@/types/pokemon';
import { allPokedexEntries } from '@/data';
import { ChevronDown, ChevronRight, Map, Moon, Coins, Search, Menu, X, Gamepad2, Trophy, Flag, Sparkles, Swords, Crown, Star, Gift, Milestone, Timer, Zap, UtensilsCrossed, Smartphone, Eye, Medal, BookOpen, Globe } from 'lucide-react';

export function Sidebar() {
  const currentGame = useCurrentGame();
  const currentKingdom = useCurrentKingdom();
  const currentPokemonSection = useCurrentPokemonSection();
  const currentMarioKartSection = useCurrentMarioKartSection();
  const setCurrentGame = useGameStore((s) => s.setCurrentGame);
  const setCurrentKingdom = useGameStore((s) => s.setCurrentKingdom);
  const setCurrentPokemonSection = useGameStore((s) => s.setCurrentPokemonSection);
  const setCurrentMarioKartSection = useGameStore((s) => s.setCurrentMarioKartSection);
  const sidebarOpen = useGameStore((s) => s.sidebarOpen);
  const setSidebarOpen = useGameStore((s) => s.setSidebarOpen);
  const progress = useProgress(currentGame || '');
  // Force re-render when collected size changes
  const collectedSize = useGameStore((s) => s.progress[currentGame || '']?.collected?.size ?? 0);
  const allProgress = useGameStore((s) => s.progress);

  const isMK = currentGame ? isMarioKartGame(currentGame) : false;
  const isPKMN = currentGame ? isPokemonGame(currentGame) : false;
  const game = currentGame && !isMK && !isPKMN ? getGame(currentGame) : null;
  const mkGame = currentGame && isMK ? getMarioKartGame(currentGame) : null;
  const pkmnGame = currentGame && isPKMN ? getPokemonGame(currentGame) : null;
  const stats = currentGame && !isMK && !isPKMN ? getGameStats(currentGame) : null;

  // Calculate Mario Kart stats (with section breakdown)
  const mkStats = (() => {
    if (!mkGame) return { collected: 0, total: 0, percentage: 0, grandPrix: { completed: 0, total: 0 }, timeTrials: { completed: 0, total: 0 }, knockout: { completed: 0, total: 0 }, hasKnockout: false };

    const col = progress.collected;

    // Grand Prix completions
    const gpTotal = mkGame.cups.length * mkGame.engineClasses.length;
    const gpCompleted = mkGame.cups.reduce((sum, cup) => {
      return sum + mkGame.engineClasses.filter((ec) => col.has(createCupCompletionId(cup.id, ec))).length;
    }, 0);

    // Knockout completions (if applicable)
    let koTotal = 0;
    let koCompleted = 0;
    const hasKnockout = !!(mkGame.knockoutRallies && mkGame.knockoutEngineClasses);
    if (hasKnockout) {
      koTotal = mkGame.knockoutRallies!.length * mkGame.knockoutEngineClasses!.length;
      koCompleted = mkGame.knockoutRallies!.reduce((sum, rally) => {
        return sum + mkGame.knockoutEngineClasses!.filter((ec) => col.has(createCupCompletionId(rally.id, ec))).length;
      }, 0);
    }

    // Time Trials - MK World only has 150cc, MK8 has both
    const TIME_TRIAL_CLASSES = currentGame === 'mkworld' ? ['150cc'] as const : ['150cc', '200cc'] as const;
    const allTracks = mkGame.cups.flatMap((c) => c.tracks);
    const ttTotal = allTracks.length * TIME_TRIAL_CLASSES.length;
    const ttCompleted = allTracks.reduce((sum, t) => {
      return sum + TIME_TRIAL_CLASSES.filter((ec) => col.has(`tt-${t.id}-${ec}`)).length;
    }, 0);

    const total = gpTotal + koTotal + ttTotal;
    const completedTotal = gpCompleted + koCompleted + ttCompleted;
    const percentage = total > 0 ? Math.round((completedTotal / total) * 100) : 0;

    return {
      collected: completedTotal,
      total,
      percentage,
      grandPrix: { completed: gpCompleted, total: gpTotal },
      timeTrials: { completed: ttCompleted, total: ttTotal },
      knockout: { completed: koCompleted, total: koTotal },
      hasKnockout,
    };
  })();

  // Calculate Pokemon stats (with all 100% completion sections)
  const pkmnStats = (() => {
    const defaultStats = {
      collected: 0, total: 0, percentage: 0,
      story: { completed: 0, total: 0 },
      legendaries: { completed: 0, total: 0 },
      postGame: { completed: 0, total: 0 },
      dlc: { completed: 0, total: 0 },
      collectibles: { completed: 0, total: 0 },
      raids: { completed: 0, total: 0 },
      recipes: { completed: 0, total: 0 },
      cosmetics: { completed: 0, total: 0 },
      sightseeing: { completed: 0, total: 0 },
      marksRibbons: { completed: 0, total: 0 },
      pokedex: { completed: 0, total: 0 },
    };
    if (!pkmnGame) return defaultStats;

    const col = progress.collected;

    // Story checkpoints
    const storyTotal = pkmnGame.storyCheckpoints.length;
    const storyCompleted = pkmnGame.storyCheckpoints.filter((c) => col.has(createStoryId(c.id))).length;

    // Legendaries
    const legendaryTotal = pkmnGame.legendaries.length;
    const legendaryCaught = pkmnGame.legendaries.filter((l) => col.has(createLegendaryId(l.id))).length;

    // Post-game
    const postGameTotal = pkmnGame.postGame.length;
    const postGameCompleted = pkmnGame.postGame.filter((i) => col.has(createPostGameId(i.id))).length;

    // DLC
    const dlcTotal = pkmnGame.dlcContent.length;
    const dlcCompleted = pkmnGame.dlcContent.filter((c) => col.has(createDLCId(c.id))).length;

    // Collectibles (Stakes, Towers, Tera, Taxi, Centers, Ditto)
    const collectiblesTotal = allStakes.length + gimmighoulTowers.length + wildTeraPokemon.length +
      flyingTaxiPoints.length + pokemonCenters.length + dittoSpawns.length;
    const collectiblesCompleted =
      allStakes.filter((s) => col.has(createStakeId(s.id))).length +
      gimmighoulTowers.filter((t) => col.has(createTowerId(t.id))).length +
      wildTeraPokemon.filter((t) => col.has(createTeraId(t.id))).length +
      flyingTaxiPoints.filter((t) => col.has(createTaxiId(t.id))).length +
      pokemonCenters.filter((c) => col.has(createCenterId(c.id))).length +
      dittoSpawns.filter((d) => col.has(createDittoId(d.id))).length;

    // 6-Star Raids
    const raidsTotal = pkmnGame.sixStarRaids?.length ?? 0;
    const raidsCompleted = pkmnGame.sixStarRaids?.filter((r) => col.has(createRaidId(r.id))).length ?? 0;

    // Recipes
    const recipesTotal = pkmnGame.sandwichRecipes?.length ?? 0;
    const recipesCompleted = pkmnGame.sandwichRecipes?.filter((r) => col.has(createRecipeId(r.number))).length ?? 0;

    // Cosmetics (Cases, Emotes, Tablecloths)
    const cosmeticsTotal = (pkmnGame.rotomCases?.length ?? 0) + (pkmnGame.emotes?.length ?? 0) + (pkmnGame.tablecloths?.length ?? 0);
    const cosmeticsCompleted =
      (pkmnGame.rotomCases?.filter((c) => col.has(createCaseId(c.id))).length ?? 0) +
      (pkmnGame.emotes?.filter((e) => col.has(createEmoteId(e.id))).length ?? 0) +
      (pkmnGame.tablecloths?.filter((t) => col.has(createTableclothId(t.id))).length ?? 0);

    // Sightseeing (Paldea Sights + Kitakami Wonders)
    const sightseeingTotal = (pkmnGame.paldeaSights?.length ?? 0) + (pkmnGame.kitakamiWonders?.length ?? 0);
    const sightseeingCompleted =
      (pkmnGame.paldeaSights?.filter((s) => col.has(createSightId(s.id))).length ?? 0) +
      (pkmnGame.kitakamiWonders?.filter((w) => col.has(createWonderId(w.id))).length ?? 0);

    // Marks & Ribbons
    const marksRibbonsTotal = (pkmnGame.marks?.length ?? 0) + (pkmnGame.ribbons?.length ?? 0);
    const marksRibbonsCompleted =
      (pkmnGame.marks?.filter((m) => col.has(createMarkId(m.id))).length ?? 0) +
      (pkmnGame.ribbons?.filter((r) => col.has(createRibbonId(r.id))).length ?? 0);

    // League Officials + Mini-games (added to post-game for overall count)
    const officialsTotal = pkmnGame.leagueOfficials?.length ?? 0;
    const officialsCompleted = pkmnGame.leagueOfficials?.filter((o) => col.has(createLeagueOfficialId(o.id))).length ?? 0;
    const miniGamesTotal = pkmnGame.miniGames?.length ?? 0;
    const miniGamesCompleted = pkmnGame.miniGames?.filter((g) => col.has(createMiniGameId(g.id))).length ?? 0;

    // Pokedex (Standard catches only for main count - shiny/HA are optional extras)
    const pokedexTotal = allPokedexEntries.length;
    const pokedexCompleted = allPokedexEntries.filter((p) => col.has(createPokedexId(p.id))).length;

    const total = storyTotal + legendaryTotal + postGameTotal + dlcTotal + collectiblesTotal +
      raidsTotal + recipesTotal + cosmeticsTotal + sightseeingTotal + marksRibbonsTotal +
      officialsTotal + miniGamesTotal + pokedexTotal;
    const completedTotal = storyCompleted + legendaryCaught + postGameCompleted + dlcCompleted + collectiblesCompleted +
      raidsCompleted + recipesCompleted + cosmeticsCompleted + sightseeingCompleted + marksRibbonsCompleted +
      officialsCompleted + miniGamesCompleted + pokedexCompleted;
    const percentage = total > 0 ? Math.round((completedTotal / total) * 100) : 0;

    return {
      collected: completedTotal,
      total,
      percentage,
      story: { completed: storyCompleted, total: storyTotal },
      legendaries: { completed: legendaryCaught, total: legendaryTotal },
      postGame: { completed: postGameCompleted + officialsCompleted + miniGamesCompleted, total: postGameTotal + officialsTotal + miniGamesTotal },
      dlc: { completed: dlcCompleted, total: dlcTotal },
      collectibles: { completed: collectiblesCompleted, total: collectiblesTotal },
      raids: { completed: raidsCompleted, total: raidsTotal },
      recipes: { completed: recipesCompleted, total: recipesTotal },
      cosmetics: { completed: cosmeticsCompleted, total: cosmeticsTotal },
      sightseeing: { completed: sightseeingCompleted, total: sightseeingTotal },
      marksRibbons: { completed: marksRibbonsCompleted, total: marksRibbonsTotal },
      pokedex: { completed: pokedexCompleted, total: pokedexTotal },
    };
  })();

  // Calculate overall value-based progress (Multi Moons count as 3)
  const overallStats = (() => {
    if (isMK) return mkStats;
    if (isPKMN) return pkmnStats;
    if (!game || !stats) return { collected: 0, total: 0, percentage: 0 };

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

    const totalCollected = moonsCollected + coinsCollected + capturesCollected + outfitsCollected + checkpointsCollected + paintingsCollected + souvenirsCollected + stickersCollected + musicCollected;
    const totalPossible = totalMoonValue + stats.totalPurpleCoins + stats.totalCaptures + stats.totalOutfits + stats.totalCheckpoints + stats.totalPaintings + stats.totalSouvenirs + stats.totalStickers + stats.totalMusic;

    return { collected: totalCollected, total: totalPossible };
  })();

  // Compute completion percentages for all games (shown in game selector)
  const gamePercentages = useMemo(() => {
    const pcts: Record<string, number> = {};

    // Standard GameData games (SMO)
    for (const g of games) {
      const col = allProgress[g.id]?.collected ?? new Set<string>();
      const gameStats = getGameStats(g.id);
      if (!gameStats) { pcts[g.id] = 0; continue; }
      const moonCollectibles = g.collectibles.filter(c => c.type === 'moon');
      const moonsCollected = calculateCollectedValue(col, moonCollectibles);
      const totalMoonValue = calculateTotalValue(moonCollectibles);
      const otherTypes = ['purple_coin', 'capture', 'outfit', 'checkpoint', 'painting', 'souvenir', 'sticker', 'music'] as const;
      let otherCollected = 0, otherTotal = 0;
      for (const t of otherTypes) {
        const items = g.collectibles.filter(c => c.type === t);
        otherCollected += items.filter(c => col.has(c.id)).length;
        otherTotal += items.length;
      }
      const total = totalMoonValue + otherTotal;
      const collected = moonsCollected + otherCollected;
      pcts[g.id] = total > 0 ? (collected / total) * 100 : 0;
    }

    // Mario Kart games
    for (const mkG of marioKartGames) {
      const col = allProgress[mkG.id]?.collected ?? new Set<string>();
      const gpTotal = mkG.cups.length * mkG.engineClasses.length;
      const gpCompleted = mkG.cups.reduce((sum, cup) =>
        sum + mkG.engineClasses.filter(ec => col.has(createCupCompletionId(cup.id, ec))).length, 0);
      let koTotal = 0, koCompleted = 0;
      if (mkG.knockoutRallies && mkG.knockoutEngineClasses) {
        koTotal = mkG.knockoutRallies.length * mkG.knockoutEngineClasses.length;
        koCompleted = mkG.knockoutRallies.reduce((sum, rally) =>
          sum + mkG.knockoutEngineClasses!.filter(ec => col.has(createCupCompletionId(rally.id, ec))).length, 0);
      }
      const ttClasses = mkG.id === 'mkworld' ? ['150cc'] as const : ['150cc', '200cc'] as const;
      const allTracks = mkG.cups.flatMap(c => c.tracks);
      const ttTotal = allTracks.length * ttClasses.length;
      const ttCompleted = allTracks.reduce((sum, t) =>
        sum + ttClasses.filter(ec => col.has(`tt-${t.id}-${ec}`)).length, 0);
      const total = gpTotal + koTotal + ttTotal;
      const collected = gpCompleted + koCompleted + ttCompleted;
      pcts[mkG.id] = total > 0 ? (collected / total) * 100 : 0;
    }

    // Pokemon games
    for (const pkG of pokemonGames) {
      const col = allProgress[pkG.id]?.collected ?? new Set<string>();
      const storyDone = pkG.storyCheckpoints.filter(c => col.has(createStoryId(c.id))).length;
      const legendDone = pkG.legendaries.filter(l => col.has(createLegendaryId(l.id))).length;
      const postDone = pkG.postGame.filter(i => col.has(createPostGameId(i.id))).length;
      const dlcDone = pkG.dlcContent.filter(c => col.has(createDLCId(c.id))).length;
      const collDone =
        allStakes.filter(s => col.has(createStakeId(s.id))).length +
        gimmighoulTowers.filter(t => col.has(createTowerId(t.id))).length +
        wildTeraPokemon.filter(t => col.has(createTeraId(t.id))).length +
        flyingTaxiPoints.filter(t => col.has(createTaxiId(t.id))).length +
        pokemonCenters.filter(c => col.has(createCenterId(c.id))).length +
        dittoSpawns.filter(d => col.has(createDittoId(d.id))).length;
      const collTotal = allStakes.length + gimmighoulTowers.length + wildTeraPokemon.length +
        flyingTaxiPoints.length + pokemonCenters.length + dittoSpawns.length;
      const raidsDone = pkG.sixStarRaids?.filter(r => col.has(createRaidId(r.id))).length ?? 0;
      const recipesDone = pkG.sandwichRecipes?.filter(r => col.has(createRecipeId(r.number))).length ?? 0;
      const cosmDone =
        (pkG.rotomCases?.filter(c => col.has(createCaseId(c.id))).length ?? 0) +
        (pkG.emotes?.filter(e => col.has(createEmoteId(e.id))).length ?? 0) +
        (pkG.tablecloths?.filter(t => col.has(createTableclothId(t.id))).length ?? 0);
      const sightsDone =
        (pkG.paldeaSights?.filter(s => col.has(createSightId(s.id))).length ?? 0) +
        (pkG.kitakamiWonders?.filter(w => col.has(createWonderId(w.id))).length ?? 0);
      const marksDone =
        (pkG.marks?.filter(m => col.has(createMarkId(m.id))).length ?? 0) +
        (pkG.ribbons?.filter(r => col.has(createRibbonId(r.id))).length ?? 0);
      const offDone = pkG.leagueOfficials?.filter(o => col.has(createLeagueOfficialId(o.id))).length ?? 0;
      const miniDone = pkG.miniGames?.filter(g => col.has(createMiniGameId(g.id))).length ?? 0;
      const dexDone = allPokedexEntries.filter(p => col.has(createPokedexId(p.id))).length;
      const total = pkG.storyCheckpoints.length + pkG.legendaries.length + pkG.postGame.length +
        pkG.dlcContent.length + collTotal +
        (pkG.sixStarRaids?.length ?? 0) + (pkG.sandwichRecipes?.length ?? 0) +
        (pkG.rotomCases?.length ?? 0) + (pkG.emotes?.length ?? 0) + (pkG.tablecloths?.length ?? 0) +
        (pkG.paldeaSights?.length ?? 0) + (pkG.kitakamiWonders?.length ?? 0) +
        (pkG.marks?.length ?? 0) + (pkG.ribbons?.length ?? 0) +
        (pkG.leagueOfficials?.length ?? 0) + (pkG.miniGames?.length ?? 0) +
        allPokedexEntries.length;
      const collected = storyDone + legendDone + postDone + dlcDone + collDone +
        raidsDone + recipesDone + cosmDone + sightsDone + marksDone + offDone + miniDone + dexDone;
      pcts[pkG.id] = total > 0 ? (collected / total) * 100 : 0;
    }

    return pcts;
  }, [allProgress]);

  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    kingdoms: true,
    filters: false,
    pokemonSections: true,
    marioKartSections: true,
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const getKingdomProgress = (kingdom: Kingdom) => {
    if (!currentGame) return { moons: 0, totalMoons: 0, coins: 0, totalCoins: 0 };

    const collectibles = getCollectiblesForKingdom(currentGame, kingdom.id);
    const moons = collectibles.filter((c) => c.type === 'moon');
    const coins = collectibles.filter((c) => c.type === 'purple_coin');

    // Use value-based counting for moons (Multi Moons count as 3)
    const collectedMoons = calculateCollectedValue(progress.collected, moons);
    const totalMoons = calculateTotalValue(moons);
    const collectedCoins = coins.filter((c) => progress.collected.has(c.id)).length;

    return {
      moons: collectedMoons,
      totalMoons: totalMoons,
      coins: collectedCoins,
      totalCoins: coins.length,
    };
  };

  if (!sidebarOpen) {
    return (
      <button
        onClick={() => setSidebarOpen(true)}
        className="fixed left-4 top-4 z-50 p-2 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors"
      >
        <Menu className="w-6 h-6" />
      </button>
    );
  }

  return (
    <aside className="w-72 bg-zinc-900 border-r border-zinc-800 flex flex-col h-screen overflow-hidden">
      {/* Header */}
      <div className="px-3 py-2 border-b border-zinc-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Map className="w-5 h-5 text-yellow-500" />
          <h1 className="font-bold text-sm">Game Tracker</h1>
        </div>
        <button
          onClick={() => setSidebarOpen(false)}
          className="p-1 hover:bg-zinc-800 rounded transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Game Selector */}
      <div className="px-3 py-2 border-b border-zinc-800">
        <div className="flex items-center gap-2 mb-2">
          <Gamepad2 className="w-4 h-4 text-zinc-400" />
          <span className="text-xs text-zinc-400 uppercase tracking-wide">Select Game</span>
        </div>
        <div className="grid gap-1">
          {/* SMO & other GameData games */}
          {games.map((g) => (
            <button
              key={g.id}
              onClick={() => {
                setCurrentGame(g.id);
                setCurrentKingdom(null);
              }}
              className={`w-full px-2 py-1.5 rounded text-left text-sm transition-colors flex items-center gap-2 ${
                currentGame === g.id
                  ? 'bg-yellow-500/20 text-yellow-400 font-medium'
                  : 'hover:bg-zinc-800 text-zinc-300'
              }`}
            >
              <Globe className="w-3 h-3 shrink-0" />
              <span className="flex-1 truncate">{g.name}</span>
              <span className={`text-[11px] shrink-0 ${currentGame === g.id ? 'text-yellow-400' : 'text-zinc-500'}`}>{(gamePercentages[g.id] ?? 0).toFixed(1)}%</span>
            </button>
          ))}
          {/* Mario Kart Games */}
          {marioKartGames.map((g) => (
            <button
              key={g.id}
              onClick={() => {
                setCurrentGame(g.id);
                setCurrentKingdom(null);
              }}
              className={`w-full px-2 py-1.5 rounded text-left text-sm transition-colors flex items-center gap-2 ${
                currentGame === g.id
                  ? 'bg-yellow-500/20 text-yellow-400 font-medium'
                  : 'hover:bg-zinc-800 text-zinc-300'
              }`}
            >
              <Flag className="w-3 h-3 shrink-0" />
              <span className="flex-1 truncate">{g.name}</span>
              <span className={`text-[11px] shrink-0 ${currentGame === g.id ? 'text-yellow-400' : 'text-zinc-500'}`}>{(gamePercentages[g.id] ?? 0).toFixed(1)}%</span>
            </button>
          ))}
          {/* Pokemon Games */}
          {pokemonGames.map((g) => (
            <button
              key={g.id}
              onClick={() => {
                setCurrentGame(g.id);
                setCurrentKingdom(null);
              }}
              className={`w-full px-2 py-1.5 rounded text-left text-sm transition-colors flex items-center gap-2 ${
                currentGame === g.id
                  ? 'bg-violet-500/20 text-violet-400 font-medium'
                  : 'hover:bg-zinc-800 text-zinc-300'
              }`}
            >
              <Sparkles className="w-3 h-3 shrink-0" />
              <span className="flex-1 truncate">{g.name}</span>
              <span className={`text-[11px] shrink-0 ${currentGame === g.id ? 'text-violet-400' : 'text-zinc-500'}`}>{(gamePercentages[g.id] ?? 0).toFixed(1)}%</span>
            </button>
          ))}
        </div>
      </div>

      {/* Game Info */}
      {(game || mkGame || pkmnGame) && (
        <div className="px-3 py-2 border-b border-zinc-800">
          <h2 className={`font-semibold text-sm ${isPKMN ? 'text-violet-400' : 'text-yellow-400'}`}>
            {game?.name || mkGame?.name || pkmnGame?.name}
          </h2>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-zinc-400">
              {overallStats.collected}/{overallStats.total}
            </span>
            <div className="flex-1 bg-zinc-800 rounded-full h-1.5">
              <div
                className={`${isPKMN ? 'bg-violet-500' : 'bg-yellow-500'} h-1.5 rounded-full transition-all duration-300`}
                style={{
                  width: `${overallStats.total > 0 ? (overallStats.collected / overallStats.total) * 100 : 0}%`,
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Kingdoms List - Only for SMO games */}
      <div className="flex-1 overflow-y-auto">
        {!isMK && !isPKMN && (
          <button
            onClick={() => toggleSection('kingdoms')}
            className="w-full px-3 py-2 flex items-center justify-between hover:bg-zinc-800 transition-colors"
          >
            <span className="font-medium text-sm">Kingdoms</span>
            {expandedSections.kingdoms ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>
        )}

        {!isMK && !isPKMN && expandedSections.kingdoms && game && (
          <div className="px-2 pb-2">
            {/* All Collectibles Option */}
            <button
              onClick={() => setCurrentKingdom(null)}
              className={`w-full px-2 py-1.5 rounded-md flex items-center gap-2 transition-colors ${
                currentKingdom === null
                  ? 'bg-yellow-500/20 text-yellow-400'
                  : 'hover:bg-zinc-800'
              }`}
            >
              <div className="w-6 h-6 rounded flex items-center justify-center bg-gradient-to-br from-yellow-500 to-orange-500">
                <Search className="w-3 h-3 text-white" />
              </div>
              <div className="flex-1 text-left">
                <div className="font-medium text-sm">All Collectibles</div>
                <div className="text-[10px] text-zinc-400">
                  {overallStats.collected}/{overallStats.total}
                </div>
              </div>
            </button>

            {/* Kingdom List */}
            {game.kingdoms.map((kingdom) => {
              const prog = getKingdomProgress(kingdom);
              const isSelected = currentKingdom === kingdom.id;
              const isKingdomComplete = prog.moons === prog.totalMoons && prog.totalMoons > 0;

              return (
                <button
                  key={kingdom.id}
                  onClick={() => setCurrentKingdom(kingdom.id)}
                  className={`w-full px-2 py-1.5 rounded-md flex items-center gap-2 transition-colors ${
                    isSelected ? 'bg-yellow-500/20 text-yellow-400' : 'hover:bg-zinc-800'
                  }`}
                >
                  <div
                    className="w-6 h-6 rounded flex items-center justify-center"
                    style={{ backgroundColor: kingdom.color + '40' }}
                  >
                    <Moon className="w-3 h-3" style={{ color: kingdom.color }} />
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <div className="font-medium text-sm truncate">{kingdom.shortName}</div>
                    <div className="text-[10px] text-zinc-400 flex items-center gap-1.5">
                      <span className="flex items-center gap-0.5">
                        <Moon className="w-2.5 h-2.5" />
                        {prog.moons}/{prog.totalMoons}
                      </span>
                      {kingdom.purpleCoinCount > 0 && (
                        <span className="flex items-center gap-0.5 text-purple-400">
                          <Coins className="w-2.5 h-2.5" />
                          {prog.coins}/{prog.totalCoins}
                        </span>
                      )}
                    </div>
                  </div>
                  {isKingdomComplete && (
                    <span className="text-green-400 text-[10px]">100%</span>
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* Mario Kart Sections - Like Kingdoms */}
        {isMK && mkGame && (
          <>
            <button
              onClick={() => toggleSection('marioKartSections')}
              className="w-full px-3 py-2 flex items-center justify-between hover:bg-zinc-800 transition-colors"
            >
              <span className="font-medium text-sm">Sections</span>
              {expandedSections.marioKartSections ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>

            {expandedSections.marioKartSections && (
              <div className="px-2 pb-2">
                {/* All Items Option */}
                <button
                  onClick={() => setCurrentMarioKartSection(null)}
                  className={`w-full px-2 py-1.5 rounded-md flex items-center gap-2 transition-colors ${
                    currentMarioKartSection === null
                      ? 'bg-yellow-500/20 text-yellow-400'
                      : 'hover:bg-zinc-800'
                  }`}
                >
                  <div className="w-6 h-6 rounded bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
                    <Search className="w-3 h-3 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-medium text-sm">All Items</div>
                    <div className="text-[10px] text-zinc-400">
                      {mkStats.collected}/{mkStats.total}
                    </div>
                  </div>
                </button>

                {/* Grand Prix */}
                <button
                  onClick={() => setCurrentMarioKartSection('grand-prix')}
                  className={`w-full px-2 py-1.5 rounded-md flex items-center gap-2 transition-colors ${
                    currentMarioKartSection === 'grand-prix'
                      ? 'bg-yellow-500/20 text-yellow-400'
                      : 'hover:bg-zinc-800'
                  }`}
                >
                  <div className="w-6 h-6 rounded bg-yellow-500/40 flex items-center justify-center">
                    <Trophy className="w-3 h-3 text-yellow-400" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-medium text-sm">Grand Prix</div>
                    <div className="text-[10px] text-zinc-400">
                      {mkStats.grandPrix.completed}/{mkStats.grandPrix.total}
                    </div>
                  </div>
                  {mkStats.grandPrix.completed === mkStats.grandPrix.total && mkStats.grandPrix.total > 0 && (
                    <span className="text-green-400 text-[10px]">100%</span>
                  )}
                </button>

                {/* Time Trials */}
                <button
                  onClick={() => setCurrentMarioKartSection('time-trials')}
                  className={`w-full px-2 py-1.5 rounded-md flex items-center gap-2 transition-colors ${
                    currentMarioKartSection === 'time-trials'
                      ? 'bg-blue-500/20 text-blue-400'
                      : 'hover:bg-zinc-800'
                  }`}
                >
                  <div className="w-6 h-6 rounded bg-blue-500/40 flex items-center justify-center">
                    <Timer className="w-3 h-3 text-blue-400" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-medium text-sm">Time Trials</div>
                    <div className="text-[10px] text-zinc-400">
                      {mkStats.timeTrials.completed}/{mkStats.timeTrials.total}
                    </div>
                  </div>
                  {mkStats.timeTrials.completed === mkStats.timeTrials.total && mkStats.timeTrials.total > 0 && (
                    <span className="text-green-400 text-[10px]">100%</span>
                  )}
                </button>

                {/* Knockout (if applicable) */}
                {mkStats.hasKnockout && (
                  <button
                    onClick={() => setCurrentMarioKartSection('knockout')}
                    className={`w-full px-2 py-1.5 rounded-md flex items-center gap-2 transition-colors ${
                      currentMarioKartSection === 'knockout'
                        ? 'bg-purple-500/20 text-purple-400'
                        : 'hover:bg-zinc-800'
                    }`}
                  >
                    <div className="w-6 h-6 rounded bg-purple-500/40 flex items-center justify-center">
                      <Flag className="w-3 h-3 text-purple-400" />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-medium text-sm">Knockout</div>
                      <div className="text-[10px] text-zinc-400">
                        {mkStats.knockout.completed}/{mkStats.knockout.total}
                      </div>
                    </div>
                    {mkStats.knockout.completed === mkStats.knockout.total && mkStats.knockout.total > 0 && (
                      <span className="text-green-400 text-[10px]">100%</span>
                    )}
                  </button>
                )}
              </div>
            )}
          </>
        )}

        {/* Pokemon Sections - Like Kingdoms */}
        {isPKMN && pkmnGame && (
          <>
            <button
              onClick={() => toggleSection('pokemonSections')}
              className="w-full px-3 py-2 flex items-center justify-between hover:bg-zinc-800 transition-colors"
            >
              <span className="font-medium text-sm">Sections</span>
              {expandedSections.pokemonSections ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>

            {expandedSections.pokemonSections && (
              <div className="px-2 pb-2">
                {/* All Items Option */}
                <button
                  onClick={() => setCurrentPokemonSection(null)}
                  className={`w-full px-2 py-1.5 rounded-md flex items-center gap-2 transition-colors ${
                    currentPokemonSection === null
                      ? 'bg-violet-500/20 text-violet-400'
                      : 'hover:bg-zinc-800'
                  }`}
                >
                  <div className="w-6 h-6 rounded bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center">
                    <Search className="w-3 h-3 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-medium text-sm">All Items</div>
                    <div className="text-[10px] text-zinc-400">
                      {pkmnStats.collected}/{pkmnStats.total}
                    </div>
                  </div>
                </button>

                {/* Story */}
                <button
                  onClick={() => setCurrentPokemonSection('story')}
                  className={`w-full px-2 py-1.5 rounded-md flex items-center gap-2 transition-colors ${
                    currentPokemonSection === 'story'
                      ? 'bg-violet-500/20 text-violet-400'
                      : 'hover:bg-zinc-800'
                  }`}
                >
                  <div className="w-6 h-6 rounded bg-violet-500/40 flex items-center justify-center">
                    <Swords className="w-3 h-3 text-violet-400" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-medium text-sm">Story</div>
                    <div className="text-[10px] text-zinc-400">
                      {pkmnStats.story.completed}/{pkmnStats.story.total}
                    </div>
                  </div>
                  {pkmnStats.story.completed === pkmnStats.story.total && pkmnStats.story.total > 0 && (
                    <span className="text-green-400 text-[10px]">100%</span>
                  )}
                </button>

                {/* Legendaries */}
                <button
                  onClick={() => setCurrentPokemonSection('legendaries')}
                  className={`w-full px-2 py-1.5 rounded-md flex items-center gap-2 transition-colors ${
                    currentPokemonSection === 'legendaries'
                      ? 'bg-yellow-500/20 text-yellow-400'
                      : 'hover:bg-zinc-800'
                  }`}
                >
                  <div className="w-6 h-6 rounded bg-yellow-500/40 flex items-center justify-center">
                    <Crown className="w-3 h-3 text-yellow-400" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-medium text-sm">Legendaries</div>
                    <div className="text-[10px] text-zinc-400">
                      {pkmnStats.legendaries.completed}/{pkmnStats.legendaries.total}
                    </div>
                  </div>
                  {pkmnStats.legendaries.completed === pkmnStats.legendaries.total && pkmnStats.legendaries.total > 0 && (
                    <span className="text-green-400 text-[10px]">100%</span>
                  )}
                </button>

                {/* Post-Game */}
                <button
                  onClick={() => setCurrentPokemonSection('post-game')}
                  className={`w-full px-2 py-1.5 rounded-md flex items-center gap-2 transition-colors ${
                    currentPokemonSection === 'post-game'
                      ? 'bg-orange-500/20 text-orange-400'
                      : 'hover:bg-zinc-800'
                  }`}
                >
                  <div className="w-6 h-6 rounded bg-orange-500/40 flex items-center justify-center">
                    <Star className="w-3 h-3 text-orange-400" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-medium text-sm">Post-Game</div>
                    <div className="text-[10px] text-zinc-400">
                      {pkmnStats.postGame.completed}/{pkmnStats.postGame.total}
                    </div>
                  </div>
                  {pkmnStats.postGame.completed === pkmnStats.postGame.total && pkmnStats.postGame.total > 0 && (
                    <span className="text-green-400 text-[10px]">100%</span>
                  )}
                </button>

                {/* DLC */}
                <button
                  onClick={() => setCurrentPokemonSection('dlc')}
                  className={`w-full px-2 py-1.5 rounded-md flex items-center gap-2 transition-colors ${
                    currentPokemonSection === 'dlc'
                      ? 'bg-teal-500/20 text-teal-400'
                      : 'hover:bg-zinc-800'
                  }`}
                >
                  <div className="w-6 h-6 rounded bg-teal-500/40 flex items-center justify-center">
                    <Gift className="w-3 h-3 text-teal-400" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-medium text-sm">DLC</div>
                    <div className="text-[10px] text-zinc-400">
                      {pkmnStats.dlc.completed}/{pkmnStats.dlc.total}
                    </div>
                  </div>
                  {pkmnStats.dlc.completed === pkmnStats.dlc.total && pkmnStats.dlc.total > 0 && (
                    <span className="text-green-400 text-[10px]">100%</span>
                  )}
                </button>

                {/* Collectibles */}
                <button
                  onClick={() => setCurrentPokemonSection('collectibles')}
                  className={`w-full px-2 py-1.5 rounded-md flex items-center gap-2 transition-colors ${
                    currentPokemonSection === 'collectibles'
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : 'hover:bg-zinc-800'
                  }`}
                >
                  <div className="w-6 h-6 rounded bg-emerald-500/40 flex items-center justify-center">
                    <Milestone className="w-3 h-3 text-emerald-400" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-medium text-sm">Collectibles</div>
                    <div className="text-[10px] text-zinc-400">
                      {pkmnStats.collectibles.completed}/{pkmnStats.collectibles.total}
                    </div>
                  </div>
                  {pkmnStats.collectibles.completed === pkmnStats.collectibles.total && pkmnStats.collectibles.total > 0 && (
                    <span className="text-green-400 text-[10px]">100%</span>
                  )}
                </button>

                {/* 6-Star Raids */}
                <button
                  onClick={() => setCurrentPokemonSection('raids')}
                  className={`w-full px-2 py-1.5 rounded-md flex items-center gap-2 transition-colors ${
                    currentPokemonSection === 'raids'
                      ? 'bg-red-500/20 text-red-400'
                      : 'hover:bg-zinc-800'
                  }`}
                >
                  <div className="w-6 h-6 rounded bg-red-500/40 flex items-center justify-center">
                    <Zap className="w-3 h-3 text-red-400" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-medium text-sm">6-Star Raids</div>
                    <div className="text-[10px] text-zinc-400">
                      {pkmnStats.raids.completed}/{pkmnStats.raids.total}
                    </div>
                  </div>
                  {pkmnStats.raids.completed === pkmnStats.raids.total && pkmnStats.raids.total > 0 && (
                    <span className="text-green-400 text-[10px]">100%</span>
                  )}
                </button>

                {/* Pokedex */}
                <button
                  onClick={() => setCurrentPokemonSection('pokedex')}
                  className={`w-full px-2 py-1.5 rounded-md flex items-center gap-2 transition-colors ${
                    currentPokemonSection === 'pokedex'
                      ? 'bg-blue-500/20 text-blue-400'
                      : 'hover:bg-zinc-800'
                  }`}
                >
                  <div className="w-6 h-6 rounded bg-blue-500/40 flex items-center justify-center">
                    <BookOpen className="w-3 h-3 text-blue-400" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-medium text-sm">Pokedex</div>
                    <div className="text-[10px] text-zinc-400">
                      {pkmnStats.pokedex.completed}/{pkmnStats.pokedex.total}
                    </div>
                  </div>
                  {pkmnStats.pokedex.completed === pkmnStats.pokedex.total && pkmnStats.pokedex.total > 0 && (
                    <span className="text-green-400 text-[10px]">100%</span>
                  )}
                </button>

                {/* Recipes */}
                <button
                  onClick={() => setCurrentPokemonSection('recipes')}
                  className={`w-full px-2 py-1.5 rounded-md flex items-center gap-2 transition-colors ${
                    currentPokemonSection === 'recipes'
                      ? 'bg-amber-500/20 text-amber-400'
                      : 'hover:bg-zinc-800'
                  }`}
                >
                  <div className="w-6 h-6 rounded bg-amber-500/40 flex items-center justify-center">
                    <UtensilsCrossed className="w-3 h-3 text-amber-400" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-medium text-sm">Recipes</div>
                    <div className="text-[10px] text-zinc-400">
                      {pkmnStats.recipes.completed}/{pkmnStats.recipes.total}
                    </div>
                  </div>
                  {pkmnStats.recipes.completed === pkmnStats.recipes.total && pkmnStats.recipes.total > 0 && (
                    <span className="text-green-400 text-[10px]">100%</span>
                  )}
                </button>

                {/* Cosmetics */}
                <button
                  onClick={() => setCurrentPokemonSection('cosmetics')}
                  className={`w-full px-2 py-1.5 rounded-md flex items-center gap-2 transition-colors ${
                    currentPokemonSection === 'cosmetics'
                      ? 'bg-pink-500/20 text-pink-400'
                      : 'hover:bg-zinc-800'
                  }`}
                >
                  <div className="w-6 h-6 rounded bg-pink-500/40 flex items-center justify-center">
                    <Smartphone className="w-3 h-3 text-pink-400" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-medium text-sm">Cosmetics</div>
                    <div className="text-[10px] text-zinc-400">
                      {pkmnStats.cosmetics.completed}/{pkmnStats.cosmetics.total}
                    </div>
                  </div>
                  {pkmnStats.cosmetics.completed === pkmnStats.cosmetics.total && pkmnStats.cosmetics.total > 0 && (
                    <span className="text-green-400 text-[10px]">100%</span>
                  )}
                </button>

                {/* Sightseeing */}
                <button
                  onClick={() => setCurrentPokemonSection('sightseeing')}
                  className={`w-full px-2 py-1.5 rounded-md flex items-center gap-2 transition-colors ${
                    currentPokemonSection === 'sightseeing'
                      ? 'bg-cyan-500/20 text-cyan-400'
                      : 'hover:bg-zinc-800'
                  }`}
                >
                  <div className="w-6 h-6 rounded bg-cyan-500/40 flex items-center justify-center">
                    <Eye className="w-3 h-3 text-cyan-400" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-medium text-sm">Sightseeing</div>
                    <div className="text-[10px] text-zinc-400">
                      {pkmnStats.sightseeing.completed}/{pkmnStats.sightseeing.total}
                    </div>
                  </div>
                  {pkmnStats.sightseeing.completed === pkmnStats.sightseeing.total && pkmnStats.sightseeing.total > 0 && (
                    <span className="text-green-400 text-[10px]">100%</span>
                  )}
                </button>

                {/* Marks & Ribbons */}
                <button
                  onClick={() => setCurrentPokemonSection('marks-ribbons')}
                  className={`w-full px-2 py-1.5 rounded-md flex items-center gap-2 transition-colors ${
                    currentPokemonSection === 'marks-ribbons'
                      ? 'bg-indigo-500/20 text-indigo-400'
                      : 'hover:bg-zinc-800'
                  }`}
                >
                  <div className="w-6 h-6 rounded bg-indigo-500/40 flex items-center justify-center">
                    <Medal className="w-3 h-3 text-indigo-400" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-medium text-sm">Marks & Ribbons</div>
                    <div className="text-[10px] text-zinc-400">
                      {pkmnStats.marksRibbons.completed}/{pkmnStats.marksRibbons.total}
                    </div>
                  </div>
                  {pkmnStats.marksRibbons.completed === pkmnStats.marksRibbons.total && pkmnStats.marksRibbons.total > 0 && (
                    <span className="text-green-400 text-[10px]">100%</span>
                  )}
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Footer */}
      <div className="px-3 py-2 border-t border-zinc-800 text-[10px] text-zinc-500">
        <p>Data saved locally</p>
      </div>
    </aside>
  );
}
