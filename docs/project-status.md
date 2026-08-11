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
Latest corpus audit             docs/audits/matsuri-corpus-expansion-batch-41-2026-08-10.md
Latest production audit         docs/audits/matsuri-batch-41-production-verification-2026-08-11.md
Jinja start boundary            config/jinja-start-gate.json
Production topology             docs/deployment-topology.md
```

## Verified Matsuri production position

```text
Worker                    matsuri-yukue
Canonical origin          https://matsuri-yukue.badjoke-lab.com/
Permanent Workers origin  https://matsuri-yukue.badjoke-lab.workers.dev/
Verified release          69d350e9e55ae93c829f8ab535b22bc8df5f3772
Verified on               2026-08-11
Canonical workflow        31460920223 — attempt 1 success
Production-baseline PR    #238
Production-baseline merge b3049454625a25a37ce130b12dbb648aae3bd375
```

Exact canonical-production verification succeeded on attempt 1 for Batch 41.

```text
Entities          116
Change Events     104
Relations          68
Occurrences       163
Sitemap entries   230
```

The Batch 41 production contract includes HTTP-reachable routes for 山口祇園祭, the 八坂神社 Shrine reference, the 八坂神社 Place, and the distributed 御神幸・御還幸 route Place. It verifies the 2023 edition as record version 1 `held / unknown`.

No URL is claimed already indexed. No 2026 held outcome is inferred merely because the announced dates have elapsed.

## Current product track

Corpus expansion batches 11 through 41 are complete.

Batch 41 added 山口祇園祭 as the first approved primary Matsuri record for 山口県. The record includes:

- 八坂神社 through an evidence-backed `ritually_associated_with` Relation;
- a concrete Shrine Place and a distributed procession-route Place without fabricated point coordinates;
- Current State `active`;
- annual July 20–27 recurrence;
- the 2023 edition as `held / unknown` using reviewed post-event municipal material;
- a reviewed year-level 1459 first-edition/start Change Event;
- six Sources and eleven claim-linked Evidence records;
- an approved public map target for the Shrine anchor without invented route coordinates.

The canonical corpus now contains:

```text
Entities          116
Places            104
State Snapshots    54
Change Events     104
Occurrences       163
Relations          68
Designations       29
Sources           305
Evidence          676
```

Primary-record coverage is now 45 / 47 prefectures. Two prefectures remain uncovered:

```text
和歌山県
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

Recorded maintenance evidence includes route and Source corrections, multiple scheduled-to-held rollovers, official-map remediation, split-component and distributed-route modeling, refusal to infer held outcomes from elapsed dates alone, strict rejection of unused Sources, and Batch 41 Jinja seed-baseline alignment without Shrine State inference.

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

The candidate baseline is 24 Relation-backed Shrine seeds and zero approved Jinja State Snapshots. Batch 41 adds 八坂神社 as a State-free Shrine seed reference. Candidate extraction does not authorize implementation.

## Current release status

```text
repository-verified-canonical-production-verified-crawler-reachability-verified-sitemap-submission-verified-indexability-verified-analytics-traffic-verified-f2-launch-complete-stabilization-review-eligible-observing-jinja-start-blocked
```

## Immediate next actions

```text
Product track       execute Matsuri corpus expansion Batch 42
Depth target        add evidence-supported history or a verified Occurrence without inference
Breadth target      add one reviewed primary record from the 2 uncovered prefectures
Detail track        keep every public title navigable through the enforced Detail C and map contracts
Production check    Batch 41 exact canonical-production baseline verified
Dated review        follow the remaining dated review inventory above
Stabilization       perform the eligible formal review without treating elapsed time as completion
Review evidence     record manual maintenance burden and Search Console observation without private metrics
Cloudflare track    no pending Batch 41 deployment action
Jinja track         remain blocked until all post-launch prerequisites complete
```
