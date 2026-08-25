import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadMatsuriDataset } from "../../matsuri/scripts/load-matsuri-dataset.mjs";

const appRoot = fileURLToPath(new URL("../", import.meta.url));
const queuePath = path.join(appRoot, "research", "review-queue-batch-001.json");
const canonicalPath = path.join(appRoot, "data", "canonical.json");
const queue = JSON.parse(fs.readFileSync(queuePath, "utf8"));
const canonical = JSON.parse(fs.readFileSync(canonicalPath, "utf8"));
const dataset = loadMatsuriDataset();

const matsuriSpecialistTypes = new Set(["festival", "folk_performance", "tradition_unit"]);
const entitiesById = new Map(dataset.entities.map((record) => [record.id, record]));
const placesById = new Map(dataset.places.map((record) => [record.id, record]));
const sourcesById = new Map(dataset.sources.map((record) => [record.id, record]));
const evidenceById = new Map(dataset.evidence.map((record) => [record.id, record]));

function preferredName(entity) {
  return entity.names?.find((name) => name.is_preferred)?.value ?? entity.names?.[0]?.value ?? entity.id;
}

function uniqueSorted(values) {
  return [...new Set(values.filter(Boolean))].sort((left, right) => String(left).localeCompare(String(right), "ja"));
}

function officialUrls(entity) {
  return uniqueSorted(
    (entity.external_links ?? [])
      .filter((link) => ["official", "official_organization"].includes(link.officiality))
      .map((link) => link.url),
  );
}

const approvedIdentityEvidenceByEntityId = new Map();
for (const evidence of dataset.evidence) {
  if (evidence.review_status !== "approved" || evidence.target_type !== "entity_identity") continue;
  const records = approvedIdentityEvidenceByEntityId.get(evidence.target_id) ?? [];
  records.push(evidence);
  approvedIdentityEvidenceByEntityId.set(evidence.target_id, records);
}

const candidatesById = new Map();
for (const relation of dataset.relations) {
  if (relation.review_status !== "approved") continue;
  const sourceEntity = entitiesById.get(relation.source_entity_id);
  const targetEntity = entitiesById.get(relation.target_entity_id);
  assert(sourceEntity && targetEntity, `Relation ${relation.id} references a missing Entity.`);

  const orientations = [
    { candidate: sourceEntity, matsuriEntity: targetEntity, direction: "candidate_to_matsuri" },
    { candidate: targetEntity, matsuriEntity: sourceEntity, direction: "matsuri_to_candidate" },
  ];

  for (const { candidate, matsuriEntity, direction } of orientations) {
    if (candidate.entity_type !== "shrine" || !matsuriSpecialistTypes.has(matsuriEntity.entity_type)) continue;

    const identityEvidence = approvedIdentityEvidenceByEntityId.get(candidate.id) ?? [];
    const placeIds = uniqueSorted([candidate.primary_place_id, ...(candidate.default_place_ids ?? [])]);
    for (const placeId of placeIds) assert(placesById.has(placeId), `Candidate ${candidate.id} references missing Place ${placeId}.`);

    const relationEvidence = (relation.evidence_ids ?? []).map((evidenceId) => {
      const evidence = evidenceById.get(evidenceId);
      assert(evidence, `Relation ${relation.id} references missing Evidence ${evidenceId}.`);
      assert.equal(evidence.review_status, "approved", `Relation Evidence ${evidenceId} is not approved.`);
      assert.equal(evidence.target_type, "relation", `Relation Evidence ${evidenceId} does not target a relation.`);
      assert.equal(evidence.target_id, relation.id, `Relation Evidence ${evidenceId} targets ${evidence.target_id}.`);
      assert(sourcesById.has(evidence.source_id), `Relation Evidence ${evidenceId} references missing Source ${evidence.source_id}.`);
      return evidence;
    });

    const existing = candidatesById.get(candidate.id) ?? {
      entity_id: candidate.id,
      name_ja: preferredName(candidate),
      matsuri_handoff: {
        place_ids: placeIds,
        source_ids: [],
        identity_evidence_ids: uniqueSorted(identityEvidence.map((record) => record.id)),
        official_urls: officialUrls(candidate),
        relation_contexts: [],
      },
    };

    existing.matsuri_handoff.source_ids = uniqueSorted([
      ...existing.matsuri_handoff.source_ids,
      ...(candidate.names ?? []).flatMap((name) => name.source_ids ?? []),
      ...identityEvidence.map((record) => record.source_id),
      ...relationEvidence.map((record) => record.source_id),
    ]);

    if (!existing.matsuri_handoff.relation_contexts.some((context) => context.relation_id === relation.id)) {
      existing.matsuri_handoff.relation_contexts.push({
        relation_id: relation.id,
        relation_type: relation.relation_type,
        direction,
        matsuri_entity_id: matsuriEntity.id,
        matsuri_entity_type: matsuriEntity.entity_type,
        matsuri_name_ja: preferredName(matsuriEntity),
        evidence_ids: uniqueSorted(relation.evidence_ids ?? []),
      });
    }

    candidatesById.set(candidate.id, existing);
  }
}

