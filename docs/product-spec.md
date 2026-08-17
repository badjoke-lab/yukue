# 祭のゆくえ — Product Specification

**Status:** Working specification

## Purpose

祭のゆくえ records festivals and folk performing arts as observable subjects rather than only as event listings or tourist attractions.

The product should let a visitor answer:

- What is this festival or performance?
- Where is it held or performed?
- When does it usually occur?
- What is its current state?
- When was it most recently held or performed?
- What changed over time?
- What organizations and places are related?
- What evidence supports the record?

It must also become useful as a national discovery layer. A visitor should have a reasonable chance of finding a real subject outside the initial reviewed sample without the product degrading into a name/location/link directory.

## Primary capabilities

The product provides Festival and Folk Performance detail pages, Organization pages where useful, Region browse, state-aware filtering, Change browse, full-text search, Occurrence history, Relation display, Designation display, Evidence and Source access, map-ready place information, official links, optional real-image galleries, and machine-readable public outputs.

## Product layers

### Basic Profile

Names, reading, alternate names, summary, description, type, kind, prefecture, municipality, usual timing, recurrence, main places, address, official links, optional official social links, and optional approved real images.

### Observation

Current state, verified-at date, occurrence history, change events, relations, designations, sources, and evidence.

A new public primary record is not considered product-complete merely because its Basic Profile can be generated. Public publication requires the substantive Basic Profile + Observation minimum in `nationwide-corpus-scaling.md`.

## Public corpus quality contract

Thin index-only records are not a public product tier.

Bulk discovery may create non-public candidates, but a new public primary Festival or Folk Performance must include reviewed identity/profile coverage, evidence-bounded Current State, **at least one evidence-backed completed dated Occurrence**, and **at least one evidence-backed Change Event**, together with the remaining minimum fields and checks defined in:

```text
docs/nationwide-corpus-scaling.md
```

A Change Event is not a substitute for completed Occurrence history for a newly published primary Matsuri record.

The existing reviewed corpus must not become a permanently richer legacy subset while new records remain shallow.

The NCS-02 measured reference is 52 / 57 existing specialist-primary records with at least one completed Occurrence year and 37 / 57 with at least two completed Occurrence years. NCS-06-or-later release trains must preserve the measured multi-year history floor defined in `nationwide-corpus-scaling.md`; at least `ceil(new_public_primary_records * 37 / 57)` of newly published primary records must meet the two-distinct-year history criterion.

Before bulk public expansion, machine-readable depth metrics and the remaining release guard must exist. National breadth and historical/observation depth are reported separately and must be advanced together.

## User journeys

### Search to current state

```text
Search result
→ Entity detail
→ Current State
→ Verified at
→ Latest Occurrence
→ Evidence
```

### General information

```text
Entity detail
→ Description
→ Usual timing
→ Place and address
→ Map
→ Official information
```

### Historical investigation

```text
Entity detail
→ Year by Year
→ Change History
→ Evidence
```

### Relation discovery

```text
Festival
→ Related Performance
→ Related Shrine or Temple
→ Organization
```

## Nationwide coverage direction

Nationwide completeness was not required for the initial launch MVP. That launch constraint is not the long-term corpus strategy.

Post-launch Matsuri development explicitly requires national-scale public-quality coverage. 47 / 47 prefecture presence is only a geographic seed baseline.

Scaling checkpoints and final coverage targets are governed by `nationwide-corpus-scaling.md` and the authoritative source inventory. Round-number checkpoints such as 500 and 1,000 records are scale tests, not claims of national completeness.

## MVP non-goals

The initial launch MVP did not require real-time ingestion, user comments, ratings, paid API, MCP, x402 billing, a dynamic canonical database, complex graph visualization, Stats, or Compare.

Stats and Compare remain optional future capabilities; the record model should not block them.

## Quality gate

Before public launch or bulk public expansion, Current State and Occurrence must not be conflated, revival must be represented through change events and current state, evidence and relation integrity must pass, the Public Projection must not contain internal fields, HTML and public JSON must remain consistent, mobile reading and accessibility baseline must pass, and canonical URLs and sitemap must be validated.

For nationwide expansion, the additional public-record, measured history-depth, and depth-preservation gates in `nationwide-corpus-scaling.md` are mandatory.
