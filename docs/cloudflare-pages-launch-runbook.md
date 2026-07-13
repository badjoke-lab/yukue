# Matsuri Cloudflare Workers Static Assets Launch Runbook

**Status:** F2-16 through F2-23 completed / F2-24 sitemap submission next

> The file name is retained for compatibility. The accepted platform is Cloudflare Workers Builds with Workers Static Assets.

## Verified production deployment

```text
Worker
matsuri-yukue

Canonical origin
https://matsuri-yukue.badjoke-lab.com/

Permanent non-canonical Workers origin
https://matsuri-yukue.badjoke-lab.workers.dev/
```

Verification:

```text
Canonical origin       29191904624 — success
Canonical Search       29193201911 — success
Crawler reachability   29230475619 — success
```

Evidence:

```text
docs/audits/matsuri-f2-20-canonical-activation-2026-07-12.md
docs/audits/matsuri-f2-22-canonical-search-2026-07-12.md
docs/audits/matsuri-f2-23-crawler-reachability-2026-07-13.md
```

## Series topology

```text
yukue.badjoke-lab.com          portal — planned
matsuri-yukue.badjoke-lab.com  Matsuri — canonical production
```

The portal and Matsuri remain separate applications and Workers. Matsuri is not moved beneath a portal path.

## Build and deployment contract

```text
Worker name                    matsuri-yukue
Production branch              main
Root directory                 repository root
Build command                  pnpm build:matsuri:workers
Deploy command                 npx wrangler deploy
Non-production deploy command  npx wrangler versions upload
Asset directory                ./apps/matsuri/dist
Worker main entry              absent
Node.js                        24
pnpm                           11.10.0
```

The production build receives the verified origin, emits self-canonical and index/follow metadata, and publishes robots plus sitemap discovery. The repository artifact remains origin-neutral and non-indexable.

## Completed launch sequence

```text
F2-16  Workers Builds connection — completed
F2-17  first static deployment — completed
F2-18  deployed-origin verification — completed
F2-19  canonical hostname decision — completed
F2-20  Custom Domain and HTTPS — completed
F2-21  canonical manifest and sitemap — completed
F2-22  browser Search — completed
F2-23  crawler reachability — completed
```

## Next sequence

```text
F2-24  sitemap submission and indexability check — next
F2-25  Web Analytics activation — hold
F2-26  post-activation deployment — hold
F2-27  production traffic verification — hold
F2-28  final F2 Launch Gate — hold
```

## F2-24 operating procedure

1. Use an accepted search-engine site-owner account.
2. Add or confirm the canonical origin property without exposing private account identifiers.
3. Submit `https://matsuri-yukue.badjoke-lab.com/sitemap.xml`.
4. Record submission time, result, and any returned sitemap status.
5. Check public indexability separately from actual indexed-page counts.
6. Store only public-safe evidence.
7. Do not enable Analytics before F2-25.

A successful submission is not proof that pages have already been indexed.
