# Matsuri F2-26 through F2-28 Launch Closure

**Status:** F2-27 completed / F2-28 active next gate

## Completed baseline

```text
F2-25 Analytics observation
2026-07-27T09:37:29Z

F2-26 source commit
108ac4e88407e1263229eb40bc88d76855e90131

F2-26 Cloudflare build
7026144e-1ce0-4927-9060-64919c3a4002

F2-26 deployed at
2026-07-27T10:34:17Z

F2-27 traffic verified at
2026-07-27T11:26:58Z

F2-27 traffic observed
yes
```

Evidence:

```text
docs/audits/matsuri-f2-25-analytics-activation-2026-07-27.md
docs/audits/matsuri-f2-26-post-activation-deployment-2026-07-27.md
docs/audits/matsuri-f2-27-production-traffic-2026-07-27.md
```

## F2-27 result

The following representative canonical routes were opened after F2-26:

```text
/
/festivals/
/search/
/festivals/suneori-amagoi/
```

A private Cloudflare Web Analytics review then confirmed production traffic for the canonical hostname. The public record contains only hostname, UTC verification time, route inventory, `traffic observed: yes`, and privacy review.

Raw page-view counts, visitor counts, geography, referrers, device detail, account identity, tokens, visitor-level data, and dashboard screenshots remain private.

## F2-28 — Final F2 Launch Gate

F2-28 now requires all of the following:

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
Analytics progression record green
no private evidence committed
Jinja start gate remains blocked until its separate prerequisites pass
```

F2-28 must not claim Google or other search-engine indexation. Search Console submission and technical indexability remain separate from actual indexed state.

## Remaining blocked work

```text
F2-28 completion until the final gate passes
portal production deployment
future specialist-site production implementation
Jinja application, Worker, hostname, or publication
```
