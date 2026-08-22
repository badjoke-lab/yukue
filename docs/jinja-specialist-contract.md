# 神社のゆくえ — specialist pre-activation contract

Status: pre-activation specification
Issue: #284

This document defines the specialist contract that must exist before `apps/jinja` is created. It does not activate Jinja, create a Worker/hostname/route, or publish shrine records.

## Purpose

神社のゆくえ is a change/history registry, not a shrine directory or tourism guide. A detail page answers: what shrine entity this is; what current state is supportable; what changed and what it relates to; and what Evidence supports material claims.

Matsuri Relations may seed research but never auto-promote a shrine into a public Jinja record.

## Identity contract

Where Evidence supports it, a shrine may carry canonical name, reading, aliases, former names, stable specialist ID, current/former locations, official/authoritative links, enshrined deity information, religious-corporation and comprehensive-organization relationships, related Matsuri, and related shrine/temple/organization/designation/place entities. Unsupported values remain absent. Festival-level facts must not be projected onto the shrine without shrine-supporting Evidence.

## State model

One scalar status must not collapse independent concepts.

Continuity state vocabulary:
- `operating`
- `rebuilding`
- `relocated`
- `merged`
- `dissolved`
- `unknown`

The following remain separate Relations/events or state dimensions: 合祀, religious-corporation status, comprehensive-organization affiliation, administrative/兼務 relationship, building condition, temporary access restriction, and disaster damage. A shrine may be operating while also having a historical 合祀 event or rebuilding component.

## Event contract

Reviewed evidence-backed events may include `founded`, `relocated`, `transferred` (遷座), `rebuilt`, `destroyed`, `damaged`, `merged`, `enshrined` (合祀), `split_or_reestablished`, `administration_changed`, `corporate_status_changed`, `affiliation_changed`, `designation_added`, `designation_changed`, `designation_removed`, `related_festival_changed`, and `other_reviewed_change`.

Each Event requires identity, supported date/date range, affected entity, summary, Evidence and Source. Before/after values are recorded only when supportable.

## A/B/C publication contract

### Tier A — Public Index
Minimum: reviewed canonical shrine identity/entity boundary; reviewed geographic scope; at least one approved official/public/otherwise authoritative shrine-identifying Source; source verification/access date; deterministic identity/dedupe check; publication timestamp; machine-visible Tier A classification. A Matsuri Relation alone is insufficient. Current State, Event, deity, corporation, coordinates and history are not Tier A requirements.

### Tier B — Public Verified
Adds applicable reviewed substantive profile Evidence, evidence-backed continuity state when supportable, current Place/location, official/authoritative links, supported deity/corporate/administrative/affiliation fields, supported cross-entity Relations, and at least one dated evidence-backed observation anchor.

### Tier C — Public History / Monitoring
Adds longitudinal relocation/遷座, reconstruction/destruction/disaster, merger/合祀, administration/corporate/affiliation, designation and related-festival history, freshness monitoring, or multiple dated observations. Tier C is continuous deepening, not a first-publication gate.

## Detail-page projection

When data exists, the public detail projection supports:

- header: canonical name, reading, aliases/former names, entity ID, current continuity state, prefecture/municipality, verified/updated dates, official links;
- current state: state, since date if supportable, verification date, evidence-backed basis and Evidence;
- location: current address/location, reviewed coordinates/map projection, former locations and relocation/遷座 history;
- profile: founding period/date, enshrined deity/deities, former rank/classification where relevant, religious-corporation and comprehensive-organization relationships;
- administration/relationships: management/兼務 relationships, related shrines, temples including historical 神仏習合/別当 relations, and organizations; personal clergy profiles are not a registry objective;
- related Matsuri: festival, Relation type/history and specialist link; Matsuri remains source of truth for festival-specialist facts;
- cultural properties/designations: name/type, authority, date/identifier, designated object, validity and Evidence;
- major structures only where historically meaningful to an Event or designation;
- timeline: date, Event type, summary, supportable before/after values, affected entity/location, Evidence/Source;
- focused panels for relocation/遷座, merger/integration, 合祀, disaster/destruction, reconstruction, administration/corporate changes;
- Evidence and deduplicated Sources;
- verification dates and correction/information-submission route;
- machine-readable identity, tier, state, locations, relations, events, selected evidence/source refs, timestamps and schema version.

Internal candidate/review-queue/confidence mechanics are not public fields.

## Seed rule

For every Matsuri-derived shrine seed: preserve originating Relation provenance; perform specialist identity/dedupe review; obtain a Jinja-acceptable authoritative identity Source; populate only supportable shrine fields; classify against Jinja A/B/C independently. Missing State is never inferred from a festival's state.

## Portal ordering decision

Portal work does not block Jinja specialist implementation unless a concrete shared technical dependency is demonstrated. Jinja may begin after its start gate passes while Portal work proceeds independently.

## Activation boundary

Before gate passage there is no `apps/jinja`, Jinja Worker, hostname/route, or public Jinja record. The first application PR is separate and follows Matsuri stabilization completion, refreshed seed readiness, this specialist contract, and explicit start authorization. Jiin and Tomurai remain inactive.