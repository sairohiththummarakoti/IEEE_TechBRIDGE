/**
 * Canonical origin for metadata, sitemap and robots.
 *
 * The real TechBridge domain has not been supplied, so the default below is a
 * deliberately non-routable placeholder — shipping it would publish a wrong
 * canonical URL, which is worse for SEO than none. Set NEXT_PUBLIC_SITE_URL in
 * the deployment environment before going live.
 */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://techbridge.example.org';

export const SITE_NAME = 'TechBridge';

export const SITE_TITLE = 'TechBridge | IEEE Computer Society Global Program';

export const SITE_DESCRIPTION =
  'TechBridge connects IEEE Computer Society expertise with student branches, chapters and universities through technical workshops, speakers, curriculum and community programs worldwide.';
