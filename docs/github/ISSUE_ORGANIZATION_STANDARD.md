# GitHub Issue Organization Standard

Use this standard when organizing issues for **Motocross: Chasing the Dream**.

Studio: Legacy Studios  
Tagline: Every rider has a story. Chase yours.  
Motto: Build memories, not mechanics.

This document is for issue cleanup only. Do not implement gameplay while triaging issues.

## Required review pass

For every open issue:

1. Confirm whether the issue is `research`, `design`, `implementation`, `documentation`, `bug`, or `epic`.
2. Link it to exactly one epic when possible.
3. Apply one type label, one priority label, relevant area labels, and one status label.
4. Rewrite vague issue bodies into the required structure.
5. Preserve useful existing intent and move uncertainty into an `## Open Questions` section.
6. Identify duplicate issues, but do not close them unless the duplicate relationship is clear and explained in a comment.
7. Split broad issues into smaller research, design, implementation, or documentation tasks.

## Normal issue format

```markdown
## What
Describe exactly what needs to be built, fixed, designed, researched, or decided.

## Why
Explain why this matters to the game, the player experience, the Design Bible, or the simulation.

## How
Describe the expected approach, files/sections likely affected, or design direction.

## Definition of Done
- [ ] Specific deliverable completed
- [ ] Design Bible / GDD updated if needed
- [ ] Labels and Epic links are correct
- [ ] No open questions left, or open questions are documented
```

## Epic issue format

```markdown
## Purpose
What major system this Epic covers.

## Why It Matters
Why this system is important to Motocross: Chasing the Dream.

## Scope
What belongs inside this Epic.

## Example Child Issues
- [ ] Example child issue 1
- [ ] Example child issue 2
- [ ] Example child issue 3

## Definition of Done
- [ ] System design spec completed
- [ ] Related research completed or documented
- [ ] Implementation issues created
- [ ] MVP requirements identified
- [ ] Open questions documented
```


## Required epic catalog

Create or verify these 20 GitHub issues and label each one `type: epic`. Use the full copy/paste-ready bodies in `docs/github/EPIC_ISSUE_BODIES.md`.

1. **EPIC: Core Simulation Engine** — time, entities, state changes, rules, and long-running outcomes.
2. **EPIC: Memory Engine** — meaningful events remembered by riders, families, rivals, sponsors, and the world.
3. **EPIC: Relationship Engine** — family, rivals, friends, sponsors, mechanics, and community trust.
4. **EPIC: Story Engine** — emergent story moments, authored beats, consequences, and callbacks.
5. **EPIC: World Simulation Engine** — NPC riders, teams, events, opportunities, and market changes.
6. **EPIC: Calendar & Time Engine** — days, weeks, seasons, deadlines, routines, and career pacing.
7. **EPIC: Family & Economy Engine** — budgets, sacrifices, work, parental support, and financial pressure.
8. **EPIC: Competition / Race Engine** — race weekends, classes, qualifying, results, fatigue, and consequences.
9. **EPIC: Asset Engine** — ownership, condition, history, depreciation, and lifecycle of bikes, parts, gear, vehicles, and property.
10. **EPIC: Marketplace Engine** — searchable used marketplace listings, negotiation, risk, and opportunity.
11. **EPIC: Garage & Property System** — storage, repairs, upgrades, trophies, and home-base identity.
12. **EPIC: Phone / Internet UI** — messages, calendar, marketplace browsing, race information, photos, and notifications.
13. **EPIC: Career Progression** — non-linear paths through amateur, regional, national, sponsored, and life-stage progression.
14. **EPIC: Road to Loretta’s** — qualification, preparation, pressure, travel, cost, and family sacrifice.
15. **EPIC: Rider Development Curves** — growth, plateaus, regression, specialization, burnout, and confidence.
16. **EPIC: Bike Class Transitions** — age, skill, bike size, eligibility, and emotional/financial timing.
17. **EPIC: Parent Campaign** — guiding, funding, supporting, and emotionally stewarding a rider’s dream.
18. **EPIC: Rider Campaign** — training, racing, school/life balance, confidence, identity, and ambition.
19. **EPIC: Research Binder** — structured research for culture, rules, costs, family life, equipment, and competition.
20. **EPIC: MVP Vertical Slice** — smallest playable slice that proves the game’s core promise.

## Epic mapping rules

Use issues labeled `type: epic` as epics. Do not duplicate existing epics. If a needed epic does not exist, create it or recommend it during triage.

Every non-epic issue should link to one primary epic when possible. If multiple systems are involved, choose the epic that owns the first deliverable and mention secondary related epics in the issue body.

## Topic-specific cleanup rules

### Season Event Planner

Replace any issue language that asks, “How big do you want to race?” with a Season Event Planner framing. The planner should let the player choose events based on local races, Area Qualifiers, Regional Championships, Loretta Lynn National, major amateur nationals, training camps, sponsor obligations, rest weekends, budget, travel, school or work, bike condition, injuries, and parent approval.

Primary epic: **EPIC: Calendar & Time Engine**.  
Related epics: **EPIC: Career Progression**, **EPIC: Road to Loretta’s**.

### Road to Loretta’s

Loretta Lynn’s must be treated as a qualification journey, not a single event. Issues should represent the path as Area Qualifier, Regional Championship, and Loretta Lynn National. Making it to Loretta’s should be a major achievement.

Primary epic: **EPIC: Road to Loretta’s**.

### Nonlinear Career Progression

Remove language implying every rider naturally progresses upward through classes. Careers can include early success, struggles after a bike transition, missed qualification years, late blooming, or a meaningful career that never turns pro.

Primary epic: **EPIC: Career Progression**.  
Related epics: **EPIC: Rider Development Curves**, **EPIC: Bike Class Transitions**.

### Marketplace

Marketplace issues should cover search, saved searches, filters, bike compatibility, used listings, seller reputation, negotiation, private sellers, dealer listings separated from used listings, item history, serial numbers, ownership history, scams or hidden damage, and phone notifications when relevant.

Primary epic: **EPIC: Marketplace Engine**.  
Related epics: **EPIC: Asset Engine**, **EPIC: Phone / Internet UI**.

### Dealer Websites

Dealer parts should be separate from the used marketplace. Dealer website issues should cover OEM parts catalog, MSRP, availability, compatibility, shipping or pickup, sponsor or dealer discounts, warranty, and backorder risk.

Primary epic: **EPIC: Marketplace Engine**.  
Related epics: **EPIC: Phone / Internet UI**, **EPIC: Asset Engine**.

### Phone / Internet UI

The phone should be an in-game interface with apps such as Marketplace, Dealer Websites, Race Calendar, Messages, Social Media, MotoNews, Garage / Maintenance, Sponsors, and Banking or money views when appropriate for the player age or campaign role.

Primary epic: **EPIC: Phone / Internet UI**.

## Triage summary template

Use this format after a cleanup pass:

```markdown
## Issues Reviewed
- Total reviewed:
- Total updated:
- Total needing manual review:
- Total duplicates found:

## Epic Mapping
- #123 — Issue title — EPIC: Example

## Label Changes
- #123 — Added `type: design`, `priority: p2-medium`, `area: calendar`, `status: needs-design`

## Splits Recommended
- #123 — Split into research, design, and implementation tasks because ...

## Manual Follow-Up Needed
- Create missing epic issue: EPIC: Example
- Confirm blocker: ...
```
