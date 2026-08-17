# AGENTS.md — apps/matsuri/

These instructions apply to the Matsuri application in addition to the repository-wide `AGENTS.md`.

## Governing documents

Before changing Matsuri public behavior, read the relevant documents:

```text
docs/product-spec.md
docs/matsuri-mvp-spec.md
docs/nationwide-corpus-scaling.md
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

For corpus expansion, import, coverage-tier, search/indexability, sitemap, public JSON, or publication changes, `docs/nationwide-corpus-scaling.md` is mandatory.

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

During static UI implementation stages, use explicit fixture data.

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
private candidate != public Tier A
Tier A != Tier B != Tier C
```

Do not create duplicate same-name Festival and Folk Performance records merely because a performance occurs annually.

Do not infer unsupported Current State, `held`, `cancelled`, organizer, Place, Relation, coordinate, or officiality.

## Public A/B/C behavior

The nationwide Matsuri model is:

```text
Tier A  Public Index
  ↓ target: about 7 calendar days
Tier B  Public Verified
  ↓ continuous deepening
Tier C  Public History / Monitoring
```

A valid reviewed Tier A record is public and may appear in detail/browse/search, public JSON, sitemap, and indexable discovery surfaces.

Tier A does not require completed Occurrence, Change Event, Current State, organizer, Place, Relation, coordinates, or multi-year history. Missing Tier B/C dimensions remain absent rather than inferred.

The A→B target is a prioritization mechanism. One overdue Tier A must not globally block unrelated valid Tier A publication, and a valid Tier A must not be automatically withdrawn because the target elapsed.

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

Tier A may legitimately have no concrete Place or coordinates beyond supported geographic scope.

## Images

Allowed only when the public image gate passes.

Zero approved images means no image block.

One approved image may render as the primary image with credit.

Multiple approved images may add gallery and lightbox behavior.

Never add AI-generated images, unrelated stock images, or placeholders.

## Public labels

Prefer understandable Japanese labels in the public UI.

Do not expose internal vocabulary codes such as raw relation codes as the primary user-facing label.

Coverage tier must be machine-visible, and any user-facing tier explanation must not overstate verification depth.

## Future-site boundary

Matsuri Shrine/Temple Relations and seeds do not automatically become public Tier A records on Jinja or Jiin.

Do not add or activate Jinja/Jiin/Tomurai app routes, hostnames, Workers, or specialist-site publication from Matsuri work.

## Current implementation order

Follow `docs/development-schedule.md`.

The active nationwide sequence is NCS-02 → NCS-03 → NCS-04 → NCS-05 → NCS-06, followed by the 500 and 1,000 public-primary checkpoints while A→B verification and B→C deepening continue in parallel.
