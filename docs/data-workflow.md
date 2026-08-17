# Data Workflow

**Status:** Current direction

## Boundary

This public repository stores reviewed public canonical data and the code that validates and projects it.

Private candidate collection, unresolved review notes, internal confidence, source conflicts under review, and monitoring queues are not stored in the public data layer.

Bulk scaling does not change that boundary.

A private candidate stage is distinct from Tier A. **Tier A is public.**

## Workflow

```text
Authoritative-source discovery
→ private candidate extraction / source normalization
→ identity and duplicate check
→ Tier A minimum review
→ approved Tier A Public Index record
→ Public Projection / detail / browse / search / JSON / sitemap
      +
      → Tier B verification work
      → Tier C history / monitoring deepening
```

The tracks run in parallel. A record does not need Tier B/C depth before it can enter the public Index once the Tier A minimum is reviewed and satisfied.

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

### Tier A publication workflow

A Matsuri primary record can enter the Public Projection as Tier A when the reviewed minimum is satisfied:

- canonical identity / entity boundary and subject type;
- prefecture + municipality where municipality-bounded, or an appropriate broader scope;
- approved official/public/otherwise authoritative source;
- source verification/access date;
- deterministic identity / duplicate check;
- machine-visible Tier A classification;
- real Tier A publication timestamp for newly published Tier A records.

A reviewed name + geography + authoritative source can therefore be a valid public Tier A record.

Tier A does not require a completed Occurrence, Change Event, Current State, multi-year history, Place, organizer, Relation, or coordinates before publication.

Unsupported dimensions remain absent. Automation or review must not infer them merely to deepen the record.

### Tier A → B workflow

For newly published Tier A records:

```text
record tier_a_published_at
→ calculate tier_b_target_at = +7 calendar days
→ report due within 48h / overdue / missing B dimensions
→ prioritize B verification
→ keep unrelated valid Tier A publication running
```

If B cannot yet be established, keep the valid record public at Tier A with a machine-visible missing-dimension reason. Do not auto-withdraw it solely because seven days elapsed.

The seven-day target is not a repository-wide release gate.

### Tier B workflow

Tier B review adds the applicable verified dimensions, including substantive profile text, evidence-backed Current State, supportable Place/timing/organizer/Relation information, direct profile Evidence, authoritative-link review, and a dated observation anchor.

A dated anchor may be an evidenced Occurrence or an evidenced Change Event. Multi-year history is not required for Tier B.

### Tier C workflow

Tier C deepening adds longitudinal value such as multiple-year Occurrences, cancellation/postponement/partial-held/revival history, Change Events, governance/venue changes, freshness monitoring, or richer Relation history.

Tier C work continues independently of new Tier A breadth and Tier B verification.

## Automation boundary

Automation is expected to carry most national-scale preparation before review.

It may assist or perform:

```text
candidate discovery
source normalization
name / geography normalization
duplicate-key generation
candidate duplicate matching
Tier A draft generation
source verification-date capture
Tier A publication timestamp calculation at actual publication
Tier B review-packet assembly
candidate Place / timing / organizer / Relation extraction
Source / Evidence draft mapping
A/B/C classification
Tier A age / overdue reporting
prefecture / municipality / source-family coverage reporting
```

Automation may not:

```text
auto-approve unsupported public claims
infer held/cancelled outcomes from elapsed dates or silence
infer Current State transitions without Evidence
fabricate descriptions, organizers, Places, coordinates, Relations, or officiality
silently promote A→B
hide overdue Tier A records
unpublish valid Tier A only because the seven-day target elapsed
classify a record as Tier C merely to improve metrics
```

Human/reviewed evidence boundaries remain mandatory.

## Public-growth workflow

Nationwide expansion must report separately:

```text
private candidates discovered
public Tier A count
Tier A due / overdue / missing B dimensions
public Tier B count
public Tier C count
new Tier A published
Tier A promoted to B
prefecture coverage
municipality coverage
source-family coverage
```

Candidate count alone is not public corpus growth.

The existing 37 / 57 multi-year completed-Occurrence measurement is retained as historical corpus information only. It is not a release floor or publication quota for Tier A/B.

## Pull request rule

A public-data PR should explain, as applicable:

- records added or changed;
- source family / provenance;
- identity and duplicate decisions;
- Tier A/B/C classification impact;
- real Tier A publication timestamps for newly published Tier A records;
- State decision when changed;
- Occurrence and Change Event distinction;
- important Relation changes;
- Evidence coverage;
- known limits and genuine source ceilings.

A bulk-ingestion PR must additionally report candidate count separately from approved public A/B/C count.

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
Tier A identity / geography / source minimum
identity / duplicate contract
Tier A publication-age metadata for newly published A
A/B/C classifier consistency
Tier A→B missing-dimension / overdue reporting
public-growth metrics
```

A valid Tier A record failing Tier B/C dimensions must not be rejected merely for being shallow. Conversely, passing Tier A must not be used to invent or expose unsupported Tier B/C claims.

## Corrections and freshness

Corrections should preserve stable identity when the subject is the same.

Use record lifecycle and supersession mechanisms for merged or replaced records rather than silently reusing identifiers for different subjects.

Bulk import does not bypass correction or supersession rules.

Closed Occurrences remain fail-closed: elapsed dates, ticket sales, page persistence, or absence of cancellation evidence do not prove `held`.
