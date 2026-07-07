# Legacy Studios / Legacy: Motocross Export v0.1

Generated as a structured export from the planning chat. This is a source-of-truth summary, not a verbatim transcript.



---

# Legacy Studios Export v0.1

This export consolidates the design work from the chat into a portable project archive.

It is not a verbatim transcript. It is a structured source-of-truth summary of what has been discussed, decided, and left open.

## Recommended Use

- Put this folder in Google Drive, Notion, Obsidian, GitHub, or a local project folder.
- Treat Markdown files as the living source of truth.
- Use the Word document when you want a readable all-in-one copy.
- After each future design session, update:
  - `00_Legacy_Studios/Design_Decision_Log.md`
  - `00_Legacy_Studios/Open_Questions.md`
  - `00_Legacy_Studios/Release_Notes.md`
  - the relevant engine/system document.

## Current Project Name

Studio working name: **Legacy Studios**

Flagship title working name: **Legacy: Motocross**

Core sentence: **Create a life worth remembering.**


---

# Legacy Studios - Mission, Vision, and Principles

## Mission

**We create interactive lives worth remembering.**

Legacy Studios does not simply make sports games. It creates believable lives, emotional journeys, and stories players remember long after they stop playing.

## Vision

To become the world's leading creator of sports life simulations by building living worlds where every person, object, place, and decision contributes to a unique and memorable life story.

## Studio Motto

**Build memories, not mechanics.**

Mechanics exist to create memories.

## The Legacy Promise

We promise to respect the people who live this world.

We will honor the sacrifices, friendships, failures, victories, and memories that define their journey.

We will build worlds that feel alive, characters who feel human, and stories that feel earned.

We believe the greatest reward is not a trophy or a statistic.

It is a life worth remembering.

## The Legacy Principles

### 1. People Before Players
Every character should feel like a real person. Parents have dreams. Rivals have fears. Coaches have families. Mechanics have bad days.

### 2. Memories Matter More Than Rewards
Players will not remember `+5 Speed`. They will remember Dad rebuilding the engine until 2 AM.

### 3. Earn Every Moment
Every championship, sponsor, friendship, heartbreak, garage expansion, and factory ride should feel earned.

### 4. Authenticity Before Convenience
If something is harder to build but feels more authentic, favor authenticity. The goal is for real motocross families to say: "That's exactly how it feels."

### 5. The World Does Not Revolve Around You
Rivals improve. Parents age. Tracks close. Factories change. Friends quit. Life goes on.

### 6. Everything Has History
People, bikes, tracks, toolboxes, helmets, garages, campers, trophies, and places all carry history.

### 7. Decisions Echo
No meaningless choices. Some consequences happen immediately. Some echo years later.

### 8. Respect the Family
Parents are not side characters. They are often the reason a career exists at all.

### 9. Design for Emotion
Before adding a feature, define the emotion it should create.

### 10. Leave a Legacy
The game should not simply ask, "Did you win?" It should ask, "What kind of life did you build?"

## Design Filter

Every feature must answer yes to these five questions:

1. Is it authentic?
2. Does it create memories?
3. Does it create meaningful decisions?
4. Does it tell a story?
5. Will different players experience it differently?

If the answer to any question is no, redesign the feature.

## The Legacy Test

Before any feature is approved, ask:

**Could this make a player say, "I'll never forget when..."?**

If not, it probably does not belong.


---

# Design Decision Log

This log captures decisions made during planning so the reasoning is not lost.

## DD-0001 - Information Visibility
**Decision:** Child players only know what children would realistically know.  
**Reason:** Reinforces immersion and the growing-up philosophy.  
**Status:** Locked

## DD-0002 - Meaningful Events Become Memories
**Decision:** Every meaningful event becomes a memory.  
**Reason:** Memories drive dialogue, relationships, recaps, documentary, garage objects, and future opportunities.  
**Status:** Locked

## DD-0003 - Object Memories
**Decision:** Objects remember their history.  
**Reason:** Bikes, helmets, trophies, tools, and trailers become emotionally meaningful instead of disposable inventory.  
**Status:** Locked

