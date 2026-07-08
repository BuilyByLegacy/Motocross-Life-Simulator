// Competition Engine — result resolution + standings (issues #64, #67)
// --------------------------------------------------------------------------
// Credible outcomes without full gameplay racing. These are pure data models:
// they accept race inputs (real or simulated placeholders) and produce
// structured, serializable result records, then roll them into standings.
//
//   #64 race result resolution (motos, overall, points, DNF/DNS, penalties)
//   #67 standings & points (configurable tables, tie-breakers, dropped scores)

export const RESULT_STATUS = ['finished', 'dnf', 'dns', 'dsq'];

// Configurable points tables (per competition format). `moto` computes points
// from field size so small local fields still score sensibly.
export const POINTS_TABLES = {
  amateur: [25, 22, 20, 18, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
  pro: [25, 22, 20, 18, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
  moto: null, // position-relative: max(0, fieldSize - position + 1)
};

// Points a single moto finish is worth under a table.
export function motoPoints(position, { table = 'amateur', fieldSize = 30 } = {}) {
  if (position == null || position < 1) return 0;
  if (table === 'moto' || !POINTS_TABLES[table]) return Math.max(0, fieldSize - position + 1);
  const t = POINTS_TABLES[table];
  return position <= t.length ? t[position - 1] : 0;
}

// Resolve one rider's event into a normalized, serializable result record.
// `motos` is an array of finishing positions (or null for a moto not finished).
// `penalties` is an array of { motoIndex, positions?, points?, reason }.
export function resolveResult({
  eventId, riderId, klass, bikeId, calendarWeek = null,
  motos = [], penalties = [], status = 'finished',
  table = 'amateur', fieldSize = 30, overall = null,
} = {}) {
  const dns = status === 'dns';
  const dsq = status === 'dsq';
  const dnf = status === 'dnf' || (!dns && motos.length > 0 && motos.some((m) => m == null));

  // Apply positional penalties before scoring.
  const adjusted = motos.map((pos, i) => {
    if (pos == null) return null;
    const pen = penalties.filter((p) => p.motoIndex === i && p.positions);
    const drop = pen.reduce((a, p) => a + (p.positions || 0), 0);
    return Math.min(fieldSize, pos + drop);
  });

  let points = 0;
  if (!dns && !dsq) {
    points = adjusted.reduce((a, pos) => a + motoPoints(pos, { table, fieldSize }), 0);
    points -= penalties.reduce((a, p) => a + (p.points || 0), 0);
    points = Math.max(0, points);
  }

  const finishedMotos = adjusted.filter((m) => m != null);
  return {
    eventId, riderId, klass, bikeId, calendarWeek,
    motos: adjusted,
    rawMotos: motos,
    status: dsq ? 'dsq' : dns ? 'dns' : dnf ? 'dnf' : 'finished',
    dnf, dns, dsq,
    penalties,
    points,
    overall, // set later by field resolution or standings
    motoScore: finishedMotos.reduce((a, m) => a + m, 0), // sum of positions (lower better)
    fieldSize, table,
  };
}

// Deterministic overall placement across a field of resolved results.
// AMA-style: rank by combined moto positions (lower wins); ties broken by the
// better final moto, then the better single moto. DNS/DSQ sort to the back.
export function resolveField(results) {
  const rank = [...results].sort((a, b) => cmpForOverall(a, b));
  rank.forEach((r, i) => { r.overall = i + 1; });
  return rank;
}

function cmpForOverall(a, b) {
  const back = (r) => r.dns || r.dsq;
  if (back(a) !== back(b)) return back(a) ? 1 : -1;
  const aFin = a.motos.filter((m) => m != null).length;
  const bFin = b.motos.filter((m) => m != null).length;
  if (aFin !== bFin) return bFin - aFin; // more motos finished ranks ahead
  if (a.motoScore !== b.motoScore) return a.motoScore - b.motoScore; // lower total wins
  const lastA = a.motos[a.motos.length - 1] ?? Infinity;
  const lastB = b.motos[b.motos.length - 1] ?? Infinity;
  if (lastA !== lastB) return lastA - lastB; // better final moto wins the tie
  const bestA = Math.min(...a.motos.filter((m) => m != null), Infinity);
  const bestB = Math.min(...b.motos.filter((m) => m != null), Infinity);
  return bestA - bestB;
}

// Standings service (#67). Accumulates result records and answers standings
// queries by class / series / season grouping, with optional dropped scores.
export class Standings {
  constructor({ table = 'amateur', dropWorst = 0 } = {}) {
    this.table = table;
    this.dropWorst = dropWorst; // number of worst rounds dropped per rider
    this.results = []; // resolved result records
  }

  add(result) {
    this.results.push(result);
    return result;
  }

  // Filtered standings: [{ riderId, points, rounds, best, wins, podiums }], ranked.
  table_(filter = {}) {
    const rows = new Map();
    for (const r of this.results) {
      if (filter.klass && r.klass !== filter.klass) continue;
      if (filter.eventIds && !filter.eventIds.includes(r.eventId)) continue;
      if (!rows.has(r.riderId)) rows.set(r.riderId, []);
      rows.get(r.riderId).push(r);
    }
    const standings = [];
    for (const [riderId, list] of rows) {
      const scores = list.map((r) => r.points).sort((a, b) => a - b); // ascending
      const kept = this.dropWorst > 0 ? scores.slice(this.dropWorst) : scores;
      const points = kept.reduce((a, p) => a + p, 0);
      const overalls = list.map((r) => r.overall).filter((o) => o != null);
      standings.push({
        riderId,
        points,
        rounds: list.length,
        dropped: scores.length - kept.length,
        best: overalls.length ? Math.min(...overalls) : null,
        wins: list.filter((r) => r.overall === 1).length,
        podiums: list.filter((r) => r.overall != null && r.overall <= 3).length,
        dnfs: list.filter((r) => r.dnf).length,
      });
    }
    return this._rankStandings(standings);
  }

  // Deterministic ranking: points desc, then wins, then podiums, then best finish.
  _rankStandings(rows) {
    return rows.sort((a, b) =>
      b.points - a.points ||
      b.wins - a.wins ||
      b.podiums - a.podiums ||
      (a.best ?? 99) - (b.best ?? 99) ||
      String(a.riderId).localeCompare(String(b.riderId)),
    ).map((r, i) => ({ ...r, position: i + 1 }));
  }

  positionOf(riderId, filter = {}) {
    const row = this.table_(filter).find((r) => r.riderId === riderId);
    return row ? row.position : null;
  }

  toJSON() {
    return { table: this.table, dropWorst: this.dropWorst, results: this.results };
  }
  static fromJSON(data) {
    const s = new Standings({ table: data?.table, dropWorst: data?.dropWorst });
    s.results = data?.results ?? [];
    return s;
  }
}
