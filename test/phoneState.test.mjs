import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Game } from '../src/game.js';
import { PhoneStateStore } from '../src/systems/phoneState.js';

test('#89 phone app search/filter state persists per app', () => {
  const store = new PhoneStateStore();
  store.update('marketplace', { query: 'kx85', filters: { category: 'bike' }, sort: 'price_asc' });
  store.update('dealer', { query: 'tires', filters: { availability: 'in_stock' } });
  assert.equal(store.state('marketplace').query, 'kx85');
  assert.equal(store.state('marketplace').filters.category, 'bike');
  assert.equal(store.state('dealer').filters.availability, 'in_stock');
  const back = PhoneStateStore.fromJSON(JSON.parse(JSON.stringify(store.toJSON())));
  assert.equal(back.state('marketplace').sort, 'price_asc');
});

test('#89 Game save/load round-trips phone app state', () => {
  const g = new Game({ seed: 44 });
  g.updatePhoneState('marketplace', { query: 'forks', filters: { maxPrice: 500 } });
  const loaded = Game.load(g.toSave());
  assert.equal(loaded.phoneState('marketplace').query, 'forks');
  assert.equal(loaded.phoneState('marketplace').filters.maxPrice, 500);
});
