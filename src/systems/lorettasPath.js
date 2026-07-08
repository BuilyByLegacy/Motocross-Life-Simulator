// Road to Loretta's — the amateur motocross dream (issues #25, #31, #58–#62)
// ---------------------------------------------------------------------------
// Loretta Lynn's is not a race you enter — it's a path you earn. This module is
// pure domain logic modeling the authentic three-stage qualifying journey:
//
//     Area Qualifier  →  Regional Championship  →  Loretta Lynn's National
//
// It validates rider/class/region eligibility, tracks advancement per class,
// allows multiple Area Qualifier attempts, generates planner warnings, and
// emits milestone *descriptors* (the Memory Engine turns them into memories —
// this module never touches game state). See:
//   #58 qualification-path model      #59 area-qualifier selection rules
//   #60 regional advancement rules    #62 planner warnings
//   #61 dream status & emotional stakes   #31 milestone memory tracking
//   #25 the overall system + failure follow-ups

export const LORETTA_STAGES = ['area', 'regional', 'national'];

// Each stage advances its top finishers to the next. Slot counts are the
// deterministic model values (real events vary; these keep the sim legible).
export const STAGE_INFO = {
  area: { key: 'area', label: 'Area Qualifier', short: 'Area', order: 0, next: 'regional', advanceSlots: 6 },
  regional: { key: 'regional', label: 'Regional Championship', short: 'Regional', order: 1, next: 'national', advanceSlots: 8 },
  national: { key: 'national', label: "Loretta Lynn's National", short: "Loretta's", order: 2, next: null, advanceSlots: 0 },
};

// The qualifying map is split into regions; a rider chases through one region.
export const LORETTA_REGIONS = [
  'Northeast', 'Southeast', 'Mid-South', 'North Central', 'South Central', 'Northwest', 'Southwest',
];

// Classes eligible to chase Loretta's in this build (mirrors the game's ladder).
export const LORETTA_CLASSES = ['50cc', '65cc', '85cc', 'Supermini', '250B'];

// The rider's dream status, furthest-first.
export const DREAM_STATES = ['dormant', 'chasing', 'area_qualified', 'regional_qualified', 'national_qualified', 'eliminated'];

const STAGE_ORDER = { none: -1, area: 0, regional: 1, national: 2 };

// Classify an event into a Loretta stage, or null if it isn't on the path.
// Prefers explicit metadata; falls back to the qualifier category for areas.
export function classifyEvent(event) {
  if (!event) return null;
  if (event.lorettaStage && LORETTA_STAGES.includes(event.lorettaStage)) return event.lorettaStage;
  if (event.category === 'qualifier') return 'area';
  return null;
}

export class LorettasPath {
  constructor() {
    // Per-class progression. `reached` is the furthest stage cleared ('none'
    // until an Area Qualifier is won through). `region` locks once chosen.
    this.byClass = {}; // klass -> { reached, region, attempts:[], eliminated, dreamState }
    this.milestones = []; // ordered milestone descriptors already emitted
    this._seen = new Set(); // milestone keys already fired (once-per-career)
  }

  _class(klass) {
    if (!this.byClass[klass]) {
      this.byClass[klass] = { reached: 'none', region: null, attempts: [], eliminated: false, dreamState: 'dormant' };
    }
    return this.byClass[klass];
  }

  // ---- #58/#59/#60 eligibility --------------------------------------------
  // Can a rider in `klass` (in `region`) enter this event right now?
  // Returns { ok, reasons:[] } — reasons explain every failure (planner UX).
  eligibleToEnter(event, { klass, region } = {}) {
    const stage = classifyEvent(event);
    const reasons = [];
    if (!stage) return { ok: false, stage: null, reasons: ['Not a Loretta’s qualifying event.'] };

    if (klass && !LORETTA_CLASSES.includes(klass)) {
      reasons.push(`${klass} isn’t an eligible Loretta’s class.`);
    }
    // Event may restrict its classes; if it lists them, the rider must fit.
    if (event.classes && klass && !event.classes.includes(klass)) {
      reasons.push(`This ${STAGE_INFO[stage].label} doesn’t run a ${klass} class.`);
    }

    const rec = klass ? this._class(klass) : null;
    const evRegion = event.region ?? region ?? null;

    // Region lock: once you’ve started the path in a region, you stay in it.
    if (rec && rec.region && evRegion && rec.region !== evRegion) {
      reasons.push(`You’re chasing the ${rec.region} region — this event is ${evRegion}.`);
    }

    // Prerequisite advancement (#60): can't jump to a later stage unqualified.
    if (stage === 'regional' && rec && STAGE_ORDER[rec.reached] < STAGE_ORDER.area) {
      reasons.push('You must advance out of an Area Qualifier before a Regional.');
    }
    if (stage === 'national' && rec && STAGE_ORDER[rec.reached] < STAGE_ORDER.regional) {
      reasons.push('Loretta’s is invite-only — you have to qualify through a Regional.');
    }

    return { ok: reasons.length === 0, stage, region: evRegion, reasons };
  }

