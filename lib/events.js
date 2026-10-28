import { events, footprint } from './content.js';

/**
 * Whether an event is upcoming or past is derived from its date, never stored:
 * registration stays open through the event's own date and closes the day
 * after. Dates are compared as UTC calendar days.
 *
 * This runs on the server, so the answer is as fresh as the rendered HTML. The
 * pages that use it set `revalidate`, which re-renders them hourly using the configured
 * Cloudflare Workers cache. In a static export it is frozen at build time.
 */
export function isPast(isoDate, now = new Date()) {
  return now.toISOString().slice(0, 10) > isoDate;
}

export function getEvents(now = new Date()) {
  return events.map((event) => {
    const past = isPast(event.isoDate, now);
    return {
      ...event,
      state: past ? 'past' : 'upcoming',
      status: past ? 'Registration closed' : 'Registration open',
    };
  });
}

/**
 * Map cities, with the status of any city that hosts a listed event taken from
 * that event's date so the map cannot disagree with the event cards.
 */
export function getCities(now = new Date()) {
  const byCity = new Map(getEvents(now).map((event) => [event.city, event]));
  return footprint.cities.map((city) => {
    const event = byCity.get(city.name);
    return event ? { ...city, status: event.state === 'past' ? 'held' : 'scheduled' } : city;
  });
}
