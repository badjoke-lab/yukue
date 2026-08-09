# Project Status

**Last updated:** 2026-08-09

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

## Current sources of truth

```text
Current repository counts       config/matsuri-repository-baseline.json
Current production baseline     config/matsuri-production-baseline.json
Analytics progression           config/matsuri-analytics-activation.json
Final F2 launch gate            config/matsuri-f2-launch-gate.json
Stabilization review            config/matsuri-stabilization-review.json
Detail C implementation         docs/matsuri-detail-c-implementation.md
Latest corpus audit             docs/audits/matsuri-corpus-expansion-batch-35-2026-08-09.md
Latest production audit         docs/audits/matsuri-batch-35-production-verification-2026-08-09.md
Jinja start boundary            config/jinja-start-gate.json
Production topology             docs/deployment-topology.md
```

## Verified Matsuri production position

```text
Worker                    matsuri-yukue
Canonical origin          https://matsuri-yukue.badjoke-lab.com/
Permanent Workers origin  https://matsuri-yukue.badjoke-lab.workers.dev/
Verified release          532861f164e32847a1e6c84ce544430267ad83db
Verified on               2026-08-09
Canonical workflow        31304578652 — attempt 1 success
Production-baseline PR    #213
Production-baseline merge d09e45363f607e54b948991574922863741efd71
```

Exact canonical-production verification succeeded on attempt 1 for Batch 35.

```text
Entities          104
Change Events      97
Relations          62
Occurrences       157
Sitemap entries   209
```

The verifier confirmed HTTP 200 for 岸和田だんじり祭, 岸和田地区年番, and the distributed city-route Place. It also confirmed both future-dated 2026 festival components as record version 1 `scheduled / unknown`.

No URL is claimed already indexed. Neither 2026 component is claimed held before it occurs.

## Current product track

Corpus expansion batches 11 through 35 are complete.

Batch 35 added 岸和田だんじり祭 as the first approved primary Matsuri record for 大阪府. The record includes:

- 岸和田地区年番 as a bounded district-level operational Relation;
- a distributed city-route Place backed by the official 岸和田市 Danjiri Map;
- Current State `active`;
- separate September and October annual series;
- September 19–20 and October 10–11, 2026 components as `scheduled / unknown`;
- a reviewed year-level 1703 origin Change Event;
- four municipal Sources and ten claim-linked Evidence records.

The two festival periods are not flattened into one artificial continuous Occurrence, and no route coordinates are invented.

The canonical corpus now contains:

```text
Entities          104
Places             95
State Snapshots    48
Change Events      97
Occurrences       157
Relations          62
Designations       29
Sources           268
Evidence          613
```

Primary-record coverage is now 39 / 47 prefectures. Eight prefectures remain uncovered:

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

No sparse primary Entity remains under the current corpus-coverage rule.

## Stabilization review window

```text
Started               2026-07-27
Minimum duration      14 days
Earliest review       2026-08-10
Current status        observing
Review complete       false
```

Elapsed time alone does not complete the review. Search-engine indexation is observed but is not required. Recorded maintenance evidence includes the museum-hall route correction, transient map connection failure, Source-title correction, multiple 2026 scheduled-to-held rollovers, the Batch 34 official-map remediation, and Batch 35's split-component / official-map modeling.

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

## Jinja start boundary

```text
Matsuri F2-28 complete                 true
Matsuri stabilization review          false
Portal/Jinja implementation order     false
Jinja State specification approved    false
Explicit start authorization          false
```

Actual Jinja start gate — blocked

The candidate baseline remains 23 Relation-backed Shrine seeds and zero approved Jinja State Snapshots. Batch 35 adds no Shrine or Temple seed. Candidate extraction does not authorize implementation.

## Current release status

```text
repository-verified-canonical-production-verified-crawler-reachability-verified-sitemap-submission-verified-indexability-verified-analytics-traffic-verified-f2-launch-complete-stabilization-observing-jinja-start-blocked
```

## Immediate next actions

```text
Product track       start Matsuri corpus expansion Batch 36
Depth target        resolve the next due 2026 Occurrence or deepen a low-density primary record with claim-specific Evidence
Breadth target      add one reviewed primary record from the 8 uncovered prefectures
Detail track        keep every public title navigable through the enforced Detail C and map contracts
Production check    Batch 35 exact canonical-production baseline verified
Dated review        follow the remaining dated review inventory above
Stabilization       continue recording real maintenance burden while expansion work is performed
Gate review         not before 2026-08-10 and not by elapsed time alone
Cloudflare track    no pending Batch 35 deployment action
Jinja track         remain blocked until all four post-launch prerequisites complete
```
