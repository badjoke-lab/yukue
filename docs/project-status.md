# Project Status

**Last updated:** 2026-08-05

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
Latest corpus audit             docs/audits/matsuri-corpus-expansion-batch-28-2026-08-05.md
Latest production audit         docs/audits/matsuri-batch-28-production-verification-2026-08-05.md
Jinja start boundary            config/jinja-start-gate.json
Production topology             docs/deployment-topology.md
```

Exact current maintenance and production values are machine-checked in the two baseline JSON files.

## Verified Matsuri production position

```text
Worker                    matsuri-yukue
Canonical origin          https://matsuri-yukue.badjoke-lab.com/
Permanent Workers origin  https://matsuri-yukue.badjoke-lab.workers.dev/
Verified release          a61091fd0d335e5dc77b79835ef40f57dbb3c964
Verified on               2026-08-05
```

Exact canonical-production verification succeeded on attempt 1 for the Batch 28 release.

```text
Entities          87
Change Events     87
Relations         52
Occurrences       143
Sitemap entries   181
```

The Batch 28 新居浜太鼓祭り Festival, support Organization, distributed citywide Place, concrete 山根市民グラウンド Place, and retained 御田祭 route return HTTP 200, contain real HTML structure and usable titles, carry no robots `noindex` directive, and appear in the canonical sitemap. The verified production layers also include Search, crawler reachability, Search Console submission evidence, Cloudflare Web Analytics Automatic setup, post-activation deployment, production traffic receipt, and the final F2 Launch Gate.

No URL is claimed already indexed.

## Current product track

The enforced Detail C surface requires real detail pages for every approved primary record, State-free seed-reference pages for approved Shrine and Temple records, public Place pages, bidirectional Relations, claim-linked Evidence and Sources, individual JSON, direct-detail search results, and no empty detail sections or internal-code labels.

Corpus expansion batches 11 through 28 are complete.

Batch 28 added 新居浜太鼓祭り as the first approved primary Matsuri record for 愛媛県, including:

- 新居浜市太鼓祭り推進委員会 as an evidence-backed support Organization;
- the distributed citywide operating area and the concrete 山根市民グラウンド venue as separate Places;
- the cancelled 2020 edition and all-unit non-holding position in 2021;
- the held modified three-year return in 2022;
- the held modified 2025 edition;
- the bounded 2025 cancellation of the 住友化学愛媛工場前かきくらべ without converting it into a whole-festival cancellation.

It deepened 御田祭 through a claim-specific 1982 national-designation Change Event and Designation for the broader 阿蘇の農耕祭事 group. The public record states that 御田祭 is a component of that group and does not claim a standalone designation.

The canonical corpus contains 87 Entities, covers 32 prefectures, and leaves 15 prefectures uncovered. No sparse primary Entity remains under the current corpus-coverage rule.

Batch 28 implementation, corpus audit, and exact canonical-production verification are complete. The production baseline is pinned to implementation merge commit `a61091fd0d335e5dc77b79835ef40f57dbb3c964`.

## Stabilization review window

```text
Started               2026-07-27
Minimum duration      14 days
Earliest review       2026-08-10
Current status        observing
Review complete       false
```

Phase 10 observes production behavior, Search Console, Analytics receipt, corrections, deployment failures, data freshness, Relation integrity, and maintenance burden. Elapsed time alone does not complete the review. Search-engine indexation is observed but is not required.

The Batch 26 museum-hall route issue and correction remain maintenance-burden evidence. Batches 27 and 28 add clean breadth-and-depth expansion cycles with no repository, map, visual, deployment, or production-verification regression.

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
Product track       start Matsuri corpus expansion Batch 29
Depth target        resolve the next due 2026 Occurrence or deepen a low-density primary record with claim-specific Evidence
Breadth target      add one reviewed primary record from the 15 uncovered prefectures
Detail track        keep every public title navigable through the enforced Detail C contract
Production check    Batch 28 exact canonical-production baseline verified
Dated review        follow the dated review inventory above, including Hirosaki after 2026-08-07
Stabilization       record real maintenance burden while expansion work is performed
Gate review         not before 2026-08-10 and not by elapsed time alone
Cloudflare track    no pending Batch 28 deployment action
Jinja track         remain blocked until all four post-launch prerequisites complete
```
