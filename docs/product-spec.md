# 祭のゆくえ — Product Specification

**Status:** Working specification

**Canonical public origin:** https://matsuri-yukue.badjoke-lab.com

## Purpose

祭のゆくえ records festivals and folk performing arts as observable subjects rather than only as event listings or tourist attractions.

The product should let a visitor answer:

- What is this festival or performance?
- Where is it held or performed?
- When does it usually occur?
- What is its current state when that state is evidence-backed?
- What historical Occurrences or changes are documented?
- What organizations and places are related when the relation is supported?
- What evidence supports each claim?

It must also become useful as a national discovery layer. National breadth and research depth are developed in parallel through the public A/B/C model in `docs/nationwide-corpus-scaling.md`.

## Primary capabilities

The product provides Festival and Folk Performance detail pages, Organization pages where useful, Region browse, state-aware filtering, Change browse, full-text search, Occurrence history, Relation display, Designation display, Evidence and Source access, map-ready place information when supported, official/authoritative links, optional approved real-image galleries, and machine-readable public outputs.

## Public corpus model

### Tier A — Public Index

Tier A is a public product tier and the national discovery layer.

A Matsuri Tier A primary record requires the reviewed minimum defined in `docs/nationwide-corpus-scaling.md`, including:

- canonical identity and subject type;
- prefecture plus municipality where municipality-bounded, or an appropriate broader geographic scope;
- at least one approved official, official-organization, public-authority, or otherwise approved authoritative source;
- source verification/access date;
- deterministic identity / duplicate checking;
- machine-visible Tier A classification and publication timestamp for newly published Tier A records.

A reviewed name + geography + authoritative source is intentionally publishable as Tier A.

Tier A may appear in detail pages, browse/search, public JSON, sitemap, and search-engine discovery surfaces. Missing Tier B/C dimensions do not make a valid Tier A private.

Tier A must not invent or imply unsupported Current State, held/cancelled outcome, organizer, Place, Relation, coordinates, history, or officiality.

### Tier B — Public Verified

Tier B adds reviewed verification depth to Tier A.

Applicable dimensions include:

- substantive Japanese summary / description;
- approved Current State Snapshot with claim-linked Evidence;
- Place, route, multi-place, or distributed-place handling where supportable;
- organizer / responsible organization where supportable;
- relevant Shrine / Temple / Organization Relations where actually supported;
- timing / recurrence where supportable;
- direct profile / identity Evidence;
- authoritative external-link review;
- at least one evidence-backed dated observation anchor.

The dated anchor may be an Occurrence, including a properly evidenced current scheduled edition, or a Change Event.

Tier B does **not** require completed multi-year history.

### Tier C — Public History / Monitoring

Tier C is the longitudinal layer. It adds meaningful history or monitoring beyond Tier B, such as:

- multiple dated Occurrences across years;
- cancellation, postponement, partial-held, revival, or format-change history;
- meaningful Change Events;
- governance or venue change history;
- active freshness monitoring;
- richer Relation history where supported.

Tier C is continuously deepened and is not a prerequisite for Tier A or Tier B publication.

## Tier A → B target

New Tier A records are targeted for Tier B promotion in about seven calendar days.

This is an operational target, not a global release gate:

- due/overdue Tier A is reported and prioritized;
- unrelated valid Tier A publication continues;
- a difficult overdue record does not freeze nationwide expansion;
- a valid Tier A record is not automatically withdrawn merely because seven days elapsed;
- missing Evidence is never replaced by inference merely to meet the target.

If Tier B cannot yet be established, the record remains public as Tier A with machine-visible missing dimensions while research continues.

## Existing corpus baseline

The NCS-02 A/B/C classifier measured the current 57 specialist-primary records as:

```text
Tier A — Public Index                  19
Tier B — Public Verified                8
Tier C — Public History / Monitoring   30
Below Tier A                            0
Public specialist-primary total        57
```

Historical measurements such as 52 / 57 records with completed Occurrence history and 37 / 57 with multi-year completed Occurrence history describe the existing corpus. They are **not** minimum publication ratios for new Tier A or Tier B records.

## User journeys

### National discovery

```text
Search / region browse
→ Tier A/B/C detail
→ authoritative source
→ available verified dimensions
```

### Search to current state

```text
Search result
→ Entity detail
→ Current State when evidence-backed
→ Verified at
→ Evidence
```

### Historical investigation

```text
Entity detail
→ Occurrence history
→ Change History
→ Evidence
```

### Relation discovery

```text
Festival
→ supported Related Performance / Shrine / Temple / Organization relation
→ relation Evidence
```

## Nationwide coverage direction

Nationwide completeness was not required for the initial launch MVP. That launch constraint is not the long-term corpus strategy.

47 / 47 prefecture presence is only a geographic seed baseline. The post-launch target is national-scale **public** A/B/C coverage.

The NCS checkpoints are:

```text
NCS-03  national authoritative-source inventory
NCS-04  candidate + Tier A importer / identity-dedupe pipeline
NCS-05  bulk dry run + Tier A publication-readiness audit
NCS-06  first bounded Tier A public wave + continuous A→B promotion
NCS-07  cumulative 500 public primary Matsuri records
NCS-08  cumulative 1,000 public primary Matsuri records
NCS-09  source-inventory-derived national target + continued A→B→C expansion
```

500 and 1,000 mean public primary records across Tier A/B/C, not private candidate counts.

## Candidate boundary

A private candidate stage may exist for parsing, source normalization, identity review, and dedupe before Tier A.

Candidates do not count as public coverage and do not become public merely because they were discovered. Once the Tier A minimum is reviewed and satisfied, however, the record is intentionally public even if Tier B/C research remains incomplete.

## Future-site boundary

The same public A→B→C operating model is intended for 神社のゆくえ, 寺院のゆくえ, and 弔いのゆくえ, with site-specific Tier A and Tier B dimensions.

Matsuri Relations or future-site seeds do not automatically become Tier A records on another specialist site. Each future site must satisfy its own Tier A identity/source minimum before public activation.

No Jinja, Jiin, or Tomurai public implementation is authorized by this Matsuri specification.

## MVP non-goals

The initial launch MVP did not require real-time ingestion, user comments, ratings, paid API, MCP, x402 billing, a dynamic canonical database, complex graph visualization, Stats, or Compare.

Stats and Compare remain optional future capabilities; the record model should not block them.

## Quality gate

Public data must preserve these boundaries:

- Current State and Occurrence are not conflated;
- elapsed dates do not prove `held`;
- cancellation is not inferred from silence;
- Relations, organizers, Places, and coordinates are not inferred without Evidence;
- Public Projection contains no internal-only fields;
- visible HTML and public machine-readable outputs agree;
- canonical URLs, sitemap, mobile reading, and accessibility remain validated;
- machine classification never auto-approves unsupported facts or promotion.

Nationwide scaling quality is maintained by explicit A/B/C classification, missing-dimension reporting, source provenance, identity/dedupe checks, A→B prioritization, and ongoing Tier C deepening — not by requiring every record to be Tier B/C before it can enter the public Index.
