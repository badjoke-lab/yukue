# Technical Architecture

**Status:** Current direction / Matsuri canonical deployment verified through F2-21

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

The portal is the series entrance, not a runtime parent. Specialist sites are not served from `/matsuri/`, `/jinja/`, `/jiin/`, or `/tomurai/` paths below the portal.

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

`scripts/build-matsuri-workers.mjs` loads:

```text
https://matsuri-yukue.badjoke-lab.com
```

from the verified deployment topology and passes it as:

```text
MATSURI_PUBLIC_ORIGIN
```

to the static build child process.

The origin is public configuration rather than a secret or a duplicate dashboard variable.

## Dual artifact model

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
external workflow evidence recorded separately
```

This preserves reproducibility without denying the active canonical deployment.

## External verification

```text
Canonical origin       https://matsuri-yukue.badjoke-lab.com
Workflow               Verify Matsuri canonical origin gate
Run                    29191904624 — success
Attempt                1 of 18
```

The verifier confirmed HTTPS, required routes, Pagefind asset reachability, public JSON, exact manifest origin, and canonical sitemap locations.

## Current gate boundary

```text
F2-16 through F2-21  completed
F2-22                 browser Pagefind Search verification next
F2-23 through F2-28  hold
```

F2-22 must use a real browser to submit queries and follow result links. Static HTTP reachability is not sufficient.

## Future operational layer

D1, R2, Cron Triggers, Queues, Worker APIs, runtime ingestion, or dynamic rendering may be added only when justified by an approved requirement.

```text
Git-reviewed public data
= canonical public layer

future operational systems
= candidate collection and workflow support
```
