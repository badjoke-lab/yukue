# Matsuri Cloudflare Workers Static Assets Launch Runbook

**Status:** F2-16 through F2-19 completed / F2-20 operational hold

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
        ↓ repository-root build
pnpm build:matsuri:workers
        ↓
apps/matsuri/dist
        ↓ Wrangler Static Assets upload
workers.dev and later Custom Domain
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
```

F2-18 used:

```text
origin
https://f757f092-matsuri-yukue.badjoke-lab.workers.dev/

canonical
false
```

The verifier confirmed required public routes, Pagefind assets, public JSON, discovery files, Matsuri markers, representative Entity data, and sitemap structure.

## F2-19 decision

```text
Portal canonical hostname decision
https://yukue.badjoke-lab.com

Matsuri canonical hostname decision
https://matsuri-yukue.badjoke-lab.com
```

F2-19 records intent only.

```text
Matsuri custom domain       not attached
MATSURI_PUBLIC_ORIGIN       unset
active canonical origin     none
```

The Workers origin remains reachable and suitable for maintenance checks, but it must not be treated as canonical.

## F2-20 dashboard procedure

Before starting, confirm that the Cloudflare zone `badjoke-lab.com` is active and that no existing CNAME uses `matsuri-yukue.badjoke-lab.com`.

In the Cloudflare dashboard:

1. open **Workers & Pages**,
2. select Worker **matsuri-yukue**,
3. open **Settings → Domains & Routes**,
4. choose **Add → Custom Domain**,
5. enter:

```text
matsuri-yukue.badjoke-lab.com
```

6. select **Add Custom Domain**,
7. wait until the hostname and certificate are active,
8. open the Worker Builds configuration,
9. add the production build environment variable:

```text
MATSURI_PUBLIC_ORIGIN=https://matsuri-yukue.badjoke-lab.com
```

10. trigger a new production deployment from `main`.

Cloudflare's Custom Domain flow creates the DNS record and certificate for the hostname. It cannot attach a hostname that already has a conflicting CNAME record.

Do not attach `yukue.badjoke-lab.com` to the Matsuri Worker. That hostname is reserved for the separate portal Worker.

## F2-20 completion evidence

F2-20 is complete only when all of the following are recorded:

```text
Custom Domain attached to Worker matsuri-yukue
matsuri-yukue.badjoke-lab.com reachable over HTTPS
MATSURI_PUBLIC_ORIGIN set to the exact HTTPS origin
new production deployment completed
workers.dev origin still non-canonical
```

Do not claim F2-20 completion from the hostname decision alone.

## Remaining launch sequence

```text
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

## Hold boundary

Until the F2-20 external action succeeds:

- do not set `MATSURI_PUBLIC_ORIGIN` in repository-only verification,
- do not treat `matsuri-yukue.badjoke-lab.com` as active,
- do not emit canonical production claims,
- do not submit the sitemap,
- do not enable Web Analytics,
- do not claim F2-20 through F2-28 completion.

Routine reviewed data and dependency maintenance may continue during the hold.
