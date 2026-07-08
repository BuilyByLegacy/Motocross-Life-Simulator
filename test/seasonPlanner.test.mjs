// Season Planner tests (issues #53–#57).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { SeasonPlanner } from '../src/systems/seasonPlanner.js';

function pool() {
  return [
    { id: 'l1', day: 14, title: 'Rocky Ridge', level: 'local', category: 'race', location: { name: 'Home', distance: 0 }, entryFee: 35 },
    { id: 'r1', day: 28, title: 'Southwick Regional', level: 'regional', category: 'race', location: { name: 'Southwick', distance: 4 }, entryFee: 60 },
    { id: 'q1', day: 42, title: 'Area Qualifier', level: 'regional', category: 'qualifier', location: { name: 'Budds Creek', distance: 5 }, entryFee: 75 },
    { id: 'n1', day: 56, title: 'Ponca National', level: 'national', category: 'race', location: { name: 'Ponca', distance: 9 }, entryFee: 90 },
  ];
}

test('#53 add / remove / update planned events; selected generates calendar', () => {
  const p = new SeasonPlanner(pool());
  assert.equal(p.addEvent('l1'), true);
  assert.equal(p.addEvent('nope'), false);
  p.addEvent('r1');
  assert.equal(p.selectedEvents().length, 2);
  p.removeEvent('r1');
  assert.equal(p.selectedEvents().length, 1);
  const cal = p.buildCalendar();
  assert.equal(cal.season().length, 1);
  assert.equal(cal.all()[0].title, 'Rocky Ridge');
});

test('#53 no generic series size is required — events are individual', () => {
  const p = new SeasonPlanner(pool());
  p.addEvent('l1'); p.addEvent('n1');
  const levels = new Set(p.selectedEvents().map((e) => e.level));
  assert.deepEqual([...levels].sort(), ['local', 'national']); // a mixed, self-built program
});

test('#54 multiple simultaneous goals with alignment', () => {
  const p = new SeasonPlanner(pool());
  p.addEvent('n1'); p.addEvent('l1');
  const g1 = p.addGoal({ type: 'qualify_lorettas' });
  const g2 = p.addGoal({ type: 'preserve_budget' });
  assert.equal(p.goals.length, 2);
  assert.ok(p.goalAlignment(g1).supports.includes('n1'));
  assert.ok(p.goalAlignment(g2).conflicts.includes('n1')); // national vs budget
  assert.equal(p.setGoalState(g1.id, 'completed'), true);
});

test('#55 forecast covers cost categories and flags over-budget', () => {
  const p = new SeasonPlanner(pool());
  p.addEvent('l1'); p.addEvent('n1');
  const fc = p.forecast(200);
  assert.ok(fc.season.entry > 0 && fc.season.fuel > 0 && fc.season.contingency > 0);
  assert.equal(fc.overBudget, true); // a national blows past $200
  assert.ok(fc.shortfall > 0);
  // per-event data available
  assert.equal(fc.perEvent.length, 2);
});

test('#55 forecast identifies high-risk budget windows', () => {
  const p = new SeasonPlanner(pool());
  p.addEvent('r1'); p.addEvent('q1'); p.addEvent('n1'); // clustered pricey events
  const fc = p.forecast(300);
  assert.ok(fc.highRiskPeriods.length >= 1);
});

test('#56 commitment state machine and calendar deadlines', () => {
  const p = new SeasonPlanner(pool());
  p.addEvent('l1'); p.addEvent('r1');
  assert.equal(p.commit(), 2);
  assert.equal([...p.planned.values()].every((x) => x.state === 'committed'), true);
  const cal = p.buildCalendar();
  assert.ok(cal.deadlineEntries().length === 2); // registration close deadlines
  // withdraw records reason + cost
  assert.equal(p.withdraw('r1', 'money got tight'), true);
  assert.equal(p.planned.get('r1').state, 'withdrawn');
  assert.ok(p.planned.get('r1').withdrawCost > 0);
  assert.equal(p.selectedEvents().length, 1); // withdrawn drops off the schedule
});

test('#57 review summary reports races, travel, cost, conflicts, goal alignment, Loretta warnings', () => {
  const p = new SeasonPlanner(pool());
  p.addEvent('l1'); p.addEvent('n1');
  p.addGoal({ type: 'qualify_lorettas' });
  const r = p.reviewSummary(150);
  assert.equal(r.totalRaces, 2);
  assert.ok(r.estimatedCost > 0);
  assert.equal(r.overBudget, true);
  assert.ok(Array.isArray(r.riskNotes) && r.riskNotes.length >= 1);
  assert.ok(Array.isArray(r.goalAlignment) && r.goalAlignment.length === 1);
  // Loretta goal but no qualifier on the schedule -> warning
  assert.ok(r.lorettaWarnings.length >= 1);
});

test('serialization round-trips the plan and goals', () => {
  const p = new SeasonPlanner(pool());
  p.addEvent('l1'); p.commit(); p.addGoal({ type: 'win_title' });
  const back = SeasonPlanner.fromJSON(JSON.parse(JSON.stringify(p.toJSON())));
  assert.equal(back.selectedEvents().length, 1);
  assert.equal(back.goals.length, 1);
  assert.equal(back.planned.get('l1').state, 'committed');
});
