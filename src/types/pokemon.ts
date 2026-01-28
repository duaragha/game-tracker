// Pokemon Violet/Scarlet specific types

export type PokemonGameId = 'pokemon-violet' | 'pokemon-scarlet';

// Pokemon types
export type PokemonType =
  | 'normal' | 'fire' | 'water' | 'electric' | 'grass' | 'ice'
  | 'fighting' | 'poison' | 'ground' | 'flying' | 'psychic' | 'bug'
  | 'rock' | 'ghost' | 'dragon' | 'dark' | 'steel' | 'fairy';

// Story path types (the 3 main storylines + finale)
export type StoryPath = 'victory-road' | 'starfall-street' | 'path-of-legends' | 'the-way-home' | 'teal-mask' | 'indigo-disk' | 'epilogue' | 'gym-rematch' | 'gym-test-repeat';

// Region types
export type PokemonRegion = 'paldea' | 'kitakami' | 'blueberry' | 'national';

// Region/Area definition
export interface PokemonArea {
  id: string;
  name: string;
  shortName: string;
  region: PokemonRegion;
  color: string;
}

// Story checkpoint (gym, titan, team star, etc.)
export interface StoryCheckpoint {
  id: string;
  name: string;
  path: StoryPath;
  order: number;
  level?: number;
  type?: string; // e.g., 'Bug', 'Grass' for gyms
  location?: string;
  description?: string;
  reward?: string;
  isRematch?: boolean;
}

// Legendary Pokemon entry
export interface LegendaryPokemon {
  id: string;
  name: string;
  types: PokemonType[];
  region: PokemonRegion | 'epilogue';
  category: 'box' | 'ruinous' | 'loyal-three' | 'ogerpon' | 'paradox' | 'snacksworth' | 'story' | 'mythical';
  location?: string;
  requirement?: string;
  dlc?: 'teal-mask' | 'indigo-disk' | 'mochi-mayhem';
}

// Post-game content item
export interface PostGameItem {
  id: string;
  name: string;
  category: 'rematch' | 'tournament' | 'raid' | 'catch' | 'quest';
  description?: string;
  requirement?: string;
}

// DLC-specific content
export interface DLCContent {
  id: string;
  name: string;
  dlc: 'teal-mask' | 'indigo-disk' | 'mochi-mayhem';
  category: 'story' | 'elite-four' | 'legendary' | 'quest' | 'coach';
  description?: string;
  requirement?: string;
}

// Stake colors for Treasures of Ruin
export type StakeColor = 'purple' | 'yellow' | 'green' | 'blue';

// Ominous Black Stake
export interface OminousStake {
  id: string;
  color: StakeColor;
  number: number; // 1-8 for each color
  location: string;
  area: string;
  unlocks: string; // Which legendary it helps unlock
}

// Gimmighoul Watchtower
export interface GimmighoulTower {
  id: string;
  name: string;
  location: string;
  area: string;
  coinsAwarded: number;
}

// Wild Tera Pokemon (fixed spawns)
export interface WildTeraPokemon {
  id: string;
  pokemon: string;
  teraType: PokemonType;
  level: number;
  location: string;
  area: string;
}

// Flying Taxi Point
export interface FlyingTaxiPoint {
  id: string;
  name: string;
  area: string;
  region: PokemonRegion;
}

// Pokemon Center
export interface PokemonCenter {
  id: string;
  name: string;
  area: string;
  region: PokemonRegion;
}

// Ditto Spawn Location
export interface DittoSpawn {
  id: string;
  location: string;
  area: string;
  notes?: string;
}

// ============================================
// NEW TYPES FOR 100% COMPLETION
// ============================================

// Trainer Battle
export interface TrainerBattle {
  id: string;
  name: string;
  trainerClass: string;
  area: string;
  region: PokemonRegion;
  levelRange?: string;
}

// 6-Star Tera Raid
export interface SixStarRaid {
  id: string;
  pokemon: string;
  region: PokemonRegion;
}

// Technical Machine (TM)
export interface TechnicalMachine {
  id: string;
  number: number;
  name?: string;
}

// Sandwich Recipe
export interface SandwichRecipe {
  id: string;
  number: number;
  name?: string;
}

// Rotom Phone Case
export interface RotomPhoneCase {
  id: string;
  name: string;
  category?: string;
}

// Emote
export interface Emote {
  id: string;
  name: string;
}

// Tablecloth
export interface Tablecloth {
  id: string;
  name: string;
}

// Ten Sights of Paldea
export interface PaldeaSight {
  id: string;
  name: string;
  location?: string;
}

// Six Wonders of Kitakami
export interface KitakamiWonder {
  id: string;
  name: string;
  location?: string;
}

// Pokemon Mark
export interface PokemonMark {
  id: string;
  name: string;
}

// Pokemon Ribbon
export interface PokemonRibbon {
  id: string;
  name: string;
}

// Academy Class
export interface AcademyClass {
  id: string;
  name: string;
  subject: string;
  classNumber: number;
}

