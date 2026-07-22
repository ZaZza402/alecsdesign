import type { VercelRequest, VercelResponse } from "@vercel/node";
import { existsSync, readFileSync } from "fs";
import { join } from "path";

export default function handler(_req: VercelRequest, res: VercelResponse) {
  // public/sitemap.xml is the source written by generate-sitemap.mjs and is
  // bundled with the serverless function. dist/sitemap.xml lives on the CDN
  // edge (static output) and is not accessible from the function filesystem.
  const candidates = [
    join(process.cwd(), "public", "sitemap.xml"),
    join(process.cwd(), "dist", "sitemap.xml"),
  ];

  const sitemapPath = candidates.find(existsSync);

  if (!sitemapPath) {
    res.status(500).send("Sitemap not found");
    return;
  }

  const xml = readFileSync(sitemapPath, "utf-8");

  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Robots-Tag", "noindex");
  res.setHeader("Cache-Control", "public, max-age=3600, s-maxage=3600");
  res.status(200).send(xml);
}
