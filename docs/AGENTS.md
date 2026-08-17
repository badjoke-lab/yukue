# AGENTS.md — docs/

These instructions apply to documentation under `docs/` in addition to the repository-wide `AGENTS.md`.

## Documentation role

The `docs/` directory is the public implementation reference layer.

Keep documents public-safe. Do not move private research notes or internal commercial planning into this directory.

## Document roles

Use:

- `roadmap.md` for long-range phases and gates,
- `development-schedule.md` for concrete PR and implementation order,
- `project-status.md` for current position and next gate,
- `decision-log.md` for accepted decisions and reversals,
- topical specifications for governing behavior.

For nationwide corpus expansion, bulk ingestion, public coverage metrics, or future-site seed boundaries, `nationwide-corpus-scaling.md` is the governing topical specification.

Do not duplicate the same decision across many documents unnecessarily, but do update dependent documents whose existing wording would contradict the governing decision.

## Update rules

When changing a specification:

1. preserve the document's role,
2. update cross-references when necessary,
3. record major decisions in `decision-log.md`,
4. update `project-status.md` only when current position changes,
5. update `development-schedule.md` only when implementation order materially changes,
6. update `roadmap.md`, `README.md`, and relevant product/data/verification documents when a nationwide publication rule changes.

## Nationwide A/B/C consistency

Current Matsuri nationwide terminology is:

```text
Tier A  Public Index
Tier B  Public Verified
Tier C  Public History / Monitoring
```

Documentation must not describe Tier A-equivalent reviewed source-backed records as necessarily private candidates.

The seven-day A→B value is a work target, not a global release blocker or automatic withdrawal rule.

Completed Occurrence, Change Event, and multi-year history are not Tier A publication prerequisites. Multi-year history is not a Tier B prerequisite.

Do not infer unsupported Current State, Occurrence outcome, organizer, Place, coordinates, Relation, or officiality to satisfy a tier or schedule target.

## Future-site boundary

The series design contains Matsuri, Jinja, Jiin, and Tomurai specialist sites, but only Matsuri is currently activated for implementation/publication work.

Matsuri Relation seeds do not automatically become future-site Tier A records. Do not let documentation wording imply that a future-site app, hostname, Worker, or publication is activated.

## Language

Public repository documentation may use English for implementation guidance and machine-readable specifications.

Japanese remains canonical for public record content and Japanese-facing UI labels.

## Status labels

Use explicit status language such as:

```text
Current
Accepted direction
Implementation specification
Initial baseline
Working specification
Living
Deferred
```

Avoid describing drafts as final when unresolved decisions remain.

## Consistency checks

Before merging documentation changes, verify:

- referenced paths exist,
- accepted IA names remain Home H1 and Detail C unless a decision changes,
- palette values match `ui-direction.md` and `design-tokens.md`,
- deferred features are not accidentally promoted into MVP scope,
- Public Projection safety language remains intact,
- Tier A is still public,
- A→B overdue remains non-global and non-expiring,
- candidate count is not described as public growth,
- future-site seeds are not described as automatically public specialist records.
