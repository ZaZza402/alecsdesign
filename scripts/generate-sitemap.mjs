import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.resolve(__dirname, "../public");
const packsDataDir = path.resolve(__dirname, "../data/packs");
const sitemapPath = path.join(publicDir, "sitemap.xml");

const baseUrl = "https://www.alecsdesign.xyz";
const lastmod = "2026-07-22";

const newEntries = [
  {
    path: "/help",
    changefreq: "monthly",
    priority: "0.8",
    alternates: [
      { lang: "en", href: "/help" },
      { lang: "it", href: "/it/help" },
      { lang: "ro", href: "/ro/help" },
    ],
  },
  {
    path: "/it/help",
    changefreq: "monthly",
    priority: "0.8",
    alternates: [
      { lang: "en", href: "/help" },
      { lang: "it", href: "/it/help" },
      { lang: "ro", href: "/ro/help" },
    ],
  },
  {
    path: "/ro/help",
    changefreq: "monthly",
    priority: "0.8",
    alternates: [
      { lang: "en", href: "/help" },
      { lang: "it", href: "/it/help" },
      { lang: "ro", href: "/ro/help" },
    ],
  },
  {
    path: "/help/request",
    changefreq: "monthly",
    priority: "0.7",
    alternates: [
      { lang: "en", href: "/help/request" },
      { lang: "it", href: "/it/help/request" },
      { lang: "ro", href: "/ro/help/request" },
    ],
  },
  {
    path: "/it/help/request",
    changefreq: "monthly",
    priority: "0.7",
    alternates: [
      { lang: "en", href: "/help/request" },
      { lang: "it", href: "/it/help/request" },
      { lang: "ro", href: "/ro/help/request" },
    ],
  },
  {
    path: "/ro/help/request",
    changefreq: "monthly",
    priority: "0.7",
    alternates: [
      { lang: "en", href: "/help/request" },
      { lang: "it", href: "/it/help/request" },
      { lang: "ro", href: "/ro/help/request" },
    ],
  },
  {
    path: "/designs",
    changefreq: "weekly",
    priority: "0.9",
    alternates: [
      { lang: "en", href: "/designs" },
      { lang: "it", href: "/it/designs" },
      { lang: "ro", href: "/ro/designs" },
    ],
  },
  {
    path: "/it/designs",
    changefreq: "weekly",
    priority: "0.9",
    alternates: [
      { lang: "en", href: "/designs" },
      { lang: "it", href: "/it/designs" },
      { lang: "ro", href: "/ro/designs" },
    ],
  },
  {
    path: "/ro/designs",
    changefreq: "weekly",
    priority: "0.9",
    alternates: [
      { lang: "en", href: "/designs" },
      { lang: "it", href: "/it/designs" },
      { lang: "ro", href: "/ro/designs" },
    ],
  },
  ...getDesignDetailEntries(),
];

function getDesignDetailEntries() {
  const files = readdirSync(packsDataDir).filter((fileName) =>
    fileName.endsWith(".json"),
  );

  const entries = [];

  for (const fileName of files) {
    const filePath = path.join(packsDataDir, fileName);
    const json = JSON.parse(readFileSync(filePath, "utf8"));
    const slug = typeof json.slug === "string" ? json.slug.trim() : "";
    if (!slug) continue;

    const alternates = [
      { lang: "en", href: `/designs/${slug}` },
      { lang: "it", href: `/it/designs/${slug}` },
      { lang: "ro", href: `/ro/designs/${slug}` },
    ];

    entries.push(
      {
        path: `/designs/${slug}`,
        changefreq: "monthly",
        priority: "0.8",
        alternates,
      },
      {
        path: `/it/designs/${slug}`,
        changefreq: "monthly",
        priority: "0.8",
        alternates,
      },
      {
        path: `/ro/designs/${slug}`,
        changefreq: "monthly",
        priority: "0.8",
        alternates,
      },
    );
  }

  return entries;
}

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

const sitemapXml = readFileSync(sitemapPath, "utf8");
const existingLocs = [...sitemapXml.matchAll(/<loc>(.*?)<\/loc>/g)].map(
  (match) => match[1],
);
const missingEntries = newEntries.filter(
  (entry) => !existingLocs.includes(`${baseUrl}${entry.path}`),
);

if (missingEntries.length === 0) {
  console.log("Sitemap already contains the design routes.");
  process.exit(0);
}

const block = `\n  <!-- ─── DESIGNS ───────────────────────────────────── -->\n${missingEntries.map(buildUrlEntry).join("\n\n")}\n`;
const updatedSitemap = sitemapXml.replace(
  /<\/urlset>\s*$/,
  `${block}</urlset>\n`,
);
writeFileSync(sitemapPath, updatedSitemap, "utf8");
console.log(`Appended ${missingEntries.length} sitemap entries.`);
