# Repository Launch Readiness

**Status:** Repository gate completed / crawler reachability verified through F2-23

## Decision

`祭のゆくえ` has completed repository readiness, canonical deployment verification, interactive browser Search verification, and crawler-reachability verification.

The repository gate covers canonical data, Public Projection, static output, Search artifacts, machine-readable files, semantic and Evidence rules, browser and accessibility checks, release-candidate integrity, deployment topology, Custom Domain configuration, canonical-origin evidence, Search evidence, and crawler evidence.

It does not complete search-engine sitemap submission, indexation, Analytics, production traffic verification, or the final launch gate.

## Gate command

```text
pnpm gate:matsuri:repository
```

## Verified production state

```text
Canonical origin         https://matsuri-yukue.badjoke-lab.com
Worker                   matsuri-yukue
Canonical origin run     29191904624 — success
Canonical Search run     29193201911 — success
Search artifact ID       8260207484
Crawler reachability run 29230233384 — success
Crawler artifact ID      8271238535
```

Evidence:

```text
docs/audits/matsuri-f2-20-canonical-activation-2026-07-12.md
docs/audits/matsuri-f2-22-canonical-search-2026-07-12.md
docs/audits/matsuri-f2-23-crawler-reachability-2026-07-13.md
```

## Required passing state

The repository gate requires:

- accepted portal and specialist-site topology,
- separate Worker and hostname identities,
- no specialist-site path nesting,
- verified canonical origin and Custom Domain configuration,
- canonical and origin-neutral artifact consistency,
- required routes, local assets, and internal links,
- sitemap, JSON, Status, State pages, and Pagefind consistency,
- semantic, Source, Evidence, content, responsive, accessibility, and screenshot baselines,
- successful desktop and mobile canonical Search evidence,
- robots, sitemap discovery, self-canonical, indexing-directive, User-Agent, and public-discovery-file evidence,
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

F2-24 must distinguish sitemap submission from actual discovery and indexation.

## Maintenance

Keep reviewed data fresh, preserve passing gates, regenerate the release candidate after public changes, and capture screenshots for non-trivial UI changes. Stats, Compare, dynamic API, MCP, paid API, D1 canonical storage, and real-time ingestion remain outside the MVP unless separately approved.
