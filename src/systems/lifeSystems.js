// P1 Life Systems
// ---------------
// Deterministic helpers for systems that shape the life sim around racing:
// economy, media, weather/surface, education, fitness, travel, crew, routine,
// community, equipment, family aging, contracts, goals, coaching, and sport
// evolution. These are intentionally pure so UI/engines can adopt them safely.

const clamp = (v, lo = 0, hi = 100) => Math.max(lo, Math.min(hi, v));

export function economySnapshot({ week = 1, region = 'local', sponsorHeat = 0, fuelPressure = 0 } = {}) {
  const regionMult = { local: 1, regional: 1.18, national: 1.42 }[region] ?? 1;
  const inflation = 1 + Math.min(0.35, week * 0.006 + fuelPressure * 0.004);
  return {
    week,
    region,
    entryFeeMultiplier: Number((regionMult * inflation).toFixed(2)),
    usedBikeDemand: clamp(45 + sponsorHeat * 0.4 + fuelPressure * 0.2),
    partsAvailability: clamp(82 - fuelPressure * 0.25 - sponsorHeat * 0.1),
  };
}

export function mediaBeat({ result = null, rivalry = 0, lorettaStage = null, sponsorTier = null } = {}) {
  const importance = (result?.overall === 1 ? 40 : result?.overall <= 3 ? 25 : 8)
    + rivalry * 0.25 + (lorettaStage ? 25 : 0) + (sponsorTier === 'national' ? 15 : 0);
  return {
    channel: importance >= 60 ? 'MotoNews' : importance >= 30 ? 'Local Paddock' : 'Pit Talk',
    importance: Math.round(importance),
    headline: result ? `${result.name ?? 'Rider'} ${result.overall === 1 ? 'wins' : 'finishes ' + result.overall}` : 'Quiet week around the pits',
  };
}

export function weatherForecast({ seed = 1, seasonWeek = 1 } = {}) {
  const roll = ((seed * 9301 + seasonWeek * 49297) % 233280) / 233280;
  if (roll < 0.18) return { condition: 'mud', risk: 75, prep: ['fresh goggles', 'mud tires', 'extra tearoffs'] };
  if (roll < 0.34) return { condition: 'rain', risk: 58, prep: ['rain gear', 'sealed airbox'] };
  if (roll > 0.86) return { condition: 'heat', risk: 62, prep: ['hydration', 'shade', 'cool-down plan'] };
  return { condition: 'clear', risk: 20, prep: ['normal prep'] };
}

export function trackSurface({ weather = 'clear', motosRun = 0, maintenance = 50 } = {}) {
  const roughness = clamp(25 + motosRun * 7 + (weather === 'mud' ? 28 : weather === 'heat' ? 12 : 0) - maintenance * 0.25);
  return {
    roughness,
    preferredSkill: roughness > 65 ? 'whoops' : weather === 'mud' ? 'cornering' : 'starts',
    mistakeRisk: clamp(10 + roughness * 0.45),
  };
}

export function educationStatus({ age = 12, schoolMode = 'school', didSchoolwork = true, travelDays = 0 } = {}) {
  const schoolAge = age >= 6 && age < 18;
  if (!schoolAge) return { required: false, standing: 'not_applicable', risk: 0 };
  const risk = clamp((didSchoolwork ? 10 : 45) + travelDays * (schoolMode === 'homeschool' ? 3 : 7));
  return { required: true, standing: risk > 65 ? 'at_risk' : risk > 35 ? 'watch' : 'good', risk };
}

export function nutritionFitness({ meals = 'normal', sleepHours = 8, trainingLoad = 1 } = {}) {
  const mealScore = { poor: -12, normal: 0, strong: 8 }[meals] ?? 0;
  const recovery = clamp(50 + mealScore + (sleepHours - 7) * 8 - trainingLoad * 9);
  return { recovery, fatigueDelta: recovery >= 60 ? -8 : recovery < 35 ? 8 : 0, injuryRiskModifier: recovery < 40 ? 12 : -4 };
}

export function crewPlan({ familyAvailable = true, mechanic = false, budget = 0 } = {}) {
  const roles = ['parent'];
  if (mechanic && budget >= 80) roles.push('mechanic');
  if (familyAvailable) roles.push('family_support');
  return { roles, cost: roles.includes('mechanic') ? 80 : 0, readinessBonus: roles.length * 4 };
}

export function travelPlan({ distance = 0, budget = 0, schoolDays = 0 } = {}) {
  const cost = Math.round(distance * 35 + (distance >= 4 ? 120 : 0));
  return {
    cost,
    days: distance >= 6 ? 3 : distance >= 2 ? 2 : 1,
    feasible: budget >= cost,
    schoolImpact: schoolDays + (distance >= 4 ? 1 : 0),
  };
}

export function raceDayRoutine({ wokeUpOnTime = true, bikeLoaded = true, breakfast = true, nerves = 50 } = {}) {
  const score = clamp(50 + (wokeUpOnTime ? 12 : -18) + (bikeLoaded ? 15 : -25) + (breakfast ? 8 : -8) - nerves * 0.15);
  return { score: Math.round(score), status: score >= 70 ? 'dialed' : score >= 45 ? 'messy' : 'chaotic' };
}

export function communityStanding({ localRaces = 0, helpedOthers = 0, conflict = 0 } = {}) {
  return { standing: clamp(35 + localRaces * 4 + helpedOthers * 9 - conflict * 12) };
}

export function equipmentWear({ gear = {}, crash = false, motos = 0 } = {}) {
  const next = { ...gear };
  for (const key of ['helmet', 'boots', 'goggles', 'brace']) {
    next[key] = clamp((next[key] ?? 100) - motos * 3 - (crash ? (key === 'helmet' ? 35 : 12) : 0));
  }
  return next;
}

export function familyTreeTick(family = [], years = 1) {
  return family.map((p) => ({ ...p, age: (p.age ?? 0) + years, stage: ((p.age ?? 0) + years) >= 18 ? 'adult' : 'minor' }));
}

export function contractEvaluation({ age = 16, trust = 50, sponsorTier = 'local', value = 0 } = {}) {
  const guardianRequired = age < 18;
  const risk = clamp((guardianRequired ? 25 : 5) + (100 - trust) * 0.25 + (sponsorTier === 'national' ? 12 : 0));
  return { guardianRequired, risk, recommended: value > risk * 8 && trust >= 45 };
}

export function dynamicGoals(state = {}) {
  const goals = [];
  if ((state.money ?? 0) < 300) goals.push({ id: 'stabilize_budget', label: 'Stabilize the budget' });
  if ((state.bikeCondition ?? 100) < 55) goals.push({ id: 'repair_bike', label: 'Repair the bike' });
  if ((state.bestFinish ?? 99) > 5) goals.push({ id: 'top_five', label: 'Chase a top-five finish' });
  if (state.lorettaEligible) goals.push({ id: 'qualify_lorettas', label: "Chase Loretta's" });
  return goals;
}

export function coachPlan({ weakness = 'starts', budget = 0, trust = 50 } = {}) {
  const sessions = budget >= 120 ? 2 : budget >= 60 ? 1 : 0;
  return { sessions, focus: weakness, expectedGain: sessions * (trust >= 60 ? 3 : 2) };
}

export function sportEvolution({ year = 2026, safetyFocus = 50 } = {}) {
  return {
    year,
    trends: [
      year >= 2028 ? 'more electric minis' : 'two-stroke youth classes remain strong',
      safetyFocus >= 70 ? 'stricter concussion protocol' : 'standard safety protocol',
    ],
  };
}
