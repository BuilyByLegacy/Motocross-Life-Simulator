import { test } from 'node:test';
import assert from 'node:assert/strict';
import { applySeasonGrowth, developmentProfile, projectSeasonGrowth, transitionReadiness } from '../src/systems/riderDevelopment.js';

const rider = {
  age: 12,
  confidence: 55,
  skills: { starts: 42, cornering: 45, jumping: 40, whoops: 36, raceIQ: 44, consistency: 38, fitness: 50 },
};

test('#27 development traits create non-linear growth profiles', () => {
  const early = developmentProfile(['early_bloomer']);
  const late = developmentProfile(['late_bloomer']);
  assert.ok(early.peakAge < late.peakAge);
  assert.ok(early.growth > late.growth);
});

test('#27 season growth responds to traits, injury, stress, and training', () => {
  const strong = projectSeasonGrowth(rider, { traits: ['fast_learner', 'work_ethic'], trainingLoad: 1.2 });
  const hurt = projectSeasonGrowth(rider, { traits: ['slow_adapter'], injuryWeeks: 3, schoolStress: 60 });
  const strongTotal = Object.values(strong.gains).reduce((a, b) => a + b, 0);
  const hurtTotal = Object.values(hurt.gains).reduce((a, b) => a + b, 0);
  assert.ok(strongTotal > hurtTotal);
});

test('#28 transition readiness flags bike and approval risks', () => {
  const r = transitionReadiness(rider, '85cc', { traits: ['transition_sensitive'], ownedBike: false, parentApproval: false });
  assert.equal(r.ready, false);
  assert.ok(r.risks.includes('needs_bike'));
  assert.ok(r.risks.includes('needs_parent_approval'));
});

test('#27 applySeasonGrowth returns updated rider without mutating original', () => {
  const { rider: next } = applySeasonGrowth(rider, { traits: ['high_ceiling'], trainingLoad: 1 });
  assert.notEqual(next, rider);
  assert.ok(next.skills.cornering >= rider.skills.cornering);
});
