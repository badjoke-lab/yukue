# 寺院のゆくえ — specialist pre-activation contract

Status: pre-activation specification

This document defines the specialist contract that must exist before `apps/jiin` is created. It does not activate Jiin, create a Worker/hostname/route, or publish temple records.

## Purpose

寺院のゆくえ is a change/history registry, not a temple directory, sightseeing guide, or doctrinal encyclopedia. A detail page answers:

1. What temple entity is this?
2. What is its currently supportable continuity state?
3. What changed over time and what is it related to?
4. What Evidence supports each material claim?

Matsuri Relations, Jinja Relations, cemetery/columbarium relations, or general directory listings may seed research but never auto-promote a temple into a public Jiin record.

## Identity contract

Where Evidence supports it, a temple may carry:

- canonical temple name
- reading
- aliases and former names
- mountain name (山号)
- cloister/institution name (院号) where applicable
- stable specialist entity ID
- current location
- former locations and location-history Relations
- official/authoritative links
- founding period/date at supported precision
- founder / founding patron where supportable
- principal image / principal object of worship where supportable
- sect / school affiliation
- branch / lineage / district information where applicable
- head-temple / sub-temple / 本末 relationships where supportable
- religious-corporation identity and relationship
- comprehensive religious-organization relationship
- related Matsuri entities
- related shrine entities
- related temple entities
- related cemetery / columbarium / memorial-facility entities
- related organization, designation, and place entities

Unsupported values remain absent. Historical, doctrinal, festival, cemetery, or organizational facts must not be projected onto the temple without temple-supporting Evidence.

## State model

One scalar status must not collapse independent concepts.

### Temple continuity state vocabulary

- `operating` — temple identity is currently extant/operating under reviewed Evidence
- `rebuilding` — temple continuity remains but reconstruction is materially in progress
- `relocated` — current identity continues at another location; location history is required
- `merged` — former independent identity has been integrated into another temple/entity under reviewed Evidence
- `dissolved` — independent continuity has ended where Evidence supports that conclusion
- `reestablished` — previously ended/interrupted identity has been explicitly re-established under reviewed Evidence
- `unknown` — Evidence is insufficient for a stronger current-state claim

### Separate dimensions

The following remain separate Relations/events or state dimensions and are not synonyms for continuity state:

- sect/school affiliation
- comprehensive-organization affiliation
- head-temple / branch-temple / 本末 relationship
- administrative/兼務 relationship
- religious-corporation status
- building condition
- temporary closure/access restriction
- disaster damage
- cemetery/columbarium operation
- memorial-service offerings

A temple may therefore be `operating` while having a historical affiliation change, a merged branch relation, a rebuilding component, or a separately managed cemetery.

## Event contract

Reviewed evidence-backed Events may include:

- `founded`
- `relocated`
- `rebuilt`
- `destroyed`
- `damaged`
- `merged`
- `dissolved`
- `reestablished`
- `sect_changed`
- `affiliation_changed`
- `head_branch_relation_changed`
- `administration_changed`
- `corporate_status_changed`
- `principal_image_changed_or_transferred`
- `cemetery_opened`
- `cemetery_transferred`
- `columbarium_opened`
- `memorial_facility_changed`
- `designation_added`
- `designation_changed`
- `designation_removed`
- `related_festival_changed`
- `other_reviewed_change`

Each Event requires identity, supported date/date range, affected entity, concise summary, Evidence, and Source. Before/after values are recorded only when directly supportable.

## Jiin A/B/C publication contract

### Tier A — Public Index

Minimum:

- reviewed canonical temple identity/entity boundary
- reviewed geographic scope
- at least one approved official/public/otherwise authoritative temple-identifying Source
- source verification/access date
- deterministic identity/deduplication check
- publication timestamp
- machine-visible Tier A classification

A Matsuri, Jinja, cemetery, or directory Relation alone is insufficient. Tier A does not require Current State, Event, sect, principal image, corporation, coordinates, cemetery relation, or history.

### Tier B — Public Verified

Tier B adds applicable reviewed verification dimensions, including:

- substantive temple profile/identity Evidence
- evidence-backed continuity state when supportable
- reviewed current Place/location
- reviewed official/authoritative links
- supported sect/affiliation/corporate/administrative/head-branch fields where applicable
- supported principal-image and founding fields where applicable
- supported Matsuri/Jinja/Jiin/Tomurai-related Relations
- at least one dated evidence-backed observation anchor

Missing dimensions remain absent rather than inferred.

### Tier C — Public History / Monitoring

Tier C adds longitudinal evidence such as:

