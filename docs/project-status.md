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
Latest corpus audit             docs/audits/matsuri-corpus-expansion-batch-36-2026-08-09.md
Latest production audit         docs/audits/matsuri-batch-36-production-verification-2026-08-09.md
Jinja start boundary            config/jinja-start-gate.json
Production topology             docs/deployment-topology.md
```

## Verified Matsuri production position

```text
Worker                    matsuri-yukue
Canonical origin          https://matsuri-yukue.badjoke-lab.com/
Permanent Workers origin  https://matsuri-yukue.badjoke-lab.workers.dev/
Verified release          440dddc53072d515cfa5cd0d33296add44dd1af2
Verified on               2026-08-09
Canonical workflow        31306079445 — attempt 1 success
Production-baseline PR    #217
Production-baseline merge 7f79bb3724832c54581dbf8d698ffc3f2aa23c53
```

Exact canonical-production verification succeeded on attempt 1 for Batch 36.

```text
Entities          106
Change Events      98
Relations          63
Occurrences       158
Sitemap entries   213
```

The verifier confirmed HTTP 200 for 鳥取しゃんしゃん祭, 鳥取しゃんしゃん祭振興会, JR鳥取駅前風紋広場, and the center-city umbrella-dance route. It also confirmed the August 13–15, 2026 edition as record version 1 `scheduled / unknown`.

No URL is claimed already indexed. The future 2026 edition is not claimed held before it occurs.

## Current product track

Corpus expansion batches 11 through 36 are complete.

Batch 36 added 鳥取しゃんしゃん祭 as the first approved primary Matsuri record for 鳥取県. The record includes:

- 鳥取しゃんしゃん祭振興会 through an evidence-backed `organized_by` Relation;
- JR鳥取駅前風紋広場 and the center-city umbrella-dance route as separate Places;
- Current State `active`;
- annual August 13–15 recurrence;
- August 13–15, 2026 as `scheduled / unknown`;
- a reviewed year-level 1965 start Change Event;
- five Sources and ten claim-linked Evidence records;
- a concrete official-map anchor through the 鳥取市 風紋広場 page without invented coordinates.

The canonical corpus now contains:

```text
Entities          106
Places             97
State Snapshots    49
Change Events      98
Occurrences       158
Relations          63
Designations       29
Sources           273
Evidence          623
```

Primary-record coverage is now 40 / 47 prefectures. Seven prefectures remain uncovered:

```text
群馬県
新潟県
長野県
兵庫県
和歌山県
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

Elapsed time alone does not complete the review. Search-engine indexation is observed but is not required. Recorded maintenance evidence includes the museum-hall route correction, transient map connection failure, Source-title correction, multiple 2026 scheduled-to-held rollovers, the Batch 34 official-map remediation, Batch 35 split-component modeling, and Batch 36 official-map / future-occurrence handling.

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

The candidate baseline remains 23 Relation-backed Shrine seeds and zero approved Jinja State Snapshots. Batch 36 adds no Shrine or Temple seed. Candidate extraction does not authorize implementation.

## Current release status

```text
repository-verified-canonical-production-verified-crawler-reachability-verified-sitemap-submission-verified-indexability-verified-analytics-traffic-verified-f2-launch-complete-stabilization-observing-jinja-start-blocked
```

## Immediate next actions

```text
Product track       start Matsuri corpus expansion Batch 37
Depth target        resolve the next due 2026 Occurrence or deepen a low-density primary record with claim-specific Evidence
Breadth target      add one reviewed primary record from the 7 uncovered prefectures
Detail track        keep every public title navigable through the enforced Detail C and map contracts
Production check    Batch 36 exact canonical-production baseline verified
Dated review        follow the remaining dated review inventory above
Stabilization       continue recording real maintenance burden while expansion work is performed
Gate review         not before 2026-08-10 and not by elapsed time alone
Cloudflare track    no pending Batch 36 deployment action
Jinja track         remain blocked until all four post-launch prerequisites complete
```
