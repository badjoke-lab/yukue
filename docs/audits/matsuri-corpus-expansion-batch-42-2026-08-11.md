# Matsuri Corpus Expansion Batch 42 Audit — 2026-08-11

## Result

**Passed.** Batch 42 adds 和歌祭 as the first approved primary Matsuri record for 和歌山県 and preserves the current Detail C, Evidence, Relation, freshness, map, future-site, and Jinja boundaries.

## Release identity

```text
Implementation PR       #239
Implementation head     a57a9d39f4af1c4e8a4e6c727c7392b70545dd87
Release merge           d36797b2980ef9d639bfa7ee0a152a287a223d3a
Complete repository CI  31462104885 — success
Full-page screenshots   31462104926 — success
```

## Breadth result

Batch 42 adds:

```text
Festival      fst-waka-matsuri
Shrine seed   shr-kishu-toshogu
Place         plc-kishu-toshogu
Route Place   plc-waka-matsuri-wakaura-route
Relation      rel-waka-matsuri-ritually-associated-kishu-toshogu
```

Primary prefecture coverage advances to:

```text
46 / 47
```

Only 宮崎県 remains uncovered after this release.

## Depth result

The reviewed record includes:

- Current State `active` for 和歌祭;
- an annual second-Sunday-of-May recurrence;
- a year-level 1622 first-edition/start Change Event;
- the 2026 edition as `held / unknown` using post-event reporting for actual performance, with municipal material independently supporting the exact date and venue;
- an evidence-backed `ritually_associated_with` Relation to 紀州東照宮;
- separate Shrine-anchor and distributed-route Places, without fabricated route coordinates.

The 紀州東照宮 Entity is a State-free Matsuri seed reference. No Shrine Current State is inferred.

## Corpus checkpoint

The strict corpus audit established:

```text
Entities           118
Places             106
State Snapshots     55
Change Events      105
Occurrences        164
Relations           69
Designations        29
Sources            311
Evidence           687
Primary coverage 46 / 47 prefectures
Sparse primary Entities 0
```

Repository bundle bookkeeping is:

```text
F1 batches                   13
Maintenance bundles          92
Correction bundles           21
Additive application slots  105
Public Entities             118
Entities without external links 0
```

## Detail C and route contract

The release artifact contains the new public routes:

```text
/festivals/waka-matsuri/
/references/shrines/kishu-toshogu/
/places/kishu-toshogu/
/places/waka-matsuri-wakaura-route/
```

The generated release contains:

```text
Sitemap entries 234
```

Static navigation, map utility, and real-browser Detail C checks passed before merge.

## Evidence and Source contract

Batch 42 adds six Sources and eleven claim-linked Evidence records. Identity, Current State, location, recurrence, Relation, historical start, 2026 held outcome, and map behavior are supported by separate claim-specific Evidence rather than by one undifferentiated source assertion.

No unused public Source remains under the strict launch-readiness gate.

## Visual-review corrective maintenance

The first complete full-page run successfully captured every selected route and loaded every embedded map, but one transient Google Maps third-party `MapsJsInternalService/InitMapsJwt` RPC console message was initially classified as a first-party console error.

The capture classifier was narrowed to that exact Google Maps JWT RPC endpoint/message family. General network errors and application console errors are not suppressed. The contract that first-party console errors must be zero remains unchanged.

After the correction, the complete full-page screenshot workflow passed.

## Jinja boundary

The new 紀州東照宮 seed advances the Jinja seed bookkeeping to:

```text
Relation-backed seeds       25
Direct identity Evidence    29
Place references            25
Approved Shrine States       0
Official URLs               18
```

This does not activate Jinja. The Matsuri stabilization review remains incomplete, portal/Jinja order remains undecided, the Jinja State specification remains unapproved, and explicit start authorization remains absent.

## Conclusion

Batch 42 is repository-verified and ready for the separate exact canonical-production baseline gate. The next breadth target is the sole remaining uncovered prefecture, 宮崎県, while all existing evidence and future-site boundaries remain enforced.
