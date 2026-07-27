# Deployment

**Status:** F2-16 through F2-27 completed / F2-28 final gate pending

`祭のゆくえ` is deployed as a fully pre-rendered Astro site through Cloudflare Workers Static Assets.

## Active production

```text
Worker                      matsuri-yukue
Canonical origin            https://matsuri-yukue.badjoke-lab.com/
Permanent Workers origin    https://matsuri-yukue.badjoke-lab.workers.dev/
Production branch           main
Build command               pnpm build:matsuri:workers
Deploy command              npx wrangler deploy
```

The portal remains a separate planned Worker. Matsuri is not hosted below a portal path.

## F2-26 accepted deployment

```text
Source commit       108ac4e88407e1263229eb40bc88d76855e90131
Cloudflare build    7026144e-1ce0-4927-9060-64919c3a4002
Deployed at         2026-07-27T10:34:17Z
Evidence            docs/audits/matsuri-f2-26-post-activation-deployment-2026-07-27.md
```

## F2-27 accepted traffic verification

```text
Canonical hostname  matsuri-yukue.badjoke-lab.com
Verified at         2026-07-27T11:26:58Z
Traffic observed    yes
Evidence            docs/audits/matsuri-f2-27-production-traffic-2026-07-27.md
```

The private dashboard screenshot, raw counts, and other private Analytics details are not stored in the repository.

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

No Astro Cloudflare SSR adapter, Worker runtime entry, runtime binding, D1 canonical database, KV dependency, or runtime ingestion is required.

## Wrangler contract

```text
name                      matsuri-yukue
assets.directory          ./apps/matsuri/dist
main                      absent
routes[0].pattern         matsuri-yukue.badjoke-lab.com
routes[0].custom_domain   true
```

## Completed external work

```text
F2-16 through F2-24  canonical deployment, Search, crawler, and Search Console verification — completed
F2-25                 Cloudflare Web Analytics Automatic setup — completed
F2-26                 post-activation main production deployment — completed
F2-27                 production traffic verification — completed
```

## Remaining sequence

```text
F2-28  final F2 Launch Gate — active
```
