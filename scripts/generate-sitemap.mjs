import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { getPublicPrerenderRoutes } from "./routes.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const today = new Date().toISOString().slice(0, 10);
const siteUrl = "https://gtupapersolution.co.in";

function priorityForRoute(route) {
  if (route === "/") return "1.0";
  if (route.startsWith("/degree/branch/") && route.includes("/subject/")) return "0.7";
  if (route.startsWith("/degree/")) return "0.8";
  if (route === "/404") return null;
  return "0.8";
}

function changefreqForRoute(route) {
  if (route === "/") return "daily";
  if (route.includes("/subject/")) return "weekly";
  if (route.startsWith("/degree/")) return "weekly";
  return "monthly";
}

const allRoutes = getPublicPrerenderRoutes();
const routes = allRoutes.filter((route) => route !== "/404");

const urls = routes
  .map((route) => {
    const priority = priorityForRoute(route);
    if (!priority) return "";

    const loc = route === "/" ? `${siteUrl}/` : `${siteUrl}${route}`;
  const changefreq = changefreqForRoute(route);

    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  })
  .filter(Boolean)
  .join("\n");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urls}
</urlset>
`;

const outputPath = path.join(__dirname, "../public/sitemap.xml");
fs.writeFileSync(outputPath, sitemap);
console.log(`Generated sitemap with ${routes.length} URLs → ${outputPath}`);

const knownRoutesPath = path.join(
  __dirname,
  "../netlify/edge-functions/known-routes.json"
);
fs.mkdirSync(path.dirname(knownRoutesPath), { recursive: true });
fs.writeFileSync(knownRoutesPath, JSON.stringify(allRoutes, null, 2));
console.log(`Wrote known routes manifest → ${knownRoutesPath}`);
