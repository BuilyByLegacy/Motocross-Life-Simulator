// Dealer / Retail Marketplace — OEM catalog + orders (issues #33, #39)
// --------------------------------------------------------------------------
// New parts are a different channel from the used marketplace (#33): reliable,
// clear compatibility, mostly fixed price, but pricier — with availability,
// shipping/backorder, warranty, and sponsor/dealer discounts (#39).

import { checkFit } from './compatibility.js';
import { PART_CATALOG } from './partsCatalog.js';

export const AVAILABILITY = ['in_stock', 'low_stock', 'backorder', 'special_order'];

// A dealer item derived from a parts-catalog option: MSRP, availability,
// delivery time, warranty, and fitment against the current bike (#39).
export function dealerItem(catalogOption, { availability = 'in_stock', warrantyMonths = 12 } = {}) {
  const shippingDays = { in_stock: 2, low_stock: 4, backorder: 21, special_order: 35 }[availability] ?? 5;
  return {
    id: `oem_${catalogOption.id}`,
    catalogId: catalogOption.id,
    label: catalogOption.label,
    tier: catalogOption.tier,
    category: categoryOf(catalogOption.id),
    msrp: catalogOption.cost,
    oem: catalogOption.tier === 'factory' ? 'factory' : 'oem',
    availability,
    shippingDays,
    pickupAvailable: availability === 'in_stock' || availability === 'low_stock',
    warrantyMonths,
    sponsorEligible: catalogOption.sponsorEligible,
    performance: catalogOption.performance,
    reliability: catalogOption.reliability,
  };
}

function categoryOf(optId) {
  for (const [cat, opts] of Object.entries(PART_CATALOG)) if (opts.some((o) => o.id === optId)) return cat;
  return null;
}

// Build a dealer catalog for the rider's bike: OEM/factory options for each
// category, tagged with fitment (#39). `avail` maps optId → availability.
export function dealerCatalog(bike, { avail = {}, categories = null } = {}) {
  const cats = categories ?? Object.keys(PART_CATALOG);
  const items = [];
  for (const cat of cats) {
    for (const optn of PART_CATALOG[cat]) {
      if (optn.tier === 'stock' || optn.tier === 'used') continue; // dealers sell new
      const item = dealerItem(optn, { availability: avail[optn.id] ?? 'in_stock' });
      const fit = checkFit(bike, { category: cat, fitsClasses: bike.klass ? [bike.klass] : null });
      items.push({ ...item, fitment: fit.status, fitmentNote: fit.note });
    }
  }
  return items;
}

// Filter a catalog to what fits the bike (#33/#39 compatibility filtering).
export function fittingItems(catalog) {
  return catalog.filter((i) => i.fitment === 'direct' || i.fitment === 'modify');
}

// Price after a sponsor/dealer discount (#39). Dealer prices are otherwise fixed.
export function dealerPrice(item, { sponsorDiscount = 0, dealerDiscount = 0 } = {}) {
  const disc = Math.min(0.5, (item.sponsorEligible ? sponsorDiscount : 0) + dealerDiscount);
  return Math.max(0, Math.round(item.msrp * (1 - disc)));
}

// Place an order. Returns an order record with an ETA (delivery day). Backorders
// take longer; pickup (when available) is immediate-ish (#39).
let _oseq = 0;
export function placeOrder(item, { day = 0, method = 'ship', sponsorDiscount = 0, dealerDiscount = 0 } = {}) {
  const price = dealerPrice(item, { sponsorDiscount, dealerDiscount });
  const days = method === 'pickup' && item.pickupAvailable ? 1 : item.shippingDays;
  return {
    id: `ord_${(_oseq++).toString(36)}`,
    itemId: item.id,
    label: item.label,
    category: item.category,
    price,
    method: method === 'pickup' && item.pickupAvailable ? 'pickup' : 'ship',
    orderedDay: day,
    etaDay: day + days,
    warrantyMonths: item.warrantyMonths,
    status: 'ordered', // ordered | shipped | delivered
  };
}

// Advance orders to `day`; returns the orders that have just arrived.
export function receiveOrders(orders, day) {
  const arrived = [];
  for (const o of orders) {
    if (o.status !== 'delivered' && o.etaDay <= day) { o.status = 'delivered'; arrived.push(o); }
  }
  return arrived;
}
