import { parseBunkaDetailHtml } from "./lib/matsuri-bunka-detail-acquisition.mjs";

const url = "https://kunishitei.bunka.go.jp/heritage/detail/302/737";
const response = await fetch(url, {
  headers: { "user-agent": "badjoke-lab-yukue/1.0 (+https://github.com/badjoke-lab/yukue)" },
  signal: AbortSignal.timeout(15000),
});
const html = await response.text();
console.log(`Bunka live detail preflight: status=${response.status}, bytes=${html.length}, has_database=${html.includes("国指定文化財")}, has_name=${html.includes("気多の鵜祭")}, has_subtype=${html.includes("祭礼")}`);
const parsed = parseBunkaDetailHtml(html, 302, 737);
if (!parsed) {
  const text = html.replace(/\s+/gu, " ").slice(0, 1200);
  console.error(`Bunka live detail parser miss. sample=${JSON.stringify(text)}`);
  process.exit(1);
}
console.log(`Bunka live detail parsed: name=${parsed.name}, subtype=${parsed.subtype}, prefecture=${parsed.prefecture}, location=${parsed.location}, safe=${parsed.safe}`);
if (
  parsed.name !== "気多の鵜祭の習俗" ||
  parsed.subtype.normalize("NFKC") !== "祭礼(信仰)" ||
  parsed.prefecture !== "石川県" ||
  parsed.location !== "" ||
  !parsed.safe
) {
  throw new Error("Known Bunka detail parsed with unexpected identity or location fields.");
}
