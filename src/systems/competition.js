// Competition Engine — progression, field strength, momentum (issues #63, #65, #66)
// --------------------------------------------------------------------------
// Reject the simple upward ladder. Riders develop unevenly: dominant in one
// class, humbled in the next. Fields are recognizable humans, not difficulty
// numbers. And every result carries psychological weight.
//
//   #63 class-based competition progression (per-class, non-linear)
//   #65 rival & field-strength metadata (recognizable fields, recurring rivals)
//   #66 confidence & momentum effects (reason codes, bounded, serializable)

const clamp = (v, lo = 0, hi = 100) => Math.max(lo, Math.min(hi, v));

// ---- #63 class-based progression -----------------------------------------
// Per-class performance state. Changing classes preserves history rather than
// resetting it, so a career reads as a story of uneven development.
export class ClassProgression {
  constructor() {
    this.byClass = {}; // klass -> { races, results:[finishes], best, adaptation, lastSeen }
  }

  _rec(klass) {
    if (!this.byClass[klass]) {
      this.byClass[klass] = { races: 0, results: [], best: null, adaptation: 0, wins: 0, podiums: 0 };
    }
    return this.byClass[klass];
  }

  // Record a finish in a class. `adaptation` climbs as a rider gets reps in a
  // class (fresh class = low adaptation = a struggle even for a good rider).
  record(klass, overall, { dnf = false } = {}) {
    const r = this._rec(klass);
    r.races += 1;
    if (!dnf && overall != null) {
      r.results.push(overall);
      if (r.best == null || overall < r.best) r.best = overall;
      if (overall === 1) r.wins += 1;
      if (overall <= 3) r.podiums += 1;
    }
    r.adaptation = clamp(r.adaptation + (dnf ? 3 : 8), 0, 100);
    return r;
  }

  // A rider new to a class hasn't adapted yet — even strong skills translate
  // imperfectly. Returns a 0..1 multiplier applied to expected performance.
  adaptationFactor(klass) {
    const r = this.byClass[klass];
    const a = r ? r.adaptation : 0;
    return 0.7 + 0.3 * (a / 100); // 0.70 fresh → 1.00 seasoned
  }

  // Moving a rider up/down a class: history is preserved, and prior time on
  // similar machinery gives partial carry-over adaptation.
  changeClass(fromKlass, toKlass) {
    const from = this.byClass[fromKlass];
    const to = this._rec(toKlass);
    if (from && to.adaptation < from.adaptation * 0.5) {
      to.adaptation = clamp(Math.round(from.adaptation * 0.5), 0, 100); // carry-over
    }
    return { from: fromKlass, to: toKlass, carriedAdaptation: to.adaptation };
  }

  summary(klass) {
    const r = this.byClass[klass];
    if (!r) return { klass, races: 0, best: null, avg: null, adaptation: 0, wins: 0, podiums: 0 };
    const avg = r.results.length ? r.results.reduce((a, b) => a + b, 0) / r.results.length : null;
    return { klass, races: r.races, best: r.best, avg: avg == null ? null : Math.round(avg * 10) / 10, adaptation: r.adaptation, wins: r.wins, podiums: r.podiums };
  }

  toJSON() { return { byClass: this.byClass }; }
  static fromJSON(data) { const p = new ClassProgression(); p.byClass = data?.byClass ?? {}; return p; }
}

// ---- #65 field strength & rivals -----------------------------------------
export const FIELD_STRENGTH = {
  local: { label: 'Local', depth: 0.35, fastRiders: 2 },
  regional: { label: 'Regional', depth: 0.6, fastRiders: 5 },
  qualifier: { label: 'Qualifier', depth: 0.68, fastRiders: 7 },
  national: { label: 'National', depth: 0.85, fastRiders: 12 },
};

// Build a field-composition descriptor for an event. `rivals` are recognizable
// riders (with history) who may recur across events at the same level.
export function buildField({ level = 'local', size = 30, rivals = [] } = {}) {
  const s = FIELD_STRENGTH[level] ?? FIELD_STRENGTH.local;
  const attending = rivals.filter((r) => (r.levels ?? ['local']).includes(level));
  return {
    level, size,
    depth: s.depth,
    fastRiders: s.fastRiders,
    rivals: attending,
    // Expectation metadata: a rough "podium is realistic if rating ≥ this".
    podiumRating: Math.round(45 + s.depth * 45),
    label: s.label,
  };
}

// Does a rival show up again? Tracks appearances so recurring encounters can
// build a story (and fire memory hooks). Returns { rival, appearances, firstMeeting }.
export class RivalTracker {
  constructor() { this.byId = {}; } // id -> { appearances, beat, lostTo, name }

  encounter(rival, { beat = null } = {}) {
    const r = this.byId[rival.id] ?? (this.byId[rival.id] = { id: rival.id, name: rival.name, appearances: 0, beat: 0, lostTo: 0 });
    r.appearances += 1;
    if (beat === true) r.beat += 1;
    else if (beat === false) r.lostTo += 1;
    return { rival: r, appearances: r.appearances, firstMeeting: r.appearances === 1 };
  }

