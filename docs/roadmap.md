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

Current verified checkpoint after Batch 38:

```text
Primary prefecture coverage  42 / 47
Public Entities              110
Places                       100
State Snapshots               51
Change Events                101
Relations                     65
Occurrences                  160
Sitemap entries              220
Sources                      285
Evidence                     645
Sparse primary Entities        0
```

Batch 38 added the first approved primary record for 群馬県 through 桐生八木節まつり. The Festival is linked to 桐生八木節まつり協賛会, records the reviewed first-week-of-August three-day recurrence, preserves the center-city area as a distributed route Place, records the 2024 edition as `held / unknown`, and adds year-level 1964 start and 1988 rename Change Events. The official-map contract uses the reviewed 桐生市 第63回公式チラシ rather than invented coordinates. The 2026 schedule is not promoted to a held Occurrence without post-event Evidence.

Exact canonical-production verification passed for release:

```text
03a6bcb8b58d3bc37e200c2eb4f7d6e41c7923d7
```

The next breadth target is one reviewed primary Entity from the remaining five uncovered prefectures:

```text
新潟県
長野県
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

Batch 38 adds another real maintenance/modeling example: a recently elapsed 2026 schedule is not converted to `held` without explicit post-event Evidence, while a distributed route satisfies map requirements through an official city map without coordinate fabrication.

The review may now be performed, but it cannot be marked complete from the calendar alone or by inferring private Analytics/Search Console observations.

## Phase 11 — Portal and next-site gates

Status: **Deferred until stabilization evidence and explicit gate review exist**

```text
Matsuri stabilization review          incomplete
Portal/Jinja implementation order     undecided
Jinja State specification             unapproved
Explicit start authorization          absent
```

The current candidate inventory remains 23 Relation-backed Shrine seeds and zero approved Jinja State Snapshots. Batch 38 adds no Shrine or Temple seed. Seed accumulation does not activate the next site.
