// Connected Careers — offline social layer (issues #114–#122)
// --------------------------------------------------------------------------
// "Every rider has a story. Chase yours." An asynchronous, story-first social
// layer for the phone: shareable career cards, a local friends list, story +
// performance leaderboards, side-by-side comparison, season-recap sharing, and
// importing a friend's career as a world cameo. Fully offline — no networking,
// no backend, no live multiplayer. Careers are shared as portable codes.
//
//   #114 friends system   #115 career profile cards   #116 leaderboards
//   #117 career comparison #118 season recap sharing   #119 documentary sharing
//   #120 friend notifications #121 privacy controls     #122 world cameos

// Privacy flags — a card owner can redact sensitive parts before sharing (#121).
export const PRIVACY_FIELDS = ['finances', 'injuries', 'family', 'sponsors', 'private'];

export const FRIEND_STATES = ['active', 'pending_out', 'pending_in', 'private', 'blocked', 'removed', 'unavailable'];

// ---- #115 career profile card + #121 privacy -----------------------------
// Build a shareable career card from a game. `privacy` hides sensitive fields.
export function buildCareerCard(game, { privacy = [], id = null } = {}) {
  const s = game.state;
  const r = s.rider;
  const hidden = new Set(privacy);
  const wins = game.careerWins?.() ?? 0;
  const podiums = game.careerPodiums?.() ?? 0;
  const dream = game.lorettas?.dreamSummary?.() ?? { furthestStage: 'none', region: null };
  const topMemory = (game.memory?.top?.(1) ?? [])[0] ?? null;
  const seasons = (s.careerHistory?.length ?? 0) + 1;

  const card = {
    v: 1,
    id: id ?? `card_${(s.seed ?? 0).toString(36)}`,
    name: r.name,
    avatar: r.avatar ?? '🧒',
    age: r.age,
    klass: r.klass,
    mode: s.campaign === 'parent' ? 'Parent' : 'Rider',
    status: careerStatus(game),
    region: dream.region ?? 'Northeast',
    mainBike: s.bike?.name ?? null,
    seasons,
    wins,
    podiums,
    championships: (s.careerHistory ?? []).filter((h) => h.champion).length,
    lorettaStage: dream.furthestStage,
    goal: (s.seasonGoals ?? [])[0] ?? null,
    biggestMemory: topMemory ? { title: topMemory.title, importance: topMemory.importance } : null,
    // Redactable fields (#121):
    money: hidden.has('finances') ? null : s.family?.money ?? null,
    injury: hidden.has('injuries') ? null : (r.injury ? r.injury.name : 'healthy'),
    sponsors: hidden.has('sponsors') ? null : (s.sponsors ?? []).length,
    family: hidden.has('family') ? null : familyNote(game),
    private: hidden.has('private'),
    bikesOwned: (s.garage?.bikes?.length ?? 0) + 1,
    trophies: s.garage?.trophies?.length ?? 0,
  };
  card.legacyRating = legacyRating(card);
  card.storyTag = storyTag(card);
  card.headline = headline(card);
  return card;
}

function careerStatus(game) {
  const r = game.state.rider;
  if (r.injury && r.injury.weeksOut > 0) return 'injured';
  if (game.state.careerHistory?.some((h) => h.retired)) return 'retired';
  const dream = game.lorettas?.dreamSummary?.();
  if (dream?.qualifiedForNational) return 'loretta_qualified';
  return 'active';
}

function familyNote(game) {
  if (game.state.campaign !== 'parent') return null;
  const stress = game.state.family?.stress ?? 0;
  const money = game.state.family?.money ?? 0;
  if (money <= 0) return 'family broke chasing the dream';
  if (stress >= 70) return 'family under strain';
  return 'family holding it together';
}

// A 0–100 legacy rating blending performance + story richness (#115/#116).
export function legacyRating(card) {
  let r = 20;
  r += Math.min(25, card.wins * 3);
  r += Math.min(15, card.championships * 8);
  r += { none: 0, area: 6, regional: 14, national: 22 }[card.lorettaStage] ?? 0;
  r += Math.min(8, (card.seasons ?? 1) * 1.5);
  r += Math.min(6, (card.trophies ?? 0));
  if (card.biggestMemory) r += Math.min(8, card.biggestMemory.importance / 12);
  return Math.round(Math.max(0, Math.min(100, r)));
}

// A short story identity — the game must not reduce riders to a win count.
export function storyTag(card) {
  if (card.status === 'retired') return 'local legend';
  if (card.mode === 'Parent' && card.family && /broke/.test(card.family)) return 'family sacrifice';
  if (card.lorettaStage === 'national') return "Loretta's rider";
  if (card.championships >= 1) return 'champion';
  if (card.wins === 0 && card.seasons >= 2) return 'privateer grinder';
  if (card.age <= 10 && card.wins >= 3) return 'rising prodigy';
  if (card.injury && card.injury !== 'healthy') return 'comeback story';
  return 'chasing the dream';
}

