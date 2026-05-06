import { ACMirageTale } from '@/types/ac-mirage';

// 6 Tales of Baghdad. Completing all is required for the Explorer trophy.
// Completing the first one unlocks the "Crossing Paths" trophy.
export const acmTales: ACMirageTale[] = [
  {
    id: 'holy-mission',
    name: 'Holy Mission',
    region: 'harbiyah',
    location: 'Harbiyah graveyard',
  },
  {
    id: 'blade-in-the-crowd',
    name: 'Blade In The Crowd, Tool In The Shed',
    region: 'abbasiyah',
    location: 'Abbasiyah market',
  },
  {
    id: 'a-lifes-work',
    name: "A Life's Work",
    region: 'abbasiyah',
    location: 'Abbasiyah Observatory',
  },
  {
    id: 'leap-of-the-faithful',
    name: 'Leap of the Faithful',
    region: 'karkh',
    location: 'Karkh district',
  },
  {
    id: 'curse-of-the-silah',
    name: "Curse Of The Si'la'",
    region: 'wilderness',
    location: 'Abandoned Village',
  },
  {
    id: 'treasure-hunt',
    name: 'Treasure Hunt',
    region: 'wilderness',
    location: 'North of Ukbara',
  },
];
