# F2-P09 Dainichireiki Official Provenance Audit

**Date:** 2026-07-18  
**Status:** Implementation complete / hosted verification pending  
**Scope:** Public-safe Matsuri and future-site seed maintenance only

## Purpose

The current relation-backed Jinja seed inventory contained a public-authority page for `大日霊貴神社`, but no shrine-operated official URL. This maintenance verifies and records the shrine's own website without reclassifying the existing 鹿角市 source.

## Source review

The website at `https://dainichido.org/` identifies itself as the official site of 大日靈貴神社（大日堂） and publishes the shrine's history, enshrined deities, buildings, annual observances, address, and contact information.

The identity page is recorded as:

```text
Source ID   src-dainichireiki-jinja-official
URL         https://dainichido.org/about.html
Publisher   大日靈貴神社（大日堂）
```

The existing 鹿角市 cultural-property page remains a separate `public_authority` link and Source.

## Data changes

```text
data/public/matsuri/f2/maintenance-08.json
data/public/matsuri/f2/corrections-05.json
```

The maintenance bundle adds:

- one shrine-official Source,
- one approved `entity_identity` Evidence record.

The correction bundle updates `shr-dainichireiki-jinja` from `record_version: 1` to `record_version: 2` and adds:

- `https://dainichido.org/` as the primary `official` website,
- `大日靈貴神社` as a source-backed official name variant,
- the new Source reference for the common name `大日堂`.

## Correction-path change

Entity corrections are now applied by both canonical dataset consumers:

```text
apps/matsuri/scripts/load-matsuri-dataset.mjs
apps/matsuri/src/data/matsuri-projection.ts
```

A correction must replace an existing Entity ID and increase `record_version`. This preserves the accepted batch history instead of editing the original F1 record in place.

## Expected seed impact

```text
Relation-backed Jinja seeds          5
Direct identity Evidence             6
Place references                     5
Approved shrine State Snapshots      0
Seeds with official URLs             5
Missing official URL gaps            0
```

The extra Evidence count reflects two approved identity Evidence records for 大日霊貴神社: the existing municipal Source and the newly recorded shrine-official Source.

## Boundaries

F2-P09 does not:

- define or infer a shrine State,
- pass the Jinja start gate,
- create `apps/jinja`, a Worker, hostname, or public route,
- change F2-25 through F2-28,
- expose private research or account information.

All five shrine seeds still require a future Jinja-specific State specification and publication review.

## Hosted verification

Pending GitHub Actions verification for the implementation branch.
