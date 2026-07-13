# Repository Launch Readiness

**Status:** Repository gate completed / canonical Search verified through F2-22

## Decision

`祭のゆくえ` has completed the repository-side launch-preparation gate, canonical production verification, and interactive Search verification.

The repository gate covers canonical data, Public Projection, static output, Search artifacts, machine-readable files, semantic and Evidence rules, browser and accessibility checks, release-candidate integrity, deployment topology, Custom Domain configuration, canonical origin evidence, and F2-22 browser Search evidence.

It does not complete crawler review, sitemap submission, Analytics, production traffic verification, or the final launch gate.

## Gate command

```text
pnpm gate:matsuri:repository
```

## Verified production state

```text
Canonical origin             https://matsuri-yukue.badjoke-lab.com
Worker                       matsuri-yukue
Canonical verification run   29191904624 — success
Search verification run      29227591583 — success
Search artifact ID           8270324780
```

Evidence:

```text
docs/audits/matsuri-f2-20-canonical-activation-2026-07-12.md
docs/audits/matsuri-f2-22-browser-search-2026-07-13.md
```

## Required passing state

The repository gate requires:

- accepted portal and specialist-site topology,
- separate Worker and hostname identities,
- no specialist-site path nesting,
- verified canonical origin and workflow evidence,
- exact Custom Domain Wrangler configuration,
- canonical Workers artifact consistency,
- origin-neutral frozen candidate integrity,
- required routes, assets, and internal links,
- sitemap, JSON, Status, State pages, and Pagefind input consistency,
- semantic, Source, Evidence, content, responsive, accessibility, and screenshot baselines,
- verified Chromium Search queries, result navigation, zero-result handling, and zero browser errors,
- completed external work through F2-22,
- pending external work from F2-23.

## Completed external activation

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

F2-23 must inspect robots, canonical and sitemap discovery, and crawler-facing response behavior. It must not submit the sitemap or enable Analytics.

## Maintenance

Keep reviewed data fresh, preserve passing gates, regenerate the release candidate after public changes, and capture screenshots for non-trivial UI changes. Stats, Compare, dynamic API, MCP, paid API, D1 canonical storage, and real-time ingestion remain outside the MVP unless separately approved.
