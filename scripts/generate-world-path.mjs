/**
 * Generates public/world.svg — the landmass silhouette behind the footprint map.
 *
 * Run with `pnpm run generate:map`. The output is committed so the site has no
 * runtime geo dependency. The path is ~49KB, which is why it ships as a
 * separately cacheable image rather than inline markup: it is decorative, and
 * inlining it would put it in both the server HTML and the client bundle.
 *
 * The projection constants below are mirrored in lib/world-projection.js, which
 * is what places the city dots. Change them in both places or the dots drift.
 *
 * Source: Natural Earth 110m via world-atlas. Natural Earth is public domain.
 */
import { writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { geoEquirectangular, geoPath } from 'd3-geo';
import { merge } from 'topojson-client';

import { LAT_BOTTOM, LAT_TOP, WORLD_HEIGHT, WORLD_WIDTH } from '../lib/world-projection.js';

const require = createRequire(import.meta.url);
const world = require('world-atlas/countries-110m.json');

const scale = WORLD_WIDTH / (2 * Math.PI);
const projection = geoEquirectangular()
  .scale(scale)
  .translate([WORLD_WIDTH / 2, scale * ((LAT_TOP * Math.PI) / 180)])
  .clipExtent([
    [0, 0],
    [WORLD_WIDTH, WORLD_HEIGHT],
  ]);

const land = merge(world, world.objects.countries.geometries);
const path = geoPath(projection).digits(1)(land);

// Fill is baked in because the file is loaded as an image and cannot inherit CSS.
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${WORLD_WIDTH} ${WORLD_HEIGHT}" width="${WORLD_WIDTH}" height="${WORLD_HEIGHT}" role="presentation"><title>World landmasses</title><path d="${path}" fill="#16304b" stroke="#22415d" stroke-width="0.6"/></svg>`;

writeFileSync(new URL('../public/world.svg', import.meta.url), svg);
console.log(
  `wrote public/world.svg — ${WORLD_WIDTH}x${WORLD_HEIGHT}, latitude ${LAT_TOP} to ${LAT_BOTTOM}, ${svg.length} bytes`,
);
