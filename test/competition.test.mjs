import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  ClassProgression, buildField, RivalTracker, MomentumTracker, FIELD_STRENGTH,
} from '../src/systems/competition.js';

test('#63 per-class progression tracks results independently', () => {
  const p = new ClassProgression();
  p.record('65cc', 1); p.record('65cc', 2); p.record('65cc', 1);
  p.record('85cc', 18); // struggling a class up
  const a = p.summary('65cc');
  const b = p.summary('85cc');
  assert.equal(a.wins, 2);
  assert.equal(a.best, 1);
  assert.equal(b.best, 18);
  assert.notEqual(a.adaptation, b.adaptation);
});

test('#63 fresh class has low adaptation; reps raise it', () => {
  const p = new ClassProgression();
  const fresh = p.adaptationFactor('85cc'); // never raced -> 0.70
  assert.ok(Math.abs(fresh - 0.70) < 1e-9);
  for (let i = 0; i < 10; i++) p.record('85cc', 5);
  assert.ok(p.adaptationFactor('85cc') > fresh);
});

test('#63 class change preserves history and carries partial adaptation', () => {
  const p = new ClassProgression();
  for (let i = 0; i < 10; i++) p.record('65cc', 2); // well adapted
  const before85 = p.adaptationFactor('85cc');
  const ch = p.changeClass('65cc', '85cc');
  assert.ok(ch.carriedAdaptation > 0);
  assert.ok(p.adaptationFactor('85cc') > before85); // carry-over helps
  assert.equal(p.summary('65cc').races, 10); // history preserved
});

test('#65 field strength scales with level and lists attending rivals', () => {
  const rivals = [
    { id: 'ethan', name: 'Ethan', levels: ['local', 'regional'] },
    { id: 'mad', name: 'Maddox', levels: ['national'] },
  ];
  const local = buildField({ level: 'local', size: 24, rivals });
  const nat = buildField({ level: 'national', size: 40, rivals });
  assert.ok(nat.depth > local.depth);
  assert.ok(nat.podiumRating > local.podiumRating);
  assert.deepEqual(local.rivals.map((r) => r.id), ['ethan']);
  assert.deepEqual(nat.rivals.map((r) => r.id), ['mad']);
});

test('#65 rival tracker records recurring encounters and fires memory hooks', () => {
  const t = new RivalTracker();
  const ethan = { id: 'ethan', name: 'Ethan' };
  const first = t.encounter(ethan, { beat: true });
  assert.equal(first.firstMeeting, true);
  assert.ok(t.memoryHook(ethan, { beat: true }).key.startsWith('rival_first_'));
  t.encounter(ethan, { beat: true });
  const third = t.encounter(ethan, { beat: true });
  assert.equal(third.appearances, 3);
  assert.ok(t.memoryHook(ethan, { beat: true }).key.startsWith('rival_upperhand_'));
  assert.equal(t.byId.ethan.beat, 3);
});

test('#66 momentum: win streak amplifies, slump dampens, all bounded', () => {
  const m = new MomentumTracker({ confidence: 50, momentum: 0 });
  const w1 = m.apply('win', { source: 'r1' });
  assert.ok(w1.dConf > 0 && w1.dMom > 0);
  assert.equal(m.streak, 1);
  m.apply('win'); m.apply('win');
  assert.equal(m.streak, 3);
  assert.equal(m.notableEvent().kind, 'hot_streak');
  // Bounded: hammer confidence up, never exceeds 100
  for (let i = 0; i < 20; i++) m.apply('breakthrough');
  assert.ok(m.confidence <= 100 && m.momentum <= 100);
  // A slump flips the streak negative
  const s = new MomentumTracker();
  s.apply('dnf'); s.apply('crash'); s.apply('back_half');
  assert.ok(s.streak <= -3);
  assert.equal(s.notableEvent().kind, 'slump');
  assert.ok(s.confidence >= 0 && s.momentum >= -100);
});

test('#66 every change carries a reason code and source', () => {
  const m = new MomentumTracker();
  const e = m.apply('podium', { source: 'race:r7' });
  assert.equal(e.reason, 'podium');
  assert.equal(e.source, 'race:r7');
  assert.equal(typeof e.label, 'string');
});

test('serialization round-trips progression, rivals, and momentum', () => {
  const p = new ClassProgression(); p.record('85cc', 3);
  const p2 = ClassProgression.fromJSON(JSON.parse(JSON.stringify(p.toJSON())));
  assert.deepEqual(p2.summary('85cc'), p.summary('85cc'));

  const t = new RivalTracker(); t.encounter({ id: 'x', name: 'X' }, { beat: false });
  const t2 = RivalTracker.fromJSON(JSON.parse(JSON.stringify(t.toJSON())));
  assert.equal(t2.byId.x.lostTo, 1);

  const m = new MomentumTracker(); m.apply('win');
  const m2 = MomentumTracker.fromJSON(JSON.parse(JSON.stringify(m.toJSON())));
  assert.deepEqual(m2.state(), m.state());
});
