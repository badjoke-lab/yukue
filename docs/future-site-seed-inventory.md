# Yukue Future-site Seed Inventory

**Status:** F2-P02 and F2-P05 completed / F2-P09 provenance refreshed / candidate inventory only

## Purpose

The Matsuri corpus already contains approved Shrine, Temple, and funerary-place Entities when they are needed to explain a festival, performance, ritual, or historical relationship.

This repository task derives a public-safe seed inventory from those existing approved records. It avoids re-researching known cross-site context later while keeping the future Jinja, Jiin, and Tomurai applications inactive.

F2-P05 extends each seed with explicit public handoff provenance. It carries the exact Place, direct Entity-identity Evidence, identity Source, approved State Snapshot, and Relation Evidence references already present in Matsuri. Empty arrays remain explicit gaps rather than being inferred or filled. F2-P09 refreshes the inventory after adding shrine-operated official provenance for 大日霊貴神社.

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

## F2-P02 verified baseline

The first hosted extraction completed successfully on 2026-07-16.

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

## F2-P05 verified result

```text
Workflow         Build Yukue future-site seed inventory
Run ID           29490466083
Conclusion       success
Artifact ID      8372200074
Artifact name    yukue-future-site-seeds-97b26e7aa1e981d299f8cbf3914960e8a12b9716
Artifact digest  sha256:427d3c63ae158246a3224e78bfcaaa63fa79268337bb32083550c8fc0c975389
```

F2-P05 established one direct identity Evidence reference per seed and a self-contained handoff structure.

## F2-P09 current inventory

```text
Total relation-backed seeds   5
Relation contexts             5
Relation Evidence references  5
Identity Evidence references  6
Place references              5
Seeds with official URLs      5
Jinja seeds                   5
Jiin seeds                    0
Tomurai seeds                 0
```

Four seeds carry one direct identity Evidence reference. 大日霊貴神社 carries two approved identity Evidence references: one municipal Source and one shrine-operated Source. Every seed carries at least one identity Source reference, one Relation Evidence reference, one deduplicated Place reference, and at least one official URL. Every approved State Snapshot array remains empty because no shrine-specific State has been approved.

Current Jinja seeds:

```text
阿蘇神社
櫛田神社
佐太神社
大日霊貴神社
秩父神社
```

The zero counts for Jiin and Tomurai mean only that the current approved Matsuri Relations do not yet connect a Temple or funerary-place Entity to a Matsuri specialist Entity under this strict rule. They are not claims that those future sites have no valid subjects.

## Eligibility rule

A record becomes a seed candidate only when all of the following are true:

1. the Entity type maps to a future specialist site,
2. an approved Matsuri Relation connects it to a Matsuri specialist Entity,
3. the Relation has one or more Evidence IDs,
4. every referenced Evidence record is approved,
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

The artifact remains `format_version: 1`. F2-P09 adds records and references without changing the inventory structure.

## Handoff validation

The command validates that:

- every carried Place ID exists,
- every identity Evidence record is approved and targets the exact seed Entity,
- every identity Evidence Source exists,
- every Relation Evidence record is approved and targets the exact Relation,
- every Relation Evidence Source exists,
- every seed has at least one Place reference,
- every seed exposes identity Evidence and identity Source arrays even when empty,
- every seed carries at least one Relation Evidence reference.

## Boundary

The inventory does not:

- activate Jinja, Jiin, or Tomurai,
- create a new public application or route,
- choose which future site should be implemented next,
- rank candidates,
- expose internal confidence or research notes,
- import a private candidate queue,
- assert that a seed is complete enough for publication on another site,
- infer a missing State, Source, Evidence, Place, or official URL.

A seed is only a relation-backed starting point. Before later publication, the target site must apply its own identity, State, Evidence, Source, and maintenance review.

## Failure behavior

The command fails when:

- no relation-backed seed exists,
- an approved Relation lacks Evidence,
- a Relation references a missing Entity,
- Relation Evidence is missing or unapproved,
- Evidence targets the wrong Relation or Entity,
- an Evidence Source is missing,
- a carried Place record is missing,
- one Entity maps to conflicting future sites,
- duplicate Entity IDs appear in the output,
- required handoff arrays are absent.

## GitHub Actions

```text
Build Yukue future-site seed inventory
```

The workflow runs on relevant pull requests and `main` pushes and uploads the JSON and Markdown artifacts. It requires no Cloudflare access and does not deploy anything.
