import { StoryCheckpoint, PostGameItem, DLCContent } from '@/types/pokemon';

// Victory Road - 8 Gyms
export const victoryRoadCheckpoints: StoryCheckpoint[] = [
  { id: 'gym-katy', name: 'Cortondo Gym (Katy)', path: 'victory-road', order: 1, level: 15, type: 'Bug', location: 'Cortondo', reward: 'Bug Badge' },
  { id: 'gym-brassius', name: 'Artazon Gym (Brassius)', path: 'victory-road', order: 2, level: 17, type: 'Grass', location: 'Artazon', reward: 'Grass Badge' },
  { id: 'gym-iono', name: 'Levincia Gym (Iono)', path: 'victory-road', order: 3, level: 24, type: 'Electric', location: 'Levincia', reward: 'Electric Badge' },
  { id: 'gym-kofu', name: 'Cascarrafa Gym (Kofu)', path: 'victory-road', order: 4, level: 30, type: 'Water', location: 'Cascarrafa', reward: 'Water Badge' },
  { id: 'gym-larry', name: 'Medali Gym (Larry)', path: 'victory-road', order: 5, level: 35, type: 'Normal', location: 'Medali', reward: 'Normal Badge' },
  { id: 'gym-ryme', name: 'Montenevera Gym (Ryme)', path: 'victory-road', order: 6, level: 42, type: 'Ghost', location: 'Montenevera', reward: 'Ghost Badge' },
  { id: 'gym-tulip', name: 'Alfornada Gym (Tulip)', path: 'victory-road', order: 7, level: 45, type: 'Psychic', location: 'Alfornada', reward: 'Psychic Badge' },
  { id: 'gym-grusha', name: 'Glaseado Gym (Grusha)', path: 'victory-road', order: 8, level: 48, type: 'Ice', location: 'Glaseado', reward: 'Ice Badge' },
  { id: 'elite-rika', name: 'Elite Four Rika', path: 'victory-road', order: 9, level: 57, type: 'Ground', location: 'Pokemon League' },
  { id: 'elite-poppy', name: 'Elite Four Poppy', path: 'victory-road', order: 10, level: 58, type: 'Steel', location: 'Pokemon League' },
  { id: 'elite-larry-e4', name: 'Elite Four Larry', path: 'victory-road', order: 11, level: 59, type: 'Flying', location: 'Pokemon League' },
  { id: 'elite-hassel', name: 'Elite Four Hassel', path: 'victory-road', order: 12, level: 60, type: 'Dragon', location: 'Pokemon League' },
  { id: 'champion-geeta', name: 'Champion Geeta', path: 'victory-road', order: 13, level: 62, location: 'Pokemon League', reward: 'Champion Title' },
];

// Path of Legends - 5 Titans
export const pathOfLegendsCheckpoints: StoryCheckpoint[] = [
  { id: 'titan-klawf', name: 'Stony Cliff Titan (Klawf)', path: 'path-of-legends', order: 1, level: 16, type: 'Rock', location: 'South Province Area 3', reward: 'Dash ability' },
  { id: 'titan-bombirdier', name: 'Open Sky Titan (Bombirdier)', path: 'path-of-legends', order: 2, level: 20, type: 'Flying/Dark', location: 'West Province Area 1', reward: 'Swim ability' },
  { id: 'titan-orthworm', name: 'Lurking Steel Titan (Orthworm)', path: 'path-of-legends', order: 3, level: 29, type: 'Steel', location: 'East Province Area 3', reward: 'High Jump ability' },
  { id: 'titan-iron-treads', name: 'Quaking Earth Titan (Iron Treads)', path: 'path-of-legends', order: 4, level: 45, type: 'Ground/Steel', location: 'Asado Desert', reward: 'Glide ability' },
  { id: 'titan-dondozo', name: 'False Dragon Titan (Dondozo)', path: 'path-of-legends', order: 5, level: 55, type: 'Water', location: 'Casseroya Lake', reward: 'Climb ability' },
];

