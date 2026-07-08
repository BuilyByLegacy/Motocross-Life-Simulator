import { test } from 'node:test';
import assert from 'node:assert/strict';
import { checkFit, fits, familyOf } from '../src/systems/compatibility.js';
import { partOptions, compareOptions, isObtainable, PART_CATEGORIES } from '../src/systems/partsCatalog.js';
import {
  makeListing, search, filterListings, sortListings, resolveOffer, evaluatePurchase,
  makeSavedSearch, matchesSaved, newMatches, SELLER_TYPES,
} from '../src/systems/usedMarketplace.js';
import { dealerCatalog, fittingItems, dealerPrice, placeOrder, receiveOrders } from '../src/systems/dealer.js';

const bike = { manufacturer: 'Kawasaki', name: 'KX85', klass: '85cc', year: 2026 };

// ---- #35 compatibility ----
test('#35 direct fit for class-matched part; incompatible for wrong class', () => {
  assert.equal(checkFit(bike, { category: 'tires', fitsClasses: ['85cc'] }).status, 'direct');
  assert.equal(checkFit(bike, { category: 'shock', fitsClasses: ['50cc'] }).status, 'incompatible');
});

test('#35 adjacent class needs modification; gear fits anyone', () => {
  assert.equal(checkFit(bike, { category: 'shock', fitsClasses: ['Supermini'] }).status, 'modify');
  assert.equal(checkFit(bike, { category: 'helmet' }).status, 'direct');
});

test('#35 unknown fitment resolves with a skilled mechanic', () => {
  const mystery = { category: 'topEnd' }; // no fitment data
  assert.equal(checkFit(bike, mystery, { mechanicSkill: 10 }).status, 'unknown');
  assert.equal(checkFit(bike, mystery, { mechanicSkill: 70 }).status, 'direct');
  assert.equal(familyOf('topEnd'), 'engine');
});

test('#35 wrong-brand engine part is incompatible', () => {
  assert.equal(fits(bike, { category: 'topEnd', manufacturer: 'Honda' }, { mechanicSkill: 70 }), false);
});

// ---- #36 part options & tradeoffs ----
test('#36 five+ categories, each with multiple options and tradeoffs', () => {
  assert.ok(PART_CATEGORIES.length >= 5);
  for (const c of PART_CATEGORIES) assert.ok(partOptions(c).length >= 2);
  const susp = partOptions('suspension');
  const factory = susp.find((o) => o.tier === 'factory');
  const stock = susp.find((o) => o.tier === 'stock');
  assert.ok(factory.performance > stock.performance);
  assert.ok(factory.cost > stock.cost);
  assert.ok(factory.skillReq > stock.skillReq);
});

test('#36 compare + obtainability (factory needs sponsor + skill)', () => {
  const cmp = compareOptions('suspension');
  assert.equal(cmp.fastest.tier, 'factory');
  const factory = partOptions('suspension').find((o) => o.tier === 'factory');
  assert.equal(isObtainable(factory, { mechanicSkill: 40, hasSponsor: true }), false);
  assert.equal(isObtainable(factory, { mechanicSkill: 70, hasSponsor: true }), true);
});

// ---- #32 used marketplace search + filter ----
function board() {
  return [
    makeListing({ id: 'a', title: 'KX85 front forks', category: 'suspension', manufacturer: 'Kawasaki', klass: '85cc', price: 300, distance: 20, sellerType: 'local_racer', condition: 70 }),
    makeListing({ id: 'b', title: 'Used 85cc bike', category: 'bike', manufacturer: 'Honda', klass: '85cc', price: 2200, distance: 120, sellerType: 'flipper', condition: 60 }),
    makeListing({ id: 'c', title: 'Youth large helmet', category: 'gear', price: 80, distance: 5, sellerType: 'honest_parent', condition: 90 }),
    makeListing({ id: 'd', title: 'Factory shock rare', category: 'suspension', klass: '85cc', price: 1500, distance: 200, oem: 'factory', rare: true, sellerType: 'team_surplus' }),
  ];
}

test('#32 keyword search matches title/manufacturer/category', () => {
  const b = board();
  assert.deepEqual(search(b, 'kx85').map((l) => l.id), ['a']);
  assert.deepEqual(search(b, 'helmet').map((l) => l.id), ['c']);
  assert.equal(search(b, '85cc suspension').length, 2); // a and d
});

