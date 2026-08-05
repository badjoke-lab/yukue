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
Latest corpus audit             docs/audits/matsuri-corpus-expansion-batch-29-2026-08-05.md
Latest production audit         docs/audits/matsuri-batch-29-production-verification-2026-08-05.md
Jinja start boundary            config/jinja-start-gate.json
Production topology             docs/deployment-topology.md
```

Exact current maintenance and production values are machine-checked in the two baseline JSON files.

## Verified Matsuri production position

```text
Worker                    matsuri-yukue
Canonical origin          https://matsuri-yukue.badjoke-lab.com/
Permanent Workers origin  https://matsuri-yukue.badjoke-lab.workers.dev/
Verified release          19990018ff19f07132c2b5f1fdf86608a00c9384
Verified on               2026-08-05
```

Exact canonical-production verification succeeded on attempt 1 for the Batch 29 release.

```text
Entities          89
Change Events     89
Relations         53
Occurrences       149
Sitemap entries   185
```

The Batch 29 浜松まつり Festival, organizer Organization, concrete 中田島 Place, distributed central-city Place, and retained 布橋灌頂会 route return HTTP 200, contain real HTML structure and usable titles, carry no robots `noindex` directive, and appear in the canonical sitemap. The verified production layers also include Search, crawler reachability, Search Console submission evidence, Cloudflare Web Analytics Automatic setup, post-activation deployment, production traffic receipt, and the final F2 Launch Gate.

No URL is claimed already indexed.

## Current product track

The enforced Detail C surface requires real detail pages for every approved primary record, State-free seed-reference pages for approved Shrine and Temple records, public Place pages, bidirectional Relations, claim-linked Evidence and Sources, individual JSON, direct-detail search results, and no empty detail sections or internal-code labels.

Corpus expansion batches 11 through 29 are complete.

Batch 29 added 浜松まつり as the first approved primary Matsuri record for 静岡県, including:

- 浜松まつり組織委員会 as the evidence-backed organizer;
- 中田島凧揚げ会場 as a concrete mapped Place;
- the central-city 御殿屋台引き回し area as a separate distributed Place;
- the cancelled 2020 edition;
- the held modified no-spectator kite-only return in 2021;
- the held modified audience-admitting 2022 edition;
- the held unknown-scale 2026 edition.

It deepened 布橋灌頂会 with a held modified 2022 Occurrence and a scheduled unknown-scale 2026 Occurrence. The 2026 record remains scheduled until post-window Evidence is reviewed.

The canonical corpus contains 89 Entities, covers 33 prefectures, and leaves 14 prefectures uncovered. No sparse primary Entity remains under the current corpus-coverage rule.

Batch 29 implementation, corpus audit, and exact canonical-production verification are complete. The production baseline is pinned to implementation merge commit `19990018ff19f07132c2b5f1fdf86608a00c9384`.

## Stabilization review window

```text
Started               2026-07-27
Minimum duration      14 days
Earliest review       2026-08-10
Current status        observing
Review complete       false
```

Phase 10 observes production behavior, Search Console, Analytics receipt, corrections, deployment failures, data freshness, Relation integrity, and maintenance burden. Elapsed time alone does not complete the review. Search-engine indexation is observed but is not required.

The Batch 26 museum-hall route issue and correction remain maintenance-burden evidence. Batches 27 through 29 add clean breadth-and-depth expansion cycles with no repository, map, visual, deployment, or production-verification regression.

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
布橋灌頂会 2026       review after 2026-09-27
```

The reviewed 2026 長浜曳山祭, 2026 佐陀神能 special-public-performance, and 2026 浜松まつり records are closed as held. The September 2026 佐陀神能御座替祭 and 布橋灌頂会 records remain scheduled and retain their dated reviews.

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
Product track       start Matsuri corpus expansion Batch 30
Depth target        resolve the next due 2026 Occurrence or deepen a low-density primary record with claim-specific Evidence
Breadth target      add one reviewed primary record from the 14 uncovered prefectures
Detail track        keep every public title navigable through the enforced Detail C contract
Production check    Batch 29 exact canonical-production baseline verified
Dated review        follow the dated review inventory above, including Hirosaki after 2026-08-07
Stabilization       record real maintenance burden while expansion work is performed
Gate review         not before 2026-08-10 and not by elapsed time alone
Cloudflare track    no pending Batch 29 deployment action
Jinja track         remain blocked until all four post-launch prerequisites complete
```
