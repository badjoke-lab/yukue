# Deployment

**Status:** F2-16 through F2-23 completed / F2-24 sitemap submission next

## Verified production deployment

```text
Worker
matsuri-yukue

Canonical origin
https://matsuri-yukue.badjoke-lab.com/

Permanent non-canonical Workers origin
https://matsuri-yukue.badjoke-lab.workers.dev/
```

Evidence:

```text
Canonical origin run       29191904624 — success
Canonical Search run       29193201911 — success
Crawler reachability run   29230475619 — success
```

```text
docs/audits/matsuri-f2-20-canonical-activation-2026-07-12.md
docs/audits/matsuri-f2-22-canonical-search-2026-07-12.md
docs/audits/matsuri-f2-23-crawler-reachability-2026-07-13.md
```

## Public topology

```text
yukue.badjoke-lab.com          portal — planned
matsuri-yukue.badjoke-lab.com  Matsuri — canonical production
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
→ JSON, robots, sitemap, discovery files
→ Workers Static Assets
```

No SSR adapter, Worker runtime entry point, runtime binding, D1 canonical database, KV dependency, or runtime ingestion is required.

## Workers contract

```text
Worker name                    matsuri-yukue
Production branch              main
Build command                  pnpm build:matsuri:workers
Deploy command                 npx wrangler deploy
Non-production deploy command  npx wrangler versions upload
Asset directory                ./apps/matsuri/dist
Custom Domain                  matsuri-yukue.badjoke-lab.com
Node.js                        24
pnpm                           11.10.0
```

The production build receives:

```text
MATSURI_PUBLIC_ORIGIN=https://matsuri-yukue.badjoke-lab.com
```

and emits exact self-canonical links plus index/follow metadata. The repository release candidate omits active-origin canonical claims and uses `noindex,nofollow`.

## Completed external work

```text
F2-16  Workers Builds connection — completed
F2-17  first static deployment — completed
F2-18  deployed-origin verification — completed
F2-19  canonical hostname decision — completed
F2-20  Custom Domain and HTTPS — completed
F2-21  canonical manifest and sitemap — completed
F2-22  browser Search verification — completed
F2-23  crawler reachability — completed
```

## Remaining sequence

```text
F2-24  sitemap submission and indexability check — next
F2-25  Web Analytics activation — hold
F2-26  post-activation deployment — hold
F2-27  production traffic verification — hold
F2-28  final F2 Launch Gate — hold
```

Do not enable Analytics before F2-25 or claim indexation merely because F2-24 submission succeeds.
