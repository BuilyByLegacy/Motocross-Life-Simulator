# Analytics Event Plan (#247)

The minimum analytics needed to understand the v1.0 funnel — onboarding,
season commitment, racing, save health — with **no personal data** and **no
network transmission**. Implemented in `src/systems/analytics.js`, wired at boot
in `src/main.js`, and inspectable on `window.__analytics` for QA.

## Principles

- **Local only.** Nothing is sent anywhere. Events accumulate in memory (capped
  at 200) and are available for inspection; a native launch would add a
  store-compliant transport at the wrapper layer, feeding the same event set.
- **Consent-gated.** `track()` is a no-op unless consent is granted. The web
  prototype defaults ON because data never leaves the device; a **child-directed
  native launch must default OFF and require explicit opt-in.** Opt-out (Journal →
  Help → "Turn analytics off") clears the buffer immediately.
- **Privacy-safe properties.** Only a whitelist of coarse fields is kept
  (`campaign, klass, background, depth, week, season, overall, points, dnf,
  amount, item, kind, code, error_type, result`). The rider's name and any free
  text can never enter an event.

## Events

| Event | Fired at | Key props |
|-------|----------|-----------|
| `career_started` | `App.startGame()` | campaign, background, depth, klass |
| `season_committed` | `App.confirmProgram()` after lock→active | season |
| `race_weekend_started` | interactive / quick-sim / parent race launch | week, klass |
| `race_completed` | `Game.applyRaceResult()` via `race:completed` bus event (all sim depths) | week, klass, overall, points, dnf |
| `season_completed` | `Game.archiveSeason()` via `season:completed` bus event | season, points |
| `save_loaded` | `App.continueGame()` on success | season, week |
| `marketplace_purchase` | `App.doBuy()` | amount, kind |
| `dealer_order` | dealer "Order" action | item, amount |
| `bike_sold` | listing "Accept a buyer" | amount |
| `crash_error` | any `App._diag()` (mirrors diagnostics) | error_type |

`race_completed` and `season_completed` are captured at **single domain choke
points** on the game's event bus, so they fire identically regardless of
simulation depth (Detailed / Key Moments / Fast Sim).

## Dashboards (analysis intent)

- **Onboarding funnel:** `career_started` → `season_committed` →
  `race_weekend_started` → `race_completed`. Drop-off between steps flags where
  first-run players get stuck.
- **Loop retention:** `season_completed` count per device; `save_loaded` shows
  returning sessions.
- **Economy engagement:** `marketplace_purchase` / `dealer_order` / `bike_sold`.
- **Stability:** `crash_error` volume by `error_type` (mirrors #246 diagnostics).

## What is intentionally NOT instrumented

No post-launch/backlog systems (living world, AI careers, reputation, Hall of
Fame, etc.) are instrumented — analytics is scoped to the launch loop and never
becomes a launch blocker for deferred features.

## QA verification

- `test/analytics.test.mjs` — 6 unit tests (consent gating, revoke-clears,
  unknown-event rejection, property whitelisting, all events accepted/counted,
  sink persistence).
- Browser smoke: a full run produces
  `career_started, season_committed, race_weekend_started, race_completed,
  season_completed` and the Journal opt-out toggle clears the buffer — no
  console/page errors. Inspect live with `window.__analytics.countByEvent()`.
