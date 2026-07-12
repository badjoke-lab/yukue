# Deployment

**Status:** F2-16 through F2-19 completed / F2-20 configuration committed / production deployment and verification pending

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

F2-20 code configuration is committed but does not become completed external evidence until production deployment and canonical verification succeed.

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
name                         matsuri-yukue
assets.directory             ./apps/matsuri/dist
main                         absent
routes[0].pattern            matsuri-yukue.badjoke-lab.com
routes[0].custom_domain      true
```

The absence of `main` is intentional. The deployment uploads and serves static files only.

The Custom Domain is version-controlled. On production `wrangler deploy`, Cloudflare applies the hostname, DNS record, and certificate state.

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

The production build does not depend on a dashboard-only environment variable. `scripts/build-matsuri-workers.mjs` reads the accepted public origin from `config/yukue-deployment-topology.json` and passes:

```text
MATSURI_PUBLIC_ORIGIN=https://matsuri-yukue.badjoke-lab.com
```

to the static build child process.

The value is public configuration, not a secret.

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

`pnpm gate:matsuri:repository` now verifies two build modes:

```text
Workers production mode
- MATSURI_PUBLIC_ORIGIN injected
- manifest.site_origin present
- canonical sitemap origin present

Repository release-candidate mode
- rebuilt without active origin
- canonical_origin remains null
- external F2-20 result remains unclaimed
```

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

After the F2-20 production deployment, run:

```text
origin
https://matsuri-yukue.badjoke-lab.com/

canonical
true
```

The verifier checks required public routes, Pagefind runtime, public JSON, discovery files, Matsuri markers, representative Entity data, manifest origin, and sitemap structure.

## F2-20 activation state

Repository configuration:

```text
canonical hostname decision  matsuri-yukue.badjoke-lab.com
Custom Domain route          committed
canonical build wrapper      committed
production deployment        pending
external HTTPS verification  pending
active completion claim      none
```

The merge to `main` triggers Workers Builds. The production sequence is:

```text
pnpm build:matsuri:workers
→ canonical static artifact
→ npx wrangler deploy
→ Custom Domain application
→ DNS and certificate provisioning
→ external verification
```

Configuration alone is not F2-20 completion.

## Remaining hold

```text
F2-20  production deployment and canonical custom-domain verification — active
F2-21  canonical manifest and sitemap verification as a recorded gate — hold
F2-22  browser Pagefind Search verification on canonical origin — hold
F2-23  crawler-reachability review — hold
F2-24  sitemap submission and indexability check — hold
F2-25  Web Analytics activation — hold
F2-26  post-activation deployment — hold
F2-27  production traffic verification — hold
F2-28  final F2 Launch Gate — hold
```

The Workers origin remains a verified deployment origin but is not canonical.

Do not:

- claim that the custom domain is active before HTTPS verification,
- mark F2-20 complete from repository configuration alone,
- submit the sitemap before F2-24,
- enable Web Analytics before F2-25,
- claim F2-21 through F2-28 completion.

## Work allowed while external activation is pending

- inspect Workers Builds and Wrangler logs,
- retry a failed production deployment after fixing a verified cause,
- run DNS and HTTPS checks,
- run deployed-origin verification,
- perform date-triggered Occurrence outcome maintenance,
- review Current State freshness,
- correct Source and Evidence records,
- perform security and dependency maintenance,
- preserve a passing repository gate.

Focused activation specification:

```text
docs/f2-20-custom-domain-activation.md
```
