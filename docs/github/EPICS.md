# Epics for Motocross: Chasing the Dream

Studio: Legacy Studios  
Tagline: Every rider has a story. Chase yours.  
Motto: Build memories, not mechanics.

Epics are tracked as GitHub issues labeled `type: epic`. Child issues should link back to their parent epic and use the shared issue structure: What, Why, How, and Definition of Done.

## Design principles

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

## Recommended epic list

### 1. EPIC: Core Simulation Engine

**Purpose:** Define the foundation that coordinates time, entities, state changes, rules, and long-running simulation outcomes.

**Why it matters:** The game depends on believable consequences. The core simulation must make the world feel alive without making every system revolve around the player.

**Example child issues:**

- Define global simulation tick and update order.
- Document entity ownership, persistence, and save/load expectations.
- Design event dispatch rules between major systems.
- Identify MVP simulation boundaries.

**Definition of Done:** Core simulation responsibilities, interfaces, constraints, and MVP boundaries are documented and approved.

### 2. EPIC: Memory Engine

**Purpose:** Design how characters, families, rivals, sponsors, and the world remember meaningful events.

**Why it matters:** Memories matter more than rewards. The game should treat lived history as the emotional backbone of careers and relationships.

**Example child issues:**

- Define memory object schema.
- Design memory importance, decay, and resurfacing rules.
- Create examples of memories affecting dialogue and decisions.
- Specify save/load requirements for memories.

**Definition of Done:** Memory types, lifecycle, triggers, and downstream effects are specified with implementation-ready examples.

### 3. EPIC: Relationship Engine

**Purpose:** Define relationship models for family, rivals, friends, sponsors, mechanics, and community members.

**Why it matters:** People before players. Relationships should evolve through actions, history, trust, conflict, and shared sacrifice.

**Example child issues:**

- Define relationship dimensions and values.
- Design family trust and pressure interactions.
- Specify rivalry and friendship progression.
- Connect relationships to memories and story events.

**Definition of Done:** Relationship data, rules, emotional states, and cross-system hooks are documented.

### 4. EPIC: Story Engine

**Purpose:** Create the structure for emergent story moments, authored beats, consequences, and callbacks.

**Why it matters:** The game should build personal motocross stories rather than force a single linear plot.

**Example child issues:**

- Define story event trigger rules.
- Document authored vs. emergent story content.
- Design consequence and callback handling.
- Create sample story arcs for parent and rider campaigns.

**Definition of Done:** Story event structure, trigger criteria, content requirements, and integration points are approved.

### 5. EPIC: World Simulation Engine

**Purpose:** Define how the motocross world progresses independently through riders, teams, events, opportunities, and market changes.

**Why it matters:** The world does not revolve around the player. A living world makes player choices feel situated and meaningful.

**Example child issues:**

- Design NPC rider season progression.
- Define team and sponsor activity rules.
- Document regional competition ecology.
- Specify world state persistence.

**Definition of Done:** World simulation scope, update rules, and MVP representation are documented.

### 6. EPIC: Calendar & Time Engine

**Purpose:** Define how days, weeks, seasons, events, deadlines, routines, and long-term careers advance.

**Why it matters:** Motocross is shaped by preparation, timing, cost, recovery, and missed opportunities.

**Example child issues:**

- Design calendar event data model.
- Define season scheduling and conflict rules.
- Specify time advancement and interruption behavior.
- Document offseason and school/work constraints.

**Definition of Done:** Calendar flows, event rules, conflict handling, and MVP time loops are implementation-ready.

### 7. EPIC: Family & Economy Engine

**Purpose:** Define household resources, budgets, sacrifices, work, parental support, and financial pressure.

**Why it matters:** Respect the family. Motocross dreams are family stories shaped by money, time, risk, and commitment.

**Example child issues:**

- Define household budget categories.
- Design parent time and stress systems.
- Specify purchase, maintenance, and travel costs.
- Create family sacrifice event examples.

**Definition of Done:** Family economy rules, emotional consequences, and MVP budget loops are documented.

### 8. EPIC: Competition / Race Engine

**Purpose:** Define race weekends, entries, classes, qualifying, results, skill expression, and consequences.

**Why it matters:** Racing must feel earned, authentic, and connected to preparation rather than isolated mini-games.

**Example child issues:**

- Design event registration and class entry flow.
- Define race result calculation inputs.
- Document practice, motos, and final scoring.
- Specify injuries, fatigue, bike condition, and weather effects.

**Definition of Done:** Race lifecycle, result rules, and required data are defined for MVP and future expansion.

### 9. EPIC: Asset Engine

**Purpose:** Define ownership, condition, history, depreciation, attachment, and lifecycle of bikes, parts, gear, vehicles, and property.

**Why it matters:** Everything has history. Owned objects should carry memories, tradeoffs, and practical consequences.

**Example child issues:**

- Define asset schema and condition states.
- Design maintenance and wear rules.
- Specify sentimental or historical attachment.
- Document save/load and transfer behavior.

**Definition of Done:** Asset lifecycle rules, metadata, and cross-system effects are documented.

### 10. EPIC: Marketplace Engine

**Purpose:** Design a searchable used marketplace for bikes, parts, gear, trailers, and services.

**Why it matters:** Authentic motocross progression often involves imperfect purchases, negotiation, risk, and opportunity.

**Example child issues:**

