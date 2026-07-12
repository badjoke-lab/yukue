# Deployment

**Status:** F2-16 active / Workers Static Assets activation

## Operational status

The repository-side deployment contract and verification tooling are implemented. The external operational hold was removed on 2026-07-12.

Current work:

```text
F2-16  create and connect the Matsuri Cloudflare Worker through Workers Builds
```

Pending external sequence:

```text
F2-17  first external deployment and reachable workers.dev URL
F2-18  deployed-origin smoke verification
F2-19  exact canonical custom subdomain decision
F2-20  canonical-origin configuration, custom-domain attachment, and redeployment
F2-21  canonical verification
F2-22  production Search verification
F2-23  crawler reachability review
F2-24  sitemap submission and indexability check
F2-25  Web Analytics activation
F2-26  post-activation deployment
F2-27  production traffic verification
F2-28  final F2 Launch Gate
```

The operational dashboard procedure is defined in `docs/cloudflare-pages-launch-runbook.md`. The historical file name is retained temporarily, but the document now governs Workers Builds and Workers Static Assets.

## Matsuri target

`祭のゆくえ` is deployed as a fully pre-rendered Astro site through Cloudflare Workers Static Assets.

```text
reviewed canonical data
→ validation
→ approved Public Projection
→ Astro static HTML
→ Pagefind static index
→ machine-readable public files
→ Workers Static Assets
```

No Cloudflare Astro SSR adapter, Worker runtime entry point, runtime binding, D1 canonical database, KV dependency, or runtime ingestion is required for the launch baseline.

## Wrangler contract

The repository root contains `wrangler.jsonc`:

```text
name              matsuri-yukue
assets.directory  ./apps/matsuri/dist
main              absent
```

The absence of `main` is intentional. The first deployment uploads and serves static files only.

Validate this contract with:

```text
pnpm check:matsuri:workers-config
```

## Workers Builds settings

Connect repository `badjoke-lab/yukue` with:

```text
Worker name                    matsuri-yukue
Production branch              main
Root directory                 repository root / blank
Build command                  pnpm build:matsuri:workers
Deploy command                 npx wrangler@latest deploy
Non-production deploy command  npx wrangler@latest versions upload
```

Use the repository root because Matsuri consumes workspace packages from `packages/*` and root scripts. Do not select `apps/matsuri` as the root directory.

The Worker name must exactly match the `name` in `wrangler.jsonc`.

## Build environment

Set:

```text
NODE_VERSION=24
```

The repository declares:

```text
packageManager=pnpm@11.10.0
```

When the dashboard exposes an explicit pnpm build variable, also set:

```text
PNPM_VERSION=11.10.0
```

No secrets or runtime variables are required for the static launch.

## Git integration boundary

Use Cloudflare Workers Builds Git integration.

This enables:

- automatic production builds from `main`,
- preview version uploads for non-production branches when enabled,
- deployment records linked to Git commits,
- `workers.dev` preview and production origins.

The Cloudflare dashboard now routes new Git imports through Worker creation. The removed legacy Pages-specific start screen is not required.

Because the repository already contains `wrangler.jsonc`, Cloudflare must not create an automatic framework-configuration pull request. Stop if it attempts to add SSR, an Astro Cloudflare adapter, Worker runtime code, or a replacement Wrangler file.

## Canonical origin boundary

Do not set `MATSURI_PUBLIC_ORIGIN` during F2-16 or the first deployment at F2-17.

The first successful Workers deployment establishes a reachable `workers.dev` URL. F2-18 verifies that URL. F2-19 then records the exact canonical Matsuri subdomain before F2-20 configures:

```text
MATSURI_PUBLIC_ORIGIN=https://<canonical-matsuri-subdomain>
```

and attaches the matching Cloudflare custom domain.

The accepted topology is:

```text
series parent-domain root  portal
Matsuri subdomain          祭のゆくえ
Jinja subdomain            神社のゆくえ
Jiin subdomain             寺院のゆくえ
Tomurai subdomain          弔いのゆくえ
```

