import fs from 'node:fs';
import path from 'node:path';

function parseArgs(argv) {
  const args = { input: null, outDir: null, chunkSize: 500 };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--input') args.input = argv[++i];
    else if (arg === '--out-dir') args.outDir = argv[++i];
    else if (arg === '--chunk-size') args.chunkSize = Number.parseInt(argv[++i], 10);
    else throw new Error(`Unknown argument: ${arg}`);
  }
  if (!args.input) throw new Error('--input is required');
  if (!args.outDir) throw new Error('--out-dir is required');
  if (!Number.isInteger(args.chunkSize) || args.chunkSize < 1 || args.chunkSize > 5000) {
    throw new Error('--chunk-size must be an integer between 1 and 5000');
  }
  return args;
}

function normalizeText(value) {
  return String(value ?? '')
    .normalize('NFKC')
    .trim()
    .toLowerCase()
    .replace(/[\s\u3000]+/gu, '')
    .replace(/[・･.,，。\-‐‑‒–—―_()（）\[\]【】「」『』]/gu, '');
}

function candidateName(candidate) {
  return String(candidate?.identity?.name_ja ?? candidate?.identity?.name ?? '').trim();
}

function hasAnyAddress(address = {}) {
  return ['full', 'prefecture', 'city', 'district', 'suburb', 'street', 'housenumber', 'postcode']
    .some((key) => Boolean(address[key]));
}

function hasSpecificAddress(address = {}) {
  return ['full', 'street', 'housenumber', 'postcode'].some((key) => Boolean(address[key]));
}

function classify(candidate) {
  const name = candidateName(candidate);
  const identity = candidate.identity ?? {};
  const address = candidate.geography?.address ?? {};
  if (!name) return 'blocked_missing_name';
  if (identity.website) return 'website_hint';
  if (identity.wikidata) return 'wikidata_hint';
  if (identity.wikipedia) return 'wikipedia_hint';
  if (hasSpecificAddress(address)) return 'specific_address_hint';
  if (hasAnyAddress(address)) return 'partial_address_hint';
  return 'osm_only';
}

function assertInput(payload) {
  if (payload.site_id !== 'jinja') throw new Error(`Expected site_id jinja, got ${payload.site_id}`);
  if (payload.aggregation_mode !== 'candidate_only') throw new Error(`Expected candidate_only aggregate, got ${payload.aggregation_mode}`);
  if (payload.promotion_authorized !== false) throw new Error('National aggregate must keep promotion_authorized=false');
  if (!Array.isArray(payload.candidates)) throw new Error('National aggregate candidates must be an array');
  for (const candidate of payload.candidates) {
    if (candidate.candidate_site_id !== 'jinja') throw new Error(`Unexpected candidate_site_id: ${candidate.candidate_site_id}`);
    if (candidate.promotion_authorized !== false) throw new Error(`Candidate ${candidate.candidate_id} unexpectedly authorizes promotion`);
    if (candidate.status !== 'candidate_unreviewed') throw new Error(`Candidate ${candidate.candidate_id} has unexpected status ${candidate.status}`);
  }
}

function writeJson(filePath, payload) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
}

const args = parseArgs(process.argv.slice(2));
const aggregate = JSON.parse(fs.readFileSync(args.input, 'utf8'));
assertInput(aggregate);

const nameFrequency = new Map();
for (const candidate of aggregate.candidates) {
  const normalized = normalizeText(candidateName(candidate));
  if (!normalized) continue;
  nameFrequency.set(normalized, (nameFrequency.get(normalized) ?? 0) + 1);
}

const lanes = new Map([
  ['blocked_missing_name', []],
  ['website_hint', []],
  ['wikidata_hint', []],
  ['wikipedia_hint', []],
  ['specific_address_hint', []],
  ['partial_address_hint', []],
  ['osm_only', []],
]);

for (const candidate of aggregate.candidates) {
  const lane = classify(candidate);
  const name = candidateName(candidate);
  const normalizedName = normalizeText(name);
  const frequency = normalizedName ? (nameFrequency.get(normalizedName) ?? 0) : 0;
  const entry = {
    candidate_id: candidate.candidate_id,
    prefecture: candidate.geography?.iso3166_2 ?? null,
    name: name || null,
    coordinates: {
      lat: candidate.geography?.lat ?? null,
      lon: candidate.geography?.lon ?? null,
    },
    hints: {
      website: candidate.identity?.website ?? null,
      wikidata: candidate.identity?.wikidata ?? null,
      wikipedia: candidate.identity?.wikipedia ?? null,
      denomination: candidate.identity?.denomination ?? null,
      address: candidate.geography?.address ?? null,
    },
    source: candidate.source,
    review_lane: lane,
    verification_status: lane === 'blocked_missing_name' ? 'blocked' : 'not_verified',
    promotion_authorized: false,
    identity_collision_risk: frequency >= 20 ? 'high' : frequency >= 5 ? 'medium' : 'low',
    same_normalized_name_count: frequency,
  };
  lanes.get(lane).push(entry);
}

fs.rmSync(args.outDir, { recursive: true, force: true });
fs.mkdirSync(args.outDir, { recursive: true });

const laneOrder = [...lanes.keys()];
const summary = {
  format_version: 1,
  site_id: 'jinja',
  mode: 'national_enrichment_queue',
  generated_at: new Date().toISOString(),
  source_aggregate_generated_at: aggregate.generated_at ?? null,
  source_candidate_count: aggregate.candidates.length,
  promotion_authorized: false,
  automatic_canonical_promotion: false,
  automatic_state_event_relation_inference: false,
  note: 'website/Wikidata/Wikipedia values are verification hints from discovery data, not verified canonical evidence',
  lane_counts: {},
  chunk_size: args.chunkSize,
  chunk_count: 0,
};

for (const lane of laneOrder) {
  const entries = lanes.get(lane).sort((a, b) => a.candidate_id.localeCompare(b.candidate_id));
  summary.lane_counts[lane] = entries.length;
  for (let offset = 0, index = 1; offset < entries.length; offset += args.chunkSize, index += 1) {
    const chunk = entries.slice(offset, offset + args.chunkSize);
    summary.chunk_count += 1;
    writeJson(path.join(args.outDir, lane, `chunk-${String(index).padStart(3, '0')}.json`), {
      format_version: 1,
      site_id: 'jinja',
      review_lane: lane,
      promotion_authorized: false,
      chunk_index: index,
      candidate_count: chunk.length,
      candidates: chunk,
    });
  }
}

summary.named_candidate_count = aggregate.candidates.length - summary.lane_counts.blocked_missing_name;
summary.blocked_candidate_count = summary.lane_counts.blocked_missing_name;
summary.reviewable_candidate_count = summary.named_candidate_count;
writeJson(path.join(args.outDir, 'manifest.json'), summary);

console.log(`Source candidates: ${summary.source_candidate_count}`);
console.log(`Named/reviewable: ${summary.reviewable_candidate_count}`);
console.log(`Blocked missing name: ${summary.blocked_candidate_count}`);
for (const lane of laneOrder) console.log(`${lane}: ${summary.lane_counts[lane]}`);
console.log(`Queue chunks: ${summary.chunk_count}`);
