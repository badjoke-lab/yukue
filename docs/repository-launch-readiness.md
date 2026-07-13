# Repository Launch Readiness

**Status:** Repository gate completed / canonical origin and browser Search verified through F2-22

## Decision

`祭のゆくえ` has completed the repository-side launch-preparation gate, the canonical production deployment has passed external verification, and live Pagefind Search has passed Chromium interaction verification.

The repository gate covers canonical data, Public Projection, static output, Search artifacts, machine-readable files, semantic and Evidence rules, browser and accessibility checks, release-candidate integrity, deployment topology, Custom Domain configuration, canonical HTTP evidence, and browser Search evidence.

It does not complete crawler review, sitemap submission, Analytics, production traffic verification, or the final launch gate.

## Gate command

```text
pnpm gate:matsuri:repository
```

The gate executes the canonical Workers artifact verification, origin-neutral release verification and freeze, and the final readiness assertions.

## Verified canonical production state

```text
Canonical origin       https://matsuri-yukue.badjoke-lab.com
Worker                 matsuri-yukue
Canonical HTTP run     29191904624 — success
Browser Search run     29227617530 — success
```

The canonical HTTP gate confirmed HTTPS, required routes, Pagefind asset reachability, public JSON, exact `manifest.site_origin`, and canonical sitemap locations.

The browser Search gate confirmed exact query execution, prefecture filtering, result rendering, same-origin detail navigation, the public empty state, zero page errors, zero console errors, and zero same-origin application request failures.

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
- verified Matsuri canonical origin and workflow evidence,
- verified canonical browser Search evidence and artifact identity,
- exact Custom Domain Wrangler configuration,
- canonical Workers static artifact consistency,
- origin-neutral frozen candidate integrity,
- required routes, local assets, and internal links,
- sitemap, JSON, Status, State pages, and Pagefind input consistency,
- semantic, Source, Evidence, content, responsive, accessibility, and screenshot baselines,
- completed external work through F2-22,
- pending external work from F2-23.

## Completed external activation

```text
F2-16 through F2-22 — completed
```

## Remaining external sequence

```text
F2-23  robots, canonical, sitemap, and crawler-reachability review — next
F2-24  sitemap submission and indexability check — hold
F2-25  Web Analytics activation — hold
F2-26  post-activation deployment — hold
F2-27  production traffic verification — hold
F2-28  final F2 Launch Gate — hold
```

F2-23 must verify the live crawler-facing surface before search-engine submission.

## Maintenance

Keep reviewed data fresh, preserve passing gates, regenerate the release candidate after public changes, and capture screenshots for non-trivial UI changes. Stats, Compare, dynamic API, MCP, paid API, D1 canonical storage, and real-time ingestion remain outside the MVP unless separately approved.
