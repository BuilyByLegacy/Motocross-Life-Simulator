// Calendar & Time Engine tests (issues #48–#52).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { CareerCalendar, makeEntry } from '../src/systems/careerCalendar.js';

test('#48 empty calendar queries return nothing', () => {
  const cal = new CareerCalendar({ seasonDays: 84 });
  assert.deepEqual(cal.all(), []);
  assert.deepEqual(cal.day(3), []);
  assert.deepEqual(cal.week(0), []);
  assert.deepEqual(cal.season(), []);
  assert.deepEqual(cal.conflicts(), []);
});

test('#48 entries support date/duration/category/priority/location and query views', () => {
  const cal = new CareerCalendar();
  cal.add(makeEntry({ startDay: 2, durationDays: 2, category: 'race', title: 'Local 1', priority: 3, location: { name: 'Home MX', distance: 0 } }));
  cal.add(makeEntry({ startDay: 20, category: 'family', title: 'Cousin wedding' }));
  assert.equal(cal.all().length, 2);
  assert.equal(cal.day(3).length, 1); // spans days 2-3
  assert.equal(cal.week(0).length, 1); // days 0-6
  assert.equal(cal.week(2).length, 1); // day 20 is in week 2 (14-20)
  assert.equal(cal.season().length, 2);
});

test('#48 serialization round-trips', () => {
  const cal = new CareerCalendar({ seasonDays: 84, currentDay: 5 });
  cal.add(makeEntry({ startDay: 10, category: 'race', title: 'R' }));
  const json = JSON.parse(JSON.stringify(cal.toJSON()));
  const back = CareerCalendar.fromJSON(json);
  assert.equal(back.currentDay, 5);
  assert.equal(back.all().length, 1);
  assert.equal(back.all()[0].title, 'R');
});

test('#50 detects overlapping events as hard conflicts', () => {
  const cal = new CareerCalendar();
  cal.add(makeEntry({ startDay: 5, durationDays: 3, category: 'race', title: 'A' }));
  cal.add(makeEntry({ startDay: 6, category: 'family', title: 'B' }));
  const c = cal.conflicts();
  assert.equal(c.length, 1);
  assert.equal(c[0].type, 'overlap');
  assert.equal(c[0].severity, 'hard');
});

test('#50 flags travel and back-to-back rest risks as soft conflicts', () => {
  const cal = new CareerCalendar();
  cal.add(makeEntry({ startDay: 5, durationDays: 2, category: 'race', title: 'Far A', location: { name: 'Ponca', distance: 8 } }));
  cal.add(makeEntry({ startDay: 7, durationDays: 2, category: 'race', title: 'Far B', location: { name: 'Home', distance: 1 } }));
  const c = cal.conflicts();
  const types = c.map((x) => x.type).sort();
  assert.ok(types.includes('travel'));
  assert.ok(types.includes('rest'));
  assert.ok(c.every((x) => x.severity === 'soft'));
});

test('#51 deadline states transition by proximity and completion', () => {
  const cal = new CareerCalendar({ currentDay: 0 });
  const e = cal.add(makeEntry({ startDay: 30, category: 'race', title: 'Reg', deadline: { dueDay: 2, linkedId: 'reg', severity: 'hard' } }));
  assert.equal(cal.deadlines(0).urgent.length, 1); // due in 2 days -> urgent
  assert.equal(cal.deadlines(-10).upcoming.length, 1); // far out -> upcoming
  cal.completeDeadline(e.id);
  assert.equal(cal.deadlines(0).completed.length, 1);
});

test('#49 multi-day advancement resolves entries chronologically and records outcomes', () => {
  const cal = new CareerCalendar({ currentDay: 0 });
  const order = [];
  cal.add(makeEntry({ startDay: 3, category: 'race', title: 'R3' }));
  cal.add(makeEntry({ startDay: 1, category: 'practice', title: 'P1' }));
  const res = cal.advanceTo(5, {
    race: (e) => { order.push(e.title); return { overall: 2, tone: 'pride' }; },
    practice: (e) => { order.push(e.title); return null; },
  });
  assert.deepEqual(order, ['P1', 'R3']); // chronological
  assert.equal(res.resolved.length, 2);
  assert.equal(cal.currentDay, 5);
});

test('#49 missed deadlines are detected during advancement', () => {
  const cal = new CareerCalendar({ currentDay: 0 });
  cal.add(makeEntry({ startDay: 20, category: 'race', title: 'R', deadline: { dueDay: 4, linkedId: 'reg' } }));
  const res = cal.advanceTo(10);
  assert.equal(res.missedDeadlines.length, 1);
  assert.equal(res.notifications.some((n) => /Missed deadline/.test(n.text)), true);
});

test('#52 timeline summary orders and groups by week, de-duped', () => {
  const cal = new CareerCalendar({ currentDay: 0 });
  cal.add(makeEntry({ startDay: 2, category: 'race', title: 'Win', meta: { related: ['ev1'] } }));
  cal.add(makeEntry({ startDay: 9, category: 'family', title: 'BBQ' }));
  cal.advanceTo(14, { race: () => ({ overall: 1 }), family: () => null });
  const tl = cal.timelineSummary();
  assert.equal(tl.length, 2); // two weeks
  assert.equal(tl[0].week, 0);
  assert.equal(tl[0].items[0].tone, 'triumph'); // a win
  assert.equal(tl[1].week, 1);
});
