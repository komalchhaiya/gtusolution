import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./auth/AuthContext";
import "./Header.css";

function Header() {
  const { user, logout } = useContext(AuthContext);
  const [imageError, setImageError] = useState(false);

  // Reset image error when user changes
  useEffect(() => {
    setImageError(false);
  }, [user?.photoURL]);

  return (
    <header className="header">
      {/* Logo */}
      <h2 className="header-logo">
  <span className="logo-main">GTU</span>
  <span className="logo-stack">
    <span className="logo-paper">Paper</span>
    <span className="logo-solution">Solution</span>
  </span>
</h2>


      {/* Right Side Navigation */}
      <nav className="header-nav">
        {/* IF USER LOGGED IN → show profile pic + name + logout */}
        {user ? (
          <>
            <div className="header-user-info">
              {user.photoURL && !imageError ? (
                <img 
                  src={user.photoURL} 
                  alt="Profile" 
                  className="header-user-avatar"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  onError={(e) => {
                    console.log('Image failed to load, showing placeholder');
                    setImageError(true);
                  }}
                  onLoad={() => {
                    console.log('Image loaded successfully');
                  }}
                />
              ) : (
                <div className="header-user-avatar header-user-avatar-placeholder">
                  {user.email ? user.email.charAt(0).toUpperCase() : 'U'}
                </div>
              )}
              <span className="header-user-name">
                {user.email}
              </span>
            </div>

            <button
              onClick={logout}
              className="header-btn header-btn-logout"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            {/* IF NOT LOGGED IN → show login/signup */}
            <Link
              to="/login"
              className="header-btn header-btn-login"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="header-btn header-btn-signup"
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
