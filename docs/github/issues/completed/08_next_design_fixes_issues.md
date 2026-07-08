# Issue: Research and Correct Loretta Lynn’s Qualification Process

## What
Loretta’s qualifier logic still does not reflect the real process correctly. Research the full qualification path and update the existing Road to Loretta’s design.

## Why
Loretta Lynn’s is one of the most important amateur motocross goals in the game. It must feel authentic. Players should understand that they cannot simply choose Loretta’s as a race. They must qualify through the correct path.

## How
Create a research/design issue that requires:

- Researching the current Loretta Lynn’s qualification process.
- Area Qualifiers.
- Regional Championships.
- Class eligibility.
- How many Area Qualifiers a rider can attempt.
- How advancement from Area to Regional works.
- How advancement from Regional to Loretta’s works.
- Backup/alternate rules if applicable.
- Registration deadlines.
- Region assignment.
- Class limits.
- Moto format.
- What happens if a rider qualifies in multiple classes.
- How failed qualification attempts affect the season.

Apply the project principles: authenticity before convenience, everything has history, decisions echo, and design for emotion.

## Definition of Done
- [ ] Official/current Loretta Lynn’s process researched and cited in the design notes.
- [ ] Existing Road to Loretta’s issue/design updated.
- [ ] Area Qualifier logic defined.
- [ ] Regional Championship logic defined.
- [ ] Loretta qualification logic defined.
- [ ] Player-facing explanation written.
- [ ] Open questions documented.

## Related Epic
EPIC: Road to Loretta’s

## Labels
`type: research`, `type: design`, `area: loretta`, `area: career`, `priority: p0-critical`, `status: needs-research`

# Issue: Replace Loose Bike Upgrades With Bike Builder System

## What
Bike upgrades currently do not make sense because players can add multiple incompatible upgrades, such as multiple exhaust systems. Replace this with a Bike Builder system where each bike has defined component slots.

## Why
A real bike can only have one exhaust system, one set of wheels, one suspension setup, one engine configuration, etc. Upgrades should replace existing parts, move old parts into inventory, allow resale, and affect bike setup/maintenance.

## How
Design component slots such as:

- Exhaust.
- Forks.
- Shock.
- Wheels.
- Tires.
- Handlebars.
- Controls.
- Brakes.
- Clutch.
- Engine/top end.
- ECU/map.
- Graphics.
- Seat.
- Chain/sprockets.
- Air filter/intake.

Rules:

- Installing a new component replaces the old component.
- Removed components move to garage inventory unless discarded/sold.
- Compatibility must be checked before install.
- Some installs require tools, mechanic skill, or shop labor.
- Component history stays attached to the object.
- Bike performance is calculated from installed components, condition, setup, and rider fit.

Apply the project principles: build memories, not mechanics; authenticity before convenience; everything has history; and decisions echo.

## Definition of Done
- [ ] Bike component slot model defined.
- [ ] Upgrade replacement rules defined.
- [ ] Removed parts go to garage inventory.
- [ ] Compatibility rules documented.
- [ ] Install requirements documented.
- [ ] Performance calculation approach documented.
- [ ] GDD / Design Bible updated.

## Related Epic
EPIC: Bike Ownership System
EPIC: Mechanics & Maintenance Engine
EPIC: Asset Engine

## Labels
`type: design`, `area: assets`, `area: bike-transition`, `area: garage`, `priority: p0-critical`

# Issue: Add Garage-to-Marketplace Selling Flow

## What
Add the ability to sell items from the player’s garage inventory through the used marketplace.

## Why
The marketplace should not only be for buying. Players need to sell old bikes, removed parts, gear, tools, memorabilia, trailers, and collectibles. This supports family budgeting, asset history, object memories, and the living economy.

## How
Design a selling flow:

- Select item from garage inventory.
- Review item condition, compatibility, history, and estimated value.
- Choose listing price.
- Add seller notes.
- Choose local pickup, shipping, or dealer consignment.
- Receive offers.
- Counteroffer or accept.
- Buyer may ask questions.
- Item leaves garage after sale.
- Ownership history updates.
- Sale may create memory if item was important.

Include seller reputation effects:

- Fair pricing improves trust.
- Misrepresenting condition hurts reputation.
- Selling meaningful family objects may affect relationships.

Apply the project principles: every rider has a story, build memories, not mechanics, everything has history, decisions echo, respect the family, and design for emotion.

## Definition of Done
- [ ] Garage inventory items can be listed for sale.
- [ ] Listing flow documented.
- [ ] Offer/counteroffer flow documented.
- [ ] Ownership history updates after sale.
- [ ] Sold item removed from garage storage/display.
- [ ] Important item sale can generate memories or emotional reactions.
- [ ] GDD / Design Bible updated.

## Related Epic
EPIC: Marketplace Engine
EPIC: Garage & Property System
EPIC: Asset Engine

## Labels
`type: design`, `area: marketplace`, `area: garage`, `area: assets`, `priority: p1-high`

# Issue: Add New Bike Purchase Requirement When Moving Classes

## What
Moving up classes should usually require purchasing, borrowing, or being supplied a new bike that fits the new class.

## Why
A rider does not simply “upgrade” from a 50cc to a 65cc or from an 85cc to a 250. Class transitions often require a new bike, new parts, different maintenance needs, and family financial planning.

## How
Design class transition bike requirements:

- 50cc to 65cc.
- 65cc to 85cc.
- 85cc to Supermini.
- Supermini to 125/250.
- Amateur to pro bikes.

Options:

- Buy new.
- Buy used.
- Borrow bike.
- Dealer support.
- Manufacturer amateur support.
- Team-supplied bike.
- Keep current bike if still class eligible.
- Delay moving up due to budget.

Each option should affect:

