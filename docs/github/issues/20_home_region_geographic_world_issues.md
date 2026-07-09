# Home Region & Geographic World Simulation Issue Drafts

These are documentation-only GitHub issue drafts for **Motocross: Chasing the Dream**. They do not implement gameplay, call the GitHub API, or create real GitHub Issues.

## Issue Draft Count

12 issue drafts.

# Issue: Design Home Region Selection System

## What
Design the system that lets players choose where their rider and family start their motocross life. The selection should support multiple depth levels:

- **Quick Start:** choose a broad region only.
- **Standard:** choose a state or state-inspired location.
- **Immersive:** choose a hometown, enter a hometown, or use a generated hometown.

The home location should become a persistent career identity anchor that affects nearby tracks, local dealerships, race calendar, weather, travel distance, regional competition strength, local reputation, training opportunities, and story flavor.

## Why
The player should not begin in a generic motocross world. A rider from New England, Florida, California, Texas, or the Midwest should immediately feel like they live a different motocross life. Home region gives careers replayability, emotional grounding, and authentic constraints before the player ever enters a race.

## How
- Define the player-facing home selection flow for Quick Start, Standard, and Immersive setup.
- Specify what geographic data is required at each setup depth.
- Define how home location is stored on the rider, family, garage, calendar, and world state.
- Create design rules for how home location modifies:
  - Nearby tracks and track discovery.
  - Dealer and service-shop availability.
  - Local and regional race schedule generation.
  - Weather patterns and riding season boundaries.
  - Travel distance, cost, and fatigue.
  - Competition density and scout visibility.
  - Local, state, regional, and national reputation.
  - Training options and facility access.
- Include fallback behavior for fictional regions if real-world data is unavailable.
- Define accessibility and UX requirements so players can skip detailed geography without losing the system's benefits.

## Definition of Done
- [ ] A design spec exists for Quick Start, Standard, and Immersive home selection.
- [ ] The required home-location data fields are documented.
- [ ] The affected gameplay systems are mapped.
- [ ] The design explains how home location creates variety without forcing a single best region.
- [ ] The v1.0 minimum version of home selection is identified.
- [ ] No gameplay implementation is included in this issue.

## Related Epic
Geographic World Simulation; Career Foundation; Calendar & Time Engine; Track Venue System; Dynamic Community Engine

## Labels
type: design, area: world, area: geography, area: career, priority: p0-critical

# Issue: Design Regional Racing Calendar Generation

## What
Design a regional calendar generator that creates realistic month-based motocross schedules from the rider's home location. The calendar should include local race series, practice days, Area Qualifiers, Regional Championships, training camps, nearby pro races, off weekends, weather cancellations, holiday/school conflicts, and every-other-weekend race cadence where appropriate.

## Why
A believable motocross career depends on seasonal rhythm. Families do not race through abstract weekly menus; they plan months around weather, school, work, money, holidays, qualifiers, long drives, and local track schedules. Regional calendars make the world feel grounded and prevent every career from following the same generic cadence.

## How
- Define calendar-generation inputs from home region, state, weather pattern, school calendar, local track database, and family availability.
- Specify month-based schedule rules for each supported region.
- Document event categories:
  - Local race series.
  - Open practice days.
  - Area Qualifiers.
  - Regional Championships.
  - Training camps.
  - Nearby pro races or spectator opportunities.
  - Off weekends and rest blocks.
  - Weather-risk dates.
  - Holiday and school conflict dates.
- Define cadence rules, including when every-other-weekend racing is normal and when dense race stretches are acceptable.
- Define cancellation, reschedule, and missed-event consequences at a design level.
- Explain how the calendar generator avoids impossible schedules and excessive travel chains.
- Identify which events should appear in v1.0 and which can remain future-facing.

## Definition of Done
- [ ] Month-based regional schedule rules are documented.
- [ ] Calendar inputs and generated event types are defined.
- [ ] Weather, school, holiday, and parent-work conflicts are addressed.
- [ ] Area Qualifier and Regional Championship placement rules are described.
- [ ] The design includes safe fallback behavior for sparse regions.
- [ ] No gameplay implementation is included in this issue.

