# WonderLane Trip at a Glance and Daily Planning Upgrade Issue Drafts

These are GitHub issue drafts only. They do not implement features, call the GitHub API, enable AI, enable payments, or change Open Preview behavior.

Product: **WonderLane**  
Positioning: **The operating system for a family’s Disney vacation.**

## Drafting Principles

- Keep all planning deterministic and useful without AI.
- Preserve Open Preview, Command Center V2, multi-trip account home, and feedback bubble behavior.
- Keep payments disabled.
- Keep AI disabled.
- Prioritize family guidance, mobile usability, and clear next actions.

# Issue: Redesign Trip at a Glance as a True Planning Snapshot

## What
Redesign Trip at a Glance from a bland information panel into a high-value planning snapshot for the whole WonderLane vacation.

The snapshot should include:

- Trip dates.
- Resort.
- Travel days.
- Park days.
- Rest days.
- Dining reservations count.
- Missing plans.
- Readiness by category.
- Next important deadline.
- Key warnings.
- Family-specific highlights.

## Why
Families need to understand the overall state of the vacation quickly. The current experience shows information, but it does not make it obvious what is planned, what is missing, what needs attention, or what the family should do next.

A stronger Trip at a Glance helps Command Center feel like the operating system for the vacation rather than a passive dashboard.

## How
- Audit the current Trip at a Glance card/data dependencies before changing UI.
- Design a snapshot layout that works on desktop and mobile.
- Group content into clear sections such as trip basics, readiness, warnings, highlights, and next deadline.
- Use deterministic readiness and warning data only.
- Surface family-specific highlights from existing family/profile/trip data where available.
- Add empty or fallback states when specific data is missing.
- Do not call external APIs.
- Do not enable AI-generated summaries.
- Do not enable payments.

## Definition of Done
- Trip at a Glance design/spec includes all required fields.
- Snapshot clearly distinguishes planned, missing, warning, and highlight states.
- Snapshot supports empty, partial, and complete trips.
- Mobile behavior is specified.
- Data requirements are documented.
- No AI functionality is introduced.
- No payment functionality is introduced.
- Open Preview behavior remains unchanged.

## Related Epic
WonderLane Trip at a Glance and Daily Planning Upgrade

## Labels
type: product, type: design, area: command-center, area: trip-overview, priority: p0-critical

# Issue: Add Trip Timeline Visualization

## What
Create a visual trip timeline that shows the full vacation from arrival through departure.

The timeline should include:

- Arrival day.
- Each park day.
- Rest/resort days.
- Party/event nights.
- Dining reservations.
- Travel days.
- Important deadlines.
- Planning milestones.

## Why
A timeline gives families a fast, visual way to understand the shape of the vacation. It helps reveal overloaded stretches, missing rest days, event nights, and deadline timing more effectively than a flat list.

## How
- Define a responsive timeline model for the full trip date range.
- Support compact mobile scanning with clear day labels and icons/status chips.
- Represent day types, reservations, milestones, and deadlines consistently.
- Include empty states for days with no assigned plans.
- Allow timeline entries to link to the relevant daily plan where possible.
- Use existing trip/schedule/dining data only.
- Do not add live park hours, live maps, external weather, or AI timeline generation.

## Definition of Done
- Timeline design/spec covers arrival, departure, park, rest, event, dining, deadline, and milestone entries.
- Timeline is usable on mobile.
- Empty and partial trip states are documented.
- Timeline links to daily planning views where applicable.
- No external APIs are required.
- No AI functionality is introduced.

## Related Epic
WonderLane Trip at a Glance and Daily Planning Upgrade

## Labels
type: product, type: design, area: schedule, area: timeline, priority: p0-critical

# Issue: Upgrade Daily Planning from Static Schedule to Guided Day Plan

## What
Upgrade the schedule tab so each day becomes a guided day plan rather than a static event list.

Each day should show:

- Park.
- Date.
- Opening/closing context if available.
- Morning plan.
- Afternoon plan.
- Evening plan.
- Dining.
- Nap/rest windows.
- Must-do attractions.
- Transportation notes.
- Weather placeholder.
- Next planning task.

## Why
Families need help understanding how a day will feel and what decisions remain. A guided plan makes the schedule actionable, especially for families juggling meals, naps, transportation, ride priorities, and evening activities.

