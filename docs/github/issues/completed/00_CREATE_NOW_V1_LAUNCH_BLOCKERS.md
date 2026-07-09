# Create Now: App Store v1.0 Launch Blocker Issue Drafts

These are the only issue drafts that should be promoted into real GitHub Issues now for the playable App Store v1.0 push. All other files in `docs/github/issues/` remain design backlog unless explicitly promoted.

Issue count: 27

---

# Issue: Fix Season Plan Commitment Flow
## What
Create the v1.0 flow that moves a season from editable draft to reviewed, approved, locked, and active.
## Why
The core career loop needs a clear commitment point before race events can produce consequences. Without lock-in, players can get trapped between planning and playing.
## How
- Define season states: Draft Plan, Review Plan, Family Approval, Locked Season, Active Season, Season Complete.
- Make Draft Plan fully editable and safe.
- Add review summaries for cost, travel, dates, conflicts, bike readiness, and family approval.
- Require explicit Lock Season confirmation before events become commitments.
- Ensure Active Season can be entered without race gameplay implementation beyond the launch stub/flow contract.
## Definition of Done
- [ ] Season state transitions are documented and testable.
- [ ] Lock-in preconditions and failure messages are defined.
- [ ] Parent/family approval rules for dependent riders are included.
- [ ] Locked-season consequences are listed.
- [ ] Implementation notes avoid adding gameplay beyond flow wiring.
## Related Epic
EPIC: Calendar & Time Engine; EPIC: Season Planner; EPIC: Release Readiness
## Labels
`type: implementation`, `area: calendar`, `area: season-planner`, `priority: p0-critical`, `v1-launch-blocker`
## Suggested Milestone
Vertical Slice

---

# Issue: Add Go Racing Event Launch Flow
## What
Add the calendar-to-event launch path for the next committed race in an active season.
## Why
Players need an obvious way to start the next race weekend from the calendar once a season is locked. This is required for a playable v1.0 loop even if race simulation remains minimal.
## How
- Identify the next eligible committed race from the active season calendar.
- Add a Go Racing action only when prerequisites are satisfied.
- Show pre-race checklist: date, class, bike readiness, fees, travel, family approval, and warnings.
- Route to the existing/minimum race simulation entry point or placeholder contract.
- Return results and calendar state back to the career loop.
## Definition of Done
- [ ] Go Racing action appears only for eligible active events.
- [ ] Blocked states explain what the player must fix.
- [ ] Launch flow preserves calendar, bike, money, and save state.
- [ ] Flow supports QA validation without implementing advanced gameplay.
## Related Epic
EPIC: Competition Engine; EPIC: Calendar & Time Engine; EPIC: Release Readiness
## Labels
`type: implementation`, `area: racing`, `area: calendar`, `priority: p0-critical`, `v1-launch-blocker`
## Suggested Milestone
Vertical Slice

---

# Issue: Fix Mid-Season Schedule Editing So Player Cannot Get Stuck
## What
Define and implement safe mid-season edit rules for locked and active seasons.
## Why
Players may need to cancel, reschedule, or replace events after lock-in. The system must never leave them without a valid next action.
## How
- Allow only safe edits after lock-in: cancel future event, swap future event, defer non-critical event, or request family approval.
- Prevent edits to completed, in-progress, or qualification-dependent events that would corrupt state.
- Add recovery paths for invalid calendars: skip to next valid date, cancel with consequence, or restore last valid plan.
- Document refund, fee loss, deadline, and relationship consequences.
## Definition of Done
- [ ] Active-season edit permissions are documented by event state.
- [ ] Player always has at least one safe next action.
- [ ] Invalid edits produce actionable warnings.
- [ ] Qualification and Loretta paths cannot be broken by schedule editing.
- [ ] Regression scenarios are listed.
## Related Epic
EPIC: Calendar & Time Engine; EPIC: Season Planner; EPIC: Release Readiness
## Labels
`type: implementation`, `area: calendar`, `area: ux`, `priority: p0-critical`, `v1-launch-blocker`
## Suggested Milestone
Vertical Slice

---

