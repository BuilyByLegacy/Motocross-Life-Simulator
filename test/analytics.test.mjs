import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Analytics, ANALYTICS_EVENTS } from '../src/systems/analytics.js';

test('#247 no events are collected without consent', () => {
  const a = new Analytics(); // consent defaults off
  assert.equal(a.track('career_started', { campaign: 'rider' }), null);
  assert.equal(a.events.length, 0);
});

test('#247 consent enables collection; revoking clears the buffer', () => {
  const a = new Analytics();
  a.setConsent(true);
  a.track('career_started', { campaign: 'rider', klass: '65cc' });
  assert.equal(a.events.length, 1);
  a.setConsent(false);
  assert.equal(a.events.length, 0);
});

test('#247 unknown events are ignored', () => {
  const a = new Analytics({ consent: true });
  assert.equal(a.track('not_an_event', {}), null);
  assert.equal(a.events.length, 0);
});

test('#247 props are whitelisted — no personal or free-text fields', () => {
  const a = new Analytics({ consent: true });
  const e = a.track('race_completed', { overall: 3, points: 20, riderName: 'Alex', note: 'x', week: 5 });
  assert.deepEqual(e.props, { overall: 3, points: 20, week: 5 });
  assert.equal('riderName' in e.props, false);
});

test('#247 all documented events are accepted and counted', () => {
  const a = new Analytics({ consent: true });
  for (const ev of ANALYTICS_EVENTS) a.track(ev, {});
  const counts = a.countByEvent();
  for (const ev of ANALYTICS_EVENTS) assert.equal(counts[ev], 1);
});

test('#247 a sink receives events for optional persistence', () => {
  const seen = [];
  const a = new Analytics({ consent: true, sink: (e) => seen.push(e.event) });
  a.track('save_loaded', {});
  a.track('dealer_order', { amount: 45 });
  assert.deepEqual(seen, ['save_loaded', 'dealer_order']);
});
