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

Current verified checkpoint after Batch 41:

```text
Primary prefecture coverage  45 / 47
Public Entities              116
Places                       104
State Snapshots               54
Change Events                104
Relations                     68
Occurrences                  163
Sitemap entries              230
Sources                      305
Evidence                     676
Sparse primary Entities        0
```

Batch 41 added the first approved primary record for 山口県 through 山口祇園祭. The Festival is linked to 八坂神社 through an evidence-backed ritual Relation, records the reviewed annual July 20–27 recurrence, preserves the Shrine anchor and distributed procession route as separate Places, records the 2023 edition as `held / unknown`, and adds the year-level 1459 first-edition/start Change Event. The 2026 dates are not promoted to a held Occurrence without post-event Evidence.

Exact canonical-production verification passed for release:

```text
69d350e9e55ae93c829f8ab535b22bc8df5f3772
```

The next breadth target is one reviewed primary Entity from the remaining two uncovered prefectures:

```text
和歌山県
宮崎県
```

The next depth target is an evidence-supported historical or current Occurrence, Change Event, or low-density primary record that can be strengthened without inference.

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

Batch 41 adds another real modeling boundary: a Shrine can be captured as a State-free Relation-backed seed while Matsuri evidence remains sufficient for Festival identity, Place, history, and ritual association. Seed growth does not authorize Jinja State inference or implementation.

The review may be performed, but it cannot be marked complete from the calendar alone or by inferring private Analytics/Search Console observations.

## Phase 11 — Portal and next-site gates

Status: **Deferred until stabilization evidence and explicit gate review exist**

```text
Matsuri stabilization review          incomplete
Portal/Jinja implementation order     undecided
Jinja State specification             unapproved
Explicit start authorization          absent
```

The current candidate inventory is 24 Relation-backed Shrine seeds and zero approved Jinja State Snapshots. Seed accumulation does not activate the next site.
