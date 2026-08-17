# Matsuri Corpus Quality Baseline

**Status:** NCS-02 measured baseline / bulk public release not authorized

## Governing contract

This baseline implements the measurement step required by:

```text
docs/nationwide-corpus-scaling.md
```

It does not weaken that contract and does not authorize bulk publication.

## Exact measured baseline

Observed from GitHub Actions workflow run `32044096419`, job `95428357764`, at `2026-08-17T16:01:41.069Z` (`2026-08-18` JST).

```text
All public Entities                         120
Legacy primary subjects                     58
Specialist primary subjects                 57
  Festival                                  49
  Folk Performance                           8
  Tradition Unit                             1  (legacy coverage only)

Machine public_core                          0 / 57
Machine history_enriched                     0 / 57
Machine monitored                           21 / 57
Below machine public_core                   57 / 57

Completed Occurrence history               52 / 57
Evidence-backed Change Events               57 / 57
Current State Evidence                      56 / 57
Direct profile Evidence                     39 / 57
```

## Why `public_core` is currently zero

The classifier intentionally applies the newly accepted public-record contract to the existing corpus instead of exempting old records.

Every one of the 57 Festival / Folk Performance specialist-primary records currently lacks an Entity-level `description_ja`, so all 57 fail the new machine-checkable minimum on that dimension.

Additional measured gaps are:

```text
direct profile Evidence missing             18
authoritative external link missing           3
approved Current State missing                1
Current State Evidence missing                1
timing / recurrence signal missing            1
```

This result must **not** be interpreted as meaning the existing corpus is only a directory. The same baseline shows substantial Observation depth already exists: 52 / 57 have completed Occurrence history, all 57 have an evidence-backed Change Event, and 56 / 57 have Current State Evidence.

The correct interpretation is:

```text
existing corpus has meaningful historical / observation depth
+
existing corpus does not yet satisfy the newly tightened complete public-core contract
```

The project must improve the existing corpus while expanding national breadth. The current 57 records are not exempt from the new quality direction.

## Classifier boundary

The classifier is conservative and measurement-only.

`public_core=true` means all currently machine-checkable minimum dimensions are present. It does **not** auto-approve a record and does not prove prose quality, source interpretation quality, or absence of unresolved identity conflict.

`history_enriched=true` requires `public_core=true` plus at least one of:

- completed evidenced Occurrences in two or more distinct years;
- at least one evidenced Change Event;
- at least three completed evidenced Occurrences.

`monitored=true` means the subject has at least one approved Occurrence whose current outcome remains `scheduled` or `unknown`, creating an active freshness/review obligation.

`tradition_unit` remains visible in the legacy coverage count but is excluded from the Festival/Folk Performance `public_core` denominator under the current governing contract.

## No release threshold yet

This baseline does not define a convenient percentage that would allow bulk public publication.

Before NCS-06, the repository still needs a release guard derived from measured quality and the promotion/deepening plan. In particular:

- thin discovery candidates remain non-public;
- new public records must meet the substantive public minimum;
- existing records remain in the quality-deepening scope;
- nationwide expansion cannot consist only of new Entity creation;
- breadth expansion must stop if the bounded promotion backlog is exceeded;
- genuine source ceilings must be explicit and machine-visible.

## Immediate implication

NCS-03 and NCS-04 may proceed because source inventory and private candidate ingestion do not publish records.

NCS-06 public expansion remains blocked until the public quality gate and promotion-backlog rule are implemented.