- relocation history
- reconstruction/destruction/disaster history
- merger/dissolution/re-establishment history
- sect/affiliation/head-branch changes
- administration/corporate changes
- cemetery/columbarium/memorial-facility changes
- designation changes
- related-festival changes
- freshness monitoring or multiple dated observations

Tier C is continuous deepening, not a first-publication gate.

## Public detail-page projection

The detail projection supports the following sections where data exists.

### Header / identity

- canonical name
- reading
- aliases/former names
- mountain name /院号 where applicable
- entity ID
- current continuity state
- prefecture/municipality
- verified-at / updated-at
- official link(s)

### Current state

- continuity state
- state since, if supportable
- observation/verification date
- concise evidence-backed basis
- linked Evidence
- previous state/change Event where applicable

### Location

- current location
- public address where appropriate
- coordinates when reviewed
- map projection/link where supported
- former locations
- relocation Events
- location Evidence

### Temple profile

- founding period/date at supported precision
- founder / founding patron where supportable
- principal image / principal object of worship
- sect / school
- lineage / district where applicable
- religious-corporation relationship
- comprehensive-organization relationship
- head-temple / branch-temple / 本末 relationship

### Administration and relationships

- managing/administrative organization relationship
- 兼務/shared-administration relationship where public Evidence supports it
- related temples
- related shrines, including historical 神仏習合/別当 relationships when supportable
- related organizations

Personal clergy profiles are not a registry objective.

### Related Matsuri

- related festival name
- Relation type
- Relation validity/history where known
- concise current festival state only through an explicit cross-site projection contract
- link to the Matsuri specialist page

Matsuri remains source of truth for festival-specialist facts.

### Related cemetery / columbarium / memorial facilities

Where supportable:

- cemetery relation
- columbarium relation
- perpetual memorial / collective memorial relation
- tree-burial or other memorial-facility relation
- operating/managing entity
- relation start/end when known
- management transfer/change Events
- link to future Tomurai specialist entity when that site exists

Temple and cemetery entities must not be collapsed into one identity merely because the cemetery is attached to the temple.

### Cultural properties / designations

- designation name/type
- designating authority
- designation date/identifier where available
- designated object/entity
- current validity where supportable
- Source/Evidence

### Major structures

Only historically meaningful structures are represented, for example main hall, gate, pagoda, bell tower, cloister, cemetery facility, or columbarium where they matter to a change Event or designation. This is not an exhaustive architecture directory.

### Timeline

For each material Event:

- date/date range
- Event type
- title/summary
- before/after state when supportable
- affected entity/location
- Evidence and Source

### Focused change panels

Where applicable, provide structured detail for:

- relocation
- merger/integration
- dissolution / re-establishment
- sect/affiliation change
- head-temple / branch-temple relationship change
- disaster/destruction
- reconstruction
- administration/corporate changes
- cemetery/columbarium/memorial-facility changes

### Evidence and Sources

Evidence entries expose the supported claim/Event/Relation, Source title/publisher/type, publication date when known, access/verification date, and concise evidence summary. A deduplicated Source list appears at page end.

### Verification / corrections

- last verification date
- material-dimension verification dates where useful
- unsupported/unverified dimensions without invented values
- correction/information-submission route

Internal candidate/review-queue/confidence mechanics are not public fields.

### Machine-readable representation

The public machine layer must derive from the same canonical reviewed records as HTML and may expose:

- identity
- tier
- current state
- locations
- relations
- events
- selected evidence/source references
- verified_at / updated_at
- schema version

## Seed rule

For every Matsuri/Jinja/Tomurai-derived temple seed:

1. preserve originating Relation provenance;
2. perform specialist identity/dedupe review;
3. obtain a Jiin-acceptable authoritative identity Source;
4. populate only supportable temple fields;
5. classify against Jiin Tier A/B/C independently.

Missing State, sect, principal image, corporate status, or cemetery status is never inferred from another site's record.

## Activation order

Jiin follows Jinja as the next specialist implementation sequence unless a documented blocking dependency requires otherwise. Jiin planning and contract maintenance may proceed before Jinja publication, but `apps/jiin` must not be created merely because this specification exists.

The default sequence is:

1. pass and implement Jinja start/application gate;
2. validate one specialist-site extraction/publishing path through Jinja;
3. refresh Jiin seed/readiness inventory;
4. pass a Jiin-specific start gate;
5. create `apps/jiin` in a separate implementation PR;
6. keep Jiin publication separately gated.

## Activation boundary

Before Jiin gate passage there is:

- no `apps/jiin`
- no Jiin Worker
- no Jiin hostname/route
- no public Jiin record

The first Jiin application PR is separate and follows refreshed seed readiness, this specialist contract, explicit start authorization, and successful reuse/validation of the shared specialist-site implementation path. Tomurai remains inactive.