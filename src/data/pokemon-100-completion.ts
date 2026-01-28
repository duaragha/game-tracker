// Pokemon Violet 100% Completion Data
// Based on comprehensive completion spreadsheet

import {
  SixStarRaid,
  SandwichRecipe,
  RotomPhoneCase,
  Emote,
  Tablecloth,
  PaldeaSight,
  KitakamiWonder,
  PokemonMark,
  PokemonRibbon,
  LeagueOfficial,
  MiniGame,
} from '@/types/pokemon';

// ============================================
// 6-STAR TERA RAIDS (123 total)
// ============================================

export const paldeaRaids: SixStarRaid[] = [
  // Paldea raids
  { id: 'raid-amoonguss', pokemon: 'Amoonguss', region: 'paldea' },
  { id: 'raid-annihilape', pokemon: 'Annihilape', region: 'paldea' },
  { id: 'raid-armarouge', pokemon: 'Armarouge', region: 'paldea' },
  { id: 'raid-avalugg', pokemon: 'Avalugg', region: 'paldea' },
  { id: 'raid-baxcalibur', pokemon: 'Baxcalibur', region: 'paldea' },
  { id: 'raid-blissey', pokemon: 'Blissey', region: 'paldea' },
  { id: 'raid-bombirdier', pokemon: 'Bombirdier', region: 'paldea' },
  { id: 'raid-breloom', pokemon: 'Breloom', region: 'paldea' },
  { id: 'raid-ceruledge', pokemon: 'Ceruledge', region: 'paldea' },
  { id: 'raid-cetitan', pokemon: 'Cetitan', region: 'paldea' },
  { id: 'raid-clawitzer', pokemon: 'Clawitzer', region: 'paldea' },
  { id: 'raid-clodsire', pokemon: 'Clodsire', region: 'paldea' },
  { id: 'raid-corviknight', pokemon: 'Corviknight', region: 'paldea' },
  { id: 'raid-cyclizar', pokemon: 'Cyclizar', region: 'paldea' },
  { id: 'raid-dachsbun', pokemon: 'Dachsbun', region: 'paldea' },
  { id: 'raid-ditto', pokemon: 'Ditto', region: 'paldea' },
  { id: 'raid-dondozo', pokemon: 'Dondozo', region: 'paldea' },
  { id: 'raid-dragalge', pokemon: 'Dragalge', region: 'paldea' },
  { id: 'raid-dragapult', pokemon: 'Dragapult', region: 'paldea' },
  { id: 'raid-dragonite', pokemon: 'Dragonite', region: 'paldea' },
  { id: 'raid-espeon', pokemon: 'Espeon', region: 'paldea' },
  { id: 'raid-farigiraf', pokemon: 'Farigiraf', region: 'paldea' },
  { id: 'raid-flareon', pokemon: 'Flareon', region: 'paldea' },
  { id: 'raid-frosmoth', pokemon: 'Frosmoth', region: 'paldea' },
  { id: 'raid-gallade', pokemon: 'Gallade', region: 'paldea' },
  { id: 'raid-garchomp', pokemon: 'Garchomp', region: 'paldea' },
  { id: 'raid-gardevoir', pokemon: 'Gardevoir', region: 'paldea' },
  { id: 'raid-garganacl', pokemon: 'Garganacl', region: 'paldea' },
  { id: 'raid-gengar', pokemon: 'Gengar', region: 'paldea' },
  { id: 'raid-glaceon', pokemon: 'Glaceon', region: 'paldea' },
  { id: 'raid-glimmora', pokemon: 'Glimmora', region: 'paldea' },
  { id: 'raid-goodra', pokemon: 'Goodra', region: 'paldea' },
  { id: 'raid-grafaiai', pokemon: 'Grafaiai', region: 'paldea' },
  { id: 'raid-gyarados', pokemon: 'Gyarados', region: 'paldea' },
  { id: 'raid-haxorus', pokemon: 'Haxorus', region: 'paldea' },
  { id: 'raid-heracross', pokemon: 'Heracross', region: 'paldea' },
  { id: 'raid-hippowdon', pokemon: 'Hippowdon', region: 'paldea' },
  { id: 'raid-hydreigon', pokemon: 'Hydreigon', region: 'paldea' },
  { id: 'raid-jolteon', pokemon: 'Jolteon', region: 'paldea' },
  { id: 'raid-kilowattrel', pokemon: 'Kilowattrel', region: 'paldea' },
  { id: 'raid-kingambit', pokemon: 'Kingambit', region: 'paldea' },
  { id: 'raid-klawf', pokemon: 'Klawf', region: 'paldea' },
  { id: 'raid-leafeon', pokemon: 'Leafeon', region: 'paldea' },
  { id: 'raid-lycanroc', pokemon: 'Lycanroc', region: 'paldea' },
  { id: 'raid-mabosstiff', pokemon: 'Mabosstiff', region: 'paldea' },
];

