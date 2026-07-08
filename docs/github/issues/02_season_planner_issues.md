# Issue: Implement Event-Based Season Planner

## What
Create the season planner system that lets players build a season by choosing individual events instead of selecting a generic racing series size.

## Why
Careers are not linear. The player should define their path through local races, qualifiers, regionals, amateur nationals, practice, family constraints, and budget realities.

## How
Implement planner data structures for available events, selected events, season goals, conflicts, estimated costs, travel burden, and required deadlines. The planner should integrate with the calendar engine but not implement gameplay outcomes.

## Definition of Done
- [ ] Players can add and remove events from a season plan.
- [ ] Selected events generate calendar entries.
- [ ] Planner exposes estimated cost, time, travel, and conflict summaries.
- [ ] Planner does not require choosing a generic series size.
- [ ] Tests cover adding, removing, and updating planned events.

## Related Epic
Season Planner

## Labels
`mvp`, `season-planner`, `calendar`, `career`, `design-critical`

# Issue: Add Season Goal and Priority System

## What
Implement a system for defining season goals such as qualifying for Loretta Lynn’s, improving in a class, preserving budget, balancing family time, or rebuilding after injury.

## Why
People before players means the season should reflect personal priorities, not only wins. Goals give emotional context to calendar choices.

## How
Create goal models with target type, priority, linked events, progress state, and narrative description. Goals should influence planner warnings and summary text without forcing a linear career path.

## Definition of Done
- [ ] Season goals can be created, edited, completed, failed, or abandoned.
- [ ] Goals can link to planned events and calendar entries.
- [ ] Planner can identify events that support or conflict with goals.
- [ ] Goal progress is serializable.
- [ ] Tests cover multiple simultaneous goals.

## Related Epic
Season Planner

## Labels
`mvp`, `season-planner`, `goals`, `career`, `narrative`

# Issue: Implement Budget and Travel Forecasting for Planned Seasons

## What
Create forecasting tools that estimate entry fees, fuel, lodging, food, parts, maintenance, and time away from home for a proposed season calendar.

## Why
Authentic motocross planning is about sacrifices. A packed calendar should clearly show financial and family pressure before the player commits.

## How
Add forecast services that calculate estimated costs from event metadata, travel distance, bike needs, and configurable assumptions. Results should be exposed as structured data for future UI.

## Definition of Done
- [ ] Forecast includes entry fees, travel, lodging, maintenance, and contingency costs.
- [ ] Forecast identifies high-risk budget periods.
- [ ] Forecast can compare planned events against available budget inputs.
- [ ] Forecast data is available per event and per season.
- [ ] Tests verify calculations with known fixture data.

## Related Epic
Season Planner

## Labels
`mvp`, `season-planner`, `budget`, `travel`, `authenticity`

# Issue: Add Planner Commitment and Lock-In Flow

## What
Implement the process for turning a draft season plan into committed calendar entries with registrations, payment deadlines, travel holds, and withdrawal rules.

## Why
Decisions echo. Committing to an event should feel meaningful because it creates obligations and possible consequences.

## How
Introduce draft, tentative, committed, withdrawn, and missed states for planned events. Committing should create calendar events and deadlines while preserving source-plan relationships.

## Definition of Done
- [ ] Planned events support draft, tentative, committed, withdrawn, and missed states.
- [ ] Committing an event creates linked calendar entries and deadlines.
- [ ] Withdrawing from an event records a reason and possible cost.
- [ ] Planner history is preserved after commitment changes.
- [ ] Tests cover commitment state transitions.

## Related Epic
Season Planner

## Labels
`mvp`, `season-planner`, `calendar`, `state-machine`, `consequences`

# Issue: Create Season Plan Review Summary

## What
Build a review summary that explains the emotional, financial, competitive, and logistical shape of the planned season before the player confirms it.

## Why
Design for emotion requires planning screens to communicate what the rider and family are taking on, not just a list of dates.

## How
Generate structured review content from selected events, goals, conflicts, budget forecasts, travel totals, Loretta’s path requirements, and family calendar pressure.

## Definition of Done
- [ ] Review summary includes key events, total races, travel load, estimated cost, and conflict warnings.
- [ ] Summary highlights alignment with player goals.
- [ ] Summary flags missing prerequisites for Loretta Lynn’s paths.
- [ ] Summary includes emotionally framed risk notes.
- [ ] Tests verify summary output for representative plans.

## Related Epic
Season Planner

## Labels
`mvp`, `season-planner`, `ux-ready`, `narrative`, `review`
