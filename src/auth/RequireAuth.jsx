import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "./AuthContext";

export default function RequireAuth() {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  // 🔹 Loading UI
  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f4f0ec",
        }}
      >
        <div
          style={{
            backgroundColor: "#dbd4cb",
            padding: "2rem 2.5rem",
            borderRadius: "14px",
            boxShadow: "0 8px 25px rgba(0,0,0,0.12)",
            border: "1px solid #b9a185",
            textAlign: "center",
            maxWidth: "360px",
            width: "90%",
          }}
        >
          <div
            style={{
              width: "42px",
              height: "42px",
              border: "4px solid #ccc1b3",
              borderTop: "4px solid #6b533c",
              borderRadius: "50%",
              margin: "0 auto 1.2rem auto",
              animation: "spin 1s linear infinite",
            }}
          />

          <p
            style={{
              margin: 0,
              fontSize: "1rem",
              color: "#6b533c",
              fontWeight: "600",
            }}
          >
            Checking your access…
          </p>

          <p
            style={{
              marginTop: "0.4rem",
              fontSize: "0.85rem",
              color: "#6b533c",
              opacity: 0.85,
            }}
          >
            Please wait a moment
          </p>
        </div>

        {/* Inline animation */}
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    );
  }

  // 🔒 Redirect if not authenticated
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // ✅ Authenticated
  return <Outlet />;
}
