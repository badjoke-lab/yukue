# Development Schedule

**Status:** F2-27 completed / F2-28 active next gate / F2-P01 through F2-P13 completed

This project is gate-driven rather than deadline-driven.

## Current position

```text
Foundation through Stage E  completed
F1 corpus expansion          completed
F2-01 through F2-27          completed
F2-M01                       completed
F2-M02                       completed
F2-P01 through F2-P13        completed
F2-28                        active next gate
Actual Jinja start gate      blocked
```

## Repository work

```text
F2-01 through F2-15    repository launch-readiness work — completed
F2-P01 through F2-P13  Analytics preparation, seed provenance, correction, and dataset contracts — completed
```

Repository gate:

```text
pnpm gate:matsuri:repository
```

The gate includes dependency and workflow supply-chain checks, bundle inventory and order, the shared canonical dataset and correction engine, public-output verification, strict external-link, Relation, and freshness contracts, F2-27 Analytics progression validation, and the blocked Jinja start gate.

## External deployment and production verification

### Completed

```text
F2-16  Cloudflare Workers Builds connection — completed
F2-17  first Workers Static Assets deployment — completed
F2-18  deployed-origin smoke verification — completed
F2-19  exact canonical Matsuri hostname decision — completed
F2-20  Custom Domain activation and HTTPS verification — completed
F2-21  canonical manifest and sitemap verification — completed
F2-22  browser Pagefind Search verification — completed
F2-23  crawler-reachability review — completed
F2-24  Search Console sitemap submission and indexability check — completed
F2-25  Cloudflare Web Analytics Automatic setup observed enabled — completed
F2-26  post-activation main production deployment — completed
F2-27  production traffic verification — completed
```

F2-27 evidence:

```text
Canonical hostname    matsuri-yukue.badjoke-lab.com
Verified at           2026-07-27T11:26:58Z
Traffic observed      yes
Audit                 docs/audits/matsuri-f2-27-production-traffic-2026-07-27.md
```

The four representative canonical routes were visited before the private-dashboard confirmation. Raw metrics and private dashboard material remain outside the repository.

### Active sequence

```text
F2-28  final F2 Launch Gate — active next gate
```

Exact continuation:

```text
1. validate the F2-27 public-safe record and machine state
2. verify the repository, canonical origin, Search, crawler, and F2-24 gates
3. verify that no private Analytics material was committed
4. evaluate and record F2-28 separately
5. keep the Jinja start gate blocked until all of its own prerequisites pass
```

F2-28 must not claim search-engine indexation.

## Parallel maintenance

```text
F2-M01  full-page screenshot visual-review workflow — completed
F2-M02  Matsuri data freshness audit — completed
```

```text
弘前ねぷた 2026         review after 2026-08-07
郡上おどり 2026         review after 2026-09-05
```

## Future-site boundary

Current future-site seed work remains candidate-only. The five current shrine seeds still lack approved Jinja State Snapshots.

```text
Matsuri F2-28 complete                 false
Matsuri stabilization review          false
Portal/Jinja implementation order     false
Jinja State specification approved    false
Explicit start authorization          false
```

F2-28 alone is not sufficient to begin Jinja.

## Work not activated

```text
portal production deployment
future specialist-site implementation
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
