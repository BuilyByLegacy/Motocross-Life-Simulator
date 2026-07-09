// Month-Based Season Calendar (issue #224)
// --------------------------------------------------------------------------
// Motocross planning is seasonal and month-based, not a string of generic
// "weeks". This converts the 12-week season schedule into a month-grouped view
// model (à la a career-mode calendar): months → weekends, each tagged with
// event markers, registration deadlines, camps, and off weekends. Pure and
// UI-ready.

export const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

// Amateur seasons ramp through spring into summer; the prototype's 12 weeks map
// to roughly April–June by default. Registration for a race closes ~2 weeks out.
const DEFAULT_START_MONTH = 3; // 0-based: April
const WEEKS_PER_MONTH = 4;
const REGISTRATION_LEAD = 2; // weeks before a race that registration closes

// Classify a calendar week into its primary marker + any secondary markers.
function markersFor(entry) {
  const race = entry.race ?? null;
  const markers = [];
  let kind = 'off';
  if (race) {
    kind = (race.lorettaStage === 'area' || race.category === 'qualifier') ? 'qualifier'
      : race.lorettaStage === 'regional' ? 'regional'
      : race.lorettaStage === 'national' ? 'national'
      : race.kind === 'national' ? 'national'
      : race.kind === 'regional' ? 'regional' : 'race';
    markers.push(kind);
  } else if (entry.camp) {
    kind = 'camp';
    markers.push('camp');
  } else {
    markers.push('off');
  }
  return { kind, markers };
}

// Build the month-grouped calendar. `calendar` is the season's week entries
// ([{ week, title, note?, race?, camp? }]).
export function buildMonthCalendar(calendar = [], { startMonthIndex = DEFAULT_START_MONTH, weeksPerMonth = WEEKS_PER_MONTH, currentWeek = 1, year = null } = {}) {
  const byWeek = new Map(calendar.map((c) => [c.week, c]));

  const weeks = calendar
    .slice()
    .sort((a, b) => a.week - b.week)
    .map((c) => {
      const { kind, markers } = markersFor(c);
      // Registration deadline: this week closes entry for a race two weeks out.
      const upcoming = byWeek.get(c.week + REGISTRATION_LEAD);
      const deadline = upcoming && upcoming.race
        ? { forWeek: upcoming.week, forRace: upcoming.race.name, label: `Registration closes: ${upcoming.race.name}` }
        : null;
      if (deadline) markers.push('deadline');
      return {
        week: c.week,
        title: c.title,
        note: c.note ?? null,
        race: c.race ?? null,
        camp: !!c.camp,
        kind,
        markers,
        deadline,
        isNow: c.week === currentWeek,
        isPast: c.week < currentWeek,
      };
    });

  const months = [];
  for (const wk of weeks) {
    const monthIndex = startMonthIndex + Math.floor((wk.week - 1) / weeksPerMonth);
    let m = months.find((x) => x.monthIndex === monthIndex);
    if (!m) {
      const nameIdx = ((monthIndex % 12) + 12) % 12;
      const yr = year != null ? year + Math.floor(monthIndex / 12) : null;
      m = { monthIndex, name: MONTH_NAMES[nameIdx], label: MONTH_NAMES[nameIdx] + (yr != null ? ` ${yr}` : ''), weeks: [] };
      months.push(m);
    }
    m.weeks.push(wk);
  }
  months.sort((a, b) => a.monthIndex - b.monthIndex);

  const currentMonth = months.find((m) => m.weeks.some((w) => w.week === currentWeek)) ?? months[0] ?? null;
  const races = weeks.filter((w) => w.race);
  const deadlines = weeks.filter((w) => w.deadline).map((w) => ({ week: w.week, ...w.deadline }));

  return {
    months,
    currentMonthIndex: currentMonth ? currentMonth.monthIndex : startMonthIndex,
    summary: {
      totalRaces: races.length,
      qualifiers: races.filter((w) => w.kind === 'qualifier' || w.kind === 'regional' || w.kind === 'national').length,
      camps: weeks.filter((w) => w.camp).length,
      offWeekends: weeks.filter((w) => w.kind === 'off').length,
      upcomingDeadlines: deadlines.filter((d) => d.week >= currentWeek),
    },
  };
}

// Navigate months: the next/previous month that actually holds weeks.
export function adjacentMonth(monthCal, monthIndex, dir) {
  const idxs = monthCal.months.map((m) => m.monthIndex).sort((a, b) => a - b);
  const pos = idxs.indexOf(monthIndex);
  if (pos < 0) return monthCal.currentMonthIndex;
  const next = pos + (dir >= 0 ? 1 : -1);
  return next >= 0 && next < idxs.length ? idxs[next] : monthIndex;
}

export function monthByIndex(monthCal, monthIndex) {
  return monthCal.months.find((m) => m.monthIndex === monthIndex) ?? monthCal.months[0] ?? null;
}
