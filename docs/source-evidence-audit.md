# Source and Evidence Audit

**Status:** F2 repository baseline

## Purpose

The Source and Evidence audit verifies that launch-critical public assertions are supported by public, reviewable records rather than only by structurally valid references.

Run:

```text
pnpm check:matsuri:evidence
```

The audit is also included in:

```text
pnpm verify:matsuri:pages
pnpm verify:release
```

## Source requirements

Every public Source must provide:

- a usable title,
- a publisher,
- a language marker,
- a public HTTP or HTTPS URL,
- a valid access date,
- no local, placeholder, or credential-bearing URL.

When an archive URL is present, it must also be a valid public HTTP or HTTPS URL.

Source publication, update, and access dates must not occur after the audit date.

Every Source must be referenced by at least one public Evidence record, Entity name, or Place record. Unused Sources are not retained in the launch dataset.

## Evidence requirements

Every public Evidence record must:

- be approved,
- reference an existing Source,
- provide a descriptive Japanese summary,
- provide an assertion code,
- provide a valid capture date,
- avoid merely repeating the Source title.

## Critical target symmetry

The following record families require Evidence:

```text
State Snapshot
Change Event
Occurrence
Relation
Designation
Recurrence Pattern
```

For each record:

- at least one Evidence ID is required,
- every Evidence ID must exist,
- Evidence target type must match the record family,
- Evidence target ID must equal the record ID,
- the assertion code must use the expected family-specific prefix,
- every critical Evidence record must be linked back from its target record.

This prevents a valid Source from being attached to the wrong assertion or from existing as an unlinked Evidence record.

## Current State freshness

Approved State Snapshots receive stricter treatment than historical records.

They require:

- an auditable Evidence capture or Source access date,
- at least one Source that is not classified as social media,
- a freshest Evidence date no older than the configured threshold.

Default threshold:

```text
730 days
```

Reproducible or stricter audits may use:

```text
MATSURI_AUDIT_DATE=YYYY-MM-DD
MATSURI_CURRENT_STATE_MAX_AGE_DAYS=<positive integer>
pnpm check:matsuri:evidence
```

The threshold is a launch-maintenance tripwire. It does not mean every historical Source must be recent.

## External reachability boundary

The repository audit validates URL structure and metadata. It does not claim that every external Source URL is reachable at build time.

Live external reachability is intentionally separate because:

- external servers can be temporarily unavailable,
- rate limits and bot protection can make CI results unstable,
- a temporary network failure should not silently change a public historical conclusion.

Source replacement, archive capture, or assertion correction remains a reviewed data task.
