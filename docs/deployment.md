# Deployment

**Status:** F2-16 through F2-28 completed / stabilization active

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

## Launch closure

```text
F2-25 Analytics activation     completed
F2-26 production deployment    completed
F2-27 traffic verification     completed
F2-28 final launch gate        completed
```

Final record:

```text
config/matsuri-f2-launch-gate.json
docs/audits/matsuri-f2-28-final-launch-gate-2026-07-27.md
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

No Astro Cloudflare SSR adapter, Worker runtime entry, runtime binding, D1 canonical database, KV dependency, or runtime ingestion is required.

## Wrangler contract

```text
name                      matsuri-yukue
assets.directory          ./apps/matsuri/dist
main                      absent
routes[0].pattern         matsuri-yukue.badjoke-lab.com
routes[0].custom_domain   true
```

No deployment launch gate remains pending. Phase 10 stabilization and routine maintenance continue.
