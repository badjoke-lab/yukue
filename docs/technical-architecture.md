# Technical Architecture

**Status:** Current direction / Matsuri production verified through F2-23

## Stack

```text
pnpm workspace
Astro
TypeScript
Git-managed reviewed public data
schema and cross-record validation
Pagefind
Cloudflare Workers Builds
Cloudflare Workers Static Assets
GitHub Actions
Playwright
```

## Monorepo and deployment boundary

```text
apps/portal   → Worker yukue-portal   → yukue.badjoke-lab.com — planned
apps/matsuri  → Worker matsuri-yukue  → matsuri-yukue.badjoke-lab.com — verified
```

One monorepo does not mean one deployment. The portal is a series entrance, not a runtime parent. Future Jinja, Jiin, and Tomurai applications use separate Workers only after their own gates.

## Public data flow

```text
reviewed canonical data
→ schema and relation validation
→ approved Public Projection
→ Astro static HTML
→ public JSON, robots, sitemap, discovery files
→ Pagefind static index
→ Workers Static Assets
```

The public build never consumes private candidate or review material.

## Matsuri Workers architecture

```text
GitHub repository
→ repository gate
→ Cloudflare Workers Builds
→ pnpm build:matsuri:workers
→ verified canonical origin injected
→ apps/matsuri/dist
→ npx wrangler deploy
→ Worker matsuri-yukue
→ Custom Domain matsuri-yukue.badjoke-lab.com
```

The site remains static-only. Worker runtime code, SSR adapters, runtime bindings, D1 canonical storage, KV, and runtime ingestion are absent.

## Canonical and origin-neutral modes

### Production artifact

```text
manifest.site_origin present
absolute canonical sitemap locations
robots.txt contains canonical Sitemap directive
one exact self-canonical link per public route
index,follow robots metadata
Custom Domain deployment
```

### Repository release candidate

```text
manifest.site_origin absent
path-only sitemap locations
robots.txt omits absolute Sitemap directive
canonical links absent
noindex,nofollow robots metadata
per-file and aggregate hashes
```

This prevents an origin-neutral artifact from presenting itself as a second production origin.

## External verification layers

```text
Canonical origin
Run       29191904624 — success
Coverage  HTTPS, routes, public files, manifest origin, sitemap origin

Canonical browser Search
Run       29193201911 — success
Coverage  desktop/mobile Search, filters, no-result, navigation, runtime errors

Crawler reachability
Run       29230475619 — success
Coverage  robots, 20 sitemap routes, self-canonicals, indexing directives,
          28 User-Agent checks, 12 discovery-file checks
```

## Current gate boundary

```text
F2-16 through F2-23  completed
F2-24                 sitemap submission and indexability next
F2-25 through F2-28  hold
```

F2-24 requires external search-engine owner-account evidence. A submission result must not be misrepresented as proof of indexation.

## Future operational layer

D1, R2, Cron Triggers, Queues, Worker APIs, runtime ingestion, or dynamic rendering may be added only when justified by an approved requirement.
