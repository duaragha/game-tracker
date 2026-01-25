import { Collectible } from '@/types';

// Checkpoints (Checkpoint Flags) in Super Mario Odyssey
// 82 total checkpoints (excluding Odyssey landing spots)
// Note: Cloud Kingdom, Ruined Kingdom, Dark Side, and Darker Side have no checkpoint flags

export const smoCheckpoints: Collectible[] = [
  // === CAP KINGDOM (2) ===
  { id: 'checkpoint-cap-1', name: 'Central Plaza', type: 'checkpoint', kingdom: 'cap', description: 'Main checkpoint in the center of Bonneton. Located near the Crazy Cap store after the plaza is rebuilt.' },
  { id: 'checkpoint-cap-2', name: 'Top-Hat Tower', type: 'checkpoint', kingdom: 'cap', description: 'Near the top of the iconic hat-shaped tower, next to the doorway where Mario exits the tower interior.' },

  // === CASCADE KINGDOM (4) ===
  { id: 'checkpoint-cascade-1', name: 'Stone Bridge', type: 'checkpoint', kingdom: 'cascade', description: 'Ancient stone bridge at the north end of the map where many Burrbos spawn.' },
  { id: 'checkpoint-cascade-2', name: 'Top of the Big Stump', type: 'checkpoint', kingdom: 'cascade', description: 'On top of a high ledge next to where the Odyssey originally landed.' },
  { id: 'checkpoint-cascade-3', name: 'Fossil Falls Heights', type: 'checkpoint', kingdom: 'cascade', description: 'Found at the summit of Fossil Falls, the highest point in the kingdom.' },
  { id: 'checkpoint-cascade-4', name: 'Island in the Sky', type: 'checkpoint', kingdom: 'cascade', description: 'Floating island accessible via warp painting from Snow Kingdom or Seaside Kingdom.' },

  // === SAND KINGDOM (9) ===
  { id: 'checkpoint-sand-1', name: 'Tostarena Town', type: 'checkpoint', kingdom: 'sand', description: 'Main town center with Mexican-inspired architecture. Located at the town southern entrance next to a Jaxi Stand.' },
  { id: 'checkpoint-sand-2', name: 'Tostarena Ruins Entrance', type: 'checkpoint', kingdom: 'sand', description: 'At the entrance to the ruins, north of Tostarena Town and marked by a large stone gate.' },
  { id: 'checkpoint-sand-3', name: 'Tostarena Ruins Sand Pillar', type: 'checkpoint', kingdom: 'sand', description: 'On the platform shortly after the Ruins Entrance. Near the warp painting location.' },
  { id: 'checkpoint-sand-4', name: 'Tostarena Ruins Round Tower', type: 'checkpoint', kingdom: 'sand', description: 'At the top of the round tower, the highest point of Tostarena Ruins.' },
  { id: 'checkpoint-sand-5', name: 'Moe-Eye Habitat', type: 'checkpoint', kingdom: 'sand', description: 'In the Moe-Eye Habitat area. Capture a Moe-Eye to see invisible platforms.' },
  { id: 'checkpoint-sand-6', name: 'Jaxi Ruins', type: 'checkpoint', kingdom: 'sand', description: 'At the top of the Jaxi Ruins area with two chests nearby and a Jaxi stop.' },
  { id: 'checkpoint-sand-7', name: 'Tostarena Northwest Reaches', type: 'checkpoint', kingdom: 'sand', description: 'Near the building containing the Bullet Bill Maze subarea in the northwest corner.' },
  { id: 'checkpoint-sand-8', name: 'Desert Oasis', type: 'checkpoint', kingdom: 'sand', description: 'At the oasis at the top of the hill in the southeast area of the kingdom.' },
  { id: 'checkpoint-sand-9', name: 'Southwestern Floating Island', type: 'checkpoint', kingdom: 'sand', description: 'On a floating island in the southwestern area, accessible via high jumps or captures.' },

  // === LAKE KINGDOM (6) ===
  { id: 'checkpoint-lake-1', name: 'Underwater Entrance', type: 'checkpoint', kingdom: 'lake', description: 'At the start of the open lake section, marking the underwater entrance.' },
  { id: 'checkpoint-lake-2', name: 'Courtyard', type: 'checkpoint', kingdom: 'lake', description: 'On a ledge next to where the Odyssey lands, with access to the warp painting pool.' },
  { id: 'checkpoint-lake-3', name: 'Water Plaza Entrance', type: 'checkpoint', kingdom: 'lake', description: 'Found at the entrance on the first floor of the Water Plaza.' },
  { id: 'checkpoint-lake-4', name: 'Water Plaza Display Window', type: 'checkpoint', kingdom: 'lake', description: 'Located next to the Lochlady Dress display window.' },
  { id: 'checkpoint-lake-5', name: 'Water Plaza Terrace', type: 'checkpoint', kingdom: 'lake', description: 'Elevated terrace that serves as the arena where Rango is fought.' },
  { id: 'checkpoint-lake-6', name: 'Viewing Balcony', type: 'checkpoint', kingdom: 'lake', description: 'A high ledge visible across the lake from the Courtyard.' },

  // === WOODED KINGDOM (9) ===
  { id: 'checkpoint-wooded-1', name: 'Iron Road: Entrance', type: 'checkpoint', kingdom: 'wooded', description: 'Starting point of the industrial Iron Road pathway through the Steam Gardener zone.' },
  { id: 'checkpoint-wooded-2', name: 'Iron Road: Halfway Point', type: 'checkpoint', kingdom: 'wooded', description: 'Midway through the Iron Road maze climb.' },
  { id: 'checkpoint-wooded-3', name: 'Sky Garden Tower', type: 'checkpoint', kingdom: 'wooded', description: 'Atop the tower where Spewart the Broodal is fought.' },
  { id: 'checkpoint-wooded-4', name: 'Forest Charging Station', type: 'checkpoint', kingdom: 'wooded', description: 'Where Steam Gardener robots come to recharge their batteries.' },
  { id: 'checkpoint-wooded-5', name: 'Summit Path', type: 'checkpoint', kingdom: 'wooded', description: 'East of Forest Charging Station, past the Sherm tank area.' },
  { id: 'checkpoint-wooded-6', name: 'Iron Mountain Path, Station 8', type: 'checkpoint', kingdom: 'wooded', description: 'End of Iron Road after the slope. Near the warp painting location.' },
  { id: 'checkpoint-wooded-7', name: 'Secret Flower Field Entrance', type: 'checkpoint', kingdom: 'wooded', description: 'Before the hole leading into the Secret Flower Field area.' },
  { id: 'checkpoint-wooded-8', name: 'Observation Deck', type: 'checkpoint', kingdom: 'wooded', description: 'High viewpoint reached via P Switch and moving platforms.' },
  { id: 'checkpoint-wooded-9', name: 'Iron Cage', type: 'checkpoint', kingdom: 'wooded', description: 'Accessible via warp painting from other kingdoms.' },

  // === LOST KINGDOM (3) ===
  { id: 'checkpoint-lost-1', name: 'Swamp Hill', type: 'checkpoint', kingdom: 'lost', description: 'Directly north of where the Odyssey lands, near a poison waterfall.' },
  { id: 'checkpoint-lost-2', name: 'Mountainside Platform', type: 'checkpoint', kingdom: 'lost', description: 'In the northwestern region on a small cliffside platform.' },
  { id: 'checkpoint-lost-3', name: 'Rocky Mountain Summit', type: 'checkpoint', kingdom: 'lost', description: 'The highest point of the kingdom where the Crazy Cap shop is located.' },

  // === METRO KINGDOM (9) ===
  { id: 'checkpoint-metro-1', name: 'Main Street Entrance', type: 'checkpoint', kingdom: 'metro', description: 'Near a small park at the city outskirts. Location varies slightly based on story progress.' },
  { id: 'checkpoint-metro-2', name: 'Rooftop Garden', type: 'checkpoint', kingdom: 'metro', description: 'Garden area atop connected buildings in New Donk City.' },
  { id: 'checkpoint-metro-3', name: 'Construction Site', type: 'checkpoint', kingdom: 'metro', description: 'On a blue tarp at the west end of the city, overlooking an abyss.' },
  { id: 'checkpoint-metro-4', name: 'New Donk City Hall Plaza', type: 'checkpoint', kingdom: 'metro', description: 'Near City Hall. Location changes slightly based on story progress.' },
  { id: 'checkpoint-metro-5', name: 'New Donk City Hall Rooftop', type: 'checkpoint', kingdom: 'metro', description: 'On a balcony just below the actual roof of City Hall.' },
  { id: 'checkpoint-metro-6', name: 'Mayor Pauline Commemorative Park', type: 'checkpoint', kingdom: 'metro', description: 'Small park accessed via spark pylon. Contains RC Car challenges.' },
  { id: 'checkpoint-metro-7', name: 'Outdoor Café', type: 'checkpoint', kingdom: 'metro', description: 'Area with tables and chairs where several New Donkers are sitting.' },
  { id: 'checkpoint-metro-8', name: 'Heliport', type: 'checkpoint', kingdom: 'metro', description: 'Rooftop helipad located right of the New Donk City Hall Plaza.' },
  { id: 'checkpoint-metro-9', name: 'Isolated Rooftop', type: 'checkpoint', kingdom: 'metro', description: 'In the bottom-right corner, accessible only via warp painting from Sand Kingdom.' },

  // === SNOW KINGDOM (3) ===
  { id: 'checkpoint-snow-1', name: 'Above the Ice Well', type: 'checkpoint', kingdom: 'snow', description: 'Next to the hole leading down to Shiveria Town underground.' },
  { id: 'checkpoint-snow-2', name: 'Corner of the Freezing Sea', type: 'checkpoint', kingdom: 'snow', description: 'On the northeast corner near the Koopa Trace-Walking minigame entrance.' },
  { id: 'checkpoint-snow-3', name: 'Snow Kingdom Clifftop', type: 'checkpoint', kingdom: 'snow', description: 'Small snowy platform on the cliffside, accessible via warp painting.' },

  // === SEASIDE KINGDOM (9) ===
  { id: 'checkpoint-seaside-1', name: 'Beach House', type: 'checkpoint', kingdom: 'seaside', description: 'In the southwest corner near the volleyball court.' },
  { id: 'checkpoint-seaside-2', name: 'Lighthouse', type: 'checkpoint', kingdom: 'seaside', description: 'On the roof of the lighthouse where a fountain switch is located.' },
  { id: 'checkpoint-seaside-3', name: 'Hot Spring Island', type: 'checkpoint', kingdom: 'seaside', description: 'On the northern edge of the relaxing hot spring island.' },
  { id: 'checkpoint-seaside-4', name: 'Rolling Canyon', type: 'checkpoint', kingdom: 'seaside', description: 'Near the entrance to the canyon with rolling shell hazards.' },
  { id: 'checkpoint-seaside-5', name: 'Above Rolling Canyon', type: 'checkpoint', kingdom: 'seaside', description: 'Past a wall of crates at the end of Rolling Canyon.' },
  { id: 'checkpoint-seaside-6', name: 'Glass Palace', type: 'checkpoint', kingdom: 'seaside', description: 'Near the base of the Glass Tower landmark.' },
  { id: 'checkpoint-seaside-7', name: 'Ocean Trench West', type: 'checkpoint', kingdom: 'seaside', description: 'Underwater in the northwest corner of the ocean.' },
  { id: 'checkpoint-seaside-8', name: 'Ocean Trench East', type: 'checkpoint', kingdom: 'seaside', description: 'Underwater in the northeast corner of the ocean.' },
  { id: 'checkpoint-seaside-9', name: 'Diving Platform', type: 'checkpoint', kingdom: 'seaside', description: 'Accessible via warp paintings from other kingdoms.' },

  // === LUNCHEON KINGDOM (9) ===
  { id: 'checkpoint-luncheon-1', name: 'Peronza Plaza', type: 'checkpoint', kingdom: 'luncheon', description: 'Main plaza entrance of the cooking-themed volcano area. Hub for the Volbonans.' },
  { id: 'checkpoint-luncheon-2', name: 'Path to the Meat Plateau', type: 'checkpoint', kingdom: 'luncheon', description: 'At the start of the pathway leading to the giant meat rock formation.' },
  { id: 'checkpoint-luncheon-3', name: 'Meat Plateau', type: 'checkpoint', kingdom: 'luncheon', description: 'In the far northern area atop the meat plateau.' },
  { id: 'checkpoint-luncheon-4', name: 'Volcano Cave Entrance', type: 'checkpoint', kingdom: 'luncheon', description: 'West of Peronza Plaza at the cave entrance.' },
  { id: 'checkpoint-luncheon-5', name: 'Start of the Peak Climb', type: 'checkpoint', kingdom: 'luncheon', description: 'At the base of Mount Volbono on its northern side.' },
  { id: 'checkpoint-luncheon-6', name: 'Top of the Peak Climb', type: 'checkpoint', kingdom: 'luncheon', description: 'Near Mount Volbono summit, close to the cooking pot boss arena.' },
  { id: 'checkpoint-luncheon-7', name: 'Salt-Pile Isle', type: 'checkpoint', kingdom: 'luncheon', description: 'Small island in the lava southeast of Peronza Plaza.' },
  { id: 'checkpoint-luncheon-8', name: 'Beneath the Cheese Rocks', type: 'checkpoint', kingdom: 'luncheon', description: 'Area beneath the massive cheese rock formations.' },
  { id: 'checkpoint-luncheon-9', name: 'Remote Island in the Lava', type: 'checkpoint', kingdom: 'luncheon', description: 'Far northeast island where the warp painting to Mushroom Kingdom is located.' },

  // === BOWSER'S KINGDOM (11) ===
  { id: 'checkpoint-bowsers-1', name: 'Third Courtyard (Front)', type: 'checkpoint', kingdom: 'bowsers', description: 'At the start of the area with two torches lighting the entrance.' },
  { id: 'checkpoint-bowsers-2', name: 'Third Courtyard (Rear)', type: 'checkpoint', kingdom: 'bowsers', description: 'Accessed via spark pylon from the front of the third courtyard.' },
  { id: 'checkpoint-bowsers-3', name: 'Second Courtyard', type: 'checkpoint', kingdom: 'bowsers', description: 'Reached through a spark pylon from the rear of the third courtyard.' },
  { id: 'checkpoint-bowsers-4', name: 'Souvenir Shop', type: 'checkpoint', kingdom: 'bowsers', description: 'Located between Second Courtyard and Main Courtyard Entrance.' },
  { id: 'checkpoint-bowsers-5', name: 'Main Courtyard Entrance', type: 'checkpoint', kingdom: 'bowsers', description: 'On the bridge in the middle where Hariet and Topper are fought.' },
  { id: 'checkpoint-bowsers-6', name: 'Main Courtyard', type: 'checkpoint', kingdom: 'bowsers', description: 'Right beyond the door that opens after fighting Hariet and Topper.' },
  { id: 'checkpoint-bowsers-7', name: 'Outer Wall', type: 'checkpoint', kingdom: 'bowsers', description: 'Found right after getting past the bombs in the Main Courtyard.' },
  { id: 'checkpoint-bowsers-8', name: 'Inner Wall', type: 'checkpoint', kingdom: 'bowsers', description: 'At the top of the Outer Wall section.' },
  { id: 'checkpoint-bowsers-9', name: 'Beneath the Keep', type: 'checkpoint', kingdom: 'bowsers', description: 'On a bridge over a poison pool at the top of the Inner Wall.' },
  { id: 'checkpoint-bowsers-10', name: 'Showdown Arena', type: 'checkpoint', kingdom: 'bowsers', description: 'Circular arena where the RoboBrood boss battle takes place.' },
  { id: 'checkpoint-bowsers-11', name: 'Island in the Sky', type: 'checkpoint', kingdom: 'bowsers', description: 'Accessible via warp painting from Cascade Kingdom.' },

  // === MOON KINGDOM (4) ===
  { id: 'checkpoint-moon-1', name: 'Ringing-Bells Plateau', type: 'checkpoint', kingdom: 'moon', description: 'Flat spacious area in the center with rocket flowers and Moonsnakes.' },
  { id: 'checkpoint-moon-2', name: 'Quiet Wall', type: 'checkpoint', kingdom: 'moon', description: 'In front of the entrance to the Underground Moon Caverns.' },
  { id: 'checkpoint-moon-3', name: 'Ever-After Hill', type: 'checkpoint', kingdom: 'moon', description: 'Long carpeted road leading toward the Wedding Hall after exiting the caverns.' },
  { id: 'checkpoint-moon-4', name: 'Wedding Hall', type: 'checkpoint', kingdom: 'moon', description: 'Just outside the Wedding Hall where the final Bowser confrontation takes place.' },

  // === MUSHROOM KINGDOM (4) ===
  { id: 'checkpoint-mushroom-1', name: "Peach's Castle Main Entrance", type: 'checkpoint', kingdom: 'mushroom', description: 'Right in front of the door to Princess Peach Castle.' },
  { id: 'checkpoint-mushroom-2', name: 'Mushroom Pond', type: 'checkpoint', kingdom: 'mushroom', description: 'At a small pond located south of the castle.' },
  { id: 'checkpoint-mushroom-3', name: 'Goomba Woods', type: 'checkpoint', kingdom: 'mushroom', description: 'In the Goomba-infested woods north of Peach Castle.' },
  { id: 'checkpoint-mushroom-4', name: "Yoshi's House", type: 'checkpoint', kingdom: 'mushroom', description: 'On a floating platform far south of the main area where Yoshi can be found.' },
];
