import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  LorettasPath, classifyEvent, STAGE_INFO, LORETTA_CLASSES, LORETTA_REGIONS,
} from '../src/systems/lorettasPath.js';

// #223 — the qualification structure must mirror the real AMA amateur process:
// Area (2 motos, top 9 advance) → Regional (3 motos, top 6 advance) → National
// (3 motos, invite-only), across eight regions.
test('#223 stage structure matches the real Loretta Lynn qualifying process', () => {
  assert.equal(STAGE_INFO.area.advanceSlots, 9);
  assert.equal(STAGE_INFO.area.motos, 2);
  assert.equal(STAGE_INFO.regional.advanceSlots, 6);
  assert.equal(STAGE_INFO.regional.motos, 3);
  assert.equal(STAGE_INFO.national.motos, 3);
  assert.equal(STAGE_INFO.national.next, null); // no stage beyond the National
  assert.equal(LORETTA_REGIONS.length, 8);
  for (const r of ['Northeast', 'Mid-East', 'Mid-West', 'Southwest']) assert.ok(LORETTA_REGIONS.includes(r));
});

const area = { id: 'aq', name: 'Northeast Area Qualifier', category: 'qualifier', region: 'Northeast', day: 20 };
const regional = { id: 'rc', name: 'Northeast Regional', lorettaStage: 'regional', region: 'Northeast', day: 45 };
const national = { id: 'nat', name: "Loretta Lynn's", lorettaStage: 'national', region: 'Northeast', day: 70 };
const local = { id: 'lc', name: 'County Line', category: 'race', level: 'local', day: 15 };

test('#58 classifyEvent maps events to stages (and ignores non-path events)', () => {
  assert.equal(classifyEvent(area), 'area');
  assert.equal(classifyEvent(regional), 'regional');
  assert.equal(classifyEvent(national), 'national');
  assert.equal(classifyEvent(local), null);
  assert.equal(classifyEvent(null), null);
});

test('#59 area-qualifier eligibility validates class and region lock', () => {
  const p = new LorettasPath();
  // eligible class, fresh path
  assert.equal(p.eligibleToEnter(area, { klass: '85cc' }).ok, true);
  // ineligible class
  const bad = p.eligibleToEnter(area, { klass: '450A' });
  assert.equal(bad.ok, false);
  assert.match(bad.reasons.join(' '), /eligible Loretta/);
  // region lock: after starting in Northeast, a Southeast area is rejected
  p.recordAttempt(area, { klass: '85cc', finish: 3 });
  const seArea = { ...area, id: 'aq2', region: 'Southeast' };
  const locked = p.eligibleToEnter(seArea, { klass: '85cc' });
  assert.equal(locked.ok, false);
  assert.match(locked.reasons.join(' '), /Northeast/);
});

test('#60 regional requires area advancement first', () => {
  const p = new LorettasPath();
  // Not eligible for a Regional before clearing an Area
  const early = p.eligibleToEnter(regional, { klass: '85cc' });
  assert.equal(early.ok, false);
  assert.match(early.reasons.join(' '), /Area Qualifier before a Regional/);
  // Clear the area, then it's allowed
  p.recordAttempt(area, { klass: '85cc', finish: 2 });
  assert.equal(p.eligibleToEnter(regional, { klass: '85cc' }).ok, true);
  // National still gated until Regional is cleared
  assert.equal(p.eligibleToEnter(national, { klass: '85cc' }).ok, false);
});

test('#58/#25 advancement: top slots advance, path tracks per class', () => {
  const p = new LorettasPath();
  const slots = STAGE_INFO.area.advanceSlots;
  const r1 = p.recordAttempt(area, { klass: '85cc', finish: slots }); // last transfer spot
  assert.equal(r1.advanced, true);
  const st = p.advancementStatus('85cc');
  assert.equal(st.reached, 'area');
  assert.equal(st.areaCleared, true);
  assert.equal(st.regionalCleared, false);
  assert.equal(st.region, 'Northeast');
  // A second class is independent
  assert.equal(p.advancementStatus('65cc').reached, 'none');
});