const candidates = [...candidatesById.values()]
  .map((candidate) => ({
    ...candidate,
    matsuri_handoff: {
      ...candidate.matsuri_handoff,
      relation_contexts: candidate.matsuri_handoff.relation_contexts.sort((left, right) => left.relation_id.localeCompare(right.relation_id)),
    },
  }))
  .sort((left, right) => `jinja:${left.name_ja}:${left.entity_id}`.localeCompare(`jinja:${right.name_ja}:${right.entity_id}`, "ja"));

const canonicalIds = new Set(canonical.entities.filter((record) => record.review_status === "approved").map((record) => record.id));
const canonicalCandidates = candidates.filter((candidate) => canonicalIds.has(candidate.entity_id));
const pendingCandidates = candidates.filter((candidate) => !canonicalIds.has(candidate.entity_id));
const expectedBatch = pendingCandidates.slice(0, 5);

assert.equal(queue.format_version, 1, "Unexpected Jinja review queue format_version.");
assert.equal(queue.site_id, "jinja", "Unexpected Jinja review queue site_id.");
assert.equal(queue.batch_id, "jinja-review-batch-001", "Unexpected Jinja review queue batch_id.");
assert.equal(queue.status, "pending-jinja-specific-review", "Unexpected Jinja review queue status.");
assert.equal(queue.selection?.source_candidate_count, candidates.length, "Jinja review queue source candidate count drifted.");
assert.equal(queue.selection?.canonical_candidate_count, canonicalCandidates.length, "Jinja review queue canonical candidate count drifted.");
assert.equal(queue.selection?.pending_candidate_count, pendingCandidates.length, "Jinja review queue pending candidate count drifted.");
assert.equal(queue.selection?.selected_count, 5, "Jinja review queue must remain bounded to five candidates.");
assert.equal(queue.items?.length, 5, "Jinja review queue must contain exactly five candidates.");
assert.deepEqual(queue.items.map((item) => item.entity_id), expectedBatch.map((item) => item.entity_id), "Jinja review queue no longer matches the deterministic first five pending candidates.");
assert.deepEqual(queue.items.map((item) => item.name_ja), expectedBatch.map((item) => item.name_ja), "Jinja review queue candidate names drifted.");

for (let index = 0; index < queue.items.length; index += 1) {
  const item = queue.items[index];
  const expected = expectedBatch[index];
  assert.equal(item.status, "pending_jinja_source_review", `${item.entity_id} must remain pending Jinja-specific review.`);
  assert.equal(item.promotion_authorized, false, `${item.entity_id} must not be authorized for promotion.`);
  assert.equal(item.jinja_state, null, `${item.entity_id} must not infer a Jinja State before review.`);
  assert(!canonicalIds.has(item.entity_id), `${item.entity_id} is already canonical and must not remain in the review queue.`);
  assert.deepEqual(item.matsuri_handoff?.place_ids, expected.matsuri_handoff.place_ids, `${item.entity_id} Place handoff drifted.`);
  assert.deepEqual(item.matsuri_handoff?.source_ids, expected.matsuri_handoff.source_ids, `${item.entity_id} Source handoff drifted.`);
  assert.deepEqual(item.matsuri_handoff?.identity_evidence_ids, expected.matsuri_handoff.identity_evidence_ids, `${item.entity_id} identity Evidence handoff drifted.`);
  assert.deepEqual(item.matsuri_handoff?.official_urls, expected.matsuri_handoff.official_urls, `${item.entity_id} official URL handoff drifted.`);
  assert.deepEqual(item.matsuri_handoff?.relation_contexts, expected.matsuri_handoff.relation_contexts, `${item.entity_id} Relation handoff drifted.`);
}

assert.equal(queue.boundaries?.repository_public_review_queue, true, "Review queue must be explicitly repository-public.");
assert.equal(queue.boundaries?.contains_private_notes, false, "Review queue must not contain private notes.");
assert.equal(queue.boundaries?.published_by_jinja_build, false, "Review queue must not be published by the Jinja preview build.");
assert.equal(queue.boundaries?.automatic_promotion, false, "Automatic Jinja promotion must remain disabled.");
assert.equal(queue.boundaries?.jinja_specific_source_review_required, true, "Jinja-specific source review must remain required.");
assert.equal(queue.boundaries?.missing_state_inferred, false, "Missing Jinja State must not be inferred.");

console.log(`Jinja review queue verified: ${candidates.length} source candidate(s), ${pendingCandidates.length} pending, bounded batch ${queue.items.length}.`);