## DD-0004 - Place Memories
**Decision:** Places remember their history.  
**Reason:** Garages, tracks, training facilities, and family spots become part of the player's life story.  
**Status:** Locked

## DD-0005 - Garage Ownership
**Decision:** Parents own the garage/shop until adulthood. Ownership and responsibility transfer naturally over time.  
**Reason:** Supports the progression from childhood dependence to adult independence.  
**Status:** Locked

## DD-0006 - Factory Parts
**Decision:** Factory parts are best-in-class and good across performance categories, but require expert setup to reach their full potential.  
**Reason:** Keeps factory equipment aspirational while rewarding knowledge, mechanics, and team support.  
**Status:** Locked

## DD-0007 - Garage as Home
**Decision:** The garage is the player's home, workshop, museum, storage space, and social hub, not a static menu.  
**Reason:** The garage is the soul of the game and should visually tell the player's story.  
**Status:** Locked

## DD-0008 - Unique Careers
**Decision:** Every career should tell a unique story.  
**Reason:** Replayability comes from different lives, not simply different builds.  
**Status:** Locked

## DD-0009 - Living World
**Decision:** The world evolves independently of the player.  
**Reason:** The player should feel like they live in a motocross community, not a world built only around them.  
**Status:** Locked

## DD-0010 - Stories Over Statistics
**Decision:** The game should create stories, not just statistics.  
**Reason:** Long-term player attachment comes from memories, relationships, and meaningful events.  
**Status:** Locked

## DD-0011 - Asset Identity
**Decision:** Every important physical object has an Asset ID, serial number, ownership history, provenance, and memory history.  
**Reason:** Supports marketplace, collecting, resale, heirlooms, and object memories.  
**Status:** Locked

## DD-0012 - Separate Campaigns
**Decision:** Rider Mode and Parent Mode are separate campaigns.  
**Reason:** Each role has a different information set, emotional lens, UI, and responsibilities.  
**Status:** Locked

## DD-0013 - Consistent Career Pace
**Decision:** Childhood seasons do not progress faster than teenage or pro seasons.  
**Reason:** Childhood is emotionally important and should not be treated as a short tutorial.  
**Status:** Locked

## DD-0014 - Career Support Ladder
**Decision:** Career progression includes realistic support tiers: Family Supported -> Local Shop Rider -> Dealer Supported -> Manufacturer Amateur Team -> Factory Amateur -> Professional Privateer -> Factory Professional.  
**Reason:** Real motocross support is not simply local vs factory.  
**Status:** Locked

## DD-0015 - Lifestyle as Strategy
**Decision:** Lifestyle choices such as house, camper, training facility, backyard track, and private facility are strategic life decisions, not cosmetic choices.  
**Reason:** Where and how a family lives changes training, money, stress, relationships, and opportunities.  
**Status:** Locked

## DD-0016 - No NPC Language
**Decision:** Internally, avoid calling characters NPCs. Use People.  
**Reason:** Reinforces the philosophy that every character has goals, memories, relationships, and life outside the player.  
**Status:** Proposed

## DD-0017 - Story Engine Philosophy
**Decision:** The Story Engine should not ask, "What happens next?" It should ask, "Given everything that has happened so far, what is the most believable thing that could happen next?"  
**Reason:** Separates life simulation from scripted career mode.  
**Status:** Locked

## DD-0018 - Multiplayer Direction
**Decision:** Multiplayer should be asynchronous and story-sharing focused, not synchronous MMO-style career progression.  
**Reason:** Players progress at different speeds, and the core experience depends on personal pacing.  
**Status:** Proposed


---

# Open Questions

## Failure and Endings
- How do we make failure satisfying without making it feel like consolation?
- Can a rider quit and later return?
- Can an early-ended career still generate a documentary and meaningful life audit?
- Should every career end with a final garage scene?

## Story Engine
- How many concurrent story arcs can exist without overwhelming the player?
- How often should the game intentionally create quiet weeks?
- How do we keep scenario variation high enough that players do not see repeated content?
- Should players know when they missed an opportunity, or only discover it later?

