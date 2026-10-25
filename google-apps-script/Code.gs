/**
 * Apps Script Web App backend for the two TechBridge forms: "Request a
 * program" on the homepage and the registration form on each event page.
 *
 * Setup (see README.md, "Connecting the forms"):
 *   1. Create a Google Sheet.
 *   2. Extensions > Apps Script, delete the boilerplate, paste this file.
 *   3. Set NOTIFY_EMAIL below to your own inbox (optional — leave '' to skip).
 *   4. Deploy > New deployment > Web app.
 *        Execute as:      Me
 *        Who has access:  Anyone
 *   5. Copy the /exec URL into NEXT_PUBLIC_GOOGLE_SCRIPT_URL.
 *
 * Whenever you edit this file, Deploy > Manage deployments > Edit (pencil) >
 * New version — saving alone does not update the live /exec URL.
 */

/**
 * `fields` pairs each column header with the payload key it is filled from, so
 * the header row, the appended row and the notification email can never drift
 * out of step with each other.
 *
 * Program requests all go in one tab. Registrations use the same form for
 * every event but get one tab per event in this same spreadsheet, named
 * `sheet` + the event's id (e.g. "Reg columbia-2026"); the tab is created the
 * first time someone registers for that event.
 */
var FORMS = {
  request: {
    sheet: 'Submissions',
    subject: 'TechBridge program request: ',
    subjectKeys: ['chapter', 'name'],
    required: ['name', 'email', 'chapter', 'region', 'topic', 'attendees', 'details'],
    fields: [
      ['Full name', 'name'],
      ['Email', 'email'],
      ['Chapter / section', 'chapter'],
      ['Country / IEEE region', 'region'],
      ['Topic requested', 'topic'],
      ['Expected attendees', 'attendees'],
      ['Support needed', 'support'],
      ['Details', 'details'],
    ],
  },
  registration: {
    sheet: 'Reg ',
    perEvent: true,
    subject: 'TechBridge event registration: ',
    subjectKeys: ['eventTitle', 'name'],
    required: ['name', 'email', 'phone', 'company', 'jobTitle', 'experience', 'city', 'consent'],
    fields: [
      ['Event', 'eventTitle'],
      ['Full name', 'name'],
      ['Email', 'email'],
      ['Phone', 'phone'],
      ['IEEE member number', 'memberNumber'],
      ['Company / organization', 'company'],
      ['Job title', 'jobTitle'],
      ['Years of experience', 'experience'],
      ['City / country', 'city'],
      ['Accessibility or dietary needs', 'needs'],
      ['Consent given', 'consent'],
    ],
  },
};

/**
 * Set this to an inbox you actually read. Left blank, no email is sent and
 * submissions are still recorded in the sheet — the site's contact address
 * (techbridge@computer.org) is placeholder content from the design reference,
 * not a real mailbox, so it is deliberately NOT used as a default here.
 *
 * MailApp's free daily quota (100/day on a personal Google account, more on
 * Workspace) is per Google account, not per script — plenty for a request
 * form, but worth knowing if this account sends other automated mail too.
 */
var NOTIFY_EMAIL = '';

/**
 * Spam limits. The honeypot and timing values come from the site (see
 * components/SpamGuard.jsx); the rest is enforced here because bots often skip
 * the site and post straight to this endpoint.
 */
var MIN_FILL_MS = 2500; // faster than this is a script, not a person
var MAX_FIELD_LENGTH = 2000; // longer values are cut off
var PER_EMAIL_LIMIT = 3; // submissions per email address...
var PER_EMAIL_WINDOW_S = 600; // ...per 10 minutes, per form type
var GLOBAL_LIMIT_PER_MIN = 60; // all submissions together

/**
 * Bot submissions get the same { ok: true } a person would, so a bot has no
 * signal to adapt to; they just never reach the sheet.
 */
function looksLikeBot_(data) {
  if (data.hp_field) return true;
  var elapsed = Number(data.elapsedMs);
  return !(elapsed >= MIN_FILL_MS);
}

