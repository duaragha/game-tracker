import { ACMirageOudMelody } from '@/types/ac-mirage';

// Valley of Memory DLC — 6 Oud Melodies (5 collected on the world map atop
// high places via parkour + 1 automatic quest reward).
// Trophy: "Pro Musician".
export const acmOudMelodies: ACMirageOudMelody[] = [
  { id: 'oud-1', name: 'Oud Melody 1', location: 'AlUla Oasis rooftop.' },
  { id: 'oud-2', name: 'Oud Melody 2', location: 'AlUla city tower.' },
  { id: 'oud-3', name: 'Oud Melody 3', location: 'Hegra rock formation.' },
  { id: 'oud-4', name: 'Oud Melody 4', location: 'Northern Wilds high point.' },
  { id: 'oud-5', name: 'Oud Melody 5', location: 'Southern Wilds parkour route.' },
  { id: 'oud-quest', name: 'Quest Reward Melody', location: 'Automatic from main DLC quest.', isQuestReward: true },
];
