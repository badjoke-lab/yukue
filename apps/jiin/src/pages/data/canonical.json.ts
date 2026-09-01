import canonical from "../../../data/canonical.json";

export const prerender = true;

export function GET() {
  return new Response(`${JSON.stringify(canonical, null, 2)}\n`, {
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "public, max-age=300",
      "x-robots-tag": "noindex, nofollow",
    },
  });
}
