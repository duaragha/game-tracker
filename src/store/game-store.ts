'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { AppState, FilterState, UserProgress, Collectible, PokemonSection, MarioKartSection, MKModeFilter, PKMNSectionFilter } from '@/types';

// Cloud sync functions
async function loadFromCloud(): Promise<Record<string, { collected: string[]; notes: Record<string, string>; lastUpdated: string }> | null> {
  try {
    const res = await fetch('/api/progress');
    const data = await res.json();
    if (data.success) return data.progress;
    return null;
  } catch {
    return null;
  }
}

async function saveToCloud(progress: Record<string, UserProgress>): Promise<boolean> {
  try {
    const serialized: Record<string, { gameId: string; collected: string[]; notes: Record<string, string>; lastUpdated: string }> = {};
    for (const [gameId, p] of Object.entries(progress)) {
      serialized[gameId] = {
        gameId: p.gameId,
        collected: Array.from(p.collected),
        notes: p.notes,
        lastUpdated: p.lastUpdated.toISOString(),
      };
    }
    const res = await fetch('/api/progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ progress: serialized }),
    });
    const data = await res.json();
    return data.success;
  } catch {
    return false;
  }
}

const defaultFilters: FilterState = {
  showCollected: true,
  showUncollected: true,
  types: ['moon', 'purple_coin', 'capture', 'outfit', 'checkpoint', 'painting', 'souvenir', 'sticker', 'music'],
  categories: ['story', 'post_game', 'moon_rock', 'shop', 'hint_art', 'toadette', 'peach', 'luigi_balloon'],
  searchQuery: '',
};

// Custom serialization for Set
const setToArray = (set: Set<string>): string[] => Array.from(set);
const arrayToSet = (arr: string[]): Set<string> => new Set(arr);

interface PersistedProgress {
  gameId: string;
  collected: string[];
  notes: Record<string, string>;
  lastUpdated: string;
}

export const useGameStore = create<AppState>()(
  persist(
    (set, get) => ({
      // State
      currentGame: 'smo',
      currentKingdom: null,
      currentPokemonSection: null,
      currentMarioKartSection: null,
      progress: {},
      filters: defaultFilters,
      selectedCollectible: null,
      sidebarOpen: true,
      activeMKModes: new Set<MKModeFilter>(['gp', 'tt', 'ko']),
      activePKMNSections: new Set<PKMNSectionFilter>(['story', 'legendaries', 'pokedex', 'raids', 'post-game', 'dlc', 'collectibles', 'recipes', 'cosmetics', 'sights', 'marks']),

      // Actions
      setCurrentGame: (gameId) => set({ currentGame: gameId, currentKingdom: null, currentPokemonSection: null, currentMarioKartSection: null }),

      setCurrentKingdom: (kingdomId) => set({ currentKingdom: kingdomId, selectedCollectible: null }),

      setCurrentPokemonSection: (section) => set({ currentPokemonSection: section, selectedCollectible: null }),

      setCurrentMarioKartSection: (section) => set({ currentMarioKartSection: section, selectedCollectible: null }),

      toggleCollected: (gameId, collectibleId) =>
        set((state) => {
          const currentProgress = state.progress[gameId] || {
            gameId,
            collected: new Set<string>(),
            notes: {},
            lastUpdated: new Date(),
          };

          const newCollected = new Set(currentProgress.collected);
          if (newCollected.has(collectibleId)) {
            newCollected.delete(collectibleId);
          } else {
            newCollected.add(collectibleId);
          }

          return {
            progress: {
              ...state.progress,
              [gameId]: {
                ...currentProgress,
                collected: newCollected,
                lastUpdated: new Date(),
              },
            },
          };
        }),

      setNote: (gameId, collectibleId, note) =>
        set((state) => {
          const currentProgress = state.progress[gameId] || {
            gameId,
            collected: new Set<string>(),
            notes: {},
            lastUpdated: new Date(),
          };

          const newNotes = { ...currentProgress.notes };
          if (note.trim()) {
            newNotes[collectibleId] = note;
          } else {
            delete newNotes[collectibleId];
          }

          return {
            progress: {
              ...state.progress,
              [gameId]: {
                ...currentProgress,
                notes: newNotes,
                lastUpdated: new Date(),
              },
            },
          };
        }),

      setFilters: (filters) =>
        set((state) => ({
          filters: { ...state.filters, ...filters },
        })),

      setSelectedCollectible: (id) => set({ selectedCollectible: id }),

      setSidebarOpen: (open) => set({ sidebarOpen: open }),

      toggleMKMode: (mode) =>
        set((state) => {
          const newModes = new Set(state.activeMKModes);
          if (newModes.has(mode)) {
            newModes.delete(mode);
          } else {
            newModes.add(mode);
          }
          return { activeMKModes: newModes };
        }),

      togglePKMNSection: (section) =>
        set((state) => {
          const newSections = new Set(state.activePKMNSections);
          if (newSections.has(section)) {
            newSections.delete(section);
          } else {
            newSections.add(section);
          }
          return { activePKMNSections: newSections };
        }),

      resetProgress: (gameId) =>
        set((state) => {
          const { [gameId]: _, ...rest } = state.progress;
          return { progress: rest };
        }),

      exportProgress: () => {
        const state = get();
        const exportData: Record<string, PersistedProgress> = {};

        Object.entries(state.progress).forEach(([gameId, progress]) => {
          // Handle lastUpdated being either a Date object or a string
          const lastUpdated = progress.lastUpdated instanceof Date
            ? progress.lastUpdated.toISOString()
            : typeof progress.lastUpdated === 'string'
              ? progress.lastUpdated
              : new Date().toISOString();

          exportData[gameId] = {
            gameId: progress.gameId,
            collected: setToArray(progress.collected),
            notes: progress.notes,
            lastUpdated,
          };
        });

        return JSON.stringify(exportData, null, 2);
      },

      importProgress: (data) => {
        try {
          const parsed = JSON.parse(data) as Record<string, PersistedProgress>;
          const newProgress: Record<string, UserProgress> = {};

          Object.entries(parsed).forEach(([gameId, progress]) => {
            newProgress[gameId] = {
              gameId: progress.gameId,
              collected: arrayToSet(progress.collected),
              notes: progress.notes,
              lastUpdated: new Date(progress.lastUpdated),
            };
          });

          set({ progress: newProgress });
          return true;
        } catch {
          return false;
        }
      },

      // Cloud sync methods
      syncToCloud: async () => {
        const state = get();
        return await saveToCloud(state.progress);
      },

      syncFromCloud: async () => {
        const cloudData = await loadFromCloud();
        if (cloudData) {
          const newProgress: Record<string, UserProgress> = {};
          for (const [gameId, data] of Object.entries(cloudData)) {
            newProgress[gameId] = {
              gameId,
              collected: new Set(data.collected),
              notes: data.notes,
              lastUpdated: new Date(data.lastUpdated),
            };
          }
          set({ progress: newProgress });
          return true;
        }
        return false;
      },
    }),
    {
      name: 'game-tracker-storage',
      storage: createJSONStorage(() => localStorage, {
        replacer: (key, value) => {
          if (value instanceof Set) {
            return { __type: 'Set', value: Array.from(value) };
          }
          if (value instanceof Date) {
            return { __type: 'Date', value: value.toISOString() };
          }
          return value;
        },
        reviver: (key, value) => {
          if (value && typeof value === 'object' && '__type' in value) {
            const typed = value as { __type: string; value: unknown };
            if (typed.__type === 'Set') {
              return new Set(typed.value as string[]);
            }
            if (typed.__type === 'Date') {
              return new Date(typed.value as string);
            }
          }
          return value;
        },
      }),
      partialize: (state) => ({
        currentGame: state.currentGame,
        currentKingdom: state.currentKingdom,
        currentPokemonSection: state.currentPokemonSection,
        currentMarioKartSection: state.currentMarioKartSection,
        progress: state.progress,
        filters: state.filters,
      }),
    }
  )
);

