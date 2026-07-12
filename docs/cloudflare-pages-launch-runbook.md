# Matsuri Cloudflare Workers Static Assets Launch Runbook

**Status:** F2-16 through F2-18 completed / F2-19 operational hold

> The file name is retained for compatibility with existing repository references. The accepted deployment platform is Cloudflare Workers Builds with Workers Static Assets, not a legacy Pages project.

## Completed purpose

This runbook governed the first external deployment of `祭のゆくえ` from the Yukue Series monorepo.

Completed outcomes:

1. connected `badjoke-lab/yukue` to Cloudflare Workers Builds,
2. created Worker `matsuri-yukue`,
3. deployed the static artifact from `apps/matsuri/dist`,
4. obtained reachable Workers origins,
5. passed deployed-origin smoke verification.

## Verified deployment

```text
Worker
matsuri-yukue

Permanent Workers origin
https://matsuri-yukue.badjoke-lab.workers.dev/

Verified deployment origin
https://f757f092-matsuri-yukue.badjoke-lab.workers.dev/

GitHub Actions verification
run 29182976642 — success

Verified source commit
f6fdd5055c2712838ef30ed54048abf7f0674b4c
```

## Deployment model

```text
GitHub repository
badjoke-lab/yukue
        ↓ Workers Builds Git integration
Cloudflare Worker
matsuri-yukue
        ↓ repository-root build
pnpm build:matsuri:workers
        ↓
apps/matsuri/dist
        ↓ Wrangler Static Assets upload
workers.dev
```

GitHub Actions remains the repository verification system. Workers Builds performs the external build and deployment.

Matsuri remains fully pre-rendered. The root `wrangler.jsonc` has no `main` field and uploads only `apps/matsuri/dist`.

## Accepted build contract

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

Do not add the Astro Cloudflare SSR adapter, Worker runtime code, runtime bindings, D1, KV, R2, or Pages Functions for this static launch baseline.

## F2 completion record

```text
F2-16  Workers Builds connection — completed
F2-17  first Workers Static Assets deployment — completed
F2-18  deployed-origin smoke verification — completed
```

F2-18 used:

```text
origin
https://f757f092-matsuri-yukue.badjoke-lab.workers.dev/

canonical
false
```

The verifier confirmed required public routes, Pagefind assets, public JSON, discovery files, Matsuri markers, representative Entity data, and sitemap structure.

## Current hold boundary

```text
F2-19 through F2-28 — operational hold
```

The hold covers:

- exact canonical parent domain and Matsuri subdomain,
- custom-domain attachment,
- `MATSURI_PUBLIC_ORIGIN`,
- canonical manifest and sitemap verification,
- browser Search verification on the canonical origin,
- crawler and indexability work,
- Web Analytics,
- production traffic verification,
- final F2 Launch Gate.

The Workers origin is reachable and suitable for maintenance checks, but it must not be treated as canonical.

## Resume procedure

When domain work can resume:

```text
F2-19  record exact canonical Matsuri hostname
F2-20  attach custom domain, set MATSURI_PUBLIC_ORIGIN, redeploy
F2-21  verify canonical manifest and sitemap
F2-22  verify browser Pagefind Search on canonical origin
F2-23  review robots, canonical, sitemap, crawler reachability
F2-24  submit sitemap and check indexability
F2-25  enable Web Analytics
F2-26  deploy after Analytics activation
F2-27  verify production traffic
F2-28  complete final Launch Gate
```

Do not skip directly to indexing or Analytics.

## Work allowed during the hold

Proceed with the active maintenance package:

```text
F2-M02 — Matsuri data freshness audit
```

Governing document:

```text
docs/matsuri-data-freshness-audit.md
```
