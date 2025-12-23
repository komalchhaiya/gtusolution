import React from "react";

export default function ContactUs() {
  const styles = {
    container: {
      maxWidth: "800px",
      margin: "2rem auto",
      padding: "0 1rem",
      textAlign: "center",
      color: "#0c0b07",
    },
    title: {
      fontFamily: "Playfair Display",
      fontSize: "2.6rem",
      marginBottom: "1rem",
      fontWeight: "700",
    },
    subtitle: {
      fontSize: "1.2rem",
      color: "#6b533c",
      marginBottom: "2rem",
      lineHeight: "1.6",
    },
    emailBox: {
      fontSize: "1.8rem",
      fontWeight: "700",
      color: "#1C352D",
      backgroundColor: "#dbd4cb",
      padding: "1rem 1.5rem",
      borderRadius: "12px",
      border: "2px solid #b9a185",
      display: "inline-block",
      margin: "1rem 0",
    },
    note: {
      fontSize: "0.95rem",
      color: "#6b533c",
      marginTop: "1.5rem",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Get in Touch</h1>

      <p style={styles.subtitle}>
        Whether you have questions, suggestions, or need support, we’re here to help!  
        You can reach out to us anytime — we try to respond as quickly as possible.
      </p>

      <div style={styles.emailBox}>
        <a href="mailto:your.email@gmail.com" style={{ textDecoration: "none", color: "inherit" }}>
          gtupapersol@gmail.com
        </a>
      </div>

      <p style={styles.note}>
        Please send us your queries, feedback, or requests — we value your thoughts and are committed to improving your experience on this platform.
      </p>
    </div>
  );
}
