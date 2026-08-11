# Matsuri Stabilization Review

**Status:** Observing / review eligible

## Purpose

Phase 10 is a bounded post-launch observation period, not an indefinite pause and not automatic permission to build another specialist site.

The machine record is:

```text
config/matsuri-stabilization-review.json
```

The validator is:

```text
pnpm check:matsuri:stabilization-review
```

The validator also runs inside the complete repository gate.

## Current observation window

```text
Started               2026-07-27
Minimum duration      14 days
Earliest review       2026-08-10
Minimum period        complete
Review eligible       true
Current status        observing
Review complete       false
```

The minimum observation period has elapsed, so a formal review is eligible to occur. Elapsed time alone does not complete the review.

`prerequisites.minimum_observation_period_complete` records only this calendar eligibility. It does not imply that any operational review category has been completed, does not set `reviewed_on`, and does not authorize Phase 11 or Jinja.

## Required review evidence

Completion requires recorded review of all of the following:

- production availability,
- canonical hostname and HTTPS,
- canonical Search behavior,
- crawler and sitemap behavior,
- Cloudflare Web Analytics traffic receipt,
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
public-safe review audit           present
```

## Evidence-source boundary for the eligible review

The formal review should distinguish evidence that can be checked from the repository or public production surface from observations that require private operational access.

Repository/public review inputs include production-route behavior, canonical/HTTPS behavior, canonical Search, crawler and sitemap behavior, freshness, Relation coverage, Evidence/correction history, and documented maintenance cycles. Existing launch or maintenance evidence may be used as review input, but previous gate success does not automatically mark a stabilization review category complete.

Private operational observation is required for current Cloudflare Web Analytics traffic receipt and Search Console observation. A production deployment-failure count must likewise be based on the applicable deployment history rather than inferred from elapsed time or unrelated repository checks.

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

The review is currently eligible but incomplete, so the Jinja stabilization prerequisite remains false.

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
