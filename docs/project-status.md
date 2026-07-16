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
F2-P05 — future-site seed handoff provenance — completed
F2-26 through F2-28 — operational hold
```

F2-25 remains the next external gate, but the owner-account action is pending. Cloudflare-independent repository work continues within the approved parallel-preparation boundary.

## Verified Matsuri production baseline

```text
Worker                    matsuri-yukue
Canonical origin          https://matsuri-yukue.badjoke-lab.com/
Canonical origin run      29191904624 — success
Canonical Search run      29193201911 — success
Crawler run               29230233384 — success
Crawler artifact          8271238535
Crawler digest            sha256:ae292efac09e25fc9ad0cefd0a7de3c40d4a38c28472734035d728ecd26f2506
```

Verified layers include HTTPS, canonical metadata, sitemap output, browser Search, crawler reachability, public discovery files, successful Search Console sitemap submission, a representative Google live test, and three indexing requests. No URL is claimed already indexed.

The permanent Workers origin remains non-canonical:

```text
https://matsuri-yukue.badjoke-lab.workers.dev/
```

## Accepted topology

```text
yukue.badjoke-lab.com          Yukue Series portal — planned
matsuri-yukue.badjoke-lab.com  祭のゆくえ — canonical production verified
```

```text
apps/portal   → Worker yukue-portal
apps/matsuri  → Worker matsuri-yukue
```

The portal and Matsuri remain separate deployments. Matsuri is not nested under a portal path.

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
F2-P05 — completed
博多祇園山笠 2026 outcome review — completed
```

## F2-P01 Analytics insertion preparation

The owner-access resumption path is already implemented:

```text
config/matsuri-analytics-activation.json
scripts/check-matsuri-analytics-activation-record.mjs
docs/f2-25-cloudflare-web-analytics.md
docs/f2-26-f2-28-launch-closure.md
docs/templates/matsuri-f2-25-analytics-evidence.md
.github/workflows/verify-matsuri-analytics-activation-record.yml
```

The machine record remains `pending-owner-access` and rejects false F2-25, F2-26, or F2-27 completion claims.

## F2-P02 relation-backed seeds

```text
Baseline run                    29478631183 — success
Baseline artifact              8367573485
Baseline digest                sha256:747a9b833adacbc049bf12e7a29312ab8ab676e3f3b2dc73e88c43e79a634524
Seeds                          5
Relation contexts              5
Jinja                          5
Jiin                           0
Tomurai                        0
```

Current Jinja seeds:

```text
阿蘇神社
櫛田神社
佐太神社
大日霊貴神社
秩父神社
```

The zero Jiin and Tomurai counts describe only the strict extraction from current approved Matsuri Relations. They are not completeness or priority claims.

## F2-P03 and F2-P04 readiness

F2-P03 established the baseline. F2-P04 added direct Entity-identity Evidence for all five seeds by reusing already approved Matsuri Sources.

```text
F2-P03 run                     29479348339 — success
F2-P03 artifact                8367936520
F2-P03 digest                  sha256:ddc5dcdc01978671f68de1f827b6a84fd2eebdf2939813797da920f00c7df975
F2-P04 run                     29489701435 — success
F2-P04 artifact                8371871954
F2-P04 digest                  sha256:478c27bd7049c17ac2f7d3623f839b28125c391f356a4bb6d6c87cf431f35445
Direct identity Evidence       5
Approved State Snapshots       0
Official URLs                  4
```

Remaining gaps:

```text
阿蘇神社        State Snapshotなし
櫛田神社        State Snapshotなし
佐太神社        State Snapshotなし
大日霊貴神社    State Snapshotなし / 公式URLなし
秩父神社        State Snapshotなし
```

No shrine State is invented before the Jinja specification exists. The public-authority page for 大日霊貴神社 is not mislabeled as a shrine-official URL.

## F2-P05 handoff provenance

F2-P05 extends the generated candidate artifact with exact approved provenance needed for later review.

```text
Workflow                       Build Yukue future-site seed inventory
Run                            29490466083 — success
Artifact                       8372200074
Artifact digest                sha256:427d3c63ae158246a3224e78bfcaaa63fa79268337bb32083550c8fc0c975389
Seeds                          5
Relation contexts              5
Relation Evidence references   5
Identity Evidence references   5
Place references               5
Jinja                          5
Jiin                           0
Tomurai                        0
Readiness compatibility run    29490466140 — success
```

Each current seed carries one Place reference, one direct Identity Evidence reference, one Identity Source reference, and one Relation Evidence reference. `approved_state_snapshot_ids` remains an explicit empty array for all five.

Evidence records:

```text
docs/audits/yukue-f2-p04-shrine-identity-evidence-2026-07-16.md
docs/audits/yukue-f2-p05-seed-handoff-provenance-2026-07-16.md
```

## Routine Matsuri maintenance

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

The 博多祇園山笠 scale remains `unknown`; the official timing result proves the outcome but not a structured scale category.

## Completed external sequence

```text
F2-16  Cloudflare Workers Builds connection — completed
F2-17  first Workers Static Assets deployment — completed
F2-18  deployed-origin smoke verification — completed
F2-19  exact canonical hostname decision — completed
F2-20  Custom Domain activation and HTTPS verification — completed
F2-21  manifest and sitemap verification — completed
F2-22  canonical browser Search verification — completed
F2-23  crawler reachability review — completed
F2-24  Search Console sitemap submission and indexability check — completed
```

## Cloudflare-dependent sequence

```text
F2-25  Cloudflare Web Analytics activation — owner access pending
F2-26  post-activation deployment — blocked by F2-25
F2-27  production traffic verification — blocked by F2-26
F2-28  final F2 Launch Gate — blocked by F2-27
```

When access resumes:

1. enable Automatic setup for `matsuri-yukue.badjoke-lab.com`,
2. record sanitized F2-25 evidence,
3. merge the evidence change and verify F2-26 deployment,
4. confirm private-dashboard traffic for F2-27,
5. run F2-28.

## Parallel-work boundary

Allowed:

- factual and date-triggered Matsuri maintenance,
- Source, Evidence, Relation, and seed-provenance maintenance,
- security and dependency maintenance,
- repairs required to keep gates green,
- public-safe Analytics and launch-closure preparation,
- future-site seed preparation implied by approved Matsuri Relations.

Not activated:

- F2-25 through F2-28 completion claims,
- manual Analytics beacon code,
- portal production deployment,
- future specialist-site implementation,
- Stats, Compare, dynamic API, MCP, paid API, x402, D1, real-time ingestion, or complex graph visualization.

## Repository gate

```text
pnpm gate:matsuri:repository
```

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