## How
- Redesign each daily schedule view as a guided plan card/page.
- Separate day context, readiness, blocks, dining, rest, transportation, and next task.
- Use placeholders for unavailable data such as weather or park hours.
- Keep all guidance deterministic and based on known trip/family/schedule data.
- Preserve existing schedule data and interactions during the transition.
- Avoid enabling AI or external APIs.

## Definition of Done
- Daily plan design/spec includes every required field.
- Static schedule items remain visible but are organized into guided context.
- Missing plan areas have helpful empty states.
- Weather is represented as a placeholder only.
- Park hours are displayed only if already available.
- No AI functionality is introduced.

## Related Epic
WonderLane Trip at a Glance and Daily Planning Upgrade

## Labels
type: product, type: design, area: daily-planning, area: schedule, priority: p0-critical

# Issue: Add Daily Readiness Score

## What
Add a readiness score for each day in the daily planning experience.

Readiness should consider:

- Park selected.
- Dining planned.
- Must-do rides selected.
- Rest/nap plan.
- Transportation plan.
- Lightning Lane/strategy notes.
- Budget/prep completeness.
- Time gaps or conflicts.

## Why
A readiness score helps families see which days need attention and which are in good shape. It also gives Command Center and Trip at a Glance a clear way to summarize planning progress.

## How
- Define deterministic scoring categories and weights.
- Document how missing data affects the score.
- Keep scoring explainable by showing contributing factors.
- Support empty, partial, and complete day plans.
- Ensure scores can be linked to suggested actions and conflicts.
- Do not use AI or opaque recommendations.

## Definition of Done
- Readiness scoring rubric is documented.
- Each score can show the underlying factors that contributed to it.
- Empty days, resort days, travel days, and park days are handled appropriately.
- Readiness can be consumed by daily planning and Trip at a Glance.
- No AI functionality is introduced.

## Related Epic
WonderLane Trip at a Glance and Daily Planning Upgrade

## Labels
type: product, area: readiness, area: daily-planning, priority: p0-critical

# Issue: Add Day Conflict and Gap Detection

## What
Create deterministic rules that identify problems in a daily plan.

Initial examples:

- No park selected.
- Too many table-service meals.
- Dining overlaps rest window.
- No break for young children.
- Too much park hopping.
- Early breakfast after late night.
- Long gap with no plan.
- Missing transportation note.
- Party/event night without rest plan.

## Why
Families need the system to catch obvious planning problems before they become stressful vacation-day surprises. Rule-based detection can provide helpful guidance without enabling AI.

## How
- Define deterministic conflict and gap rules.
- Assign each rule a severity, message, category, and recommended action.
- Ensure rules can run against incomplete data without breaking.
- Make rules explainable and testable.
- Keep rule output linkable to affected day/block.
- Do not use AI, external APIs, or subjective generation.

## Definition of Done
- Initial conflict/gap rule list is documented.
- Each rule includes trigger criteria, severity, message, and recommended action.
- Rules handle missing/incomplete data safely.
- Rule output can be displayed in daily planning and Command Center.
- No AI functionality is introduced.

## Related Epic
WonderLane Trip at a Glance and Daily Planning Upgrade

## Labels
type: engineering, area: brain, area: daily-planning, priority: p0-critical

# Issue: Add Suggested Daily Actions

## What
Add 1–3 suggested next actions to each daily plan.

Example actions:

- “Choose your park for this day.”
- “Add a rest break after lunch.”
- “Add transportation notes for dinner.”
- “Pick 3 must-do rides.”
- “Review Lightning Lane strategy.”
- “Confirm dining time.”

## Why
Families often know a plan is incomplete but do not know the next best planning step. Suggested actions make daily planning feel guided and reduce decision fatigue without requiring AI.

## How
- Generate actions from deterministic readiness and conflict rules.
- Prioritize the highest-impact 1–3 actions per day.
- Link each action to the relevant day section when possible.
- Include fallback actions for empty days.
- Avoid personalized AI phrasing or generative recommendations.

## Definition of Done
- Suggested action priority rules are documented.
- Each day can display zero to three actions.
- Actions are based on deterministic data only.
- Actions can deep-link to relevant planning sections where supported.
- No AI functionality is introduced.

