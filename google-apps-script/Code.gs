/**
 * Apps Script Web App backend for the TechBridge "Request a program" form.
 *
 * Setup (see README.md, "Connecting the request form"):
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

var SHEET_NAME = 'Submissions';
var HEADERS = [
  'Timestamp',
  'Full name',
  'Email',
  'Institution / chapter',
  'Country / IEEE region',
  'Topic requested',
  'Expected attendees',
  'Support needed',
  'Details',
];

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
    var sheet = getOrCreateSheet_();

    sheet.appendRow([
      new Date(),
      data.name || '',
      data.email || '',
      data.institution || '',
      data.region || '',
      data.topic || '',
      data.attendees || '',
      (data.support || []).join(', '),
      data.details || '',
    ]);

    if (NOTIFY_EMAIL) {
      notify_(data);
    }

    return jsonResponse_({ ok: true });
  } catch (err) {
    return jsonResponse_({ ok: false, error: String(err) });
  }
}

function notify_(data) {
  var subject = 'TechBridge program request: ' + (data.institution || data.name || 'new submission');
  var body = [
    'Full name: ' + (data.name || ''),
    'Email: ' + (data.email || ''),
    'Institution / chapter: ' + (data.institution || ''),
    'Country / IEEE region: ' + (data.region || ''),
    'Topic requested: ' + (data.topic || ''),
    'Expected attendees: ' + (data.attendees || ''),
    'Support needed: ' + (data.support || []).join(', '),
    '',
    'Details:',
    data.details || '',
  ].join('\n');

  // Swallow mail errors so a quota hit or bad address never fails the
  // submission itself — the row is already saved by the time this runs.
  try {
    MailApp.sendEmail(NOTIFY_EMAIL, subject, body, { replyTo: data.email || undefined });
  } catch (err) {
    Logger.log('notify_ failed: ' + err);
  }
}

function getOrCreateSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function jsonResponse_(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
