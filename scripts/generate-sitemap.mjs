import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.resolve(__dirname, "../public");
const sitemapPath = path.join(publicDir, "sitemap.xml");

const baseUrl = "https://www.alecsdesign.xyz";
const lastmod = "2026-07-22";

const newEntries = [
  {
    path: "/packs",
    changefreq: "weekly",
    priority: "0.9",
    alternates: [
      { lang: "en", href: "/packs" },
      { lang: "it", href: "/it/packs" },
      { lang: "ro", href: "/ro/packs" },
    ],
  },
  {
    path: "/it/packs",
    changefreq: "weekly",
    priority: "0.9",
    alternates: [
      { lang: "en", href: "/packs" },
      { lang: "it", href: "/it/packs" },
      { lang: "ro", href: "/ro/packs" },
    ],
  },
  {
    path: "/ro/packs",
    changefreq: "weekly",
    priority: "0.9",
    alternates: [
      { lang: "en", href: "/packs" },
      { lang: "it", href: "/it/packs" },
      { lang: "ro", href: "/ro/packs" },
    ],
  },
  {
    path: "/packs/isometric-heavy-machinery-icons",
    changefreq: "monthly",
    priority: "0.8",
    alternates: [
      { lang: "en", href: "/packs/isometric-heavy-machinery-icons" },
      { lang: "it", href: "/it/packs/isometric-heavy-machinery-icons" },
      { lang: "ro", href: "/ro/packs/isometric-heavy-machinery-icons" },
    ],
  },
  {
    path: "/it/packs/isometric-heavy-machinery-icons",
    changefreq: "monthly",
    priority: "0.8",
    alternates: [
      { lang: "en", href: "/packs/isometric-heavy-machinery-icons" },
      { lang: "it", href: "/it/packs/isometric-heavy-machinery-icons" },
      { lang: "ro", href: "/ro/packs/isometric-heavy-machinery-icons" },
    ],
  },
  {
    path: "/ro/packs/isometric-heavy-machinery-icons",
    changefreq: "monthly",
    priority: "0.8",
    alternates: [
      { lang: "en", href: "/packs/isometric-heavy-machinery-icons" },
      { lang: "it", href: "/it/packs/isometric-heavy-machinery-icons" },
      { lang: "ro", href: "/ro/packs/isometric-heavy-machinery-icons" },
    ],
  },
];

function buildUrlEntry(entry) {
  const loc = `${baseUrl}${entry.path}`;
  const alternates = entry.alternates
    .map(
      ({ lang, href }) =>
        `    <xhtml:link rel="alternate" hreflang="${lang}" href="${baseUrl}${href}" />`,
    )
    .join("\n");
  const xDefault = `    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}${entry.alternates.find((item) => item.lang === "en")?.href ?? entry.path}" />`;

  return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${entry.changefreq}</changefreq>\n    <priority>${entry.priority}</priority>\n${alternates}\n${xDefault}\n  </url>`;
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const sitemapXml = readFileSync(sitemapPath, "utf8");
const existingLocs = [...sitemapXml.matchAll(/<loc>(.*?)<\/loc>/g)].map(
  (match) => match[1],
);
const missingEntries = newEntries.filter(
  (entry) => !existingLocs.includes(`${baseUrl}${entry.path}`),
);

if (missingEntries.length === 0) {
  console.log("Sitemap already contains the pack routes.");
  process.exit(0);
}

const block = `\n  <!-- ─── PACKS ─────────────────────────────────────── -->\n${missingEntries.map(buildUrlEntry).join("\n\n")}\n`;
const updatedSitemap = sitemapXml.replace(
  /<\/urlset>\s*$/,
  `${block}</urlset>\n`,
);
writeFileSync(sitemapPath, updatedSitemap, "utf8");
console.log(`Appended ${missingEntries.length} sitemap entries.`);
