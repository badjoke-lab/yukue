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

F2-28 accepted the complete launch chain after F2-27 was merged to `main`. The post-launch Detail C implementation provides real detail, Relation, Place, Evidence, search, individual-JSON, and map behavior for the complete approved public inventory.

## Current sources of truth

```text
Current repository counts       config/matsuri-repository-baseline.json
Current production baseline     config/matsuri-production-baseline.json
Analytics progression           config/matsuri-analytics-activation.json
Final F2 launch gate            config/matsuri-f2-launch-gate.json
Stabilization review            config/matsuri-stabilization-review.json
Detail C implementation         docs/matsuri-detail-c-implementation.md
Latest corpus audit             docs/audits/matsuri-corpus-expansion-batch-33-2026-08-09.md
Latest production audit         docs/audits/matsuri-batch-33-production-verification-2026-08-09.md
Jinja start boundary            config/jinja-start-gate.json
Production topology             docs/deployment-topology.md
```

Exact current maintenance and production values are machine-checked in the repository and production baseline JSON files.

## Verified Matsuri production position

```text
Worker                    matsuri-yukue
Canonical origin          https://matsuri-yukue.badjoke-lab.com/
Permanent Workers origin  https://matsuri-yukue.badjoke-lab.workers.dev/
Verified release          239ac16067b9bc279d3a460dcbeae961244a0e88
Verified on               2026-08-09
Canonical workflow        31300301978 — attempt 1 success
Production-baseline PR    #205
Production-baseline merge 2bfeaf2145a102659895960b4f24b476e782b894
```

Exact canonical-production verification succeeded on attempt 1 for the final post-maintenance Batch 33 release.

```text
Entities          100
Change Events      95
Relations          60
Occurrences       154
Sitemap entries   203
```

The verifier confirmed the Batch 33 茅ヶ崎海岸浜降祭 Festival, 茅ヶ崎海岸浜降祭実行委員会 Organization, State-free 寒川神社 reference, 茅ヶ崎西浜海岸 Place, and 寒川神社 Place routes. It also confirmed the new baseline assertions for 茅ヶ崎海岸浜降祭2025 and the dated-maintenance 仙台七夕まつり2026 record.

No URL is claimed already indexed. A `held` result does not imply that every published component completed normally.

## Current product track

The enforced Detail C surface requires real detail pages for every approved primary record, State-free seed-reference pages for approved Shrine and Temple records, public Place pages, bidirectional Relations, claim-linked Evidence and Sources, individual JSON, direct-detail search results, and no empty detail sections or internal-code labels.

Corpus expansion batches 11 through 33 are complete.

Batch 33 combined regional breadth with a real dated-maintenance cycle:

- 茅ヶ崎海岸浜降祭 became the first approved primary Matsuri record for 神奈川県;
- its public record includes the実行委員会, State-free 寒川神社 reference, two concrete Places, annual recurrence, held 2025 edition, 1978 prefectural designation, and evidence-backed Relations;
- the August 9 repository launch-readiness gate correctly found 仙台七夕まつり2026 still marked `scheduled` after its August 8 end date;
- PR #203 added reviewed official post-event Evidence and advanced the Occurrence to record version 2 `held / unknown` without inferring normal scale;
- the superseded first audit PR #202 was closed unmerged and replaced by the post-maintenance audit PR #204;
- production baseline PR #205 then passed exact canonical verification on attempt 1.

The final post-maintenance canonical corpus contains:

```text
Entities          100
Places             93
State Snapshots    46
Change Events      95
Occurrences       154
Relations          60
Designations       29
Sources           259
Evidence          594
```

Primary-record coverage is now 37 / 47 prefectures. Ten prefectures remain uncovered:

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
鹿児島県
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

Phase 10 observes production behavior, Search Console, Analytics receipt, corrections, deployment failures, data freshness, Relation integrity, Evidence quality, and maintenance burden. Elapsed time alone does not complete the review. Search-engine indexation is observed but is not required.

Recorded real maintenance evidence now includes:

- the Batch 26 museum-hall route issue and correction;
- the Batch 30 transient external-map connection failure that passed unchanged on retry;
- the Batch 31 claim-specific Source-title correction;
- the Batch 32 scheduled-to-held 弘前 and 秋田 maintenance cycle;
- the August 8 青森ねぶた stale-schedule detection and successful correction/re-verification;
- the August 9 仙台七夕 stale-schedule detection, post-event Evidence addition, record-version-2 correction, loader registration, full repository re-verification, screenshot verification, and exact canonical-production verification.

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
郡上おどり 2026        review after 2026-09-05
佐陀神能 御座替祭 2026 review after 2026-09-25
吉田の火祭 2026       review after 2026-08-27
石岡のおまつり 2026   review after 2026-09-21
上野天神祭 2026       review after 2026-10-25
春日若宮おん祭 2026   review after 2026-12-18
さぬき高松まつり 2026 review after 2026-08-15
布橋灌頂会 2026       review after 2026-09-27
```

Reviewed 2026 Occurrences now closed as held include 長浜曳山祭, 佐陀神能 special-public-performance, 浜松まつり, 西大寺会陽, 三国祭, 弘前ねぷたまつり, 秋田竿燈まつり, 青森ねぶた, and 仙台七夕まつり. Future-dated records retain their review boundaries.

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

The candidate baseline contains 23 Relation-backed Shrine seeds and zero approved Jinja State Snapshots. Candidate extraction does not authorize implementation. No Jinja application, Worker, hostname, publication claim, or invented State Snapshot is authorized.

## Current release status

```text
repository-verified-canonical-production-verified-crawler-reachability-verified-sitemap-submission-verified-indexability-verified-analytics-traffic-verified-f2-launch-complete-stabilization-observing-jinja-start-blocked
```

## Immediate next actions

```text
Product track       start Matsuri corpus expansion Batch 34
Depth target        resolve the next due 2026 Occurrence or deepen a low-density primary record with claim-specific Evidence
Breadth target      add one reviewed primary record from the 10 uncovered prefectures
Detail track        keep every public title navigable through the enforced Detail C contract
Production check    Batch 33 exact canonical-production baseline verified
Dated review        follow the remaining dated review inventory above
Stabilization       continue recording real maintenance burden while expansion work is performed
Gate review         not before 2026-08-10 and not by elapsed time alone
Cloudflare track    no pending Batch 33 deployment action
Jinja track         remain blocked until all four post-launch prerequisites complete
```
