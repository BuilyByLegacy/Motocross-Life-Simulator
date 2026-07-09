import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  coachPlan,
  communityStanding,
  contractEvaluation,
  dynamicGoals,
  economySnapshot,
  educationStatus,
  equipmentWear,
  familyTreeTick,
  mediaBeat,
  nutritionFitness,
  raceDayRoutine,
  sportEvolution,
  trackSurface,
  travelPlan,
  weatherForecast,
  crewPlan,
} from '../src/systems/lifeSystems.js';

test('#126 economy snapshot changes cost and availability pressure', () => {
  const local = economySnapshot({ week: 1, region: 'local' });
  const national = economySnapshot({ week: 10, region: 'national', sponsorHeat: 50, fuelPressure: 50 });
  assert.ok(national.entryFeeMultiplier > local.entryFeeMultiplier);
  assert.ok(national.partsAvailability < local.partsAvailability);
});

test('#129 media beat scales with results, rivalry, and Loretta stakes', () => {
  const quiet = mediaBeat();
  const big = mediaBeat({ result: { name: 'Riley', overall: 1 }, rivalry: 80, lorettaStage: 'regional', sponsorTier: 'national' });
  assert.ok(big.importance > quiet.importance);
  assert.equal(big.channel, 'MotoNews');
});

test('#136/#137 weather and track surface affect risk', () => {
  const weather = weatherForecast({ seed: 3, seasonWeek: 4 });
  const surface = trackSurface({ weather: weather.condition, motosRun: 6, maintenance: 20 });
  assert.ok(surface.roughness >= 0 && surface.mistakeRisk > 10);
});

test('#144/#145 education and nutrition produce risk/recovery states', () => {
  assert.equal(educationStatus({ age: 13, didSchoolwork: false, travelDays: 3 }).standing, 'at_risk');
  assert.ok(nutritionFitness({ meals: 'strong', sleepHours: 9, trainingLoad: 1 }).recovery > 60);
});

test('#146/#147/#148 crew, travel, and race-day routine are deterministic', () => {
  assert.ok(crewPlan({ familyAvailable: true, mechanic: true, budget: 100 }).roles.includes('mechanic'));
  assert.equal(travelPlan({ distance: 5, budget: 50 }).feasible, false);
  assert.equal(raceDayRoutine({ wokeUpOnTime: false, bikeLoaded: false }).status, 'chaotic');
});

test('#149/#150/#151 community, equipment, and family aging update state', () => {
  assert.ok(communityStanding({ localRaces: 5, helpedOthers: 2 }).standing > 50);
  assert.ok(equipmentWear({ gear: { helmet: 100 }, crash: true }).helmet < 100);
  assert.equal(familyTreeTick([{ name: 'Kid', age: 17 }], 1)[0].stage, 'adult');
});

test('#152/#153/#154/#156 contracts, goals, coach plan, and sport evolution', () => {
  assert.equal(contractEvaluation({ age: 16, trust: 70, value: 800 }).guardianRequired, true);
  assert.ok(dynamicGoals({ money: 100, bikeCondition: 40, lorettaEligible: true }).length >= 3);
  assert.equal(coachPlan({ weakness: 'starts', budget: 150, trust: 80 }).expectedGain, 6);
  assert.ok(sportEvolution({ year: 2029, safetyFocus: 80 }).trends.some((t) => /electric|concussion/.test(t)));
});
