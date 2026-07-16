# Development Schedule

**Status:** F2-24 completed / F2-25 owner access pending / F2-P01 through F2-P06 completed

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
F2-P06                       completed as guardrail
F2-25                        owner access pending
F2-26 through F2-28          operational hold
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
F2-P05  Seed handoff provenance and hosted compatibility verification — completed
F2-P06  Jinja start-gate record, validator, workflow, and inactive boundary — completed
```

Repository gate:

```text
pnpm gate:matsuri:repository
```

The repository gate includes the pending Analytics validator and the blocked Jinja start-gate validator.

## Parallel preparation results

### F2-P02 through F2-P05 — seed preparation

```text
Relation-backed seeds          5
Relation contexts              5
Identity Evidence references   5
Relation Evidence references   5
Place references               5
Approved shrine State          0
Seeds with official URLs       4
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

Current gaps:

```text
阿蘇神社        State Snapshotなし
櫛田神社        State Snapshotなし
佐太神社        State Snapshotなし
大日霊貴神社    State Snapshotなし / 公式URLなし
秩父神社        State Snapshotなし
```

These records are reusable starting points only. They do not activate Jinja, assign priority, or claim publication readiness.

### F2-P06 — inactive Jinja start gate

```text
Workflow                            Verify Jinja start-gate record
Run                                 29491745147 — success
Machine status                      blocked-by-matsuri-launch-closure
Jinja start gate passed             false
Application creation authorized     false
Worker creation authorized          false
Publication authorized              false
```

Required before Jinja implementation:

```text
1. F2-28 final Matsuri Launch Gate completion
2. Matsuri stabilization review completion
3. explicit portal/Jinja implementation-order decision
4. approved Jinja State specification and vocabulary
5. explicit start authorization
```

The guard rejects an early `apps/jinja`, Worker or hostname configuration, public route, publication claim, or inferred State.

## Parallel maintenance

```text
F2-M01  full-page screenshot visual-review workflow — completed
F2-M02  Matsuri data freshness audit — completed
```

Current inventory:

```text
Occurrences total                    24
Resolved Occurrences                 16
Closed-period unresolved              0
In-progress scheduled                 1
Future scheduled                      7
Specialist Entities with no Relation  0
Relations missing Evidence            0
```

Routine date-triggered checks:

```text
博多祇園山笠 2026  outcome reviewed 2026-07-16 — held
郡上おどり 2026    review after 2026-09-05
```

The 博多 result proves the outcome but does not support inferring a structured scale, so scale remains `unknown`.

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

F2-24 does not claim that any URL is already indexed.

### Cloudflare-dependent hold

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

## Sequence after F2-28

```text
1. complete Matsuri stabilization review
2. decide whether portal implementation precedes or follows Jinja
3. approve Jinja State specification and vocabulary
4. record explicit Jinja start authorization
5. pass the actual Jinja start gate
6. only then create apps/jinja and implementation work
```

F2-28 alone is not sufficient to begin Jinja.

## Work allowed before F2-25 completion

- maintain the pending Analytics record and launch runbooks,
- complete factual and date-triggered Matsuri maintenance,
- improve Source, Evidence, Relation, and seed-provenance coverage,
- refresh seed inventory and readiness artifacts when approved records change,
- maintain the blocked Jinja start-gate guardrail,
- perform security and dependency maintenance,
- repair repository or production gates.

## Work not activated

```text
F2-25 through F2-28 completion claims
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
