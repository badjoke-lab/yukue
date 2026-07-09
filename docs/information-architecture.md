# Information Architecture

**Status:** Accepted direction for mockup and UI review

## Decision

The base IA is **Hybrid Observation**.

Accepted page-structure direction:

- Home: **H1 — Search First Hybrid**
- Entity detail: **C — Integrated Overview**

These choices define information order, not final visual design.

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

Recommended order:

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

Recommended order:

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

Machine-readable Data
```

## No-image behavior

Image-zero records must look intentional. Do not render placeholder images, empty hero frames, empty galleries, or generic festival imagery.

## Map behavior

- single site: map + address
- multiple sites: representative map + place list
- route based: route context and related places; avoid a misleading single pin
- distributed: area explanation, optionally area-level map

## Stats and Compare

Neither is required for MVP. The current data model should remain compatible with both.

## Remaining visual questions

Typography, density, color and accent system, desktop grid, card/table balance, map treatment, timeline treatment, state presentation, evidence presentation, and image gallery/lightbox style will be decided through visual mockup review.
