# Issue: Define App Store v1.0 Scope
## What
Define the exact feature scope that must ship in App Store Version 1.0 for **Motocross: Chasing the Dream**.

The v1.0 scope must include the minimum polished version of:

- Core career loop
- Rider creation
- Family creation
- First bike
- Calendar
- Season lock-in
- Go racing flow
- Basic race simulation
- Basic garage
- Basic marketplace/dealer parts
- Basic money
- Basic memories
- Basic career progression
- Save/load
- Onboarding
- Settings

## Why
Version 1.0 needs a clear launch target so the team can protect the core experience, avoid uncontrolled scope growth, and make App Store readiness decisions against a shared definition of must-have functionality.

## How
- Review existing design issues and epics without deleting or replacing them.
- Mark which systems are required for the first App Store release.
- Define the minimum acceptable player flow from new career through completed season recap.
- Identify blockers that would prevent launch if unfinished.
- Separate launch requirements from post-launch ambitions.

## Definition of Done
- A v1.0 scope checklist exists and is approved.
- Each required launch system has a concise description and acceptance criteria.
- Any feature not required for v1.0 is explicitly categorized as later scope.
- The scope supports a playable, replayable core career loop.
- The decision does not implement gameplay or create real GitHub issues directly.

## Related Epic
Release Readiness

## Labels
type: design, area: release, area: mvp, priority: p0-critical

⸻

# Issue: Create MVP Cutline: v1.0 vs Post-Launch
## What
Categorize planned systems into a clear MVP cutline so the backlog can be sorted without deleting existing planned work.

Use these categories:

- Required for v1.0
- Nice for v1.0
- v1.1 update
- v2.0 major update
- Long-term dream feature

## Why
The project has a large vision. The team needs a clear cutline to decide what ships now, what waits, and what remains part of the long-term dream without blocking launch.

## How
- Review existing planned issues and epics.
- Do not delete planned issues.
- Assign each major system or issue group to one cutline category.
- Flag dependencies that affect the v1.0 core loop.
- Keep the categorization focused on planning, not implementation.

## Definition of Done
- A categorized MVP cutline exists for major planned systems.
- Required v1.0 work is separated from later roadmap work.
- Existing planned issues remain intact.
- The cutline can be used to configure GitHub Projects views for v1.0, later, and someday.

## Related Epic
Release Readiness

## Labels
type: planning, area: roadmap, area: mvp, priority: p0-critical

⸻

# Issue: Define First Playable Vertical Slice
## What
Define the smallest playable version that proves the core game is fun and emotionally compelling.

Suggested slice:

- Ages 8–10
- One class
- One region
- One season
- Local races
- One Loretta qualifier attempt if ready
- Basic garage
- Basic bike builder
- Basic marketplace
- Basic memories
- Season recap

## Why
A vertical slice gives the team a focused build target that validates the career loop before expanding into the full motocross life simulation vision.

## How
- Define the player journey from career creation to season recap.
- List the minimum screens, data, events, and outcomes required.
- Identify what can be mocked, simplified, or deferred.
- Define success criteria for fun, clarity, replayability, and emotional payoff.

## Definition of Done
- A vertical slice design exists with included and excluded systems.
- The slice can be completed without implementing the full game vision.
- The slice proves racing, family, bike ownership, progression, and memories working together.
- Deferred features are documented for later roadmap categories.

## Related Epic
Release Readiness

## Labels
type: design, area: mvp, area: vertical-slice, priority: p0-critical

⸻

# Issue: Define v1.0 Career Length
## What
Decide how much of a rider career Version 1.0 supports.

Evaluate these options:

- One youth season only
- Childhood through 85cc
- Amateur career only
- Full life but simplified
- Multiple short careers

Document the recommended launch approach and the tradeoffs of each option.

## Why
Career length controls the amount of content, balance, writing, progression, memory tracking, and save/load complexity required for launch.

## How
- Compare each option against scope, replayability, emotional payoff, and implementation risk.
- Identify how each option supports the core career loop.
- Recommend the smallest career length that feels complete for v1.0.
- Document what career eras or transitions move to later updates.

## Definition of Done
- Each career-length option has documented pros, cons, and launch risk.
- A recommended v1.0 career length is selected.
- The recommendation aligns with the MVP cutline and vertical slice.
- Deferred career scope is categorized for v1.1, v2.0, or long-term roadmap.

