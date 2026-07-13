import type { PublicProjection } from "@badjoke-lab/yukue-observation-core";

export interface MachineReadableConfig {
  projectId: string;
  siteId: string;
  siteName: string;
  datasetType: string;
  datasetVersion: string;
  schemaVersion: string;
  siteOrigin?: string;
  sitemapPaths: string[];
}

export interface GeneratedPublicFile {
  path: string;
  contentType: "application/json" | "text/plain" | "application/xml";
  content: string;
}

const baselineFileInventory = [
  "/version.json",
  "/data/manifest.json",
  "/data/entities.json",
  "/data/events.json",
  "/data/relations.json",
  "/data/occurrences.json",
  "/llms.txt",
  "/ai.txt",
  "/robots.txt",
  "/sitemap.xml",
] as const;

function jsonFile(path: string, value: unknown): GeneratedPublicFile {
  return {
    path,
    contentType: "application/json",
    content: `${JSON.stringify(value, null, 2)}\n`,
  };
}

function textFile(
  path: string,
  content: string,
  contentType: GeneratedPublicFile["contentType"] = "text/plain",
): GeneratedPublicFile {
  return {
    path,
    contentType,
    content: content.endsWith("\n") ? content : `${content}\n`,
  };
}

function recordFeed(
  config: MachineReadableConfig,
  recordType: string,
  records: unknown[],
) {
  return {
    project_id: config.projectId,
    site_id: config.siteId,
    dataset_version: config.datasetVersion,
    schema_version: config.schemaVersion,
    record_type: recordType,
    record_count: records.length,
    records,
  };
}

function normalizeOrigin(origin: string | undefined): string | undefined {
  if (!origin) return undefined;
  return origin.endsWith("/") ? origin.slice(0, -1) : origin;
}

function xmlEscape(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function buildSitemap(
  paths: string[],
  siteOrigin: string | undefined,
): string {
  const origin = normalizeOrigin(siteOrigin);
  const uniquePaths = [...new Set(paths)].sort((a, b) => a.localeCompare(b));
  const urls = uniquePaths.map((path) => {
    const location = origin ? `${origin}${path}` : path;
    return `  <url><loc>${xmlEscape(location)}</loc></url>`;
  });

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls,
    "</urlset>",
    "",
  ].join("\n");
}

function buildRobotsText(siteOrigin: string | undefined): string {
  const origin = normalizeOrigin(siteOrigin);
  const lines = ["User-agent: *", "Allow: /"];

  if (origin) {
    lines.push("", `Sitemap: ${origin}/sitemap.xml`);
  }

  return `${lines.join("\n")}\n`;
}

function buildLlmsText(config: MachineReadableConfig): string {
  return `# ${config.siteName}

${config.siteName}は、祭礼と民俗芸能の基本情報、現在状態、開催・上演履歴、変化、関係、指定、根拠資料を記録する観測型リファレンスです。

## Public data

- /data/manifest.json
- /data/entities.json
- /data/events.json
- /data/relations.json
- /data/occurrences.json

## Interpretation notes

- 人気ランキングではありません。
- Current Stateは承認済みの根拠に基づく観測値です。
- 一回のOccurrence中止だけでEntity Stateを休止・終了へ変更しません。
- Current StateとChange HistoryとOccurrence Historyは別の記録です。
- 公開JSONと公開HTMLは同じ承認済みPublic Projectionから生成されます。
- 個々の記録は確認日と根拠資料に基づき、後続確認によって更新される場合があります。

Dataset version: ${config.datasetVersion}
Schema version: ${config.schemaVersion}
`;
}

function buildAiText(config: MachineReadableConfig): string {
  return `site: ${config.siteName}
site_id: ${config.siteId}
dataset_type: ${config.datasetType}
dataset_version: ${config.datasetVersion}
schema_version: ${config.schemaVersion}
public_manifest: /data/manifest.json
entity_feed: /data/entities.json
event_feed: /data/events.json
relation_feed: /data/relations.json
occurrence_feed: /data/occurrences.json
current_state_note: evidence-based observation; check verification dates and supporting records
ranking_note: this dataset is not a popularity ranking
projection_note: public HTML and public JSON are generated from the same approved Public Projection
`;
}

export function generateMachineReadableBaseline(
  projection: PublicProjection,
  config: MachineReadableConfig,
): GeneratedPublicFile[] {
  const version = {
    project_id: config.projectId,
    site_id: config.siteId,
    site_name: config.siteName,
    dataset_type: config.datasetType,
    dataset_version: config.datasetVersion,
    schema_version: config.schemaVersion,
    verification_marker: "reviewed-public-projection",
  };

  const manifest = {
    project_id: config.projectId,
    site_id: config.siteId,
    site_name: config.siteName,
    dataset_type: config.datasetType,
    dataset_version: config.datasetVersion,
    schema_version: config.schemaVersion,
    primary_record_type: "entity",
    supporting_record_types: [
      "change_event",
      "relation",
      "occurrence",
    ],
    record_counts: {
      entities: projection.json.entities.length,
      events: projection.json.change_events.length,
      relations: projection.json.relations.length,
      occurrences: projection.json.occurrences.length,
    },
    data_safety: {
      canonical_only: true,
      approved_projection_only: true,
      excludes: [
        "candidate_queue",
        "internal_confidence",
        "review_notes",
        "private_source_conflicts",
      ],
    },
    files: [...baselineFileInventory],
    ...(config.siteOrigin ? { site_origin: normalizeOrigin(config.siteOrigin) } : {}),
  };

  return [
    jsonFile("/version.json", version),
    jsonFile("/data/manifest.json", manifest),
    jsonFile(
      "/data/entities.json",
      recordFeed(config, "entity", projection.json.entities),
    ),
    jsonFile(
      "/data/events.json",
      recordFeed(config, "change_event", projection.json.change_events),
    ),
    jsonFile(
      "/data/relations.json",
      recordFeed(config, "relation", projection.json.relations),
    ),
    jsonFile(
      "/data/occurrences.json",
      recordFeed(config, "occurrence", projection.json.occurrences),
    ),
    textFile("/llms.txt", buildLlmsText(config)),
    textFile("/ai.txt", buildAiText(config)),
    textFile("/robots.txt", buildRobotsText(config.siteOrigin)),
    textFile(
      "/sitemap.xml",
      buildSitemap(config.sitemapPaths, config.siteOrigin),
      "application/xml",
    ),
  ];
}

export { baselineFileInventory };
