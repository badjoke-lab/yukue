# Project Roadmap

**Status:** Phase 9 completed / Phase 10 Detail C completed / prefecture breadth 47 / 47 completed / depth-first Matsuri maintenance active / stabilization reviewing and incomplete

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

### Phase 10B — Prefecture breadth

Status: **Completed**

Verified checkpoint after Batch 43:

```text
Primary prefecture coverage  47 / 47
Public Entities              120
Places                       108
State Snapshots               56
Change Events                106
Relations                     70
Occurrences                  166
Sitemap entries              238
Sources                      318
Evidence                     699
Prefecture gaps                0
Sparse primary Entities        0
```

Batch 43 added the first approved primary record for 宮崎県 through 宮﨑神宮大祭（神武さま）. The Festival is linked to 宮﨑神宮 through an evidence-backed ritual Relation, records the annual例祭/御神幸 recurrence, preserves the Shrine anchor and distributed procession route as separate Places, records the 2024 edition as `held / modified`, keeps the future 2026 edition as `scheduled / unknown`, and adds the year-level c.1909 current-form establishment Change Event.

Exact canonical-production verification passed for release:

```text
3604d984c71bb71f3b66245b87fa869a64ec85b3
```

All 47 prefectures now have at least one reviewed primary Matsuri record under the current corpus-coverage rule. Geographic breadth is therefore no longer the default expansion axis.

### Phase 10C — Depth-first maintenance

Status: **Active**

Subsequent Matsuri work should prioritize:

- due and historical Occurrence closure using explicit Evidence;
- Change Events that explain state or format transitions;
- Relation density and provenance;
- claim-specific Evidence quality;
- stale-State and stale-link review;
- corrections and dated maintenance;
- Detail C, map, Search, and machine-readable regression maintenance.

New primary Entities remain allowed when they add substantive coverage, but raw Entity-count growth is not a target.

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

Repository/public review inputs already recorded cover production availability, canonical/HTTPS behavior, canonical Search, crawler/sitemap behavior, freshness, Relation coverage, Evidence/corrections, and manual maintenance burden.

Current public-safe review observations are:

```text
Known unresolved critical corrections   0
Production deployment failures           1
Manual maintenance burden                acceptable
```

The maintenance classification is deliberately `acceptable`, not `low`: the stabilization period required real corrective work, but fixes remained bounded and followed normal repository contracts and gates without correctness-gate bypass or untracked production-data mutation.

The remaining review dimensions require current private observation:

```text
Cloudflare Web Analytics traffic receipt   pending
Search Console observation                 pending
```

Search-engine indexation itself remains outside the completion requirement. Historical F2-27 traffic and F2-24 Search Console evidence are not automatically reused as current stabilization observations.

Batch 43 continues to preserve the future-site boundary: a State-free Shrine seed can strengthen Matsuri identity, Place, history, and ritual Relations without authorizing Jinja State inference. The future 2026 宮﨑神宮大祭 edition also remains `scheduled / unknown` until post-event Evidence supports another outcome.

## Phase 11 — Portal and next-site gates

Status: **Deferred until stabilization evidence and explicit gate review exist**

```text
Matsuri stabilization review          incomplete
Portal/Jinja implementation order     undecided
Jinja State specification             unapproved
Explicit start authorization          absent
```

The current candidate inventory is 26 Relation-backed Shrine seeds and zero approved Jinja State Snapshots. Seed accumulation and 47 / 47 Matsuri prefecture breadth do not activate the next site.
