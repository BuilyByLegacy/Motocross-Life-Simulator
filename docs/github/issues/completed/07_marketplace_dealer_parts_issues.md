# Issue: Separate Dealer Parts Catalog from Used Marketplace

## What
Implement separate domain models and data flows for official dealer parts and used marketplace listings.

## Why
Dealer parts and used marketplace listings are separate experiences. New parts should feel reliable and catalog-driven, while used listings should carry history, negotiation, trust, and uncertainty.

## How
Create distinct dealer catalog item and marketplace listing models. Dealer items should focus on SKU, fitment, price, stock, and delivery. Marketplace listings should focus on seller, condition, provenance, negotiation, and trust.

## Definition of Done
- [ ] Dealer catalog items and marketplace listings use separate models.
- [ ] Dealer items support SKU, MSRP, stock, shipping time, and compatibility.
- [ ] Marketplace listings support seller, condition, photos metadata, provenance, and asking price.
- [ ] Shared compatibility structures can be reused without merging the experiences.
- [ ] Tests verify dealer and used listing behavior remain distinct.

## Related Epic
Marketplace, Dealer & Parts

## Labels
`mvp`, `marketplace`, `dealer`, `parts`, `architecture`

# Issue: Implement Bike Compatibility and Fitment Rules

## What
Create compatibility rules for parts based on bike make, model, year, class, engine size, configuration, and fitment exceptions.

## Why
Authenticity before convenience requires parts to fit specific bikes. Buying the wrong part should be prevented or clearly warned.

## How
Implement fitment records and validation services that can be used by dealer catalog, used marketplace, garage inventory, and listing creation.

## Definition of Done
- [ ] Parts can define compatible makes, models, years, and configurations.
- [ ] Fitment exceptions and universal parts are supported.
- [ ] Compatibility checks return match, warning, or incompatible states.
- [ ] Marketplace and dealer search can filter by bike compatibility.
- [ ] Tests cover exact match, universal fit, exception, and incompatible cases.

## Related Epic
Marketplace, Dealer & Parts

## Labels
`mvp`, `parts`, `compatibility`, `garage`, `marketplace`

# Issue: Add Marketplace Search and Filters

## What
Implement marketplace search, filters, and sorting for used listings, including part category, bike compatibility, price, condition, distance, seller trust, listing age, and provenance.

## Why
The marketplace must support search and filters so players can hunt for meaningful deals, not scroll through random inventory.

## How
Build a query service that accepts structured filters and returns deterministic listing results with sort options. The service should support saved search integration through the phone UI.

## Definition of Done
- [ ] Search supports text query and structured filters.
- [ ] Filters include category, compatibility, price, condition, distance, trust, age, and provenance.
- [ ] Sort options include price, distance, newest, trust, and relevance.
- [ ] Results expose reason metadata for compatibility and trust.
- [ ] Tests cover combined filters and sorting.

## Related Epic
Marketplace, Dealer & Parts

## Labels
`mvp`, `marketplace`, `search`, `filters`, `phone-ui`

# Issue: Implement Marketplace Negotiation Flow

## What
Create negotiation mechanics for used marketplace listings, including offers, counteroffers, seller responses, acceptance, rejection, expiration, and message history.

## Why
Used motocross parts have human stories. Negotiation supports people before players by making sellers feel like participants, not vending machines.

## How
Implement negotiation records linked to listings, buyer, seller, price, message snippets, timestamps, and state transitions. Avoid implementing full chat; store structured negotiation history.

## Definition of Done
- [ ] Negotiations support offer, counteroffer, accept, reject, withdraw, and expire states.
- [ ] Negotiations link to listing, buyer, seller, and related asset records.
- [ ] Price and message history are recorded.
- [ ] Accepted negotiations can create purchase and ownership transfer records.
- [ ] Tests cover full offer/counteroffer/accept flow and expiration.

## Related Epic
Marketplace, Dealer & Parts

## Labels
`mvp`, `marketplace`, `negotiation`, `seller-trust`, `assets`

# Issue: Add Seller Trust and Reputation System

## What
Implement seller trust metadata for marketplace listings, including seller history, response behavior, completed sales, disputes, disclosure quality, and provenance confidence.

## Why
Marketplace trust creates authentic risk. A cheap part from an unknown seller should feel different from a fairly priced part with clear history.

## How
Create seller profile and trust score models with explainable trust factors. Listing results should expose trust summaries without reducing the seller to a single opaque number.

## Definition of Done
- [ ] Sellers have profiles with history and trust factors.
- [ ] Trust summaries include response rate, completed sales, disputes, and disclosure quality.
- [ ] Trust can influence search filters and sorting.
- [ ] Trust changes are recorded with reasons.
- [ ] Tests cover trusted, unknown, and risky seller scenarios.

## Related Epic
Marketplace, Dealer & Parts

## Labels
`mvp`, `marketplace`, `seller-trust`, `reputation`, `authenticity`

# Issue: Implement Saved Marketplace Searches

## What
Create saved searches for marketplace listings, including query text, filters, compatibility targets, notification preferences, and match history.

## Why
Players should be able to wait for the right used bike or part. Saved searches make the phone/internet hub feel useful and alive.

## How
Implement saved search records tied to the player profile and phone UI search state. New listings should be checkable against saved searches and able to create notifications.

## Definition of Done
- [ ] Saved searches store query text, filters, sort preference, and compatibility target.
- [ ] Saved searches can be named, edited, disabled, and deleted.
- [ ] New matching listings can create phone notifications.
- [ ] Match history prevents duplicate alerts.
- [ ] Tests cover creation, matching, notification, and deletion.

## Related Epic
Marketplace, Dealer & Parts

## Labels
`mvp`, `marketplace`, `saved-searches`, `phone-ui`, `notifications`

# Issue: Implement Dealer Order and Delivery Tracking

## What
Create dealer order tracking for new parts, including cart, order placement, payment status, stock status, shipping estimate, delivery date, and garage receipt.

## Why
New dealer purchases should support planning and deadlines. Waiting on parts before a qualifier can create meaningful calendar tension.

## How
Implement order records linked to dealer catalog items, compatible bikes, calendar delivery estimates, payment state, and garage inventory creation on receipt.

## Definition of Done
- [ ] Dealer orders support cart, placed, paid, shipped, delivered, delayed, and cancelled states.
- [ ] Delivery estimates create calendar entries or deadlines.
- [ ] Delivered parts create garage inventory assets with provenance.
- [ ] Delays can create phone notifications.
- [ ] Tests cover order placement, delay, delivery, and inventory receipt.

## Related Epic
Marketplace, Dealer & Parts

## Labels
`mvp`, `dealer`, `parts`, `orders`, `calendar`
