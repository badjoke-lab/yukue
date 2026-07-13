# Deployment

**Status:** F2-16 through F2-22 completed / F2-23 crawler review next

## Verified production deployment

`祭のゆくえ` is deployed as a fully pre-rendered Astro site through Cloudflare Workers Static Assets.

```text
Worker
matsuri-yukue

Canonical origin
https://matsuri-yukue.badjoke-lab.com/

Permanent non-canonical Workers origin
https://matsuri-yukue.badjoke-lab.workers.dev/
```

## External verification

```text
Canonical HTTP workflow
Verify Matsuri canonical origin gate
run 29191904624 — success

Canonical browser Search workflow
Verify Matsuri canonical browser Search
run 29227617530 — success
```

The HTTP verifier confirmed HTTPS, required public routes, Pagefind assets, public JSON, exact `manifest.site_origin`, and canonical sitemap locations.

The Chromium verifier confirmed:

```text
Exact query          脚折雨乞 → 1 result
Destination          /festivals/suneori-amagoi/
Filtered query       雨乞 + 埼玉県 → 1 result
Empty query          0 results and correct empty state
Page errors          0
Console errors       0
Application failures 0
Screenshots          4
```

Detailed evidence:

```text
docs/audits/matsuri-f2-20-canonical-activation-2026-07-12.md
docs/audits/matsuri-f2-22-browser-search-2026-07-13.md
```

## Public topology

```text
yukue.badjoke-lab.com          portal — planned
matsuri-yukue.badjoke-lab.com  Matsuri — canonical origin and Search verified
```

```text
apps/portal   → Worker yukue-portal
apps/matsuri  → Worker matsuri-yukue
```

Matsuri is not hosted below a portal path.

## Static deployment model

```text
reviewed canonical data
→ validation
→ approved Public Projection
→ Astro static HTML
→ Pagefind static index
→ machine-readable public files
→ Workers Static Assets
```

No Astro Cloudflare SSR adapter, Worker runtime entry point, runtime binding, D1 canonical database, KV dependency, or runtime ingestion is required.

## Wrangler contract

```text
name                      matsuri-yukue
assets.directory          ./apps/matsuri/dist
main                      absent
routes[0].pattern         matsuri-yukue.badjoke-lab.com
routes[0].custom_domain   true
```

## Workers Builds contract

```text
Repository                     badjoke-lab/yukue
Production branch              main
Root directory                 repository root
Build command                  pnpm build:matsuri:workers
Deploy command                 npx wrangler deploy
Non-production deploy command  npx wrangler versions upload
Node.js                        24
pnpm                           11.10.0
```

`scripts/build-matsuri-workers.mjs` loads the verified canonical origin from `config/yukue-deployment-topology.json` and passes:

```text
MATSURI_PUBLIC_ORIGIN=https://matsuri-yukue.badjoke-lab.com
```

## Verification artifacts

The repository gate verifies both the canonical Workers production artifact and the origin-neutral repository release candidate. Release metadata separately records canonical HTTP and live browser Search evidence.

## Completed external work

```text
F2-16  Workers Builds connection — completed
F2-17  first Workers Static Assets deployment — completed
F2-18  workers.dev smoke verification — completed
F2-19  exact canonical hostname decision — completed
F2-20  Custom Domain activation, canonical build, HTTPS verification — completed
F2-21  canonical manifest and sitemap verification — completed
F2-22  canonical browser Pagefind Search verification — completed
```

## Remaining sequence

```text
F2-23  robots, canonical, sitemap, and crawler-reachability review — next
F2-24  sitemap submission and indexability check — hold
F2-25  Web Analytics activation — hold
F2-26  post-activation deployment — hold
F2-27  production traffic verification — hold
F2-28  final F2 Launch Gate — hold
```

Do not submit the sitemap before F2-24 or enable Analytics before F2-25.
