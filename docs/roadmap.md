# Project Roadmap

**Status:** Phase 9 completed / Phase 10 Detail C completed / prefecture seed baseline 47 / 47 completed / nationwide Matsuri public A/B/C scaling active / stabilization reviewing and incomplete

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

## Phase 10 — Matsuri Public Corpus Expansion and Stabilization

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

Maintenance remains mandatory but is not the only product track. Evidence-less `held`, `cancelled`, Current State, organizer, Place, Relation, or coordinates are never inferred merely to close maintenance work.

### Phase 10D — Nationwide public corpus scaling

Status: **Active**

Governing specification:

```text
docs/nationwide-corpus-scaling.md
```

The operating model is:

```text
Tier A  Public Index
  ↓ target: about 7 calendar days
Tier B  Public Verified
  ↓ continuous deepening
Tier C  Public History / Monitoring
```

Tier A creates national public discovery breadth. Tier B adds evidence-backed verification depth. Tier C adds longitudinal history and monitoring.

Key principles:

```text
private candidates                   not public coverage
reviewed Tier A                      public Index layer
completed Occurrence for Tier A      not required
Change Event for Tier A              not required
multi-year history for Tier A/B      not required
A→B target                           about 7 days
one overdue A stops expansion        false
valid A auto-withdraw after 7 days   false
automation                           discovery/drafting/dedupe/provenance, not unsupported-fact approval
future-site seeds                    not automatically future-site Tier A records
```

A source-backed Tier A record may be intentionally thin. Once identity, subject type, geography, authoritative source, source verification date, and deterministic identity/dedupe review satisfy the Tier A contract, it is public even if Tier B/C dimensions remain incomplete.

Implementation gates:

```text
NCS-01  governing specification / schedule alignment — completed
NCS-02  A/B/C classifier + current-corpus baseline — active in PR #270
NCS-03  national authoritative-source inventory — next
NCS-04  candidate + Tier A importer / deterministic identity-dedupe / publication-time pipeline
NCS-05  bulk dry run + Tier A publication-readiness audit
NCS-06  first bounded Tier A public wave + continuous A→B promotion
NCS-07  cumulative 500 public primary Matsuri records
NCS-08  cumulative 1,000 public primary Matsuri records
NCS-09  source-inventory-derived national target + continued A→B→C expansion
```

The 500 and 1,000 checkpoints count public specialist-primary records across Tier A/B/C. They do not count private candidates and are not declarations of nationwide completeness.

NCS-02 current measured baseline:

```text
Specialist primary records                  57
Tier A — Public Index                        19
Tier B — Public Verified                      8
Tier C — Public History / Monitoring         30
Below Tier A                                  0
```

The existing `37 / 57` multi-year completed-Occurrence measurement remains descriptive history depth only. It is not a publication floor or per-wave quota.

A→B overdue reporting is a work-priority mechanism. It must not become a repository-wide breadth stop or an automatic unpublish rule.

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

The series design remains:

```text
祭のゆくえ
神社のゆくえ
寺院のゆくえ
弔いのゆくえ
```

Only Matsuri is currently activated for implementation/publication work.

The public A→B→C operating principle is intended to scale across all four specialist sites, but each future site must define its own Tier A identity/source minimum and Tier B verification dimensions.

Matsuri Shrine/Temple Relation seeds or other cross-site reference seeds do not automatically become public Tier A records on a future specialist site.

Do not activate Jinja, Jiin, or Tomurai applications, hostnames, Workers, or public publication from the Matsuri nationwide-scaling track.
