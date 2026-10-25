# TechBridge — IEEE Computer Society global program

Next.js implementation of the TechBridge homepage, built to the **"3a" IEEE blue/cyan**
variant of the supplied design reference.

## Run locally

```bash
pnpm install
pnpm dev
```

## Production

```bash
pnpm build
pnpm start
```

Every route prerenders to static HTML, so the whole page — headings, events, team,
stories, structured data — is in the initial response rather than assembled by
client JavaScript. Only the header menu, event filter, gallery lightbox and the two
forms ship as client components.

There are two kinds of page: the homepage (`/`) and one detail-and-registration page
per event (`/events/<id>`), generated from the `events` array in
[lib/content.js](lib/content.js).

To emit a plain static bundle instead (any web host, no Node process), uncomment
`output: 'export'` in [next.config.mjs](next.config.mjs). Do that only once the
request form posts to an external endpoint.

## Deploying to Vercel

1. Push this repo to GitHub/GitLab/Bitbucket and import it in Vercel — the
   Next.js framework preset is auto-detected, and `pnpm-lock.yaml` makes
   Vercel use pnpm automatically. No `vercel.json` is needed.
2. **Project Settings > Environment Variables**, add:
   - `NEXT_PUBLIC_GOOGLE_SCRIPT_URL` — **required** for the request form to
     actually submit anywhere. Without it, submissions in production now show
     a visible error rather than a false success (see below) — the form
     never silently swallows real requests.
   - `NEXT_PUBLIC_SITE_URL` — optional. Without it, canonical URLs, Open
     Graph tags and `sitemap.xml`/`robots.txt` automatically fall back to
     Vercel's own deployment domain (`VERCEL_URL`, set automatically on every
     build) rather than the local-dev placeholder. Set this once a custom
     domain is attached, so metadata points at the real address instead of
     `<project>.vercel.app`.
   Add both under **Production**; add them under **Preview** too if you want
   preview deployments to submit real test data to the same sheet (or point
   Preview at a second Apps Script deployment / test sheet instead).
3. Deploy. Build command, output directory and install command all use
   Vercel's Next.js defaults — nothing to override.

**Why a missing env var is safe now:** `submitForm()` in
[lib/submit-form.js](lib/submit-form.js) only
simulates success when `NODE_ENV !== 'production'` (i.e. `next dev`). In a
production build — Vercel or otherwise — a missing `GOOGLE_SCRIPT_URL` throws
instead, and the form shows the same error state as any other failed
submission. A forgotten or mis-scoped environment variable fails loudly
instead of quietly losing every real request.

## Connecting the forms

Both forms — "Request a program" on the homepage and the registration form on
each event page — post to the same Apps Script Web App. Each payload carries a
`type` (`request` or `registration`). Requests all go in one tab,
`Submissions`. Registrations use the same form for every event but get **one
tab per event** in the same spreadsheet, named after the event's id (for
example `Reg columbia-2026`) and created the first time someone registers for
it. Renaming an event's `id` in `content.js` therefore starts a new tab. The
script only records rows: it does not enforce an event's
capacity, reject duplicate registrations or email the registrant.

The forms post to a Google Sheet through a Google Apps Script Web App. No
Google Form is involved — Apps Script gives a real success/failure response
and a spreadsheet of submissions, where a raw Google Form submission would be
opaque (no response body) and tie you to that form's internal `entry.xxxxx`
field IDs.

1. Create a Google Sheet (any name).
2. **Extensions > Apps Script.** Delete the placeholder `myFunction` code and
   paste in [google-apps-script/Code.gs](google-apps-script/Code.gs).
3. Optional — set `NOTIFY_EMAIL` near the top of the script to an inbox you
   actually read, so you get an email per submission alongside the sheet row.
   It defaults to off: the site's placeholder contact address
   (`techbridge@computer.org`) is design-reference content, not a real
   mailbox, so it is never used automatically.
