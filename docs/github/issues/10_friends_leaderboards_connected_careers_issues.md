# Friends, Connected Careers, and Leaderboard System Issue Drafts

Game: Motocross: Chasing the Dream  
Tagline: Every rider has a story. Chase yours.

These issue drafts define an asynchronous, story-focused social layer for the in-game phone app. They are planning drafts only and do not implement gameplay, networking, backend services, or live multiplayer.

# Issue: Design Friends System
## What
Design an in-game friends system accessed through the phone app. The system should let players find and manage friends so they can compare career stories without requiring live multiplayer.

Core design requirements:
- Friend requests sent through the phone app.
- Accept and decline flows with clear confirmation states.
- Friend list with searchable, filterable, and sortable entries.
- Search by username or player identifier.
- Private profile settings that limit discoverability and visibility.
- Optional online, offline, and last active indicators if appropriate for the platform and privacy settings.
- Friend career cards that preview each friend's rider story.
- Ability to view shared career summaries, season recaps, and completed career summaries when allowed.
- Basic blocking, unblocking, removal, and report-ready UX hooks.
- Empty, pending, blocked, private, and unavailable states.

## Why
Motocross: Chasing the Dream should let players connect around the lives their riders lived, not just around race results. A phone-based friends system gives social features a grounded in-world home while preserving the game's asynchronous, story-first identity.

## How
- Map the phone app entry point, navigation, tabs, and major screens for friends.
- Define friend request states: none, outgoing pending, incoming pending, accepted, blocked, removed, private, and unavailable.
- Specify what data appears in the friend list versus what requires opening a friend's profile.
- Define UX copy for sending, accepting, declining, removing, and blocking friends.
- Document how privacy settings affect username search, profile cards, career summaries, and status indicators.
- Define moderation-safe placeholders for report/block flows without implementing external services.
- Identify data dependencies from career, memory, documentary, and profile systems.
- Clarify that all social interactions are asynchronous and do not require synchronized racing sessions.

## Definition of Done
- Phone app friends flow is documented from entry point through friend management actions.
- Friend request, acceptance, decline, removal, and blocking states are defined.
- Friend list and search requirements are documented.
- Privacy and private profile behavior is documented.
- Career card entry points from the friend list are documented.
- Non-goals explicitly state that live multiplayer and real GitHub/API issue creation are not included.

## Related Epic
Friends, Connected Careers, and Leaderboard System

## Labels
type: design, area: phone, area: social, area: ui, priority: p1-high

# Issue: Design Connected Careers Profile Cards
## What
Design friend career profile cards that summarize the kind of life each rider is living or lived. Cards should be accessible from the phone app friends area and should prioritize story identity over raw ranking.

Each card should include, when visible under privacy settings:
- Rider name.
- Current age.
- Current class.
- Career mode used: Rider Mode or Parent Mode.
- Current career status.
- Region.
- Main bike.
- Latest major result.
- Current goal.
- Biggest memory.
- Injury status.
- Sponsor or team status.
- Legacy rating or story identity.

Example card lines:
- “Age 14, Supermini, chasing Loretta’s.”
- “Age 17, 250B, factory amateur support.”
- “Retired at 22, became a suspension tuner.”
- “Parent Mode, family went bankrupt chasing nationals.”

## Why
Friend profiles should immediately communicate what makes a rider's story unique. A player should understand whether a friend is a rising prodigy, a struggling privateer, a family-first amateur, a comeback story, or a retired local legend.

## How
- Define card hierarchy: identity headline, current state, latest major event, and legacy/story tag.
- Specify card variants for active amateur, active pro, injured, retired, parent mode, bankrupt family, coach/mechanic outcome, and legacy ending.
- Document how cards pull from career outcome, memory, injury, sponsor, bike, and documentary systems.
- Define redaction behavior when friends hide injuries, finances, family details, or full career visibility.
- Include wireframe-level content blocks for compact and expanded card views.
- Define localization-friendly text templates for example story identities.
- Ensure cards can appear in friends list, comparison screens, leaderboards, recaps, and world cameo selection.

## Definition of Done
- Career card fields, priority order, and variants are documented.
- Example profile cards cover Rider Mode and Parent Mode stories.
- Privacy redaction behavior is documented.
- Data dependencies and fallback states are listed.
- The card design supports both current careers and completed legacy careers.

## Related Epic
Friends, Connected Careers, and Leaderboard System

