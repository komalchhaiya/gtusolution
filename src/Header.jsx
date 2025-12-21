import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./auth/AuthContext";

function Header() {
  const { user, logout } = useContext(AuthContext);

  return (
    <header
      style={{
        padding: "1rem 2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        background: "#dbd4cb",
        borderBottom: "1px solid #b9a185",
        zIndex: 10,
      }}
    >
      {/* Logo */}
      <h2
        style={{
          fontFamily: "Playfair Display",
          color: "#0c0b07",
          letterSpacing: "0.5px",
        }}
      >
        GTUpapers
      </h2>

      {/* Right Side Navigation */}
      <nav style={{ display: "flex", gap: "1rem", alignItems: "center" }}>

        {/* IF USER LOGGED IN → show name + logout */}
        {user ? (
          <>
            <span
              style={{
                color: "#0c0b07",
                fontWeight: "600",
                fontSize: "0.95rem",
              }}
            >
                 </span>

            <button
              onClick={logout}
              style={{
                padding: "0.6rem 1rem",
                background: "#6b533c",
                color: "white",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
                fontSize: "0.9rem",
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            {/* IF NOT LOGGED IN → show login/signup */}
            <Link
              to="/login"
              style={{
                padding: "0.6rem 1rem",
                background: "#6b533c",
                color: "white",
                borderRadius: "8px",
                textDecoration: "none",
                fontSize: "0.9rem",
              }}
            >
              Login
            </Link>

            <Link
              to="/signup"
              style={{
                padding: "0.6rem 1rem",
                background: "#0c0b07",
                color: "white",
                borderRadius: "8px",
                textDecoration: "none",
                fontSize: "0.9rem",
              }}
            >
              Sign Up
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
