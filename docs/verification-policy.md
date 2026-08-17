# Verification Policy

## Principle

Public records are published only after the review required for their public tier.

The public product distinguishes a subject's identity, current state, a specific occurrence, a historical change event, a relation, a designation, the source, and the evidence supporting an assertion.

Nationwide scale uses a three-layer public model:

```text
Tier A  Public Index
Tier B  Public Verified
Tier C  Public History / Monitoring
```

A record does not need Tier B/C depth before it can be public Tier A. Verification remains claim-bounded: a thin public record may expose only the facts actually supported at Tier A.

## Candidate/public boundary

A private candidate may contain incomplete parsed/source material before identity/source review.

A record becomes intentionally public Tier A once it satisfies the minimum in `nationwide-corpus-scaling.md`, including reviewed identity, subject type, geography, authoritative source, source verification/access date, and deterministic identity/duplicate checking.

A reviewed name + geography + authoritative source may therefore be a legitimate public Tier A record.

Tier A:

- enters the Public Projection;
- may receive a specialist detail page;
- may appear in browse/search, public JSON, sitemap, and indexable surfaces;
- counts toward public national coverage;
- is visibly distinguishable from Tier B/C.

Tier A must not claim unsupported Current State, held/cancelled outcome, organizer, Place, Relation, coordinates, history, or officiality.

Private candidates that have not satisfied Tier A remain non-public and do not count toward public coverage.

## Review states

Internal workflows may use:

```text
candidate
needs_review
needs_information
conflicted
approved
rejected
on_hold
superseded
```

Only reviewed public material enters the Public Projection. Automation may draft and classify records but does not invent approval or unsupported facts.

## Tier A → B target

A newly published Tier A record should be promoted toward Tier B in about seven calendar days.

The target is an operational priority, not a global release gate:

- report due and overdue Tier A;
- prioritize overdue A→B research;
- continue unrelated valid Tier A publication;
- never satisfy the target by inference or fabricated Evidence;
- never auto-withdraw a valid Tier A only because seven days elapsed.

If Tier B Evidence remains insufficient, keep the record public at Tier A and report its missing verification dimensions.

## Current State

Current State is derived from approved State Snapshots.

A State should not be changed solely because:

- one Occurrence was cancelled;
- a website disappeared;
- a social account became inactive;
- the format changed;
- the recurrence cycle has a naturally long gap.

`unknown` is not a shortcut around research. It must be an approved evidence-bounded conclusion when exposed as Current State.

Tier A does not require Current State at all.

## Revival

Revival is represented through Events and State transitions.

```text
revival_activity_started → Change Event
reviving → Current State
revival_completed → Change Event
active → Current State after confirmed return
```

`revived` is not used as a normal Current State value.

## Occurrences

Occurrence records should separate outcome, scale, date or period, venue, and Evidence.

Cancellation does not automatically imply suspension.

Elapsed dates, a still-live event page, ticket sales, livestream links, or absence of cancellation evidence do not prove `held`.

Bulk import and automated maintenance must preserve this fail-close rule.

A completed Occurrence is not a Tier A publication prerequisite. Tier B may use a properly evidenced Occurrence, including a current scheduled edition, as its dated observation anchor.

## Relations

Relations should be specific when Evidence supports specificity. Avoid a generic association relation when a more precise relationship is known.

Relations may have validity periods.

Candidate relation suggestions from automation remain non-public until reviewed.

A Relation is not required merely to publish Tier A.

## Tier B — Public Verified

Tier B requires Tier A plus applicable reviewed verification dimensions. For Matsuri these include:

- substantive profile text;
- approved Current State with claim-linked Evidence;
- Place/route/distributed-place treatment where supportable;
- organizer / responsible organization where supportable;
- supported Shrine / Temple / Organization Relations where available;
- timing / recurrence where supportable;
- direct profile / identity Evidence;
- reviewed authoritative external links;
- at least one dated observation anchor supported by Evidence.

Tier B does not require multi-year Occurrence history.

A field that cannot responsibly be established is not invented merely to obtain Tier B.

## Tier C — Public History / Monitoring

Tier C adds meaningful longitudinal history or monitoring beyond Tier B.

Examples include:

- completed Occurrences across multiple years;
- evidence-backed cancellation / postponement / partial-held / revival history;
- meaningful Change Events;
- governance or venue changes;
- active scheduled-Occurrence freshness monitoring;
- richer supported Relation history.

Tier C is a deepening target, not a publication prerequisite for Tier A/B.

## NCS-02 measured baseline

The current specialist-primary baseline is:

```text
Specialist primary records                  57
Tier A — Public Index                        19
Tier B — Public Verified                      8
Tier C — Public History / Monitoring         30
Below Tier A                                  0
>= 1 completed Occurrence year              52 / 57
>= 2 completed Occurrence years             37 / 57
>= 1 evidence-backed Change Event           57 / 57
```

The completed-Occurrence and 37 / 57 multi-year values are descriptive measurements of the existing corpus. They are **not** first-publication requirements or release quotas for Tier A/B.

The current Tier A records have no authentic legacy `tier_a_published_at`, so the classifier reports publication-age metadata missing rather than inventing a due/overdue age.

## Obsolete verification rules

Do not reintroduce any of the following as nationwide publication requirements:

```text
Tier A-equivalent records are necessarily non-public
completed Occurrence required for Tier A
Change Event required for Tier A
completed Occurrence + Change Event both required for Tier A
37 / 57 or 64.9% multi-year-history release floor
a single overdue Tier A globally stops new Tier A publication
valid Tier A auto-unpublishes when seven days elapse
```

## Conflicts

Unresolved Source conflicts are not silently flattened into a public conclusion.

Conflicted or unresolved claims remain outside the relevant public claim set until a statement can be supported. A record may still remain public at a lower tier if its Tier A facts themselves are not conflicted.

Bulk scale does not justify resolving identity or source conflicts by majority vote, heuristic confidence alone, or automatic preference for one source family.

## Future-site verification

The series design includes:

```text
祭のゆくえ
神社のゆくえ
寺院のゆくえ
弔いのゆくえ
```

Only Matsuri is currently activated for implementation/publication work.

State-free Shrine and Temple references used by Matsuri remain valid relation/reference seeds where supported, but they do not automatically become public primary Tier A records for 神社のゆくえ or 寺院のゆくえ.

Each future specialist site must define its own Tier A identity/source minimum and Tier B verification dimensions before activation. Matsuri Occurrence-specific thresholds must not be copied mechanically to another domain.

## Public Projection safety

Do not publish candidate queues, internal confidence, reviewer notes, unresolved source conflicts, internal priorities, private operational comments, or other internal-only data.

This does not prohibit reviewed public Tier A records: Tier A is part of the Public Projection by design.
