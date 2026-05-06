import { ACMirageAchievement } from '@/types/ac-mirage';

// All 51 PS5 trophies (50 Xbox achievements without Platinum) for AC Mirage.
// Source: PowerPyx trophy guide.
export const acmAchievements: ACMirageAchievement[] = [
  // Platinum
  {
    id: 'master-of-his-fate',
    name: 'Master of His Fate',
    description: 'Earn all other trophies in Assassin\'s Creed Mirage.',
    rarity: 'platinum',
  },

  // Gold
  {
    id: 'bal-kullun-mumkin',
    name: 'Bal kullun mumkin',
    description: "Discover Basim's past.",
    rarity: 'gold',
  },

  // Silver (14)
  { id: 'la-shay-a', name: "La shay'a waqi'un mutlaq", description: 'Become an Initiate of the Hidden Ones.', rarity: 'silver' },
  { id: 'blood-of-a-ghoul', name: 'The Blood of a Ghoul', description: 'Eliminate Al-Ghul.', rarity: 'silver' },
  { id: 'head-of-the-snake', name: 'The Head of the Snake', description: 'Eliminate the Head of the Order.', rarity: 'silver' },
  { id: 'self-improvement', name: 'Self-Improvement', description: 'Unlock all skills.', rarity: 'silver' },
  { id: 'fearless', name: 'Fearless', description: 'Synchronize all viewpoints.', rarity: 'silver' },
  { id: 'defender-of-the-people', name: 'Defender of the People', description: 'Complete 10 faction contracts.', rarity: 'silver' },
  { id: 'tools-of-the-trade', name: 'Tools of the Trade', description: 'Fully upgrade all tools.', rarity: 'silver' },
  { id: 'eagles-eye', name: "Eagle's Eye", description: 'Kill 75 guards with throwing knives.', rarity: 'silver' },
  { id: 'hands-of-a-thief', name: 'The Hands of a Thief', description: 'Pickpocket 50 people.', rarity: 'silver' },
  { id: 'curio-collector', name: 'Curio Collector', description: 'Pickpocket all 18 artifacts and bring them to Dervis.', rarity: 'silver' },
  { id: 'notorious', name: 'Notorious', description: 'Stay at maximum notoriety for 10 minutes.', rarity: 'silver' },
  { id: 'unstoppable', name: 'Unstoppable', description: "Kill 5 guards with one use of Assassin's Focus.", rarity: 'silver' },
  { id: 'eagles-will', name: "Eagle's Will", description: 'Survive 10 minutes in open conflict.', rarity: 'silver' },
  { id: 'gifted-escapist', name: 'Gifted Escapist', description: 'Collapse 20 scaffolding structures.', rarity: 'silver' },

  // Bronze (35)
  { id: 'master-thief-of-anbar', name: 'The Master Thief of Anbar', description: 'Complete the Prologue.', rarity: 'bronze' },
  { id: 'blood-of-a-demon', name: 'The Blood of a Demon', description: 'Eliminate Al-Rabisu.', rarity: 'bronze' },
  { id: 'blood-of-an-enchantress', name: 'The Blood of an Enchantress', description: 'Eliminate Al-Pairika.', rarity: 'bronze' },
  { id: 'blood-of-a-spymaster', name: 'The Blood of a Spymaster', description: 'Eliminate Al-Mardikhwar.', rarity: 'bronze' },
  { id: 'serving-the-light', name: 'Serving the Light', description: 'Reach maximum Hidden One Rank.', rarity: 'bronze' },
  { id: 'cutting-edge', name: 'Cutting Edge', description: 'Fully upgrade a weapon.', rarity: 'bronze' },
  { id: 'thick-skin', name: 'Thick Skin', description: 'Fully upgrade an outfit.', rarity: 'bronze' },
  { id: 'fashion-statement', name: 'Fashion Statement', description: 'Apply dye to an outfit.', rarity: 'bronze' },
  { id: 'masquerader', name: 'Masquerader', description: 'Obtain both disguises.', rarity: 'bronze' },
  { id: 'treasure-seeker', name: 'Treasure Seeker', description: 'Open a token chest.', rarity: 'bronze' },
  { id: 'potion-collector', name: 'Potion Collector', description: 'Obtain a total of 10 elixirs.', rarity: 'bronze' },
  { id: 'bird-of-prey', name: 'Bird of Prey', description: 'Tag 100 guards using Enkidu.', rarity: 'bronze' },
  { id: 'explorer', name: 'Explorer', description: 'Fully explore all territories.', rarity: 'bronze' },
  { id: 'crossing-paths', name: 'Crossing Paths', description: 'Complete a Tale from Baghdad.', rarity: 'bronze' },
  { id: 'scholar', name: 'Scholar', description: 'Bring all 7 lost books to Al-Jahiz.', rarity: 'bronze' },
  { id: 'riddle-me-this', name: 'Riddle Me This', description: 'Obtain a treasure by solving an enigma.', rarity: 'bronze' },
  { id: 'headhunter', name: 'Headhunter', description: 'Headshot 20 guards with throwing knives.', rarity: 'bronze' },
  { id: 'sleep-tight', name: 'Sleep Tight', description: 'Put 10 guards to sleep with blowdarts.', rarity: 'bronze' },
  { id: 'ambush', name: 'Ambush', description: 'Have 10 guards trigger traps.', rarity: 'bronze' },
  { id: 'up-in-smoke', name: 'Up in Smoke', description: 'Affect 20 guards with smoke bombs.', rarity: 'bronze' },
  { id: 'attention-seeker', name: 'Attention Seeker', description: 'Distract 10 guards with noisemakers.', rarity: 'bronze' },
  { id: 'you-snooze-you-lose', name: 'You Snooze, You Lose', description: 'Pickpocket a guard affected by a blowdart.', rarity: 'bronze', missable: true },
  { id: 'hoarder', name: 'Hoarder', description: 'Save up 2007 dirhams.', rarity: 'bronze' },
  { id: 'dawn-and-dusk', name: 'Dawn and Dusk', description: 'Use benches to pass time 5 times.', rarity: 'bronze' },
  { id: 'patron-of-the-arts', name: 'Patron of the Arts', description: 'Pay musicians 5 times.', rarity: 'bronze' },
  { id: 'patron-of-sell-swords', name: 'Patron of Sell-Swords', description: 'Pay mercenaries 5 times.', rarity: 'bronze' },
  { id: 'patron-of-industry', name: 'Patron of Industry', description: 'Pay merchant groups 5 times.', rarity: 'bronze' },
  { id: 'blade-in-the-crowd', name: 'Blade in the Crowd', description: 'Assassinate 10 guards while blending with the crowd.', rarity: 'bronze' },
  { id: 'surprise', name: 'Surprise!', description: 'Assassinate 10 guards from hiding spots.', rarity: 'bronze' },
  { id: 'shadow-and-the-flame', name: 'The Shadow and the Flame', description: 'Defeat a Shakiriyya in combat.', rarity: 'bronze' },
  { id: 'silencer', name: 'Silencer', description: "Destroy a Horn Bearer's horn with a throwing knife.", rarity: 'bronze' },
  { id: 'poster-boy', name: 'Poster Boy', description: 'At maximum notoriety, become anonymous by tearing down wanted posters.', rarity: 'bronze' },
  { id: 'spread-the-news', name: 'Spread the News', description: 'Use the services of a Munadi 3 times.', rarity: 'bronze' },
  { id: 'true-hidden-one', name: 'A True Hidden One', description: 'Assassinate 10 guards in a row without triggering open conflict.', rarity: 'bronze' },
  { id: 'street-cleaner', name: 'Street Cleaner', description: 'Hide 5 bodies in bales of hay.', rarity: 'bronze' },
];