- Budget.
- Parent approval.
- Bike condition.
- Confidence.
- Performance.
- Maintenance burden.
- Marketplace activity.
- Memories.

Apply the project principles: authenticity before convenience, decisions echo, respect the family, and design for emotion.

## Definition of Done
- [ ] Class-to-bike requirement matrix created.
- [ ] New/used/borrowed/supplied options defined.
- [ ] Budget and parent approval impacts documented.
- [ ] Bike transition memories documented.
- [ ] Season planner checks bike eligibility before event registration.
- [ ] GDD / Design Bible updated.

## Related Epic
EPIC: Career Progression
EPIC: Bike Class Transitions
EPIC: Bike Ownership System

## Labels
`type: design`, `area: career`, `area: bike-transition`, `area: marketplace`, `priority: p0-critical`

# Issue: Add Racer Memorabilia and Collectibles System

## What
Add the ability to purchase, collect, display, sell, and track value for racer memorabilia.

## Why
The garage should feel like a motocross life museum. Collectibles and memorabilia create emotional attachment, marketplace depth, and long-term value changes.

## How
Collectible types:

- Signed jerseys.
- Signed helmets.
- Goggles.
- Posters.
- Number plates.
- Race programs.
- Trophy replicas.
- Pro rider gear.
- Vintage bike parts.
- Historical race items.

Value should change over time based on:

- Rider fame.
- Career milestones.
- Retirement.
- Death/injury/controversy.
- Rarity.
- Condition.
- Authentication.
- Market trends.
- Personal memory value.

Collectibles can be:

- Purchased online.
- Bought at pro races.
- Won in giveaways.
- Gifted by riders.
- Signed at events.
- Found in marketplace.
- Displayed in garage.
- Sold later.

Apply the project principles: every rider has a story, build memories, not mechanics, everything has history, and design for emotion.

## Definition of Done
- [ ] Collectible item types defined.
- [ ] Collectible value model defined.
- [ ] Display rules for garage/museum defined.
- [ ] Marketplace buying/selling support documented.
- [ ] Authentication/provenance rules defined.
- [ ] Memory hooks documented.
- [ ] GDD / Design Bible updated.

## Related Epic
EPIC: Asset Engine
EPIC: Marketplace Engine
EPIC: Garage & Property System

## Labels
`type: design`, `area: assets`, `area: marketplace`, `area: garage`, `priority: p2-medium`

# Issue: Add Local Pro Race Attendance Events

## What
Allow players/families to attend local pro races or major events when they are nearby or affordable.

## Why
Attending pro races is a real part of motocross culture. Kids meet heroes, get autographs, see factory teams, build dreams, and sometimes make connections. These moments can become powerful memories.

## How
Add event type:

- Attend Pro Race.

Possible activities:

- Watch motos.
- Visit pits.
- Meet pro racers.
- Get autographs.
- Buy memorabilia.
- See factory bikes.
- Meet vendors.
- Meet sponsors.
- Attend fan events.
- Take photos.
- Create social media posts.

Effects:

- Motivation boost.
- Dream/identity impact.
- Parent spending.
- Collectible acquisition.
- Social media content.
- Possible opportunity hooks.
- Family memory creation.

Restrictions:

- Only available if event is local/nearby or travel is approved.
- Costs money and time.
- May conflict with own race schedule.
- Parent approval required for younger riders.

Apply the project principles: every rider has a story, build memories, not mechanics, respect the family, and design for emotion.

## Definition of Done
- [ ] Pro race attendance event type defined.
- [ ] Activities and outcomes documented.
- [ ] Autograph/memorabilia hooks defined.
- [ ] Motivation and memory effects documented.
- [ ] Calendar conflict rules documented.
- [ ] GDD / Design Bible updated.

## Related Epic
EPIC: Calendar & Time Engine
EPIC: Opportunity Engine
EPIC: Asset Engine
EPIC: Memory Engine

## Labels
`type: design`, `area: calendar`, `area: opportunity`, `area: memory`, `priority: p2-medium`

# Issue: Add Realistic Weekend Race Scheduling Pattern

## What
Improve schedule generation so race weekends are not constant every weekend by default. The schedule should feel realistic, with many local races occurring every other weekend or in varied patterns depending on track, series, region, season, and weather.

## Why
The current schedule cadence feels too repetitive. In real life, families do not always race every weekend. Race frequency depends on local series calendars, regional events, weather, family budget, school, bike prep, and fatigue.

## How
Design weekend scheduling patterns:

- Local series every other weekend.
- Some back-to-back race weekends.
- Off weekends.
- Practice weekends.
- Travel weekends.
- Qualifier weekends.
- Weather cancellations.
- Holiday breaks.
- School conflicts.
- Major national event blocks.

Calendar should include:

- Available events.
- Optional events.
- Recommended rest weekends.
- Maintenance windows.
- Training weekends.
- Family obligations.
- Event deadlines.

Season planner should allow the family/player to decide whether to:

- Race.
- Practice.
- Rest.
- Repair bike.
- Travel.
- Attend pro race.
- Skip due to budget/stress.

Apply the project principles: authenticity before convenience, decisions echo, respect the family, and design for emotion.

## Definition of Done
- [ ] Weekend schedule generation patterns defined.
- [ ] Every-other-weekend local race pattern supported.
- [ ] Back-to-back and off-weekend logic documented.
- [ ] Weather/holiday/family conflicts documented.
- [ ] Season Planner updated to show realistic cadence.
- [ ] GDD / Design Bible updated.

## Related Epic
EPIC: Calendar & Time Engine
EPIC: Season Planner
EPIC: Family Life Engine

## Labels
`type: design`, `area: calendar`, `area: season-planner`, `area: family`, `priority: p1-high`
