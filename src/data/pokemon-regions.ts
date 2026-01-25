import { PokemonArea } from '@/types/pokemon';

// Paldea regions (Base Game)
export const paldeaAreas: PokemonArea[] = [
  { id: 'mesagoza', name: 'Mesagoza', shortName: 'Mesagoza', region: 'paldea', color: '#8b5cf6' },
  { id: 'cortondo', name: 'Cortondo', shortName: 'Cortondo', region: 'paldea', color: '#22c55e' },
  { id: 'artazon', name: 'Artazon', shortName: 'Artazon', region: 'paldea', color: '#84cc16' },
  { id: 'levincia', name: 'Levincia', shortName: 'Levincia', region: 'paldea', color: '#eab308' },
  { id: 'cascarrafa', name: 'Cascarrafa', shortName: 'Cascarrafa', region: 'paldea', color: '#3b82f6' },
  { id: 'medali', name: 'Medali', shortName: 'Medali', region: 'paldea', color: '#a8a29e' },
  { id: 'montenevera', name: 'Montenevera', shortName: 'Montenevera', region: 'paldea', color: '#7c3aed' },
  { id: 'alfornada', name: 'Alfornada', shortName: 'Alfornada', region: 'paldea', color: '#ec4899' },
  { id: 'glaseado', name: 'Glaseado Mountain', shortName: 'Glaseado', region: 'paldea', color: '#06b6d4' },
  { id: 'area-zero', name: 'Area Zero', shortName: 'Area Zero', region: 'paldea', color: '#9333ea' },
];

// Kitakami regions (Teal Mask DLC)
export const kitakamiAreas: PokemonArea[] = [
  { id: 'mossui-town', name: 'Mossui Town', shortName: 'Mossui', region: 'kitakami', color: '#06b6d4' },
  { id: 'kitakami-road', name: 'Kitakami Road', shortName: 'Kitakami Rd', region: 'kitakami', color: '#10b981' },
  { id: 'oni-mountain', name: 'Oni Mountain', shortName: 'Oni Mt', region: 'kitakami', color: '#6366f1' },
  { id: 'paradise-barrens', name: 'Paradise Barrens', shortName: 'Paradise', region: 'kitakami', color: '#f59e0b' },
  { id: 'wistful-fields', name: 'Wistful Fields', shortName: 'Wistful', region: 'kitakami', color: '#a855f7' },
  { id: 'timeless-woods', name: 'Timeless Woods', shortName: 'Timeless', region: 'kitakami', color: '#22c55e' },
];

// Blueberry Academy regions (Indigo Disk DLC)
export const blueberryAreas: PokemonArea[] = [
  { id: 'blueberry-academy', name: 'Blueberry Academy', shortName: 'Academy', region: 'blueberry', color: '#6366f1' },
  { id: 'savanna-biome', name: 'Savanna Biome', shortName: 'Savanna', region: 'blueberry', color: '#eab308' },
  { id: 'coastal-biome', name: 'Coastal Biome', shortName: 'Coastal', region: 'blueberry', color: '#3b82f6' },
  { id: 'canyon-biome', name: 'Canyon Biome', shortName: 'Canyon', region: 'blueberry', color: '#f97316' },
  { id: 'polar-biome', name: 'Polar Biome', shortName: 'Polar', region: 'blueberry', color: '#06b6d4' },
  { id: 'terarium-core', name: 'Terarium Core', shortName: 'Core', region: 'blueberry', color: '#8b5cf6' },
  { id: 'area-zero-underdepths', name: 'Area Zero Underdepths', shortName: 'Underdepths', region: 'blueberry', color: '#9333ea' },
];

export const allPokemonAreas: PokemonArea[] = [
  ...paldeaAreas,
  ...kitakamiAreas,
  ...blueberryAreas,
];
