# Public Data Model

**Status:** Working model for implementation

## Overview

```text
Entity
Place
Image Asset

State Snapshot
Change Event
Occurrence
Occurrence Series
Recurrence Pattern
Relation
Designation

Source
Evidence
```

The public website consumes a denormalized Public Projection generated from approved records.

## Candidate versus public record

Candidate discovery records are not part of the Public Data Model.

A bulk-ingestion candidate may contain only identity, geography, and source pointers, but it remains outside the approved Public Projection until it satisfies the substantive public-record contract in `nationwide-corpus-scaling.md`.

Do not add a public `directory_only`, `index_only`, or equivalent record type to bypass the product model.

For primary Matsuri records, the public minimum requires a substantive Basic Profile plus evidence-bounded Observation. New public records must not be reduced to name/location/link shells merely because they came from a bulk source.

## Derived public quality / depth

Quality/depth classification is derived from approved record coverage; it is not a weaker publication tier.

Planned derived classes:

```text
public_core
history_enriched
monitored
```

`public_core` means the substantive public minimum is already satisfied.

The machine classifier must be implemented before bulk public publication and must not require weakening existing schemas or evidence semantics.

## Entity

Shared public fields include:

```text
id
entity_type
home_surface
tradition_scope
names[]
summary_ja
description_ja
geographic_scope
primary_place_id
default_place_ids[]
external_links[]
record_lifecycle
created_at
updated_at
```

Initial entity types include festival, folk_performance, tradition_unit, organization, shrine, temple, cemetery, columbarium, and burial_facility.

Name kinds may include canonical, official, common, former, alternate, reading, romanized, english, local, and historical.

Tradition scope values:

```text
standalone
umbrella
component
collective
unknown
```

## Place

Place records support address, map display, and filters.

Representative fields:

```text
id
name_ja
place_kind
country_code
prefecture_code
prefecture_name_ja
municipality_code
municipality_name_ja
locality_ja
street_address_ja
postal_code
latitude
longitude
coordinate_precision
map_label_ja
```

Geographic scope and Place are different: scope describes area coverage; Place identifies a concrete place.

Bulk ingestion must not manufacture point coordinates for route-based or distributed subjects.

## State Snapshot

Representative fields:

```text
id
entity_id
state_schema
state_code
effective_period
observed_at
basis_evidence_ids[]
review_status
```

Current State is derived from the latest applicable approved snapshot.

`unknown` is not a substitute for skipped research. It must be an approved evidence-bounded state result.

## Change Event

Representative fields:

```text
id
event_type
subject_entity_ids[]
decided_at
announced_at
effective_period
summary_ja
resulting_state_snapshot_ids[]
related_relation_ids[]
evidence_ids[]
review_status
```

Decision, announcement, and effective timing may differ and should not be collapsed when the evidence supports the distinction.

## Occurrence

Occurrence represents what actually happened in a specific edition, date, or performance context.

```text
id
subject_entity_id
series_id
occurrence_type
temporal_extent
outcome
scale
venue_place_ids[]
organizer_entity_ids[]
evidence_ids[]
review_status
```

Outcome values:

```text
scheduled
held
partially_held
postponed
rescheduled
cancelled
not_held
unknown
```

Scale values:

```text
normal
reduced
expanded
modified
unknown
```

A cancelled occurrence does not automatically change Entity State.

A past scheduled date does not imply `held`. Bulk import and automated freshness work must preserve this fail-close rule.

## Occurrence Series

Optional. Used only when one Entity has meaningfully distinct recurring performance or ritual contexts.

## Recurrence Pattern

```text
annual
biennial
triennial
quadrennial
monthly
seasonal
irregular
custom
unknown
```

Usual recurrence and actual occurrence history remain separate.

## Relation

Relations are directed, evidence-backed, and may have validity periods.

Examples include held_at, performed_at, dedicated_at, historically_dedicated_at, hosted_by, organized_by, maintained_by, supported_by, member_of, successor_of, includes_performance, includes_tradition, includes_unit, participates_in, part_of_tradition, ritually_associated_with, and historically_associated_with.

Bulk ingestion may propose candidate Relations but may not publish unsupported generic associations merely to increase graph density.

## Source and Evidence

A Source identifies an information source. Evidence explains how that Source supports a specific assertion or target record.

Evidence targets may include state_snapshot, change_event, occurrence, relation, designation, recurrence_pattern, entity_identity, name_variant, location, and place.

The same Source may support multiple claims only through explicit Evidence mappings. Bulk import does not collapse Source and Evidence into one link field.

## Image Asset

Images are optional and independent from Entity text fields.

Representative fields:

```text
id
entity_id
asset_path
public_url
title_ja
caption_ja
alt_text_ja
image_kind
is_primary
display_order
photographer_name
credit_text
credit_url
provider_name
provider_url
source_page_url
license_type
license_name
license_url
commercial_use_allowed
modification_allowed
attribution_required
acquired_via
rights_review_status
review_status
```

See `image-policy.md`.

## Public Projection

The Projection may denormalize identity, profile, Current State, Latest Occurrence, occurrence history, changes, relations, designations, public images, and Sources for efficient rendering.

Public HTML, JSON, JSON-LD, search index, sitemap, and discovery files should be generated from the same approved projection.

Candidate-only records and private promotion queues must not leak into these outputs.
