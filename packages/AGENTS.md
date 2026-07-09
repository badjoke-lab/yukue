# AGENTS.md — packages/

These instructions apply to shared packages in addition to the repository-wide `AGENTS.md`.

## Shared-package rule

Shared packages must remain reusable across the Yukue Series.

Do not hard-code Matsuri-only labels, record types, colors, routes, or content into a generic shared package unless the package explicitly owns a site-specific extension boundary.

## Package responsibilities

### observation-core

Own shared domain primitives and cross-series contracts.

Do not embed Matsuri-only vocabulary as universal truth.

### schemas

Own common record schemas and clearly separated site extensions.

Preserve explicit schema versioning and stable ID fields.

### validation

Own schema, reference, vocabulary, semantic warning, and projection-safety checks.

Validation must fail loudly for structural violations and may emit warnings for review-sensitive semantic conditions.

### machine-readable

Generate public machine-readable outputs from approved Public Projection input.

Never read or expose private candidate queues or internal review fields.

### search

Own search indexing helpers and structured filter generation.

Public labels and URLs remain application responsibilities unless intentionally shared.

### ui

Own design tokens and reusable visual primitives.

The package must support site accent injection and must not hard-code Matsuri indigo as the universal accent.

## UI package invariants

Shared UI should implement the accepted visual language:

```text
white background
black/gray neutral system
Mincho family stack
thin rules
controlled whitespace
minimal shadows
minimal rounded chrome
site accent injection
```

Shared components should support zero-image rendering naturally.

## Dependency discipline

Avoid unnecessary framework or runtime dependencies.

Prefer small, typed, composable APIs.

Do not introduce dynamic infrastructure dependencies into shared packages without an explicit architecture decision.

## Testing

Shared package behavior should have focused tests when implementing:

- schema parsing,
- validation rules,
- projection safety,
- machine-readable generation,
- search filter generation,
- interactive accessibility behavior.

## Documentation

When a shared package changes a public contract, update the governing repository documentation in the same PR where practical.
