# Development Schedule

**Status:** F2-28 completed / Detail C completed / Matsuri corpus expansion active / stabilization observing / Jinja blocked

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
Phase 10A Detail C repair    completed
Phase 10B Corpus expansion   active
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

F2-28 does not claim search-engine indexation and does not authorize Jinja.

## Phase 10A — Detail C repair

Status: **Completed**

The post-launch review found that the accepted Detail C information architecture existed in specification but the public implementation exposed only one full Festival detail page. Most other public names were plain text or list-anchor destinations.

The repair requires and verifies:

```text
all Festival and Tradition Unit detail pages
all Folk Performance detail pages
all Organization detail pages
State-free Shrine and Temple seed-reference pages
Place pages with reverse links
grouped and bidirectional Relations
claim-linked Evidence and Sources
direct individual JSON
Pagefind results that open real details
complete sitemap coverage
static and Chromium navigation checks
```

Governing contract:

```text
docs/matsuri-detail-c-implementation.md
pnpm check:matsuri:detail-navigation
```

## Phase 10B — Matsuri corpus expansion

Status: **Active**

The next primary work is not passive uptime observation. It is to turn the public corpus into a useful archive by adding and deepening approved records.

Active work includes:

- adding Festivals and Folk Performances across more regions,
- prioritizing suspension, revival, discontinuation, format change, venue change, organizer change, and other non-trivial histories,
- adding Year-by-Year Occurrences rather than only identity records,
- strengthening Current State explanations and verification dates,
- adding Organizations, Places, Shrines, and Temples only where useful Relations are supported,
- linking each State, Change, Occurrence, Relation, Designation, identity, and location claim to Evidence and Source context,
- applying corrections through the canonical correction contract,
- recording the actual time and difficulty of maintenance work.

Data volume alone is not the gate. Records must provide current position, time history, navigable relationships, and evidence.

## Parallel stabilization review

```text
Started               2026-07-27
Minimum duration      14 days
Earliest review       2026-08-10
Status                observing
Machine record        config/matsuri-stabilization-review.json
Start audit           docs/audits/matsuri-stabilization-start-2026-07-27.md
```

Stabilization observes production availability, deployment failures, canonical and HTTPS behavior, Search, crawler and sitemap behavior, Analytics receipt, Search Console, corrections, freshness, Relation integrity, and maintenance burden.

Reaching the date alone does not complete the gate. Maintenance burden must be judged from real corpus and correction work, not from leaving a small static site untouched.

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
1. expand and deepen the Matsuri corpus while operating the completed Detail C surface
2. complete the Matsuri stabilization review with real maintenance evidence
3. decide portal/Jinja implementation order
4. approve Jinja State specification and vocabulary
5. record explicit start authorization
6. pass the actual Jinja start gate
7. only then create apps/jinja
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
