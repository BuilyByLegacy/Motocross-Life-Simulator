# Privacy & Compliance (#250)

Privacy and compliance review for v1.0. The guiding constraint: this game is
attractive to **children**, so data collection is minimal, local, and opt-in
where any collection exists.

## Data inventory

| Data | Where | Purpose | Leaves device? | Retention |
|------|-------|---------|----------------|-----------|
| Game save (career, rider/family, bike, garage, money, calendar, season, Loretta, onboarding, settings) | `localStorage` (`legacy_mx_save_v2`) | Persist the player's career | **No** | Until the player starts a new life or clears storage |
| Diagnostics (error type, truncated message, coarse context) | `localStorage` (`legacy_mx_diag`) | Crash/error visibility (#246) | **No** | Ring buffer, 50 entries; cleared on demand |
| Analytics events (coarse, whitelisted props) | in-memory / `localStorage` (#247) | Understand the launch funnel | **No** (local only) | Ring buffer, 200 entries; cleared on opt-out |
| Analytics consent flag | `localStorage` (`legacy_mx_analytics_consent`) | Remember the opt-in/out choice | No | Until changed |

**No account, no login, no personal profile.** The rider's name is a local game
value and is **never** placed into a diagnostic or analytics event (whitelist
filtering enforces this — verified by tests in #246/#247).

## Permissions

The web build requests **no device permissions** (no location, camera,
microphone, contacts, notifications). A native wrapper should request none for
v1.0.

## App Privacy labels (native)

- Data used to track you: **None.**
- Data linked to you: **None.**
- Data not linked to you: only if a native analytics/crash transport is added at
  the wrapper layer — and then only anonymous diagnostics, opt-in, no child PII.

## Child-directed considerations

- Analytics **must default OFF** on a child-directed native launch and require
  explicit opt-in (documented in `analytics-event-plan.md`). The web prototype
  defaults ON only because nothing leaves the device.
- No behavioral advertising. If ads ever ship, they must be age-appropriate and
  non-competitive (see monetization below).
- No social/online systems that transmit child data. Connected Careers uses
  copy-paste codes only — no server, no accounts.

## Monetization compliance

Per the v1.0 scope, monetization is **allowed only if non-competitive and
compliant**: cosmetics/presentation, restore purchases, and rewarded ads that do
not alter outcomes. **Forbidden:** buying wins, stats, bikes, parts, entries,
Loretta qualification, injury immunity, or any hidden outcome boost. v1.0 ships
with **no** competitive monetization.

## Accidental-blocker check

No unapproved monetization, social, or online system is wired as a launch
dependency. Connected Careers, friends, and leaderboards are offline/optional and
are **launch non-goals** (see `v1-scope-and-launch-plan.md`).

## Definition of done

- [x] Data inventory documented (above).
- [ ] App Privacy labels finalized for the native build.
- [ ] Privacy policy published at a live URL (gates #251).
- [ ] Compliance risks linked to issues (none open for the web build).
