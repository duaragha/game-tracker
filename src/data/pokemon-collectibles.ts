import {
  OminousStake,
  GimmighoulTower,
  WildTeraPokemon,
  FlyingTaxiPoint,
  PokemonCenter,
  DittoSpawn,
} from '@/types/pokemon';

// ============================================
// OMINOUS BLACK STAKES (32 total - 8 per color)
// ============================================

// Purple Stakes - Unlock Wo-Chien (Dark/Grass)
export const purpleStakes: OminousStake[] = [
  { id: 'purple-1', color: 'purple', number: 1, location: 'Near Poco Path Lighthouse', area: 'South Province Area 1', unlocks: 'Wo-Chien' },
  { id: 'purple-2', color: 'purple', number: 2, location: 'Cliff edge near beach', area: 'South Province Area 1', unlocks: 'Wo-Chien' },
  { id: 'purple-3', color: 'purple', number: 3, location: 'Near Mesagoza South Gate', area: 'South Province Area 1', unlocks: 'Wo-Chien' },
  { id: 'purple-4', color: 'purple', number: 4, location: 'Hillside near ruins', area: 'South Province Area 2', unlocks: 'Wo-Chien' },
  { id: 'purple-5', color: 'purple', number: 5, location: 'Rocky outcrop', area: 'South Province Area 4', unlocks: 'Wo-Chien' },
  { id: 'purple-6', color: 'purple', number: 6, location: 'Near watchtower', area: 'South Province Area 5', unlocks: 'Wo-Chien' },
  { id: 'purple-7', color: 'purple', number: 7, location: 'Cliff overlooking sea', area: 'South Province Area 5', unlocks: 'Wo-Chien' },
  { id: 'purple-8', color: 'purple', number: 8, location: 'Near the shrine', area: 'South Province Area 1', unlocks: 'Wo-Chien' },
];

// Yellow Stakes - Unlock Chien-Pao (Dark/Ice)
export const yellowStakes: OminousStake[] = [
  { id: 'yellow-1', color: 'yellow', number: 1, location: 'Near Cortondo', area: 'South Province Area 2', unlocks: 'Chien-Pao' },
  { id: 'yellow-2', color: 'yellow', number: 2, location: 'West of Mesagoza', area: 'South Province Area 2', unlocks: 'Chien-Pao' },
  { id: 'yellow-3', color: 'yellow', number: 3, location: 'Hillside ruins', area: 'West Province Area 1', unlocks: 'Chien-Pao' },
  { id: 'yellow-4', color: 'yellow', number: 4, location: 'Rocky cliff', area: 'West Province Area 1', unlocks: 'Chien-Pao' },
  { id: 'yellow-5', color: 'yellow', number: 5, location: 'Near bamboo forest', area: 'West Province Area 2', unlocks: 'Chien-Pao' },
  { id: 'yellow-6', color: 'yellow', number: 6, location: 'Mountain path', area: 'West Province Area 2', unlocks: 'Chien-Pao' },
  { id: 'yellow-7', color: 'yellow', number: 7, location: 'Near river', area: 'West Province Area 3', unlocks: 'Chien-Pao' },
  { id: 'yellow-8', color: 'yellow', number: 8, location: 'Near the shrine', area: 'West Province Area 1', unlocks: 'Chien-Pao' },
];

// Green Stakes - Unlock Ting-Lu (Dark/Ground)
export const greenStakes: OminousStake[] = [
  { id: 'green-1', color: 'green', number: 1, location: 'Near Casseroya Lake', area: 'Casseroya Lake', unlocks: 'Ting-Lu' },
  { id: 'green-2', color: 'green', number: 2, location: 'Lake island', area: 'Casseroya Lake', unlocks: 'Ting-Lu' },
  { id: 'green-3', color: 'green', number: 3, location: 'Mountain base', area: 'Glaseado Mountain', unlocks: 'Ting-Lu' },
  { id: 'green-4', color: 'green', number: 4, location: 'Snowy peak', area: 'Glaseado Mountain', unlocks: 'Ting-Lu' },
  { id: 'green-5', color: 'green', number: 5, location: 'Near Montenevera', area: 'Glaseado Mountain', unlocks: 'Ting-Lu' },
  { id: 'green-6', color: 'green', number: 6, location: 'Frozen waterfall', area: 'Glaseado Mountain', unlocks: 'Ting-Lu' },
  { id: 'green-7', color: 'green', number: 7, location: 'Rocky outcrop', area: 'North Province Area 1', unlocks: 'Ting-Lu' },
  { id: 'green-8', color: 'green', number: 8, location: 'Near the shrine (Socarrat Trail)', area: 'Socarrat Trail', unlocks: 'Ting-Lu' },
];

