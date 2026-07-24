# Matsuri Relation Coverage Contract

**Status:** Active repository maintenance contract

## Purpose

The Matsuri Relation coverage audit originally produced review candidates without failing the repository gate. After the reviewed corpus reached zero known Relation coverage gaps, a later data change could reintroduce one of those gaps while hosted CI still passed.

This contract preserves the reviewed zero-gap repository position without inferring or generating Relations automatically.

## Commands

Human-readable review inventory:

```text
pnpm audit:matsuri:relations
```

JSON review inventory:

```text
pnpm audit:matsuri:relations -- --json
```

Strict repository contract:

```text
pnpm check:matsuri:relations
```

The strict command runs the same canonical audit with `--require-clean` and exits unsuccessfully when any guarded gap is present.

## Guarded gaps

The contract rejects:

- a festival, folk performance, or tradition unit with no Relation,
- an Occurrence organizer reference without the matching directed `organized_by` Relation,
- a specialist Entity and shrine or temple sharing canonical Place context without an explicit reviewed Relation,
- a Relation with no Evidence reference.

These checks preserve existing reviewed coverage. They do not authorize a Relation based only on geographic proximity, shared Place IDs, name similarity, or an organizer field.

## Repository integration

The strict check is included in:

```text
pnpm gate:matsuri:repository
```

A focused workflow also runs when the canonical Matsuri dataset, corrections, audit implementation, package scripts, or workflow contract changes:

```text
.github/workflows/verify-matsuri-relation-coverage.yml
```

## Failure handling

A failed contract is a review trigger, not permission to insert an inferred Relation.

For each reported gap:

1. inspect the relevant public Source and Evidence,
2. determine whether a precise Relation is supported,
3. add or correct reviewed records only when the Evidence supports them,
4. otherwise correct the source record that created the false expectation or document the bounded no-change decision,
5. rerun the focused contract and the full repository gate.

## Boundaries

This contract does not:

- change any current public Entity, Relation, Evidence, State, or Occurrence,
- require live external URL reachability,
- activate F2-25 through F2-28,
- authorize a Jinja State specification, application, Worker, hostname, or publication,
- create future-site data from Place coincidence alone.
