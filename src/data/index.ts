import { GameData } from '@/types';
import { MarioKartGame } from '@/types/mario-kart';
import { PokemonGame, isPokemonGame } from '@/types/pokemon';
import { smoKingdoms } from './smo-kingdoms';
import { smoMoons, smoPurchasableMoons } from './smo-moons';
import { smoPurpleCoins } from './smo-purple-coins';
import { smoCaptures } from './smo-captures';
import { smoOutfits } from './smo-outfits';
import { smoCheckpoints } from './smo-checkpoints';
import { smoPaintings } from './smo-paintings';
import { smoSouvenirs } from './smo-souvenirs';
import { smoMusic } from './smo-music';
import { marioKart8Deluxe } from './mk8dx-cups';
import { marioKartWorld } from './mkworld-cups';
import { allPokemonAreas } from './pokemon-regions';
import { allStoryCheckpoints, postGameContent, allDLCContent } from './pokemon-story';
import { allLegendaries } from './pokemon-legendaries';

export const superMarioOdyssey: GameData = {
  id: 'smo',
  name: 'Super Mario Odyssey',
  shortName: 'SMO',
  kingdoms: smoKingdoms,
  collectibles: [
    ...smoMoons,
    ...smoPurchasableMoons,
    ...smoPurpleCoins,
    ...smoCaptures,
    ...smoOutfits,
    ...smoCheckpoints,
    ...smoPaintings,
    ...smoSouvenirs,
    ...smoMusic,
  ],
};

// All available games
export const games: GameData[] = [superMarioOdyssey];

// Helper functions
export const getGame = (gameId: string): GameData | undefined =>
  games.find((g) => g.id === gameId);

export const getKingdom = (gameId: string, kingdomId: string) => {
  const game = getGame(gameId);
  return game?.kingdoms.find((k) => k.id === kingdomId);
};

export const getCollectiblesForKingdom = (gameId: string, kingdomId: string) => {
  const game = getGame(gameId);
  if (!game) return [];
  return game.collectibles.filter((c) => c.kingdom === kingdomId);
};

export const getCollectiblesByType = (gameId: string, type: string) => {
  const game = getGame(gameId);
  if (!game) return [];
  return game.collectibles.filter((c) => c.type === type);
};

// Stats
export const getGameStats = (gameId: string) => {
  const game = getGame(gameId);
  if (!game) return null;

  const moons = game.collectibles.filter((c) => c.type === 'moon');
  const purpleCoins = game.collectibles.filter((c) => c.type === 'purple_coin');
  const captures = game.collectibles.filter((c) => c.type === 'capture');
  const outfits = game.collectibles.filter((c) => c.type === 'outfit');
  const checkpoints = game.collectibles.filter((c) => c.type === 'checkpoint');
  const paintings = game.collectibles.filter((c) => c.type === 'painting');
  const souvenirs = game.collectibles.filter((c) => c.type === 'souvenir');
  const stickers = game.collectibles.filter((c) => c.type === 'sticker');
  const music = game.collectibles.filter((c) => c.type === 'music');

  // Calculate total moon VALUE (Multi Moons count as 3)
  const totalMoonValue = moons.reduce((sum, m) => sum + (m.value ?? 1), 0);

  return {
    totalMoons: totalMoonValue,
    totalPurpleCoins: purpleCoins.length,
    totalCaptures: captures.length,
    totalOutfits: outfits.length,
    totalCheckpoints: checkpoints.length,
    totalPaintings: paintings.length,
    totalSouvenirs: souvenirs.length,
    totalStickers: stickers.length,
    totalMusic: music.length,
    totalCollectibles: game.collectibles.length,
  };
};

export { smoKingdoms } from './smo-kingdoms';
export { smoMoons, smoPurchasableMoons } from './smo-moons';
export { smoPurpleCoins } from './smo-purple-coins';
export { smoCaptures } from './smo-captures';
export { smoOutfits } from './smo-outfits';
export { smoCheckpoints } from './smo-checkpoints';
export { smoPaintings } from './smo-paintings';
export { smoSouvenirs } from './smo-souvenirs';
export { smoMusic } from './smo-music';

// Mario Kart exports
export { marioKart8Deluxe } from './mk8dx-cups';
export { marioKartWorld } from './mkworld-cups';

// All Mario Kart games
export const marioKartGames: MarioKartGame[] = [marioKart8Deluxe, marioKartWorld];

// Helper to get a Mario Kart game by ID
export const getMarioKartGame = (gameId: string): MarioKartGame | undefined =>
  marioKartGames.find((g) => g.id === gameId);

// Check if a game is a Mario Kart game
export const isMarioKartGame = (gameId: string): boolean =>
  marioKartGames.some((g) => g.id === gameId);

// Pokemon Violet game definition
export const pokemonViolet: PokemonGame = {
  id: 'pokemon-violet',
  name: 'Pokémon Violet',
  shortName: 'Violet',
  areas: allPokemonAreas,
  storyCheckpoints: allStoryCheckpoints,
  legendaries: allLegendaries,
  postGame: postGameContent,
  dlcContent: allDLCContent,
  pokedexCounts: {
    paldea: 400,
    kitakami: 200,
    blueberry: 243,
  },
};

// All Pokemon games
export const pokemonGames: PokemonGame[] = [pokemonViolet];

// Helper to get a Pokemon game by ID
export const getPokemonGame = (gameId: string): PokemonGame | undefined =>
  pokemonGames.find((g) => g.id === gameId);

// Re-export isPokemonGame helper
export { isPokemonGame };

// Pokemon data exports
export { allPokemonAreas, paldeaAreas, kitakamiAreas, blueberryAreas } from './pokemon-regions';
export {
  allStoryCheckpoints,
  victoryRoadCheckpoints,
  pathOfLegendsCheckpoints,
  starfallStreetCheckpoints,
  theWayHomeCheckpoints,
  postGameContent,
  tealMaskContent,
  indigoDiskContent,
  mochiMayhemContent,
  allDLCContent,
} from './pokemon-story';
export {
  allLegendaries,
  paldeaLegendaries,
  kitakamiLegendaries,
  blueberryLegendaries,
  epilogueLegendaries,
} from './pokemon-legendaries';
export {
  allStakes,
  purpleStakes,
  yellowStakes,
  greenStakes,
  blueStakes,
  gimmighoulTowers,
  wildTeraPokemon,
  flyingTaxiPoints,
  pokemonCenters,
  dittoSpawns,
  collectibleCounts,
} from './pokemon-collectibles';