// Blue Stakes - Unlock Chi-Yu (Dark/Fire)
export const blueStakes: OminousStake[] = [
  { id: 'blue-1', color: 'blue', number: 1, location: 'Near Artazon', area: 'East Province Area 1', unlocks: 'Chi-Yu' },
  { id: 'blue-2', color: 'blue', number: 2, location: 'Hillside path', area: 'East Province Area 1', unlocks: 'Chi-Yu' },
  { id: 'blue-3', color: 'blue', number: 3, location: 'Near Levincia', area: 'East Province Area 2', unlocks: 'Chi-Yu' },
  { id: 'blue-4', color: 'blue', number: 4, location: 'Coastal cliff', area: 'East Province Area 2', unlocks: 'Chi-Yu' },
  { id: 'blue-5', color: 'blue', number: 5, location: 'Rocky terrain', area: 'East Province Area 3', unlocks: 'Chi-Yu' },
  { id: 'blue-6', color: 'blue', number: 6, location: 'Near mining site', area: 'East Province Area 3', unlocks: 'Chi-Yu' },
  { id: 'blue-7', color: 'blue', number: 7, location: 'Mountain overlook', area: 'North Province Area 2', unlocks: 'Chi-Yu' },
  { id: 'blue-8', color: 'blue', number: 8, location: 'Near the shrine', area: 'North Province Area 2', unlocks: 'Chi-Yu' },
];

export const allStakes: OminousStake[] = [
  ...purpleStakes,
  ...yellowStakes,
  ...greenStakes,
  ...blueStakes,
];

// ============================================
// GIMMIGHOUL WATCHTOWERS (14 total)
// ============================================

export const gimmighoulTowers: GimmighoulTower[] = [
  { id: 'tower-1', name: 'Poco Path Tower', location: 'Near Poco Path Lighthouse', area: 'South Province Area 1', coinsAwarded: 50 },
  { id: 'tower-2', name: 'South Province Tower 1', location: 'Southeast of Mesagoza', area: 'South Province Area 2', coinsAwarded: 50 },
  { id: 'tower-3', name: 'South Province Tower 2', location: 'Near Los Platos', area: 'South Province Area 3', coinsAwarded: 50 },
  { id: 'tower-4', name: 'Cortondo Tower', location: 'West of Cortondo', area: 'South Province Area 2', coinsAwarded: 50 },
  { id: 'tower-5', name: 'West Province Tower 1', location: 'Near Porto Marinada', area: 'West Province Area 2', coinsAwarded: 50 },
  { id: 'tower-6', name: 'West Province Tower 2', location: 'West of Cascarrafa', area: 'West Province Area 1', coinsAwarded: 50 },
  { id: 'tower-7', name: 'Asado Desert Tower', location: 'Asado Desert ruins', area: 'Asado Desert', coinsAwarded: 50 },
  { id: 'tower-8', name: 'East Province Tower 1', location: 'Near Artazon', area: 'East Province Area 1', coinsAwarded: 50 },
  { id: 'tower-9', name: 'East Province Tower 2', location: 'South of Levincia', area: 'East Province Area 2', coinsAwarded: 50 },
  { id: 'tower-10', name: 'Tagtree Thicket Tower', location: 'In Tagtree Thicket', area: 'Tagtree Thicket', coinsAwarded: 50 },
  { id: 'tower-11', name: 'North Province Tower 1', location: 'Near Fury Falls', area: 'North Province Area 1', coinsAwarded: 50 },
  { id: 'tower-12', name: 'North Province Tower 2', location: 'Near fairy base', area: 'North Province Area 3', coinsAwarded: 50 },
  { id: 'tower-13', name: 'Glaseado Tower', location: 'Glaseado Mountain base', area: 'Glaseado Mountain', coinsAwarded: 50 },
  { id: 'tower-14', name: 'Casseroya Tower', location: 'Near Casseroya Lake', area: 'Casseroya Lake', coinsAwarded: 50 },
];

