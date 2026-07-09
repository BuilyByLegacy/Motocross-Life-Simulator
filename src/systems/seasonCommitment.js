// Season Commitment Flow + Go Racing Launch (issues #229, #230; DD-0029)
// --------------------------------------------------------------------------
// A season moves from an editable draft to a reviewed, approved, locked, and
// active plan before race events can produce consequences. Planning is
// reversible and low-friction; commitment creates costs, deadlines, and family
// expectations. Race weekends are entered through an explicit, checked launch —
// never an ambiguous calendar click. Pure, deterministic, serializable.

export const SEASON_COMMIT_STATES = ['draft', 'review', 'approval', 'locked', 'active', 'complete'];

export function makeSeasonCommitment(state = 'draft') {
  return { state: SEASON_COMMIT_STATES.includes(state) ? state : 'draft', approvalGranted: false, lockedDay: null };
}

// Can the plan be locked yet? Draft/review edits stay safe; lock has preconditions.
//   ctx: { eventCount, hardConflicts, needsApproval, approvalGranted, overBudget }
export function lockPreconditions(ctx = {}) {
  const { eventCount = 0, hardConflicts = 0, needsApproval = false, approvalGranted = false, overBudget = false } = ctx;
  const blockers = [];
  if (eventCount < 1) blockers.push({ code: 'no_events', message: 'Add at least one race before locking the season.' });
  if (hardConflicts > 0) blockers.push({ code: 'conflicts', message: `Resolve ${hardConflicts} scheduling conflict(s) first.` });
  if (needsApproval && !approvalGranted) blockers.push({ code: 'needs_approval', message: 'A parent must approve the plan before it can be locked.' });
  // Over-budget is a warning, not a hard blocker (the family can still commit).
  return { canLock: blockers.length === 0, blockers, warnings: overBudget ? [{ code: 'over_budget', message: 'This plan runs over budget — you’ll be earning and selling to cover it.' }] : [] };
}

// The commitment state machine. Returns { state } or { error, state } on an
// invalid transition. Actions:
//   review           draft → review
//   request_approval review → approval  (dependent riders)
//   grant_approval   approval → approval (sets approvalGranted)
//   lock             review|approval → locked  (requires preconditions)
//   start            locked → active
//   complete         active → complete
//   back_to_draft    review|approval → draft   (edits are always safe)
export function advanceCommitment(commit, action, ctx = {}) {
  const s = commit.state;
  const set = (state, extra = {}) => ({ ...commit, state, ...extra });
  switch (action) {
    case 'review':
      if (s === 'draft') return set('review');
      break;
    case 'request_approval':
      if (s === 'review') return set('approval');
      break;
    case 'grant_approval':
      if (s === 'approval') return set('approval', { approvalGranted: true });
      break;
    case 'lock': {
      if (s !== 'review' && s !== 'approval') break;
      const pre = lockPreconditions(ctx);
      if (!pre.canLock) return { ...commit, error: pre.blockers[0]?.message ?? 'Cannot lock yet.', blockers: pre.blockers };
      return set('locked', { lockedDay: ctx.day ?? null });
    }
    case 'start':
      if (s === 'locked') return set('active');
      break;
    case 'complete':
      if (s === 'active') return set('complete');
      break;
    case 'back_to_draft':
      if (s === 'review' || s === 'approval') return set('draft', { approvalGranted: false });
      break;
    default:
      break;
  }
  return { ...commit, error: `Can’t ${action} from ${s}.` };
}

export function isLocked(commit) { return commit?.state === 'locked' || commit?.state === 'active' || commit?.state === 'complete'; }
export function isActive(commit) { return commit?.state === 'active'; }

// ---- #230 Go Racing launch checklist -------------------------------------
// Assemble the pre-race readiness checklist for the next committed race. The
// Go Racing action is only offered when every hard requirement passes.
//   ctx: { event, seasonActive, bikeReady, feesAffordable, klassEligible,
//          approvalOk, notInjured, alreadyRacedThisWeek }
export function goRacingChecklist(ctx = {}) {
  const {
    event = null, seasonActive = true, bikeReady = true, feesAffordable = true,
    klassEligible = true, approvalOk = true, notInjured = true, alreadyRacedThisWeek = false,
  } = ctx;
  if (!event) return { canRace: false, items: [], blockers: [{ code: 'no_event', message: 'No committed race is up next.' }] };

  const items = [
    { code: 'season_active', label: 'Season locked & active', ok: !!seasonActive },
    { code: 'class', label: `Eligible class: ${event.klass ?? event.kind ?? 'race'}`, ok: !!klassEligible },
    { code: 'bike', label: 'Bike is race-ready', ok: !!bikeReady },
    { code: 'fees', label: 'Entry fee covered', ok: !!feesAffordable },
    { code: 'health', label: 'Rider cleared to race', ok: !!notInjured },
    { code: 'approval', label: 'Parent approval', ok: !!approvalOk },
  ];
  const blockers = items.filter((i) => !i.ok).map((i) => ({ code: i.code, message: fixMessage(i.code, event) }));
  if (alreadyRacedThisWeek) blockers.push({ code: 'already_raced', message: 'You’ve already raced this weekend.' });
  return { canRace: blockers.length === 0, event: { name: event.name, klass: event.klass ?? event.kind, week: event.week }, items, blockers };
}

function fixMessage(code, event) {
  switch (code) {
    case 'season_active': return 'Lock your season plan before racing.';
    case 'class': return 'You’re not eligible for this class.';
    case 'bike': return 'Repair or prep the bike before the gate drops.';
    case 'fees': return `You can’t cover the entry fee for ${event.name ?? 'this race'}.`;
    case 'health': return 'The rider is injured and must sit this one out.';
    case 'approval': return 'A parent needs to approve racing this weekend.';
    default: return 'Something needs fixing before you can race.';
  }
}
