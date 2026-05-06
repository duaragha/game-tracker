import { ACMirageViewpoint, ACMirageRegion } from '@/types/ac-mirage';

// 21 Viewpoints — synchronize all for the "Fearless" trophy.
// PowerPyx numbers them sequentially across districts. Distribution:
// Harbiyah 4, Round City 4, Karkh 3, Abbasiyah 3, Wilderness 7.
const generate = (region: ACMirageRegion, count: number, startNumber: number): ACMirageViewpoint[] =>
  Array.from({ length: count }, (_, i) => ({
    id: `viewpoint-${startNumber + i}`,
    name: `Viewpoint ${startNumber + i}`,
    region,
  }));

export const acmViewpoints: ACMirageViewpoint[] = [
  ...generate('harbiyah', 4, 1),
  ...generate('round-city', 4, 5),
  ...generate('karkh', 3, 9),
  ...generate('abbasiyah', 3, 12),
  ...generate('wilderness', 7, 15),
];
