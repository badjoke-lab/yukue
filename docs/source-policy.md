# Source and Evidence Policy

## Source and Evidence are different

A Source identifies an information source.

Evidence explains how that Source supports a specific assertion or target record.

A URL alone is not sufficient Evidence metadata.

## Nationwide Matsuri source-family contract

Nationwide Matsuri discovery and Tier A preparation are governed by:

```text
docs/matsuri-national-source-inventory.md
config/matsuri-national-source-inventory.json
```

The NCS-03 registry separates source families by role rather than treating every discovered URL as equivalent.

```text
direct Tier A identity source
conditional Tier A identity source
discovery-only / resolve-first source
supporting-only source
```

A discovery aggregator does not become an authoritative Tier A source merely because it contains a record. Where the registry requires underlying-source resolution, the original provider/publisher must be resolved and reviewed before Tier A approval.

The source-family registry also records source-specific enumeration limits and rights/reuse boundaries. Those limits are part of the ingestion contract and must not be silently widened by NCS-04.

## Typical source priority

Depending on the assertion, useful source classes may include:

1. government or municipality,
2. official cultural-heritage database,
3. organizer or preservation-group official source,
4. shrine or temple official source,
5. official tourism body,
6. academic publication or institutional report,
7. credible news reporting,
8. supplementary sources.

Source appropriateness depends on the assertion. A municipal schedule notice may be excellent Evidence for an Occurrence date while an academic history may be better Evidence for historical continuity.

For Matsuri Tier A identity, the NCS-03 machine inventory is more specific than this general priority list and controls whether a family is direct, conditional, discovery-only, or supporting-only.

## Tier A source boundary

A Tier A record requires an approved source family and claim support for the identity/geography facts actually published.

Passing a source-family role does not authorize unrelated claims from that source.

In particular, an identity or designation source does not by itself prove:

```text
Current State
held / cancelled / not-held Occurrence outcome
organizer
Place
Relation
coordinates
historical continuity
```

Unsupported dimensions remain absent until supported by claim-linked Evidence.

For discovery-only families such as Cultural Heritage Online and Japan Search, resolve the underlying provider/source before Tier A approval.

## Rights and reuse

Authority and reuse permission are separate questions.

A source can be authoritative while its text or images remain copyright-restricted.

The NCS-03 registry therefore records separate fields for:

```text
text reuse
image reuse
bulk-copy policy
```

Do not infer image reuse permission from a page being publicly viewable.

Do not copy descriptions in bulk merely because the source is official. Use only the fields and reuse scope permitted by the source-family contract and the source's current terms.

Where terms are publisher-specific, NCS-04 must preserve that uncertainty instead of treating the family as blanket-reusable.

## Evidence targets

Evidence may support:

```text
state_snapshot
change_event
occurrence
relation
designation
recurrence_pattern
entity_identity
name_variant
location
place
```

## Freshness

Current-State claims require fresher Evidence than historical Event claims.

Historical Evidence does not automatically prove present continuity.

A pre-event schedule does not prove that the event was held after the date passes.

## Access metadata

Preserve source access/verification date for Tier A sources.

Where practical, also preserve publication date, source update date, archived URL, stable provider/source identifier, and the publisher role used during review.

## Social media

Official social posts may support limited claims, especially announcements and Occurrence details.

Important long-term State conclusions should not rely on a social post alone when stronger Evidence is available.

Social posts are not a substitute for source-family review merely because an account appears official.

## AI-generated summaries

AI-generated summaries are not Evidence.

They may assist research, but public claims must be traceable to underlying Sources.

## Future-site boundary

The Matsuri NCS-03 registry is a Matsuri source contract.

A shrine or temple source used to support a Matsuri claim does not automatically create a public Tier A record for 神社のゆくえ or 寺院のゆくえ and does not activate any future specialist site.
