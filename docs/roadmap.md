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

Current verified checkpoint after Batch 36:

```text
Primary prefecture coverage  40 / 47
Public Entities              106
Places                        97
State Snapshots               49
Change Events                 98
Relations                     63
Occurrences                  158
Sitemap entries              213
Sources                      273
Evidence                     623
Sparse primary Entities        0
```

Batch 36 added the first approved primary record for 鳥取県 through 鳥取しゃんしゃん祭. The festival is linked to 鳥取しゃんしゃん祭振興会, retains the annual August 13–15 recurrence, keeps the 2026 edition `scheduled / unknown` while still future-dated, records the 1965 start at year precision, and separates JR鳥取駅前風紋広場 from the distributed city-center route. The official-map contract uses the reviewed 鳥取市 風紋広場 page instead of invented coordinates.

The next breadth target is one reviewed primary Entity from the remaining seven uncovered prefectures:

```text
群馬県
新潟県
長野県
兵庫県
和歌山県
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

Batch 36 adds another maintenance example: a future-dated edition remains scheduled despite being close to the observation date, while a route-based Festival still satisfies map requirements through a concrete official venue anchor without coordinate fabrication.

## Phase 11 — Portal and next-site gates

Status: **Deferred until corpus, stabilization evidence, and explicit gate review exist**

```text
Matsuri stabilization review          incomplete
Portal/Jinja implementation order     undecided
Jinja State specification             unapproved
Explicit start authorization          absent
```

The current candidate inventory remains 23 Relation-backed Shrine seeds and zero approved Jinja State Snapshots. Batch 36 adds no Shrine or Temple seed. Seed accumulation does not activate the next site.