function headline(card) {
  const goalTxt = { qualify_lorettas: "chasing Loretta's", win_title: 'chasing a title', preserve_budget: 'racing on a budget', family_time: 'family first' }[card.goal] ?? card.storyTag;
  if (card.status === 'retired') return `Retired at ${card.age} — ${card.storyTag}.`;
  return `Age ${card.age}, ${card.klass}, ${goalTxt}.`;
}

// ---- #118/#119 export / import (offline shareable codes) -----------------
// Encode a card (or recap) to a portable code and back. Offline-safe base64.
export function exportCard(card) {
  const json = JSON.stringify(card);
  if (typeof btoa === 'function') return 'MX1:' + btoa(unescape(encodeURIComponent(json)));
  return 'MX1:' + Buffer.from(json, 'utf8').toString('base64');
}
export function importCard(code) {
  if (typeof code !== 'string' || !code.startsWith('MX1:')) return null;
  try {
    const b64 = code.slice(4);
    const json = typeof atob === 'function' ? decodeURIComponent(escape(atob(b64))) : Buffer.from(b64, 'base64').toString('utf8');
    const card = JSON.parse(json);
    return card && card.name ? card : null;
  } catch { return null; }
}

// ---- #114 friends list ----------------------------------------------------
export class FriendsList {
  constructor() { this.friends = []; } // [{ card, state, addedDay, prevSnapshot }]

  add(card, { state = 'active', day = 0 } = {}) {
    if (!card) return null;
    const existing = this.friends.find((f) => f.card.id === card.id);
    if (existing) { existing.prevSnapshot = existing.card; existing.card = card; return existing; }
    const entry = { card, state, addedDay: day, prevSnapshot: null };
    this.friends.push(entry);
    return entry;
  }
  remove(id) { this.friends = this.friends.filter((f) => f.card.id !== id); }
  block(id) { const f = this.get(id); if (f) f.state = 'blocked'; return !!f; }
  unblock(id) { const f = this.get(id); if (f) f.state = 'active'; return !!f; }
  get(id) { return this.friends.find((f) => f.card.id === id) ?? null; }
  // Visible = not blocked/removed. Search by name (#114).
  list({ query = '', includeSelf = null } = {}) {
    let out = this.friends.filter((f) => f.state !== 'blocked' && f.state !== 'removed');
    if (query) out = out.filter((f) => f.card.name.toLowerCase().includes(query.toLowerCase()));
    const cards = out.map((f) => f.card);
    return includeSelf ? [includeSelf, ...cards] : cards;
  }

  toJSON() { return { friends: this.friends }; }
  static fromJSON(data) { const l = new FriendsList(); l.friends = data?.friends ?? []; return l; }
}

// ---- #116 leaderboards ----------------------------------------------------
// Objective performance + derived narrative categories, with tie-breakers.
export const LEADERBOARD_CATEGORIES = {
  wins: { label: 'Most Wins', value: (c) => c.wins, story: false },
  championships: { label: 'Most Championships', value: (c) => c.championships, story: false },
  loretta: { label: "Best Loretta's Stage", value: (c) => ({ none: 0, area: 1, regional: 2, national: 3 }[c.lorettaStage] ?? 0), story: false },
  earnings: { label: 'Highest Earnings', value: (c) => c.money ?? -1, story: false },
  garage: { label: 'Most Valuable Garage', value: (c) => (c.bikesOwned ?? 0) + (c.trophies ?? 0), story: false },
  legacy: { label: 'Highest Legacy Rating', value: (c) => c.legacyRating ?? 0, story: true },
  longevity: { label: 'Longest Career', value: (c) => c.seasons ?? 0, story: true },
  underdog: { label: 'Biggest Underdog', value: (c) => (c.storyTag === 'privateer grinder' ? 50 : 0) + (c.podiums ?? 0), story: true },
  parent: { label: 'Best Parent-Mode Career', value: (c) => (c.mode === 'Parent' ? 40 : -100) + (c.legacyRating ?? 0), story: true },
};

export function leaderboard(cards, category = 'legacy', { filter = {} } = {}) {
  const cat = LEADERBOARD_CATEGORIES[category] ?? LEADERBOARD_CATEGORIES.legacy;
  let pool = cards.filter((c) => c && !c.private);
  if (filter.mode) pool = pool.filter((c) => c.mode === filter.mode);
  if (filter.region) pool = pool.filter((c) => c.region === filter.region);
  if (filter.klass) pool = pool.filter((c) => c.klass === filter.klass);
  return pool
    .map((c) => ({ card: c, score: cat.value(c) }))
    .sort((a, b) => b.score - a.score || (b.card.legacyRating ?? 0) - (a.card.legacyRating ?? 0) || String(a.card.name).localeCompare(String(b.card.name)))
    .map((row, i) => ({ rank: i + 1, name: row.card.name, storyTag: row.card.storyTag, score: row.score, card: row.card }));
}