## Memory Engine
- Should minor memories fade over time?
- Can characters misremember events?
- Should children interpret memories differently from adults?
- How many memories can be stored before performance/content becomes an issue?

## Relationship Engine
- How visible should relationships be to the player?
- Should relationship values be completely hidden, partially visible, or expressed only through behavior?
- How do forgiveness and repair work after major negative events?
- How does parent stress affect the rider's personality over time?

## World Simulation
- How many simulated riders should exist in the world?
- How deeply should non-player riders be simulated?
- How often do tracks open, close, improve, flood, or change ownership?
- How do manufacturers decide who receives support?

## Marketplace and Assets
- How often should rare listings appear?
- How do scams/counterfeit parts work without becoming frustrating?
- How much should item history affect resale value?
- Can famous objects become collectible even if they are no longer useful?

## Garage and Property
- How much storage friction is fun versus annoying?
- Can players rent storage, borrow space, or keep items at a dealer/team shop?
- How visually interactive should the garage be in early prototypes?
- Does the garage become the main menu from day one?

## Race Simulation
- How much control should players have during lap-by-lap simulation?
- What mid-race decisions are available?
- How do starts, fatigue, hydration, bike setup, track conditions, and confidence interact?
- How much randomness is believable?

## Parent Campaign
- How detailed should household finances be?
- Can the family go bankrupt and still continue in some reduced form?
- How do parent careers, PTO, overtime, layoffs, and stress interact with racing?
- How should sibling resentment/support be modeled?

## Future Sports
- Which engine concepts should remain sport-agnostic now?
- When should motocross-specific systems be abstracted for other sports?
- What sport should be considered second after Motocross?


---

# Release Notes

## v0.1 - Initial GDD Foundation
- Created core GDD starter pack.
- Defined main concept: a motocross life simulator where the player starts as a child and progresses through racing life.
- Established that the core emotion is: "I can't believe this kid's journey."

## v0.2 - Memory and World Expansion
- Added Memory Engine concept.
- Added World Simulation concept.
- Added dynamic rivals, living tracks, parent community, pit gossip, simulated riders, and news feed.
- Added Family Album and Garage Museum concepts.

## v0.3 - Object, Marketplace, and Garage Expansion
- Added item levels/tradeoffs.
- Added factory parts as best-in-class but expertise-dependent.
- Added used marketplace, negotiation, sellers, scams, dealer inventory, factory surplus, and rare finds.
- Added Asset IDs, serial numbers, provenance, ownership history, and object memories.
- Added garage/shop storage and upgrade progression.

## v0.4 - Career Support and Lifestyle Expansion
- Added career support ladder.
- Added Team Green / BLU CRU / Orange Brigade style support layer.
- Added distinction between amateur manufacturer support and full factory team support.
- Added parent-owned garage/shop and responsibility transfer over time.
- Added jobs and rider personal money progression.
- Added camper life, training facility housing, rural property, backyard tracks, private practice tracks, and training compounds.

## v0.5 - Legacy Studios Foundation
- Created studio working name: Legacy Studios.
- Created flagship title working name: Legacy: Motocross.
- Defined mission, vision, Legacy Principles, design filter, Legacy Test, and studio motto.
- Reframed project as a Sports Life Simulation Engine with motocross as the first title.

## v0.6 - Story Engine Direction
- Defined Story Engine philosophy: it creates believable circumstances, not scripted stories.
- Added story seeds, story chains, story pressure, story rhythm, and story authenticity rules.
- Added rule: the Story Engine asks what is believable next given everything that has happened so far.


---

# Legacy: Motocross - Master Summary

## One-Sentence Pitch

**Legacy: Motocross is a life simulation RPG where players experience the full journey of a motocross rider or parent, from childhood racing to adulthood, through a living world that remembers every meaningful person, place, object, and decision.**

## Core Player Fantasy

Not simply: "I became a champion."

Instead: **"I lived a motocross life worth remembering."**

## Core Emotion

**I can't believe this kid's journey.**

