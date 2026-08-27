# 神社のゆくえ — specialist contract

**Updated:** 2026-08-27

**Status:** repository implementation active / noncanonical workers.dev preview active / canonical activation pending

Issue: #284

This document defines the specialist data and projection contract for `神社のゆくえ`. Repository implementation and the noncanonical `workers.dev` preview are already authorized separately. This contract does **not** authorize a custom domain, canonical publication, Search submission, or indexability.

## Purpose

神社のゆくえ is a change/history registry, not a shrine directory or tourism guide. A detail page should answer:

- what shrine entity this is;
- where it is or was located when supportable;
- what current state is supportable;
- what changed over time;
- what other entities it relates to;
- what Evidence supports each material claim;
- when the record was verified or updated.

Matsuri Relations may seed research but never auto-promote a shrine into a public Jinja record.

## Identity contract

Where Evidence supports it, a shrine may carry:

- canonical name;
- reading;
- aliases and former names;
- stable specialist ID;
- current and former locations;
- official/authoritative links;
- enshrined deity information;
- religious-corporation relationships;
- comprehensive-organization relationships;
- related Matsuri;
- related shrine, temple, organization, designation, and place entities.

Unsupported values remain absent. Festival-level facts must not be projected onto the shrine without shrine-supporting Evidence.

## State model

One scalar status must not collapse independent concepts.

Continuity state vocabulary:

- `operating`
- `rebuilding`
- `relocated`
- `merged`
- `dissolved`
- `unknown`

The following remain separate Relations/events or state dimensions rather than being collapsed into the continuity state:

- 合祀;
- religious-corporation status;
- comprehensive-organization affiliation;
- administrative / 兼務 relationship;
- building condition;
- temporary access restriction;
- disaster damage.

A shrine may be operating while also having a historical 合祀 event or a rebuilding component.

No continuity state is inferred merely because an official website exists, an address is known, or a Matsuri record relates to the shrine.

## Event contract

Reviewed evidence-backed events may include:

- `founded`
- `relocated`
- `transferred` (遷座)
- `rebuilt`
- `destroyed`
- `damaged`
- `merged`
- `enshrined` (合祀)
- `split_or_reestablished`
- `administration_changed`
- `corporate_status_changed`
- `affiliation_changed`
- `designation_added`
- `designation_changed`
- `designation_removed`
- `related_festival_changed`
- `other_reviewed_change`

Each Event requires identity, a supportable date/date range, affected entity, summary, Evidence, and Source. Before/after values are recorded only when supportable.

## A/B/C publication contract

The A/B/C model applies independently to Jinja. Matsuri tier or Relation state does not determine Jinja tier.

### Tier A — Public Index

Minimum:

- reviewed canonical shrine identity/entity boundary;
- reviewed geographic scope;
- at least one approved official/public/otherwise authoritative shrine-identifying Source;
- source verification/access date;
- deterministic identity/dedupe check;
- publication timestamp;
- machine-visible Tier A classification.

A Matsuri Relation alone is insufficient.

Current State, Event, deity, corporation, coordinates, relations, and history are **not** Tier A requirements. Unsupported fields remain absent rather than guessed.

During the current stage, Tier A publication means publication to the authorized noncanonical `workers.dev` preview only. It is not a canonical-publication claim.

### Tier B — Public Verified

Adds applicable reviewed substantive profile Evidence, including where supportable:

- evidence-backed continuity state;
- current Place/location;
- official/authoritative links;
- deity fields;
- corporate, administrative, and affiliation fields;
- supported cross-entity Relations;
- at least one dated evidence-backed observation anchor.

Tier B does not require multi-year history.

### Tier C — Public History / Monitoring

Adds longitudinal depth and/or monitoring, such as:

- relocation / 遷座 history;
- reconstruction, destruction, or disaster history;
- merger / 合祀 history;
- administration/corporate/affiliation changes;
- designation history;
- related-festival history;
- freshness monitoring;
- multiple dated observations.

Tier C is continuous deepening, not a first-publication gate.

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

A section may be present with an explicit unverified/empty state when the projection needs to show the model boundary, but unsupported substantive values must not be fabricated for visual completeness.

## Shared UI / projection contract

Jinja uses the four-site shared implementation under `packages/ui` and follows Matsuri as the existing implementation reference.

Series parity includes more than colors and fonts. Comparison must cover:

- `PageShell`;
- site header and navigation;
- page/container widths;
- information hierarchy;
- list pages;
- detail pages;
- Evidence presentation;
- Place/Map presentation;
- timeline/change presentation;
- footer;
- spacing;
- desktop/mobile responsive behavior.

Jinja imports shared components through the `@badjoke-lab/yukue-ui` workspace package rather than bypassing the package boundary with direct relative imports into `packages/ui/src`.

PR #327 adds live public-URL parity auditing across representative Matsuri/Jinja page families at desktop and mobile sizes.

## Seed rule

For every Matsuri-derived shrine seed:

1. preserve originating Relation provenance;
2. perform specialist identity/dedupe review;
3. obtain a Jinja-acceptable authoritative identity Source;
4. populate only supportable shrine fields;
5. classify against Jinja A/B/C independently.

Missing State is never inferred from a festival's state.

## Portal ordering decision

Portal work does not block Jinja specialist implementation unless a concrete shared technical dependency is demonstrated. The Portal/Jinja ordering prerequisite is already recorded as decided in `config/jinja-start-gate.json`.

## Current activation boundary

Repository/local implementation is authorized by:

```text
config/jinja-implementation-gate.json
```

The noncanonical preview is authorized by:

```text
config/jinja-preview-deployment-gate.json
```

Current preview:

```text
https://jinja-yukue.badjoke-lab.workers.dev/
workers.dev only
noncanonical
noindex,nofollow
```

The later canonical/custom-domain gate remains governed by:

```text
config/jinja-start-gate.json
config/matsuri-stabilization-review.json
```

Do not activate before that gate passes:

- Jinja custom hostname/domain route;
- canonical publication;
- Search Console submission;
- indexability.

Jiin and Tomurai remain inactive and require their own specialist contracts and activation decisions.
