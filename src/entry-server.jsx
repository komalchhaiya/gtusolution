import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { Routes } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import PublicRoutes from "./routes/PublicRoutes";

export function render(url) {
  globalThis.__PRERENDER__ = true;

  const html = renderToString(
    <StaticRouter location={url}>
      <AuthProvider>
        <Routes>{PublicRoutes()}</Routes>
      </AuthProvider>
    </StaticRouter>
  );

  return html;
}
