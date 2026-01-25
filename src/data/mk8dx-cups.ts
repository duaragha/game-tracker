// Mario Kart 8 Deluxe - All 24 Cups (12 Base + 12 DLC)

import { Cup, Track, MarioKartGame, EngineClass } from '@/types/mario-kart';

// Helper to create track
const track = (cupId: string, order: number, name: string): Track => ({
  id: `mk8dx-${cupId}-${order}`,
  name,
  cupId: `mk8dx-${cupId}`,
  order,
});

// Base Game Cups
export const mushroomCup: Cup = {
  id: 'mk8dx-mushroom',
  name: 'Mushroom Cup',
  type: 'grand-prix',
  tracks: [
    track('mushroom', 1, 'Mario Kart Stadium'),
    track('mushroom', 2, 'Water Park'),
    track('mushroom', 3, 'Sweet Sweet Canyon'),
    track('mushroom', 4, 'Thwomp Ruins'),
  ],
};

export const flowerCup: Cup = {
  id: 'mk8dx-flower',
  name: 'Flower Cup',
  type: 'grand-prix',
  tracks: [
    track('flower', 1, 'Mario Circuit'),
    track('flower', 2, 'Toad Harbor'),
    track('flower', 3, 'Twisted Mansion'),
    track('flower', 4, 'Shy Guy Falls'),
  ],
};

export const starCup: Cup = {
  id: 'mk8dx-star',
  name: 'Star Cup',
  type: 'grand-prix',
  tracks: [
    track('star', 1, 'Sunshine Airport'),
    track('star', 2, 'Dolphin Shoals'),
    track('star', 3, 'Electrodrome'),
    track('star', 4, 'Mount Wario'),
  ],
};

export const specialCup: Cup = {
  id: 'mk8dx-special',
  name: 'Special Cup',
  type: 'grand-prix',
  tracks: [
    track('special', 1, 'Cloudtop Cruise'),
    track('special', 2, 'Bone-Dry Dunes'),
    track('special', 3, "Bowser's Castle"),
    track('special', 4, 'Rainbow Road'),
  ],
};

export const shellCup: Cup = {
  id: 'mk8dx-shell',
  name: 'Shell Cup',
  type: 'grand-prix',
  tracks: [
    track('shell', 1, 'Moo Moo Meadows'),
    track('shell', 2, 'Mario Circuit (GBA)'),
    track('shell', 3, 'Cheep Cheep Beach'),
    track('shell', 4, "Toad's Turnpike"),
  ],
};

export const bananaCup: Cup = {
  id: 'mk8dx-banana',
  name: 'Banana Cup',
  type: 'grand-prix',
  tracks: [
    track('banana', 1, 'Dry Dry Desert'),
    track('banana', 2, 'Donut Plains 3'),
    track('banana', 3, 'Royal Raceway'),
    track('banana', 4, 'DK Jungle'),
  ],
};

export const leafCup: Cup = {
  id: 'mk8dx-leaf',
  name: 'Leaf Cup',
  type: 'grand-prix',
  tracks: [
    track('leaf', 1, 'Wario Stadium'),
    track('leaf', 2, 'Sherbet Land'),
    track('leaf', 3, 'Music Park'),
    track('leaf', 4, 'Yoshi Valley'),
  ],
};

export const lightningCup: Cup = {
  id: 'mk8dx-lightning',
  name: 'Lightning Cup',
  type: 'grand-prix',
  tracks: [
    track('lightning', 1, 'Tick-Tock Clock'),
    track('lightning', 2, 'Piranha Plant Slide'),
    track('lightning', 3, 'Grumble Volcano'),
    track('lightning', 4, 'Rainbow Road (N64)'),
  ],
};

export const eggCup: Cup = {
  id: 'mk8dx-egg',
  name: 'Egg Cup',
  type: 'grand-prix',
  tracks: [
    track('egg', 1, 'Yoshi Circuit'),
    track('egg', 2, 'Excitebike Arena'),
    track('egg', 3, 'Dragon Driftway'),
    track('egg', 4, 'Mute City'),
  ],
};

