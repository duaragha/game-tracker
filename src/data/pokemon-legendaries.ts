import { LegendaryPokemon } from '@/types/pokemon';

// Base Game Legendaries
export const paldeaLegendaries: LegendaryPokemon[] = [
  // Box Legendary
  { id: 'miraidon-1', name: 'Miraidon (Story)', types: ['electric', 'dragon'], region: 'paldea', category: 'box', location: 'Start of game', requirement: 'Story companion' },
  { id: 'miraidon-2', name: 'Miraidon (Catchable)', types: ['electric', 'dragon'], region: 'paldea', category: 'box', location: 'Behind Zero Lab', requirement: 'Post-game' },

  // Treasures of Ruin (4 Sub-Legendaries)
  { id: 'wo-chien', name: 'Wo-Chien', types: ['dark', 'grass'], region: 'paldea', category: 'ruinous', location: 'South Province Area 1 Shrine', requirement: 'Pull 8 purple stakes' },
  { id: 'chien-pao', name: 'Chien-Pao', types: ['dark', 'ice'], region: 'paldea', category: 'ruinous', location: 'West Province Area 1 Shrine', requirement: 'Pull 8 yellow stakes' },
  { id: 'ting-lu', name: 'Ting-Lu', types: ['dark', 'ground'], region: 'paldea', category: 'ruinous', location: 'Socarrat Trail Shrine', requirement: 'Pull 8 green stakes' },
  { id: 'chi-yu', name: 'Chi-Yu', types: ['dark', 'fire'], region: 'paldea', category: 'ruinous', location: 'North Province Area 2 Shrine', requirement: 'Pull 8 blue stakes' },
];

// Teal Mask DLC Legendaries
export const kitakamiLegendaries: LegendaryPokemon[] = [
  // Ogerpon (4 forms via masks)
  { id: 'ogerpon-teal', name: 'Ogerpon (Teal Mask)', types: ['grass'], region: 'kitakami', category: 'ogerpon', dlc: 'teal-mask', requirement: 'Story completion' },
  { id: 'ogerpon-wellspring', name: 'Ogerpon (Wellspring Mask)', types: ['grass', 'water'], region: 'kitakami', category: 'ogerpon', dlc: 'teal-mask', location: 'Receive during story' },
  { id: 'ogerpon-hearthflame', name: 'Ogerpon (Hearthflame Mask)', types: ['grass', 'fire'], region: 'kitakami', category: 'ogerpon', dlc: 'teal-mask', location: 'Receive during story' },
  { id: 'ogerpon-cornerstone', name: 'Ogerpon (Cornerstone Mask)', types: ['grass', 'rock'], region: 'kitakami', category: 'ogerpon', dlc: 'teal-mask', location: 'Receive during story' },

  // Loyal Three
  { id: 'okidogi', name: 'Okidogi', types: ['poison', 'fighting'], region: 'kitakami', category: 'loyal-three', dlc: 'teal-mask', location: 'Paradise Barrens', requirement: 'Post Teal Mask story' },
  { id: 'munkidori', name: 'Munkidori', types: ['poison', 'psychic'], region: 'kitakami', category: 'loyal-three', dlc: 'teal-mask', location: 'Wistful Fields', requirement: 'Post Teal Mask story' },
  { id: 'fezandipiti', name: 'Fezandipiti', types: ['poison', 'fairy'], region: 'kitakami', category: 'loyal-three', dlc: 'teal-mask', location: 'Oni Mountain', requirement: 'Post Teal Mask story' },

  // Bloodmoon Ursaluna
  { id: 'bloodmoon-ursaluna', name: 'Bloodmoon Ursaluna', types: ['ground', 'normal'], region: 'kitakami', category: 'story', dlc: 'teal-mask', location: 'Timeless Woods', requirement: 'Perrin quest (150 Kitakami Dex)' },
];