## Related Epic
Calendar & Time Engine; Season Planner; Geographic World Simulation; Road to Loretta's

## Labels
type: design, area: calendar, area: geography, area: season-planner, priority: p0-critical

# Issue: Design Regional Track Database

## What
Design a geography-aware track database for local, state, regional, and national motocross venues. Each track should include name, region/state, distance from home, surface type, difficulty, race frequency, practice availability, weather sensitivity, local reputation, event types hosted, place memories, and travel cost/time.

## Why
Tracks should feel like real places with history, not interchangeable race menus. A rider should remember the nearby track where they learned starts, the muddy regional that changed their season, the far-away qualifier that drained the family budget, and the legendary facility everyone talks about.

## How
- Define the track data model and required fields:
  - Name.
  - Region/state.
  - Distance from home.
  - Surface type.
  - Difficulty.
  - Race frequency.
  - Practice availability.
  - Weather sensitivity.
  - Local reputation.
  - Event types hosted.
  - Place memories.
  - Travel cost/time.
- Specify calculated fields versus authored fields.
- Define how home location determines which tracks are nearby, regional, distant, or aspirational.
- Document surface categories such as sand, loam, hard pack, clay, mud-prone, rut-heavy, fast outdoor, tight amateur, and rough national-style.
- Define how tracks gain history through player results, rivals, crashes, breakthroughs, family memories, and community recognition.
- Include data-quality rules for fictional, real-inspired, or real venue names.
- Identify minimum v1.0 track data needed to support the core loop.

## Definition of Done
- [ ] A complete track data model is documented.
- [ ] Required, optional, authored, and calculated fields are separated.
- [ ] Track relationship to home location is defined.
- [ ] Place memory hooks are specified.
- [ ] v1.0 minimum track-data scope is identified.
- [ ] No gameplay implementation is included in this issue.

## Related Epic
Track Venue System; Geographic World Simulation; Memory Engine; Calendar & Time Engine

## Labels
type: design, area: track, area: geography, area: world, priority: p0-critical

# Issue: Design Travel Distance and Cost System

## What
Design travel planning rules based on the rider's home location and each event's location. The design should include drive distance, drive time, fuel cost, hotel/camper/tent/Airbnb options, parent work impact, school impact, arrival timing, travel fatigue, vehicle/trailer reliability, and emergency travel issues.

## Why
Travel is one of the biggest realities of amateur motocross. Long drives, missed school, parent work sacrifices, fuel money, unreliable trailers, late arrivals, and sleeping arrangements all shape the story of a racing family. Travel should create meaningful planning pressure without becoming tedious accounting.

## How
- Define travel inputs from home location, event location, family vehicle, trailer, budget, parent schedule, school schedule, and event importance.
- Design travel-cost categories:
  - Fuel.
  - Lodging.
  - Food or weekend spending allowance.
  - Entry fees if relevant to calendar planning.
  - Emergency repairs.
- Define lodging options and tradeoffs:
  - Hotel.
  - Camper/RV.
  - Tent camping.
  - Airbnb/short-term stay.
  - Same-day drive.
- Define arrival timing states such as early setup, normal arrival, late-night arrival, race-morning arrival, and missed check-in.
- Specify travel fatigue effects on rider, parent stress, bike prep time, and race-day readiness.
- Design vehicle and trailer reliability events at a high level.
- Document how severe travel problems become memorable story events rather than random punishment.

## Definition of Done
- [ ] Travel-distance and travel-time design rules are documented.
- [ ] Cost categories and lodging tradeoffs are defined.
- [ ] Parent work and school impacts are included.
- [ ] Fatigue, arrival timing, and reliability consequences are specified.
- [ ] The design identifies what is v1.0, later, and future scope.
- [ ] No gameplay implementation is included in this issue.

## Related Epic
Geographic World Simulation; Calendar & Time Engine; Family Life Engine; Economy

## Labels
type: design, area: travel, area: calendar, area: economy, priority: p0-critical

# Issue: Design Regional Weather and Riding Conditions

## What
Design regional weather and riding-condition patterns that affect seasons, track conditions, travel, bike setup, training availability, schedule risk, and rider skill development. Example regional identities include New England snow and mud season, Florida year-round sand and heat, California hard pack and dust, Midwest seasonal mud and long drives, and Texas heat with large travel distances.