## Labels
type: design, area: phone, area: career, area: memory, priority: p1-high

# Issue: Design Leaderboard Categories
## What
Design asynchronous leaderboard categories that compare careers across both performance and story-based outcomes.

Performance categories:
- Most wins.
- Most championships.
- Most Loretta qualifications.
- Most Loretta wins.
- Best Loretta finish.
- Most pro wins.
- Highest career earnings.
- Highest fan following.

Story and legacy categories:
- Greatest comeback.
- Most injured rider.
- Biggest underdog.
- Longest career.
- Most loyal sponsor.
- Most valuable garage.
- Most valuable memorabilia collection.
- Most bikes owned.
- Best privateer career.
- Best parent mode career.
- Most dramatic season.
- Best local legend career.

## Why
The game should avoid reducing every rider to a win count. Leaderboards should celebrate different career arcs, including sacrifice, comeback, loyalty, family struggle, garage building, and local hero status.

## How
- Define each leaderboard category, scoring inputs, tie-breakers, and display text.
- Separate objective stat categories from derived narrative categories.
- Document how narrative scores are calculated from memories, injuries, career context, family outcomes, sponsor history, and documentary highlights.
- Include filters for friends only, region, class, mode, active careers, completed careers, and time period.
- Define privacy behavior for hidden financial, injury, and family data.
- Specify leaderboard card presentation, including rider name, story tag, rank, comparison snippet, and privacy-safe summary.
- Clarify that leaderboards are asynchronous snapshots and not live race matchmaking.

## Definition of Done
- Performance and story/legacy leaderboard categories are fully defined.
- Each category has required data inputs and privacy behavior.
- Ranking/tie-breaker guidance is documented.
- Friend-only and broader filtered views are described as design targets.
- Non-goals exclude live multiplayer rankings and real-time race lobbies.

## Related Epic
Friends, Connected Careers, and Leaderboard System

## Labels
type: design, area: social, area: career, area: memory, priority: p1-high

# Issue: Design Career Comparison Screen
## What
Design a side-by-side phone app screen where players compare their career against a friend's career as two life stories.

The comparison should include:
- Mode used.
- Ages completed.
- Classes raced.
- Career outcome.
- Wins, podiums, and championships.
- Loretta path.
- Injuries.
- Sponsors.
- Bikes owned.
- Money earned and spent.
- Garage and shop progression.
- Family outcome.
- Biggest rival.
- Biggest memory.
- Final legacy.

## Why
Players should be able to ask, “What kind of career did you have compared to mine?” rather than only “Who won more?” This reinforces the tagline: Every rider has a story. Chase yours.

## How
- Define comparison layout for phone-sized UI, including summary header, tabbed sections, and expandable story rows.
- Group comparison data into identity, competition, Loretta path, money/garage, injuries, relationships, memories, and legacy.
- Add narrative comparison copy such as “Your career burned brighter early; your friend endured longer.”
- Define missing-data states when careers are at different ages, different modes, private, incomplete, or retired.
- Document privacy redactions for injuries, finances, family outcomes, and parent mode hardships.
- Include entry points from friend cards, leaderboards, season recaps, and career documentaries.
- Identify dependencies on career history, memory engine, family outcomes, garage value, and documentary recap systems.

## Definition of Done
- Side-by-side comparison sections and fields are documented.
- Story-first comparison language is specified.
- Privacy, incomplete-career, and cross-mode edge cases are documented.
- Entry points and data dependencies are listed.
- Design clearly avoids live multiplayer implementation.

## Related Epic
Friends, Connected Careers, and Leaderboard System

## Labels
type: design, area: ui, area: phone, area: career, area: memory, priority: p1-high

# Issue: Design Season Recap Sharing
## What
Design shareable season recap cards that players can send to friends through the phone app at the end of a season.

A recap should include:
- Season record.
- Biggest win.
- Worst crash.
- Biggest family moment.
- Best bike.
- Biggest expense.
- Sponsor change.
- Rival battle.
- Memory of the year.
- Next season goal.

Friends should be able to view or react to a shared recap when allowed by privacy settings.

## Why
Season recaps turn progression into memories. Sharing them lets friends follow each other's careers asynchronously and creates reasons to care about more than final career outcomes.

