# Specialist-site rollout schedule

Status: active planning / gate-driven

This schedule governs the rollout order for the four Yukue specialist sites while Matsuri nationwide expansion and maintenance continue in parallel.

## Series order

```text
祭のゆくえ (Matsuri)     active / continuous operation
  ↓
神社のゆくえ (Jinja)     next implementation site
  ↓
寺院のゆくえ (Jiin)      follows Jinja application-path validation
  ↓
弔いのゆくえ (Tomurai)   separately gated after Jiin relationship model is validated
```

This is a gate-driven order, not a fixed calendar deadline. Matsuri does not need to reach 500 or 1,000 public records before Jinja or Jiin planning/implementation gates can advance.

## Track A — Matsuri continuous operation

Matsuri nationwide Tier A/B/C expansion, freshness review, correction, Evidence maintenance, and Tier C deepening continue independently. Future-site work must not disable Matsuri maintenance or weaken Matsuri evidence rules.

## Track B — Jinja

### JINJA-01 — specialist contract
Status: completed by the merged Jinja specialist contract.

### JINJA-02 — start-gate closeout
Required:
- Matsuri stabilization review legitimately completed;
- Portal/Jinja order decided;
- Jinja State/Event/A-B-C/detail contract approved;
- explicit start authorization recorded.

### JINJA-03 — application implementation
After the Jinja start gate passes:
- create `apps/jinja` in a separate PR;
- reuse shared observation/projection infrastructure without copying Matsuri semantics;
- no Worker/hostname/publication unless separately authorized.

### JINJA-04 — bounded specialist corpus
- refresh Matsuri-derived shrine seeds;
- perform Jinja-specific identity/source/dedupe review;
- publish nothing merely because a Matsuri Relation exists;
- validate Jinja A/B/C classification.

### JINJA-05 — product validation
Validate detail/search/browse/machine-readable surfaces and cross-site Matsuri Relations.

### JINJA-06 — separate publication gate
Only after application and bounded corpus validation may Jinja hostname/Worker/publication be authorized.

## Track C — Jiin

Jiin planning may proceed while Jinja is being prepared, but application implementation follows successful validation of the first shared specialist-site path through Jinja.

### JIIN-01 — specialist contract
Status: defined in:

```text
docs/jiin-specialist-contract.md
config/jiin-specialist-contract.json
```

### JIIN-02 — shared-path review
After Jinja application implementation:
- identify components genuinely reusable by Jiin;
- keep shrine-specific State/Event semantics out of Jiin;
- confirm common identity/Evidence/Relation/projection interfaces.

### JIIN-03 — seed/readiness refresh
Build a current temple seed inventory from reviewed Matsuri/Jinja Relations and other authoritative temple references. Record exact identity Evidence, Place, links, and State evidence counts. Do not infer sect, State, principal image, corporation, or cemetery status.

### JIIN-04 — Jiin start gate
Required before `apps/jiin`:
- Jinja shared specialist application path validated;
- current Jiin seed/readiness refresh complete;
- Jiin identity/State/Event/A-B-C/detail contract approved;
- explicit Jiin start authorization recorded.

### JIIN-05 — application implementation
After the Jiin gate passes:
- create `apps/jiin` in a separate PR;
- add no Worker/hostname/publication unless separately authorized.

### JIIN-06 — bounded specialist corpus
- perform temple-specific identity/source/dedupe review;
- classify records independently as Jiin Tier A/B/C;
- preserve cross-site Relation provenance;
- treat cemetery/columbarium relations as separate entities/relations rather than collapsing them into temple identity.

### JIIN-07 — product validation
Validate temple detail/search/browse/machine-readable surfaces, Matsuri/Jinja cross-links, and memorial-facility relation rendering.

### JIIN-08 — separate publication gate
Only after application and bounded-corpus validation may Jiin hostname/Worker/publication be authorized.

## Track D — Tomurai

Tomurai remains separately gated. Jiin cemetery, columbarium, perpetual memorial, collective memorial, or other memorial-facility Relations are research seeds only and do not automatically become public Tomurai records.

Tomurai specification and start gate must be defined before `apps/tomurai` exists.

## Cross-site rules

Across all four sites:

- each specialist site owns its domain-specific facts;
- cross-site facts are connected through canonical Relations rather than duplicated mutable copies;
- A/B/C principles may be shared, but each site defines its own Tier A identity/source minimum and Tier B verification dimensions;
- a Relation seed never auto-promotes into another site's public record;
- unsupported fields remain absent rather than inferred;
- application creation, Worker/hostname activation, and public publication are separate gates.

## Current execution focus

```text
Matsuri maintenance/scaling        active in parallel
Jinja start-gate closeout          current next-site work
Jinja apps implementation          next after gate
Jiin contract/schedule             prepared
Jiin apps implementation           after Jinja shared-path validation + Jiin gate
Tomurai                            inactive / separately gated
```