4. **Deploy > New deployment** > gear icon > **Web app**.
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Click Deploy, then **Authorize access** with your Google account. Google
   will warn the script is unverified (expected, since you just wrote it) —
   Advanced > Go to project (unsafe) > Allow.
6. Copy the **Web app URL** (ends in `/exec`).
7. Set it as `NEXT_PUBLIC_GOOGLE_SCRIPT_URL` — copy
   [.env.local.example](.env.local.example) to `.env.local` for local dev, and
   add the same key to your hosting provider's environment variables for
   production.
8. Rebuild. Submissions now land as rows in a `Submissions` sheet, with the
   multi-select "Support needed" chips joined into one comma-separated cell.

### Does this notify anyone?

Not by default, and neither would a plain Sheet or Form:

- A **bare Google Sheet** only notifies if you turn on `Tools > Notification
  settings`, and even then the email just says the sheet changed — no
  submission details — and fires on any edit, including ones you make
  yourself.
- A **plain Google Form** does have a built-in "email me for new responses"
  toggle (Responses tab > ⋮), which is why it's tempting — but it ties you to
  that form's own field IDs and gives no programmatic success/failure
  response, which is why this setup uses Apps Script instead.
- With `NOTIFY_EMAIL` set, `doPost` emails you the submission directly —
  reliable, immediate, and scoped to actual form submissions only. A failed
  send is logged and swallowed rather than failing the submission, since the
  row is already saved by the time it runs.

**Whenever you edit `Code.gs` after the first deploy**, you must push a new
version — saving in the Apps Script editor does not update the live `/exec`
URL. Use Deploy > Manage deployments > the pencil icon > New version.

Leave `NEXT_PUBLIC_GOOGLE_SCRIPT_URL` unset during development and the form
simulates a successful submission instead of calling out, so the UI stays
testable offline.

**Why the request uses `Content-Type: text/plain`:** Apps Script Web Apps
don't answer CORS preflight (`OPTIONS`) requests. A POST with
`Content-Type: application/json` triggers a preflight, which then hangs with
no response — every submission fails silently. `text/plain` qualifies as a
["simple request"](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS#simple_requests)
and skips preflight entirely; the body is still a JSON string, and
`JSON.parse(e.postData.contents)` on the Apps Script side reads it normally.
This is handled already in `submitForm()` in
[lib/submit-form.js](lib/submit-form.js) — nothing to change there.

## Before launch

These are deliberate gaps, not oversights:

- **`NEXT_PUBLIC_SITE_URL` is unset.** On Vercel this is harmless — see
  [lib/site-config.js](lib/site-config.js), which falls back to the
  deployment's own `VERCEL_URL` automatically. Outside Vercel (or once a
  custom domain is attached), set it explicitly or canonical/OG/sitemap fall
  back further to an obviously-fake placeholder domain.
- **Spam protection is basic.** Both forms carry a hidden honeypot field and
  report how long the form was open ([components/SpamGuard.jsx](components/SpamGuard.jsx));
  [Code.gs](google-apps-script/Code.gs) silently drops anything that fills the
  honeypot or arrives in under 2.5 s, re-checks required fields and email format,
  caps each email at 3 submissions per 10 minutes and all traffic at 60 per
  minute, truncates long values, and stops cell values from being run as
  formulas. That stops casual bots, but both signals are client-supplied, so a
  bot written for this site gets past them. If spam does arrive, add Cloudflare
  Turnstile: a site key on the forms and a secret-key check in `doPost` via
  `UrlFetchApp`. Before that, the forms post to a Google Apps
  Script Web App (see "Connecting the forms" above) — a real backend,
  not a front-end demo — but the deployment is reachable by anyone who has
  the URL, with no CAPTCHA or rate limiting. Add one (e.g. a honeypot field,
  or gate the Apps Script endpoint) before treating this as launch-ready
  against abuse.