test('#25 elimination + follow-up choices when finishing outside transfer spots', () => {
  const p = new LorettasPath();
  const slots = STAGE_INFO.area.advanceSlots;
  const r = p.recordAttempt(area, { klass: '85cc', finish: slots + 3 });
  assert.equal(r.advanced, false);
  assert.equal(r.eliminated, true);
  const choices = p.followUpChoices('85cc');
  assert.ok(choices.some((c) => c.id === 'retry_area'));
  assert.ok(choices.length >= 4);
});

test('#31/#61 milestones: first attempt, regional ticket, missed-by-one', () => {
  const p = new LorettasPath();
  const slots = STAGE_INFO.area.advanceSlots;
  // First attempt clears the area -> first_area_attempt + first_regional_qual
  const r1 = p.recordAttempt(area, { klass: '85cc', finish: 1 });
  const keys1 = r1.milestones.map((m) => m.key);
  assert.ok(keys1.includes('first_area_attempt'));
  assert.ok(keys1.includes('first_regional_qual'));
  // Clearing regional -> national qualification milestone
  const r2 = p.recordAttempt(regional, { klass: '85cc', finish: 2 });
  assert.ok(r2.milestones.some((m) => m.key === 'first_national_qual' && m.importance >= 90));

  // A different class missing by one spot fires the heartbreak milestone
  const q = new LorettasPath();
  const r3 = q.recordAttempt(area, { klass: '65cc', finish: STAGE_INFO.area.advanceSlots + 1 });
  assert.ok(r3.milestones.some((m) => m.key === 'missed_by_one_area'));
});

test('#61 national moto + championship milestones and dream summary', () => {
  const p = new LorettasPath();
  p.recordAttempt(area, { klass: '85cc', finish: 1 });
  p.recordAttempt(regional, { klass: '85cc', finish: 1 });
  const rn = p.recordAttempt(national, { klass: '85cc', finish: 1 });
  const keys = rn.milestones.map((m) => m.key);
  assert.ok(keys.includes('first_national_moto'));
  assert.ok(keys.includes('national_championship'));
  const s = p.dreamSummary();
  assert.equal(s.active, true);
  assert.equal(s.qualifiedForNational, true);
  assert.equal(s.furthestClass, '85cc');
  assert.ok(s.milestoneCount >= 3);
});

test('#62 planner warnings: missing area, bad sequence, region split', () => {
  const p = new LorettasPath();
  // Goal but no qualifier planned
  let w = p.pathWarnings([local], { klass: '85cc', hasLorettaGoal: true });
  assert.ok(w.some((x) => x.code === 'no_area_qualifier' && x.severity === 'high'));
  // Regional planned without an area
  w = p.pathWarnings([regional], { klass: '85cc', hasLorettaGoal: true });
  assert.ok(w.some((x) => x.code === 'regional_unqualified'));
  // Regional scheduled before the area
  const lateArea = { ...area, day: 60 };
  const earlyReg = { ...regional, day: 40 };
  w = p.pathWarnings([lateArea, earlyReg], { klass: '85cc', hasLorettaGoal: true });
  assert.ok(w.some((x) => x.code === 'bad_sequence'));
  // Two regions
  const seArea = { ...area, id: 'aq2', region: 'Southeast' };
  w = p.pathWarnings([area, seArea], { klass: '85cc', hasLorettaGoal: true });
  assert.ok(w.some((x) => x.code === 'region_split'));
  // Ineligible class
  w = p.pathWarnings([area], { klass: '450A', hasLorettaGoal: true });
  assert.ok(w.some((x) => x.code === 'class_ineligible'));
});

test('serialization round-trips path state and milestones', () => {
  const p = new LorettasPath();
  p.recordAttempt(area, { klass: '85cc', finish: 1 });
  p.recordAttempt(regional, { klass: '85cc', finish: 5 });
  const restored = LorettasPath.fromJSON(JSON.parse(JSON.stringify(p.toJSON())));
  assert.deepEqual(restored.advancementStatus('85cc'), p.advancementStatus('85cc'));
  assert.equal(restored.milestones.length, p.milestones.length);
  // once-fired milestones stay fired after restore
  const again = restored.recordAttempt(area, { klass: '85cc', finish: 1 });
  assert.ok(!again.milestones.some((m) => m.key === 'first_area_attempt'));
});

test('eligible classes are the documented ladder', () => {
  assert.deepEqual(LORETTA_CLASSES, ['50cc', '65cc', '85cc', 'Supermini', '250B']);
});
