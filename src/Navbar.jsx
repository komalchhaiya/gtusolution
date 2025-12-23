import { NavLink } from "react-router-dom";

export default function Navbar() {
  const styles = {
    nav: {
      backgroundColor: "#dbd4cb",
      borderBottom: "1px solid #b9a185",
      padding: "1rem 0",
    },
    container: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "0 1rem",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    logo: {
      fontFamily: "Playfair Display",
      fontSize: "1.6rem",
      fontWeight: "700",
      color: "#0c0b07",
      textDecoration: "none",
    },
    links: {
      display: "flex",
      gap: "1.5rem",
    },
    link: {
      textDecoration: "none",
      fontSize: "1rem",
      fontWeight: "600",
      color: "#6b533c",
      paddingBottom: "4px",
    },
    active: {
      color: "#0c0b07",
      borderBottom: "2px solid #0c0b07",
    },
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
      

        <div style={styles.links}>
          <NavLink
            to="/"
            style={({ isActive }) =>
              isActive ? { ...styles.link, ...styles.active } : styles.link
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/about"
            style={({ isActive }) =>
              isActive ? { ...styles.link, ...styles.active } : styles.link
            }
          >
            About Us
          </NavLink>

          <NavLink
            to="/contact"
            style={({ isActive }) =>
              isActive ? { ...styles.link, ...styles.active } : styles.link
            }
          >
            Contact Us
          </NavLink>

          <NavLink
            to="/privacy"
            style={({ isActive }) =>
              isActive ? { ...styles.link, ...styles.active } : styles.link
            }
          >
            Privacy Policy
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