  // ---- #25/#58 advancement -------------------------------------------------
  // Record a finish at a stage. Returns { stage, advanced, finish, milestones, eliminated }.
  // Top `advanceSlots` finishers advance; anyone else is eliminated for the year
  // at that stage (but may try another Area Qualifier — see followUpChoices).
  recordAttempt(event, { klass, region, finish, fieldSize = 30, day = null, eventName } = {}) {
    const stage = classifyEvent(event);
    if (!stage) return null;
    const rec = this._class(klass);
    const evRegion = event.region ?? region ?? rec.region ?? null;
    if (!rec.region && evRegion) rec.region = evRegion; // lock region on first attempt
    if (rec.dreamState === 'dormant') rec.dreamState = 'chasing';

    const slots = STAGE_INFO[stage].advanceSlots;
    const advanced = stage === 'national' ? false : finish != null && finish <= slots;
    const name = eventName ?? event.name ?? STAGE_INFO[stage].label;

    const attempt = { stage, region: evRegion, klass, finish, fieldSize, day, eventName: name, advanced, season: null };
    rec.attempts.push(attempt);

    const emitted = [];
    const fire = (key, once, descriptor) => {
      if (once && this._seen.has(key)) return;
      if (once) this._seen.add(key);
      const m = { key, stage, klass, region: evRegion, ...descriptor };
      this.milestones.push(m);
      emitted.push(m);
    };

    // ---- milestone descriptors (#31/#61) ----
    if (stage === 'area' && rec.attempts.filter((a) => a.stage === 'area').length === 1) {
      fire('first_area_attempt', true, {
        title: 'First Shot at the Dream', importance: 68,
        emotion: ['nerves', 'hope'], tags: ['first_time', 'lorettas', 'milestone'],
        summary: `Your first Area Qualifier — the first real step on the Road to Loretta’s at ${name}.`,
      });
    }

    if (advanced) {
      // `reached` tracks the furthest CLEARED stage: winning through an Area
      // sets it to 'area', through a Regional to 'regional'.
      rec.reached = stage;
      if (stage === 'area') {
        rec.dreamState = 'area_qualified';
        fire('first_regional_qual', true, {
          title: 'Punched a Regional Ticket', importance: 80,
          emotion: ['pride', 'relief', 'joy'], tags: ['first_time', 'lorettas', 'regional', 'milestone'],
          summary: `You advanced out of the ${evRegion} Area Qualifier — a Regional Championship is next. The dream is real.`,
        });
      } else if (stage === 'regional') {
        rec.dreamState = 'regional_qualified';
        fire('first_national_qual', true, {
          title: "You're Going to the Ranch", importance: 94,
          emotion: ['joy', 'disbelief', 'pride'], tags: ['first_time', 'lorettas', 'national', 'championship', 'milestone'],
          summary: `You qualified for Loretta Lynn’s. Out of everyone in ${evRegion}, you made it to the Ranch.`,
        });
      }
    } else if (stage !== 'national') {
      // Missed advancement. "By one spot" is its own particular heartbreak.
      if (finish === slots + 1) {
        fire(`missed_by_one_${stage}`, false, {
          title: 'One Spot Short', importance: 76,
          emotion: ['heartbreak', 'anger', 'resolve'], tags: ['lorettas', 'heartbreak', 'near_miss'],
          summary: `${finish}th at the ${STAGE_INFO[stage].label}. The last transfer spot was ${slots}th. One position from advancing.`,
        });
      }
      rec.eliminated = true;
      rec.dreamState = rec.reached === 'none' ? 'eliminated' : rec.dreamState;
    }

    // National-stage results are about the moment, not advancement.
    if (stage === 'national') {
      rec.dreamState = 'national_qualified';
      fire('first_national_moto', true, {
        title: 'A Loretta’s Moto', importance: 88,
        emotion: ['awe', 'nerves', 'pride'], tags: ['first_time', 'lorettas', 'national', 'milestone'],
        summary: `You dropped the gate at Loretta Lynn’s — ${finish != null ? ordinalish(finish) + ' in the moto' : 'a moto at the Ranch'}. Not everyone gets here.`,
      });
      const prevBest = rec.bestNational ?? Infinity;
      if (finish != null && finish < prevBest) {
        rec.bestNational = finish;
        if (finish === 1) {
          fire('national_championship', true, {
            title: 'Loretta Lynn’s Champion', importance: 100,
            emotion: ['euphoria', 'tears', 'legacy'], tags: ['lorettas', 'national', 'championship', 'milestone', 'legacy'],
            summary: `A National Championship at Loretta Lynn’s. This is the memory a whole life of racing is measured against.`,
          });
        } else if (finish <= 5) {
          fire(`national_top5`, false, {
            title: 'Top Five at the Ranch', importance: 90,
            emotion: ['pride', 'joy'], tags: ['lorettas', 'national', 'milestone'],
            summary: `${ordinalish(finish)} overall at Loretta Lynn’s — a top-five against the best amateurs in the country.`,
          });
        }
      }
      // Painful near-miss podiums at the Ranch.
      if (finish === 4) {
        fire('national_heartbreak', false, {
          title: 'Fourth at the Ranch', importance: 82,
          emotion: ['heartbreak', 'pride'], tags: ['lorettas', 'national', 'heartbreak'],
          summary: `Fourth at Loretta Lynn’s — off the podium by one spot at the biggest race of the year.`,
        });
      }
    }

    return { stage, advanced, finish, region: evRegion, nextStage: STAGE_INFO[stage].next, milestones: emitted, eliminated: rec.eliminated };
  }