export const kitakamiRaids: SixStarRaid[] = [
  { id: 'raid-ambipom', pokemon: 'Ambipom', region: 'kitakami' },
  { id: 'raid-basculegion', pokemon: 'Basculegion', region: 'kitakami' },
  { id: 'raid-chandelure', pokemon: 'Chandelure', region: 'kitakami' },
  { id: 'raid-clefable', pokemon: 'Clefable', region: 'kitakami' },
  { id: 'raid-conkeldurr', pokemon: 'Conkeldurr', region: 'kitakami' },
  { id: 'raid-crawdaunt', pokemon: 'Crawdaunt', region: 'kitakami' },
  { id: 'raid-dusknoir', pokemon: 'Dusknoir', region: 'kitakami' },
  { id: 'raid-gliscor', pokemon: 'Gliscor', region: 'kitakami' },
  { id: 'raid-golem', pokemon: 'Golem', region: 'kitakami' },
  { id: 'raid-kommo-o', pokemon: 'Kommo-o', region: 'kitakami' },
  { id: 'raid-leavanny', pokemon: 'Leavanny', region: 'kitakami' },
  { id: 'raid-ludicolo', pokemon: 'Ludicolo', region: 'kitakami' },
  { id: 'raid-mamoswine', pokemon: 'Mamoswine', region: 'kitakami' },
  { id: 'raid-mandibuzz', pokemon: 'Mandibuzz', region: 'kitakami' },
  { id: 'raid-mienshao', pokemon: 'Mienshao', region: 'kitakami' },
  { id: 'raid-milotic', pokemon: 'Milotic', region: 'kitakami' },
  { id: 'raid-morpeko', pokemon: 'Morpeko', region: 'kitakami' },
];

export const blueberryRaids: SixStarRaid[] = [
  { id: 'raid-alcremie', pokemon: 'Alcremie', region: 'blueberry' },
  { id: 'raid-dugtrio-alolan', pokemon: 'Dugtrio (Alolan)', region: 'blueberry' },
  { id: 'raid-duraludon', pokemon: 'Duraludon', region: 'blueberry' },
  { id: 'raid-electivire', pokemon: 'Electivire', region: 'blueberry' },
  { id: 'raid-excadrill', pokemon: 'Excadrill', region: 'blueberry' },
  { id: 'raid-exeggutor-alolan', pokemon: 'Exeggutor (Alolan)', region: 'blueberry' },
  { id: 'raid-flygon', pokemon: 'Flygon', region: 'blueberry' },
  { id: 'raid-golem-alolan', pokemon: 'Golem (Alolan)', region: 'blueberry' },
  { id: 'raid-golurk', pokemon: 'Golurk', region: 'blueberry' },
  { id: 'raid-kingdra', pokemon: 'Kingdra', region: 'blueberry' },
  { id: 'raid-kleavor', pokemon: 'Kleavor', region: 'blueberry' },
  { id: 'raid-lapras', pokemon: 'Lapras', region: 'blueberry' },
  { id: 'raid-magmortar', pokemon: 'Magmortar', region: 'blueberry' },
  { id: 'raid-malamar', pokemon: 'Malamar', region: 'blueberry' },
  { id: 'raid-metagross', pokemon: 'Metagross', region: 'blueberry' },
  { id: 'raid-muk-alolan', pokemon: 'Muk (Alolan)', region: 'blueberry' },
  { id: 'raid-ninetales-alolan', pokemon: 'Ninetales (Alolan)', region: 'blueberry' },
  { id: 'raid-overqwil', pokemon: 'Overqwil', region: 'blueberry' },
];

export const allSixStarRaids: SixStarRaid[] = [...paldeaRaids, ...kitakamiRaids, ...blueberryRaids];

// ============================================
// SANDWICH RECIPES (151 total)
// ============================================