## Related Epic
WonderLane Trip at a Glance and Daily Planning Upgrade

## Labels
type: product, area: recommendations, area: daily-planning, priority: p0-critical

# Issue: Add Day Type Templates

## What
Allow each day to be classified by a day type.

Day types:

- Arrival Day.
- Magic Kingdom Day.
- EPCOT Day.
- Hollywood Studios Day.
- Animal Kingdom Day.
- Resort Day.
- Party/Event Day.
- Travel Home Day.
- Rest Day.

Each type should drive default guidance and checklist items.

## Why
Different Disney days need different planning support. A Magic Kingdom day, resort day, party night, and travel home day should not use identical checklist logic or empty states.

## How
- Define day type taxonomy and display labels.
- Document default guidance/checklist items for each day type.
- Determine whether a day may have multiple classifications, such as park day plus party/event night.
- Specify migration behavior for existing trips with no day type.
- Keep templates editable and deterministic.

## Definition of Done
- Day type list and default guidance are documented.
- Edge cases such as arrival plus park day or park plus event night are addressed.
- Existing trips have safe fallback behavior.
- Day type can influence readiness, conflicts, and suggested actions.
- No AI functionality is introduced.

## Related Epic
WonderLane Trip at a Glance and Daily Planning Upgrade

## Labels
type: product, area: daily-planning, area: templates, priority: p1-high

# Issue: Add Morning / Afternoon / Evening Planning Blocks

## What
Replace the flat daily schedule display with three intuitive planning sections:

- Morning.
- Afternoon.
- Evening.

Each block should support:

- Planned items.
- Dining.
- Rest.
- Notes.
- Recommended focus.
- Empty state guidance.

## Why
Families think about Disney days in natural chunks. Morning, afternoon, and evening blocks make the plan easier to scan, easier to edit, and easier to reason about than a single list.

## How
- Define block boundaries and display behavior.
- Map existing scheduled items into the correct block.
- Add block-level empty states and recommended focus text.
- Support dining, rest, notes, and planned items within each block.
- Ensure mobile layout remains easy to scan.

## Definition of Done
- Morning/afternoon/evening block design/spec is complete.
- Existing schedule items can be represented inside blocks.
- Each block supports planned items, dining, rest, notes, focus, and empty guidance.
- Mobile behavior is documented.
- No AI functionality is introduced.

## Related Epic
WonderLane Trip at a Glance and Daily Planning Upgrade

## Labels
type: design, area: schedule, area: daily-planning, priority: p1-high

# Issue: Add Family Pace Guidance to Daily Plans

## What
Add family pace guidance to daily plans using known family data.

Use data such as:

- Kids’ ages.
- Naps.
- Height.
- Stroller needs.
- Fears.
- Preferred pace.
- Dining preferences.

Example guidance:

- “This may be a long day for toddlers.”
- “Consider a midday break.”
- “This day has a good balance of park and rest.”

## Why
WonderLane should feel personalized to the family without AI. Families with toddlers, stroller needs, height restrictions, sensory concerns, or slower pace preferences need different planning guidance than adults-only groups.

## How
- Identify available family profile fields that can safely drive guidance.
- Create deterministic guidance rules and copy variants.
- Connect pace guidance to readiness and suggested actions where appropriate.
- Handle missing family profile data gracefully.
- Avoid sensitive or judgmental wording.
- Do not use AI-generated personalization.

## Definition of Done
- Family pace data inputs are documented.
- Deterministic pace guidance rules are documented.
- Missing or partial family profile data has safe fallback behavior.
- Guidance copy is family-friendly and nonjudgmental.
- No AI functionality is introduced.

## Related Epic
WonderLane Trip at a Glance and Daily Planning Upgrade

## Labels
type: product, area: family-profiles, area: daily-planning, priority: p1-high

# Issue: Add Dining Integration into Daily Planning

## What
Integrate dining plans clearly into each daily plan.

Include:

- Reservations.
- Planned quick-service meals.
- Snack notes.
- Dining credits if available.
- Conflicts.
- Missing meal coverage.
- Travel time to dining location.

