import { ACMirageMysteriousShard } from '@/types/ac-mirage';

// 10 Mysterious Shards — pickpocketed from black-robed NPCs (with guard escort)
// patrolling each district. Take all 10 to the hidden temple under the Northern
// Oasis to unlock Milad's Outfit, the Shamshir-e Zomorrodnegar sword, and the
// Samsaama dagger.
export const acmMysteriousShards: ACMirageMysteriousShard[] = [
  { id: 'shard-1', number: 1, region: 'harbiyah', location: 'South of the viewpoint, with two guards.' },
  { id: 'shard-2', number: 2, region: 'harbiyah', location: 'Slightly west of Damascus Gate.' },
  { id: 'shard-3', number: 3, region: 'abbasiyah', location: 'South-west of The Four Markets.' },
  { id: 'shard-4', number: 4, region: 'abbasiyah', location: 'Near a bridge.' },
  { id: 'shard-5', number: 5, region: 'karkh', location: 'Around House of the Poulterers, with a guard.' },
  { id: 'shard-6', number: 6, region: 'karkh', location: 'North of Confiscation Warehouse.' },
  { id: 'shard-7', number: 7, region: 'round-city', location: 'North-west of Basra Gate.' },
  { id: 'shard-8', number: 8, region: 'round-city', location: 'South-east of Damascus Gate.' },
  { id: 'shard-9', number: 9, region: 'wilderness', location: 'West of Anbar.' },
  { id: 'shard-10', number: 10, region: 'wilderness', location: 'Jarjaraya, southern area, with two soldiers.' },
];
