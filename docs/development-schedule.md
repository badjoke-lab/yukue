# Development Schedule

**Status:** F2-28 completed / Detail C completed / Matsuri corpus expansion active / stabilization review eligible and observing / Jinja blocked

This project is gate-driven rather than deadline-driven.

## Current position

```text
Foundation through Stage E  completed
F1 corpus expansion          completed
F2-01 through F2-28          completed
F2-M01                       completed
F2-M02                       completed
F2-P01 through F2-P13        completed
Phase 9 Launch Preparation   completed
Phase 10 Stabilization       active
Phase 10A Detail C repair    completed
Phase 10B Corpus expansion   active
Corpus batches 11-41         completed
Batch 41 production          verified
Next corpus batch            Batch 42
Stabilization review         observing
Formal review eligible       true
Actual Jinja start gate      blocked
```

## Completed F2 launch sequence

```text
F2-16  Cloudflare Workers Builds connection — completed
F2-17  first Workers Static Assets deployment — completed
F2-18  deployed-origin smoke verification — completed
F2-19  exact canonical Matsuri hostname decision — completed
F2-20  Custom Domain activation and HTTPS verification — completed
F2-21  canonical manifest and sitemap verification — completed
F2-22  browser Pagefind Search verification — completed
F2-23  crawler-reachability review — completed
F2-24  Search Console sitemap submission and indexability check — completed
F2-25  Cloudflare Web Analytics Automatic setup observed enabled — completed
F2-26  post-activation main production deployment — completed
F2-27  production traffic verification — completed
F2-28  final F2 Launch Gate — completed
```

F2-28 does not claim search-engine indexation and does not authorize Jinja.

## Phase 10A — Detail C product contract

Status: **Completed and continuously enforced**

```text
real Festival / Performance / Organization detail pages
State-free Shrine and Temple seed references
Place pages with reverse links
bidirectional Relations
claim-linked Evidence and Sources
individual public JSON
Pagefind direct details
complete sitemap coverage
concrete map anchors or approved official maps
static + Chromium + representative screenshot checks
```

## Phase 10B — Matsuri corpus expansion

Status: **Active**

Batch 41 is complete and exact canonical production is verified.

Current checkpoint:

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

Batch 41 added 山口祇園祭 for 山口県. The Festival is linked to 八坂神社 through `ritually_associated_with`, uses a concrete Shrine Place plus a distributed procession-route Place, records Current State `active`, the annual July 20–27 recurrence, the 2023 edition as `held / unknown`, and the 1459 first edition/start at year precision. The elapsed 2026 dates are not converted to a held Occurrence without post-event Evidence.

The Shrine seed remains State-free. Its addition advances Jinja seed bookkeeping to 24 Relation-backed Shrine seeds while approved Jinja State Snapshots remain zero and the Jinja start gate remains blocked.

### Batch 42 breadth target

Add one reviewed primary record from:

```text
和歌山県
宮崎県
```

Geographic breadth alone is not sufficient. The record must satisfy the existing Detail C, map, Evidence, Source, freshness, Relation, and production contracts.

### Batch 42 depth target

When evidence supports it, also do one of the following:

- close a due or already verifiable Occurrence using post-event Evidence;
- deepen a low-density primary record with claim-specific Evidence;
- add a real Change Event or historical Occurrence;
- strengthen Organization, Shrine/Temple seed, Place, or Relation context;
- process a correction or freshness issue discovered by the gates.

Do not manufacture a depth change solely for symmetry.

## Parallel stabilization review

```text
Started               2026-07-27
Minimum duration      14 days
Earliest review       2026-08-10
Status                observing
Review eligible       true
Review complete       false
Machine record        config/matsuri-stabilization-review.json
```

Elapsed time alone does not complete the gate. The review must record the required public-safe conclusions for production availability, canonical/HTTPS, Search, crawler/sitemap, Analytics traffic receipt, freshness, Relations, Evidence/corrections, manual maintenance burden, and Search Console observation.

Current dated reviews:

```text
山あげ祭 2026                    review when official post-event Evidence is available
鳥取しゃんしゃん祭 2026          review after 2026-08-15
さぬき高松まつり 2026           review after 2026-08-15
吉田の火祭 2026                 review after 2026-08-27
郡上おどり 2026                  review after 2026-09-05
岸和田だんじり祭 9月祭礼 2026   review after 2026-09-20
石岡のおまつり 2026             review after 2026-09-21
佐陀神能 御座替祭 2026          review after 2026-09-25
布橋灌頂会 2026                 review after 2026-09-27
岸和田だんじり祭 10月祭礼 2026  review after 2026-10-11
上野天神祭 2026                 review after 2026-10-25
おはら祭 2026                   review after 2026-11-03
春日若宮おん祭 2026             review after 2026-12-18
```

## Batch 42 execution order

```text
1. run freshness / Relation / Evidence / bundle checks on current main
2. select one evidence-strong breadth target from the 2 uncovered prefectures
3. add only evidence-supported depth or due maintenance
4. register canonical bundles in every required loader
5. run corpus, freshness, Relation, external-link, correction, seed, and Jinja gates
6. run Detail C and map utility; do not invent coordinates
7. run full-page desktop/mobile screenshot review
8. merge implementation only when complete repository CI passes
9. record a docs-only corpus audit from the merged release baseline
10. advance the production baseline to the exact release commit
11. require canonical-origin verification against the public hostname
12. record production verification and advance project-status / roadmap / schedule
```

The formal stabilization review can proceed in parallel with Batch 42, but it must not be marked complete until every review prerequisite is actually evidenced.

## Future-site boundary

```text
Matsuri F2-28 complete                 true
Matsuri stabilization review          false
Portal/Jinja implementation order     false
Jinja State specification approved    false
Explicit start authorization          false
```

Current candidate inventory is 24 Relation-backed Shrine seeds and zero approved Jinja State Snapshots.

## Work not activated

```text
portal production deployment
future specialist-site implementation
Jinja State specification approval
apps/jinja
Jinja Worker or hostname activation
Stats
Compare
dynamic API
MCP
paid API
x402 billing
D1 canonical database
real-time ingestion
complex graph visualization
```
