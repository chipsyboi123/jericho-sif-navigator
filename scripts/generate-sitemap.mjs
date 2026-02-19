import { writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const BASE_URL = "https://jericho-sif-navigator.vercel.app";

const staticRoutes = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/sif-101", priority: "0.8", changefreq: "monthly" },
  { path: "/funds", priority: "0.9", changefreq: "weekly" },
  { path: "/tracker", priority: "0.8", changefreq: "daily" },
  { path: "/compare", priority: "0.7", changefreq: "weekly" },
  { path: "/knowledge", priority: "0.8", changefreq: "weekly" },
  { path: "/why-jericho", priority: "0.6", changefreq: "monthly" },
  { path: "/contact", priority: "0.5", changefreq: "monthly" },
];

const fundSlugs = [
  "sbi-magnum",
  "quant-qsif-equity",
  "quant-qsif-hybrid",
  "quant-qsif-ex100",
  "edelweiss-altiva",
  "tata-titanium",
  "bandhan-arudha",
  "icici-isif-hybrid",
  "icici-isif-ex100",
  "iti-diviniti",
];

const today = new Date().toISOString().split("T")[0];

const urls = [
  ...staticRoutes.map(
    (r) =>
      `  <url>\n    <loc>${BASE_URL}${r.path}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${r.changefreq}</changefreq>\n    <priority>${r.priority}</priority>\n  </url>`
  ),
  ...fundSlugs.map(
    (slug) =>
      `  <url>\n    <loc>${BASE_URL}/funds/${slug}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.7</priority>\n  </url>`
  ),
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`;

const distPath = resolve(__dirname, "../dist/sitemap.xml");
writeFileSync(distPath, sitemap, "utf-8");
console.log(`Sitemap generated: ${distPath} (${urls.length} URLs)`);
