# Yukue Future-site Seed Provenance Bundle

**Status:** F2-P06 completed / candidate provenance bundle only

## Purpose

The F2-P05 inventory carries exact record IDs for later review. F2-P06 adds a self-contained public-safe `provenance.json` file containing the referenced records themselves.

This reduces later rework while preserving the candidate-only boundary. It does not make a seed publication-ready and does not activate another application.

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

## Hosted verification

```text
Workflow
Build Yukue future-site seed inventory

Run ID
29491507863

Conclusion
success

Artifact ID
8372586148

Artifact name
yukue-future-site-seeds-19d6c208254373a3b68de148bfb8abc3af46998c

Artifact digest
sha256:68b75dad78b7eee5bc14fcec05d466c8e515aedcfaab58d3fa7f4de122d4ef3d
```

Readiness compatibility:

```text
Workflow
Audit Yukue future-site seed readiness

Run ID
29491507883

Conclusion
success
```

## Verified bundle totals

```text
Seed handoffs              5
Seed Entities              5
Matsuri context Entities   5
Places                     5
Sources                    6
Evidence                  10
Relations                  5
State Snapshots            0
```

An independent artifact inspection confirmed that every handoff reference resolves to an included record. The zero State Snapshot count is preserved rather than inferred away.

## Bundle contents

```text
seed_handoffs
records.seed_entities
records.matsuri_context_entities
records.places
records.sources
records.evidence
records.relations
records.state_snapshots
```

`seed_entities` is a public handoff projection rather than an unrestricted internal record dump. It contains public identity, summary, geography, Place references, external links, lifecycle, and version metadata.

`matsuri_context_entities` contains only the ID, type, and preferred Japanese name required to interpret Relation context.

## Reference closure

For each seed the bundle includes:

- the seed Entity projection,
- every Place referenced by the handoff,
- Sources referenced by the seed Entity names,
- Sources referenced by included Places,
- direct Entity-identity Evidence and its Source,
- approved State Snapshots and their basis Evidence when present,
- approved Relations to Matsuri specialist Entities,
- Relation Evidence and its Source,
- minimal Matsuri counterpart identities.

The builder fails on missing records, unapproved Evidence, wrong Evidence targets, missing Evidence Sources, invalid Relation endpoints, drifted handoff IDs, or missing target-site-review boundaries.

## Boundaries

The bundle declares:

```text
publication_ready_claimed          false
future_site_activated              false
candidate_priority_assigned        false
missing_data_inferred              false
private_notes_included             false
uses_only_approved_public_records  true
```

The bundle must not contain:

- a private candidate queue,
- ranking or confidence notes,
- unresolved private source conflicts,
- credentials or operational account data,
- inferred State or official URL values,
- a decision to start Jinja, Jiin, or Tomurai.

## Compatibility

The existing `inventory.json` remains `format_version: 1`. `provenance.json` has its own `format_version: 1` and is additive. The readiness audit continues to consume `inventory.json` and passed unchanged.

## Hosted workflow

```text
Build Yukue future-site seed inventory
```

The workflow generates and uploads all three files. It requires no Cloudflare access and deploys nothing.
