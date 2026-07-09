# Motocross: Chasing the Dream

**Tagline:**

Every rider has a story. Chase yours.

**Studio:**

Legacy Studios

**Motto:**

Build memories, not mechanics.

---

## 1. Product Vision

**Motocross: Chasing the Dream** is a mobile-first motocross life simulator where the player lives a rider's journey through family, bikes, racing, money, memories, relationships, and career outcomes.

The game is not only about winning races. It is about growing up around motocross, earning opportunities, managing sacrifice, remembering the people and places that shaped the rider, and discovering what kind of legacy remains when the career is over.

## 2. Core Design Principles

- People before players
- Memories matter more than rewards
- Earn every moment
- Authenticity before convenience
- The world does not revolve around the player
- Everything has history
- Decisions echo
- Respect the family
- Design for emotion
- Leave a legacy
- Monetization must never determine competitive success

## 3. Current Product Goal

Ship a polished App Store Version 1.0 that proves the core career loop, not the entire long-term dream.

Version 1.0 should feel stable, replayable, emotional, and coherent on mobile devices. It should prove that the calendar, garage, racing, family, money, and memory loop works before the project expands into the full long-term simulation vision.

## 4. Version Roadmap

### Prototype

**Goal:** prove calendar → garage → race → result → memory loop.

### Alpha

**Goal:** complete a playable youth career slice.

### Beta

**Goal:** add polish, balance, content, save/load, onboarding, and TestFlight readiness.

### Release Candidate

**Goal:** bug fixes only, App Store checklist, crash reporting, analytics, final QA.

### App Store v1.0

**Goal:** launch a stable, replayable, polished mobile version.

### v1.1+

**Goal:** improve content, garage depth, marketplace, balancing, and quality of life.

### v2.0+

**Goal:** deeper world simulation, friends/leaderboards, documentary engine, expansions.

## 5. Required v1.0 Systems

- Rider creation
- Family creation
- Age & Responsibility progression
- First bike
- Month-based calendar
- Home Region Selection and initial Geographic World Simulation scope
- Season planner
- Season lock-in
- Go racing flow
- Road to Loretta's basic qualification path if included
- Basic race simulation
- Basic garage
- Basic bike builder
- Basic marketplace and dealer parts
- Parent marketplace/repair behavior for young riders
- Basic money system
- Basic memory system
- Basic career progression
- Save/load
- Onboarding/tutorial
- Settings
- Crash reporting
- Analytics
- App Store assets
- Privacy policy

## 6. v1.0 Non-Goals

These systems remain planned, but they are not launch blockers for App Store Version 1.0:

- Full pro career
- Full documentary engine
- Full friends/leaderboards
- Deep AI family simulation
- Full dynamic world simulation
- Full parent campaign
- Era selection
- Advanced regional weather
- Deep travel/camping beyond basic travel distance and cost planning
- Full garage museum
- Advanced social systems
- Full all-states/all-regions geographic simulation and all regional tracks
- Paid expansions

## 7. Current High-Risk Areas

- Calendar state machine
- Season editing getting player stuck
- Loretta qualification accuracy
- Race loop fun factor
- Save/load stability
- Mobile UI complexity
- Scope creep
- Monetization balance
- Garage inventory complexity
- Marketplace/bike compatibility
- Geographic scope creep across regions, tracks, weather, dealers, and travel

## 8. Launch Readiness Checklist

- Core career loop verified
- No blocking calendar states
- Race flow works
- Save/load tested
- Tutorial complete
- UI polished
- App performs well on supported devices
- Crash reporting enabled
- Analytics enabled
- App Store listing ready
- TestFlight feedback reviewed
- Privacy/compliance complete
- Final QA checklist complete

## 9. GitHub Workflow

- Epics track major systems.
- Issues track specific work.
- Issue drafts live in `docs/github/issues`.
- Real GitHub Issues are created through the workflow.
- Every issue should include What / Why / How / Definition of Done.
- Existing future issues should be preserved, but categorized into v1.0, v1.1, v2.0, or future.

Planning documents should remain documentation-only until a scoped implementation issue is approved. Do not delete future-facing ideas just because they are outside the v1.0 cutline; preserve them and sort them into the right release horizon.

## 10. Recommended Next Actions

1. Fix P0 calendar/season flow issues
2. Correct Loretta qualification system with research
3. Define v1.0 cutline
4. Build vertical slice
5. Validate fun loop
6. Add save/load
7. Add onboarding
8. Polish UI
9. Run TestFlight
10. Submit App Store v1.0
11. Keep Home Region Selection, Geographic World Simulation, Regional Racing Calendar, Regional Tracks, Travel Distance/Cost, Regional Weather, Regional Reputation, Local Dealer Network, and Hometown Pride scoped to the approved v1.0 cutline
