// Mario Kart specific types

export type EngineClass = '50cc' | '100cc' | '150cc' | 'mirror' | '200cc';

export type MarioKartGameId = 'mk8dx' | 'mkworld';

export interface Track {
  id: string;
  name: string;
  cupId: string;
  order: number; // Position within cup (1-4 for GP, 1-6 for rallies)
}

export interface Cup {
  id: string;
  name: string;
  tracks: Track[];
  type: 'grand-prix' | 'dlc' | 'knockout-rally';
  waveNumber?: number; // For DLC cups in MK8DX
}

export interface MarioKartGame {
  id: MarioKartGameId;
  name: string;
  shortName: string;
  coverImage?: string;
  cups: Cup[];
  engineClasses: EngineClass[];
  hasTimeTrials: boolean;
  // Knockout Tour specific (MK World only)
  knockoutRallies?: Cup[];
  knockoutEngineClasses?: EngineClass[];
}

// Progress tracking types
export interface CupCompletion {
  cupId: string;
  engineClass: EngineClass;
  completed: boolean;
  stars?: number; // 0-3 stars for ranking (optional)
}

// Helper function to create cup completion ID
export const createCupCompletionId = (cupId: string, engineClass: EngineClass): string => {
  return `${cupId}-${engineClass}`;
};
