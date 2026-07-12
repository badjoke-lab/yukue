# Matsuri Cloudflare Workers Static Assets Launch Runbook

**Status:** F2-16 active

> The file name is retained for compatibility with existing repository references. The accepted deployment platform is now Cloudflare Workers Builds with Workers Static Assets, not a legacy Pages project.

## Purpose

This runbook governs the first external deployment of `祭のゆくえ` from the Yukue Series monorepo.

The first deployment has two purposes only:

1. connect `badjoke-lab/yukue` to a Cloudflare Worker through Workers Builds,
2. obtain a reachable `*.workers.dev` production URL for deployed-origin verification.

Do not add a custom domain, canonical production origin, Web Analytics, runtime bindings, or production claims during F2-16.

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
*.workers.dev
```

GitHub Actions remains the repository verification system. Workers Builds performs the external build and deployment.

Matsuri remains a fully pre-rendered Astro site. The root `wrangler.jsonc` has no `main` field and uploads only `apps/matsuri/dist`. Do not add the Astro Cloudflare SSR adapter, Worker runtime code, Pages Functions, D1, KV, R2, or runtime bindings for this launch.

## Repository precondition

Before using the Cloudflare dashboard, the production branch must contain:

```text
wrangler.jsonc
name              matsuri-yukue
assets.directory  ./apps/matsuri/dist
main               absent
```

Repository validation:

```text
pnpm check:matsuri:workers-config
pnpm verify:matsuri:workers
```

The Worker name shown in Cloudflare must exactly match the Wrangler `name` value.

## F2-16 dashboard path

Open:

```text
Cloudflare dashboard
→ Workers & Pages
→ Create application
→ Import a repository / Continue with GitHub
```

The current Cloudflare dashboard may label the surrounding flow as creating a Worker. This is the accepted route. Do not search for the removed legacy Pages-specific start screen.

Select:

```text
Git provider  GitHub
Repository    badjoke-lab/yukue
```

## Required build settings

Use these settings exactly:

```text
Worker name                       matsuri-yukue
Production branch                 main
Root directory                    repository root / blank
Build command                     pnpm build:matsuri:workers
Deploy command                    npx wrangler@latest deploy
Non-production deploy command     npx wrangler@latest versions upload
```

Keep the repository root as the build root because Matsuri depends on workspace packages and root scripts.

Do not select `apps/matsuri` as the root directory.

## Build environment

Set the build variable:

```text
NODE_VERSION=24
```

The repository declares pnpm `11.10.0` through `packageManager`. If the dashboard provides a build variable for pnpm selection, set:

```text
PNPM_VERSION=11.10.0
```

Do not set:

```text
MATSURI_PUBLIC_ORIGIN
```

on the first deploy. The production URL does not exist until Cloudflare creates the Worker deployment.

No secrets or runtime variables are required.

## First deployment

After reviewing the settings, select:

```text
Save and Deploy
```

F2-16 and F2-17 can occur in the same dashboard session, but remain separate recorded states:

```text
F2-16 complete
= GitHub repository connected and Worker created

F2-17 complete
= production build and deployment succeeded and a reachable workers.dev URL was issued
```

## Required evidence

Record:

```text
Worker name
production workers.dev URL
deployed Git commit SHA
build result
build start and completion time
build command
deploy command
asset directory
Node version
pnpm version
```

Do not assume the exact `workers.dev` hostname before Cloudflare displays it. The account subdomain is part of the issued URL.

## F2-18 verification

After Cloudflare issues the URL, run the manual GitHub Actions workflow:

```text
Verify Matsuri deployed origin
```

Input:

```text
origin     exact issued https://*.workers.dev origin
canonical  false
```

Canonical mode remains false until the accepted custom subdomain is configured.

## Subdomain topology

The accepted series topology is:

```text
parent domain root       series portal
Matsuri subdomain        祭のゆくえ
Jinja subdomain          神社のゆくえ
Jiin subdomain           寺院のゆくえ
Tomurai subdomain        弔いのゆくえ
```

F2-16 does not attach the final Matsuri subdomain. The exact parent domain and custom hostname remain part of the canonical-origin step.

## Stop conditions

Stop and record the exact message when:

- `badjoke-lab/yukue` is not visible,
- `main` cannot be selected,
- the Worker name cannot be `matsuri-yukue`,
- Cloudflare proposes or creates an automatic configuration PR despite the committed `wrangler.jsonc`,
- the root directory is forced away from the repository root,
- dependency installation fails,
- the build command exits non-zero,
- `apps/matsuri/dist` is not found,
- Wrangler reports a name mismatch,
- deployment succeeds but no production URL is reachable.

Do not compensate by adding SSR, Worker runtime code, the Astro Cloudflare adapter, or a different package manager.

## Work after the first URL

Proceed in this order:

```text
F2-18  deployed-origin smoke verification
F2-19  exact canonical origin and custom subdomain decision
F2-20  set MATSURI_PUBLIC_ORIGIN and attach the custom domain
F2-21  canonical manifest and sitemap verification
F2-22  production browser Search verification
F2-23  crawler-reachability review
F2-24  sitemap submission and indexability check
F2-25  Web Analytics activation
F2-26  post-activation deployment
F2-27  production traffic verification
F2-28  final F2 Launch Gate
```

Do not skip directly from the first deployment to Analytics or the custom domain.