export const triforceCup: Cup = {
  id: 'mk8dx-triforce',
  name: 'Triforce Cup',
  type: 'grand-prix',
  tracks: [
    track('triforce', 1, "Wario's Goldmine"),
    track('triforce', 2, 'Rainbow Road (SNES)'),
    track('triforce', 3, 'Ice Ice Outpost'),
    track('triforce', 4, 'Hyrule Circuit'),
  ],
};

export const crossingCup: Cup = {
  id: 'mk8dx-crossing',
  name: 'Crossing Cup',
  type: 'grand-prix',
  tracks: [
    track('crossing', 1, 'Baby Park'),
    track('crossing', 2, 'Cheese Land'),
    track('crossing', 3, 'Wild Woods'),
    track('crossing', 4, 'Animal Crossing'),
  ],
};

export const bellCup: Cup = {
  id: 'mk8dx-bell',
  name: 'Bell Cup',
  type: 'grand-prix',
  tracks: [
    track('bell', 1, 'Neo Bowser City'),
    track('bell', 2, 'Ribbon Road'),
    track('bell', 3, 'Super Bell Subway'),
    track('bell', 4, 'Big Blue'),
  ],
};

// DLC Cups (Booster Course Pass)
export const goldenDashCup: Cup = {
  id: 'mk8dx-golden-dash',
  name: 'Golden Dash Cup',
  type: 'dlc',
  waveNumber: 1,
  tracks: [
    track('golden-dash', 1, 'Paris Promenade'),
    track('golden-dash', 2, 'Toad Circuit'),
    track('golden-dash', 3, 'Choco Mountain'),
    track('golden-dash', 4, 'Coconut Mall'),
  ],
};

export const luckyCatCup: Cup = {
  id: 'mk8dx-lucky-cat',
  name: 'Lucky Cat Cup',
  type: 'dlc',
  waveNumber: 1,
  tracks: [
    track('lucky-cat', 1, 'Tokyo Blur'),
    track('lucky-cat', 2, 'Shroom Ridge'),
    track('lucky-cat', 3, 'Sky Garden'),
    track('lucky-cat', 4, 'Ninja Hideaway'),
  ],
};

export const turnipCup: Cup = {
  id: 'mk8dx-turnip',
  name: 'Turnip Cup',
  type: 'dlc',
  waveNumber: 2,
  tracks: [
    track('turnip', 1, 'New York Minute'),
    track('turnip', 2, 'Mario Circuit 3'),
    track('turnip', 3, 'Kalimari Desert'),
    track('turnip', 4, 'Waluigi Pinball'),
  ],
};

export const propellerCup: Cup = {
  id: 'mk8dx-propeller',
  name: 'Propeller Cup',
  type: 'dlc',
  waveNumber: 2,
  tracks: [
    track('propeller', 1, 'Sydney Sprint'),
    track('propeller', 2, 'Snow Land'),
    track('propeller', 3, 'Mushroom Gorge'),
    track('propeller', 4, 'Sky-High Sundae'),
  ],
};

export const rockCup: Cup = {
  id: 'mk8dx-rock',
  name: 'Rock Cup',
  type: 'dlc',
  waveNumber: 3,
  tracks: [
    track('rock', 1, 'London Loop'),
    track('rock', 2, 'Boo Lake'),
    track('rock', 3, 'Maple Treeway'),
    track('rock', 4, 'Rock Rock Mountain'),
  ],
};

export const moonCup: Cup = {
  id: 'mk8dx-moon',
  name: 'Moon Cup',
  type: 'dlc',
  waveNumber: 3,
  tracks: [
    track('moon', 1, 'Rainbow Road (3DS)'),
    track('moon', 2, 'Merry Mountain'),
    track('moon', 3, 'Peach Gardens'),
    track('moon', 4, 'Berlin Byways'),
  ],
};

