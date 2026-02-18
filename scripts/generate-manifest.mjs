/**
 * Generates public/manifest.json from content/site.json.
 * Run: node scripts/generate-manifest.mjs
 * Optional: add "prebuild": "node scripts/generate-manifest.mjs" to package.json.
 */
import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const sitePath = join(root, "content", "site.json");
const manifestPath = join(root, "public", "manifest.json");

const site = JSON.parse(readFileSync(sitePath, "utf-8"));
const manifest = {
  name: site.name,
  short_name: site.shortName,
  description: site.description,
  start_url: "/",
  display: "standalone",
  background_color: site.themeColor,
  theme_color: site.themeColor,
  icons: [{ src: "/favicon-32x32.png", sizes: "32x32", type: "image/png" }],
};
writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), "utf-8");
console.log("Wrote public/manifest.json from content/site.json");