The exact parent domain and hostname remain unresolved until F2-19. Do not treat a preview URL or the first `workers.dev` URL as canonical automatically.

## Repository commands

Build the exact Workers Static Assets target from the repository root:

```text
pnpm build:matsuri:workers
```

Validate the deployment configuration:

```text
pnpm check:matsuri:workers-config
```

Validate the generated static artifact:

```text
pnpm check:matsuri:pages
```

The historical `pages` check name remains because it validates the static artifact shape rather than a hosting product.

Run the full Workers-oriented target verification:

```text
pnpm verify:matsuri:workers
```

Run the complete repository gate:

```text
pnpm gate:matsuri:repository
```

Passing repository verification does not prove external deployment, canonical origin, browser Search, indexability, Analytics, or production traffic.

## First-deployment verification

After F2-17 produces the first reachable `workers.dev` origin, use the manual GitHub Actions workflow:

```text
Verify Matsuri deployed origin
```

Inputs:

```text
origin     exact issued https://*.workers.dev origin
canonical  false
```

Equivalent command:

```text
MATSURI_CHECK_ORIGIN=https://<deployment-host> pnpm check:matsuri:deployed
```

The deployed check verifies the main public routes, Pagefind runtime, JSON feeds, discovery files, and sitemap.

It covers:

```text
/
/about/
/festivals/
/performances/
/organizations/
/regions/
/changes/
/states/
/search/
/methodology/
/data/
/status/
/pagefind/pagefind.js
/version.json
/data/manifest.json
/data/entities.json
/data/events.json
/data/relations.json
/data/occurrences.json
/llms.txt
/ai.txt
/sitemap.xml
```

The HTTP verifier does not emulate browser Pagefind behavior. Browser Search remains F2-22.

## Canonical-origin verification

After F2-20 configures the accepted custom subdomain, run:

```text
MATSURI_CHECK_ORIGIN=https://<canonical-origin> pnpm check:matsuri:canonical
```

or use the manual workflow with:

```text
canonical  true
```

Canonical mode requires:

```text
data/manifest.json site_origin == checked origin
all sitemap.xml <loc> values use the checked canonical origin
```

Do not use a Worker preview URL as `MATSURI_PUBLIC_ORIGIN`.

## Crawler and indexability review

After canonical and browser Search verification:

1. confirm public routes are reachable without authentication,
2. confirm canonical markup uses the selected custom subdomain,
3. confirm sitemap locations use that origin,
4. confirm no accidental crawler block exists,
5. confirm machine-readable public files remain reachable,
6. submit the sitemap only after the canonical state is verified,
7. record indexability checks without claiming guaranteed indexing.

## Analytics baseline

The governing analytics baseline is defined in `docs/analytics.md`.

Enable Cloudflare Web Analytics only after F2-25 becomes active. Keep analytics credentials and private dashboard details out of the repository. F2-26 requires a subsequent deployment, and F2-27 requires actual production traffic to appear before the Analytics gate is complete.

## External launch order

```text
F2-16  connect the Matsuri Worker through Workers Builds — active
F2-17  obtain the first reachable workers.dev URL — pending
F2-18  run deployed-origin smoke verification — pending
F2-19  decide the exact canonical Matsuri subdomain — pending
F2-20  attach the custom domain, configure MATSURI_PUBLIC_ORIGIN, and redeploy — pending
F2-21  run canonical manifest and sitemap verification — pending
F2-22  perform browser Pagefind Search verification — pending
F2-23  review robots, canonical, sitemap, and crawler reachability — pending
F2-24  submit the sitemap and check indexability — pending
F2-25  enable Cloudflare Web Analytics — pending
F2-26  deploy after Analytics activation — pending
F2-27  verify production traffic — pending
F2-28  complete the final F2 Launch Gate — pending
```

Do not skip directly from Worker creation to the custom domain, indexing, or Analytics work.
