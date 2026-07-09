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

- `observation-core`: shared domain primitives and vocabulary contracts.
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

```text
GitHub
→ GitHub Actions
→ build
→ Cloudflare Workers Static Assets
```

Portal and Matsuri should remain separately deployable.

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
