import SEO from "./components/SEO";

export default function TermsConditions() {
  const styles = {
    container: {
      maxWidth: "900px",
      margin: "0 auto",
      padding: "2rem 1rem",
      color: "#0c0b07",
    },
    title: {
      fontFamily: "Playfair Display",
      fontSize: "2.2rem",
      marginBottom: "0.6rem",
      textAlign: "center",
    },
    lastUpdated: {
      textAlign: "center",
      color: "#6b533c",
      fontSize: "0.95rem",
      marginBottom: "1.8rem",
    },
    section: {
      backgroundColor: "#dbd4cb",
      borderRadius: "14px",
      padding: "1.4rem",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      border: "1px solid #b9a185",
      marginBottom: "1.2rem",
    },
    heading: {
      margin: "0 0 0.7rem",
      fontSize: "1.2rem",
      color: "#0c0b07",
    },
    text: {
      margin: "0.35rem 0",
      lineHeight: "1.65",
      color: "#6b533c",
      fontSize: "0.97rem",
    },
  };

  return (
    <>
      <SEO
        title="Terms and Conditions - GTU Paper Solution"
        description="Read the terms and conditions for using GTU Paper Solution, including educational use, content ownership, and acceptable use."
        keywords="GTU paper solution terms, GTU terms and conditions"
        canonical="https://gtupapersolution.co.in/terms"
      />
      <div style={styles.container}>
        <h1 style={styles.title}>Terms and Conditions</h1>
        <p style={styles.lastUpdated}>Last updated: April 26, 2026</p>

        <section style={styles.section}>
          <h2 style={styles.heading}>1. Educational purpose</h2>
          <p style={styles.text}>
            GTU Paper Solution is an educational resource website created to help students prepare for Gujarat
            Technological University exams using previous year papers and study-oriented material.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>2. Content usage</h2>
          <p style={styles.text}>
            You may use the website content for personal, non-commercial study. Re-uploading, reselling, automated
            scraping, or republishing our organized content without permission is not allowed.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>3. Accuracy and responsibility</h2>
          <p style={styles.text}>
            We try to keep material accurate and updated, but errors may still exist. Students should verify critical
            exam information with official GTU notifications, syllabus updates, and faculty guidance.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>4. Third-party services</h2>
          <p style={styles.text}>
            This site may use Google services such as AdSense, Analytics, and Google Sign-In. Your use of those
            services is also governed by Google policies.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>5. Policy updates</h2>
          <p style={styles.text}>
            We may update these terms over time. Continued use of the website after updates means you accept the
            revised terms.
          </p>
        </section>
      </div>
    </>
  );
}
