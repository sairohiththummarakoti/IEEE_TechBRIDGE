'use client';

import { useEffect } from 'react';

/**
 * Fades sections in as they enter the viewport. Renders nothing.
 *
 * The hidden state is applied only after this mounts (via the `reveal-ready`
 * class), so if the script never runs the content stays visible rather than
 * disappearing.
 */
export default function RevealOnScroll() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const targets = Array.from(document.querySelectorAll('[data-reveal]'));
    if (reduced.matches || !('IntersectionObserver' in window)) {
      targets.forEach((node) => node.classList.add('is-revealed'));
      return undefined;
    }

    document.documentElement.classList.add('reveal-ready');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -10% 0px' },
    );
    targets.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return null;
}
