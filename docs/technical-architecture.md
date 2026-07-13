# Technical Architecture

**Status:** Current direction / Matsuri canonical deployment and browser Search verified through F2-22

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
Playwright Chromium
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

data/
  public/

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

Future Jinja, Jiin, and Tomurai applications use separate Workers only after their own project gates.

The portal is the series entrance, not a runtime parent. Specialist sites are not served from paths below the portal.

Topology contract:

```text
config/yukue-deployment-topology.json
```

Validation:

```text
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

`scripts/build-matsuri-workers.mjs` loads the canonical origin from the verified topology and passes it as `MATSURI_PUBLIC_ORIGIN` to the static build child process.

The origin is public configuration rather than a secret or duplicate dashboard variable.

## Dual artifact model

### Production Workers artifact

```text
manifest.site_origin present
canonical absolute sitemap locations
Custom Domain deployment
live Pagefind Search
```

### Repository release candidate

```text
origin-neutral copied artifact
per-file and aggregate hashes
verified canonical origin recorded in release metadata
canonical HTTP and browser Search evidence recorded separately
```

This preserves reproducibility without denying the active deployment.

## External verification layers

### Canonical HTTP

```text
Origin     https://matsuri-yukue.badjoke-lab.com
Workflow   Verify Matsuri canonical origin gate
Run        29191904624 — success
```

This confirms HTTPS, required routes, Pagefind asset reachability, public JSON, exact manifest origin, and canonical sitemap locations.

### Canonical browser Search

```text
Workflow   Verify Matsuri canonical browser Search
Run        29227617530 — success
Browser    Chromium
```

The browser verifier:

1. opens the live `/search/` route,
2. submits the exact query `脚折雨乞`,
3. confirms one rendered result,
4. follows the generated result link,
5. confirms the destination H1,
6. submits `雨乞` with the `埼玉県` filter,
7. confirms one filtered result,
8. confirms the public zero-result state,
9. records JSON and full-page screenshots,
10. fails on page, console, or application request errors.

Navigation-cancelled `POST /cdn-cgi/rum` requests with `net::ERR_ABORTED` are recorded separately as Cloudflare telemetry rather than hidden as application failures.

## Current gate boundary

```text
F2-16 through F2-22  completed
F2-23                 crawler-reachability review next
F2-24 through F2-28  hold
```

F2-23 reviews the live crawler-facing surface before search-engine submission.

## Future operational layer

D1, R2, Cron Triggers, Queues, Worker APIs, runtime ingestion, or dynamic rendering may be added only when justified by an approved requirement.

```text
Git-reviewed public data
= canonical public layer

future operational systems
= candidate collection and workflow support
```
