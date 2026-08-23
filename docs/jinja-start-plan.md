# Jinja activation work plan

Issue: #284

Jinja is the next specialist site. Matsuri nationwide expansion to 500/1,000 records is not a Jinja start prerequisite.

## Two separate gates

Jinja now separates **repository/local implementation** from **public activation**.

- `config/jinja-implementation-gate.json` controls whether `apps/jinja` may be created and developed locally/in CI.
- `config/jinja-start-gate.json` continues to control the later public-activation path together with Matsuri stabilization completion.

Private owner-only observations such as current Cloudflare Web Analytics and Google Search Console checks must never be inferred. If owner access is unavailable for an extended period, those checks remain pending but do not freeze repository/local Jinja development.

## Ordered execution

1. Refresh the generated Jinja seed inventory from current main and reconcile historical start-gate counts.
2. Validate the specialist contract in `docs/jinja-specialist-contract.md` and `config/jinja-specialist-contract.json` against the shared observation core.
3. Confirm the repository-visible Matsuri stabilization inputs and record any private owner-only observations as pending when access is unavailable; do not fabricate them.
4. Record Portal as non-blocking unless a concrete dependency is found.
5. Use `config/jinja-implementation-gate.json` to authorize repository/local implementation independently of pending private observations.
6. Open a separate implementation PR creating `apps/jinja` with no hostname/Worker/public deployment.
7. Seed the first bounded specialist corpus through Jinja-specific A/B/C review; never auto-promote Matsuri Relations.
8. Validate detail/search/browse/machine-readable surfaces locally/CI.
9. When owner access returns, record the current Cloudflare Web Analytics and Search Console observations, complete Matsuri stabilization, and then update `config/jinja-start-gate.json` for any later public activation step.

## Not gated on for repository/local implementation

- Matsuri reaching 500 public entities
- Matsuri reaching 1,000 public entities
- completion of continuous Matsuri Tier C deepening
- search-engine indexation itself
- Portal completion absent a demonstrated dependency
- owner access to Cloudflare Web Analytics
- owner access to Google Search Console
- formal Matsuri stabilization completion when the only remaining items are those private owner-only observations

## Still gated before repository/local implementation

- current seed/readiness review
- approved Jinja specialist contract
- Jinja State specification approval
- Portal/Jinja ordering decision
- explicit Jinja implementation authorization
- repository-visible Matsuri stabilization inputs reviewed

## Still gated before public activation

- actual required private operational observations
- formal Matsuri stabilization completion
- the existing Jinja start/publication gate
- separate Worker/hostname/publication authorization

Jiin and Tomurai are not activated by this plan.