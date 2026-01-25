// Core types for the game tracker

export type CollectibleType = 'moon' | 'purple_coin' | 'capture' | 'outfit' | 'souvenir' | 'sticker' | 'checkpoint' | 'painting' | 'music';

export type CollectibleCategory =
  | 'story'
  | 'post_game'
  | 'moon_rock'
  | 'shop'
  | 'hint_art'
  | 'toadette'
  | 'peach'
  | 'luigi_balloon';

export interface Position {
  x: number;
  y: number;
}

export interface Collectible {
  id: string;
  name: string;
  type: CollectibleType;
  kingdom: string;
  category?: CollectibleCategory;
  description?: string;
  position?: Position;
  hint?: string;
  videoUrl?: string;
  order?: number; // For moons, the in-game number
  guide?: string; // Step-by-step guide on how to get this collectible
  imageUrl?: string; // Image showing the collectible location
  value?: number; // For Multi Moons, this is 3 (defaults to 1)
}

export interface Kingdom {
  id: string;
  name: string;
  shortName: string;
  moonCount: number;
  purpleCoinCount: number;
  mapImage?: string;
  mapDimensions?: { width: number; height: number };
  color: string; // Moon color for this kingdom
  mapUrl?: string; // External map URL (e.g., IGN)
  coinDesign?: string; // Description of purple coin design
}

export interface GameData {
  id: string;
  name: string;
  shortName: string;
  coverImage?: string;
  kingdoms: Kingdom[];
  collectibles: Collectible[];
}

export interface UserProgress {
  gameId: string;
  collected: Set<string>; // Set of collectible IDs
  notes: Record<string, string>; // collectibleId -> note
  lastUpdated: Date;
}

export interface FilterState {
  showCollected: boolean;
  showUncollected: boolean;
  types: CollectibleType[];
  categories: CollectibleCategory[];
  searchQuery: string;
}

// Pokemon section types for sidebar navigation
export type PokemonSection = 'story' | 'legendaries' | 'post-game' | 'dlc' | 'collectibles' | null;

// Mario Kart section types for sidebar navigation
export type MarioKartSection = 'grand-prix' | 'time-trials' | 'knockout' | null;

export interface AppState {
  // Current selection
  currentGame: string | null;
  currentKingdom: string | null;
  currentPokemonSection: PokemonSection;
  currentMarioKartSection: MarioKartSection;

  // Progress data (persisted)
  progress: Record<string, UserProgress>; // gameId -> progress

  // UI state
  filters: FilterState;
  selectedCollectible: string | null;
  sidebarOpen: boolean;

  // Actions
  setCurrentGame: (gameId: string | null) => void;
  setCurrentKingdom: (kingdomId: string | null) => void;
  setCurrentPokemonSection: (section: PokemonSection) => void;
  setCurrentMarioKartSection: (section: MarioKartSection) => void;
  toggleCollected: (gameId: string, collectibleId: string) => void;
  setNote: (gameId: string, collectibleId: string, note: string) => void;
  setFilters: (filters: Partial<FilterState>) => void;
  setSelectedCollectible: (id: string | null) => void;
  setSidebarOpen: (open: boolean) => void;
  resetProgress: (gameId: string) => void;
  exportProgress: () => string;
  importProgress: (data: string) => boolean;
  syncToCloud: () => Promise<boolean>;
  syncFromCloud: () => Promise<boolean>;
}
