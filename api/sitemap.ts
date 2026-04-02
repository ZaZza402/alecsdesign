import type { VercelRequest, VercelResponse } from "@vercel/node";
import { readFileSync } from "fs";
import { join } from "path";

export default function handler(_req: VercelRequest, res: VercelResponse) {
  const sitemapPath = join(process.cwd(), "dist", "sitemap.xml");
  const xml = readFileSync(sitemapPath, "utf-8");

  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Cache-Control", "public, max-age=3600, s-maxage=3600");
  res.status(200).send(xml);
}
