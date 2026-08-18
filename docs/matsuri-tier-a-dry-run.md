# Matsuri NCS-05 Tier A dry run

**Status:** Completed

NCS-05 exercised the NCS-04 source/identity contract against a bounded real-source sample from the Agency for Cultural Affairs national cultural-property database. The operational candidate records, identities, provider identifiers, and exact candidate URLs remain outside this public repository.

## What the dry run proved

The source-family path resolved successfully for the bounded sample, and at least one real-source candidate could satisfy the source/identity minimum. The run also exposed a publication-readiness gap that the NCS-04 importer alone could not safely close: candidate-provided identity, subject type, geography, and source role needed a separate explicit review attestation before a draft could be treated as ready for an actual Tier A publication wave.

NCS-05 therefore adds a publication-readiness review gate. A record may pass that gate only when the review explicitly approves identity, subject type, geography, source role, and name-variant checking. Automation cannot self-approve that review. A record without a municipality additionally requires an explicit source-supported broader-scope basis.

Exact deterministic duplicate checks remain in NCS-04. Name variants and aliases are not turned into fuzzy automatic identity matches; they are fail-closed behind the explicit name-variant review field.

## Public-safe aggregate

The committed aggregate is `config/matsuri-tier-a-dry-run-baseline.json`.

```text
bounded real-source candidates         6
source-resolution success              6
Tier A publication-ready               2
blocked_review                         3
blocked_input                          1
blocked_source                         0
blocked_identity                       0
published                              0
```

Blocked records remain blocked rather than being normalized by inference. The sample included municipality/locality, broader-scope, historical-geography, and multi-prefecture boundary cases so the gate would not be validated only on easy records.

## Publication boundary

NCS-05 does not publish anything.

```text
publication_authorized          false
writes_canonical_public_data    false
writes_tier_a_publication_time  false
candidate queue committed       false
candidate URLs disclosed        false
future sites activated          false
```

No Current State, Occurrence outcome, organizer, Place, Relation, coordinates, or history is invented to make a record pass. Images are not imported from the source database by this dry run.

## Next gate

NCS-06 may select only records that pass both the NCS-04 source/identity checks and the NCS-05 explicit review gate. The first bounded public wave must assign authentic publication-time metadata at the actual release commit, build the public detail/JSON/sitemap outputs, and verify production. A→B work starts from each real publication timestamp and does not globally block later valid Tier A waves.
