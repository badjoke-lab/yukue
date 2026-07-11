import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadMatsuriDataset } from "../apps/matsuri/scripts/load-matsuri-dataset.mjs";

const repositoryRoot = fileURLToPath(new URL("../", import.meta.url));
const outputRoot = path.join(repositoryRoot, "apps", "matsuri", "dist");
const dataset = loadMatsuriDataset();

const stateCodes = [
  "active",
  "reduced_activity",
  "suspended",
  "dormant",
  "reviving",
  "discontinued",
  "unknown",
];

function read(relativePath) {
  return fs.readFileSync(path.join(outputRoot, relativePath), "utf8");
}

function readJson(relativePath) {
  return JSON.parse(read(relativePath));
}

function walkHtml(directory, relativeDirectory = "") {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const relativePath = path.join(relativeDirectory, entry.name);
    const absolutePath = path.join(directory, entry.name);
    if (entry.isDirectory()) return walkHtml(absolutePath, relativePath);
    if (entry.isFile() && entry.name.endsWith(".html")) {
      return [relativePath.split(path.sep).join("/")];
    }
    return [];
  });
}

function decodeEntities(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&apos;", "'");
}

function stripMarkup(value) {
  return decodeEntities(value.replace(/<[^>]*>/gu, " "))
    .replace(/\s+/gu, " ")
    .trim();
}

