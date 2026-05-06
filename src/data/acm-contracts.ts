import { ACMirageContract } from '@/types/ac-mirage';

// All 19 bureau contracts. Posted at the contract boards in the Hidden Ones'
// bureaus (board access unlocks after the main quest "Zeroing In").
// Each contract is issued by one of three factions: Scholars, Merchants,
// Soldiers. Completing 10 unlocks the "Defender of the People" trophy.
export const acmContracts: ACMirageContract[] = [
  { id: 'bronze-mirror-heist', name: 'The Bronze Mirror Heist', faction: 'scholars', reward: '2 Skill Points' },
  { id: 'weapons-dealer', name: 'The Weapons Dealer', faction: 'soldiers', reward: 'Rostam Sword' },
  { id: 'slave-merchant', name: 'The Slave Merchant', faction: 'soldiers', reward: 'Rostam Sword Upgrade Schematic' },
  { id: 'marked-coins', name: 'The Marked Coins', faction: 'merchants', reward: 'Rostam Outfit' },
  { id: 'satiric-poet', name: 'The Satiric Poet', faction: 'scholars', reward: 'Rostam Dagger' },
  { id: 'boat-heist', name: 'The Boat Heist', faction: 'merchants', reward: '115 Leather' },
  { id: 'concubine', name: 'The Concubine', faction: 'soldiers', reward: '135 Steel Ingots' },
  { id: 'botanist', name: 'The Botanist', faction: 'soldiers', reward: 'Rostam Dagger Schematic' },
  { id: 'perfume-trader', name: 'The Perfume Trader', faction: 'merchants', reward: '2 Skill Points' },
  { id: 'kidnapped-scholar', name: 'The Kidnapped Scholar', faction: 'scholars', reward: '2 Skill Points' },
  { id: 'carolingian-coin-heist', name: 'The Carolingian Coin Heist', faction: 'scholars', reward: '115 Leather' },
  { id: 'state-official', name: 'The State Official', faction: 'soldiers', reward: '2 Skill Points' },
  { id: 'traitor', name: 'The Traitor', faction: 'merchants', reward: 'Rostam Outfit Schematic' },
  { id: 'informant', name: 'The Informant', faction: 'soldiers', reward: '2 Skill Points' },
  { id: 'trade-delegate', name: 'The Trade Delegate', faction: 'merchants', reward: '135 Steel Ingots' },
  { id: 'fake-message', name: 'The Fake Message', faction: 'merchants', reward: '2 Skill Points' },
  { id: 'orions-belt', name: "Orion's Belt", faction: 'merchants', reward: 'Rostam Outfit Schematic' },
  { id: 'slave-trapper', name: 'The Slave Trapper', faction: 'soldiers', reward: 'Rostam Sword Schematic' },
  { id: 'dancer', name: 'The Dancer', faction: 'scholars', reward: 'Rostam Dagger Schematic' },
];
