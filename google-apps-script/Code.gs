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

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    // Payloads without a type predate the registration form: they are requests.
    var form = FORMS[data.type || 'request'];
    if (!form) {
      return jsonResponse_({ ok: false, error: 'Unknown form type: ' + data.type });
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
  if (Array.isArray(value)) return value.join(', ');
  if (value === true) return 'Yes';
  if (value === false) return 'No';
  return value || '';
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
