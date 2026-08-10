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
Latest corpus audit             docs/audits/matsuri-corpus-expansion-batch-37-2026-08-09.md
Latest production audit         docs/audits/matsuri-batch-37-production-verification-2026-08-10.md
Jinja start boundary            config/jinja-start-gate.json
Production topology             docs/deployment-topology.md
```

## Verified Matsuri production position

```text
Worker                    matsuri-yukue
Canonical origin          https://matsuri-yukue.badjoke-lab.com/
Permanent Workers origin  https://matsuri-yukue.badjoke-lab.workers.dev/
Verified release          a0f1dfc3a241479c419e745cf8f04fbe33be9aae
Verified on               2026-08-10
Canonical workflow        31363791720 — attempt 1 success
Production-baseline PR    #222
Production-baseline merge 016136a4a0b806aa1b17780df78dad7dbce622e5
```

Exact canonical-production verification succeeded on attempt 1 for Batch 37.

```text
Entities          108
Change Events      99
Relations          64
Occurrences       159
Sitemap entries   217
```

The Batch 37 production contract includes HTTP-reachable routes for 神戸まつり, 神戸市民祭協会, 東遊園地, and the distributed parade route. It also verifies the May 17, 2026 edition as record version 1 `held / unknown`.

No URL is claimed already indexed. No attendance or completion scale is inferred for the held 2026 edition.

## Current product track

Corpus expansion batches 11 through 37 are complete.

Batch 37 added 神戸まつり as the first approved primary Matsuri record for 兵庫県. The record includes:

- 神戸市民祭協会 through an evidence-backed `organized_by` Relation;
- 東遊園地 and the distributed parade route as separate Places;
- Current State `active`;
- annual May-third-Sunday recurrence;
- May 17, 2026 as `held / unknown`;
- a reviewed year-level 1971 start Change Event;
- five Sources and ten claim-linked Evidence records;
- a concrete official-map anchor through the 神戸市 東遊園地 page without invented route coordinates.

The canonical corpus now contains:

```text
Entities          108
Places             99
State Snapshots    50
Change Events      99
Occurrences       159
Relations          64
Designations       29
Sources           278
Evidence          633
```

Primary-record coverage is now 41 / 47 prefectures. Six prefectures remain uncovered:

```text
群馬県
新潟県
長野県
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

Recorded maintenance evidence now includes the museum-hall route correction, transient map connection failure, Source-title correction, multiple 2026 scheduled-to-held rollovers, the Batch 34 official-map remediation, Batch 35 split-component modeling, Batch 36 official-map / future-occurrence handling, and Batch 37 held-occurrence / distributed-route modeling.

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

The candidate baseline remains 23 Relation-backed Shrine seeds and zero approved Jinja State Snapshots. Batch 37 adds no Shrine or Temple seed. Candidate extraction does not authorize implementation.

## Current release status

```text
repository-verified-canonical-production-verified-crawler-reachability-verified-sitemap-submission-verified-indexability-verified-analytics-traffic-verified-f2-launch-complete-stabilization-review-eligible-observing-jinja-start-blocked
```

## Immediate next actions

```text
Product track       start Matsuri corpus expansion Batch 38
Depth target        resolve the next due 2026 Occurrence or deepen a low-density primary record with claim-specific Evidence
Breadth target      add one reviewed primary record from the 6 uncovered prefectures
Detail track        keep every public title navigable through the enforced Detail C and map contracts
Production check    Batch 37 exact canonical-production baseline verified
Dated review        follow the remaining dated review inventory above
Stabilization       perform the now-eligible formal review without treating elapsed time as completion
Review evidence     record manual maintenance burden and Search Console observation without private metrics
Cloudflare track    no pending Batch 37 deployment action
Jinja track         remain blocked until all four post-launch prerequisites complete
```
