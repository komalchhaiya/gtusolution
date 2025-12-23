import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer-text">© {new Date().getFullYear()} GTUpapersolution — All Rights Reserved</p>
    </footer>
  );
}

export default Footer;
