// Career Calendar — Calendar & Time Engine (issues #48–#52)
// ---------------------------------------------------------
// A deterministic, serializable calendar domain model. Time is measured in
// integer day indices from season start (day 0), which keeps simulation and
// tests deterministic while still supporting day / week / month / season views.
//
//   #48 model (entries, query helpers, serialization)
//   #49 time advancement + daily resolution
//   #50 conflict detection (overlap / travel / rest windows; hard vs soft)
//   #51 deadline tracking (states + consequences)
//   #52 season timeline summary generator

export const ENTRY_CATEGORIES = [
  'race', 'qualifier', 'practice', 'travel', 'maintenance', 'rest', 'family', 'school', 'work', 'deadline',
];

export const DEADLINE_STATES = ['upcoming', 'urgent', 'completed', 'missed', 'expired'];

const DAYS_PER_WEEK = 7;
const DAYS_PER_MONTH = 28; // four tidy weeks; deterministic, not tied to real months

let _id = 0;
function nextId() {
  return `cal_${(_id++).toString(36)}_${Date.now().toString(36)}`;
}

// A single dated calendar entry. `deadline`, when present, carries its own
// due day / state / severity and can link to another system's record.
export function makeEntry({
  startDay,
  durationDays = 1,
  category = 'practice',
  title = '',
  priority = 3,
  location = null, // { name, distance } — distance in arbitrary "hours from home"
  notes = '',
  deadline = null, // { dueDay, severity, linkedId, state }
  meta = {},
} = {}) {
  return {
    id: nextId(),
    startDay,
    durationDays: Math.max(1, durationDays),
    endDay: startDay + Math.max(1, durationDays) - 1,
    category,
    title,
    priority,
    location,
    notes,
    deadline: deadline ? { state: 'upcoming', severity: 'soft', ...deadline } : null,
    meta,
    resolved: false,
    outcome: null,
  };
}

export class CareerCalendar {
  constructor({ seasonDays = 84, currentDay = 0 } = {}) {
    this.seasonDays = seasonDays;
    this.currentDay = currentDay;
    this.entries = new Map();
    this.resolvedLog = []; // chronological record of resolved entries (for #52)
  }

  // ---- #48 CRUD + queries --------------------------------------------------
  add(entryOrProps) {
    const entry = entryOrProps && entryOrProps.id ? entryOrProps : makeEntry(entryOrProps);
    this.entries.set(entry.id, entry);
    return entry;
  }
  remove(id) {
    return this.entries.delete(id);
  }
  get(id) {
    return this.entries.get(id) ?? null;
  }
  all() {
    return [...this.entries.values()].sort((a, b) => a.startDay - b.startDay || b.priority - a.priority);
  }
  // Entries overlapping the inclusive [from, to] day range.
  range(from, to) {
    return this.all().filter((e) => e.startDay <= to && e.endDay >= from);
  }
  day(d) {
    return this.range(d, d);
  }
  week(weekIndex) {
    const from = weekIndex * DAYS_PER_WEEK;
    return this.range(from, from + DAYS_PER_WEEK - 1);
  }
  month(monthIndex) {
    const from = monthIndex * DAYS_PER_MONTH;
    return this.range(from, from + DAYS_PER_MONTH - 1);
  }
  season() {
    return this.range(0, this.seasonDays - 1);
  }

  // ---- #50 conflict detection ---------------------------------------------
  // Returns structured warnings: { type, severity: 'hard'|'soft', message, entries }
  conflicts() {
    const out = [];
    const list = this.all().filter((e) => e.category !== 'deadline');
    for (let i = 0; i < list.length; i++) {
      for (let j = i + 1; j < list.length; j++) {
        const a = list[i];
        const b = list[j];
        const overlap = a.startDay <= b.endDay && b.startDay <= a.endDay;
        if (overlap) {
          out.push({
            type: 'overlap', severity: 'hard',
            message: `"${a.title || a.category}" and "${b.title || b.category}" overlap — you can't do both.`,
            entries: [a.id, b.id],
          });
          continue;
        }
        // Travel conflict: back-to-back events at distant locations.
        const gap = Math.min(Math.abs(a.startDay - b.endDay), Math.abs(b.startDay - a.endDay));
        if (a.location && b.location && a.location.name !== b.location.name) {
          const dist = (a.location.distance ?? 0) + (b.location.distance ?? 0);
          if (gap <= 1 && dist >= 6) {
            out.push({
              type: 'travel', severity: 'soft',
              message: `Tight turnaround between ${a.location.name} and ${b.location.name} — long haul with no rest.`,
              entries: [a.id, b.id],
            });
          }
        }
        // Rest/fatigue: two hard-effort events (race/qualifier) with no rest day between.
        const hard = (e) => e.category === 'race' || e.category === 'qualifier';
        if (hard(a) && hard(b) && gap <= 1) {
          out.push({
            type: 'rest', severity: 'soft',
            message: `Back-to-back race weekends — no recovery window. Fatigue and injury risk.`,
            entries: [a.id, b.id],
          });
        }
      }
    }
    return out;
  }

