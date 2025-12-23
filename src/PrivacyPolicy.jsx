export default function PrivacyPolicy() {
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
      marginBottom: "0.5rem",
      textAlign: "center",
    },
    lastUpdated: {
      textAlign: "center",
      color: "#6b533c",
      fontSize: "0.9rem",
      marginBottom: "2rem",
      fontStyle: "italic",
    },
    card: {
      backgroundColor: "#dbd4cb",
      borderRadius: "14px",
      padding: "1.5rem",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      border: "1px solid #b9a185",
      marginBottom: "1.5rem",
    },
    heading: {
      fontFamily: "Playfair Display",
      fontSize: "1.3rem",
      marginBottom: "0.75rem",
      color: "#0c0b07",
      fontWeight: "600",
    },
    text: {
      lineHeight: "1.6",
      fontSize: "0.95rem",
      marginBottom: "0.5rem",
      color: "#6b533c",
    },
    highlight: {
      color: "#0c0b07",
      fontWeight: "600",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Privacy Policy</h1>
      <p style={styles.lastUpdated}>Last Updated: December 22, 2024</p>

      <div style={styles.card}>
        <h2 style={styles.heading}>Introduction</h2>
        <p style={styles.text}>
          <span style={styles.highlight}>GTU Paper Solution</span> is a platform providing previous year question papers solutions 
          for GTU students. We are committed to protecting your privacy and do not collect, store, or share any personal 
          or sensitive information beyond what is necessary for authentication.
        </p>
      </div>

      <div style={styles.card}>
        <h2 style={styles.heading}>Information We Collect</h2>
        <p style={styles.text}>
          We use Google Sign-In for authentication. We only receive:
        </p>
        <p style={styles.text}>
          • Your email address (for account identification)<br/>
          • Your profile picture (displayed in header)
        </p>
        <p style={styles.text}>
          <span style={styles.highlight}>We do NOT collect:</span> payment information, location data, device information, 
          browsing history, or any sensitive personal data.
        </p>
      </div>

      <div style={styles.card}>
        <h2 style={styles.heading}>How We Use Your Information</h2>
        <p style={styles.text}>
          Your information is used solely for:
        </p>
        <p style={styles.text}>
          • Account authentication and identification<br/>
          • Displaying your profile in the website header<br/>
          • Providing access to previous year question papers solutions
        </p>
        <p style={styles.text}>
          We do not use your information for marketing or advertising.
        </p>
      </div>

      <div style={styles.card}>
        <h2 style={styles.heading}>Data Sharing</h2>
        <p style={styles.text}>
          <span style={styles.highlight}>We do NOT share, sell, rent, or disclose your personal information to any third parties.</span> 
          Your information is used exclusively within our platform for authentication purposes only.
        </p>
      </div>

      <div style={styles.card}>
        <h2 style={styles.heading}>Third-Party Services</h2>
        <p style={styles.text}>
          We use <span style={styles.highlight}>Google Sign-In</span> and <span style={styles.highlight}>Firebase</span> 
          for authentication. Your use of these services is subject to Google's Privacy Policy. We only receive basic 
          profile information necessary for authentication.
        </p>
      </div>

      <div style={styles.card}>
        <h2 style={styles.heading}>Your Rights</h2>
        <p style={styles.text}>
          You can view your profile information, manage your account through Google settings, and stop using our service 
          at any time. Since we only store authentication data through Firebase, you can revoke access through your Google 
          account settings.
        </p>
      </div>

      <div style={styles.card}>
        <h2 style={styles.heading}>Contact & Consent</h2>
        <p style={styles.text}>
          By using our website and signing in with Google, you consent to this Privacy Policy. If you have questions, 
          please contact us at <span style={styles.highlight}>gtupapersol@gmail.com</span> or through our Contact Us page.
        </p>
        <p style={styles.text}>
          We may update this policy from time to time. The "Last Updated" date will reflect any changes.
        </p>
      </div>
    </div>
  );
}

