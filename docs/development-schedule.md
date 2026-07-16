# Development Schedule

**Status:** F2-24 completed / F2-25 owner access pending / F2-P01 through F2-P07 completed

This document defines the stable implementation order. It complements `roadmap.md` and `project-status.md`. The project is gate-driven rather than deadline-driven.

## Current position

```text
Foundation through Stage E  completed
F1 corpus expansion          completed
F2-01 through F2-24          completed
F2-M01                       completed
F2-M02                       completed
F2-P01                       completed
F2-P02                       completed
F2-P03                       completed
F2-P04                       completed
F2-P05                       completed
F2-P06                       completed
F2-P07                       completed
F2-25                        owner access pending
F2-26 through F2-28          operational hold
```

## Foundation through Stage E

```text
Foundation  monorepo, app skeletons, shared packages, CI — completed
Stage A     shared UI foundation — completed
Stage B     Matsuri static surfaces — completed
Stage C     data core — completed
Stage D     canonical data and Public Projection — completed
Stage E     Browse, Pagefind Search, machine-readable layer — completed
```

## F1 — Corpus expansion

Status: **Completed through validated batches 01–10**

## F2 — Launch preparation

### Repository work

```text
F2-01  static build and artifact contract — completed
F2-02  public reference and secondary browse surfaces — completed
F2-03  deployed and canonical verification tooling — completed
F2-04  deployment verifier hardening — completed
F2-05  analytics policy baseline — completed
F2-06  schedule and status realignment — completed
F2-07  unified release verification — completed
F2-08  static route and internal-link integrity — completed
F2-09  HTML, JSON, Search, and sitemap consistency — completed
F2-10  public data semantic audit — completed
F2-11  Source and Evidence audit — completed
F2-12  responsive and accessibility browser audit — completed
F2-13  public content, empty-state, and image-boundary audit — completed
F2-14  release-candidate artifact freeze — completed
F2-15  Repository Launch Readiness Gate — completed
F2-P01  Analytics record, validator, evidence templates, and F2-26–28 runbook — completed
F2-P02  Relation-backed future-site seed inventory and hosted extraction — completed
F2-P03  Future-site seed readiness and explicit gap audit — completed
F2-P04  Direct Entity-identity Evidence for five shrine seeds — completed
F2-P05  Seed handoff record references and hosted compatibility verification — completed
F2-P06  Self-contained public provenance bundle and reference closure — completed
F2-P07  Candidate artifact contract v1 and hosted enforcement — completed
```

Repository gate:

```text
pnpm gate:matsuri:repository
```

### Parallel preparation results

```text
F2-P02  5 Relation-backed seeds / Jinja 5 / Jiin 0 / Tomurai 0
F2-P03  readiness baseline / State 0 / direct identity Evidence 0
F2-P04  direct identity Evidence 5 / State 0 / official URL 4
F2-P05  Place 5 / Identity Evidence 5 / Relation Evidence 5
F2-P06  self-contained bundle: 5 seed Entities, 5 context Entities, 5 Places,
         6 Sources, 10 Evidence, 5 Relations, 0 State Snapshots
F2-P07  contract v1: 3 required files, 5 seeds, 5 handoffs,
         exact site IDs and candidate-only boundaries enforced
```

Hosted evidence:

```text
F2-P02 run                    29478631183 — success
F2-P03 run                    29479348339 — success
F2-P04 run                    29489701435 — success
F2-P05 run                    29490466083 — success
F2-P06 run                    29491507863 — success
F2-P07 run                    29492382041 — success
F2-P07 artifact               8372948374
F2-P07 artifact digest        sha256:aed91e5ebe2b2e31261756f10b298d764fecad255939918f67f9fbcc6d4fe817
F2-P07 readiness run          29492381966 — success
```

Current remaining seed gaps:

```text
阿蘇神社        State Snapshotなし
櫛田神社        State Snapshotなし
佐太神社        State Snapshotなし
大日霊貴神社    State Snapshotなし / 公式URLなし
秩父神社        State Snapshotなし
```

These results do not activate Jinja, assign priority, or claim publication readiness.

### Parallel maintenance

```text
F2-M01  full-page screenshot visual-review workflow — completed
F2-M02  Matsuri data freshness audit — completed
```

```text
Occurrences total                    24
Resolved Occurrences                 16
Closed-period unresolved              0
In-progress scheduled                 1
Future scheduled                      7
Specialist Entities with no Relation  0
Relations missing Evidence            0
```

Routine checks:

```text
博多祇園山笠 2026  outcome reviewed 2026-07-16 — held
郡上おどり 2026    review after 2026-09-05
```

The 博多 result proves the outcome but not a structured scale, so scale remains `unknown`.

### External deployment and production verification

#### Completed

```text
F2-16  Cloudflare Workers Builds connection — completed
F2-17  first Workers Static Assets deployment — completed
F2-18  deployed-origin smoke verification — completed
F2-19  exact canonical Matsuri hostname decision — completed
F2-20  Custom Domain activation, canonical build, HTTPS verification — completed
F2-21  canonical manifest and sitemap verification — completed
F2-22  browser Pagefind Search verification on canonical origin — completed
F2-23  robots, canonical, sitemap, crawler-reachability review — completed
F2-24  Search Console sitemap submission and indexability check — completed
```

```text
Canonical origin          https://matsuri-yukue.badjoke-lab.com
Origin verification run   29191904624 — success
Search verification run   29193201911 — success
Crawler verification run  29230233384 — success
F2-24 preflight run        29232294960 — success
Search Console sitemap     success
Discovered pages           20
Representative live test  indexable
Indexing requests          3 submitted
```

F2-24 does not claim that any URL is already indexed.

#### Cloudflare-dependent hold

```text
F2-25  Cloudflare Web Analytics activation — owner access pending
F2-26  post-activation deployment — hold
F2-27  production traffic verification — hold
F2-28  final F2 Launch Gate — hold
```

Exact resumption sequence:

```text
1. enable Cloudflare Web Analytics Automatic setup
2. record and validate F2-25 evidence
3. merge the F2-25 evidence change
4. verify the resulting production deployment as F2-26
5. verify production traffic privately as F2-27
6. run F2-28
```

Do not use a manual beacon, store an Analytics token, publish private metrics, or reuse a pre-activation deployment as F2-26 evidence.

## Work allowed before F2-25 completion

- maintain the pending Analytics record and launch-closure runbooks,
- complete factual and date-triggered Matsuri maintenance,
- improve Source, Evidence, Relation, and seed-provenance coverage,
- maintain seed inventory, provenance, readiness, and artifact contracts,
- perform security and dependency maintenance,
- repair repository or production gates,
- collect future-site seed data already supported by approved Matsuri Relations without starting another public application.

## Work not activated

```text
F2-25 through F2-28 completion claims
portal production deployment
future specialist-site production implementation
Stats
Compare
dynamic API
MCP
paid API
x402 billing
D1 canonical database
real-time ingestion
complex graph visualization
```

## Documentation rule

Before implementation, read root and nearest `AGENTS.md`, `project-status.md`, this schedule, and the governing specification. Update status, roadmap, and decision records when their governed state changes.