export const sandwichRecipes: SandwichRecipe[] = Array.from({ length: 151 }, (_, i) => ({
  id: `recipe-${i + 1}`,
  number: i + 1,
}));

// ============================================
// ROTOM PHONE CASES (67 total)
// ============================================

export const rotomPhoneCases: RotomPhoneCase[] = [
  // Pokemon Cases
  { id: 'case-pikachu', name: 'Pikachu Case', category: 'pokemon' },
  { id: 'case-eevee', name: 'Eevee Case', category: 'pokemon' },
  { id: 'case-sprigatito', name: 'Sprigatito Case', category: 'pokemon' },
  { id: 'case-fuecoco', name: 'Fuecoco Case', category: 'pokemon' },
  { id: 'case-quaxly', name: 'Quaxly Case', category: 'pokemon' },
  { id: 'case-komala-log', name: 'Komala Log Case', category: 'pokemon' },
  // Default & Basic Colors
  { id: 'case-default', name: 'Default Case', category: 'basic' },
  { id: 'case-yellow', name: 'Yellow Case', category: 'basic' },
  { id: 'case-green', name: 'Green Case', category: 'basic' },
  { id: 'case-purple', name: 'Purple Case', category: 'basic' },
  { id: 'case-pink', name: 'Pink Case', category: 'basic' },
  { id: 'case-blue', name: 'Blue Case', category: 'basic' },
  { id: 'case-turquoise', name: 'Turquoise Case', category: 'basic' },
  { id: 'case-olive', name: 'Olive Case', category: 'basic' },
  { id: 'case-rose', name: 'Rose Case', category: 'basic' },
  { id: 'case-brown', name: 'Brown Case', category: 'basic' },
  { id: 'case-lavender', name: 'Lavender Case', category: 'basic' },
  { id: 'case-cream', name: 'Cream Case', category: 'basic' },
  { id: 'case-dark-green', name: 'Dark Green Case', category: 'basic' },
  { id: 'case-wine-red', name: 'Wine Red Case', category: 'basic' },
  { id: 'case-orange', name: 'Orange Case', category: 'basic' },
  { id: 'case-sky-blue', name: 'Sky Blue Case', category: 'basic' },
  { id: 'case-navy-blue', name: 'Navy Blue Case', category: 'basic' },
  { id: 'case-cocoa-brown', name: 'Cocoa Brown Case', category: 'basic' },
  { id: 'case-dark-brown', name: 'Dark Brown Case', category: 'basic' },
  { id: 'case-white', name: 'White Case', category: 'basic' },
  { id: 'case-black', name: 'Black Case', category: 'basic' },
  // Type Cases
  { id: 'case-water', name: 'Water Case', category: 'type' },
  { id: 'case-fire', name: 'Fire Case', category: 'type' },
  { id: 'case-electric', name: 'Electric Case', category: 'type' },
  { id: 'case-normal', name: 'Normal Case', category: 'type' },
  { id: 'case-flying', name: 'Flying Case', category: 'type' },
  { id: 'case-bug', name: 'Bug Case', category: 'type' },
  { id: 'case-fighting', name: 'Fighting Case', category: 'type' },
  { id: 'case-psychic', name: 'Psychic Case', category: 'type' },
  { id: 'case-ghost', name: 'Ghost Case', category: 'type' },
  { id: 'case-ground', name: 'Ground Case', category: 'type' },
  { id: 'case-rock', name: 'Rock Case', category: 'type' },
  { id: 'case-ice', name: 'Ice Case', category: 'type' },
  { id: 'case-dark', name: 'Dark Case', category: 'type' },
  { id: 'case-fairy', name: 'Fairy Case', category: 'type' },
  { id: 'case-poison', name: 'Poison Case', category: 'type' },
  { id: 'case-steel', name: 'Steel Case', category: 'type' },
  { id: 'case-dragon', name: 'Dragon Case', category: 'type' },
  { id: 'case-grass', name: 'Grass Case', category: 'type' },
];

// ============================================
// EMOTES (29 total)
// ============================================

