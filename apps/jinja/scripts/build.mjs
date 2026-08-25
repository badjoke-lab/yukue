import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const appRoot = fileURLToPath(new URL("../", import.meta.url));
const dist = path.join(appRoot, "dist");
const dataPath = path.join(appRoot, "data", "canonical.json");
const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function page({ title, body }) {
  return `<!doctype html>
<html lang="ja">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex,nofollow" />
    <title>${escapeHtml(title)}</title>
    <style>
      :root { color-scheme: dark; font-family: system-ui, sans-serif; }
      * { box-sizing: border-box; }
      body { margin: 0; background: #101010; color: #ededed; line-height: 1.65; }
      main { max-width: 980px; margin: 0 auto; padding: 48px 22px 80px; }
      a { color: #ededed; text-underline-offset: .18em; }
      h1 { font-size: clamp(2.2rem, 7vw, 4.6rem); line-height: 1.05; margin: .25em 0 .35em; }
      h2 { margin-top: 2.2rem; border-top: 1px solid #3b3b3b; padding-top: 1rem; }
      .eyebrow { letter-spacing: .08em; opacity: .68; text-transform: uppercase; }
      .notice { border: 1px solid #686868; padding: 14px 16px; margin: 24px 0 32px; }
      .cards { display: grid; gap: 14px; grid-template-columns: repeat(auto-fit,minmax(260px,1fr)); }
      .card { border: 1px solid #3d3d3d; padding: 18px; }
      .meta { color: #bcbcbc; font-size: .94rem; }
      .badge { display: inline-block; border: 1px solid #777; border-radius: 999px; padding: .1rem .55rem; margin-right: .35rem; font-size: .85rem; }
      dl { display: grid; grid-template-columns: minmax(120px,180px) 1fr; gap: .5rem 1rem; }
      dt { color: #aaa; }
      dd { margin: 0; }
      code { overflow-wrap: anywhere; }
    </style>
  </head>
  <body>
    <main>
      <p class="eyebrow">Yukue Series / Public preview</p>
      <div class="notice"><strong>Public preview.</strong> workers.dev 上の非canonical・noindexプレビューです。独自ドメイン、canonical化、検索エンジン登録はまだ行いません。</div>
      ${body}
    </main>
  </body>
</html>`;
}

assert(data.site_id === "jinja", "Unexpected Jinja canonical site_id");
assert(data.publication_status === "public_preview_noncanonical", "Jinja preview build requires public_preview_noncanonical data");
assert(Array.isArray(data.entities), "Jinja canonical entities missing");

const places = new Map(data.places.map((record) => [record.id, record]));
const sources = new Map(data.sources.map((record) => [record.id, record]));
const statesByEntity = new Map();
for (const state of data.states) {
  if (!statesByEntity.has(state.entity_id)) statesByEntity.set(state.entity_id, []);
  statesByEntity.get(state.entity_id).push(state);
}

fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(path.join(dist, "data"), { recursive: true });
fs.copyFileSync(dataPath, path.join(dist, "data", "canonical.json"));

const approvedEntities = data.entities.filter((entity) => entity.review_status === "approved");
const cards = approvedEntities.map((entity) => {
  const place = places.get(entity.current_place_id);
  const location = place ? `${place.prefecture} ${place.municipality}` : "所在地未確認";
  return `<article class="card">
    <p><span class="badge">Tier ${escapeHtml(entity.tier)}</span><span class="badge">reviewed</span></p>
    <h2><a href="/shrines/${encodeURIComponent(entity.id)}/">${escapeHtml(entity.canonical_name)}</a></h2>
    <p>${escapeHtml(location)}</p>
    <p class="meta">確認日: ${escapeHtml(entity.verified_at)}</p>
  </article>`;
}).join("\n");

