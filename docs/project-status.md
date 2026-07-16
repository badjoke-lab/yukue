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
F2-P06 — self-contained seed provenance bundle — completed
F2-P07 — future-site seed artifact contract v1 — completed
F2-P08 — Jinja start-gate repository guardrail — completed
F2-26 through F2-28 — operational hold
Actual Jinja start gate — blocked
```

F2-25 remains the next external gate, but owner Cloudflare access is pending. F2-P08 completes only the guardrail that prevents premature Jinja work; it does not pass the actual Jinja start gate.

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

The portal and Matsuri remain separate deployments. Matsuri is not nested under a portal path. No Jinja application or Worker is active.

## Completed implementation

```text
Foundation through Stage E — completed
F1 batches 01 through 10 — completed
F2-01 through F2-15 — completed
F2-M01 — completed
F2-M02 — completed
F2-16 through F2-24 — completed
F2-P01 through F2-P08 — completed
博多祇園山笠 2026 outcome review — completed
```

## Parallel preparation results

### F2-P01 Analytics insertion preparation

The owner-access resumption path is implemented. `config/matsuri-analytics-activation.json` remains `pending-owner-access` and rejects false F2-25, F2-26, or F2-27 completion claims.

### F2-P02 through F2-P04 seed preparation

```text
F2-P02 run                     29478631183 — success
Seeds                          5
Jinja                          5
Jiin                           0
Tomurai                        0
F2-P03 readiness run           29479348339 — success
F2-P04 verification run        29489701435 — success
Direct identity Evidence       5
Approved State Snapshots       0
Official URLs                  4
```

Current Jinja seeds:

```text
阿蘇神社
櫛田神社
佐太神社
大日霊貴神社
秩父神社
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

### F2-P05 through F2-P07 portable artifacts

```text
F2-P05 run                    29490466083 — success
Relation Evidence refs        5
Identity Evidence refs        5
Place refs                    5
F2-P06 bundle run             29491507863 — success
Seed Entities                5
Matsuri context Entities      5
Places                        5
Sources                       6
Evidence                     10
Relations                     5
State Snapshots               0
F2-P07 contract run           29492382041 — success
Artifact contract version     1
Required files                3
Inventory seeds               5
Provenance handoffs           5
```

F2-P06 closes public-reference handoff dependencies inside `provenance.json`. F2-P07 rejects silent field removal, boundary reversal, site-ID drift, missing files, duplicate IDs, total mismatches, and removal of mandatory target-site review.

### F2-P08 Jinja start-gate guardrail

```text
Workflow                            Verify Jinja start-gate record
Run                                 29493210854 — success
Machine status                      blocked-by-matsuri-launch-closure
Jinja start gate passed             false
Application creation authorized     false
Worker creation authorized          false
Publication authorized              false
```

Required prerequisites remain incomplete:

```text
Matsuri F2-28 complete                 false
Matsuri stabilization review          false
Portal/Jinja implementation order     false
Jinja State specification approved    false
Explicit start authorization          false
```

The repository gate rejects early `apps/jinja`, Jinja deployment configuration, hostname activation, publication claims, State inference, inconsistent seed baselines, and private account data.

Evidence records:

```text
docs/audits/yukue-f2-p04-shrine-identity-evidence-2026-07-16.md
docs/audits/yukue-f2-p05-seed-handoff-provenance-2026-07-16.md
docs/audits/yukue-f2-p06-seed-provenance-bundle-2026-07-16.md
docs/audits/yukue-f2-p07-seed-artifact-contract-2026-07-16.md
docs/audits/yukue-f2-p08-jinja-start-gate-2026-07-16.md
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

F2-28 completion will still not pass the Jinja start gate by itself. Stabilization review, portal/Jinja order decision, Jinja State specification, and explicit authorization remain required.

## Parallel-work boundary

Allowed:

- factual and date-triggered Matsuri maintenance,
- Source, Evidence, Relation, seed-provenance, provenance-bundle, and artifact-contract maintenance,
- security and dependency maintenance,
- repairs required to keep gates green,
- public-safe Analytics and launch-closure preparation,
- maintenance of the blocked Jinja start-gate record.

Not activated:

- F2-25 through F2-28 completion claims,
- manual Analytics beacon code,
- portal production deployment,
- future specialist-site implementation,
- Jinja State specification or application creation,
- Stats, Compare, dynamic API, MCP, paid API, x402, D1, real-time ingestion, or complex graph visualization.

## Repository gate

```text
pnpm gate:matsuri:repository
```

The gate includes Analytics-state validation and the Jinja start-gate guardrail.

## Current release status

```text
repository-verified-crawler-reachability-verified-sitemap-submission-verified-indexability-verified-analytics-owner-access-pending-jinja-start-blocked
```

## Immediate next actions

```text
Repository track  continue bounded Matsuri maintenance, security, dependency, and gate-preservation work
Dated review      郡上おどり 2026 after 2026-09-05
Owner track       resume F2-25 when Cloudflare access becomes available
Jinja track       remain blocked until every start-gate prerequisite is complete
```
