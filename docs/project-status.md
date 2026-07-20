# Project Status

**Last updated:** 2026-07-20

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
F2-P01 through F2-P13 — completed
F2-26 through F2-28 — operational hold
Actual Jinja start gate — blocked
```

F2-25 remains the next external gate, but owner Cloudflare access is pending. Repository maintenance has continued without changing that sequence: Astro is updated to 7.1.1, Matsuri maintenance 09 strengthens 櫛田神社 identity provenance, and maintenance 10 strengthens 阿蘇神社 and 秩父神社 identity provenance while preserving the blocked Jinja start gate and every future-application boundary.

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
F2-P01 through F2-P13 — completed
Astro 7.1.1 dependency maintenance — completed
櫛田神社 identity provenance maintenance — completed
阿蘇神社・秩父神社 identity provenance maintenance — completed
博多祇園山笠 2026 outcome review — completed
YOSAKOIソーラン 2026 outcome review — completed
弘前ねぷた 2026 schedule review — completed
```

## Parallel preparation results

### F2-P01 Analytics insertion preparation

The owner-access resumption path is implemented. `config/matsuri-analytics-activation.json` remains `pending-owner-access` and rejects false F2-25, F2-26, or F2-27 completion claims.

### F2-P02 through F2-P09 seed preparation and later provenance maintenance

Current public seed baseline:

```text
Relation-backed seeds           5
Jinja seeds                     5
Jiin seeds                      0
Tomurai seeds                   0
Direct identity Evidence        9
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

No shrine State is invented before the Jinja specification exists. 阿蘇神社 carries the existing official restoration Source plus a dedicated shrine overview. 櫛田神社 carries the existing official festival schedule Source plus a dedicated shrine page on the same official-organization site. 佐太神社 retains its official homepage because that page already directly identifies the shrine and its core context. 大日霊貴神社 carries both the existing 鹿角市 public-authority Source and the shrine-operated `dainichido.org` Source without conflating their authority classes. 秩父神社 carries the existing official night-festival Source plus a dedicated祭神・由緒 page.

Current portable artifact totals:

```text
Seed Entities                5
Matsuri context Entities      5
Places                        5
Sources                      10
Evidence                     14
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

The canonical loader and HTML Public Projection import the same `matsuri-record-overrides.mjs` implementation. The contract rejects reintroduced local implementations, duplicate corrected base IDs, missing stable IDs, non-increasing versions, and exact-replacement drift across all twelve families.

### F2-P13 shared canonical dataset assembly

```text
Dataset consumers              2
Shared dataset assemblers      1
Shared correction engines      1
Record families               12
Additive application slots    19
Correction bundles             5
Canonical dataset run          29640821913 — success
Correction contract run        29640822064 — success
Bundle inventory run           29640821894 — success
Repository CI run              29640821886 — success
Canonical Search run           29640821879 — success
Full-page screenshot run       29640821923 — success
Release artifact               8428563901
Release digest                 sha256:187ed4f919cd5d42ccb8e4e2de037f315a311132c266bd2500c9bc25529f1dd8
Screenshot artifact            8428556898
Screenshot digest              sha256:225d8a7c5b31432579ae9bb3e329b75cde2692f04168f99df32f1a5a0840619e
```

The canonical loader and HTML Public Projection now call the same `buildMatsuriCanonicalDataset()` implementation. The contract rejects missing base-family arrays, non-array bundle families, reintroduced local assembly logic, family-order drift, and duplicate accumulated IDs even when a family has no correction records.

### 2026-07-20 dependency and provenance maintenance

Astro 7.1.1 was merged after the frozen-lockfile install and all triggered checks passed. Matsuri maintenance 09 added one dedicated 櫛田神社 Source and one approved direct identity Evidence record. Maintenance 10 then added dedicated shrine-page Sources and approved direct identity Evidence records for 阿蘇神社 and 秩父神社.

```text
Maintenance 09 implementation head     7ae79a7f6fee8cd5429893e91c8a4645d957ac43
Maintenance 09 repository CI run       29717762633 — success
Maintenance 09 seed artifact           8451197243
Maintenance 09 seed digest             sha256:2961b317de4eac40801ac72c5d72143af9cc55d1cb0d9a5e755842b676775261

Maintenance 10 implementation head     bc54c06e9fb89223e6b0b8557a70c41dec8cd2bd
Maintenance 10 bundle inventory run    29731393730 — success
Maintenance 10 canonical dataset run   29731393741 — success
Maintenance 10 correction contract run 29731393733 — success
Maintenance 10 seed inventory run      29731393719 — success
Maintenance 10 seed readiness run      29731393667 — success
Maintenance 10 Jinja start-gate run    29731393755 — success
Maintenance 10 seed artifact           8456415716
Maintenance 10 seed digest             sha256:83ddd1b4acde08ad739f136c77ec933b61e080c13a513872b916dae497cc0b0d
```

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
docs/audits/matsuri-f2-p13-canonical-dataset-contract-2026-07-18.md
docs/audits/matsuri-kushida-jinja-identity-evidence-2026-07-20.md
docs/audits/matsuri-aso-chichibu-identity-evidence-2026-07-20.md
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

The canonical loader and HTML Public Projection share the complete inventory through maintenance 10 and correction 05, one twelve-family dataset assembler, and one correction engine. Every family requires unique accumulated IDs, an existing stable ID for correction, increasing `record_version`, and canonical F1, maintenance, and correction bundle order.

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

The gate includes dependency and workflow supply-chain checks, exact bundle inventory and application-order alignment, one shared twelve-family canonical dataset assembler, one shared all-family correction engine, static and browser verification, public-data semantics, Analytics-state validation, and the Jinja start-gate guardrail.

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
