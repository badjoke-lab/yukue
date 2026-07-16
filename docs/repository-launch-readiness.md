# Repository Launch Readiness

**Status:** Repository gate completed / external verification completed through F2-24 / Analytics owner access pending

## Decision

`祭のゆくえ` has completed repository readiness, canonical deployment verification, interactive browser Search verification, crawler-reachability verification, and the recorded Search Console sitemap-submission and technical-indexability gate.

The repository gate covers canonical data, Public Projection, static output, Search artifacts, machine-readable files, semantic and Evidence rules, browser and accessibility checks, release-candidate integrity, deployment topology, Custom Domain configuration, canonical-origin evidence, Search evidence, crawler evidence, and the sanitized F2-24 submission record.

It does not prove search-engine indexation, Web Analytics activation, production traffic verification, or final launch completion.

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
Search artifact ID           8260207484
Crawler reachability run     29230233384 — success
Crawler artifact ID          8271238535
F2-24 technical preflight    29232294960 — success
Search Console sitemap       success
Discovered pages             20
Representative live test     indexable
Representative requests      3 submitted
Indexation claimed           false
```

Evidence:

```text
docs/audits/matsuri-f2-20-canonical-activation-2026-07-12.md
docs/audits/matsuri-f2-22-canonical-search-2026-07-12.md
docs/audits/matsuri-f2-23-crawler-reachability-2026-07-13.md
docs/audits/matsuri-f2-24-search-console-2026-07-14.md
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
- sanitized Search Console sitemap-submission and representative indexability evidence,
- completed external work through F2-24,
- a valid Analytics progression record that remains pending while owner access is unavailable,
- an active guard against premature Jinja implementation.

## Completed external activation and verification

```text
F2-16 through F2-24 — completed
```

F2-24 records successful sitemap acceptance, 20 discovered pages, a representative live test that was technically indexable, and three submitted indexing requests. These facts are not represented as proof that any URL is indexed.

## Remaining external sequence

```text
F2-25  Cloudflare Web Analytics activation — owner access pending
F2-26  post-activation deployment — blocked by F2-25
F2-27  production traffic verification — blocked by F2-26
F2-28  final F2 Launch Gate — blocked by F2-27
```

F2-25, F2-26, and F2-27 are separate facts. An enabled setting does not prove a post-activation deployment or traffic receipt.

## Maintenance

Keep reviewed data fresh, preserve passing gates, regenerate the release candidate after public changes, and capture screenshots for non-trivial UI changes. Stats, Compare, dynamic API, MCP, paid API, D1 canonical storage, and real-time ingestion remain outside the MVP unless separately approved.
