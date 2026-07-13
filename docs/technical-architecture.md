# Technical Architecture

**Status:** Current direction / Matsuri canonical deployment and Search verified through F2-22

## Stack

```text
pnpm workspace
Astro
TypeScript
Git-managed public canonical data
schema validation
Pagefind
Cloudflare Workers Builds
Cloudflare Workers Static Assets
GitHub Actions
Playwright
```

## Monorepo

```text
apps/
  portal/
  matsuri/
packages/
  observation-core/
  schemas/
  validation/
  machine-readable/
  search/
  ui/
data/public/
config/
scripts/
docs/
```

One monorepo does not mean one deployment. Each public application remains separately buildable and deployable.

## Data flow

```text
reviewed canonical data
→ schema and cross-record validation
→ approved Public Projection
→ Astro HTML
→ public JSON and discovery files
→ Pagefind static index
→ sitemap
→ Workers Static Assets
```

The public build never consumes private candidate or review material.

## Public deployment topology

```text
apps/portal   → Worker yukue-portal   → yukue.badjoke-lab.com — planned
apps/matsuri  → Worker matsuri-yukue  → matsuri-yukue.badjoke-lab.com — verified
```

The portal is the series entrance, not a runtime parent. Specialist sites are not served from paths below the portal.

Topology contract and validation:

```text
config/yukue-deployment-topology.json
pnpm check:yukue:deployment-topology
```

## Matsuri Workers architecture

```text
GitHub repository
→ GitHub Actions repository gate
→ Cloudflare Workers Builds
→ pnpm build:matsuri:workers
→ canonical origin injected from verified topology
→ apps/matsuri/dist
→ npx wrangler deploy
→ Worker matsuri-yukue
→ Custom Domain matsuri-yukue.badjoke-lab.com
```

The site is static-only.

```text
Worker main entry            absent
assets.directory             ./apps/matsuri/dist
Custom Domain pattern        matsuri-yukue.badjoke-lab.com
custom_domain                true
Astro Cloudflare SSR adapter absent
runtime bindings             absent
```

## Canonical production build

`scripts/build-matsuri-workers.mjs` loads the verified canonical origin from the deployment topology and passes it as `MATSURI_PUBLIC_ORIGIN` to the static build child process.

The origin is public configuration rather than a secret or a duplicate dashboard variable.

## Artifact and evidence model

### Production Workers artifact

```text
manifest.site_origin present
canonical absolute sitemap locations
Custom Domain deployment
```

### Repository release candidate

```text
origin-neutral copied artifact
per-file and aggregate hashes
verified canonical origin recorded in release metadata
browser Search verification recorded in release metadata
```

### Canonical Search browser evidence

```text
playwright.canonical.config.mjs
tests/canonical/matsuri-search.spec.mjs
.github/workflows/verify-matsuri-canonical-search.yml
```

The browser gate runs Chromium directly against the canonical production origin. It verifies Pagefind module loading, query parameters, exact results, detail navigation, zero-result behavior, and browser/console error capture.

## External verification

```text
Canonical origin run   29191904624 — success
Search browser run     29227591583 — success
Search artifact ID     8270324780
```

## Current gate boundary

```text
F2-16 through F2-22  completed
F2-23                 crawler-reachability review next
F2-24 through F2-28  hold
```

F2-23 verifies crawler-facing behavior. Sitemap submission remains F2-24 and Analytics remains F2-25.

## Future operational layer

D1, R2, Cron Triggers, Queues, Worker APIs, runtime ingestion, or dynamic rendering may be added only when justified by an approved requirement.

```text
Git-reviewed public data
= canonical public layer

future operational systems
= candidate collection and workflow support
```