## Core Loop

Plan week -> Handle life/story event -> Prepare bike/gear/family -> Race weekend -> Lap-by-lap simulation -> Consequences -> Memories -> Opportunities -> Next week.

## Main Play Modes

### Rider Campaign
The player is the child/rider. Information is limited by age. As the player grows, they gain more control, knowledge, and responsibility.

### Parent Campaign
The player is the parent. Focus is money, safety, family stress, work, race travel, bike purchases, support decisions, and helping or pushing the child.

## Career Flow

Childhood -> Local racing -> Regional racing -> Loretta qualifying attempts -> Amateur national scene -> Manufacturer amateur support -> Factory amateur/privateer/pro -> retirement/legacy ending.

## Realistic Support Ladder

1. Family Supported
2. Local Shop Rider
3. Dealer Supported
4. Regional Support Team
5. Manufacturer Amateur Team (Team Green, BLU CRU, Orange Brigade, etc.)
6. Factory Amateur
7. Professional Privateer
8. Factory Professional

## Defining Systems

- Memory Engine
- Relationship Engine
- World Simulation Engine
- Story Engine
- Asset and Marketplace Engine
- Garage and Property System
- Race Simulation Engine
- Career Support Ladder
- Ownership and Responsibility System
- Lifestyle and Property System
- Opportunity Engine
- Documentary/Family Album/Garage Museum

## Why It Is Different

Most sports games simulate results. Legacy: Motocross simulates a life.

The player should remember not just championships, but sacrifices, injuries, late-night repairs, financial struggles, family arguments, old bikes, rivalries, friendships, and the feeling of growing up in the sport.


---

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


---

# World Simulation Engine

## Purpose

The world should feel alive and continue evolving independently of the player.

The player is important, but not the center of the universe.

## Simulated World Layers

### Rider Layer
Hundreds or thousands of simulated riders exist across regions, ages, skill levels, family backgrounds, support levels, and career trajectories.

### Family Layer
Riders come from families with different finances, stress, values, mechanics, travel ability, and support styles.

### Community Layer
Local tracks, dealers, coaches, mechanics, parents, sponsors, promoters, and regional scenes form a living motocross community.

### Industry Layer
Manufacturers, factory amateur programs, gear companies, media, race organizations, and economy shifts influence the sport.

## Dynamic Rivals

Rivals should emerge naturally through repeated interactions, close results, conflict, respect, injuries, family connections, and shared history.

A rival at age 7 may become a teammate, friend, enemy, coach, or factory competitor later.

## Simulated Riders

Each rider may track:
- Age
- Region
- Class
- Talent
- Work ethic
- Family support
- Bike/equipment level
- Injury history
- Confidence
- Reputation
- Sponsors
- Career ambition
- Personality
- Memories

## Tracks

Tracks can:
- Open
- Close
- Change ownership
- Get flooded
- Become prestigious
- Lose popularity
- Host qualifiers
- Become a rider's second home
- Carry place memories

## News and Gossip

The world should surface changes through a news feed, pit gossip, social media, sponsor announcements, race results, and rumors.

Examples:
- Local track closing
- Rival signs with KTM
- Coach opens new training school
- Factory rider injured
- Weather postpones qualifier
- Dealer liquidates inventory

## Economy

Economy can affect:
- Gas prices
- Travel costs
- Race attendance
- Used marketplace supply
- Families quitting
- Sponsor budgets
- Dealer discounts
- Track survival

## Weather

Weather affects:
- Track conditions
- Travel
- Race cancellations
- Bike wear
- Tire choice
- Training schedule
- Injury risk

## Key Philosophy

The world should generate memories even when the player is not directly involved.


---

# Relationship Engine

## Purpose

The Relationship Engine decides how people feel about each other, how those feelings change over time, and how shared memories influence future behavior.

## Core Rule

Relationships are built from experiences, not dialogue choices.

## Relationship Types

### Parent-Child
Tracks love, trust, pride, fear, pressure, communication, support, disappointment, and independence.

