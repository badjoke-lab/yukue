# Matsuri Data Freshness Audit

**Status:** F2-M02 active / initial candidate inventory completed

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

## Automated inventory

Run after the Matsuri static build:

```text
pnpm audit:matsuri:freshness
```

Fixed audit date:

```text
pnpm audit:matsuri:freshness -- --as-of 2026-07-12
```

JSON output:

```text
pnpm audit:matsuri:freshness -- --as-of 2026-07-12 --json
```

The command reads the generated approved Public Projection under `apps/matsuri/dist/data`. It reports review candidates but does not automatically change canonical records or fail merely because candidates exist. It fails on missing feeds, malformed dates, unsupported temporal values, or invalid date ranges.

## Initial inventory result

Audit report:

```text
docs/audits/matsuri-f2-m02-candidate-inventory-2026-07-12.md
```

Summary:

```text
Occurrences total                  24
Resolved Occurrences               14
Closed-period unresolved            1
In-progress scheduled               2
Future scheduled                    7

Entities total                     41
Current State snapshots checked    23
Stale Current State candidates      0

External links checked             40
Stale external-link candidates      0
```

The single closed-period unresolved candidate is:

```text
occ-soma-2026-schedule
相馬野馬追
2026-05-23 through 2026-05-25
outcome: unknown
scale: unknown
```

The official 2026 schedule confirms the planned dates and program, but the first evidence pass did not locate an authoritative post-event record sufficient to classify the outcome of the entire multi-day occurrence. The record therefore remains `unknown` rather than being changed by inference.

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

The Workers origin may be used to check representative routes, internal navigation, Pagefind loading, machine-readable files, 404 behavior, static assets, and desktop/mobile rendering.

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
1. candidate inventory — completed for 2026-07-12 baseline
2. evidence review notes — active
3. approved data corrections in bounded batches — pending evidence
4. validation results — automated on each repository gate
5. updated audit summary — maintained during F2-M02
```

## Next review points

```text
相馬野馬追 2026  continue authoritative post-event evidence search
博多祇園山笠 2026  review after 2026-07-15
郡上おどり 2026    review after 2026-09-05
```

## Completion condition

F2-M02 is complete when:

- all currently approved non-future `scheduled` and unresolved `unknown` Occurrences have been reviewed,
- stale Current State candidates have been reviewed,
- material Source, Evidence, and Relation defects found during the audit are corrected or explicitly documented,
- the full repository gate passes,
- the audit records remaining known limitations without overstating completeness.
