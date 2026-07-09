# Living World, Reputation & Legacy — Design Spec

This spec covers the world-depth backlog cluster (#271–#278). These systems make
the motocross world feel alive around the player: AI riders live full careers,
groups judge the rider differently, dealers and bikes carry history, and a
career becomes part of the game's remembered past.

**Scope discipline.** Every system below separates **v1.0-minimum** (what ships,
often a thin slice on top of hooks that already exist) from **Later expansion**
(the deeper vision, explicitly post-launch per the
[MVP cutline](../roadmap/v1-scope-and-launch-plan.md#mvp-cutline)). None of these
are v1.0 launch blockers; they are the depth roadmap.

**Two hard non-goals, repeated where relevant:** the world evolves *independently
of the player* (#271), and race-weekend depth comes from **decision events, not a
free-roam pit walking simulator** (#278).

Existing hooks these systems build on:

- `src/engines/worldEngine.js` — weekly world tick, rival field, news.
- `src/systems/competition.js`, `src/systems/lorettasPath.js` — standings, progression, qualification.
- `src/systems/assetProvenance.js` — stable `assetId`, provenance records for bikes/objects.
- `src/systems/dealer.js`, `src/systems/usedMarketplace.js`, `src/systems/compatibility.js` — dealer catalog, used listings, fitment.
- `src/systems/connectedCareers.js` — career cards, friend milestones.
- `src/systems/memory.js`, `src/systems/memoryTriggers.js` — memory records + dedupe.
- `src/systems/notifications.js` — phone queue for surfacing world changes.
- `src/engines/relationshipEngine.js`, `src/systems/riderDevelopment.js` — hidden values, rider growth.

---

## #271 — Living Motocross World System

The ecosystem changes over time whether or not the player interacts with it:
riders age and move classes, tracks open/close, dealers shift inventory and
reputation, manufacturers change regional support, and regional scenes grow or
shrink. **The world evolves independently of the player.** No free-roam pit.

**Core world entities & lifecycle states:** riders (youth → amateur → pro →
post-career), families, tracks (active/renovating/closed), dealers, mechanics,
coaches, sponsors, manufacturers, teams, bikes (new → owned → used → restored →
retired), marketplace listings, regional race scenes, media/news sources.

**Simulation cadence (tiered by distance from the player):**

- **High detail** — key rivals, friends, the player's dealer/coach/sponsors. Full per-week simulation.
- **Medium detail** — regional competitors and dealers. Monthly/season aggregate updates.
- **Low detail** — distant riders, other regions. Career-scale aging/outcome rolls only.

**v1.0-minimum**

- Reuse `worldEngine` weekly tick: rival field progression, news items, marketplace refresh, standings that don't depend only on the player (already live per `critical-systems-spec.md`).
- One layer of visible drift: a handful of regional rivals age/improve/regress across seasons; occasional dealer inventory refresh; season-boundary news summarizing world changes.
- Player visibility strictly through existing surfaces: phone news feed + `notifications` queue. Nothing requires a new screen.

**Later expansion**

- Track open/close/ownership and facility changes; manufacturer regional support strategy; regional participation trends driven by economy/weather/culture; rumor system; discovery-gated hidden world state.

**Integration:** competition/standings, calendar/time, marketplace circulation (#275), AI careers (#272), dealer network (#274), memory hooks for major world events → recaps/Hall of Fame (#276).

**Memory hooks:** track closure, a rival turning pro, a regional scene collapsing — recorded for future recaps and news callbacks.

---

## #272 — Dynamic AI Careers

AI riders are not race-result names; they have believable lives from youth
racing through retirement and later-life roles (coach, mechanic, team owner,
promoter, parent of a future competitor).

**Profile schema:** age, class, region, family income/support, parent
pressure, talent ceiling, development curve, practice habits, bike history,
injury history, sponsors, rivalries, personality, current confidence, career
goal, career outcome.

**Development model:** talent ceiling × growth rate, modified by practice
quality, coaching access, equipment quality, confidence/pressure, and
injury/burnout. Class moves (50→65→85→Supermini→big bikes) create realistic
**struggle periods** after moving up.

**Transitions & outcomes:** improve / plateau / struggle after a class move /
get injured / quit / switch brands / get sponsored / lose support / turn pro /
return to the local scene / retire into a post-racing role.

**v1.0-minimum**

- Extend the existing rival field (`worldEngine` + `competition`): a small roster of **named recurring rivals** with talent ceiling + growth curve who visibly improve/regress across seasons, occasionally get injured, and can move up a class with a temporary results dip.
- Rivalry history already tracked (`rivals`/RivalTracker) — surface it: "your old 65cc rival just moved to 85cc."
- Low-detail aging for everyone else (age counter + coarse outcome roll at season boundary).

**Later expansion**

- Full multi-tier career simulation, sponsor/dealer/coach interest driven by AI results, retirement into coach/mechanic/team-owner/parent roles that re-enter the world, AI riders becoming world-history figures in the Hall of Fame.

**Integration:** community/world (#271), reputation (#273), dealer/sponsor interest (#274), memory (rival arcs), connected careers (comparison).

**Memory hooks:** a rival's breakout win, a rival's career-ending injury, a rival returning as a coach.

---

## #273 — Group Reputation System

No single universal reputation score. Different groups judge the rider on
different behavior: **parents, other riders, dealers, mechanics, coaches,
sponsors, manufacturers, factory teams, fans, local tracks, officials, media.**

**Reputation dimensions:** trust, respect, professionalism, reliability,
sportsmanship, marketability, aggression-concern, mechanical-responsibility,
family/community standing.

**Inputs:** results, race incidents (dirty riding), bike care/neglect, thanking
or ignoring help, social posts, missed obligations (sponsor/school/family/dealer/
team), comebacks/adversity, family reputation.

**Consequences:** sponsor opportunities, dealer discounts vs hesitancy, mechanic
willingness, factory scouting, official scrutiny, fan growth, media narrative,
parent trust/restrictions.

**Decay & forgiveness:** most reputation drifts toward neutral over time; some
mistakes linger (officials/manufacturers slow to forgive; fans quick). A
comeback narrative can accelerate recovery.

**v1.0-minimum**

- Ship a small, honest slice on top of existing state: **shop/dealer, sponsor, rival, and community** standing already derive from results + relationship values (`relationshipEngine`, `sponsorEngine`, `rivals`, momentum). Formalize these four groups with a hidden 0–100 value each and simple input rules (results, sportsmanship in incidents, bike care, obligations met/missed).
- Consequences limited to what already exists: sponsor eligibility, dealer pricing hints, rival respect, community/news tone.
- Reputation is **hidden**; expressed through phone summaries, conversation tone, and news language — no raw meter dump.

**Later expansion**

- The full 12-group matrix, per-group value/trigger/consequence tables, manufacturer/official/media groups, marketability scoring for factory scouting, and long-memory forgiveness curves.

**Integration:** personality/identity (#277), community (#271), opportunities/sponsors, dealer network (#274), family (approvals), memory.

**Memory hooks:** a reputation milestone (first factory scout note, a sportsmanship moment that fans remember).

---

## #274 — Dealer Network System

Dealers are distinct businesses and community actors, not generic shops. Each
has identity, inventory, relationships, reputation, brand focus, and
opportunities.

**Profile schema:** name, region, brands carried, new/used inventory, parts
inventory, mechanic quality, pricing style, reputation, community reach,
financial health, owner personality.

**Relationship model:** player/family trust, purchase history, payment
reliability, bike-care reputation, race visibility, community standing — feeding
better deals, early bike access, support rides, shop sponsorship, demo rides,
emergency repair help, dealer-team opportunities.

**v1.0-minimum**

- Build on `src/systems/dealer.js` (catalog, orders, delivery) and `compatibility.js` (fitment). Give the player's home dealer an **identity** (name, brand focus, one owner-personality trait) and a **single trust value** that rises with purchases/visibility and unlocks a modest discount + occasional early-access/part-in-stock notification.
- Backorders/trade-ins already conceptually present via orders/delivery — expose a trade-in credit path against the used marketplace.

**Later expansion**

- Multiple competing regional dealers, dynamic inventory driven by manufacturer strategy and local demand, dealers sponsoring AI riders, dealer reputation/influence shifts, dealer teams, demo days.

**Integration:** marketplace/bike lifecycle (#275), maintenance, sponsors, regional world sim (#271), reputation (#273), family (money/approval).

**Memory hooks:** first shop sponsorship, a dealer going out of business, an emergency repair that saved a race weekend.

---

## #275 — Bike Lifecycle System

Every important bike has history, identity, value, wear, memories, and possible
future reappearances. Bikes are not disposable stat blocks.

**Identity fields (build on `assetProvenance.js`):** stable `assetId`/serial,
model, year, brand, trim, class, original source/dealer, original owner,
provenance tags. **Usage history:** race starts, wins/podiums/championships/DNFs,
crashes/injuries, engine hours, suspension hours, rebuilds, upgrades, setup
changes. **Value model:** condition, hours, mods, brand reputation, historical
significance, championship/famous-rider provenance, market demand.

**Circulation:** after sale a bike can enter used listings, be bought by an AI
rider, and later reappear in another garage, race entry, dealer listing, or
memory recap.

**v1.0-minimum**

- `assetProvenance` already assigns stable ids + provenance and records key events. Extend the active/stored bikes to accumulate **race count, best result, rebuild count, and engine/suspension hours**, and compute a **used value** from condition + hours + a provenance bonus.
- On sale, push the bike (with its history) into the used marketplace pool so a **former player bike can resurface** later — the single most emotionally resonant slice of the full vision.
- Garage display + memory hooks for milestone bikes (first bike, Loretta bike, first championship bike).

**Later expansion**

- Full restoration flow, display-only legacy objects, AI-owned circulation across the whole world, museum mode, documentary callbacks tied to specific bikes.

**Integration:** garage (#213/#220 Living Garage), marketplace/dealer (#274), maintenance, memory, Hall of Fame/museum (#276).

**Memory hooks:** buying/selling a significant bike; a former bike reappearing years later.

---

## #276 — Hall of Fame & Legacy Archive

A completed career doesn't just end — it becomes part of the game's remembered
history. Permanently records careers, champions, local legends, rivalries,
comebacks, signature bikes, valuable garages, loyal sponsors, privateer
achievements, and parent-mode accomplishments.

**Entry criteria & data:** career timeline, key results, relationships,
reputation milestones, injuries/returns, bikes/garages, sponsors/dealers, family
sacrifices. Story-first categories, not a pure speed leaderboard.

**Surfaces:** legacy archive menu, garage museum, career documentary, end-of-career
recap, references from new careers, optional friends comparison.

**v1.0-minimum**

- Reuse `careerHistory` (per-season records already persisted) and the retirement recap to write a **local Hall of Fame**: completed careers with headline stats, best finishes, championships, and signature bike. Persist across saves in local storage alongside the profile.
- Optional friends comparison via existing `connectedCareers` card export — story-first fields only.

**Later expansion**

- World-wide archive including AI legends (#272), garage museum mode, documentary generation, cross-career references ("your father raced here").

**Integration:** career outcomes, documentary/recap, memory, garage/bike lifecycle (#275), connected careers, community (#271).

**Memory hooks:** induction events, records broken.

---

## #277 — Rider Personality & Identity System

Identity **emerges from the life lived**, not a permanent archetype chosen at
career start. Potential identities: prodigy, late bloomer, underdog, local
legend, risk taker, smooth rider, hard worker, mechanically gifted, media
friendly, quiet professional, aggressive racer, comeback rider, team player,
privateer hero.

**Signals:** race performance, consistency, training behavior, mechanical care,
risk taking, social/media behavior, family support/conflict, injury recovery/
comebacks, rivalry patterns, sponsor/dealer/team relationships.

**Scoring & change:** a primary identity plus secondary tags; temporary
narratives vs long-term identity; conflicting identities resolve toward the
dominant signal set. Identity shifts over a career — early labels, mid-career
shifts, comeback rebranding, late-career legacy identity.

**Consequences:** media wording, sponsor fit, fan growth, coach feedback,
factory scouting notes, documentary title, career-ending summary.

**v1.0-minimum**

- Derive a **single emergent identity tag** each season from signals already tracked (results consistency via `competition`/momentum, mechanical care via bike wear/`assetProvenance`, risk via crash rate, comeback via injury-return). Surface it as narrative feedback in the season recap and news wording — **no min-max checklist, no raw bars.**
- Persist the identity history so a "comeback rider" or "local legend" label can appear in recaps and the Hall of Fame (#276).

**Later expansion**

- Full primary+secondary tag engine, conflicting-identity resolution, sponsor-fit and factory-scouting effects, documentary-title generation, per-era framing.

**Integration:** memory, reputation (#273), opportunities/sponsors, competition, training (`riderDevelopment`), documentary/recap.

**Memory hooks:** the moment an identity crystallizes (a defining comeback, a signature win).

---

## #278 — Race Weekend Decision Events (not free-roam pits)

Race-weekend depth via **event cards, decisions, and consequences** — never a
walking simulator. Examples: fork seal leaking before a moto, forgot spare
goggles, rival asks to borrow a lever, dealer has a tire in stock, promoter
changes moto order, weather delay, parent stress spike, coach's last-minute
advice, mechanic spots a cracked rim, fan wants an autograph.

**Event structure:** trigger conditions, presentation surface (notification/
card), decision options, cost/risk/reward + time pressure, relationship/
reputation effects, race-performance impact when appropriate, memory-hook
conditions.

**Categories:** mechanical problems, gear/prep mistakes, rival/friend requests,
dealer/shop support, promoter/schedule changes, weather delays, parent/family
stress, coach/mechanic advice, fan/media moments, sponsor obligations, official
scrutiny.

**Pacing:** scale frequency by career stage, race importance, preparation
quality, and world state; avoid event spam; **not every event has an obvious
correct answer.**

**v1.0-minimum**

- Build on `raceWeekend.js` lifecycle + `notifications`. Ship a **small curated pool (~8–12)** of decision events, at most **one or two per race weekend**, weighted by prep quality and bike condition (a neglected bike raises the odds of a mechanical event).
- Consequences limited to existing levers: money, bike readiness (condition/parts), a relationship/reputation nudge, and a memory hook when important. Presented as a card before the moto — decide, then race.

**Later expansion**

- Full category coverage, official scrutiny, sponsor obligations, media/fan arcs, deep weather/schedule chaos, world-state-driven triggers.

**Non-goal (explicit):** no free-roam Pit Area / pit-walking gameplay. Depth
comes from meaningful choices and their consequences.

**Integration:** race weekend, maintenance/garage, dealer (#274), family/reputation (#273), coach/mechanic, memory, community (#271).

**Memory hooks:** a generous lend that a rival never forgets; a gamble on a leaking fork seal that pays off or ends the day.

---

## Build order (suggested, post-launch)

1. **#275 Bike Lifecycle (used-value + resurfacing)** and **#276 local Hall of Fame** — highest emotional payoff on top of existing provenance/careerHistory, lowest risk.
2. **#272 Dynamic AI Careers (named recurring rivals)** and **#273 Group Reputation (four formalized groups)** — deepen the competitive world.
3. **#278 Race Weekend Decision Events** and **#277 Emergent Identity** — deepen moment-to-moment and season-to-season narrative.
4. **#274 Dealer Network** and **#271 Living World** full layers — the widest-reaching simulation, built last on the above.