### Rival
Tracks respect, rivalry, aggression, resentment, friendship, intimidation, and shared history.

### Coach
Tracks trust, coachability, effort, belief, frustration, potential, and loyalty.

### Sponsor
Tracks professionalism, reliability, marketability, results, obligation fulfillment, and reputation risk.

### Friends/Teammates
Tracks loyalty, jealousy, shared training, support, humor, competition, and long-term bonds.

### Parent Marriage
Tracks stress, financial strain, agreement on racing, safety conflict, communication, and family stability.

## Hidden Values

Relationship values should usually be hidden and expressed through behavior.

Example:
- High Dad trust: "I trust you to handle the bike this weekend."
- Low Dad trust: "Are you sure you're ready?"

## Relationship Memories

The same event can affect different people differently.

Example: You skip school for a race.
- Dad may respect commitment.
- Mom may worry about education.
- Teacher may lose trust.
- Coach may appreciate dedication.
- Friend may feel abandoned.

## Relationship Arcs

Relationships should evolve over years.

Examples:
- Dad: Helper -> Mentor -> Partner -> Advisor -> Friend
- Rival: Stranger -> Enemy -> Respectful rival -> Teammate -> Lifelong friend
- Coach: Instructor -> Believer -> Frustrated mentor -> Career advocate

## Relationship Milestones

Examples:
- Dad lets you rebuild your first engine alone.
- Mom agrees to homeschool.
- Rival shakes your hand after years of conflict.
- Coach says you are ready.
- Sponsor renews without negotiation.

## Core Philosophy

The game should not have NPCs. It should have people.


---

# Story Engine

## Purpose

The Story Engine creates believable circumstances where stories naturally emerge.

It does not write scripted stories. It simulates life pressure, opportunity, reaction, consequence, and long-term ripple effects.

## Core Rule

The Story Engine never asks, "What happens next?"

It asks:

**Given everything that has happened so far, what is the most believable thing that could happen next?**

## Story Formula

Opportunity -> Decision -> Consequence -> Memory -> Future Opportunity.

## Story DNA

Each story contains:
- People
- Place
- Assets
- Conflict
- Resolution

Change any one of those and the story changes.

## Story Chains

Important events should be able to chain across weeks, seasons, and years.

Example:
Crash -> Broken arm -> Miss regional -> Lose sponsor -> Dad works overtime -> Family stress -> Move to cheaper house -> Lose backyard track -> Develop different training style -> Win later in unexpected conditions.

## Story Categories

- Family
- Racing
- School
- Health
- Injury
- Social
- Career
- Money
- Equipment
- Travel
- Weather
- Sponsor
- Media

## Story Scale

- Tiny: forgotten quickly
- Small: season memory
- Medium: career memory
- Large: changes multiple systems
- Legendary: defines the life

## Story Rhythm

Life should not be constant drama. The game needs quiet weeks, normal practice days, small family moments, boring repairs, and calm stretches to make big moments matter.

## Coincidence Rule

Coincidences may start stories. They should not finish them.

## Authenticity Test

A story does not need to have happened exactly. It must feel like something that could happen in the real motocross world.


---

# Opportunity Engine

## Purpose

The Opportunity Engine decides which doors open or close based on results, relationships, reputation, memories, money, geography, timing, and world state.

## Philosophy

The player does not unlock content through XP. They earn opportunities through life.

## Examples

A local race win may create:
- Dealer interest
- Coach discount
- Local article
- Parent willingness to travel farther
- Rival respect
- Sponsor inquiry

A bad reputation may close:
- Team support
- Shop discounts
- Coach willingness
- Parent trust
- Factory interest

## Opportunity Types

- Training opportunities
- Sponsor opportunities
- Equipment opportunities
- Marketplace opportunities
- Team opportunities
- Friendship opportunities
- Race entry opportunities
- Career transition opportunities
- Property/lifestyle opportunities

## Missed Opportunities

Some opportunities should only be visible later, if at all.

Example: A factory scout was watching a race, but the player skipped it. Years later, the player may hear that another rider was signed from that event.


---

# Asset and Marketplace Engine

