import React from "react";

export default function AboutUs() {
  const styles = {
    container: {
      maxWidth: "900px",
      margin: "2rem auto",
      padding: "0 1rem",
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
          At <span style={styles.highlight}>GTU Paper Solution</span>, our main aim
          is to provide accurate, reliable, and easy-to-understand solutions for
          <span style={styles.highlight}> previous years’ GTU question papers</span>.
          We focus on helping students prepare effectively by giving them access to
          solved papers in one organized and user-friendly platform.
        </p>

        <p style={styles.text}>
          Many students find it difficult to locate correct solutions for past GTU
          papers. To solve this problem, <span style={styles.highlight}>GTU Paper Solution</span>
           brings together previous year papers along with properly explained solutions,
          making exam preparation simpler and more efficient.
        </p>

        <p style={styles.text}>
          Each solution provided on our platform is written with clarity and correctness
          in mind. The answers are structured step by step so that students can easily
          understand the concepts, improve their problem-solving skills, and revise
          important topics with confidence.
        </p>

        <p style={styles.text}>
          Our goal is not just to help students find answers, but to support their learning
          journey. By offering well-organized solutions for previous years’ GTU papers,
          we aim to reduce exam stress, save valuable study time, and help students
          perform better in their examinations.
        </p>

        <p style={styles.text}>
          With <span style={styles.highlight}>GTU Paper Solution</span>, students get
          a trusted platform dedicated exclusively to GTU previous year paper solutions,
          making preparation easier, faster, and more reliable.
        </p>
      </div>
    </div>
  );
}
