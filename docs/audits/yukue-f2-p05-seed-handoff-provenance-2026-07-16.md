# F2-P05 Future-site Seed Handoff Provenance Audit

**Date:** 2026-07-16  
**Status:** Passed  
**Scope:** Public-safe repository preparation only

## Purpose

F2-P05 makes the relation-backed seed artifact usable as a later research handoff without activating a future application. It carries the exact approved Matsuri provenance already available for each seed rather than forcing later work to rediscover record IDs.

## Additive seed fields

```text
primary_place_id
default_place_ids
place_ids
identity_evidence_ids
identity_source_ids
approved_state_snapshot_ids
relation_evidence_ids
```

The artifact remains `format_version: 1`; the fields are additive and the existing readiness audit remains compatible.

## Hosted extraction

```text
Workflow
Build Yukue future-site seed inventory

Run ID
29490466083

Conclusion
success

Artifact ID
8372200074

Artifact name
yukue-future-site-seeds-97b26e7aa1e981d299f8cbf3914960e8a12b9716

Artifact digest
sha256:427d3c63ae158246a3224e78bfcaaa63fa79268337bb32083550c8fc0c975389
```

## Verified totals

```text
Seeds                         5
Relation contexts             5
Relation Evidence references  5
Identity Evidence references  5
Place references              5
Jinja seeds                   5
Jiin seeds                    0
Tomurai seeds                 0
```

## Per-seed handoff

| Seed | Place | Identity Evidence | Identity Source | Relation Evidence | State Snapshot |
|---|---|---|---|---|---|
| 阿蘇神社 | `plc-aso-jinja` | `evd-aso-jinja-identity` | `src-aso-restoration` | `evd-rel-aso-onda-jinja` | none |
| 櫛田神社 | `plc-kushida-jinja` | `evd-kushida-jinja-identity` | `src-hakata-schedule-2026` | `evd-rel-hakata-kushida` | none |
| 佐太神社 | `plc-sada-jinja` | `evd-sada-jinja-identity` | `src-sada-jinja` | `evd-rel-sada-jinja` | none |
| 大日霊貴神社 | `plc-dainichireiki-jinja` | `evd-dainichireiki-jinja-identity` | `src-dainichido-kazuno` | `evd-rel-dainichido-jinja` | none |
| 秩父神社 | `plc-chichibu-jinja` | `evd-chichibu-jinja-identity` | `src-chichibu-yomatsuri` | `evd-rel-chichibu-shrine` | none |

## Compatibility verification

```text
Workflow
Audit Yukue future-site seed readiness

Run ID
29490466140

Conclusion
success
```

The readiness result remains unchanged in meaning:

- all five still lack an approved shrine State Snapshot,
- 大日霊貴神社 still lacks an attached shrine-official URL,
- no seed is claimed publication-ready,
- no implementation priority is assigned.

## Boundary confirmation

F2-P05 did not:

- add or change canonical public facts,
- invent a State Snapshot,
- infer an official URL,
- activate Jinja, Jiin, or Tomurai,
- create a route, Worker, domain, or deployment,
- change F2-25 through F2-28,
- expose a private queue, ranking, or confidence note.
