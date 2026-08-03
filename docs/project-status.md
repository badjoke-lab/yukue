# Project Status

**Last updated:** 2026-08-03

## Current phase

```text
Phase 10 — Matsuri Content Expansion and Stabilization
```

## Current gate state

```text
F2-15 — Repository Launch Readiness Gate — completed
F2-M01 — Full-page screenshot visual-review workflow — completed
F2-M02 — Matsuri data freshness audit — completed
F2-16 through F2-27 — completed
F2-28 — final F2 Launch Gate — completed
F2-P01 through F2-P13 — completed
Phase 9 Launch Preparation — completed
Phase 10 Stabilization — active
Matsuri Detail C implementation — completed
Matsuri corpus expansion — active
Matsuri stabilization review — observing
Actual Jinja start gate — blocked
future specialist-site implementation — not activated
```

F2-28 accepted the complete launch chain after F2-27 was merged to `main`. The post-launch Detail C implementation provides real detail, Relation, Place, Evidence, search, individual-JSON, and map behavior for the complete approved public inventory.

```text
Evaluated at        2026-07-27T11:45:20Z
F2-27 merge commit  6a0ef91dad62fb7f5d65135d846b1cf6b6301d25
F2-28 evidence      docs/audits/matsuri-f2-28-final-launch-gate-2026-07-27.md
Detail C contract   docs/matsuri-detail-c-implementation.md
```

The final launch gate records successful repository, canonical-origin, Search, crawler, indexability-preflight, Analytics, baseline, privacy, and Jinja-guardrail verification. It does not claim search-engine indexation.

## Current sources of truth

```text
Current repository counts       config/matsuri-repository-baseline.json
Current production baseline     config/matsuri-production-baseline.json
Analytics progression           config/matsuri-analytics-activation.json
Final F2 launch gate            config/matsuri-f2-launch-gate.json
Stabilization review            config/matsuri-stabilization-review.json
Detail C implementation         docs/matsuri-detail-c-implementation.md
F2-28 evidence                  docs/audits/matsuri-f2-28-final-launch-gate-2026-07-27.md
Stabilization start evidence    docs/audits/matsuri-stabilization-start-2026-07-27.md
Latest corpus audit             docs/audits/matsuri-corpus-expansion-batch-26-2026-08-03.md
Latest production audit         docs/audits/matsuri-batch-26-production-verification-2026-08-03.md
Jinja start boundary            config/jinja-start-gate.json
Production topology             docs/deployment-topology.md
```

Exact current maintenance and production values are machine-checked in the two baseline JSON files.

## Verified Matsuri production position

```text
Worker                    matsuri-yukue
Canonical origin          https://matsuri-yukue.badjoke-lab.com/
Permanent Workers origin  https://matsuri-yukue.badjoke-lab.workers.dev/
Verified release          c0e1ba0b2a7d928f75257084f7261c05bdfacd1f
Verified on               2026-08-03
```

Exact canonical-production verification succeeded on its first attempt after the Batch 26 correction.

```text
Entities          83
Change Events     78
Relations         50
Occurrences       136
Sitemap entries   172
```

The corrected `/places/shimane-art-museum-hall/` route returns HTTP 200, contains real HTML structure and a usable title, carries no robots `noindex` directive, and appears in the canonical sitemap. The verified production layers also include Search, crawler reachability, Search Console submission evidence, Cloudflare Web Analytics Automatic setup, post-activation deployment, production traffic receipt, and the final F2 Launch Gate.

No URL is claimed already indexed.

## Current product track

The enforced Detail C surface requires real detail pages for every approved primary record, State-free seed-reference pages for approved Shrine and Temple records, public Place pages, bidirectional Relations, claim-linked Evidence and Sources, individual JSON, direct-detail search results, and no empty detail sections or internal-code labels.

Corpus expansion batches 11 through 26 are complete.

Batch 26 added 長浜曳山祭 as the first approved primary Matsuri record for 滋賀県, including:

