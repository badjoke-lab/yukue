import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { buildQuery, normalizeElement } from './acquire-national-candidates.mjs';

const policyUrl = new URL('../research/national-acquisition-policy.json', import.meta.url);
const policy = JSON.parse(await fs.readFile(policyUrl, 'utf8'));

assert.equal(policy.site_id, 'jinja');
assert.equal(policy.strategy, 'prefecture_partitioned_bulk_discovery_then_review');
assert.equal(policy.candidate_contract.automatic_canonical_promotion, false);
assert.equal(policy.candidate_contract.automatic_state_inference, false);
assert.equal(policy.publication_boundary.candidate_files_published_by_site, false);
assert.equal(policy.publication_boundary.indexability_activation, false);

const query = buildQuery('JP-13');
assert.match(query, /ISO3166-2"="JP-13/);
assert.match(query, /amenity"="place_of_worship/);
assert.match(query, /religion"="shinto/);

const sample = normalizeElement({
  type: 'node',
  id: 123,
  lat: 35.0,
  lon: 139.0,
  tags: {
    name: '例示神社',
    'name:ja': '例示神社',
    amenity: 'place_of_worship',
    religion: 'shinto',
    website: 'https://example.invalid/',
    'addr:city': '例示市'
  }
}, 'JP-13', '2026-09-01T00:00:00.000Z');

assert.equal(sample.candidate_id, 'osm-node-123');
assert.equal(sample.status, 'candidate_unreviewed');
assert.equal(sample.promotion_authorized, false);
assert.equal(sample.identity.name_ja, '例示神社');
assert.equal(sample.identity.website, 'https://example.invalid/');
assert.equal(sample.geography.iso3166_2, 'JP-13');
assert.equal(sample.source.source_type, 'discovery_seed');
assert.equal(sample.source.license, 'ODbL-1.0');

console.log(`National Jinja acquisition contract OK: ${fileURLToPath(policyUrl)}`);
