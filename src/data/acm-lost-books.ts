import { ACMirageLostBook } from '@/types/ac-mirage';

// All 7 Lost Books. Return them all to Al-Jahiz at the House of Wisdom in
// Abbasiyah for the "Scholar" trophy. Books #1-6 count toward region 100%;
// book #7 (Wilderness) is unmarked and a hidden secret.
export const acmLostBooks: ACMirageLostBook[] = [
  {
    id: 'al-tabari',
    title: 'Al-Tabari: Tafsir of al-Tabari',
    region: 'harbiyah',
  },
  {
    id: 'kalila-wa-dimna',
    title: 'Kalila wa-Dimna',
    region: 'harbiyah',
  },
  {
    id: 'al-kwarizmi',
    title: 'Al-Kwarizmi: Al-Jabr',
    region: 'abbasiyah',
  },
  {
    id: 'banu-musa',
    title: 'The Banu Musa: Book of Ingenious Devices',
    region: 'karkh',
  },
  {
    id: 'al-sikkit',
    title: "Al-Sikkit: Diwan Abu Nu'as",
    region: 'round-city',
    description: 'Located inside the Palace of the Green Dome — only accessible during the campaign finale.',
  },
  {
    id: 'suleimain-al-tajir',
    title: 'Suleimain al-Tajir: Accounts of China and India',
    region: 'wilderness',
  },
  {
    id: 'kitab-al-zahif',
    title: 'Kitab Al-Zahif',
    region: 'wilderness',
    isHidden: true,
    description: 'Unmarked secret book. Does not count toward region completion, but required for the Scholar trophy.',
  },
];
