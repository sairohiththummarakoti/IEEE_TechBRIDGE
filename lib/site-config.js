/** Canonical origin for metadata, sitemap and robots. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://ieeetechbridge.com';

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
 * setup: creating the sheet, pasting the script and deploying it are steps
 * only you can do, since they run under your own Google account.
 *
 * Left unset, the form falls back to a simulated submission so the UI stays
 * testable without a live endpoint.
 */
export const GOOGLE_SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL || '';
