/**
 * Server-rendered sections. Nothing here uses state or effects, so all of this
 * markup ships in the initial HTML — which is the point of the Next migration.
 * Interactive sections live in their own 'use client' files.
 */
import {
  audiences,
  footprint,
  getInvolved,
  hero,
  mission,
  partnerGroups,
  partners,
  site,
  stats,
  stories,
  team,
  vision,
  whatIs,
  footerColumns,
} from '../lib/content.js';
import { getCities, getEvents } from '../lib/events.js';
import { ArrowDown, ArrowRight, Eyebrow, ExternalIcon, Slot, SocietyLogo, StatusMarker, Wordmark } from './primitives.jsx';
import WorldMap from './WorldMap.jsx';

/* ---------------- 2. Hero ---------------- */

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-copy">
        <Eyebrow className="eyebrow-rule">{hero.eyebrow}</Eyebrow>
        <h1>
          <span>{hero.title.lead}</span>
          <strong>{hero.title.accent}</strong>
        </h1>
        <p className="hero-sub">
          {hero.subtitle.map((line, index) => (
            <span key={line}>
              {index > 0 ? <br /> : null}
              {line}
            </span>
          ))}
        </p>
        <p className="hero-body">{hero.body}</p>
        <div className="hero-actions">
          <a className="btn" href={hero.primaryCta.href}>
            {hero.primaryCta.label} <ArrowDown />
          </a>
          <a className="btn btn-ghost" href={hero.secondaryCta.href}>
            {hero.secondaryCta.label}
          </a>
        </div>
      </div>

      <figure className="hero-media">
        <Slot
          label="Hero workshop photograph"
          src={hero.image.src}
          alt={hero.image.alt}
          tone="dark"
          priority
        />
        <figcaption>
          {hero.caption.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </figcaption>
      </figure>
    </section>
  );
}

/* ---------------- 3. Impact statistics ---------------- */

