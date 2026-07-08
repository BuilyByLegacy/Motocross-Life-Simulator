// Season Planner — event-based season planning (issues #53–#57)
// -------------------------------------------------------------
// Careers are not linear: the player builds a season from individual events
// (local races, qualifiers, regionals, nationals) rather than picking a generic
// "series size". This module is pure domain logic — it produces structured data
// (costs, travel, conflicts, review) and generates calendar entries, but does
// not implement gameplay outcomes.
//
//   #53 event-based planner (add/remove, generate calendar entries, summaries)
//   #54 season goals & priorities
//   #55 budget & travel forecasting
//   #56 commitment / lock-in state machine
//   #57 season plan review summary

import { CareerCalendar, makeEntry } from './careerCalendar.js';

export const PLAN_STATES = ['draft', 'tentative', 'committed', 'withdrawn', 'missed'];

export const GOAL_TYPES = {
  qualify_lorettas: 'Qualify for Loretta Lynn’s',
  improve_class: 'Improve in class',
  preserve_budget: 'Preserve the budget',
  family_time: 'Balance family time',
  rebuild_injury: 'Rebuild after injury',
  win_title: 'Win a championship',
};

// Cost assumptions (deterministic, tunable). Distances are "hours from home".
const COST = {
  fuelPerHour: 10, // one way, per hour
  lodgingPerNight: 80,
  foodPerDay: 25,
  maintenancePerRace: 45,
  contingencyRate: 0.1,
};

let _gid = 0;
const goalId = () => `goal_${(_gid++).toString(36)}`;

export class SeasonPlanner {
  // `availableEvents`: [{ id, day, title, level, location:{name,distance}, entryFee, category }]
  constructor(availableEvents = [], { seasonDays = 84 } = {}) {
    this.seasonDays = seasonDays;
    this.available = new Map(availableEvents.map((e) => [e.id, e]));
    this.planned = new Map(); // id -> { state, note }
    this.goals = []; // { id, type, priority, description, linkedEvents:[], state }
  }

  // ---- #53 add / remove / update planned events ---------------------------
  addEvent(id, state = 'draft') {
    if (!this.available.has(id)) return false;
    this.planned.set(id, { state, note: '' });
    return true;
  }
  removeEvent(id) {
    return this.planned.delete(id);
  }
  setState(id, state) {
    if (!this.planned.has(id) || !PLAN_STATES.includes(state)) return false;
    this.planned.get(id).state = state;
    return true;
  }
  // Events that count as "on the schedule" (not withdrawn/missed).
  selectedEvents() {
    return [...this.planned.entries()]
      .filter(([, p]) => p.state !== 'withdrawn' && p.state !== 'missed')
      .map(([id, p]) => ({ ...this.available.get(id), state: p.state }))
      .filter((e) => e.id)
      .sort((a, b) => a.day - b.day);
  }

  // ---- #54 goals -----------------------------------------------------------
  addGoal({ type, priority = 3, description = '', linkedEvents = [] }) {
    const g = { id: goalId(), type, priority, description: description || GOAL_TYPES[type] || type, linkedEvents, state: 'active' };
    this.goals.push(g);
    return g;
  }
  editGoal(id, patch) {
    const g = this.goals.find((x) => x.id === id);
    if (g) Object.assign(g, patch);
    return g ?? null;
  }
  setGoalState(id, state) {
    const g = this.goals.find((x) => x.id === id);
    if (g && ['active', 'completed', 'failed', 'abandoned'].includes(state)) { g.state = state; return true; }
    return false;
  }
  // Which selected events support / conflict with a goal.
  goalAlignment(goal) {
    const sel = this.selectedEvents();
    const supports = [];
    const conflicts = [];
    for (const e of sel) {
      if (goal.type === 'qualify_lorettas' && (e.category === 'qualifier' || e.level === 'regional' || e.level === 'national')) supports.push(e.id);
      if (goal.type === 'win_title' && e.level === 'local') supports.push(e.id);
      if (goal.type === 'preserve_budget' && (e.level === 'national' || e.level === 'regional')) conflicts.push(e.id);
      if (goal.type === 'family_time' && (e.location?.distance ?? 0) >= 3) conflicts.push(e.id);
    }
    return { supports, conflicts };
  }

  // ---- #55 budget & travel forecasting ------------------------------------
  forecastEvent(e) {
    const dist = e.location?.distance ?? 0;
    const raceDays = 2; // a race weekend
    const nights = dist >= 3 ? (e.level === 'national' ? 2 : 1) : 0;
    const fuel = Math.round(dist * 2 * COST.fuelPerHour);
    const lodging = nights * COST.lodgingPerNight;
    const food = raceDays * COST.foodPerDay + nights * COST.foodPerDay;
    const maintenance = COST.maintenancePerRace;
    const entry = e.entryFee ?? 0;
    const subtotal = entry + fuel + lodging + food + maintenance;
    const contingency = Math.round(subtotal * COST.contingencyRate);
    return {
      eventId: e.id, entry, fuel, lodging, food, maintenance, contingency,
      total: subtotal + contingency,
      travelDays: dist >= 3 ? 3 : dist >= 1 ? 2 : 1,
      distance: dist,
    };
  }
  forecast(availableBudget = null) {
    const perEvent = this.selectedEvents().map((e) => this.forecastEvent(e));
    const sum = (k) => perEvent.reduce((a, f) => a + f[k], 0);
    const season = {
      entry: sum('entry'), fuel: sum('fuel'), lodging: sum('lodging'), food: sum('food'),
      maintenance: sum('maintenance'), contingency: sum('contingency'),
      total: sum('total'), travelDays: sum('travelDays'), distance: sum('distance'),
    };
    // High-risk periods: any three-week window whose event costs exceed a share
    // of the available budget (or of the season total when no budget given).
    const cap = availableBudget ?? season.total;
    const highRisk = [];
    const sel = this.selectedEvents();
    for (let i = 0; i < sel.length; i++) {
      const windowEvents = sel.filter((e) => Math.abs(e.day - sel[i].day) <= 21);
      const windowCost = windowEvents.reduce((a, e) => a + this.forecastEvent(e).total, 0);
      if (cap > 0 && windowCost > cap * 0.45) {
        highRisk.push({ aroundDay: sel[i].day, cost: windowCost, events: windowEvents.map((e) => e.id) });
      }
    }
    return {
      perEvent,
      season,
      overBudget: availableBudget != null ? season.total > availableBudget : null,
      shortfall: availableBudget != null ? Math.max(0, season.total - availableBudget) : null,
      highRiskPeriods: highRisk,
    };
  }

