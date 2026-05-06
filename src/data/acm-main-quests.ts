import { ACMirageQuest } from '@/types/ac-mirage';

// 42 main story missions in chronological order. After the Prologue, the four
// chapter targets (Al-Ghul, Al-Rabisu, Al-Pairika, Al-Mardikhwar) can be hunted
// in any order. Al-Bahamut unlocks last.
// Source: Game8 main missions list.
export const acmMainQuests: ACMirageQuest[] = [
  // Prologue — Anbar
  { id: 'master-thief-of-anbar', name: 'The Master Thief of Anbar', arc: 'prologue', order: 1 },
  { id: 'a-new-beginning', name: 'A New Beginning', arc: 'prologue', order: 2 },
  { id: 'taking-flight', name: 'Taking Flight', arc: 'prologue', order: 3 },

  // Al-Ghul arc
  { id: 'baghdad-bound', name: 'Baghdad Bound', arc: 'al-ghul', order: 4 },
  { id: 'contact-the-rebels', name: 'Contact The Rebels', arc: 'al-ghul', order: 5 },
  { id: 'follow-nurs-lead', name: "Follow Nur's Lead", arc: 'al-ghul', order: 6 },
  { id: 'zeroing-in', name: 'Zeroing In', arc: 'al-ghul', order: 7 },
  { id: 'jailbreak', name: 'Jailbreak', arc: 'al-ghul', order: 8 },
  { id: 'a-delicate-alliance', name: 'A Delicate Alliance', arc: 'al-ghul', order: 9 },
  { id: 'first-order', name: 'First Order', arc: 'al-ghul', order: 10 },

  // Hub bridge — after First Order, before the 3 remaining chapter targets unlock
  { id: 'old-wounds', name: 'Old Wounds', arc: 'al-ghul', order: 11, region: 'anbar', description: 'Return to Anbar to find Nehal after the first Order assassination.' },
  { id: 'branching-out', name: 'Branching Out', arc: 'al-ghul', order: 12, description: 'Report to Roshan, pick a new tool, and unlock the next three investigations.' },

  // Al-Rabisu arc
  { id: 'fire-and-wisdom', name: 'Fire and Wisdom', arc: 'al-rabisu', order: 13 },
  { id: 'house-of-wisdom', name: 'House of Wisdom', arc: 'al-rabisu', order: 14 },
  { id: 'find-the-missing-brother', name: 'Find The Missing Brother', arc: 'al-rabisu', order: 15 },
  { id: 'follow-the-fiery-trail', name: 'Follow The Fiery Trail', arc: 'al-rabisu', order: 16 },
  { id: 'report-to-the-rafiq', name: 'Report to The Rafiq', arc: 'al-rabisu', order: 17 },
  { id: 'the-great-symposium', name: 'The Great Symposium', arc: 'al-rabisu', order: 18 },
  { id: 'a-job-well-done', name: 'A Job Well Done', arc: 'al-rabisu', order: 19 },

  // Al-Pairika arc
  { id: 'coins-and-daggers', name: 'Coins and Daggers', arc: 'al-pairika', order: 20 },
  { id: 'coin-corruption-and-tea', name: 'Coin, Corruption, and Tea', arc: 'al-pairika', order: 21 },
  { id: 'of-toil-and-taxes', name: 'Of Toil and Taxes', arc: 'al-pairika', order: 22 },
  { id: 'the-toll-of-greed', name: 'The Toll of Greed', arc: 'al-pairika', order: 23 },
  { id: 'a-faceless-feather', name: 'A Faceless Feather', arc: 'al-pairika', order: 24 },
  { id: 'gilded-butterflies', name: 'Gilded Butterflies', arc: 'al-pairika', order: 25 },
  { id: 'a-grand-end', name: 'A Grand End', arc: 'al-pairika', order: 26 },

  // Al-Mardikhwar arc
  { id: 'blood-and-shadows', name: 'Blood and Shadows', arc: 'al-mardikhwar', order: 27 },
  { id: 'the-hunter', name: 'The Hunter', arc: 'al-mardikhwar', order: 28 },
  { id: 'like-father-like-son', name: 'Like Father, Like Son', arc: 'al-mardikhwar', order: 29 },
  { id: 'the-raptor-and-the-demon', name: 'The Raptor and The Demon', arc: 'al-mardikhwar', order: 30 },
  { id: 'the-hunt', name: 'The Hunt', arc: 'al-mardikhwar', order: 31 },
  { id: 'bird-trap', name: 'Bird Trap', arc: 'al-mardikhwar', order: 32 },
  { id: 'to-catch-a-demon', name: 'To Catch a Demon', arc: 'al-mardikhwar', order: 33 },
  { id: 'the-chase', name: 'The Chase', arc: 'al-mardikhwar', order: 34 },
  { id: 'den-of-the-beast', name: 'Den of The Beast', arc: 'al-mardikhwar', order: 35 },
  { id: 'the-return', name: 'The Return', arc: 'al-mardikhwar', order: 36 },

  // Al-Bahamut (final arc)
  { id: 'the-head-of-the-snake', name: 'The Head of The Snake', arc: 'al-bahamut', order: 37 },
  { id: 'the-fox-and-the-hunter', name: 'The Fox and The Hunter', arc: 'al-bahamut', order: 38 },
  { id: 'the-servant-and-the-impostor', name: 'The Servant and The Impostor', arc: 'al-bahamut', order: 39 },
  { id: 'judge-and-executioner', name: 'Judge and Executioner', arc: 'al-bahamut', order: 40 },
  { id: 'one-final-counsel', name: 'One Final Counsel', arc: 'al-bahamut', order: 41 },
  { id: 'the-serpents-nest', name: "The Serpent's Nest", arc: 'al-bahamut', order: 42 },

  // Epilogue
  { id: 'the-last-journey', name: 'The Last Journey', arc: 'epilogue', order: 43 },
  { id: 'in-pursuit-of-truth', name: 'In Pursuit of Truth', arc: 'epilogue', order: 44 },

  // Side quests (named-NPC story arcs that aren't main missions but appear on the quest log)
  {
    id: 'nehals-calling',
    name: "Nehal's Calling — The Calling",
    arc: 'side-quests',
    order: 45,
    region: 'wilderness',
    description: 'Find the Hidden Place at the Northern Oasis (east of Anbar). Reveal the chamber\'s secrets by inserting all 10 Mysterious Shards into the locked alcoves to unlock the Samsaama Dagger, Shamshir-e Zomorrodnegar Sword, and Milad\'s Outfit.',
  },
  {
    id: 'dervis-shop',
    name: "Dervis' Shop — Curio Collection",
    arc: 'side-quests',
    order: 46,
    region: 'harbiyah',
    description: "Meet Dervis at his shop in the Dyeing Factory in Shari', Harbiyah (unlocks after the main quest \"Follow Nur's Lead\"). Pickpocket all 18 artifacts from civilians and turn them in for the Treasure Hunter Costume + Curio Collector trophy.",
  },
  {
    id: 'al-jahiz-lost-books',
    name: "Al-Jahiz's Lost Books — Scholar",
    arc: 'side-quests',
    order: 47,
    region: 'abbasiyah',
    description: 'Speak to Al-Jahiz at the House of Wisdom in Abbasiyah. Find all 7 Lost Books across Baghdad and the Wilderness, then return them for the Scholar Costume + Scholar trophy.',
  },
];
