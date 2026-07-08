// Used Marketplace — search, filters, sellers, saved searches (issues #32, #37, #38)
// --------------------------------------------------------------------------
// A real motocross classifieds ecosystem, not a static shop. Private-party
// listings for bikes, parts, gear, tools, trailers — searchable and filterable,
// with sellers who have trust and quirks, and saved searches that fire alerts.

// ---- #38 seller types, trust, scams -------------------------------------
export const SELLER_TYPES = {
  honest_parent: { label: 'Honest parent', trust: 90, flex: 0.15, knowledge: 60, urgency: 30, scam: 0.0 },
  local_racer: { label: 'Local racer', trust: 75, flex: 0.2, knowledge: 80, urgency: 40, scam: 0.02 },
  retired_rider: { label: 'Retired rider', trust: 80, flex: 0.25, knowledge: 85, urgency: 50, scam: 0.02 },
  team_surplus: { label: 'Team surplus', trust: 78, flex: 0.1, knowledge: 90, urgency: 20, scam: 0.01 },
  dealer_used: { label: 'Dealer (used)', trust: 82, flex: 0.05, knowledge: 88, urgency: 15, scam: 0.0 },
  flipper: { label: 'Flipper', trust: 45, flex: 0.3, knowledge: 55, urgency: 70, scam: 0.12 },
  scammer: { label: 'Anonymous seller', trust: 15, flex: 0.4, knowledge: 20, urgency: 90, scam: 0.55 },
  friend: { label: 'Friend / family', trust: 95, flex: 0.35, knowledge: 50, urgency: 25, scam: 0.0 },
};

// ---- listing model (#32) -------------------------------------------------
let _lseq = 0;
export function newListingId() { return `ul_${Date.now().toString(36)}_${(_lseq++).toString(36)}`; }

export function makeListing(input = {}) {
  const seller = SELLER_TYPES[input.sellerType] ?? SELLER_TYPES.local_racer;
  return {
    id: input.id ?? newListingId(),
    title: input.title ?? 'Item',
    category: input.category ?? 'part', // bike|engine|suspension|wheels|tires|gear|tools|trailer|collectible
    kind: input.kind ?? 'part',
    assetId: input.assetId ?? null,
    serial: input.serial ?? null,
    manufacturer: input.manufacturer ?? null,
    model: input.model ?? null,
    year: input.year ?? null,
    klass: input.klass ?? null,
    fitsClasses: input.fitsClasses ?? (input.klass ? [input.klass] : null),
    fitsYears: input.fitsYears ?? null,
    family: input.family ?? null,
    condition: input.condition ?? 70, // 0-100
    hours: input.hours ?? null,
    oem: input.oem ?? 'aftermarket', // oem|aftermarket|factory
    price: Math.max(0, Math.round(input.price ?? 100)),
    floor: input.floor ?? Math.round((input.price ?? 100) * 0.75),
    location: input.location ?? 'Local',
    distance: input.distance ?? 10, // miles
    delivery: input.delivery ?? 'pickup', // pickup|shipping|both
    sellerType: input.sellerType ?? 'local_racer',
    sellerName: input.sellerName ?? seller.label,
    sellerRep: input.sellerRep ?? seller.trust,
    ownership: input.ownership ?? [],
    memories: input.memories ?? [],
    notes: input.notes ?? '',
    rare: !!input.rare,
    hiddenDamage: input.hiddenDamage ?? null, // set for risky listings
    postedDay: input.postedDay ?? 0,
    expiresDay: input.expiresDay ?? null,
  };
}

// ---- #32 search + filter -------------------------------------------------
export function search(listings, query = '') {
  const q = String(query).trim().toLowerCase();
  if (!q) return [...listings];
  const terms = q.split(/\s+/);
  return listings.filter((l) => {
    const hay = `${l.title} ${l.manufacturer ?? ''} ${l.model ?? ''} ${l.category} ${l.klass ?? ''} ${l.oem} ${l.notes}`.toLowerCase();
    return terms.every((t) => hay.includes(t));
  });
}

// Filter by structured criteria (any subset).
export function filterListings(listings, c = {}) {
  return listings.filter((l) => {
    if (c.category && l.category !== c.category) return false;
    if (c.manufacturer && l.manufacturer !== c.manufacturer) return false;
    if (c.klass && !(l.fitsClasses ?? [l.klass]).includes(c.klass)) return false;
    if (c.oem && l.oem !== c.oem) return false;
    if (c.condeMin != null && l.condition < c.condeMin) return false;
    if (c.maxPrice != null && l.price > c.maxPrice) return false;
    if (c.minPrice != null && l.price < c.minPrice) return false;
    if (c.maxDistance != null && l.distance > c.maxDistance) return false;
    if (c.minRep != null && l.sellerRep < c.minRep) return false;
    if (c.delivery && l.delivery !== c.delivery && l.delivery !== 'both') return false;
    if (c.fitsBike && !bikeMatch(l, c.fitsBike)) return false;
    return true;
  });
}

