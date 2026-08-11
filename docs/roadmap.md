# Project Roadmap

**Status:** Phase 9 completed / Phase 10 Detail C completed / Matsuri corpus expansion active / stabilization review eligible and observing

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

### Phase 10B — Corpus expansion

Status: **Active**

Current verified checkpoint after Batch 42:

```text
Primary prefecture coverage  46 / 47
Public Entities              118
Places                       106
State Snapshots               55
Change Events                105
Relations                     69
Occurrences                  164
Sitemap entries              234
Sources                      311
Evidence                     687
Sparse primary Entities        0
```

Batch 42 added the first approved primary record for 和歌山県 through 和歌祭. The Festival is linked to 紀州東照宮 through an evidence-backed ritual Relation, records the annual second-Sunday-of-May recurrence, preserves the Shrine anchor and distributed 和歌浦 route as separate Places, records the 2026 edition as `held / unknown`, and adds the year-level 1622 first-edition/start Change Event.

Exact canonical-production verification passed for release:

```text
d36797b2980ef9d639bfa7ee0a152a287a223d3a
```

The next breadth target is the sole remaining uncovered prefecture:

```text
宮崎県
```

Once reviewed primary-prefecture coverage reaches 47 / 47, future corpus expansion should become depth-first rather than continuing to optimize for geographic breadth. Priority dimensions are Occurrence history, Change Events, Relation density, Evidence quality, stale-State review, and dated maintenance.

### Parallel stabilization review

Status: **Review eligible / Observing**

```text
Started               2026-07-27
Minimum duration      14 days
Earliest review       2026-08-10
Review eligible       true
Review complete       false
Machine record        config/matsuri-stabilization-review.json
```

Elapsed time alone does not complete Phase 10. The formal review must record production availability, deployment behavior, canonical/HTTPS behavior, Search, crawler/sitemap behavior, Analytics traffic receipt, freshness, Relations, Evidence/corrections, map-contract maintenance, manual maintenance burden, and Search Console observation.

Batch 42 adds two maintenance/modeling lessons: a State-free Shrine seed can strengthen Matsuri Relations without authorizing Jinja State inference, and a narrowly identified third-party Google Maps console transport error can be classified without weakening the zero-tolerance rule for first-party application errors.

The review may be performed, but it cannot be marked complete from the calendar alone or by inferring private Analytics/Search Console observations.

## Phase 11 — Portal and next-site gates

Status: **Deferred until stabilization evidence and explicit gate review exist**

```text
Matsuri stabilization review          incomplete
Portal/Jinja implementation order     undecided
Jinja State specification             unapproved
Explicit start authorization          absent
```

The current candidate inventory is 25 Relation-backed Shrine seeds and zero approved Jinja State Snapshots. Seed accumulation does not activate the next site.
