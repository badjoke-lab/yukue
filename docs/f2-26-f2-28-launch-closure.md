# Matsuri F2-26 through F2-28 Launch Closure

**Status:** F2-26 completed / F2-27 active next gate

## Completed baseline

```text
F2-25 Analytics observation
2026-07-27T09:37:29Z

evidence
docs/audits/matsuri-f2-25-analytics-activation-2026-07-27.md

F2-26 source commit
108ac4e88407e1263229eb40bc88d76855e90131

F2-26 Cloudflare build
7026144e-1ce0-4927-9060-64919c3a4002

F2-26 deployed at
2026-07-27T10:34:17Z

evidence
docs/audits/matsuri-f2-26-post-activation-deployment-2026-07-27.md
```

The accepted deployment used the `main` merge commit created after F2-25. A first provider-side deployment call returned 503 after successful build and asset upload; retrying the same source build succeeded. No older deployment or pull-request-head deployment was accepted.

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

Do not publish raw page-view counts, visitor counts, geography, referrers, device detail, account identity, tokens, visitor-level data, or dashboard screenshots.

After private verification:

1. create `docs/audits/matsuri-f2-27-production-traffic-2026-07-27.md`,
2. update `config/matsuri-analytics-activation.json` to `traffic-verified`,
3. set F2-27 complete while leaving F2-28 separate,
4. run the Analytics validator and complete repository gate,
5. merge only after all triggered hosted checks pass.

## F2-28 — Final F2 Launch Gate

F2-28 requires all of the following:

```text
F2-15 repository readiness
F2-M01 visual review
F2-M02 data freshness baseline
F2-16 through F2-27 external verification
canonical origin gate green
canonical Search gate green
crawler reachability gate green
F2-24 indexability preflight green
repository gate green
no private evidence committed
```

F2-28 must not claim Google indexation. Search Console submission and technical indexability remain separate from actual indexed state.

## Work that remains blocked

```text
F2-27 completion until private traffic is verified
F2-28 completion until F2-27 passes
portal production deployment
future specialist-site production implementation
Jinja application, Worker, hostname, or publication
```
