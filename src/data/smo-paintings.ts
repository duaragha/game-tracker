import { Collectible } from '@/types';

// Paintings in Super Mario Odyssey
// Includes Warp Paintings (10 total) and Hint Art locations

export const smoPaintings: Collectible[] = [
  // === WARP PAINTINGS (10 total) ===
  // These paintings allow travel between kingdoms after completing the main story
  // Some destinations vary based on which kingdom you visited first

  // Cascade Kingdom
  {
    id: 'painting-cascade-warp',
    name: "Warp Painting to Bowser's Kingdom",
    type: 'painting',
    kingdom: 'cascade',
    category: 'post_game',
    description: 'Hidden in a cave behind the main waterfall at Fossil Falls. Swim through the pool at the waterfall base and enter the cave on the right to find this painting. Also contains 3 purple coins. Teleports to the Island in the Sky in Bowser\'s Kingdom.',
  },

  // Sand Kingdom
  {
    id: 'painting-sand-warp',
    name: 'Warp Painting to Metro Kingdom',
    type: 'painting',
    kingdom: 'sand',
    category: 'post_game',
    description: 'Located near the Tostarena Ruins Sand Pillar checkpoint. Turn right from the checkpoint and find the painting behind a stone pillar next to the Jaxi stop. Teleports to Metro Kingdom.',
  },

  // Lake Kingdom
  {
    id: 'painting-lake-warp',
    name: 'Warp Painting to Sand/Luncheon Kingdom',
    type: 'painting',
    kingdom: 'lake',
    category: 'post_game',
    description: 'Underwater in the pool next to the Courtyard checkpoint flag. Dive down to find the painting on the pool floor. Destination varies: Sand Kingdom if you visited Lake before Wooded, otherwise Luncheon Kingdom.',
  },

  // Wooded Kingdom
  {
    id: 'painting-wooded-warp',
    name: 'Warp Painting to Luncheon/Sand Kingdom',
    type: 'painting',
    kingdom: 'wooded',
    category: 'post_game',
    description: 'From Forest Charging Station, throw Cappy at the scarecrow to make platforms appear. Jump to the top platform, then backflip onto the steel beam above. The painting is on the side of a cube to your right. Destination varies based on kingdom visit order.',
  },

  // Metro Kingdom
  {
    id: 'painting-metro-warp',
    name: 'Warp Painting to Wooded/Lake Kingdom',
    type: 'painting',
    kingdom: 'metro',
    category: 'post_game',
    description: 'Located on a lower platform directly behind and below the Odyssey. Jump down from the landing area to find this easily accessible painting. Destination varies based on kingdom visit order.',
  },

  // Snow Kingdom
  {
    id: 'painting-snow-warp',
    name: 'Warp Painting to Lake/Wooded/Cascade Kingdom',
    type: 'painting',
    kingdom: 'snow',
    category: 'post_game',
    description: 'From your ship, head down the path until you find a Ty-foo (cloud enemy). Capture it and float to the northeastern section of the map. Use the wind ability to blow the large wooden block over to the tall ice platform. Unpossess and jump onto the block to reach the painting.',
  },

  // Seaside Kingdom
  {
    id: 'painting-seaside-warp',
    name: 'Warp Painting to Cascade Kingdom',
    type: 'painting',
    kingdom: 'seaside',
    category: 'post_game',
    description: 'Complete the main story and defeat the boss first. Take the water jets to the central glass platform and dive into the pool beneath it to find the painting underwater.',
  },

  // Luncheon Kingdom
  {
    id: 'painting-luncheon-warp',
    name: 'Warp Painting to Mushroom Kingdom',
    type: 'painting',
    kingdom: 'luncheon',
    category: 'post_game',
    description: 'Warp to Path to the Meat Plateau flag. Capture a Lava Bubble and swim through the lava toward the top right corner of the map. Look for a mushroom-shaped island. The painting is on a lower platform behind where the peppers roll from.',
  },

  // Bowser's Kingdom
  {
    id: 'painting-bowsers-warp',
    name: 'Warp Painting to Seaside Kingdom',
    type: 'painting',
    kingdom: 'bowsers',
    category: 'post_game',
    description: 'From the Main Courtyard Entrance, hop over the railing to the left. Proceed behind the building ahead to find the painting. Only accessible after defeating the Broodals.',
  },

  // Mushroom Kingdom
  {
    id: 'painting-mushroom-warp',
    name: 'Warp Painting to Snow/Seaside Kingdom',
    type: 'painting',
    kingdom: 'mushroom',
    category: 'post_game',
    description: 'With your back to the front of the Odyssey, run to the right. The painting is located in a clearing within a small forest of four trees. Destination varies based on kingdom visit order.',
  },

  // === HINT ART LOCATIONS ===
  // These paintings/drawings hint at hidden moon locations in other kingdoms

  { id: 'hint-art-cap-1', name: 'Cap Kingdom Hint Art', type: 'painting', kingdom: 'cap', category: 'hint_art', description: 'Found on a wall in the Central Plaza area. This drawing shows a ground pound location in Cascade Kingdom - near the Chain Chomps area, ground pound between two palm trees.' },

  { id: 'hint-art-cascade-1', name: 'Cascade Kingdom Hint Art', type: 'painting', kingdom: 'cascade', category: 'hint_art', description: 'Stone carving near the waterfall on a cliff face. Shows a ground pound location in Sand Kingdom.' },

  { id: 'hint-art-sand-1', name: 'Sand Kingdom Hint Art', type: 'painting', kingdom: 'sand', category: 'hint_art', description: 'Hidden on a wall inside the Tostarena Ruins near the pillars. Points to a moon location in Lake Kingdom.' },

  { id: 'hint-art-lake-1', name: 'Lake Kingdom Hint Art', type: 'painting', kingdom: 'lake', category: 'hint_art', description: 'Underwater painting on the plaza walls. Swim around the Water Plaza to find this art piece pointing to Wooded Kingdom.' },

  { id: 'hint-art-wooded-1', name: 'Wooded Kingdom Hint Art', type: 'painting', kingdom: 'wooded', category: 'hint_art', description: 'Located in the Secret Flower Field area. The drawing shows a location in Metro Kingdom where you need to ground pound.' },

  { id: 'hint-art-metro-1', name: 'Metro Kingdom Hint Art', type: 'painting', kingdom: 'metro', category: 'hint_art', description: 'Graffiti art on a building wall in New Donk City. Look on building surfaces near the main areas. Points to Snow Kingdom.' },

  { id: 'hint-art-snow-1', name: 'Snow Kingdom Hint Art', type: 'painting', kingdom: 'snow', category: 'hint_art', description: 'Carved into the ice walls underground in Shiveria. Find it in the racing area caverns. Points to Seaside Kingdom.' },

  { id: 'hint-art-seaside-1', name: 'Seaside Kingdom Hint Art', type: 'painting', kingdom: 'seaside', category: 'hint_art', description: 'Underwater carving on the ocean floor or cliff walls. Search the diving areas near the lighthouse. Points to Luncheon Kingdom.' },

  { id: 'hint-art-luncheon-1', name: 'Luncheon Kingdom Hint Art', type: 'painting', kingdom: 'luncheon', category: 'hint_art', description: 'Near the giant cooking pot in Peronza Plaza. Look on the walls of the food-themed structures. Points to Bowser\'s Kingdom.' },

  { id: 'hint-art-bowsers-1', name: "Bowser's Kingdom Hint Art", type: 'painting', kingdom: 'bowsers', category: 'hint_art', description: 'Japanese-style wall painting inside the castle. Search the decorated walls in the courtyard areas. Points to Moon Kingdom.' },

  { id: 'hint-art-moon-1', name: 'Moon Kingdom Hint Art', type: 'painting', kingdom: 'moon', category: 'hint_art', description: 'Inside the Wedding Hall on a wall. The lunar drawing points to a location in Wooded Kingdom.' },

  { id: 'hint-art-mushroom-1', name: 'Mushroom Kingdom Hint Art', type: 'painting', kingdom: 'mushroom', category: 'hint_art', description: 'In the courtyard area near Peach\'s Castle. Search around the gardens and castle walls. Points to Sand Kingdom.' },

  { id: 'hint-art-dark-1', name: 'Dark Side Hint Art', type: 'painting', kingdom: 'dark_side', category: 'hint_art', description: 'Near the rabbit encounter areas on Rabbit Ridge. Look on the tower or platform surfaces after clearing Broodal rematches.' },
];