- the State-free 長濱八幡宮 seed and concrete Shrine Place;
- the route-based city-center procession area;
- 公益財団法人長浜曳山文化協会 as a protection and continuity organization;
- the bounded 2020 public-festival pause;
- held modified 2022, held normal 2024, and held unknown-scale 2026 Occurrences;
- national and UNESCO designations;
- evidence-backed Shrine and preservation Relations.

It deepened 佐陀神能 with held 2022 and 2026 special-public-performance cycles, the 2026 off-site museum-hall format, a concrete performance venue, and the national designation without replacing the annual 御座替祭 series.

Post-merge exact production verification found that the museum-hall Place existed in the data feed but lacked a generated Place detail because the parent Entity did not reference it through `default_place_ids`. Ordered correction `corrections-17.json` fixed the Entity-to-Place connection, retained 佐太神社 as the primary ritual anchor, generated the missing Place route, and advanced the final public surface to 172 HTML routes and 70 Place details.

The canonical corpus contains 83 Entities, covers 30 prefectures, and leaves 17 prefectures uncovered. The remaining sparse primary Entities are 岳神楽, 御田祭, and 大償神楽.

The next batch must continue the same uncovered-prefecture breadth plus sparse-record depth rule.

## Stabilization review window

```text
Started               2026-07-27
Minimum duration      14 days
Earliest review       2026-08-10
Current status        observing
Review complete       false
```

Phase 10 observes production behavior, Search Console, Analytics receipt, corrections, deployment failures, data freshness, Relation integrity, and maintenance burden. Elapsed time alone does not complete the review. Search-engine indexation is observed but is not required.

The Batch 26 museum-hall route issue and its correction are retained as real maintenance-burden evidence for the stabilization review.

## Routine Matsuri maintenance

```text
pnpm audit:matsuri:freshness
pnpm audit:matsuri:relations
pnpm check:matsuri:evidence
pnpm check:matsuri:bundle-inventory
pnpm check:matsuri:detail-navigation
pnpm check:matsuri:stabilization-review
```

Current dated reviews:

```text
山あげ祭 2026          review when official post-event Evidence is available
弘前ねぷた 2026        review after 2026-08-07
郡上おどり 2026        review after 2026-09-05
佐陀神能 御座替祭 2026 review after 2026-09-25
吉田の火祭 2026       review after 2026-08-27
石岡のおまつり 2026   review after 2026-09-21
上野天神祭 2026       review after 2026-10-25
春日若宮おん祭 2026   review after 2026-12-18
```

The reviewed 2026 長浜曳山祭 and 2026 佐陀神能 special-public-performance records are closed as held. The separate September 2026 佐陀神能御座替祭 remains scheduled and retains its dated review.

## Jinja start boundary

F2-28 is complete, but four separate prerequisites remain incomplete.

```text
Matsuri F2-28 complete                 true
Matsuri stabilization review          false
Portal/Jinja implementation order     false
Jinja State specification approved    false
Explicit start authorization          false
```

Actual Jinja start gate — blocked

No Jinja application, Worker, hostname, publication claim, or invented State Snapshot is authorized. The repository retains zero approved Jinja State Snapshots.

## Current release status

```text
repository-verified-canonical-production-verified-crawler-reachability-verified-sitemap-submission-verified-indexability-verified-analytics-traffic-verified-f2-launch-complete-stabilization-observing-jinja-start-blocked
```

## Immediate next actions

```text
Product track       start Matsuri corpus expansion Batch 27
Depth target        deepen one of 岳神楽, 御田祭, or 大償神楽 with claim-specific Evidence
Breadth target      add one reviewed primary record from the 17 uncovered prefectures
Detail track        keep every public title navigable through the enforced Detail C contract
Production check    Batch 26 corrected production verified; maintain exact baseline on subsequent releases
Dated review        follow the dated review inventory above
Stabilization       record real maintenance burden while expansion work is performed
Gate review         not before 2026-08-10 and not by elapsed time alone
Cloudflare track    no pending Batch 26 deployment action
Jinja track         remain blocked until all four post-launch prerequisites complete
```
