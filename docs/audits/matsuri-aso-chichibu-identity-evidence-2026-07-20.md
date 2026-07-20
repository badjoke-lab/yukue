# Matsuri 阿蘇神社・秩父神社 Identity Evidence Maintenance — 2026-07-20

**Status:** Passed maintenance audit

## Scope

This bounded maintenance change strengthens the existing Matsuri cross-site seed provenance for `shr-aso-jinja` and `shr-chichibu-jinja`.

Included:

- one `shrine_official` Source for the dedicated `阿蘇神社について` page,
- one approved `entity_identity` Evidence record targeting `shr-aso-jinja`,
- one `shrine_official` Source for the dedicated `ご祭神・由緒` page,
- one approved `entity_identity` Evidence record targeting `shr-chichibu-jinja`,
- `maintenance-10.json` registration in both canonical dataset consumers,
- refreshed candidate inventory, provenance bundle, and blocked Jinja seed baseline.

Intentionally excluded:

- no additional 佐太神社 record because its current official homepage already directly identifies the shrine,祭神,所在地, and 佐陀神能,
- no Entity correction,
- no external-link replacement,
- no Relation, Occurrence, or State change,
- no inferred shrine State Snapshot,
- no Jinja application, Worker, hostname, publication, priority, or start authorization,
- no Cloudflare or Analytics action.

## Source and Evidence result

```text
Source ID    src-aso-jinja-about
Evidence ID  evd-aso-jinja-about-identity
Target       entity_identity / shr-aso-jinja
Review       approved

Source ID    src-chichibu-jinja-saijin
Evidence ID  evd-chichibu-jinja-saijin-identity
Target       entity_identity / shr-chichibu-jinja
Review       approved
```

The existing `src-aso-restoration` and `evd-aso-jinja-identity` records remain in place. The new 阿蘇神社 record adds a dedicated shrine overview rather than replacing the restoration-history basis.

The existing `src-chichibu-yomatsuri` and `evd-chichibu-jinja-identity` records remain in place. The new 秩父神社 record adds a dedicated祭神・由緒 basis rather than replacing the night-festival basis.

## Generated seed result

Artifact inspection confirmed:

```text
Relation-backed seeds           5
Jinja seeds                     5
Jiin seeds                      0
Tomurai seeds                   0
Relation contexts               5
Relation Evidence references    5
Direct identity Evidence        9
Place references                5
Portable Sources               10
Portable Evidence              14
Approved State Snapshots        0
```

阿蘇神社 now carries:

```text
evd-aso-jinja-identity
  → src-aso-restoration

evd-aso-jinja-about-identity
  → src-aso-jinja-about
```

秩父神社 now carries:

```text
evd-chichibu-jinja-identity
  → src-chichibu-yomatsuri

evd-chichibu-jinja-saijin-identity
  → src-chichibu-jinja-saijin
```

佐太神社 remains:

```text
evd-sada-jinja-identity
  → src-sada-jinja
```

## Initial hosted verification

Implementation head:

```text
bc54c06e9fb89223e6b0b8557a70c41dec8cd2bd
```

```text
Matsuri bundle inventory                29731393730 — success
Matsuri canonical dataset contract      29731393741 — success
Matsuri correction contract             29731393733 — success
Future-site seed inventory              29731393719 — success
Future-site seed readiness              29731393667 — success
Jinja start-gate record                 29731393755 — success
```

Artifact:

```text
Seed artifact ID       8456415716
Seed artifact digest   sha256:83ddd1b4acde08ad739f136c77ec933b61e080c13a513872b916dae497cc0b0d
```

## Gate interpretation

The blocked Jinja machine baseline was refreshed from seven to nine direct identity Evidence records while preserving:

```text
matsuri_f2_28_complete                 false
matsuri_stabilization_review_complete false
portal_jinja_order_decided             false
jinja_state_spec_approved              false
explicit_start_authorization           false
jinja_start_gate_passed                false
jinja_application_creation_authorized false
jinja_worker_creation_authorized      false
jinja_publication_authorized           false
```

Stronger seed provenance does not activate Jinja or satisfy any start prerequisite.
