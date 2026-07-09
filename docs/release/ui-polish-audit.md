# UI Polish Pass (#244)

A focused v1.0 polish audit of the launch-critical screens on the web build,
verified at phone width (390×844) via automated screenshots + an overflow check.

## Method

- Playwright at 390×844, `deviceScaleFactor: 2`, dark theme.
- Every launch screen checked for horizontal overflow
  (`documentElement.scrollWidth <= clientWidth`) and console/page errors.
- Full-page screenshots reviewed for hierarchy, labels, and empty states.

## Result — launch-critical screens

| Screen | Overflow | Empty state | Notes |
|--------|----------|-------------|-------|
| Title / setup | none | n/a | 4-step wizard; corrupt-save recovery notice (#246) |
| Week hub (planner) | none | "No season scheduled." | Coach card, plan review, budget forecast all clear |
| Garage | none | "No hardware yet. Earn it." / "Nothing here carries a story yet." | Upgrade buttons show disabled state + `title` reason |
| Phone / marketplace | none | "Nothing listed right now…" points to the refresh action | |
| Journal | none | "No races yet." / "Quiet in the paddock." / "No memories yet." | Help card: replay tutorial, diagnostics, analytics toggle |
| People | none | "Friend not found." guard | |
| Stats | none | n/a | Meters legible |
| Season / career recap | none | "A quiet season." / "No races recorded." / "A quiet career." | |

**No horizontal overflow on any screen. No console or page errors across the
full navigation.** Long money values and rider names fit the compact stat grid
(labels ellipsize by design, e.g. `CONFIDEN…`, `HOUSEHOL…`).

## States covered

- **Empty states:** 12 across the app (schedule, sponsors, trophies, objects,
  marketplace, results, news, memories × scopes, season recap, career recap,
  friends).
- **Disabled states with reasons:** 9 disabled buttons; affordability-gated
  actions carry a `title`/hint (e.g. garage upgrades, dealer orders).
- **Error/recovery states:** corrupt-save notice on the title (#246); race
  launch blockers surface through the Go Racing checklist (#230) before the gate
  drops; storage-unavailable saves fail silently in-memory and are logged.
- **Loading:** the app renders synchronously from local state — no async
  spinners are needed for the v1.0 web build.

## Touch targets

`.btn` min-height 46px, `.choice` 52px, `.btn.small` 34px (secondary actions);
bottom tab bar is thumb-reachable. Confirmed against the mobile-first column
(`#app` max-width 480px, centered on desktop).

## Fixes applied this pass

- Added first-run onboarding **coach** and a Journal **Help** card (#243).
- Added a **corrupt-save recovery** notice + suppressed the broken Continue card
  when a save is invalid (#246).
- Added privacy-safe **diagnostics** and **analytics** summaries with a clear
  opt-out, styled to match the card system (#246/#247).

## Out of scope (deferred, not blocking)

Deeper visual redesign of future systems (living world, dealer network, Hall of
Fame) — those screens don't exist in v1.0. Audio/haptics polish is tracked in
the release-readiness checklist.