export const emotes: Emote[] = [
  { id: 'emote-act-cool', name: 'Act Cool' },
  { id: 'emote-cheer', name: 'Cheer' },
  { id: 'emote-clap', name: 'Clap' },
  { id: 'emote-fighting-stance', name: 'Fighting Stance' },
  { id: 'emote-hello', name: 'Hello!' },
  { id: 'emote-hero-pose', name: 'Hero Pose' },
  { id: 'emote-i-choose-you', name: 'I Choose You!' },
  { id: 'emote-make-heart', name: 'Make a Heart' },
  { id: 'emote-nope', name: 'Nope' },
  { id: 'emote-oh-dear', name: 'Oh Dear!' },
  { id: 'emote-over-here', name: 'Over Here!' },
  { id: 'emote-peace', name: 'Peace!' },
  { id: 'emote-power-pose', name: 'Power Pose' },
  { id: 'emote-roar', name: 'Roar!' },
  { id: 'emote-thumbs-up', name: 'Thumbs Up' },
  { id: 'emote-wave', name: 'Wave' },
  { id: 'emote-whats-that', name: "What's That?" },
  { id: 'emote-whats-this', name: "What's This?" },
  { id: 'emote-whoa', name: 'Whoa!' },
  { id: 'emote-yup', name: 'Yup' },
];

// ============================================
// TABLECLOTHS (19 total)
// ============================================

export const tablecloths: Tablecloth[] = [
  { id: 'cloth-academy', name: 'Academy Tablecloth' },
  { id: 'cloth-bw-grass', name: 'B&W Grass Tablecloth' },
  { id: 'cloth-battle', name: 'Battle Tablecloth' },
  { id: 'cloth-blue', name: 'Blue Tablecloth' },
  { id: 'cloth-diamond', name: 'Diamond Tablecloth' },
  { id: 'cloth-leafy', name: 'Leafy Tablecloth' },
  { id: 'cloth-lilac', name: 'Lilac Tablecloth' },
  { id: 'cloth-mint', name: 'Mint Tablecloth' },
  { id: 'cloth-monstrous', name: 'Monstrous Tablecloth' },
  { id: 'cloth-peach', name: 'Peach Tablecloth' },
  { id: 'cloth-pink', name: 'Pink Tablecloth' },
  { id: 'cloth-plaid-b', name: 'Plaid Tablecloth (B)' },
  { id: 'cloth-plaid-r', name: 'Plaid Tablecloth (R)' },
];

// ============================================
// TEN SIGHTS OF PALDEA (10 total)
// ============================================

export const paldeaSights: PaldeaSight[] = [
  { id: 'sight-olive-orchard', name: 'Grand Olive Orchard' },
  { id: 'sight-secluded-beach', name: 'Secluded Beach' },
  { id: 'sight-colonnade-hollow', name: 'Colonnade Hollow' },
  { id: 'sight-million-volt', name: 'Million Volt Skyline' },
  { id: 'sight-leaking-tower', name: 'Leaking Tower of Paldea' },
  { id: 'sight-fury-falls', name: 'Fury Falls' },
  { id: 'sight-gracia-stones', name: 'Gracia Stones' },
  { id: 'sight-casseroya-falls', name: 'Casseroya Falls' },
  { id: 'sight-glaseado-grasp', name: "Glaseado's Grasp" },
  { id: 'sight-highest-peak', name: "Paldea's Highest Peak" },
];

// ============================================
// SIX WONDERS OF KITAKAMI (6 total)
// ============================================

export const kitakamiWonders: KitakamiWonder[] = [
  { id: 'wonder-gracious-stones', name: 'Gracious Stones' },
  { id: 'wonder-wisteria-pond', name: 'Wisteria Pond' },
  { id: 'wonder-mossfell', name: 'Mossfell Confluence' },
  { id: 'wonder-fallen-horn', name: 'The Fallen Horn' },
  { id: 'wonder-crystal-pool', name: 'Crystal Pool' },
  { id: 'wonder-infernal-pass', name: 'Infernal Pass' },
];

// ============================================
// POKEMON MARKS (51 total)
// ============================================

