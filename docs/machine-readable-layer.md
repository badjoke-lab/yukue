# Machine-readable Public Layer

**Status:** Current direction / crawler discovery baseline included

## Purpose

The machine-readable layer exposes the same approved public projection used by the website in formats that are easy for software, search systems, and AI agents to discover and consume.

It is not a private research feed and must not expose candidate records or internal review material.

## Baseline public files

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
- public HTML and public JSON generated from the same approved projection,
- crawler policy and sitemap discovery generated from the configured deployment origin.

## version.json

Identifies the project, site, dataset type, and version markers required by consumers.

## manifest.json

Describes primary and supporting record types, record counts, schema and dataset versions, data-safety notes, public file inventory, and the active site origin when configured.

## Discovery text files

`llms.txt` and `ai.txt` explain the nature and limits of the dataset, including that it is not a popularity ranking and that current-state claims are evidence-based observations subject to verification date.

## robots.txt

The build generates two deliberate modes.

### Canonical production mode

```text
User-agent: *
Allow: /

Sitemap: https://<canonical-origin>/sitemap.xml
```

The public site is crawlable and the exact canonical sitemap is advertised.

### Origin-neutral mode

```text
User-agent: *
Disallow: /
```

Repository-only and origin-neutral artifacts do not advertise a production sitemap and discourage accidental crawling if deployed outside the approved canonical origin.

## Canonical HTML metadata

When Astro receives an approved `site` origin, every public page emits:

- one absolute canonical link using the route pathname,
- an indexable robots meta value.

Without an approved site origin, public pages emit `noindex,nofollow` and no canonical link.

## Build rule

Machine-readable outputs and crawler metadata are generated during build and validated in CI.

```text
Approved canonical data
→ validation
→ Public Projection
→ machine-readable generation
→ canonical and crawler consistency checks
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
