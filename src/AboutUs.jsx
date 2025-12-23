export default function AboutUs() {
  const styles = {
    container: {
      maxWidth: "900px",
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
    card: {
      backgroundColor: "#dbd4cb",
      borderRadius: "14px",
      padding: "2rem",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      border: "1px solid #b9a185",
    },
    text: {
      lineHeight: "1.7",
      fontSize: "1rem",
      marginBottom: "1rem",
      color: "#6b533c",
    },
    highlight: {
      color: "#0c0b07",
      fontWeight: "600",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>About Us</h1>

      <div style={styles.card}>
        <p style={styles.text}>
          Welcome to <span style={styles.highlight}>GTU Paper Solution</span>.  
          Our goal is to help students prepare better by providing
          easy access to previous year question papers and study resources.
        </p>

        <p style={styles.text}>
          We believe that learning becomes easier when the right resources
          are available at the right time. This platform is designed with
          simplicity, clarity, and accessibility in mind.
        </p>

        <p style={styles.text}>
          Whether you are revising for exams or planning your semester,
          our website is built to support your academic journey.
        </p>
      </div>
    </div>
  );
}
