import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const appRoot = fileURLToPath(new URL("../", import.meta.url));
const repoRoot = path.resolve(appRoot, "..", "..");
const dist = path.join(appRoot, "dist");
const dataPath = path.join(appRoot, "data", "canonical.json");
const sharedStyleRoot = path.join(repoRoot, "packages", "ui", "src", "styles");
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

function loadSharedStyles() {
  const files = [
    "tokens.css",
    "base.css",
    "layout.css",
    "patterns.css",
    "history.css",
    "places.css",
    "images.css",
  ];

  return files.map((filename) => {
    const filePath = path.join(sharedStyleRoot, filename);
    assert(fs.existsSync(filePath), `Missing shared Yukue UI stylesheet: ${filename}`);
    let css = fs.readFileSync(filePath, "utf8");
    if (filename === "base.css") css = css.replace(/^@import\s+"\.\/tokens\.css";\s*/u, "");
    return `/* packages/ui/src/styles/${filename} */\n${css}`;
  }).join("\n\n");
}

const sharedCss = loadSharedStyles();

function siteHeader() {
  return `<header class="yk-site-header">
    <div class="yk-container yk-site-header__inner" data-size="wide">
      <a class="yk-site-header__brand" href="/">
        <span class="yk-site-header__brand-ja">神社のゆくえ</span>
        <span class="yk-site-header__brand-roman">JINJA NO YUKUE</span>
      </a>
      <nav class="yk-site-nav" aria-label="主要ナビゲーション">
        <a href="/" aria-current="page">神社一覧</a>
        <a href="/data/canonical.json">データ</a>
      </nav>
      <details class="yk-site-header__mobile">
        <summary>メニュー</summary>
        <nav class="yk-site-header__mobile-nav" aria-label="主要ナビゲーション（モバイル）">
          <a href="/" aria-current="page">神社一覧</a>
          <a href="/data/canonical.json">データ</a>
        </nav>
      </details>
    </div>
  </header>`;
}

function siteFooter() {
  return `<footer class="yk-site-footer">
    <div class="yk-container yk-site-footer__grid" data-size="wide">
      <div>
        <p class="yk-site-footer__brand">神社のゆくえ</p>
        <p class="yk-site-footer__series">Yukue Series / noncanonical public preview</p>
      </div>
      <div>
        <p class="yk-site-footer__group-title">Preview</p>
        <div class="yk-site-footer__links"><a href="/">神社一覧</a><a href="/data/canonical.json">Machine-readable data</a></div>
      </div>
      <div>
        <p class="yk-site-footer__group-title">Boundary</p>
        <div class="yk-site-footer__links"><span>noindex / nofollow</span><span>workers.dev only</span></div>
      </div>
      <div>
        <p class="yk-site-footer__group-title">Series</p>
        <div class="yk-site-footer__links"><span>祭のゆくえ</span><span>神社のゆくえ</span><span>寺院のゆくえ</span><span>弔いのゆくえ</span></div>
      </div>
    </div>
  </footer>`;
}

