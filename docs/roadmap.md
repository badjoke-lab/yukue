# Project Roadmap

**Status:** Phase 9 completed / Phase 10 Detail C completed / prefecture seed baseline 47 / 47 completed / nationwide Matsuri scaling active / stabilization reviewing and incomplete

## Phase 0 through Phase 8

Foundation, reference documents, UI direction, data core, Public Projection, UI foundation, initial Matsuri surfaces, Search/Browse/machine-readable layer, and the initial corpus are completed.

## Phase 9 — Launch Preparation

Status: **Completed**

```text
F2-01 through F2-15 — completed
F2-P01 through F2-P13 — completed
F2-M01 and F2-M02 — completed
F2-16 through F2-28 — completed
```

The final launch gate passed at `2026-07-27T11:45:20Z`. F2-28 does not claim that any URL is indexed.

## Phase 10 — Matsuri Content Expansion and Stabilization

Status: **Active**

### Phase 10A — Detail C product completion

Status: **Completed**

The public contract remains enforced across real detail pages, bidirectional Relations, public Places, claim-linked Evidence, individual JSON, Pagefind, sitemap coverage, concrete or approved official-map behavior, Chromium navigation, and representative screenshots.

Contract:

```text
docs/matsuri-detail-c-implementation.md
```

### Phase 10B — Prefecture seed baseline

Status: **Completed, not national completion**

The Batch 43 checkpoint established at least one reviewed primary Matsuri record in all 47 prefectures.

```text
Primary prefecture presence  47 / 47
Public Entities              120
Places                       108
State Snapshots               56
Change Events                106
Relations                     70
Occurrences                  166
Sitemap entries              238
Sources                      318
Evidence                     699
```

This proves geographic representation under the original sampling rule. It does not prove nationwide corpus breadth, municipality coverage, or practical discovery coverage.

The earlier rule that 47 / 47 meant geographic breadth was no longer an expansion axis is superseded for nationwide-corpus planning.

### Phase 10C — Maintenance and stabilization

Status: **Active in parallel**

Continue:

- due and historical Occurrence closure using explicit Evidence;
- Change Events that explain state or format transitions;
- Relation density and provenance;
- claim-specific Evidence quality;
- stale-State and stale-link review;
- corrections and dated maintenance;
- Detail C, map, Search, and machine-readable regression maintenance.

Maintenance remains mandatory but is not the only product track.

### Phase 10D — Nationwide corpus scaling

Status: **Active**

Governing specification:

```text
docs/nationwide-corpus-scaling.md
```

The goal is to move from a high-quality initial corpus to national-scale coverage without publishing thin directory shells.

Key principles:

```text
thin discovery candidates          non-public only
new public primary records         substantive Basic Profile + Observation required
47 / 47 prefecture presence        seed baseline only
automation                         discovery/drafting/dedupe/provenance, not auto-approval
bulk public release                blocked until quality/depth machine gate exists
future-site seeds                  not specialist-site public records
```

Implementation gates:

```text
NCS-01  governing docs aligned
NCS-02  machine depth classifier and current baseline
NCS-03  national authoritative-source inventory
NCS-04  bulk candidate importer + deterministic dedupe
NCS-05  non-public bulk dry run
NCS-06  first public-quality pilot
NCS-07  500 cumulative public-quality primary Matsuri records
NCS-08  1,000 cumulative public-quality primary Matsuri records
NCS-09  source-inventory-derived national target
```

The 500 and 1,000 checkpoints are scale tests, not declarations of completeness.

The depth-preservation gate must prevent nationwide expansion from leaving the existing reviewed records as a small rich subset surrounded by permanently shallow new records.

### Parallel stabilization review

Status: **Reviewing / Incomplete**

```text
Started               2026-07-27
Minimum duration      14 days
Earliest review       2026-08-10
Review eligible       true
Current status        reviewing
Review complete       false
Machine record        config/matsuri-stabilization-review.json
```

The state model is `observing -> reviewing -> complete`. Elapsed time alone does not complete Phase 10.

Current owner-private review dimensions remain Cloudflare Web Analytics traffic receipt and Search Console observation. Their pending state does not authorize bypassing correctness gates and does not prohibit repository-only NCS preparation.

## Phase 11 — Portal and next-site gates

Status: **Deferred until stabilization evidence and explicit gate review exist**

```text
Matsuri stabilization review          incomplete
Portal/Jinja implementation order     undecided
Jinja State specification             unapproved
Explicit start authorization          absent
```

The current State-free Shrine candidate inventory is useful seed material but does not constitute a 神社のゆくえ corpus.

Before any future specialist site activates, it must also satisfy the series-wide nationwide-scaling contract:

- site-specific substantive public-record minimum;
- source inventory;
- candidate ingestion and dedupe path;
- machine-readable quality/depth metrics;
- public quality gate;
- initial corpus meeting that gate.

This applies to 神社のゆくえ, 寺院のゆくえ, and 弔いのゆくえ.
