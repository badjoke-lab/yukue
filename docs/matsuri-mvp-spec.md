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

These State-free seeds are **not** acceptable as the primary public corpus of 神社のゆくえ or 寺院のゆくえ. Future specialist sites must apply their own substantive public-record contracts under `nationwide-corpus-scaling.md` before publication.

## Matsuri public-record minimum

For nationwide post-launch expansion, a newly published primary Festival or Folk Performance must satisfy the substantive public-record quality contract in:

```text
docs/nationwide-corpus-scaling.md
```

A name/location/link-only record remains a non-public candidate.

A public primary Matsuri record requires a substantive Basic Profile plus evidence-bounded Observation, including an approved Current State, at least one evidence-backed completed dated Occurrence with a non-`scheduled` outcome, and at least one evidence-backed Change Event.

A Change Event is not a substitute for completed Occurrence history for new public records. A candidate with no supportable completed Occurrence remains non-public rather than being promoted as a shallow record.

For NCS-06-or-later expansion, the measured history-depth floor also applies: at least `ceil(new_public_primary_records * 37 / 57)` newly published primary records in each release train must have evidence-backed completed Occurrences in at least two distinct years, and the corpus-wide multi-year history proportion must not fall below `37 / 57`.

Bulk discovery and draft generation may be automated, but publication remains reviewed and fail-closed.

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

`unknown` is a real evidence-bounded result. It must not be used as a publication shortcut for insufficient research.

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

Future-ready dimensions may include municipality, usual month, season, recurrence, kind, designation, website presence, image presence, latest Occurrence outcome, history flags, and public quality/depth class.

## Entity boundary rule

Do not create same-name Festival and Folk Performance records merely because a performance happens annually.

Separate records only when independent identity is supported by meaningful differences such as name, organization, State, Occurrence history, Source corpus, or useful Relation structure.

Bulk import does not weaken this rule. Ambiguous imported candidates remain outside the Public Projection until identity is resolved.
