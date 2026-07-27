# Development Schedule

**Status:** F2-25 completed / F2-26 active next gate / F2-P01 through F2-P13 completed

This document defines the stable implementation order. It complements `roadmap.md` and `project-status.md`. The project is gate-driven rather than deadline-driven.

## Current position

```text
Foundation through Stage E  completed
F1 corpus expansion          completed
F2-01 through F2-25          completed
F2-M01                       completed
F2-M02                       completed
F2-P01 through F2-P13        completed
F2-26                        active next gate
F2-27 through F2-28          operational hold
Actual Jinja start gate      blocked
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
F2-P08  Jinja start-gate record, validator, workflow, and inactive boundary — completed
F2-P09  大日霊貴神社 official provenance and versioned Entity correction — completed
F2-P10  all-family ordered correction contract and dedicated gate — completed
F2-P11  exact loader/projection bundle application-order contract — completed
F2-P12  one shared correction engine across the loader and HTML Projection — completed
F2-P13  one shared twelve-family canonical dataset assembler — completed
```

Repository gate:

```text
pnpm gate:matsuri:repository
```

The repository gate includes dependency and workflow supply-chain checks, exact bundle inventory and order alignment, one shared twelve-family canonical dataset assembler, one shared all-family correction engine, F2-25 Analytics validation, and the blocked Jinja start-gate validator.

## Parallel preparation boundary

Future-site seed work remains candidate-only. No Jinja State Snapshot, application, Worker, hostname, or publication is authorized.

Current remaining seed gaps:

```text
阿蘇神社        State Snapshotなし
櫛田神社        State Snapshotなし
佐太神社        State Snapshotなし
大日霊貴神社    State Snapshotなし
秩父神社        State Snapshotなし
```

## Jinja start-gate prerequisites

```text
Matsuri F2-28 complete                 false
Matsuri stabilization review          false
Portal/Jinja implementation order     false
Jinja State specification approved    false
Explicit start authorization          false
```

Before Jinja implementation:

```text
1. complete F2-28
2. complete Matsuri stabilization review
3. decide portal/Jinja implementation order
4. approve Jinja State specification and vocabulary
5. record explicit start authorization
6. pass the actual Jinja start gate
7. only then create apps/jinja
```

F2-28 alone is not sufficient to begin Jinja.

## Parallel maintenance

```text
F2-M01  full-page screenshot visual-review workflow — completed
F2-M02  Matsuri data freshness audit — completed
```

Routine checks:

```text
博多祇園山笠 2026       outcome reviewed 2026-07-16 — held
YOSAKOIソーラン 2026    outcome reviewed 2026-07-16 — held
弘前ねぷた 2026         review after 2026-08-07
郡上おどり 2026         review after 2026-09-05
```

## External deployment and production verification

### Completed

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
F2-25  Cloudflare Web Analytics Automatic setup observed enabled — completed
```

F2-25 public-safe evidence:

```text
docs/audits/matsuri-f2-25-analytics-activation-2026-07-27.md
Observation  2026-07-27T09:37:29Z
```

The exact historical activation time was unavailable. The recorded timestamp is the first repository-verifiable enabled observation and does not claim the setting was first enabled at that instant.

### Active sequence

```text
F2-26  post-activation production deployment — active next gate
F2-27  production traffic verification — hold
F2-28  final F2 Launch Gate — hold
```

Exact continuation:

```text
1. merge the F2-25 evidence change
2. allow that resulting main commit to deploy
3. verify that deployment as F2-26
4. visit representative production routes
5. verify production traffic privately as F2-27
6. run F2-28
```

Do not use a manual beacon, store an Analytics token, publish private metrics, use a pull-request deployment as F2-26 evidence, or reuse a deployment predating the recorded F2-25 observation.

## Work allowed before F2-26 completion

- complete and verify the bounded F2-25 evidence PR,
- perform factual and date-triggered Matsuri maintenance,
- improve Source, Evidence, Relation, and seed-provenance coverage,
- maintain repository contracts and the blocked Jinja guardrail,
- perform security and dependency maintenance,
- repair repository or production gates.

## Work not activated

```text
F2-26 through F2-28 completion claims before evidence exists
portal production deployment
future specialist-site production implementation
Jinja State specification approval
apps/jinja
Jinja Worker or hostname activation
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
