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

Shrine and Temple records may initially be minimal cross-site seeds. Their own State models belong to future home surfaces.

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

## Place and map behavior

- Single-site subjects may show one primary map.
- Multi-site subjects should show a representative map and a place list.
- Route-based traditions should not be represented as if one pin describes the whole tradition.
- Distributed traditions should prefer area explanation over false precision.

Entity default places and Occurrence-specific venues remain separate.

## External links

Display priority:

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
current state
```

Future-ready dimensions may include municipality, usual month, season, recurrence, kind, designation, website presence, image presence, latest Occurrence outcome, and history flags.

## Entity boundary rule

Do not create same-name Festival and Folk Performance records merely because a performance happens annually.

Separate records only when independent identity is supported by meaningful differences such as name, organization, State, Occurrence history, Source corpus, or useful Relation structure.
