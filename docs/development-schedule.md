# Development Schedule

**Status:** F2-28 completed / Phase 10 Matsuri stabilization observing / Jinja start gate blocked

This project is gate-driven rather than deadline-driven.

## Current position

```text
Foundation through Stage E  completed
F1 corpus expansion          completed
F2-01 through F2-28          completed
F2-M01                       completed
F2-M02                       completed
F2-P01 through F2-P13        completed
Phase 9 Launch Preparation   completed
Phase 10 Stabilization       active
Stabilization review         observing
Actual Jinja start gate      blocked
```

## Completed F2 launch sequence

```text
F2-16  Cloudflare Workers Builds connection — completed
F2-17  first Workers Static Assets deployment — completed
F2-18  deployed-origin smoke verification — completed
F2-19  exact canonical Matsuri hostname decision — completed
F2-20  Custom Domain activation and HTTPS verification — completed
F2-21  canonical manifest and sitemap verification — completed
F2-22  browser Pagefind Search verification — completed
F2-23  crawler-reachability review — completed
F2-24  Search Console sitemap submission and indexability check — completed
F2-25  Cloudflare Web Analytics Automatic setup observed enabled — completed
F2-26  post-activation main production deployment — completed
F2-27  production traffic verification — completed
F2-28  final F2 Launch Gate — completed
```

F2-28 evidence:

```text
Evaluated at        2026-07-27T11:45:20Z
F2-27 merge commit  6a0ef91dad62fb7f5d65135d846b1cf6b6301d25
Audit               docs/audits/matsuri-f2-28-final-launch-gate-2026-07-27.md
Machine record      config/matsuri-f2-launch-gate.json
```

F2-28 does not claim search-engine indexation and does not authorize Jinja.

## Phase 10 stabilization review

```text
Started               2026-07-27
Minimum duration      14 days
Earliest review       2026-08-10
Status                observing
Machine record        config/matsuri-stabilization-review.json
Start audit           docs/audits/matsuri-stabilization-start-2026-07-27.md
```

Active work may include:

- date-triggered factual Matsuri maintenance,
- Source, Evidence, Relation, and correction work,
- production availability and deployment-failure observation,
- indexation and Search Console observation,
- public Search and machine-readable layer observation,
- dependency and security maintenance,
- maintenance-burden review,
- public corrections and inquiries.

Completion requires every review category, zero unresolved critical corrections, a recorded production deployment-failure count, acceptable maintenance burden, and a public-safe final audit. Reaching the date alone does not complete the gate. Search-engine indexation is not required.

Current dated reviews:

```text
弘前ねぷた 2026         review after 2026-08-07
郡上おどり 2026         review after 2026-09-05
```

## Future-site boundary

F2-28 completion satisfies only the first Jinja prerequisite.

```text
Matsuri F2-28 complete                 true
Matsuri stabilization review          false
Portal/Jinja implementation order     false
Jinja State specification approved    false
Explicit start authorization          false
```

Before Jinja implementation:

```text
1. complete the Matsuri stabilization review
2. decide portal/Jinja implementation order
3. approve Jinja State specification and vocabulary
4. record explicit start authorization
5. pass the actual Jinja start gate
6. only then create apps/jinja
```

## Work not activated

```text
portal production deployment
future specialist-site implementation
Jinja State specification approval
apps/jinja
Jinja Worker or hostname activation
Stats
Compare
dynamic API
MCP
paid API
x402 billing
D1 canonical database
real-time ingestion
complex graph visualization
```
