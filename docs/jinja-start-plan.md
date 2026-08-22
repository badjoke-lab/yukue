# Jinja activation work plan

Issue: #284

Jinja is the next specialist site. Matsuri nationwide expansion to 500/1,000 records is not a Jinja start prerequisite.

## Ordered execution

1. Refresh the generated Jinja seed inventory from current main and reconcile historical start-gate counts.
2. Validate the specialist contract in `docs/jinja-specialist-contract.md` and `config/jinja-specialist-contract.json` against the shared observation core.
3. Complete the formal Matsuri stabilization review using current production/analytics/Search Console observation status without committing private analytics values.
4. Record Portal as non-blocking unless a concrete dependency is found.
5. Update `config/jinja-start-gate.json` only when all actual prerequisites are satisfied and explicit start authorization is recorded.
6. Open a separate implementation PR creating `apps/jinja` with no hostname/Worker/public deployment unless separately authorized.
7. Seed the first bounded specialist corpus through Jinja-specific A/B/C review; never auto-promote Matsuri Relations.
8. Validate detail/search/browse/machine-readable surfaces locally/CI before any publication gate.

## Not gated on

- Matsuri reaching 500 public entities
- Matsuri reaching 1,000 public entities
- completion of continuous Matsuri Tier C deepening
- search-engine indexation itself
- Portal completion absent a demonstrated dependency

## Still gated on

- formal Matsuri stabilization review completion
- current seed/readiness refresh
- approved Jinja specialist contract
- explicit Jinja start authorization

Jiin and Tomurai are not activated by this plan.