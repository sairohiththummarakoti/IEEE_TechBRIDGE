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
client JavaScript. Only the header menu, event filter, gallery lightbox and request
form ship as client components.

To emit a plain static bundle instead (any web host, no Node process), uncomment
`output: 'export'` in [next.config.mjs](next.config.mjs). Do that only once the
request form posts to an external endpoint.

## Before launch

These are deliberate gaps, not oversights:

- **`NEXT_PUBLIC_SITE_URL` is unset.** [lib/site-config.js](lib/site-config.js) falls
  back to `https://techbridge.example.org`, which feeds the canonical tag, sitemap
  and robots. Set the real origin or you will publish a wrong canonical URL.
- **The request form has no backend.** `submitRequest` in
  [components/RequestProgram.jsx](components/RequestProgram.jsx) resolves after a
  short delay; the success panel is a front-end demo. Point it at an approved form
  endpoint before collecting submissions, and add spam protection there.
- **All content is placeholder.** Everything in [lib/content.js](lib/content.js) —
  statistics, cities, events, quotes, names, partner list, funding and review policy
  — comes from the design reference and is **not verified IEEE data**.
- **No photography.** Image slots render as labeled hatched frames. Supply `src` on
  any entry in `content.js` and the frame is replaced by the image. The one
  exception is the hero, which uses an existing workshop photo from `public/assets`;
  its caption says `HOST INSTITUTION` rather than naming a venue, because that
  photo is a stand-in.
- **No social or LinkedIn URLs.** Entries with `href: null` / `linkedin: null` render
  as plain text instead of invented links.
- **Open Graph image** currently reuses the hero photo. Replace with a purpose-made
  1200×630 asset.

## Content model

[lib/content.js](lib/content.js) is the single source for every section. Of note:

- `events` drives both the event cards and the "What's coming next" timeline, so
  event data is never maintained twice. `state` is `upcoming` or `past`; the design
  supplies no past events, so the Past filter shows an empty state rather than
  invented history.
- `footprint.cities` carries `x` / `y` as percentages of the map frame, plus a
  `status` of `held` or `scheduled`. Status differs by marker **shape** as well as
  colour, and the full city list is exposed to screen readers as text.
- `partnerGroups`, `team` and `gallery` are plain arrays — add or remove entries
  without touching layout.

## Accessibility

WCAG 2.2 AA was the target: skip link, visible focus rings, real `<label>`s with
per-field error text and `aria-invalid`, a focus-trapped lightbox with keyboard and
swipe navigation, non-colour status cues on the map, and `prefers-reduced-motion`
honoured for the scroll reveals.

## Brand assets

The IEEE Computer Society logo is used unmodified. Follow the official
[logo policy](https://www.computer.org/publications/logo-policy) and
[brand guide](https://www.computer.org/about/ieee-computer-society-brand-guide).
