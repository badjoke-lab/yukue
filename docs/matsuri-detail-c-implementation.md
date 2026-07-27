# Matsuri Detail C Implementation

**Status:** Required implementation contract

## Purpose

This document is the concrete implementation contract for the already accepted `Detail C — Integrated Overview` information architecture. It does not replace `information-architecture.md`; it defines how that accepted order is presented in Japanese, how records link to one another, and what the build must reject.

The detail page must not be a vertical dump of JSON fields. A visitor must be able to understand and follow:

```text
現在
変化
関係
根拠
```

## Page order

Festival and Folk Performance pages use this order:

```text
Breadcrumb

Identity
  title
  reading and alternate identity context when available
  record type
  region
  short summary
  official information action
  direct public JSON action
  correction action

Primary Image
  only when an approved image exists

Integrated Overview
  Current State
  Verified at
  Latest Occurrence
  Usual Timing
  Recurrence
  Region
  Main Place(s)
  Official Information
  concise explanation of what is currently confirmed
  direct Evidence action when available

About

Places & Map
  place role
  address or area context
  public Place detail action

Year by Year / Occurrence History
  scheduled and completed outcomes remain distinct
  cancellation, postponement, reduced scale, and unknown outcomes remain explicit

Change History
  only actual Change Events
  Evidence action per event when available

Connections / Relations
  operating and preservation organizations
  related shrines and temples
  related festivals and folk performances
  other approved relations

Gallery
  only when multiple approved images exist

Designations

Evidence & Sources
  claim target
  source title or publisher
  what the source supports
  source access action

Record Updates
  public record creation and material record revision metadata

Machine-readable Data
  direct JSON for the current record
```

Organization pages use the same shared structure but omit sections for which no approved public record exists. They must still expose approved Relations in both directions and direct public JSON.

## Empty-section rule

A section with no approved public content is omitted. The detail page must not render a sequence of empty tables or decorative placeholders. Image sections are omitted when no approved image exists.

## Navigation rule

The following public types require stable, navigable detail routes:

```text
festival          /festivals/<slug>/
tradition_unit    /festivals/<slug>/
folk_performance  /performances/<slug>/
organization      /organizations/<slug>/
```

Every title for one of these records in Festival, Performance, Organization, State, Change, home, search, Occurrence, and Relation contexts must link to its real detail route. A list anchor is not a substitute for a detail page.

Public Places used by a detail page require:

```text
/places/<stable-place-key>/
```

The Place page shows location context, reverse links to related records, available location Evidence, and direct Place JSON.

## Shrine and Temple seed boundary

Shrine and Temple records may have minimal Matsuri reference pages only at:

```text
/references/shrines/<slug>/
/references/temples/<slug>/
```

These pages may show:

- identity,
- location,
- official information,
- approved Relations to Matsuri records,
- Relation and identity Evidence,
- direct public JSON,
- an explicit scope notice.

They must not claim or infer Shrine or Temple Current State, management state, legal-person state, continuity, closure, merger, or any Jinja/Jiin-specific State. These reference pages do not activate a future specialist site.

## Relation presentation

Each approved Relation row must contain:

```text
understandable Japanese relation label
target record name
real target action
optional validity period
specific Evidence action when available
```

Internal relation codes are not primary UI labels. A name rendered without a navigable target is a contract failure when the target has a public detail or seed-reference route.

## Evidence presentation

Evidence is not a detached URL list. Each Evidence row identifies:

```text
what claim it supports
which source supports it
how it supports the claim
where the source can be opened
```

Current State, Change Event, Relation, Designation, Occurrence, identity, and location claims link to the corresponding Evidence row when such Evidence exists.

## Machine-readable record routes

Every public Entity detail route has a corresponding JSON record:

```text
/data/records/<kind>/<slug>.json
```

Every public Place detail route has:

```text
/data/places/<slug>.json
```

The HTML action must open the JSON for that record, not only a general data-information page.

## Visible-language rule

Do not expose these as primary visible labels:

```text
entity_type
record_lifecycle
review_status
UUID or internal record ID
Relation ID
Source ID
raw State, Change Event, outcome, scale, or Relation codes
```

Internal values are translated into understandable public labels.

## Build enforcement

The build fails when:

- a primary public Entity lacks a detail route,
- an Entity detail lacks its individual JSON,
- a browse title is plain text instead of a real detail link,
- an approved Relation is absent from either available endpoint page,
- a Relation row lacks a target link,
- a Place name links to no Place page,
- a direct JSON action points to no generated JSON file,
- a Shrine or Temple reference page contains a Current State claim,
- an internal code or identifier is exposed as a primary UI label,
- the old one-record-only Detail implementation returns.

## Relationship to accepted specifications

This contract implements, without replacing:

```text
docs/information-architecture.md
docs/ui-foundation-spec.md
docs/matsuri-mvp-spec.md
docs/product-spec.md
```