// ============================================
// WILD TERA POKEMON (Notable fixed spawns)
// ============================================

export const wildTeraPokemon: WildTeraPokemon[] = [
  // Early game Tera Pokemon
  { id: 'tera-1', pokemon: 'Lechonk', teraType: 'normal', level: 15, location: 'Poco Path', area: 'South Province Area 1' },
  { id: 'tera-2', pokemon: 'Fletchling', teraType: 'flying', level: 14, location: 'Near lighthouse', area: 'South Province Area 1' },
  { id: 'tera-3', pokemon: 'Happiny', teraType: 'normal', level: 18, location: 'Near Los Platos', area: 'South Province Area 3' },
  { id: 'tera-4', pokemon: 'Sunkern', teraType: 'grass', level: 16, location: 'Fields', area: 'South Province Area 2' },
  { id: 'tera-5', pokemon: 'Diglett', teraType: 'ground', level: 17, location: 'Near Cortondo', area: 'South Province Area 2' },
  // Mid game Tera Pokemon
  { id: 'tera-6', pokemon: 'Tauros', teraType: 'fighting', level: 25, location: 'Open plains', area: 'East Province Area 1' },
  { id: 'tera-7', pokemon: 'Magikarp', teraType: 'water', level: 20, location: 'River', area: 'West Province Area 1' },
  { id: 'tera-8', pokemon: 'Grimer', teraType: 'poison', level: 28, location: 'Industrial area', area: 'East Province Area 2' },
  { id: 'tera-9', pokemon: 'Larvitar', teraType: 'rock', level: 32, location: 'Rocky terrain', area: 'South Province Area 5' },
  { id: 'tera-10', pokemon: 'Dratini', teraType: 'dragon', level: 35, location: 'Lake shore', area: 'Casseroya Lake' },
  // Late game Tera Pokemon
  { id: 'tera-11', pokemon: 'Eevee', teraType: 'normal', level: 30, location: 'Grass fields', area: 'South Province Area 2' },
  { id: 'tera-12', pokemon: 'Chansey', teraType: 'normal', level: 40, location: 'Mountain', area: 'North Province Area 1' },
  { id: 'tera-13', pokemon: 'Ditto', teraType: 'normal', level: 45, location: 'Cave', area: 'West Province Area 2' },
  { id: 'tera-14', pokemon: 'Pawniard', teraType: 'dark', level: 38, location: 'Bamboo groves', area: 'Tagtree Thicket' },
  { id: 'tera-15', pokemon: 'Deino', teraType: 'dark', level: 42, location: 'Cave interior', area: 'Alfornada Cavern' },
  // Special Tera Pokemon
  { id: 'tera-16', pokemon: 'Lucario', teraType: 'fighting', level: 50, location: 'Mountain peak', area: 'North Province Area 2' },
  { id: 'tera-17', pokemon: 'Garchomp', teraType: 'dragon', level: 55, location: 'Desert cave', area: 'Asado Desert' },
  { id: 'tera-18', pokemon: 'Gengar', teraType: 'ghost', level: 52, location: 'Ruins at night', area: 'South Province Area 4' },
];

// ============================================
// FLYING TAXI POINTS (Major locations)
// ============================================

