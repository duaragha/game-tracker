// Assassin's Creed Mirage specific types

export type ACMirageGameId = 'ac-mirage';

// Regions/districts in AC Mirage
export type ACMirageRegion =
  | 'anbar'
  | 'karkh'
  | 'round-city'
  | 'harbiyah'
  | 'abbasiyah'
  | 'wilderness'
  | 'alamut';

// Region/district definition
export interface ACMirageDistrict {
  id: string;
  name: string;
  shortName: string;
  region: ACMirageRegion;
  description?: string;
  color: string;
}

// Story arc — Mirage's main story is split into 5 chapters + prologue/epilogue
export type StoryArc =
  | 'prologue'
  | 'al-ghul'
  | 'al-rabisu'
  | 'al-pairika'
  | 'al-mardikhwar'
  | 'al-bahamut'
  | 'epilogue';

// Main story quest (Memory)
export interface ACMirageQuest {
  id: string;
  name: string;
  arc: StoryArc;
  order: number;
  description?: string;
  imageUrl?: string;
}

// Order of the Ancients investigation target
export type OrderRank = 'blood' | 'finger' | 'father';

export interface ACMirageInvestigation {
  id: string;
  codename: string;
  realName?: string;
  rank: OrderRank;
  region?: ACMirageRegion;
  arc?: StoryArc;
  description?: string;
  trophy?: string;
  order: number;
  imageUrl?: string;
}

// Viewpoint — climbable tower for synchronization
export interface ACMirageViewpoint {
  id: string;
  name: string;
  region: ACMirageRegion;
  description?: string;
  imageUrl?: string;
}

// Mysterious Shard — pickpocketed from black-robed NPCs (10 total)
export interface ACMirageMysteriousShard {
  id: string;
  number: number;
  region: ACMirageRegion;
  location?: string;
  imageUrl?: string;
}

// Folktale (DLC) — listen on a bench
export interface ACMirageFolktale {
  id: string;
  name: string;
  location: string;
  imageUrl?: string;
}

// Oud Melody (DLC) — parkour collectible
export interface ACMirageOudMelody {
  id: string;
  name: string;
  location?: string;
  isQuestReward?: boolean;
  imageUrl?: string;
}

// Stolen Good (DLC) — return to Hind at Nimlot's Estate
export interface ACMirageStolenGood {
  id: string;
  name: string;
  location?: string;
  imageUrl?: string;
}

// Tale of AlUla (DLC side story)
export interface ACMirageAlulaTale {
  id: string;
  name: string;
  location: string;
  description?: string;
  imageUrl?: string;
}

// Bureau Contract — issued by one of the three factions
export type ContractFaction = 'scholars' | 'merchants' | 'soldiers';

export interface ACMirageContract {
  id: string;
  name: string;
  faction: ContractFaction;
  reward: string;
  description?: string;
  imageUrl?: string;
}

// Tale of Baghdad (side quest)
export interface ACMirageTale {
  id: string;
  name: string;
  region: ACMirageRegion;
  location?: string;
  description?: string;
  imageUrl?: string;
}

// Enigma (gear treasure puzzle)
export interface ACMirageEnigma {
  id: string;
  name: string;
  region: ACMirageRegion;
  reward?: string;
  description?: string;
  imageUrl?: string;
}

// Historical Site
export interface ACMirageHistoricalSite {
  id: string;
  name: string;
  region: ACMirageRegion;
  description?: string;
  imageUrl?: string;
}

// Lost Book
export interface ACMirageLostBook {
  id: string;
  title: string;
  region: ACMirageRegion;
  isHidden?: boolean;
  description?: string;
  imageUrl?: string;
}

// Dervis Artifact (curio) — pickpocket from civilians, turn in to Dervis
export interface ACMirageCurio {
  id: string;
  name: string;
  region: ACMirageRegion;
  location?: string;
  description?: string;
  imageUrl?: string;
}

// Weapon types
export type WeaponSlot = 'dagger' | 'sword';

export interface ACMirageWeapon {
  id: string;
  name: string;
  slot: WeaponSlot;
  perk: string;
  source: string;
  isDLC?: boolean;
  imageUrl?: string;
}

// Outfit
export type OutfitCategory = 'outfit' | 'costume';

export interface ACMirageOutfit {
  id: string;
  name: string;
  category: OutfitCategory;
  perk?: string;
  source: string;
  isDLC?: boolean;
  imageUrl?: string;
}

// Achievement / Trophy
export type AchievementRarity = 'platinum' | 'gold' | 'silver' | 'bronze';

export interface ACMirageAchievement {
  id: string;
  name: string;
  description: string;
  rarity: AchievementRarity;
  missable?: boolean;
  imageUrl?: string;
}

// Section types for sidebar navigation
export type ACMirageSection =
  | 'main-quests'
  | 'investigations'
  | 'contracts'
  | 'tales'
  | 'enigmas'
  | 'historical-sites'
  | 'lost-books'
  | 'curios'
  | 'shards'
  | 'viewpoints'
  | 'folktales'
  | 'oud-melodies'
  | 'stolen-goods'
  | 'alula-tales'
  | 'weapons'
  | 'outfits'
  | 'achievements'
  | null;

// Full game definition
export interface ACMirageGame {
  id: ACMirageGameId;
  name: string;
  shortName: string;
  districts: ACMirageDistrict[];
  mainQuests: ACMirageQuest[];
  investigations: ACMirageInvestigation[];
  contracts: ACMirageContract[];
  tales: ACMirageTale[];
  enigmas: ACMirageEnigma[];
  historicalSites: ACMirageHistoricalSite[];
  lostBooks: ACMirageLostBook[];
  curios: ACMirageCurio[];
  shards: ACMirageMysteriousShard[];
  viewpoints: ACMirageViewpoint[];
  folktales: ACMirageFolktale[];
  oudMelodies: ACMirageOudMelody[];
  stolenGoods: ACMirageStolenGood[];
  alulaTales: ACMirageAlulaTale[];
  weapons: ACMirageWeapon[];
  outfits: ACMirageOutfit[];
  achievements: ACMirageAchievement[];
}

export const isACMirageGame = (gameId: string): boolean => gameId === 'ac-mirage';

// ID creators
export const createQuestId = (id: string): string => `acm-quest-${id}`;
export const createInvestigationId = (id: string): string => `acm-investigation-${id}`;
export const createContractId = (id: string): string => `acm-contract-${id}`;
export const createShardId = (id: string): string => `acm-shard-${id}`;
export const createViewpointId = (id: string): string => `acm-viewpoint-${id}`;
export const createFolktaleId = (id: string): string => `acm-folktale-${id}`;
export const createOudMelodyId = (id: string): string => `acm-oud-${id}`;
export const createStolenGoodId = (id: string): string => `acm-stolen-${id}`;
export const createAlulaTaleId = (id: string): string => `acm-alula-tale-${id}`;
export const createTaleId = (id: string): string => `acm-tale-${id}`;
export const createEnigmaId = (id: string): string => `acm-enigma-${id}`;
export const createHistoricalSiteId = (id: string): string => `acm-site-${id}`;
export const createLostBookId = (id: string): string => `acm-book-${id}`;
export const createCurioId = (id: string): string => `acm-curio-${id}`;
export const createWeaponId = (id: string): string => `acm-weapon-${id}`;
export const createOutfitId = (id: string): string => `acm-outfit-${id}`;
export const createAchievementId = (id: string): string => `acm-achievement-${id}`;
