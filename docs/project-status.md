# Project Status

**Last updated:** 2026-08-11

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
Latest corpus audit             docs/audits/matsuri-corpus-expansion-batch-42-2026-08-11.md
Latest production audit         docs/audits/matsuri-batch-42-production-verification-2026-08-11.md
Jinja start boundary            config/jinja-start-gate.json
Production topology             docs/deployment-topology.md
```

## Verified Matsuri production position

```text
Worker                    matsuri-yukue
Canonical origin          https://matsuri-yukue.badjoke-lab.com/
Permanent Workers origin  https://matsuri-yukue.badjoke-lab.workers.dev/
Verified release          d36797b2980ef9d639bfa7ee0a152a287a223d3a
Verified on               2026-08-11
Canonical workflow        31463272976 — attempt 1 success
Production-baseline PR    #243
Production-baseline merge aeea121ed2908e8e83c90ad727f5d69b6c1c753f
```

Exact canonical-production verification succeeded on attempt 1 for Batch 42.

```text
Entities          118
Change Events     105
Relations          69
Occurrences       164
Sitemap entries   234
```

The Batch 42 production contract includes HTTP-reachable routes for 和歌祭, the 紀州東照宮 Shrine reference, the 紀州東照宮 Place, and the distributed 和歌浦渡御 route Place. It verifies the 2026 edition as record version 1 `held / unknown` using post-event Evidence.

No URL is claimed already indexed.

## Current product track

Corpus expansion batches 11 through 42 are complete.

Batch 42 added 和歌祭 as the first approved primary Matsuri record for 和歌山県. The record includes:

- 紀州東照宮 through an evidence-backed `ritually_associated_with` Relation;
- a concrete Shrine Place and a distributed route Place without fabricated point coordinates;
- Current State `active`;
- annual second-Sunday-of-May recurrence;
- the 2026 edition as `held / unknown` using post-event reporting, with municipal material independently supporting the date and venue;
- a reviewed year-level 1622 first-edition/start Change Event;
- six Sources and eleven claim-linked Evidence records;
- an approved public map target for the Shrine anchor.

The canonical corpus now contains:

```text
Entities          118
Places            106
State Snapshots    55
Change Events     105
Occurrences       164
Relations          69
Designations       29
Sources           311
Evidence          687
```

Primary-record coverage is now 46 / 47 prefectures. One prefecture remains uncovered:

```text
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

Reaching the minimum observation duration makes the formal review eligible; it does not complete the gate. Production availability, canonical/HTTPS behavior, Search, crawler/sitemap behavior, Analytics traffic receipt, freshness, Relations, Evidence/corrections, manual maintenance burden, and Search Console observation must all be reviewed and recorded under the stabilization contract.

Recorded maintenance evidence now also includes Batch 42's narrow correction for a transient Google Maps third-party JWT RPC console message. The correction does not suppress general application or first-party console errors.

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

The candidate baseline is 25 Relation-backed Shrine seeds and zero approved Jinja State Snapshots. Batch 42 adds 紀州東照宮 as a State-free Shrine seed reference. Candidate extraction does not authorize implementation.

## Current release status

```text
repository-verified-canonical-production-verified-crawler-reachability-verified-sitemap-submission-verified-indexability-verified-analytics-traffic-verified-f2-launch-complete-stabilization-review-eligible-observing-jinja-start-blocked
```

## Immediate next actions

```text
Product track       execute Matsuri corpus expansion Batch 43
Depth target        add evidence-supported history or verified Occurrences without inference
Breadth target      add one reviewed primary record from the sole uncovered prefecture, 宮崎県
Detail track        keep every public title navigable through the enforced Detail C and map contracts
Production check    Batch 42 exact canonical-production baseline verified
Dated review        follow the remaining dated review inventory above
Stabilization       perform the eligible formal review without treating elapsed time as completion
Review evidence     record manual maintenance burden and Search Console observation without private metrics
Cloudflare track    no pending Batch 42 deployment action
Jinja track         remain blocked until all post-launch prerequisites complete
```
