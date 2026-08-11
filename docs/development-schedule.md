# Development Schedule

**Status:** F2-28 completed / Detail C completed / Matsuri prefecture breadth 47 / 47 completed / depth-first maintenance active / stabilization reviewing / Jinja blocked

This project is gate-driven rather than deadline-driven.

## Current position

```text
Foundation through Stage E   completed
F1 corpus expansion           completed
F2-01 through F2-28           completed
F2-M01                        completed
F2-M02                        completed
F2-P01 through F2-P13         completed
Phase 9 Launch Preparation    completed
Phase 10 Stabilization        active
Phase 10A Detail C repair     completed
Phase 10B Prefecture breadth  completed 47 / 47
Phase 10C Depth maintenance   active
Corpus batches 11-43          completed
Batch 43 production           verified
Stabilization review          reviewing
Formal review eligible        true
Formal review complete        false
Actual Jinja start gate       blocked
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

## Phase 10B — Matsuri prefecture breadth

Status: **Completed**

Batch 43 completes reviewed primary-prefecture coverage at 47 / 47.

Final breadth checkpoint:

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

Batch 43 added 宮﨑神宮大祭（神武さま） for 宮崎県. The Festival is linked to 宮﨑神宮 through `ritually_associated_with`, uses a concrete Shrine Place plus a distributed procession-route Place, records Current State `active`, the annual例祭/御神幸 recurrence, the 2024 edition as `held / modified`, the future 2026 edition as `scheduled / unknown`, and a year-level c.1909 current-form establishment Change Event.

The Shrine seed remains State-free. Its addition advances Jinja seed bookkeeping to 26 Relation-backed Shrine seeds while approved Jinja State Snapshots remain zero and the Jinja start gate remains blocked.

Geographic breadth is no longer the default expansion axis.

## Phase 10C — Depth-first Matsuri maintenance

Status: **Active**

Priority order:

```text
1. due 2026 Occurrence reviews with explicit post-event Evidence
2. historical Occurrence gaps on low-density primary records
3. real Change Events that explain state or format transitions
4. Relation density and provenance improvements
5. claim-specific Evidence and Source quality
6. stale-State / stale-link review and corrections
7. Detail C / map / Search / machine-readable regression maintenance
```

Do not add records merely to increase the Entity count now that prefecture breadth is complete. New primary Entities remain allowed when they add substantive coverage, but quantity alone is not a target.

## Parallel stabilization review

```text
Started               2026-07-27
Minimum duration      14 days
Earliest review       2026-08-10
Status                reviewing
Review eligible       true
Review complete       false
Machine record        config/matsuri-stabilization-review.json
```

The state model is `observing -> reviewing -> complete`. Elapsed time alone does not complete the gate.

Repository/public review is already recorded for production availability, canonical/HTTPS, canonical Search, crawler/sitemap, freshness, Relations, Evidence/corrections, and maintenance burden. The machine record also freezes:

```text
Known unresolved critical corrections   0
Production deployment failures           1
Manual maintenance burden                acceptable
```

The one production deployment failure is the repository-recorded F2-26 provider-side HTTP 503 on the first deployment attempt. The same-source retry succeeded. Screenshot/browser retries are not production deployment failures.

The remaining formal-review work requires current private observation:

```text
Cloudflare Web Analytics traffic receipt   pending
Search Console observation                 pending
```

Historical F2-27 traffic verification and F2-24 Search Console evidence are not substituted for those current observations.

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
宮﨑神宮大祭 2026               review after 2026-11-01
おはら祭 2026                   review after 2026-11-03
春日若宮おん祭 2026             review after 2026-12-18
```

## Immediate execution order

```text
1. keep repository / canonical / freshness / Relation gates green on current main
2. preserve the reviewing machine state and its public-safe conclusions
3. obtain current private Analytics traffic and Search Console observations without committing private data
4. do not complete stabilization until both remaining observations and the final audit are actually supported
5. process the next due dated Occurrence reviews when their review dates arrive
6. use pre-due time for evidence-strong historical depth and correction work
7. keep Detail C and map utility strict; do not invent coordinates
8. keep future Occurrences scheduled until post-event Evidence supports another outcome
9. continue docs-only audit -> exact production baseline -> canonical verification for material data changes
```

## Future-site boundary

```text
Matsuri F2-28 complete                 true
Matsuri stabilization review          false
Portal/Jinja implementation order     false
Jinja State specification approved    false
Explicit start authorization          false
```

Current candidate inventory is 26 Relation-backed Shrine seeds and zero approved Jinja State Snapshots.

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
