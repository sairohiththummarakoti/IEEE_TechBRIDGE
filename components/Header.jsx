'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { nav } from '../lib/content.js';
import { SocietyLogo, Wordmark } from './primitives.jsx';

/**
 * `back` swaps the section nav for a single link, for pages other than the
 * homepage where the in-page anchors in `nav` have nothing to point at.
 */
export default function Header({ back = null }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  if (back) {
    return (
      <header className="site-header">
        <div className="header-inner">
          <div className="brand-group">
            <Wordmark />
            <span className="brand-rule" aria-hidden="true" />
            <SocietyLogo />
          </div>
          <Link className="header-back" href={back.href}>
            <span aria-hidden="true">←</span> {back.label}
          </Link>
        </div>
      </header>
    );
  }

  return (
    <header className="site-header">
      <div className="header-inner">
        <div className="brand-group">
          <Wordmark />
          <span className="brand-rule" aria-hidden="true" />
          <SocietyLogo />
        </div>

        <nav className="nav-desktop" aria-label="Primary">
          {nav.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
          <a className="btn btn-sm" href="#request">
            Request a program
          </a>
        </nav>

        <button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="nav-mobile"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
          <span className="bar" aria-hidden="true" />
          <span className="bar" aria-hidden="true" />
          <span className="bar" aria-hidden="true" />
        </button>
      </div>

      <nav id="nav-mobile" className={`nav-mobile ${open ? 'is-open' : ''}`} aria-label="Primary, mobile">
        {nav.map((item) => (
          <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
            {item.label}
          </a>
        ))}
        <a className="btn" href="#request" onClick={() => setOpen(false)}>
          Request a program
        </a>
      </nav>
    </header>
  );
}