## How
- Define recap generation timing, such as season end, major championship end, or year-end phone prompt.
- Document recap card layout, preview state, expanded state, and friend reaction affordances.
- Specify possible reaction types, such as cheer, respect, sympathy, shocked, and comeback energy.
- Define privacy filters before sharing, including hiding finances, injuries, family moments, or sponsor details.
- Include share targets: selected friends, close friends, all friends, or private archive only.
- Document how recaps connect to memory engine, documentary recap, rivals, sponsors, bikes, expenses, and family systems.
- Clarify that reactions are asynchronous and do not require chat or live presence.

## Definition of Done
- Season recap fields and card states are documented.
- Sharing, audience selection, and privacy behavior are defined.
- Friend reaction concepts are documented without implementing live chat.
- Data dependencies and fallback content are listed.
- End-of-season entry points are specified.

## Related Epic
Friends, Connected Careers, and Leaderboard System

## Labels
type: design, area: memory, area: social, area: phone, priority: p1-high

# Issue: Design Career Documentary Sharing
## What
Design sharing for completed career documentaries and final legacy summaries when a career ends.

Players should be able to share:
- Final career card.
- Career documentary summary.
- Garage tour.
- Family album highlights.
- Hall of Fame entry.
- Legacy ending.

Privacy options must exist before anything is shared.

## Why
A completed career is the player's full motocross story. Sharing the final documentary gives friends a meaningful way to celebrate, compare, and remember careers that ended in very different ways.

## How
- Define the share prompt that appears when a career reaches retirement, legacy ending, or final documentary generation.
- Specify preview modules: final stats, defining memories, bikes, garage, family, sponsors, injuries, and legacy outcome.
- Add privacy review before publishing to friends.
- Define share destinations: selected friends, all friends, private archive, and optional leaderboard eligibility.
- Document redaction rules for sensitive family, financial, injury, and personal details.
- Include different documentary tones: champion, privateer, comeback, tragic injury, family sacrifice, local legend, mechanic/coach transition, and unfinished dream.
- Clarify that sharing is asynchronous and not tied to live multiplayer.

## Definition of Done
- Career documentary sharing flow is documented.
- Shareable modules and privacy review are defined.
- Legacy ending variants and tone guidance are listed.
- Friend viewing behavior is described.
- Non-goals exclude video rendering implementation unless separately scoped.

## Related Epic
Friends, Connected Careers, and Leaderboard System

## Labels
type: design, area: documentary, area: memory, area: social, priority: p2-medium

# Issue: Design Asynchronous Friend Notifications
## What
Design optional phone notifications for friends' career milestones.

Example notifications:
- Friend qualified for Loretta’s.
- Friend won first championship.
- Friend broke collarbone.
- Friend signed with manufacturer support.
- Friend went bankrupt in Parent Mode.
- Friend retired.
- Friend became a coach.
- Friend found rare memorabilia.
- Friend sold a legendary bike.

Notifications should be optional and configurable.

## Why
Friend notifications make connected careers feel alive without creating live multiplayer obligations. They help players notice meaningful story events in friends' careers and return to the phone app to view recaps, cards, or comparisons.

## How
- Define notification categories: competition, Loretta, injury, sponsor, family/finance, retirement, career outcome, garage, memorabilia, and documentary.
- Specify opt-in/opt-out controls globally and per friend where appropriate.
- Document notification priority, frequency limits, batching, and quiet hours.
- Define privacy filtering so hidden injuries, finances, family details, or usernames do not appear.
- Write example notification copy in an in-world phone tone.
- Include entry points from notifications into friend cards, recaps, comparisons, and documentaries.
- Clarify that notifications are asynchronous snapshots, not live activity tracking.

## Definition of Done
- Notification categories, copy examples, and phone entry points are documented.
- Configuration and opt-out behavior are defined.
- Privacy and sensitive-event filtering are documented.
- Frequency and batching guidance is included.
- Non-goals exclude push notification service implementation unless separately scoped.

## Related Epic
Friends, Connected Careers, and Leaderboard System

## Labels
type: design, area: phone, area: notifications, area: social, priority: p2-medium

# Issue: Design Privacy and Sharing Controls
## What
Design privacy controls for connected careers, friend viewing, leaderboards, recaps, notifications, and world cameos.

Players should choose what friends can see:
- Full career.
- Career card only.
- Stats only.
- Recaps only.
- No injuries or finances.
- Hide family details.
- Hide Parent Mode financial outcomes.
- Hide real username if applicable.

