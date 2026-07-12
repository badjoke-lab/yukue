# Technical Architecture

**Status:** Current direction

## Stack

```text
pnpm workspace
Astro
TypeScript
Git-managed public canonical data
schema validation
Pagefind
Cloudflare Workers Builds
Cloudflare Workers Static Assets
GitHub Actions
```

## Monorepo

```text
apps/
  portal/
  matsuri/

packages/
  observation-core/
  schemas/
  validation/
  machine-readable/
  search/
  ui/

data/
  public/

scripts/
docs/
```

Only `portal` and `matsuri` are initial applications. Additional site applications should be added after their project gates.

## Data flow

```text
Reviewed public canonical data
        ↓
Schema validation
        ↓
Cross-record integrity validation
        ↓
Public Projection
        ├── HTML page data
        ├── Public JSON
        ├── JSON-LD
        ├── Search index
        ├── Sitemap
        ├── Manifest
        ├── version.json
        ├── llms.txt
        └── ai.txt
```

The public build must consume approved public projection data rather than unpublished candidate or review material.

## Package responsibilities

- `observation-core`: shared observation logic and Public Projection assembly from validated approved records.
- `schemas`: record schemas and site-specific extensions.
- `validation`: schema, referential integrity, vocabulary, semantic warning, and projection-safety checks.
- `machine-readable`: Manifest, version, public feeds, and discovery-file generation.
- `search`: search indexing helpers and structured filter output.
- `ui`: shared design tokens and presentation components after UI direction is approved.

## Validation layers

1. Schema validation.
2. Referential integrity.
3. Vocabulary validation.
4. Semantic warnings.
5. Public Projection leak checks.

Expected checks include ID uniqueness, slug uniqueness, Relation endpoint integrity, Evidence target integrity, State and Occurrence vocabulary checks, Place reference integrity, image rights gate, maximum one primary image per Entity, and required credit when attribution is required.

## Search

Initial direction:

```text
Pagefind full-text search
+
build-time structured filters
```

Initial filters:

```text
entity type
prefecture
current state
```

## Deployment

The accepted first-launch architecture is Cloudflare Workers Builds with a static Astro artifact uploaded through Workers Static Assets.

```text
GitHub repository
badjoke-lab/yukue
        ↓
GitHub Actions repository verification
        ↓
Cloudflare Workers Builds Git integration
        ↓
pnpm build:matsuri:workers
        ↓
apps/matsuri/dist
        ↓
npx wrangler@latest deploy
        ↓
Matsuri Worker static assets
```

GitHub Actions and Cloudflare Workers Builds have different responsibilities:

```text
GitHub Actions
= repository gate, release-candidate verification, browser audit, visual-review artifacts

Cloudflare Workers Builds
= external build, preview version upload, production deployment, workers.dev origin
```

Matsuri is static output. Do not add the Cloudflare Astro SSR adapter, a Worker `main` entry point, runtime bindings, or server-side rendering unless a later approved requirement introduces server-side behavior.

The initial Worker contract is:

```text
Worker name                    matsuri-yukue
repository                     badjoke-lab/yukue
production branch              main
root directory                 repository root
build command                  pnpm build:matsuri:workers
deploy command                 npx wrangler@latest deploy
non-production deploy command  npx wrangler@latest versions upload
asset directory                apps/matsuri/dist
Node.js                        24
pnpm                           11.10.0
```

The repository root remains the build root because the Matsuri application depends on workspace packages and root scripts.

The root `wrangler.jsonc` is the deployment contract. It must:

```text
name              matsuri-yukue
assets.directory  ./apps/matsuri/dist
main              absent
```

The absence of `main` is deliberate: the first launch serves only generated static assets and does not execute Worker application code.

Portal and Matsuri remain separately deployable and must use separate Cloudflare Worker names. The accepted public topology uses the series parent domain for the portal and a Matsuri subdomain for `祭のゆくえ`; the exact canonical hostname is configured only after the first `workers.dev` deployment is verified.

## Origin activation sequence

The first deployment intentionally runs without `MATSURI_PUBLIC_ORIGIN` because the Cloudflare production URL does not exist before Worker creation.

```text
first Workers deployment
→ obtain reachable workers.dev origin
→ deployed-origin smoke verification
→ exact canonical custom subdomain decision
→ configure MATSURI_PUBLIC_ORIGIN and custom domain
→ redeploy
→ canonical manifest and sitemap verification
```

Do not derive the canonical public origin automatically from a preview or deployment-specific URL. An explicit canonical-origin decision remains required.

The operational launch sequence is governed by:

```text
docs/cloudflare-pages-launch-runbook.md
```

The historical file name remains temporarily for compatibility, but its contents govern Workers Static Assets deployment.

## Future operational layer

D1, R2, Cron Triggers, Queues, or Worker APIs may be added when justified.

Intended boundary:

```text
Git-reviewed public data
= reviewed canonical public layer

Operational systems
= candidate collection, monitoring, workflow support
```

Dynamic infrastructure should not be introduced solely because it is available.