## Purpose

The Asset Engine gives physical objects identity, ownership, history, value, wear, and emotional meaning.

The Marketplace Engine allows players and the world to buy, sell, negotiate, discover, collect, and pass objects through the motocross community.

## Item Philosophy

Items should not simply have levels. They should have meaningful attributes and tradeoffs.

Attributes may include:
- Performance
- Reliability
- Safety
- Maintenance burden
- Skill requirement
- Comfort
- Weight
- Adjustability
- Prestige
- Resale value
- Sponsor appeal
- Sentimental value

## Factory Parts

Factory parts are best-in-class and generally excellent across performance categories. However, they require expertise, setup knowledge, and support to unlock full value.

A beginner family may own great parts but fail to use them properly.

## Asset Identity

Every important object should have:
- Asset ID
- Serial Number
- Type
- Manufacturer
- Model
- Year
- Ownership history
- Maintenance history
- Damage history
- Provenance
- Object memories

## Marketplace Sources

- Local classifieds
- Facebook-style marketplace
- Track bulletin boards
- Dealer used inventory
- Factory surplus
- Sponsor closeouts
- Word of mouth
- Auctions
- Team liquidation
- Families quitting racing

## Seller Types

- Honest racing dad
- Dealer
- Factory rider
- Local pro
- Scammer
- Kid selling emotional bike
- Team manager
- Sponsor rep

## Negotiation

Players can:
- Buy instantly
- Offer less
- Counteroffer
- Wait
- Lose listing to another buyer
- Trade parts
- Bundle items
- Build trust with sellers

## Object Memories

A used bike may have history before the player buys it. The player's ownership adds new history.

Example ownership chain:
Factory Amateur -> Regional Champion -> Player -> Younger Cousin -> Collector.

## Collecting

Some objects may become valuable because of history, not performance.

Examples:
- Championship bike
- Signed helmet
- Factory suspension from famous rider
- Dad's toolbox
- First Loretta number plate


---

# Garage, Shop, and Property System

## Purpose

The garage is the emotional and functional home of the game.

It is a workshop, storage system, museum, social hub, family space, and main menu.

## Garage Philosophy

The garage should visually tell the player's life story.

When the player opens the game, they should feel like they are returning home.

## Garage Progression

### Age 5
- One small bike
- Dad's truck
- Cheap toolbox
- Folding chair
- Few tools

### Age 10
- Multiple bikes possible
- First trophies
- Shelves
- Workbench
- Spare tires

### Age 16
- Bigger toolbox
- Bike stand
- Compressor
- Sponsor banners
- Gym equipment
- Friends/rivals visiting

### Adult/Pro
- Personal garage or race shop
- Trophy room
- Museum objects
- Training equipment
- Media corner
- Personal bikes

## Ownership

Parents own the garage and shop until the rider reaches an age where they can contribute money, get a job, buy tools, buy personal gear, and eventually own or rent their own space.

## Upgrades

Possible upgrades:
- Shelving
- Workbench
- Air compressor
- Bike lift
- Engine stand
- Tire machine
- Suspension bench
- Parts washer
- Wash bay
- Gym
- Storage bays
- Detached shop
- Pole barn
- Trophy wall
- Museum display cases

## Storage

Storage limits should matter but not become annoying.

Players may need to:
- Sell items
- Build shelves
- Rent storage
- Buy trailer
- Expand garage
- Keep items at team shop

## Multiple Bikes

The game should support:
- Race bike
- Practice bike
- Spare bike
- Rain/mud bike
- Mini bike
- Sibling bike
- Dad's bike
- Collector bikes

## Place Memories

The garage remembers:
- First tire change
- First engine rebuild
- Dad's late-night repairs
- Major family arguments
- Trophy celebrations
- Garage key handoff
- Final retirement walk-through


---

# Lifestyle and Property System

## Purpose

Where the family lives and trains should meaningfully affect the story, schedule, finances, stress, opportunities, and training progression.

## Lifestyle Options

### Suburban House
Stable, good schools, limited riding space, limited garage expansion.

