import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Game, SAVE_VERSION } from '../src/game.js';

// Drive a synthetic race result from the current week's calendar entry.
function raceThisWeek(g, overall = 3) {
  const race = g.meta()?.race;
  if (!race) return null;
  return g.applyRaceResult({
    race, klass: g.rider.klass, bikeId: g.bike.assetId,
    overall, points: Math.max(1, 26 - overall * 2), motos: [overall, overall],
    dnf: false, rivalOverall: overall + 1, fieldSize: race.riders ?? 24,
  });
}

// ---- #241 core career loop completes without stuck states ----
test('#241 a full career loop runs end-to-end with a valid next action every week', () => {
  const g = new Game({ riderName: 'QA', seed: 21, birthdate: '2013-05-15' });
  // New career always offers a valid action (never stuck).
  assert.ok(g.seasonFlow().actions.length > 0);

  // Plan → commit → lock → active (the season commitment lifecycle). The
  // commitment initializes in draft during the planning render, before a
  // program is set — mirror that so the lock/start transitions are exercised.
  g.seasonCommit();
  g.setProgram(g.state.program);
  g.advanceSeasonCommit('review');
  if (g.needsRaceApproval()) { g.advanceSeasonCommit('request_approval'); g.advanceSeasonCommit('grant_approval'); }
  g.advanceSeasonCommit('lock');
  g.advanceSeasonCommit('start');
  assert.equal(g.isSeasonLocked(), true);

  const startMoney = g.family.money;
  let races = 0;
  for (let wk = 1; wk <= 12; wk++) {
    g.state.week = wk;
    g.state._preparedWeek = wk - 1;
    g.prepareWeek();
    // Every week resolves to at least one valid action — the anti-stuck guarantee.
    assert.ok(g.seasonFlow().actions.length > 0, `week ${wk} had no valid action`);
    if (g.isRaceWeek(wk)) { raceThisWeek(g, 2); races++; }
  }
  g.state.week = 13;
  assert.equal(g.isSeasonOver(), true);
  assert.ok(races >= 1, 'at least one race happened');
  // The loop produced consequences: results, and money moved (entries/earnings).
  assert.ok(g.state.season.results.length >= 1);
  assert.notEqual(g.family.money, startMoney);
});

test('#241 the career can roll into the next season (loop repeats)', () => {
  const g = new Game({ riderName: 'QA2', seed: 22, birthdate: '2013-05-15' });
  g.state.week = 13;
  const before = g.state.seasonNumber;
  g.startNextSeason();
  assert.equal(g.state.seasonNumber, before + 1);
  assert.equal(g.week, 1);
  assert.ok(g.seasonFlow().actions.length > 0); // still playable
});

// ---- #242 save/load persists all v1.0 state, versions, migrates, guards ----
test('#242 a full round-trip preserves career, calendar, garage, money, and season state', () => {
  const g = new Game({ riderName: 'Saver', seed: 23, birthdate: '2012-05-15' });
  g.seasonCommit();
  g.setProgram(g.state.program);
  g.advanceSeasonCommit('review');
  if (g.needsRaceApproval()) { g.advanceSeasonCommit('request_approval'); g.advanceSeasonCommit('grant_approval'); }
  g.advanceSeasonCommit('lock'); g.advanceSeasonCommit('start');
  g.state.week = 3; g.prepareWeek(); raceThisWeek(g, 1);
  g.buyGarageUpgrade('shelving');
  const save = g.toSave();
  assert.equal(save.v, SAVE_VERSION);

  const g2 = Game.load(save);
  assert.equal(g2.rider.name, 'Saver');
  assert.equal(g2.family.money, g.family.money);
  assert.equal(g2.week, g.week);
  assert.equal(g2.state.season.results.length, g.state.season.results.length);
  assert.equal(g2.isSeasonLocked(), true);
  assert.deepEqual(g2.state.garageUpgrades, g.state.garageUpgrades);
  assert.equal(g2.state.calendar.length, g.state.calendar.length);
  assert.equal(g2.lorettas.dreamSummary().active, g.lorettas.dreamSummary().active);
  // Live systems re-wrapped (not stale plain data).
  assert.equal(typeof g2.notifications.unreadCount, 'function');
  assert.equal(typeof g2.assets.get, 'function');
});

test('#242 an older (v2) save migrates forward and loads', () => {
  const g = new Game({ riderName: 'Old', seed: 24 });
  const save = g.toSave();
  save.v = 2;
  delete save.state.garageUpgrades; // simulate an older schema missing a field
  delete save.state.market.drafts;
  const g2 = Game.load(save);
  assert.equal(g2.toSave().v, SAVE_VERSION);
  assert.deepEqual(g2.state.garageUpgrades, []);
  assert.ok(Array.isArray(g2.state.market.drafts));
});

test('#242 corrupt/empty saves are rejected clearly, not silently loaded', () => {
  assert.throws(() => Game.load(null), /missing or corrupt/);
  assert.throws(() => Game.load({}), /missing or corrupt/);
  assert.throws(() => Game.load({ state: {} }), /missing or corrupt/);
  assert.equal(Game.isValidSave({ state: { rider: { name: 'A' } } }), true);
});
