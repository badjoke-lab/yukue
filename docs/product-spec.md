# 祭のゆくえ — Product Specification

**Status:** Working specification

## Purpose

祭のゆくえ records festivals and folk performing arts as observable subjects rather than only as event listings or tourist attractions.

The MVP should let a visitor answer:

- What is this festival or performance?
- Where is it held or performed?
- When does it usually occur?
- What is its current state?
- When was it most recently held or performed?
- What changed over time?
- What organizations and places are related?
- What evidence supports the record?

## Primary capabilities

The MVP should provide Festival and Folk Performance detail pages, Organization pages where useful, Region browse, state-aware filtering, Change browse, full-text search, Occurrence history, Relation display, Designation display, Evidence and Source access, map-ready place information, official links, optional real-image galleries, and machine-readable public outputs.

## Product layers

### Basic Profile

Names, reading, alternate names, summary, description, type, kind, prefecture, municipality, usual timing, recurrence, main places, address, official links, optional official social links, and optional approved real images.

### Observation

Current state, verified-at date, occurrence history, change events, relations, designations, sources, and evidence.

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

## MVP non-goals

The MVP does not require nationwide completeness, real-time ingestion, user comments, ratings, paid API, MCP, x402 billing, a dynamic canonical database, complex graph visualization, Stats, or Compare.

Stats and Compare remain optional future capabilities; the record model should not block them.

## Quality gate

Before public launch, Current State and Occurrence must not be conflated, revival must be represented through change events and current state, evidence and relation integrity must pass, the Public Projection must not contain internal fields, HTML and public JSON must remain consistent, mobile reading and accessibility baseline must pass, and canonical URLs and sitemap must be validated.