// Starfall Street - 5 Team Star Bases
export const starfallStreetCheckpoints: StoryCheckpoint[] = [
  { id: 'star-giacomo', name: 'Team Star Dark Crew (Giacomo)', path: 'starfall-street', order: 1, level: 21, type: 'Dark', location: 'West Province', reward: 'TM062 Foul Play' },
  { id: 'star-mela', name: 'Team Star Fire Crew (Mela)', path: 'starfall-street', order: 2, level: 27, type: 'Fire', location: 'East Province Area 1', reward: 'TM038 Flame Charge' },
  { id: 'star-atticus', name: 'Team Star Poison Crew (Atticus)', path: 'starfall-street', order: 3, level: 33, type: 'Poison', location: 'Tagtree Thicket', reward: 'TM102 Gunk Shot' },
  { id: 'star-ortega', name: 'Team Star Fairy Crew (Ortega)', path: 'starfall-street', order: 4, level: 51, type: 'Fairy', location: 'North Province Area 3', reward: 'TM079 Dazzling Gleam' },
  { id: 'star-eri', name: 'Team Star Fighting Crew (Eri)', path: 'starfall-street', order: 5, level: 56, type: 'Fighting', location: 'North Province Area 1', reward: 'TM167 Close Combat' },
  { id: 'star-cassiopeia', name: 'Cassiopeia (Penny)', path: 'starfall-street', order: 6, level: 63, location: 'Academy', reward: 'Starfall Street Complete' },
];

// The Way Home - Finale
export const theWayHomeCheckpoints: StoryCheckpoint[] = [
  { id: 'area-zero-enter', name: 'Enter Area Zero', path: 'the-way-home', order: 1, location: 'Area Zero' },
  { id: 'area-zero-research-1', name: 'Research Station 1', path: 'the-way-home', order: 2, location: 'Area Zero' },
  { id: 'area-zero-research-2', name: 'Research Station 2', path: 'the-way-home', order: 3, location: 'Area Zero' },
  { id: 'area-zero-research-3', name: 'Research Station 3', path: 'the-way-home', order: 4, location: 'Area Zero' },
  { id: 'area-zero-research-4', name: 'Research Station 4', path: 'the-way-home', order: 5, location: 'Area Zero' },
  { id: 'zero-lab', name: 'Zero Lab Discovery', path: 'the-way-home', order: 6, location: 'Zero Lab' },
  { id: 'professor-battle', name: 'Professor AI Battle', path: 'the-way-home', order: 7, level: 66, location: 'Zero Lab' },
  { id: 'credits', name: 'Main Story Complete', path: 'the-way-home', order: 8, location: 'Credits', reward: 'Post-game unlocked' },
];

// Post-Game Content
export const postGameContent: PostGameItem[] = [
  // Gym Rematches
  { id: 'rematch-katy', name: 'Gym Rematch: Katy', category: 'rematch', description: 'Level 65' },
  { id: 'rematch-brassius', name: 'Gym Rematch: Brassius', category: 'rematch', description: 'Level 65' },
  { id: 'rematch-iono', name: 'Gym Rematch: Iono', category: 'rematch', description: 'Level 65' },
  { id: 'rematch-kofu', name: 'Gym Rematch: Kofu', category: 'rematch', description: 'Level 65' },
  { id: 'rematch-larry', name: 'Gym Rematch: Larry', category: 'rematch', description: 'Level 65' },
  { id: 'rematch-ryme', name: 'Gym Rematch: Ryme', category: 'rematch', description: 'Level 66' },
  { id: 'rematch-tulip', name: 'Gym Rematch: Tulip', category: 'rematch', description: 'Level 66' },
  { id: 'rematch-grusha', name: 'Gym Rematch: Grusha', category: 'rematch', description: 'Level 66' },
  // Tournament & Raids
  { id: 'ace-tournament', name: 'Academy Ace Tournament', category: 'tournament', description: 'Complete at least once', requirement: 'All 8 Gym Rematches' },
  { id: 'raid-5star', name: '5-Star Tera Raids Unlocked', category: 'raid', requirement: 'Complete main story' },
  { id: 'raid-6star', name: '6-Star Tera Raids Unlocked', category: 'raid', requirement: 'Beat Academy Ace Tournament + 10x 4/5-star raids' },
  { id: 'raid-7star', name: '7-Star Event Raid Completed', category: 'raid', description: 'Time-limited event' },
  // Special Catches
  { id: 'catch-miraidon-2', name: 'Second Miraidon Caught', category: 'catch', description: 'Level 72 behind Zero Lab', requirement: 'Post-game' },
];

