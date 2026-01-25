// Mario Kart World - All Cups and Knockout Rallies

import { Cup, Track, MarioKartGame, EngineClass } from '@/types/mario-kart';

// Helper to create track
const track = (cupId: string, order: number, name: string): Track => ({
  id: `mkworld-${cupId}-${order}`,
  name,
  cupId: `mkworld-${cupId}`,
  order,
});

// Grand Prix Cups
export const mkwMushroomCup: Cup = {
  id: 'mkworld-mushroom',
  name: 'Mushroom Cup',
  type: 'grand-prix',
  tracks: [
    track('mushroom', 1, 'Mario Bros. Circuit'),
    track('mushroom', 2, 'Crown City'),
    track('mushroom', 3, 'Whistlestop Summit'),
    track('mushroom', 4, 'DK Spaceport'),
  ],
};

export const mkwFlowerCup: Cup = {
  id: 'mkworld-flower',
  name: 'Flower Cup',
  type: 'grand-prix',
  tracks: [
    track('flower', 1, 'Desert Hills'),
    track('flower', 2, 'Shy Guy Bazaar'),
    track('flower', 3, 'Wario Stadium'),
    track('flower', 4, 'Airship Fortress'),
  ],
};

export const mkwStarCup: Cup = {
  id: 'mkworld-star',
  name: 'Star Cup',
  type: 'grand-prix',
  tracks: [
    track('star', 1, 'DK Pass'),
    track('star', 2, 'Starview Peak'),
    track('star', 3, 'Sky-High Sundae'),
    track('star', 4, 'Wario Shipyard'),
  ],
};

export const mkwShellCup: Cup = {
  id: 'mkworld-shell',
  name: 'Shell Cup',
  type: 'grand-prix',
  tracks: [
    track('shell', 1, 'Koopa Troopa Beach'),
    track('shell', 2, 'Faraway Oasis'),
    track('shell', 3, 'Crown City'),
    track('shell', 4, 'Peach Stadium'),
  ],
};

export const mkwBananaCup: Cup = {
  id: 'mkworld-banana',
  name: 'Banana Cup',
  type: 'grand-prix',
  tracks: [
    track('banana', 1, 'Peach Beach'),
    track('banana', 2, 'Salty Salty Speedway'),
    track('banana', 3, 'Dino Dino Jungle'),
    track('banana', 4, 'Great ? Block Ruins'),
  ],
};

export const mkwLeafCup: Cup = {
  id: 'mkworld-leaf',
  name: 'Leaf Cup',
  type: 'grand-prix',
  tracks: [
    track('leaf', 1, 'Cheep Cheep Falls'),
    track('leaf', 2, 'Dandelion Depths'),
    track('leaf', 3, 'Boo Cinema'),
    track('leaf', 4, 'Dry Bones Burnout'),
  ],
};

export const mkwLightningCup: Cup = {
  id: 'mkworld-lightning',
  name: 'Lightning Cup',
  type: 'grand-prix',
  tracks: [
    track('lightning', 1, 'Moo Moo Meadows'),
    track('lightning', 2, 'Choco Mountain'),
    track('lightning', 3, "Toad's Factory"),
    track('lightning', 4, "Bowser's Castle"),
  ],
};

export const mkwSpecialCup: Cup = {
  id: 'mkworld-special',
  name: 'Special Cup',
  type: 'grand-prix',
  tracks: [
    track('special', 1, 'Acorn Heights'),
    track('special', 2, 'Mario Circuit'),
    track('special', 3, 'Peach Stadium'),
    track('special', 4, 'Rainbow Road'),
  ],
};

// Knockout Tour Rallies (6 tracks each)
export const goldenRally: Cup = {
  id: 'mkworld-rally-golden',
  name: 'Golden Rally',
  type: 'knockout-rally',
  tracks: [
    track('rally-golden', 1, 'Desert Hills'),
    track('rally-golden', 2, 'Mario Bros. Circuit'),
    track('rally-golden', 3, 'Choco Mountain'),
    track('rally-golden', 4, 'Moo Moo Meadows'),
    track('rally-golden', 5, 'Mario Circuit'),
    track('rally-golden', 6, 'Acorn Heights'),
  ],
};

export const iceRally: Cup = {
  id: 'mkworld-rally-ice',
  name: 'Ice Rally',
  type: 'knockout-rally',
  tracks: [
    track('rally-ice', 1, 'Sky-High Sundae'),
    track('rally-ice', 2, 'Starview Peak'),
    track('rally-ice', 3, 'Dandelion Depths'),
    track('rally-ice', 4, 'Cheep Cheep Falls'),
    track('rally-ice', 5, 'Peach Stadium'),
    track('rally-ice', 6, 'Crown City'),
  ],
};

