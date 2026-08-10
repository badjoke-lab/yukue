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

Current verified checkpoint after Batch 39:

```text
Primary prefecture coverage  43 / 47
Public Entities              112
Places                       101
State Snapshots               52
Change Events                102
Relations                     66
Occurrences                  161
Sitemap entries              223
Sources                      291
Evidence                     654
Sparse primary Entities        0
```

Batch 39 added the first approved primary record for 長野県 through 長野びんずる. The Festival is linked to 長野びんずる実行委員会, records the reviewed first-Saturday-of-August recurrence, preserves the center-city area as a route Place, records the 2025 edition as `held / unknown`, and adds the year-level 1971 first-edition/start Change Event. The official-map contract uses reviewed route guidance rather than invented coordinates. The 2026 schedule is not promoted to a held Occurrence without post-event Evidence.

Exact canonical-production verification passed for release:

```text
76ab0b37294870e3fb372405672867053a7b7936
```

The next breadth target is one reviewed primary Entity from the remaining four uncovered prefectures:

```text
新潟県
和歌山県
山口県
宮崎県
```

The next depth target is a due 2026 Occurrence or an existing low-density primary record that can be strengthened with claim-specific Evidence.

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

Batch 39 adds another real maintenance/modeling example: an elapsed 2026 schedule is not converted to `held` without explicit post-event Evidence, while a distributed route satisfies map requirements through approved official route guidance without coordinate fabrication.

The review may now be performed, but it cannot be marked complete from the calendar alone or by inferring private Analytics/Search Console observations.

## Phase 11 — Portal and next-site gates

Status: **Deferred until stabilization evidence and explicit gate review exist**

```text
Matsuri stabilization review          incomplete
Portal/Jinja implementation order     undecided
Jinja State specification             unapproved
Explicit start authorization          absent
```

The current candidate inventory remains 23 Relation-backed Shrine seeds and zero approved Jinja State Snapshots. Batch 39 adds no Shrine or Temple seed. Seed accumulation does not activate the next site.
