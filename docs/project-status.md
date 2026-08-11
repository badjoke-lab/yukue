# Project Status

**Last updated:** 2026-08-12

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
Matsuri prefecture breadth target — completed 47 / 47
Matsuri depth-first corpus maintenance — active
Matsuri stabilization review — reviewing / incomplete
Matsuri public/repository stabilization review — passed
Matsuri correction/deployment/maintenance review — passed
Actual Jinja start gate — blocked
future specialist-site implementation — not activated
```

## Current sources of truth

```text
Current repository counts       config/matsuri-repository-baseline.json
Current production baseline     config/matsuri-production-baseline.json
Analytics progression           config/matsuri-analytics-activation.json
Final F2 launch gate            config/matsuri-f2-launch-gate.json
Stabilization review            config/matsuri-stabilization-review.json
Stabilization review contract   docs/matsuri-stabilization-review.md
Latest review audit             docs/audits/matsuri-stabilization-maintenance-review-2026-08-12.md
Public review audit             docs/audits/matsuri-stabilization-public-review-2026-08-11.md
Detail C implementation         docs/matsuri-detail-c-implementation.md
Latest corpus audit             docs/audits/matsuri-corpus-expansion-batch-43-2026-08-11.md
Latest production audit         docs/audits/matsuri-batch-43-production-verification-2026-08-11.md
Jinja start boundary            config/jinja-start-gate.json
Production topology             docs/deployment-topology.md
```

## Verified Matsuri production position

```text
Worker                    matsuri-yukue
Canonical origin          https://matsuri-yukue.badjoke-lab.com/
Permanent Workers origin  https://matsuri-yukue.badjoke-lab.workers.dev/
Verified release          3604d984c71bb71f3b66245b87fa869a64ec85b3
Verified on               2026-08-11
Canonical workflow        31465702322 — attempt 1 success
Production-baseline PR    #246
Production-baseline merge 09f5b7c0ff2ff4f1e3bd0d59af1782eb720486e7
```

Exact canonical-production verification succeeded on attempt 1 for Batch 43.

```text
Entities          120
Change Events     106
Relations          70
Occurrences       166
Sitemap entries   238
```

The Batch 43 production contract includes HTTP-reachable routes for 宮﨑神宮大祭, the 宮﨑神宮 Shrine reference, the 宮﨑神宮 Place, and the distributed 御神幸行列 route Place. It verifies the 2024 edition as record version 1 `held / modified` and keeps the 2026 edition as record version 1 `scheduled / unknown`.

No URL is claimed already indexed. No future held outcome is inferred before post-event Evidence exists.

## Current product track

Corpus expansion batches 11 through 43 are complete.

Batch 43 added 宮﨑神宮大祭（神武さま） as the first approved primary Matsuri record for 宮崎県. The record includes:

- 宮﨑神宮 through an evidence-backed `ritually_associated_with` Relation;
- a concrete Shrine Place and a distributed procession-route Place without fabricated point coordinates;
- Current State `active`;
- annual recurrence centered on the October 26例祭 and the following Saturday/Sunday御神幸行列;
- the 2024 edition as `held / modified`, separating actual performance from weather-related modification Evidence;
- the 2026 edition as `scheduled / unknown` for October 31–November 1;
- a reviewed year-level c.1909 current-form establishment Change Event;
- seven Sources and twelve claim-linked Evidence records;
- an approved public map target for the Shrine anchor.

The canonical corpus now contains:

```text
Entities          120
Places            108
State Snapshots    56
Change Events     106
Occurrences       166
Relations          70
Designations       29
Sources           318
Evidence          699
```

Primary-record coverage is now **47 / 47 prefectures**. Prefecture gaps are zero, and no sparse primary Entity remains under the current corpus-coverage rule.

Geographic breadth is therefore no longer the default corpus-expansion axis. Subsequent Matsuri work should be depth-first: Occurrence history, Change Events, Relation density, Evidence quality, freshness review, corrections, and dated maintenance.

## Stabilization review window

```text
Started               2026-07-27
Minimum duration      14 days
Earliest review       2026-08-10
Current status        reviewing
Review eligible       true
Public/repository review  passed 2026-08-11
Maintenance review        passed 2026-08-12
Formal review complete    false
```

The public/repository stabilization audit records supported review inputs for production availability, canonical/HTTPS behavior, canonical Search, crawler/sitemap behavior, strict freshness, strict Relation coverage, and Evidence/correction-contract status.

The maintenance review records the remaining repository-visible conclusions:

```text
Known unresolved critical corrections   0
Production deployment failures           1
Manual maintenance burden                acceptable
```

The critical-correction count is the known unresolved inventory under the explicit review definition: no separately tracked unresolved Matsuri critical-correction issue plus green strict correction/freshness/Relation/Evidence/repository gates. It does not claim unknown defects are impossible.

The deployment-failure count records the one repository-preserved production deployment failure in the stabilization window: the first F2-26 attempt received a transient provider-side HTTP 503 after build and asset upload; retrying the same source succeeded. Batch 30's transient screenshot `ERR_CONNECTION_CLOSED` retry is not a production deployment failure.

Maintenance burden is `acceptable`, not `low`: the period included substantive embedded-map, Place-route, dated Occurrence, Source, and map corrections, but they remained bounded and were handled through normal PR, correction-bundle, and gate paths without correctness-gate bypass or untracked direct production-data mutation.

Still pending:

```text
Current Cloudflare Web Analytics traffic receipt   pending
Search Console observation                         pending
```

Historical F2-27 traffic evidence and F2-24 Search Console evidence are not silently reused as current stabilization observations.

Recorded maintenance evidence includes route and Source corrections, multiple scheduled-to-held rollovers, official-map remediation, split-component and distributed-route modeling, refusal to infer held outcomes from elapsed or future dates alone, strict rejection of unused Sources, State-free future-site seed alignment, and the narrow Batch 42 correction for a transient Google Maps third-party JWT RPC message without weakening first-party console-error strictness.

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
宮﨑神宮大祭 2026               review after 2026-11-01
```

## Jinja start boundary

```text
Matsuri F2-28 complete                 true
Matsuri stabilization review          false
Portal/Jinja implementation order     false
Jinja State specification approved    false
Explicit start authorization          false
```

Actual Jinja start gate — blocked

The candidate baseline is 26 Relation-backed Shrine seeds and zero approved Jinja State Snapshots. Batch 43 adds 宮﨑神宮 as a State-free Shrine seed reference. Candidate extraction does not authorize implementation.

## Current release status

```text
repository-verified-canonical-production-verified-crawler-reachability-verified-sitemap-submission-verified-indexability-verified-analytics-traffic-verified-f2-launch-complete-prefecture-breadth-47-of-47-stabilization-reviewing-private-observations-pending-jinja-start-blocked
```

## Immediate next actions

```text
Product track       continue Matsuri depth-first maintenance rather than breadth expansion
Depth target        prioritize due Occurrences, Change Events, Relation density, Evidence quality, freshness, and corrections
Breadth target      completed at 47 / 47 reviewed primary-prefecture coverage
Detail track        keep every public title navigable through the enforced Detail C and map contracts
Production check    Batch 43 exact canonical-production baseline verified
Dated review        follow the remaining dated review inventory above
Stabilization       reviewing; repository-visible conclusions recorded; formal review remains incomplete
Private review      confirm current Analytics traffic receipt and Search Console observation without committing private data
Operations review   critical correction count, deployment-failure count, and maintenance burden recorded
Cloudflare track    no pending Batch 43 deployment action
Jinja track         remain blocked until all post-launch prerequisites complete
```
