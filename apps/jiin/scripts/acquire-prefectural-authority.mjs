import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { discoverMunicipalityPages, parseChibaMunicipalityRoster, parseSourceUpdatedLabel, summarizeCandidates } from "./lib/chiba-prefectural-roster.mjs";

const appRoot = fileURLToPath(new URL("../", import.meta.url));
const repositoryRoot = path.resolve(appRoot, "../..");
const registry = JSON.parse(fs.readFileSync(path.join(appRoot, "research", "prefectural-authority-sources.json"), "utf8"));

function argValue(name, fallback = null) {
  const prefix = `--${name}=`;
  const item = process.argv.slice(2).find((arg) => arg.startsWith(prefix));
  return item ? item.slice(prefix.length) : fallback;
}

async function fetchText(url, attempts = 3) {
  let lastError;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const response = await fetch(url, {
        headers: {
          "user-agent": "badjoke-lab-yukue-jiin-research/1.0 (+https://github.com/badjoke-lab/yukue)"
        },
        signal: AbortSignal.timeout(20_000),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.text();
    } catch (error) {
      lastError = error;
      if (attempt < attempts) await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
    }
  }
  throw new Error(`Failed to fetch ${url}: ${lastError instanceof Error ? lastError.message : String(lastError)}`);
}

const sourceId = argValue("source", "jp-chiba-religious-corporation-roster");
const source = registry.sources.find((item) => item.id === sourceId || item.prefecture.toLowerCase() === sourceId.toLowerCase());
if (!source) throw new Error(`Unknown Jiin authority source: ${sourceId}`);
if (source.adapter !== "chiba_html_municipality_roster") throw new Error(`Unsupported adapter: ${source.adapter}`);

const outputDir = path.resolve(repositoryRoot, argValue("output", ".artifacts/jiin-prefectural-authority"));
const indexHtml = await fetchText(source.index_url);
const municipalityPages = discoverMunicipalityPages(indexHtml, source.index_url);
if (municipalityPages.length === 0) throw new Error(`No municipality roster pages discovered from ${source.index_url}`);

const candidates = [];
const pages = [];
for (const page of municipalityPages) {
  const html = await fetchText(page.url);
  const pageCandidates = parseChibaMunicipalityRoster(html, {
    sourceUrl: page.url,
    prefectureCode: source.prefecture_code,
    prefecture: source.prefecture,
  });
  candidates.push(...pageCandidates);
  pages.push({
    municipality_label: page.municipality_label,
    source_url: page.url,
    source_updated_label: parseSourceUpdatedLabel(html),
    candidate_count: pageCandidates.length,
  });
}

const sourceKeys = new Set();
const candidateIds = new Set();
for (const candidate of candidates) {
  if (sourceKeys.has(candidate.source_key)) throw new Error(`Duplicate source key: ${candidate.source_key}`);
  if (candidateIds.has(candidate.candidate_id)) throw new Error(`Duplicate candidate id: ${candidate.candidate_id}`);
  sourceKeys.add(candidate.source_key);
  candidateIds.add(candidate.candidate_id);
  if ("representative_officer" in candidate || "representative" in candidate) throw new Error(`Unexpected representative-officer field in ${candidate.candidate_id}`);
}

const artifact = {
  format_version: 1,
  site_id: "jiin",
  generated_at: new Date().toISOString(),
  source: {
    id: source.id,
    prefecture_code: source.prefecture_code,
    prefecture: source.prefecture,
    publisher: source.publisher,
    index_url: source.index_url,
    authority_scope: source.authority_scope,
  },
  status: "candidate_review_queue_only",
  canonical_promotion_authorized: false,
  page_count: pages.length,
  pages,
  summary: summarizeCandidates(candidates),
  candidates,
};

fs.rmSync(outputDir, { recursive: true, force: true });
fs.mkdirSync(outputDir, { recursive: true });
const stem = `${source.prefecture_code}-${source.prefecture}`;
fs.writeFileSync(path.join(outputDir, `${stem}.json`), `${JSON.stringify(artifact, null, 2)}\n`, "utf8");
fs.writeFileSync(path.join(outputDir, `${stem}-summary.md`), [
  `# Jiin Prefectural Authority Acquisition — ${source.prefecture}`,
  "",
  `- Generated at: \`${artifact.generated_at}\``,
  `- Source pages: ${artifact.page_count}`,
  `- Buddhist-system candidate rows: ${artifact.summary.candidate_count}`,
  "- Canonical promotion authorized: false",
  "- Representative-officer names captured: no",
  "",
  "These rows are public-authority candidates only. They require Jiin entity-boundary/dedupe review and temple-identity confirmation before canonical promotion.",
  "",
].join("\n"), "utf8");

console.log(`Jiin ${source.prefecture} authority acquisition passed: ${artifact.summary.candidate_count} candidate(s) across ${artifact.page_count} municipality page(s); canonical promotion remains blocked.`);
