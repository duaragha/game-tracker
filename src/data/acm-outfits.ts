import { ACMirageOutfit } from '@/types/ac-mirage';

// All 24 outfits + costumes in AC Mirage. The 9 "outfits" carry perks; the 14
// "costumes" are cosmetic only. Bayek's outfit unlocks via New Game+.
// Source: PowerPyx outfits guide.
export const acmOutfits: ACMirageOutfit[] = [
  // ============ OUTFITS (have perks) ============
  {
    id: 'initiate-of-alamut',
    name: 'Initiate of Alamut Outfit',
    category: 'outfit',
    perk: 'Silent Blade — enemies hear less noise during assassinations.',
    source: 'Story (starting outfit).',
  },
  {
    id: 'milads-outfit',
    name: "Milad's Outfit",
    category: 'outfit',
    perk: 'Forgotten Terror — air assassinations cause a 15m lightning flash that disorients bystanders.',
    source: 'Gear Chest in Secret Chamber.',
  },
  {
    id: 'sand-outfit',
    name: 'Sand Outfit',
    category: 'outfit',
    perk: 'Second Chance — once per fight, survive a lethal hit and slow down time.',
    source: 'Deluxe Edition DLC.',
    isDLC: true,
  },
  {
    id: 'zanj-uprising-outfit',
    name: 'Zanj Uprising Outfit',
    category: 'outfit',
    perk: 'Infamous — reduces notoriety from illegal actions.',
    source: 'Gear Chest in Harbiyah.',
  },
  {
    id: 'abbasid-knight-outfit',
    name: 'Abbasid Knight Outfit',
    category: 'outfit',
    perk: 'Lick Your Wounds — regen Health every 2 seconds while unseen, up to 50%.',
    source: 'Gear Chest in Abbasiyah.',
  },
  {
    id: 'hidden-one-outfit',
    name: 'Hidden One Outfit',
    category: 'outfit',
    perk: 'Deadly Moment — Focus Chunks fill an additional % when performing Stealth kills.',
    source: 'Gear Chest in Round City.',
  },
  {
    id: 'rostam-outfit',
    name: 'Rostam Outfit',
    category: 'outfit',
    perk: 'Sound of Silence — enemies hear less noise emitted while moving.',
    source: 'Contract side quest "The Marked Coins".',
  },
  {
    id: 'jinn-outfit',
    name: 'Jinn Outfit',
    category: 'outfit',
    source: 'Jinn Pack DLC.',
    isDLC: true,
  },
  {
    id: 'fire-demon-outfit',
    name: 'Fire Demon Outfit',
    category: 'outfit',
    source: 'Fire Demon Pack DLC.',
    isDLC: true,
  },

  // ============ COSTUMES (cosmetic only) ============
  {
    id: 'white-patient-robe',
    name: 'White Patient Robe',
    category: 'costume',
    source: 'Story reward (Main Quest: The Great Symposium).',
  },
  {
    id: 'master-assassin',
    name: 'Master Assassin Costume',
    category: 'costume',
    source: 'Reach Master Assassin rank by assassinating all Order Members.',
  },
  {
    id: 'eunuch-tunic',
    name: 'Eunuch Tunic',
    category: 'costume',
    source: 'Story reward (Main Quest: The Servant and the Impostor).',
  },
  {
    id: 'far-east-merchant',
    name: 'Far East Merchant Costume',
    category: 'costume',
    source: 'Purchase from Traders.',
  },
  {
    id: 'scholar-costume',
    name: 'Scholar Costume',
    category: 'costume',
    source: 'Return all 7 Lost Books to Al-Jahiz.',
  },
  {
    id: 'treasure-hunter-costume',
    name: 'Treasure Hunter Costume',
    category: 'costume',
    source: "Return all 18 Dervis' Artifacts to Dervis.",
  },
  {
    id: 'altair-costume',
    name: 'Altaïr Costume',
    category: 'costume',
    source: 'Ubisoft Connect reward.',
    isDLC: true,
  },
  {
    id: 'basim-valhalla',
    name: 'Basim Valhalla Costume',
    category: 'costume',
    source: 'Ubisoft Connect reward.',
    isDLC: true,
  },
  {
    id: 'ezio-revelations',
    name: 'Ezio Revelations Costume',
    category: 'costume',
    source: 'Ubisoft Connect reward.',
    isDLC: true,
  },
  {
    id: 'dhahabi-initiate',
    name: 'Dhahabi Initiate of Alamut',
    category: 'costume',
    source: 'Master Assassin Pack DLC.',
    isDLC: true,
  },
  {
    id: 'dhahabi-master',
    name: 'Dhahabi Master of Alamut',
    category: 'costume',
    source: 'Master Assassin Pack DLC.',
    isDLC: true,
  },
  {
    id: 'roshan-dhahabi',
    name: 'Roshan Dhahabi',
    category: 'costume',
    source: 'Master Assassin Pack DLC.',
    isDLC: true,
  },
  {
    id: 'rayhan-dhahabi',
    name: 'Rayhan Dhahabi',
    category: 'costume',
    source: 'Master Assassin Pack DLC.',
    isDLC: true,
  },
  {
    id: 'bayeks-outfit',
    name: "Bayek's Outfit",
    category: 'costume',
    source: 'New Game+ reward.',
  },
];
