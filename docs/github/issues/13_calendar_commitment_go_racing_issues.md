Issue: Add Season Plan Commitment Flow

What

Create a flow that lets the player review and lock in their planned race season for **Motocross: Chasing the Dream**. The flow should make the central rule explicit: **planning is reversible; commitment creates consequences**.

The season planner should support a player moving from an editable draft calendar into an approved, locked, playable season without implementing race gameplay yet.

Why

Players need a clear moment where planning ends and the season begins. Without this, the calendar feels like a static planning tool instead of a playable game loop.

The game should communicate that drafting a schedule is safe and reversible, but committing to a season has costs, deadlines, family expectations, bike-prep obligations, travel pressure, and emotional stakes.

How

Define season states:

* Draft Plan
* Review Plan
* Parent/Family Approval
* Locked Season
* Active Season
* Season Complete

The player should be able to:

* Build a calendar
* Add, remove, and reorder planned races while the season is still in Draft Plan
* Review costs, travel, conflicts, and risks before locking the plan
* Request parent approval if the rider is underage or financially dependent
* Lock in the season after approval and confirmation
* Begin the active season from the locked plan

Document what changes when the season becomes locked:

* Planned events become commitments instead of tentative ideas
* Entry deadlines and travel prep become active calendar obligations
* Family stress, budget pressure, and bike-prep requirements become consequences
* Changes after lock-in require cancellation, rescheduling, refund, or parent approval rules
* Major races may create memory, relationship, or story hooks

Season Planner UI requirements should include:

* A visible season state indicator
* A review screen before lock-in
* A cost, travel, conflict, and risk summary
* Parent/family approval status
* A clear Lock Season action
* A warning that locked seasons create consequences
* A clear transition from Locked Season to Active Season

Definition of Done

* Season states are defined
* Lock-in flow is documented
* Parent approval step is documented
* Locked season rules are documented
* Season Planner UI requirements are documented
* The rule “planning is reversible; commitment creates consequences” is documented as a calendar-system principle
* GDD / Design Bible updated

Related Epic

EPIC: Calendar & Time Engine
EPIC: Season Planner
EPIC: Family Life Engine

Labels

type: design, area: calendar, area: season-planner, priority: p0-critical

⸻

Issue: Add “Go Racing” Event Launch Flow

What

Create a clear flow for advancing from the calendar to the next race weekend once a season has been locked and activated.

This should define the design requirements for a primary calendar action that moves the player from planning/time management into the next race-weekend experience. Do not implement gameplay yet.

Why

After the season is locked, players need an obvious way to move time forward and enter race weekends. The calendar should not leave the player wondering whether they are merely viewing events or actually starting the playable race loop.

A strong launch flow reinforces that commitment creates consequences: the player can only go racing when registration, travel, bike, gear, family, health, and money conditions are ready enough to proceed.

How

Add a primary action such as:

* Go to Next Event
* Advance to Race Weekend
* Travel to Race
* Start Race Weekend

Before launching, show a pre-race readiness screen with:

* Event name
* Date
* Track
* Classes entered
* Travel status
* Bike readiness
* Gear readiness
* Entry status
* Family/crew status
* Weather preview
* Warnings

Define blocking conditions that prevent launch or require explicit confirmation.

Blocking examples:

* Not registered
* Bike not eligible
* Bike broken
* Injury not cleared
* No parent approval
* Not enough money
* Travel impossible

Define warning conditions that allow launch but alert the player.

Warning examples:

* Bike maintenance is overdue but not catastrophic
* Tires or consumables are worn
* Weather may increase risk
* Rider is fatigued
* Parent stress is high
* Family/crew availability is limited
* Entry deadline is close
* Travel plan is expensive or tiring

Document the transition from calendar to race weekend:

* Which state changes when the player launches
* Whether time advances to travel day, arrival, or race morning
* Which checks happen automatically
* Which unresolved problems pause the transition
* Which systems receive hooks, such as memory, relationship, garage, injury, and phone notifications

Definition of Done

* Next event launch action is defined
* Pre-race readiness checklist is defined
* Blocking conditions are defined
* Warning conditions are defined
* Race weekend transition is documented
* GDD / Design Bible updated

Related Epic

EPIC: Calendar & Time Engine
EPIC: Competition / Race Engine
EPIC: Garage & Shop System

Labels

type: design, area: calendar, area: race, area: garage, priority: p0-critical

⸻

Issue: Add Race Weekend Entry State Machine

What

Define the state machine for entering, running, and exiting a race weekend.

The design should establish the lifecycle that begins when a committed calendar event becomes the current race weekend and ends when results, memories, bike condition, relationships, travel home, and calendar state are resolved.

Why

Race weekends should have a consistent lifecycle so the game knows where the player is and what actions are available.

A state machine prevents the calendar, race engine, garage, travel, family, and memory systems from disagreeing about whether the player is scheduled, traveling, racing, recovering, or complete.

How

Define states:

* Scheduled
* Registration Pending
* Registered
* Travel Planned
* Traveling
* Arrived
* Practice
* Qualifying
* Moto 1
* Between Motos
* Moto 2
* Results
* Post-Race
* Travel Home
* Complete

Each state should define:

* Available actions
* Required checks
* Possible events
* Memory hooks
* Relationship hooks
* Bike condition changes

Document entry conditions for each state, including:

* Required calendar state
* Required registration state
* Required travel state
* Required bike, gear, and rider readiness checks
* Required parent/family approval where applicable

Document exit conditions for each state, including:

* Successful progression
* Player cancellation
* Missed deadline
* Injury withdrawal
* Bike mechanical failure
* Weather cancellation
* Family emergency or travel failure
* Disqualification or eligibility failure

Document failure/cancel states, such as:

