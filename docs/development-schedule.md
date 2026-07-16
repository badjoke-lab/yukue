# Development Schedule

**Status:** F2-24 completed / F2-25 owner access pending / parallel repository work active

This document defines the stable implementation order. It complements `roadmap.md` and `project-status.md`. The project is gate-driven rather than deadline-driven.

## Current position

```text
Foundation through Stage E  completed
F1 corpus expansion          completed
F2-01 through F2-24          completed
F2-M01                       completed
F2-M02                       completed
F2-P01                       completed
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
```

Repository gate:

```text
pnpm gate:matsuri:repository
```

### Parallel maintenance

```text
F2-M01  full-page screenshot visual-review workflow — completed
F2-M02  Matsuri data freshness audit — completed
```

F2-M02 completion result:

```text
closed-period unresolved Occurrences  0
specialist Entities with no Relation  0
stale Current State candidates        0
stale external-link candidates        0
Relations missing Evidence            0
```

Routine date-triggered checks:

```text
博多祇園山笠 2026  review due after 2026-07-15 — active
郡上おどり 2026    review after 2026-09-05
```

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

Verified evidence:

```text
Canonical origin          https://matsuri-yukue.badjoke-lab.com
Origin verification run   29191904624 — success
Search verification run   29193201911 — success
Search artifact           8260207484
Crawler verification run  29230233384 — success
Crawler artifact          8271238535
F2-24 preflight run        29232294960 — success
F2-24 preflight artifact   8271994696
Search Console sitemap     success
Discovered pages           20
Representative live test  indexable
Indexing requests          3 submitted
```

Evidence records:

```text
docs/audits/matsuri-f2-20-canonical-activation-2026-07-12.md
docs/audits/matsuri-f2-22-canonical-search-2026-07-12.md
docs/audits/matsuri-f2-23-crawler-reachability-2026-07-13.md
docs/audits/matsuri-f2-24-search-console-2026-07-14.md
```

F2-24 combines all-route automated preflight evidence, successful Search Console sitemap acceptance, one representative Google live test, and indexing-request confirmation for the three required representative URLs. It does not claim that any URL is already indexed.

#### Cloudflare-dependent hold

```text
F2-25  Cloudflare Web Analytics activation — owner access pending
F2-26  post-activation deployment — hold
F2-27  production traffic verification — hold
F2-28  final F2 Launch Gate — hold
```

F2-25 remains the active next external gate. Its pending state is represented by `config/matsuri-analytics-activation.json` and validated by `pnpm check:matsuri:analytics-activation-record`.

The exact resumption sequence is fixed:

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

- prepare and validate the pending Analytics machine record,
- maintain the F2-25 through F2-28 runbooks and evidence templates,
- complete reviewed factual and date-triggered maintenance,
- improve Source, Evidence, and Relation coverage,
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
