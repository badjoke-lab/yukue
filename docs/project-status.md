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
F2-P04 — shrine direct identity Evidence maintenance — completed
F2-26 through F2-28 — operational hold
```

The Matsuri Custom Domain, canonical output, browser Search, crawler-facing production surface, sitemap submission, and technical indexability evidence have passed their accepted verification boundaries. F2-25 remains the active external gate, but its owner-account action is pending. Cloudflare-independent repository work continues through the bounded parallel track below.

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
- self-canonical links and indexable robots directives,
- representative Googlebot, bingbot, and OAI-SearchBot labels,
- public discovery files,
- successful Search Console sitemap submission,
- representative Google live-test indexability,
- indexing requests for the three required representative routes.

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
F2-P04 — completed
博多祇園山笠 2026 outcome review — completed
```

## F2-P01 Analytics insertion preparation

The complete owner-access resumption path already exists:

```text
config/matsuri-analytics-activation.json
scripts/check-matsuri-analytics-activation-record.mjs
docs/f2-25-cloudflare-web-analytics.md
docs/f2-26-f2-28-launch-closure.md
docs/templates/matsuri-f2-25-analytics-evidence.md
.github/workflows/verify-matsuri-analytics-activation-record.yml
```

The machine record remains `pending-owner-access` and rejects false F2-25, F2-26, or F2-27 completion claims.

## F2-P02 relation-backed future-site seeds

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

Current Jinja seeds:

```text
阿蘇神社
櫛田神社
佐太神社
大日霊貴神社
秩父神社
```

The zero Jiin and Tomurai counts describe only the current strict extraction from approved Matsuri Relations. They are not completeness or implementation-priority claims.

## F2-P03 and F2-P04 seed readiness

F2-P03 established the baseline. F2-P04 reused already approved Matsuri Sources to add Evidence directly targeting the five shrine Entity identities.

```text
F2-P03 baseline run              29479348339 — success
F2-P03 artifact                  8367936520
F2-P03 digest                    sha256:ddc5dcdc01978671f68de1f827b6a84fd2eebdf2939813797da920f00c7df975

F2-P04 verification run          29489701435 — success
F2-P04 artifact                  8371871954
F2-P04 digest                    sha256:478c27bd7049c17ac2f7d3623f839b28125c391f356a4bb6d6c87cf431f35445
```

Current readiness totals:

```text
Seeds audited                      5
Cross-site context complete        0
Cross-site context incomplete      5
Official URL present               4
Official URL missing               1
Approved State Snapshot present    0
Direct identity Evidence present   5
Direct identity Evidence missing   0
```

Current remaining gaps:

```text
阿蘇神社        State Snapshotなし
櫛田神社        State Snapshotなし
佐太神社        State Snapshotなし
大日霊貴神社    State Snapshotなし / 公式URLなし
秩父神社        State Snapshotなし
```

All five have summary, geography, valid Place, Source coverage, approved Relation context, and direct Entity-identity Evidence. No shrine State is invented before the Jinja specification exists. The public-authority page for 大日霊貴神社 is not mislabeled as a shrine official URL.

Evidence record:

```text
docs/audits/yukue-f2-p04-shrine-identity-evidence-2026-07-16.md
```

## F2-M02 routine-maintenance state

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

```text
博多祇園山笠 2026  outcome reviewed 2026-07-16 — held
郡上おどり 2026    review after 2026-09-05
```

The 2026 博多祇園山笠 scale remains `unknown`; the official timing-result page proves the event outcome but is not converted into an unsupported scale classification.

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

F2-24 does not claim that Google has already indexed any URL.

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
3. merge the F2-25 evidence change and verify the resulting deployment as F2-26,
4. confirm private-dashboard production traffic as F2-27,
5. run F2-28.

## Parallel work while Cloudflare access is pending

Allowed and active:

- reviewed factual and date-triggered Matsuri maintenance,
- Source, Evidence, and Relation maintenance,
- security and dependency maintenance,
- repairs required to keep repository and production gates green,
- public-safe Analytics and launch-closure preparation,
- refresh of future-site seed inventory and readiness audits when approved Matsuri records change,
- future-site seed preparation implied by approved Matsuri Relations, without starting another public application.

Not activated:

- F2-25 through F2-28 completion claims,
- manual Analytics beacon code,
- portal production deployment,
- future specialist-site production implementation,
- Stats, Compare, dynamic API, MCP, paid API, x402, D1, real-time ingestion, or complex graph visualization.

## Repository gate

```text
pnpm gate:matsuri:repository
```

The repository gate preserves completed external work through F2-24, validates the Search Console and pending Analytics records, and rejects past scheduled Occurrences that have not been reviewed. Dedicated workflows validate the future-site seed inventory and readiness state.

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
