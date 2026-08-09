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
F2-16 through F2-28 — completed
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
Latest corpus audit             docs/audits/matsuri-corpus-expansion-batch-34-2026-08-09.md
Latest production audit         docs/audits/matsuri-batch-34-production-verification-2026-08-09.md
Jinja start boundary            config/jinja-start-gate.json
Production topology             docs/deployment-topology.md
```

Exact maintenance and production values are machine-checked in the repository and production baseline JSON files.

## Verified Matsuri production position

```text
Worker                    matsuri-yukue
Canonical origin          https://matsuri-yukue.badjoke-lab.com/
Permanent Workers origin  https://matsuri-yukue.badjoke-lab.workers.dev/
Verified release          7ff68b011aa37e980e8281b30a9fbc1dfc8c6802
Verified on               2026-08-09
Canonical workflow        31303223524 — attempt 1 success
Production-baseline PR    #208
Production-baseline merge ad142b77c15f5a4b7d20818102eb4d9843f057ce
```

Exact canonical-production verification succeeded on attempt 1 for Batch 34.

```text
Entities          102
Change Events      96
Relations          61
Occurrences       155
Sitemap entries   206
```

The verifier confirmed HTTP 200 for the new おはら祭 Festival, おはら祭振興会 Organization, and 天文館電車通り会場 Place routes and confirmed the 2026 occurrence as record version 1 `scheduled / unknown`.

No URL is claimed already indexed. The November 2026 edition is not claimed held before it occurs.

## Current product track

The enforced Detail C surface requires real detail pages for every approved primary record, State-free seed-reference pages for approved Shrine and Temple records, public Place pages, bidirectional Relations, claim-linked Evidence and Sources, individual JSON, direct-detail search results, and no empty detail sections or internal-code labels.

Corpus expansion batches 11 through 34 are complete.

Batch 34 added おはら祭 as the first approved primary Matsuri record for 鹿児島県. The record includes:

- おはら祭振興会 as organizer;
- the 天文館電車通り dance-zone Place;
- Current State `active`;
- annual November 2 / November 3 recurrence;
- the future-dated 2026 edition as `scheduled / unknown`;
- a reviewed 1949 year-level start Change Event;
- five Sources and nine claim-linked Evidence records.

The first Detail C run rejected the new route Place because municipality-level coordinate precision was not sufficient as a concrete map anchor. The gate was not weakened and no coordinates were invented. The reviewed official 2026 tourism venue-map context was registered through the approved official-map mechanism, after which map utility, Detail C, full-page visual review, repository CI, and exact canonical-production verification all passed.

The canonical corpus now contains:

```text
Entities          102
Places             94
State Snapshots    47
Change Events      96
Occurrences       155
Relations          61
Designations       29
Sources           264
Evidence          603
```

Primary-record coverage is now 38 / 47 prefectures. Nine prefectures remain uncovered:

```text
群馬県
新潟県
長野県
大阪府
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

Phase 10 observes production behavior, Search Console, Analytics receipt, corrections, deployment failures, data freshness, Relation integrity, Evidence quality, map-contract maintenance, and maintenance burden. Elapsed time alone does not complete the review. Search-engine indexation is observed but is not required.

Recorded real maintenance evidence now includes:

- the Batch 26 museum-hall route issue and correction;
- the Batch 30 transient external-map connection failure that passed unchanged on retry;
- the Batch 31 claim-specific Source-title correction;
- the Batch 32 scheduled-to-held 弘前 and 秋田 maintenance cycle;
- the August 8 青森ねぶた stale-schedule detection and correction;
- the August 9 仙台七夕 stale-schedule detection and correction;
- the Batch 34 おはら祭 map-contract rejection and official-map remediation without invented coordinates.

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
さぬき高松まつり 2026 review after 2026-08-15
吉田の火祭 2026       review after 2026-08-27
郡上おどり 2026        review after 2026-09-05
石岡のおまつり 2026   review after 2026-09-21
佐陀神能 御座替祭 2026 review after 2026-09-25
布橋灌頂会 2026       review after 2026-09-27
上野天神祭 2026       review after 2026-10-25
おはら祭 2026         review after 2026-11-03
春日若宮おん祭 2026   review after 2026-12-18
```

Reviewed 2026 Occurrences already closed as held include 長浜曳山祭, 佐陀神能 special-public-performance, 浜松まつり, 西大寺会陽, 三国祭, 弘前ねぷたまつり, 秋田竿燈まつり, 青森ねぶた, and 仙台七夕まつり. Future-dated records retain their review boundaries.

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

The candidate baseline contains 23 Relation-backed Shrine seeds and zero approved Jinja State Snapshots. Batch 34 adds no Shrine or Temple seed. Candidate extraction does not authorize implementation. No Jinja application, Worker, hostname, publication claim, or invented State Snapshot is authorized.

## Current release status

```text
repository-verified-canonical-production-verified-crawler-reachability-verified-sitemap-submission-verified-indexability-verified-analytics-traffic-verified-f2-launch-complete-stabilization-observing-jinja-start-blocked
```

## Immediate next actions

```text
Product track       start Matsuri corpus expansion Batch 35
Depth target        resolve the next due 2026 Occurrence or deepen a low-density primary record with claim-specific Evidence
Breadth target      add one reviewed primary record from the 9 uncovered prefectures
Detail track        keep every public title navigable through the enforced Detail C and map contracts
Production check    Batch 34 exact canonical-production baseline verified
Dated review        follow the remaining dated review inventory above
Stabilization       continue recording real maintenance burden while expansion work is performed
Gate review         not before 2026-08-10 and not by elapsed time alone
Cloudflare track    no pending Batch 34 deployment action
Jinja track         remain blocked until all four post-launch prerequisites complete
```
