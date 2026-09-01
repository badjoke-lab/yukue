import { buildNationalCandidatesFromCsv } from "./matsuri-national-csv-acquisition.mjs";

const SAFE_SUBTYPES = new Set(["祭礼(信仰)", "神楽", "田楽", "風流", "延年・おこない"]);
const FIELD_LABELS = [
  "名称",
  "ふりがな",
  "種別1",
  "種別2",
  "その他参考となるべき事項",
  "指定証書番号",
  "指定年月日",
  "追加年月日",
  "指定基準1",
  "指定基準2",
  "指定基準3",
  "所在都道府県、地域",
  "所在地",
  "保護団体名",
  "解説文",
  "関連情報",
];

function decodeHtml(value) {
  return String(value ?? "")
    .replace(/&nbsp;/gu, " ")
    .replace(/&amp;/gu, "&")
    .replace(/&lt;/gu, "<")
    .replace(/&gt;/gu, ">")
    .replace(/&quot;/gu, '"')
    .replace(/&#39;/gu, "'")
    .replace(/<br\s*\/?\s*>/giu, " ")
    .replace(/<[^>]+>/gu, " ")
    .replace(/\s+/gu, " ")
    .normalize("NFKC")
    .trim();
}

function escaped(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/gu, "\\$&");
}

function fieldFromTable(html, label) {
  const target = label.normalize("NFKC");
  for (const rowMatch of String(html ?? "").matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/giu)) {
    const cells = [...rowMatch[1].matchAll(/<t[dh]\b[^>]*>([\s\S]*?)<\/t[dh]>/giu)].map((match) => decodeHtml(match[1]));
    for (let index = 0; index < cells.length; index += 1) {
      const cell = cells[index].replace(/[：:]$/u, "").trim();
      if (cell === target) return cells[index + 1]?.trim() ?? "";
    }
  }
  return "";
}

function fieldFromText(text, label) {
  const otherLabels = FIELD_LABELS.filter((item) => item !== label).map(escaped).join("|");
  const match = text.match(
    new RegExp(`${escaped(label)}\\s*(?:：|:)\\s*(.*?)(?=\\s+(?:${otherLabels})\\s*(?:：|:)|$)`, "iu"),
  );
  return match?.[1]?.trim() ?? "";
}

function detailField(html, text, label) {
  const fromTable = fieldFromTable(html, label);
  if (fromTable || fromTable === "") {
    const labelPresentInTable = new RegExp(`<t[dh]\\b[^>]*>[\\s\\S]*?${escaped(label)}[\\s\\S]*?<\\/t[dh]>`, "iu").test(html);
    if (labelPresentInTable) return fromTable;
  }
  return fieldFromText(text, label);
}

export function parseBunkaDetailHtml(html, registerId, managedId) {
  const text = decodeHtml(html);
  if (!/国指定文化財等/u.test(text) || !/主情報/u.test(text)) return null;
  const name = detailField(html, text, "名称");
  const subtype = detailField(html, text, "種別2");
  const prefecture = detailField(html, text, "所在都道府県、地域");
  const location = detailField(html, text, "所在地");
  if (!name || !subtype || !prefecture) return null;
  return {
    register_id: String(registerId),
    managed_id: String(managedId),
    name,
    subtype,
    prefecture,
    location,
    safe: SAFE_SUBTYPES.has(subtype.normalize("NFKC")),
    url: `https://kunishitei.bunka.go.jp/heritage/detail/${registerId}/${managedId}`,
  };
}

function csvCell(value) {
  const text = String(value ?? "");
  return /[",\n\r]/u.test(text) ? `"${text.replace(/"/gu, '""')}"` : text;
}

export function buildCandidateBatchFromBunkaDetails(records, accessedAt) {
  const safe = records.filter((record) => record?.safe);
  const csv = [
    "台帳ID,管理対象ID,名称,種別2,都道府県、地域 ※美工品は「所有者住所（所在都道府県）」,所在地",
    ...safe.map((record) => [record.register_id, record.managed_id, record.name, record.subtype, record.prefecture, record.location].map(csvCell).join(",")),
  ].join("\n");
  return buildNationalCandidatesFromCsv(csv, { accessedAt });
}

export async function acquireBunkaDetails(options = {}) {
  const registers = options.registers ?? [302, 312];
  const minId = Number(options.minId ?? 1);
  const maxId = Number(options.maxId ?? 1000);
  const concurrency = Math.max(1, Math.min(Number(options.concurrency ?? 4), 8));
  const delayMs = Math.max(50, Number(options.delayMs ?? 125));
  const fetchImpl = options.fetchImpl ?? fetch;
  if (!Number.isInteger(minId) || !Number.isInteger(maxId) || minId < 1 || maxId < minId) {
    throw new Error("Bunka detail ID range must be positive integers with minId <= maxId.");
  }
  const tasks = [];
  for (const registerId of registers) {
    for (let managedId = minId; managedId <= maxId; managedId += 1) tasks.push([registerId, managedId]);
  }
  let cursor = 0;
  const found = [];
  const errors = [];
  async function worker() {
    while (cursor < tasks.length) {
      const [registerId, managedId] = tasks[cursor++];
      const url = `https://kunishitei.bunka.go.jp/heritage/detail/${registerId}/${managedId}`;
      try {
        const response = await fetchImpl(url, { headers: { "user-agent": "badjoke-lab-yukue/1.0 (+https://github.com/badjoke-lab/yukue)" }, signal: AbortSignal.timeout(15000) });
        if (response.status === 404) continue;
        if (!response.ok) {
          errors.push({ register_id: registerId, managed_id: managedId, status: response.status });
          continue;
        }
        const record = parseBunkaDetailHtml(await response.text(), registerId, managedId);
        if (record) found.push(record);
      } catch (error) {
        errors.push({ register_id: registerId, managed_id: managedId, error: error instanceof Error ? error.message : String(error) });
      }
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }
  await Promise.all(Array.from({ length: concurrency }, () => worker()));
  found.sort((a, b) => Number(a.register_id) - Number(b.register_id) || Number(a.managed_id) - Number(b.managed_id));
  return { records: found, errors, scanned: tasks.length, min_id: minId, max_id: maxId, safe: found.filter((record) => record.safe).length };
}
