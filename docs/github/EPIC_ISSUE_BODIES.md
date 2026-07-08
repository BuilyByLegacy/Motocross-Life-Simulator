# Epic Issue Bodies

Create or update the GitHub epic issues below with `type: epic`, `priority: p1-high` or `priority: p2-medium`, the relevant `area:*` label, and `status: needs-design` until child issues are scoped.

## EPIC: Core Simulation Engine

## Purpose
Own the underlying simulation rules, state changes, entities, and long-running consequences that make the game world feel coherent.

## Why It Matters
The sports life simulator depends on outcomes feeling earned, remembered, and connected instead of being isolated minigame events.

## Scope
- Core game state, entities, and simulation ticks
- Rules for cause and effect across systems
- Cross-system dependencies and data contracts
- Save-safe simulation behavior

## Example Child Issues
- [ ] Define core simulation entity model
- [ ] Document cross-engine update order
- [ ] Identify MVP simulation state requirements

## Definition of Done
- [ ] System design spec completed
- [ ] Related research completed or documented
- [ ] Implementation issues created
- [ ] MVP requirements identified
- [ ] Open questions documented

## EPIC: Memory Engine

## Purpose
Track meaningful events and turn them into memories that can influence riders, families, rivals, sponsors, and the world.

## Why It Matters
Legacy Studios' motto is "Build memories, not mechanics," so the game needs remembered moments that carry emotional weight.

## Scope
- Memory creation triggers
- Memory importance and decay rules
- Character-facing callbacks
- Season, career, and legacy recap inputs

## Example Child Issues
- [ ] Define memory data structure
- [ ] Design memory trigger categories
- [ ] Create MVP memory recap requirements

## Definition of Done
- [ ] System design spec completed
- [ ] Related research completed or documented
- [ ] Implementation issues created
- [ ] MVP requirements identified
- [ ] Open questions documented

## EPIC: Relationship Engine

## Purpose
Model relationships with family, rivals, friends, sponsors, mechanics, and the motocross community.

## Why It Matters
The game philosophy puts people before players, so relationships should shape opportunities, pressure, support, and consequences.

## Scope
- Relationship stats and trust
- Family support and conflict
- Rival, friend, sponsor, and community dynamics
- Relationship-based event callbacks

## Example Child Issues
- [ ] Define relationship categories
- [ ] Design family trust and support rules
- [ ] Scope MVP rival relationship behavior

## Definition of Done
- [ ] System design spec completed
- [ ] Related research completed or documented
- [ ] Implementation issues created
- [ ] MVP requirements identified
- [ ] Open questions documented

## EPIC: Story Engine

## Purpose
Coordinate emergent story beats, authored moments, callbacks, and consequences from simulated life events.

## Why It Matters
Motocross: Chasing the Dream should feel like a rider's life story, not only a sequence of races.

## Scope
- Story event triggers
- Narrative callbacks from memories and relationships
- Authored and emergent story moments
- Recap and legacy story inputs

## Example Child Issues
- [ ] Define story event taxonomy
- [ ] Design story trigger priority rules
- [ ] Scope MVP season story moments

## Definition of Done
- [ ] System design spec completed
- [ ] Related research completed or documented
- [ ] Implementation issues created
- [ ] MVP requirements identified
- [ ] Open questions documented

## EPIC: World Simulation Engine

## Purpose
Simulate the broader motocross world, including NPC riders, teams, events, opportunities, and changing market conditions.

## Why It Matters
The world should not revolve around the player; other people and systems need history, goals, and motion.

## Scope
- NPC rider progression
- Event and opportunity generation
- Team, sponsor, and community movement
- Market and world-state changes

## Example Child Issues
- [ ] Define NPC rider simulation needs
- [ ] Design world opportunity generation
- [ ] Scope MVP non-player event outcomes

