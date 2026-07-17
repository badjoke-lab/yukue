# F2-P09 Dainichireiki Official Provenance Audit

**Date:** 2026-07-17  
**Status:** Passed  
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

## Verified seed impact

```text
Relation-backed Jinja seeds          5
Direct identity Evidence             6
Place references                     5
Approved shrine State Snapshots      0
Seeds with official URLs             5
Missing official URL gaps            0
```

The extra Evidence count reflects two approved identity Evidence records for 大日霊貴神社: the existing municipal Source and the newly recorded shrine-official Source.

The generated provenance bundle contains:

```text
Seed handoffs              5
Seed Entities              5
Matsuri context Entities   5
Places                     5
Sources                    7
Evidence                  11
Relations                  5
State Snapshots            0
```

The readiness artifact reports only `missing-approved-state-snapshot` for the five shrine seeds. No missing official URL or direct identity Evidence gap remains.

## UTC date boundary

Repository public-data audit dates use UTC. The Source access date, Evidence capture date, Entity update time, external-link check date, and Jinja seed observation date are therefore recorded as `2026-07-17` even though the work occurred after midnight on 2026-07-18 in Japan.

The first hosted CI attempt correctly rejected `2026-07-18` as future-dated relative to the UTC runner date. The records were corrected without weakening the freshness gate.

## Hosted verification

Verified implementation head:

```text
e52facb95e03913bcdb06530c1eb0c84be9ecd5a
```

```text
CI                                      29597353737 — success
Canonical origin gate                   29597353963 — success
Canonical Search                        29597353696 — success
Crawler reachability                    29597353615 — success
F2-24 indexability preflight            29597353678 — success
Full-page screenshots                   29597353976 — success
Bundle inventory                        29597353736 — success
Future-site seed inventory              29597353511 — success
Future-site seed readiness              29597353721 — success
Jinja start-gate                        29597353933 — success
```

Artifacts:

```text
Release candidate      8413628846
Digest                 sha256:4e542a2847cd0731923485eaeb1a156884e788158149c4e98dbf0820f01d43f5

Screenshot review      8413617484
Digest                 sha256:99133171dfed8a8d32b7d5252497af3f25d67bd653cb6fee47288c702a4d944e

Seed inventory         8413577657
Digest                 sha256:90e2a6bf73a9031ea335426810cd8db4601d6aa6ab7a1d447dfc89a6a3eba70b

Seed readiness         8413566975
Digest                 sha256:e61e5d62ea7830a0c603620d406c6156bfb4a4c5e1fb0bd15e6d4aea6d55238d
```

## Boundaries

F2-P09 does not:

- define or infer a shrine State,
- pass the Jinja start gate,
- create `apps/jinja`, a Worker, hostname, or public route,
- change F2-25 through F2-28,
- expose private research or account information.

All five shrine seeds still require a future Jinja-specific State specification and publication review.
