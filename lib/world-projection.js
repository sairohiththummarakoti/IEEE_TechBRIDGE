/**
 * Equirectangular projection for the footprint map.
 *
 * These constants are also read by scripts/generate-world-path.mjs, which draws
 * public/world.svg. If you change them, regenerate the map (`pnpm run
 * generate:map`) or the dots will no longer sit on the right coastlines.
 *
 * The poles are cropped so the frame stays wide and short like the design
 * reference: latitude 84°N to 60°S over 360° of longitude gives a 2.5:1 box.
 */
export const WORLD_WIDTH = 1000;
export const LAT_TOP = 84;
export const LAT_BOTTOM = -60;
export const WORLD_HEIGHT = Math.round((WORLD_WIDTH * (LAT_TOP - LAT_BOTTOM)) / 360);

/** Longitude/latitude in degrees to SVG user units. */
export function project(lng, lat) {
  return [
    ((lng + 180) / 360) * WORLD_WIDTH,
    ((LAT_TOP - lat) / (LAT_TOP - LAT_BOTTOM)) * WORLD_HEIGHT,
  ];
}