export const pokemonMarks: PokemonMark[] = [
  { id: 'mark-absent-minded', name: 'Absent-Minded Mark' },
  { id: 'mark-alpha', name: 'Alpha Mark' },
  { id: 'mark-angry', name: 'Angry Mark' },
  { id: 'mark-blizzard', name: 'Blizzard Mark' },
  { id: 'mark-calmness', name: 'Calmness Mark' },
  { id: 'mark-charismatic', name: 'Charismatic Mark' },
  { id: 'mark-cloudy', name: 'Cloudy Mark' },
  { id: 'mark-crafty', name: 'Crafty Mark' },
  { id: 'mark-dawn', name: 'Dawn Mark' },
  { id: 'mark-destiny', name: 'Destiny Mark' },
  { id: 'mark-dry', name: 'Dry Mark' },
  { id: 'mark-dusk', name: 'Dusk Mark' },
  { id: 'mark-excited', name: 'Excited Mark' },
  { id: 'mark-ferocious', name: 'Ferocious Mark' },
  { id: 'mark-fishing', name: 'Fishing Mark' },
  { id: 'mark-flustered', name: 'Flustered Mark' },
  { id: 'mark-gourmand', name: 'Gourmand Mark' },
  { id: 'mark-humble', name: 'Humble Mark' },
  { id: 'mark-intellectual', name: 'Intellectual Mark' },
  { id: 'mark-intense', name: 'Intense Mark' },
  { id: 'mark-itemfinder', name: 'Itemfinder Mark' },
  { id: 'mark-jittery', name: 'Jittery Mark' },
  { id: 'mark-joyful', name: 'Joyful Mark' },
  { id: 'mark-jumbo', name: 'Jumbo Mark' },
  { id: 'mark-kindly', name: 'Kindly Mark' },
  { id: 'mark-lunchtime', name: 'Lunchtime Mark' },
  { id: 'mark-mightiest', name: 'Mightiest Mark' },
  { id: 'mark-mini', name: 'Mini Mark' },
  { id: 'mark-partner', name: 'Partner Mark' },
  { id: 'mark-peeved', name: 'Peeved Mark' },
  { id: 'mark-prideful', name: 'Prideful Mark' },
  { id: 'mark-pumped-up', name: 'Pumped-Up Mark' },
  { id: 'mark-rainy', name: 'Rainy Mark' },
];

// ============================================
// POKEMON RIBBONS (57 total)
// ============================================

export const pokemonRibbons: PokemonRibbon[] = [
  { id: 'ribbon-alert', name: 'Alert Ribbon' },
  { id: 'ribbon-alola-champion', name: 'Alola Champion Ribbon' },
  { id: 'ribbon-artist', name: 'Artist Ribbon' },
  { id: 'ribbon-battle-champion', name: 'Battle Champion Ribbon' },
  { id: 'ribbon-battle-memory', name: 'Battle Memory Ribbon' },
  { id: 'ribbon-battle-royal-master', name: 'Battle Royal Master Ribbon' },
  { id: 'ribbon-battle-tree-great', name: 'Battle Tree Great Ribbon' },
  { id: 'ribbon-battle-tree-master', name: 'Battle Tree Master Ribbon' },
  { id: 'ribbon-beauty-master', name: 'Beauty Master Ribbon' },
  { id: 'ribbon-best-friends', name: 'Best Friends Ribbon' },
  { id: 'ribbon-birthday', name: 'Birthday Ribbon' },
  { id: 'ribbon-careless', name: 'Careless Ribbon' },
  { id: 'ribbon-champion', name: 'Champion Ribbon' },
  { id: 'ribbon-classic', name: 'Classic Ribbon' },
  { id: 'ribbon-cleverness-master', name: 'Cleverness Master Ribbon' },
  { id: 'ribbon-contest-memory', name: 'Contest Memory Ribbon' },
  { id: 'ribbon-contest-star', name: 'Contest Star Ribbon' },
  { id: 'ribbon-coolness-master', name: 'Coolness Master Ribbon' },
  { id: 'ribbon-country', name: 'Country Ribbon' },
  { id: 'ribbon-cuteness-master', name: 'Cuteness Master Ribbon' },
  { id: 'ribbon-downcast', name: 'Downcast Ribbon' },
  { id: 'ribbon-earth', name: 'Earth Ribbon' },
  { id: 'ribbon-effort', name: 'Effort Ribbon' },
  { id: 'ribbon-event', name: 'Event Ribbon' },
  { id: 'ribbon-expert-battler', name: 'Expert Battler Ribbon' },
  { id: 'ribbon-footprint', name: 'Footprint Ribbon' },
  { id: 'ribbon-galar-champion', name: 'Galar Champion Ribbon' },
  { id: 'ribbon-gorgeous', name: 'Gorgeous Ribbon' },
  { id: 'ribbon-gorgeous-royal', name: 'Gorgeous Royal Ribbon' },
  { id: 'ribbon-hisui', name: 'Hisui Ribbon' },
  { id: 'ribbon-hoenn-champion', name: 'Hoenn Champion Ribbon' },
  { id: 'ribbon-kalos-champion', name: 'Kalos Champion Ribbon' },
  { id: 'ribbon-legend', name: 'Legend Ribbon' },
  { id: 'ribbon-master-rank', name: 'Master Rank Ribbon' },
  { id: 'ribbon-national-champion', name: 'National Champion Ribbon' },
  { id: 'ribbon-national', name: 'National Ribbon' },
];

