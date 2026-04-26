import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

function Footer() {
  const linkStyle = {
    color: "inherit",
    textDecoration: "underline",
    margin: "0 0.4rem",
    fontSize: "0.92rem",
  };

  return (
    <footer className="footer">
      <p className="footer-text">© {new Date().getFullYear()} GTUpapersolution — All Rights Reserved</p>
      <p className="footer-text" style={{ marginTop: "0.4rem" }}>
        <Link to="/about" style={linkStyle}>About</Link>|
        <Link to="/contact" style={linkStyle}>Contact</Link>|
        <Link to="/privacy" style={linkStyle}>Privacy</Link>|
        <Link to="/study-guides" style={linkStyle}>Study Guides</Link>|
        <Link to="/terms" style={linkStyle}>Terms</Link>|
        <Link to="/disclaimer" style={linkStyle}>Disclaimer</Link>
      </p>
    </footer>
  );
}

export default Footer;
