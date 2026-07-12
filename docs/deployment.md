# Deployment

**Status:** F2-16 through F2-20 completed / F2-21 next

## Active deployment

`祭のゆくえ` is deployed as a fully pre-rendered Astro site through Cloudflare Workers Static Assets.

```text
Cloudflare Worker
matsuri-yukue

Workers origin
https://matsuri-yukue.badjoke-lab.workers.dev/

Active canonical origin
https://matsuri-yukue.badjoke-lab.com/
```

Verified external evidence:

```text
Initial deployed-origin verification
GitHub Actions run 29182976642 — success

Canonical-origin verification
GitHub Actions run 29191904624 — success
```

## Completed external work

```text
F2-16  Workers Builds connection
F2-17  first Workers Static Assets deployment and reachable URL
F2-18  deployed-origin smoke verification
F2-19  exact canonical Matsuri hostname decision
F2-20  Custom Domain activation and canonical-origin verification
```

## Accepted public topology

```text
yukue.badjoke-lab.com
└─ Yukue Series portal — reserved

matsuri-yukue.badjoke-lab.com
└─ 祭のゆくえ — active
```

The portal and Matsuri are separate applications and separate Cloudflare Workers.

```text
apps/portal   → Worker yukue-portal   → yukue.badjoke-lab.com
apps/matsuri  → Worker matsuri-yukue  → matsuri-yukue.badjoke-lab.com
```

The Matsuri site is not hosted below `yukue.badjoke-lab.com/matsuri/`. Deploying the portal later does not replace or reconfigure the Matsuri Worker build contract.

Governing topology:

```text
docs/deployment-topology.md
config/yukue-deployment-topology.json
```

Validate with:

```text
pnpm check:yukue:deployment-topology
```

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

No Astro Cloudflare SSR adapter, Worker runtime entry point, runtime binding, D1 canonical database, KV dependency, or runtime ingestion is required for the launch baseline.

## Wrangler contract

The repository root contains `wrangler.jsonc`:

```text
name                         matsuri-yukue
assets.directory             ./apps/matsuri/dist
main                         absent
routes[0].pattern            matsuri-yukue.badjoke-lab.com
routes[0].custom_domain      true
```

The absence of `main` is intentional. The deployment serves static files only.

## Workers Builds settings

```text
Worker name                    matsuri-yukue
Repository                     badjoke-lab/yukue
Production branch              main
Root directory                 repository root
Build command                  pnpm build:matsuri:workers
Deploy command                 npx wrangler deploy
Non-production deploy command  npx wrangler versions upload
Node.js                        24
pnpm                           11.10.0
```

No runtime secrets or bindings are required.

`scripts/build-matsuri-workers.mjs` reads the accepted public origin from `config/yukue-deployment-topology.json` and passes:

```text
MATSURI_PUBLIC_ORIGIN=https://matsuri-yukue.badjoke-lab.com
```

to the static build child process.

## Repository commands

```text
pnpm check:yukue:deployment-topology
pnpm build:matsuri:workers
pnpm check:matsuri:workers-config
pnpm check:matsuri:pages
pnpm verify:matsuri:workers
pnpm gate:matsuri:repository
```

The historical `check:matsuri:pages` name validates static artifact shape; it does not imply use of the legacy Pages product.

## Canonical verification result

The successful canonical gate confirmed:

```text
origin
https://matsuri-yukue.badjoke-lab.com/

canonical
true

workflow run
29191904624
```

It verified required public routes, Pagefind runtime, public JSON, discovery files, Matsuri markers, representative Entity data, exact `manifest.site_origin`, and exact canonical sitemap locations.

## Current boundary

```text
F2-21  canonical manifest and sitemap verification as a recorded gate — active next
F2-22  browser Pagefind Search verification on canonical origin — hold
F2-23  crawler-reachability review — hold
F2-24  sitemap submission and indexability check — hold
F2-25  Web Analytics activation — hold
F2-26  post-activation deployment — hold
F2-27  production traffic verification — hold
F2-28  final F2 Launch Gate — hold
```

Do not:

- submit the sitemap before F2-24,
- enable Web Analytics before F2-25,
- claim production traffic before F2-27,
- claim final launch completion before F2-28,
- attach `yukue.badjoke-lab.com` to the Matsuri Worker.

Focused activation record:

```text
docs/f2-20-custom-domain-activation.md
```
