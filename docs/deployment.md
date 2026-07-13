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

Verified external evidence:

```text
Canonical origin run   29191904624 — success
Canonical Search run   29227591583 — success
Search artifact ID     8270324780
Browser                Chromium
```

Evidence records:

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

## Wrangler and Workers Builds contract

```text
name                         matsuri-yukue
assets.directory             ./apps/matsuri/dist
main                         absent
routes[0].pattern            matsuri-yukue.badjoke-lab.com
routes[0].custom_domain      true
production branch            main
build command                pnpm build:matsuri:workers
deploy command               npx wrangler deploy
non-production command       npx wrangler versions upload
Node.js                      24
pnpm                         11.10.0
```

`scripts/build-matsuri-workers.mjs` loads the verified canonical origin from `config/yukue-deployment-topology.json` and injects:

```text
MATSURI_PUBLIC_ORIGIN=https://matsuri-yukue.badjoke-lab.com
```

## Verification layers

```text
Canonical HTTP verification
- HTTPS
- required routes and assets
- manifest.site_origin
- canonical sitemap locations

Canonical browser Search verification
- 脚折雨乞 exact result and detail navigation
- 相馬野馬追 exact result
- collision-resistant zero-result state
- zero page and console errors

Repository release candidate
- origin-neutral artifact copy
- separately records verified external evidence
```

## Completed external work

```text
F2-16  Workers Builds connection — completed
F2-17  first Workers Static Assets deployment — completed
F2-18  workers.dev smoke verification — completed
F2-19  exact canonical hostname decision — completed
F2-20  Custom Domain activation, canonical build, HTTPS verification — completed
F2-21  canonical manifest and sitemap verification — completed
F2-22  browser Pagefind Search verification — completed
```

## Remaining sequence

```text
F2-23  robots, canonical, sitemap, crawler-reachability review — next
F2-24  sitemap submission and indexability check — hold
F2-25  Web Analytics activation — hold
F2-26  post-activation deployment — hold
F2-27  production traffic verification — hold
F2-28  final F2 Launch Gate — hold
```

Do not submit the sitemap before F2-24 or enable Analytics before F2-25.
