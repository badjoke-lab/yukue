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
Latest corpus audit             docs/audits/matsuri-corpus-expansion-batch-27-2026-08-03.md
Latest production audit         docs/audits/matsuri-batch-27-production-verification-2026-08-03.md
Jinja start boundary            config/jinja-start-gate.json
Production topology             docs/deployment-topology.md
```

Exact current maintenance and production values are machine-checked in the two baseline JSON files.

## Verified Matsuri production position

```text
Worker                    matsuri-yukue
Canonical origin          https://matsuri-yukue.badjoke-lab.com/
Permanent Workers origin  https://matsuri-yukue.badjoke-lab.workers.dev/
Verified release          43b8d7a6ee800bb1e9ab7333698ea4be2ccbfd88
Verified on               2026-08-03
```

Exact canonical-production verification succeeded on its first attempt for the Batch 27 release.

```text
Entities          85
Change Events     83
Relations         51
Occurrences       139
Sitemap entries   177
```

The Batch 27 Takamatsu Festival, organizer, three Place routes, 岳神楽, and 大償神楽 routes return HTTP 200, contain real HTML structure and usable titles, carry no robots `noindex` directive, and appear in the canonical sitemap. The verified production layers also include Search, crawler reachability, Search Console submission evidence, Cloudflare Web Analytics Automatic setup, post-activation deployment, production traffic receipt, and the final F2 Launch Gate.

No URL is claimed already indexed.

## Current product track

The enforced Detail C surface requires real detail pages for every approved primary record, State-free seed-reference pages for approved Shrine and Temple records, public Place pages, bidirectional Relations, claim-linked Evidence and Sources, individual JSON, direct-detail search results, and no empty detail sections or internal-code labels.

Corpus expansion batches 11 through 27 are complete.

Batch 27 added さぬき高松まつり as the first approved primary Matsuri record for 香川県, including:

- 高松まつり振興会 as the evidence-backed organizer;
- 高松市中央公園 as the reviewed historical main venue;
- あなぶきアリーナ香川 and サンポート高松多目的広場 石のステージ as the reviewed 2026 main venues;
- the 2022 three-year public return;
- the held modified 2025 edition;
- the scheduled modified 2026 venue-change edition.

It deepened 岳神楽 and 大償神楽 through claim-specific 1976 national-designation and 2009 UNESCO-inscription Change Events shared with the parent 早池峰神楽 record. These are bounded designation-history records and do not create new Current State claims.

The canonical corpus contains 85 Entities, covers 31 prefectures, and leaves 16 prefectures uncovered. The only remaining sparse primary Entity is 御田祭.

Batch 27 implementation, corpus audit, and exact canonical-production verification are complete. The production baseline is pinned to implementation merge commit `43b8d7a6ee800bb1e9ab7333698ea4be2ccbfd88`.

## Stabilization review window

```text
Started               2026-07-27
Minimum duration      14 days
Earliest review       2026-08-10
Current status        observing
Review complete       false
```

Phase 10 observes production behavior, Search Console, Analytics receipt, corrections, deployment failures, data freshness, Relation integrity, and maintenance burden. Elapsed time alone does not complete the review. Search-engine indexation is observed but is not required.

The Batch 26 museum-hall route issue and correction remain maintenance-burden evidence. Batch 27 adds a clean breadth-and-depth expansion cycle with no repository, map, or visual regression.

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
さぬき高松まつり 2026 review after 2026-08-15
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
Product track       start Matsuri corpus expansion Batch 28
Depth target        deepen 御田祭 with claim-specific Change Event or Occurrence Evidence
Breadth target      add one reviewed primary record from the 16 uncovered prefectures
Detail track        keep every public title navigable through the enforced Detail C contract
Production check    Batch 27 exact canonical-production baseline verified
Dated review        follow the dated review inventory above, including Takamatsu after 2026-08-15
Stabilization       record real maintenance burden while expansion work is performed
Gate review         not before 2026-08-10 and not by elapsed time alone
Cloudflare track    no pending Batch 27 deployment action
Jinja track         remain blocked until all four post-launch prerequisites complete
```