// ============================================
// LEAGUE CHALLENGE OFFICIALS (19 total)
// ============================================

export const leagueOfficials: LeagueOfficial[] = [
  { id: 'official-mesagoza-south', name: 'Mesagoza South', location: 'Mesagoza South Gate' },
  { id: 'official-cortondo-east', name: 'Cortondo East', location: 'East of Cortondo' },
  { id: 'official-sp4-watchtower', name: 'South Province Area 4 Watchtower', location: 'South Province Area 4' },
  { id: 'official-sp5', name: 'South Province Area 5', location: 'South Province Area 5' },
  { id: 'official-sp3', name: 'South Province Area 3', location: 'South Province Area 3' },
  { id: 'official-ep1', name: 'East Province Area 1', location: 'East Province Area 1' },
  { id: 'official-levincia-south', name: 'Levincia South', location: 'South of Levincia' },
  { id: 'official-wp1-north', name: 'West Province Area 1 North', location: 'North West Province Area 1' },
  { id: 'official-cascarrafa-north', name: 'Cascarrafa North', location: 'North of Cascarrafa' },
  { id: 'official-porto-marinada', name: 'Porto Marinada', location: 'Porto Marinada' },
  { id: 'official-medali-east', name: 'Medali East', location: 'East of Medali' },
  { id: 'official-dalizapa', name: 'Dalizapa Passage', location: 'Dalizapa Passage' },
  { id: 'official-zapapico-east', name: 'Zapapico East', location: 'East of Zapapico' },
  { id: 'official-alfornada', name: 'Alfornada', location: 'Alfornada' },
  { id: 'official-casseroya-2', name: 'Casseroya Watchtower Two', location: 'Casseroya Lake' },
  { id: 'official-glaseado-gym', name: 'Glaseado Gym', location: 'Glaseado Mountain' },
  { id: 'official-np3', name: 'North Province Area 3', location: 'North Province Area 3' },
  { id: 'official-np1', name: 'North Province Area 1', location: 'North Province Area 1' },
  { id: 'official-np2', name: 'North Province Area 2', location: 'North Province Area 2' },
];

// ============================================
// MINI-GAMES (11 total)
// ============================================

export const miniGames: MiniGame[] = [
  { id: 'minigame-olive-roll', name: 'Olive Roll', category: 'olive-roll' },
  { id: 'minigame-powder-snow', name: 'Powder Snow Course', category: 'snow-slope' },
  { id: 'minigame-blizzard', name: 'Blizzard Course', category: 'snow-slope' },
  { id: 'minigame-sheer-cold', name: 'Sheer Cold Course', category: 'snow-slope' },
  { id: 'minigame-ogre-easy', name: "Ogre Oustin' - Easy", category: 'ogre-oustin' },
  { id: 'minigame-ogre-normal', name: "Ogre Oustin' - Normal", category: 'ogre-oustin' },
  { id: 'minigame-ogre-hard', name: "Ogre Oustin' - Hard", category: 'ogre-oustin' },
  { id: 'minigame-flying-easy', name: 'Flying Time Trial - Easy', category: 'flying-trial' },
  { id: 'minigame-flying-normal', name: 'Flying Time Trial - Normal', category: 'flying-trial' },
  { id: 'minigame-flying-hard', name: 'Flying Time Trial - Hard', category: 'flying-trial' },
  { id: 'minigame-flying-super', name: 'Flying Time Trial - Super-Hard', category: 'flying-trial' },
];

// ============================================
// COUNTS SUMMARY
// ============================================

export const completionCounts = {
  sixStarRaids: allSixStarRaids.length,
  sandwichRecipes: sandwichRecipes.length,
  rotomCases: rotomPhoneCases.length,
  emotes: emotes.length,
  tablecloths: tablecloths.length,
  paldeaSights: paldeaSights.length,
  kitakamiWonders: kitakamiWonders.length,
  marks: pokemonMarks.length,
  ribbons: pokemonRibbons.length,
  leagueOfficials: leagueOfficials.length,
  miniGames: miniGames.length,
};
