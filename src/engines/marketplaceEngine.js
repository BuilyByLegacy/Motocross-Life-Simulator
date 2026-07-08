// Asset & Marketplace Engine
// --------------------------
// Listings appear from the community pool. Items are Assets with tradeoffs, not
// levels. Players can buy outright or make a lower offer — sellers may accept,
// counter, or sell to someone else. Bought items install into the player's
// bike/garage and start carrying the player's ownership history.

import { MARKET_POOL } from '../data/content.js';
import { uid } from '../core/state.js';

export class MarketplaceEngine {
  constructor(game) {
    this.game = game;
  }

  get listings() {
    return this.game.state.market.listings;
  }

  // Refresh the visible listings. `force` guarantees at least a couple appear
  // (used when the player actively browses).
  refresh(force = false) {
    const g = this.game;
    const st = g.state.market;
    // Expire ~half of existing listings so the board turns over.
    st.listings = st.listings.filter(() => g.rng.chance(0.5));

    const owned = new Set(g.bike.installed);
    const candidates = MARKET_POOL.filter((it) => {
      if (it.type === 'part' && owned.has(it.name)) return false;
      if (it.key === 'practicebike' && g.flag('has_practice_bike')) return false;
      if (it.key === 'chest' && g.flag('has_chest_protector')) return false;
      return !st.listings.some((l) => l.key === it.key);
    });

    // If a consumable part is worn, make sure its replacement shows up so the
    // marketplace always has a reason to visit (issue #15).
    const parts = g.ensureParts(g.bike);
    const wornKeys = { tires: 'mx33', topEnd: 'topend', chain: 'chainkit', brakes: 'brakepads' };
    const shuffled = [];
    for (const [pk, itemKey] of Object.entries(wornKeys)) {
      if ((parts[pk] ?? 100) < 45) {
        const it = MARKET_POOL.find((x) => x.key === itemKey);
        if (it && !st.listings.some((l) => l.key === itemKey)) shuffled.push(it);
      }
    }

    let want = force ? g.rng.int(2, 3) : g.rng.int(0, 2);
    want = Math.max(want, shuffled.length);
    shuffled.push(...g.rng.shuffle(candidates.filter((c) => !shuffled.includes(c))));
    for (const it of shuffled) {
      if (want <= 0) break;
      if (it.rare && !g.rng.chance(0.25)) continue; // rare listings are, well, rare
      // Price jitter around the ask, so the "same" item varies by seller.
      const price = Math.round(it.ask * g.rng.range(0.92, 1.06));
      st.listings.push({
        id: uid('list'),
        key: it.key,
        name: it.name,
        type: it.type,
        seller: it.seller,
        blurb: it.blurb,
        effect: it.effect,
        price,
        floor: it.floor,
        rare: !!it.rare,
      });
      want--;
    }
    return st.listings;
  }

  _pool(key) {
    return MARKET_POOL.find((it) => it.key === key);
  }

  buy(listingId) {
    const g = this.game;
    const st = g.state.market;
    const listing = st.listings.find((l) => l.id === listingId);
    if (!listing) return { ok: false, msg: 'That listing is gone.' };
    if (g.family.money < listing.price) return { ok: false, msg: 'Not enough money for that right now.' };

    g.spend(listing.price);
    this._pool(listing.key).install(g);
    st.listings = st.listings.filter((l) => l.id !== listingId);
    g.bus.emit('market:bought', { name: listing.name, price: listing.price, week: g.week });
    return { ok: true, msg: `Bought: ${listing.name} for $${listing.price}. ${listing.effect}.` };
  }

  // Make a lower offer. Sellers weigh how close you are to their floor.
  offer(listingId, amount) {
    const g = this.game;
    const st = g.state.market;
    const listing = st.listings.find((l) => l.id === listingId);
    if (!listing) return { ok: false, msg: 'That listing is gone.' };
    if (amount > g.family.money) return { ok: false, msg: "You can't cover that offer." };

    if (amount >= listing.floor) {
      // At or above floor: usually yes, better deal the higher you go.
      const p = 0.55 + 0.4 * ((amount - listing.floor) / Math.max(1, listing.price - listing.floor));
      if (g.rng.chance(p)) {
        g.spend(amount);
        this._pool(listing.key).install(g);
        st.listings = st.listings.filter((l) => l.id !== listingId);
        g.bus.emit('market:bought', { name: listing.name, price: amount, week: g.week });
        return { ok: true, sold: true, msg: `Deal! You got ${listing.name} for $${amount}. ${listing.effect}.` };
      }
      // Counter halfway between offer and ask.
      const counter = Math.round((amount + listing.price) / 2);
      listing.price = counter;
      return { ok: true, sold: false, msg: `Seller counters: "Can't do that. Meet me at $${counter}?"` };
    }

    // Lowball. Small chance the seller walks / sells to someone else.
    if (g.rng.chance(0.3)) {
      st.listings = st.listings.filter((l) => l.id !== listingId);
      return { ok: true, sold: false, gone: true, msg: 'Seller: "Not even close." The listing sold to someone else.' };
    }
    return { ok: true, sold: false, msg: 'Seller: "That\'s an insult. Come back with a real number."' };
  }

  // Auto-buy policy for simulated play: grab a clearly-worth-it upgrade if the
  // family can comfortably afford it and the bike needs help.
  autoConsider() {
    const g = this.game;
    if (this.listings.length === 0) return null;
    const affordable = this.listings.filter((l) => l.price <= g.family.money - 300);
    if (affordable.length === 0) return null;
    // Prioritise replacing worn consumable parts (issue #15), then upgrades.
    const parts = g.ensureParts(g.bike);
    let pick = null;
    if ((parts.topEnd ?? 100) < 45) pick = affordable.find((l) => l.key === 'topend');
    if (!pick && (parts.tires ?? 100) < 45) pick = affordable.find((l) => l.key === 'mx33');
    if (!pick && (parts.chain ?? 100) < 45) pick = affordable.find((l) => l.key === 'chainkit');
    if (!pick && (parts.brakes ?? 100) < 45) pick = affordable.find((l) => l.key === 'brakepads');
    if (!pick && g.bike.reliability < 55) pick = affordable.find((l) => l.key === 'topend');
    if (!pick) pick = affordable.find((l) => l.type === 'part' || l.type === 'service');
    if (!pick) return null;
    const res = this.buy(pick.id);
    return res.ok ? res.msg : null;
  }
}
