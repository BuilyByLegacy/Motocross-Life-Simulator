// Story Engine
// ------------
// "Given everything that has happened so far, what is the most believable thing
// that could happen next?" — DD-0017.
//
// The engine does not script sequences. Each scenario card exposes a weight()
// that reads world state; the engine samples from the eligible cards. Quiet
// weeks are a real outcome (Story Rhythm), so big weeks land harder.

import { SCENARIOS } from '../data/content.js';

export class StoryEngine {
  constructor(game) {
    this.game = game;
    this.used = new Set();
  }

  // Pick the next believable scenario, or null for a quiet week.
  pick() {
    const g = this.game;
    const eligible = SCENARIOS.filter((s) => {
      if (s.once && this.used.has(s.id)) return false;
      const w = s.weight ? s.weight(g) : 1;
      return w > 0;
    });
    if (eligible.length === 0) return null;

    // Weighted sample.
    const weights = eligible.map((s) => (s.weight ? s.weight(g) : 1));
    const total = weights.reduce((a, b) => a + b, 0);
    let roll = g.rng.next() * total;
    let chosen = eligible[0];
    for (let i = 0; i < eligible.length; i++) {
      roll -= weights[i];
      if (roll <= 0) {
        chosen = eligible[i];
        break;
      }
    }
    return chosen;
  }

  // Estimate how important a scenario is *before* it's resolved, so the
  // simulation-depth system knows whether to pause for it (DD-0020).
  importanceOf(scenario) {
    if (!scenario) return 0;
    const cat = scenario.category;
    const big = { Sponsor: 70, Injury: 66, Coach: 64, Money: 58, World: 60 };
    const mid = { Equipment: 48, Social: 44, School: 46, Family: 40 };
    if (scenario.once) return (big[cat] ?? mid[cat] ?? 50) + 8;
    return big[cat] ?? mid[cat] ?? 38;
  }

  markUsed(scenario) {
    if (scenario) this.used.add(scenario.id);
  }

  // Auto-resolution policy for simulated (non-detailed) play. Picks the choice
  // a sensible, family-minded rider would make: keep the bike healthy, respect
  // school and money, avoid needless injury risk. Returns the choice index.
  autoPick(scenario) {
    if (scenario.autoPick) return scenario.autoPick(this.game);
    // Default heuristic: prefer the first (engaged / relationship-positive)
    // choice, unless the rider is already run down and it looks risky.
    if (scenario.id === 'injury_scare' && this.game.rider.fatigue > 40) return 0; // rest
    if (scenario.id === 'mom_school' && !this.game.flag('grades_good')) return 0; // keep promise
    return 0;
  }
}