export const fruitCup: Cup = {
  id: 'mk8dx-fruit',
  name: 'Fruit Cup',
  type: 'dlc',
  waveNumber: 4,
  tracks: [
    track('fruit', 1, 'Amsterdam Drift'),
    track('fruit', 2, 'Riverside Park'),
    track('fruit', 3, 'DK Summit'),
    track('fruit', 4, "Yoshi's Island"),
  ],
};

export const boomerangCup: Cup = {
  id: 'mk8dx-boomerang',
  name: 'Boomerang Cup',
  type: 'dlc',
  waveNumber: 4,
  tracks: [
    track('boomerang', 1, 'Bangkok Rush'),
    track('boomerang', 2, 'Mario Circuit (DS)'),
    track('boomerang', 3, 'Waluigi Stadium'),
    track('boomerang', 4, 'Singapore Speedway'),
  ],
};

export const featherCup: Cup = {
  id: 'mk8dx-feather',
  name: 'Feather Cup',
  type: 'dlc',
  waveNumber: 5,
  tracks: [
    track('feather', 1, 'Athens Dash'),
    track('feather', 2, 'Daisy Cruiser'),
    track('feather', 3, 'Moonview Highway'),
    track('feather', 4, 'Squeaky Clean Sprint'),
  ],
};

export const cherryCup: Cup = {
  id: 'mk8dx-cherry',
  name: 'Cherry Cup',
  type: 'dlc',
  waveNumber: 5,
  tracks: [
    track('cherry', 1, 'Los Angeles Laps'),
    track('cherry', 2, 'Sunset Wilds'),
    track('cherry', 3, 'Koopa Cape'),
    track('cherry', 4, 'Vancouver Velocity'),
  ],
};

export const acornCup: Cup = {
  id: 'mk8dx-acorn',
  name: 'Acorn Cup',
  type: 'dlc',
  waveNumber: 6,
  tracks: [
    track('acorn', 1, 'Rome Avanti'),
    track('acorn', 2, 'DK Mountain'),
    track('acorn', 3, 'Daisy Circuit'),
    track('acorn', 4, 'Piranha Plant Cove'),
  ],
};

export const spinyCup: Cup = {
  id: 'mk8dx-spiny',
  name: 'Spiny Cup',
  type: 'dlc',
  waveNumber: 6,
  tracks: [
    track('spiny', 1, 'Madrid Drive'),
    track('spiny', 2, "Rosalina's Ice World"),
    track('spiny', 3, 'Bowser Castle 3'),
    track('spiny', 4, 'Rainbow Road (Wii)'),
  ],
};

// All cups combined
export const mk8dxBaseCups: Cup[] = [
  mushroomCup,
  flowerCup,
  starCup,
  specialCup,
  shellCup,
  bananaCup,
  leafCup,
  lightningCup,
  eggCup,
  triforceCup,
  crossingCup,
  bellCup,
];

export const mk8dxDlcCups: Cup[] = [
  goldenDashCup,
  luckyCatCup,
  turnipCup,
  propellerCup,
  rockCup,
  moonCup,
  fruitCup,
  boomerangCup,
  featherCup,
  cherryCup,
  acornCup,
  spinyCup,
];

export const mk8dxAllCups: Cup[] = [...mk8dxBaseCups, ...mk8dxDlcCups];

// Engine classes available
export const mk8dxEngineClasses: EngineClass[] = ['50cc', '100cc', '150cc', 'mirror', '200cc'];

// Full game definition
export const marioKart8Deluxe: MarioKartGame = {
  id: 'mk8dx',
  name: 'Mario Kart 8 Deluxe',
  shortName: 'MK8DX',
  cups: mk8dxAllCups,
  engineClasses: mk8dxEngineClasses,
  hasTimeTrials: true,
};