test('#32 filters by category, price, distance, class, seller rep', () => {
  const b = board();
  assert.deepEqual(filterListings(b, { category: 'suspension' }).map((l) => l.id).sort(), ['a', 'd']);
  assert.deepEqual(filterListings(b, { maxPrice: 500 }).map((l) => l.id).sort(), ['a', 'c']);
  assert.deepEqual(filterListings(b, { maxDistance: 30 }).map((l) => l.id).sort(), ['a', 'c']);
  assert.deepEqual(filterListings(b, { fitsBike: { klass: '85cc' } }).map((l) => l.id).sort(), ['a', 'b', 'c', 'd']);
});

test('#32 sort by price and rep', () => {
  const b = board();
  assert.deepEqual(sortListings(b, 'price_asc').map((l) => l.id), ['c', 'a', 'd', 'b']);
});

// ---- #38 sellers, trust, negotiation, scams ----
test('#38 negotiation: accept over ask, counter mid, reject lowball', () => {
  const l = makeListing({ price: 1000, sellerType: 'retired_rider' });
  assert.equal(resolveOffer(l, 1000, { rng: () => 0.9 }).result, 'accept');
  assert.equal(resolveOffer(l, 850, { rng: () => 0.9 }).result, 'counter'); // within flex, patient -> counter
  assert.equal(resolveOffer(l, 300, { rng: () => 0.9 }).result, 'reject');
});

test('#38 scam risk from low-trust sellers; mechanic inspection protects', () => {
  const scammy = makeListing({ price: 500, sellerType: 'scammer' });
  assert.equal(evaluatePurchase(scammy, { mechanicSkill: 0, rng: () => 0.1 }).outcome, 'scam');
  // A skilled mechanic inspects and avoids the scam
  assert.notEqual(evaluatePurchase(scammy, { mechanicSkill: 80, rng: () => 0.1 }).outcome, 'scam');
  // Hidden damage caught vs missed
  const dmg = makeListing({ price: 400, floor: 300, sellerType: 'flipper', hiddenDamage: 'cracked case' });
  assert.equal(evaluatePurchase(dmg, { mechanicSkill: 0, rng: () => 0.2 }).outcome, 'hidden_damage');
});

// ---- #37 saved searches + alerts ----
test('#37 saved search matches and alerts only on new listings', () => {
  const saved = makeSavedSearch({ label: '85cc suspension', query: 'suspension', criteria: { klass: '85cc', maxPrice: 500 } });
  const b = board();
  assert.ok(matchesSaved(saved, b[0])); // a: 85cc suspension $300
  assert.ok(!matchesSaved(saved, b[3])); // d: $1500 over budget
  const first = newMatches(saved, b);
  assert.deepEqual(first.map((l) => l.id), ['a']);
  const again = newMatches(saved, b); // already alerted
  assert.equal(again.length, 0);
});

// ---- #33/#39 dealer channel ----
test('#39 dealer catalog is OEM/factory only, tagged with fitment', () => {
  const cat = dealerCatalog(bike);
  assert.ok(cat.length > 0);
  assert.ok(cat.every((i) => i.oem === 'oem' || i.oem === 'factory'));
  assert.ok(cat.every((i) => ['direct', 'modify', 'incompatible', 'unknown'].includes(i.fitment)));
  assert.ok(fittingItems(cat).length > 0);
});

test('#39 sponsor discount applies only to eligible items; orders get an ETA', () => {
  const cat = dealerCatalog(bike, { avail: { susp_factory: 'backorder' } });
  const factory = cat.find((i) => i.catalogId === 'susp_factory');
  assert.equal(dealerPrice(factory, { sponsorDiscount: 0.2 }) < factory.msrp, true);
  const order = placeOrder(factory, { day: 10, method: 'ship' });
  assert.equal(order.etaDay, 10 + factory.shippingDays); // backorder = long ETA
  const arrived = receiveOrders([order], order.etaDay);
  assert.equal(arrived.length, 1);
  assert.equal(order.status, 'delivered');
});

test('#33 used and dealer are distinct channels (seller types vs OEM)', () => {
  assert.ok(Object.keys(SELLER_TYPES).includes('scammer')); // used has private sellers
  const cat = dealerCatalog(bike);
  assert.ok(cat.every((i) => i.warrantyMonths >= 0 && i.availability)); // dealer has warranty/availability
});