/** Returns an error message for a person to see, or '' if the payload is fine. */
function validate_(form, data) {
  for (var i = 0; i < form.required.length; i++) {
    var value = data[form.required[i]];
    if (value === undefined || value === null || value === false || String(value).trim() === '') {
      return 'Please fill in every required field.';
    }
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(data.email).trim())) {
    return 'Please enter a valid email address.';
  }
  return '';
}

/** Counts a submission and reports whether it is over either limit. */
function overRateLimit_(type, email) {
  var cache = CacheService.getScriptCache();
  var minute = Math.floor(Date.now() / 60000);
  var keys = ['rl:all:' + minute, 'rl:' + type + ':' + String(email).trim().toLowerCase().slice(0, 200)];
  var limits = [GLOBAL_LIMIT_PER_MIN, PER_EMAIL_LIMIT];
  var ttls = [120, PER_EMAIL_WINDOW_S];

  var lock = LockService.getScriptLock();
  lock.waitLock(5000);
  try {
    var over = false;
    keys.forEach(function (key, i) {
      var count = Number(cache.get(key) || 0) + 1;
      if (count > limits[i]) over = true;
      cache.put(key, String(count), ttls[i]);
    });
    return over;
  } finally {
    lock.releaseLock();
  }
}

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    // Payloads without a type predate the registration form: they are requests.
    var form = FORMS[data.type || 'request'];
    if (!form) {
      return jsonResponse_({ ok: false, error: 'Unknown form type: ' + data.type });
    }

    if (looksLikeBot_(data)) {
      return jsonResponse_({ ok: true });
    }
    var invalid = validate_(form, data);
    if (invalid) {
      return jsonResponse_({ ok: false, error: invalid });
    }
    if (overRateLimit_(data.type || 'request', data.email)) {
      return jsonResponse_({ ok: false, error: 'Too many submissions. Please try again in a few minutes.' });
    }

    var sheetName = form.sheet;
    if (form.perEvent) {
      // The id becomes part of a tab name and arrives from a public form, so
      // only the characters an event slug can contain are accepted.
      var eventId = String(data.eventId || '');
      if (!/^[a-z0-9-]{1,60}$/.test(eventId)) {
        return jsonResponse_({ ok: false, error: 'Missing or invalid event id.' });
      }
      sheetName += eventId;
    }

    var row = [new Date()];
    form.fields.forEach(function (field) {
      row.push(cell_(data[field[1]]));
    });
    getOrCreateSheet_(sheetName, form).appendRow(row);

    if (NOTIFY_EMAIL) {
      notify_(form, data);
    }

    return jsonResponse_({ ok: true });
  } catch (err) {
    return jsonResponse_({ ok: false, error: String(err) });
  }
}

function cell_(value) {
  if (Array.isArray(value)) value = value.join(', ');
  if (value === true) return 'Yes';
  if (value === false) return 'No';
  var text = String(value === undefined || value === null ? '' : value).slice(0, MAX_FIELD_LENGTH);
  // A cell starting with = + - or @ is run as a formula when the sheet is
  // opened, so anyone filling in the form could plant one. The leading
  // apostrophe makes Sheets store it as plain text instead.
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function notify_(form, data) {
  var named = '';
  form.subjectKeys.forEach(function (key) {
    if (!named && data[key]) named = data[key];
  });
  var subject = form.subject + (named || 'new submission');
  var body = form.fields
    .map(function (field) {
      return field[0] + ': ' + cell_(data[field[1]]);
    })
    .join('\n');

  // Swallow mail errors so a quota hit or bad address never fails the
  // submission itself — the row is already saved by the time this runs.
  try {
    MailApp.sendEmail(NOTIFY_EMAIL, subject, body, { replyTo: data.email || undefined });
  } catch (err) {
    Logger.log('notify_ failed: ' + err);
  }
}

function getOrCreateSheet_(name, form) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.appendRow(
      ['Timestamp'].concat(
        form.fields.map(function (field) {
          return field[0];
        }),
      ),
    );
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function jsonResponse_(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
