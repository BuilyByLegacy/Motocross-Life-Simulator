// Marketplace — bike/part compatibility (issue #35)
// --------------------------------------------------------------------------
// Players need to know whether a part fits their bike. Compatibility drives
// used listings, dealer catalogs, upgrades, and parent budgeting — and creates
// real decisions (buy the cheap part that almost fits, or the correct OEM one).

export const FITMENT = ['direct', 'modify', 'incompatible', 'unknown'];

// Part families and which parts belong to them (for family-level fitment).
export const PART_FAMILIES = {
  suspension: ['fork', 'shock', 'linkage'],
  driveline: ['chain', 'sprocket', 'clutch'],
  engine: ['topEnd', 'piston', 'exhaust', 'carb'],
  wheels: ['tires', 'rims', 'hubs'],
  controls: ['brakes', 'levers', 'bars'],
  gear: ['helmet', 'boots', 'goggles', 'jersey'],
};

const CLASS_ORDER = ['50cc', '65cc', '85cc', 'Supermini', '250B', '450B'];

export function familyOf(category) {
  for (const [fam, cats] of Object.entries(PART_FAMILIES)) if (cats.includes(category)) return fam;
  return null;
}

// A normalized compatibility descriptor for a bike (fills gaps from bike data).
export function bikeCompat(bike = {}) {
  return {
    manufacturer: bike.manufacturer ?? null,
    model: bike.model ?? bike.name ?? null,
    year: bike.year ?? null,
    klass: bike.klass ?? null,
  };
}

// Check how a part fits a bike. Returns { status, note }.
//   direct       — bolts on
//   modify       — fits with work (adjacent year/class or generic gear)
//   incompatible — wrong class/manufacturer for a class-specific part
//   unknown      — not enough info; a mechanic can find out
// A skilled mechanic (`mechanicSkill`) resolves 'unknown' into a real answer.
export function checkFit(bike, part, { mechanicSkill = 0 } = {}) {
  const b = bikeCompat(bike);
  const fam = part.family ?? familyOf(part.category);

  // Universal gear fits anyone (sized, not bike-specific).
  if (fam === 'gear') return { status: 'direct', note: 'Fits any rider (check sizing).' };

  // Explicit fitment lists win.
  if (part.fitsClasses && part.fitsClasses.length) {
    if (part.fitsClasses.includes(b.klass)) return withYear(b, part, 'Listed to fit your class.');
    // Adjacent class → modify.
    const bi = CLASS_ORDER.indexOf(b.klass);
    if (part.fitsClasses.some((k) => Math.abs(CLASS_ORDER.indexOf(k) - bi) === 1)) {
      return { status: 'modify', note: 'Close class — would need adapting.' };
    }
    return { status: 'incompatible', note: `Built for ${part.fitsClasses.join('/')}, not ${b.klass}.` };
  }

  // Manufacturer-specific engine/driveline parts need a brand + class match.
  if ((fam === 'engine' || fam === 'driveline' || fam === 'suspension')) {
    if (part.manufacturer && b.manufacturer && part.manufacturer !== b.manufacturer) {
      return resolveUnknownable({ status: 'incompatible', note: `${part.manufacturer} part on a ${b.manufacturer}.` }, part, mechanicSkill, b);
    }
    if (!part.manufacturer && !part.fitsClasses) {
      // No fitment data at all — a genuine unknown until inspected.
      return resolveUnknownable({ status: 'unknown', note: 'No fitment data — ask a mechanic.' }, part, mechanicSkill, b);
    }
  }

  // Aftermarket/universal parts with a matching class implied.
  return withYear(b, part, 'Appears to fit.');
}

function withYear(b, part, note) {
  if (part.fitsYears && b.year != null && !part.fitsYears.includes(b.year)) {
    const near = part.fitsYears.some((y) => Math.abs(y - b.year) <= 1);
    return near ? { status: 'modify', note: 'A year off — minor fitment work.' } : { status: 'incompatible', note: 'Wrong model-year generation.' };
  }
  return { status: 'direct', note };
}

// If the honest answer is 'unknown', a skilled mechanic can determine the truth.
function resolveUnknownable(result, part, mechanicSkill, b) {
  if (result.status !== 'unknown') return result;
  if (mechanicSkill >= 55) {
    // Mechanic figures it out — usually correct: class/brand mismatch = no.
    if (part.manufacturer && b.manufacturer && part.manufacturer !== b.manufacturer) {
      return { status: 'incompatible', note: 'Mechanic confirms: wrong brand.' };
    }
    return { status: 'direct', note: 'Mechanic confirms it fits.' };
  }
  return result;
}

// Does this part fit at all (direct or modify)?
export function fits(bike, part, opts) {
  const s = checkFit(bike, part, opts).status;
  return s === 'direct' || s === 'modify';
}