export const flyingTaxiPoints: FlyingTaxiPoint[] = [
  // Cities and Towns
  { id: 'taxi-mesagoza-south', name: 'Mesagoza (South Gate)', area: 'Mesagoza', region: 'paldea' },
  { id: 'taxi-mesagoza-east', name: 'Mesagoza (East Gate)', area: 'Mesagoza', region: 'paldea' },
  { id: 'taxi-mesagoza-west', name: 'Mesagoza (West Gate)', area: 'Mesagoza', region: 'paldea' },
  { id: 'taxi-cortondo', name: 'Cortondo', area: 'South Province Area 2', region: 'paldea' },
  { id: 'taxi-artazon', name: 'Artazon', area: 'East Province Area 1', region: 'paldea' },
  { id: 'taxi-levincia', name: 'Levincia', area: 'East Province Area 2', region: 'paldea' },
  { id: 'taxi-cascarrafa', name: 'Cascarrafa', area: 'West Province Area 1', region: 'paldea' },
  { id: 'taxi-porto-marinada', name: 'Porto Marinada', area: 'West Province Area 2', region: 'paldea' },
  { id: 'taxi-medali', name: 'Medali', area: 'West Province Area 3', region: 'paldea' },
  { id: 'taxi-zapapico', name: 'Zapapico', area: 'East Province Area 3', region: 'paldea' },
  { id: 'taxi-montenevera', name: 'Montenevera', area: 'Glaseado Mountain', region: 'paldea' },
  { id: 'taxi-alfornada', name: 'Alfornada', area: 'South Province Area 6', region: 'paldea' },
  // Pokemon Centers
  { id: 'taxi-pc-poco-path', name: 'Poco Path Pokemon Center', area: 'South Province Area 1', region: 'paldea' },
  { id: 'taxi-pc-los-platos', name: 'Los Platos Pokemon Center', area: 'South Province Area 3', region: 'paldea' },
  { id: 'taxi-pc-sp4', name: 'South Province Area 4 Pokemon Center', area: 'South Province Area 4', region: 'paldea' },
  { id: 'taxi-pc-sp5', name: 'South Province Area 5 Pokemon Center', area: 'South Province Area 5', region: 'paldea' },
  { id: 'taxi-pc-ep1', name: 'East Province Area 1 Pokemon Center', area: 'East Province Area 1', region: 'paldea' },
  { id: 'taxi-pc-ep3', name: 'East Province Area 3 Pokemon Center', area: 'East Province Area 3', region: 'paldea' },
  { id: 'taxi-pc-wp1', name: 'West Province Area 1 Pokemon Center', area: 'West Province Area 1', region: 'paldea' },
  { id: 'taxi-pc-asado', name: 'Asado Desert Pokemon Center', area: 'Asado Desert', region: 'paldea' },
  { id: 'taxi-pc-np1', name: 'North Province Area 1 Pokemon Center', area: 'North Province Area 1', region: 'paldea' },
  { id: 'taxi-pc-np2', name: 'North Province Area 2 Pokemon Center', area: 'North Province Area 2', region: 'paldea' },
  { id: 'taxi-pc-np3', name: 'North Province Area 3 Pokemon Center', area: 'North Province Area 3', region: 'paldea' },
  { id: 'taxi-pc-tagtree', name: 'Tagtree Thicket Pokemon Center', area: 'Tagtree Thicket', region: 'paldea' },
  { id: 'taxi-pc-casseroya', name: 'Casseroya Lake Pokemon Center', area: 'Casseroya Lake', region: 'paldea' },
  // Special Locations
  { id: 'taxi-lighthouse', name: 'Poco Path Lighthouse', area: 'South Province Area 1', region: 'paldea' },
  { id: 'taxi-pokemon-league', name: 'Pokemon League', area: 'Pokemon League', region: 'paldea' },
  { id: 'taxi-area-zero', name: 'Area Zero Gate', area: 'Area Zero', region: 'paldea' },
];

// ============================================
// POKEMON CENTERS
// ============================================

