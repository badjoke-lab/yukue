# Data Workflow

**Status:** Current direction

## Boundary

This public repository stores reviewed public canonical data and the code that validates and projects it.

Private candidate collection, unresolved review notes, internal confidence, source conflicts under review, and monitoring queues are not stored in the public data layer.

## Workflow

```text
Research candidate
→ Source review
→ Identity and duplicate check
→ Record decomposition
→ Draft records
→ Evidence targeting
→ Review
→ Approved public canonical data
→ Validation
→ Public Projection
→ HTML / JSON / JSON-LD / Search / Sitemap
```

## Record decomposition

Research should separate, when applicable:

```text
Entity
State Snapshot
Occurrence
Change Event
Relation
Designation
Place
Source
Evidence
Image Asset
```

Do not force all information into Entity description text.

## Pull request rule

A public-data PR should explain:

- records added or changed,
- identity decision when ambiguous,
- State decision when changed,
- Occurrence and Change Event distinction,
- important Relation changes,
- Evidence coverage,
- known limits.

## Validation before merge

Expected checks include:

```text
schema validity
ID uniqueness
slug uniqueness
Relation endpoint integrity
Evidence target integrity
Place reference integrity
vocabulary validity
Image rights gate
Public Projection leak check
```

## Corrections

Corrections should preserve stable identity when the subject is the same.

Use record lifecycle and supersession mechanisms for merged or replaced records rather than silently reusing identifiers for different subjects.

## Automation boundary

Automation may assist candidate discovery, duplicate detection, source classification, draft generation, and checklist creation.

Automatic public publication is not a project requirement. Human review remains the publication gate.
