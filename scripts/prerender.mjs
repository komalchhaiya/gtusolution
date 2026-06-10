import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import { getPublicPrerenderRoutes } from "./routes.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, "..");
const distDir = path.join(rootDir, "dist");

function routeToFilePath(route) {
  if (route === "/") {
    return path.join(distDir, "index.html");
  }
  if (route === "/404") {
    return path.join(distDir, "404.html");
  }
  return path.join(distDir, route, "index.html");
}

async function prerender() {
  if (!fs.existsSync(distDir)) {
    throw new Error("dist/ not found. Run vite build first.");
  }

  const template = fs.readFileSync(path.join(distDir, "index.html"), "utf8");
  const { render, getRouteMeta, injectMetaIntoHtml } = await import(
    pathToFileURL(path.join(distDir, "server", "prerender-bundle.js")).href
  );

  const routes = getPublicPrerenderRoutes();
  console.log(`Prerendering ${routes.length} routes...`);

  for (const route of routes) {
    const appHtml = render(route);
    const meta = getRouteMeta(route);
    let html = template.replace(
      '<div id="root"></div>',
      `<div id="root">${appHtml}</div>`
    );
    html = injectMetaIntoHtml(html, meta);

    const outPath = routeToFilePath(route);
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, html);
    console.log(`  ✓ ${route} → ${path.relative(rootDir, outPath)}`);
  }

  console.log("Prerender complete.");
}

prerender().catch((error) => {
  console.error("Prerender failed:", error);
  process.exit(1);
});
