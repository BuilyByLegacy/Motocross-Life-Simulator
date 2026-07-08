# Issue: Implement Class-Based Competition Progression

## What
Create competition progression models that allow a rider to dominate one class, struggle in the next, change classes, and experience non-linear career development.

## Why
The game should reject simple upward ladders. Real riders have uneven development, class-specific strengths, confidence swings, and setbacks.

## How
Model rider performance by class, bike, track type, experience, confidence, and competition level. Keep the system deterministic and data-driven for future race simulation.

## Definition of Done
- [ ] Rider performance can vary independently by class.
- [ ] Class changes preserve historical performance context.
- [ ] Competition level can affect expected results and pressure.
- [ ] Results can update class-specific progression state.
- [ ] Tests cover class jump success and struggle scenarios.

## Related Epic
Competition Engine

## Labels
`mvp`, `competition`, `progression`, `career`, `systems`

# Issue: Build Race Result Resolution Model

## What
Implement a result resolution model that records entries, motos, finishes, points, DNFs, DNS, penalties, and overall placements without building full gameplay racing.

## Why
The MVP needs credible outcomes to drive memories, standings, confidence, and season planning while avoiding premature gameplay implementation.

## How
Create data models and services that accept race inputs or simulated placeholders and produce structured result records. Results should link to riders, bikes, events, classes, and calendar entries.

## Definition of Done
- [ ] Results support moto finishes, overall placement, points, DNF, DNS, and penalties.
- [ ] Results link to event, rider, class, bike, and calendar records.
- [ ] Result records are serializable.
- [ ] Results can emit memory and notification events.
- [ ] Tests cover normal finish, DNF, DNS, and penalty cases.

## Related Epic
Competition Engine

## Labels
`mvp`, `competition`, `race-results`, `simulation`, `memory-engine`

# Issue: Implement Rival and Field Strength Metadata

## What
Create metadata for race fields, including rival riders, field size, local fast riders, national-level competition, and class depth.

## Why
People before players means competition should feel like racing against recognizable humans with history, not anonymous difficulty numbers.

## How
Define field composition objects and rival references that can be attached to events and classes. Field strength should influence expected results and narrative summaries.

## Definition of Done
- [ ] Events can define field size and strength by class.
- [ ] Rival riders can appear in recurring events.
- [ ] Field strength affects result expectation metadata.
- [ ] Rival encounters can create memory hooks.
- [ ] Tests cover repeat rival appearances.

## Related Epic
Competition Engine

## Labels
`mvp`, `competition`, `rivals`, `narrative`, `systems`

# Issue: Add Confidence and Momentum Effects

## What
Implement confidence and momentum state that changes based on results, DNFs, class changes, injuries, family pressure, and breakthrough moments.

## Why
Design for emotion means performance should carry psychological context. A rider should remember both the win streak and the crash that changed everything.

## How
Create state variables and update rules for confidence and momentum. Changes should be explainable, bounded, serializable, and available to memory and UI systems.

## Definition of Done
- [ ] Confidence and momentum can increase, decrease, and stabilize.
- [ ] Updates include reason codes and source references.
- [ ] State changes can create phone notifications or memories.
- [ ] Effects are bounded to prevent runaway values.
- [ ] Tests cover win streak, slump, and class-change cases.

## Related Epic
Competition Engine

## Labels
`mvp`, `competition`, `confidence`, `narrative`, `state`

# Issue: Create Standings and Points Calculation Service

## What
Implement standings and points calculations for event series, qualifiers, championships, and custom season groupings selected by the player.

## Why
Players need context for their results, but rewards should serve memories. Standings should explain where the rider is in a competitive story.

## How
Create configurable points tables, tie-breakers, dropped-score support, and standings queries. Calculations should consume race result records without requiring gameplay implementation.

## Definition of Done
- [ ] Points tables are configurable per competition format.
- [ ] Standings can be calculated by event, series, class, and season grouping.
- [ ] Tie-breakers are deterministic and documented.
- [ ] Dropped-score rules can be represented.
- [ ] Tests verify standings and tie-breaker outcomes.

## Related Epic
Competition Engine

## Labels
`mvp`, `competition`, `standings`, `points`, `backend`