## Why
Dining is one of the biggest planning anchors for a Disney vacation. Daily plans should make it easy to see where meals are covered, where there are gaps, and whether dining creates timing or transportation issues.

## How
- Surface existing reservations in the relevant daily block.
- Add support/spec for quick-service and snack notes.
- Show dining conflicts and missing meal coverage using deterministic rules.
- Include travel time guidance only when statically available or user-entered.
- Do not integrate external dining availability APIs.
- Do not enable payments.

## Definition of Done
- Dining fields and display states are documented.
- Reservations and planned meals appear in the appropriate daily context.
- Dining gaps/conflicts can be flagged deterministically.
- Missing data and no-reservation states are helpful.
- No external APIs or payment functionality are introduced.

## Related Epic
WonderLane Trip at a Glance and Daily Planning Upgrade

## Labels
type: product, area: dining, area: daily-planning, priority: p1-high

# Issue: Add Ride Priorities into Daily Planning

## What
Surface ride priorities for each daily plan.

Include:

- Family must-dos.
- Height-limited rides.
- Child-friendly rides.
- Attractions that fit the park/day.
- Suggested morning priorities.
- Rides that need Lightning Lane strategy.

## Why
Ride priorities help families make realistic plans and avoid missing the experiences that matter most. Surfacing them by day also connects family preferences to actionable park planning.

## How
- Use existing attraction and family preference data where available.
- Group ride priorities by day and park.
- Flag height-limited rides based on known height data.
- Identify Lightning Lane strategy needs through static metadata or user-entered notes.
- Keep suggestions deterministic and editable.
- Do not use live wait times, external APIs, or AI ranking.

## Definition of Done
- Ride priority data requirements are documented.
- Daily plans can show must-dos, height-limited rides, child-friendly rides, and Lightning Lane notes.
- Missing ride data has useful empty states.
- No live wait time, external API, or AI dependency is introduced.

## Related Epic
WonderLane Trip at a Glance and Daily Planning Upgrade

## Labels
type: product, area: rides, area: daily-planning, priority: p1-high

# Issue: Add Transportation Notes and Guidance

## What
Add transportation guidance and editable transportation notes to each daily plan.

Examples:

- Resort to park.
- Park to dining.
- Park hopping.
- Stroller logistics.
- Car vs bus/skyliner/monorail.
- Return-to-resort plan.

Start with static guidance and editable notes. Do not add external APIs.

## Why
Transportation can make or break a Disney day. Families need a place to document how they will move between resort, park, dining, events, and rest breaks.

## How
- Add/display transportation sections at the day and/or block level.
- Provide static guidance prompts based on day type and known locations.
- Allow user-entered notes for specific legs of the day.
- Flag missing transportation notes for plans involving dining, park hopping, or events.
- Do not integrate maps, routing APIs, or live transportation data.

## Definition of Done
- Transportation guidance and notes spec is documented.
- Static prompts cover resort-to-park, park-to-dining, park hopping, stroller logistics, and return plans.
- Missing transportation notes can feed readiness/conflict rules.
- No external API dependency is introduced.

## Related Epic
WonderLane Trip at a Glance and Daily Planning Upgrade

## Labels
type: product, area: transportation, area: daily-planning, priority: p1-high

# Issue: Add Editable Daily Notes

## What
Add an easy place for users to write notes per day.

Examples:

- “Bring costumes.”
- “Pack swim bag.”
- “Leave stroller at resort.”
- “Kids will nap in stroller.”
- “Mobile order lunch early.”

## Why
Families often need lightweight day-specific notes that do not fit into dining, rides, or formal schedule items. Daily notes help preserve practical reminders and reduce context switching.

## How
- Audit current data model support for day-level notes.
- Specify create/edit/delete behavior for daily notes.
- Include daily notes in the day plan and relevant block if block-level notes are supported.
- Ensure notes are scoped to the correct trip/day/user permissions.
- Protect archived/deleted trips.

## Definition of Done
- Daily notes UX and data requirements are documented.
- Notes can be associated with a specific day.
- Permission, archived trip, and deleted trip behavior is specified.
- Notes do not require AI or external services.

## Related Epic
WonderLane Trip at a Glance and Daily Planning Upgrade

## Labels
type: engineering, area: daily-planning, area: notes, priority: p1-high

# Issue: Add Daily Plan Empty States

