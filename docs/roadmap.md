# Project Roadmap

**Status:** Phase 9 completed / Phase 10 Detail C completed / Matsuri corpus expansion active / stabilization observing

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

Current verified checkpoint after Batch 35:

```text
Primary prefecture coverage  39 / 47
Public Entities              104
Places                        95
State Snapshots               48
Change Events                 97
Relations                     62
Occurrences                  157
Sitemap entries              209
Sources                      268
Evidence                     613
Sparse primary Entities        0
```

Batch 35 added the first approved primary record for 大阪府 through 岸和田だんじり祭. The September and October festival periods are modeled separately instead of being flattened into an artificial continuous range. The 岸和田地区年番 Relation is bounded to the district-level role supported by the municipal Source, and the distributed route uses the official 岸和田市 Danjiri Map rather than fabricated point coordinates.

The next breadth target is one reviewed primary Entity from the remaining eight uncovered prefectures:

```text
群馬県
新潟県
長野県
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

Elapsed time alone does not complete Phase 10. Production availability, deployment behavior, canonical/HTTPS behavior, Search, crawler/sitemap behavior, Analytics, Search Console, freshness, Relations, Evidence, corrections, map-contract maintenance, and real maintenance burden remain under observation.

Batch 35 adds another useful maintenance/modeling example: two separate annual components were preserved and a distributed Place was represented through an approved official map without inventing coordinates.

## Phase 11 — Portal and next-site gates

Status: **Deferred until corpus, stabilization evidence, and explicit gate review exist**

```text
Matsuri stabilization review          incomplete
Portal/Jinja implementation order     undecided
Jinja State specification             unapproved
Explicit start authorization          absent
```

The current candidate inventory remains 23 Relation-backed Shrine seeds and zero approved Jinja State Snapshots. Batch 35 adds no Shrine or Temple seed. Seed accumulation does not activate the next site.
