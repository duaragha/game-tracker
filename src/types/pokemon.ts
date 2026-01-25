// Pokemon Violet/Scarlet specific types

export type PokemonGameId = 'pokemon-violet' | 'pokemon-scarlet';

// Pokemon types
export type PokemonType =
  | 'normal' | 'fire' | 'water' | 'electric' | 'grass' | 'ice'
  | 'fighting' | 'poison' | 'ground' | 'flying' | 'psychic' | 'bug'
  | 'rock' | 'ghost' | 'dragon' | 'dark' | 'steel' | 'fairy';

// Story path types (the 3 main storylines + finale)
export type StoryPath = 'victory-road' | 'starfall-street' | 'path-of-legends' | 'the-way-home';

// Region types
export type PokemonRegion = 'paldea' | 'kitakami' | 'blueberry';

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

// Collectible category type
export type CollectibleCategory = 'stakes' | 'watchtowers' | 'tera-pokemon' | 'taxi-points' | 'pokemon-centers' | 'ditto-spawns';

// Full Pokemon game definition
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
  };
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