  // ---- advancement status (per class) -------------------------------------
  advancementStatus(klass) {
    const rec = this._class(klass);
    return {
      klass,
      reached: rec.reached,
      region: rec.region,
      dreamState: rec.dreamState,
      eliminated: rec.eliminated,
      areaCleared: STAGE_ORDER[rec.reached] >= STAGE_ORDER.area,
      regionalCleared: STAGE_ORDER[rec.reached] >= STAGE_ORDER.regional,
      qualifiedForNational: STAGE_ORDER[rec.reached] >= STAGE_ORDER.regional,
      bestNational: rec.bestNational ?? null,
      attempts: rec.attempts.length,
    };
  }

  // ---- #62 planner warnings ------------------------------------------------
  // Inspect a set of selected season events against a Loretta's goal for `klass`.
  // Returns structured, severity-tagged warnings with suggested next actions.
  pathWarnings(selectedEvents = [], { klass, hasLorettaGoal = false } = {}) {
    const warnings = [];
    const staged = selectedEvents
      .map((e) => ({ e, stage: classifyEvent(e) }))
      .filter((x) => x.stage);
    const has = (s) => staged.some((x) => x.stage === s);
    const rec = klass ? this._class(klass) : null;
    const areaCleared = rec && STAGE_ORDER[rec.reached] >= STAGE_ORDER.area;
    const regionalCleared = rec && STAGE_ORDER[rec.reached] >= STAGE_ORDER.regional;

    if (hasLorettaGoal && !has('area') && !areaCleared) {
      warnings.push({
        severity: 'high', code: 'no_area_qualifier',
        message: 'Your Loretta’s goal has no Area Qualifier on the schedule — there’s no way onto the path.',
        action: 'Add an Area Qualifier to your season.',
      });
    }
    // Class eligibility (#62).
    if (hasLorettaGoal && klass && !LORETTA_CLASSES.includes(klass)) {
      warnings.push({
        severity: 'high', code: 'class_ineligible',
        message: `${klass} can’t chase Loretta’s — no qualifying class for it.`,
        action: 'Change class strategy or set a different goal.',
      });
    }
    // Skipping a stage you haven't earned (#62 impossible sequence).
    if (has('regional') && !has('area') && !areaCleared) {
      warnings.push({
        severity: 'high', code: 'regional_unqualified',
        message: 'You’ve planned a Regional but no Area Qualifier to reach it — that Regional can’t be entered.',
        action: 'Add an Area Qualifier before the Regional, or drop the Regional.',
      });
    }
    if (has('national') && !has('regional') && !regionalCleared) {
      warnings.push({
        severity: 'high', code: 'national_unqualified',
        message: 'Loretta’s National is on your plan without a Regional to qualify through.',
        action: 'You can’t enter Loretta’s directly — qualify through a Regional first.',
      });
    }
    // Region split — qualifiers in different regions don't chain.
    const regions = new Set(staged.map((x) => x.e.region).filter(Boolean));
    if (regions.size > 1) {
      warnings.push({
        severity: 'medium', code: 'region_split',
        message: `Your qualifiers span ${regions.size} regions (${[...regions].join(', ')}). Advancement stays within one region.`,
        action: 'Focus your qualifiers in a single region.',
      });
    }
    // Ordering: an Area Qualifier scheduled after a Regional can't feed it.
    const areas = staged.filter((x) => x.stage === 'area').map((x) => x.e.day ?? 0);
    const regs = staged.filter((x) => x.stage === 'regional').map((x) => x.e.day ?? 0);
    if (areas.length && regs.length && Math.min(...areas) > Math.min(...regs)) {
      warnings.push({
        severity: 'medium', code: 'bad_sequence',
        message: 'Your Regional is scheduled before your Area Qualifier — the dates don’t chain.',
        action: 'Pick an Area Qualifier that runs before the Regional.',
      });
    }
    return warnings;
  }

