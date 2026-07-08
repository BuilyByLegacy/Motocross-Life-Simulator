import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  resolveResult, resolveField, motoPoints, Standings, POINTS_TABLES,
} from '../src/systems/raceResults.js';

test('#64 motoPoints honors table and moto-relative scoring', () => {
  assert.equal(motoPoints(1, { table: 'amateur' }), 25);
  assert.equal(motoPoints(2, { table: 'amateur' }), 22);
  assert.equal(motoPoints(21, { table: 'amateur' }), 0); // off the table
  assert.equal(motoPoints(1, { table: 'moto', fieldSize: 30 }), 30);
  assert.equal(motoPoints(30, { table: 'moto', fieldSize: 30 }), 1);
  assert.equal(motoPoints(null), 0);
});

test('#64 normal finish resolves motos, points, and status', () => {
  const r = resolveResult({ eventId: 'e1', riderId: 'me', klass: '85cc', motos: [2, 3], fieldSize: 30 });
  assert.equal(r.status, 'finished');
  assert.equal(r.dnf, false);
  assert.equal(r.points, 22 + 20);
  assert.equal(r.motoScore, 5);
});

test('#64 DNF (missing moto), DNS, and penalties', () => {
  const dnf = resolveResult({ eventId: 'e', riderId: 'me', klass: '85cc', motos: [4, null] });
  assert.equal(dnf.dnf, true);
  assert.equal(dnf.status, 'dnf');

  const dns = resolveResult({ eventId: 'e', riderId: 'me', klass: '85cc', motos: [], status: 'dns' });
  assert.equal(dns.dns, true);
  assert.equal(dns.points, 0);

  // A positional penalty drops the finish; a points penalty is subtracted.
  const pen = resolveResult({
    eventId: 'e', riderId: 'me', klass: '85cc', motos: [1, 1], fieldSize: 30,
    penalties: [{ motoIndex: 0, positions: 2, reason: 'jumped start' }, { points: 3, reason: 'ref call' }],
  });
  // moto 0 becomes 3rd (20), moto 1 stays 1st (25) = 45, minus 3 = 42
  assert.equal(pen.points, 45 - 3);
});

test('#64/#67 field resolution places riders with deterministic tie-breaks', () => {
  // A and B tie on combined score (1+3 vs 3+1); B wins the final moto.
  const a = resolveResult({ eventId: 'e', riderId: 'A', klass: '85cc', motos: [1, 3] });
  const b = resolveResult({ eventId: 'e', riderId: 'B', klass: '85cc', motos: [3, 1] });
  const c = resolveResult({ eventId: 'e', riderId: 'C', klass: '85cc', motos: [2, 2] });
  const ranked = resolveField([a, b, c]);
  // C has lowest total (4) -> 1st. A and B tie at 4? no: C=4, A=4, B=4 all tie.
  // tie-break by better final moto: B(1) < A(3) < C(2). So B, C, A.
  assert.equal(b.overall, 1);
  assert.equal(c.overall, 2);
  assert.equal(a.overall, 3);
});

test('#64 DNS sorts behind finishers in field resolution', () => {
  const fin = resolveResult({ eventId: 'e', riderId: 'F', klass: '85cc', motos: [10, 10] });
  const dns = resolveResult({ eventId: 'e', riderId: 'D', klass: '85cc', motos: [], status: 'dns' });
  const ranked = resolveField([dns, fin]);
  assert.equal(fin.overall, 1);
  assert.equal(dns.overall, 2);
});

test('#67 standings accumulate, rank, and expose wins/podiums', () => {
  const s = new Standings();
  s.add(resolveResult({ eventId: 'r1', riderId: 'me', klass: '85cc', motos: [1, 1], overall: 1, fieldSize: 30 }));
  s.add(resolveResult({ eventId: 'r1', riderId: 'rival', klass: '85cc', motos: [2, 2], overall: 2, fieldSize: 30 }));
  s.add(resolveResult({ eventId: 'r2', riderId: 'me', klass: '85cc', motos: [3, 2], overall: 3, fieldSize: 30 }));
  s.add(resolveResult({ eventId: 'r2', riderId: 'rival', klass: '85cc', motos: [1, 1], overall: 1, fieldSize: 30 }));
  const t = s.table_({ klass: '85cc' });
  // me: r1 (25+25=50) + r2 (20+22=42) = 92 ; rival: r1 (22+22=44) + r2 (25+25=50) = 94
  // rival leads on points
  assert.equal(t[0].riderId, 'rival');
  assert.equal(t[0].position, 1);
  assert.equal(t.find((r) => r.riderId === 'me').wins, 1);
});

test('#67 dropped-score support removes worst rounds', () => {
  const s = new Standings({ dropWorst: 1 });
  s.add(resolveResult({ eventId: 'r1', riderId: 'me', klass: '85cc', motos: [1, 1] })); // 50
  s.add(resolveResult({ eventId: 'r2', riderId: 'me', klass: '85cc', motos: [20, 20] })); // 2 (worst, dropped)
  s.add(resolveResult({ eventId: 'r3', riderId: 'me', klass: '85cc', motos: [2, 2] })); // 44
  const row = s.table_({ klass: '85cc' })[0];
  assert.equal(row.dropped, 1);
  assert.equal(row.points, 50 + 44); // worst (2) dropped
});

test('standings serialization round-trips', () => {
  const s = new Standings({ dropWorst: 1 });
  s.add(resolveResult({ eventId: 'r1', riderId: 'me', klass: '85cc', motos: [1, 1], overall: 1 }));
  const restored = Standings.fromJSON(JSON.parse(JSON.stringify(s.toJSON())));
  assert.equal(restored.dropWorst, 1);
  assert.deepEqual(restored.table_({ klass: '85cc' }), s.table_({ klass: '85cc' }));
});
