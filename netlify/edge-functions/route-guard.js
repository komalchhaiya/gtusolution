import knownRoutes from "./known-routes.json";

const STATIC_EXTENSIONS =
  /\.(js|css|png|jpg|jpeg|gif|svg|webp|ico|pdf|txt|xml|woff2?|map|json)$/i;

function normalizePath(pathname) {
  if (!pathname || pathname === "/") return "/";
  return pathname.replace(/\/+$/, "") || "/";
}

export default async (request, context) => {
  const url = new URL(request.url);
  const pathname = normalizePath(url.pathname);

  if (
    pathname.startsWith("/assets/") ||
    pathname.startsWith("/pdfs/") ||
    STATIC_EXTENSIONS.test(pathname)
  ) {
    return context.next();
  }

  if (knownRoutes.includes(pathname)) {
    return context.next();
  }

  if (pathname === "/login" || pathname === "/signup") {
    return context.next();
  }

  if (/\/subject\/[^/]+\/view(\/|$)/.test(pathname)) {
    return context.next();
  }

  const notFoundUrl = new URL("/404.html", url.origin);
  const response = await context.rewrite(notFoundUrl.toString());

  return new Response(response.body, {
    status: 404,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-cache",
    },
  });
};
