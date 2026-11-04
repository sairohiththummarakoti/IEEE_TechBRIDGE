import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';

const script = readFileSync(new URL('../google-apps-script/Code.gs', import.meta.url), 'utf8');

test('editor setup saves the Sheet ID; Web App opens it with no active spreadsheet', () => {
  const properties = new Map();
  const spreadsheet = { getId: () => 'test-spreadsheet-id' };
  let active = spreadsheet;
  const context = vm.createContext({
    SpreadsheetApp: {
      getActiveSpreadsheet: () => active,
      openById: (id) => {
        assert.equal(id, 'test-spreadsheet-id');
        return spreadsheet;
      },
    },
    PropertiesService: { getScriptProperties: () => ({
      setProperty: (key, value) => properties.set(key, value),
      getProperty: (key) => properties.get(key),
    }) },
    Logger: { log: () => {} },
  });
  vm.runInContext(script, context);
  assert.throws(() => context.submissionSpreadsheet_(), /Run configureSpreadsheet/);
  context.configureSpreadsheet();
  active = null;
  assert.equal(context.submissionSpreadsheet_(), spreadsheet);
  assert.throws(() => context.configureSpreadsheet(), /Open Apps Script from/);
});
