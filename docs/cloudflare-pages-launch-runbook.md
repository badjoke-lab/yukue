# Matsuri Cloudflare Workers Static Assets Launch Runbook

**Status:** F2-16 through F2-24 completed / F2-25 owner access pending

> The file name is retained for compatibility. The accepted platform is Cloudflare Workers Builds with Workers Static Assets, not a legacy Pages project.

## Verified production deployment

```text
Worker
matsuri-yukue

Canonical origin
https://matsuri-yukue.badjoke-lab.com/

Permanent non-canonical Workers origin
https://matsuri-yukue.badjoke-lab.workers.dev/
```

Canonical-origin verification:

```text
Workflow    Verify Matsuri canonical origin gate
Run         29191904624
Conclusion  success
```

Canonical Search verification:

```text
Workflow    Verify Matsuri canonical Search
Run         29193201911
Job         86651403427
Conclusion  success
Artifact    8260207484
```

Crawler-reachability verification:

```text
Workflow    Verify Matsuri crawler reachability
Run         29230233384
Conclusion  success
Artifact    8271238535
```

Search Console and indexability evidence:

```text
Sitemap status             success
Submitted                  2026-07-14
Last read                  2026-07-14
Discovered pages           20
Representative live test   indexable
Indexing requests          3 submitted
Technical preflight run    29232294960 — success
```

This evidence proves successful submission and technical indexability at the recorded time. It does not prove that any URL is indexed.

Evidence:

```text
docs/audits/matsuri-f2-20-canonical-activation-2026-07-12.md
docs/audits/matsuri-f2-22-canonical-search-2026-07-12.md
docs/audits/matsuri-f2-23-crawler-reachability-2026-07-13.md
docs/audits/matsuri-f2-24-search-console-2026-07-14.md
```

## Series topology

```text
yukue.badjoke-lab.com          Yukue Series portal — planned
matsuri-yukue.badjoke-lab.com  祭のゆくえ — active canonical origin
```

The portal and Matsuri use separate applications and Workers.

```text
apps/portal   → yukue-portal
apps/matsuri  → matsuri-yukue
```

Matsuri is not moved beneath `yukue.badjoke-lab.com/matsuri/`.

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

The site remains fully pre-rendered. Do not add an Astro Cloudflare SSR adapter, Worker runtime code, runtime bindings, D1, KV, R2, or Pages Functions for this baseline.

## Repository-managed activation

`wrangler.jsonc` defines the Matsuri Custom Domain. `config/yukue-deployment-topology.json` records the verified canonical origin. `scripts/build-matsuri-workers.mjs` injects it into the static build as:

```text
MATSURI_PUBLIC_ORIGIN=https://matsuri-yukue.badjoke-lab.com
```

No dashboard-only duplicate origin value is required.

## Completed launch sequence

```text
F2-16  Workers Builds connection — completed
F2-17  first Workers Static Assets deployment — completed
F2-18  workers.dev smoke verification — completed
F2-19  exact canonical hostname decision — completed
F2-20  Custom Domain activation, canonical build, HTTPS verification — completed
F2-21  canonical manifest and sitemap verification — completed
F2-22  browser Pagefind Search verification — completed
F2-23  crawler reachability review — completed
F2-24  Search Console sitemap submission and indexability check — completed
```

## Owner-access resumption sequence

```text
F2-25  Cloudflare Web Analytics Automatic setup — owner access pending
F2-26  post-activation deployment — blocked by F2-25
F2-27  production traffic verification — blocked by F2-26
F2-28  final F2 Launch Gate — blocked by F2-27
```

When owner access resumes:

1. enable Cloudflare Web Analytics Automatic setup for the canonical hostname,
2. record sanitized F2-25 evidence without a token or account identifier,
3. merge the activation-evidence change,
4. verify a new post-activation production deployment as F2-26,
5. verify production traffic privately as F2-27,
6. run F2-28.

A deployment created before Analytics activation cannot be reused as F2-26 evidence. Do not add a manual beacon or claim traffic verification from configuration state alone.
