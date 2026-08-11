# Matsuri Corpus Expansion Batch 43 Audit — 2026-08-11

## Result

**Passed.** Batch 43 adds 宮﨑神宮大祭（神武さま） as the first approved primary Matsuri record for 宮崎県 and completes reviewed primary-prefecture coverage at **47 / 47**.

## Release identity

```text
Implementation PR       #241
Implementation head     2c6461907def5b3418f5096435a99a82b758ddfc
Release merge           3604d984c71bb71f3b66245b87fa869a64ec85b3
Complete repository CI  31464281236 — success
Full-page screenshots   31464281242 — success
Detail C navigation     31464281255 — success
Corpus audit            31464281231 — success
```

## Breadth result

Batch 43 adds:

```text
Festival      fst-miyazaki-jingu-grand-festival
Shrine seed   shr-miyazaki-jingu
Place         plc-miyazaki-jingu
Route Place   plc-miyazaki-jingu-shinko-route
Relation      rel-miyazaki-jingu-festival-ritually-associated-miyazaki-jingu
```

Primary-prefecture coverage is now:

```text
47 / 47
Prefecture gaps 0
```

The breadth phase therefore has no remaining prefecture gap under the current primary-record coverage rule.

## Depth result

The reviewed record includes:

- Current State `active` for 宮﨑神宮大祭;
- annual recurrence centered on the October 26例祭 and the following Saturday/Sunday御神幸行列;
- a year-level c.1909 current-form establishment Change Event;
- the 2024 edition as `held / modified`, reflecting the weather-related first-day outward-procession cancellation and following-day one-day round trip;
- the 2026 edition as `scheduled / unknown` for October 31–November 1;
- no future held inference before post-event Evidence exists;
- an evidence-backed `ritually_associated_with` Relation to 宮﨑神宮;
- separate Shrine-anchor and distributed-route Places without fabricated point coordinates.

The 宮﨑神宮 Entity is a State-free Matsuri seed reference. No Shrine Current State or legal-person State is inferred.

## Corpus checkpoint

The strict corpus audit established:

```text
Entities           120
Places             108
State Snapshots     56
Change Events      106
Occurrences        166
Occurrence Series   57
Recurrence Patterns 57
Relations           70
Designations        29
Sources            318
Evidence           699
Primary coverage 47 / 47 prefectures
Prefecture gaps      0
Sparse primary Entities 0
```

Repository bundle bookkeeping is:

```text
F1 batches                   13
Maintenance bundles          94
Correction bundles           21
Additive application slots  107
Public Entities             120
Entities without external links 0
```

## Release artifact and route contract

The final release candidate contains:

```text
Entities          120
Change Events     106
Relations          70
Occurrences       166
Sitemap entries   238
```

The new public routes are present:

```text
/festivals/miyazaki-jingu-grand-festival/
/references/shrines/miyazaki-jingu/
/places/miyazaki-jingu/
/places/miyazaki-jingu-shinko-route/
```

Static navigation, map utility, real-browser Detail C checks, complete repository CI, and full-page desktop/mobile screenshot review passed before merge.

## Evidence and Source contract

Batch 43 adds seven Sources and twelve claim-linked Evidence records. Festival identity, Shrine identity, Current State, location, distributed route, recurrence, ritual Relation, c.1909 Change Event, 2024 held outcome, 2024 modified scale, 2026 scheduled outcome, and map behavior are supported by claim-specific Evidence.

The 2024 `held / modified` assertion separates actual performance Evidence from the weather-related cancellation Evidence. The 2026 record remains `scheduled / unknown`; elapsed or future dates are not converted into held outcomes without post-event Evidence.

## Jinja boundary

The new 宮﨑神宮 seed advances the Jinja seed bookkeeping to:

```text
Relation-backed seeds       26
Direct identity Evidence    30
Place references            26
Approved Shrine States       0
Official URLs               19
```

This does not activate Jinja. The Matsuri stabilization review remains incomplete, portal/Jinja order remains undecided, the Jinja State specification remains unapproved, and explicit start authorization remains absent.

## Expansion boundary after 47 / 47

Completing prefecture breadth does not complete Matsuri stabilization and does not authorize the next specialist site.

Subsequent Matsuri corpus work should be **depth-first** rather than adding records merely to increase geographic coverage. Priority dimensions are:

- due and historical Occurrence closure;
- Change Event history;
- Relation density and provenance;
- claim-specific Evidence quality;
- stale-State and Source review;
- corrections and dated maintenance.

## Conclusion

Batch 43 is repository-verified and completes the current reviewed primary-prefecture breadth target at 47 / 47. The next separate gate is exact canonical-production verification for release `3604d984c71bb71f3b66245b87fa869a64ec85b3`.
