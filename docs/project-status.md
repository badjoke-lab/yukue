# Project Status

**Last updated:** 2026-08-10

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
Matsuri stabilization review — observing / review eligible
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
Latest corpus audit             docs/audits/matsuri-corpus-expansion-batch-39-2026-08-10.md
Latest production audit         docs/audits/matsuri-batch-39-production-verification-2026-08-10.md
Jinja start boundary            config/jinja-start-gate.json
Production topology             docs/deployment-topology.md
```

## Verified Matsuri production position

```text
Worker                    matsuri-yukue
Canonical origin          https://matsuri-yukue.badjoke-lab.com/
Permanent Workers origin  https://matsuri-yukue.badjoke-lab.workers.dev/
Verified release          76ab0b37294870e3fb372405672867053a7b7936
Verified on               2026-08-10
Canonical workflow        31391829497 — attempt 1 success
Production-baseline PR    #230
Production-baseline merge c8c82e15d200ba36cdf5d7e984d303c519894a7f
```

Exact canonical-production verification succeeded on attempt 1 for Batch 39.

```text
Entities          112
Change Events     102
Relations          66
Occurrences       161
Sitemap entries   223
```

The Batch 39 production contract includes HTTP-reachable routes for 長野びんずる, 長野びんずる実行委員会, and the center-city route Place. It verifies the 2025 edition as record version 1 `held / unknown`.

No URL is claimed already indexed. No 2026 held outcome is inferred merely because the announced date has elapsed.

## Current product track

Corpus expansion batches 11 through 39 are complete.

Batch 39 added 長野びんずる as the first approved primary Matsuri record for 長野県. The record includes:

- 長野びんずる実行委員会 through an evidence-backed `organized_by` Relation;
- a center-city route Place without fabricated point coordinates;
- Current State `active`;
- annual first-Saturday-of-August recurrence;
- the 2025 edition as `held / unknown` using reviewed Nagano City post-event material;
- a reviewed year-level 1971 first-edition/start Change Event;
- six Sources and nine claim-linked Evidence records;
- an approved official route/map target without invented coordinates.

The canonical corpus now contains:

```text
Entities          112
Places            101
State Snapshots    52
Change Events     102
Occurrences       161
Relations          66
Designations       29
Sources           291
Evidence          654
```

Primary-record coverage is now 43 / 47 prefectures. Four prefectures remain uncovered:

```text
新潟県
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
Review eligible       true
Review complete       false
```

Reaching 2026-08-10 makes the formal review eligible; it does not complete the gate. Production availability, canonical/HTTPS behavior, Search, crawler/sitemap behavior, Analytics traffic receipt, freshness, Relations, Evidence/corrections, manual maintenance burden, and Search Console observation must all be reviewed and recorded under the stabilization contract.

Recorded maintenance evidence now includes the museum-hall route correction, transient map connection failure, Source-title correction, multiple 2026 scheduled-to-held rollovers, the Batch 34 official-map remediation, Batch 35 split-component modeling, Batch 36 official-map / future-occurrence handling, Batch 37 held-occurrence / distributed-route modeling, Batch 38's explicit refusal to infer a held 2026 edition from elapsed dates without post-event Evidence, and Batch 39's same boundary for the elapsed Nagano 2026 schedule.

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

The candidate baseline remains 23 Relation-backed Shrine seeds and zero approved Jinja State Snapshots. Batch 39 adds no Shrine or Temple seed. Candidate extraction does not authorize implementation.

## Current release status

```text
repository-verified-canonical-production-verified-crawler-reachability-verified-sitemap-submission-verified-indexability-verified-analytics-traffic-verified-f2-launch-complete-stabilization-review-eligible-observing-jinja-start-blocked
```

## Immediate next actions

```text
Product track       start Matsuri corpus expansion Batch 40
Depth target        resolve the next due 2026 Occurrence or deepen a low-density primary record with claim-specific Evidence
Breadth target      add one reviewed primary record from the 4 uncovered prefectures
Detail track        keep every public title navigable through the enforced Detail C and map contracts
Production check    Batch 39 exact canonical-production baseline verified
Dated review        follow the remaining dated review inventory above
Stabilization       perform the now-eligible formal review without treating elapsed time as completion
Review evidence     record manual maintenance burden and Search Console observation without private metrics
Cloudflare track    no pending Batch 39 deployment action
Jinja track         remain blocked until all four post-launch prerequisites complete
```
