'use client';

import { useEffect, useState } from 'react';
import { LAT_BOTTOM, LAT_TOP, WORLD_HEIGHT, WORLD_WIDTH, project } from '../lib/world-projection.js';
import { StatusMarker } from './primitives.jsx';

const LON_STEP = 30;
const LAT_STEP = 20;

function graticule() {
  const meridians = [];
  for (let lng = -180 + LON_STEP; lng < 180; lng += LON_STEP) {
    meridians.push(project(lng, 0)[0]);
  }
  const parallels = [];
  for (let lat = LAT_TOP - LAT_STEP; lat > LAT_BOTTOM; lat -= LAT_STEP) {
    parallels.push(project(0, lat)[1]);
  }
  return { meridians, parallels };
}

const { meridians, parallels } = graticule();

export default function WorldMap({ cities }) {
  const [active, setActive] = useState(null);

  // WCAG 1.4.13: content shown on hover must be dismissible without moving the
  // pointer away.
  useEffect(() => {
    if (!active) return undefined;
    const onKey = (event) => {
      if (event.key === 'Escape') setActive(null);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [active]);

  return (
    <div className={`map-frame ${active ? 'has-active' : ''}`}>
      <svg
        viewBox={`0 0 ${WORLD_WIDTH} ${WORLD_HEIGHT}`}
        className="map-svg"
        aria-hidden="true"
        focusable="false"
      >
        <g className="map-grid">
          {meridians.map((x) => (
            <line key={`v${x}`} x1={x} y1="0" x2={x} y2={WORLD_HEIGHT} />
          ))}
          {parallels.map((y) => (
            <line key={`h${y}`} x1="0" y1={y} x2={WORLD_WIDTH} y2={y} />
          ))}
        </g>

        {cities.map((city) => {
          const [cx, cy] = project(city.lng, city.lat);
          const isActive = active?.name === city.name;
          return (
            <g
              key={city.name}
              className={`city ${isActive ? 'is-active' : ''}`}
              onMouseEnter={() => setActive(city)}
              onMouseLeave={() => setActive((current) => (current?.name === city.name ? null : current))}
            >
              {isActive ? <circle className="dot-halo" cx={cx} cy={cy} r={14} /> : null}
              <StatusMarker status={city.status} cx={cx} cy={cy} r={5} />
              {city.label ? (
                <text
                  className="map-label"
                  x={city.labelSide === 'left' ? cx - 13 : cx + 13}
                  y={cy + 4}
                  textAnchor={city.labelSide === 'left' ? 'end' : 'start'}
                >
                  {city.name}
                </text>
              ) : null}
              {/* Generous invisible hit area — the visible dots are only 10px across. */}
              <circle className="dot-hit" cx={cx} cy={cy} r={15} />
            </g>
          );
        })}
      </svg>

      {active
        ? (() => {
            const [cx, cy] = project(active.lng, active.lat);
            const left = (cx / WORLD_WIDTH) * 100;
            const top = (cy / WORLD_HEIGHT) * 100;
            const edge = left > 84 ? 'is-right' : left < 16 ? 'is-left' : '';
            return (
              <div
                className={`map-tooltip ${edge}`}
                style={{ left: `${left}%`, top: `${top}%` }}
                role="presentation"
              >
                <strong>{active.name}</strong>
                <span>
                  {active.region} · {active.status === 'held' ? 'Held' : 'Scheduled'}
                </span>
              </div>
            );
          })()
        : null}

      {/* The drawing is decorative; this is the accessible equivalent. */}
      <ul className="sr-only">
        {cities.map((city) => (
          <li key={city.name}>
            {city.name}, {city.region} — {city.status === 'held' ? 'Held' : 'Scheduled'}
          </li>
        ))}
      </ul>
    </div>
  );
}
