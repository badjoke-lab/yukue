import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const DEFAULT_ENDPOINT = 'https://overpass-api.de/api/interpreter';
const PREFECTURES = Array.from({ length: 47 }, (_, i) => `JP-${String(i + 1).padStart(2, '0')}`);
const DEFAULT_OUT_DIR = new URL('../research/national-candidates/osm/', import.meta.url);

export function buildQuery(isoCode) {
  return `[out:json][timeout:180];\narea["ISO3166-2"="${isoCode}"][boundary=administrative]->.pref;\n(\n  nwr["amenity"="place_of_worship"]["religion"="shinto"](area.pref);\n);\nout center tags;`;
}

export function normalizeElement(element, isoCode, acquiredAt) {
  const tags = element.tags ?? {};
  const lat = element.lat ?? element.center?.lat ?? null;
  const lon = element.lon ?? element.center?.lon ?? null;
  return {
    candidate_id: `osm-${element.type}-${element.id}`,
    candidate_site_id: 'jinja',
    status: 'candidate_unreviewed',
    promotion_authorized: false,
    source: {
      provider: 'OpenStreetMap contributors',
      source_type: 'discovery_seed',
      license: 'ODbL-1.0',
      element_type: element.type,
      element_id: element.id,
      url: `https://www.openstreetmap.org/${element.type}/${element.id}`,
      acquired_at: acquiredAt
    },
    geography: {
      iso3166_2: isoCode,
      lat,
      lon,
      address: {
        full: tags['addr:full'] ?? null,
        prefecture: tags['addr:province'] ?? tags['addr:state'] ?? null,
        city: tags['addr:city'] ?? null,
        district: tags['addr:district'] ?? null,
        suburb: tags['addr:suburb'] ?? null,
        street: tags['addr:street'] ?? null,
        housenumber: tags['addr:housenumber'] ?? null,
        postcode: tags['addr:postcode'] ?? null
      }
    },
    identity: {
      name_ja: tags['name:ja'] ?? tags.name ?? null,
      name: tags.name ?? null,
      website: tags.website ?? tags['contact:website'] ?? null,
      wikidata: tags.wikidata ?? null,
      wikipedia: tags.wikipedia ?? null,
      denomination: tags.denomination ?? null
    },
    raw_tags: tags
  };
}

async function fetchOverpass(endpoint, query, attempts = 3) {
  let lastError;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const body = new URLSearchParams({ data: query });
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded;charset=UTF-8' },
        body,
        signal: AbortSignal.timeout(210_000)
      });
      if (!response.ok) throw new Error(`Overpass HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      lastError = error;
      if (attempt < attempts) await new Promise((resolve) => setTimeout(resolve, attempt * 5000));
    }
  }
  throw lastError;
}

function parseArgs(argv) {
  const args = { endpoint: DEFAULT_ENDPOINT, outDir: DEFAULT_OUT_DIR, dryRun: false, targets: [] };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--all') args.targets = [...PREFECTURES];
    else if (arg === '--prefecture') args.targets.push(argv[++i]);
    else if (arg === '--endpoint') args.endpoint = argv[++i];
    else if (arg === '--out-dir') args.outDir = path.resolve(argv[++i]);
    else if (arg === '--dry-run') args.dryRun = true;
    else throw new Error(`Unknown argument: ${arg}`);
  }
  if (args.targets.length === 0) throw new Error('Specify --all or at least one --prefecture JP-XX.');
  for (const code of args.targets) if (!PREFECTURES.includes(code)) throw new Error(`Invalid prefecture ISO code: ${code}`);
  args.targets = [...new Set(args.targets)];
  return args;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const acquiredAt = new Date().toISOString();
  const manifest = {
    format_version: 1,
    site_id: 'jinja',
    acquisition_mode: 'candidate_only',
    promotion_authorized: false,
    source: 'OpenStreetMap / Overpass',
    license: 'ODbL-1.0',
    acquired_at: acquiredAt,
    prefectures: []
  };

  for (const isoCode of args.targets) {
    const query = buildQuery(isoCode);
    if (args.dryRun) {
      console.log(`--- ${isoCode} ---\n${query}`);
      continue;
    }
    const payload = await fetchOverpass(args.endpoint, query);
    const candidates = (payload.elements ?? []).map((element) => normalizeElement(element, isoCode, acquiredAt));
    const output = {
      format_version: 1,
      site_id: 'jinja',
      iso3166_2: isoCode,
      acquisition_mode: 'candidate_only',
      promotion_authorized: false,
      source_attribution: '© OpenStreetMap contributors, ODbL 1.0',
      acquired_at: acquiredAt,
      candidate_count: candidates.length,
      candidates
    };
    await fs.mkdir(args.outDir, { recursive: true });
    const filePath = path.join(String(args.outDir), `${isoCode}.json`);
    await fs.writeFile(filePath, `${JSON.stringify(output, null, 2)}\n`);
    manifest.prefectures.push({ iso3166_2: isoCode, candidate_count: candidates.length, file: `${isoCode}.json` });
    console.log(`${isoCode}: ${candidates.length} candidates`);
  }

  if (!args.dryRun) {
    manifest.total_candidate_count = manifest.prefectures.reduce((sum, item) => sum + item.candidate_count, 0);
    await fs.writeFile(path.join(String(args.outDir), 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);
    console.log(`TOTAL: ${manifest.total_candidate_count} candidates across ${manifest.prefectures.length} prefectures`);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => {
    console.error(error.stack ?? error.message ?? String(error));
    process.exitCode = 1;
  });
}
