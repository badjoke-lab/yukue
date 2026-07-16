# Yukue Future-site Seed Inventory

**Status:** Repository preparation / candidate inventory only

## Purpose

The Matsuri corpus already contains approved Shrine, Temple, and funerary-place Entities when they are needed to explain a festival, performance, ritual, or historical relationship.

This repository task derives a public-safe seed inventory from those existing approved records. It avoids re-researching known cross-site context later while keeping the future Jinja, Jiin, and Tomurai applications inactive.

## Command

```text
pnpm audit:yukue:future-site-seeds
```

Output:

```text
.artifacts/yukue-future-site-seeds/
  inventory.json
  summary.md
```

## Eligibility rule

A record becomes a seed candidate only when all of the following are true:

1. the Entity type maps to a future specialist site,
2. an approved Matsuri Relation connects it to a Matsuri specialist Entity,
3. the Relation has one or more Evidence IDs,
4. every referenced Evidence record is approved,
5. every Evidence record targets the exact Relation.

Entity-to-site mapping:

```text
shrine                                → jinja
temple                                → jiin
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
- official public URLs,
- public Source IDs,
- approved Relation context,
- approved Evidence IDs,
- connected Matsuri specialist identity.

## Boundary

The inventory does not:

- activate Jinja, Jiin, or Tomurai,
- create a new public application or route,
- choose which future site should be implemented next,
- rank candidates,
- expose internal confidence or research notes,
- import a private candidate queue,
- assert that a seed is complete enough for publication on another site.

A seed is only a relation-backed starting point. Before later publication, the target site must apply its own identity, State, Evidence, Source, and maintenance review.

## Validation behavior

The command fails when:

- no relation-backed seed exists,
- an approved Relation lacks Evidence,
- a Relation references a missing Entity,
- Relation Evidence is missing or unapproved,
- Evidence targets the wrong Relation,
- one Entity maps to conflicting future sites,
- duplicate Entity IDs appear in the output.

## GitHub Actions

```text
Build Yukue future-site seed inventory
```

The workflow runs on relevant pull requests and `main` pushes and uploads the JSON and Markdown artifacts. It requires no Cloudflare access and does not deploy anything.
