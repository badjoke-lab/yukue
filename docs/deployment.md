# Deployment

**Status:** F2 launch-preparation baseline

## Matsuri target

`祭のゆくえ` is deployed as a static Astro site on Cloudflare Pages.

The deployment contract deliberately keeps the existing static architecture:

```text
reviewed canonical data
→ validation
→ approved Public Projection
→ Astro static HTML
→ Pagefind static index
→ machine-readable public files
→ Cloudflare Pages static hosting
```

No Cloudflare SSR adapter, Pages Functions, D1 canonical database, KV dependency, or runtime ingestion is required for the launch baseline.

## Cloudflare Pages project settings

Configure the Pages project from repository `badjoke-lab/yukue` with:

```text
Production branch: main
Root directory: /
Build command: pnpm build:matsuri:pages
Build output directory: apps/matsuri/dist
```

Use the repository root as the Pages root directory because the Matsuri app consumes workspace packages from `packages/*`.

The build command uses pnpm filtering to build the Matsuri workspace and its direct and transitive workspace dependencies.

## Build environment

Set these Cloudflare Pages environment variables for both Production and Preview unless a later deployment policy explicitly changes them:

```text
NODE_VERSION=24
PNPM_VERSION=11.10.0
```

Do not rely on the Cloudflare build image defaults for these versions.

## Canonical origin boundary

Do not set `MATSURI_PUBLIC_ORIGIN` during the deployment-baseline step.

The first successful Pages deployment establishes a reachable deployment URL. The next F2 step decides the canonical public origin and then configures:

```text
MATSURI_PUBLIC_ORIGIN=https://<canonical-origin>
```

This prevents preview deployment URLs from being treated as canonical origins in generated discovery files.

## Repository commands

Build the exact Pages target from the repository root:

```text
pnpm build:matsuri:pages
```

Validate the generated Pages artifact:

```text
pnpm check:matsuri:pages
```

Run both in sequence:

```text
pnpm verify:matsuri:pages
```

The artifact check requires the static site, Browse and Search entry pages, Pagefind runtime, machine-readable JSON files, discovery text files, and sitemap to exist under `apps/matsuri/dist`.

## First-deployment verification

After the first Cloudflare Pages deployment, verify the deployed origin before advancing the canonical-origin gate:

```text
/
/festivals/
/performances/
/regions/
/changes/
/search/
/version.json
/data/manifest.json
/data/entities.json
/data/events.json
/data/relations.json
/data/occurrences.json
/llms.txt
/ai.txt
/sitemap.xml
/pagefind/pagefind.js
```

Also verify that Search can load the deployed Pagefind assets and return at least one known Matsuri record.

## Deferred from this baseline

The following belong to later F2 steps and must not be silently folded into deployment setup:

```text
custom domain decision
canonical public origin configuration
canonical URL validation
production sitemap-origin validation
search-index checks on the deployed origin
analytics baseline
status page
methodology page
data access page
```
