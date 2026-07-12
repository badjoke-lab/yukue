# Technical Architecture

**Status:** Current direction / F2-19 deployment topology accepted

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

config/
scripts/
docs/
```

Only `portal` and `matsuri` are initial applications. Additional site applications should be added after their project gates.

One monorepo does not mean one public deployment. Each public application remains separately buildable and separately deployable.

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

## Public deployment topology

The accepted topology is stored in:

```text
config/yukue-deployment-topology.json
```

Validate it with:

```text
pnpm check:yukue:deployment-topology
```

Accepted public origins:

```text
yukue.badjoke-lab.com          Yukue Series portal
matsuri-yukue.badjoke-lab.com  祭のゆくえ
jinja-yukue.badjoke-lab.com    神社のゆくえ — future gate
jiin-yukue.badjoke-lab.com     寺院のゆくえ — future gate
tomurai-yukue.badjoke-lab.com  弔いのゆくえ — future gate
```

Each public application uses a separate Cloudflare Worker.

```text
apps/portal   → Worker yukue-portal
apps/matsuri  → Worker matsuri-yukue
```

Future applications follow the same pattern only after their site gates.

The portal is the series entrance and cross-site guide. It is not a runtime path parent for the specialist applications. The specialist sites must not be served as `/matsuri/`, `/jinja/`, `/jiin/`, or `/tomurai/` paths under the portal build.

This separation preserves independent:

- build artifacts,
- Search indexes,
- sitemaps,
- canonical URL spaces,
- deployment lifecycles,
- release gates,
- rollback boundaries.

## Matsuri deployment

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
Worker matsuri-yukue static assets
```

GitHub Actions and Cloudflare Workers Builds have different responsibilities:

```text
GitHub Actions
= repository gate, release-candidate verification, browser audit, visual-review artifacts

Cloudflare Workers Builds
= external build, preview version upload, production deployment, workers.dev origin, custom-domain delivery
```

Matsuri is static output. Do not add the Cloudflare Astro SSR adapter, a Worker `main` entry point, runtime bindings, or server-side rendering unless a later approved requirement introduces server-side behavior.

The Matsuri Worker contract is:

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

The root `wrangler.jsonc` is the Matsuri deployment contract. It must:

```text
name              matsuri-yukue
assets.directory  ./apps/matsuri/dist
main              absent
```

The absence of `main` is deliberate: the first launch serves only generated static assets and does not execute Worker application code.

## Portal deployment boundary

The portal application exists under:

```text
apps/portal
```

Its accepted future public identity is:

```text
Worker             yukue-portal
canonical hostname yukue.badjoke-lab.com
```

The portal deployment remains a separate future activation. It must not reuse `wrangler.jsonc`, Worker `matsuri-yukue`, or the Matsuri asset directory.

Deploying the portal later does not require changing the Matsuri build command, asset directory, or Worker identity. Only the independent portal deployment contract will be added when its gate is activated.

## Origin activation sequence

The first Matsuri deployment intentionally ran without `MATSURI_PUBLIC_ORIGIN` because no custom domain was active.

```text
first Workers deployment
→ obtain reachable workers.dev origin
→ deployed-origin smoke verification
→ exact portal and Matsuri hostname decision
→ attach Matsuri custom domain
→ configure MATSURI_PUBLIC_ORIGIN
→ redeploy
→ canonical manifest and sitemap verification
```

Completed:

```text
F2-16 through F2-19
```

Pending:

```text
F2-20 custom-domain attachment and canonical activation
```

The accepted decision is:

```text
MATSURI_PUBLIC_ORIGIN=https://matsuri-yukue.badjoke-lab.com
```

This value must remain unset until the matching custom domain is attached. The hostname decision is not itself an active canonical origin.

Do not derive the canonical public origin automatically from a preview or workers.dev URL.

The operational launch sequence is governed by:

```text
docs/cloudflare-pages-launch-runbook.md
docs/deployment-topology.md
```

The historical runbook file name remains for compatibility, but its contents govern Workers Static Assets deployment.

## Future dedicated-domain migration

The current `badjoke-lab.com` topology must remain migratable to a dedicated parent domain:

```text
<parent-domain>
matsuri.<parent-domain>
jinja.<parent-domain>
jiin.<parent-domain>
tomurai.<parent-domain>
```

A migration requires an explicit later decision, redirects, canonical changes, sitemap changes, and verification. It is not an automatic deployment change.

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
