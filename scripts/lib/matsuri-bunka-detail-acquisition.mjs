import { buildNationalCandidatesFromCsv } from "./matsuri-national-csv-acquisition.mjs";

const SAFE_SUBTYPES = new Set(["祭礼(信仰)", "神楽", "田楽", "風流", "延年・おこない"]);

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

function field(html, label) {
  const escaped = label.replace(/[.*+?^${}()|[\]\\]/gu, "\\$&");
  const match = html.match(new RegExp(`${escaped}\\s*(?:：|:)\\s*([\\s\\S]{0,700}?)(?=<(?:br|/td|/div|/p|dt|th)\\b|(?:名称|ふりがな|種別1|種別2|所在都道府県、地域|所在地|保護団体名)\\s*(?:：|:))`, "iu"));
  return decodeHtml(match?.[1] ?? "");
}

export function parseBunkaDetailHtml(html, registerId, managedId) {
  const text = String(html ?? "");
  if (!/国指定文化財等/u.test(text) || !/主情報/u.test(text)) return null;
  const name = field(text, "名称");
  const subtype = field(text, "種別2");
  const prefecture = field(text, "所在都道府県、地域");
  const location = field(text, "所在地");
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
  const maxId = Number(options.maxId ?? 1000);
  const concurrency = Math.max(1, Math.min(Number(options.concurrency ?? 4), 8));
  const delayMs = Math.max(50, Number(options.delayMs ?? 125));
  const fetchImpl = options.fetchImpl ?? fetch;
  const tasks = [];
  for (const registerId of registers) {
    for (let managedId = 1; managedId <= maxId; managedId += 1) tasks.push([registerId, managedId]);
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
  return { records: found, errors, scanned: tasks.length, safe: found.filter((record) => record.safe).length };
}
