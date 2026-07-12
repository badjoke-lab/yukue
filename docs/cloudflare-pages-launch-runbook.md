# Matsuri Cloudflare Workers Static Assets Launch Runbook

**Status:** F2-16 through F2-19 completed / F2-20 activation configuration committed / external verification pending

> The file name is retained for compatibility with existing repository references. The accepted deployment platform is Cloudflare Workers Builds with Workers Static Assets, not a legacy Pages project.

## Completed purpose

This runbook governs the external deployment of `祭のゆくえ` from the Yukue Series monorepo.

Completed outcomes:

1. connected `badjoke-lab/yukue` to Cloudflare Workers Builds,
2. created Worker `matsuri-yukue`,
3. deployed the static artifact from `apps/matsuri/dist`,
4. obtained reachable Workers origins,
5. passed deployed-origin smoke verification,
6. decided the exact canonical Matsuri hostname.

F2-20 activation configuration is now committed but must not be marked complete until the production deployment and custom-domain verification succeed.

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

## Accepted series topology

```text
yukue.badjoke-lab.com          Yukue Series portal
matsuri-yukue.badjoke-lab.com  祭のゆくえ
```

The portal and Matsuri use separate applications and separate Workers.

```text
apps/portal   → yukue-portal
apps/matsuri  → matsuri-yukue
```

The Matsuri site is not moved beneath `yukue.badjoke-lab.com/matsuri/` when the portal is deployed. The portal is a series entrance, not the runtime host for the specialist sites.

See:

```text
docs/deployment-topology.md
config/yukue-deployment-topology.json
```

## Deployment model

```text
GitHub repository
badjoke-lab/yukue
        ↓ Workers Builds Git integration
Cloudflare Worker
matsuri-yukue
        ↓ repository-root production build
pnpm build:matsuri:workers
        ↓ canonical origin injected from topology
apps/matsuri/dist
        ↓ Wrangler Static Assets upload + Custom Domain application
workers.dev + matsuri-yukue.badjoke-lab.com
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
F2-19  exact canonical Matsuri hostname decision — completed
F2-20  configuration committed; production deployment and verification pending
```

## F2-20 code-managed activation

F2-20 no longer depends on a dashboard-only Custom Domain or build-variable entry.

### Custom Domain source of truth

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

The production `wrangler deploy` applies the Custom Domain. Cloudflare creates the DNS record and certificate for the hostname.

### Canonical origin source of truth

`config/yukue-deployment-topology.json` records:

```text
https://matsuri-yukue.badjoke-lab.com
```

`scripts/build-matsuri-workers.mjs` reads that value and launches the production static build with:

```text
MATSURI_PUBLIC_ORIGIN=https://matsuri-yukue.badjoke-lab.com
```

The value is public configuration, not a secret. It is intentionally not duplicated in the Cloudflare dashboard.

### Repository gate behavior

The repository gate verifies both modes:

```text
Workers production artifact
- canonical origin configured
- manifest.site_origin present
- sitemap uses exact absolute origin

Repository release candidate
- rebuilt without active origin
- canonical_origin remains null
- F2-20 remains externally unverified
```

## F2-20 merge and deployment sequence

```text
1. merge the activation PR to main
2. Workers Builds runs pnpm build:matsuri:workers
3. Wrangler deploys the static artifact
4. Wrangler applies the Custom Domain route
5. Cloudflare creates DNS and certificate state
6. verify matsuri-yukue.badjoke-lab.com over HTTPS
7. run deployed-origin verification with canonical=true
8. record F2-20 completion only after success
```

Do not attach `yukue.badjoke-lab.com` to the Matsuri Worker. That hostname remains reserved for separate Worker `yukue-portal`.

## F2-20 completion evidence

F2-20 is complete only when all of the following are recorded:

```text
Custom Domain attached to Worker matsuri-yukue
matsuri-yukue.badjoke-lab.com resolves
HTTPS request succeeds
served site is 祭のゆくえ
manifest.site_origin equals https://matsuri-yukue.badjoke-lab.com
sitemap locations use the exact canonical origin
canonical deployed-origin workflow succeeds
workers.dev remains non-canonical
```

Configuration in Git alone is not completion evidence.

## Remaining launch sequence

```text
F2-20  external deployment and canonical custom-domain verification
F2-21  verify canonical manifest and sitemap as a recorded gate
F2-22  verify browser Pagefind Search on canonical origin
F2-23  review robots, canonical, sitemap, crawler reachability
F2-24  submit sitemap and check indexability
F2-25  enable Web Analytics
F2-26  deploy after Analytics activation
F2-27  verify production traffic
F2-28  complete final Launch Gate
```

Do not skip directly to indexing or Analytics.

## Failure boundary

If the production build, `wrangler deploy`, DNS provisioning, certificate issuance, or canonical verification fails:

- F2-20 remains incomplete,
- F2-21 through F2-28 remain blocked,
- do not submit the sitemap,
- do not enable Web Analytics,
- inspect Workers Builds and Wrangler logs before retrying.

Routine reviewed data and dependency maintenance may continue while external activation is unresolved.

See the focused activation record:

```text
docs/f2-20-custom-domain-activation.md
```
