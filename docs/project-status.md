# Project Status

**Last updated:** 2026-08-05

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
Latest corpus audit             docs/audits/matsuri-corpus-expansion-batch-30-2026-08-05.md
Latest production audit         docs/audits/matsuri-batch-30-production-verification-2026-08-05.md
Jinja start boundary            config/jinja-start-gate.json
Production topology             docs/deployment-topology.md
```

Exact current maintenance and production values are machine-checked in the two baseline JSON files.

## Verified Matsuri production position

```text
Worker                    matsuri-yukue
Canonical origin          https://matsuri-yukue.badjoke-lab.com/
Permanent Workers origin  https://matsuri-yukue.badjoke-lab.workers.dev/
Verified release          fa9324fa433b56699c368f31cfd0943cc678bfe5
Verified on               2026-08-05
```

Exact canonical-production verification succeeded on attempt 1 for the Batch 30 release.

```text
Entities          91
Change Events     91
Relations         54
Occurrences       151
Sitemap entries   188
```

The Batch 30 西大寺会陽 Festival, organizer Organization, concrete 西大寺観音院 Place, and retained 相馬野馬追 route return HTTP 200, contain real HTML structure and usable titles, carry no robots `noindex` directive, and appear in the canonical sitemap. The verified production layers also include Search, crawler reachability, Search Console submission evidence, Cloudflare Web Analytics Automatic setup, post-activation deployment, production traffic receipt, and the final F2 Launch Gate.

No URL is claimed already indexed.

## Current product track

The enforced Detail C surface requires real detail pages for every approved primary record, State-free seed-reference pages for approved Shrine and Temple records, public Place pages, bidirectional Relations, claim-linked Evidence and Sources, individual JSON, direct-detail search results, and no empty detail sections or internal-code labels.

Corpus expansion batches 11 through 30 are complete.

Batch 30 added 西大寺会陽 as the first approved primary Matsuri record for 岡山県, including:

- 西大寺会陽奉賛会 as the evidence-backed organizer;
- 西大寺観音院 as a concrete mapped ritual and main-venue Place;
- the held unknown-scale 2026 edition;
- the 2016 national Important Intangible Folk Cultural Property designation as a Change Event and Designation.

It deepened 相馬野馬追 with:

- the held unknown-scale May 24–26, 2025 Occurrence;
- the bounded 2025 format Change Event recording removal of the former women-rider condition limiting participation to unmarried riders under twenty.

The participation-rule record does not generalize beyond the published condition. 山あげ祭2026 remains unresolved because no reviewed official post-event result Evidence was available.

The canonical corpus contains 91 Entities, covers 34 prefectures, and leaves 13 prefectures uncovered. No sparse primary Entity remains under the current corpus-coverage rule.

Batch 30 implementation, corpus audit, and exact canonical-production verification are complete. The production baseline is pinned to implementation merge commit `fa9324fa433b56699c368f31cfd0943cc678bfe5`.

## Stabilization review window

```text
Started               2026-07-27
Minimum duration      14 days
Earliest review       2026-08-10
Current status        observing
Review complete       false
```

Phase 10 observes production behavior, Search Console, Analytics receipt, corrections, deployment failures, data freshness, Relation integrity, and maintenance burden. Elapsed time alone does not complete the review. Search-engine indexation is observed but is not required.

The Batch 26 museum-hall route issue and correction remain maintenance-burden evidence. Batch 30 additionally records one transient external-map `ERR_CONNECTION_CLOSED` during the first 208-screenshot artifact audit; the same unchanged build passed on the second attempt with zero failures and zero warnings. Batches 27 through 30 otherwise retain clean breadth-and-depth expansion cycles with no repository, data, map, deployment, or production-verification regression.

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
弘前ねぷた 2026        review after 2026-08-07
郡上おどり 2026        review after 2026-09-05
佐陀神能 御座替祭 2026 review after 2026-09-25
吉田の火祭 2026       review after 2026-08-27
石岡のおまつり 2026   review after 2026-09-21
上野天神祭 2026       review after 2026-10-25
春日若宮おん祭 2026   review after 2026-12-18
さぬき高松まつり 2026 review after 2026-08-15
布橋灌頂会 2026       review after 2026-09-27
```

The reviewed 2026 長浜曳山祭, 2026 佐陀神能 special-public-performance, 2026 浜松まつり, and 2026 西大寺会陽 records are closed as held. The September 2026 佐陀神能御座替祭 and 布橋灌頂会 records remain scheduled and retain their dated reviews.

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

No Jinja application, Worker, hostname, publication claim, or invented State Snapshot is authorized. The repository retains zero approved Jinja State Snapshots.

## Current release status

```text
repository-verified-canonical-production-verified-crawler-reachability-verified-sitemap-submission-verified-indexability-verified-analytics-traffic-verified-f2-launch-complete-stabilization-observing-jinja-start-blocked
```

## Immediate next actions

```text
Product track       start Matsuri corpus expansion Batch 31
Depth target        resolve the next due 2026 Occurrence or deepen a low-density primary record with claim-specific Evidence
Breadth target      add one reviewed primary record from the 13 uncovered prefectures
Detail track        keep every public title navigable through the enforced Detail C contract
Production check    Batch 30 exact canonical-production baseline verified
Dated review        follow the dated review inventory above, including Hirosaki after 2026-08-07
Stabilization       record real maintenance burden while expansion work is performed
Gate review         not before 2026-08-10 and not by elapsed time alone
Cloudflare track    no pending Batch 30 deployment action
Jinja track         remain blocked until all four post-launch prerequisites complete
```
