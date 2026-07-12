# Repository Launch Readiness

**Status:** Repository gate completed / canonical origin verified through F2-21

## Decision

`祭のゆくえ` has completed the repository-side launch-preparation gate and the canonical production deployment has passed external verification.

The repository gate covers canonical data, Public Projection, static output, Search artifacts, machine-readable files, semantic and Evidence rules, browser and accessibility checks, release-candidate integrity, deployment topology, Custom Domain configuration, and canonical verification evidence.

It does not complete browser Search interaction, crawler review, sitemap submission, Analytics, production traffic verification, or the final launch gate.

## Gate command

```text
pnpm gate:matsuri:repository
```

The gate executes the canonical Workers artifact verification, origin-neutral release verification and freeze, and the final readiness assertions.

## Verified canonical production state

```text
Canonical origin       https://matsuri-yukue.badjoke-lab.com
Worker                 matsuri-yukue
Verification run       29191904624 — success
Activation merge       f978bc50a1ab51964687ec0457a448dc37b2aaf9
```

The external gate confirmed HTTPS, required routes, Pagefind asset reachability, public JSON, exact `manifest.site_origin`, and canonical sitemap locations.

Evidence:

```text
docs/audits/matsuri-f2-20-canonical-activation-2026-07-12.md
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
- completed external work through F2-21,
- pending external work from F2-22.

## Completed external activation

```text
F2-16 through F2-21 — completed
```

## Remaining external sequence

```text
F2-22  browser Pagefind Search verification — next
F2-23  crawler-reachability review — hold
F2-24  sitemap submission and indexability check — hold
F2-25  Web Analytics activation — hold
F2-26  post-activation deployment — hold
F2-27  production traffic verification — hold
F2-28  final F2 Launch Gate — hold
```

The canonical HTTP verifier proves that Search HTML and Pagefind assets are served. F2-22 must still exercise actual browser queries and result navigation.

## Maintenance

Keep reviewed data fresh, preserve passing gates, regenerate the release candidate after public changes, and capture screenshots for non-trivial UI changes. Stats, Compare, dynamic API, MCP, paid API, D1 canonical storage, and real-time ingestion remain outside the MVP unless separately approved.