# Issue: Add Month-Based Calendar View
## What
Replace or supplement the short week-only calendar with a month-based season calendar view for planning and active-season play.
## Why
Season planning, Loretta qualification, deadlines, and family commitments need a wider time horizon than a week view provides.
## How
- Show month grid with events, deadlines, travel days, prep tasks, birthdays/school placeholders, and blocked dates.
- Support navigation between months in the season.
- Distinguish draft, locked, completed, missed, and available events.
- Keep the view lightweight for v1.0; do not add advanced world simulation.
## Definition of Done
- [ ] Month view requirements are defined.
- [ ] Event/deadline visual states are documented.
- [ ] Calendar supports season planning and active season review.
- [ ] Accessibility and small-screen readability requirements are included.
## Related Epic
EPIC: Calendar & Time Engine; EPIC: Phone & World UI
## Labels
`type: implementation`, `area: calendar`, `area: ui`, `priority: p0-critical`, `v1-launch-blocker`
## Suggested Milestone
Vertical Slice

---

# Issue: Add Calendar Regression Tests for Season Flow
## What
Add regression coverage for season lock-in, active-season progression, Go Racing launch, mid-season edits, and Loretta calendar gates.
## Why
Calendar bugs can block the entire v1.0 loop. These tests protect the highest-risk launch flow.
## How
- Cover Draft → Review → Locked → Active → Complete transitions.
- Cover blocked lock-in, missing approval, schedule conflicts, and no-next-event recovery.
- Cover Go Racing eligibility and return path.
- Cover Loretta Area/Regional/National date and qualification gates.
- Include save/load round trips for key calendar states.
## Definition of Done
- [ ] Test matrix is created.
- [ ] Automated tests exist for critical state transitions where the codebase supports them.
- [ ] Manual QA scenarios exist for UI-only gaps.
- [ ] Tests fail on known stuck-calendar states.
## Related Epic
EPIC: Calendar & Time Engine; EPIC: Release Readiness
## Labels
`type: test`, `area: calendar`, `area: qa`, `priority: p0-critical`, `v1-launch-blocker`
## Suggested Milestone
Release Candidate

---

# Issue: Research and Correct Loretta Lynn’s Qualification Structure
## What
Research and document the current Loretta Lynn's amateur qualification path: Area Qualifier → Regional Championship → National.
## Why
Loretta's cannot be treated as a normal selectable race. Authentic qualification is a core credibility requirement.
## How
- Use current official sources where possible.
- Document Area Qualifier, Regional Championship, and National advancement rules.
- Capture class eligibility, region assignment, deadlines, attempts, alternates, moto formats, and calendar timing.
- Convert findings into implementation-ready rules and open questions.
## Definition of Done
- [ ] Official-source research notes are captured with source links and access dates.
- [ ] Correct stage order and advancement rules are documented.
- [ ] Any uncertain rules are flagged before implementation.
- [ ] Calendar and season-planner impacts are listed.
## Related Epic
EPIC: Road to Loretta's; EPIC: Competition Engine
## Labels
`type: research`, `area: lorettas`, `area: racing`, `priority: p0-critical`, `v1-launch-blocker`
## Suggested Milestone
Prototype

---

# Issue: Implement Area Qualifier → Regional Championship → National Qualification State Machine
## What
Implement the minimum state machine for Loretta qualification progression.
## Why
The game needs reliable gatekeeping from Area Qualifier through Regional Championship to National invitation.
## How
- Define states: Not Started, Area Registered, Area Attempted, Area Qualified, Regional Registered, Regional Attempted, National Qualified, Eliminated, Expired.
- Track state by rider, class, season, region, and event.
- Integrate state checks with calendar planning, event launch, results, and save/load.
- Keep v1.0 implementation minimal and testable.
## Definition of Done
- [ ] State model is implemented or specified in implementation-ready detail.
- [ ] Transitions require valid events/results.
- [ ] State persists through save/load.
- [ ] Tests cover qualified, eliminated, expired, and incomplete paths.
## Related Epic
EPIC: Road to Loretta's; EPIC: Calendar & Time Engine; EPIC: Competition Engine
## Labels
`type: implementation`, `area: lorettas`, `area: calendar`, `priority: p0-critical`, `v1-launch-blocker`
## Suggested Milestone
Vertical Slice

---

