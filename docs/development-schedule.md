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
Corpus batches 11-34         completed
Batch 34 production          verified
Next corpus batch            Batch 35
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

The public contract requires:

```text
all Festival and Tradition Unit detail pages
all Folk Performance detail pages
all Organization detail pages
State-free Shrine and Temple seed-reference pages
Place pages with reverse links
grouped and bidirectional Relations
claim-linked Evidence and Sources
direct individual JSON
Pagefind results that open real details
complete sitemap coverage
concrete map anchors or approved official maps where required
static, Chromium navigation, and representative screenshot checks
```

Governing checks include:

```text
docs/matsuri-detail-c-implementation.md
pnpm check:matsuri:detail-navigation
```

## Phase 10B — Matsuri corpus expansion

Status: **Active**

Batch 34 is complete and exact canonical production is verified.

Current checkpoint:

```text
Primary prefecture coverage  38 / 47
Public Entities              102
Places                        94
State Snapshots               47
Change Events                 96
Relations                     61
Occurrences                  155
Sitemap entries              206
Sources                      264
Evidence                     603
Sparse primary Entities        0
```

Batch 34 added おはら祭 for 鹿児島県 and produced a map-contract maintenance case. The first Detail C run rejected municipality-level precision as an insufficient concrete map anchor. No coordinates were invented; reviewed official 2026 venue-map context was registered through the approved official-map mechanism, and the full verification chain then passed.

### Batch 35 breadth target

Add one reviewed primary record from:

```text
群馬県
新潟県
長野県
大阪府
兵庫県
和歌山県
鳥取県
山口県
宮崎県
```

The record must satisfy the existing Detail C, map, Evidence, Source, freshness, Relation, and production verification contracts. Geographic breadth alone is not sufficient.

### Batch 35 depth target

In parallel with breadth, do one of the following when evidence supports it:

- close the next due 2026 Occurrence;
- deepen a low-density primary record with claim-specific Evidence;
- add a real Change Event or historical Occurrence;
- strengthen Organization, Place, or Relation context;
- process a correction or freshness issue discovered by the gates.

Do not manufacture a depth change solely to make the batch symmetrical.

## Parallel stabilization review

```text
Started               2026-07-27
Minimum duration      14 days
Earliest review       2026-08-10
Status                observing
Review complete       false
Machine record        config/matsuri-stabilization-review.json
Start audit           docs/audits/matsuri-stabilization-start-2026-07-27.md
```

Stabilization observes production availability, deployment failures, canonical and HTTPS behavior, Search, crawler and sitemap behavior, Analytics receipt, Search Console, corrections, freshness, Relation integrity, Evidence quality, map-contract maintenance, and maintenance burden.

Reaching 2026-08-10 alone does not complete the gate. Maintenance burden must be judged from real corpus and correction work.

Recorded maintenance examples now include the museum-hall route correction, transient map connection failure, Source-title correction, multiple 2026 scheduled-to-held rollovers, and the Batch 34 official-map remediation.

Current dated reviews:

```text
山あげ祭 2026          review when official post-event Evidence is available
さぬき高松まつり 2026 review after 2026-08-15
吉田の火祭 2026       review after 2026-08-27
郡上おどり 2026        review after 2026-09-05
石岡のおまつり 2026   review after 2026-09-21
佐陀神能 御座替祭 2026 review after 2026-09-25
布橋灌頂会 2026       review after 2026-09-27
上野天神祭 2026       review after 2026-10-25
おはら祭 2026         review after 2026-11-03
春日若宮おん祭 2026   review after 2026-12-18
```

## Batch 35 execution order

```text
1. run freshness / Relation / Evidence / bundle checks on current main
2. select one evidence-strong breadth target from the 9 uncovered prefectures
3. add only evidence-supported depth or due maintenance
4. register canonical bundles in every required loader
5. run corpus, freshness, Relation, external-link, correction, seed, and Jinja gates
6. run Detail C and map utility; do not invent coordinates to satisfy the map contract
7. run full-page desktop/mobile screenshot review
8. merge implementation only when the complete repository gate passes
9. record a docs-only corpus audit from the squash-merged release baseline
10. advance the production baseline to the exact release commit
11. require canonical-origin verification against the public hostname
12. record production verification and advance project-status / roadmap / schedule
```

## Future-site boundary

F2-28 completion satisfies only the first Jinja prerequisite.

```text
Matsuri F2-28 complete                 true
Matsuri stabilization review          false
Portal/Jinja implementation order     false
Jinja State specification approved    false
Explicit start authorization          false
```

Before Jinja implementation:

```text
1. continue Matsuri corpus expansion and real maintenance observation
2. complete the Matsuri stabilization review with recorded evidence
3. decide portal/Jinja implementation order
4. approve Jinja State specification and vocabulary
5. record explicit start authorization
6. pass the actual Jinja start gate
7. only then create apps/jinja
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
