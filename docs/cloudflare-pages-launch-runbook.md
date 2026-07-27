# Matsuri Cloudflare Workers Static Assets Launch Runbook

**Status:** F2-16 through F2-27 completed / F2-28 active

> The file name is retained for compatibility. The accepted platform is Cloudflare Workers Builds with Workers Static Assets, not a legacy Pages project.

## Production deployment

```text
Worker                      matsuri-yukue
Canonical origin            https://matsuri-yukue.badjoke-lab.com/
Permanent Workers origin    https://matsuri-yukue.badjoke-lab.workers.dev/
Production branch           main
Root directory              repository root
Build command               pnpm build:matsuri:workers
Deploy command              npx wrangler deploy
Asset directory             ./apps/matsuri/dist
Node.js                      24
pnpm                         11.10.0
```

`wrangler.jsonc` defines the Custom Domain. `scripts/build-matsuri-workers.mjs` injects the canonical origin into the static build. No SSR adapter, Worker runtime entry, D1, KV, R2, or Pages Function is part of this baseline.

## Completed launch sequence

```text
F2-16  Workers Builds connection — completed
F2-17  first Workers Static Assets deployment — completed
F2-18  workers.dev smoke verification — completed
F2-19  exact canonical hostname decision — completed
F2-20  Custom Domain activation and HTTPS verification — completed
F2-21  canonical manifest and sitemap verification — completed
F2-22  browser Pagefind Search verification — completed
F2-23  crawler-reachability review — completed
F2-24  Search Console sitemap submission and indexability check — completed
F2-25  Cloudflare Web Analytics Automatic setup — completed
F2-26  post-activation main production deployment — completed
F2-27  production traffic verification — completed
```

F2-27 accepted:

```text
Canonical hostname  matsuri-yukue.badjoke-lab.com
Verified at         2026-07-27T11:26:58Z
Traffic observed    yes
Audit               docs/audits/matsuri-f2-27-production-traffic-2026-07-27.md
```

The four representative canonical routes were visited before private-dashboard confirmation. Raw metrics and the dashboard screenshot are not public evidence.

## Remaining sequence

```text
F2-28  final F2 Launch Gate — active
```

F2-28 is repository- and evidence-driven. No additional Cloudflare account action is required unless a verification gate reports a new failure.
