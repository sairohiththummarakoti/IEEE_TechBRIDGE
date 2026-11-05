import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';
import { isPast, getEvents } from '../lib/events.js';
import { events } from '../lib/content.js';

const script = readFileSync(new URL('../google-apps-script/Code.gs', import.meta.url), 'utf8');

function backend(now) {
  const writes = [];
  class Clock extends Date {
    constructor(...args) { super(...(args.length ? args : [now])); }
  }
  const context = vm.createContext({
    Date: Clock,
    Utilities: {
      formatDate(date, timeZone) {
        const parts = new Intl.DateTimeFormat('en-US', {
          timeZone, year: 'numeric', month: '2-digit', day: '2-digit',
        }).formatToParts(date);
        const part = (type) => parts.find((entry) => entry.type === type).value;
        return `${part('year')}-${part('month')}-${part('day')}`;
      },
    },
    ContentService: {
      MimeType: { JSON: 'application/json' },
      createTextOutput: (body) => ({ setMimeType: () => JSON.parse(body) }),
    },
  });
  vm.runInContext(script, context);
  context.NOTIFY_EMAIL = '';
  context.getOrCreateSheet_ = () => ({ appendRow: (row) => writes.push(row) });
  return { context, writes };
}

test('Columbia registration stays open through the event day, including after UTC midnight', () => {
  for (const timestamp of ['2026-11-20T23:59:59Z', '2026-11-21T04:59:59Z']) {
    const now = new Date(timestamp);
    assert.equal(isPast('2026-11-20', now, 'America/New_York'), false);
    assert.equal(getEvents(now)[0].state, 'upcoming');
    const { context, writes } = backend(timestamp);
    assert.equal(context.doPost({ postData: { contents: JSON.stringify({
      type: 'registration', eventId: 'columbia-2026', eventTitle: 'Untrusted title',
    }) } }).ok, true);
    assert.equal(writes.length, 1);
    assert.equal(writes[0][1], 'TechX');
  }
});

test('local midnight closes browser state and backend before any row is written', () => {
  const timestamp = '2026-11-21T05:00:00Z';
  assert.equal(isPast('2026-11-20', new Date(timestamp), 'America/New_York'), true);
  assert.equal(getEvents(new Date(timestamp))[0].state, 'past');
  const { context, writes } = backend(timestamp);
  const result = context.doPost({ postData: { contents: JSON.stringify({
    type: 'registration', eventId: 'columbia-2026', isoDate: '2099-01-01',
  }) } });
  assert.equal(result.ok, false);
  assert.match(result.error, /closed/);
  assert.equal(writes.length, 0);
});

test('unknown events are rejected and the deployed backend configuration matches site content', () => {
  const { context, writes } = backend('2026-11-01T12:00:00Z');
  assert.equal(context.doPost({ postData: { contents: JSON.stringify({
    type: 'registration', eventId: 'invented-event',
  }) } }).ok, false);
  assert.equal(writes.length, 0);
  assert.deepEqual(Object.keys(context.EVENTS).sort(), events.map((event) => event.id).sort());
  for (const event of events) {
    assert.equal(context.EVENTS[event.id].date, event.isoDate);
    assert.equal(context.EVENTS[event.id].timeZone, event.timeZone);
    assert.equal(context.EVENTS[event.id].title, event.title);
  }
});
