# Matsuri F2-26 through F2-28 Launch Closure

**Status:** Repository preparation complete / external execution pending F2-25

## Purpose

Define the exact remaining launch sequence so the Cloudflare-dependent work can be inserted without reopening scope or inventing evidence.

## F2-26 — Post-activation deployment

F2-26 begins only after the F2-25 Analytics activation record passes validation.

Required facts:

```text
Web Analytics enabled first
production deployment occurred after activation
source commit recorded
canonical Worker deployment successful
canonical origin reachable
repository and canonical gates green
```

Accepted sequence:

1. enable Automatic setup in Cloudflare Web Analytics,
2. merge the bounded F2-25 evidence PR,
3. allow the production branch deployment for that commit to complete,
4. verify the canonical origin and required public surfaces,
5. create a sanitized F2-26 audit,
6. update the machine record to `post-activation-deployed`.

Do not treat an older deployment as post-activation evidence.

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
F2-16 through F2-24 external verification
F2-25 Analytics activation
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

## Work allowed while Cloudflare access is unavailable

- maintain the pending Analytics machine record and validator,
- keep the repository and canonical verification gates green,
- complete date-triggered festival maintenance,
- improve Source, Evidence, and Relation coverage,
- prepare public-safe evidence templates and runbooks,
- fix security and dependency issues,
- perform bounded data and documentation maintenance.

## Work that remains blocked

```text
F2-25 completion
F2-26 execution and completion
F2-27 execution and completion
F2-28 final gate completion
portal production deployment
future specialist-site production implementation
```
