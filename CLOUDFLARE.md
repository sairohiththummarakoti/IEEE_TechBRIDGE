# Cloudflare static asset deployment (no R2)

The Next.js site exports HTML/CSS/JavaScript into `out/`. Cloudflare Workers serves this folder directly using Static Assets. No Worker script, OpenNext, R2 bucket or Durable Object is needed.

## Fix the current deployment

1. Commit and push the latest `wrangler.jsonc` and `package.json` to the production branch. The config now uses `assets.directory: "./out"` instead of the Pages-only `pages_build_output_dir` setting.
2. Keep your existing Cloudflare Workers project. Its name must match `ieee-techbridge` in `wrangler.jsonc`. If your project has a different name, update that field to match it.
3. In the project build settings use:

   | Setting | Value |
   | --- | --- |
   | Build command | `pnpm run build` |
   | Deploy command | `pnpm exec wrangler deploy` |
   | Non-production branch command, if enabled | `pnpm exec wrangler versions upload` |
   | Root directory | Repository root |

   The existing `npx wrangler deploy` command also works with this config. Do not use `wrangler pages deploy` for this project.

4. Keep these variables in the **build environment**:

   | Variable | Value |
   | --- | --- |
   | `NEXT_PUBLIC_SITE_URL` | `https://ieeetechbridge.com` |
   | `NEXT_PUBLIC_GOOGLE_SCRIPT_URL` | Your Apps Script `/exec` URL |
   | `NODE_VERSION` | `22` (or a supported later version) |

   Public variables are embedded at build time. Rebuild after changing them. Variables cannot fix a missing assets directory; the committed Wrangler config does that.

5. Retry the deployment from the new commit. Check the generated `*.workers.dev` URL, `/events/columbia-2026/`, and an unknown URL (404).
6. In the Worker settings, open **Domains & Routes > Add > Custom Domain** and add `ieeetechbridge.com`. The domain must be active in this Cloudflare account. Resolve any conflicting project/domain assignment first.
7. Deploy or update the separate Apps Script Web App as described in [README.md](README.md#connecting-the-forms). Submit each form on the live site and verify the Sheet rows and organizer notifications.

## Local verification

```bash
pnpm install --frozen-lockfile
pnpm build
pnpm preview
```

`pnpm run deploy` builds and publishes. For a check without publishing, run `pnpm exec wrangler deploy --dry-run` after building.

## Date behavior

Initial HTML, metadata and content are generated at build time. Date-based event status refreshes in the browser after hydration, every minute and when a tab becomes visible. Registration is checked again on submit. Apps Script separately enforces closure after November 7, 2026 in America/New_York once the updated script is deployed.
Content edits need a rebuild. Rebuild after the event to refresh initial HTML for crawlers and visitors without JavaScript. Capacity, waitlists, participant confirmation emails and separate interest forms remain deferred.

Official reference: [Workers Static Assets](https://developers.cloudflare.com/workers/static-assets/get-started/).