  // ---- #25 failure follow-ups ---------------------------------------------
  // After an elimination, what can the player do about it?
  followUpChoices(klass) {
    const rec = this._class(klass);
    if (!rec.eliminated) return [];
    return [
      { id: 'retry_area', label: 'Try another Area Qualifier', blurb: 'Another region, another shot — if budget and time allow.' },
      { id: 'focus_local', label: 'Focus on local racing', blurb: 'Rack up wins and points close to home this year.' },
      { id: 'save_money', label: 'Save for next season', blurb: 'Bank the travel money and come back stronger.' },
      { id: 'train_harder', label: 'Train harder', blurb: 'Turn the disappointment into off-season fitness and skill.' },
      { id: 'change_class', label: 'Change bike / class strategy', blurb: 'Move up or reposition for a better qualifying path.' },
    ];
  }

  // ---- #61 dream status summary (for phone / internet UI) -----------------
  dreamSummary() {
    const classes = Object.entries(this.byClass).map(([klass, rec]) => ({
      klass, reached: rec.reached, region: rec.region, dreamState: rec.dreamState,
      eliminated: rec.eliminated, attempts: rec.attempts.length, bestNational: rec.bestNational ?? null,
    }));
    const furthest = classes.reduce((best, c) => (STAGE_ORDER[c.reached] > STAGE_ORDER[best?.reached ?? 'none'] ? c : best), null);
    const totalAttempts = classes.reduce((a, c) => a + c.attempts, 0);
    return {
      active: classes.some((c) => c.dreamState !== 'dormant'),
      furthestStage: furthest?.reached ?? 'none',
      furthestClass: furthest?.klass ?? null,
      region: furthest?.region ?? null,
      qualifiedForNational: classes.some((c) => STAGE_ORDER[c.reached] >= STAGE_ORDER.regional),
      totalAttempts,
      classes,
      milestoneCount: this.milestones.length,
      headline: this._headline(furthest),
    };
  }

  _headline(furthest) {
    if (!furthest || furthest.reached === 'none') {
      const chasing = Object.values(this.byClass).some((r) => r.dreamState === 'chasing' || r.eliminated);
      return chasing ? 'The dream is alive — still chasing that first transfer.' : 'The Road to Loretta’s hasn’t started yet.';
    }
    if (furthest.reached === 'regional') return `Qualified for Loretta Lynn’s in ${furthest.klass}. See you at the Ranch.`;
    if (furthest.reached === 'area') return `Through the ${furthest.region} Area in ${furthest.klass} — Regional next.`;
    return 'On the Road to Loretta’s.';
  }

  // ---- serialization -------------------------------------------------------
  toJSON() {
    return { byClass: this.byClass, milestones: this.milestones, seen: [...this._seen] };
  }
  static fromJSON(data) {
    const p = new LorettasPath();
    if (!data) return p;
    p.byClass = data.byClass ?? {};
    p.milestones = data.milestones ?? [];
    p._seen = new Set(data.seen ?? []);
    return p;
  }
}

// Tiny local ordinal (kept here so the module stays dependency-free).
function ordinalish(n) {
  const s = ['th', 'st', 'nd', 'rd'], v = n % 100;
  return n + (s[(v - 20) % 10] ?? s[v] ?? s[0]);
}
