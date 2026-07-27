# Project Status

**Last updated:** 2026-07-27

## Current phase

```text
Execution Stage F — Launch Preparation
```

## Current gate state

```text
F2-15 — Repository Launch Readiness Gate — completed
F2-M01 — Full-page screenshot visual-review workflow — completed
F2-M02 — Matsuri data freshness audit — completed
F2-16 through F2-24 — completed
F2-25 — Cloudflare Web Analytics activation — completed
F2-26 — post-activation production deployment — completed
F2-27 — production traffic verification — completed
F2-28 — active next gate
F2-P01 through F2-P13 — completed
Actual Jinja start gate — blocked
future specialist-site implementation — not activated
```

F2-27 accepted private-dashboard confirmation that production traffic was received for the canonical Matsuri hostname after the representative routes were opened.

```text
Canonical hostname    matsuri-yukue.badjoke-lab.com
Verified at           2026-07-27T11:26:58Z
Traffic observed      yes
Evidence              docs/audits/matsuri-f2-27-production-traffic-2026-07-27.md
```

The public record does not contain raw traffic counts, account identity, geography, referrers, device detail, tokens, visitor-level data, or the private dashboard screenshot.

## Current sources of truth

```text
Current repository counts       config/matsuri-repository-baseline.json
Analytics progression           config/matsuri-analytics-activation.json
F2-25 evidence                  docs/audits/matsuri-f2-25-analytics-activation-2026-07-27.md
F2-26 evidence                  docs/audits/matsuri-f2-26-post-activation-deployment-2026-07-27.md
F2-27 evidence                  docs/audits/matsuri-f2-27-production-traffic-2026-07-27.md
Jinja start boundary            config/jinja-start-gate.json
Production topology             docs/deployment-topology.md
Launch closure sequence         docs/f2-26-f2-28-launch-closure.md
```

Exact current maintenance counts and boundary values are machine-checked in `config/matsuri-repository-baseline.json`; this document does not duplicate those counts.

## Verified Matsuri production position

```text
Worker                    matsuri-yukue
Canonical origin          https://matsuri-yukue.badjoke-lab.com/
Permanent Workers origin  https://matsuri-yukue.badjoke-lab.workers.dev/
```

Verified production layers now include canonical deployment, Search, crawler reachability, Search Console submission evidence, Cloudflare Web Analytics Automatic setup, the post-activation production deployment, and production traffic receipt.

No URL is claimed already indexed.

## F2-28 active gate

F2-28 evaluates the complete launch chain after F2-27. It requires the repository gate, canonical origin, canonical Search, crawler reachability, F2-24 indexability preflight, Analytics progression, privacy boundary, and Jinja guardrail to remain green.

F2-28 completion must not be represented as proof of search-engine indexation.

## Routine Matsuri maintenance

```text
pnpm audit:matsuri:freshness
pnpm audit:matsuri:relations
pnpm check:matsuri:evidence
pnpm check:matsuri:bundle-inventory
```

Current dated reviews:

```text
弘前ねぷた 2026   review after 2026-08-07
郡上おどり 2026   review after 2026-09-05
```

## Jinja start boundary

F2-28 completion alone will not pass the Jinja start gate.

```text
Matsuri F2-28 complete                 false
Matsuri stabilization review          false
Portal/Jinja implementation order     false
Jinja State specification approved    false
Explicit start authorization          false
```

No Jinja application, Worker, hostname, publication claim, or invented State Snapshot is authorized.

## Current release status

```text
repository-verified-crawler-reachability-verified-sitemap-submission-verified-indexability-verified-analytics-traffic-verified-f2-28-pending-jinja-start-blocked
```

## Immediate next actions

```text
Repository track  run and record F2-28 final launch gate
Dated review      弘前ねぷた after 2026-08-07; 郡上おどり after 2026-09-05
Owner track       no further Cloudflare action is required for F2-28
Jinja track       remain blocked until every start-gate prerequisite is complete
```