const indexHtml = page({
  title: "神社のゆくえ — Public preview",
  body: `<h1>神社のゆくえ</h1>
    <p>神社の継続・移転・遷座・合祀・再建・管理関係と、その根拠を記録する専門アーカイブです。</p>
    <p class="meta">現在のreview済みpreview収録: ${approvedEntities.length}件</p>
    <div class="cards">${cards || "<p>review済みレコードはまだありません。</p>"}</div>
    <h2>Machine-readable</h2>
    <p><a href="/data/canonical.json">Jinja canonical preview JSON</a></p>`,
});
fs.writeFileSync(path.join(dist, "index.html"), indexHtml);

for (const entity of approvedEntities) {
  const entityDir = path.join(dist, "shrines", entity.id);
  fs.mkdirSync(entityDir, { recursive: true });
  const place = places.get(entity.current_place_id);
  const entityStates = statesByEntity.get(entity.id) ?? [];
  const evidence = data.evidence.filter((record) => record.target_id === entity.id);
  const entityEvents = data.events.filter((record) => record.entity_id === entity.id);
  const entityRelations = data.relations.filter((record) => record.source_entity_id === entity.id || record.target_entity_id === entity.id);

  const stateText = entityStates.length > 0
    ? entityStates.map((state) => `${escapeHtml(state.continuity_state)} (${escapeHtml(state.verified_at)})`).join(" / ")
    : "未確認 — StateはEvidence確認後に追加し、推測では補いません。";
  const officialLinks = (entity.official_links ?? []).map((url) => `<li><a href="${escapeHtml(url)}" rel="external">${escapeHtml(url)}</a></li>`).join("");
  const evidenceHtml = evidence.map((record) => {
    const source = sources.get(record.source_id);
    const sourceLink = source ? `<a href="${escapeHtml(source.url)}" rel="external">${escapeHtml(source.title)}</a>` : escapeHtml(record.source_id);
    return `<li>${escapeHtml(record.summary)} — ${sourceLink} / 確認日 ${escapeHtml(record.verified_at)}</li>`;
  }).join("");

  const detailHtml = page({
    title: `${entity.canonical_name} — 神社のゆくえ`,
    body: `<p><a href="/">← 神社一覧</a></p>
      <h1>${escapeHtml(entity.canonical_name)}</h1>
      <p><span class="badge">Tier ${escapeHtml(entity.tier)}</span><span class="badge">reviewed</span></p>
      <dl>
        <dt>ID</dt><dd><code>${escapeHtml(entity.id)}</code></dd>
        <dt>所在地</dt><dd>${place ? `${escapeHtml(place.prefecture)} ${escapeHtml(place.municipality)}${place.address ? ` / ${escapeHtml(place.address)}` : ""}` : "未確認"}</dd>
        <dt>Current State</dt><dd>${stateText}</dd>
        <dt>確認日</dt><dd>${escapeHtml(entity.verified_at)}</dd>
      </dl>
      <h2>公式リンク</h2><ul>${officialLinks || "<li>未収録</li>"}</ul>
      <h2>Evidence</h2><ul>${evidenceHtml || "<li>未収録</li>"}</ul>
      <h2>Timeline</h2><p>${entityEvents.length === 0 ? "review済みChange Eventはまだありません。" : `${entityEvents.length}件`}</p>
      <h2>Relations</h2><p>${entityRelations.length === 0 ? "review済みRelationはまだありません。" : `${entityRelations.length}件`}</p>
      <h2>Machine-readable</h2><p><a href="/data/canonical.json">canonical preview JSON</a></p>`,
  });
  fs.writeFileSync(path.join(entityDir, "index.html"), detailHtml);
}

for (const entity of approvedEntities) {
  assert(fs.existsSync(path.join(dist, "shrines", entity.id, "index.html")), `Missing detail page for ${entity.id}`);
}
assert(fs.existsSync(path.join(dist, "data", "canonical.json")), "Missing machine-readable Jinja canonical preview");
console.log(`Built Jinja data-driven preview: ${approvedEntities.length} shrine detail page(s).`);