## Why
Some career stories may involve sensitive events like bankruptcy, divorce, injuries, family conflict, or financial hardship. Players need control over what is visible so social features remain safe, respectful, and emotionally appropriate.

## How
- Define privacy presets: open to friends, story summary only, stats only, close friends only, private, and custom.
- Document field-level visibility for injuries, finances, family outcomes, usernames, region, career status, and documentary content.
- Specify how privacy applies to friend search, profile cards, leaderboards, career comparison, recaps, documentary sharing, notifications, and world cameos.
- Include preview-as-friend functionality so players can see what others will see.
- Define default settings for new players and minors/family-oriented profiles if applicable.
- Document redaction copy such as “Private family detail” or “Financial details hidden.”
- Identify data flags required from career, family, injury, finance, memory, and user profile systems.

## Definition of Done
- Privacy presets and custom controls are documented.
- Field-level visibility requirements are listed.
- Redaction behavior is defined across every social surface.
- Default privacy recommendations are included.
- Sensitive content scenarios are explicitly addressed.

## Related Epic
Friends, Connected Careers, and Leaderboard System

## Labels
type: design, area: social, area: privacy, area: phone, priority: p1-high

# Issue: Design Friend Career Import as World Cameos
## What
Design optional friend career cameos that can appear asynchronously in the player's world.

Friends' riders could appear as:
- AI rivals.
- Race entries.
- Training facility riders.
- Marketplace sellers.
- Pro riders in news.
- Future coaches.
- Garage memorabilia source.
- Factory team riders.

This should be optional and asynchronous. It should not require players to be at the same career age.

## Why
Friend cameos make the world feel socially connected while preserving the player's single-player career timeline. Seeing a friend's rider as a rival, coach, seller, or news headline can create memorable moments without live multiplayer.

## How
- Define opt-in controls for allowing a player's rider to appear in friends' worlds.
- Specify cameo types, eligibility rules, and narrative-safe placement logic.
- Document age and timeline translation rules so a retired friend can appear as a coach while a younger career can appear in archival news or amateur entries.
- Define privacy filtering for hidden details, usernames, injuries, finances, and family outcomes.
- Include design rules that prevent cameos from overriding authored progression, key rivals, or player agency.
- Document how imported friend data is converted into AI rider profiles, marketplace listings, news snippets, memorabilia provenance, and team rosters.
- Clarify that cameos are asynchronous snapshots and do not represent live player actions.

## Definition of Done
- Cameo types and eligibility rules are documented.
- Opt-in, opt-out, and privacy behavior are defined.
- Timeline mismatch handling is specified.
- Integration points with world, racing, marketplace, news, coach, and garage systems are listed.
- Non-goals exclude live co-op, live ghosts, and synchronous multiplayer races.

## Related Epic
Friends, Connected Careers, and Leaderboard System

## Labels
type: design, area: world, area: social, area: career, priority: p2-medium

# Issue: Update Design Decision Log
## What
Add a new design decision documenting the multiplayer and social direction:

Decision: DD-0020 — Multiplayer Is Asynchronous and Story-Focused

Description: Motocross: Chasing the Dream will not prioritize live multiplayer. Social features should focus on friends, connected careers, leaderboards, shared recaps, career comparison, and asynchronous world cameos. Players compare the lives their riders lived, not just live race results.

## Why
The project needs a clear design boundary before implementation begins. Without this decision, future work could drift toward live race lobbies or competitive multiplayer systems that conflict with the game's story-first identity.

## How
- Add DD-0020 to the design decision log or equivalent GDD documentation location.
- Cross-reference friends, connected careers, leaderboards, career sharing, and asynchronous world cameo issue drafts.
- Document explicit non-goals: live multiplayer priority, synchronous matchmaking, live race lobbies, and social features that reduce careers to win counts.
- Document the intended player fantasy: comparing the lives riders lived.
- Update any relevant GDD index or project setup references.

## Definition of Done
- DD-0020 is added to the appropriate design decision log.
- The decision states that multiplayer is asynchronous and story-focused.
- The decision references friends, connected careers, leaderboards, sharing, comparison, and world cameos.
- Live multiplayer non-goals are documented.
- Related indexes are updated if they exist.

## Related Epic
Friends, Connected Careers, and Leaderboard System

## Labels
type: documentation, area: gdd, area: social, priority: p1-high
