'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { gallery } from '../lib/content.js';
import { Eyebrow, Slot } from './primitives.jsx';

function Lightbox({ index, onClose, onStep }) {
  const dialogRef = useRef(null);
  const touchStart = useRef(null);
  const item = gallery[index];

  useEffect(() => {
    const node = dialogRef.current;
    if (!node) return undefined;
    const previous = document.activeElement;
    node.focus();

    const onKey = (event) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }
      if (event.key === 'ArrowRight') {
        onStep(1);
        return;
      }
      if (event.key === 'ArrowLeft') {
        onStep(-1);
        return;
      }
      if (event.key !== 'Tab') return;

      const focusable = node.querySelectorAll('button, [href], [tabindex]:not([tabindex="-1"])');
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKey);
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflow;
      if (previous instanceof HTMLElement) previous.focus();
    };
  }, [onClose, onStep]);

  return (
    <div className="lightbox" onClick={onClose}>
      <div
        className="lightbox-panel"
        role="dialog"
        aria-modal="true"
        aria-label={`${item.caption} — image ${index + 1} of ${gallery.length}`}
        ref={dialogRef}
        tabIndex={-1}
        onClick={(event) => event.stopPropagation()}
        onTouchStart={(event) => {
          touchStart.current = event.changedTouches[0].clientX;
        }}
        onTouchEnd={(event) => {
          if (touchStart.current === null) return;
          const delta = event.changedTouches[0].clientX - touchStart.current;
          if (Math.abs(delta) > 50) onStep(delta < 0 ? 1 : -1);
          touchStart.current = null;
        }}
      >
        <div className="lightbox-controls">
          <button type="button" onClick={() => onStep(-1)}>
            <span className="sr-only">Previous image</span>
            <span aria-hidden="true">&#8592;</span>
          </button>
          <button type="button" onClick={() => onStep(1)}>
            <span className="sr-only">Next image</span>
            <span aria-hidden="true">&#8594;</span>
          </button>
          <button type="button" className="lightbox-close" onClick={onClose}>
            <span className="sr-only">Close gallery</span>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <figure>
          <Slot label={item.caption} src={item.src} alt={item.alt} tone="dark" ratio="16 / 10" />
          <figcaption>
            {item.caption}
            <span>
              {index + 1} / {gallery.length}
            </span>
          </figcaption>
        </figure>
      </div>
    </div>
  );
}

export default function Gallery() {
  const [index, setIndex] = useState(null);
  const step = useCallback((delta) => {
    setIndex((current) => (current + delta + gallery.length) % gallery.length);
  }, []);

  return (
    <section className="section section-dark gallery" id="gallery">
      <div className="section-head">
        <div>
          <Eyebrow className="eyebrow-on-dark">Gallery</Eyebrow>
          <h2 className="display">From the room</h2>
        </div>
        <p className="section-note">Click any frame to enlarge</p>
      </div>

      <ul className="gallery-grid">
        {gallery.map((item, i) => (
          <li key={item.id} className={item.feature ? 'is-feature' : ''}>
            <button type="button" onClick={() => setIndex(i)}>
              {/* An empty slot already prints its caption in the frame; a real
                  photo needs the caption laid over it instead. */}
              <Slot label={item.caption} src={item.src} alt="" tone="dark" />
              {item.src ? <span className="gallery-caption">{item.caption}</span> : null}
              <span className="sr-only">Enlarge {item.caption}</span>
            </button>
          </li>
        ))}
      </ul>

      {index !== null ? <Lightbox index={index} onClose={() => setIndex(null)} onStep={step} /> : null}
    </section>
  );
}
