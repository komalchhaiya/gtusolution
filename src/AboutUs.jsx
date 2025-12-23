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
          At <span style={styles.highlight}>GTU Paper Solution</span>, our primary goal is to provide students with comprehensive, accurate, and easy-to-understand solutions for every paper in the GTU curriculum. 
          We understand that students often struggle to find reliable resources, so our platform is designed to make previous year question papers and their solutions easily accessible in one place.
        </p>

        <p style={styles.text}>
          Each solution is carefully crafted to be correct, simple, and straightforward, helping students not only check their answers but also understand the step-by-step methodology behind each solution. 
          We focus on clarity and accuracy to ensure that learning is efficient and effective.
        </p>

        <p style={styles.text}>
          Our mission is to make exam preparation stress-free, enabling students to save time while gaining confidence in their studies. 
          By providing all GTU papers along with well-explained solutions, we aim to support students throughout their academic journey and help them achieve their best results.
        </p>

        <p style={styles.text}>
          With <span style={styles.highlight}>GTU Paper Solution</span>, learning becomes easier, revision becomes faster, and students can approach exams with complete confidence knowing they have access to reliable and accurate resources.
        </p>
      </div>
    </div>
  );
}
