import { events, footprint } from './content.js';

/**
 * Whether an event is upcoming or past is derived from its date, never stored:
 * registration stays open through the event's own date and closes the day
 * after in the event's local timezone (UTC when none is specified).
 *
 * Initial HTML is generated at build time; client components refresh status
 * after hydration. Apps Script separately enforces the registration cutoff.
 */
export function isPast(isoDate, now = new Date(), timeZone = 'UTC') {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone, year: 'numeric', month: '2-digit', day: '2-digit',
  }).formatToParts(now);
  const part = (type) => parts.find((entry) => entry.type === type).value;
  return `${part('year')}-${part('month')}-${part('day')}` > isoDate;
}

export function getEvents(now = new Date()) {
  return events.map((event) => {
    const past = isPast(event.isoDate, now, event.timeZone);
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
