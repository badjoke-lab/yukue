# Matsuri Data Freshness Contract

**Status:** Active repository maintenance contract

## Purpose

The Matsuri freshness audit originally reported review candidates without failing release verification. That behavior was useful during the initial F2-M02 inventory, but after the reviewed corpus reached zero closed unresolved Occurrences and zero stale State or external-link candidates, the same behavior allowed a later regression to remain advisory only.

This contract preserves the reviewed current position while retaining the rule that audit candidates must be resolved through public Evidence rather than automatic inference.

## Commands

Human-readable candidate inventory:

```text
pnpm build:matsuri:pages
pnpm audit:matsuri:freshness
```

Reproducible fixed-date inventory:

```text
pnpm build:matsuri:pages
pnpm audit:matsuri:freshness -- --as-of YYYY-MM-DD
```

Strict repository contract:

```text
pnpm build:matsuri:pages
pnpm check:matsuri:freshness
```

The strict command uses the current UTC calendar day unless `--as-of` is supplied directly to the underlying audit script.

## Failure conditions

The strict contract fails when the generated approved Public Projection contains:

- an Occurrence whose period has closed while its outcome remains `scheduled` or `unknown`,
- a Current State observation older than the configured threshold,
- an external link whose `last_checked_at` value is older than the configured threshold.

The current default thresholds are:

```text
Current State observation  180 days
External-link check        180 days
```

An in-progress Occurrence or a future scheduled Occurrence does not fail the contract.

## Release integration

`pnpm verify:release` now enforces both:

```text
pnpm check:matsuri:freshness
pnpm check:matsuri:relations
```

The complete repository gate already calls `pnpm verify:release`, so freshness and Relation maintenance are release requirements rather than advisory output.

A focused workflow builds the Matsuri Public Projection, runs the current strict check, and confirms that a future-date stale fixture is rejected:

```text
.github/workflows/verify-matsuri-data-freshness.yml
```

The workflow runs on relevant pull requests, pushes to `main`, and manual dispatch. It does not introduce scheduled Cron monitoring.

## Failure handling

A failure is a review trigger. It does not authorize an automatic data change.

For a closed unresolved Occurrence:

1. find official or authoritative post-event Evidence,
2. distinguish held, partially held, postponed, rescheduled, cancelled, not held, and unknown,
3. update only the supported outcome,
4. do not infer a structured scale value from the fact that the event occurred.

For a stale Current State or external link:

1. inspect the existing Source and Evidence,
2. check for an official replacement or later public record,
3. preserve historical facts when no current change is supported,
4. update observation or link-maintenance metadata only after review.

## Boundaries

This contract does not:

- change any current public Entity, State, Occurrence, Source, Evidence, or link,
- infer an outcome, State, or scale value,
- require live external URL reachability in CI,
- add scheduled monitoring infrastructure,
- activate F2-25 through F2-28,
- authorize a future specialist-site implementation or Jinja State specification.
