import { Collectible } from '@/types';

interface CaptureData {
  id: string;
  name: string;
  kingdoms: string[];
  description: string;
}

const capturesData: CaptureData[] = [
  { id: 'capture-01', name: 'Frog', kingdoms: ['cap', 'cascade', 'wooded', 'metro', 'mushroom'], description: 'Jump high and stick to walls' },
  { id: 'capture-02', name: 'Spark Pylon', kingdoms: ['cap', 'sand', 'metro', 'snow', 'bowsers', 'moon'], description: 'Travel along electric wires' },
  { id: 'capture-03', name: 'Paragoomba', kingdoms: ['cap', 'sand', 'lost'], description: 'Fly short distances' },
  { id: 'capture-04', name: 'Chain Chomp', kingdoms: ['cascade', 'sand', 'wooded', 'bowsers'], description: 'Pull back and launch to break rocks' },
  { id: 'capture-05', name: 'Big Chain Chomp', kingdoms: ['cascade'], description: 'Larger version with more power' },
  { id: 'capture-06', name: "Broode's Chain Chomp", kingdoms: ['cascade', 'dark_side'], description: 'Gold chain chomp for boss battles' },
  { id: 'capture-07', name: 'T-Rex', kingdoms: ['cascade', 'mushroom', 'darker_side'], description: 'Rampage through obstacles' },
  { id: 'capture-08', name: 'Binoculars', kingdoms: ['cascade', 'sand', 'seaside', 'moon'], description: 'Zoom in on distant locations' },
  { id: 'capture-09', name: 'Bullet Bill', kingdoms: ['sand', 'wooded', 'metro', 'bowsers', 'moon'], description: 'Fly and explode on impact' },
  { id: 'capture-10', name: 'Moe-Eye', kingdoms: ['sand', 'seaside'], description: 'Reveal hidden platforms with sunglasses' },
  { id: 'capture-11', name: 'Cactus', kingdoms: ['sand'], description: 'Walk through poison without damage' },
  { id: 'capture-12', name: 'Goomba', kingdoms: ['sand', 'metro', 'mushroom', 'dark_side'], description: 'Stack and walk on ice' },
  { id: 'capture-13', name: "Knucklotec's Fist", kingdoms: ['sand'], description: 'Boss battle fists' },
  { id: 'capture-14', name: 'Mini Rocket', kingdoms: ['sand', 'snow', 'luncheon', 'bowsers'], description: 'Launch to moon platforms' },
  { id: 'capture-15', name: 'Glydon', kingdoms: ['sand', 'lost', 'seaside', 'mushroom'], description: 'Glide long distances' },
  { id: 'capture-16', name: 'Lakitu', kingdoms: ['lake', 'seaside', 'mushroom'], description: 'Fish from clouds' },
  { id: 'capture-17', name: 'Zipper', kingdoms: ['lake', 'luncheon', 'mushroom'], description: 'Unzip to reveal passages' },
  { id: 'capture-18', name: 'Cheep Cheep', kingdoms: ['lake', 'seaside', 'mushroom'], description: 'Swim quickly underwater' },
  { id: 'capture-19', name: 'Puzzle Part', kingdoms: ['lake', 'metro'], description: 'Complete picture puzzles' },
  { id: 'capture-20', name: 'Uproot', kingdoms: ['wooded', 'metro', 'dark_side'], description: 'Extend legs to reach high places' },
  { id: 'capture-21', name: 'Coin Coffer', kingdoms: ['wooded', 'mushroom'], description: 'Collect hidden coins' },
  { id: 'capture-22', name: 'Fire Bro', kingdoms: ['wooded', 'luncheon', 'dark_side'], description: 'Throw fireballs' },
  { id: 'capture-23', name: 'Sherm', kingdoms: ['wooded', 'metro', 'bowsers', 'dark_side'], description: 'Tank with turret attack' },
  { id: 'capture-24', name: 'Tree', kingdoms: ['wooded'], description: 'Grow and shake for coins' },
  { id: 'capture-25', name: 'Boulder', kingdoms: ['wooded', 'mushroom'], description: 'Roll down slopes' },
  { id: 'capture-26', name: 'Picture Match Part (Goomba)', kingdoms: ['cloud'], description: 'Match the Goomba picture' },
  { id: 'capture-27', name: 'Tropical Wiggler', kingdoms: ['lost', 'dark_side'], description: 'Stretch to cross gaps' },
  { id: 'capture-28', name: 'Pole', kingdoms: ['metro', 'dark_side'], description: 'Climb up and fling off' },
  { id: 'capture-29', name: 'Manhole', kingdoms: ['metro'], description: 'Access underground areas' },
  { id: 'capture-30', name: 'Taxi', kingdoms: ['metro'], description: 'Drive around New Donk City' },
  { id: 'capture-31', name: 'RC Car', kingdoms: ['metro', 'mushroom'], description: 'Remote control racing' },
  { id: 'capture-32', name: 'Ty-foo', kingdoms: ['snow', 'bowsers'], description: 'Blow wind to move objects' },
  { id: 'capture-33', name: 'Shiverian Racer', kingdoms: ['snow'], description: 'Race in Bound Bowl' },
  { id: 'capture-34', name: 'Cheep Cheep (Snow)', kingdoms: ['snow'], description: 'Swim in cold water' },
  { id: 'capture-35', name: 'Gushen', kingdoms: ['seaside', 'mushroom'], description: 'Jet propulsion movement' },
  { id: 'capture-36', name: 'Lava Bubble', kingdoms: ['luncheon', 'dark_side'], description: 'Swim through lava' },
  { id: 'capture-37', name: 'Volbonan', kingdoms: ['luncheon'], description: 'Fork attack and flip' },
  { id: 'capture-38', name: 'Hammer Bro', kingdoms: ['luncheon', 'dark_side'], description: 'Throw hammers' },
  { id: 'capture-39', name: 'Meat', kingdoms: ['luncheon'], description: 'Roll to lure Cookatiel' },
  { id: 'capture-40', name: 'Fire Piranha Plant', kingdoms: ['luncheon'], description: 'Spit fireballs' },
  { id: 'capture-41', name: 'Poison Piranha Plant', kingdoms: ['luncheon', 'dark_side'], description: 'Spit poison' },
  { id: 'capture-42', name: 'Pokio', kingdoms: ['bowsers', 'dark_side', 'darker_side'], description: 'Poke and climb walls' },
  { id: 'capture-43', name: 'Jizo', kingdoms: ['bowsers'], description: 'Transform to pass guards' },
  { id: 'capture-44', name: 'Bowser Statue', kingdoms: ['moon'], description: 'Breathe fire to clear path' },
  { id: 'capture-45', name: 'Parabones', kingdoms: ['moon'], description: 'Fly in low gravity' },
  { id: 'capture-46', name: 'Banzai Bill', kingdoms: ['moon'], description: 'Large bullet bill flight' },
  { id: 'capture-47', name: 'Bowser', kingdoms: ['moon'], description: 'Final boss escape sequence' },
  { id: 'capture-48', name: "Chargin' Chuck", kingdoms: ['mushroom'], description: 'Charge through obstacles' },
  { id: 'capture-49', name: 'Letter', kingdoms: ['metro'], description: 'Form words on building' },
  { id: 'capture-50', name: 'Picture Match Part (Mario)', kingdoms: ['mushroom'], description: 'Match the Mario picture' },
  { id: 'capture-51', name: 'Yoshi', kingdoms: ['mushroom', 'dark_side', 'darker_side'], description: 'Flutter jump and eat fruit' },
  { id: 'capture-52', name: 'Cappy (Tutorial)', kingdoms: ['cap'], description: 'Initial capture tutorial' },
];

export const smoCaptures: Collectible[] = capturesData.map((capture) => ({
  id: capture.id,
  name: capture.name,
  type: 'capture' as const,
  kingdom: capture.kingdoms[0], // Primary kingdom
  description: capture.description,
  hint: `Found in: ${capture.kingdoms.join(', ')}`,
}));
