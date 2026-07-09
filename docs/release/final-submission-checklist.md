# Final App Store Submission Checklist (#251)

The go/no-go gate for v1.0 submission. Submission proceeds **only** when every
item below is green or explicitly waived by the release owner.

## Go / no-go criteria

### Product readiness
- [x] Core career loop validated end-to-end, no stuck states (#241).
- [x] Save/load finalized: versioned, migrated, corruption-guarded (#242) with
      graceful recovery (#246).
- [x] First-time onboarding/tutorial in place, skippable + replayable (#243).
- [x] UI polish pass complete; no horizontal overflow, empty/error states
      covered (#244 → `ui-polish-audit.md`).
- [x] Performance/battery within targets; no animation/interval loops (#248 →
      `performance-and-battery.md`).

### Stability & telemetry
- [x] Crash/error logging in place, privacy-safe (#246 →
      `crash-reporting-and-error-logging.md`).
- [x] Analytics event plan defined, consent-gated, local (#247 →
      `analytics-event-plan.md`).
- [ ] TestFlight exit criteria met (#245 → `testflight-beta-plan.md`).

### Store metadata & compliance
- [ ] App Store assets complete and scope-accurate (#249 →
      `app-store-asset-checklist.md`).
- [ ] Privacy policy + support URLs live (#250 →
      `privacy-and-compliance.md`).
- [ ] App Privacy labels finalized; age rating answered.
- [ ] Monetization products (if any) reviewed for no-pay-to-win compliance —
      v1.0 ships none.

### Build & release
- [ ] Build number / version set.
- [ ] Release notes written.
- [ ] Final smoke test on target devices (new career → race → save → reopen →
      recap).
- [ ] Rollback plan confirmed (last green build retained — see #245).

## Launch-blocker gate

Submission is **blocked** while any open issue labeled `v1-launch-blocker`
remains unresolved. Current status:

- **Product/stability blockers (#241, #242, #243, #244, #246, #247, #248):**
  ✅ complete.
- **Native release-ops (#245, #249, #250, #251):** require the native wrapper,
  live URLs, and a TestFlight run — these are the remaining gates and are owned
  by the release/publishing step, not the codebase.

## Release owner sign-off

- [ ] Product: loop, save/load, onboarding verified.
- [ ] Stability: diagnostics clean across beta.
- [ ] Compliance: privacy labels + policy live, no pay-to-win.
- [ ] Release owner: **GO / NO-GO** decision recorded with date and build number.