export const moonRally: Cup = {
  id: 'mkworld-rally-moon',
  name: 'Moon Rally',
  type: 'knockout-rally',
  tracks: [
    track('rally-moon', 1, "Bowser's Castle"),
    track('rally-moon', 2, "Toad's Factory"),
    track('rally-moon', 3, 'Moo Moo Meadows'),
    track('rally-moon', 4, 'Dandelion Depths'),
    track('rally-moon', 5, 'Cheep Cheep Falls'),
    track('rally-moon', 6, 'Dino Dino Jungle'),
  ],
};

export const spinyRally: Cup = {
  id: 'mkworld-rally-spiny',
  name: 'Spiny Rally',
  type: 'knockout-rally',
  tracks: [
    track('rally-spiny', 1, 'Boo Cinema'),
    track('rally-spiny', 2, 'Starview Peak'),
    track('rally-spiny', 3, 'DK Pass'),
    track('rally-spiny', 4, 'Salty Salty Speedway'),
    track('rally-spiny', 5, 'Peach Beach'),
    track('rally-spiny', 6, 'Wario Shipyard'),
  ],
};

export const cherryRally: Cup = {
  id: 'mkworld-rally-cherry',
  name: 'Cherry Rally',
  type: 'knockout-rally',
  tracks: [
    track('rally-cherry', 1, 'Peach Beach'),
    track('rally-cherry', 2, 'Dino Dino Jungle'),
    track('rally-cherry', 3, 'Koopa Troopa Beach'),
    track('rally-cherry', 4, 'DK Spaceport'),
    track('rally-cherry', 5, 'Whistlestop Summit'),
    track('rally-cherry', 6, 'Desert Hills'),
  ],
};

export const acornRally: Cup = {
  id: 'mkworld-rally-acorn',
  name: 'Acorn Rally',
  type: 'knockout-rally',
  tracks: [
    track('rally-acorn', 1, "Toad's Factory"),
    track('rally-acorn', 2, 'Wario Stadium'),
    track('rally-acorn', 3, 'Choco Mountain'),
    track('rally-acorn', 4, 'Peach Stadium'),
    track('rally-acorn', 5, 'Cheep Cheep Falls'),
    track('rally-acorn', 6, 'DK Pass'),
  ],
};

export const cloudRally: Cup = {
  id: 'mkworld-rally-cloud',
  name: 'Cloud Rally',
  type: 'knockout-rally',
  tracks: [
    track('rally-cloud', 1, 'Airship Fortress'),
    track('rally-cloud', 2, 'Shy Guy Bazaar'),
    track('rally-cloud', 3, 'Mario Bros. Circuit'),
    track('rally-cloud', 4, 'Crown City'),
    track('rally-cloud', 5, 'Faraway Oasis'),
    track('rally-cloud', 6, 'Great ? Block Ruins'),
  ],
};

export const heartRally: Cup = {
  id: 'mkworld-rally-heart',
  name: 'Heart Rally',
  type: 'knockout-rally',
  tracks: [
    track('rally-heart', 1, 'Shy Guy Bazaar'),
    track('rally-heart', 2, 'Airship Fortress'),
    track('rally-heart', 3, 'Dry Bones Burnout'),
    track('rally-heart', 4, 'Mario Circuit'),
    track('rally-heart', 5, 'Moo Moo Meadows'),
    track('rally-heart', 6, 'Peach Stadium'),
  ],
};

// All Grand Prix cups
export const mkwGrandPrixCups: Cup[] = [
  mkwMushroomCup,
  mkwFlowerCup,
  mkwStarCup,
  mkwShellCup,
  mkwBananaCup,
  mkwLeafCup,
  mkwLightningCup,
  mkwSpecialCup,
];

// All Knockout Rallies
export const mkwKnockoutRallies: Cup[] = [
  goldenRally,
  iceRally,
  moonRally,
  spinyRally,
  cherryRally,
  acornRally,
  cloudRally,
  heartRally,
];

// Engine classes for Grand Prix
export const mkwGPEngineClasses: EngineClass[] = ['50cc', '100cc', '150cc', 'mirror'];

// Engine classes for Knockout Tour (no Mirror mode)
export const mkwKnockoutEngineClasses: EngineClass[] = ['50cc', '100cc', '150cc'];

// Full game definition
export const marioKartWorld: MarioKartGame = {
  id: 'mkworld',
  name: 'Mario Kart World',
  shortName: 'MK World',
  cups: mkwGrandPrixCups,
  engineClasses: mkwGPEngineClasses,
  hasTimeTrials: true,
  knockoutRallies: mkwKnockoutRallies,
  knockoutEngineClasses: mkwKnockoutEngineClasses,
};
