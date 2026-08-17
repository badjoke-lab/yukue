# Yukue Future-site Seed Inventory

**Status:** candidate inventory only / current hosted extraction verified 2026-08-17

## Purpose

The Matsuri corpus already contains approved Shrine, Temple, and funerary-place Entities when they are needed to explain a festival, performance, ritual, or historical relationship.

This repository task derives a public-safe seed inventory from those existing approved records. It avoids re-researching known cross-site context later while keeping the future Jinja, Jiin, and Tomurai applications inactive.

Each seed carries the exact Place, direct Entity-identity Evidence, identity Source, approved State Snapshot, and Relation Evidence references already present in Matsuri. Empty arrays remain explicit gaps rather than being inferred or filled.

The inventory is generated from canonical public data. This document records the current hosted extraction; it is not a manually maintained candidate database and it does not activate a future site.

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

## Historical hosted baselines

The first hosted extraction completed successfully on 2026-07-16.

```text
Workflow         Build Yukue future-site seed inventory
Run ID           29478631183
Conclusion       success
Artifact ID      8367573485
Artifact digest  sha256:747a9b833adacbc049bf12e7a29312ab8ab676e3f3b2dc73e88c43e79a634524

Total relation-backed seeds  5
Relation contexts            5
Jinja seeds                  5
Jiin seeds                   0
Tomurai seeds                0
```

F2-P05 then established one direct identity Evidence reference per seed and a self-contained handoff structure.

```text
Workflow         Build Yukue future-site seed inventory
Run ID           29490466083
Conclusion       success
Artifact ID      8372200074
Artifact name    yukue-future-site-seeds-97b26e7aa1e981d299f8cbf3914960e8a12b9716
Artifact digest  sha256:427d3c63ae158246a3224e78bfcaaa63fa79268337bb32083550c8fc0c975389
```

Subsequent Matsuri relation and provenance maintenance expanded the strict relation-backed Jinja seed set. F2-P09 added shrine-operated provenance for 大日霊貴神社; later maintenance added or refreshed dedicated identity provenance for additional shrines. The eligibility rule itself has not changed.

## Current hosted inventory

Current exact-head extraction for `agent/matsuri-saidaiji-2025-history` after the five-shrine provenance refresh:

```text
Workflow                     Build Yukue future-site seed inventory
Run ID                       32041415850
Conclusion                   success
Artifact ID                  9292017345
Artifact digest              sha256:64f58105d23b58a733ee2c93bb2b01af2be37325459dce16ad640552b2a270ca
Head                         dd3d6c020eb842c1261ff4e30c4138a023dbbdf6

Total relation-backed seeds  26
Relation contexts            27
Relation Evidence refs       27
Identity Evidence refs       35
Place references             26
Seeds with official URLs     24
Approved State Snapshot refs 0
Jinja seeds                  26
Jiin seeds                   0
Tomurai seeds                0
```

Every seed has at least one approved direct identity Evidence reference, one identity Source reference, one approved Relation Evidence reference, and one Place reference.

Twenty-four of the 26 Jinja seeds currently carry an official URL. The two explicit official-URL gaps are:

```text
shr-karasuyama-yakumo-jinja  八雲神社（那須烏山）
shr-sawara-yasaka-jinja      八坂神社（佐原）
```

Both remain valid relation-backed candidates because their existing approved identity Evidence and Relation Evidence satisfy the seed contract. Public-authority or tourism pages are not silently promoted into shrine-operated official URLs. No official URL is inferred merely to raise the count.

Every approved State Snapshot array remains empty because no shrine-specific State has been approved for future-site handoff. Zero is intentional and must not be filled by inference.

### Current Jinja seeds

```text
shr-aso-jinja                         阿蘇神社
shr-samukawa-jinja                    寒川神社
shr-kishu-toshogu                     紀州東照宮
shr-miyazaki-jingu                    宮﨑神宮
shr-kushida-jinja                     櫛田神社
shr-sada-jinja                        佐太神社
shr-mikuni-jinja                      三國神社
shr-kasuga-wakamiya                   春日若宮
shr-hitachi-sosogu-jinja              常陸國總社宮
shr-shinjo-tenmangu                   新庄天満神社
shr-kitaguchi-suwa-jinja              諏訪神社（北口）
shr-sawara-suwa-jinja                 諏訪神社（佐原）
shr-iga-sugawara-jinja                菅原神社
shr-kawagoe-hikawa-jinja              川越氷川神社
shr-asakusa-jinja                     浅草神社
shr-nanao-oyama-jinja                 大地主神社
shr-dainichireiki-jinja               大日霊貴神社
shr-chichibu-jinja                    秩父神社
shr-nagahama-hachimangu               長濱八幡宮
shr-nagasaki-suwa-jinja               鎮西大社 諏訪神社
shr-karatsu-jinja                     唐津神社
shr-karasuyama-yakumo-jinja           八雲神社（那須烏山）
shr-sawara-yasaka-jinja               八坂神社（佐原）
shr-yamaguchi-yasaka-jinja            八坂神社（山口）
shr-yasaka-jinja                      八坂神社（京都）
shr-kitaguchi-hongu-fuji-sengen       北口本宮冨士浅間神社
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

The artifact remains `format_version: 1`. Provenance refreshes add approved records and references without changing the inventory structure.

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
