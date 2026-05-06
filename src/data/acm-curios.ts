import { ACMirageCurio } from '@/types/ac-mirage';

// Dervis' Artifacts — 18 curios pickpocketed from civilians and turned in to
// Dervis at his shop in the Dyeing Factory in Shari', Harbiyah. Spawn after
// completing the main quest "Follow Nur's Lead". Full set rewards the
// Treasure Hunter Costume + "Curio Collector" trophy.
export const acmCurios: ACMirageCurio[] = [
  // Harbiyah (4)
  { id: 'scandinavian-brooch', name: 'Scandinavian Brooch', region: 'harbiyah', location: 'In the fields, carried by a man near the stalls.' },
  { id: 'money-cowrie', name: 'Money Cowrie', region: 'harbiyah', location: 'On someone shoveling hay.' },
  { id: 'aksumite-amulet', name: 'Aksumite Amulet', region: 'harbiyah', location: 'A woman working outside the Dyeing Factory.' },
  { id: 'buddhist-votive-plaque', name: 'Buddhist Votive Plaque', region: 'harbiyah', location: 'On a man in a yard.' },

  // Abbasiyah (4)
  { id: 'small-chinese-box', name: 'Small Chinese Box', region: 'abbasiyah', location: 'A woman at The Four Markets.' },
  { id: 'tang-censer', name: 'Tang Censer', region: 'abbasiyah', location: 'A worker handling bricks.' },
  { id: 'round-moon-plaque', name: 'Round Moon Plaque', region: 'abbasiyah', location: 'A woman north of the Hammam, near the river.' },
  { id: 'olibanum', name: 'Olibanum', region: 'abbasiyah', location: 'On a man walking around east of The Great Bimaristan.' },

  // Karkh (4)
  { id: 'ivory-chess-piece', name: 'Ivory Chess Piece', region: 'karkh', location: 'Between Monastery of the Virgins and House of Poulterers.' },
  { id: 'jade-comb', name: 'Jade Comb', region: 'karkh', location: 'Market area south of Harbor Camp.' },
  { id: 'glass-weight', name: 'Glass Weight', region: 'karkh', location: 'Carried by someone working with carpets.' },
  { id: 'decorated-shell', name: 'Decorated Shell', region: 'karkh', location: 'East of The Bazaar.' },

  // Round City (3)
  { id: 'pyxis', name: 'Pyxis', region: 'round-city', location: 'Southeast of Shurta Headquarters.' },
  { id: 'coptic-censer', name: 'Coptic Censer', region: 'round-city', location: 'South of the Harem.' },
  { id: 'sillan-christian-cross', name: 'Sillan Christian Cross', region: 'round-city', location: 'West of the Postal Bureau.' },

  // Wilderness (3)
  { id: 'staurotheke', name: 'Staurotheke', region: 'wilderness', location: 'Southwest of the Winter Palace.' },
  { id: 'kissi-penny', name: 'Kissi Penny', region: 'wilderness', location: '150m east of the Excavation Site, in the desert.' },
  { id: 'byzantine-bracelet', name: 'Byzantine Bracelet', region: 'wilderness', location: 'In the village of Jarjaraya.' },
];
