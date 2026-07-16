# Project Status

**Last updated:** 2026-07-16

## Current phase

```text
Execution Stage F — Launch Preparation
```

## Current gate state

```text
F2-15 — Repository Launch Readiness Gate — completed
F2-M01 — Full-page screenshot visual-review workflow — completed
F2-M02 — Matsuri data freshness audit — completed
F2-16 through F2-24 — completed
F2-25 — active next gate
F2-25 owner Cloudflare access — pending
F2-P01 — Analytics and launch-closure repository preparation — completed
F2-P02 — relation-backed future-site seed inventory — completed
F2-P03 — future-site seed readiness audit — completed
F2-26 through F2-28 — operational hold
```

The Matsuri Custom Domain, canonical output, interactive browser Search, crawler-facing production surface, sitemap submission, and technical indexability evidence have passed their accepted verification boundaries. F2-25 remains the active external gate, but its owner-account action is pending. Repository work continues through the bounded parallel track described below.

## Verified canonical production baseline

```text
Cloudflare Worker
matsuri-yukue

Canonical origin
https://matsuri-yukue.badjoke-lab.com/

Canonical origin run
29191904624 — success

Canonical Search run
29193201911 — success

Crawler reachability run
29230233384 — success

Crawler evidence artifact
8271238535
sha256:ae292efac09e25fc9ad0cefd0a7de3c40d4a38c28472734035d728ecd26f2506
```

Verified external layers:

- HTTPS and required public routes,
- exact `manifest.site_origin`,
- canonical sitemap locations,
- desktop and mobile Pagefind Search,
- structured filters and result navigation,
- `robots.txt` and exact Sitemap discovery,
- self-canonical links on sitemap routes,
- indexable robots directives,
- representative Googlebot, bingbot, and OAI-SearchBot labels,
- public discovery files,
- successful Search Console sitemap submission,
- Google live-test indexability for a representative canonical route,
- indexing requests for the three required representative routes.

Evidence records:

```text
docs/audits/matsuri-f2-20-canonical-activation-2026-07-12.md
docs/audits/matsuri-f2-22-canonical-search-2026-07-12.md
docs/audits/matsuri-f2-23-crawler-reachability-2026-07-13.md
docs/audits/matsuri-f2-24-search-console-2026-07-14.md
docs/audits/matsuri-hakata-outcome-2026-07-16.md
```

The permanent Workers origin remains non-canonical:

```text
https://matsuri-yukue.badjoke-lab.workers.dev/
```

## Accepted deployment topology

```text
yukue.badjoke-lab.com          Yukue Series portal — planned
matsuri-yukue.badjoke-lab.com  祭のゆくえ — canonical production verified
```

```text
apps/portal   → Worker yukue-portal
apps/matsuri  → Worker matsuri-yukue
```

The portal and Matsuri remain separate public deployments. Matsuri is not hosted under `yukue.badjoke-lab.com/matsuri/`.

## Completed implementation

```text
Foundation through Stage E — completed
F1 batches 01 through 10 — completed
F2-01 through F2-15 — completed
F2-M01 — completed
F2-M02 — completed
F2-16 through F2-24 — completed
F2-P01 — completed
F2-P02 — completed
F2-P03 — completed
博多祇園山笠 2026 outcome review — completed
```

F2-P01 prepared the complete insertion path for the Cloudflare-dependent gates:

```text
config/matsuri-analytics-activation.json
scripts/check-matsuri-analytics-activation-record.mjs
docs/f2-25-cloudflare-web-analytics.md
docs/f2-26-f2-28-launch-closure.md
docs/templates/matsuri-f2-25-analytics-evidence.md
.github/workflows/verify-matsuri-analytics-activation-record.yml
```

The machine record remains `pending-owner-access` and mechanically rejects false F2-25, F2-26, or F2-27 completion claims.

## F2-P02 future-site seed inventory

F2-P02 derives only approved, Relation-backed starting points already present in the Matsuri corpus. It does not activate another application or decide implementation order.

```text
Workflow                        Build Yukue future-site seed inventory
Run                             29478631183 — success
Artifact                        8367573485
Artifact digest                 sha256:747a9b833adacbc049bf12e7a29312ab8ab676e3f3b2dc73e88c43e79a634524
Total relation-backed seeds     5
Relation contexts               5
Jinja seeds                     5
Jiin seeds                      0
Tomurai seeds                   0
```

Current Relation-backed Jinja seeds:

```text
阿蘇神社
櫛田神社
佐太神社
大日霊貴神社
秩父神社
```

The zero Jiin and Tomurai counts describe only the current strict extraction from approved Matsuri Relations. They do not assert that the future sites lack valid subjects.

## F2-P03 future-site seed readiness

F2-P03 audits the public information that can be carried from Matsuri and the target-site work that remains. It does not claim publication readiness.

