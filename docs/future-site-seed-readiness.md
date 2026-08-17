# Yukue Future-site Seed Readiness Audit

**Status:** public readiness audit only / Jinja inactive / current machine baseline synchronized 2026-08-17

## Purpose

This document describes the public-safe future-site seed readiness layer derived from approved Matsuri records. It is not a publication gate, candidate ranking, implementation priority, or future-site activation.

The generated readiness artifact remains the detailed source for per-seed findings. The blocked Jinja start-gate record is the repository-enforced source for the current aggregate Jinja seed baseline.

## Commands

```text
pnpm audit:yukue:future-site-seeds
pnpm audit:yukue:future-site-seed-readiness
pnpm check:yukue:jinja-start-gate
```

The readiness command consumes:

```text
.artifacts/yukue-future-site-seeds/inventory.json
```

and writes:

```text
.artifacts/yukue-future-site-seed-readiness/
  readiness.json
  summary.md
```

## Historical F2-P03 baseline

The first readiness baseline on 2026-07-16 contained five relation-backed Jinja seeds.

```text
Workflow         Audit Yukue future-site seed readiness
Run ID           29479348339
Conclusion       success
Artifact ID      8367936520
Artifact digest  sha256:ddc5dcdc01978671f68de1f827b6a84fd2eebdf2939813797da920f00c7df975
```

```text
Total seeds                         5
Cross-site context complete         0
Cross-site context incomplete       5
With official URL                   4
Without official URL                1
With approved State Snapshot        0
With direct identity Evidence       0
Without direct identity Evidence    5
```

F2-P04 subsequently added direct Entity-identity Evidence for the original five shrine seeds, and F2-P09 added shrine-operated official provenance for 大日霊貴神社. Those values are historical milestones, not the current corpus size.

## Current machine-enforced Jinja seed baseline

Matsuri corpus expansion after the original five-seed audit added further approved shrine-to-Matsuri Relations. `config/jinja-start-gate.json` and `scripts/check-jinja-start-gate-record.mjs` now enforce the following current aggregate baseline:

```text
Observed on                       2026-08-11
Relation-backed Jinja seeds       26
Direct identity Evidence          30
Place references                  26
Approved shrine State Snapshots    0
Seeds with official URLs          19
```

The validator derives these counts again from the canonical Matsuri dataset. A stale manual count cannot pass the Jinja start-gate check.

The aggregate gaps therefore include:

```text
approved shrine State Snapshots    0 / 26
seeds with official URLs          19 / 26
```

This does **not** authorize filling either gap by inference. Missing State must remain absent until the Jinja State specification is approved and target-site research supports a State record. Official URLs must likewise be added only from supported public provenance.

For exact seed identities and per-seed gap details, regenerate the inventory/readiness artifacts rather than relying on the original five-name snapshot preserved in historical audit material.

## Checks

Each generated seed is checked for applicable public handoff context including:

- public Japanese summary,
- geographic scope,
- valid primary or default Place references,
- approved State Snapshot references when present,
- public Source coverage,
- approved Relation and Relation Evidence context,
- official public URL coverage,
- approved Evidence directly targeting Entity identity.

## Result classes

```text
context-complete
context-incomplete
```

`context-complete` means the existing Matsuri records provide the required cross-site context without broken references. It does not mean the record is ready for publication on Jinja, Jiin, or Tomurai.

## Boundaries

The audit does not:

- claim publication readiness,
- activate a future application,
- assign priority,
- infer missing facts,
- include private notes,
- invent a shrine State vocabulary before the Jinja specification exists,
- turn a Matsuri relationship into a complete shrine, temple, cemetery, columbarium, or burial-facility profile.

The Jinja start gate remains blocked until every prerequisite in `config/jinja-start-gate.json` is satisfied. Seed preparation is explicitly non-activating work; `apps/jinja`, Jinja Worker configuration, hostname activation, and publication remain prohibited while the gate is blocked.

## GitHub Actions

```text
Audit Yukue future-site seed readiness
```

The workflow rebuilds the seed inventory, runs the readiness audit, and uploads public-safe JSON and Markdown artifacts. It requires no Cloudflare access and deploys nothing.
