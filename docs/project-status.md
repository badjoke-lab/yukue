# Project Status

**Last updated:** 2026-08-08

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
Latest corpus audit             docs/audits/matsuri-corpus-expansion-batch-32-2026-08-07.md
Latest production audit         docs/audits/matsuri-batch-32-production-verification-2026-08-08.md
Jinja start boundary            config/jinja-start-gate.json
Production topology             docs/deployment-topology.md
```

Exact current maintenance and production values are machine-checked in the two baseline JSON files.

## Verified Matsuri production position

```text
Worker                    matsuri-yukue
Canonical origin          https://matsuri-yukue.badjoke-lab.com/
Permanent Workers origin  https://matsuri-yukue.badjoke-lab.workers.dev/
Verified release          15da1b287724a415042610c64852670cda6a7da8
Verified on               2026-08-08
Canonical workflow        31259211574 — attempt 1 success
Cloudflare Version ID     41288ff6-c21f-41f2-932e-89b09369df61
```

Exact canonical-production verification succeeded on attempt 1 for the post-Aomori Batch 32 release.

```text
Entities          97
Change Events     94
Relations         58
Occurrences       153
Sitemap entries   198
```

The Batch 32 唐津くんち Festival, 唐津曳山取締会 Organization, State-free 唐津神社 reference, concrete 唐津神社 Place, and distributed procession-route Place satisfy the required production route, feed, title, HTML, noindex-preflight, and sitemap contracts. The production verifier also confirms the reviewed 弘前ねぷた2026, 秋田竿燈まつり2026, and 青森ねぶた2026 record-version-2 Occurrences as `held / unknown`, plus 唐津くんち2025 as `held / unknown`.

No URL is claimed already indexed. A `held` result does not imply that every published component completed normally.

## Current product track

The enforced Detail C surface requires real detail pages for every approved primary record, State-free seed-reference pages for approved Shrine and Temple records, public Place pages, bidirectional Relations, claim-linked Evidence and Sources, individual JSON, direct-detail search results, and no empty detail sections or internal-code labels.

Corpus expansion batches 11 through 32 are complete.

Batch 32 combined due maintenance and breadth expansion:

- 弘前ねぷたまつり2026 advanced from scheduled to record version 2 `held / unknown` using reviewed official Evidence;
- 秋田竿燈まつり2026 advanced from scheduled to record version 2 `held / unknown` using reviewed official Evidence;
- 唐津くんち became the first approved primary Matsuri record for 佐賀県;
- 唐津くんち includes 唐津曳山取締会, a State-free 唐津神社 reference, concrete and distributed Places, the held 2025 edition, the January 28, 1980 national Important Intangible Folk Cultural Property designation, and evidence-backed `maintained_by` / `ritually_associated_with` Relations.

On August 8, the repository launch-readiness gate correctly found the now-past 青森ねぶた2026 Occurrence still marked `scheduled`. PR #198 added official final-day operational Evidence, replaced it with record version 2 `held / unknown`, registered the maintenance/correction bundles in both dataset loaders, and refreshed the repository baseline. The stale production-baseline PR #197 was closed unmerged and replaced by #199.

The canonical corpus contains 97 Entities, covers 36 prefectures, and leaves 11 prefectures uncovered:

```text
群馬県
神奈川県
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

Batch 32 implementation, corpus audit, dated-maintenance correction, and exact canonical-production verification are complete. The final production baseline is pinned to implementation release `15da1b287724a415042610c64852670cda6a7da8` and was merged through PR #199 as `e57de2d9bb1ab223846148d9686addafab6e7322`.

## Stabilization review window

```text
Started               2026-07-27
Minimum duration      14 days
Earliest review       2026-08-10
Current status        observing
Review complete       false
```

Phase 10 observes production behavior, Search Console, Analytics receipt, corrections, deployment failures, data freshness, Relation integrity, and maintenance burden. Elapsed time alone does not complete the review. Search-engine indexation is observed but is not required.

Recorded real maintenance evidence now includes:

- the Batch 26 museum-hall route issue and correction;
- the Batch 30 transient external-map connection failure that passed unchanged on retry;
- the Batch 31 claim-specific Source-title correction;
- the Batch 32 scheduled-to-held 弘前 and 秋田 maintenance cycle;
- the August 8 青森ねぶた stale-schedule detection, correction-bundle addition, loader registration correction, and successful re-verification.

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

The reviewed 2026 長浜曳山祭, 2026 佐陀神能 special-public-performance, 2026 浜松まつり, 2026 西大寺会陽, 2026 三国祭, 2026 弘前ねぷたまつり, 2026 秋田竿燈まつり, and 2026 青森ねぶた records are closed as held. Future-dated records retain their review boundaries.

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

The candidate baseline contains 22 Relation-backed Shrine seeds and zero approved Jinja State Snapshots. Candidate extraction does not authorize implementation. No Jinja application, Worker, hostname, publication claim, or invented State Snapshot is authorized.

## Current release status

```text
repository-verified-canonical-production-verified-crawler-reachability-verified-sitemap-submission-verified-indexability-verified-analytics-traffic-verified-f2-launch-complete-stabilization-observing-jinja-start-blocked
```

## Immediate next actions

```text
Product track       start Matsuri corpus expansion Batch 33
Depth target        resolve the next due 2026 Occurrence or deepen a low-density primary record with claim-specific Evidence
Breadth target      add one reviewed primary record from the 11 uncovered prefectures
Detail track        keep every public title navigable through the enforced Detail C contract
Production check    Batch 32 exact canonical-production baseline verified
Dated review        follow the remaining dated review inventory above
Stabilization       continue recording real maintenance burden while expansion work is performed
Gate review         not before 2026-08-10 and not by elapsed time alone
Cloudflare track    no pending Batch 32 deployment action
Jinja track         remain blocked until all four post-launch prerequisites complete
```
