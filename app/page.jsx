import Header from '../components/Header.jsx';
import Events from '../components/Events.jsx';
import RequestProgram from '../components/RequestProgram.jsx';
import RevealOnScroll from '../components/RevealOnScroll.jsx';
import {
  About,
  Audiences,
  Footer,
  Footprint,
  GetInvolved,
  Hero,
  Partners,
  Schedule,
  Stats,
  Stories,
  Team,
} from '../components/Sections.jsx';
import { events, site } from '../lib/content.js';
import { getEvents } from '../lib/events.js';
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '../lib/site-config.js';

// Upcoming/past and open/closed are derived from each event's date, so the
// page is re-rendered hourly rather than frozen at build time.
export const revalidate = 3600;

/**
 * Structured data. Only facts that appear on the page are described here, and
 * every event below is placeholder content from the design reference — remove
 * or replace the event list before search engines index real listings.
 */
function structuredData() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: SITE_NAME,
        description: SITE_DESCRIPTION,
        url: SITE_URL,
        parentOrganization: {
          '@type': 'Organization',
          name: 'IEEE Computer Society',
          url: 'https://www.computer.org/',
        },
        email: site.contactEmail,
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        name: SITE_NAME,
        url: SITE_URL,
        publisher: { '@id': `${SITE_URL}/#organization` },
      },
      ...events.map((event) => ({
        '@type': 'EducationEvent',
        name: event.title,
        startDate: event.isoDate,
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        eventStatus: 'https://schema.org/EventScheduled',
        location: { '@type': 'Place', name: event.host, address: event.city },
        organizer: { '@id': `${SITE_URL}/#organization` },
      })),
    ],
  };
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData()) }}
      />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Stats />
        <Audiences />
        <About />
        <Footprint />
        <Events events={getEvents()} />
        <Schedule />
        <Stories />
        <Partners />
        <Team />
        <GetInvolved />
        <RequestProgram />
      </main>
      <Footer />
      <RevealOnScroll />
    </>
  );
}