# Issue: Prevent Loretta National Entry Unless Qualified
## What
Block Loretta National registration, calendar commitment, and event launch unless the rider has earned qualification for the selected class.
## Why
This protects the authentic Road to Loretta's and prevents players from bypassing Area and Regional progression.
## How
- Add planner validation for Loretta National events.
- Show qualification status and missing prerequisites.
- Prevent Go Racing launch for unqualified national entries.
- Support alternates/waitlist only if research confirms they are in v1.0 scope.
## Definition of Done
- [ ] Unqualified National entry is blocked.
- [ ] Qualified rider/class combinations are allowed.
- [ ] UI explains Area/Regional prerequisites.
- [ ] Tests cover unqualified, qualified, wrong class, wrong region, and expired qualification.
## Related Epic
EPIC: Road to Loretta's; EPIC: Season Planner
## Labels
`type: implementation`, `area: lorettas`, `area: validation`, `priority: p0-critical`, `v1-launch-blocker`
## Suggested Milestone
Vertical Slice

---

# Issue: Define App Store v1.0 Scope
## What
Define the exact feature scope required for the first App Store release.
## Why
A clear v1.0 ship list prevents scope creep and lets launch blockers be triaged consistently.
## How
- Define must-have systems for rider/family creation, first bike, calendar, season lock-in, Go Racing, minimum race result, garage, money, save/load, onboarding, settings, and release readiness.
- List nice-to-have items that cannot block launch.
- Identify explicit launch blockers.
## Definition of Done
- [ ] v1.0 required scope checklist exists.
- [ ] Excluded scope is documented.
- [ ] Scope supports a playable repeatable career loop.
- [ ] Every v1.0 blocker maps to an issue or epic.
## Related Epic
EPIC: Release Readiness
## Labels
`type: design`, `area: release`, `area: mvp`, `priority: p0-critical`, `v1-launch-blocker`
## Suggested Milestone
Prototype

---

# Issue: Create MVP Cutline: v1.0 vs Post-Launch
## What
Sort major planned systems into Required for v1.0, Nice for v1.0, v1.1, v2.0, and long-term backlog.
## Why
The full design vision is larger than the launch product. The team needs a protected MVP cutline.
## How
- Review current epics and issue drafts.
- Preserve all future ideas but mark them non-blocking unless required for v1.0.
- Highlight dependencies that are required for calendar, racing, save/load, onboarding, garage, and release readiness.
## Definition of Done
- [ ] MVP cutline is documented.
- [ ] Future systems remain preserved as backlog.
- [ ] Launch blockers are separated from design backlog.
- [ ] Project views can filter by launch vs post-launch.
## Related Epic
EPIC: Release Readiness
## Labels
`type: design`, `area: mvp`, `area: planning`, `priority: p0-critical`, `v1-launch-blocker`
## Suggested Milestone
Prototype

---

# Issue: Define First Playable Vertical Slice
## What
Define the first playable path from new career setup through a locked season, one race launch/result, garage return, save/load, and next calendar action.
## Why
The vertical slice proves whether the core promise is playable before broader content is added.
## How
- Specify exact screens, transitions, data written, and success messages.
- Include minimum race result simulation only; do not implement deep gameplay.
- Include manual QA script and acceptance criteria.
## Definition of Done
- [ ] Vertical slice flow is documented end to end.
- [ ] Required data contracts are listed.
- [ ] Non-goals are explicit.
- [ ] QA can validate the slice from a clean install.
## Related Epic
EPIC: Release Readiness; EPIC: Competition Engine
## Labels
`type: design`, `area: vertical-slice`, `area: mvp`, `priority: p0-critical`, `v1-launch-blocker`
## Suggested Milestone
Vertical Slice

---

# Issue: Define Launch Non-Goals
## What
Create a launch non-goals document that names features intentionally deferred from App Store v1.0.
## Why
Non-goals protect the launch schedule and reduce ambiguity when future design ideas appear in existing drafts.
## How
- List deferred systems and explain why they are post-launch.
- Reference the future backlog guide.
- Include rules for promoting backlog work into launch scope.
## Definition of Done
- [ ] Non-goals are listed and visible from roadmap docs.
- [ ] Deferred systems are not treated as blockers.
- [ ] Promotion criteria are documented.
## Related Epic
EPIC: Release Readiness
## Labels
`type: design`, `area: release`, `area: planning`, `priority: p0-critical`, `v1-launch-blocker`
## Suggested Milestone
Prototype

---