## Why
Weather is one of the clearest ways to make geography matter. It changes when families ride, what surfaces riders learn, how bikes are set up, and why some weekends become unforgettable. Regional weather should add authenticity and career variety without overwhelming the player.

## How
- Define weather profiles for launch-supported regions and future regions.
- Document seasonal patterns by month rather than generic weekly randomness.
- Specify track-condition outputs such as dry slick, dusty, muddy, frozen, deep sand, rutty, rough, blue-groove, and heat-stressed.
- Define design-level effects on:
  - Schedule availability and cancellations.
  - Practice and training access.
  - Travel risk and drive time.
  - Bike setup recommendations.
  - Rider confidence, fatigue, and skill growth.
  - Memory generation for extreme or meaningful weather days.
- Include rules that prevent weather from constantly blocking progress.
- Define a simple v1.0 weather model and a deeper future model.

## Definition of Done
- [ ] Regional weather profiles are documented.
- [ ] Month-based seasonal behavior is specified.
- [ ] Track-condition outputs and affected systems are mapped.
- [ ] Cancellation and reschedule design rules are included.
- [ ] v1.0 weather scope is identified.
- [ ] No gameplay implementation is included in this issue.

## Related Epic
Geographic World Simulation; Track Venue System; Calendar & Time Engine; Training Practice Engine

## Labels
type: design, area: weather, area: geography, area: race, priority: p1-high

# Issue: Design Regional Competition Strength

## What
Design how competition depth differs by region. The system should model local field size, talent density, factory scout visibility, number of serious families, training facility access, regional prestige, difficulty of local wins, and difficulty of qualifiers.

## Why
Winning should not mean the same thing everywhere. A dominant local rider in a small region may still be unknown nationally, while a top-five finish in a highly competitive region may attract attention. Regional competition strength makes reputation, scouting, and career progression more believable.

## How
- Define competition-strength attributes for each region.
- Specify field-size and talent-density bands.
- Define how region strength affects local, state, regional, and national interpretation of results.
- Document scout-visibility rules and how high-prestige regions create different opportunities.
- Define how training facility access influences the number of serious families and rival quality.
- Include safeguards so lower-strength regions remain fun and viable.
- Explain how the system communicates result meaning to the player.

## Definition of Done
- [ ] Competition-strength fields and bands are documented.
- [ ] Result interpretation rules are defined for different region strengths.
- [ ] Scout visibility and regional prestige rules are included.
- [ ] Balance guardrails prevent a single best starting region.
- [ ] No gameplay implementation is included in this issue.

## Related Epic
Geographic World Simulation; Competition Engine; Reputation; Opportunity Engine

## Labels
type: design, area: world, area: competition, area: reputation, priority: p1-high

# Issue: Design Regional Reputation System

## What
Design reputation tracking by geography, including hometown reputation, local track reputation, state reputation, regional reputation, Loretta reputation, national reputation, and factory reputation. A rider may be a local hero before anyone nationally knows them.

## Why
Reputation should be contextual. The people at the home track, the local dealer, the school, the state series, national scouts, and factory teams should not all evaluate the rider the same way. Geographic reputation creates a believable path from unknown kid to local hero to regional name to national prospect.

## How
- Define reputation scopes:
  - Hometown.
  - Home track/local track.
  - State.
  - Region.
  - Loretta/major amateur stage.
  - National amateur.
  - Factory/industry.
- Specify what actions affect each scope, including wins, sportsmanship, rival behavior, consistency, injuries, family conduct, social moments, and memorable performances.
- Define how reputation decays, persists, or becomes historical memory.
- Document relationship to hometown pride events, dealer opportunities, sponsorships, rivalries, and media mentions.
- Explain UI language for showing local fame without turning reputation into a single score.
- Identify v1.0 minimum reputation scopes.

## Definition of Done
- [ ] Reputation scopes by geography are documented.
- [ ] Inputs, outputs, and affected systems are defined.
- [ ] The design supports local fame before national recognition.
- [ ] Memory and story-event hooks are included.
- [ ] v1.0 scope is identified.
- [ ] No gameplay implementation is included in this issue.