// ---- #117 career comparison ----------------------------------------------
export function compareCareers(mine, theirs) {
  const row = (label, a, b) => ({ label, mine: a, theirs: b });
  const groups = {
    identity: [row('Mode', mine.mode, theirs.mode), row('Age', mine.age, theirs.age), row('Class', mine.klass, theirs.klass), row('Story', mine.storyTag, theirs.storyTag)],
    competition: [row('Wins', mine.wins, theirs.wins), row('Podiums', mine.podiums, theirs.podiums), row('Championships', mine.championships, theirs.championships)],
    loretta: [row("Loretta's stage", mine.lorettaStage, theirs.lorettaStage)],
    money: [row('Money', mine.money, theirs.money), row('Bikes owned', mine.bikesOwned, theirs.bikesOwned), row('Trophies', mine.trophies, theirs.trophies)],
    legacy: [row('Legacy rating', mine.legacyRating, theirs.legacyRating), row('Seasons', mine.seasons, theirs.seasons)],
  };
  return { groups, narrative: comparisonNarrative(mine, theirs) };
}

function comparisonNarrative(mine, theirs) {
  if ((mine.seasons ?? 0) > (theirs.seasons ?? 0) + 1) return 'Your career endured longer — theirs burned brighter, briefer.';
  if ((theirs.wins ?? 0) > (mine.wins ?? 0) * 2 && (mine.legacyRating ?? 0) >= (theirs.legacyRating ?? 0)) return 'They won more races, but your story runs deeper.';
  if ((mine.legacyRating ?? 0) > (theirs.legacyRating ?? 0)) return 'A richer legacy on your side — for now.';
  if ((mine.legacyRating ?? 0) < (theirs.legacyRating ?? 0)) return 'They’re writing the bigger story so far. Chase it down.';
  return 'Two very different roads, side by side.';
}

// ---- #118 season recap card ----------------------------------------------
export function buildRecapCard(game, { privacy = [] } = {}) {
  const hidden = new Set(privacy);
  const results = game.state.season?.results ?? [];
  const wins = results.filter((r) => r.overall === 1).length;
  const best = results.reduce((b, r) => (r.overall != null && (b == null || r.overall < b) ? r.overall : b), null);
  const topMemory = (game.memory?.top?.(1) ?? [])[0] ?? null;
  return {
    v: 1, kind: 'recap',
    name: game.state.rider.name,
    seasonYear: game.seasonYear,
    record: `${results.length} races · ${wins}W`,
    bestFinish: best,
    memoryOfYear: topMemory ? topMemory.title : null,
    biggestExpense: hidden.has('finances') ? null : 'season travel + parts',
    nextGoal: (game.state.seasonGoals ?? [])[0] ?? null,
  };
}

// ---- #122 world cameo -----------------------------------------------------
// Turn a friend's card into a named rider who can appear in your world.
export function toWorldCameo(card) {
  if (!card) return null;
  return {
    id: `cameo_${card.id}`,
    name: card.name,
    klass: card.klass,
    strength: Math.round(40 + (card.legacyRating ?? 0) * 0.5),
    isCameo: true,
    storyTag: card.storyTag,
  };
}

// ---- #120 friend milestone notifications ---------------------------------
// Compare a friend's previous card snapshot to a freshly-imported one and
// return notification descriptors for the meaningful changes (privacy-filtered).
export function friendMilestones(prev, next) {
  if (!next) return [];
  const out = [];
  const push = (title, body) => out.push({ source: 'social', title, body, icon: '👥' });
  if (!prev) { push(`${next.name} joined your friends`, next.headline); return out; }
  const stageRank = { none: 0, area: 1, regional: 2, national: 3 };
  if ((stageRank[next.lorettaStage] ?? 0) > (stageRank[prev.lorettaStage] ?? 0)) {
    push(`${next.name} advanced on the Road to Loretta's`, next.headline);
  }
  if ((next.championships ?? 0) > (prev.championships ?? 0)) push(`${next.name} won a championship!`, next.headline);
  if ((next.wins ?? 0) > (prev.wins ?? 0)) push(`${next.name} took another win`, `${next.wins} career wins now.`);
  if (next.injury && next.injury !== 'healthy' && prev.injury !== next.injury) push(`${next.name} got hurt`, next.injury);
  if (next.status === 'retired' && prev.status !== 'retired') push(`${next.name} retired`, next.headline);
  return out;
}
