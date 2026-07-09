# Living Garage System — Design Specification

Resolves the design issues of the **Living Garage System** epic (#208–#218) and
records the decisions (DD-0036–DD-0038) in the Design Decision Log. The garage
is the player's home hub, workshop, storage, museum, and physical interface —
not an inventory menu (DD-0036). This document specifies each subsystem; the
v1.0 buildable subset is scoped in #220 and implemented against the existing
`garageView`, `assetProvenance`, `dealer`, and `memory` systems.

> Related code already on `main`: `src/systems/garageView.js` (inventory view
> models + listing flow), `src/systems/assetProvenance.js` (asset identity),
> `src/systems/dealer.js` (deliveries), `src/systems/memory.js` (object
> memories). This spec defines the design layer those systems render into.

---

## #208 — Living Garage System (parent design)

**The garage is the app home hub.** All core flows launch from it as tappable
objects rather than from abstract menus. Zones:

| Zone | Contents | Launches |
| --- | --- | --- |
| Bike floor / stands | race, practice, spare, retired bikes | bike detail → bike builder (#210) |
| Parts shelving | parts/tires/gear in bins, racks, boxes | parts detail, install/remove (#211) |
| Workbench + tools | tools, current job | repair/setup jobs |
| Trophy + memory wall | trophies, plates, memorabilia | museum (#214) |
| Delivery area | boxed dealer/marketplace arrivals | arrival review (#216) |
| Phone | the in-game phone hub | phone apps |
| Calendar | the season/month calendar | season planner |
| Garage door | leaving for practice/travel/race | week/race flow |

**Decision (DD-0036):** the garage is a living space, not an inventory menu.
Menus are places and tools in the world.

## #209 — Physical Garage Inventory Layout

Inventory is represented as objects on storage surfaces, each with a capacity
that feeds the clutter/capacity model (#212):

| Surface | Holds | Capacity (v1.0 model) |
| --- | --- | --- |
| Bike stands / floor | bikes | 1 floor slot per bike |
| Parts shelves + bins | small parts, plastics, filters, fluids | shelf units |
| Tire rack | tires (mounted/spare) | rack units |
| Gear rack / wall hooks | helmets, boots, jerseys, goggles | wall units |
| Toolbox / tool chest | tools | cabinet units |
| Display cases + trophy shelves | trophies, memorabilia | display units |

Items are visible/represented when stored; overflow spills to the floor as
clutter. Every asset-bearing object carries an **Asset ID + provenance**
(`assetProvenance`), so a stored part or bike keeps its history.

**Decision (DD-0037):** inventory should be physically represented where
practical — shelves, racks, stands, boxes, walls, displays.

## #210 — Bike Display and Interaction

Bikes appear by role (race / practice / spare / retired / family-owned) with a
condition visual state driven by `bike.condition`/`reliability`/part wear
(clean → worn → damaged → freshly built). Tapping a bike opens a **bike detail**
card — stats, installed parts, `provenanceSummary`, and linked memories — with a
one-tap entry into the **bike builder** (install/remove/setup). Retired/display
bikes surface their season history. (Existing garage tab already lists bikes
with provenance + a "make race bike" / "list for sale" action.)

## #211 — Parts Shelf and Component Storage

Part lifecycle in the garage: **box (delivered) → shelf/bin (stored) → installed
(on bike) → removed (back to storage) → sold (gone)** or **keepsake (museum)**.
Categories: exhausts, suspension, wheels, tires, bars, controls, brakes, clutch,
chains/sprockets, filters, fluids, plastics, graphics, engines/top ends, tools
(maps onto `partsCatalog` families). Rare/factory parts are display-eligible;
worn parts can convert to keepsakes and link to memories. Fitment shown via
`compatibility.checkFit`.

## #212 — Garage Clutter and Capacity

Finite space across four pools — **floor** (bikes), **shelf** (parts/tires),
**cabinet** (tools), **display** (memorabilia). Each item consumes its pool;
crossing a **clutter threshold** reduces usability (harder to find/work) and
raises family stress. Upgrades (#213) raise capacity; selling/installing/
organizing reduces clutter. v1.0 models this as simple per-pool counts with a
near-full / overflow warning (not a physics sim — see #220 deferrals).

## #213 — Garage Upgrade and Expansion

Tiered upgrades, each with cost, prerequisites, and effects (capacity, repair/
install capability, work-time, stress, appearance):

`shelving → tool chest → workbench/lighting → air compressor → bike lift/tire
machine/parts washer → suspension bench/engine stand → extra bay → detached shop
→ race shop`.

Upgrades layer on top of the career-stage baseline (#218) and are budget-gated
with a family reaction to big investments. v1.0 supports a **basic upgrade/
cosmetic** slice (shelving + tool chest + a bay), enough to prove progression.

## #214 — Garage Museum and Memory Display

Displayable objects (first helmet, first trophy, Loretta plate, broken parts,
old jerseys, signed memorabilia, photos, clippings, favorite/retired bikes,
Dad's toolbox, championship items) each link to their **object/person/place
memory** (`memory.js`) and feed **season recaps + documentaries**. Objects become
displayable when earned, kept as keepsakes, inherited, or gifted. Display space
is limited (ties to #212). The museum grows and reorganizes across career stages
and becomes the retirement end-state (#218).

**Decision (DD-0038):** the garage evolves with the rider's life — aging, class
moves, support level, and retirement change it visually and mechanically.

## #215 — Family and Social Interactions in Garage

People appear and act in the garage — Dad wrenching, Mom checking the schedule,
a sibling around, a friend/rival visiting, coach stopping by, a mechanic
helping, a dealer delivering. Appearance likelihood + tone are driven by
relationship values, rider age, story state, the upcoming event, bike condition,
and family stress (`relationships`, family/stress systems). Interactions produce
help, schedule pressure, encouragement, conflict, deliveries, or memories.
Behavior is age-appropriate (parent-mode vs rider-mode presence).

## #216 — Garage Arrival Flow for Purchased Items

Purchases *arrive*: shipped box, local pickup, or a bike unloaded from a
trailer. Delivery resolves on the dealer-order ETA (`dealer.receiveOrders`,
already wired into `prepareWeek`). Exceptions — shipping delay, wrong part,
damaged shipment — have defined resolutions. Arrivals land in the delivery area
(→ shelf/bin/floor). Expensive purchases trigger a parent reaction + budget/
stress effect and memory hooks for milestone buys (first race bike, dream part).

## #217 — Garage UI Navigation

The garage is a **physical menu**: tap bike → detail/builder; tap shelf →
storage; tap toolbox → tools; tap phone → phone hub; tap calendar → season; tap
trophy wall → museum; tap workbench → jobs; tap delivery box → arrivals; tap a
family member → interaction; tap the garage door → travel/race/practice. Touch
model: clear hit areas, press states, back navigation, and a fallback list view
for discoverability. Locked/unavailable actions (bike work blocked, phone age-
gated) show why. Navigation state (last zone) persists (#219).

## #218 — Garage Visual States Over Time

The garage changes with the career:

| Stage | Garage |
| --- | --- |
| Age ~4 | corner of the family garage, small bike, basic tools |
| Age ~10 | more trophies/parts, better shelving |
| Age ~16 | multiple bikes, a serious shop setup |
| Adult / privateer | own shop, race van/trailer |
| Factory rider | personal garage becomes a museum/personal space; team owns the race shop |
| Retirement | garage becomes a legacy museum |

Stages key off age, class, support level, and career outcome; upgrades (#213)
layer on top. Retirement is the legacy-museum end-state.

---

## Deferred to post-v1.0 (see #220)
Full 3D garage and walkaround, advanced museum curation, complex clutter
simulation, and deep social visits are **out of scope for v1.0**. The v1.0
minimum (view bike, view/install/remove parts, basic storage view, basic
delivery, basic trophy/memory display, garage-as-home, basic upgrade/cosmetic)
is specified in #220 and built against the existing systems.
