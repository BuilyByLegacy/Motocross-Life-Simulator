// Living Garage — v1.0 minimum (issues #220, #219)
// --------------------------------------------------------------------------
// The buildable slice of the Living Garage: the garage as a home hub with the
// active bike, an inventory overview (from garageView), basic storage capacity,
// a small upgrade path, on-order deliveries, and a museum count. Full 3D,
// advanced museum, complex clutter, and deep social visits are deferred (#220).
// Pure and serializable so it round-trips through save/load (#219).

// Base storage pools (units). Upgrades raise these.
export const BASE_CAPACITY = { floor: 2, shelf: 8, display: 6 };

// The v1.0 upgrade path — a basic, cosmetic + capacity slice (#213 subset).
export const GARAGE_UPGRADES = [
  { id: 'shelving', name: 'Extra shelving', cost: 120, effects: { shelf: 6 }, blurb: 'More room for parts and tires.' },
  { id: 'tire_rack', name: 'Tire rack', cost: 90, effects: { shelf: 4 }, blurb: 'Keeps tires off the floor.' },
  { id: 'display_case', name: 'Display case', cost: 160, effects: { display: 6 }, blurb: 'Show off trophies and keepsakes.' },
  { id: 'extra_bay', name: 'Extra bay', cost: 800, effects: { floor: 2, display: 2 }, blurb: 'Room for another bike — and a real shop feel.' },
];

export function upgradeById(id) {
  return GARAGE_UPGRADES.find((u) => u.id === id) ?? null;
}

// Effective capacity given owned upgrades (ids).
export function garageCapacity(ownedUpgrades = []) {
  const cap = { ...BASE_CAPACITY };
  for (const id of ownedUpgrades) {
    const u = upgradeById(id);
    if (!u) continue;
    for (const [pool, n] of Object.entries(u.effects)) cap[pool] = (cap[pool] ?? 0) + n;
  }
  return cap;
}

// Usage across the pools, and the resulting clutter (overflow) + a warning.
export function garageUsage({ bikes = 0, parts = 0, objects = 0 }, ownedUpgrades = []) {
  const cap = garageCapacity(ownedUpgrades);
  const used = { floor: bikes, shelf: parts, display: objects };
  const overflow = {};
  let clutter = 0;
  for (const pool of Object.keys(cap)) {
    const over = Math.max(0, (used[pool] ?? 0) - cap[pool]);
    if (over > 0) overflow[pool] = over;
    clutter += over;
  }
  const worstPool = Object.keys(cap).reduce((w, p) => ((used[p] ?? 0) / cap[p] > (used[w] ?? 0) / cap[w] ? p : w), Object.keys(cap)[0]);
  const near = (used[worstPool] ?? 0) / cap[worstPool] >= 0.85;
  return {
    cap, used, overflow, clutter,
    state: clutter > 0 ? 'overflow' : near ? 'crowded' : 'ok',
    warning: clutter > 0 ? `The garage is overflowing — ${Object.entries(overflow).map(([p, n]) => `${n} too many for the ${p}`).join(', ')}.`
      : near ? 'The garage is filling up — consider an upgrade or a sale.' : null,
  };
}

// Which upgrades the player can still buy, tagged with affordability.
export function availableUpgrades(ownedUpgrades = [], budget = 0) {
  return GARAGE_UPGRADES
    .filter((u) => !ownedUpgrades.includes(u.id))
    .map((u) => ({ ...u, affordable: budget >= u.cost }));
}

// The v1.0 garage home-hub overview model (composes garageView + capacity).
//   view: output of buildGarageView(); orders: dealer orders; upgrades: owned ids
export function v1GarageOverview({ view, orders = [], ownedUpgrades = [], budget = 0 } = {}) {
  const counts = view?.counts ?? { bikes: 0, parts: 0, objects: 0, listed: 0, withMemories: 0 };
  const usage = garageUsage({ bikes: counts.bikes, parts: counts.parts + (counts.tools ?? 0), objects: counts.objects }, ownedUpgrades);
  const activeBike = (view?.bikes ?? []).find((b) => b.state === 'installed') ?? (view?.bikes ?? [])[0] ?? null;
  const onOrder = (orders ?? []).filter((o) => o.status !== 'delivered');
  return {
    activeBike,
    counts,
    capacity: usage,
    onOrder: onOrder.map((o) => ({ label: o.label, method: o.method, etaDay: o.etaDay })),
    museumCount: (view?.objects ?? []).length,
    upgrades: { owned: ownedUpgrades, available: availableUpgrades(ownedUpgrades, budget) },
    isHome: true,
  };
}