export const pokemonCenters: PokemonCenter[] = [
  // South Province
  { id: 'pc-poco-path', name: 'Poco Path Pokemon Center', area: 'South Province Area 1', region: 'paldea' },
  { id: 'pc-mesagoza-south', name: 'Mesagoza Pokemon Center (South)', area: 'Mesagoza', region: 'paldea' },
  { id: 'pc-mesagoza-east', name: 'Mesagoza Pokemon Center (East)', area: 'Mesagoza', region: 'paldea' },
  { id: 'pc-mesagoza-west', name: 'Mesagoza Pokemon Center (West)', area: 'Mesagoza', region: 'paldea' },
  { id: 'pc-cortondo', name: 'Cortondo Pokemon Center', area: 'South Province Area 2', region: 'paldea' },
  { id: 'pc-los-platos', name: 'Los Platos Pokemon Center', area: 'South Province Area 3', region: 'paldea' },
  { id: 'pc-sp4', name: 'South Province Area 4 Pokemon Center', area: 'South Province Area 4', region: 'paldea' },
  { id: 'pc-sp5', name: 'South Province Area 5 Pokemon Center', area: 'South Province Area 5', region: 'paldea' },
  { id: 'pc-alfornada', name: 'Alfornada Pokemon Center', area: 'South Province Area 6', region: 'paldea' },
  // East Province
  { id: 'pc-artazon', name: 'Artazon Pokemon Center', area: 'East Province Area 1', region: 'paldea' },
  { id: 'pc-ep1', name: 'East Province Area 1 Pokemon Center', area: 'East Province Area 1', region: 'paldea' },
  { id: 'pc-levincia', name: 'Levincia Pokemon Center', area: 'East Province Area 2', region: 'paldea' },
  { id: 'pc-zapapico', name: 'Zapapico Pokemon Center', area: 'East Province Area 3', region: 'paldea' },
  { id: 'pc-ep3', name: 'East Province Area 3 Pokemon Center', area: 'East Province Area 3', region: 'paldea' },
  // West Province
  { id: 'pc-cascarrafa', name: 'Cascarrafa Pokemon Center', area: 'West Province Area 1', region: 'paldea' },
  { id: 'pc-wp1', name: 'West Province Area 1 Pokemon Center', area: 'West Province Area 1', region: 'paldea' },
  { id: 'pc-porto-marinada', name: 'Porto Marinada Pokemon Center', area: 'West Province Area 2', region: 'paldea' },
  { id: 'pc-medali', name: 'Medali Pokemon Center', area: 'West Province Area 3', region: 'paldea' },
  { id: 'pc-asado', name: 'Asado Desert Pokemon Center', area: 'Asado Desert', region: 'paldea' },
  // North Province
  { id: 'pc-np1', name: 'North Province Area 1 Pokemon Center', area: 'North Province Area 1', region: 'paldea' },
  { id: 'pc-np2', name: 'North Province Area 2 Pokemon Center', area: 'North Province Area 2', region: 'paldea' },
  { id: 'pc-np3', name: 'North Province Area 3 Pokemon Center', area: 'North Province Area 3', region: 'paldea' },
  { id: 'pc-montenevera', name: 'Montenevera Pokemon Center', area: 'Glaseado Mountain', region: 'paldea' },
  // Special Areas
  { id: 'pc-tagtree', name: 'Tagtree Thicket Pokemon Center', area: 'Tagtree Thicket', region: 'paldea' },
  { id: 'pc-casseroya', name: 'Casseroya Lake Pokemon Center', area: 'Casseroya Lake', region: 'paldea' },
  { id: 'pc-pokemon-league', name: 'Pokemon League Pokemon Center', area: 'Pokemon League', region: 'paldea' },
];

// ============================================
// DITTO SPAWN LOCATIONS (5 fixed)
// ============================================

export const dittoSpawns: DittoSpawn[] = [
  { id: 'ditto-1', location: 'West Province Area 2 cave', area: 'West Province Area 2', notes: 'Disguised as other Pokemon' },
  { id: 'ditto-2', location: 'West Province Area 3 forest', area: 'West Province Area 3', notes: 'Near Medali' },
  { id: 'ditto-3', location: 'Casseroya Lake island', area: 'Casseroya Lake', notes: 'Small island in lake' },
  { id: 'ditto-4', location: 'North Province Area 3', area: 'North Province Area 3', notes: 'Near fairy base area' },
  { id: 'ditto-5', location: 'Porto Marinada area', area: 'West Province Area 2', notes: 'Near market' },
];

// ============================================
// SUMMARY STATS
// ============================================

export const collectibleCounts = {
  stakes: allStakes.length,
  watchtowers: gimmighoulTowers.length,
  teraPokemon: wildTeraPokemon.length,
  flyingTaxi: flyingTaxiPoints.length,
  pokemonCenters: pokemonCenters.length,
  dittoSpawns: dittoSpawns.length,
};
