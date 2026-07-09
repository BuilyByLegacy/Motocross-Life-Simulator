# Connected Careers — Design + Implementation

Covers the **Friends, Connected Careers, and Leaderboard System** epic
(issues #114–#122). Motocross: Chasing the Dream is an offline, single-player,
story-first game, so this social layer is **asynchronous and networkless**:
careers are shared as portable text codes, not through a backend. There is no
live multiplayer, matchmaking, chat, or push-notification service — those remain
explicit non-goals.

Implemented in `src/systems/connectedCareers.js` (unit-tested) and surfaced in
the phone's **Connected** app (`ui.js` → `renderConnectedApp`).

## Career profile cards (#115)
`buildCareerCard(game, { privacy })` produces a card with an identity headline,
current state, latest major event, and a legacy/story tag:
`name, avatar, age, klass, mode (Rider/Parent), status, region, mainBike,
seasons, wins, podiums, championships, lorettaStage, goal, biggestMemory, money,
injury, sponsors, family, bikesOwned, trophies, legacyRating, storyTag, headline`.

- **Story tag** (`storyTag`) keeps the game from reducing riders to a win count:
  `rising prodigy`, `privateer grinder`, `champion`, `Loretta's rider`,
  `comeback story`, `family sacrifice`, `local legend`, `chasing the dream`.
- **Legacy rating** (0–100) blends performance (wins, titles, Loretta stage)
  with story richness (seasons, trophies, biggest memory).
- Variants are covered by status (`active`, `injured`, `loretta_qualified`,
  `retired`) and mode (Rider/Parent, including a "family broke" note).

## Privacy & sharing controls (#121)
`PRIVACY_FIELDS = [finances, injuries, family, sponsors, private]`. A card owner
toggles redactions before sharing; redacted fields serialize as `null` and a
fully `private` card is excluded from leaderboards. `toggleCardPrivacy(field)`
drives the phone UI chips.

## Sharing via portable codes (#118 recaps, #119 documentaries)
`exportCard(card)` → `MX1:<base64>` string; `importCard(code)` decodes it.
`buildRecapCard(game)` produces an end-of-season recap (record, best finish,
memory of the year, next goal), and any completed-career card doubles as the
final documentary/legacy share. Sharing is copy-a-code — offline and safe.

## Friends system (#114)
`FriendsList` manages imported cards with states
(`active, pending_out, pending_in, private, blocked, removed, unavailable`),
plus search-by-name, block/unblock/remove, and empty/blocked states. Re-importing
an updated card keeps a `prevSnapshot` so milestones can be detected. Friend
requests/online-status are networking concepts and are represented as UX states
only (no live presence).

## Leaderboards (#116)
`leaderboard(cards, category, { filter })` ranks the player + friends across
**performance** categories (wins, championships, Loretta stage, earnings,
garage value) and **story/legacy** categories (legacy rating, longevity,
underdog, best parent-mode career). Deterministic tie-break: category score →
legacy rating → name. Filters: mode, region, class. Private cards are excluded;
hidden financial fields fall back safely.

## Career comparison (#117)
`compareCareers(mine, theirs)` groups fields into identity / competition /
Loretta / money / legacy and adds a story-first narrative line
("Your career endured longer — theirs burned brighter, briefer."). Redacted
fields render as `—`.

## Asynchronous friend notifications (#120)
`friendMilestones(prev, next)` diffs a friend's previous snapshot against a
freshly-imported card and emits phone notifications for meaningful, privacy-safe
changes: joined, Loretta advancement, championship, new win, injury, retirement.
Routed through the existing `NotificationQueue` (source `social`). No live
activity tracking — milestones surface when you re-import a friend's newer code.

## Friend career import as world cameos (#122)
`toWorldCameo(card)` turns a friend's card into a named rider (`isCameo`,
strength derived from legacy rating) that `game.addFriendCameo(id)` adds to
`state.cameos`, so a friend's rider can appear in your world.

## Non-goals (explicit)
- No live multiplayer, matchmaking, or real-time race lobbies.
- No backend, accounts, chat, or push-notification service.
- No real GitHub/API issue creation.
- Video rendering of documentaries is out of scope unless separately specced.
