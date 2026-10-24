import { GOOGLE_SCRIPT_URL } from './site-config.js';

/**
 * Posts a form payload to the Google Apps Script Web App (see README.md,
 * "Connecting the forms"). `payload.type` tells the script which sheet the
 * row belongs in: 'request' or 'registration'.
 *
 * Content-Type is deliberately 'text/plain': Apps Script doesn't answer CORS
 * preflight requests, so the body must qualify as a "simple request" (no
 * preflight) — application/json here would silently fail every submission.
 * The Apps Script side still parses it as JSON.
 *
 * With GOOGLE_SCRIPT_URL unset, submissions simulate success ONLY in
 * development, so the UI stays testable without a live endpoint. In a
 * production build this throws instead: a missing env var (forgotten,
 * mistyped, or scoped to the wrong Vercel environment) must surface as a
 * visible error, never as a false success while real submissions silently go
 * nowhere.
 */
export async function submitForm(payload) {
  if (!GOOGLE_SCRIPT_URL) {
    if (process.env.NODE_ENV !== 'production') {
      await new Promise((resolve) => {
        setTimeout(resolve, 700);
      });
      return { ok: true };
    }
    throw new Error('This form is not yet connected to a submission endpoint.');
  }

  const response = await fetch(GOOGLE_SCRIPT_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(payload),
  });
  const result = await response.json().catch(() => null);
  if (!response.ok || !result?.ok) {
    throw new Error(result?.error || `Request failed (${response.status})`);
  }
  return result;
}
