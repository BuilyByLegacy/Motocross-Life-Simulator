// Seeded RNG
// ----------
// Design Bible, Race Simulation: "Stats determine expectation. Random events
// create believable stories." We want that randomness reproducible so a season
// can be replayed or debugged, hence a small seeded generator (mulberry32).

export class RNG {
  constructor(seed = Date.now()) {
    this.seed = seed >>> 0;
    this._s = this.seed;
  }

  // float in [0, 1)
  next() {
    let t = (this._s += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }

  // float in [min, max)
  range(min, max) {
    return min + this.next() * (max - min);
  }

  // integer in [min, max] inclusive
  int(min, max) {
    return Math.floor(this.range(min, max + 1));
  }

  // true with probability p
  chance(p) {
    return this.next() < p;
  }

  pick(arr) {
    return arr[Math.floor(this.next() * arr.length)];
  }

  // Gaussian-ish noise via central limit; mean 0, roughly [-1, 1]
  noise(scale = 1) {
    return (this.next() + this.next() + this.next() - 1.5) * (2 / 1.5) * scale;
  }

  shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(this.next() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
}
