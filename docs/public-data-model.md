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

A bulk-ingestion candidate may contain incomplete parsed identity, geography, source pointers, and draft claim mappings. It remains outside the approved Public Projection until the reviewed Tier A minimum in `nationwide-corpus-scaling.md` is satisfied.

Once the Tier A minimum is satisfied, the record is intentionally public even when Tier B/C dimensions remain incomplete.

Do not conflate:

```text
private candidate
public Tier A Index
public Tier B Verified
public Tier C History / Monitoring
```

Private candidate count does not count as public coverage.

## Public coverage tier

For Matsuri nationwide scaling, the public primary record classes are:

```text
tier_a_index
tier_b_verified
tier_c_history_monitoring
```

### Tier A — Public Index

Tier A requires the reviewed Index minimum defined by the governing nationwide-scaling specification, including identity/type, geographic scope, approved authoritative source provenance, source verification/access date, and deterministic identity/duplicate checking.

Tier A may intentionally contain only the facts supported by that minimum. It does not require Current State, completed Occurrence, Change Event, Place, organizer, Relation, coordinates, or multi-year history.

New Tier A publication must record the actual publication timestamp needed to calculate the A→B target.

### Tier B — Public Verified

Tier B requires Tier A plus the applicable reviewed verification dimensions: substantive profile text, evidence-backed Current State, supportable Place/timing/organizer/Relation information, direct profile Evidence, reviewed authoritative external links, and a dated evidence-backed observation anchor.

Multi-year history is not required for Tier B.

### Tier C — Public History / Monitoring

Tier C adds longitudinal history or active monitoring beyond Tier B, such as multiple-year Occurrences, cancellation/postponement/partial-held/revival history, meaningful Change Events, governance/venue changes, scheduled-Occurrence freshness monitoring, or richer supported Relation history.

Tier C is continuously deepened and is not a publication prerequisite for Tier A/B.

## Tier A publication age

New Tier A records need public/derived publication metadata sufficient to report:

```text
tier_a_published_at
tier_b_target_at
tier_a_age_days
tier_a_target_status
```

The target is about seven calendar days from A publication to B verification.

An overdue Tier A record remains public and does not create a global stop for unrelated valid Tier A publication. A valid Tier A record is not automatically withdrawn because the target elapsed.

Legacy records without an authentic Tier A publication timestamp must report the timestamp/age as unavailable rather than derive a false age from unrelated Git or record timestamps.

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

A Tier A record may omit profile fields that are not yet supportable. Missing Tier B/C fields are not replaced with generated filler or inference.

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

Geographic Scope and Place are different: scope describes area coverage; Place identifies a concrete place.

Bulk ingestion must not manufacture point coordinates for route-based or distributed subjects.

Tier A geographic scope does not imply a verified Place or coordinate.

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

`unknown` is not a substitute for skipped research. It must be an approved evidence-bounded state result when published.

Tier A does not require a Current State Snapshot.

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

A Change Event is not required merely to publish Tier A or Tier B.

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

A cancelled Occurrence does not automatically change Entity State.

A past scheduled date does not imply `held`. Bulk import and automated freshness work must preserve this fail-close rule.

A completed Occurrence is not required for Tier A. A properly evidenced scheduled Occurrence may provide the dated observation anchor used for Tier B and then carries the normal freshness obligation.

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

Usual recurrence and actual Occurrence history remain separate.

## Relation

Relations are directed, evidence-backed, and may have validity periods.

Examples include held_at, performed_at, dedicated_at, historically_dedicated_at, hosted_by, organized_by, maintained_by, supported_by, member_of, successor_of, includes_performance, includes_tradition, includes_unit, participates_in, part_of_tradition, ritually_associated_with, and historically_associated_with.

Bulk ingestion may propose candidate Relations but may not publish unsupported generic associations merely to increase graph density.

A Relation is not required merely to publish Tier A.

## Source and Evidence

A Source identifies an information source. Evidence explains how that Source supports a specific assertion or target record.

Evidence targets may include state_snapshot, change_event, occurrence, relation, designation, recurrence_pattern, entity_identity, name_variant, location, and place.

The same Source may support multiple claims only through explicit Evidence mappings. Bulk import does not collapse Source and Evidence into one link field.

Tier A still requires reviewed authoritative source provenance for identity/geography. That minimum does not authorize unsupported observation claims from the same Source.

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

The Projection may denormalize identity, coverage tier, profile, Current State, Latest Occurrence, occurrence history, changes, relations, designations, public images, and Sources for efficient rendering.

Public HTML, JSON, JSON-LD, search index, sitemap, and discovery files should be generated from the same approved projection.

A public Tier A record belongs in these outputs by design. Private candidates, unresolved review material, and private promotion queues must not leak into them.

## Future-site boundary

The same A→B→C operating pattern is intended for 神社のゆくえ, 寺院のゆくえ, and 弔いのゆくえ, but their field requirements are site-specific.

Matsuri Shrine/Temple Relation seeds do not automatically become public Tier A records on another specialist site. Future-site activation and Tier A contracts remain separately gated.
