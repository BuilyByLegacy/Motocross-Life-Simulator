import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  buildCareerCard, legacyRating, storyTag, exportCard, importCard,
  FriendsList, leaderboard, compareCareers, buildRecapCard, toWorldCameo,
  friendMilestones, LEADERBOARD_CATEGORIES,
} from '../src/systems/connectedCareers.js';

// A minimal game stub exposing what buildCareerCard reads.
function stubGame(over = {}) {
  return {
    state: {
      seed: 42,
      campaign: over.mode === 'Parent' ? 'parent' : 'rider',
      seasonGoals: over.goal ? [over.goal] : ['qualify_lorettas'],
      careerHistory: over.careerHistory ?? [],
      rider: { name: over.name ?? 'Riley', avatar: '🧒', age: over.age ?? 14, klass: over.klass ?? '85cc', injury: over.injury ?? null },
      family: { money: over.money ?? 1200, stress: over.stress ?? 20 },
      bike: { name: '2026 KX85' },
      sponsors: over.sponsors ?? ['a'],
      garage: { bikes: over.bikes ?? [{}], trophies: over.trophies ?? [{}, {}] },
    },
    seasonYear: 2027,
    careerWins: () => over.wins ?? 5,
    careerPodiums: () => over.podiums ?? 9,
    lorettas: { dreamSummary: () => ({ furthestStage: over.stage ?? 'area', region: over.region ?? 'Northeast', qualifiedForNational: over.stage === 'regional' || over.stage === 'national' }) },
    memory: { top: () => (over.memory ? [{ title: over.memory, importance: 90 }] : []) },
  };
}

test('#115 career card summarizes identity, story, and legacy', () => {
  const card = buildCareerCard(stubGame({ memory: 'First Win' }));
  assert.equal(card.name, 'Riley');
  assert.equal(card.klass, '85cc');
  assert.equal(card.mode, 'Rider');
  assert.ok(card.legacyRating > 0);
  assert.ok(card.storyTag);
  assert.match(card.headline, /Age 14/);
  assert.equal(card.biggestMemory.title, 'First Win');
});

test('#121 privacy redacts finances, injuries, family, sponsors', () => {
  const card = buildCareerCard(stubGame({ money: 5000, injury: { name: 'broken collarbone' } }), { privacy: ['finances', 'injuries', 'sponsors'] });
  assert.equal(card.money, null);
  assert.equal(card.injury, null);
  assert.equal(card.sponsors, null);
});

test('#115 legacy rating + story tag respond to career shape', () => {
  const champ = buildCareerCard(stubGame({ wins: 12, stage: 'national', trophies: [{}, {}, {}] }));
  const grinder = buildCareerCard(stubGame({ wins: 0, podiums: 1, careerHistory: [{}, {}] }));
  assert.ok(champ.legacyRating > grinder.legacyRating);
  assert.equal(grinder.storyTag, 'privateer grinder');
  assert.equal(champ.storyTag, "Loretta's rider");
});

test('#118/#119 export → import round-trips a card via a portable code', () => {
  const card = buildCareerCard(stubGame({ name: 'Max' }));
  const code = exportCard(card);
  assert.ok(code.startsWith('MX1:'));
  const back = importCard(code);
  assert.equal(back.name, 'Max');
  assert.equal(back.legacyRating, card.legacyRating);
  assert.equal(importCard('garbage'), null);
});

test('#114 friends list: add, search, block, remove, and update snapshot', () => {
  const fl = new FriendsList();
  const a = buildCareerCard(stubGame({ name: 'Ada' }));
  const b = buildCareerCard(stubGame({ name: 'Ben' }));
  b.id = 'card_ben';
  fl.add(a); fl.add(b);
  assert.equal(fl.list().length, 2);
  assert.equal(fl.list({ query: 'ad' }).length, 1);
  // re-adding an updated card keeps a prev snapshot
  const a2 = { ...a, wins: 20 };
  const entry = fl.add(a2);
  assert.equal(entry.prevSnapshot.wins, a.wins);
  fl.block('card_ben');
  assert.equal(fl.list().length, 1); // blocked hidden
  fl.remove(a.id);
  assert.equal(fl.list().length, 0);
});

test('#116 leaderboard ranks by category with legacy tie-break, respects privacy', () => {
  const cards = [
    buildCareerCard(stubGame({ name: 'Champ', wins: 15 })),
    buildCareerCard(stubGame({ name: 'Rookie', wins: 1 })),
    { ...buildCareerCard(stubGame({ name: 'Hidden', wins: 99 })), private: true },
  ];
  const wins = leaderboard(cards, 'wins');
  assert.equal(wins[0].name, 'Champ');
  assert.ok(!wins.some((r) => r.name === 'Hidden')); // private excluded
  assert.equal(wins[0].rank, 1);
  assert.ok(LEADERBOARD_CATEGORIES.legacy.story);
});

test('#116 story leaderboards celebrate non-win arcs', () => {
  const parent = buildCareerCard(stubGame({ name: 'Parent', mode: 'Parent', wins: 0 }));
  const pro = buildCareerCard(stubGame({ name: 'Pro', wins: 10 }));
  const board = leaderboard([parent, pro], 'parent');
  assert.equal(board[0].name, 'Parent'); // parent-mode career wins the parent board
});

test('#117 comparison groups fields and writes story-first narrative', () => {
  const mine = buildCareerCard(stubGame({ name: 'Me', wins: 3, careerHistory: [{}, {}, {}] }));
  const theirs = buildCareerCard(stubGame({ name: 'You', wins: 8, careerHistory: [] }));
  const cmp = compareCareers(mine, theirs);
  assert.ok(cmp.groups.competition.some((r) => r.label === 'Wins'));
  assert.equal(typeof cmp.narrative, 'string');
});

test('#118 recap card + #122 world cameo', () => {
  const g = stubGame({ memory: 'The Win' });
  g.state.season = { results: [{ overall: 1 }, { overall: 3 }] };
  const recap = buildRecapCard(g);
  assert.equal(recap.kind, 'recap');
  assert.equal(recap.bestFinish, 1);
  assert.match(recap.record, /2 races/);

  const card = buildCareerCard(stubGame({ name: 'Cameo', wins: 10 }));
  const cameo = toWorldCameo(card);
  assert.equal(cameo.name, 'Cameo');
  assert.ok(cameo.isCameo && cameo.strength > 40);
});

test('#120 friend milestones fire on meaningful changes only', () => {
  const prev = buildCareerCard(stubGame({ name: 'Kai', wins: 2, stage: 'area' }));
  const next = buildCareerCard(stubGame({ name: 'Kai', wins: 3, stage: 'regional' }));
  const firstAdd = friendMilestones(null, next);
  assert.ok(firstAdd.some((n) => /joined/.test(n.title)));
  const updates = friendMilestones(prev, next);
  assert.ok(updates.some((n) => /Loretta/.test(n.title)));
  assert.ok(updates.some((n) => /win/i.test(n.title)));
  // No change → no notifications
  assert.equal(friendMilestones(next, next).length, 0);
});

test('serialization round-trips the friends list', () => {
  const fl = new FriendsList();
  fl.add(buildCareerCard(stubGame({ name: 'Zed' })));
  const restored = FriendsList.fromJSON(JSON.parse(JSON.stringify(fl.toJSON())));
  assert.equal(restored.list().length, 1);
});
