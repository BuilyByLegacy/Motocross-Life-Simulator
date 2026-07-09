// Rider Development Curve
// -----------------------
// Season-to-season growth is not linear. Hidden traits shape peak timing,
// learning speed, transition sensitivity, confidence, resilience, and ceiling.

export const DEVELOPMENT_TRAITS = {
  early_bloomer: { growth: 1.18, peakShift: -2, transition: 0 },
  late_bloomer: { growth: 0.9, peakShift: 3, transition: 0 },
  fast_learner: { growth: 1.15, peakShift: 0, transition: 4 },
  slow_adapter: { growth: 0.92, peakShift: 0, transition: -7 },
  transition_sensitive: { growth: 1, peakShift: 0, transition: -10 },
  mentally_resilient: { growth: 1.04, peakShift: 0, confidence: 7 },
  confidence_fragile: { growth: 1, peakShift: 0, confidence: -8 },
  high_ceiling: { growth: 1.03, peakShift: 1, ceiling: 10 },
  work_ethic: { growth: 1.08, peakShift: 0, ceiling: 3 },
};

const SKILLS = ['starts', 'cornering', 'jumping', 'whoops', 'raceIQ', 'consistency', 'fitness'];

export function developmentProfile(traits = []) {
  return traits.reduce((p, key) => {
    const t = DEVELOPMENT_TRAITS[key];
    if (!t) return p;
    p.traits.push(key);
    p.growth *= t.growth ?? 1;
    p.peakAge += t.peakShift ?? 0;
    p.transitionModifier += t.transition ?? 0;
    p.confidenceModifier += t.confidence ?? 0;
    p.ceiling += t.ceiling ?? 0;
    return p;
  }, { traits: [], growth: 1, peakAge: 16, transitionModifier: 0, confidenceModifier: 0, ceiling: 88 });
}

export function projectSeasonGrowth(rider, { traits = [], trainingLoad = 1, classChanged = false, injuryWeeks = 0, schoolStress = 0 } = {}) {
  const profile = developmentProfile(traits);
  const ageDistance = Math.abs((rider.age ?? 12) - profile.peakAge);
  const ageCurve = Math.max(0.55, 1 - ageDistance * 0.055);
  const injuryDrag = Math.max(0.55, 1 - injuryWeeks * 0.08);
  const stressDrag = Math.max(0.7, 1 - schoolStress * 0.004);
  const base = profile.growth * ageCurve * injuryDrag * stressDrag * Math.max(0.5, trainingLoad);
  const gains = {};
  for (const skill of SKILLS) {
    const current = rider.skills?.[skill] ?? 40;
    const room = Math.max(0, profile.ceiling - current);
    gains[skill] = Math.max(0, Math.round(Math.min(6, room * 0.08 * base)));
  }
  const transitionPenalty = classChanged ? Math.min(0, profile.transitionModifier) : 0;
  const confidenceDelta = Math.round((classChanged ? transitionPenalty : 0) + profile.confidenceModifier * 0.4);
  return { profile, gains, confidenceDelta, transitionPenalty };
}

export function applySeasonGrowth(rider, opts = {}) {
  const growth = projectSeasonGrowth(rider, opts);
  const next = { ...rider, skills: { ...rider.skills } };
  for (const [skill, gain] of Object.entries(growth.gains)) {
    next.skills[skill] = Math.max(0, Math.min(100, (next.skills[skill] ?? 0) + gain));
  }
  next.confidence = Math.max(0, Math.min(100, (next.confidence ?? 50) + growth.confidenceDelta));
  return { rider: next, growth };
}

export function transitionReadiness(rider, nextClass, { traits = [], ownedBike = false, parentApproval = true } = {}) {
  const profile = developmentProfile(traits);
  const avg = SKILLS.reduce((sum, s) => sum + (rider.skills?.[s] ?? 40), 0) / SKILLS.length;
  const score = Math.round(avg + (rider.confidence ?? 50) * 0.25 + profile.transitionModifier + (ownedBike ? 10 : -18) + (parentApproval ? 5 : -20));
  return {
    nextClass,
    score,
    ready: score >= 65,
    risks: [
      !ownedBike ? 'needs_bike' : null,
      !parentApproval ? 'needs_parent_approval' : null,
      profile.transitionModifier < -5 ? 'transition_sensitive' : null,
      (rider.confidence ?? 50) < 40 ? 'low_confidence' : null,
    ].filter(Boolean),
  };
}
