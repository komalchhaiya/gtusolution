import { Link } from "react-router-dom";
import SEO from "../components/SEO";

export default function NotFoundPage() {
  return (
    <>
      <SEO
        title="Page Not Found | GTU Paper Solution"
        description="The page you requested does not exist on GTU Paper Solution. Browse GTU previous year papers by branch, semester, and subject."
        canonical="https://gtupapersolution.co.in/404"
        robots="noindex, follow"
      />
      <div className="main-content" style={{ textAlign: "center", padding: "3rem 1rem" }}>
        <h1>Page not found</h1>
        <p style={{ color: "#6b533c", lineHeight: 1.7, maxWidth: "560px", margin: "0 auto 1.5rem" }}>
          We could not find the page you were looking for. It may have been moved or the URL
          might be incorrect. Use the links below to continue browsing GTU papers.
        </p>
        <p style={{ marginBottom: "1.5rem" }}>
          <Link to="/" style={{ color: "#1C352D", fontWeight: 700, marginRight: "1rem" }}>
            Go to Home
          </Link>
          <Link to="/study-guides" style={{ color: "#1C352D", fontWeight: 700 }}>
            Study Guides
          </Link>
        </p>
        <p style={{ color: "#6b533c", fontSize: "0.95rem" }}>
          Looking for Computer Engineering papers?{" "}
          <Link
            to="/degree/branch/computer-engineering"
            style={{ color: "#1C352D", fontWeight: 700 }}
          >
            Browse Computer Engineering
          </Link>
        </p>
      </div>
    </>
  );
}
