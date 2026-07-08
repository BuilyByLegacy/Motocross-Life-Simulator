# Issue Writing Guide

Every issue should explain **What**, **Why**, **How**, and **Definition of Done**. This keeps the project useful for designers, engineers, producers, and AI coding agents.

## Good issue format

```markdown
## What
State the specific work to complete.

## Why
Explain why the work matters to Motocross: Chasing the Dream.

## How
Describe the recommended approach, constraints, references, and links.

## Definition of Done
List the exact evidence that proves the issue is complete.
```

A good issue is specific enough that someone can act on it without guessing the game’s direction.

## Bad vs. good examples

### Bad

> Make career better.

This is too broad. It does not say what is wrong, why it matters, how to approach it, or when it is complete.

### Good

> Replace linear career progression assumptions with branching progression gates based on age, skill, family resources, race results, relationships, and opportunity timing.

This points to a concrete design problem and gives enough direction to create a scoped task.

## How to write issues for Claude Code and other AI coding agents

- Link the relevant epic, design spec, and source files.
- State whether the task is research, design, implementation, bug fixing, or documentation.
- Keep implementation issues small enough to complete in one focused change.
- Include acceptance criteria and testing instructions.
- Do not ask the agent to invent major game design unless the issue is explicitly a design task.
- Include constraints such as “do not implement gameplay yet” or “documentation only” when relevant.
- Make the Definition of Done objective.

## How to keep issues small enough to implement

A small issue should usually change one system, one document, one UI flow, or one behavior. If an issue includes several verbs such as “design, implement, balance, add UI, and write content,” split it.

Use this split:

1. Research issue: gather facts and constraints.
2. Design issue: decide the model and player experience.
3. Implementation issue: build the approved design.
4. Bug or polish issues: fix problems found after implementation.

## How to link issues to epics

- Put the epic name or issue number in the issue’s **Related epic** field.
- Add child issues to the epic body as a task list.
- Apply the same `area:*` label when the child issue belongs clearly to the same system.
- Use milestones to show when work is expected to finish, not necessarily when the whole epic finishes.

## Closing issues

Close issues only when the Definition of Done is met. If the direction changes, update the Definition of Done or close the issue as intentionally out of scope with a clear comment explaining why.

## Example issues

### 1. Replace “How Big Do You Want to Race?” with Season Event Planning

**What**

Replace the vague “How Big Do You Want to Race?” concept with a season event planning system where the family chooses events, travel commitments, costs, risks, and goals across a calendar.

**Why**

Motocross progression should feel earned through planning, sacrifice, and tradeoffs. A season planning model better supports the principles “Respect the family,” “Earn every moment,” and “Decisions echo.”

**How**

- Define event planning as a calendar and budget decision rather than a simple ambition selector.
- Include local races, qualifiers, practice days, travel weekends, school/work conflicts, and recovery time.
- Show costs, expected competition level, family stress, bike wear, and potential opportunity.
- Link to the Calendar & Time Engine, Family & Economy Engine, Competition / Race Engine, and Career Progression epics.

**Definition of Done**

- A design spec describes the season event planning flow.
- The spec includes example events and tradeoffs.
- The old “How Big Do You Want to Race?” assumption is removed or marked obsolete in relevant docs.
- Follow-up implementation issues are created if needed.

### 2. Design Road to Loretta’s Qualification System

**What**

Design an authentic Road to Loretta’s qualification system covering area qualifiers, regional qualifiers, class eligibility, costs, scheduling pressure, and outcomes.

**Why**

Loretta’s is an emotionally powerful amateur motocross goal. It should feel like a difficult family journey, not a generic tournament ladder.

**How**

- Research current qualification structure and terminology.
- Define qualifier event flow and failure states.
- Include travel, entry fees, bike prep, missed work/school, pressure, and family stress.
- Connect qualification outcomes to memories, relationships, career progression, and story events.

**Definition of Done**

- Research sources are summarized and linked.
- The qualification flow is documented from entry to final outcome.
- Edge cases such as injury, mechanical failure, poor results, and financial constraints are addressed.
- MVP and future-release scope are separated.

### 3. Remove Linear Career Progression Assumption

**What**

Replace any assumption that career progression is a straight ladder with a model based on branching opportunities, setbacks, resources, timing, and relationships.

**Why**

The game’s promise depends on personal stories. A linear career ladder would undermine authenticity, replayability, and emotional consequence.

**How**

- Audit existing design notes for linear progression language.
- Define alternate progression paths including local hero, Loretta’s hopeful, privateer grind, sponsor-backed rise, burnout, injury recovery, and family-first decisions.
- Document progression gates based on skill, age, results, budget, reputation, relationships, and world timing.

**Definition of Done**

- Linear career assumptions are removed or rewritten.
- A branching progression design note is created.
- Follow-up issues exist for implementation, tuning, and UI communication.

### 4. Add Rider Development Curve System

**What**

Design a rider development curve system where riders improve, plateau, regress, specialize, or burn out based on age, training, racing, confidence, pressure, injury, and life context.

**Why**

Riders should feel like people with unique histories rather than stat blocks that only increase. This supports “People before players” and “Everything has history.”

**How**

- Define rider attributes and development influences.
- Create curve types such as early bloomer, late bloomer, steady worker, high-ceiling raw talent, and pressure-sensitive rider.
- Include family pressure, coaching, practice quality, race experience, fatigue, injury, and confidence.
- Connect outcomes to Memory Engine and Relationship Engine events.

**Definition of Done**

- Development curve types and modifiers are documented.
- Example riders demonstrate different paths over multiple seasons.
- MVP implementation scope is separated from long-term simulation goals.

### 5. Expand Marketplace Into Searchable Used Marketplace

**What**

Design the marketplace as a searchable used marketplace with listings for bikes, parts, gear, trailers, services, and imperfect opportunities.

**Why**

Motocross families often progress through used purchases, negotiation, compromises, and risk. The marketplace should create stories, not just transactions.

**How**

- Define listing fields such as price, condition, location, seller, history, photos, hidden problems, and urgency.
- Add filters for class, brand, price range, distance, condition, and part compatibility.
- Include negotiation, inspection, scams, rare finds, and sentimental choices.
- Connect purchases to the Asset Engine, Family & Economy Engine, Garage & Property System, and Phone / Internet UI.

**Definition of Done**

- Marketplace listing schema and search flow are documented.
- At least five example listings are included.
- Risks and tradeoffs are described.
- Follow-up implementation tasks are created for MVP search and listing display.

### 6. Add In-Game Phone With Internet and Apps

**What**

Design an in-game phone with internet and apps for messages, calendar, marketplace, race information, photos, contacts, and notifications.

**Why**

The phone can make the motocross world feel connected and modern while naturally surfacing relationships, opportunities, deadlines, and memories.

**How**

- Define the initial app list and MVP screens.
- Specify notification rules and interruption limits.
- Connect messages to relationships, photos to memories, marketplace to assets, and race pages to calendar events.
- Keep the phone useful without making it a generic menu wrapper.

**Definition of Done**

- Phone app responsibilities are documented.
- MVP and future app scope are separated.
- Example notifications, messages, marketplace pages, and race pages are included.
- Follow-up UI and implementation issues are created.