# Issue: Validate Core Career Loop
## What
Validate that players can complete the minimum career loop for v1.0.
## Why
The App Store build must be playable, understandable, and stable from first launch through repeated race/calendar cycles.
## How
- Validate new career, rider/family setup, first bike, season planning, lock-in, Go Racing, result, garage return, money/memory updates, save/load, and next action.
- Record blockers and required fixes.
## Definition of Done
- [ ] End-to-end checklist exists.
- [ ] Manual QA run can complete without stuck states.
- [ ] Blockers are linked to issues.
- [ ] Acceptance criteria are ready for TestFlight.
## Related Epic
EPIC: Release Readiness
## Labels
`type: qa`, `area: career`, `area: mvp`, `priority: p0-critical`, `v1-launch-blocker`
## Suggested Milestone
Release Candidate

---

# Issue: Finalize Save and Load System
## What
Finalize minimum save/load behavior for App Store v1.0.
## Why
Players must not lose career, calendar, garage, qualification, or onboarding state.
## How
- Define saved data for career, rider/family, bike, garage, money, calendar, season state, Loretta state, settings, onboarding, and analytics consent.
- Add migration/versioning expectations.
- Include corruption recovery and QA tests.
## Definition of Done
- [ ] Save schema requirements are documented.
- [ ] Critical v1.0 state persists across app restarts.
- [ ] Versioning/migration plan exists.
- [ ] Save/load QA checklist passes.
## Related Epic
EPIC: Release Readiness; EPIC: Core Simulation Engine
## Labels
`type: implementation`, `area: persistence`, `area: release`, `priority: p0-critical`, `v1-launch-blocker`
## Suggested Milestone
Release Candidate

---

# Issue: Build First-Time User Onboarding and Tutorial
## What
Create minimum onboarding for first launch, rider/family setup, first bike, calendar planning, season lock-in, Go Racing, garage, and save expectations.
## Why
Players need guidance through the unique career/calendar loop without reading design docs.
## How
- Define first-run steps and skip/replay behavior.
- Teach only v1.0 systems.
- Add prompts for irreversible or consequential actions.
- Include accessibility and localization-ready copy requirements.
## Definition of Done
- [ ] Onboarding flow is documented and implemented or ready for implementation.
- [ ] Tutorial covers the first playable loop.
- [ ] Players can recover if they skip.
- [ ] QA script validates first-run experience.
## Related Epic
EPIC: Release Readiness; EPIC: Phone & World UI
## Labels
`type: implementation`, `area: onboarding`, `area: ui`, `priority: p0-critical`, `v1-launch-blocker`
## Suggested Milestone
Vertical Slice

---

# Issue: UI Polish Pass
## What
Run a focused v1.0 UI polish pass across launch-critical screens.
## Why
The App Store build needs clear, consistent, touch-friendly UI even if deeper systems ship later.
## How
- Audit career setup, garage, calendar, season review, Go Racing, race result, save/load, settings, onboarding, and error states.
- Fix visual hierarchy, button labels, empty states, warnings, and small-screen issues.
- Avoid redesigning future systems.
## Definition of Done
- [ ] Critical screen list is complete.
- [ ] Blocking usability issues are resolved or tracked.
- [ ] Empty/error/loading states are covered.
- [ ] Screenshots or QA notes are attached where useful.
## Related Epic
EPIC: Release Readiness
## Labels
`type: design`, `area: ui`, `area: polish`, `priority: p1-high`, `v1-launch-blocker`
## Suggested Milestone
Release Candidate

---

# Issue: TestFlight Beta Plan
## What
Create the internal and external TestFlight plan for v1.0.
## Why
Structured beta testing is needed before App Store submission.
## How
- Define beta cohorts, build cadence, feedback process, known-risk areas, test scripts, exit criteria, and rollback plan.
- Include calendar, Loretta, save/load, onboarding, garage, performance, and crash reporting scenarios.
## Definition of Done
- [ ] TestFlight plan exists.
- [ ] Tester instructions and feedback template are ready.
- [ ] Exit criteria are documented.
- [ ] Required beta blockers are linked.
## Related Epic
EPIC: Release Readiness
## Labels
`type: planning`, `area: testflight`, `area: release`, `priority: p0-critical`, `v1-launch-blocker`
## Suggested Milestone
Release Candidate

---

