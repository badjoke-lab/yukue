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

Current verified checkpoint after Batch 40:

```text
Primary prefecture coverage  44 / 47
Public Entities              114
Places                       102
State Snapshots               53
Change Events                103
Relations                     67
Occurrences                  162
Sitemap entries              226
Sources                      299
Evidence                     665
Sparse primary Entities        0
```

Batch 40 added the first approved primary record for 新潟県 through 新潟まつり. The Festival is linked to 新潟まつり実行委員会, records the reviewed early-August Friday/Saturday/Sunday recurrence, preserves the center-city footprint as distributed venue context, records the 2025 edition as `held / modified` with separate claim-specific Evidence, and adds the year-level 1955 first-edition/start Change Event. The official-map contract uses reviewed traffic/venue guidance rather than invented coordinates. The 2026 schedule is not promoted to a held Occurrence without post-event Evidence.

The final release also removed an unused public Source found by complete CI and reran the full verification chain successfully.

Exact canonical-production verification passed for release:

```text
3e483cbb05f1416398ccefc56576116af4e9b126
```

The next breadth target is one reviewed primary Entity from the remaining three uncovered prefectures:

```text
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

Batch 40 adds two real maintenance/modeling examples: an elapsed 2026 schedule is not converted to `held` without explicit post-event Evidence, and unused public Source material is rejected rather than retained outside the public Evidence graph.

The review may now be performed, but it cannot be marked complete from the calendar alone or by inferring private Analytics/Search Console observations.

## Phase 11 — Portal and next-site gates

Status: **Deferred until stabilization evidence and explicit gate review exist**

```text
Matsuri stabilization review          incomplete
Portal/Jinja implementation order     undecided
Jinja State specification             unapproved
Explicit start authorization          absent
```

The current candidate inventory remains 23 Relation-backed Shrine seeds and zero approved Jinja State Snapshots. Batch 40 adds no Shrine or Temple seed. Seed accumulation does not activate the next site.