## What
Add helpful empty states throughout daily planning.

Empty states should say:

- What is missing.
- Why it matters.
- What to do next.

Example:

“Nothing is planned for this day yet. Start by choosing a park or marking it as a resort day.”

## Why
An empty schedule should still guide the user. Helpful empty states make the product feel useful before the family has entered a complete plan.

## How
- Define empty states for whole day, block, dining, rides, rest, transportation, and notes sections.
- Customize empty states by day type where available.
- Link empty states to the relevant next action where possible.
- Keep copy concise, friendly, and deterministic.

## Definition of Done
- Empty state copy is documented for all major daily planning sections.
- Empty states include missing item, reason, and next step.
- Empty states vary appropriately by day type.
- Empty states do not use AI-generated text.

## Related Epic
WonderLane Trip at a Glance and Daily Planning Upgrade

## Labels
type: design, area: empty-states, area: daily-planning, priority: p1-high

# Issue: Add Command Center Links into Daily Planning

## What
Add deep links from Trip at a Glance and Command Center cards into relevant daily plan sections.

Examples:

- Readiness issue links to the affected day.
- Dining issue links to the day’s dining block.
- Packing reminder links to prep notes.
- Recommendation links to the day it affects.

## Why
Command Center should not just identify issues; it should take families directly to the place where they can resolve them. Deep links make the planning workflow faster and more actionable.

## How
- Define route/link targets for day, block, dining, notes, readiness, and recommendation sections.
- Add link target metadata to readiness/conflict/recommendation outputs where needed.
- Ensure links handle missing, archived, deleted, or unauthorized trips safely.
- Preserve existing Command Center behavior while adding navigation.

## Definition of Done
- Deep-link target taxonomy is documented.
- Command Center and Trip at a Glance cards can identify relevant daily planning destinations.
- Invalid/unauthorized/deleted/archived targets are handled safely.
- No GitHub API, payment, or AI functionality is introduced.

## Related Epic
WonderLane Trip at a Glance and Daily Planning Upgrade

## Labels
type: engineering, area: command-center, area: daily-planning, priority: p1-high

# Issue: Add Daily Planning Data Model Review

## What
Audit the existing schedule/daily planning schema before implementing daily planning upgrades.

Determine whether current tables support:

- Day type.
- Block type.
- Daily notes.
- Rest windows.
- Transportation notes.
- Readiness status.
- Conflicts.
- Recommendations.
- Dining links.
- Ride links.

Do not change schema until the audit recommends it.

## Why
The planning upgrade touches many concepts. A schema audit reduces the risk of duplicating data, adding premature migrations, or building UI on top of insufficient data structures.

## How
- Review existing database tables, API contracts, types, and schedule-related persistence.
- Map each desired capability to current support: supported, partially supported, unsupported, or unclear.
- Identify migration needs, backward compatibility risks, and permission constraints.
- Recommend minimal schema changes only after documenting findings.
- Do not implement migrations as part of this issue.

## Definition of Done
- Data model audit document is complete.
- Each target capability is classified against the current schema.
- Migration recommendations are documented separately from implementation.
- Permission and archived/deleted trip implications are documented.
- No schema changes are made by this issue.

## Related Epic
WonderLane Trip at a Glance and Daily Planning Upgrade

## Labels
type: architecture, area: database, area: daily-planning, priority: p0-critical

# Issue: Add Daily Planning Rule Registry

## What
Create a deterministic rule registry for daily planning.

Rules should support:

- Input data.
- Rule result.
- Severity.
- Message.
- Recommended action.
- Link target.
- Category.

No AI. This should be AI-ready later.

## Why
A rule registry keeps readiness, conflicts, gaps, warnings, and actions consistent across Daily Planning, Trip at a Glance, and Command Center. It also prepares the system for future AI assistance without requiring AI in the current release.

## How
- Define a rule interface or spec for inputs and outputs.
- Categorize rules by dining, rest, transportation, rides, day type, deadlines, and completeness.
- Ensure rule output is explainable, testable, and linkable.
- Keep rules deterministic and safe with incomplete data.
- Document how AI could consume rule output later without enabling AI now.

