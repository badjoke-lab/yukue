# Matsuri Cloudflare Workers Static Assets Launch Runbook

**Status:** F2-16 through F2-21 completed / F2-22 browser Search verification next

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

Canonical verification:

```text
Workflow    Verify Matsuri canonical origin gate
Run         29191904624
Conclusion  success
Attempt     1 of 18
Activation  f978bc50a1ab51964687ec0457a448dc37b2aaf9
```

The gate confirmed HTTPS, all required public routes, Pagefind asset reachability, public JSON, exact `manifest.site_origin`, and canonical sitemap locations.

Evidence:

```text
docs/audits/matsuri-f2-20-canonical-activation-2026-07-12.md
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

`wrangler.jsonc` defines:

```json
{
  "routes": [
    {
      "pattern": "matsuri-yukue.badjoke-lab.com",
      "custom_domain": true
    }
  ]
}
```

`config/yukue-deployment-topology.json` records the verified canonical origin. `scripts/build-matsuri-workers.mjs` injects it into the static build as:

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
```

## Next sequence

```text
F2-22  browser Pagefind Search verification — next
F2-23  crawler-reachability review — hold
F2-24  sitemap submission and indexability check — hold
F2-25  Web Analytics activation — hold
F2-26  post-activation deployment — hold
F2-27  production traffic verification — hold
F2-28  final F2 Launch Gate — hold
```

F2-22 must use a real browser to enter representative queries, observe Pagefind results, and follow result links. The F2-20/F2-21 HTTP verifier did not exercise interactive Search.

Do not skip directly to sitemap submission or Analytics.
