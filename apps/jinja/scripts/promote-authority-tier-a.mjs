import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

function parseArgs(argv) {
  const args = { aggregate: null, authority: null, canonical: null, report: null };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--aggregate') args.aggregate = argv[++i];
    else if (arg === '--authority') args.authority = argv[++i];
    else if (arg === '--canonical') args.canonical = argv[++i];
    else if (arg === '--report') args.report = argv[++i];
    else throw new Error(`Unknown argument: ${arg}`);
  }
  for (const [key, value] of Object.entries(args)) if (!value) throw new Error(`--${key} is required`);
  return args;
}

function normalize(value) {
  return String(value ?? '')
    .normalize('NFKC')
    .trim()
    .toLowerCase()
    .replace(/[\s\u3000]+/gu, '')
    .replace(/[・･.,，。'"`´’‘“”()（）\[\]【】「」『』\-‐‑‒–—―]/gu, '');
}

function cleanMunicipality(value, prefecture) {
  return String(value ?? '').normalize('NFKC').trim().replace(new RegExp(`^${prefecture}`), '');
}

function candidateName(candidate) {
  return String(candidate?.identity?.name_ja ?? candidate?.identity?.name ?? '').trim();
}

function candidateMunicipality(candidate, prefecture) {
  const tags = candidate?.raw_tags ?? {};
  const values = [
    candidate?.geography?.address?.city,
    tags['addr:city'],
    tags['addr:municipality'],
    tags['is_in:city'],
    tags['is_in:municipality'],
  ].filter(Boolean);
  return values.length ? cleanMunicipality(values[0], prefecture) : '';
}

function matchKey(name, municipality, prefecture) {
  return `${normalize(prefecture)}|${normalize(name)}|${normalize(cleanMunicipality(municipality, prefecture))}`;
}

function prefectureNameKey(name, prefecture) {
  return `${normalize(prefecture)}|${normalize(name)}`;
}

function jurisdictionSlug(authority) {
  return String(authority.jurisdiction).toLowerCase().replace(/[^a-z0-9]+/g, '');
}

function stableId(prefix, row, authority) {
  const digest = crypto.createHash('sha256')
    .update([authority.jurisdiction, row.name, row.municipality, row.address].map(normalize).join('|'))
    .digest('hex')
    .slice(0, 14);
  return `${prefix}-${jurisdictionSlug(authority)}-${digest}`;
}

function sourceIdForUrl(url, authority) {
  const digest = crypto.createHash('sha256').update(String(url)).digest('hex').slice(0, 12);
  const authoritySlug = String(authority.authority_id).toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 36);
  return `src-jinja-${authoritySlug}-${digest}`;
}

function sourceDate(authority) {
  const retrieved = new Date(authority.retrieved_at);
  if (!Number.isFinite(retrieved.getTime())) throw new Error('Authority retrieved_at is invalid');
  return retrieved.toISOString().slice(0, 10);
}

function assertInput(aggregate, authority, canonical) {
  if (aggregate.site_id !== 'jinja' || aggregate.aggregation_mode !== 'candidate_only') throw new Error('Invalid national aggregate');
  if (authority.site_id !== 'jinja' || !/^JP-\d{2}$/.test(authority.jurisdiction ?? '')) throw new Error('Invalid prefecture authority roster jurisdiction');
  if (!authority.prefecture || !authority.publisher || !authority.authority_id) throw new Error('Authority roster missing prefecture/publisher/authority_id');
  if (authority.source_type !== 'public_authority_roster') throw new Error('Authority roster must be public_authority_roster');
  if (!Array.isArray(authority.records) || authority.records.length === 0) throw new Error('Authority roster has no records');
  if (canonical.site_id !== 'jinja' || canonical.publication_status !== 'public_preview_noncanonical') throw new Error('Invalid Jinja canonical preview');
}

function pushMap(map, key, value) {
  if (!map.has(key)) map.set(key, []);
  map.get(key).push(value);
}

function evidenceSummary(authority, row, matchRule) {
  const base = `${authority.publisher}の宗教法人名簿で${row.name}の法人名と所在地を確認。`;
  if (matchRule === 'exact_name_and_municipality_unique_on_both_sides') {
    return `${base}全国候補とは名称・市町村が双方で一意に一致した。`;
  }
  if (matchRule === 'exact_name_unique_statewide_candidate_missing_municipality') {
    return `${base}全国候補側は市町村情報が欠けているため所在地には用いず、県内で名称が公式名簿・全国候補の双方に1件だけ存在することを照合条件とした。`;
  }
  throw new Error(`Unsupported match rule: ${matchRule}`);
}

const args = parseArgs(process.argv.slice(2));
const aggregate = JSON.parse(fs.readFileSync(args.aggregate, 'utf8'));
const authority = JSON.parse(fs.readFileSync(args.authority, 'utf8'));
const canonical = JSON.parse(fs.readFileSync(args.canonical, 'utf8'));
assertInput(aggregate, authority, canonical);

const prefectureCandidates = aggregate.candidates.filter((candidate) => candidate.geography?.iso3166_2 === authority.jurisdiction && candidateName(candidate));
const authorityByKey = new Map();
const authorityByName = new Map();
for (const row of authority.records) {
  pushMap(authorityByKey, matchKey(row.name, row.municipality, authority.prefecture), row);
  pushMap(authorityByName, prefectureNameKey(row.name, authority.prefecture), row);
}

const candidatesByKey = new Map();
const candidatesByName = new Map();
for (const candidate of prefectureCandidates) {
  pushMap(candidatesByName, prefectureNameKey(candidateName(candidate), authority.prefecture), candidate);
  const municipality = candidateMunicipality(candidate, authority.prefecture);
  if (!municipality) continue;
  pushMap(candidatesByKey, matchKey(candidateName(candidate), municipality, authority.prefecture), candidate);
}

const existingNamesPlaces = new Set();
const existingPrefectureNames = new Set();
for (const entity of canonical.entities) {
  const place = canonical.places.find((item) => item.id === entity.current_place_id);
  const prefecture = place?.prefecture ?? '';
  existingNamesPlaces.add(matchKey(entity.canonical_name, place?.municipality ?? '', prefecture));
  existingPrefectureNames.add(prefectureNameKey(entity.canonical_name, prefecture));
}

const approved = [];
const ambiguous = [];
const approvedCandidateIds = new Set();
const approvedAuthorityIds = new Set();

function authorityRowIdentity(row) {
  return [row.name, row.municipality, row.address].map(normalize).join('|');
}

function approve(row, candidate, matchRule) {
  approved.push({ row, candidate, match_rule: matchRule });
  approvedCandidateIds.add(candidate.candidate_id);
  approvedAuthorityIds.add(authorityRowIdentity(row));
}

for (const [key, rows] of authorityByKey) {
  const candidates = candidatesByKey.get(key) ?? [];
  if (rows.length === 1 && candidates.length === 1) {
    const row = rows[0];
    const candidate = candidates[0];
    if (!existingNamesPlaces.has(key)) approve(row, candidate, 'exact_name_and_municipality_unique_on_both_sides');
  } else if (candidates.length > 0) {
    ambiguous.push({
      scope: 'name_and_municipality',
      key,
      authority_count: rows.length,
      candidate_count: candidates.length,
      names: [...new Set(rows.map((row) => row.name))],
      municipalities: [...new Set(rows.map((row) => row.municipality))],
      candidate_ids: candidates.map((candidate) => candidate.candidate_id),
    });
  }
}

// Conservative fallback for incomplete OSM address metadata only.
// Never use this when OSM has a municipality that conflicts with the authority roster.
// Require the normalized name to occur exactly once across the prefecture on both sides.
for (const [nameKey, rows] of authorityByName) {
  const candidates = candidatesByName.get(nameKey) ?? [];
  if (rows.length !== 1 || candidates.length !== 1) continue;
  const row = rows[0];
  const candidate = candidates[0];
  if (approvedAuthorityIds.has(authorityRowIdentity(row)) || approvedCandidateIds.has(candidate.candidate_id)) continue;
  if (candidateMunicipality(candidate, authority.prefecture)) continue;
  if (existingPrefectureNames.has(nameKey)) continue;
  approve(row, candidate, 'exact_name_unique_statewide_candidate_missing_municipality');
}

approved.sort((a, b) => a.row.municipality.localeCompare(b.row.municipality, 'ja') || a.row.name.localeCompare(b.row.name, 'ja') || a.row.address.localeCompare(b.row.address, 'ja'));
const verifiedAt = sourceDate(authority);

for (const { row, match_rule: matchRule } of approved) {
  if (!row.source_url) throw new Error(`Authority row missing source_url: ${row.name} ${row.municipality}`);
  const sourceId = sourceIdForUrl(row.source_url, authority);
  if (!canonical.sources.some((source) => source.id === sourceId)) {
    canonical.sources.push({
      id: sourceId,
      title: row.source_title || `${row.municipality} 宗教法人名簿`,
      publisher: authority.publisher,
      url: row.source_url,
      source_type: 'public_authority',
      accessed_at: verifiedAt,
    });
  }

  const entityId = stableId('shr', row, authority);
  const placeId = stableId('plc', row, authority);
  const evidenceId = stableId('evd', row, authority);
  if (canonical.entities.some((entity) => entity.id === entityId)) continue;
  canonical.entities.push({
    id: entityId,
    canonical_name: row.name,
    review_status: 'approved',
    tier: 'A',
    verified_at: verifiedAt,
    current_place_id: placeId,
  });
  canonical.places.push({
    id: placeId,
    prefecture: authority.prefecture,
    municipality: row.municipality,
    review_status: 'approved',
    address: row.address.startsWith(authority.prefecture) ? row.address : `${authority.prefecture}${row.address}`,
    verified_at: verifiedAt,
  });
  canonical.evidence.push({
    id: evidenceId,
    target_type: 'entity',
    target_id: entityId,
    source_id: sourceId,
    review_status: 'approved',
    verified_at: verifiedAt,
    summary: evidenceSummary(authority, row, matchRule),
  });
}

canonical.entities.sort((a, b) => a.canonical_name.localeCompare(b.canonical_name, 'ja') || a.id.localeCompare(b.id));
canonical.places.sort((a, b) => a.prefecture.localeCompare(b.prefecture, 'ja') || a.municipality.localeCompare(b.municipality, 'ja') || a.id.localeCompare(b.id));
canonical.evidence.sort((a, b) => a.id.localeCompare(b.id));
canonical.sources.sort((a, b) => a.id.localeCompare(b.id));

const matchRuleCounts = Object.fromEntries(
  [...new Set(approved.map((item) => item.match_rule))]
    .sort()
    .map((rule) => [rule, approved.filter((item) => item.match_rule === rule).length]),
);

const report = {
  format_version: 1,
  site_id: 'jinja',
  authority_id: authority.authority_id,
  jurisdiction: authority.jurisdiction,
  prefecture: authority.prefecture,
  publisher: authority.publisher,
  generated_at: new Date().toISOString(),
  verification_date: verifiedAt,
  authority_record_count: authority.records.length,
  authority_page_count: authority.page_count ?? authority.source_count ?? null,
  authority_failed_page_count: authority.failed_page_count ?? authority.failed_source_count ?? null,
  osm_named_candidate_count: prefectureCandidates.length,
  approved_count: approved.length,
  ambiguous_count: ambiguous.length,
  match_rules: matchRuleCounts,
  match_rule: 'exact normalized shrine name + exact municipality when available; fallback only when OSM municipality is absent and the normalized name is unique across the prefecture on both authority and OSM sides',
  automatic_state_inference: false,
  automatic_event_inference: false,
  automatic_relation_inference: false,
  source_page: authority.source_page,
  approved: approved.map(({ row, candidate, match_rule }) => ({
    candidate_id: candidate.candidate_id,
    name: row.name,
    municipality: row.municipality,
    address: row.address,
    umbrella: row.umbrella,
    source_url: row.source_url,
    source_title: row.source_title,
    match_rule,
  })),
  ambiguous,
};

fs.mkdirSync(path.dirname(args.report), { recursive: true });
fs.writeFileSync(args.report, `${JSON.stringify(report, null, 2)}\n`, 'utf8');
fs.writeFileSync(args.canonical, `${JSON.stringify(canonical, null, 2)}\n`, 'utf8');

console.log(JSON.stringify({
  authority: authority.authority_id,
  jurisdiction: authority.jurisdiction,
  authority_records: report.authority_record_count,
  authority_sources: report.authority_page_count,
  osm_named: report.osm_named_candidate_count,
  approved: report.approved_count,
  ambiguous: report.ambiguous_count,
  match_rules: report.match_rules,
  canonical_entities_after: canonical.entities.length,
  authority_sources_added: new Set(approved.map(({ row }) => row.source_url)).size,
}));
if (approved.length === 0) throw new Error(`No ${authority.jurisdiction} authority matches were approved; refusing to generate an empty promotion branch`);
