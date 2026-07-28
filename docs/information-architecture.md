# Information Architecture

**Status:** Accepted and implemented direction

## Decision

The base IA is **Hybrid Observation**.

Accepted page-structure direction:

- Home: **H1 — Search First Hybrid**
- Entity detail: **C — Integrated Overview**

These choices define information order. The concrete Japanese presentation, route, Relation, Evidence, Place, embedded-map, and direct-JSON contract is defined in `matsuri-detail-c-implementation.md`.

## Header

Primary navigation:

```text
Festivals
Performances
Regions
Changes
Search
About
```

Secondary and footer navigation may include:

```text
Organizations
States
Methodology
Data
Updates
Status
Yukue Series
```

## Home — H1 Search First Hybrid

Required order:

```text
Hero + Search

Current Observation Snapshot

Recent Changes

Recent Occurrences

Explore
  Festivals
  Performances
  Regions

Methodology / Evidence

Data Access
```

Search answers direct intent. Snapshot explains what the dataset knows now. Changes show what changed. Occurrences show what actually happened recently. Explore supports browse behavior.

## Detail — C Integrated Overview

Required order:

```text
Identity

Primary Image [only when an approved image exists]

Integrated Overview
  Current State
  Verified at
  Latest Occurrence
  Usual Timing
  Recurrence
  Region
  Main Place(s)
  Official Information

About

Places & Map

Year by Year / Occurrence History

Change History

Connections / Relations

Gallery [only when multiple approved images exist]

Designations

Evidence & Sources

Record Updates [when public record metadata exists]

Machine-readable Data
```

The detail implementation must let a visitor move from the current record to related Organizations, Shrines or Temples, Festival or Folk Performance records, Places, specific Evidence, and the current record's individual JSON. A title-only or list-anchor destination is not a completed Detail C implementation.

## Primary detail surfaces

```text
festival
tradition_unit
folk_performance
organization
```

Shrine and Temple records may use minimal Matsuri seed-reference pages only. Those pages must not infer a Shrine or Temple Current State and do not activate a future specialist site.

## No-image behavior

Image-zero records must look intentional. Do not render placeholder images, empty hero frames, empty galleries, or generic festival imagery.

## Map behavior

A detail page with approved Place records must render an embedded map and an external map action for every Place. A Place list without an iframe is not a completed `Places & Map` section.

- single site: embedded point map + address,
- multiple point-like sites: embedded representative map + complete Place list + representative-map notice,
- route based: embedded area map + route context + related Places; a misleading single pin is prohibited,
- distributed: embedded area map + area explanation + complete Place list.

The map is a navigation aid. Approved Place, Evidence, and Source records remain the factual basis for location claims.

## Stats and Compare

Neither is required for MVP. The current data model should remain compatible with both.

## Governing implementation contract

The complete implementation and build-failure rules are defined in:

```text
docs/matsuri-detail-c-implementation.md
```