// DLC Content - Teal Mask
export const tealMaskContent: DLCContent[] = [
  { id: 'tm-story-start', name: 'Arrive at Kitakami', dlc: 'teal-mask', category: 'story' },
  { id: 'tm-festival', name: 'Festival of Masks', dlc: 'teal-mask', category: 'story' },
  { id: 'tm-loyal-three-battle', name: 'Battle the Loyal Three', dlc: 'teal-mask', category: 'story' },
  { id: 'tm-ogerpon-story', name: 'Ogerpon Story Complete', dlc: 'teal-mask', category: 'story', description: 'Ogerpon joins your team' },
  { id: 'tm-perrin-quest', name: 'Perrin Photo Quest', dlc: 'teal-mask', category: 'quest', requirement: '150 Kitakami Pokedex' },
  { id: 'tm-bloodmoon-quest', name: 'Bloodmoon Ursaluna Quest', dlc: 'teal-mask', category: 'quest', requirement: 'Perrin Photo Quest complete' },
];

// DLC Content - Indigo Disk
export const indigoDiskContent: DLCContent[] = [
  { id: 'id-story-start', name: 'Enroll at Blueberry Academy', dlc: 'indigo-disk', category: 'story' },
  { id: 'id-bb-crispin', name: 'BB Elite Four: Crispin (Fire)', dlc: 'indigo-disk', category: 'elite-four', description: '50 BP trial' },
  { id: 'id-bb-amarys', name: 'BB Elite Four: Amarys (Steel)', dlc: 'indigo-disk', category: 'elite-four', description: '50 BP trial' },
  { id: 'id-bb-lacey', name: 'BB Elite Four: Lacey (Fairy)', dlc: 'indigo-disk', category: 'elite-four', description: '50 BP trial' },
  { id: 'id-bb-drayton', name: 'BB Elite Four: Drayton (Dragon)', dlc: 'indigo-disk', category: 'elite-four', description: 'Free trial' },
  { id: 'id-bb-kieran', name: 'Champion Kieran', dlc: 'indigo-disk', category: 'elite-four', description: 'Final BB League battle' },
  { id: 'id-underdepths', name: 'Area Zero Underdepths', dlc: 'indigo-disk', category: 'story' },
  { id: 'id-terapagos', name: 'Catch Terapagos', dlc: 'indigo-disk', category: 'story', description: 'Story legendary' },
  { id: 'id-perrin-quest', name: 'Perrin Paradox Quest', dlc: 'indigo-disk', category: 'quest', requirement: '200 Blueberry Pokedex' },
  { id: 'id-bbq-10', name: '10 BBQs Completed', dlc: 'indigo-disk', category: 'quest', description: 'First Legendary Snack' },
  { id: 'id-bbq-50', name: '50 BBQs Completed', dlc: 'indigo-disk', category: 'quest' },
  { id: 'id-bbq-100', name: '100 BBQs Completed', dlc: 'indigo-disk', category: 'quest' },
  { id: 'id-bbq-130', name: '130 BBQs Completed', dlc: 'indigo-disk', category: 'quest', description: 'All solo Legendary Snacks' },
];

// DLC Content - Mochi Mayhem Epilogue
export const mochiMayhemContent: DLCContent[] = [
  { id: 'mm-start', name: 'Return to Kitakami', dlc: 'mochi-mayhem', category: 'story', requirement: 'Complete Teal Mask + Indigo Disk + Academy Ace Tournament' },
  { id: 'mm-possessed-battles', name: 'Defeat Possessed Characters', dlc: 'mochi-mayhem', category: 'story' },
  { id: 'mm-pecharunt', name: 'Catch Pecharunt', dlc: 'mochi-mayhem', category: 'story', description: 'Mythical Pokemon' },
];

// All story checkpoints combined
export const allStoryCheckpoints: StoryCheckpoint[] = [
  ...victoryRoadCheckpoints,
  ...pathOfLegendsCheckpoints,
  ...starfallStreetCheckpoints,
  ...theWayHomeCheckpoints,
];

// All DLC content combined
export const allDLCContent: DLCContent[] = [
  ...tealMaskContent,
  ...indigoDiskContent,
  ...mochiMayhemContent,
];
