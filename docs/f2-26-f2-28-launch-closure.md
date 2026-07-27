# Matsuri F2-26 through F2-28 Launch Closure

**Status:** F2-25 completed / F2-26 active next gate

## Purpose

Define the exact remaining launch sequence after the public-safe F2-25 Cloudflare Web Analytics activation record passed.

## F2-25 completed baseline

```text
Provider
Cloudflare Web Analytics

Activation method
automatic setup

First verified enabled observation
2026-07-27T09:37:29Z

Evidence
docs/audits/matsuri-f2-25-analytics-activation-2026-07-27.md
```

The exact historical activation instant was unavailable. The recorded timestamp proves that the pre-existing Automatic setup was active at or before the first verified observation and does not invent an older exact time.

## F2-26 — Post-activation deployment

F2-26 begins after the F2-25 Analytics activation record passes validation and the bounded F2-25 PR is merged.

Required facts:

```text
Web Analytics enabled first
production deployment occurred after the recorded F2-25 observation
source commit is the F2-25 merge commit or a later main commit
canonical Worker deployment successful
canonical origin reachable
repository and canonical gates green
```

Accepted sequence:

1. merge the bounded F2-25 evidence PR,
2. allow the existing Cloudflare Git integration to deploy that resulting `main` commit,
3. verify the exact source commit and successful deployment,
4. verify the canonical origin and required public surfaces,
5. create a sanitized F2-26 audit,
6. update the machine record to `post-activation-deployed`.

Do not treat an older deployment or a pull-request-head deployment as post-activation evidence.

## F2-27 — Production traffic verification

F2-27 begins only after F2-26 passes.

Visit at least:

```text
/
/festivals/
/search/
/festivals/suneori-amagoi/
```

Then verify in the private Cloudflare Web Analytics dashboard that production traffic is being received for the canonical hostname.

The public audit records only:

- canonical hostname,
- UTC verification time,
- traffic observed: yes,
- representative public routes visited,
- privacy review passed.

Do not publish raw page-view counts, visitor counts, geography, referrers, device detail, account identity, or dashboard screenshots.

## F2-28 — Final F2 Launch Gate

F2-28 remains a separate evaluation after F2-27. It requires all of the following:

```text
F2-15 repository readiness
F2-M01 visual review
F2-M02 data freshness baseline
F2-16 through F2-25 external verification
F2-26 post-activation deployment
F2-27 production traffic verification
canonical origin gate green
canonical Search gate green
crawler reachability gate green
F2-24 indexability preflight green
repository gate green
no private evidence committed
```

F2-28 must not claim Google indexation. Search Console submission and technical indexability remain separate from actual indexed state.

## Work allowed while F2-26 is pending

- verify and merge the bounded F2-25 evidence change,
- maintain the Analytics machine record and validator,
- keep the repository and canonical verification gates green,
- complete date-triggered festival maintenance,
- improve Source, Evidence, and Relation coverage,
- prepare public-safe F2-26 and F2-27 evidence,
- fix security and dependency issues,
- perform bounded data and documentation maintenance.

## Work that remains blocked

```text
F2-26 completion until the post-merge main deployment succeeds
F2-27 execution and completion until F2-26 passes
F2-28 final gate completion until F2-27 passes
portal production deployment
future specialist-site production implementation
```
