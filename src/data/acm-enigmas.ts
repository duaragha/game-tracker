import { ACMirageEnigma } from '@/types/ac-mirage';

// All 12 Enigmas in AC Mirage. Each rewards either a cosmetic dye or a Talisman.
// Solving any unlocks the "Riddle Me This" trophy.
export const acmEnigmas: ACMirageEnigma[] = [
  // Harbiyah (3)
  { id: 'a-holy-hoard', name: 'A Holy Hoard', region: 'harbiyah' },
  { id: 'left-behind', name: 'Left Behind', region: 'harbiyah' },
  { id: 'find-what-i-stole', name: 'Find What I Stole!', region: 'harbiyah' },

  // Abbasiyah (3)
  { id: 'delight-by-the-dome', name: 'Delight by the Dome', region: 'abbasiyah' },
  { id: 'a-challenge', name: 'A Challenge', region: 'abbasiyah' },
  { id: 'the-gift', name: 'The Gift', region: 'abbasiyah' },

  // Karkh (1)
  { id: 'solve-this-problem-quickly', name: 'Solve This Problem Quickly For Me', region: 'karkh' },

  // Round City (2)
  { id: 'just-rewards', name: 'Just Rewards', region: 'round-city' },
  { id: 'a-gift-for-you', name: 'A Gift For You', region: 'round-city' },

  // Wilderness (3)
  { id: 'surrender', name: 'Surrender', region: 'wilderness' },
  { id: 'joy-beneath-weeping-palms', name: 'Joy Beneath Weeping Palms', region: 'wilderness' },
  { id: 'reap-from-the-ruins', name: 'Reap from the Ruins', region: 'wilderness' },
];
