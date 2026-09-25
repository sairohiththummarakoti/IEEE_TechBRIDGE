'use client';

import { useMemo, useState } from 'react';
import { eventFilters, events } from '../lib/content.js';
import { Eyebrow, Slot } from './primitives.jsx';

function EventCard({ event }) {
  return (
    <article className="event-card">
      <Slot label="Event photo" src={event.image} alt="" ratio="16 / 10" />
      <div className="event-band">
        <h3>{event.city}</h3>
        <p>
          <time dateTime={event.isoDate}>{event.date}</time>
        </p>
        <p className="event-status">{event.status}</p>
      </div>
      <div className="event-body">
        <h4>{event.href ? <a href={event.href}>{event.title}</a> : event.title}</h4>
        <p>{event.host}</p>
        <p className="event-attendees">{event.attendees}</p>
      </div>
    </article>
  );
}

export default function Events() {
  const [filter, setFilter] = useState('upcoming');
  const visible = useMemo(
    () => (filter === 'all' ? events : events.filter((event) => event.state === filter)),
    [filter],
  );

  return (
    <section className="section section-light events" id="events">
      <div className="section-head">
        <div>
          <Eyebrow>Highlights</Eyebrow>
          <h2 className="display">Events around the world</h2>
        </div>
        <div className="segmented" role="group" aria-label="Filter events">
          {eventFilters.map((option) => (
            <button
              type="button"
              key={option.value}
              className={filter === option.value ? 'is-active' : ''}
              aria-pressed={filter === option.value}
              onClick={() => setFilter(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="event-grid" aria-live="polite">
        {visible.length > 0 ? (
          visible.map((event) => <EventCard event={event} key={event.id} />)
        ) : (
          <p className="empty-state">
            No past programs are listed yet. Choose &ldquo;Upcoming&rdquo; or &ldquo;All&rdquo; to see
            scheduled programs.
          </p>
        )}
      </div>
    </section>
  );
}