## Definition of Done
- [ ] System design spec completed
- [ ] Related research completed or documented
- [ ] Implementation issues created
- [ ] MVP requirements identified
- [ ] Open questions documented

## EPIC: Calendar & Time Engine

## Purpose
Own days, weeks, seasons, deadlines, routines, event planning, and time-based consequences.

## Why It Matters
Motocross life is shaped by school, work, travel, rest, injuries, bike prep, and event deadlines.

## Scope
- Season Event Planner
- Weekly and seasonal calendar structure
- Rest, travel, school, work, and sponsor timing
- Time-based blockers and opportunities

## Example Child Issues
- [ ] Replace “How big do you want to race?” with Season Event Planner
- [ ] Design calendar conflict rules
- [ ] Scope MVP event planning UI

## Definition of Done
- [ ] System design spec completed
- [ ] Related research completed or documented
- [ ] Implementation issues created
- [ ] MVP requirements identified
- [ ] Open questions documented

## EPIC: Family & Economy Engine

## Purpose
Model household budgets, sacrifice, work, income, parental support, and financial pressure.

## Why It Matters
Motocross is expensive and family-driven; every race choice should carry practical and emotional cost.

## Scope
- Budgets, income, expenses, and debt risk
- Parent approval and support
- Work, school, travel, and equipment costs
- Financial consequences and tradeoffs

## Example Child Issues
- [ ] Define family budget categories
- [ ] Design parent approval blockers
- [ ] Scope MVP race weekend cost model

## Definition of Done
- [ ] System design spec completed
- [ ] Related research completed or documented
- [ ] Implementation issues created
- [ ] MVP requirements identified
- [ ] Open questions documented

## EPIC: Competition / Race Engine

## Purpose
Own race weekends, classes, qualifying, results, fatigue, injuries, pressure, and competition consequences.

## Why It Matters
Racing should feel authentic, consequential, and tied to preparation rather than isolated arcade outcomes.

## Scope
- Event entries and class rules
- Race results and standings
- Fatigue, injury, bike condition, and pressure effects
- Qualification and championship consequences

## Example Child Issues
- [ ] Define race weekend data model
- [ ] Design multi-class entry constraints
- [ ] Scope MVP race result factors

## Definition of Done
- [ ] System design spec completed
- [ ] Related research completed or documented
- [ ] Implementation issues created
- [ ] MVP requirements identified
- [ ] Open questions documented

## EPIC: Asset Engine

## Purpose
Track bikes, parts, gear, vehicles, property, ownership, condition, history, depreciation, and item identity.

## Why It Matters
Everything has history, and the player's objects should carry stories, risk, value, and maintenance consequences.

## Scope
- Asset identity, serial numbers, and ownership history
- Condition, wear, repairs, and depreciation
- Compatibility and lifecycle rules
- Asset links to memories and marketplace listings

## Example Child Issues
- [ ] Define asset identity and history model
- [ ] Design compatibility rules for bikes and parts
- [ ] Scope MVP condition and depreciation behavior

## Definition of Done
- [ ] System design spec completed
- [ ] Related research completed or documented
- [ ] Implementation issues created
- [ ] MVP requirements identified
- [ ] Open questions documented

## EPIC: Marketplace Engine

## Purpose
Own used marketplace listings, dealer websites, search, filtering, negotiation, risk, compatibility, and buying or selling flows.

## Why It Matters
The marketplace should feel like a living motocross economy with opportunity, history, scams, hidden damage, and community reputation.

## Scope
- Used listings, private sellers, and seller reputation
- Dealer websites, OEM parts catalog, MSRP, warranty, and backorders
- Search, saved searches, filters, and notifications
- Negotiation, scams, hidden damage, item history, and compatibility

## Example Child Issues
- [ ] Design used marketplace listing model
- [ ] Design dealer website parts flow
- [ ] Scope saved search and phone notification behavior

