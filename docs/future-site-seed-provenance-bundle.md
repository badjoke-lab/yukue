# Yukue Future-site Seed Provenance Bundle

**Status:** candidate provenance bundle only / Jinja inactive / historical five-seed totals corrected 2026-08-17

## Purpose

The future-site seed inventory carries exact public record IDs for later specialist-site review. The provenance bundle adds a self-contained public-safe `provenance.json` containing the referenced approved records themselves.

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

## Historical F2-P06 verification

```text
Workflow         Build Yukue future-site seed inventory
Run ID           29491507863
Conclusion       success
Artifact ID      8372586148
Artifact name    yukue-future-site-seeds-19d6c208254373a3b68de148bfb8abc3af46998c
Artifact digest  sha256:68b75dad78b7eee5bc14fcec05d466c8e515aedcfaab58d3fa7f4de122d4ef3d
```

The F2-P06 five-seed bundle totals were:

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

Later 2026-07 provenance refreshes expanded that original five-seed bundle to 10 Sources and 14 Evidence records. Those values are historical snapshots of the original five-seed corpus and are **not** the current full Jinja seed aggregate.

## Current aggregate boundary

Matsuri corpus expansion subsequently increased the machine-enforced blocked Jinja baseline to:

```text
Observed on                       2026-08-11
Relation-backed Jinja seeds       26
Direct identity Evidence          30
Place references                  26
Approved shrine State Snapshots    0
Seeds with official URLs          19
```

These aggregate values are enforced by `config/jinja-start-gate.json` and recalculated from the canonical Matsuri dataset by `scripts/check-jinja-start-gate-record.mjs`.

The provenance bundle itself is generated. Its exact current Source, Evidence, Relation, and context-Entity totals must therefore be obtained from a fresh `pnpm audit:yukue:future-site-seeds` artifact rather than copied forward from the five-seed F2-P06 snapshot.

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

`matsuri_context_entities` contains only the identity needed to interpret Relation context.

## Reference closure

For each seed the bundle includes the supported records needed to interpret its handoff, including Places, identity Evidence and Sources, approved State Snapshots when present, Relation Evidence and Sources, and minimal Matsuri counterpart identity.

The builder fails on missing records, unapproved Evidence, wrong Evidence targets, missing Evidence Sources, invalid Relation endpoints, drifted handoff IDs, or missing target-site-review boundaries.

## Boundaries

The bundle declares or enforces the equivalent of:

```text
publication_ready_claimed          false
future_site_activated              false
candidate_priority_assigned        false
missing_data_inferred              false
private_notes_included             false
uses_only_approved_public_records  true
```

The bundle must not contain a private candidate queue, ranking/confidence notes, credentials, inferred State or official URL values, or a decision to start Jinja, Jiin, or Tomurai.

## Compatibility

`inventory.json` and `provenance.json` remain generated public-safe handoff artifacts. Seed preparation does not authorize `apps/jinja`, a Jinja Worker, hostname activation, or publication.

## Hosted workflow

```text
Build Yukue future-site seed inventory
```

The workflow generates and uploads the inventory, provenance bundle, and summary. It requires no Cloudflare access and deploys nothing.