function hrefs(html) {
  return [...html.matchAll(/<a\b[^>]*\bhref=(['"])(.*?)\1[^>]*>([\s\S]*?)<\/a>/giu)].map(
    (match) => ({
      href: decodeEntities(match[2].trim()),
      text: stripMarkup(match[3]),
      openingTag: match[0].slice(0, match[0].indexOf(">") + 1),
    }),
  );
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function assertContains(html, value, label) {
  assert(html.includes(value), `${label} is missing required text: ${value}`);
}

const manifest = readJson("data/manifest.json");
const entitiesFeed = readJson("data/entities.json");
const allHtmlPaths = walkHtml(outputRoot).sort((a, b) => a.localeCompare(b));
const allHtml = allHtmlPaths.map((relativePath) => ({
  relativePath,
  html: read(relativePath),
}));

const dataHtml = read("data/index.html");
const dataLinks = hrefs(dataHtml)
  .map((link) => link.href)
  .filter((href) => manifest.files.includes(href));
assert(
  dataLinks.length === new Set(dataLinks).size,
  `Data Access page contains duplicate machine-readable links: ${JSON.stringify(dataLinks)}`,
);
assert(
  dataLinks.length === manifest.files.length &&
    manifest.files.every((file) => dataLinks.includes(file)),
  `Data Access file inventory does not match manifest.files.\npage: ${JSON.stringify(dataLinks.sort())}\nmanifest: ${JSON.stringify([...manifest.files].sort())}`,
);

const methodologyHtml = read("methodology/index.html");
for (const term of [
  "Current State",
  "Occurrence",
  "Change Event",
  "Relation",
  "Evidence",
  "Source",
  "Public Projection",
  "一度の中止だけでCurrent Stateを休止へ変更しません",
  "AI生成文はEvidenceとして扱いません",
]) {
  assertContains(methodologyHtml, term, "Methodology page");
}

const statusHtml = read("status/index.html");
for (const marker of [
  "public-projection-ready",
  "browse-ready",
  "search-artifact-ready",
  "machine-readable-ready",
  "deployment-artifact-ready",
  "external-deployment-held",
  "analytics-activation-required",
]) {
  assert(
    statusHtml.includes(`data-infrastructure-status="${marker}"`),
    `Status page is missing infrastructure marker ${marker}.`,
  );
}
assertContains(statusHtml, "未実施。外部配備工程は運用上の保留中", "Status page");
assertContains(statusHtml, "未有効。Cloudflare Pages project作成後", "Status page");
assert(
  !statusHtml.includes('data-infrastructure-status="analytics-enabled"'),
  "Status page must not claim that Analytics is enabled before external activation.",
);

for (const stateCode of stateCodes) {
  const entityCount = entitiesFeed.records.filter(
    (entity) => entity.current_state?.state_code === stateCode,
  ).length;
  const stateHtml = read(`states/${stateCode}/index.html`);
  const hasEmptyState = /class="empty-state"/u.test(stateHtml);

  if (entityCount === 0) {
    assert(
      hasEmptyState && stateHtml.includes("現在、この状態で公開している記録はありません。"),
      `Empty State page ${stateCode} must contain an honest textual empty state.`,
    );
  } else {
    assert(
      !hasEmptyState,
      `State page ${stateCode} contains an empty-state message despite ${entityCount} public records.`,
    );
  }
}

for (const image of dataset.images) {
  assert(image.review_status === "approved", `Image ${image.id} is not approved.`);
  assert(
    image.rights_review_status === "approved",
    `Image ${image.id} has rights_review_status=${String(image.rights_review_status)}.`,
  );
  assert(
    image.commercial_use_allowed === true,
    `Image ${image.id} does not allow commercial use.`,
  );
  assert(
    typeof image.alt_text_ja === "string" && image.alt_text_ja.trim().length >= 5,
    `Image ${image.id} has no meaningful Japanese alt text.`,
  );
  assert(
    typeof image.credit_text === "string" && image.credit_text.trim().length >= 2,
    `Image ${image.id} has no usable credit text.`,
  );
  assert(
    Boolean(image.asset_path || image.public_url),
    `Image ${image.id} has neither asset_path nor public_url.`,
  );
}

const renderedImages = allHtml.flatMap(({ relativePath, html }) =>
  [...html.matchAll(/<img\b[^>]*>/giu)].map((match) => ({
    relativePath,
    tag: match[0],
  })),
);

if (dataset.images.length === 0) {
  assert(
    renderedImages.length === 0,
    `The canonical dataset has zero approved images but HTML renders images:\n${renderedImages
      .map((image) => `- ${image.relativePath}: ${image.tag}`)
      .join("\n")}`,
  );

  const detailHtml = read("festivals/suneori-amagoi/index.html");
  for (const forbiddenHeading of ["Primary Image", "Gallery", "ギャラリー", "画像はありません"] ) {
    assert(
      !detailHtml.includes(forbiddenHeading),
      `Zero-image Festival detail renders forbidden image UI text: ${forbiddenHeading}`,
    );
  }
}

for (const { relativePath, html } of allHtml) {
  const placeholderImages = [
    ...html.matchAll(/<(?:img|source)\b[^>]*(?:src|srcset)=(['"])(.*?)\1[^>]*>/giu),
  ].filter((match) => /placeholder|example\.com|\.invalid/iu.test(match[2]));
  assert(
    placeholderImages.length === 0,
    `${relativePath} contains placeholder image assets: ${placeholderImages
      .map((match) => match[2])
      .join(", ")}`,
  );

  for (const link of hrefs(html)) {
    if (!/^https?:\/\//iu.test(link.href)) continue;

    assert(link.text.length > 0, `${relativePath} contains an external link with no visible text: ${link.href}`);
    assert(
      link.text !== link.href,
      `${relativePath} exposes a raw external URL instead of a human-readable label: ${link.href}`,
    );

    if (/\btarget=(['"])_blank\1/iu.test(link.openingTag)) {
      const relMatch = link.openingTag.match(/\brel=(['"])(.*?)\1/iu);
      const relValues = new Set((relMatch?.[2] ?? "").split(/\s+/u));
      assert(
        relValues.has("noopener") && relValues.has("noreferrer"),
        `${relativePath} opens an external link in a new tab without noopener noreferrer: ${link.href}`,
      );
    }
  }
}

const representativeEntity = dataset.entities.find(
  (entity) => entity.id === "fst-suneori-amagoi",
);
assert(representativeEntity, "Representative route-based Entity is missing.");
assert(
  representativeEntity.geographic_scope.scope_type === "route_based",
  "Representative Entity must remain route_based for map-boundary verification.",
);
assert(
  representativeEntity.default_place_ids.length >= 2,
  "Representative route-based Entity must retain multiple Places.",
);

const detailHtml = read("festivals/suneori-amagoi/index.html");
assert(
  detailHtml.includes("yk-map-context") &&
    detailHtml.includes(representativeEntity.geographic_scope.description_ja),
  "Route-based detail must explain its geographic context in text.",
);
assert(
  (detailHtml.match(/class="yk-place-item"/gu) ?? []).length >= 2,
  "Route-based detail must display multiple Place records.",
);
assert(
  !/<iframe\b/iu.test(detailHtml),
  "Route-based detail must not present an unreviewed single embedded map as the whole tradition.",
);

console.log(
  `Matsuri public content audit passed: ${manifest.files.length} Data links, ${allHtmlPaths.length} HTML files, ${dataset.images.length} approved images, explicit held infrastructure status, honest empty states, and route-based map treatment.`,
);
