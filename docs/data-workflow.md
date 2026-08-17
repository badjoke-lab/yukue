# Data Workflow

**Status:** Current direction

## Boundary

This public repository stores reviewed public canonical data and the code that validates and projects it.

Private candidate collection, unresolved review notes, internal confidence, source conflicts under review, and monitoring queues are not stored in the public data layer.

Bulk scaling does not change that boundary.

## Workflow

```text
Authoritative-source discovery
→ non-public candidate extraction
→ identity and duplicate check
→ source classification and provenance capture
→ record decomposition
→ draft Basic Profile + Observation records
→ Evidence targeting
→ substantive public-record gate
→ human review
→ approved public canonical data
→ validation
→ Public Projection
→ HTML / JSON / JSON-LD / Search / Sitemap
```

A candidate that contains only name, geography, and a source link stops before the public-record gate. It is not a public record and does not count as public coverage.

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

## Nationwide scaling rule

The governing contract is:

```text
docs/nationwide-corpus-scaling.md
```

For new primary Matsuri records, public approval requires a substantive Basic Profile plus Observation coverage. A bulk importer may draft fields, but it may not publish a directory shell.

The public gate requires, among the full contract:

- reviewed identity / entity boundary;
- substantive summary and description;
- evidence-bounded geography / timing / recurrence / Place handling;
- approved Current State with Evidence;
- at least one completed dated Occurrence with a non-`scheduled` outcome, or an evidence-backed Change Event when a completed Occurrence cannot responsibly be established;
- Source / Evidence coverage across profile and observation dimensions;
- deterministic duplicate checking.

The quality gate must also measure corpus depth and prevent new breadth from creating a permanently shallow second class of public records.

## Automation boundary

Automation is expected to carry most scaling work before review.

It may assist or perform:

```text
candidate discovery
source normalization
name / geography normalization
duplicate-key generation
candidate duplicate matching
draft generation
Source / Evidence packet assembly
checklist generation
coverage metrics
quality / depth classification
```

Automation may not:

```text
auto-approve public records
infer held/cancelled outcomes from elapsed dates or silence
infer Current State transitions without Evidence
fabricate descriptions, coordinates, Relations, or official links
use unknown as a shortcut around research
publish candidate shells
```

Human review remains the publication gate.

## Depth-preservation workflow

Before the first bulk public release:

```text
classify existing approved corpus
→ record depth baseline
→ define machine release threshold
→ run bulk candidates privately
→ audit errors and source ceilings
→ promote only records meeting public minimum
→ verify post-release depth distribution
```

Every expansion release train must include substantive depth upgrades as well as new public Entities. Promotion backlog and source-ceiling exceptions must be machine-visible under the nationwide scaling contract.

## Pull request rule

A public-data PR should explain:

- records added or changed;
- candidate/import source family when applicable;
- identity decision when ambiguous;
- duplicate decisions for imported records;
- State decision when changed;
- Occurrence and Change Event distinction;
- important Relation changes;
- Evidence coverage;
- quality/depth classification impact;
- known limits and genuine source ceilings.

A bulk-ingestion PR must additionally report candidate count separately from approved public count. Candidate count must never be presented as public corpus growth.

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
public-record substantive minimum
identity / duplicate contract
corpus quality / depth distribution
promotion backlog bound
```

## Corrections

Corrections should preserve stable identity when the subject is the same.

Use record lifecycle and supersession mechanisms for merged or replaced records rather than silently reusing identifiers for different subjects.

Bulk import does not bypass correction or supersession rules.
