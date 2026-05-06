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

  // Al-Rabisu arc
  { id: 'fire-and-wisdom', name: 'Fire and Wisdom', arc: 'al-rabisu', order: 11 },
  { id: 'house-of-wisdom', name: 'House of Wisdom', arc: 'al-rabisu', order: 12 },
  { id: 'find-the-missing-brother', name: 'Find The Missing Brother', arc: 'al-rabisu', order: 13 },
  { id: 'follow-the-fiery-trail', name: 'Follow The Fiery Trail', arc: 'al-rabisu', order: 14 },
  { id: 'report-to-the-rafiq', name: 'Report to The Rafiq', arc: 'al-rabisu', order: 15 },
  { id: 'the-great-symposium', name: 'The Great Symposium', arc: 'al-rabisu', order: 16 },
  { id: 'a-job-well-done', name: 'A Job Well Done', arc: 'al-rabisu', order: 17 },

  // Al-Pairika arc
  { id: 'coins-and-daggers', name: 'Coins and Daggers', arc: 'al-pairika', order: 18 },
  { id: 'coin-corruption-and-tea', name: 'Coin, Corruption, and Tea', arc: 'al-pairika', order: 19 },
  { id: 'of-toil-and-taxes', name: 'Of Toil and Taxes', arc: 'al-pairika', order: 20 },
  { id: 'the-toll-of-greed', name: 'The Toll of Greed', arc: 'al-pairika', order: 21 },
  { id: 'a-faceless-feather', name: 'A Faceless Feather', arc: 'al-pairika', order: 22 },
  { id: 'gilded-butterflies', name: 'Gilded Butterflies', arc: 'al-pairika', order: 23 },
  { id: 'a-grand-end', name: 'A Grand End', arc: 'al-pairika', order: 24 },

  // Al-Mardikhwar arc
  { id: 'blood-and-shadows', name: 'Blood and Shadows', arc: 'al-mardikhwar', order: 25 },
  { id: 'the-hunter', name: 'The Hunter', arc: 'al-mardikhwar', order: 26 },
  { id: 'like-father-like-son', name: 'Like Father, Like Son', arc: 'al-mardikhwar', order: 27 },
  { id: 'the-raptor-and-the-demon', name: 'The Raptor and The Demon', arc: 'al-mardikhwar', order: 28 },
  { id: 'the-hunt', name: 'The Hunt', arc: 'al-mardikhwar', order: 29 },
  { id: 'bird-trap', name: 'Bird Trap', arc: 'al-mardikhwar', order: 30 },
  { id: 'to-catch-a-demon', name: 'To Catch a Demon', arc: 'al-mardikhwar', order: 31 },
  { id: 'the-chase', name: 'The Chase', arc: 'al-mardikhwar', order: 32 },
  { id: 'den-of-the-beast', name: 'Den of The Beast', arc: 'al-mardikhwar', order: 33 },
  { id: 'the-return', name: 'The Return', arc: 'al-mardikhwar', order: 34 },

  // Al-Bahamut (final arc)
  { id: 'the-head-of-the-snake', name: 'The Head of The Snake', arc: 'al-bahamut', order: 35 },
  { id: 'the-fox-and-the-hunter', name: 'The Fox and The Hunter', arc: 'al-bahamut', order: 36 },
  { id: 'the-servant-and-the-impostor', name: 'The Servant and The Impostor', arc: 'al-bahamut', order: 37 },
  { id: 'judge-and-executioner', name: 'Judge and Executioner', arc: 'al-bahamut', order: 38 },
  { id: 'one-final-counsel', name: 'One Final Counsel', arc: 'al-bahamut', order: 39 },
  { id: 'the-serpents-nest', name: "The Serpent's Nest", arc: 'al-bahamut', order: 40 },

  // Epilogue
  { id: 'the-last-journey', name: 'The Last Journey', arc: 'epilogue', order: 41 },
  { id: 'in-pursuit-of-truth', name: 'In Pursuit of Truth', arc: 'epilogue', order: 42 },
];
