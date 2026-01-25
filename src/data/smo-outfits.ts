import { Collectible } from '@/types';

interface OutfitData {
  id: string;
  name: string;
  hat: string;
  unlockMethod: string;
  cost?: { coins?: number; purpleCoins?: number };
  moonRequirement?: number;
  kingdom?: string;
}

const outfitsData: OutfitData[] = [
  // Default/Story Outfits
  { id: 'outfit-01', name: 'Mario Cap & Suit', hat: 'Mario Cap', unlockMethod: 'Default' },
  { id: 'outfit-02', name: 'Captain\'s Hat & Suit', hat: 'Captain\'s Hat', unlockMethod: 'Cascade Kingdom story', kingdom: 'cascade' },
  { id: 'outfit-03', name: 'Sombrero & Poncho', hat: 'Sombrero', unlockMethod: 'Sand Kingdom story', kingdom: 'sand' },
  { id: 'outfit-04', name: 'Swim Goggles & Swimwear', hat: 'Swim Goggles', unlockMethod: 'Lake Kingdom story', kingdom: 'lake' },
  { id: 'outfit-05', name: 'Explorer Hat & Outfit', hat: 'Explorer Hat', unlockMethod: 'Wooded Kingdom story', kingdom: 'wooded' },
  { id: 'outfit-06', name: 'Aviator Cap & Outfit', hat: 'Aviator Cap', unlockMethod: 'Lost Kingdom story', kingdom: 'lost' },
  { id: 'outfit-07', name: 'Fedora & Suit', hat: 'Fedora', unlockMethod: 'Metro Kingdom story', kingdom: 'metro' },
  { id: 'outfit-08', name: 'Snow Hood & Outfit', hat: 'Snow Hood', unlockMethod: 'Snow Kingdom story', kingdom: 'snow' },
  { id: 'outfit-09', name: 'Resort Hat & Outfit', hat: 'Resort Hat', unlockMethod: 'Seaside Kingdom story', kingdom: 'seaside' },
  { id: 'outfit-10', name: 'Chef Hat & Outfit', hat: 'Chef Hat', unlockMethod: 'Luncheon Kingdom story', kingdom: 'luncheon' },
  { id: 'outfit-11', name: 'Samurai Helmet & Armor', hat: 'Samurai Helmet', unlockMethod: 'Bowser\'s Kingdom story', kingdom: 'bowsers' },
  { id: 'outfit-12', name: 'Tuxedo & Top Hat', hat: 'Top Hat', unlockMethod: 'Moon Kingdom story', kingdom: 'moon' },

  // Purchasable Outfits (Gold Coins)
  { id: 'outfit-13', name: 'Builder Helmet & Outfit', hat: 'Builder Helmet', unlockMethod: 'Purchase', cost: { coins: 150 } },
  { id: 'outfit-14', name: 'Golf Cap & Outfit', hat: 'Golf Cap', unlockMethod: 'Purchase', cost: { coins: 200 } },
  { id: 'outfit-15', name: 'Pirate Hat & Outfit', hat: 'Pirate Hat', unlockMethod: 'Purchase', cost: { coins: 300 } },
  { id: 'outfit-16', name: 'Sailor Hat & Outfit', hat: 'Sailor Hat', unlockMethod: 'Purchase', cost: { coins: 300 } },
  { id: 'outfit-17', name: 'Cowboy Hat & Outfit', hat: 'Cowboy Hat', unlockMethod: 'Purchase', cost: { coins: 300 } },
  { id: 'outfit-18', name: 'Mechanic Cap & Outfit', hat: 'Mechanic Cap', unlockMethod: 'Purchase', cost: { coins: 300 } },
  { id: 'outfit-19', name: 'Boxer Shorts', hat: 'None', unlockMethod: 'Purchase after Cascade', cost: { coins: 1000 } },

  // Moon Milestone Outfits
  { id: 'outfit-20', name: 'Luigi Cap & Suit', hat: 'Luigi Cap', unlockMethod: '160 Power Moons', moonRequirement: 160, cost: { coins: 200 } },
  { id: 'outfit-21', name: 'Doctor Headwear & Outfit', hat: 'Doctor Headwear', unlockMethod: '220 Power Moons', moonRequirement: 220, cost: { coins: 200 } },
  { id: 'outfit-22', name: 'Waluigi Cap & Suit', hat: 'Waluigi Cap', unlockMethod: '260-280 Power Moons', moonRequirement: 260, cost: { coins: 200 } },
  { id: 'outfit-23', name: 'Diddy Kong Hat & Outfit', hat: 'Diddy Kong Hat', unlockMethod: '300-320 Power Moons', moonRequirement: 300, cost: { coins: 200 } },
  { id: 'outfit-24', name: 'Wario Cap & Suit', hat: 'Wario Cap', unlockMethod: '340-360 Power Moons', moonRequirement: 340, cost: { coins: 200 } },
  { id: 'outfit-25', name: 'Hakama', hat: 'Hakama Headband', unlockMethod: '380 Power Moons', moonRequirement: 380, cost: { coins: 500 } },
  { id: 'outfit-26', name: 'Bridal Veil & Dress', hat: 'Bridal Veil', unlockMethod: '440 Power Moons', moonRequirement: 440, cost: { coins: 500 } },
  { id: 'outfit-27', name: 'Gold Mario Cap & Suit', hat: 'Gold Mario Cap', unlockMethod: '500-520 Power Moons', moonRequirement: 500, cost: { coins: 3000 } },
  { id: 'outfit-28', name: 'Metal Mario Cap & Suit', hat: 'Metal Mario Cap', unlockMethod: '540-560 Power Moons', moonRequirement: 540, cost: { coins: 3000 } },

  // Special Unlock Outfits
  { id: 'outfit-29', name: 'King\'s Crown & Outfit', hat: 'King\'s Crown', unlockMethod: 'Complete Dark Side', kingdom: 'dark_side' },
  { id: 'outfit-30', name: 'Invisibility Hat', hat: 'Invisibility Hat', unlockMethod: 'Complete Darker Side', kingdom: 'darker_side' },
  { id: 'outfit-31', name: 'Skeleton Suit', hat: 'Skull Mask', unlockMethod: 'Complete main story', cost: { coins: 9999 } },

  // Purple Coin Outfits (per kingdom)
  { id: 'outfit-32', name: 'Bonneter Outfit', hat: 'Bonneter Hat', unlockMethod: 'Purple coins', cost: { purpleCoins: 50 }, kingdom: 'cap' },
  { id: 'outfit-33', name: 'Caveman Outfit', hat: 'Caveman Headwear', unlockMethod: 'Purple coins', cost: { purpleCoins: 50 }, kingdom: 'cascade' },
  { id: 'outfit-34', name: 'Desert Outfit', hat: 'Desert Headwear', unlockMethod: 'Purple coins', cost: { purpleCoins: 50 }, kingdom: 'sand' },
  { id: 'outfit-35', name: 'Lake Kingdom Outfit', hat: 'Lake Kingdom Hat', unlockMethod: 'Purple coins', cost: { purpleCoins: 50 }, kingdom: 'lake' },
  { id: 'outfit-36', name: 'Scientist Outfit', hat: 'Scientist Visor', unlockMethod: 'Purple coins', cost: { purpleCoins: 50 }, kingdom: 'wooded' },
  { id: 'outfit-37', name: 'Fashionable Outfit', hat: 'Fashionable Hat', unlockMethod: 'Purple coins', cost: { purpleCoins: 50 }, kingdom: 'metro' },
  { id: 'outfit-38', name: 'Snowsuit', hat: 'Snow Suit Hood', unlockMethod: 'Purple coins', cost: { purpleCoins: 50 }, kingdom: 'snow' },
  { id: 'outfit-39', name: 'Diver Suit', hat: 'Diver Mask', unlockMethod: 'Purple coins', cost: { purpleCoins: 50 }, kingdom: 'seaside' },
  { id: 'outfit-40', name: 'Painter Outfit', hat: 'Painter\'s Cap', unlockMethod: 'Purple coins', cost: { purpleCoins: 50 }, kingdom: 'luncheon' },
  { id: 'outfit-41', name: 'Happi Outfit', hat: 'Happi Headband', unlockMethod: 'Purple coins', cost: { purpleCoins: 50 }, kingdom: 'bowsers' },
  { id: 'outfit-42', name: 'Space Suit', hat: 'Space Helmet', unlockMethod: 'Purple coins', cost: { purpleCoins: 50 }, kingdom: 'moon' },
  { id: 'outfit-43', name: 'Classic Outfit', hat: 'Classic Cap', unlockMethod: 'Purple coins', cost: { purpleCoins: 50 }, kingdom: 'mushroom' },

  // Amiibo Outfits (can also be unlocked with moons)
  { id: 'outfit-44', name: 'Mario 64 Outfit', hat: 'Mario 64 Cap', unlockMethod: 'Mario amiibo or Mushroom Kingdom', kingdom: 'mushroom' },
  { id: 'outfit-45', name: 'Wedding Outfit (Peach)', hat: 'Bridal Veil', unlockMethod: 'Peach amiibo or 440 moons', moonRequirement: 440 },
  { id: 'outfit-46', name: 'Wedding Outfit (Bowser)', hat: 'White Top Hat', unlockMethod: 'Bowser amiibo or Moon Kingdom' },
];

export const smoOutfits: Collectible[] = outfitsData.map((outfit) => ({
  id: outfit.id,
  name: outfit.name,
  type: 'outfit' as const,
  kingdom: outfit.kingdom || 'shop',
  description: `${outfit.hat} - ${outfit.unlockMethod}`,
  hint: outfit.cost
    ? `Cost: ${outfit.cost.coins ? `${outfit.cost.coins} coins` : ''}${outfit.cost.purpleCoins ? `${outfit.cost.purpleCoins} purple coins` : ''}`
    : outfit.moonRequirement
    ? `Requires ${outfit.moonRequirement} Power Moons`
    : undefined,
}));
