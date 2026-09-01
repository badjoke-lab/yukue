import crypto from "node:crypto";

function decodeHtml(value) {
  return value
    .replace(/<br\s*\/?\s*>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;|&#160;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&#x27;/gi, "'")
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)))
    .replace(/\s+/g, " ")
    .trim();
}

function extractCells(rowHtml) {
  return [...rowHtml.matchAll(/<t[dh]\b[^>]*>([\s\S]*?)<\/t[dh]>/gi)].map((match) => decodeHtml(match[1]));
}

export function discoverMunicipalityPages(indexHtml, indexUrl) {
  const index = new URL(indexUrl);
  const pages = new Map();
  for (const match of indexHtml.matchAll(/<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi)) {
    const label = decodeHtml(match[2]);
    if (!/(市|町|村|区)$/.test(label)) continue;
    const url = new URL(match[1], index).toString();
    if (!url.startsWith(`${index.origin}/gakuji/shuukyou/houjin/`)) continue;
    pages.set(url, { municipality_label: label, url });
  }
  return [...pages.values()].sort((a, b) => a.url.localeCompare(b.url));
}

export function parseSourceUpdatedLabel(html) {
  const match = html.match(/更新日[：:]\s*([^<\n]+)/i);
  return match ? decodeHtml(match[1]) : null;
}

function stableCandidateId({ prefectureCode, districtCode, serial, corporationName, municipality, address }) {
  const key = [prefectureCode, districtCode, serial, corporationName, municipality, address].join("|");
  return `jiin-pref-authority:${prefectureCode}:${crypto.createHash("sha256").update(key).digest("hex").slice(0, 20)}`;
}

export function parseChibaMunicipalityRoster(html, { sourceUrl, prefectureCode = "12", prefecture = "千葉県" } = {}) {
  if (!sourceUrl) throw new Error("sourceUrl is required");
  const rows = [...html.matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/gi)].map((match) => extractCells(match[1])).filter((cells) => cells.length > 0);
  const headerIndex = rows.findIndex((cells) => ["系統", "包括団体名", "法人名", "市町村名", "所在地"].every((label) => cells.includes(label)));
  if (headerIndex < 0) throw new Error(`No Chiba roster header found in ${sourceUrl}`);

  const header = rows[headerIndex];
  const column = Object.fromEntries(header.map((name, index) => [name, index]));
  const districtIndex = header.findIndex((name) => name.includes("地区") && name.includes("コード"));
  const serialIndex = header.findIndex((name) => name === "連番");
  if (districtIndex < 0 || serialIndex < 0) throw new Error(`Missing Chiba source key columns in ${sourceUrl}`);

  const candidates = [];
  for (const cells of rows.slice(headerIndex + 1)) {
    if (cells.length < header.length) continue;
    const lineage = cells[column["系統"]]?.trim();
    if (lineage !== "仏教系") continue;

    const districtCode = cells[districtIndex]?.trim();
    const serial = cells[serialIndex]?.trim();
    const inclusiveOrganization = cells[column["包括団体名"]]?.trim();
    const corporationName = cells[column["法人名"]]?.trim();
    const municipality = cells[column["市町村名"]]?.trim();
    const address = cells[column["所在地"]]?.trim();
    if (!districtCode || !serial || !corporationName || !municipality || !address) continue;

    const candidate = {
      candidate_id: stableCandidateId({ prefectureCode, districtCode, serial, corporationName, municipality, address }),
      source_key: `${prefectureCode}:${districtCode}:${serial}`,
      source_authority: prefecture,
      source_url: sourceUrl,
      authority_scope: "public_authority_candidate_identity",
      lineage,
      inclusive_organization: inclusiveOrganization || null,
      corporation_name: corporationName,
      prefecture,
      municipality,
      address,
      review_status: "pending_jiin_specialist_review",
      canonical_promotion_authorized: false,
      blockers: [
        "jiin_entity_boundary_and_dedupe_review_required",
        "jiin_temple_identity_confirmation_required"
      ]
    };

    // Deliberately do not copy the public roster's representative-officer column.
    candidates.push(candidate);
  }

  return candidates;
}

export function summarizeCandidates(candidates) {
  const byMunicipality = new Map();
  const byInclusiveOrganization = new Map();
  for (const candidate of candidates) {
    byMunicipality.set(candidate.municipality, (byMunicipality.get(candidate.municipality) ?? 0) + 1);
    const organization = candidate.inclusive_organization ?? "単立/未記載";
    byInclusiveOrganization.set(organization, (byInclusiveOrganization.get(organization) ?? 0) + 1);
  }
  const sortEntries = (map) => [...map.entries()].map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, "ja"));
  return {
    candidate_count: candidates.length,
    municipalities: sortEntries(byMunicipality),
    inclusive_organizations: sortEntries(byInclusiveOrganization),
  };
}
