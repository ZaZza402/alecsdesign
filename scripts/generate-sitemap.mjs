import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const sitemapPath = path.resolve(__dirname, "../public/sitemap.xml");

const xml = readFileSync(sitemapPath, "utf8");
const removed = { count: 0 };

const cleaned = xml.replace(/\s*<url>[\s\S]*?<\/url>/g, (block) => {
  const locMatch = block.match(/<loc>(.*?)<\/loc>/);
  const loc = locMatch?.[1] ?? "";

  if (/\/help(\/|$)/.test(loc) || /\/designs(\/|$)/.test(loc)) {
    removed.count += 1;
    return "";
  }

  return block;
});

if (removed.count === 0) {
  console.log("No deprecated Help/Designs sitemap entries found.");
  process.exit(0);
}

writeFileSync(sitemapPath, `${cleaned.trim()}\n`, "utf8");
console.log(`Removed ${removed.count} deprecated sitemap entries.`);
