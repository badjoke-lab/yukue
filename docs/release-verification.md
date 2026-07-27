# Release Verification

**Status:** Repository and external verification completed through F2-27 / F2-28 final gate pending

## Commands

```text
pnpm verify:matsuri:workers
pnpm verify:release
pnpm freeze:matsuri:release
pnpm gate:matsuri:repository
pnpm check:matsuri:canonical-search
pnpm check:matsuri:crawler-reachability
pnpm check:matsuri:indexability-preflight
pnpm check:matsuri:search-engine-submission-record
pnpm check:matsuri:analytics-activation-record
```

## Verification layers

The repository gate verifies the canonical Workers artifact, origin-neutral release candidate, route and link integrity, Pagefind and machine-readable output, semantic and Evidence rules, browser and accessibility behavior, deployment topology, Search Console evidence, Analytics progression, and the blocked Jinja start gate.

## Current external evidence

```text
Canonical origin run          29191904624 — success
Canonical Search run          29193201911 — success
Canonical Search artifact     8260207484
Crawler reachability run      29230233384 — success
Crawler artifact              8271238535
F2-24 preflight run           29232294960 — success
F2-25 observation             2026-07-27T09:37:29Z
F2-26 source commit           108ac4e88407e1263229eb40bc88d76855e90131
F2-26 Cloudflare build        7026144e-1ce0-4927-9060-64919c3a4002
F2-26 deployed at             2026-07-27T10:34:17Z
F2-27 traffic verified at     2026-07-27T11:26:58Z
F2-27 traffic observed        yes
```

F2-27 evidence:

```text
docs/audits/matsuri-f2-27-production-traffic-2026-07-27.md
```

## What the current gate proves

- repository artifacts are reproducible and internally consistent,
- the production Workers artifact uses the canonical origin,
- the Custom Domain and required public surfaces have verified canonical, Search, crawler, and indexability evidence,
- Cloudflare Web Analytics Automatic setup was observed enabled,
- a production deployment completed after that observation,
- production traffic was observed for the canonical hostname after representative route visits,
- F2-16 through F2-27 are complete.

## What it does not prove

- that any URL is indexed,
- final F2 Launch Gate completion,
- authorization to create or publish Jinja.

F2-28 remains a separate gate. Public verification excludes private Analytics counts, account identity, tokens, visitor data, and dashboard screenshots.
