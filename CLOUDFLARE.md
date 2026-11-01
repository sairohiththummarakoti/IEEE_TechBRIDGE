# Cloudflare Pages deployment (no R2)

This site exports static HTML to `out/`. R2, Durable Objects, OpenNext and a Workers subscription are not required.

## Deploy through Git

1. Push this repository to GitHub or GitLab.
2. In Cloudflare **Workers & Pages**, choose **Create application > Pages > Connect to Git** (or **Import an existing Git repository** in the Pages flow). Select your repository and production branch. Create a Pages project, not a Worker.
3. Set these build settings:

   | Setting | Value |
   | --- | --- |
   | Framework preset | Next.js (Static HTML Export), or None |
   | Root directory | Repository root |
   | Build command | `pnpm run build` |
   | Build output directory | `out` |
   | Node version | `NODE_VERSION=22` |
   | pnpm version | `PNPM_VERSION=10.18.2` |

   Pages Git deployments do not need a separate deploy command. Remove any old OpenNext/Workers commands from the dashboard.

4. Add **Production build variables**:

   | Variable | Value |
   | --- | --- |
   | `NEXT_PUBLIC_SITE_URL` | `https://ieeetechbridge.com` |
   | `NEXT_PUBLIC_GOOGLE_SCRIPT_URL` | Your Apps Script Web App URL ending in `/exec` |

   Add the same variables to Preview if needed. To avoid real test submissions in the production sheet, use a separate script URL for previews.
   Public variables are embedded during the build: rebuild after changing them. The site builds with a blank script URL, but production forms then show an error.

5. Save and deploy. Check the generated `*.pages.dev` URL, including `/events/columbia-2026/` and an unknown URL (which should show the 404 page).
6. Under the Pages project, choose **Custom domains > Set up a custom domain** and add `ieeetechbridge.com`. Activate its Cloudflare zone and follow the DNS instructions. If a previous Worker owns this hostname, detach that hostname from the Worker first. The Pages config does not automatically attach a domain.
7. Redeploy the updated Apps Script via **Manage deployments > Edit > New version**, or create a Web App deployment if this is the first one. Execute as the owner, allow Anyone, and authorize email/spreadsheet access. Follow [Connecting the forms](README.md#connecting-the-forms).
8. Submit each form from the deployed site. Verify the correct spreadsheet tab and notifications to Sai and Vinil. Participant confirmations and waitlists remain deferred.

## Local build and preview

Copy `.env.local.example` to `.env.local`, fill in the script URL, then run:

```bash
pnpm install --frozen-lockfile
pnpm build
pnpm preview
```

On PowerShell, use `npm.cmd run build` and `npm.cmd run preview` if script execution policy blocks npm.ps1. `out/` is the deployable folder; do not deploy `.next/`.

For CLI deployment, create a Pages project named `ieee-techbridge`, run `pnpm exec wrangler login`, then `pnpm run deploy`. This command publishes the site. Use the dashboard Git workflow above if pnpm is unavailable locally.

## Dates and updates

Content, metadata and the initial HTML are generated at build time. Push changes to rebuild. There is no hourly server revalidation.
After hydration, event cards, map markers and registration availability refresh from the browser clock every minute and when the tab becomes visible. Registration is checked again on submit. The event detail heading uses its fixed date so it does not retain an old registration status.
Apps Script independently accepts registrations through November 7, 2026 in `America/New_York`, then rejects them from local midnight November 8, even if a visitor alters the browser clock. Keep the trusted `EVENTS` configuration in Code.gs in sync with lib/content.js and redeploy the script when event dates change.
Without JavaScript the date-derived listing reflects the last build and interactive forms cannot submit. Rebuild after the event to refresh initial HTML for visitors and crawlers.

Official reference: [Cloudflare Pages static Next.js guide](https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-static-nextjs-site/).