## Related Epic
Reputation; Geographic World Simulation; Career Outcomes System; Dynamic Community Engine

## Labels
type: design, area: reputation, area: geography, area: career, priority: p1-high

# Issue: Design Local Dealership and Service Network

## What
Design a location-based dealer and service-shop network. Dealers and shops should include local dealers, brands carried, parts availability, service quality, sponsorship opportunities, distance from home, relationship with family, repair turnaround time, used bike inventory, and dealer team possibilities.

## Why
Dealers and service shops are part of motocross community life. Families build relationships with parts counters, mechanics, local sponsors, and dealer teams. A local dealer should feel like a real place that can support, disappoint, remember, or elevate the rider.

## How
- Define dealer and service-shop data fields.
- Document generation rules based on home location, region density, brand popularity, and local economy.
- Specify relationship states between the family and dealer.
- Define parts availability and repair turnaround factors.
- Design sponsorship and dealer-team opportunity hooks.
- Include used bike inventory rules tied to region, season, family budgets, and bike lifecycle.
- Explain how local dealer reputation interacts with rider reputation and hometown pride.
- Identify minimum v1.0 dealership behavior and future expansion scope.

## Definition of Done
- [ ] Dealer/service-shop data model is documented.
- [ ] Location-based generation rules are defined.
- [ ] Parts, service, used inventory, sponsorship, and dealer-team hooks are included.
- [ ] Family relationship and local reputation interactions are specified.
- [ ] v1.0 scope is identified.
- [ ] No gameplay implementation is included in this issue.

## Related Epic
Marketplace; Garage Shop System; Geographic World Simulation; Opportunity Engine

## Labels
type: design, area: dealer, area: marketplace, area: geography, priority: p1-high

# Issue: Design Hometown Pride and Local Hero Events

## What
Design story events tied to hometown identity and local reputation. Examples include the local paper writing about a first Loretta qualification, a dealer putting the rider's photo on the wall, school announcements, track recognition, kids asking for autographs later in the career, hometown fundraisers helping the family travel, and local backlash if the rider acts poorly.

## Why
The tagline is **Every rider has a story. Chase yours.** Hometown pride turns results into emotional memory. A rider's first big recognition should often come from the people who watched them grow, not from a national headline.

## How
- Define event triggers from local reputation, major milestones, hardship, comeback stories, poor conduct, and community relationships.
- Create categories for hometown pride events:
  - Media mentions.
  - School/community recognition.
  - Dealer and shop recognition.
  - Track announcements.
  - Fundraisers and support drives.
  - Fan/kid interactions.
  - Negative backlash or disappointment.
- Document tone rules to keep events grounded, authentic, and not overly heroic too early.
- Specify memory outputs that can appear in season recaps, documentary content, garage displays, and family conversations.
- Define repeat-prevention and escalation rules so events remain special.
- Identify v1.0 story hooks versus future expanded event libraries.

## Definition of Done
- [ ] Hometown event categories and triggers are documented.
- [ ] Positive and negative local reactions are included.
- [ ] Memory, documentary, and garage-display hooks are specified.
- [ ] Tone and repeat-prevention rules are defined.
- [ ] No gameplay implementation is included in this issue.

## Related Epic
Story; Memory Engine; Reputation; Geographic World Simulation

## Labels
type: design, area: story, area: reputation, area: memory, priority: p1-high

# Issue: Design Regional Riding Style Development

## What
Design how a rider's region subtly influences skill growth and riding identity. Examples include Florida riders developing sand and heat skills, New England riders developing mud and rut skills, California riders developing hard-pack speed and high competition pressure, Midwest riders developing rough-track adaptability, and Texas riders developing high-speed outdoor comfort.

## Why
Where a rider grows up should shape them without trapping them. Regional riding style development gives careers personality, makes early training meaningful, and helps riders feel like products of their environment while preserving player choice.

