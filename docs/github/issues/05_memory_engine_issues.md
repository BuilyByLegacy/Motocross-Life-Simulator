# Issue: Implement Core Memory Record Model

## What
Create the memory engine data model for meaningful moments involving riders, family, bikes, races, parts, places, decisions, and important objects.

## Why
Legacy Studios' motto is “Build memories, not mechanics.” The game needs a first-class system that preserves emotional history across the career.

## How
Define memory records with title, date, participants, emotional tone, related systems, source event, tags, and long-term significance. Memories should be serializable and queryable.

## Definition of Done
- [ ] Memory records include date, title, description, tone, tags, and source references.
- [ ] Memories can link to riders, family members, bikes, parts, events, and locations.
- [ ] Memories are saved and loaded with career data.
- [ ] Memory records can be queried by entity, date, and tag.
- [ ] Tests cover creation, linking, and querying.

## Related Epic
Memory Engine

## Labels
`mvp`, `memory-engine`, `narrative`, `persistence`, `core`

# Issue: Add Provenance and Ownership History for Important Objects

## What
Implement Asset IDs, serial numbers, ownership history, provenance, and memory links for important bikes, parts, trophies, gear, and heirloom objects.

## Why
Everything has history. A used bike, cracked number plate, or hand-me-down part should carry a story that can follow the rider for years.

## How
Create an asset identity model with immutable Asset ID, optional serial number, ownership chain, acquisition source, sale/transfer records, and linked memories.

## Definition of Done
- [ ] Important objects receive stable Asset IDs.
- [ ] Serial numbers and provenance metadata can be stored.
- [ ] Ownership history supports purchase, sale, gift, trade, and inheritance events.
- [ ] Assets can link to memory records.
- [ ] Tests cover ownership transfer and provenance queries.

## Related Epic
Memory Engine

## Labels
`mvp`, `memory-engine`, `assets`, `provenance`, `marketplace`

# Issue: Create Automatic Memory Trigger System

## What
Build rules that automatically create memory records from significant events such as first race, first win, big crash, Loretta’s qualification, family sacrifice, bike purchase, and selling a beloved machine.

## Why
Memories should emerge from play. The game should notice meaningful moments and preserve them without relying on manual note-taking.

## How
Implement trigger definitions that listen to resolved events from calendar, competition, marketplace, garage, and Loretta’s systems. Each trigger should create structured memory records with source links.

## Definition of Done
- [ ] Trigger rules can subscribe to source event types.
- [ ] First-time and milestone conditions are supported.
- [ ] Generated memories include source references and emotional tone.
- [ ] Duplicate memories are prevented.
- [ ] Tests cover first win, bike purchase, and missed qualifier triggers.

## Related Epic
Memory Engine

## Labels
`mvp`, `memory-engine`, `events`, `narrative`, `automation`

# Issue: Implement Family and Relationship Memory Links

## What
Add memory support for family members and important relationships, including who attended events, who helped pay, who missed moments, and who was affected by decisions.

## Why
Respect the family and people before players are core principles. Motocross stories are family stories, not solo stat sheets.

## How
Extend memory participants to include relationship roles, emotional impact, attendance, support type, and decision consequences.

## Definition of Done
- [ ] Memories can include family members and relationship roles.
- [ ] Attendance, support, absence, and conflict can be recorded.
- [ ] Family-linked memories can be queried separately.
- [ ] Relationship impact metadata is serializable.
- [ ] Tests cover attended, missed, and sacrifice memory examples.

## Related Epic
Memory Engine

## Labels
`mvp`, `memory-engine`, `family`, `relationships`, `narrative`

# Issue: Build Memory Timeline Query API

## What
Create query APIs that return career, season, rider, bike, object, and family memory timelines for future UI presentation.

## Why
The player should be able to look back and understand the legacy they are building through connected memories.

## How
Implement timeline queries with filtering, sorting, grouping, pagination, and entity relationship traversal. The API should be UI-ready but not tied to a specific screen.

## Definition of Done
- [ ] Timeline queries support career, season, rider, bike, object, and family scopes.
- [ ] Filters include date range, tag, tone, entity, and source system.
- [ ] Results are ordered deterministically.
- [ ] Pagination or result limits are supported.
- [ ] Tests cover multi-entity timelines.

## Related Epic
Memory Engine

## Labels
`mvp`, `memory-engine`, `timeline`, `api`, `ui-ready`
