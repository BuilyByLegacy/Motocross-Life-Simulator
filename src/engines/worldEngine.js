// World Simulation Engine
// -----------------------
// "The world should feel alive and continue evolving independently of the
// player." For the prototype that means: a small field of simulated riders who
// improve on their own over the season (rivals get better whether you do or
// not), plus a news/gossip feed that surfaces world changes each week.

const FIRST_NAMES = ['Ethan', 'Mason', 'Cole', 'Brody', 'Kai', 'Tanner', 'Jax', 'Levi', 'Dawson', 'Rhett', 'Reece', 'Nash'];
const LAST_NAMES = ['Cole', 'Reyes', 'Vaughn', 'Miller', 'Boone', 'Hart', 'Wade', 'Nolan', 'Cruz', 'Pope'];

const NEWS_POOL = [
  'A local track two counties over closed after the season floods.',
  'Rocky\'s Cycle ran a used-bike blowout this weekend — the marketplace is busy.',
  'A factory amateur rider went down at a national; his privateer fill-in is the talk of the pits.',
  'Gas prices ticked up again. A couple of families quietly skipped the last round.',
  'Coach Mike is rumored to be starting a small weekday training class.',
  'A regional promoter added a bonus purse to the Southwick qualifier.',
  'Word is a nearby family is selling their whole race setup — they\'re done for the year.',
];

export class WorldEngine {
  constructor(game) {
    this.game = game;
    this.riders = [];
    this._newsIdx = 0;
    this._seedField();
  }

  // Build the simulated field the player races against all season.
  _seedField() {
    const rng = this.game.rng;
    // Ethan is a named, tracked rival — the rest are simulated People too.
    this.riders.push({
      id: 'rival_ethan',
      name: 'Ethan Cole',
      rating: 58, // race rating 0-100
      growth: rng.range(0.6, 1.1), // improves each week
      aggression: 0.7,
      isRival: true,
    });
    const n = 7;
    for (let i = 0; i < n; i++) {
      this.riders.push({
        id: `sim_${i}`,
        name: `${rng.pick(FIRST_NAMES)} ${rng.pick(LAST_NAMES)}`,
        rating: rng.range(38, 62),
        growth: rng.range(0.2, 1.0),
        aggression: rng.range(0.35, 0.8),
        isRival: false,
      });
    }
  }

  // Called once per week. Rivals improve; the world occasionally speaks up.
  tick() {
    for (const r of this.riders) {
      r.rating = Math.min(92, r.rating + r.growth * this.game.rng.range(0.4, 1.2));
    }
    // News roughly every other week, so it doesn't become noise.
    if (this.game.rng.chance(0.55)) {
      const item = NEWS_POOL[this._newsIdx % NEWS_POOL.length];
      this._newsIdx++;
      this.game.addNews(item, 'world');
    }
    // The rival's on-track improvement can itself be a memory beat late season.
    const ethan = this.riders.find((r) => r.id === 'rival_ethan');
    if (ethan && ethan.rating > 78 && !this.game.flag('ethan_got_fast')) {
      this.game.setFlag('ethan_got_fast', true);
      this.game.addNews('Ethan Cole has been on a tear lately. He\'s gotten fast.', 'gossip');
    }
  }

  field() {
    return this.riders;
  }
  rival() {
    return this.riders.find((r) => r.id === 'rival_ethan');
  }
}
