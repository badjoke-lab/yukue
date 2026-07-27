# Jinja Start Gate

**Status:** Matsuri F2-28 completed / Matsuri stabilization observing / actual Jinja start gate blocked by four post-launch prerequisites

## Purpose

The Matsuri corpus provides five approved Relation-backed shrine seeds with direct identity Evidence, Place references, Source provenance, Relation Evidence, a self-contained provenance bundle, and artifact contract v1. None of that authorizes creation or publication of `神社のゆくえ`.

## Machine records and validators

```text
config/jinja-start-gate.json
config/matsuri-stabilization-review.json
pnpm check:matsuri:stabilization-review
pnpm check:yukue:jinja-start-gate
```

Both validators run inside:

```text
pnpm gate:matsuri:repository
```

The Jinja stabilization prerequisite must equal the claim in `config/matsuri-stabilization-review.json`; it cannot be changed independently.

## Current state

```text
Status                               blocked-by-post-launch-prerequisites
Matsuri F2-28 complete               true
Matsuri stabilization review        false
Stabilization status                 observing
Earliest stabilization review       2026-08-10
Relation-backed Jinja seeds          5
Direct identity Evidence             9
Place references                     5
Approved shrine State Snapshots      0
Seeds with official URLs             5
Jinja start gate passed              false
Application creation authorized      false
Worker creation authorized           false
Publication authorized               false
```

F2-28 completion satisfies only the first prerequisite. The missing State Snapshot count remains explicit. Matsuri defines Shrine records only as cross-site seed Entities and does not define the Jinja State vocabulary. No Shrine State is inferred from `record_lifecycle`, a festival Relation, an official URL, or the continued existence of a source page.

## Remaining required prerequisites

Every remaining prerequisite is mandatory before the start gate can pass:

1. A Matsuri stabilization review is complete.
2. The implementation order between the series portal and Jinja is explicitly decided.
3. A Jinja-specific State specification and vocabulary are approved.
4. Explicit start authorization is recorded.

The stabilization review cannot complete before 2026-08-10 and cannot complete from elapsed time alone. It requires operational evidence, zero unresolved critical corrections, a recorded deployment-failure count, acceptable maintenance burden, and a public-safe audit.

Seed count, provenance closure, artifact-contract compliance, Evidence coverage, available source material, or F2-28 completion cannot substitute for any remaining prerequisite.

## Enforced inactive boundary

While the record remains blocked:

- `apps/jinja` must not exist,
- no Jinja Worker deployment configuration may exist,
- no `jinja-yukue` hostname may be activated,
- no Jinja public routes may be created,
- no Jinja publication claim may be made,
- no Shrine State may be invented.

The validator fails if the repository contains an early application directory, deployment configuration, activation claim, inconsistent stabilization claim, inconsistent seed baseline, private account identifier, token, or email address.

## Current seed baseline

```text
阿蘇神社
櫛田神社
佐太神社
大日霊貴神社
秩父神社
```

All five have direct identity Evidence, Place provenance, and at least one official URL. All five still require a future Jinja-specific identity, State, Source, Evidence, and maintenance review before publication.

## Cloudflare boundary

Matsuri launch closure is complete. No Jinja Cloudflare operation is authorized until the four remaining post-launch prerequisites and the actual Jinja start gate pass.
