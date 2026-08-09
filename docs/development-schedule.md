# Development Schedule

**Status:** F2-28 completed / Detail C completed / Matsuri corpus expansion active / stabilization observing / Jinja blocked

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
Corpus batches 11-35         completed
Batch 35 production          verified
Next corpus batch            Batch 36
Stabilization review         observing
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

Batch 35 is complete and exact canonical production is verified.

Current checkpoint:

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

Batch 35 added 岸和田だんじり祭 for 大阪府. September and October are separate annual series and separate future 2026 components. The 岸和田地区年番 Relation remains bounded to the role supported by the municipal Source, and the distributed route Place uses the official 岸和田市 Danjiri Map rather than fabricated coordinates.

### Batch 36 breadth target

Add one reviewed primary record from:

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

Geographic breadth alone is not sufficient. The record must satisfy the existing Detail C, map, Evidence, Source, freshness, Relation, and production contracts.

### Batch 36 depth target

When evidence supports it, also do one of the following:

- close the next due 2026 Occurrence;
- deepen a low-density primary record with claim-specific Evidence;
- add a real Change Event or historical Occurrence;
- strengthen Organization, Place, or Relation context;
- process a correction or freshness issue discovered by the gates.

Do not manufacture a depth change solely for symmetry.

## Parallel stabilization review

```text
Started               2026-07-27
Minimum duration      14 days
Earliest review       2026-08-10
Status                observing
Review complete       false
Machine record        config/matsuri-stabilization-review.json
```

Reaching 2026-08-10 alone does not complete the gate. Maintenance burden must be judged from real corpus and correction work.

Current dated reviews:

```text
山あげ祭 2026                    review when official post-event Evidence is available
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

## Batch 36 execution order

```text
1. run freshness / Relation / Evidence / bundle checks on current main
2. select one evidence-strong breadth target from the 8 uncovered prefectures
3. add only evidence-supported depth or due maintenance
4. register canonical bundles in every required loader
5. run corpus, freshness, Relation, external-link, correction, seed, and Jinja gates
6. run Detail C and map utility; do not invent coordinates
7. run full-page desktop/mobile screenshot review
8. merge implementation only when complete repository CI passes
9. record a docs-only corpus audit from the squash-merged release baseline
10. advance the production baseline to the exact release commit
11. require canonical-origin verification against the public hostname
12. record production verification and advance project-status / roadmap / schedule
```

## Future-site boundary

```text
Matsuri F2-28 complete                 true
Matsuri stabilization review          false
Portal/Jinja implementation order     false
Jinja State specification approved    false
Explicit start authorization          false
```

Current candidate inventory remains 23 Relation-backed Shrine seeds and zero approved Jinja State Snapshots.

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
