# Repository Launch Readiness

**Status:** Repository gate completed / canonical origin and browser Search verified through F2-22

## Decision

`祭のゆくえ` has completed the repository-side launch-preparation gate. The canonical production deployment and interactive browser Search have passed external verification.

The repository gate covers canonical data, Public Projection, static output, Search artifacts, machine-readable files, semantic and Evidence rules, browser and accessibility checks, release-candidate integrity, deployment topology, Custom Domain configuration, canonical-origin evidence, and canonical Search evidence.

It does not complete crawler review, sitemap submission, Analytics, production traffic verification, or the final launch gate.

## Gate command

```text
pnpm gate:matsuri:repository
```

The gate executes canonical Workers artifact verification, origin-neutral release verification and freeze, and final readiness assertions.

## Verified production state

```text
Canonical origin         https://matsuri-yukue.badjoke-lab.com
Worker                   matsuri-yukue
Canonical origin run     29191904624 — success
Canonical Search run     29193201911 — success
Canonical Search job     86651403427 — success
Search artifact ID       8260207484
```

Evidence:

```text
docs/audits/matsuri-f2-20-canonical-activation-2026-07-12.md
docs/audits/matsuri-f2-22-canonical-search-2026-07-12.md
```

## Required passing state

The repository gate requires:

- accepted portal and specialist-site topology,
- separate Worker and hostname identities,
- no specialist-site path nesting,
- verified Matsuri canonical origin and workflow evidence,
- exact Custom Domain Wrangler configuration,
- canonical Workers static artifact consistency,
- origin-neutral frozen candidate integrity,
- required routes, local assets, and internal links,
- sitemap, JSON, Status, State pages, and Pagefind input consistency,
- semantic, Source, Evidence, content, responsive, accessibility, and screenshot baselines,
- successful desktop and mobile canonical Search evidence,
- exact-name query, filters, no-result, and result-navigation evidence,
- completed external work through F2-22,
- pending external work from F2-23.

## Completed external activation and verification

```text
F2-16 through F2-22 — completed
```

## Remaining external sequence

```text
F2-23  crawler-reachability review — next
F2-24  sitemap submission and indexability check — hold
F2-25  Web Analytics activation — hold
F2-26  post-activation deployment — hold
F2-27  production traffic verification — hold
F2-28  final F2 Launch Gate — hold
```

F2-23 reviews live crawler-facing files and policy. It does not submit the sitemap or claim indexation.

## Maintenance

Keep reviewed data fresh, preserve passing gates, regenerate the release candidate after public changes, and capture screenshots for non-trivial UI changes. Stats, Compare, dynamic API, MCP, paid API, D1 canonical storage, and real-time ingestion remain outside the MVP unless separately approved.