// Default progress object (stable reference)
const createDefaultProgress = (gameId: string): UserProgress => ({
  gameId,
  collected: new Set(),
  notes: {},
  lastUpdated: new Date(0),
});

// Cache for default progress objects to maintain stable references
const defaultProgressCache: Record<string, UserProgress> = {};

const getDefaultProgress = (gameId: string): UserProgress => {
  if (!defaultProgressCache[gameId]) {
    defaultProgressCache[gameId] = createDefaultProgress(gameId);
  }
  return defaultProgressCache[gameId];
};

// Selector hooks
export const useCurrentGame = () => useGameStore((s) => s.currentGame);
export const useCurrentKingdom = () => useGameStore((s) => s.currentKingdom);
export const useCurrentPokemonSection = () => useGameStore((s) => s.currentPokemonSection);
export const useCurrentMarioKartSection = () => useGameStore((s) => s.currentMarioKartSection);
export const useFilters = () => useGameStore((s) => s.filters);
export const useActiveMKModes = () => useGameStore((s) => s.activeMKModes);
export const useActivePKMNSections = () => useGameStore((s) => s.activePKMNSections);

export const useProgress = (gameId: string): UserProgress => {
  const progress = useGameStore((s) => s.progress[gameId]);
  return progress ?? getDefaultProgress(gameId);
};

// Calculate collected value considering Multi Moon values (value: 3)
// Pass in pre-filtered collectibles array - the function will only count IDs that exist in that array
export const calculateCollectedValue = (
  collected: Set<string>,
  collectibles: Collectible[],
  kingdomId?: string
): number => {
  // Create a map of collectible id -> value for quick lookup
  // Only IDs in this map will be counted
  const valueMap = new Map<string, number>();
  collectibles.forEach((c) => {
    // Apply kingdom filter if specified
    if (!kingdomId || c.kingdom === kingdomId) {
      valueMap.set(c.id, c.value ?? 1);
    }
  });

  let total = 0;
  collected.forEach((id) => {
    // Only count if the ID exists in our filtered collectibles
    if (valueMap.has(id)) {
      total += valueMap.get(id)!;
    }
  });
  return total;
};

// Calculate total possible value for a set of collectibles
// Pass in pre-filtered collectibles array
export const calculateTotalValue = (
  collectibles: Collectible[],
  kingdomId?: string
): number => {
  return collectibles
    .filter((c) => !kingdomId || c.kingdom === kingdomId)
    .reduce((sum, c) => sum + (c.value ?? 1), 0);
};
