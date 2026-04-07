import Footer from "./Footer";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Navbar from "./Navbar";
import AdSenseBootstrap from "./components/AdSenseBootstrap";

function Layout() {
  const location = useLocation();
  const isPdfViewerRoute = /\/subject\/[^/]+\/view(\/|$)/.test(
    location.pathname
  );

  return (
    <div className="layout-container">
      {!isPdfViewerRoute && <AdSenseBootstrap />}
      <Header />
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default Layout;
