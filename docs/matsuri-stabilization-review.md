# Matsuri Stabilization Review

**Status:** Reviewing / incomplete

## Purpose

Phase 10 is a bounded post-launch observation and review period, not an indefinite pause and not automatic permission to build another specialist site.

The machine record is:

```text
config/matsuri-stabilization-review.json
```

The validator is:

```text
pnpm check:matsuri:stabilization-review
```

The validator also runs inside the complete repository gate.

## State model

```text
observing -> reviewing -> complete
```

- `observing`: the post-launch observation window is running. No operational review conclusion is frozen.
- `reviewing`: the minimum observation period has elapsed and one or more formal review categories have been recorded. Partial public-safe conclusions may be frozen, but the final review remains incomplete.
- `complete`: every required review category and final observation is supported by evidence and a final public-safe review audit.

A `reviewing` record must keep `reviewed_on` and `review_evidence_document` unset and must keep all completion, Phase 11, and Jinja claims false.

## Current observation window

```text
Started               2026-07-27
Minimum duration      14 days
Earliest review       2026-08-10
Minimum period        complete
Review eligible       true
Current status        reviewing
Review complete       false
```

The minimum observation period has elapsed and the formal review is now in progress. Elapsed time alone does not complete the review.

`prerequisites.minimum_observation_period_complete` records only calendar eligibility. It does not authorize Phase 11 or Jinja.

## Required review evidence

Completion requires recorded review of all of the following:

- production availability,
- canonical hostname and HTTPS,
- canonical Search behavior,
- crawler and sitemap behavior,
- current Cloudflare Web Analytics traffic receipt,
- data freshness,
- Relation coverage,
- Evidence and correction status,
- manual maintenance burden,
- Search Console observation.

A completed record also requires:

```text
unresolved critical corrections   0
production deployment failures    recorded as a non-negative count
manual maintenance burden          low or acceptable
Search Console observation         recorded
public-safe final review audit     present
```

## Current reviewing record

Public/repository review inputs already recorded:

```text
production availability          reviewed
canonical hostname / HTTPS       reviewed
canonical Search                 reviewed
crawler / sitemap                reviewed
data freshness                   reviewed
Relation coverage                reviewed
Evidence / corrections           reviewed
manual maintenance burden        reviewed
```

Current public-safe observations:

```text
known unresolved critical corrections   0
production deployment failures           1
manual maintenance burden                acceptable
```

Still pending:

```text
current Cloudflare Web Analytics traffic receipt   pending
Search Console observation                         pending
```

The supporting public-safe audits are:

```text
docs/audits/matsuri-stabilization-public-review-2026-08-11.md
docs/audits/matsuri-stabilization-maintenance-review-2026-08-12.md
```

## Critical-correction count definition

For this review, a critical correction is a **known** Matsuri correctness defect that would materially invalidate a published claim or required public contract and that remains unresolved in the tracked repository state.

Recording zero requires both:

1. no separately tracked unresolved Matsuri critical-correction issue; and
2. the current strict correction, freshness, Relation, Evidence/public-content, and repository readiness gates to be green.

The count does not claim that unknown defects can never exist. It records the known unresolved critical-correction inventory under this explicit review definition.

## Manual maintenance burden classification

The review uses this bounded classification:

- `low`: routine dated review and content maintenance with little or no corrective remediation;
- `acceptable`: corrective work occurs, but remains bounded, reproducible, and handled through normal repository contracts, correction bundles, pull requests, and gates, without correctness-gate bypass or untracked direct production-data mutation;
- anything requiring repeated gate bypass, out-of-band production mutation, unresolved critical correctness defects, or an unbounded manual repair path is not acceptable for completion.

The current window is `acceptable`, not `low`: several substantive corrective cycles occurred, but they were caught and repaired through the normal governed path.

## Production deployment-failure count

The current count is `1` for the applicable repository-recorded production deployment history during the stabilization window.

The counted failure is the first F2-26 production deployment attempt on 2026-07-27, which completed build and asset upload and then received a transient provider-side HTTP 503 while creating the deployment. Retrying the same source succeeded.

The Batch 30 screenshot/browser `ERR_CONNECTION_CLOSED` retry is not counted because it was not a production deployment failure.

## Evidence-source boundary

The formal review distinguishes evidence that can be checked from the repository or public production surface from observations that require private operational access.

Repository/public review inputs include production-route behavior, canonical/HTTPS behavior, canonical Search, crawler and sitemap behavior, freshness, Relation coverage, Evidence/correction history, deployment-history facts already preserved in public-safe audits, and documented maintenance cycles.

Private operational observation is required for **current** Cloudflare Web Analytics traffic receipt and Search Console observation. Historical F2-27 traffic evidence and F2-24 Search Console submission evidence do not automatically satisfy those current stabilization checks.

No private observation is inferred from repository evidence.

## Search-engine boundary

Search-engine indexation is not a completion requirement. The review records whether Search Console was checked, but it does not require a page to be indexed and does not claim that any page is indexed.

## Privacy boundary

Do not commit:

- private Analytics dashboard screenshots,
- raw visitor or traffic metrics,
- account identity,
- account IDs,
- email addresses,
- Analytics tokens,
- visitor-level data.

Only public-safe conclusions and non-sensitive aggregate review statements belong in the audit.

## Future-site boundary

Completing this review satisfies only the Matsuri stabilization prerequisite in the Jinja start gate. It does not decide portal/Jinja order, approve a Jinja State vocabulary, record explicit start authorization, create `apps/jinja`, or activate a Worker or hostname.

The review is currently in progress and incomplete, so the Jinja stabilization prerequisite remains false.

## Current dated maintenance

```text
山あげ祭 2026                    review when official post-event Evidence is available
鳥取しゃんしゃん祭 2026          review after 2026-08-15
さぬき高松まつり 2026           review after 2026-08-15
吉田の火祭 2026                 review after 2026-08-27
郡上おどり 2026                  review after 2026-09-05
岸和田だんじり祭 9月祭礼 2026   review after 2026-09-20
石岡のおまつり 2026             review after 2026-09-21
佐陀神能 御座替祭 2026          review after 2026-09-25
布橋灌頂会 2026                 review after 2026-09-27
岸和田だんじり祭 10月祭礼 2026  review after 2026-10-11
上野天神祭 2026                 review after 2026-10-25
宮﨑神宮大祭 2026               review after 2026-11-01
おはら祭 2026                   review after 2026-11-03
春日若宮おん祭 2026             review after 2026-12-18
```
