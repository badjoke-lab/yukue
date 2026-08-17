# 祭のゆくえ — MVP Specification

**Status:** Working specification

## Initial entity scope

```text
festival
folk_performance
tradition_unit
organization
shrine seed
temple seed
```

Primary public detail pages:

```text
festival
folk_performance
organization
```

Shrine and Temple records may initially be minimal cross-site seeds inside Matsuri. Their own State models belong to future home surfaces.

These State-free seeds are **not** automatically Tier A records for 神社のゆくえ or 寺院のゆくえ. Future specialist sites must satisfy their own Tier A identity/source minimum before public specialist-site publication.

## Matsuri public A/B/C model

Nationwide post-launch expansion is governed by:

```text
docs/nationwide-corpus-scaling.md
```

### Tier A — Public Index

Tier A is public. A reviewed Festival or Folk Performance may publish at Tier A with the source-backed Index minimum:

- canonical identity and subject type;
- prefecture + municipality where municipality-bounded, or an appropriate wider region scope;
- approved authoritative source;
- source verification/access date;
- deterministic identity / duplicate check;
- machine-visible Tier A class and real publication timestamp for newly published A records.

A reviewed name + geography + authoritative source is a valid public Tier A record.

Completed Occurrence, Change Event, Current State, multi-year history, organizer, Place, Relation, and coordinates are not Tier A prerequisites. Unsupported dimensions remain absent rather than inferred.

### Tier A → B target

New Tier A records are targeted for Tier B verification in about seven calendar days.

Overdue Tier A is visible and prioritized, but:

- one overdue record does not block unrelated valid Tier A publication;
- seven days does not automatically withdraw a valid Tier A record;
- missing Evidence is never replaced with an inferred fact to meet the target.

### Tier B — Public Verified

Tier B adds the applicable reviewed verification dimensions: substantive profile text, evidence-backed Current State, supportable Place/timing/organizer/Relation information, direct profile Evidence, authoritative-link review, and an evidence-backed dated observation anchor.

Tier B does not require multi-year history.

### Tier C — Public History / Monitoring

Tier C adds longitudinal depth or monitoring, including multiple-year Occurrences, cancellation/postponement/partial-held/revival history, meaningful Change Events, governance/venue changes, freshness monitoring, or richer Relation history.

Tier C deepening runs in parallel with Tier A breadth and Tier B verification.

## Current NCS-02 baseline

```text
Specialist primary records                  57
Tier A — Public Index                        19
Tier B — Public Verified                      8
Tier C — Public History / Monitoring         30
Below Tier A                                  0
```

The existing 52 / 57 completed-Occurrence and 37 / 57 multi-year measurements describe current history depth. They are not release floors for new Tier A/B records.

## Festival profile

Festival records may include festival_kind, recurrence_pattern, usual_months, usual_season, date_rule_text_ja, traditional_calendar_text_ja, usual_duration_days, and season_tags.

Festival kind examples:

```text
shrine_festival
temple_festival
community_festival
ritual_festival
dance_festival
procession_festival
composite_festival
other
unknown
```

## Folk Performance profile

Folk Performance records may include performance_kind, forms, recurrence_pattern, usual_months, usual_season, date_rule_text_ja, and occurrence_series_ids.

Performance kind examples:

```text
kagura
dengaku
shishimai
bon_odori
puppet_theatre
hayashi
dance
ritual_performance
narrative_performance
other
unknown
```

## State vocabularies

Festival:

```text
active
suspended
dormant
reviving
discontinued
unknown
```

Folk Performance:

```text
active
reduced_activity
suspended
dormant
reviving
discontinued
unknown
```

`revived` is not a Current State value. Revival is represented through Change Events, and a confirmed resumed tradition may return to `active`.

`unknown` is a real evidence-bounded result. It must not be used as a shortcut for insufficient research. Tier A may simply omit unsupported Current State.

## Change Event examples

```text
suspension_started
suspension_ended
revival_activity_started
revival_announced
revival_completed
format_changed
schedule_rule_changed
venue_changed
organizer_changed
preservation_group_formed
preservation_group_reorganized
merged_with
renamed
designation_added
designation_changed
designation_removed
disaster_interruption
discontinued
other
```

## Occurrence types

```text
festival_edition
festival_component
performance
ritual
procession
dedication
other
```

Elapsed dates do not prove an Occurrence was held. Pre-event schedules, ticket sales, event-page persistence, or silence about cancellation are not post-event Evidence.

## Place and map behavior

- Single-site subjects may show one primary map when Place Evidence supports it.
- Multi-site subjects should show a representative map and a place list when supported.
- Route-based traditions should not be represented as if one pin describes the whole tradition.
- Distributed traditions should prefer area explanation over false precision.
- Tier A may have no Place/coordinate beyond its supported geographic scope.

Entity default places and Occurrence-specific venues remain separate.

## External links

Display priority when supported:

1. official website,
2. organizer or preservation-group website,
3. municipality page,
4. official tourism page,
5. verified official social links,
6. official video channel.

Social links are optional.

## Images

Images are optional.

- zero approved images: render no image block,
- one approved image: primary image with credit,
- multiple approved images: primary image plus gallery and lightbox.

See `image-policy.md`.

## Search and filters

Initial:

```text
full text
entity type
prefecture
current state where available
```

Future-ready dimensions may include municipality, coverage tier, usual month, season, recurrence, kind, designation, website presence, image presence, latest Occurrence outcome, and history flags.

Tier A records remain searchable even when Tier B-only dimensions are absent.

## Entity boundary rule

Do not create same-name Festival and Folk Performance records merely because a performance happens annually.

Separate records only when independent identity is supported by meaningful differences such as name, organization, State, Occurrence history, Source corpus, or useful Relation structure.

Bulk import does not weaken this rule. Ambiguous imported candidates remain private until identity is resolved sufficiently for Tier A.

## Automation and publication boundary

Bulk discovery and draft generation may be automated, but automation must not infer held/cancelled outcomes, Current State, organizer, Place, Relation, coordinates, or other unsupported claims.

Machine classification does not replace review. Once the reviewed Tier A minimum is satisfied, however, the record is intentionally public and does not wait for Tier B/C completion.
