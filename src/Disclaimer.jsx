import SEO from "./components/SEO";

export default function Disclaimer() {
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
        title="Disclaimer - GTU Paper Solution"
        description="Read the disclaimer for GTU Paper Solution, including non-affiliation, educational intent, and verification guidance."
        keywords="GTU paper solution disclaimer, GTU non affiliation"
        canonical="https://gtupapersolution.co.in/disclaimer"
      />
      <div style={styles.container}>
        <h1 style={styles.title}>Disclaimer</h1>
        <p style={styles.lastUpdated}>Last updated: April 26, 2026</p>

        <section style={styles.section}>
          <h2 style={styles.heading}>Not an official GTU website</h2>
          <p style={styles.text}>
            GTU Paper Solution is an independent educational platform. We are not affiliated with, endorsed by, or
            officially connected to Gujarat Technological University (GTU).
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>Educational intent only</h2>
          <p style={styles.text}>
            The materials on this website are provided to support student learning and exam preparation. They should be
            used as study references, not as a substitute for official curriculum or faculty instruction.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>Verify with official sources</h2>
          <p style={styles.text}>
            Syllabus structure, paper pattern, and exam rules may change. Always cross-check critical information with
            official GTU circulars, announcements, and your college department.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>External links and ads</h2>
          <p style={styles.text}>
            This site may contain third-party links and advertisements served by partners such as Google AdSense. We do
            not control third-party sites and are not responsible for their content or policies.
          </p>
        </section>
      </div>
    </>
  );
}
