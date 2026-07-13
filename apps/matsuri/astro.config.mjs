import { defineConfig } from "astro/config";

const siteOrigin = process.env.MATSURI_PUBLIC_ORIGIN;

export default defineConfig({
  output: "static",
  ...(siteOrigin ? { site: siteOrigin } : {}),
});
