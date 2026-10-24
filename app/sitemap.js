import { events } from '../lib/content.js';
import { SITE_URL } from '../lib/site-config.js';

export default function sitemap() {
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...events.map((event) => ({
      url: `${SITE_URL}/events/${event.id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    })),
  ];
}