// Indigo Disk DLC Legendaries
export const blueberryLegendaries: LegendaryPokemon[] = [
  // Story Legendary
  { id: 'terapagos', name: 'Terapagos', types: ['normal'], region: 'blueberry', category: 'story', dlc: 'indigo-disk', location: 'Area Zero Underdepths', requirement: 'Story completion' },

  // Violet Paradox Pokemon
  { id: 'iron-crown', name: 'Iron Crown', types: ['steel', 'psychic'], region: 'blueberry', category: 'paradox', dlc: 'indigo-disk', requirement: 'Perrin quest (200 Blueberry Dex)' },
  { id: 'iron-boulder', name: 'Iron Boulder', types: ['rock', 'psychic'], region: 'blueberry', category: 'paradox', dlc: 'indigo-disk', requirement: 'Perrin quest (200 Blueberry Dex)' },

  // Snacksworth Legendaries (Solo - 13 unique for Violet)
  { id: 'snack-articuno', name: 'Articuno', types: ['ice', 'flying'], region: 'blueberry', category: 'snacksworth', dlc: 'indigo-disk', requirement: 'Legendary Snack' },
  { id: 'snack-zapdos', name: 'Zapdos', types: ['electric', 'flying'], region: 'blueberry', category: 'snacksworth', dlc: 'indigo-disk', requirement: 'Legendary Snack' },
  { id: 'snack-moltres', name: 'Moltres', types: ['fire', 'flying'], region: 'blueberry', category: 'snacksworth', dlc: 'indigo-disk', requirement: 'Legendary Snack' },
  { id: 'snack-raikou', name: 'Raikou', types: ['electric'], region: 'blueberry', category: 'snacksworth', dlc: 'indigo-disk', requirement: 'Legendary Snack' },
  { id: 'snack-entei', name: 'Entei', types: ['fire'], region: 'blueberry', category: 'snacksworth', dlc: 'indigo-disk', requirement: 'Legendary Snack' },
  { id: 'snack-suicune', name: 'Suicune', types: ['water'], region: 'blueberry', category: 'snacksworth', dlc: 'indigo-disk', requirement: 'Legendary Snack' },
  { id: 'snack-lugia', name: 'Lugia', types: ['psychic', 'flying'], region: 'blueberry', category: 'snacksworth', dlc: 'indigo-disk', requirement: 'Legendary Snack' },
  { id: 'snack-ho-oh', name: 'Ho-Oh', types: ['fire', 'flying'], region: 'blueberry', category: 'snacksworth', dlc: 'indigo-disk', requirement: 'Legendary Snack' },
  { id: 'snack-latias', name: 'Latias', types: ['dragon', 'psychic'], region: 'blueberry', category: 'snacksworth', dlc: 'indigo-disk', requirement: 'Legendary Snack' },
  { id: 'snack-latios', name: 'Latios', types: ['dragon', 'psychic'], region: 'blueberry', category: 'snacksworth', dlc: 'indigo-disk', requirement: 'Legendary Snack' },
  { id: 'snack-cobalion', name: 'Cobalion', types: ['steel', 'fighting'], region: 'blueberry', category: 'snacksworth', dlc: 'indigo-disk', requirement: 'Legendary Snack' },
  { id: 'snack-terrakion', name: 'Terrakion', types: ['rock', 'fighting'], region: 'blueberry', category: 'snacksworth', dlc: 'indigo-disk', requirement: 'Legendary Snack' },
  { id: 'snack-virizion', name: 'Virizion', types: ['grass', 'fighting'], region: 'blueberry', category: 'snacksworth', dlc: 'indigo-disk', requirement: 'Legendary Snack' },
  { id: 'snack-kubfu', name: 'Kubfu', types: ['fighting'], region: 'blueberry', category: 'snacksworth', dlc: 'indigo-disk', requirement: 'Legendary Snack' },
  { id: 'snack-glastrier', name: 'Glastrier', types: ['ice'], region: 'blueberry', category: 'snacksworth', dlc: 'indigo-disk', requirement: 'Legendary Snack' },
  { id: 'snack-spectrier', name: 'Spectrier', types: ['ghost'], region: 'blueberry', category: 'snacksworth', dlc: 'indigo-disk', requirement: 'Legendary Snack' },

  // Snacksworth Group Quest Legendaries (require Union Circle)
  { id: 'snack-rayquaza', name: 'Rayquaza', types: ['dragon', 'flying'], region: 'blueberry', category: 'snacksworth', dlc: 'indigo-disk', requirement: 'Group Quest Snack (Union Circle)' },
  { id: 'snack-necrozma', name: 'Necrozma', types: ['psychic'], region: 'blueberry', category: 'snacksworth', dlc: 'indigo-disk', requirement: 'Group Quest Snack (Union Circle)' },
  { id: 'snack-kyurem', name: 'Kyurem', types: ['dragon', 'ice'], region: 'blueberry', category: 'snacksworth', dlc: 'indigo-disk', requirement: 'Group Quest Snack (Union Circle)' },
];

// Mochi Mayhem Epilogue Legendary
export const epilogueLegendaries: LegendaryPokemon[] = [
  { id: 'pecharunt', name: 'Pecharunt', types: ['poison', 'ghost'], region: 'epilogue', category: 'mythical', dlc: 'mochi-mayhem', requirement: 'Complete Mochi Mayhem epilogue' },
];

// All legendaries combined
export const allLegendaries: LegendaryPokemon[] = [
  ...paldeaLegendaries,
  ...kitakamiLegendaries,
  ...blueberryLegendaries,
  ...epilogueLegendaries,
];
