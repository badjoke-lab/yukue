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
F2-27 — active next gate
F2-28 — blocked by F2-27
F2-P01 through F2-P13 — completed
Actual Jinja start gate — blocked
```

F2-26 accepted the successful Cloudflare Workers deployment of the F2-25 merge commit on `main`.

```text
Source commit       108ac4e88407e1263229eb40bc88d76855e90131
Cloudflare build    7026144e-1ce0-4927-9060-64919c3a4002
Deployed at         2026-07-27T10:34:17Z
Evidence            docs/audits/matsuri-f2-26-post-activation-deployment-2026-07-27.md
```

The first attempt reached the deploy API after a successful build and asset upload but received a transient provider-side 503. Retrying the same source build succeeded. No older deployment or pull-request-head deployment was substituted.

## Current sources of truth

```text
Current repository counts       config/matsuri-repository-baseline.json
Analytics progression           config/matsuri-analytics-activation.json
F2-25 evidence                  docs/audits/matsuri-f2-25-analytics-activation-2026-07-27.md
F2-26 evidence                  docs/audits/matsuri-f2-26-post-activation-deployment-2026-07-27.md
Jinja start boundary            config/jinja-start-gate.json
Production topology             docs/deployment-topology.md
Launch closure sequence         docs/f2-26-f2-28-launch-closure.md
```

Exact current maintenance counts and launch-boundary values are machine-checked in `config/matsuri-repository-baseline.json`; this document does not duplicate those counts.

## Verified Matsuri production position

```text
Worker                    matsuri-yukue
Canonical origin          https://matsuri-yukue.badjoke-lab.com/
Permanent Workers origin  https://matsuri-yukue.badjoke-lab.workers.dev/
```

Verified production layers include HTTPS and canonical metadata, sitemap and discovery outputs, desktop/mobile Search, crawler reachability, Search Console submission evidence, Cloudflare Web Analytics Automatic setup, and the successful post-activation production deployment.

No URL is claimed already indexed. F2-26 does not prove private-dashboard traffic receipt.

## F2-27 active sequence

Visit the representative canonical routes in a normal browser:

```text
/
/festivals/
/search/
/festivals/suneori-amagoi/
```

Then confirm in the private Cloudflare Web Analytics dashboard that traffic for the canonical hostname has been received. The public F2-27 audit may record only the hostname, UTC verification time, representative routes, `traffic observed: yes`, and privacy review. Raw counts, account identity, geography, referrers, device detail, tokens, and private screenshots remain outside the repository.

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
repository-verified-crawler-reachability-verified-sitemap-submission-verified-indexability-verified-analytics-deployed-f2-27-pending-jinja-start-blocked
```

## Immediate next actions

```text
Owner track       visit the four F2-27 routes and verify traffic privately
Repository track  preserve gates and prepare the public-safe F2-27 record
Dated review      弘前ねぷた after 2026-08-07; 郡上おどり after 2026-09-05
Jinja track       remain blocked until every prerequisite is complete
```
