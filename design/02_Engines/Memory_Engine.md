# Memory Engine

## Purpose

The Memory Engine records meaningful life events and makes them reusable across dialogue, relationships, race commentary, documentaries, garage displays, world reputation, opportunities, and future story chains.

## Core Rule

A memory is only worth saving if it can influence future gameplay, dialogue, relationships, recaps, reputation, the garage, or story generation.

## Five Memory Types

### 1. Personal Memories
What a person remembers about their own life.

Examples:
- First race
- First win
- First crash
- First broken bone
- First sponsor
- First factory offer

### 2. Relationship Memories
Shared history between people.

Examples:
- Dad rebuilt the engine overnight.
- Rival took you out in a corner.
- Coach believed in you before anyone else did.
- Friend loaned you a bike.

### 3. World Memories
Events the broader motocross world knows about.

Examples:
- Loretta win
- Factory signing
- Track closure
- Major accident
- Famous comeback

### 4. Object Memories
Objects retain history.

Examples:
- First helmet
- Dad's toolbox
- Championship bike
- Bent handlebars
- Factory forks
- Trailer used for ten seasons

### 5. Place Memories
Places retain history.

Examples:
- Home garage
- Backyard track
- First local track
- Training facility
- Hotel used every year for regionals

## Memory Lifecycle

Event occurs -> Importance evaluated -> Memory created -> Participants interpret event -> Relationships change -> Objects/places update -> Future story hooks generated.

## Importance Score

Possible factors:
- First-time milestone
- Championship stakes
- Injury severity
- Family sacrifice
- Financial impact
- Rival involvement
- Sponsor involvement
- Unexpectedness
- Comeback factor
- Long-term consequence

## Same Event, Different Interpretations

Example: Rider races hurt and wins.

- Dad may remember toughness.
- Mom may remember fear and regret.
- Coach may remember pressure performance.
- Sponsor may remember marketability.
- Doctor may remember risk.

## Memory Consumers

- Dialogue
- Commentary
- Story Engine
- Relationship Engine
- Opportunity Engine
- Marketplace
- Garage Museum
- Family Album
- Season Recap
- Career Documentary
- Hall of Fame

## Example Memory Record

```json
{
  "id": "mem_first_regional_win",
  "type": "race_result",
  "title": "First Regional Win",
  "rider_age": 11,
  "location": "Southwick",
  "importance": 92,
  "emotion": ["joy", "relief", "pride"],
  "people_involved": ["player", "dad", "mom", "rival_ethan", "coach_mike"],
  "tags": ["first_win", "regional", "mud", "rivalry", "comeback"],
  "summary_short": "You won your first regional race at Southwick.",
  "summary_long": "At age 11, you won your first regional race at Southwick after a muddy final moto battle with Ethan.",
  "objects_created": ["muddy_number_plate", "regional_trophy"]
}
```