```text
Workflow                           Audit Yukue future-site seed readiness
Run                                29479348339 — success
Artifact                           8367936520
Artifact digest                    sha256:ddc5dcdc01978671f68de1f827b6a84fd2eebdf2939813797da920f00c7df975
Seeds audited                      5
Cross-site context complete        0
Cross-site context incomplete      5
Official URL present               4
Official URL missing               1
Approved State Snapshot present    0
Direct identity Evidence present   0
```

All five have a public summary, geography, valid Place, Source coverage, and approved Relation context. All five lack an approved shrine State Snapshot and direct Entity-identity Evidence. 大日霊貴神社 also lacks an attached official URL. These are explicit research gaps, not inferred corrections and not permission to start the Jinja application.

## F2-M02 completion result

Fixed-date baseline completed on 2026-07-12:

```text
Occurrences total                    24
Resolved Occurrences                 15
Closed-period unresolved              0
Stale Current State candidates        0
Stale external-link candidates        0
Specialist Entities with no Relation  0
Relations missing Evidence            0
```

Current routine-maintenance inventory as of 2026-07-16:

```text
Occurrences total                    24
Resolved Occurrences                 16
Closed-period unresolved              0
In-progress scheduled                 1
Future scheduled                      7
Stale Current State candidates        0
Stale external-link candidates        0
Specialist Entities with no Relation  0
Relations missing Evidence            0
```

The official 博多祇園山笠振興会 result page records the 2026-07-15 追い山笠 timing results. `occ-hakata-2026-schedule` is corrected to `held`; scale remains `unknown` because the result page is not converted into an unsupported structured scale claim.

## Completed external deployment and verification

```text
F2-16  Cloudflare Workers Builds connection — completed
F2-17  first Workers Static Assets deployment — completed
F2-18  deployed-origin smoke verification — completed
F2-19  exact canonical Matsuri hostname decision — completed
F2-20  Custom Domain activation, canonical build, HTTPS verification — completed
F2-21  canonical manifest and sitemap verification — completed
F2-22  browser Pagefind Search verification — completed
F2-23  robots, canonical, sitemap, crawler-reachability review — completed
F2-24  Search Console sitemap submission and indexability check — completed
```

## F2-24 accepted evidence

```text
Search engine                       Google Search Console
Property type                       URL-prefix
Canonical sitemap submitted         success
Submitted date                      2026-07-14
Last read date                      2026-07-14
Discovered pages                    20
Technical preflight run             29232294960 — success
Technical preflight artifact        8271994696
Representative Google live test     indexable
Representative indexing requests    3 submitted
Indexation claimed                  false
```

F2-24 combines all-route automated preflight evidence with Search Console submission evidence and representative Google-specific evidence. It does not claim that Google has already indexed any URL.

## Cloudflare-dependent launch sequence

```text
F2-25  Cloudflare Web Analytics activation — owner access pending
F2-26  post-activation deployment — blocked by F2-25
F2-27  production traffic verification — blocked by F2-26
F2-28  final F2 Launch Gate — blocked by F2-27
```

When owner access resumes, insert the prepared sequence without redesign:

1. enable Automatic setup for `matsuri-yukue.badjoke-lab.com`,
2. record sanitized F2-25 evidence and update the machine record,
3. merge the F2-25 evidence PR and verify the resulting production deployment as F2-26,
4. confirm private-dashboard production traffic as F2-27,
5. run F2-28.

## Parallel work while Cloudflare access is pending

Allowed and active:

- reviewed factual and date-triggered Matsuri maintenance,
- Source, Evidence, and Relation maintenance,
- security and dependency maintenance,
- repairs required to keep repository and production gates green,
- public-safe Analytics and launch-closure preparation,
- refresh of the Relation-backed future-site seed inventory and readiness audit when approved Matsuri records change,
- future-site seed collection already implied by approved Matsuri Relations, without starting another public application.

Not activated:

- F2-25 through F2-28 completion claims,
- manual Analytics beacon code,
- portal production deployment,
- future specialist-site production implementation,
- Stats, Compare, dynamic API, MCP, paid API, x402, D1, real-time ingestion, or complex graph visualization.

## Routine maintenance after F2-M02

```text
博多祇園山笠 2026  outcome reviewed 2026-07-16 — held
郡上おどり 2026    review after 2026-09-05
```

## Repository gate

```text
pnpm gate:matsuri:repository
```

The repository gate preserves completed external work through F2-24, validates the completed Search Console record, validates the pending-to-complete Analytics progression record, and rejects past scheduled Occurrences that have not been reviewed. Dedicated workflows validate F2-P02 and F2-P03 whenever relevant canonical data or audit rules change.

## Current release status

```text
repository-verified-crawler-reachability-verified-sitemap-submission-verified-indexability-verified-analytics-owner-access-pending
```

## Immediate next actions

```text
Repository track  continue bounded Source, Evidence, Relation, security, dependency, and seed-maintenance work
Dated review      郡上おどり 2026 after 2026-09-05
Owner track       resume F2-25 when Cloudflare access becomes available
```
