# Issue: Define Phone/Internet UI Hub Information Architecture

## What
Create implementation-ready documentation and data contracts for the phone/internet UI hub, including calendar, messages, marketplace, dealer parts, season planner, results, memories, and saved searches.

## Why
The phone/internet is a major UI hub. It should feel like the rider's connection to the motocross world rather than a generic menu.

## How
Define screen groups, navigation hierarchy, required data models, notification entry points, and cross-links between systems. Do not implement final gameplay screens in this issue.

## Definition of Done
- [ ] Phone hub sections are documented with responsibilities.
- [ ] Data needed by each section is listed.
- [ ] Cross-links between calendar, marketplace, dealer, results, and memories are defined.
- [ ] Notification entry points are specified.
- [ ] Acceptance examples cover common player flows.

## Related Epic
Garage & Phone UI

## Labels
`mvp`, `phone-ui`, `ux`, `information-architecture`, `documentation`

# Issue: Implement Phone Notification Queue Model

## What
Create a notification queue for registration deadlines, event reminders, marketplace messages, dealer order updates, memory moments, results, and family notes.

## Why
The phone should make the world feel alive. Timely notifications help decisions echo through the player’s daily rhythm.

## How
Implement notification records with source system, timestamp, priority, read state, action target, expiration, and display summary. Integrate with existing event emitters where available.

## Definition of Done
- [ ] Notifications include source, priority, timestamp, title, body, action target, and read state.
- [ ] Notifications can expire or remain archived.
- [ ] Notifications can link to calendar, marketplace, dealer, memory, and competition records.
- [ ] Queue supports unread counts and sorted retrieval.
- [ ] Tests cover creation, read state, expiration, and sorting.

## Related Epic
Garage & Phone UI

## Labels
`mvp`, `phone-ui`, `notifications`, `systems`, `ui-ready`

# Issue: Create Garage Inventory View Models

## What
Implement view-ready models for garage inventory including bikes, parts, gear, tools, asset identity, compatibility, condition, ownership history, and linked memories.

## Why
The garage is where history becomes visible. Objects should feel owned, used, remembered, and connected to the rider's journey.

## How
Build aggregation services that combine asset records, marketplace/dealer sources, memory links, and current install state into concise UI-facing view models.

## Definition of Done
- [ ] Garage view models include Asset ID, serial number, condition, provenance, and memory counts.
- [ ] Installed, stored, listed-for-sale, and ordered items are distinguishable.
- [ ] Bike compatibility information is exposed for parts.
- [ ] Ownership history can be summarized.
- [ ] Tests cover bike, part, and gear inventory examples.

## Related Epic
Garage & Phone UI

## Labels
`mvp`, `garage`, `phone-ui`, `assets`, `ui-ready`

# Issue: Add Garage-to-Marketplace Listing Flow Contracts

## What
Define and implement the data flow for listing owned garage items on the used marketplace, including asking price, condition notes, photos metadata, compatibility, seller identity, and provenance disclosure.

## Why
Dealer parts and used marketplace listings are separate, but garage objects should move naturally into marketplace stories when players sell or trade them.

## How
Create listing draft models sourced from garage assets. The flow should preserve Asset ID, serial number, ownership history, and memory references while allowing player-authored sales details.

## Definition of Done
- [ ] Garage assets can generate marketplace listing drafts.
- [ ] Listing drafts preserve provenance and ownership references.
- [ ] Player-facing condition notes and asking price are supported.
- [ ] Sold listings update garage inventory state.
- [ ] Tests cover listing, editing, and completed sale states.

## Related Epic
Garage & Phone UI

## Labels
`mvp`, `garage`, `marketplace`, `assets`, `ui-flow`

# Issue: Implement Phone Search and Filter State Persistence

## What
Create persistent state for phone searches and filters across marketplace, dealer parts, calendar, memories, and results screens.

## Why
The phone should support real planning behavior. Players should be able to return to saved searches, filters, and context without losing their train of thought.

## How
Implement search/filter state objects with screen scope, query text, filters, sort order, last viewed item, saved status, and timestamp.

## Definition of Done
- [ ] Search state can be saved and restored by screen.
- [ ] Filters and sort order persist across sessions.
- [ ] Saved searches can be named and listed.
- [ ] Search state supports marketplace, dealer parts, calendar, memories, and results scopes.
- [ ] Tests cover save, restore, update, and delete behavior.

## Related Epic
Garage & Phone UI

## Labels
`mvp`, `phone-ui`, `search`, `filters`, `persistence`
