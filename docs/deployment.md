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

The artifact check requires the static site, Browse, Reference, Current State, and Search entry pages, Pagefind runtime, machine-readable JSON files, discovery text files, and sitemap to exist under `apps/matsuri/dist`.

## First-deployment verification

After the first Cloudflare Pages deployment, set the reachable deployment origin and run:

```text
MATSURI_CHECK_ORIGIN=https://<deployment-host> pnpm check:matsuri:deployed
```

The deployed check verifies that the main public HTML routes, Pagefind runtime, JSON feeds, discovery text files, and sitemap are reachable, return successful HTTP responses, use expected Content-Type families, and contain non-empty bodies. It also parses version, manifest, and entity-feed JSON and requires the Matsuri site marker and non-empty public entity records.

The check covers these public surfaces:

```text
/
/about/
/festivals/
/performances/
/organizations/
/regions/
/changes/
/states/
/search/
/methodology/
/data/
/status/
/pagefind/pagefind.js
/version.json
/data/manifest.json
/data/entities.json
/data/events.json
/data/relations.json
/data/occurrences.json
/llms.txt
/ai.txt
/sitemap.xml
```

After automated smoke verification, also use the browser Search UI once and confirm that at least one known Matsuri record is returned. The HTTP verifier confirms deployed search assets are reachable but does not emulate the browser Pagefind runtime.

## Canonical-origin verification

After choosing the canonical public origin, set the Production build environment variable:

```text
MATSURI_PUBLIC_ORIGIN=https://<canonical-origin>
```

Deploy again, then run strict canonical verification against that same origin:

```text
MATSURI_CHECK_ORIGIN=https://<canonical-origin> pnpm check:matsuri:canonical
```

Canonical mode performs the normal deployed checks and additionally requires:

```text
data/manifest.json site_origin == checked origin
all sitemap.xml <loc> values use the checked canonical origin
```

Do not use a branch preview URL as `MATSURI_PUBLIC_ORIGIN`.

## Analytics baseline

Cloudflare Pages Web Analytics is enabled at the Pages project level after the project exists. Keep analytics credentials and site-specific configuration out of the repository.

After enabling analytics for the Pages project, trigger or confirm the next deployment and verify that the Web Analytics site begins receiving production traffic before closing the F2 analytics gate.

## Completed F2 public surfaces

The following reference and supporting Browse surfaces are implemented and included in the deployment artifact contract:

```text
/about/
/methodology/
/data/
/status/
/organizations/
/states/
/states/<state-code>/
```

## Remaining external launch sequence

```text
1. create/connect the Cloudflare Pages project
2. obtain and smoke-check the first reachable deployment URL
3. decide the canonical public origin
4. configure MATSURI_PUBLIC_ORIGIN and redeploy
5. run canonical and sitemap verification
6. perform one browser Search UI check
7. enable and verify the Pages Web Analytics baseline
```
