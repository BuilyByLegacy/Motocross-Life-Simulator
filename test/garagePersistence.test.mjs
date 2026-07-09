import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Game } from '../src/game.js';
import { BIKE_FOR_CLASS } from '../src/data/content.js';

// #219 — the garage (bikes, parts/objects, provenance, upgrades, deliveries)
// must survive save/load so the living garage stays as the player left it.
test('#219 garage state round-trips through save/load', () => {
  const g = new Game({ riderName: 'T', seed: 11, birthdate: '2012-05-15' });
  // A second bike (with provenance + an auto memory), a keepsake object, and an upgrade.
  const spare = BIKE_FOR_CLASS('65cc', 2024);
  g.addBike(spare, { via: 'used marketplace' });
  g.state.garage.objects.push({ name: 'First trophy', memory: 'The one that started it all.' });
  const buy = g.buyGarageUpgrade('shelving');
  assert.equal(buy.ok, true);
  // List the spare so a draft exists too.
  g.createListingDraft(spare.assetId, { price: 700, notes: 'Clean.' });

  const beforeOv = g.garageOverview();
  const save = g.toSave();
  const g2 = Game.load(save);
  const afterOv = g2.garageOverview();

  // Bikes, provenance, upgrades, objects, and listing drafts all survive.
  assert.equal(afterOv.counts.bikes, beforeOv.counts.bikes);
  assert.deepEqual(g2.state.garageUpgrades, ['shelving']);
  assert.ok(g2.assets.get(spare.assetId), 'spare bike provenance survives');
  assert.equal(g2.state.garage.objects.some((o) => o.name === 'First trophy'), true);
  assert.equal((g2.state.market.drafts ?? []).length, (g.state.market.drafts ?? []).length);
  // The overview recomputes identically after load.
  assert.equal(afterOv.museumCount, beforeOv.museumCount);
  assert.equal(afterOv.upgrades.owned.length, 1);
});

test('#219 garage capacity/clutter is derived and stable across load', () => {
  const g = new Game({ riderName: 'C', seed: 12, birthdate: '2012-05-15' });
  for (let i = 0; i < 3; i++) g.state.garage.objects.push({ name: `Keepsake ${i}` });
  const before = g.garageOverview().capacity.state;
  const g2 = Game.load(g.toSave());
  assert.equal(g2.garageOverview().capacity.state, before);
});