## Related Epic
Career Outcomes System

## Labels
type: design, area: career, area: release, priority: p0-critical

⸻

# Issue: Define Minimum Race Simulation for v1.0
## What
Define the smallest race simulation that is good enough for Version 1.0 launch.

Include minimum support for:

- Starts
- Lap updates
- Position changes
- Mistakes
- Crashes
- Fatigue
- Bike condition
- Results
- Race memories

Advanced commentary, full track degradation, and deep weather can be deferred if needed.

## Why
Racing is central to the game promise, but the first launch version needs a reliable, understandable simulation more than a deep full-fidelity race engine.

## How
- Define the minimum race state model.
- Define how player preparation, rider ability, fatigue, and bike condition influence results.
- Define the race presentation cadence for starts, laps, incidents, finish, and recap.
- Specify which advanced systems are explicitly deferred.

## Definition of Done
- Minimum race simulation requirements are documented.
- Launch race outcomes are explainable to players.
- Race results can generate memories and progression changes.
- Deferred race depth is listed without blocking v1.0.

## Related Epic
Competition Engine

## Labels
type: design, area: race, area: mvp, priority: p0-critical

⸻

# Issue: Define Minimum Garage for v1.0
## What
Define what the garage must support at launch.

Include minimum support for:

- View bike
- View inventory
- Install/remove parts
- Sell items
- Display basic memories
- Basic storage
- Basic cosmetics if monetization exists

Deep museum mode can be deferred if needed.

## Why
The garage is where bike ownership, identity, history, and economic decisions become visible to the player. Version 1.0 needs a focused version that supports the core loop without requiring every long-term collection feature.

## How
- Define required garage screens and interactions.
- Define the relationship between bikes, parts, inventory, memories, and selling.
- Specify what garage data must persist in save/load.
- Identify museum, showcase, and advanced collection features for later releases.

## Definition of Done
- Minimum garage requirements are documented.
- Garage interactions support racing preparation and basic ownership history.
- Basic cosmetics are scoped only if launch monetization requires them.
- Deep museum mode is explicitly deferred unless later approved for v1.0.

## Related Epic
Garage Shop System

## Labels
type: design, area: garage, area: mvp, priority: p0-critical

⸻

# Issue: Define Minimum Marketplace for v1.0
## What
Define what marketplace functionality is required for launch.

Include minimum support for:

- Search
- Filters
- Bike compatibility
- Used listings
- Dealer parts catalog
- Buy item
- Sell item
- Listing expiry
- Basic seller trust

Auctions, scams, and advanced provenance can be deferred if needed.

## Why
The marketplace supports bike and part progression, money decisions, and the feeling of a living motocross economy. Version 1.0 needs enough depth to matter without overbuilding the economy simulation.

## How
- Define the minimum marketplace browsing and transaction flow.
- Define listing data, compatibility rules, pricing, expiry, and seller trust basics.
- Define how dealer catalog items differ from used listings.
- Identify advanced systems to move to later releases.

## Definition of Done
- Minimum marketplace requirements are documented.
- Buy and sell flows are clear enough for implementation planning.
- Compatibility and seller trust have simple launch definitions.
- Auctions, scams, and advanced provenance are deferred unless later approved.

## Related Epic
Bike Ownership System

## Labels
type: design, area: marketplace, area: mvp, priority: p0-critical

⸻

# Issue: Define Minimum Memory Engine for v1.0
## What
Define which memories must exist at launch.

Include minimum memories for:

- First race
- First win
- First crash
- First bike
- Big injury
- Qualifier attempt
- Bike sold
- Important family decision
- Season recap

The full documentary engine can be deferred if needed.

## Why
Memories are central to the emotional identity of the game. Version 1.0 needs a small but meaningful memory set that makes the career feel personal and replayable.

## How
- Define launch memory event types and trigger conditions.
- Define how memories are displayed in career, garage, and recap contexts.
- Define which memories affect progression, relationships, or player identity.
- Defer documentary-level presentation and deep legacy tooling if needed.

## Definition of Done
- Required v1.0 memory types are documented.
- Each memory type has a trigger, stored data, and display location.
- Season recap uses the minimum memory set.
- Full documentary engine scope is categorized for later roadmap work.

## Related Epic
Documentary Legacy Recap Engine

