# Matsuri 櫛田神社 Identity Evidence Maintenance — 2026-07-20

**Status:** Passed maintenance audit

## Scope

This bounded maintenance change strengthens the existing Matsuri cross-site seed provenance for `shr-kushida-jinja`.

Included:

- one `official_organization` Source for the dedicated 櫛田神社 page on the 博多祇園山笠振興会 site,
- one approved `entity_identity` Evidence record targeting `shr-kushida-jinja`,
- `maintenance-09.json` registration in both canonical dataset consumers,
- refreshed candidate inventory, provenance bundle, Jinja blocked-gate baseline, and public documentation.

Intentionally excluded:

- no Entity correction,
- no external-link replacement,
- no Relation, Occurrence, or State change,
- no inferred shrine State Snapshot,
- no Jinja application, Worker, hostname, publication, priority, or start authorization,
- no Cloudflare or Analytics action.

## Source and Evidence result

```text
Source ID    src-kushida-jinja-official-page
Evidence ID  evd-kushida-jinja-official-identity
Target       entity_identity / shr-kushida-jinja
Review       approved
```

The existing `src-hakata-schedule-2026` and `evd-kushida-jinja-identity` records remain in place. The new record adds a dedicated shrine-page identity basis rather than replacing the yearly festival schedule basis.

## Generated seed result

Artifact inspection confirmed:

```text
Relation-backed seeds           5
Jinja seeds                     5
Jiin seeds                      0
Tomurai seeds                   0
Relation contexts               5
Relation Evidence references    5
Direct identity Evidence        7
Place references                5
Portable Sources                8
Portable Evidence              12
Approved State Snapshots        0
```

櫛田神社 now carries these direct identity handoff references:

```text
evd-kushida-jinja-identity
  → src-hakata-schedule-2026

evd-kushida-jinja-official-identity
  → src-kushida-jinja-official-page
```

## Hosted verification

Implementation head:

```text
7ae79a7f6fee8cd5429893e91c8a4645d957ac43
```

```text
CI                                      29717762633 — success
Matsuri bundle inventory                29717762622 — success
Matsuri canonical dataset contract      29717762644 — success
Matsuri correction contract             29717762634 — success
Future-site seed inventory              29717762605 — success
Future-site seed readiness              29717762702 — success
Jinja start-gate record                 29717762619 — success
Full-page screenshots                   29717762671 — success
```

Artifacts:

```text
Seed artifact ID       8451197243
Seed artifact digest   sha256:2961b317de4eac40801ac72c5d72143af9cc55d1cb0d9a5e755842b676775261
Release artifact ID    8451219712
Release artifact digest sha256:c7f995fe472ebaa66e6f12dfadf16b1bc6b4c39e77c323281318458b55b34356
Screenshot artifact ID 8451210341
Screenshot digest      sha256:3ef74fb1ae5c194d8cca5815dc309015342e517efabafe6fde607b8a8ddfeb8d
```

## Gate interpretation

The first PR attempt correctly failed the Jinja start-gate validator because the machine-recorded seed baseline still declared six direct identity Evidence records. The record was refreshed to the observed value of seven while preserving:

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

The successful rerun proves that stronger seed provenance did not activate Jinja or weaken the blocked boundary.
