// Game Orchestrator
// -----------------
// Ties the engines together, owns the weekly loop, and exposes the small helper
// API that content (activities and scenarios) calls to mutate the world. Also
// home to the Simulation Depth logic (DD-0020): what a given depth auto-lives
// versus pauses for.

import { RNG } from './core/rng.js';
import { EventBus } from './core/eventBus.js';
import { createInitialState } from './core/state.js';
import { CALENDAR, ACTIVITIES } from './data/content.js';
import { MemoryEngine } from './engines/memoryEngine.js';
import { RelationshipEngine } from './engines/relationshipEngine.js';
import { WorldEngine } from './engines/worldEngine.js';
import { StoryEngine } from './engines/storyEngine.js';
import { OpportunityEngine } from './engines/opportunityEngine.js';
import { MarketplaceEngine } from './engines/marketplaceEngine.js';
import { RaceSession } from './engines/raceEngine.js';

const clamp = (v, lo = 0, hi = 100) => Math.max(lo, Math.min(hi, v));

export const SIM_DEPTHS = {
  detailed: {
    key: 'detailed',
    label: 'Detailed',
    blurb: 'Plan every week and ride every lap. Live one career, deeply.',
    scenarioThreshold: 0, // pause for everything
    autoPlan: false,
    autoRace: false,
  },
  key: {
    key: 'key',
    label: 'Key Moments',
    blurb: 'The sim lives the routine weeks. You handle the big decisions and the races.',
    scenarioThreshold: 45, // only pause for important scenarios
    autoPlan: true,
    autoRace: false, // still choose ride-or-sim at the gate
  },
  fast: {
    key: 'fast',
    label: 'Fast Sim',
    blurb: 'The whole season auto-plays into a recap. Run many lives, explore many choices.',
    scenarioThreshold: 999, // pause for nothing
    autoPlan: true,
    autoRace: true,
  },
};

export class Game {
  constructor({ riderName = 'Riley', seed = Date.now(), depth = 'detailed' } = {}) {
    this.state = createInitialState(riderName, seed);
    this.state.simDepth = depth;
    this.rng = new RNG(seed);
    this.bus = new EventBus();

    this.memory = new MemoryEngine(this);
    this.relationships = new RelationshipEngine(this);
    this.world = new WorldEngine(this);
    this.story = new StoryEngine(this);
    this.market = new MarketplaceEngine(this);
    this.opportunity = new OpportunityEngine(this);
    this.opportunity.wire();

    this.currentRace = null;
    this._weekLog = null;
    this._preparedWeek = 0;

    // Seed an initial marketplace.
    this.market.refresh(true);
  }

  // ---- convenience getters -------------------------------------------------
  get week() { return this.state.week; }
  get rider() { return this.state.rider; }
  get family() { return this.state.family; }
  get bike() { return this.state.bike; }
  get garage() { return this.state.garage; }
  get season() { return this.state.season; }
  get depth() { return SIM_DEPTHS[this.state.simDepth]; }

  // ---- helper API used by content -----------------------------------------
  rel(id) { return this.relationships.of(id); }

  addMoney(n) { this.family.money = Math.max(0, this.family.money + Math.round(n)); }
  spend(n) {
    if (this.family.money < n) return false;
    this.family.money -= Math.round(n);
    return true;
  }
  addNews(text, tag = 'news') {
    this.state.news.unshift({ week: this.week, text, tag });
    this.state.news = this.state.news.slice(0, 24);
  }
  log(text) {
    if (this._weekLog) this._weekLog.lines.push(text);
  }
  skill(name, delta) {
    if (this.rider.skills[name] === undefined) return;
    this.rider.skills[name] = clamp(this.rider.skills[name] + delta);
  }
  confidence(delta) { this.rider.confidence = clamp(this.rider.confidence + delta); }
  fatigue(delta) { this.rider.fatigue = clamp(this.rider.fatigue + delta); }
  stress(delta) { this.family.stress = clamp(this.family.stress + delta); }
  bikeCondition(delta) { this.bike.condition = clamp(this.bike.condition + delta); }
  bikeReliability(delta) { this.bike.reliability = clamp(this.bike.reliability + delta); }
  bikeMemoryMaybe(text, force = false) {
    if (force || this.rng.chance(0.5)) this.bike.memories.push({ week: this.week, text });
  }
  setFlag(k, v = true) { this.state.flags[k] = v; }
  flag(k) { return !!this.state.flags[k]; }
  grantOpportunity(opp) {
    if (this.state.opportunities.some((o) => o.id === opp.id)) return;
    this.state.opportunities.push({ ...opp, week: this.week });
    this.addNews('Opportunity: ' + opp.title, 'opportunity');
  }
  setSupportLevel(n) {
    if (n > this.family.support_level) {
      this.family.support_level = n;
      this.bus.emit('support:changed', { level: n, week: this.week });
    }
  }

