# Repository Launch Readiness

**Status:** Repository gate completed / F2-16 through F2-28 completed / stabilization active

## Decision

`祭のゆくえ` has completed repository readiness and the defined external launch-verification sequence through F2-28.

## Gate commands

```text
pnpm gate:matsuri:repository
pnpm check:matsuri:f2-launch-gate
```

## Verified production state

```text
Canonical origin             https://matsuri-yukue.badjoke-lab.com
Worker                       matsuri-yukue
F2-27 traffic verified at    2026-07-27T11:26:58Z
F2-28 evaluated at           2026-07-27T11:45:20Z
Indexation claimed           false
```

Final evidence:

```text
config/matsuri-f2-launch-gate.json
docs/audits/matsuri-f2-28-final-launch-gate-2026-07-27.md
```

## Required passing state

The repository gate requires accepted topology, verified canonical origin, reproducible artifacts, route and asset integrity, Pagefind and machine-readable consistency, semantic and Evidence rules, browser/accessibility checks, Search/crawler/Search Console evidence, completed Analytics progression, final F2 launch validation, and an active guard against premature Jinja implementation.

## Completion boundary

```text
F2-16 through F2-28 — completed
Phase 10 Stabilization — active
Jinja start gate — blocked
```

F2-28 does not claim search-engine indexation or authorize another site.