## Definition of Done
- [ ] System design spec completed
- [ ] Related research completed or documented
- [ ] Implementation issues created
- [ ] MVP requirements identified
- [ ] Open questions documented

## EPIC: Garage & Property System

## Purpose
Own the player's home base, garage storage, maintenance, upgrades, trophies, and property identity.

## Why It Matters
The garage should reflect family effort, history, sacrifices, growth, and the practical work of keeping a rider moving.

## Scope
- Garage inventory and storage
- Bike and part maintenance access
- Property upgrades and limitations
- Trophy, keepsake, and memory display

## Example Child Issues
- [ ] Define garage inventory requirements
- [ ] Design property upgrade categories
- [ ] Scope MVP trophy and keepsake display

## Definition of Done
- [ ] System design spec completed
- [ ] Related research completed or documented
- [ ] Implementation issues created
- [ ] MVP requirements identified
- [ ] Open questions documented

## EPIC: Phone / Internet UI

## Purpose
Own the in-game phone, internet layer, apps, messages, notifications, and web-style interfaces.

## Why It Matters
The phone is the player-facing hub for modern motocross life: calendars, marketplace, dealers, sponsors, messages, news, and money.

## Scope
- Phone shell and app navigation
- Marketplace and dealer website access
- Race Calendar, Messages, Social Media, MotoNews, Garage / Maintenance, Sponsors, and Banking or money views
- Notifications and saved search alerts

## Example Child Issues
- [ ] Design phone app launcher
- [ ] Scope Race Calendar app MVP
- [ ] Define marketplace notification behavior

## Definition of Done
- [ ] System design spec completed
- [ ] Related research completed or documented
- [ ] Implementation issues created
- [ ] MVP requirements identified
- [ ] Open questions documented

## EPIC: Career Progression

## Purpose
Own non-linear career paths through youth, amateur, regional, national, sponsored, and life-stage progression.

## Why It Matters
A meaningful motocross career is not always upward or professional; setbacks, plateaus, missed qualifications, and late growth should matter.

## Scope
- Nonlinear progression and regression
- Career milestones and setbacks
- Amateur, sponsor, and life-stage paths
- Meaningful careers that may never turn pro

## Example Child Issues
- [ ] Remove linear class progression assumptions
- [ ] Design career setback categories
- [ ] Scope MVP season-to-season progression rules

## Definition of Done
- [ ] System design spec completed
- [ ] Related research completed or documented
- [ ] Implementation issues created
- [ ] MVP requirements identified
- [ ] Open questions documented

## EPIC: Road to Loretta’s

## Purpose
Own the qualification journey to Loretta Lynn’s, including Area Qualifier, Regional Championship, and Loretta Lynn National.

## Why It Matters
Making Loretta’s should feel like a major achievement requiring preparation, sacrifice, qualification, and pressure management.

## Scope
- Area Qualifier events
- Regional Championship advancement
- Loretta Lynn National entry and pressure
- Costs, travel, timing, family impact, and qualification failure states

## Example Child Issues
- [ ] Design Area Qualifier to Regional advancement rules
- [ ] Design Regional Championship to Loretta advancement rules
- [ ] Scope MVP Loretta qualification feedback

## Definition of Done
- [ ] System design spec completed
- [ ] Related research completed or documented
- [ ] Implementation issues created
- [ ] MVP requirements identified
- [ ] Open questions documented

## EPIC: Rider Development Curves

## Purpose
Model rider growth, plateaus, regression, specialization, burnout, confidence, and age-related development.

## Why It Matters
Riders are people first, so development should include uneven growth, emotional context, and long-term identity.

## Scope
- Skill growth and plateaus
- Confidence, burnout, and pressure
- Regression and late blooming
- Links to training, racing, relationships, and bike transitions

## Example Child Issues
- [ ] Define rider growth curve inputs
- [ ] Design burnout and confidence effects
- [ ] Scope MVP plateau behavior

