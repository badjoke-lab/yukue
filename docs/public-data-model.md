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

## Source and Evidence

A Source identifies an information source. Evidence explains how that Source supports a specific assertion or target record.

Evidence targets may include state_snapshot, change_event, occurrence, relation, designation, recurrence_pattern, entity_identity, name_variant, location, and place.

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
