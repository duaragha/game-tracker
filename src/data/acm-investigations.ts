import { ACMirageInvestigation } from '@/types/ac-mirage';

// Order of the Ancients in AC Mirage. The 5 main "Bloods" each get their own
// trophy and are tied to a chapter. Lesser members appear during chapter
// missions but aren't standalone investigation targets in the way prior AC
// games (Odyssey/Valhalla) had multi-target boards.
export const acmInvestigations: ACMirageInvestigation[] = [
  // The 5 Bloods (chapter bosses)
  {
    id: 'al-ghul',
    codename: 'Al-Ghul',
    realName: "Mas'ood Al-Ya'qoob",
    rank: 'blood',
    arc: 'al-ghul',
    order: 1,
    trophy: 'The Blood of a Ghoul',
    description: 'A soap-mill owner serving as Order spymaster in Karkh.',
  },
  {
    id: 'al-rabisu',
    codename: 'Al-Rabisu',
    realName: 'The Demon',
    rank: 'blood',
    arc: 'al-rabisu',
    order: 2,
    trophy: 'The Blood of a Demon',
    description: 'Order target tied to the House of Wisdom and a deadly symposium.',
  },
  {
    id: 'al-pairika',
    codename: 'Al-Pairika',
    realName: 'The Enchantress',
    rank: 'blood',
    arc: 'al-pairika',
    order: 3,
    trophy: 'The Blood of an Enchantress',
    description: 'Tax-collecting Order operative manipulating the Caliph\'s court.',
  },
  {
    id: 'al-mardikhwar',
    codename: 'Al-Mardikhwar',
    realName: 'The Spymaster',
    rank: 'blood',
    arc: 'al-mardikhwar',
    order: 4,
    trophy: 'The Blood of a Spymaster',
    description: 'Order huntsman who sets traps for Hidden Ones.',
  },
  {
    id: 'al-bahamut',
    codename: 'Al-Bahamut',
    realName: 'Head of the Order',
    rank: 'father',
    arc: 'al-bahamut',
    order: 5,
    trophy: 'The Head of the Snake',
    description: 'The Father of Understanding — leader of the Order of the Ancients.',
  },

  // Lesser Order members ("Fingers") encountered during chapter missions
  {
    id: 'the-treasurer',
    codename: 'The Treasurer',
    realName: 'Ning',
    rank: 'finger',
    arc: 'al-pairika',
    region: 'karkh',
    order: 6,
    description: 'Chinese Order member seeking an ancient artifact in Baghdad.',
  },
  {
    id: 'the-harbormaster',
    codename: 'The Harbormaster',
    rank: 'finger',
    region: 'karkh',
    arc: 'al-ghul',
    order: 7,
    description: 'Runs Karkh Customs; seizes packages bound for the rebels.',
  },
  {
    id: 'the-tax-collector',
    codename: 'The Tax Collector',
    rank: 'finger',
    arc: 'al-pairika',
    region: 'wilderness',
    order: 8,
    description: 'Exploits merchants and executes rebels in Sharqiyah.',
  },
  {
    id: 'the-warlord',
    codename: 'The Warlord',
    realName: 'Wasif',
    rank: 'finger',
    arc: 'al-mardikhwar',
    region: 'harbiyah',
    order: 9,
    description: 'Fear-mongering warlord hunting rebels through Baghdad.',
  },
];
