// Marketplace — part options & tradeoffs (issue #36)
// --------------------------------------------------------------------------
// Buying parts is not a simple upgrade ladder. For each need there are several
// options trading off price, performance, safety, reliability, maintenance,
// skill required, availability, and resale. Factory parts are best-in-class but
// demand expertise and access. Data-driven so listings/dealers can reference it.

export const PART_TIERS = ['stock', 'used', 'aftermarket', 'oem', 'factory'];

// A tradeoff option. Scores are 0–100 unless noted. `skillReq` is the mechanic
// skill to install well; `availability` is how easy it is to get (0 rare–100 easy).
const opt = (id, tier, label, s) => ({
  id, tier, label,
  cost: s.cost, performance: s.perf ?? 0, reliability: s.rel ?? 0, safety: s.safe ?? 0,
  maintenance: s.maint ?? 0, comfort: s.comfort ?? 0, skillReq: s.skill ?? 0,
  availability: s.avail ?? 60, resale: s.resale ?? 0, sponsorEligible: !!s.sponsor,
  note: s.note ?? '',
});

// At least five categories, each with multiple options and real tradeoffs.
export const PART_CATALOG = {
  suspension: [
    opt('susp_stock', 'stock', 'Stock suspension', { cost: 0, perf: 40, rel: 70, safe: 60, maint: 30, skill: 10, avail: 100, resale: 20, note: 'What it came with.' }),
    opt('susp_used', 'used', 'Used stock replacement', { cost: 180, perf: 42, rel: 55, safe: 58, maint: 55, skill: 30, avail: 70, resale: 25, note: 'Cheap, but may need a rebuild.' }),
    opt('susp_revalve', 'aftermarket', 'Revalved suspension', { cost: 450, perf: 68, rel: 72, safe: 72, maint: 45, skill: 45, avail: 60, resale: 45, sponsor: true, note: 'Tuned for the rider’s weight.' }),
    opt('susp_kit', 'oem', 'Aftermarket kit', { cost: 900, perf: 82, rel: 80, safe: 80, maint: 40, skill: 55, avail: 45, resale: 55, sponsor: true, note: 'A big step up, correctly set up.' }),
    opt('susp_factory', 'factory', 'Factory suspension', { cost: 2600, perf: 96, rel: 85, safe: 88, maint: 60, skill: 80, avail: 10, resale: 70, sponsor: true, note: 'Elite — needs an expert to set up.' }),
  ],
  tires: [
    opt('tire_budget', 'aftermarket', 'Budget tire', { cost: 40, perf: 35, rel: 55, safe: 50, maint: 20, avail: 100, resale: 5, note: 'Gets you rolling.' }),
    opt('tire_inter', 'aftermarket', 'Intermediate tire', { cost: 85, perf: 62, rel: 70, safe: 68, maint: 20, avail: 90, resale: 10, note: 'Good all-rounder.' }),
    opt('tire_soft', 'aftermarket', 'Soft-terrain tire', { cost: 95, perf: 74, rel: 60, safe: 66, maint: 25, avail: 70, resale: 10, note: 'Hooks up in loam and mud.' }),
    opt('tire_hard', 'aftermarket', 'Hard-terrain tire', { cost: 95, perf: 72, rel: 75, safe: 70, maint: 20, avail: 70, resale: 10, note: 'For blue-groove and hardpack.' }),
    opt('tire_factory', 'factory', 'Factory race tire', { cost: 220, perf: 92, rel: 65, safe: 74, maint: 30, avail: 20, resale: 15, sponsor: true, note: 'Race-day grip, wears fast.' }),
  ],
  topEnd: [
    opt('te_stock', 'stock', 'Stock top end', { cost: 0, perf: 45, rel: 70, safe: 65, maint: 40, skill: 25, avail: 100, resale: 10 }),
    opt('te_oem', 'oem', 'OEM rebuild kit', { cost: 260, perf: 66, rel: 85, safe: 78, maint: 45, skill: 55, avail: 70, resale: 20, note: 'Fresh and reliable.' }),
    opt('te_hi', 'aftermarket', 'Hi-comp piston', { cost: 340, perf: 80, rel: 68, safe: 66, maint: 60, skill: 65, avail: 50, resale: 25, sponsor: true, note: 'More power, more upkeep.' }),
    opt('te_factory', 'factory', 'Factory-spec build', { cost: 1400, perf: 95, rel: 72, safe: 70, maint: 75, skill: 85, avail: 10, resale: 40, sponsor: true, note: 'Race-team internals.' }),
  ],
  helmet: [
    opt('hel_budget', 'aftermarket', 'Budget helmet', { cost: 90, perf: 0, rel: 60, safe: 55, comfort: 45, avail: 100, resale: 10, note: 'Meets the standard.' }),
    opt('hel_mid', 'aftermarket', 'Mid-tier helmet', { cost: 220, perf: 0, rel: 75, safe: 75, comfort: 68, avail: 90, resale: 20, note: 'Lighter, better vents.' }),
    opt('hel_premium', 'oem', 'Premium helmet', { cost: 480, perf: 0, rel: 85, safe: 90, comfort: 85, avail: 70, resale: 30, sponsor: true, note: 'Top safety tech.' }),
    opt('hel_team', 'factory', 'Team-issued helmet', { cost: 0, perf: 0, rel: 88, safe: 92, comfort: 88, avail: 5, resale: 0, sponsor: true, note: 'Only if a sponsor provides it.' }),
  ],
  brakes: [
    opt('brk_stock', 'stock', 'Stock brakes', { cost: 0, perf: 45, rel: 70, safe: 65, maint: 30, avail: 100, resale: 10 }),
    opt('brk_pads', 'aftermarket', 'Performance pads', { cost: 60, perf: 62, rel: 72, safe: 74, maint: 35, avail: 90, resale: 10, note: 'Better bite, cheap.' }),
    opt('brk_oversize', 'oem', 'Oversize rotor kit', { cost: 240, perf: 80, rel: 78, safe: 84, maint: 40, skill: 45, avail: 55, resale: 30, sponsor: true, note: 'Strong, fade-resistant.' }),
  ],
};

export const PART_CATEGORIES = Object.keys(PART_CATALOG);

export function partOptions(category) {
  return PART_CATALOG[category] ?? [];
}

// A quick comparison table for a category: best value, safest, fastest.
export function compareOptions(category) {
  const opts = partOptions(category);
  if (!opts.length) return null;
  const perfList = opts.filter((o) => o.performance > 0);
  return {
    category,
    count: opts.length,
    cheapest: opts.reduce((a, b) => (b.cost < a.cost ? b : a)),
    safest: opts.reduce((a, b) => (b.safety > a.safety ? b : a)),
    fastest: perfList.length ? perfList.reduce((a, b) => (b.performance > a.performance ? b : a)) : null,
    // "Best value" = performance+safety per dollar (stock excluded).
    bestValue: opts.filter((o) => o.cost > 0).reduce((best, o) => {
      const v = (o.performance + o.safety) / o.cost;
      return best && best._v >= v ? best : { ...o, _v: v };
    }, null),
  };
}

// Is an option realistically obtainable for a rider? Factory parts need a
// sponsor + mechanic skill; rare parts need luck (caller supplies rng chance).
export function isObtainable(option, { mechanicSkill = 0, hasSponsor = false } = {}) {
  if (option.tier === 'factory') return hasSponsor && mechanicSkill >= 60;
  if (option.skillReq > mechanicSkill + 25) return false; // too advanced to install well
  return true;
}