- **All content is placeholder.** Everything in [lib/content.js](lib/content.js) —
  statistics, cities, events, quotes, names, partner list, funding and review policy
  — comes from the design reference and is **not verified IEEE data**.
- **No photography.** Image slots render as labeled hatched frames. Supply `src` on
  any entry in `content.js` and the frame is replaced by the image. The one
  exception is the hero, which uses an existing workshop photo from `public/assets`;
  its caption stays generic rather than naming a venue, because that photo is a
  stand-in.
- **No social or LinkedIn URLs.** Entries with `href: null` / `linkedin: null` render
  as plain text instead of invented links. The same goes for the footer's
  "Professional activities" link and the privacy policy named in the registration
  consent line.
- **Registration closes by date, on the site only.** An event is upcoming, with
  registration open, through its `isoDate` and past from the next day (UTC); see
  [lib/events.js](lib/events.js). Pages re-render hourly (`revalidate`), which
  needs a Node host such as Vercel — with `output: 'export'` the state would be
  frozen at build time. The Apps Script does not check dates, so a request sent
  straight to the endpoint is still recorded after an event has closed.
- **Only the Columbia event has detail copy.** The other three event pages show
  date, location and capacity plus the registration form; fill in `format`, `cost`,
  `about` and `highlights` in `content.js` when the real descriptions exist.
- **Open Graph image** currently reuses the hero photo. Replace with a purpose-made
  1200×630 asset.

## Content model

[lib/content.js](lib/content.js) is the single source for every section. Of note:

- `events` drives the event cards, the "What's coming next" timeline and the
  `/events/<id>` pages, so event data is never maintained twice. An event's `id`
  is its URL slug. Read them through `getEvents()` in
  [lib/events.js](lib/events.js), which adds the date-derived `state` and
  `status`. `state` is `upcoming` or `past`, and an event moves from the
  Upcoming filter to Past on its own the day after its date.
- `footprint.cities` carries real `lng` / `lat`, projected by
  [lib/world-projection.js](lib/world-projection.js) onto the same
  equirectangular frame as the landmass drawing. Hovering a dot shows the city,
  region and status; status differs by marker **shape** as well as colour, and
  the full city list is exposed to screen readers as text.
- `partnerGroups`, `team` and `gallery` are plain arrays — add or remove entries
  without touching layout.

## The world map

`public/world.svg` is generated, not hand-drawn — run `pnpm run generate:map`
([scripts/generate-world-path.mjs](scripts/generate-world-path.mjs)) to rebuild it
from Natural Earth 110m data (public domain, via `world-atlas`). It ships as a
separately cached image rather than inline markup because the path is ~49KB and
purely decorative; inlining would put it in both the server HTML and the client
bundle.

The projection constants live in [lib/world-projection.js](lib/world-projection.js)
and are read by both the generator and the dot layer. Change them in one place
and regenerate, or the dots will drift off the coastlines.

Note that the design reference has no landmasses at all — just a grid of dots.
The map is an addition; if you want to match the reference exactly, drop the
`background` image from `.map-frame`.

## Accessibility

WCAG 2.2 AA was the target: skip link, visible focus rings, real `<label>`s with
per-field error text and `aria-invalid`, a focus-trapped lightbox with keyboard and
swipe navigation, non-colour status cues on the map, and `prefers-reduced-motion`
honoured for the scroll reveals.

## Brand assets

The IEEE Computer Society logo is used unmodified in the header and footer. The
favicons in `public/` (`favicon.ico`, `icon-192.png`, `icon-512.png`,
`apple-touch-icon.png`) are the orange emblem alone, cropped from that logo
without the wordmark or "TM", because the full lockup is unreadable at 16–32px.
Confirm with IEEE CS that the emblem may be used on its own this way. Follow the official
[logo policy](https://www.computer.org/publications/logo-policy) and
[brand guide](https://www.computer.org/about/ieee-computer-society-brand-guide).