// League Challenge Official
export interface LeagueOfficial {
  id: string;
  name: string;
  location: string;
}

// Mini-game High Score
export interface MiniGame {
  id: string;
  name: string;
  category: 'olive-roll' | 'snow-slope' | 'ogre-oustin' | 'flying-trial';
}

// Pokedex Entry (for living dex tracking)
export interface PokedexEntry {
  id: string;
  dexNumber: number | string;
  name: string;
  region: PokemonRegion;
  hasHiddenAbility?: boolean;
}

// Collectible category type (expanded)
export type CollectibleCategory =
  | 'stakes' | 'watchtowers' | 'tera-pokemon' | 'taxi-points' | 'pokemon-centers' | 'ditto-spawns'
  | 'trainers' | 'raids' | 'tms' | 'recipes' | 'phone-cases' | 'emotes' | 'tablecloths'
  | 'sights' | 'wonders' | 'marks' | 'ribbons' | 'academy' | 'league-officials' | 'mini-games'
  | 'pokedex' | 'shiny-dex' | 'hidden-ability';

// Extended Pokemon section types for sidebar
export type PokemonSection =
  | 'story' | 'legendaries' | 'post-game' | 'dlc' | 'collectibles'
  | 'trainers' | 'raids' | 'tms' | 'recipes' | 'cosmetics' | 'sightseeing'
  | 'marks-ribbons' | 'academy' | 'pokedex'
  | null;

// Full Pokemon game definition (expanded)
export interface PokemonGame {
  id: PokemonGameId;
  name: string;
  shortName: string;
  areas: PokemonArea[];
  storyCheckpoints: StoryCheckpoint[];
  legendaries: LegendaryPokemon[];
  postGame: PostGameItem[];
  dlcContent: DLCContent[];
  pokedexCounts: {
    paldea: number;
    kitakami: number;
    blueberry: number;
    national: number;
    total: number;
  };
  // New fields for 100% completion
  trainers?: TrainerBattle[];
  sixStarRaids?: SixStarRaid[];
  sandwichRecipes?: SandwichRecipe[];
  rotomCases?: RotomPhoneCase[];
  emotes?: Emote[];
  tablecloths?: Tablecloth[];
  paldeaSights?: PaldeaSight[];
  kitakamiWonders?: KitakamiWonder[];
  marks?: PokemonMark[];
  ribbons?: PokemonRibbon[];
  academyClasses?: AcademyClass[];
  leagueOfficials?: LeagueOfficial[];
  miniGames?: MiniGame[];
}

// Helper to check if game is Pokemon
export const isPokemonGame = (gameId: string): boolean =>
  gameId === 'pokemon-violet' || gameId === 'pokemon-scarlet';

// Create unique IDs for different trackable items
export const createStoryId = (checkpointId: string): string => `story-${checkpointId}`;
export const createLegendaryId = (legendaryId: string): string => `legend-${legendaryId}`;
export const createPostGameId = (itemId: string): string => `postgame-${itemId}`;
export const createDLCId = (contentId: string): string => `dlc-${contentId}`;
export const createStakeId = (stakeId: string): string => `stake-${stakeId}`;
export const createTowerId = (towerId: string): string => `tower-${towerId}`;
export const createTeraId = (teraId: string): string => `tera-${teraId}`;
export const createTaxiId = (taxiId: string): string => `taxi-${taxiId}`;
export const createCenterId = (centerId: string): string => `center-${centerId}`;
export const createDittoId = (dittoId: string): string => `ditto-${dittoId}`;

// New ID creators for 100% completion
export const createTrainerId = (trainerId: string): string => `trainer-${trainerId}`;
export const createRaidId = (raidId: string): string => `raid-${raidId}`;
export const createTMId = (tmNumber: number): string => `tm-${tmNumber}`;
export const createRecipeId = (recipeNumber: number): string => `recipe-${recipeNumber}`;
export const createCaseId = (caseId: string): string => `case-${caseId}`;
export const createEmoteId = (emoteId: string): string => `emote-${emoteId}`;
export const createTableclothId = (clothId: string): string => `tablecloth-${clothId}`;
export const createSightId = (sightId: string): string => `sight-${sightId}`;
export const createWonderId = (wonderId: string): string => `wonder-${wonderId}`;
export const createMarkId = (markId: string): string => `mark-${markId}`;
export const createRibbonId = (ribbonId: string): string => `ribbon-${ribbonId}`;
export const createAcademyId = (classId: string): string => `academy-${classId}`;
export const createLeagueOfficialId = (officialId: string): string => `official-${officialId}`;
export const createMiniGameId = (gameId: string): string => `minigame-${gameId}`;
export const createPokedexId = (entryId: string): string => `dex-${entryId}`;
export const createShinyId = (entryId: string): string => `shiny-${entryId}`;
export const createHiddenAbilityId = (entryId: string): string => `ha-${entryId}`;
