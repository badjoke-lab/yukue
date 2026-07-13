# Machine-readable Public Layer

**Status:** Current direction

## Purpose

The machine-readable layer exposes the same approved public projection used by the website in formats that are easy for software, search systems, and AI agents to discover and consume.

It is not a private research feed and must not expose candidate records or internal review material.

## Baseline public files

Initial target outputs:

```text
/version.json
/data/manifest.json
/data/entities.json
/data/events.json
/data/relations.json
/data/occurrences.json
/llms.txt
/ai.txt
/robots.txt
/sitemap.xml
```

Additional feeds such as `/data/changes.json`, partitions, pagination, bulk export, Worker API routes, or change feeds may be added later when justified.

## Invariants

- canonical public records only,
- no candidate queue,
- no internal confidence,
- no review notes,
- no unresolved private source conflicts,
- stable IDs,
- explicit schema and dataset version information,
- public HTML and public JSON generated from the same approved projection.

## version.json

Should identify the project, site, registry or dataset type, and version markers required by consumers.

## manifest.json

Should describe:

- primary record type,
- supporting record types,
- record counts,
- schema or data version,
- data-safety notes,
- public file inventory.

## Discovery text files

`llms.txt` and `ai.txt` should explain the nature and limits of the dataset, including that it is not a popularity ranking and that current-state claims are evidence-based observations subject to verification date.

`robots.txt` publishes the crawler-facing policy for the approved public surface. Canonical production output includes an absolute Sitemap directive. The origin-neutral repository artifact omits that absolute directive. `robots.txt` is not an access-control boundary.

## Build rule

Machine-readable outputs should be generated during build and validated in CI.

The intended flow is:

```text
Approved canonical data
→ validation
→ Public Projection
→ machine-readable generation
→ consistency checks
```

## Future query layer

Possible future query functions include:

```text
get_entity_state
get_entity_history
get_occurrence_history
find_entities_by_state
find_changes_since
trace_relations
get_evidence_bundle
```

These are future possibilities, not MVP requirements.
