# Road to Loretta's — Corrected Qualification Structure (research-backed)

Resolves issue **#223** ("Research and Correct Loretta Lynn's Qualification
Structure"). This document records the real AMA Amateur National Motocross
Championship qualifying process, cites current official/industry sources, and
maps it to the game's implementation in `src/systems/lorettasPath.js`.

> **Principle:** Loretta's is a *qualification journey* (DD-0018), never a
> selectable race. Only riders who earn advancement reach the Ranch.

## The real qualifying process (researched)

To race the AMA Amateur National Motocross Championship at Loretta Lynn's Ranch,
a rider completes a **two-step qualifying process** — Area Qualifiers, then
Regional Championships — before earning a National entry:

- **Eight geographic regions:** Northeast, Southeast, Mid-East, North Central,
  South Central, Northwest, Mid-West, and Southwest. Each region has up to eight
  Area Qualifiers (50+ nationwide).
- **Area Qualifiers** — a **two-moto** format offering all classes. Riders must
  finish in an advancement position (commonly **Top 9**, varying by region per
  the supplemental rules) to guarantee a spot at the Regional. Riders may attempt
  more than one Area Qualifier to try to earn an advancement position.
- **Regional Championships** — the next seeding step (13 Regionals across the 8
  regions), run in a **three-moto** format (riders attend both weekend days so all
  motos count toward an overall). Most regions split into a **Youth Regional** and
  an **Amateur Regional** to handle rider volume (the Northwest and Southwest do
  not split). Only riders who finish in a qualifying position — **Top 6** — advance
  to the National.
- **National Championship** — at **Loretta Lynn's Ranch, Hurricane Mills, TN**
  (2026: **August 3–8**), a **three-moto** format decides each class title. It is
  invite-only: a rider cannot enter without advancing through a Regional.
- Class eligibility follows the AMA amateur class structure (age/displacement),
  and riders may qualify in more than one eligible class.

### Sources
- [How to Qualify — MX Sports](https://mxsports.com/how-to-qualify)
- [2026 AMA Amateur National Motocross Championship Area Qualifier and Regional Championship Dates — MX Sports](https://mxsports.com/2025/12/11/2026-ama-amateur-national-motocross-area-qualifier-and-regional-championship-dates)
- [2026 AMA Amateur National Motocross Championship Qualifiers & Regionals Dates Announced — Racer X](https://racerxonline.com/2025/12/15/2026-ama-amateur-national-motocross-championship-dates-announced)
- [Amateur Motocross — American Motorcyclist Association](https://americanmotorcyclist.com/racing/motocross/amateur-motocross/)
- [2026 Loretta Lynn Area Qualifier and Regional Championship Dates Announced — Vurbmoto](https://www.vurbmoto.com/2026-loretta-lynn-area-qualifier-and-regional-championship-dates-announced/)

*(Advancement counts and formats reflect the process described by these sources
for the 2025–2026 cycle. Exact Area advancement positions vary by region per the
official supplemental rules; the game uses Top 9 as a legible deterministic
default.)*

## How the game models it

Implemented in `src/systems/lorettasPath.js` — a three-stage, per-class,
region-locked state machine.

| Stage | Real format | Advance rule | Game `STAGE_INFO` |
| --- | --- | --- | --- |
| Area Qualifier | 2 motos | Top ~9 → Regional | `advanceSlots: 9, motos: 2` |
| Regional Championship | 3 motos | Top 6 → National | `advanceSlots: 6, motos: 3` |
| Loretta's National | 3 motos | title (invite-only) | `advanceSlots: 0, motos: 3` |

- **Regions:** `LORETTA_REGIONS` now lists the eight real regions (Northeast,
  Southeast, Mid-East, North Central, South Central, Northwest, Mid-West,
  Southwest). Advancement is locked to the region a rider starts in.
- **Qualification state machine:** per class, `reached` tracks the furthest
  cleared stage (`none → area → regional`); `dreamState` tracks
  `dormant → chasing → area_qualified → regional_qualified → national_qualified`
  (or `eliminated`). `eligibleToEnter()` enforces the prerequisites — a Regional
  requires clearing an Area, and the **National is locked unless a Regional is
  cleared**.
- **Multiple Area attempts** are allowed (`recordAttempt` appends attempts;
  region locks on the first). **Multiple classes** are tracked independently.
- **Failed qualification paths:** finishing outside the advancement positions
  sets `eliminated`, and `followUpChoices()` offers real options — try another
  Area Qualifier, focus local, save for next season, train harder, or change
  class strategy.
- **Player-facing explanation:** planner warnings (`pathWarnings`) flag a missing
  Area Qualifier, an unqualified Regional/National on the plan, region splits, and
  bad date ordering; the season board shows a Road-to-Loretta's dream tracker.

### What changed for #223
- Area advancement corrected **6 → 9**; Regional advancement corrected **8 → 6**
  (top-6-to-the-Ranch is the real, meaningful cut).
- Regions corrected to the **eight** real AMA regions (removed the inaccurate
  "Mid-South"; added "Mid-East" and "Mid-West").
- Added real **moto formats** (Area 2, Regional 3, National 3) to `STAGE_INFO`.
- National remains invite-only and locked without a Regional advancement (already
  enforced) — now documented and covered by a structure test in
  `test/lorettasPath.test.mjs`.

## Deferred / not modeled (by design, for the prototype)
- The Youth vs. Amateur Regional split and the two-day Regional attendance detail
  are narrative flavor, not separate event objects, in the current build.
- Exact per-region supplemental advancement counts are approximated by the Top-9
  Area default.
- Alternates/backup entries and the full AMA class-by-displacement table are out
  of scope for the prototype; class eligibility uses the game's simplified ladder
  (`LORETTA_CLASSES`).
