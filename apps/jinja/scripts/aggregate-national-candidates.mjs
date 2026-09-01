import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

function normalizeText(value) {
  return String(value ?? '')
    .normalize('NFKC')
    .trim()
    .toLowerCase()
    .replace(/[\s　]+/g, '')
    .replace(/[・･.,，。'"`´’‘“”()（）\[\]【】]/g, '');
}

function roundCoord(value, digits = 5) {
  const n = Number(value);
  return Number.isFinite(n) ? n.toFixed(digits) : '';
}

function addressKey(candidate) {
  const a = candidate.geography?.address ?? {};
  return normalizeText([
    a.prefecture,
    a.city,
    a.district,
    a.suburb,
    a.street,
    a.housenumber,
    a.full
  ].filter(Boolean).join(''));
}

function sourceKey(candidate) {
  const source = candidate.source ?? {};
  return `${source.element_type ?? ''}:${source.element_id ?? ''}`;
}

function identityKeys(candidate) {
  const name = normalizeText(candidate.identity?.name_ja ?? candidate.identity?.name);
  const lat = roundCoord(candidate.geography?.lat);
  const lon = roundCoord(candidate.geography?.lon);
  const address = addressKey(candidate);
  const keys = [];
  const source = sourceKey(candidate);
  if (source !== ':') keys.push(`source:${source}`);
  if (name && lat && lon) keys.push(`name_coord:${name}:${lat}:${lon}`);
  if (name && address) keys.push(`name_address:${name}:${address}`);
  return keys;
}

async function collectJsonFiles(root) {
  const found = [];
  async function walk(dir) {
    for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) await walk(full);
      else if (/JP-\d{2}\.json$/.test(entry.name)) found.push(full);
    }
  }
  await walk(root);
  return found.sort();
}

function parseArgs(argv) {
  const args = { input: null, out: null };
  for (let i = 0; i < argv.length; i += 1) {
    if (argv[i] === '--input') args.input = path.resolve(argv[++i]);
    else if (argv[i] === '--out') args.out = path.resolve(argv[++i]);
    else throw new Error(`Unknown argument: ${argv[i]}`);
  }
  if (!args.input) throw new Error('Missing --input <directory>.');
  if (!args.out) throw new Error('Missing --out <file>.');
  return args;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const files = await collectJsonFiles(args.input);
  if (files.length === 0) throw new Error(`No JP-XX.json files found under ${args.input}`);

  const prefectures = [];
  const allCandidates = [];
  for (const file of files) {
    const payload = JSON.parse(await fs.readFile(file, 'utf8'));
    if (payload.site_id !== 'jinja' || !/^JP-\d{2}$/.test(payload.iso3166_2 ?? '')) {
      throw new Error(`Invalid Jinja prefecture payload: ${file}`);
    }
    prefectures.push({ iso3166_2: payload.iso3166_2, candidate_count: payload.candidates?.length ?? 0 });
    for (const candidate of payload.candidates ?? []) allCandidates.push(candidate);
  }

  const parent = Array.from({ length: allCandidates.length }, (_, i) => i);
  const find = (x) => parent[x] === x ? x : (parent[x] = find(parent[x]));
  const union = (a, b) => {
    const ra = find(a);
    const rb = find(b);
    if (ra !== rb) parent[rb] = ra;
  };

  const keyOwner = new Map();
  allCandidates.forEach((candidate, index) => {
    for (const key of identityKeys(candidate)) {
      if (keyOwner.has(key)) union(index, keyOwner.get(key));
      else keyOwner.set(key, index);
    }
  });

  const groups = new Map();
  allCandidates.forEach((candidate, index) => {
    const root = find(index);
    if (!groups.has(root)) groups.set(root, []);
    groups.get(root).push(candidate);
  });

  const deduped = [];
  const duplicateGroups = [];
  for (const members of groups.values()) {
    const sorted = [...members].sort((a, b) => String(a.candidate_id).localeCompare(String(b.candidate_id)));
    deduped.push(sorted[0]);
    if (sorted.length > 1) {
      duplicateGroups.push({
        representative_candidate_id: sorted[0].candidate_id,
        member_candidate_ids: sorted.map((x) => x.candidate_id),
        member_count: sorted.length
      });
    }
  }

  deduped.sort((a, b) => String(a.candidate_id).localeCompare(String(b.candidate_id)));
  duplicateGroups.sort((a, b) => b.member_count - a.member_count || a.representative_candidate_id.localeCompare(b.representative_candidate_id));

  const output = {
    format_version: 1,
    site_id: 'jinja',
    aggregation_mode: 'candidate_only',
    promotion_authorized: false,
    generated_at: new Date().toISOString(),
    prefecture_file_count: prefectures.length,
    raw_candidate_count: allCandidates.length,
    deduped_candidate_count: deduped.length,
    duplicate_candidate_count: allCandidates.length - deduped.length,
    duplicate_group_count: duplicateGroups.length,
    prefectures: prefectures.sort((a, b) => a.iso3166_2.localeCompare(b.iso3166_2)),
    duplicate_groups: duplicateGroups,
    candidates: deduped
  };

  await fs.mkdir(path.dirname(args.out), { recursive: true });
  await fs.writeFile(args.out, `${JSON.stringify(output, null, 2)}\n`);
  console.log(`Prefectures: ${output.prefecture_file_count}`);
  console.log(`Raw candidates: ${output.raw_candidate_count}`);
  console.log(`Deduped candidates: ${output.deduped_candidate_count}`);
  console.log(`Duplicates removed: ${output.duplicate_candidate_count} across ${output.duplicate_group_count} groups`);
}

main().catch((error) => {
  console.error(error.stack ?? error.message ?? String(error));
  process.exitCode = 1;
});
