# Verification Policy

## Principle

Public records are published only after review.

The public product distinguishes a subject's identity, current state, a specific occurrence, a historical change event, a relation, a designation, the source, and the evidence supporting an assertion.

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

## Current State

Current State is derived from approved State Snapshots.

A State should not be changed solely because:

- one Occurrence was cancelled,
- a website disappeared,
- a social account became inactive,
- the format changed,
- the recurrence cycle has a naturally long gap.

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

## Relations

Relations should be specific when Evidence supports specificity. Avoid a generic association relation when a more precise relationship is known.

Relations may have validity periods.

## Conflicts

Unresolved Source conflicts are not silently flattened into a public conclusion.

Conflicted or unresolved claims remain outside the Public Projection until a public statement can be supported.

## Public Projection safety

Do not publish candidate queues, internal confidence, reviewer notes, unresolved source conflicts, internal priorities, or private operational comments.
