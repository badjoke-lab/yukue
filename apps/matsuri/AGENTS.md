# AGENTS.md — apps/matsuri/

These instructions apply to the Matsuri application in addition to the repository-wide `AGENTS.md`.

## Governing documents

Before changing Matsuri public behavior, read the relevant documents:

```text
docs/product-spec.md
docs/matsuri-mvp-spec.md
docs/information-architecture.md
docs/ui-direction.md
docs/design-tokens.md
docs/ui-foundation-spec.md
docs/public-data-model.md
docs/verification-policy.md
docs/source-policy.md
docs/image-policy.md
```

Also read `docs/project-status.md` and `docs/development-schedule.md` before starting work.

## Accepted IA

Home:

```text
H1 — Search First Hybrid

Hero + Search
Current Observation Snapshot
Recent Changes
Recent Occurrences
Explore
Methodology / Evidence
Data Access
```

Festival Detail:

```text
C — Integrated Overview

Identity
Primary Image [optional]
Integrated Overview
About
Places & Map
Occurrence History
Change History
Relations
Gallery [optional]
Designations
Evidence & Sources
Machine-readable Data
```

Do not reorder these major sections without updating the IA decision.

## Visual direction

Matsuri accent:

```text
#284B63
```

Use:

- white background,
- black/gray neutral text,
- one Mincho family system,
- thin rules,
- controlled whitespace,
- restrained accent use.

Do not add placeholder images or generic festival stock imagery.

## Fixture-first UI rule

During the static UI implementation stages, use explicit fixture data.

Do not invent a premature backend or bypass the planned Public Projection pipeline.

Fixture data must exercise the accepted structures but must not be mistaken for canonical public data.

## Matsuri data distinctions

Preserve:

```text
usual timing != actual occurrence date
Current State != Occurrence outcome
Change Event != State Snapshot
Festival != Folk Performance by default
Geographic Scope != concrete Place
```

Do not create duplicate same-name Festival and Folk Performance records merely because a performance occurs annually.

## Place and map behavior

Respect subject geometry:

```text
single_site
multi_site
route_based
distributed
```

Do not show a single pin as if it fully represents a route-based or distributed tradition.

Text place information and an external map link should remain usable if embed loading fails.

## Images

Allowed only when the public image gate passes.

Zero approved images means no image block.

One approved image may render as the primary image with credit.

Multiple approved images may add gallery and lightbox behavior.

Never add AI-generated images, unrelated stock images, or placeholders.

## Public labels

Prefer understandable Japanese labels in the public UI.

Do not expose internal vocabulary codes such as raw relation codes as the primary user-facing label.

## Current implementation order

Follow `docs/development-schedule.md`.

Do not skip directly to browse/search/data integration before the shared UI foundation and static Home/Detail review stages are complete.