# Issue: Crash Reporting and Error Logging
## What
Add the minimum crash reporting and error logging plan/implementation for TestFlight and App Store v1.0.
## Why
Launch builds need visibility into crashes, stuck states, save failures, and release-blocking errors.
## How
- Choose crash/error reporting approach.
- Define logged events for startup, save/load failure, calendar stuck state, Go Racing failure, Loretta gate failure, and fatal UI errors.
- Respect privacy requirements and consent where needed.
## Definition of Done
- [ ] Tooling/approach is selected.
- [ ] Critical error events are captured.
- [ ] Privacy impact is documented.
- [ ] Test crash/error validation steps exist.
## Related Epic
EPIC: Release Readiness
## Labels
`type: implementation`, `area: telemetry`, `area: release`, `priority: p0-critical`, `v1-launch-blocker`
## Suggested Milestone
Release Candidate

---

# Issue: Analytics Event Plan
## What
Define the minimum analytics events needed to understand onboarding, calendar flow, racing flow, garage use, save/load health, and release funnels.
## Why
Analytics should help improve the v1.0 loop without tracking unnecessary personal data.
## How
- Define event names, properties, trigger points, privacy constraints, and dashboards.
- Keep analytics limited to launch-critical UX and stability questions.
- Include opt-out/consent requirements if applicable.
## Definition of Done
- [ ] Analytics event list exists.
- [ ] Privacy-safe properties are documented.
- [ ] No future/backlog systems are instrumented as launch blockers.
- [ ] QA can verify event firing in test builds.
## Related Epic
EPIC: Release Readiness
## Labels
`type: planning`, `area: analytics`, `area: release`, `priority: p1-high`, `v1-launch-blocker`
## Suggested Milestone
Release Candidate

---

# Issue: Performance and Battery Optimization
## What
Validate and optimize launch-critical performance and battery behavior.
## Why
A mobile App Store release must feel responsive and avoid excessive battery drain.
## How
- Profile startup, garage, calendar month view, season review, save/load, and race result flow.
- Set minimum performance targets for supported devices.
- Track memory, frame pacing, long tasks, and battery-heavy loops.
## Definition of Done
- [ ] Performance targets are documented.
- [ ] Critical flows are profiled.
- [ ] Blocking issues are fixed or linked.
- [ ] Battery-risk findings are recorded.
## Related Epic
EPIC: Release Readiness
## Labels
`type: qa`, `area: performance`, `area: release`, `priority: p1-high`, `v1-launch-blocker`
## Suggested Milestone
Release Candidate

---

# Issue: App Store Asset Checklist
## What
Create and complete the checklist for App Store listing assets.
## Why
Submission cannot proceed without required metadata, screenshots, icons, previews, copy, and support links.
## How
- List required app icon, screenshots, preview video needs, description, keywords, subtitle, support URL, marketing URL, age rating inputs, and promotional text.
- Identify asset owners and due dates.
## Definition of Done
- [ ] Required assets are listed.
- [ ] Asset status and owners are tracked.
- [ ] Screenshots match v1.0 scope.
- [ ] App Store metadata is review-ready.
## Related Epic
EPIC: Release Readiness
## Labels
`type: planning`, `area: app-store`, `area: release`, `priority: p0-critical`, `v1-launch-blocker`
## Suggested Milestone
Release Candidate

---

# Issue: Privacy and Compliance Checklist
## What
Create and complete the privacy and compliance checklist for App Store v1.0.
## Why
Crash reporting, analytics, age rating, save data, and any network usage must satisfy App Store review and player trust requirements.
## How
- Document collected data, purpose, retention, third parties, permissions, consent/opt-out, child/privacy considerations, and App Privacy labels.
- Confirm no unapproved monetization, social, or online systems are accidentally launch blockers.
## Definition of Done
- [ ] Privacy data inventory exists.
- [ ] App Privacy labels are ready.
- [ ] Compliance risks are linked to issues.
- [ ] Review checklist is approved before submission.
## Related Epic
EPIC: Release Readiness
## Labels
`type: planning`, `area: privacy`, `area: compliance`, `priority: p0-critical`, `v1-launch-blocker`
## Suggested Milestone
Release Candidate

---

