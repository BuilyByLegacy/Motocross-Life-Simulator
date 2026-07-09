# TestFlight Beta Plan (#245)

Structured beta plan for the v1.0 release. The playable build ships today as a
web app (GitHub Pages); TestFlight applies to the native wrapper. The test
scripts and exit criteria below are build-agnostic and can run against either.

## Cohorts & cadence

- **Internal alpha (small, trusted):** every merged build. Focus: save/load,
  onboarding, the race loop, garage, marketplace, and no stuck states.
- **Closed external beta (invite):** weekly build cadence. Focus: first-season
  clarity, balance, comprehension, crashes, and performance on real devices.

## Tester instructions (script)

1. Start a **new career** (try both Rider and Parent).
2. Complete onboarding; note anything confusing (the coach should make the loop
   clear without docs).
3. **Build and lock** a season plan.
4. **Launch a race weekend** via Go Racing; run at least one race.
5. Return to the **garage**; prep the bike, order a part, browse the marketplace.
6. **Sell** a bike or part.
7. **Save, fully close, reopen, Continue** — confirm nothing was lost.
8. Finish a **season** and advance or retire.
9. Report: onboarding confusion, unfair outcomes, money pressure, race clarity,
   UI friction, and any crash.

## Feedback template

- Build/version:
- Device / OS:
- What were you trying to do?
- What happened vs. what you expected?
- Category: `onboarding | balance | money | race-clarity | UI | crash | other`
- Severity: `blocker | major | minor | polish`
- Repro steps / screenshot:

## Risk areas to probe

Calendar/season commitment, Road to Loretta's gating, save/load + migration,
first-run onboarding, garage/marketplace transactions, and performance on older
hardware.

## Exit criteria

- No known **save corruption** or data loss (validated by #242 + #246 recovery).
- No **blocking race-loop** bug (validated by the #241 core-loop test as a
  baseline; beta covers the human path).
- No **unhandled launch blocker** open (see #251 go/no-go).
- Crash/error volume (from #246 diagnostics) at or near zero across the beta.

## Rollback plan

Keep the previous accepted build available; if a beta build introduces a
save-breaking or loop-breaking regression, revert to the last green build and
re-run the internal alpha script before re-promoting.
