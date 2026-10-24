/**
 * Canonical origin for metadata, sitemap and robots.
 *
 * Resolution order:
 *   1. NEXT_PUBLIC_SITE_URL — set this once a real domain (custom or the
 *      project's *.vercel.app) is attached; it always wins.
 *   2. VERCEL_URL — set automatically by Vercel on every build (production
 *      and preview alike) to that deployment's own domain, with no setup
 *      needed. Not prefixed with NEXT_PUBLIC_, so it only resolves on the
 *      server (this is fine: SITE_URL is read for metadata/sitemap/robots,
 *      never for anything the client needs).
 *   3. A deliberately non-routable placeholder — used only outside Vercel
 *      (e.g. local dev) when neither of the above is set. Shipping a wrong
 *      real-looking domain as canonical is worse for SEO than an obviously
 *      fake one.
 */
const vercelUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined;
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || vercelUrl || 'https://techbridge.example.org';

export const SITE_NAME = 'TechBridge';

export const SITE_TITLE = 'TechBridge | IEEE Computer Society Global Program';

export const SITE_DESCRIPTION =
  'TechBridge connects IEEE Computer Society expertise with industry professionals, chapters and partner organizations through hands-on sessions, hackathons, speakers and curriculum worldwide.';

/**
 * Google Apps Script Web App endpoint that the request form posts to.
 *
 * Set NEXT_PUBLIC_GOOGLE_SCRIPT_URL to the '/exec' URL from Deploy > New
 * deployment > Web app in the Apps Script project bound to your submissions
 * spreadsheet. See README.md ("Connecting the forms") for the full
 * setup — creating the sheet, pasting the script and deploying it are steps
 * only you can do, since they run under your own Google account.
 *
 * Left unset, the form falls back to a simulated submission so the UI stays
 * testable without a live endpoint.
 */
export const GOOGLE_SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL || '';
