# F2-P06 Jinja Start-gate Guardrail Audit

**Date:** 2026-07-16  
**Result:** Passed — repository guardrail complete / actual Jinja start gate not passed

## Scope

F2-P06 introduces a machine-readable and CI-enforced boundary between Relation-backed Jinja seed preparation and actual `神社のゆくえ` implementation.

It does not authorize an application, Worker, hostname, route, publication, State vocabulary, or future-site launch.

## Hosted verification

```text
Workflow     Verify Jinja start-gate record
Run          29491745147
Conclusion   success
```

Initial head:

```text
b0363a90548163d19038401dfeab245ad1900ebd
```

The dedicated validator confirmed:

```text
Status                               blocked-by-matsuri-launch-closure
Relation-backed Jinja seeds          5
Direct identity Evidence             5
Place references                     5
Approved shrine State Snapshots      0
Seeds with official URLs             4
Jinja start gate passed              false
Application creation authorized      false
Worker creation authorized           false
Publication authorized               false
```

## Required prerequisites retained as incomplete

```text
Matsuri F2-28 complete                 false
Matsuri stabilization review          false
Portal/Jinja implementation order     false
Jinja State specification approved    false
Explicit start authorization          false
```

Every prerequisite remains mandatory. Seed coverage cannot substitute for any of them.

## Repository enforcement

F2-P06 adds:

```text
config/jinja-start-gate.json
scripts/check-jinja-start-gate-record.mjs
.github/workflows/verify-jinja-start-gate.yml
docs/jinja-start-gate.md
```

The validator is also included in:

```text
pnpm gate:matsuri:repository
```

It rejects:

- `apps/jinja` before authorization,
- Jinja Worker or deployment configuration,
- `jinja-yukue` activation in deployment configuration,
- false start-gate or publication claims,
- inferred shrine State,
- inconsistent seed counts,
- missing Evidence, Source, or Place references,
- private account identifiers, email addresses, or tokens.

## Regression verification

The same initial head also passed:

```text
CI                                         29491745016 — success
Matsuri Analytics activation record        29491745010 — success
Future-site seed inventory                 29491745009 — success
Future-site seed readiness                 29491745122 — success
Canonical Search                           29491745049 — success
Full-page screenshots                      29491745088 — success
F2-24 indexability preflight                29491745025 — success after cancelled-job rerun
```

The first F2-24 preflight attempt was cancelled by the runner before execution and was rerun successfully. It was not treated as passing evidence until the rerun completed.

## Conclusion

F2-P06 is complete as a repository preparation task. The actual Jinja start gate remains blocked. Cloudflare-dependent F2-25 through F2-28 are unchanged, and `神社のゆくえ` implementation remains unauthorized.
