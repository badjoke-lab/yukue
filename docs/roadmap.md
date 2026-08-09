# Project Roadmap

**Status:** Phase 9 completed / Phase 10 Detail C completed / Matsuri corpus expansion active / stabilization observing

## Phase 0 through Phase 8

Foundation, reference documents, UI direction, data core, Public Projection, UI foundation, initial Matsuri surfaces, Search/Browse/machine-readable layer, and the initial corpus are completed.

The post-launch Detail C review established that Entity, Relation, Evidence, State, Place, and map structures must be navigable and understandable in the public product, not merely present internally.

## Phase 9 — Launch Preparation

Status: **Completed**

```text
F2-01 through F2-15 — completed
F2-P01 through F2-P13 — completed
F2-M01 and F2-M02 — completed
F2-16 through F2-28 — completed
```

The final launch gate passed at `2026-07-27T11:45:20Z` after repository, canonical-origin, Search, crawler, indexability-preflight, Analytics, baseline, privacy, and Jinja-guardrail verification.

F2-28 does not claim that any URL is indexed.

## Phase 10 — Matsuri Content Expansion and Stabilization

Status: **Active**

### Phase 10A — Detail C product completion

Status: **Completed**

The accepted Detail C specification is enforced as a product contract:

- every primary Matsuri Entity has a real detail page;
- every title in browse and search contexts opens a real detail;
- approved Relations are understandable and navigable in both directions;
- Places have public pages and reverse record links;
- Evidence identifies the claim it supports;
- every detail has individual public JSON;
- Shrine and Temple seed references remain State-free;
- public map behavior requires a concrete anchor or an approved official map where required;
- sitemap, static checks, Chromium navigation, and representative screenshots cover the expanded surface.

Contract:

```text
docs/matsuri-detail-c-implementation.md
```

### Phase 10B — Corpus expansion

Status: **Active**

The current priority remains to increase both breadth and depth:

- broader regional coverage;
- more non-trivial Current States;
- more Year-by-Year Occurrences;
- more actual Change Events;
- deeper Organization and Place context;
- useful Shrine and Temple Relations;
- claim-level Evidence and Source coverage;
- real correction, freshness, and map-contract maintenance cycles.

A larger list alone is not the target. The archive must explain what a record is, what is happening now, what changed, what it is related to, where it occurs, and why the record is trusted.

Current verified checkpoint after Batch 34:

```text
Primary prefecture coverage  38 / 47
Public Entities              102
Places                        94
State Snapshots               47
Change Events                 96
Relations                     61
Occurrences                  155
Sitemap entries              206
Sources                      264
Evidence                     603
Sparse primary Entities        0
```

Batch 34 added the first approved primary record for 鹿児島県 through おはら祭. It also produced a real map-contract maintenance case: municipality-level Place precision was rejected, no coordinates were invented, and reviewed official venue-map context was added through the existing approved mechanism. The final implementation then passed Detail C, visual, repository, and exact canonical-production verification.

The next breadth target is one reviewed primary Entity from the remaining nine uncovered prefectures:

```text
群馬県
新潟県
長野県
大阪府
兵庫県
和歌山県
鳥取県
山口県
宮崎県
```

The next depth target is a due 2026 Occurrence or an existing low-density primary record that can be strengthened with claim-specific Evidence.

### Parallel stabilization review

Status: **Observing**

```text
Started               2026-07-27
Minimum duration      14 days
Earliest review       2026-08-10
Machine record        config/matsuri-stabilization-review.json
```

Observe and record production availability, deployment failures, canonical and HTTPS behavior, Search, crawler and sitemap behavior, Search Console, Analytics receipt, freshness, Relation and Evidence work, corrections, map-contract maintenance, and maintenance burden.

Elapsed time alone does not complete Phase 10. Maintenance burden must be based on real expansion and maintenance work. Search-engine indexation is observed but is not required.

Batch 34 adds a further real maintenance case to the stabilization evidence set: the public map contract rejected an insufficient Place representation and was satisfied by reviewed official map context without weakening the gate or fabricating coordinates.

## Phase 11 — Portal and next-site gates

Status: **Deferred until corpus, stabilization evidence, and explicit gate review exist**

F2-28 and Detail C completion do not authorize the portal or Jinja. Remaining Jinja prerequisites are:

```text
Matsuri stabilization review          incomplete
Portal/Jinja implementation order     undecided
Jinja State specification             unapproved
Explicit start authorization          absent
```

The current candidate inventory contains 23 Relation-backed Shrine seeds and zero approved Jinja State Snapshots. Batch 34 adds no Shrine or Temple seed. Seed accumulation does not itself activate the next site.

Before starting the next specialist site, review Matsuri corpus usefulness, maintenance burden, shared-package reuse, cross-site seed quality, Relation value, update pace, and external demand.
