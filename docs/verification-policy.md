# Verification Policy

## Principle

Public records are published only after review.

The public product distinguishes a subject's identity, current state, a specific occurrence, a historical change event, a relation, a designation, the source, and the evidence supporting an assertion.

Nationwide scale does not change the publication threshold. Bulk discovery increases the number of candidates; it does not create a weaker class of public records.

## Candidate/public boundary

Index-like records containing only name, geography, and source links may exist only as non-public candidates.

They:

- do not enter the Public Projection;
- do not count toward public national coverage;
- do not receive specialist public detail pages;
- do not become public merely because a source importer can generate them cheaply.

For nationwide expansion, the substantive public-record contract is defined in `nationwide-corpus-scaling.md`.

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

Only approved public material enters the Public Projection.

Automation may draft and classify records but does not set `approved` without the required review gate.

## Current State

Current State is derived from approved State Snapshots.

A State should not be changed solely because:

- one Occurrence was cancelled,
- a website disappeared,
- a social account became inactive,
- the format changed,
- the recurrence cycle has a naturally long gap.

`unknown` is not a shortcut around research. It must be an approved evidence-bounded conclusion.

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

## Relations

Relations should be specific when Evidence supports specificity. Avoid a generic association relation when a more precise relationship is known.

Relations may have validity periods.

Candidate relation suggestions from automation remain non-public until reviewed.

## Public-record completeness for scaling

A newly published primary Matsuri record must meet the substantive minimum in `nationwide-corpus-scaling.md`.

This includes reviewed identity/profile coverage, evidence-bounded Current State, **at least one evidence-backed completed dated Occurrence with a non-`scheduled` outcome**, and **at least one evidence-backed Change Event**.

A Change Event does not substitute for completed Occurrence history for a newly published primary Matsuri record.

A record that cannot meet the minimum remains a candidate rather than entering the Public Projection as a thin shell.

## Measured history-depth verification

The NCS-02 pre-expansion reference is:

```text
Specialist primary records                57
>= 1 completed Occurrence year            52 / 57
>= 2 completed Occurrence years           37 / 57
>= 1 evidence-backed Change Event         57 / 57
```

For NCS-06-or-later public expansion:

- 100% of newly published primary Matsuri records must satisfy `public_core`;
- at least `ceil(new_public_primary_records * 37 / 57)` of the newly published records in a release train must have completed Occurrences in at least two distinct years;
- the corpus-wide two-distinct-year proportion must not fall below `37 / 57`;
- source-ceiling findings may keep a candidate unpublished but do not waive the new-record minimum;
- the five existing specialist-primary records without completed Occurrence history remain promotion/deepening backlog and are not precedents for new publication.

The remaining promotion-backlog bound and full release guard must be implemented before bulk public release. Until then, NCS-06 publication remains blocked.

## Conflicts

Unresolved Source conflicts are not silently flattened into a public conclusion.

Conflicted or unresolved claims remain outside the Public Projection until a public statement can be supported.

Bulk scale does not justify resolving identity or source conflicts by majority vote, heuristic confidence alone, or automatic preference for one source family.

## Future-site verification

State-free Shrine and Temple seeds used by Matsuri remain valid candidate/reference records for Matsuri Relations.

They are not pre-approved public primary records for 神社のゆくえ or 寺院のゆくえ.

Each future specialist site requires its own substantive public-record minimum and quality gate before activation under `nationwide-corpus-scaling.md`.

Each future-site quality gate must include a measured anti-shallow-expansion rule appropriate to that domain rather than copying Matsuri Occurrence thresholds mechanically.

## Public Projection safety

Do not publish candidate queues, internal confidence, reviewer notes, unresolved source conflicts, internal priorities, private operational comments, or thin candidate shells.
