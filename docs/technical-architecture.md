# Technical Architecture

**Status:** Current direction / F2-23 crawler implementation prepared

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
→ robots and sitemap
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

from the verified deployment topology and passes it as `MATSURI_PUBLIC_ORIGIN` to the static build child process.

`apps/matsuri/astro.config.mjs` maps that value to Astro's `site` configuration. Shared `PageShell` then emits one absolute canonical link per route and an indexable robots meta value.

## Crawler-facing build modes

### Canonical production mode

```text
robots.txt       User-agent: * / Allow: /
sitemap          advertised from robots.txt
canonical links  absolute exact route URLs
robots meta      index,follow
```

### Origin-neutral mode

```text
robots.txt       Disallow: /
sitemap          path-only locations
canonical links  omitted
robots meta      noindex,nofollow
```

The origin-neutral mode prevents repository or accidental secondary deployments from presenting themselves as the approved public origin.

## Artifact validation

```text
pnpm check:matsuri:crawler-artifact
```

The checker inspects every generated HTML route and requires robots policy, canonical metadata, robots meta, and sitemap inventory to match the current build mode.

## Dual artifact model

### Production Workers artifact

```text
manifest.site_origin present
canonical absolute sitemap locations
indexable robots policy
absolute canonical HTML metadata
Custom Domain deployment
```

### Repository release candidate

```text
origin-neutral copied artifact
per-file and aggregate hashes
no production canonical claim in copied HTML
verified external evidence recorded in release metadata
```

This preserves reproducibility without denying the active canonical deployment.

## External verification layers

### Canonical origin

```text
Workflow  Verify Matsuri canonical origin gate
Run       29191904624 — success
```

### Canonical browser Search

```text
Workflow     Verify Matsuri canonical Search
Run          29193201911 — success
Job          86651403427 — success
Artifact ID  8260207484
```

### Crawler reachability

```text
Workflow  Verify Matsuri crawler reachability
Status    deployment and external evidence pending
```

The live verifier checks `robots.txt`, sitemap discovery, canonical HTML, indexability metadata, challenge-page absence, and representative public requests using Googlebot, Bingbot, and OAI-SearchBot User-Agent values.

The workflow runs after a relevant push to `main`, retries while Workers Builds deploys, and preserves a JSON report.

## Current gate boundary

```text
F2-16 through F2-22  completed
F2-23                 repository implementation prepared; external verification pending
F2-24 through F2-28  hold
```

F2-23 does not submit the sitemap or claim indexation.

## Future operational layer

D1, R2, Cron Triggers, Queues, Worker APIs, runtime ingestion, or dynamic rendering may be added only when justified by an approved requirement.

```text
Git-reviewed public data
= canonical public layer

future operational systems
= candidate collection and workflow support
```