  // ---- #56 commitment / lock-in + calendar generation ---------------------
  commit() {
    let n = 0;
    for (const p of this.planned.values()) {
      if (p.state === 'draft' || p.state === 'tentative') { p.state = 'committed'; n++; }
    }
    return n;
  }
  withdraw(id, reason = '') {
    const p = this.planned.get(id);
    if (!p) return false;
    p.state = 'withdrawn';
    p.withdrawReason = reason;
    p.withdrawCost = Math.round((this.available.get(id)?.entryFee ?? 0) * 0.5); // lose half the entry
    return true;
  }
  // Generate a CareerCalendar from the plan: an entry per selected event, plus a
  // registration-close deadline two weeks before each (#53, #56, #51).
  buildCalendar() {
    const cal = new CareerCalendar({ seasonDays: this.seasonDays });
    for (const e of this.selectedEvents()) {
      cal.add(makeEntry({
        startDay: e.day, durationDays: 2, category: e.category === 'qualifier' ? 'qualifier' : 'race',
        title: e.title, priority: e.level === 'national' ? 5 : e.level === 'regional' ? 4 : 3,
        location: e.location, meta: { eventId: e.id, level: e.level, related: [e.id] },
        deadline: { dueDay: Math.max(0, e.day - 14), severity: 'hard', linkedId: e.id, state: e.state === 'committed' ? 'completed' : 'upcoming' },
      }));
    }
    return cal;
  }

  // ---- #57 season plan review summary -------------------------------------
  reviewSummary(availableBudget = null) {
    const sel = this.selectedEvents();
    const fc = this.forecast(availableBudget);
    const conflicts = this.buildCalendar().conflicts();
    const byLevel = sel.reduce((m, e) => ((m[e.level] = (m[e.level] || 0) + 1), m), {});
    const goalAlignment = this.goals.map((g) => ({ goal: g, ...this.goalAlignment(g) }));

    // Loretta prerequisites (#57 / lays groundwork for #58-62): if the player
    // has a qualify-for-Loretta's goal but no qualifier on the schedule, flag it.
    const lorettaGoal = this.goals.find((g) => g.type === 'qualify_lorettas' && g.state === 'active');
    const lorettaWarnings = [];
    if (lorettaGoal) {
      // The Loretta's path starts with an area qualifier — racing nationals
      // alone doesn't get you there (full chain lives in the Loretta epic).
      if (!sel.some((e) => e.category === 'qualifier')) {
        lorettaWarnings.push('Your Loretta’s goal needs an area qualifier on the schedule — right now there’s no path to the ranch.');
      }
    }

    const riskNotes = [];
    if (fc.overBudget) riskNotes.push(`This program runs about $${fc.shortfall} past your budget — something has to give.`);
    if (fc.season.travelDays >= 8) riskNotes.push(`${fc.season.travelDays} days on the road this year. That’s a lot of school missed and dinners in the truck.`);
    for (const c of conflicts) if (c.severity === 'hard') riskNotes.push(c.message);
    for (const ga of goalAlignment) {
      if (ga.conflicts.length && ga.goal.state === 'active') {
        riskNotes.push(`${ga.conflicts.length} event(s) pull against your goal to ${GOAL_TYPES[ga.goal.type] ?? ga.goal.type}.`);
      }
    }

    return {
      keyEvents: sel.slice(0, 6).map((e) => ({ id: e.id, title: e.title, day: e.day, level: e.level })),
      totalRaces: sel.length,
      byLevel,
      travelDays: fc.season.travelDays,
      estimatedCost: fc.season.total,
      overBudget: fc.overBudget,
      shortfall: fc.shortfall,
      conflicts,
      goalAlignment,
      lorettaWarnings,
      riskNotes,
    };
  }

  // ---- serialization -------------------------------------------------------
  toJSON() {
    return {
      seasonDays: this.seasonDays,
      available: [...this.available.values()],
      planned: [...this.planned.entries()].map(([id, p]) => ({ id, ...p })),
      goals: this.goals,
    };
  }
  static fromJSON(data) {
    const p = new SeasonPlanner(data.available ?? [], { seasonDays: data.seasonDays });
    for (const pl of data.planned ?? []) p.planned.set(pl.id, { state: pl.state, note: pl.note ?? '', withdrawReason: pl.withdrawReason, withdrawCost: pl.withdrawCost });
    p.goals = data.goals ?? [];
    return p;
  }
}
