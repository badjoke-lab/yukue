# Yukue Future-site Seed Readiness Audit

**Status:** F2-P03 completed / F2-P04 identity Evidence completed / F2-P09 official provenance completed / public readiness audit only

## Purpose

F2-P02 identifies future-site Entities already connected to approved Matsuri specialist records. F2-P03 measures how much approved public context can be carried forward and what still requires target-site research. F2-P04 adds direct Entity-identity Evidence for the five shrine seeds. F2-P09 adds shrine-operated official provenance for 大日霊貴神社 without reclassifying its municipal Source.

This is an audit of approved public data. It is not a publication gate, candidate ranking, implementation priority, or future-site activation.

## Commands

```text
pnpm audit:yukue:future-site-seeds
pnpm audit:yukue:future-site-seed-readiness
```

The readiness command consumes:

```text
.artifacts/yukue-future-site-seeds/inventory.json
```

and writes:

```text
.artifacts/yukue-future-site-seed-readiness/
  readiness.json
  summary.md
```

## F2-P03 baseline

```text
Workflow         Audit Yukue future-site seed readiness
Run ID           29479348339
Conclusion       success
Artifact ID      8367936520
Artifact digest  sha256:ddc5dcdc01978671f68de1f827b6a84fd2eebdf2939813797da920f00c7df975
```

```text
Total seeds                         5
Cross-site context complete         0
Cross-site context incomplete       5
With official URL                   4
Without official URL                1
With approved State Snapshot        0
With direct identity Evidence       0
Without direct identity Evidence    5
```

## F2-P04 verified result

F2-P04 added five approved `entity_identity` Evidence records in `data/public/matsuri/f2/maintenance-06.json`. Every record reuses an approved Matsuri Source and targets the exact shrine Entity.

```text
Workflow         Audit Yukue future-site seed readiness
Run ID           29489701435
Conclusion       success
Artifact ID      8371871954
Artifact name    yukue-future-site-seed-readiness-0a325403b479030229617fb2e295bf10455eb299
Artifact digest  sha256:478c27bd7049c17ac2f7d3623f839b28125c391f356a4bb6d6c87cf431f35445
```

## F2-P09 current result

F2-P09 records `https://dainichido.org/` as a shrine-operated official URL, adds the official name variant `大日靈貴神社`, and adds a second approved identity Evidence record for the same stable Entity. The existing 鹿角市 page remains separately classified as `public_authority`.

Current totals:

```text
Total seeds                         5
Cross-site context complete         0
Cross-site context incomplete       5
With official URL                   5
Without official URL                0
With approved State Snapshot        0
With direct identity Evidence       5
Without direct identity Evidence    0
Direct identity Evidence records    6
```

Current detected gaps:

```text
missing-approved-state-snapshot     5
missing-direct-identity-evidence     0
missing-official-url                 0
```

Current seed findings:

```text
阿蘇神社        State Snapshotなし
櫛田神社        State Snapshotなし
佐太神社        State Snapshotなし
大日霊貴神社    State Snapshotなし
秩父神社        State Snapshotなし
```

All five retain valid summary, geographic scope, Place, Source, approved Relation context, direct Entity-identity Evidence, and at least one official URL. None is claimed ready to become a Jinja record because the shrine-specific State model and review have not been activated.

## Identity Evidence targets

```text
shr-aso-jinja
shr-chichibu-jinja
shr-kushida-jinja
shr-dainichireiki-jinja
shr-sada-jinja
```

Current Source mapping:

```text
阿蘇神社        src-aso-restoration
秩父神社        src-chichibu-yomatsuri
櫛田神社        src-hakata-schedule-2026
佐太神社        src-sada-jinja
大日霊貴神社    src-dainichido-kazuno
大日霊貴神社    src-dainichireiki-jinja-official
```

The second 大日霊貴神社 record is intentional: one municipal Source and one shrine-operated Source support the same Entity identity from distinct authority classes.

## Checks

Each seed is checked for:

- public Japanese summary,
- geographic scope,
- valid primary or default Place references,
- at least one approved State Snapshot,
- public Source coverage,
- approved Relation and Relation Evidence context,
- official public URL,
- approved Evidence directly targeting Entity identity.

## Result classes

```text
context-complete
context-incomplete
```

`context-complete` means the existing Matsuri records provide summary, geography, Place, State, Source, and Relation context without broken references.

It does not mean the record is ready for publication on Jinja, Jiin, or Tomurai. Every seed remains subject to target-site identity, State, Evidence, Source, and maintenance review.

## Gap severities

```text
blocking-context
```

A required existing cross-site context layer is absent or invalid.

```text
target-site-research
```

The Matsuri context remains structurally usable, but the future specialist site must gather or strengthen target-specific public Evidence.

## Boundaries

The audit does not:

- claim publication readiness,
- activate a future application,
- assign priority,
- infer missing facts,
- include private notes,
- invent a shrine State vocabulary before the Jinja specification exists,
- turn a Matsuri relationship into a complete shrine, temple, cemetery, columbarium, or burial-facility profile.

## GitHub Actions

```text
Audit Yukue future-site seed readiness
```

The workflow rebuilds the seed inventory, runs the readiness audit, and uploads public-safe JSON and Markdown artifacts. It requires no Cloudflare access and deploys nothing.
