# Jiin activation work plan

寺院のゆくえ is the specialist site after Jinja in the default series implementation order.

This plan does not activate Jiin. It defines the conditions and execution order that must be satisfied before `apps/jiin` exists.

## Ordered execution

1. Complete the Jinja start gate and create/validate the first Jinja specialist application path.
2. Confirm which shared application/data/projection components can be reused without copying shrine-specific semantics into Jiin.
3. Refresh the Jiin seed inventory from current Matsuri/Jinja Relations and any reviewed temple references.
4. Record exact temple seed counts, identity Evidence, Place references, authoritative/official links, and approved temple State references without inference.
5. Validate `docs/jiin-specialist-contract.md` and `config/jiin-specialist-contract.json` against the shared observation core.
6. Define and check a machine-readable Jiin start gate.
7. Record explicit Jiin start authorization only after the above prerequisites are genuinely satisfied.
8. Open a separate implementation PR creating `apps/jiin`; do not create hostname/Worker/public deployment unless separately authorized.
9. Build a bounded specialist corpus through Jiin-specific A/B/C review; never auto-promote cross-site Relations.
10. Validate detail/search/browse/machine-readable surfaces locally and in CI before any publication gate.
11. Add cross-site links back to Matsuri and Jinja only through explicit canonical Relations.
12. Keep Tomurai separately gated; Jiin cemetery/columbarium Relations become research seeds, not automatic Tomurai records.

## Jiin-specific pre-application gates

Required before `apps/jiin`:

- Jinja specialist application path validated for shared reuse
- current Jiin seed/readiness refresh complete
- Jiin specialist identity contract approved
- Jiin State/Event contract approved
- Jiin A/B/C contract approved
- detail-page projection approved
- explicit Jiin start authorization recorded

## Not gated on

Jiin does not require:

- Matsuri reaching 500 or 1,000 public entities
- completion of all Matsuri Tier C deepening
- completion of every Jinja Tier C history record
- search-engine indexation itself
- Tomurai design completion

## Publication remains separate

Creating `apps/jiin` does not itself authorize production publication. Application creation, hostname/Worker activation, and public corpus publication remain separate gates.

## Default series sequence

```text
Matsuri continuous operation
  ↓
Jinja start gate → Jinja application path validation
  ↓
Jiin seed/readiness refresh → Jiin start gate
  ↓
apps/jiin implementation
  ↓
Jiin bounded corpus + public-surface validation
  ↓
separate Jiin publication gate
  ↓
Tomurai remains separately gated
```