## Definition of Done
- [ ] System design spec completed
- [ ] Related research completed or documented
- [ ] Implementation issues created
- [ ] MVP requirements identified
- [ ] Open questions documented

## EPIC: Bike Class Transitions

## Purpose
Own age, skill, bike size, eligibility, class changes, and the emotional and financial timing of moving between bikes.

## Why It Matters
Bike transitions can create pride, pressure, cost, struggle, and identity shifts rather than simple upgrades.

## Scope
- Age and eligibility rules
- Bike size and class compatibility
- Transition timing and readiness
- Financial, confidence, and family consequences

## Example Child Issues
- [ ] Define bike class eligibility table
- [ ] Design transition readiness signals
- [ ] Scope MVP outgrown bike behavior

## Definition of Done
- [ ] System design spec completed
- [ ] Related research completed or documented
- [ ] Implementation issues created
- [ ] MVP requirements identified
- [ ] Open questions documented

## EPIC: Parent Campaign

## Purpose
Own the parent-led campaign perspective for guiding, funding, supporting, and emotionally stewarding a rider's dream.

## Why It Matters
Respect the family means the parent role should be a complete emotional and practical campaign, not only a funding menu.

## Scope
- Parent decision-making and approval
- Household pressure and sacrifice
- Support, boundaries, and emotional consequences
- Parent-specific UI and progression needs

## Example Child Issues
- [ ] Define parent campaign core loop
- [ ] Design parent approval decision categories
- [ ] Scope MVP parent perspective choices

## Definition of Done
- [ ] System design spec completed
- [ ] Related research completed or documented
- [ ] Implementation issues created
- [ ] MVP requirements identified
- [ ] Open questions documented

## EPIC: Rider Campaign

## Purpose
Own the rider-led campaign perspective for training, racing, school or work balance, confidence, identity, and ambition.

## Why It Matters
The rider campaign should let players experience the dream from the rider's emotional and day-to-day perspective.

## Scope
- Rider choices and agency
- Training, school, work, rest, and racing balance
- Confidence, identity, and ambition
- Rider-specific UI and progression needs

## Example Child Issues
- [ ] Define rider campaign core loop
- [ ] Design rider identity and ambition inputs
- [ ] Scope MVP rider weekly choices

## Definition of Done
- [ ] System design spec completed
- [ ] Related research completed or documented
- [ ] Implementation issues created
- [ ] MVP requirements identified
- [ ] Open questions documented

## EPIC: Research Binder

## Purpose
Own structured research for motocross culture, rules, costs, family life, equipment, competition, and authenticity references.

## Why It Matters
Authenticity before convenience requires sourced research before major design and implementation decisions.

## Scope
- Research questions and source tracking
- Rules, eligibility, costs, travel, and equipment references
- Culture, family, sponsor, and amateur racing research
- Open research gaps and decisions

## Example Child Issues
- [ ] Research Loretta qualification structure
- [ ] Research amateur motocross cost ranges
- [ ] Research youth bike class eligibility rules

## Definition of Done
- [ ] System design spec completed
- [ ] Related research completed or documented
- [ ] Implementation issues created
- [ ] MVP requirements identified
- [ ] Open questions documented

## EPIC: MVP Vertical Slice

## Purpose
Own the smallest playable slice that proves the game's core promise of a motocross sports life simulator.

## Why It Matters
The MVP should prove memories, family pressure, racing, calendar choices, assets, and progression can work together emotionally.

## Scope
- MVP feature boundaries
- Cross-system acceptance criteria
- Vertical slice issue sequencing
- Demo-ready scope and exclusions

## Example Child Issues
- [ ] Define MVP vertical slice player journey
- [ ] Identify required MVP systems and exclusions
- [ ] Create MVP acceptance checklist

## Definition of Done
- [ ] System design spec completed
- [ ] Related research completed or documented
- [ ] Implementation issues created
- [ ] MVP requirements identified
- [ ] Open questions documented