### Rural Property
More space, possible backyard track, longer drives, more property maintenance.

### Apartment
Cheaper, limited storage, no garage, difficult bike maintenance.

### Farm
Large property, high upkeep, strong potential for private practice.

### Camper/Toy Hauler Life
Mobile racing lifestyle, closer to events, smaller living space, stress, limited comfort, strong community immersion.

### Training Facility Housing
Professional training, high pressure, expensive, away from home, exposure to scouts and better competition.

## Practice Options

- Local tracks
- Backyard track
- Friend's private track
- Training facility
- Regional camps
- Factory test track
- Owned private facility

## Build Your Own Facility

Possible long-term upgrades:
- Backyard track
- Sand section
- Hardpack section
- Starting gate
- Whoops
- Jumps
- SX rhythm lane
- Outdoor loop
- Gym
- Recovery room
- Wash bay
- Video room
- Observation tower

## Strategic Tradeoffs

A family may choose:
- Bigger house vs better bike
- Camper vs hotels
- Training facility vs local life
- Backyard track vs travel budget
- Property expansion vs race season

## Core Idea

Lifestyle is progression. The player is not unlocking levels; their life circumstances are changing.


---

# Career Support Ladder

## Purpose

Motocross support should progress through realistic tiers rather than jumping directly from family racing to factory racing.

## Support Levels

### Level 0 - Family Supported
Parents buy, maintain, travel, and manage everything.

### Level 1 - Local Shop Rider
Small discounts, oil, filters, jerseys, local recognition.

### Level 2 - Dealer Supported
Bike discounts, parts discounts, occasional service help, dealer relationship.

### Level 3 - Regional Support Team
More organized support, regional travel, limited parts, some race support.

### Level 4 - Manufacturer Amateur Team
Examples inspired by Team Green, BLU CRU, Orange Brigade, EBR Yamaha style programs.

The team may supply bikes, graphics, parts, technical help, or support. The family is still responsible for significant upgrades, maintenance, travel, and garage/shop work.

### Level 5 - Factory Amateur
Major jump. Includes mechanics, suspension techs, race support, multiple bikes/engines, team expectations, and high pressure.

### Level 6 - Professional Privateer
The rider is pro but still manages many costs, logistics, sponsorships, bike prep, travel, and survival.

### Level 7 - Factory Professional
The team owns race bikes, shop, major equipment, engines, suspension, and maintenance. The player has limited approved setup changes and focuses on performance, media, contracts, and team obligations.

## Key Distinction

Manufacturer amateur support is not the same as factory professional support.

In amateur support, the family may still work out of its own garage. In factory pro support, the team owns and controls the race operation.


---

# Race Simulation Engine - Current Notes

## Direction

The game should simulate races lap-by-lap, not simply simulate an entire race day at once.

Players can watch race flow and make limited strategic decisions during the race.

## Mid-Race Decisions

Possible decisions:
- Push harder
- Ride safe
- Attack/pass
- Wait for mistake
- Change line
- Conserve energy
- Manage hydration/fatigue
- Protect position
- Take risk on jump/inside line

## Variables

- Rider skill
- Starts
- Cornering
- Jumping
- Whoops
- Sand/mud skill
- Race IQ
- Confidence
- Aggression
- Consistency
- Fitness
- Fatigue
- Hydration
- Injury status
- Bike setup
- Bike condition
- Track condition
- Weather
- Gate pick
- Rival behavior
- Random mistakes/crashes

## Randomness Philosophy

Stats determine expectation. Random events create believable stories.

Examples:
- Good starter can still slip at the gate.
- Fast rider can still crash.
- Poor setup can create fatigue or mistakes.
- Pressure can cause late-race errors.

## Visible Events

Crashes should be visible as race events and become memories when significant.


---

# What Still Needs To Be Done

## Immediate Documentation Work

