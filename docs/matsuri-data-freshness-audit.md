# Matsuri Data Freshness Audit

**Status:** F2-M02 active

## Purpose

F2-M02 keeps the public Matsuri corpus accurate while domain-dependent launch work is paused.

The audit is independent from the custom-domain, canonical-origin, sitemap-submission, and Analytics sequence. It may use the verified Workers deployment as an operational reference, but it must not treat that hostname as the canonical public origin.

## Verified deployment baseline

```text
Permanent Workers origin
https://matsuri-yukue.badjoke-lab.workers.dev/

Verified deployment origin
https://f757f092-matsuri-yukue.badjoke-lab.workers.dev/

GitHub Actions deployed-origin verification
run 29182976642 — success

Verified source commit
f6fdd5055c2712838ef30ed54048abf7f0674b4c
```

F2-16 through F2-18 are complete. F2-19 through F2-28 remain on operational hold until custom-domain work can resume.

## Audit scope

### 1. Occurrence outcome review

Review every approved Occurrence whose scheduled or effective date is not in the future and whose outcome remains:

```text
scheduled
unknown
```

For each candidate:

1. check official or authoritative evidence,
2. determine whether the occurrence was held, partially held, postponed, rescheduled, cancelled, not held, or remains unknown,
3. update the Occurrence only when evidence supports the result,
4. preserve the distinction between annual outcome and long-term Entity state,
5. add or update Evidence targets.

### 2. Current State freshness review

Review approved State Snapshots for:

- old `observed_at` values,
- missing or weak basis evidence,
- later official changes,
- conflicts between current page language and the latest approved snapshot,
- state claims derived incorrectly from a single cancelled occurrence.

A stale observation is an audit candidate, not automatic proof that the state changed.

### 3. Source and Evidence review

Check:

- current accessibility of cited URLs,
- official replacement URLs,
- source title and publisher accuracy,
- whether Evidence targets the exact assertion it supports,
- whether a secondary source can be replaced or supplemented by an official source,
- whether archived evidence is needed for an unavailable historical page.

### 4. Relation review

Prioritize Relations that improve future cross-site reuse:

```text
festival → shrine
festival → temple
festival → organization
festival → folk performance
festival → tradition unit
organization → maintained tradition
```

Each Relation must remain directed, evidence-backed, and time-bounded when the source supports a validity period.

### 5. Deployed-environment maintenance review

The Workers origin may be used to check:

- representative public routes,
- internal navigation,
- Pagefind loading,
- machine-readable files,
- 404 behavior,
- static asset loading,
- desktop and mobile rendering.

These checks are maintenance evidence only. They do not complete F2-21 through F2-24 because no canonical custom domain is configured.

## Explicit exclusions

F2-M02 must not:

- attach or choose the final custom domain,
- set `MATSURI_PUBLIC_ORIGIN`,
- declare the Workers origin canonical,
- submit a sitemap to a search engine,
- enable Cloudflare Web Analytics,
- claim F2-19 through F2-28 completion,
- add unrelated product scope.

## Deliverables

```text
1. candidate inventory
2. evidence review notes
3. approved data corrections in bounded batches
4. validation results
5. updated audit summary
```

Data changes remain subject to the normal canonical-data review, schema validation, referential-integrity checks, Public Projection safety checks, browser checks, and repository gate.

## Completion condition

F2-M02 is complete when:

- all currently approved non-future `scheduled` and unresolved `unknown` Occurrences have been reviewed,
- stale Current State candidates have been reviewed,
- material Source, Evidence, and Relation defects found during the audit are corrected or explicitly documented,
- the full repository gate passes,
- the audit records remaining known limitations without overstating completeness.