* DNS: Did Not Start
* DNF: Did Not Finish
* Withdrawn
* Cancelled by Promoter
* Travel Failed
* Medical Hold
* Bike Not Cleared

Definition of Done

* Race weekend states are documented
* Entry and exit conditions are documented
* Available actions per state are documented
* Failure/cancel states are documented
* Memory and relationship hooks are documented
* GDD / Design Bible updated

Related Epic

EPIC: Competition / Race Engine
EPIC: Calendar & Time Engine
EPIC: Memory Engine

Labels

type: design, area: race, area: calendar, area: state-machine, priority: p0-critical

⸻

Issue: Add Event Registration and Commitment Rules

What

Define how players register for events and what it means to commit to attending.

The design should distinguish tentative calendar planning from formal registration and event commitment. A race on a draft calendar is only an intention; registration and season lock-in create obligations, costs, and consequences.

Why

Players should not be able to casually enter every event without consequences. Registration should involve money, deadlines, classes, parent approval, and bike eligibility.

This keeps the calendar from becoming a consequence-free checklist and gives players meaningful tradeoffs around budget, travel, preparation, health, and family support.

How

Registration should check:

* Rider age
* Class eligibility
* Bike eligibility
* Entry fees
* Registration deadlines
* Parent approval
* Injury clearance
* Schedule conflicts
* Qualification requirements

Commitment effects:

* Entry fee paid
* Calendar locked
* Travel prep created
* Parent stress updated
* Bike prep reminders created
* Memory/story hooks created for major events

Document registration outcomes:

* Registered
* Waitlisted
* Pending parent approval
* Pending qualification
* Blocked by eligibility
* Blocked by money
* Blocked by health or injury clearance
* Missed deadline

Document refund and cancellation rules:

* Full refund before early deadline
* Partial refund before final deadline
* No refund after final deadline
* Medical exception rules
* Weather/promoter cancellation rules
* Family emergency cancellation rules
* Relationship, budget, and memory consequences for cancelling major commitments

Document how parent approval works for minors:

* Approval required for expensive, distant, risky, or school-conflicting events
* Parent approval may depend on trust, grades, budget, injury history, and family stress
* Denial should provide reasons and possible paths to resolve them

Definition of Done

* Registration requirements are defined
* Event commitment effects are defined
* Refund/cancellation rules are documented
* Parent approval rules are included
* Bike eligibility rules are included
* GDD / Design Bible updated

Related Epic

EPIC: Calendar & Time Engine
EPIC: Career Progression
EPIC: Bike Ownership System

Labels

type: design, area: calendar, area: career, area: bike-transition, priority: p0-critical

⸻

Issue: Add Calendar Advancement Controls

What

Add clear controls for advancing time once the season is active.

The design should define how players move through days, deadlines, preparation tasks, story events, and race weekends after the season has been committed.

Why

Players need to move from day to day, week to week, or directly to meaningful events without getting stuck in planning.

Once the season is active, the calendar should become a playable time engine. It should let players advance efficiently while pausing for decisions, risks, deadlines, and consequences that matter.

How

Define controls:

* Advance one day
* Advance to next planned activity
* Advance to next race weekend
* Advance to next deadline
* Advance to next story event

Advancement should pause when:

* Decision required
* Bike issue discovered
* Parent approval needed
* Injury/medical issue occurs
* Marketplace offer arrives
* Sponsor message arrives
* Event deadline approaching
* Race weekend begins

Document event/deadline priority rules:

* Medical and safety issues pause before optional activities
* Registration deadlines pause before they expire
* Parent/family approvals pause before calendar commitment or travel
* Bike eligibility and severe mechanical issues pause before launch
* Sponsor, marketplace, and phone events pause based on urgency
* Race weekend transitions pause with a readiness checklist

Document UI requirements:

* Current date and season state are always visible
* Next meaningful event is highlighted
* Advance controls are disabled or explained when blocked
* Auto-pause reasons are clearly listed
* The player can see what will be skipped before advancing multiple days
* The game warns before missing deadlines or commitments

Definition of Done

* Time advancement options are documented
* Auto-pause triggers are documented
* Event/deadline priority rules are documented
* UI requirements are documented
* GDD / Design Bible updated

Related Epic

EPIC: Calendar & Time Engine
EPIC: Phone / Internet UI
EPIC: Story Engine

Labels

type: design, area: calendar, area: phone, area: story, priority: p0-critical

⸻

Issue: Update Design Decision Log

What

Add a design decision for the Season Commitment and Go Racing flow.

The decision should capture the principle that the calendar must transition from reversible planning into committed, consequence-bearing active gameplay.

Why

The season planner must not remain a passive calendar. It needs a clear transition into active gameplay.

Documenting this decision gives future Claude/Codex implementation work a stable rule to follow when designing calendar states, registration, time advancement, travel, race weekends, and parent approval.

How

Add:

DD-0029 — Seasons Must Transition From Planning to Commitment

Players can draft and adjust a season calendar, but must eventually review, approve, and lock the season before advancing into active gameplay. Once locked, the player progresses through time, deadlines, travel, and race weekends.

The decision should explicitly include:

* Planning is reversible
* Commitment creates consequences
* Draft calendar changes should be low-friction
* Locked season changes require rules, costs, approvals, or cancellation paths
* Active seasons should expose Go Racing and time-advancement controls
* Race weekends should be entered through a documented state transition, not an ambiguous calendar click

Definition of Done

* DD-0029 added
* Cross-reference Calendar & Time Engine
* Cross-reference Season Planner
* Cross-reference Competition Engine

Related Epic

EPIC: Calendar & Time Engine

Labels

type: documentation, area: gdd, area: calendar, priority: p1-high