function bikeMatch(listing, bike) {
  if (listing.category === 'gear' || listing.category === 'tools' || listing.category === 'trailer') return true;
  if (listing.fitsClasses && bike.klass) return listing.fitsClasses.includes(bike.klass);
  return true;
}

export function sortListings(listings, sort = 'relevance') {
  const arr = [...listings];
  if (sort === 'price_asc') return arr.sort((a, b) => a.price - b.price || a.id.localeCompare(b.id));
  if (sort === 'price_desc') return arr.sort((a, b) => b.price - a.price || a.id.localeCompare(b.id));
  if (sort === 'newest') return arr.sort((a, b) => (b.postedDay ?? 0) - (a.postedDay ?? 0) || a.id.localeCompare(b.id));
  if (sort === 'distance') return arr.sort((a, b) => a.distance - b.distance || a.id.localeCompare(b.id));
  return arr.sort((a, b) => b.sellerRep - a.sellerRep || a.price - b.price || a.id.localeCompare(b.id));
}

// ---- #38 negotiation + deal outcomes ------------------------------------
// Resolve an offer. `rng` is a 0..1 supplier (deterministic in-game).
export function resolveOffer(listing, amount, { rng = () => 0.5 } = {}) {
  const seller = SELLER_TYPES[listing.sellerType] ?? SELLER_TYPES.local_racer;
  const minAccept = Math.round(listing.price * (1 - seller.flex));
  if (amount >= listing.price) return { result: 'accept', price: amount };
  if (amount >= minAccept) {
    // Urgent sellers accept; patient ones may counter.
    if (rng() < seller.urgency / 100) return { result: 'accept', price: amount };
    const counter = Math.round((amount + listing.price) / 2);
    return { result: 'counter', price: counter };
  }
  // Lowball. Low-trust sellers remember it; may walk.
  return { result: 'reject', price: null, remembered: seller.trust < 60 };
}

// Evaluate a completed purchase for scams / hidden damage (#38). A skilled
// mechanic (or a trusted seller) reduces the risk of a nasty surprise.
export function evaluatePurchase(listing, { mechanicSkill = 0, rng = () => 0.5 } = {}) {
  const seller = SELLER_TYPES[listing.sellerType] ?? SELLER_TYPES.local_racer;
  // Mechanic inspection catches most problems before money changes hands.
  const inspected = mechanicSkill >= 50 && rng() < 0.75 + mechanicSkill / 400;
  const scamRoll = rng();
  if (!inspected && scamRoll < seller.scam) {
    return { outcome: 'scam', note: 'Money gone — the item never showed or was junk.', loss: listing.price };
  }
  const dmgRoll = rng();
  if (!inspected && listing.hiddenDamage && dmgRoll < 0.5) {
    return { outcome: 'hidden_damage', note: `Hidden problem: ${listing.hiddenDamage}.`, conditionHit: 25 };
  }
  if (listing.price < listing.floor) {
    return { outcome: 'bargain', note: 'A genuine steal — you got it under value.' };
  }
  return { outcome: 'fair', note: inspected ? 'Inspected and solid.' : 'A fair deal.' };
}

// ---- #37 saved searches + alerts ----------------------------------------
let _sseq = 0;
export function makeSavedSearch(input = {}) {
  return {
    id: input.id ?? `ss_${(_sseq++).toString(36)}`,
    label: input.label ?? 'Saved search',
    query: input.query ?? '',
    criteria: input.criteria ?? {},
    createdDay: input.createdDay ?? 0,
    lastAlertedIds: input.lastAlertedIds ?? [],
  };
}

export function matchesSaved(saved, listing) {
  const bySearch = search([listing], saved.query).length > 0;
  const byFilter = filterListings([listing], saved.criteria).length > 0;
  return bySearch && byFilter;
}

// Given the current board, return newly-matching listings for a saved search
// (not previously alerted), and update the saved search's alerted set (#37).
export function newMatches(saved, listings) {
  const matched = listings.filter((l) => matchesSaved(saved, l));
  const fresh = matched.filter((l) => !saved.lastAlertedIds.includes(l.id));
  saved.lastAlertedIds = matched.map((l) => l.id);
  return fresh;
}