  // ---- weekly loop ---------------------------------------------------------
  meta(week = this.week) {
    return CALENDAR.find((c) => c.week === week);
  }
  isRaceWeek(week = this.week) {
    return !!this.meta(week)?.race;
  }
  isSeasonOver() {
    return this.week > 12;
  }

  // Start-of-week world ticks. Idempotent per week.
  prepareWeek() {
    if (this._preparedWeek === this.week) return;
    this._preparedWeek = this.week;
    this._weekLog = { week: this.week, title: this.meta()?.title ?? `Week ${this.week}`, lines: [] };

    // Injuries heal over time.
    if (this.rider.injury && this.rider.injury.weeksOut > 0) {
      this.rider.injury.weeksOut -= 1;
      if (this.rider.injury.weeksOut <= 0) {
        this.log(`Your ${this.rider.injury.name.toLowerCase()} has healed up.`);
        this.rider.injury = null;
      }
    }
    // Support-ladder perk: the shop quietly covers consumables.
    if (this.family.support_level >= 1) {
      this.addMoney(30);
    }
    // The world moves on its own.
    this.world.tick();
    // Occasionally the board turns over without the player looking.
    if (this.rng.chance(0.5)) this.market.refresh(false);
  }

  planningSlots() {
    return this.isRaceWeek() ? 1 : 2;
  }

  activityById(id) {
    return ACTIVITIES.find((a) => a.id === id);
  }

  // Heuristic auto-planner for simulated weeks (DD-0020).
  autoPlan() {
    const slots = this.planningSlots();
    const picks = [];
    const need = [];
    if (this.bike.condition < 55 || this.bike.reliability < 55) need.push('wrench');
    if (this.rider.fatigue > 55) need.push('rest');
    if (!this.flag('grades_good') && this.rng.chance(0.4)) need.push('school');
    if (this.family.money < 250) need.push('odd_jobs');
    const defaults = this.isRaceWeek() ? ['wrench', 'fitness', 'rest'] : ['practice', 'fitness', 'wrench', 'family'];
    for (const id of [...need, ...defaults]) {
      if (picks.length >= slots) break;
      if (!picks.includes(id)) picks.push(id);
    }
    return picks.slice(0, slots);
  }

  runSchedule(activityIds) {
    const results = [];
    for (const id of activityIds) {
      const act = this.activityById(id);
      if (!act) continue;
      if (act.cost) {
        const cost = id === 'wrench' && this.family.support_level >= 1 ? 0 : act.cost;
        if (cost > 0 && !this.spend(cost)) {
          this.stress(4);
          results.push({ name: act.name, icon: act.icon, outcome: `Money was too tight — Dad covered the $${cost}, and felt it.` });
          // still run the activity; the family made it work
        }
      }
      const outcome = act.run(this);
      results.push({ name: act.name, icon: act.icon, outcome });
      this.log(`${act.icon} ${act.name}: ${outcome}`);
    }
    this.state.schedule = activityIds;
    return results;
  }

