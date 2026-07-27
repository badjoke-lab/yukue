# Matsuri Cloudflare Workers Static Assets Launch Runbook

**Status:** F2-16 through F2-26 completed / F2-27 active

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
```

F2-26 accepted:

```text
Source commit       108ac4e88407e1263229eb40bc88d76855e90131
Cloudflare build    7026144e-1ce0-4927-9060-64919c3a4002
Deployed at         2026-07-27T10:34:17Z
Audit               docs/audits/matsuri-f2-26-post-activation-deployment-2026-07-27.md
```

The first deploy API call for the same source returned a transient provider-side 503 after build and asset upload. Retrying the same build succeeded.

## Remaining sequence

```text
F2-27  production traffic verification — active
F2-28  final F2 Launch Gate — blocked by F2-27
```

For F2-27, visit `/`, `/festivals/`, `/search/`, and `/festivals/suneori-amagoi/`, then confirm traffic privately for the canonical hostname. Do not publish raw metrics, account identity, tokens, or private dashboard screenshots.
