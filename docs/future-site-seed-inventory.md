# Yukue Future-site Seed Inventory

**Status:** candidate inventory only / Jinja inactive / current machine baseline synchronized 2026-08-17

## Purpose

The Matsuri corpus contains approved Shrine, Temple, and funerary-place Entities when they are required to explain a festival, performance, ritual, or historical relationship. This task derives public-safe future-site seed handoffs from those approved records so known cross-site context does not need to be rediscovered later.

The inventory is preparation only. It does not activate Jinja, Jiin, or Tomurai and does not create an application, Worker, hostname, route, or publication decision.

## Command

```text
pnpm audit:yukue:future-site-seeds
```

Output:

```text
.artifacts/yukue-future-site-seeds/
  inventory.json
  provenance.json
  summary.md
```

## Historical F2-P02 baseline

The first hosted extraction completed on 2026-07-16 with five relation-backed Jinja seeds.

```text
Workflow         Build Yukue future-site seed inventory
Run ID           29478631183
Conclusion       success
Artifact ID      8367573485
Artifact digest  sha256:747a9b833adacbc049bf12e7a29312ab8ab676e3f3b2dc73e88c43e79a634524
```

```text
Total relation-backed seeds  5
Relation contexts            5
Jinja seeds                  5
Jiin seeds                   0
Tomurai seeds                0
```

The original five Jinja seeds were 阿蘇神社, 櫛田神社, 佐太神社, 大日霊貴神社, and 秩父神社. Later Matsuri corpus batches added more approved shrine Relations, so that five-name list is historical and must not be presented as the current Jinja seed inventory.

## Current machine-enforced Jinja aggregate

`config/jinja-start-gate.json` records the current blocked-site seed baseline and `scripts/check-jinja-start-gate-record.mjs` independently rebuilds the same aggregate from the canonical Matsuri dataset.

```text
Observed on                       2026-08-11
Relation-backed Jinja seeds       26
Direct identity Evidence          30
Place references                  26
Approved shrine State Snapshots    0
Seeds with official URLs          19
```

The exact current seed identities and per-seed provenance are generated artifacts. Regenerate `inventory.json` / `provenance.json` instead of relying on a manually maintained static name list.

The current aggregate also establishes two important preparation gaps without authorizing inference:

- no approved shrine State Snapshot exists yet;
- 7 of the 26 relation-backed Jinja seeds do not currently contribute an official URL to the blocked-gate aggregate.

Neither gap may be filled merely to improve readiness numbers. State work remains dependent on an approved Jinja State specification and evidence-bounded target-site research. Official URL work requires supported public provenance.

## Eligibility rule

A record becomes a seed candidate only when all of the following are true:

1. the Entity type maps to a future specialist site;
2. an approved Matsuri Relation connects it to a Matsuri specialist Entity;
3. the Relation has one or more Evidence IDs;
4. every referenced Evidence record is approved;
5. every Evidence record targets the exact Relation.

Entity-to-site mapping:

```text
shrine                                 → jinja
temple                                 → jiin
cemetery, columbarium, burial_facility → tomurai
```

Matsuri specialist counterpart types:

```text
festival
folk_performance
tradition_unit
```

## Included fields

The generated artifact contains only fields derived from approved public canonical records:

- Entity ID and type,
- preferred Japanese name,
- public summary,
- lifecycle,
- prefecture and municipality labels,
- primary, default, and deduplicated Place IDs,
- official public URLs,
- public Source IDs,
- direct Entity-identity Evidence IDs,
- identity Source IDs,
- approved State Snapshot IDs,
- flattened Relation Evidence IDs,
- approved Relation context,
- connected Matsuri specialist identity.

## Handoff validation

The generator validates that carried references resolve and that Evidence is approved and targets the correct Entity or Relation. Empty arrays remain explicit gaps instead of being inferred away.

## Boundary

The inventory does not:

- activate Jinja, Jiin, or Tomurai,
- create a new public application or route,
- choose implementation order,
- rank candidates,
- expose internal confidence or research notes,
- import a private candidate queue,
- assert publication readiness,
- infer a missing State, Source, Evidence, Place, or official URL.

A seed is only a relation-backed starting point. Before later publication, the target site must apply its own identity, State, Evidence, Source, and maintenance review.

## GitHub Actions

```text
Build Yukue future-site seed inventory
```

The workflow generates and uploads the public-safe inventory, provenance bundle, and summary. It requires no Cloudflare access and deploys nothing.
