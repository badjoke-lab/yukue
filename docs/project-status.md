# Project Status

**Last updated:** 2026-07-27

## Role of this document

This file records the current project position, active blockers, operating boundaries, and immediate next actions.

Exact current maintenance counts and launch-boundary values are machine-checked in:

```text
config/matsuri-repository-baseline.json
```

The explanatory contract is:

```text
docs/matsuri-repository-baseline.md
```

Historical workflow runs, artifact identifiers, digests, and counts remain in the dated audit documents that verified them. They are not duplicated here as current values.

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
F2-26 — active next gate
F2-P01 through F2-P13 — completed
F2-27 through F2-28 — operational hold
Actual Jinja start gate — blocked
```

F2-25 was completed from a private owner-dashboard review that proved the existing zone-level Automatic setup was enabled. The public audit records only the canonical hostname, provider, mode, first verified UTC observation, and privacy-safe result. The historical initial enablement time was unavailable and is not invented.

F2-26 is now the next external gate. It requires a successful production deployment of the `main` commit produced by merging the F2-25 evidence change. Pull-request-head deployments and deployments predating the recorded F2-25 observation are not accepted as F2-26 evidence.

## Current sources of truth

```text
Current repository counts       config/matsuri-repository-baseline.json
Analytics and F2-25 state       config/matsuri-analytics-activation.json
F2-25 public-safe evidence      docs/audits/matsuri-f2-25-analytics-activation-2026-07-27.md
Jinja start boundary            config/jinja-start-gate.json
Production topology             docs/deployment-topology.md
Launch closure sequence         docs/f2-26-f2-28-launch-closure.md
Historical verification         docs/audits/
```

The repository gate must fail when the current machine baseline no longer matches the canonical loader, correction bundles, public Entity projection, Analytics record, or Jinja start-gate record.

## Verified Matsuri production position

```text
Worker                    matsuri-yukue
Canonical origin          https://matsuri-yukue.badjoke-lab.com/
Permanent Workers origin  https://matsuri-yukue.badjoke-lab.workers.dev/
```

The custom domain is canonical. The permanent Workers origin remains non-canonical.

Verified production layers include:

- HTTPS and canonical metadata,
- sitemap and public discovery outputs,
- desktop and mobile browser Search,
- crawler reachability,
- Search Console sitemap submission,
- a representative Google live test,
- indexing requests recorded as submitted,
- Cloudflare Web Analytics Automatic setup observed enabled.

No URL is claimed already indexed. F2-25 does not yet prove a post-activation production deployment or dashboard traffic receipt.

## Accepted topology

```text
yukue.badjoke-lab.com           Yukue Series portal — planned
matsuri-yukue.badjoke-lab.com   祭のゆくえ — canonical production verified
```

```text
apps/portal   → Worker yukue-portal
apps/matsuri  → Worker matsuri-yukue
```

The portal and Matsuri remain separate deployments. Matsuri is not nested under a portal path. No Jinja application or Worker is active.

## Completed repository position

The current repository baseline includes:

- the published Matsuri corpus and approved Public Projection,
- shared twelve-family canonical dataset assembly,
- one shared complete-record correction engine,
- exact bundle inventory and application-order verification,
- Source and Evidence validation,
- Relation and future-site seed provenance checks,
- canonical metadata, browser, accessibility, content, and crawler verification,
- F2-24 Search Console evidence,
- F2-25 Analytics activation-state validation and public-safe evidence,
- a blocked Jinja start-gate guardrail,
- a machine-checked current repository baseline.

## Routine Matsuri maintenance

Determine current maintenance candidates from the repository audits rather than copying transient totals into this document.

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

Until post-event Evidence is reviewed, a scheduled Occurrence must not be silently converted to `held`, `cancelled`, or another outcome.

## Cloudflare-dependent sequence

```text
F2-25  Cloudflare Web Analytics activation — completed
F2-26  post-activation production deployment — active next gate
F2-27  production traffic verification — blocked by F2-26
F2-28  final F2 Launch Gate — blocked by F2-27
```

Accepted continuation:

1. merge the sanitized F2-25 evidence and machine-state change,
2. allow the resulting `main` commit to deploy through the existing Cloudflare Git integration,
3. verify the canonical origin and required public gates as F2-26,
4. visit the representative public routes and confirm private-dashboard traffic as F2-27,
5. run F2-28.

Private Analytics counts, account identity, tokens, visitor-level data, and dashboard exports remain outside the public repository.

## Jinja start boundary

F2-28 completion alone will not pass the Jinja start gate.

Required prerequisites remain incomplete:

```text
Matsuri F2-28 complete                 false
Matsuri stabilization review          false
Portal/Jinja implementation order     false
Jinja State specification approved    false
Explicit start authorization          false
```

The repository must continue to reject:

- an early `apps/jinja` application,
- Jinja Worker or hostname activation,
- publication claims,
- invented Jinja State Snapshots,
- inferred State created only to fill a seed gap.

## Parallel-work boundary

Allowed while F2-26 is pending:

- factual and date-triggered Matsuri maintenance,
- Source, Evidence, Relation, seed-provenance, provenance-bundle, and artifact-contract maintenance,
- dependency and security maintenance,
- repairs required to keep repository gates green,
- public-safe F2-26 through F2-28 execution and evidence maintenance,
- maintenance of the blocked Jinja start-gate record.

Not activated:

- F2-26 through F2-28 completion claims before their evidence exists,
- manual Analytics beacon code,
- portal production deployment,
- future specialist-site implementation,
- Jinja State specification or application creation,
- Stats, Compare, dynamic API, MCP, paid API, x402, D1, real-time ingestion, or complex graph visualization.

## Repository gate

```text
pnpm gate:matsuri:repository
```

The gate includes dependency and workflow supply-chain checks, the machine repository baseline, exact bundle inventory and order, canonical dataset and correction contracts, static and browser verification, public-data semantics, Analytics-state validation, and the Jinja start-gate guardrail.

## Current release status

```text
repository-verified-crawler-reachability-verified-sitemap-submission-verified-indexability-verified-analytics-enabled-f2-26-pending-jinja-start-blocked
```

## Immediate next actions

```text
Repository track  merge F2-25 evidence and verify the resulting main deployment as F2-26
Dated review      弘前ねぷた 2026 after 2026-08-07; 郡上おどり 2026 after 2026-09-05
Owner track       no further dashboard action until F2-27 traffic verification
Jinja track       remain blocked until every start-gate prerequisite is complete
```