function page({ title, description, body }) {
  return `<!doctype html>
<html lang="ja" data-site="jinja">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex,nofollow" />
    <meta name="description" content="${escapeHtml(description)}" />
    <title>${escapeHtml(title)}</title>
    <style>${sharedCss}</style>
  </head>
  <body class="yk-page-shell">
    <a class="yk-skip-link" href="#yk-main-content">本文へ移動</a>
    <div class="yk-site-accent-rule" aria-hidden="true"></div>
    ${siteHeader()}
    <main id="yk-main-content" tabindex="-1">
      ${body}
    </main>
    ${siteFooter()}
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
const rows = approvedEntities.map((entity) => {
  const place = places.get(entity.current_place_id);
  const location = place ? `${place.prefecture}${place.municipality}` : "所在地未確認";
  return `<tr>
    <td><a href="/shrines/${encodeURIComponent(entity.id)}/">${escapeHtml(entity.canonical_name)}</a></td>
    <td>${escapeHtml(location)}</td>
    <td>Tier ${escapeHtml(entity.tier)}</td>
    <td>${escapeHtml(entity.verified_at)}</td>
  </tr>`;
}).join("\n");

const indexHtml = page({
  title: "神社のゆくえ — Public preview",
  description: "神社の継続・移転・遷座・合祀・再建・管理関係と、その根拠を記録する専門アーカイブの非canonicalプレビューです。",
  body: `<section class="yk-section" data-rule="strong">
      <div class="yk-container" data-size="wide">
        <p class="yk-section__kicker">YUKUE SERIES / PUBLIC PREVIEW</p>
        <h1>神社のゆくえ</h1>
        <p class="yk-prose">神社の継続・移転・遷座・合祀・再建・管理関係と、その根拠を記録する専門アーカイブです。</p>
        <p class="yk-prose"><strong>Public preview.</strong> 現在は workers.dev 上の非canonical・noindexプレビューです。独自ドメイン、canonical化、検索エンジン登録はまだ行いません。</p>
      </div>
    </section>
    <section class="yk-section">
      <div class="yk-container" data-size="wide">
        <div class="yk-section__head"><div class="yk-section__heading-group"><p class="yk-section__kicker">SNAPSHOT</p><h2 class="yk-section__title">現在の収録状況</h2></div></div>
        <div class="yk-snapshot" style="--snapshot-columns: 2">
          <div class="yk-snapshot__item"><span class="yk-snapshot__value">${approvedEntities.length}</span><span class="yk-snapshot__label">review済み神社</span></div>
          <div class="yk-snapshot__item"><span class="yk-snapshot__value">Preview</span><span class="yk-snapshot__label">非canonical / noindex</span></div>
        </div>
      </div>
    </section>
    <section class="yk-section">
      <div class="yk-container" data-size="wide">
        <div class="yk-section__head"><div class="yk-section__heading-group"><p class="yk-section__kicker">REVIEWED SHRINES</p><h2 class="yk-section__title">収録済み</h2></div></div>
        <div class="yk-occurrence-table-wrap"><table class="yk-occurrence-table"><thead><tr><th>神社</th><th>所在地</th><th>Evidence tier</th><th>確認日</th></tr></thead><tbody>${rows || "<tr><td colspan=\"4\">review済みレコードはまだありません。</td></tr>"}</tbody></table></div>
      </div>
    </section>
    <section class="yk-section" data-rule="none">
      <div class="yk-container" data-size="wide">
        <div class="yk-section__head"><div class="yk-section__heading-group"><p class="yk-section__kicker">MACHINE READABLE</p><h2 class="yk-section__title">データ</h2></div></div>
        <p class="yk-prose"><a class="yk-action-link" href="/data/canonical.json">Jinja canonical preview JSON</a></p>
      </div>
    </section>`,
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
    description: `${entity.canonical_name}のreview済みidentity・location・evidenceを表示する神社のゆくえ非canonicalプレビューです。`,
    body: `<section class="yk-section" data-rule="strong">
        <div class="yk-container" data-size="wide">
          <p><a class="yk-action-link" href="/">神社一覧へ戻る</a></p>
          <p class="yk-section__kicker">REVIEWED SHRINE / TIER ${escapeHtml(entity.tier)}</p>
          <h1>${escapeHtml(entity.canonical_name)}</h1>
          <p class="yk-prose">確認済みの情報だけを表示します。未確認のState・Event・Relationは推測で補いません。</p>
        </div>
      </section>
      <section class="yk-section">
        <div class="yk-container" data-size="wide">
          <div class="yk-section__head"><div class="yk-section__heading-group"><p class="yk-section__kicker">OVERVIEW</p><h2 class="yk-section__title">基本情報</h2></div></div>
          <div class="yk-overview">
            <div class="yk-overview__item"><div class="yk-overview__label">ID</div><p class="yk-overview__value"><code>${escapeHtml(entity.id)}</code></p></div>
            <div class="yk-overview__item"><div class="yk-overview__label">Evidence tier</div><p class="yk-overview__value" data-accent="true">Tier ${escapeHtml(entity.tier)}</p></div>
            <div class="yk-overview__item"><div class="yk-overview__label">所在地</div><p class="yk-overview__value">${place ? `${escapeHtml(place.prefecture)} ${escapeHtml(place.municipality)}${place.address ? ` / ${escapeHtml(place.address)}` : ""}` : "未確認"}</p></div>
            <div class="yk-overview__item"><div class="yk-overview__label">確認日</div><p class="yk-overview__value">${escapeHtml(entity.verified_at)}</p></div>
            <div class="yk-overview__item"><div class="yk-overview__label">Current State</div><p class="yk-overview__value">${stateText}</p></div>
            <div class="yk-overview__item"><div class="yk-overview__label">Publication</div><p class="yk-overview__value">Public preview / noindex</p></div>
          </div>
        </div>
      </section>
      <section class="yk-section"><div class="yk-container" data-size="prose"><div class="yk-section__head"><div class="yk-section__heading-group"><p class="yk-section__kicker">OFFICIAL LINKS</p><h2 class="yk-section__title">公式リンク</h2></div></div><ul>${officialLinks || "<li>未収録</li>"}</ul></div></section>
      <section class="yk-section"><div class="yk-container" data-size="prose"><div class="yk-section__head"><div class="yk-section__heading-group"><p class="yk-section__kicker">EVIDENCE</p><h2 class="yk-section__title">根拠</h2></div></div><ul>${evidenceHtml || "<li>未収録</li>"}</ul></div></section>
      <section class="yk-section"><div class="yk-container" data-size="prose"><div class="yk-section__head"><div class="yk-section__heading-group"><p class="yk-section__kicker">TIMELINE</p><h2 class="yk-section__title">履歴</h2></div></div><p class="yk-prose">${entityEvents.length === 0 ? "review済みChange Eventはまだありません。" : `${entityEvents.length}件`}</p></div></section>
      <section class="yk-section"><div class="yk-container" data-size="prose"><div class="yk-section__head"><div class="yk-section__heading-group"><p class="yk-section__kicker">RELATIONS</p><h2 class="yk-section__title">関係</h2></div></div><p class="yk-prose">${entityRelations.length === 0 ? "review済みRelationはまだありません。" : `${entityRelations.length}件`}</p></div></section>
      <section class="yk-section" data-rule="none"><div class="yk-container" data-size="prose"><div class="yk-section__head"><div class="yk-section__heading-group"><p class="yk-section__kicker">MACHINE READABLE</p><h2 class="yk-section__title">データ</h2></div></div><p><a class="yk-action-link" href="/data/canonical.json">canonical preview JSON</a></p></div></section>`,
  });
  fs.writeFileSync(path.join(entityDir, "index.html"), detailHtml);
}

for (const entity of approvedEntities) {
  assert(fs.existsSync(path.join(dist, "shrines", entity.id, "index.html")), `Missing detail page for ${entity.id}`);
}
assert(fs.existsSync(path.join(dist, "data", "canonical.json")), "Missing machine-readable Jinja canonical preview");
console.log(`Built Jinja data-driven preview with shared Yukue UI: ${approvedEntities.length} shrine detail page(s).`);
