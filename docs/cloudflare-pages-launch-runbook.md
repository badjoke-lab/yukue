# Matsuri Cloudflare Pages Launch Runbook

**Status:** F2-16 active

## Purpose

This runbook governs the first external deployment of `祭のゆくえ` from the Yukue Series monorepo.

The first deployment has two purposes only:

1. connect the GitHub repository to Cloudflare Pages,
2. obtain a reachable `*.pages.dev` production URL for deployed-origin verification.

Do not add a custom domain, canonical production origin, Web Analytics, or production claims during F2-16.

## Deployment model

```text
GitHub repository
badjoke-lab/yukue
        ↓ Git integration
Cloudflare Pages project
matsuri-yukue
        ↓ repository-root build
pnpm build:matsuri:pages
        ↓
apps/matsuri/dist
```

GitHub Actions remains the repository verification system. Cloudflare Pages Git integration performs the external build and deployment.

The Matsuri site is static Astro output. Do not add the Cloudflare Astro SSR adapter or Pages Functions for this launch.

## Git integration decision

Use Cloudflare Pages Git integration rather than Direct Upload.

This gives the project:

- automatic production deployment from `main`,
- preview deployments for non-production branches and pull requests,
- a deployment record linked to the Git commit.

Cloudflare does not allow a Git-integrated Pages project to be converted into a Direct Upload project later. Automatic deployments can still be disabled later and Wrangler can deploy to the existing Git-integrated project if the operating model changes.

## F2-16 dashboard settings

Open:

```text
Cloudflare dashboard
→ Workers & Pages
→ Create application
→ Pages
→ Connect to Git / Import an existing Git repository
```

Select:

```text
Git provider       GitHub
Repository         badjoke-lab/yukue
```

Use these project settings exactly:

```text
Project name       matsuri-yukue
Production branch  main
Framework preset   None
Root directory     repository root / blank
Build command      pnpm build:matsuri:pages
Build output       apps/matsuri/dist
Build system       v3 / current default
```

The repository root must remain the build root because the Matsuri application depends on workspace packages and root scripts.

Do not use the Astro preset defaults without overriding them. The default `npm run build` and `dist` values do not describe this monorepo deployment target.

## Build environment variables

Set for both Production and Preview when the dashboard offers environment scoping:

```text
NODE_VERSION  24
PNPM_VERSION  11.10.0
```

The repository also contains `.node-version` with `24`, but the explicit dashboard value makes the external build contract visible.

Do not set:

```text
MATSURI_PUBLIC_ORIGIN
```

on the first deploy. The production URL does not exist until Cloudflare creates the project. Without this variable, the first build intentionally emits development-origin-neutral manifest and sitemap output.

Do not add secrets. The current static Matsuri build requires none.

## First deployment

After reviewing the settings, select:

```text
Save and Deploy
```

F2-16 and F2-17 can occur in the same dashboard session, but they remain separate recorded states:

```text
F2-16 complete
= GitHub repository connected and Pages project created

F2-17 complete
= first production deployment succeeded and a reachable URL was issued
```

## Required evidence to record

After the first build, record:

```text
Cloudflare project name
production pages.dev URL
deployed Git commit SHA
build result
build start and completion time
build command
output directory
Node version
pnpm version
```

The expected initial production URL is:

```text
https://matsuri-yukue.pages.dev
```

Do not assume this URL until Cloudflare displays it. If the project name is unavailable, do not invent a replacement name during setup; stop before deployment and record the conflict.

## F2-18 verification

After the URL is issued, run the manual GitHub Actions workflow:

```text
Verify Matsuri deployed origin
```

Input:

```text
origin     exact https://*.pages.dev production origin
canonical  false
```

The smoke verifier checks public HTML routes, Pagefind assets, JSON feeds, discovery files, sitemap structure, Matsuri site markers, and the representative Festival record.

Canonical mode must remain false until F2-19 and F2-20 establish and configure the accepted canonical origin.

## Stop conditions

Stop and record the exact message when:

- `badjoke-lab/yukue` is not visible to the Cloudflare GitHub integration,
- `main` cannot be selected as the production branch,
- `matsuri-yukue` is unavailable,
- dependency installation fails,
- Cloudflare uses a Node or pnpm version other than the pinned versions,
- the build command exits non-zero,
- `apps/matsuri/dist` is not found,
- the deployment completes but no production URL is reachable.

Do not compensate by changing application code, adding SSR, changing the root directory to `apps/matsuri`, or selecting a different package manager without a repository decision.

## Work after the first URL

Proceed in this order:

```text
F2-18  deployed-origin smoke verification
F2-19  canonical origin and domain decision
F2-20  set MATSURI_PUBLIC_ORIGIN and redeploy
F2-21  canonical manifest and sitemap verification
F2-22  production browser Search verification
F2-23  crawler-reachability review
F2-24  sitemap submission and indexability check
F2-25  Web Analytics activation
F2-26  post-activation deployment
F2-27  production traffic verification
F2-28  final F2 Launch Gate
```

Do not skip directly from the first deployment to Analytics or a custom domain.
