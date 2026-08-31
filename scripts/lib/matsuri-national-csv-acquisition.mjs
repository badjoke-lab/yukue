import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = fileURLToPath(new URL("../../", import.meta.url));
const inventoryPath = path.join(repositoryRoot, "config", "matsuri-national-source-inventory.json");

const TYPE_MAP = new Map([
  ["祭礼（信仰）", "festival"],
  ["神楽", "folk_performance"],
  ["田楽", "folk_performance"],
  ["風流", "folk_performance"],
  ["延年・おこない", "folk_performance"],
]);

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;
  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const next = text[i + 1];
    if (char === '"' && quoted && next === '"') {
      field += '"';
      i += 1;
      continue;
    }
    if (char === '"') {
      quoted = !quoted;
      continue;
    }
    if (char === "," && !quoted) {
      row.push(field);
      field = "";
      continue;
    }
    if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && next === "\n") i += 1;
      row.push(field);
      field = "";
      if (row.some((value) => value.length > 0)) rows.push(row);
      row = [];
      continue;
    }
    field += char;
  }
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    if (row.some((value) => value.length > 0)) rows.push(row);
  }
  return rows;
}

function norm(value) {
  return String(value ?? "").normalize("NFKC").trim();
}

function slug(value) {
  return norm(value)
    .toLocaleLowerCase("ja")
    .replace(/[^\p{Letter}\p{Number}]+/gu, "-")
    .replace(/^-+|-+$/gu, "") || "record";
}

function headerIndex(headers, candidates) {
  for (const candidate of candidates) {
    const index = headers.indexOf(candidate);
    if (index >= 0) return index;
  }
  return -1;
}

function municipalityFromLocation(location) {
  const value = norm(location);
  const match = value.match(/^(.+?[市区町村])/u);
  return match?.[1] ?? null;
}

export function buildNationalCandidatesFromCsv(csvText, options = {}) {
  const inventory = JSON.parse(fs.readFileSync(options.inventoryPath ?? inventoryPath, "utf8"));
  const rows = parseCsv(csvText.replace(/^\uFEFF/u, ""));
  if (rows.length < 2) throw new Error("CSV must contain a header and at least one data row.");

  const headers = rows[0].map(norm);
  const nameIndex = headerIndex(headers, ["名称", "文化財名称", "name"]);
  const subtypeIndex = headerIndex(headers, ["種別２", "種別2", "分類２", "分類2"]);
  const prefectureIndex = headerIndex(headers, ["所在都道府県、地域", "都道府県", "所在都道府県"]);
  const locationIndex = headerIndex(headers, ["所在地", "所在", "location"]);
  const urlIndex = headerIndex(headers, ["詳細URL", "詳細ＵＲＬ", "URL", "url"]);
  const providerIdIndex = headerIndex(headers, ["管理番号", "登録番号", "指定番号", "record_id"]);

  for (const [label, index] of [["名称", nameIndex], ["種別2", subtypeIndex], ["都道府県", prefectureIndex], ["URL", urlIndex]]) {
    if (index < 0) throw new Error(`Required CSV column not found: ${label}`);
  }

  const prefectureByName = new Map((inventory.prefectures ?? []).map((item) => [item.name_ja, item]));
  const accessedAt = options.accessedAt;
  if (!/^\d{4}-\d{2}-\d{2}$/u.test(String(accessedAt ?? ""))) {
    throw new Error("accessedAt must be YYYY-MM-DD");
  }

  const candidates = [];
  const skipped = [];
  for (let rowIndex = 1; rowIndex < rows.length; rowIndex += 1) {
    const row = rows[rowIndex];
    const name = norm(row[nameIndex]);
    const subtype = norm(row[subtypeIndex]);
    const entityType = TYPE_MAP.get(subtype);
    if (!entityType) {
      skipped.push({ row: rowIndex + 1, reason: "subtype_not_matsuri_safe", subtype, name });
      continue;
    }
    const prefectureName = norm(row[prefectureIndex]).split(/[・／,，]/u)[0];
    const prefecture = prefectureByName.get(prefectureName);
    const sourceUrl = norm(row[urlIndex]);
    if (!name || !prefecture || !/^https?:\/\//u.test(sourceUrl)) {
      skipped.push({ row: rowIndex + 1, reason: "required_identity_or_source_missing", subtype, name, prefecture_name_ja: prefectureName });
      continue;
    }

    const location = locationIndex >= 0 ? norm(row[locationIndex]) : "";
    const municipality = municipalityFromLocation(location);
    const providerRecordId = providerIdIndex >= 0 ? norm(row[providerIdIndex]) : "";
    const candidateId = `bunka-${providerRecordId || `${slug(prefectureName)}-${slug(name)}`}`;

    candidates.push({
      candidate_id: candidateId,
      entity_type: entityType,
      name_ja: name,
      geography: {
        prefecture_code: prefecture.code,
        prefecture_name_ja: prefecture.name_ja,
        municipality_name_ja: municipality,
        broader_scope_ja: municipality ? null : prefecture.name_ja,
      },
      source: {
        family_id: "national_cultural_database",
        url: sourceUrl,
        accessed_at: accessedAt,
        publisher_name: "文化庁",
        publisher_role_verified: true,
        provider_record_id: providerRecordId || null,
      },
    });
  }

  return {
    schema_version: "matsuri.tier-a-candidate-batch.v1",
    contains_real_candidates: true,
    source_family_id: "national_cultural_database",
    generated_at: `${accessedAt}T00:00:00Z`,
    counts: { input_rows: rows.length - 1, candidates: candidates.length, skipped: skipped.length },
    candidates,
    skipped,
  };
}

export { parseCsv, repositoryRoot };
