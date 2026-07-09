// Analytics Event Plan + local hook (issue #247)
// --------------------------------------------------------------------------
// A local, no-network, consent-gated event log for understanding the v1.0
// funnel: onboarding, season commitment, racing, and save health. Nothing is
// transmitted — events accumulate in memory (and optionally localStorage) and
// are inspectable on window.__analytics for QA. Properties are whitelisted to
// coarse, non-personal values; the rider's name and any free text never enter
// an event. For a child-directed native launch, analytics must default OFF and
// require explicit opt-in (see docs/release/analytics-event-plan.md).

export const ANALYTICS_EVENTS = [
  'career_started',
  'season_committed',
  'race_weekend_started',
  'race_completed',
  'season_completed',
  'save_loaded',
  'marketplace_purchase',
  'dealer_order',
  'bike_sold',
  'crash_error',
];

// Only these coarse properties survive onto an event. No names, no free text.
const PROP_ALLOW = [
  'campaign', 'klass', 'background', 'depth', 'week', 'season',
  'overall', 'points', 'dnf', 'amount', 'item', 'kind', 'code', 'error_type', 'result',
];

const CAP = 200;

function filterProps(props) {
  if (props == null || typeof props !== 'object') return {};
  const out = {};
  for (const k of PROP_ALLOW) if (props[k] != null) out[k] = props[k];
  return out;
}

export class Analytics {
  constructor({ consent = false, sink = null, events = [] } = {}) {
    this.consent = !!consent;
    this.events = Array.isArray(events) ? events.slice(-CAP) : [];
    this._sink = typeof sink === 'function' ? sink : null;
  }

  // Consent gates collection. Turning it off also clears anything buffered.
  setConsent(v) {
    this.consent = !!v;
    if (!this.consent) this.clear();
    return this.consent;
  }

  // Record an event if consented and known. Unknown events and non-consented
  // calls are no-ops (return null) — never throws.
  track(event, props = {}) {
    if (!this.consent) return null;
    if (!ANALYTICS_EVENTS.includes(event)) return null;
    const e = { event, props: filterProps(props), at: Date.now() };
    this.events.push(e);
    if (this.events.length > CAP) this.events = this.events.slice(-CAP);
    if (this._sink) { try { this._sink(e); } catch (err) { /* best-effort */ } }
    return e;
  }

  countByEvent() {
    const out = {};
    for (const e of this.events) out[e.event] = (out[e.event] ?? 0) + 1;
    return out;
  }

  recent(n = CAP) { return this.events.slice(-Math.max(0, n)); }
  clear() { this.events = []; }
}