# Issue: Final App Store Submission Checklist
## What
Create the final go/no-go checklist for App Store submission.
## Why
Submission should happen only when build, metadata, compliance, QA, TestFlight, crash reporting, analytics, and launch blockers are ready.
## How
- Define required approvals and evidence.
- Include build number/version, release notes, assets, privacy labels, age rating, support links, known issues, and rollback plan.
- Gate submission on unresolved P0/P1 launch blockers.
## Definition of Done
- [ ] Submission checklist exists.
- [ ] Go/no-go criteria are explicit.
- [ ] All v1 launch blockers have status.
- [ ] Release owner can submit confidently.
## Related Epic
EPIC: Release Readiness
## Labels
`type: planning`, `area: app-store`, `area: release`, `priority: p0-critical`, `v1-launch-blocker`
## Suggested Milestone
Release Candidate

---

# Issue: Define Minimum Living Garage for v1.0
## What
Define the smallest living garage experience required for App Store v1.0.
## Why
The garage is the home hub, but launch should avoid a full garage museum or deep simulation.
## How
- Include visible bike storage, basic parts shelf, key actions, event return point, and persistence.
- Exclude full 3D walkaround, museum depth, advanced clutter, and broad social interactions.
- Map minimum garage interactions to the first playable loop.
## Definition of Done
- [ ] v1.0 garage minimum is documented.
- [ ] Post-launch garage ambitions are separated.
- [ ] Required data and UI zones are listed.
- [ ] Garage supports career loop without becoming scope creep.
## Related Epic
EPIC: Garage Shop System; EPIC: Release Readiness
## Labels
`type: design`, `area: garage`, `area: mvp`, `priority: p0-critical`, `v1-launch-blocker`
## Suggested Milestone
Prototype

---

# Issue: Design Bike Display and Interaction System
## What
Design the v1.0 bike display and basic interactions inside the living garage.
## Why
Players need to see and access their bike as a real object in the home hub.
## How
- Define bike visual slots, selected bike state, condition indicators, and actions: inspect, prepare/repair, set active bike, and view history.
- Keep interactions 2D/tap-zone friendly for v1.0.
## Definition of Done
- [ ] Bike display requirements are documented.
- [ ] Minimum interactions are defined.
- [ ] Bike state integrates with save/load and calendar readiness.
- [ ] Advanced display/museum features are deferred.
## Related Epic
EPIC: Garage Shop System; EPIC: Bike Ownership System
## Labels
`type: design`, `area: garage`, `area: bike`, `priority: p1-high`, `v1-launch-blocker`
## Suggested Milestone
Vertical Slice

---

# Issue: Design Parts Shelf and Component Storage System
## What
Design the minimum garage parts shelf/storage system for v1.0.
## Why
Parts need a physical home so maintenance, purchases, and bike readiness feel grounded without requiring a deep inventory simulator.
## How
- Define shelf categories for critical parts and consumables.
- Show owned, missing, reserved, and installed states.
- Connect marketplace/dealer arrivals to garage storage.
- Avoid advanced capacity/clutter systems for launch.
## Definition of Done
- [ ] Parts shelf categories and states are documented.
- [ ] Purchase arrival and install/prep links are specified.
- [ ] Save data requirements are listed.
- [ ] Post-launch depth is separated.
## Related Epic
EPIC: Garage Shop System; EPIC: Mechanics Maintenance Engine
## Labels
`type: design`, `area: garage`, `area: inventory`, `priority: p1-high`, `v1-launch-blocker`
## Suggested Milestone
Vertical Slice

---

# Issue: Design Garage Persistence and Save Data
## What
Define the save data needed for the v1.0 living garage.
## Why
Garage state must survive app restarts and support the core loop.
## How
- Persist active bike, bike condition summary, displayed bikes, parts shelf contents, garage tutorial state, delivery/pickup state, and relevant memory/trophy placeholders.
- Define migration and reset expectations.
- Include tests for save/load round trips.
## Definition of Done
- [ ] Garage save schema is documented.
- [ ] Required v1.0 garage state persists.
- [ ] Save/load tests or QA cases are defined.
- [ ] Future museum/social state is explicitly deferred.
## Related Epic
EPIC: Garage Shop System; EPIC: Release Readiness
## Labels
`type: implementation`, `area: garage`, `area: persistence`, `priority: p0-critical`, `v1-launch-blocker`
## Suggested Milestone
Release Candidate
