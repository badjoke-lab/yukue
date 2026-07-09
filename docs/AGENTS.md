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

Do not duplicate the same decision across many documents unnecessarily.

## Update rules

When changing a specification:

1. preserve the document's role,
2. update cross-references when necessary,
3. record major decisions in `decision-log.md`,
4. update `project-status.md` only when current position changes,
5. update `development-schedule.md` only when implementation order materially changes.

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
- Public Projection safety language remains intact.
