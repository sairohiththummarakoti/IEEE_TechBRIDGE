# Launch status and pending items

## Included now

- One confirmed event: Tech Bridge Program, November 7, 2026, Columbia, South Carolina.
- Exact venue, program details, fees and capacity are not advertised as confirmed.
- IEEE Computer Society / Columbia participation only; Charlotte is not listed.
- Global reach across all IEEE regions, with only Columbia marked on the map.
- No placeholder statistics, testimonials, previous-event gallery or sponsor logos.
- Supplied IEC, outreach, regional, website and newsletter team structure and names.
- TechBRIDGE and Industry Engagement LinkedIn pages; Sai's supplied profile link.
- Sai and Vinil's email addresses as named team contacts, not an official program inbox.
- Both email addresses configured for organizer submission notifications in Code.gs.
- Existing program-request and event-registration forms. Chapters and companies can request.

## Deployment setup still required

- Cloudflare account access and a Pages project connected to the repository. No R2 subscription is required.
- Confirm `ieeetechbridge.com` remains the final domain and activate its Cloudflare zone.
  This domain remains configured from the earlier instruction.
- Sai Rohit's Google account must own the registration spreadsheet; share it with
  `vinil.pasupuleti@ieee.org` as an editor. No account access has been changed here.
- Deploy Code.gs as a Web App under Sai's account, execute as the deploying account,
  allow Anyone, and authorize spreadsheet and email access.
- Fill `NEXT_PUBLIC_GOOGLE_SCRIPT_URL` with the `/exec` URL in Cloudflare build variables.
- Complete a real browser submission for each existing form; verify the correct
  sheet tab and notifications to both organizers. Live integration is not verified here.
- Deploy the static `out/` build through Cloudflare Pages and check the live custom domain.

## Deferred functionality

- Capacity and waitlist: capacity is unknown. The current backend records all
  registrations; it does not reserve seats, enforce capacity or assign waitlist status.
- Participant confirmation emails: not implemented. Current emails notify organizers only.
- Four separate Volunteer, Speaker, Partner and Sponsor forms and their field definitions.
  Current interest links use the existing request form.
- Redeploy the updated Apps Script so its event-day cutoff takes effect. Browser availability
  refreshes after hydration; the backend enforces closure in America/New_York.
- Duplicate-registration handling and spam protection.

## Content and decisions still needed

- Confirmed capacity and waitlist promotion/cancellation rules.
- Final venue/campus, start/end time and timezone, activities, fees, description and photos.
- Homepage image from VIVIN/media team and an approved social sharing image.
- Full names for David and Caleb if desired, team role refinements, portraits and
  individual profile links. Only supplied names and roles are displayed.
- Named members for Video Production, Graphic Design and Content Writing teams if listed.
- Official program contact inbox, privacy notice and terms for submission data.
- Company eligibility and program-request process; funding amount and review policy.
- Additional participating chapters/societies, partners and sponsors, once confirmed.
- Verified statistics, success stories and event photos after completed programs.

No invitations, emails, account changes or production deployment have been performed.
