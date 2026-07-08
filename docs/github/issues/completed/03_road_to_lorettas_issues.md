# Issue: Model Loretta Lynn’s Qualification Path

## What
Implement the Road to Loretta’s progression model, including Area Qualifiers, Regional Championships, eligibility requirements, class rules, advancement state, and final qualification status.

## Why
Loretta Lynn’s is a defining amateur motocross dream. The game must represent the authentic qualifying journey rather than treating it as a normal selectable event.

## How
Create domain models for qualifier stages, regions, classes, advancement slots, cutoff dates, and rider eligibility. The system should integrate with the season planner and calendar deadline tracking.

## Definition of Done
- [ ] Loretta’s path includes Area Qualifier, Regional Championship, and National eligibility states.
- [ ] Rider class eligibility can be validated.
- [ ] Advancement status can be tracked per class.
- [ ] Required events can be linked to season plans and calendar entries.
- [ ] Tests cover qualified, eliminated, and incomplete paths.

## Related Epic
Road to Loretta’s

## Labels
`mvp`, `lorettas`, `qualification`, `career`, `authenticity`

# Issue: Add Area Qualifier Selection Rules

## What
Implement rules for choosing Area Qualifiers, including region, class availability, date windows, registration deadlines, and schedule conflicts.

## Why
Players should feel the planning pressure of picking the right qualifier at the right time, not simply click a “qualify” button.

## How
Extend event metadata and planner validation to mark Area Qualifiers, compatible classes, region relationships, and prerequisite status for Loretta’s progression.

## Definition of Done
- [ ] Area Qualifiers are identifiable in event data.
- [ ] Qualifiers expose supported classes and region information.
- [ ] Planner can show which qualifiers satisfy a Loretta’s path requirement.
- [ ] Deadlines and conflicts are generated for selected qualifiers.
- [ ] Tests cover invalid class and region selections.

## Related Epic
Road to Loretta’s

## Labels
`mvp`, `lorettas`, `area-qualifier`, `season-planner`, `rules`

# Issue: Add Regional Championship Qualification Rules

## What
Implement Regional Championship access rules based on Area Qualifier results, selected class, region, and calendar deadlines.

## Why
The Road to Loretta’s must reward authentic progression. Reaching a Regional should feel earned and traceable through the rider’s history.

## How
Create validation logic that checks whether a rider has qualified through the correct Area Qualifier path before allowing Regional Championship commitment.

## Definition of Done
- [ ] Regional events require valid Area Qualifier advancement.
- [ ] Regional eligibility is tracked per rider and class.
- [ ] Invalid Regional selections produce actionable planner warnings.
- [ ] Regional commitment creates calendar entries and deadlines.
- [ ] Tests cover valid, invalid, and expired qualification states.

## Related Epic
Road to Loretta’s

## Labels
`mvp`, `lorettas`, `regional-championship`, `qualification`, `calendar`

# Issue: Track Loretta’s Dream Status and Emotional Stakes

## What
Create a system that tracks the rider’s Loretta’s dream status, including hope, pressure, missed chances, family investment, and milestone memories.

## Why
Memories matter more than rewards. Qualifying, missing out, or trying again should become part of the rider’s story and family legacy.

## How
Add a Loretta’s narrative state object that references goals, qualifier attempts, results, expenses, family notes, and generated memory records.

## Definition of Done
- [ ] Loretta’s dream state records attempts by season, class, and region.
- [ ] Major milestones create memory engine records.
- [ ] Failed or missed attempts preserve reasons and context.
- [ ] Status can be summarized for phone/internet UI.
- [ ] Tests verify memory creation for key milestones.

## Related Epic
Road to Loretta’s

## Labels
`mvp`, `lorettas`, `memory-engine`, `narrative`, `family`

# Issue: Add Loretta’s Path Planner Warnings

## What
Implement planner warnings that identify missing qualifiers, incompatible classes, impossible date sequences, registration risks, and budget overload for a Loretta’s-focused season.

## Why
Authenticity before convenience means the game should help players understand the real path without hiding its difficulty.

## How
Create validation rules that inspect selected season events, Loretta’s goals, calendar constraints, budget forecasts, and qualification state. Return structured warnings grouped by severity.

## Definition of Done
- [ ] Planner warns when no Area Qualifier is selected for a Loretta’s goal.
- [ ] Planner warns when Regional timing is impossible or unqualified.
- [ ] Planner warns about class incompatibility.
- [ ] Warnings include suggested next actions.
- [ ] Tests cover representative warning scenarios.

## Related Epic
Road to Loretta’s

## Labels
`mvp`, `lorettas`, `season-planner`, `validation`, `ux-ready`