## Definition of Done
- Rule registry design/spec is documented.
- Rule output includes severity, message, recommended action, link target, and category.
- Registry supports deterministic daily planning rules.
- AI-readiness is documented as future-facing only.
- No AI functionality is introduced.

## Related Epic
WonderLane Trip at a Glance and Daily Planning Upgrade

## Labels
type: engineering, area: brain, area: rules, priority: p1-high

# Issue: Add Daily Planning Mobile Redesign

## What
Redesign Daily Planning so it is excellent on phones.

Mobile should prioritize:

- Today/selected day.
- Readiness.
- Next action.
- Morning/afternoon/evening blocks.
- Dining.
- Rest.
- Notes.
- Quick edit.

## Why
Disney vacation planning often happens on phones while families are busy, traveling, or in the parks. Daily Planning must be fast, scannable, and easy to edit on small screens.

## How
- Design mobile-first daily planning layouts.
- Prioritize the selected day and most important next action above secondary details.
- Use collapsible or stacked sections for blocks, dining, rest, and notes.
- Ensure tap targets, text sizes, and spacing are mobile-friendly.
- Define quick-edit behavior without overloading the page.

## Definition of Done
- Mobile daily planning design/spec is complete.
- Layout prioritizes selected day, readiness, next action, blocks, dining, rest, notes, and quick edit.
- Empty, partial, and full day states are covered.
- Accessibility and touch target considerations are documented.
- No AI or payment functionality is introduced.

## Related Epic
WonderLane Trip at a Glance and Daily Planning Upgrade

## Labels
type: design, area: mobile, area: daily-planning, priority: p0-critical

# Issue: Add Daily Planning Tests

## What
Add test coverage for the upgraded daily planning experience.

Include:

- Empty trip.
- Partial trip.
- Full trip.
- Young child family.
- Dining conflicts.
- Rest gaps.
- Park day.
- Resort day.
- Travel day.
- Archived/deleted trip protection.
- Unauthorized access protection.
- Mobile layout selectors.

## Why
Daily Planning will become a core workflow. Tests are needed to protect guidance, readiness, conflict detection, permissions, mobile layout, and safety behavior as the product evolves.

## How
- Define unit tests for deterministic readiness/conflict/action rules.
- Define integration tests for daily planning data loading and permissions.
- Define UI/component tests for empty, partial, full, and mobile states.
- Include archived/deleted trip and unauthorized access protections.
- Add fixtures for young child family, park day, resort day, travel day, dining conflicts, and rest gaps.

## Definition of Done
- Test plan covers all listed scenarios.
- Rule, data, permissions, and UI/mobile test layers are identified.
- Fixtures needed for coverage are documented.
- No implementation is included in this draft issue.

## Related Epic
WonderLane Trip at a Glance and Daily Planning Upgrade

## Labels
type: testing, area: daily-planning, priority: p1-high

# Issue: Define V1 Scope for Daily Planning Upgrade

## What
Define what should be included in the first release of the Daily Planning Upgrade.

Recommended V1 includes:

- Trip at a Glance upgrade.
- Timeline.
- Guided day cards.
- Day type.
- Readiness.
- Conflicts.
- Suggested actions.
- Morning/afternoon/evening blocks.
- Notes.
- Mobile polish.

Recommended deferrals:

- Real-time park hours.
- External weather API.
- Live maps.
- AI planning.
- Paid personalization.

## Why
The upgrade can easily expand beyond a shippable scope. A clear V1 cutline protects Open Preview, avoids enabling disabled systems, and gives implementation agents a focused release target.

## How
- Review all Trip at a Glance and Daily Planning draft issues.
- Categorize each capability as V1, V1 follow-up, or deferred.
- Document dependencies, risks, and non-goals.
- Explicitly confirm that AI, payments, external weather, live maps, and real-time park data are deferred.
- Align scope with current WonderLane product status.

## Definition of Done
- V1 scope document is completed and linked from the related issues.
- Included and deferred capabilities are clearly separated.
- Non-goals include AI planning, paid personalization, external weather, live maps, and real-time park hours.
- Scope preserves Open Preview behavior.
- No features are implemented by this issue.

## Related Epic
WonderLane Trip at a Glance and Daily Planning Upgrade

## Labels
type: product, area: mvp, area: daily-planning, priority: p0-critical
