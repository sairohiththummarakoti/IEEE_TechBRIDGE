# TechBridge - IEEE Computer Society global program

Next.js website with a Cloudflare Pages static export (no R2). Node.js 22 or later and pnpm 10.18.2 are required.

## Local development

```bash
pnpm install --frozen-lockfile
pnpm dev
```

Run `pnpm build` for the standard production build. See [CLOUDFLARE.md](CLOUDFLARE.md) for the Pages build and deployment.

## Current content

Only the confirmed November 7, 2026 Tech Bridge Program in Columbia is published. Supplied team names, structure and LinkedIn pages are included. Unverified statistics, testimonials, photographs and partnerships are hidden. Content lives in [lib/content.js](lib/content.js).

See [LAUNCH-PENDING.md](LAUNCH-PENDING.md) for outstanding details and deferred features. Capacity handling, waitlists, participant confirmation emails and four separate interest forms remain deferred.

## Connecting the forms

1. Sign in with Sai Rohit's Google account (`sairohith.thummarakoti@ieee.org`) and create the registration spreadsheet. Share it with `vinil.pasupuleti@ieee.org` as an editor.
2. Open **Extensions > Apps Script** and paste [google-apps-script/Code.gs](google-apps-script/Code.gs). Organizer notifications are configured for both supplied addresses.
3. Choose **Deploy > New deployment > Web app**, execute as **Me**, and allow access to **Anyone**. Authorize spreadsheet and email access, then copy the Web App URL ending in `/exec`.
4. Set `NEXT_PUBLIC_GOOGLE_SCRIPT_URL` to that URL in Cloudflare's **build variables**, then rebuild. For local development, copy `.env.local.example` to `.env.local` and fill in the same value.
5. Submit each form through the deployed site and verify the sheet row and organizer notifications.

Program requests go to `Submissions`; registrations go to `Reg columbia-2026`. The backend currently records rows without enforcing capacity or duplicates. The updated script rejects registrations after the event day in Columbia local time. Participant emails are not sent.

After changing Apps Script, use **Deploy > Manage deployments > Edit > New version**. Saving alone does not update the live endpoint.

The browser posts JSON using `Content-Type: text/plain` to avoid a CORS preflight. A missing script URL simulates success only in development; production submissions display an error.

## Other maintenance

Run `pnpm run generate:map` to regenerate `public/world.svg`. Map projection constants live in `lib/world-projection.js`.

The IEEE Computer Society logo is used unmodified. Follow the official [logo policy](https://www.computer.org/publications/logo-policy) and [brand guide](https://www.computer.org/about/ieee-computer-society-brand-guide).