1. Expand Relationship Engine into full spec.
2. Expand Story Engine into full spec.
3. Expand Asset and Marketplace Engine into full spec.
4. Expand Garage, Shop, and Property System into full spec.
5. Expand Career Support Ladder into full spec.
6. Create Time and Calendar Engine spec.
7. Create Opportunity Engine spec.
8. Create Economy Engine spec.
9. Create Race Simulation Engine spec.
10. Create Weekly Planner spec.
11. Create Parent Campaign spec.
12. Create Rider Campaign spec.

## Research Work

- Real amateur motocross class progression.
- Loretta Lynn qualifier system.
- Cost of local/regional/national racing.
- Parent interviews and sacrifices.
- Training facility models.
- Manufacturer amateur support programs.
- Injury rates and recovery timelines.
- Bike maintenance schedules by class.
- Used market pricing and depreciation.
- Sponsorship tiers and expectations.
- Pro licensing and privateer realities.

## Content Work

- 100+ scenario cards for MVP.
- 25+ memory templates.
- 25+ relationship milestone templates.
- 25+ marketplace event templates.
- 10+ family archetypes.
- 10+ parent career archetypes.
- 20+ rider archetypes.
- 10+ coach archetypes.
- 10+ sponsor archetypes.
- Regional track archetypes.
- Bike/part/gear catalog.

## Prototype Work

Suggested vertical slice:
- Player starts as an 8-10 year old 65cc rider.
- 12-week season.
- 4 local races.
- 1 regional qualifier.
- Basic weekly planner.
- Basic family approval.
- Basic bike condition/setup.
- Basic marketplace.
- Basic memory engine.
- Basic relationship changes.
- Lap-by-lap race simulation.
- Season recap.

## Technical Work

- Decide engine/framework.
- Define data model.
- Build event bus.
- Build memory storage/retrieval.
- Build world tick system.
- Build character simulation.
- Build relationship simulation.
- Build race simulation prototype.
- Build simple UI for weekly planner and garage.

## Business/Strategy Work

- Decide if this is hobby, indie game, or long-term studio project.
- Decide whether to keep Legacy Studios as working name.
- Decide whether to build in public.
- Decide whether to target PC first.
- Decide monetization philosophy.
- Consider IP/trademark research later.


---

# Recommended Next Steps

## Next Design Session

Build the full **Relationship Engine Design Specification v1.0**.

Why: It connects Memory, Story, World, Family, Sponsors, Rivals, Coaches, and Parent Mode.

## Next Three Specs

1. Relationship Engine v1.0
2. Story Engine v1.0
3. Asset and Marketplace Engine v1.0

## Then

4. Garage and Property System v1.0
5. Career Support Ladder v1.0
6. Race Simulation Engine v1.0
7. Weekly Planner v1.0
8. Parent Campaign v1.0
9. Rider Campaign v1.0

## First Prototype Goal

Do not build full career.

Build one emotionally complete season.

If one season creates memories, tension, family pressure, marketplace choices, bike prep, race consequences, and a meaningful recap, the concept works.


---

# Claude Code Context Prompt

Use this prompt when handing the project to Claude Code or another AI coding assistant.

```text
You are helping build Legacy: Motocross, the flagship title from Legacy Studios.

This is not a traditional racing game. It is a sports life simulation RPG about creating a motocross life worth remembering.

Core philosophy:
- Build memories, not mechanics.
- The player does not simply level up; their life changes.
- Every meaningful person, object, place, and decision can carry history.
- The world evolves independently of the player.
- The garage is home, not a menu.
- Parents, rivals, coaches, sponsors, and mechanics are People, not NPCs.

Important systems:
- Memory Engine
- Relationship Engine
- World Simulation Engine
- Story Engine
- Opportunity Engine
- Asset and Marketplace Engine
- Garage, Shop, and Property System
- Career Support Ladder
- Race Simulation Engine
- Weekly Planner
- Rider Campaign
- Parent Campaign

Development instruction:
Do not invent major systems without updating the Design Bible. Preserve design decisions. If implementation requires changing a design assumption, create a Design Decision entry first.

First prototype target:
A 12-week youth motocross season with weekly planning, parent approval, bike condition, marketplace, basic memories, simple relationship changes, lap-by-lap race simulation, and season recap.
```