  // A memory hook fires on first meeting and on milestone rematches.
  memoryHook(rival, { beat = null } = {}) {
    const r = this.byId[rival.id];
    if (!r) return null;
    if (r.appearances === 1) {
      return { key: `rival_first_${rival.id}`, title: `A New Rival: ${rival.name}`, importance: 55,
        tags: ['rivalry', 'first_time'], summary: `${rival.name} is fast. You’ll be seeing them again.` };
    }
    if (r.appearances === 3 && beat === true) {
      return { key: `rival_upperhand_${rival.id}`, title: `Getting Their Number`, importance: 62,
        tags: ['rivalry'], summary: `Three races with ${rival.name} and you’re starting to have their number.` };
    }
    if (r.appearances >= 5) {
      const edge = r.beat > r.lostTo ? 'You hold the edge' : r.beat < r.lostTo ? 'They hold the edge' : 'It’s dead even';
      return { key: `rival_saga_${rival.id}_${r.appearances}`, title: `The ${rival.name} Rivalry`, importance: 66,
        tags: ['rivalry', 'saga'], summary: `${r.appearances} battles with ${rival.name}. ${edge} — ${r.beat}–${r.lostTo}.` };
    }
    return null;
  }

  toJSON() { return { byId: this.byId }; }
  static fromJSON(data) { const t = new RivalTracker(); t.byId = data?.byId ?? {}; return t; }
}

// ---- #66 confidence & momentum -------------------------------------------
// Confidence is the slow-moving belief; momentum is the hot/cold streak. Both
// bounded, every change carries a reason code + source, and both are
// serializable and readable by memory/UI systems.
export const MOMENTUM_REASONS = {
  win: { confidence: 8, momentum: 14, label: 'Won the race' },
  podium: { confidence: 5, momentum: 9, label: 'On the podium' },
  top_half: { confidence: 1, momentum: 3, label: 'Solid ride' },
  back_half: { confidence: -3, momentum: -6, label: 'Off the pace' },
  dnf: { confidence: -7, momentum: -12, label: 'DNF' },
  crash: { confidence: -9, momentum: -14, label: 'Crashed out' },
  injury: { confidence: -12, momentum: -20, label: 'Injured' },
  class_up: { confidence: -6, momentum: -8, label: 'Moved up a class' },
  breakthrough: { confidence: 14, momentum: 20, label: 'Breakthrough result' },
  family_pressure: { confidence: -4, momentum: -3, label: 'Family pressure' },
  encouragement: { confidence: 4, momentum: 2, label: 'Encouraged' },
};

export class MomentumTracker {
  constructor({ confidence = 50, momentum = 0 } = {}) {
    this.confidence = clamp(confidence);
    this.momentum = clamp(momentum, -100, 100);
    this.streak = 0; // + win streak, - slump length
    this.log = []; // { reason, label, dConf, dMom, source }
  }

  // Apply a named effect. Returns the bounded deltas actually applied + notes.
  apply(reason, { source = null, scale = 1, note = '' } = {}) {
    const base = MOMENTUM_REASONS[reason];
    if (!base) return null;
    // Momentum amplifies streaks: riding a hot streak, wins feel bigger.
    const streakBoost = base.momentum > 0 ? 1 + Math.min(0.5, Math.max(0, this.streak) * 0.1)
      : 1 + Math.min(0.5, Math.max(0, -this.streak) * 0.1);
    const dConf = Math.round(base.confidence * scale);
    const dMom = Math.round(base.momentum * scale * streakBoost);
    const beforeC = this.confidence, beforeM = this.momentum;
    this.confidence = clamp(this.confidence + dConf);
    this.momentum = clamp(this.momentum + dMom, -100, 100);

    // Streak bookkeeping.
    if (reason === 'win' || reason === 'podium' || reason === 'breakthrough') this.streak = this.streak >= 0 ? this.streak + 1 : 1;
    else if (reason === 'dnf' || reason === 'crash' || reason === 'back_half' || reason === 'injury') this.streak = this.streak <= 0 ? this.streak - 1 : -1;

    const entry = {
      reason, label: base.label, source,
      dConf: this.confidence - beforeC, dMom: this.momentum - beforeM,
      confidence: this.confidence, momentum: this.momentum, streak: this.streak, note,
    };
    this.log.push(entry);
    return entry;
  }

  // A notable swing worth a phone notification / memory (bounded to real jumps).
  notableEvent() {
    const last = this.log[this.log.length - 1];
    if (!last) return null;
    if (this.streak >= 3) return { kind: 'hot_streak', title: 'On a Roll', streak: this.streak, momentum: this.momentum };
    if (this.streak <= -3) return { kind: 'slump', title: 'In a Slump', streak: this.streak, momentum: this.momentum };
    if (Math.abs(last.dMom) >= 14) return { kind: last.dMom > 0 ? 'surge' : 'crash', title: last.dMom > 0 ? 'Momentum Surge' : 'Momentum Lost', momentum: this.momentum };
    return null;
  }

  state() { return { confidence: this.confidence, momentum: this.momentum, streak: this.streak }; }
  toJSON() { return { confidence: this.confidence, momentum: this.momentum, streak: this.streak, log: this.log.slice(-40) }; }
  static fromJSON(data) {
    const m = new MomentumTracker({ confidence: data?.confidence ?? 50, momentum: data?.momentum ?? 0 });
    m.streak = data?.streak ?? 0;
    m.log = data?.log ?? [];
    return m;
  }
}
