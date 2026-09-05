import { site } from '../lib/content.js';

/**
 * Labeled asset slot. The design reference ships with no photography, so every
 * image slot renders as a hatched frame naming what belongs there. Pass `src`
 * once a real asset exists and the frame is replaced by the image.
 */
export function Slot({ label, src, alt, tone = 'light', className = '', ratio, priority = false }) {
  const style = ratio ? { aspectRatio: ratio } : undefined;
  if (src) {
    return (
      <img
        className={`slot-img ${className}`}
        style={style}
        src={src}
        alt={alt ?? ''}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : undefined}
        decoding="async"
      />
    );
  }
  return (
    <div
      className={`slot slot-${tone} ${className}`}
      style={style}
      role="img"
      aria-label={`Image placeholder: ${label}`}
    >
      <span aria-hidden="true">{label}</span>
    </div>
  );
}

export function Eyebrow({ children, className = '' }) {
  return <p className={`eyebrow ${className}`}>{children}</p>;
}

export function ArrowRight() {
  return (
    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
        <path d="M5 12h13" />
        <path d="m14 7 5 5-5 5" />
      </g>
    </svg>
  );
}

export function ArrowDown() {
  return (
    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
        <path d="M12 5v13" />
        <path d="m7 14 5 5 5-5" />
      </g>
    </svg>
  );
}

export function ExternalIcon() {
  return (
    <svg className="icon icon-sm" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2">
        <path d="M8 16 17 7" />
        <path d="M9 7h8v8" />
      </g>
    </svg>
  );
}

export function Wordmark({ className = '' }) {
  return (
    <a className={`wordmark ${className}`} href="#top">
      <span>{site.wordmark.lead}</span>
      <strong>{site.wordmark.accent}</strong>
    </a>
  );
}

export function SocietyLogo({ className = '' }) {
  return (
    <a
      className={`society-logo ${className}`}
      href={site.societyLogo.href}
      target="_blank"
      rel="noreferrer"
    >
      <img src={site.societyLogo.src} alt={`${site.societyLogo.alt} (opens in a new tab)`} />
    </a>
  );
}

/**
 * Marker shared by the map and its legend. `held` and `scheduled` differ by
 * shape as well as colour so the state is never carried by colour alone.
 */
export function StatusMarker({ status, cx, cy, r = 6 }) {
  if (status === 'held') {
    return (
      <g className="dot dot-held">
        <circle className="dot-ring" cx={cx} cy={cy} r={r + 3.4} />
        <circle className="dot-core" cx={cx} cy={cy} r={r} />
      </g>
    );
  }
  return (
    <g className="dot dot-scheduled">
      <circle className="dot-core" cx={cx} cy={cy} r={r} />
    </g>
  );
}
