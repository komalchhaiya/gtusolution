export default function ContactUs() {
  const styles = {
    container: {
      maxWidth: "700px",
      margin: "0 auto",
      padding: "2rem 1rem",
      color: "#0c0b07",
    },
    title: {
      fontFamily: "Playfair Display",
      fontSize: "2.4rem",
      marginBottom: "1.5rem",
      textAlign: "center",
    },
    formBox: {
      backgroundColor: "#dbd4cb",
      borderRadius: "14px",
      padding: "2rem",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      border: "1px solid #b9a185",
    },
    input: {
      width: "100%",
      padding: "0.9rem",
      marginBottom: "1rem",
      borderRadius: "8px",
      border: "1px solid #b9a185",
      fontSize: "1rem",
      backgroundColor: "#f4f0ec",
    },
    textarea: {
      width: "100%",
      padding: "0.9rem",
      height: "120px",
      borderRadius: "8px",
      border: "1px solid #b9a185",
      fontSize: "1rem",
      backgroundColor: "#f4f0ec",
      marginBottom: "1.2rem",
    },
    button: {
      width: "100%",
      padding: "0.9rem",
      backgroundColor: "#6b533c",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      fontSize: "1rem",
      fontWeight: "600",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Contact Us</h1>

      <div style={styles.formBox}>
        <input type="text" placeholder="Your Name" style={styles.input} />
        <input type="email" placeholder="Your Email" style={styles.input} />
        <textarea placeholder="Your Message" style={styles.textarea}></textarea>
        <button style={styles.button}>Send Message</button>
      </div>
    </div>
  );
}
