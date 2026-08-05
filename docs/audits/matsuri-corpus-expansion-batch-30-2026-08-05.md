# Matsuri Corpus Expansion Batch 30 — 2026-08-05

## Status

Passed repository, data, Detail C, map, and visual verification. Canonical-production verification is the next separate step.

## Scope

Batch 30 continues the reviewed Matsuri breadth-and-depth track:

1. adds 西大寺会陽 as the first reviewed primary Matsuri record for 岡山県;
2. adds 西大寺会陽奉賛会 and an evidence-backed `organized_by` Relation;
3. models 西大寺観音院 as the concrete ritual and main-venue Place;
4. records the held unknown-scale 2026 edition;
5. records the 2016 national Important Intangible Folk Cultural Property designation as a Change Event and Designation;
6. deepens 相馬野馬追 with the held unknown-scale 2025 edition and the bounded women-rider participation-rule change;
7. preserves Detail C, Evidence, map, future-site seed, stabilization, and blocked Jinja boundaries.

## Evidence boundaries

- The 2026 西大寺会陽 edition is `held / unknown`: the municipal page records the edition as ended, but normal completion of every published component is not inferred.
- The national designation is recorded for 西大寺の会陽 with the reviewed 2016-03-02 designation date.
- The 西大寺会陽奉賛会 Relation is based on the official organizer page; no legal-person State is inferred.
- 西大寺観音院 is a concrete ritual and main venue and is therefore an approved map anchor.
- The 2025 相馬野馬追 edition is `held / unknown`: the municipal post-event record proves the three-day edition took place, but rider or audience counts are not used to infer normal scale.
- The 2025 format Change Event is bounded to the published removal of the former women-rider condition limiting participation to unmarried riders under twenty; it does not generalize to every participation rule.
- 山あげ祭2026 remains unresolved because no reviewed official post-event result Evidence was available. A pre-event schedule is not converted into a held result.
- No Temple Current State or legal-person State is inferred.

## New reviewed records

### 西大寺会陽

Added:

- Festival Entity `fst-saidaiji-eyo`;
- organizer Organization `org-saidaiji-eyo-hosankai`;
- concrete ritual and main venue `plc-saidaiji-kannonin`;
- active Current State based on the ended 2026 municipal record;
- annual Series and Recurrence Pattern for the third Saturday in February;
- held unknown-scale 2026 Occurrence;
- 2016 national-designation Change Event;
- national Important Intangible Folk Cultural Property Designation;
- evidence-backed `organized_by` Relation;
- canonical detail routes, individual JSON, search, Relation navigation, Place navigation, and embedded-map behavior.

西大寺観音院 is the primary map anchor. No distributed or invented point is introduced.

## Existing-record depth

### 相馬野馬追

Added:

- held unknown-scale 2025 Occurrence for May 24 through 26;
- bounded 2025 `format_changed` Event for removal of the former women-rider condition;
- claim-specific municipal Evidence for both records.

The public record states that riders aged twenty or older participated after the former condition was removed. The change is not expanded beyond that published rule.

## Resulting canonical corpus

Implementation validation head: `4390ada7cd54cc9526928ba1cc3d7399bdee9127`.

| Record family | Count |
|---|---:|
| Entity | 91 |
| Place | 87 |
| State Snapshot | 43 |
| Change Event | 91 |
| Occurrence | 151 |
| Occurrence Series | 43 |
| Recurrence Pattern | 43 |
| Relation | 54 |
| Designation | 25 |
| Source | 239 |
| Evidence | 551 |

The corpus covers 34 prefectures, leaving 13 uncovered. No sparse primary Entity remains under the current coverage rule.

Repository position:

```text
F1 batches                    13
F2 maintenance bundles        63
F2 correction bundles         17
Additive application slots    76
Correction application slots  17
Public Entities               91
Jinja State Snapshots          0
```

## Detail C and map review

The exhaustive Detail C and map contracts verified:

- 188 generated HTML routes;
- 91 Pagefind-indexed records with direct detail URLs;
- 143 Place-bearing detail pages;
- 117 useful anchored maps;
- 26 explicit location-gap pages;
- 65 Entity anchors and 52 Place anchors;
- the 西大寺会陽 Festival and 西大寺観音院 Place use the concrete temple anchor;
- the existing 相馬野馬追 multi-place boundaries and main map anchor remain intact.

The exhaustive Chromium test passed for every generated Entity detail and seed-reference page. The new Festival, Organization, and Place routes passed reverse navigation, JSON, map utility, and browser checks.

## Visual review

The representative visual contract contains 104 routes and produced 208 desktop/mobile full-page screenshots.

The first capture completed all images but the artifact audit recorded one transient `ERR_CONNECTION_CLOSED` console error on the pre-existing 佐原諏訪神社 map page. No new Batch 30 route failed. The same job was rerun without weakening the audit contract.

The successful second attempt passed with:

- 104 of 104 desktop routes captured;
- 104 of 104 mobile routes captured;
- 64 of 64 embedded maps loaded on each device;
- zero failures;
- zero warnings;
- zero recorded blank map frames or horizontal-overflow regressions.

Manual full-resolution review confirmed:

- 西大寺会陽 renders Current State, 2026 Occurrence, national-designation Event and Designation, concrete Place, organizer Relation, Evidence, and the useful temple map;
- 西大寺会陽奉賛会 remains an organizer record without unsupported Place or State claims;
- 西大寺観音院 renders a useful map and reverse Festival navigation;
- 相馬野馬追 displays the held 2025 Occurrence and bounded women-rider participation-rule Change Event without disturbing its prior State, Relation, multi-place, or map boundaries;
- desktop and mobile layouts remain readable and structurally complete.

## Validation

| Verification | Run |
|---|---:|
| Complete repository CI and release readiness | `30984537990` |
| Detail C, map utility, and exhaustive Chromium navigation | `30984537932` |
| Desktop/mobile visual capture and audit | `30984537899` attempt 2 |
| Corpus coverage audit | `30984537975` |
| Canonical dataset contract | `30984537994` |
| Correction contract | `30984538186` |
| Relation coverage | `30984537902` |
| Data freshness | `30984537987` |
| External-link maintenance | `30984537964` |
| Bundle inventory and repository baseline | `30984537970` |
| Future-site seed inventory | `30984537946` |
| Future-site seed readiness | `30984537985` |
| Jinja start-gate record | `30984537945` |

Artifacts:

- release candidate `8921636668`, digest `sha256:2584f50f2b1e8381faea8b9db92c85409d7c3ccf712f285a49025ecdef6c6f80`;
- map utility `8921548800`, digest `sha256:2ba3862ef56e3fe0c9d70e8bebb13d1e9f570fa134b51c9d173a0b838f25d19a`;
- successful screenshot review `8922116723`, digest `sha256:496267b7ab3b318975d50344c4970d67f0d28e4a0f0892623f95723732196c23`;
- corpus coverage `8921512324`, digest `sha256:aa183937258dbe389b69a465d884d3bbee03ae3e14de66e9041a4702dbc3591d`.

## Merge

- pull request: `#185`;
- squash merge commit: `fa9324fa433b56699c368f31cfd0943cc678bfe5`;
- merged on: `2026-08-05`.

## Boundaries

- all public claims require approved Evidence;
- an official pre-event schedule is not converted into a held result without post-event Evidence;
- a held edition does not imply normal completion of every published component;
- the participation-rule change remains bounded to the published women-rider condition;
- Jinja remains blocked with zero approved Jinja State Snapshots;
- no Jinja application, Worker, hostname, or publication is created;
- private analytics, candidate material, and internal project-policy information are absent.