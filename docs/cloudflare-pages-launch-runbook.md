# Matsuri Cloudflare Workers Static Assets Launch Runbook

**Status:** F2-16 through F2-28 completed

> The file name is retained for compatibility. The accepted platform is Cloudflare Workers Builds with Workers Static Assets, not a legacy Pages project.

## Production deployment

```text
Worker                      matsuri-yukue
Canonical origin            https://matsuri-yukue.badjoke-lab.com/
Permanent Workers origin    https://matsuri-yukue.badjoke-lab.workers.dev/
Production branch           main
Build command               pnpm build:matsuri:workers
Deploy command              npx wrangler deploy
Asset directory             ./apps/matsuri/dist
Node.js                      24
pnpm                         11.10.0
```

## Completed launch sequence

```text
F2-16 through F2-24  deployment, Search, crawler, and Search Console verification — completed
F2-25                 Cloudflare Web Analytics Automatic setup — completed
F2-26                 post-activation main production deployment — completed
F2-27                 production traffic verification — completed
F2-28                 final F2 Launch Gate — completed
```

Final gate:

```text
Evaluated at  2026-07-27T11:45:20Z
Machine record config/matsuri-f2-launch-gate.json
Audit         docs/audits/matsuri-f2-28-final-launch-gate-2026-07-27.md
```

No Cloudflare launch-gate action remains pending. Routine production and security maintenance continue. F2-28 does not authorize the portal or Jinja.
