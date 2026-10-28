# Cloudflare Workers deployment

Production domain: **https://ieeetechbridge.com**.

This project uses the [OpenNext Cloudflare adapter](https://opennext.js.org/cloudflare/get-started).
R2 stores the page cache and a Durable Object queue handles hourly event
revalidation. Keep the server build; static export freezes registration state.

## First deployment

1. Add `ieeetechbridge.com` to your Cloudflare account and activate its zone.
2. Enable R2, then create the cache bucket once:

   ```bash
   pnpm exec wrangler login
   pnpm exec wrangler r2 bucket create ieee-techbridge-cache
   ```

3. In **Workers & Pages**, create a **Worker** connected to this repository.
   Use Node.js 22 or later and pnpm 10.18.2. Configure:

   | Setting | Value |
   | --- | --- |
   | Build command | `pnpm run build:cloudflare` |
   | Deploy command | `pnpm exec opennextjs-cloudflare deploy` |
   | Non-production branch deploy command | `pnpm exec opennextjs-cloudflare upload` |

4. Add these **build variables** before building:

   | Variable | Value |
   | --- | --- |
   | `NEXT_PUBLIC_SITE_URL` | `https://ieeetechbridge.com` |
   | `NEXT_PUBLIC_GOOGLE_SCRIPT_URL` | Fill in your Google Apps Script `/exec` URL |

   Public variables are embedded during the build. Changing only a runtime
   variable does not update the browser bundle; rebuild after filling in the URL.
   Without the script URL the site still builds, but forms show an error.

5. Deploy. `wrangler.jsonc` attaches the Worker to `ieeetechbridge.com` as a
   custom domain. Resolve any conflicting DNS record for that hostname in
   Cloudflare before activating the custom domain.

## Local preview and deployment

Copy `.env.local.example` to `.env.local` and fill in the script URL, then run:

```bash
pnpm install --frozen-lockfile
pnpm run preview
```

After checking the preview, `pnpm run deploy` builds and publishes the Worker.
On Windows, use WSL if the adapter's build encounters platform limitations.

The Apps Script backend is deployed separately in Google; follow
[Connecting the forms](README.md#connecting-the-forms). Saving `Code.gs` alone
does not update an existing Apps Script Web App deployment.