## How
- Define regional skill-development tendencies by surface, weather, track density, competition, and training access.
- Specify soft modifiers rather than hard region-locked abilities.
- Document how travel and exposure to other regions can broaden the rider's style.
- Define how coaches, training camps, bike setup, and practice choices can offset regional weaknesses.
- Include identity language for recaps and commentary, such as sand specialist, mud-smart rider, hard-pack technician, rough-track survivor, or pressure-tested Californian.
- Ensure the design avoids stereotypes becoming deterministic outcomes.
- Identify whether any part belongs in v1.0 or should remain future-facing.

## Definition of Done
- [ ] Regional skill tendencies are documented.
- [ ] The design uses subtle influence rather than forced outcomes.
- [ ] Counterplay through training, travel, and coaching is specified.
- [ ] Commentary and identity hooks are included.
- [ ] No gameplay implementation is included in this issue.

## Related Epic
Rider Development; Training Practice Engine; Geographic World Simulation; Competition Engine

## Labels
type: design, area: rider-development, area: geography, area: race, priority: p2-medium

# Issue: Define v1.0 Home Region Scope

## What
Decide the minimum geographic scope for App Store v1.0. Evaluate one starting region only, three starting regions, generic fictional regions, real-state inspired regions, and full state selection later. Recommend a scope that balances realism, content workload, replayability, and launch risk.

## Why
Geographic simulation can easily become too large for v1.0. The launch version needs enough regional identity to prove the system while avoiding the content burden of every state, every track, every dealer, and every weather pattern.

## How
- Compare scope options:
  - One starting region only.
  - Three starting regions.
  - Generic fictional regions.
  - Real-state inspired regions.
  - Full state selection later.
- Evaluate each option against content workload, authenticity, legal/name risk, replay value, technical complexity, schedule impact, and App Store launch readiness.
- Recommend a v1.0 scope and a post-launch expansion path.
- Define what must be stubbed or abstracted now so future regions can be added cleanly.
- Include explicit non-goals for v1.0.

## Definition of Done
- [ ] A v1.0 home-region scope recommendation is documented.
- [ ] Alternatives and tradeoffs are compared.
- [ ] Future expansion path is described.
- [ ] v1.0 non-goals are listed.
- [ ] The decision is aligned with the master roadmap and release-readiness goals.
- [ ] No gameplay implementation is included in this issue.

## Related Epic
Release Readiness; MVP Cutline; Geographic World Simulation; Career Foundation

## Labels
type: design, area: mvp, area: geography, area: release, priority: p0-critical

# Issue: Update Design Decision Log

## What
Create a documentation task to add these design decisions to the Design Decision Log or equivalent GDD/design-bible location:

### DD-0043 — Careers Start From a Real Place
The rider's home region/state/hometown should influence the schedule, tracks, weather, travel, competition, dealers, reputation, and opportunities.

### DD-0044 — Regional Identity Creates Career Variety
A rider from New England, Florida, California, Texas, or the Midwest should experience a different motocross life.

### DD-0045 — Calendar Timing Must Be Regionally Grounded
Schedules should be based on realistic month-based regional racing seasons rather than generic weekly events.

## Why
The project needs a clear design record that geographic identity is a core career foundation, not cosmetic flavor. These decisions prevent future systems from flattening the world into generic schedules, generic tracks, or universal reputation.

## How
- Locate the current Design Decision Log or equivalent GDD/design-bible location.
- Add DD-0043, DD-0044, and DD-0045 using the existing decision-log format.
- Include context, decision, consequences, affected systems, and related issue links.
- Verify numbering continues after DD-0042.
- Cross-reference Home Region Selection, Geographic World Simulation, Regional Racing Calendar, Regional Tracks, Travel Distance/Cost, Regional Weather, Regional Reputation, Local Dealer Network, and Hometown Pride.

## Definition of Done
- [ ] DD-0043 is added to the Design Decision Log or equivalent documentation.
- [ ] DD-0044 is added to the Design Decision Log or equivalent documentation.
- [ ] DD-0045 is added to the Design Decision Log or equivalent documentation.
- [ ] The decisions reference the Home Region & Geographic World Simulation issue draft file.
- [ ] No gameplay implementation is included in this issue.

## Related Epic
GDD; Geographic World Simulation; Calendar & Time Engine; Career Foundation

## Labels
type: documentation, area: gdd, area: geography, priority: p1-high
