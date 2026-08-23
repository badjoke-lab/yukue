# Jinja implementation gate

Status: implementation authorized; public activation blocked

The Jinja application must not be held indefinitely when the owner cannot access Cloudflare Web Analytics or Google Search Console for an extended period.

This gate separates two concerns that were previously coupled:

1. **repository/local implementation readiness** — whether `apps/jinja` may be created and developed in GitHub/CI;
2. **public activation readiness** — whether a Jinja Worker, hostname/route, or public records may be activated.

## Decision

Current private Matsuri stabilization observations remain genuinely pending and must not be inferred:

- current Cloudflare Web Analytics traffic receipt;
- current Google Search Console observation.

They continue to block Matsuri stabilization completion and therefore continue to block Jinja public activation.

They do **not** block repository/local implementation of Jinja.

## What is authorized now

- create `apps/jinja` in a separate implementation PR;
- implement Jinja routes, layouts, schemas/projections and local data adapters;
- create bounded test fixtures or reviewed specialist seed data that is not publicly activated;
- run local/CI build, type, content, relation and detail-page validation;
- develop search/browse/detail/machine-readable surfaces against the approved specialist contract.

## What remains prohibited

Until the private observations are actually recorded and the existing Jinja start/publication gates are separately passed:

- no Jinja Worker activation;
- no Jinja hostname/domain/route activation;
- no public Jinja deployment;
- no claim that Matsuri stabilization is complete;
- no inference that Cloudflare/GSC checks passed;
- no automatic promotion of Matsuri shrine Relations into public Jinja records.

## Long owner absence

If owner access is unavailable for days or months, development continues under this implementation gate. Issue #297 remains an owner-action checkpoint rather than a development blocker. When access returns, record the two current observations, close Matsuri stabilization, then evaluate public activation using the existing governed gates.

Machine-readable source: `config/jinja-implementation-gate.json`.
