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

This includes reviewed identity/profile coverage, evidence-bounded Current State, and at least one completed dated Occurrence with a non-`scheduled` outcome or an evidence-backed Change Event when a completed Occurrence cannot responsibly be established.

A record that cannot meet the minimum remains a candidate rather than entering the Public Projection as a thin shell.

Before bulk public release, machine-readable quality/depth metrics and a release guard must also verify that the expansion does not materially degrade the corpus depth distribution.

## Conflicts

Unresolved Source conflicts are not silently flattened into a public conclusion.

Conflicted or unresolved claims remain outside the Public Projection until a public statement can be supported.

Bulk scale does not justify resolving identity or source conflicts by majority vote, heuristic confidence alone, or automatic preference for one source family.

## Future-site verification

State-free Shrine and Temple seeds used by Matsuri remain valid candidate/reference records for Matsuri Relations.

They are not pre-approved public primary records for 神社のゆくえ or 寺院のゆくえ.

Each future specialist site requires its own substantive public-record minimum and quality gate before activation under `nationwide-corpus-scaling.md`.

## Public Projection safety

Do not publish candidate queues, internal confidence, reviewer notes, unresolved source conflicts, internal priorities, private operational comments, or thin candidate shells.
