# Repository Launch Readiness

**Status:** Repository gate completed / external verification completed through F2-26 / F2-27 active

## Decision

`祭のゆくえ` has completed repository readiness, canonical deployment verification, interactive browser Search verification, crawler reachability, Search Console submission and technical-indexability evidence, Cloudflare Web Analytics activation, and the post-activation production deployment.

## Gate command

```text
pnpm gate:matsuri:repository
```

## Verified production state

```text
Canonical origin             https://matsuri-yukue.badjoke-lab.com
Worker                       matsuri-yukue
Canonical origin run         29191904624 — success
Canonical Search run         29193201911 — success
Crawler reachability run     29230233384 — success
F2-24 technical preflight    29232294960 — success
F2-25 observation            2026-07-27T09:37:29Z
F2-26 source commit          108ac4e88407e1263229eb40bc88d76855e90131
F2-26 Cloudflare build       7026144e-1ce0-4927-9060-64919c3a4002
F2-26 deployed at            2026-07-27T10:34:17Z
Indexation claimed           false
```

F2-26 evidence:

```text
docs/audits/matsuri-f2-26-post-activation-deployment-2026-07-27.md
```

## Required passing state

The repository gate requires accepted topology, separate Worker identities, verified canonical origin, reproducible origin-neutral and production artifacts, route and asset integrity, Pagefind and machine-readable consistency, semantic and Evidence rules, browser/accessibility checks, Search/crawler/Search Console evidence, completed F2-25 and F2-26 Analytics progression, and an active guard against premature Jinja implementation.

## Completed external activation and verification

```text
F2-16 through F2-26 — completed
```

The first deploy API call for F2-26 returned a transient provider-side 503 after successful build and asset upload. Retrying the same source build succeeded. This is not represented as a source-code failure.

## Remaining external sequence

```text
F2-27  production traffic verification — active
F2-28  final F2 Launch Gate — blocked by F2-27
```

F2-27 requires private-dashboard confirmation after visiting the representative canonical routes. Public evidence must not publish raw metrics, account identity, geography, referrers, device details, tokens, visitor-level data, or dashboard screenshots.

F2-28 must not claim search-engine indexation.
