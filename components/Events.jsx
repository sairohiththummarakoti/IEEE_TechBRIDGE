'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { eventFilters } from '../lib/content.js';
import { getEvents } from '../lib/events.js';
import { useEventClock } from '../lib/use-event-clock.js';
import { ArrowRight, Eyebrow, Slot } from './primitives.jsx';

function EventCard({ event }) {
  return (
    <article className="event-card">
      {event.image ? <Slot label="Event photo" src={event.image} alt="" ratio="16 / 10" /> : null}
      <div className="event-band">
        <h3>{event.city}</h3>
        <p>
          <time dateTime={event.isoDate}>{event.date}</time>
        </p>
        <p className="event-status">{event.status}</p>
      </div>
      <div className="event-body">
        <h4>{event.title}</h4>
        <p>{event.host}</p>
        <p className="event-attendees">{event.attendees}</p>
        <Link className="event-link" href={`/events/${event.id}`}>
          {event.state === 'upcoming' ? 'View details & register' : 'View details'} <ArrowRight />
          <span className="sr-only">: {event.title}</span>
        </Link>
      </div>
    </article>
  );
}

/** `events` comes from getEvents(), so each one already carries its date-derived state. */
export default function Events({ events }) {
  const now = useEventClock();
  const currentEvents = useMemo(() => now ? getEvents(now) : events, [now, events]);
  const [filter, setFilter] = useState('upcoming');
  const visible = useMemo(
    () => (filter === 'all' ? currentEvents : currentEvents.filter((event) => event.state === filter)),
    [currentEvents, filter],
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
            No {filter === 'all' ? '' : `${filter} `}programs are listed yet.
          </p>
        )}
      </div>
    </section>
  );
}
