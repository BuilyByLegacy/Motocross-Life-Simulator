// Game State
// ----------
// The single source of truth for one playthrough. Kept as plain data so it can
// be serialized (save/load) and inspected. Engines never store their own copy
// of the world; they read and mutate this.

import { PEOPLE, STARTING_BIKE } from '../data/content.js';

let _uid = 0;
export function uid(prefix = 'id') {
  return `${prefix}_${Date.now().toString(36)}_${(_uid++).toString(36)}`;
}

export function createInitialState(riderName = 'Riley', seed = Date.now()) {
  const relationships = {};
  for (const p of PEOPLE) {
    relationships[p.id] = {
      id: p.id,
      name: p.name,
      role: p.role,
      // Hidden values, expressed through behavior (Relationship Engine).
      values: { ...p.startValues },
      arcStage: p.arcStages ? 0 : null,
      sharedMemories: [],
    };
  }

  return {
    seed,
    week: 1,
    phase: 'planning', // planning | scenario | prerace | race | recap | season_over

    rider: {
      name: riderName,
      age: 9,
      klass: '65cc',
      // Skills, 0-100. Expectation inputs for the race sim.
      skills: {
        starts: 34,
        cornering: 38,
        jumping: 30,
        whoops: 28,
        raceIQ: 32,
        consistency: 40,
        fitness: 45,
      },
      confidence: 50, // 0-100, volatile
      fatigue: 0, // 0-100, higher = worse
      injury: null, // { name, weeksOut, severity }
    },

    family: {
      money: 1200,
      stress: 20, // 0-100 household stress (Parent Marriage / world sim)
      // Parent approval, hidden, gates certain choices.
      support_level: 0, // Career Support Ladder (0 = Family Supported)
    },

    // The race bike is an Asset with identity and history (DD-0011).
    bike: STARTING_BIKE(),

    garage: {
      trophies: [],
      objects: [], // object-memory carrying items (helmets, plates...)
      parts: [], // owned spare parts / gear not yet installed
    },

    relationships,

    memories: [],
    news: [],

    season: {
      results: [], // { week, race, moto1, moto2, overall, points }
      points: 0,
      bestFinish: null,
    },

    market: {
      listings: [], // active marketplace listings
      seenIds: [],
    },

    opportunities: [], // open opportunities (Opportunity Engine)
    flags: {},
    schedule: [], // activities chosen for the current week
    pendingScenario: null,
    lastRace: null, // transient race result for the race screen
    logbook: [], // human-readable week-by-week diary for the recap
  };
}
