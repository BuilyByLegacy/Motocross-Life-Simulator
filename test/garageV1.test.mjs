import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  garageCapacity, garageUsage, availableUpgrades, v1GarageOverview,
  upgradeById, GARAGE_UPGRADES, BASE_CAPACITY,
} from '../src/systems/garageV1.js';
import { buildGarageView } from '../src/systems/garageView.js';
import { AssetRegistry, makeProvenance } from '../src/systems/assetProvenance.js';

test('#220 capacity scales with owned upgrades', () => {
  assert.deepEqual(garageCapacity([]), BASE_CAPACITY);
  const withShelf = garageCapacity(['shelving']);
  assert.equal(withShelf.shelf, BASE_CAPACITY.shelf + 6);
  const bay = garageCapacity(['extra_bay']);
  assert.equal(bay.floor, BASE_CAPACITY.floor + 2);
});

test('#220/#212 usage flags crowded and overflow states', () => {
  const ok = garageUsage({ bikes: 1, parts: 3, objects: 2 }, []);
  assert.equal(ok.state, 'ok');
  const crowded = garageUsage({ bikes: 2, parts: 7, objects: 5 }, []);
  assert.ok(['crowded', 'overflow'].includes(crowded.state));
  const over = garageUsage({ bikes: 4, parts: 20, objects: 10 }, []);
  assert.equal(over.state, 'overflow');
  assert.ok(over.clutter > 0);
  assert.ok(over.warning);
});

test('#220 available upgrades exclude owned and tag affordability', () => {
  const avail = availableUpgrades(['shelving'], 200);
  assert.ok(!avail.some((u) => u.id === 'shelving'));
  const bay = avail.find((u) => u.id === 'extra_bay');
  assert.equal(bay.affordable, false); // $800 > $200
  assert.equal(availableUpgrades([], 1000).find((u) => u.id === 'extra_bay').affordable, true);
  assert.equal(upgradeById('shelving').cost, 120);
});

function sampleView() {
  const reg = new AssetRegistry();
  reg.add(makeProvenance({ assetId: 'race', kind: 'bike', name: 'KX85', serial: 'S1' }));
  return buildGarageView({
    activeBike: { assetId: 'race', name: 'KX85', klass: '85cc', condition: 80 },
    bikes: [{ assetId: 'spare', name: 'KX65', klass: '65cc', role: 'spare' }],
    objects: [{ assetId: null, name: 'First trophy' }, { assetId: null, name: 'Lucky helmet' }],
    parts: [{ name: 'Spare tire' }],
    registry: reg, memories: [],
  });
}

test('#220 v1 overview composes the garage home hub', () => {
  const view = sampleView();
  const ov = v1GarageOverview({
    view,
    orders: [{ label: 'New tire', method: 'ship', etaDay: 20, status: 'ordered' }, { label: 'Old', status: 'delivered' }],
    ownedUpgrades: ['shelving'], budget: 500,
  });
  assert.equal(ov.isHome, true);
  assert.equal(ov.activeBike.assetId, 'race'); // the installed bike
  assert.equal(ov.counts.bikes, 2);
  assert.equal(ov.onOrder.length, 1); // delivered order excluded
  assert.equal(ov.museumCount, 2);
  assert.ok(ov.upgrades.available.length >= 1);
  assert.ok(!ov.upgrades.available.some((u) => u.id === 'shelving')); // owned
});

test('every upgrade has a cost and at least one effect', () => {
  for (const u of GARAGE_UPGRADES) {
    assert.ok(u.cost > 0);
    assert.ok(Object.keys(u.effects).length >= 1);
  }
});
