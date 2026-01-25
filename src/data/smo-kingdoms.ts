import { Kingdom } from '@/types';

// IGN Map URL base
const IGN_MAP_BASE = 'https://www.ign.com/maps/super-mario-odyssey';

export const smoKingdoms: Kingdom[] = [
  {
    id: 'cap',
    name: 'Cap Kingdom',
    shortName: 'Cap',
    moonCount: 31,
    purpleCoinCount: 50,
    color: '#FFD700', // Yellow
    mapUrl: `${IGN_MAP_BASE}/cap-kingdom`,
    coinDesign: 'Top hat shaped',
  },
  {
    id: 'cascade',
    name: 'Cascade Kingdom',
    shortName: 'Cascade',
    moonCount: 40,
    purpleCoinCount: 50,
    color: '#FFD700',
    mapUrl: `${IGN_MAP_BASE}/cascade-kingdom`,
    coinDesign: 'Stone wheel shaped',
  },
  {
    id: 'sand',
    name: 'Sand Kingdom',
    shortName: 'Sand',
    moonCount: 89,
    purpleCoinCount: 100,
    color: '#90EE90', // Green
    mapUrl: `${IGN_MAP_BASE}/sand-kingdom`,
    coinDesign: 'Pyramid shaped',
  },
  {
    id: 'lake',
    name: 'Lake Kingdom',
    shortName: 'Lake',
    moonCount: 42,
    purpleCoinCount: 50,
    color: '#FFB6C1', // Pink
    mapUrl: `${IGN_MAP_BASE}/lake-kingdom`,
    coinDesign: 'Scale shaped (Lochlady)',
  },
  {
    id: 'wooded',
    name: 'Wooded Kingdom',
    shortName: 'Wooded',
    moonCount: 76,
    purpleCoinCount: 100,
    color: '#4169E1', // Blue
    mapUrl: `${IGN_MAP_BASE}/wooded-kingdom`,
    coinDesign: 'Nut shaped',
  },
  {
    id: 'cloud',
    name: 'Cloud Kingdom',
    shortName: 'Cloud',
    moonCount: 9,
    purpleCoinCount: 0,
    color: '#FFD700',
    mapUrl: `${IGN_MAP_BASE}/cloud-kingdom`,
  },
  {
    id: 'lost',
    name: 'Lost Kingdom',
    shortName: 'Lost',
    moonCount: 35,
    purpleCoinCount: 50,
    color: '#FFD700',
    mapUrl: `${IGN_MAP_BASE}/lost-kingdom`,
    coinDesign: 'Leaf shaped (Super Leaf)',
  },
  {
    id: 'metro',
    name: 'Metro Kingdom',
    shortName: 'Metro',
    moonCount: 81,
    purpleCoinCount: 100,
    color: '#8B4513', // Brown
    mapUrl: `${IGN_MAP_BASE}/metro-kingdom`,
    coinDesign: 'Pauline portrait',
  },
  {
    id: 'snow',
    name: 'Snow Kingdom',
    shortName: 'Snow',
    moonCount: 55,
    purpleCoinCount: 50,
    color: '#FFA500', // Orange
    mapUrl: `${IGN_MAP_BASE}/snow-kingdom`,
    coinDesign: 'Snowflake shaped',
  },
  {
    id: 'seaside',
    name: 'Seaside Kingdom',
    shortName: 'Seaside',
    moonCount: 71,
    purpleCoinCount: 100,
    color: '#9370DB', // Purple
    mapUrl: `${IGN_MAP_BASE}/seaside-kingdom`,
    coinDesign: 'Shell shaped (Scallop)',
  },
  {
    id: 'luncheon',
    name: 'Luncheon Kingdom',
    shortName: 'Luncheon',
    moonCount: 68,
    purpleCoinCount: 100,
    color: '#00CED1', // Cyan
    mapUrl: `${IGN_MAP_BASE}/luncheon-kingdom`,
    coinDesign: 'Tomato shaped',
  },
  {
    id: 'ruined',
    name: 'Ruined Kingdom',
    shortName: 'Ruined',
    moonCount: 10,
    purpleCoinCount: 0,
    color: '#FFD700',
    mapUrl: `${IGN_MAP_BASE}/ruined-kingdom`,
  },
  {
    id: 'bowsers',
    name: "Bowser's Kingdom",
    shortName: "Bowser's",
    moonCount: 62,
    purpleCoinCount: 100,
    color: '#DC143C', // Red
    mapUrl: `${IGN_MAP_BASE}/bowsers-kingdom`,
    coinDesign: 'Koban coin (Bowser insignia)',
  },
  {
    id: 'moon',
    name: 'Moon Kingdom',
    shortName: 'Moon',
    moonCount: 38,
    purpleCoinCount: 50,
    color: '#FFFFFF', // White
    mapUrl: `${IGN_MAP_BASE}/moon-kingdom`,
    coinDesign: 'Star Bit shaped (Galaxy reference)',
  },
  {
    id: 'mushroom',
    name: 'Mushroom Kingdom',
    shortName: 'Mushroom',
    moonCount: 104,
    purpleCoinCount: 100,
    color: '#FFD700', // Stars
    mapUrl: `${IGN_MAP_BASE}/mushroom-kingdom`,
    coinDesign: 'SM64 Star coin',
  },
  {
    id: 'dark_side',
    name: 'Dark Side',
    shortName: 'Dark Side',
    moonCount: 24,
    purpleCoinCount: 0,
    color: '#FFD700',
    mapUrl: `${IGN_MAP_BASE}/dark-side`,
  },
  {
    id: 'darker_side',
    name: 'Darker Side',
    shortName: 'Darker Side',
    moonCount: 1,
    purpleCoinCount: 0,
    color: '#FFD700',
    mapUrl: `${IGN_MAP_BASE}/darker-side`,
  },
];

// Verified totals:
// Power Moons: 836 locations (880 total with multi-moons), up to 999 with shop purchases
// Purple Coins: 1000 total (13 kingdoms with coins, 4 without)