- Define listing data and seller profiles.
- Design search, filters, and alerts.
- Specify negotiation and inspection rules.
- Document scams, hidden damage, and rare finds.

**Definition of Done:** Marketplace scope, listing behavior, search UX, and MVP transaction rules are approved.

### 11. EPIC: Garage & Property System

**Purpose:** Define the physical spaces where the family stores, repairs, upgrades, and remembers its motocross life.

**Why it matters:** The garage is a home base for identity, progress, family labor, and legacy.

**Example child issues:**

- Design garage capacity and storage rules.
- Define workbench and maintenance interactions.
- Specify property upgrades and constraints.
- Create memory display and trophy examples.

**Definition of Done:** Garage/property responsibilities, upgrade paths, and emotional hooks are documented.

### 12. EPIC: Phone / Internet UI

**Purpose:** Define in-game phone, apps, messaging, marketplace browsing, calendars, photos, and online motocross information.

**Why it matters:** A phone can make the world feel connected while surfacing opportunities, relationships, and memories naturally.

**Example child issues:**

- Design phone navigation and app list.
- Define messaging and notification rules.
- Specify internet pages for events, marketplace, and sponsors.
- Create photo/memory integration examples.

**Definition of Done:** Phone UX, app responsibilities, content needs, and MVP screens are documented.

### 13. EPIC: Career Progression

**Purpose:** Define non-linear career paths through amateur, regional, national, sponsored, and life-stage progression.

**Why it matters:** Earn every moment. Progression should emerge from choices, resources, relationships, performance, and timing.

**Example child issues:**

- Remove linear career progression assumptions.
- Define progression gates and alternatives.
- Document sponsorship and reputation factors.
- Design setbacks and comeback paths.

**Definition of Done:** Career models, branching paths, and progression criteria are approved.

### 14. EPIC: Road to Loretta’s

**Purpose:** Design an authentic path toward Loretta Lynn’s qualification, preparation, pressure, and family sacrifice.

**Why it matters:** Loretta’s is a defining dream for many amateur motocross families and should feel earned, uncertain, and emotional.

**Example child issues:**

- Research real qualification structure.
- Design area and regional qualifier flow.
- Define costs, travel, pressure, and scheduling conflicts.
- Create qualification success and failure story outcomes.

**Definition of Done:** Qualification system, event flow, costs, and narrative consequences are documented.

### 15. EPIC: Rider Development Curves

**Purpose:** Define how riders grow, plateau, regress, specialize, and respond to training, age, pressure, injury, and confidence.

**Why it matters:** Riders should feel like people with different paths, not stat blocks that only increase.

**Example child issues:**

- Define rider attributes and development factors.
- Design growth spurts, plateaus, and burnout.
- Specify training and race experience effects.
- Document parent influence and pressure tradeoffs.

**Definition of Done:** Development curves, modifiers, limits, and examples are implementation-ready.

### 16. EPIC: Bike Class Transitions

**Purpose:** Define age, skill, bike size, class eligibility, and family decisions around moving up or staying put.

**Why it matters:** Class transitions are emotional and financial milestones with risk, identity, and competitive consequences.

**Example child issues:**

- Research real youth and amateur class structures.
- Define class eligibility rules.
- Design transition timing and readiness indicators.
- Document costs and performance impacts.

**Definition of Done:** Class transition rules, decision points, and consequences are documented.

### 17. EPIC: Parent Campaign

**Purpose:** Define a playable perspective centered on guiding, funding, supporting, and emotionally stewarding a rider’s dream.

**Why it matters:** Respect the family. The parent campaign should show that motocross is built by households, not just riders.

**Example child issues:**

- Define parent responsibilities and daily loop.
- Design work, budget, travel, and relationship decisions.
- Specify parent-child trust and pressure mechanics.
- Create sample parent campaign arcs.

**Definition of Done:** Parent campaign loop, choices, consequences, and MVP boundaries are approved.

### 18. EPIC: Rider Campaign

**Purpose:** Define a playable perspective centered on training, racing, school/life balance, confidence, identity, and ambition.

**Why it matters:** The rider campaign should create personal agency without ignoring family, community, and circumstance.

**Example child issues:**

- Define rider daily and weekly loop.
- Design motivation, confidence, and pressure states.
- Specify training, social, and school decisions.
- Create sample rider campaign arcs.

**Definition of Done:** Rider campaign loop, player decisions, and emotional progression are documented.

### 19. EPIC: Research Binder

**Purpose:** Maintain structured research that supports authenticity across motocross culture, rules, costs, family life, equipment, and competition.

**Why it matters:** Authenticity before convenience. Research should guide design instead of being scattered across conversations.

**Example child issues:**

- Create research source standards.
- Compile Loretta’s qualification research.
- Research used bike marketplace behavior.
- Document family cost and travel examples.

**Definition of Done:** Research categories, source standards, and initial priority research tasks are organized.

### 20. EPIC: MVP Vertical Slice

**Purpose:** Define the smallest playable slice that proves the game’s core promise without overbuilding.

**Why it matters:** The project needs a focused path from design vision to playable proof while preserving the emotional thesis.

**Example child issues:**

- Define MVP player journey.
- Select included systems and excluded future scope.
- Specify target events, UI screens, and data needs.
- Create vertical slice acceptance criteria.

**Definition of Done:** MVP scope, success criteria, required systems, and cut lines are approved.
