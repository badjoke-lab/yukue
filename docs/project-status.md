# Project Status

**Last updated:** 2026-08-03

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

F2-28 accepted the complete launch chain after F2-27 was merged to `main`. The post-launch Detail C remediation replaced the one-record-only detail implementation with real detail, Relation, Place, Evidence, search, and individual-JSON routes for the complete approved public inventory.

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
Analytics progression           config/matsuri-analytics-activation.json
Final F2 launch gate            config/matsuri-f2-launch-gate.json
Stabilization review            config/matsuri-stabilization-review.json
Detail C implementation         docs/matsuri-detail-c-implementation.md
F2-28 evidence                  docs/audits/matsuri-f2-28-final-launch-gate-2026-07-27.md
Stabilization start evidence    docs/audits/matsuri-stabilization-start-2026-07-27.md
Latest corpus audit             docs/audits/matsuri-corpus-expansion-batch-25-2026-08-03.md
Jinja start boundary            config/jinja-start-gate.json
Production topology             docs/deployment-topology.md
```

Exact current maintenance counts and boundary values are machine-checked in `config/matsuri-repository-baseline.json`; this document does not duplicate those counts.

## Verified Matsuri production position

```text
Worker                    matsuri-yukue
Canonical origin          https://matsuri-yukue.badjoke-lab.com/
Permanent Workers origin  https://matsuri-yukue.badjoke-lab.workers.dev/
```

Verified production layers include canonical deployment, Search, crawler reachability, Search Console submission evidence, Cloudflare Web Analytics Automatic setup, post-activation deployment, production traffic receipt, and the final F2 Launch Gate.

No URL is claimed already indexed.

## Current product track

The enforced Detail C surface requires real detail pages for every approved primary record, State-free seed-reference pages for approved Shrine and Temple records, public Place pages, bidirectional Relations, claim-linked Evidence and Sources, individual JSON, direct-detail search results, and no empty detail sections or internal-code labels.

The next primary work is corpus expansion and deeper factual records. Stabilization observation continues in parallel but is not a reason to leave the corpus thin.

Corpus expansion batches 11 through 25 are complete. Batch 25 added 春日若宮おん祭 as the first approved primary Matsuri record for 奈良県, including the State-free 春日若宮 seed, concrete ritual anchor, 御旅所, route-based 御渡り式 area, 1136 origin, modified 2021 edition, 2022 return toward usual scale with rain cancellation of 御渡り式, and scheduled 2026 edition. It deepened 脚折雨乞 with the cancelled 2020 edition and the 8-year return in 2024. The next batch must continue the same uncovered-prefecture breadth plus sparse-record depth rule.

## Stabilization review window

```text
Started               2026-07-27
Minimum duration      14 days
Earliest review       2026-08-10
Current status        observing
Review complete       false
```

Phase 10 observes production behavior, Search Console, Analytics receipt, corrections, deployment failures, data freshness, Relation integrity, and maintenance burden. Elapsed time alone does not complete the review. Search-engine indexation is observed but is not required.

The review is a supporting operational gate. Meaningful corpus growth and real maintenance work are required before maintenance burden can be judged.

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
佐陀神能 2026          review after 2026-09-25
吉田の火祭 2026       review after 2026-08-27
石岡のおまつり 2026   review after 2026-09-21
上野天神祭 2026       review after 2026-10-25
春日若宮おん祭 2026   review after 2026-12-18
```

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

No Jinja application, Worker, hostname, publication claim, or invented State Snapshot is authorized.

## Current release status

```text
repository-verified-crawler-reachability-verified-sitemap-submission-verified-indexability-verified-analytics-traffic-verified-f2-launch-complete-stabilization-observing-jinja-start-blocked
```

## Immediate next actions

```text
Product track       start the next bounded Matsuri breadth-and-depth corpus batch
Detail track        keep every public title navigable through the enforced Detail C contract
Production check    confirm Batch 25 routes after the main deployment reaches the canonical origin
Dated review        follow the dated review inventory above
Stabilization       record real maintenance burden while expansion work is performed
Gate review         not before 2026-08-10 and not by elapsed time alone
Cloudflare track    verify the post-Batch-25 deployment; no new launch-gate action
Jinja track         remain blocked until four post-launch prerequisites complete
```
