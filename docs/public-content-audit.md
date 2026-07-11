# Public Content and Image Boundary Audit

**Status:** F2 repository baseline

## Purpose

The public-content audit verifies that generated Matsuri pages describe the implemented product honestly and preserve the accepted empty-state, image, map, and link boundaries.

Run:

```text
pnpm check:matsuri:content
```

The audit is also included in:

```text
pnpm verify:matsuri:pages
pnpm verify:release
```

## Data Access inventory

The generated Data Access page must link exactly once to every file declared in `data/manifest.json.files`.

This prevents the human-facing data guide from drifting away from the actual public machine-readable inventory.

## Methodology contract

The generated Methodology page must retain explicit explanations for:

```text
Current State
Occurrence
Change Event
Relation
Evidence
Source
Public Projection
```

It must also state that:

- one cancellation does not automatically change Current State to suspended,
- AI-generated text is not treated as Evidence.

## Public infrastructure status

The Status page distinguishes repository-ready infrastructure from external production state.

Required public markers include:

```text
Public Projection ready
Browse ready
Search artifact ready
machine-readable layer ready
deployment artifact ready
external deployment held
Analytics activation required
```

Until the external hold is removed and production verification succeeds, the Status page must explicitly say that:

- public deployment is not yet performed,
- Web Analytics is not enabled,
- Cloudflare project-level activation and traffic verification remain required.

## Empty states

Every Current State page is compared with public JSON.

- zero public records require an honest textual empty state,
- a non-empty page must not display an empty-state message.

## Image boundary

Every canonical Image Asset must satisfy:

- approved content review,
- approved rights review,
- commercial use allowed,
- meaningful Japanese alt text,
- usable credit text,
- a local asset path or public URL.

When the canonical dataset contains zero approved images:

- generated public HTML must contain no image elements,
- no empty Gallery or Primary Image surface is rendered,
- no placeholder image message or asset is substituted.

Placeholder image hosts and filenames are rejected regardless of image count.

## Route-based map boundary

The representative 脚折雨乞 detail remains a route-based subject with multiple Places.

The generated page must:

- explain the geographic context in text,
- render multiple Place rows,
- avoid an unreviewed single embedded map that implies one point represents the whole tradition.

## External link presentation

Generated external links must:

- have visible human-readable labels,
- avoid using only the raw URL as label text,
- include `noopener noreferrer` when opening a new tab.

Live external reachability remains outside this repository build audit.
