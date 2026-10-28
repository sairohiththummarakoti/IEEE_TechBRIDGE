import { notFound } from 'next/navigation';
import Header from '../../../components/Header.jsx';
import RegisterForm from '../../../components/RegisterForm.jsx';
import { Eyebrow, Slot } from '../../../components/primitives.jsx';
import { events, registration } from '../../../lib/content.js';
import { getEvents } from '../../../lib/events.js';
import { SITE_NAME } from '../../../lib/site-config.js';

// Only the events in lib/content.js exist; anything else is a 404.
export const dynamicParams = false;

// Registration opens and closes by date, so re-render hourly (see lib/events.js).
export const revalidate = 3600;

export function generateStaticParams() {
  return events.map((event) => ({ id: event.id }));
}

function findEvent(id) {
  return getEvents().find((event) => event.id === id);
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const event = findEvent(id);
  if (!event) return {};
  const title = `${event.title} · ${event.city} | ${SITE_NAME}`;
  const description =
    event.about ?? `${event.title}, hosted by ${event.host} in ${event.location} on ${event.date}.`;
  return {
    title,
    description,
    alternates: { canonical: `/events/${event.id}` },
    openGraph: { title, description, url: `/events/${event.id}` },
    twitter: { title, description },
  };
}

export default async function EventPage({ params }) {
  const { id } = await params;
  const event = findEvent(id);
  if (!event) notFound();

  const facts = [
    { label: 'Date', value: event.date },
    { label: 'Location', value: event.location },
    { label: 'Venue', value: event.venue },
    { label: 'Capacity', value: event.capacity },
    { label: 'Cost', value: event.cost },
  ].filter((fact) => fact.value);
  const isOpen = event.state === 'upcoming';

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header back={{ label: 'All events', href: '/#events' }} />
      <main id="main">
        <section className="event-hero">
          <Eyebrow className="eyebrow-on-dark">
            {[event.status, event.format].filter(Boolean).join(' · ')}
          </Eyebrow>
          <h1>{event.title}</h1>
          <p>Hosted by {event.host}</p>
        </section>

        <div className="event-detail">
          <div className="event-info">
            <dl className="event-facts">
              {facts.map((fact) => (
                <div className="event-fact" key={fact.label}>
                  <dt>{fact.label}</dt>
                  <dd>
                    {fact.label === 'Date' ? <time dateTime={event.isoDate}>{fact.value}</time> : fact.value}
                  </dd>
                </div>
              ))}
            </dl>

            {event.about ? (
              <section>
                <h2 className="eyebrow">About this event</h2>
                <p className="event-about">{event.about}</p>
              </section>
            ) : null}

            {event.highlights.length > 0 ? (
              <section>
                <h2 className="eyebrow">What you&rsquo;ll do</h2>
                <ul className="event-highlights">
                  {event.highlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
            ) : null}

            {event.venueImage ? <Slot label="Venue photo / map" src={event.venueImage} alt="" ratio="10 / 7" /> : null}
          </div>

          {isOpen ? (
            <RegisterForm event={{ id: event.id, title: event.title, isoDate: event.isoDate, timeZone: event.timeZone }} />
          ) : (
            <p className="empty-state">{registration.closed}</p>
          )}
        </div>
      </main>
    </>
  );
}
