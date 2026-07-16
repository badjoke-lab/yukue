# Yukue Future-site Seed Readiness Audit

**Status:** F2-P03 completed / public readiness audit only

## Purpose

F2-P02 identifies only future-site Entities already connected to approved Matsuri specialist records. F2-P03 measures how much public canonical context can be carried forward and what still requires target-site research.

This is an audit of existing approved public data. It is not a publication gate, candidate ranking, implementation priority, or future-site activation.

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

## Verified result

```text
Workflow
Audit Yukue future-site seed readiness

Run ID
29479348339

Conclusion
success

Artifact ID
8367936520

Artifact name
yukue-future-site-seed-readiness-f6f3de96966fc194c97b965cfec9d6679f369ba3

Artifact digest
sha256:ddc5dcdc01978671f68de1f827b6a84fd2eebdf2939813797da920f00c7df975
```

Audit totals:

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

Detected gaps:

```text
missing-approved-state-snapshot     5
missing-direct-identity-evidence     5
missing-official-url                 1
```

Seed findings:

```text
阿蘇神社        State Snapshotなし / 直接Identity Evidenceなし
櫛田神社        State Snapshotなし / 直接Identity Evidenceなし
佐太神社        State Snapshotなし / 直接Identity Evidenceなし
大日霊貴神社    State Snapshotなし / 公式URLなし / 直接Identity Evidenceなし
秩父神社        State Snapshotなし / 直接Identity Evidenceなし
```

All five retain valid summary, geographic scope, Place, Source, and approved Relation context. The result therefore establishes usable Matsuri-derived context while clearly showing that none is ready to become a Jinja record without target-site research.

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

It does not mean the record is ready for publication on Jinja, Jiin, or Tomurai. Official URL and direct identity Evidence are retained as explicit target-site research signals, and every seed remains subject to a new-site review.

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
- turn a Matsuri relationship into a complete shrine, temple, cemetery, columbarium, or burial-facility profile.

## GitHub Actions

```text
Audit Yukue future-site seed readiness
```

The workflow rebuilds the F2-P02 inventory, runs the readiness audit, and uploads public-safe JSON and Markdown artifacts. It requires no Cloudflare access and deploys nothing.
