import React from "react";

function Footer() {
  return (
    <footer
      style={{
        padding: "2rem",
        background: "var(--ebony)",
        color: "var(--isabelline)",
        textAlign: "center",
        marginTop: "2rem",
      }}
    >
      <p>© {new Date().getFullYear()} GTUpapers — All Rights Reserved</p>
    </footer>
  );
}

export default Footer;