  // ---- #51 deadline tracking ----------------------------------------------
  deadlineEntries() {
    return this.all().filter((e) => e.deadline);
  }
  // Categorise deadlines relative to `atDay` (default: current day).
  deadlines(atDay = this.currentDay) {
    const buckets = { upcoming: [], urgent: [], completed: [], missed: [], expired: [] };
    for (const e of this.deadlineEntries()) {
      const d = e.deadline;
      let state = d.state;
      if (state !== 'completed') {
        const daysLeft = d.dueDay - atDay;
        if (daysLeft < 0) state = 'missed';
        else if (daysLeft <= 3) state = 'urgent';
        else state = 'upcoming';
      }
      buckets[state] = buckets[state] || [];
      buckets[state].push({ ...e, deadline: { ...d, state, daysLeft: d.dueDay - atDay } });
    }
    return buckets;
  }
  completeDeadline(id) {
    const e = this.get(id);
    if (e && e.deadline) { e.deadline.state = 'completed'; return true; }
    return false;
  }

  // ---- #49 time advancement + daily resolution ----------------------------
  // Advance to `targetDay`, resolving each entry that starts on each passed day
  // in chronological order. `handlers` maps category -> (entry, day) => outcome.
  // Returns { resolved, missedDeadlines, notifications }.
  advanceTo(targetDay, handlers = {}) {
    const resolved = [];
    const missedDeadlines = [];
    const notifications = [];
    const target = Math.min(targetDay, this.seasonDays);
    for (let day = this.currentDay + 1; day <= target; day++) {
      // Resolve entries starting today, ordered by priority then id.
      const todays = this.all().filter((e) => e.startDay === day && !e.resolved && e.category !== 'deadline');
      for (const e of todays) {
        const handler = handlers[e.category];
        const outcome = handler ? handler(e, day) : null;
        e.resolved = true;
        e.outcome = outcome;
        this.resolvedLog.push({ day, entryId: e.id, category: e.category, title: e.title, outcome, related: e.meta.related ?? [] });
        resolved.push(e);
        if (outcome && outcome.notification) notifications.push({ day, text: outcome.notification });
      }
      // Detect deadlines that came due today and weren't completed.
      for (const e of this.deadlineEntries()) {
        if (e.deadline.state !== 'completed' && e.deadline.dueDay === day) {
          e.deadline.state = 'missed';
          missedDeadlines.push(e);
          notifications.push({ day, text: `Missed deadline: ${e.title || e.deadline.linkedId}.` });
        }
      }
    }
    this.currentDay = target;
    return { resolved, missedDeadlines, notifications };
  }
  advanceDays(n, handlers = {}) {
    return this.advanceTo(this.currentDay + n, handlers);
  }

  // ---- #52 season timeline summary ----------------------------------------
  // Groups the resolved log into readable, week-bucketed summary objects with
  // an emotional tone, preserving links back to source records.
  timelineSummary() {
    const toneFor = (rec) => {
      const o = rec.outcome || {};
      if (o.tone) return o.tone;
      if (rec.category === 'race' || rec.category === 'qualifier') {
        if (o.overall === 1) return 'triumph';
        if (o.overall && o.overall <= 3) return 'pride';
        if (o.dnf || o.missed) return 'heartbreak';
        return 'grind';
      }
      if (rec.category === 'family') return 'warmth';
      if (rec.category === 'maintenance') return 'quiet';
      return 'neutral';
    };
    const byWeek = new Map();
    // De-dupe by entryId so a summary is never emitted twice.
    const seen = new Set();
    for (const rec of this.resolvedLog) {
      if (seen.has(rec.entryId)) continue;
      seen.add(rec.entryId);
      const week = Math.floor(rec.day / DAYS_PER_WEEK);
      if (!byWeek.has(week)) byWeek.set(week, []);
      byWeek.get(week).push({
        week, day: rec.day, title: rec.title || rec.category,
        category: rec.category, related: rec.related, tone: toneFor(rec), source: rec.entryId,
      });
    }
    return [...byWeek.entries()]
      .sort((a, b) => a[0] - b[0])
      .map(([week, items]) => ({ week, items: items.sort((a, b) => a.day - b.day) }));
  }

  // ---- serialization (#48) -------------------------------------------------
  toJSON() {
    return {
      seasonDays: this.seasonDays,
      currentDay: this.currentDay,
      entries: [...this.entries.values()],
      resolvedLog: this.resolvedLog,
    };
  }
  static fromJSON(data) {
    const cal = new CareerCalendar({ seasonDays: data.seasonDays, currentDay: data.currentDay });
    for (const e of data.entries ?? []) cal.entries.set(e.id, e);
    cal.resolvedLog = data.resolvedLog ?? [];
    return cal;
  }
}

export const DAY_UNITS = { DAYS_PER_WEEK, DAYS_PER_MONTH };
