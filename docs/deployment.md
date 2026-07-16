# Deployment

**Status:** F2-16 through F2-24 completed / F2-25 owner access pending

## Verified production deployment

`祭のゆくえ` is deployed as a fully pre-rendered Astro site through Cloudflare Workers Static Assets.

```text
Worker
matsuri-yukue

Canonical origin
https://matsuri-yukue.badjoke-lab.com/

Permanent non-canonical Workers origin
https://matsuri-yukue.badjoke-lab.workers.dev/
```

Canonical activation evidence:

```text
Verification workflow
Verify Matsuri canonical origin gate

Verification run
29191904624 — success
```

Canonical Search evidence:

```text
Verification workflow
Verify Matsuri canonical Search

Verification run
29193201911 — success

Artifact ID
8260207484
```

Crawler-reachability evidence:

```text
Verification workflow
Verify Matsuri crawler reachability

Verification run
29230233384 — success

Artifact ID
8271238535
```

Search Console and indexability evidence:

```text
Search Console sitemap status   success
Submitted                       2026-07-14
Last read                       2026-07-14
Discovered pages                20
Representative live test        indexable
Indexing requests               3 submitted
Technical preflight run         29232294960 — success
```

This evidence does not claim that any URL is already indexed.

Detailed evidence:

```text
docs/audits/matsuri-f2-20-canonical-activation-2026-07-12.md
docs/audits/matsuri-f2-22-canonical-search-2026-07-12.md
docs/audits/matsuri-f2-23-crawler-reachability-2026-07-13.md
docs/audits/matsuri-f2-24-search-console-2026-07-14.md
```

## Public topology

```text
yukue.badjoke-lab.com          portal — planned
matsuri-yukue.badjoke-lab.com  Matsuri — canonical production verified
```

```text
apps/portal   → Worker yukue-portal
apps/matsuri  → Worker matsuri-yukue
```

Matsuri is not hosted below a portal path. The portal is not yet a production deployment.

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

No Astro Cloudflare SSR adapter, Worker runtime entry point, runtime binding, D1 canonical database, KV dependency, or runtime ingestion is required.

## Wrangler contract

```text
name                      matsuri-yukue
assets.directory          ./apps/matsuri/dist
main                      absent
routes[0].pattern         matsuri-yukue.badjoke-lab.com
routes[0].custom_domain   true
```

The Custom Domain is version-controlled. Cloudflare creates and maintains the matching DNS and certificate state.

## Workers Builds contract

```text
Repository                     badjoke-lab/yukue
Production branch              main
Root directory                 repository root
Build command                  pnpm build:matsuri:workers
Deploy command                 npx wrangler deploy
Non-production deploy command  npx wrangler versions upload
Node.js                        24
pnpm                           11.10.0
```

`scripts/build-matsuri-workers.mjs` loads the verified canonical origin from `config/yukue-deployment-topology.json` and passes:

```text
MATSURI_PUBLIC_ORIGIN=https://matsuri-yukue.badjoke-lab.com
```

to the static build child process.

## Dual artifact and external-evidence model

The repository gate verifies:

```text
Workers production artifact
- canonical origin configured
- manifest.site_origin present
- canonical sitemap locations present

Repository release candidate
- origin-neutral artifact copy
- separately records canonical-origin evidence
- separately records canonical browser Search evidence
- separately records crawler and Search Console evidence
```

## Completed external work

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

## Remaining sequence

```text
F2-25  Cloudflare Web Analytics Automatic setup — owner access pending
F2-26  post-activation deployment — blocked by F2-25
F2-27  production traffic verification — blocked by F2-26
F2-28  final F2 Launch Gate — blocked by F2-27
```

F2-25 is an account-level owner operation. The repository does not add a manual Analytics beacon or store a site token. F2-26 must use a deployment created after activation, and F2-27 must confirm traffic privately without publishing account identifiers or raw metrics.
