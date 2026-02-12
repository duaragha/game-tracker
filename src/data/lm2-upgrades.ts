import { Collectible } from '@/types';

// ============================================
// POLTERGUST 5000 UPGRADES (5)
// Unlocked by accumulating gold in E. Gadd's Vault
// Required for Medal 3 (Vault Completion)
// ============================================

export const lm2Upgrades: Collectible[] = [
  {
    id: 'lm2-upgrade-1',
    name: 'Power Gauge Level 2 (Green Surge)',
    type: 'upgrade',
    kingdom: 'gloomy-manor',
    order: 1,
    hint: 'Requires 2,000G accumulated',
    description: 'Increases Power Surge damage and gold earned from Power Surge captures.',
    guide: 'Accumulate 2,000G total across all missions. This is the first upgrade and should come naturally during the Gloomy Manor missions. Power Surges (charging the A-pull meter to level 2) now deal more damage to ghosts and yield more gold bars when you slam them.',
  },
  {
    id: 'lm2-upgrade-2',
    name: 'Dark-Light Level 2',
    type: 'upgrade',
    kingdom: 'haunted-towers',
    order: 2,
    hint: 'Requires 4,000G accumulated',
    description: 'Extends the Dark-Light Device meter, allowing longer use before recharging.',
    guide: 'Accumulate 4,000G total across all missions. The Dark-Light Device meter lasts longer before depleting, giving you more time to reveal hidden objects and Boos. Very helpful for finding gems and Secret Doors in later mansions.',
  },
  {
    id: 'lm2-upgrade-3',
    name: 'Power Gauge Level 3 (Red Surge)',
    type: 'upgrade',
    kingdom: 'old-clockworks',
    order: 3,
    hint: 'Requires 7,000G accumulated',
    description: 'Maximum Power Surge damage. Level 3 A-pulls yield 3 gold bars per slam.',
    guide: 'Accumulate 7,000G total across all missions. Power Surges at maximum charge now deal massive damage and drop 3 gold bars per ghost slam. This makes farming gold for the final upgrade much easier.',
  },
  {
    id: 'lm2-upgrade-4',
    name: 'Dark-Light Level 3',
    type: 'upgrade',
    kingdom: 'secret-mine',
    order: 4,
    hint: 'Requires 10,000G accumulated',
    description: 'Maximum Dark-Light Device meter capacity.',
    guide: 'Accumulate 10,000G total across all missions. The Dark-Light Device now has its maximum meter length, allowing extended use for revealing hidden objects, Spirit Balls, and Boos without needing to wait for recharge.',
  },
  {
    id: 'lm2-upgrade-5',
    name: 'Super Poltergust',
    type: 'upgrade',
    kingdom: 'treacherous-mansion',
    order: 5,
    hint: 'Requires 20,000G accumulated',
    description: 'The ultimate upgrade. Fills the power bar faster and drains ghost HP faster.',
    guide: 'Accumulate 20,000G total across all missions. This is the final and most impactful upgrade. The Poltergust power bar fills much faster during captures, and ghost HP drains significantly faster. This makes 3-starring missions MUCH easier. Replay earlier missions with full treasure collection to reach 20,000G. Tip: Boss replays with level-3 Power Surges are great for farming gold.',
  },
];
