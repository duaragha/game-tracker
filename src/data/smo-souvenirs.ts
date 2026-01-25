import { Collectible } from '@/types';

// Souvenirs and Stickers in Super Mario Odyssey (43 total)
// Purchased from Crazy Cap shops with purple coins
// Souvenirs are placed inside the Odyssey, stickers on its exterior

export const smoSouvenirs: Collectible[] = [
  // === CAP KINGDOM (3) ===
  {
    id: 'souvenir-cap-1',
    name: 'Plush Frog',
    type: 'souvenir',
    kingdom: 'cap',
    description: 'A cute frog plushie. Makes a unique sound if you hop on it. Costs 5 purple coins.',
  },
  {
    id: 'souvenir-cap-2',
    name: 'Bonneton Tower Model',
    type: 'souvenir',
    kingdom: 'cap',
    description: 'A model of the iconic Top-Hat Tower. Has unique sound effects when interacted with. Costs 25 purple coins.',
  },
  {
    id: 'sticker-cap',
    name: 'Cap Kingdom Sticker',
    type: 'sticker',
    kingdom: 'cap',
    description: 'A Bonneton Top-Hat sticker for the Odyssey exterior. Costs 5 purple coins.',
  },

  // === CASCADE KINGDOM (3) ===
  {
    id: 'souvenir-cascade-1',
    name: 'T-Rex Model',
    type: 'souvenir',
    kingdom: 'cascade',
    description: 'A miniature T-Rex figure from Fossil Falls. Costs 5 purple coins.',
  },
  {
    id: 'souvenir-cascade-2',
    name: 'Triceratops Trophy',
    type: 'souvenir',
    kingdom: 'cascade',
    description: 'A trophy featuring a Triceratops skull. Costs 25 purple coins.',
  },
  {
    id: 'sticker-cascade',
    name: 'Cascade Kingdom Sticker',
    type: 'sticker',
    kingdom: 'cascade',
    description: 'A Fossil Falls themed sticker. Costs 5 purple coins.',
  },

  // === SAND KINGDOM (3) ===
  {
    id: 'souvenir-sand-1',
    name: 'Inverted Pyramid Model',
    type: 'souvenir',
    kingdom: 'sand',
    description: 'A model of the mysterious Inverted Pyramid. Costs 25 purple coins.',
  },
  {
    id: 'souvenir-sand-2',
    name: 'Jaxi Statue',
    type: 'souvenir',
    kingdom: 'sand',
    description: 'A stone statue of a Jaxi mount. Costs 5 purple coins.',
  },
  {
    id: 'sticker-sand',
    name: 'Sand Kingdom Sticker',
    type: 'sticker',
    kingdom: 'sand',
    description: 'A Tostarena desert themed sticker. Costs 10 purple coins.',
  },

  // === LAKE KINGDOM (3) ===
  {
    id: 'souvenir-lake-1',
    name: 'Underwater Dome Model',
    type: 'souvenir',
    kingdom: 'lake',
    description: 'A model of the Lake Lamode underwater dome. Makes an interesting sound when Mario jumps on it. Costs 25 purple coins.',
  },
  {
    id: 'souvenir-lake-2',
    name: 'Rubber Dorrie',
    type: 'souvenir',
    kingdom: 'lake',
    description: 'A cute rubber Dorrie toy. Costs 5 purple coins.',
  },
  {
    id: 'sticker-lake',
    name: 'Lake Kingdom Sticker',
    type: 'sticker',
    kingdom: 'lake',
    description: 'A Lake Lamode themed sticker. Costs 5 purple coins.',
  },

  // === WOODED KINGDOM (3) ===
  {
    id: 'souvenir-wooded-1',
    name: 'Flowers from Steam Gardens',
    type: 'souvenir',
    kingdom: 'wooded',
    description: 'Beautiful flowers from the Steam Gardens. Costs 5 purple coins.',
  },
  {
    id: 'souvenir-wooded-2',
    name: 'Steam Gardener Watering Can',
    type: 'souvenir',
    kingdom: 'wooded',
    description: 'A watering can used by the Steam Gardeners. Costs 25 purple coins.',
  },
  {
    id: 'sticker-wooded',
    name: 'Wooded Kingdom Sticker',
    type: 'sticker',
    kingdom: 'wooded',
    description: 'A Steam Gardens themed sticker. Costs 10 purple coins.',
  },

  // === LOST KINGDOM (3) ===
  {
    id: 'souvenir-lost-1',
    name: 'Potted Palm Tree',
    type: 'souvenir',
    kingdom: 'lost',
    description: 'A small potted palm tree from Forgotten Isle. Costs 5 purple coins.',
  },
  {
    id: 'souvenir-lost-2',
    name: 'Butterfly Mobile',
    type: 'souvenir',
    kingdom: 'lost',
    description: 'A hanging mobile with tropical butterflies. Costs 25 purple coins.',
  },
  {
    id: 'sticker-lost',
    name: 'Lost Kingdom Sticker',
    type: 'sticker',
    kingdom: 'lost',
    description: 'A Forgotten Isle themed sticker. Costs 5 purple coins.',
  },

  // === METRO KINGDOM (3) ===
  {
    id: 'souvenir-metro-1',
    name: 'Pauline Statue',
    type: 'souvenir',
    kingdom: 'metro',
    description: 'A statue of Mayor Pauline. Costs 25 purple coins.',
  },
  {
    id: 'souvenir-metro-2',
    name: 'New Donk City Hall Model',
    type: 'souvenir',
    kingdom: 'metro',
    description: 'A miniature model of New Donk City Hall. Costs 5 purple coins.',
  },
  {
    id: 'sticker-metro',
    name: 'Metro Kingdom Sticker',
    type: 'sticker',
    kingdom: 'metro',
    description: 'A New Donk City themed sticker. Costs 10 purple coins.',
  },

  // === SNOW KINGDOM (3) ===
  {
    id: 'souvenir-snow-1',
    name: 'Shiverian Rug',
    type: 'souvenir',
    kingdom: 'snow',
    description: 'A cozy rug with Shiverian patterns. Costs 5 purple coins.',
  },
  {
    id: 'souvenir-snow-2',
    name: 'Shiverian Nesting Dolls',
    type: 'souvenir',
    kingdom: 'snow',
    description: 'Traditional Shiverian nesting dolls. Costs 25 purple coins.',
  },
  {
    id: 'sticker-snow',
    name: 'Snow Kingdom Sticker',
    type: 'sticker',
    kingdom: 'snow',
    description: 'A Shiveria themed sticker. Costs 5 purple coins.',
  },

  // === SEASIDE KINGDOM (3) ===
  {
    id: 'souvenir-seaside-1',
    name: 'Sand Jar',
    type: 'souvenir',
    kingdom: 'seaside',
    description: 'A decorative jar filled with Bubblaine sand. Costs 25 purple coins.',
  },
  {
    id: 'souvenir-seaside-2',
    name: 'Glass Tower Model',
    type: 'souvenir',
    kingdom: 'seaside',
    description: 'A glass model of the Seaside Kingdom lighthouse. Costs 5 purple coins.',
  },
  {
    id: 'sticker-seaside',
    name: 'Seaside Kingdom Sticker',
    type: 'sticker',
    kingdom: 'seaside',
    description: 'A Bubblaine beach themed sticker. Costs 10 purple coins.',
  },

  // === LUNCHEON KINGDOM (3) ===
  {
    id: 'souvenir-luncheon-1',
    name: 'Souvenir Forks',
    type: 'souvenir',
    kingdom: 'luncheon',
    description: 'Decorative forks from Mount Volbono. Costs 5 purple coins.',
  },
  {
    id: 'souvenir-luncheon-2',
    name: 'Vegetable Plate',
    type: 'souvenir',
    kingdom: 'luncheon',
    description: 'A plate of colorful Volbono vegetables. Costs 25 purple coins.',
  },
  {
    id: 'sticker-luncheon',
    name: 'Luncheon Kingdom Sticker',
    type: 'sticker',
    kingdom: 'luncheon',
    description: 'A Mount Volbono cooking themed sticker. Costs 10 purple coins.',
  },

  // === BOWSER'S KINGDOM (3) ===
  {
    id: 'souvenir-bowsers-1',
    name: 'Paper Lantern',
    type: 'souvenir',
    kingdom: 'bowsers',
    description: 'A traditional Japanese-style paper lantern. Costs 5 purple coins.',
  },
  {
    id: 'souvenir-bowsers-2',
    name: 'Jizo Statue',
    type: 'souvenir',
    kingdom: 'bowsers',
    description: 'A small Jizo statue from the castle grounds. Costs 25 purple coins.',
  },
  {
    id: 'sticker-bowsers',
    name: "Bowser's Kingdom Sticker",
    type: 'sticker',
    kingdom: 'bowsers',
    description: 'A Japanese castle themed sticker. Costs 10 purple coins.',
  },

  // === MOON KINGDOM (3) ===
  {
    id: 'souvenir-moon-1',
    name: 'Moon Rock Fragment',
    type: 'souvenir',
    kingdom: 'moon',
    description: 'A piece of authentic Moon rock. Costs 5 purple coins.',
  },
  {
    id: 'souvenir-moon-2',
    name: 'Moon Lamp',
    type: 'souvenir',
    kingdom: 'moon',
    description: 'A glowing lamp shaped like the Moon. Costs 25 purple coins.',
  },
  {
    id: 'sticker-moon',
    name: 'Moon Kingdom Sticker',
    type: 'sticker',
    kingdom: 'moon',
    description: 'A Honeylune Ridge themed sticker. Costs 5 purple coins.',
  },

  // === MUSHROOM KINGDOM (7) ===
  {
    id: 'souvenir-mushroom-1',
    name: 'Mushroom Cushion Set',
    type: 'souvenir',
    kingdom: 'mushroom',
    description: 'A set of comfy mushroom-shaped cushions. Costs 10 purple coins.',
  },
  {
    id: 'souvenir-mushroom-2',
    name: "Peach's Castle Model",
    type: 'souvenir',
    kingdom: 'mushroom',
    description: "A detailed model of Princess Peach's Castle. Costs 25 purple coins.",
  },
  {
    id: 'sticker-mushroom-pipe',
    name: 'Pipe Sticker',
    type: 'sticker',
    kingdom: 'mushroom',
    description: 'A classic green warp pipe sticker. Costs 5 purple coins.',
  },
  {
    id: 'sticker-mushroom-coin',
    name: 'Coin Sticker',
    type: 'sticker',
    kingdom: 'mushroom',
    description: 'A shiny gold coin sticker. Costs 5 purple coins.',
  },
  {
    id: 'sticker-mushroom-block',
    name: 'Block Sticker',
    type: 'sticker',
    kingdom: 'mushroom',
    description: 'A brick block sticker. Costs 5 purple coins.',
  },
  {
    id: 'sticker-mushroom-question',
    name: '? Block Sticker',
    type: 'sticker',
    kingdom: 'mushroom',
    description: 'A question block sticker. Costs 5 purple coins.',
  },
  {
    id: 'sticker-mushroom',
    name: 'Mushroom Kingdom Sticker',
    type: 'sticker',
    kingdom: 'mushroom',
    description: "A Peach's Castle themed sticker. Costs 10 purple coins.",
  },
];
