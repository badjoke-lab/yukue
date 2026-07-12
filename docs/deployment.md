# Deployment

**Status:** F2-16 through F2-19 completed / F2-20 operational hold

## Verified deployment baseline

`祭のゆくえ` is deployed as a fully pre-rendered Astro site through Cloudflare Workers Static Assets.

```text
Cloudflare Worker
matsuri-yukue

Permanent Workers origin
https://matsuri-yukue.badjoke-lab.workers.dev/

Verified deployment origin
https://f757f092-matsuri-yukue.badjoke-lab.workers.dev/

GitHub Actions deployed-origin verification
run 29182976642 — success

Verified source commit
f6fdd5055c2712838ef30ed54048abf7f0674b4c
```

Completed external work:

```text
F2-16  Workers Builds connection
F2-17  first Workers Static Assets deployment and reachable URL
F2-18  deployed-origin smoke verification
F2-19  exact canonical Matsuri hostname decision
```

## Accepted public topology

```text
yukue.badjoke-lab.com
└─ Yukue Series portal

matsuri-yukue.badjoke-lab.com
└─ 祭のゆくえ
```

The portal and Matsuri are separate applications and separate Cloudflare Workers.

```text
apps/portal   → Worker yukue-portal   → yukue.badjoke-lab.com
apps/matsuri  → Worker matsuri-yukue  → matsuri-yukue.badjoke-lab.com
```

The Matsuri site is not hosted below a portal path such as `yukue.badjoke-lab.com/matsuri/`. Deploying the portal later does not replace or reconfigure the Matsuri Worker build contract.

The complete accepted topology is documented in:

```text
docs/deployment-topology.md
config/yukue-deployment-topology.json
```

Validate it with:

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
name              matsuri-yukue
assets.directory  ./apps/matsuri/dist
main              absent
```

The absence of `main` is intentional. The deployment uploads and serves static files only.

Validate the contract with:

```text
pnpm check:matsuri:workers-config
```

## Workers Builds settings

```text
Worker name                    matsuri-yukue
Repository                     badjoke-lab/yukue
Production branch              main
Root directory                 repository root
Build command                  pnpm build:matsuri:workers
Deploy command                 npx wrangler deploy
Non-production deploy command  npx wrangler versions upload
```

The repository root is required because Matsuri consumes workspace packages from `packages/*` and root scripts.

## Build environment

```text
Node.js  24
pnpm     11.10.0
```

No runtime secrets or bindings are required.

The canonical hostname decision is:

```text
matsuri-yukue.badjoke-lab.com
```

`MATSURI_PUBLIC_ORIGIN` remains unset until the custom domain is attached in F2-20.

## Repository commands

```text
pnpm check:yukue:deployment-topology
pnpm build:matsuri:workers
pnpm check:matsuri:workers-config
pnpm check:matsuri:pages
pnpm verify:matsuri:workers
pnpm gate:matsuri:repository
```

The historical `check:matsuri:pages` name validates the static artifact shape; it does not imply use of the legacy Pages product.

## Deployed-origin verification

The manual GitHub Actions workflow is:

```text
Verify Matsuri deployed origin
```

F2-18 was completed with:

```text
origin
https://f757f092-matsuri-yukue.badjoke-lab.workers.dev/

canonical
false
```

The verifier checks the required public routes, Pagefind runtime, public JSON, discovery files, Matsuri markers, representative Entity data, and sitemap structure.

The permanent Workers origin is also reachable:

```text
https://matsuri-yukue.badjoke-lab.workers.dev/
```

## Canonical decision versus activation

F2-19 decides the intended canonical hostname. It does not activate that origin.

Current state:

```text
canonical hostname decision  matsuri-yukue.badjoke-lab.com
custom domain attachment     pending
MATSURI_PUBLIC_ORIGIN        unset
active canonical origin      none
```

Do not emit active canonical production claims until F2-20 succeeds.

## F2-20 activation procedure

F2-20 must be performed in this order:

1. confirm that `matsuri-yukue.badjoke-lab.com` has no conflicting DNS record,
2. attach it as a Custom Domain to Worker `matsuri-yukue`,
3. set the Workers Builds environment variable:

```text
MATSURI_PUBLIC_ORIGIN=https://matsuri-yukue.badjoke-lab.com
```

4. trigger a production deployment,
5. verify the custom-domain response before canonical checks begin.

Cloudflare Custom Domains create the required DNS record and certificate for the attached hostname. A conflicting existing CNAME must be removed before attachment.

## Domain-dependent hold

```text
F2-20  attach custom domain, configure MATSURI_PUBLIC_ORIGIN, redeploy — hold
F2-21  canonical manifest and sitemap verification — hold
F2-22  browser Pagefind Search verification on canonical origin — hold
F2-23  crawler-reachability review — hold
F2-24  sitemap submission and indexability check — hold
F2-25  Web Analytics activation — hold
F2-26  post-activation deployment — hold
F2-27  production traffic verification — hold
F2-28  final F2 Launch Gate — hold
```

The Workers origin is a verified deployment origin, not the canonical public origin.

Do not:

- treat the hostname decision as proof that the domain is attached,
- set `MATSURI_PUBLIC_ORIGIN` before attachment,
- add canonical production claims before the F2-20 deployment,
- submit the sitemap before F2-24,
- enable Web Analytics before F2-25,
- claim F2-20 through F2-28 completion.

## Work allowed during the hold

The verified Workers origin may be used for maintenance checks, but not canonical verification.

Allowed work includes:

- date-triggered Occurrence outcome maintenance,
- Current State freshness reviews,
- Source and Evidence corrections,
- Relation improvements when new evidence appears,
- reviewed factual corrections,
- security and dependency maintenance,
- deployed-origin maintenance checks,
- screenshot-based visual review,
- repairs required to keep the repository gate green.
