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

The map exists to answer **where the ritual, festival, or performance is actually based or primarily held**. A municipality map, city-center map, or route-area map that does not identify that base is not a completed `Places & Map` implementation.

Map-anchor priority:

1. an Evidence-backed Shrine or Temple that is the ritual base, dedication site, or principal venue,
2. an Evidence-backed festival ground or principal performance venue,
3. another concrete official main venue such as a park,
4. only after the anchor is shown, supporting Places such as procession routes, distributed areas, secondary venues, and community areas.

Rules:

- a Shrine festival or Temple event must map the relevant Shrine or Temple when that relation and Place are approved,
- route and distributed Place records never replace an available ritual or main-venue anchor,
- multiple concrete venues remain listed; the embedded map uses the reviewed primary anchor instead of the first arbitrary Place,
- route, community-area, and municipality-only rows do not receive point-map actions,
- when no concrete ritual or main-venue anchor is present, the page must state that the location data is incomplete rather than display a decorative city map,
- an unavailable map is a corpus gap to research and resolve, not a completed location result,
- the map is a navigation aid; approved Place, Relation, Evidence, and Source records remain the factual basis for location claims.

## Stats and Compare

Neither is required for MVP. The current data model should remain compatible with both.

## Governing implementation contract

The complete implementation and build-failure rules are defined in:

```text
docs/matsuri-detail-c-implementation.md
```