  // ---- scenarios -----------------------------------------------------------
  drawScenario() {
    const scenario = this.story.pick();
    this.state.pendingScenario = scenario ? scenario.id : null;
    this._pending = scenario;
    return scenario;
  }
  scenarioImportance(scenario) {
    return this.story.importanceOf(scenario);
  }
  shouldPauseForScenario(scenario) {
    if (!scenario) return false;
    return this.scenarioImportance(scenario) >= this.depth.scenarioThreshold;
  }
  resolveScenario(scenario, choiceIndex) {
    const choice = scenario.choices[choiceIndex] ?? scenario.choices[0];
    const outcome = choice.effect(this);
    this.story.markUsed(scenario);
    this.log(`📖 ${scenario.title} — ${choice.label}: ${outcome}`);
    this.state.pendingScenario = null;
    return { title: scenario.title, choice: choice.label, outcome };
  }
  autoResolveScenario(scenario) {
    return this.resolveScenario(scenario, this.story.autoPick(scenario));
  }

  // ---- race weekend --------------------------------------------------------
  buildRace() {
    this.currentRace = new RaceSession(this, this.meta().race);
    return this.currentRace;
  }

  applyRaceResult(result) {
    const st = this.state;
    const first = !this.flag('had_race');
    this.setFlag('had_race', true);

    // Physical toll & confidence swing.
    this.fatigue(26);
    this.bikeCondition(-15);
    const overall = result.overall;
    if (result.dnf) this.confidence(-8);
    else if (overall <= 3) this.confidence(11);
    else if (overall <= 5) this.confidence(4);
    else if (overall > result.fieldSize / 2) this.confidence(-5);

    // Rival relationship reacts to the head-to-head.
    if (result.rivalOverall) {
      if (overall < result.rivalOverall) {
        this.rel('rival_ethan').change('rivalry', 3);
        this.rel('rival_ethan').change('respect', 3);
      } else {
        this.rel('rival_ethan').change('rivalry', 2);
      }
    }

    // Season bookkeeping.
    st.season.results.push({
      week: this.week,
      race: result.race.name,
      kind: result.race.kind,
      motos: result.motos,
      overall,
      points: result.points,
      dnf: result.dnf,
    });
    st.season.points += result.points;
    if (st.season.bestFinish === null || overall < st.season.bestFinish) st.season.bestFinish = overall;

    // Milestone memories (DD-0002).
    if (first) {
      this.memory.record({
        type: 'personal',
        title: 'Your First Race',
        summary: `You lined up for your first real race of the season and came home ${ordinal(overall)}.`,
        emotion: ['nerves', 'excitement'],
        tags: ['first_time', 'racing'],
        importance: 74,
        force: true,
      });
    }
    if (overall === 1 && !this.flag('had_win')) {
      this.setFlag('had_win');
      this.memory.record({
        type: 'race_result',
        title: 'First Win',
        summary: `You won ${result.race.name}! First place, overall. The whole pit heard about it.`,
        emotion: ['joy', 'pride', 'relief'],
        people: ['dad', 'mom'],
        tags: ['first_time', 'milestone', result.race.kind, 'comeback'],
        importance: 90,
        force: true,
      });
      this.garage.trophies.push({ name: `1st Overall — ${result.race.name}`, week: this.week });
      this.garage.objects.push({ name: 'Winning number plate', memory: `From your first win at ${result.race.name}.` });
    } else if (overall <= 3 && !this.flag('had_podium')) {
      this.setFlag('had_podium');
      this.memory.record({
        type: 'race_result',
        title: 'First Podium',
        summary: `You stood on the box — ${ordinal(overall)} overall at ${result.race.name}.`,
        emotion: ['pride', 'joy'],
        tags: ['first_time', 'milestone', result.race.kind],
        importance: 80,
        force: true,
      });
      this.garage.trophies.push({ name: `${ordinal(overall)} Overall — ${result.race.name}`, week: this.week });
    }

    this.log(`🏁 ${result.race.name}: ${result.dnf ? 'DNF' : ordinal(overall) + ' overall'} (+${result.points} pts).`);
    this.currentRace = null;
    return result;
  }

  // ---- advance -------------------------------------------------------------
  advanceWeek() {
    // Natural weekly recovery so fatigue doesn't spiral.
    this.fatigue(-6);
    this.stress(-2);
    if (this._weekLog) this.state.logbook.push(this._weekLog);
    this.state.week += 1;
    this.state.schedule = [];
    this.state.pendingScenario = null;
    this._pending = null;
  }
}

function ordinal(n) {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

export { ordinal };
