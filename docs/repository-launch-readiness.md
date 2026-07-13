# Repository Launch Readiness

**Status:** Repository gate completed / production verification through F2-23

## Decision

`祭のゆくえ` has completed repository launch readiness plus canonical-origin, browser Search, and crawler-reachability verification.

The repository gate covers canonical data, Public Projection, static output, machine-readable files, Search, canonical and origin-neutral metadata modes, semantic and Evidence rules, browser and accessibility checks, release-candidate integrity, deployment topology, Custom Domain configuration, and exact external evidence through F2-23.

It does not complete sitemap submission, indexation, Analytics, traffic verification, or the final launch gate.

## Gate command

```text
pnpm gate:matsuri:repository
```

## Verified production state

```text
Canonical origin           https://matsuri-yukue.badjoke-lab.com
Worker                     matsuri-yukue
Canonical origin run       29191904624 — success
Canonical Search run       29193201911 — success
Crawler reachability run   29230475619 — success
```

Evidence:

```text
docs/audits/matsuri-f2-20-canonical-activation-2026-07-12.md
docs/audits/matsuri-f2-22-canonical-search-2026-07-12.md
docs/audits/matsuri-f2-23-crawler-reachability-2026-07-13.md
```

## Required passing state

The gate requires:

- separate portal and specialist-site Workers and hostnames,
- no specialist-site path nesting,
- verified Custom Domain and exact canonical origin,
- canonical and origin-neutral static artifact consistency,
- required routes, assets, links, public JSON, sitemap, robots, and Pagefind inputs,
- exact self-canonical and robots metadata in production mode,
- no canonical claim and `noindex,nofollow` in origin-neutral mode,
- data, Source, Evidence, content, responsive, accessibility, and screenshot baselines,
- successful desktop/mobile canonical Search evidence,
- successful robots, sitemap, canonical, User-Agent, and discovery-file evidence,
- completed external work through F2-23,
- pending external work from F2-24.

## Completed external activation and verification

```text
F2-16 through F2-23 — completed
```

## Remaining external sequence

```text
F2-24  sitemap submission and indexability check — next
F2-25  Web Analytics activation — hold
F2-26  post-activation deployment — hold
F2-27  production traffic verification — hold
F2-28  final F2 Launch Gate — hold
```

F2-24 must record actual submission evidence and must not equate submission with indexation.

## Maintenance

Keep reviewed data fresh, preserve passing gates, regenerate the release candidate after public changes, and capture screenshots for non-trivial UI changes. Stats, Compare, dynamic API, MCP, paid API, D1 canonical storage, and real-time ingestion remain outside the MVP unless separately approved.
