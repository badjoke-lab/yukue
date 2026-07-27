# Release Verification

**Status:** Repository and external verification completed through F2-28

## Commands

```text
pnpm verify:matsuri:workers
pnpm verify:release
pnpm freeze:matsuri:release
pnpm gate:matsuri:repository
pnpm check:matsuri:f2-launch-gate
pnpm check:yukue:jinja-start-gate
```

## Verification layers

The repository gate verifies the canonical Workers artifact, origin-neutral release candidate, route and link integrity, Pagefind and machine-readable output, semantic and Evidence rules, browser and accessibility behavior, deployment topology, Search Console evidence, Analytics progression, final F2 launch record, and the blocked Jinja start gate.

## Launch closure evidence

```text
Canonical origin run          30262887395 — success
Canonical Search run          30262887428 — success
Crawler reachability run      30262887462 — success
F2-24 preflight run           30262887424 — success
Analytics progression run     30262887410 — success
Repository baseline run       30262887530 — success
Repository gate run           30262887402 — success
Jinja guardrail run           30262887458 — success
F2-28 evaluated               2026-07-27T11:45:20Z
```

## What the current gate proves

- repository artifacts are reproducible and internally consistent,
- the canonical deployment, Search, crawler, indexability-preflight, and Analytics layers passed,
- production traffic was observed for the canonical hostname,
- the privacy boundary excludes private dashboard material and raw metrics,
- F2-16 through F2-28 are complete,
- Phase 10 stabilization may begin.

## What it does not prove

- that any URL is indexed,
- authorization to deploy the portal,
- authorization to create or publish Jinja.

The Jinja start gate remains blocked by four post-launch prerequisites.
