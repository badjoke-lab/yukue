# Schema and Record Versioning Policy

**Status:** Current direction

## Goals

Versioning should let public consumers understand structural changes without tying stable entity identity to URLs or file layout.

## Stable identifiers

Entity and record IDs are stable identifiers.

A slug or URL may change without changing the stable ID when the underlying subject is the same.

The exact ID algorithm remains an implementation decision; ULID and UUIDv7 are current candidates.

## schema_version

`schema_version` identifies the structural contract used by a record.

Examples:

```text
common.v1
common.v1.1
matsuri.v1
matsuri.v1.1
```

The exact naming format may be refined during schema implementation, but the public contract must support explicit schema versioning.

## record_version

`record_version` tracks revisions of the same logical record.

Use it for updates to content or evidence that do not create a new subject identity.

## Breaking changes

Examples:

- removing a required public field,
- changing field meaning,
- changing value vocabulary incompatibly,
- changing relationship direction semantics,
- splitting one record type into incompatible types.

Breaking changes require explicit schema-version change and migration planning.

## Non-breaking changes

Examples:

- adding optional fields,
- adding optional record types,
- adding new public projection fields without changing existing meaning,
- adding new vocabulary values when consumers can safely treat unknown values generically.

## Supersession

When one record is replaced, merged, or withdrawn, use lifecycle metadata rather than reassigning its ID to another subject.

Representative lifecycle values:

```text
active
superseded
withdrawn
merged_record
```

## Machine-readable compatibility

`version.json` and dataset manifests should expose enough version information for consumers to detect dataset and schema changes.

## Migration rule

A schema PR that introduces breaking changes should include:

- migration description,
- affected record types,
- data transformation steps,
- validation changes,
- Public Projection impact,
- compatibility notes for machine-readable consumers.
