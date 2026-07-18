# Project Status

**Last updated:** 2026-07-18

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
F2-P01 through F2-P12 — completed
F2-26 through F2-28 — operational hold
Actual Jinja start gate — blocked
```

F2-25 remains the next external gate, but owner Cloudflare access is pending. F2-P12 removes the duplicated correction implementation without changing public facts, passing the Jinja start gate, or authorizing a future application.

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
F2-M01 and F2-M02 — completed
F2-16 through F2-24 — completed
F2-P01 through F2-P12 — completed
博多祇園山笠 2026 outcome review — completed
YOSAKOIソーラン 2026 outcome review — completed
弘前ねぷた 2026 schedule review — completed
```

## Parallel preparation results

### F2-P01 Analytics insertion preparation

The owner-access resumption path is implemented. `config/matsuri-analytics-activation.json` remains `pending-owner-access` and rejects false F2-25, F2-26, or F2-27 completion claims.

### F2-P02 through F2-P09 seed preparation

Current public seed baseline:

```text
Relation-backed seeds           5
Jinja seeds                     5
Jiin seeds                      0
Tomurai seeds                   0
Direct identity Evidence        6
Place references                5
Approved State Snapshots        0
Seeds with official URLs        5
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
大日霊貴神社    State Snapshotなし
秩父神社        State Snapshotなし
```

No shrine State is invented before the Jinja specification exists. 大日霊貴神社 now carries both the existing 鹿角市 public-authority Source and the shrine-operated `dainichido.org` Source without conflating their authority classes.

Current portable artifact totals:

```text
Seed Entities                5
Matsuri context Entities      5
Places                        5
Sources                       7
Evidence                     11
Relations                     5
State Snapshots               0
Artifact contract version     1
Required files                3
Provenance handoffs           5
```

The artifact contract rejects silent field removal, boundary reversal, site-ID drift, missing files, duplicate IDs, total mismatches, and removal of mandatory target-site review.

### F2-P10 correction contract

```text
Accepted record families      12
Correction bundles             5
Correction records             6
Corrected logical IDs          5
Correction contract run        29624424672 — success
Repository CI run              29624424628 — success
Full-page screenshot run       29624424660 — success
```

Every declared family uses ordered complete-record corrections in both the canonical loader and HTML Public Projection. The gate rejects unsupported families, invalid IDs or versions, non-increasing correction chains, missing base records, final-output drift, and projection coverage gaps.

### F2-P11 bundle-order contract

```text
F1 batches                    11
Maintenance bundles            8
Correction bundles             5
Additive application slots    19
Correction application slots   5
Bundle inventory run           29630494012 — success
Repository CI run              29630494013 — success
Release artifact               8425297044
Release digest                 sha256:f83b569a5c95dacecfd32ac5bef7f12bd30f4b1bae7614b72dc7296eec78196d
```

The bundle gate resolves the actual `additiveBundles` and `correctionBundles` array identifiers to repository paths and compares them to canonical loader declarations without sorting. The correct file set in the wrong order fails.

### F2-P12 shared correction engine

```text
Correction consumers           2
Shared correction engines      1
Record families               12
Correction contract run        29635048023 — success
Bundle inventory run           29635048060 — success
Repository CI run              29635048032 — success
Full-page screenshot run       29635048050 — success
Release artifact               8426823296
Release digest                 sha256:71e24fa155be7cff3e5366592179ddfddaa3e2ef6dbd17a76dbb8d8ee91800cc
Screenshot artifact            8426817176
Screenshot digest              sha256:8498f410ae47d0ee0c97e682e8c4248b1a564af6d3cb8d5cd8ff81992a5ad758
```

The canonical loader and HTML Public Projection now import the same `matsuri-record-overrides.mjs` implementation. The contract rejects reintroduced local implementations, duplicate corrected base IDs, missing stable IDs, non-increasing versions, and exact-replacement drift across all twelve families.

### Jinja start-gate guardrail

```text
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
docs/audits/yukue-f2-p09-dainichireiki-official-provenance-2026-07-17.md
docs/audits/matsuri-f2-p10-correction-contract-2026-07-18.md
docs/audits/matsuri-f2-p11-bundle-order-contract-2026-07-18.md
docs/audits/matsuri-f2-p12-shared-correction-engine-2026-07-18.md
docs/audits/matsuri-yosakoi-hirosaki-2026-07-16.md
```

## Routine Matsuri maintenance

```text
Occurrences total                    26
Resolved Occurrences                 17
Closed-period unresolved              0
In-progress scheduled                 1
Future scheduled                      8
Stale Current State candidates        0
Stale external-link candidates        0
Specialist Entities with no Relation  0
Relations missing Evidence            0
```

```text
博多祇園山笠 2026       outcome reviewed 2026-07-16 — held
YOSAKOIソーラン 2026    outcome reviewed 2026-07-16 — held
弘前ねぷた 2026         schedule reviewed 2026-07-16 — scheduled
郡上おどり 2026         review after 2026-09-05
```

The 博多祇園山笠 and YOSAKOIソーラン scales remain `unknown`; official outcome Evidence proves that each occurrence was held but does not provide a structured scale category. 弘前ねぷた remains `scheduled` and `unknown` until post-event Evidence is reviewed.

The canonical loader and HTML Public Projection share the complete inventory through maintenance 08 and correction 05. All twelve record families use one shared correction engine, require an existing stable ID and increasing `record_version`, and preserve canonical F1, maintenance, and correction bundle application order.

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

The gate includes dependency and workflow supply-chain checks, exact bundle inventory and application-order alignment, a single shared all-family correction engine, static and browser verification, public-data semantics, Analytics-state validation, and the Jinja start-gate guardrail.

## Current release status

```text
repository-verified-crawler-reachability-verified-sitemap-submission-verified-indexability-verified-analytics-owner-access-pending-jinja-start-blocked
```

## Immediate next actions

```text
Repository track  continue bounded Matsuri maintenance, security, dependency, and gate-preservation work
Dated review      弘前ねぷた 2026 after 2026-08-07; 郡上おどり 2026 after 2026-09-05
Owner track       resume F2-25 when Cloudflare access becomes available
Jinja track       remain blocked until every start-gate prerequisite is complete
```
