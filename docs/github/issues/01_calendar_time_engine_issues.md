# Issue: Implement Master Career Calendar Model

## What
Design and implement the core calendar data model that represents days, weeks, months, seasons, event dates, deadlines, travel windows, school/work constraints, family obligations, and recovery time for Motocross: Chasing the Dream.

## Why
The game vision depends on careers feeling lived-in rather than menu-driven. A rider's story should emerge from how time is spent, what is missed, and what is prioritized.

## How
Create a calendar domain model that stores dated entries, entry types, availability rules, conflicts, and metadata. The model should support deterministic simulation, serialization, save/load, and future UI presentation through the phone/internet hub.

## Definition of Done
- [ ] Calendar entities support date, duration, category, priority, location, and notes.
- [ ] Calendar can represent races, qualifiers, practice days, travel, maintenance, rest, family events, school/work, and deadlines.
- [ ] Calendar supports save/load serialization.
- [ ] Calendar exposes query helpers for day, week, month, and season views.
- [ ] Automated tests cover overlapping events and empty-calendar states.

## Related Epic
Calendar & Time Engine

## Labels
`mvp`, `calendar`, `time-engine`, `systems`, `backend`

# Issue: Add Time Advancement and Daily Resolution Flow

## What
Implement the system that advances time by one or more days and resolves scheduled calendar entries, pending decisions, missed deadlines, and automatic background updates.

## Why
Decisions must echo over time. Advancing time is how the game turns plans into memories, consequences, opportunities, and regrets.

## How
Create a time advancement service that processes each day in order, dispatches calendar events to registered systems, records resolved outcomes, and queues player-facing summaries for the phone/internet UI.

## Definition of Done
- [ ] Time can advance by one day, multiple days, or to a selected calendar date.
- [ ] Events resolve in deterministic chronological order.
- [ ] Missed deadlines are detected and recorded.
- [ ] Resolved events can create memory entries and notifications.
- [ ] Tests verify multi-day advancement and deadline handling.

## Related Epic
Calendar & Time Engine

## Labels
`mvp`, `calendar`, `simulation`, `time-engine`, `notifications`

# Issue: Implement Calendar Conflict Detection

## What
Create conflict detection for overlapping events, impossible travel plans, back-to-back fatigue risks, and mutually exclusive commitments.

## Why
Authenticity before convenience means the game should respect real limitations. Players should feel the cost of overcommitting rather than freely stacking every opportunity.

## How
Add validation rules that compare event times, locations, required preparation windows, travel distance, and rider availability. Conflicts should return structured warnings, blockers, or soft-risk notices.

## Definition of Done
- [ ] Calendar identifies overlapping event dates and times.
- [ ] Travel conflicts can be flagged between distant locations.
- [ ] Required prep, rest, or maintenance windows can produce warnings.
- [ ] Conflicts distinguish hard blockers from soft risks.
- [ ] Conflict results are formatted for future UI display.

## Related Epic
Calendar & Time Engine

## Labels
`mvp`, `calendar`, `validation`, `authenticity`, `ux-ready`

# Issue: Add Event Deadline Tracking

## What
Implement deadline tracking for registration close dates, qualifier cutoff dates, payment due dates, parts delivery dates, and event withdrawal windows.

## Why
Motocross careers are shaped by logistics as much as racing. Missing a deadline should feel like a believable story moment, not an arbitrary failure.

## How
Extend calendar entries with deadline metadata and create services that surface upcoming, urgent, missed, and completed deadlines. Deadlines should be queryable by related event, system, and severity.

## Definition of Done
- [ ] Deadline entries can link to races, qualifiers, orders, repairs, and other systems.
- [ ] Deadline states include upcoming, urgent, completed, missed, and expired.
- [ ] Missed deadlines trigger structured consequences.
- [ ] Upcoming deadlines can be retrieved for phone notifications.
- [ ] Tests cover deadline state transitions.

## Related Epic
Calendar & Time Engine

## Labels
`mvp`, `calendar`, `deadlines`, `systems`, `phone-ui`

# Issue: Create Season Timeline Summary Generator

## What
Build a summary generator that converts completed calendar activity into readable season timeline entries, including notable decisions, event results, family moments, purchases, and bike history updates.

## Why
The studio motto is “Build memories, not mechanics.” The calendar must become a record of what the rider lived through, not just a planner.

## How
Create a timeline aggregation service that consumes resolved calendar events and related memory records, groups them by date or week, and produces concise summary objects for future UI display.

## Definition of Done
- [ ] Timeline summaries include date, title, category, related entities, and emotional tone.
- [ ] Race, travel, purchase, maintenance, and family events can appear in summaries.
- [ ] Summaries preserve links to source records.
- [ ] Duplicate summaries are avoided.
- [ ] Tests verify ordering and grouping behavior.

## Related Epic
Calendar & Time Engine

## Labels
`mvp`, `calendar`, `memory-engine`, `narrative`, `ui-ready`
