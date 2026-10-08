// Run with: node --test lib/analytics.test.mjs
import assert from 'node:assert/strict';
import { beforeEach, test } from 'node:test';
import { trackFormSubmit } from './analytics.ts';

let calls;

beforeEach(() => {
  calls = [];
  globalThis.window = { gtag: (...args) => calls.push(args) };
});

test('employment submit sends job_application, not generate_lead', () => {
  trackFormSubmit('employment', 'careers-page');
  assert.deepEqual(calls, [
    ['event', 'job_application', { lead_type: 'employment', form_source: 'careers-page' }],
  ]);
});

for (const [leadType, formSource] of [
  ['general', 'contact-section'],
  ['catering', 'catering-floating-inquiry'],
  ['rentals', 'rentals-floating-inquiry'],
]) {
  test(`${leadType} submit still sends generate_lead`, () => {
    trackFormSubmit(leadType, formSource);
    assert.deepEqual(calls, [
      ['event', 'generate_lead', { lead_type: leadType, form_source: formSource }],
    ]);
  });
}