export function Stats() {
  return (
    <div className="stats-band" id="impact">
      <div className="stats-inner">
        <h2 className="sr-only">Program impact to date</h2>
        <dl className="stats">
          {stats.map((stat) => (
            <div className="stat" key={stat.label}>
              <dt>{stat.label}</dt>
              <dd>{stat.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

/* ---------------- 3b. Find your way in ---------------- */

export function Audiences() {
  return (
    <section className="section section-light audiences">
      <h2 className="eyebrow">{audiences.eyebrow}</h2>
      <ul className="audience-grid">
        {audiences.items.map((item) => (
          <li className="audience-card" key={item.id} data-reveal>
            <p className="audience-who">{item.who}</p>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
            <a href={item.cta.href}>
              {item.cta.label} <ArrowRight />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ---------------- 4 + 5. Vision / mission, what is TechBridge ---------------- */

export function About() {
  return (
    <section className="section section-light about" id="about">
      <div className="vision-mission" data-reveal>
        <div className="vision">
          <Eyebrow>{vision.eyebrow}</Eyebrow>
          <h2 className="statement">{vision.body}</h2>
        </div>
        <div className="mission">
          <Eyebrow>{mission.eyebrow}</Eyebrow>
          <p>{mission.body}</p>
        </div>
      </div>

      <div className="what-is" data-reveal>
        <div className="what-is-main">
          <h2 className="display">
            {whatIs.headingLead} <span>{whatIs.headingAccent}</span>
          </h2>
          <p className="lead">{whatIs.body}</p>
          <ol className="steps">
            {whatIs.steps.map((step) => (
              <li className="step" key={step.number}>
                <span className="step-number" aria-hidden="true">
                  {step.number}
                </span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>
        </div>

        <aside className="includes-panel">
          <h3 className="eyebrow eyebrow-on-dark">{whatIs.panel.heading}</h3>
          <ul>
            {whatIs.panel.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <a className="btn" href={whatIs.panel.cta.href}>
            {whatIs.panel.cta.label}
          </a>
        </aside>
      </div>
    </section>
  );
}

/* ---------------- 6. Global footprint ---------------- */

export function Footprint() {
  return (
    <section className="section section-dark footprint angled">
      <div className="section-head">
        <div>
          <Eyebrow className="eyebrow-on-dark">{footprint.eyebrow}</Eyebrow>
          <h2 className="display">{footprint.heading}</h2>
        </div>
        <ul className="map-legend">
          <li>
            <svg className="legend-mark" viewBox="0 0 20 20" aria-hidden="true" focusable="false">
              <StatusMarker status="scheduled" cx={10} cy={10} r={5} />
            </svg>
            Scheduled
          </li>
          <li>
            <svg className="legend-mark" viewBox="0 0 20 20" aria-hidden="true" focusable="false">
              <StatusMarker status="held" cx={10} cy={10} r={4.4} />
            </svg>
            Held
          </li>
        </ul>
      </div>

      <WorldMap cities={getCities()} />

      <dl className="region-grid">
        {footprint.regions.map((region) => (
          <div className="region-card" key={region.label}>
            <dd>{region.count}</dd>
            <dt>{region.label}</dt>
          </div>
        ))}
      </dl>
    </section>
  );
}

/* ---------------- 8. What's coming next ---------------- */

export function Schedule() {
  const upcoming = getEvents().filter((event) => event.state === 'upcoming');
  return (
    <section className="section schedule">
      <div className="section-head section-head-center">
        <div>
          <Eyebrow>Schedule</Eyebrow>
          <h2 className="display">What&rsquo;s coming next</h2>
        </div>
      </div>
      <ol className="timeline">
        {upcoming.map((event) => (
          <li key={event.id} data-reveal>
            <div className="timeline-when">
              <strong>{event.city}</strong>
              <time dateTime={event.isoDate}>{event.date}</time>
            </div>
            <span className="timeline-marker" aria-hidden="true" />
            <div className="timeline-card">
              <h3>{event.title}</h3>
              <p>{event.host}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

/* ---------------- 10. Success stories ---------------- */

export function Stories() {
  return (
    <section className="section section-light stories" id="stories">
      <Eyebrow>Success stories</Eyebrow>
      <h2 className="display">What happened next</h2>
      <div className="story-grid">
        {stories.map((story) => (
          <figure className="story-card" key={story.id} data-reveal>
            <p className="story-metric">{story.metric}</p>
            <blockquote>{story.body}</blockquote>
            <figcaption>
              <Slot label="Photo" src={story.portrait} alt="" className="story-portrait" />
              <span>
                <strong>{story.name}</strong>
                <span>{story.role}</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

/* ---------------- 11. Partners ---------------- */

export function Partners() {
  return (
    <section className="section partners" id="partners">
      <div className="section-head">
        <div>
          <Eyebrow>{partners.eyebrow}</Eyebrow>
          <h2 className="display">{partners.heading}</h2>
          <p className="lead">{partners.body}</p>
        </div>
        <a className="btn" href={partners.cta.href}>
          {partners.cta.label}
        </a>
      </div>
      {partnerGroups.map((group) => (
        <div className="partner-group" key={group.id}>
          <h3 className="eyebrow">{group.heading}</h3>
          <ul className="logo-grid">
            {group.items.map((item) => (
              <li key={item.slot}>
                {item.logo ? (
                  <a href={item.href ?? undefined}>
                    <img src={item.logo} alt={item.name} loading="lazy" decoding="async" />
                  </a>
                ) : (
                  <span className="logo-slot">{item.name}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}

/* ---------------- 12. Team ---------------- */

export function Team() {
  return (
    <section className="section section-light team" id="team">
      <Eyebrow>Committee</Eyebrow>
      <h2 className="display">Meet the team</h2>
      <ul className="team-grid">
        {team.map((person) => (
          <li className="team-card" key={person.id} data-reveal>
            <Slot label="Portrait" src={person.portrait} alt="" ratio="4 / 3" />
            <div className="team-copy">
              <h3>{person.name}</h3>
              <p className="team-role">{person.role}</p>
              {person.linkedin ? (
                <a href={person.linkedin} target="_blank" rel="noreferrer">
                  LinkedIn <ExternalIcon />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              ) : (
                <span className="link-pending">
                  LinkedIn <ExternalIcon />
                  <span className="sr-only">— profile link not yet provided</span>
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ---------------- 13. Get involved ---------------- */

export function GetInvolved() {
  return (
    <section className="section section-dark involved" id="involved">
      <Eyebrow className="eyebrow-on-dark">Get involved</Eyebrow>
      <h2 className="display">Five ways in</h2>
      <ul className="involved-grid">
        {getInvolved.map((item) => (
          <li key={item.number}>
            <span className="involved-number" aria-hidden="true">
              {item.number}
            </span>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
            <a href={item.cta.href}>
              {item.cta.label} <ArrowRight />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ---------------- 15. Footer ---------------- */

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <Wordmark className="wordmark-footer" />
          <p>{site.description}</p>
          <SocietyLogo className="society-logo-footer" />
        </div>
        {footerColumns.map((column) => (
          <nav className="footer-column" key={column.heading} aria-label={column.heading}>
            <h2>{column.heading}</h2>
            {column.links.map((link) =>
              link.href ? (
                <a key={link.label} href={link.href}>
                  {link.label}
                </a>
              ) : (
                <span key={link.label}>{link.label}</span>
              ),
            )}
          </nav>
        ))}
      </div>
      <div className="footer-bottom">
        <p>{site.copyright}</p>
        <ul>
          {site.legal.map((item) => (
            <li key={item.label}>
              {item.href ? <a href={item.href}>{item.label}</a> : <span>{item.label}</span>}
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