## Labels
type: design, area: memory, area: mvp, priority: p0-critical

⸻

# Issue: Define Minimum Monetization for v1.0
## What
Define launch monetization scope.

Include consideration for:

- Legacy Coins
- Cosmetic shop
- Rewarded ads only if ready
- No pay-to-win rule
- Restore purchases
- App Store compliance

Memberships and expansions can be deferred if needed.

## Why
Monetization must support the game without compromising fairness, progression, or authenticity. Version 1.0 needs clear guardrails before any store, currency, ads, or purchase restoration work is implemented.

## How
- Define which monetization systems are allowed at launch.
- Confirm that paid purchases cannot buy wins, stats, better bikes, better parts, qualification, injury immunity, or sponsor advantages.
- Define purchase restoration and App Store compliance requirements.
- Defer memberships and expansions unless explicitly approved for launch.

## Definition of Done
- Launch monetization scope and non-goals are documented.
- The no pay-to-win rule is explicit.
- Restore purchase and App Store compliance requirements are captured.
- Deferred monetization features are categorized for later roadmap work.

## Related Epic
Release Readiness

## Labels
type: design, area: monetization, area: release, priority: p0-critical

⸻

# Issue: Create Version Roadmap
## What
Create a release roadmap for the project.

Include these versions:

- v0.1 prototype
- v0.2 vertical slice
- v0.3 internal alpha
- v0.4 TestFlight alpha
- v0.5 external beta
- v1.0 App Store launch
- v1.1 first content update
- v2.0 major expansion

## Why
A version roadmap helps the team sequence design, implementation, testing, content expansion, and release-readiness work without treating every planned feature as a launch blocker.

## How
- Define the purpose of each version.
- Define rough entry and exit criteria for each milestone.
- Map the v1.0 scope, MVP cutline, vertical slice, and launch non-goals into the roadmap.
- Keep dates optional unless release planning later requires them.

## Definition of Done
- A version roadmap exists with version names, goals, and exit criteria.
- v1.0 is clearly separated from v1.1, v2.0, and long-term dream work.
- The roadmap can be referenced by milestones and GitHub Projects views.

## Related Epic
Release Readiness

## Labels
type: planning, area: roadmap, area: release, priority: p0-critical

⸻

# Issue: Define Launch Non-Goals
## What
Create a list of features that are intentionally not required for Version 1.0.

Possible non-goals:

- Full pro career
- Full documentary engine
- Full friends leaderboard
- Era system
- Deep world simulation
- AI families
- Advanced weather
- Advanced travel
- Full parent campaign
- All bike classes
- All regions
- Full multiplayer/social system

## Why
Launch non-goals protect the team from accidental scope creep and make it clear that long-term vision features can remain planned without blocking App Store release.

## How
- Review existing planned issues and systems.
- List features that are intentionally excluded from v1.0.
- Explain whether each non-goal is expected in v1.1, v2.0, or long-term roadmap.
- Confirm that non-goals are not deleted from planning documentation.

## Definition of Done
- A launch non-goals list exists.
- Each non-goal has a short rationale or future roadmap category.
- The list reinforces that planned issues remain valid but not launch-blocking.
- The non-goals list is referenced by project setup and roadmap planning docs.

## Related Epic
Release Readiness

## Labels
type: planning, area: release, area: scope-control, priority: p0-critical

⸻

# Issue: Update Design Decision Log
## What
Add the following design decision:

**DD-0035 — Version 1.0 Must Prove the Core Loop Before the Full Vision**

Version 1.0 should focus on a polished, playable, replayable core career loop. Large systems already planned in GitHub issues may remain part of the long-term roadmap without blocking launch.

## Why
The project needs a documented decision that launch quality and core-loop proof come before the full long-term feature vision.

## How
- Add DD-0035 to the design decision log or relevant GDD documentation.
- Reference the v1.0 scope, MVP cutline, vertical slice, launch non-goals, and roadmap planning work.
- Confirm that this decision does not delete, invalidate, or implement any existing planned issue.

## Definition of Done
- DD-0035 is documented in the appropriate design decision log location.
- The decision clearly states that Version 1.0 proves the core loop before the full vision.
- Related roadmap and scope planning references are linked where appropriate.

## Related Epic
Release Readiness

## Labels
type: documentation, area: gdd, area: release, priority: p1-high
