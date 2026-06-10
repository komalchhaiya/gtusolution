import { Link } from "react-router-dom";
import SEO from "./components/SEO";
import subjectsData from "./data/subjectsData";
import StructuredData from "./components/StructuredData";

const semesterLabels = {
  1: "Semester 3",
  2: "Semester 4",
  3: "Semester 5",
  4: "Semester 6",
};

function formatBranchName(branch) {
  return branch
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export default function StudyGuides() {
  const branchKey = "computer-engineering";
  const branchSubjects = subjectsData?.degree?.[branchKey] || {};
  const branchName = formatBranchName(branchKey);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://gtupapersolution.co.in/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Study Guides",
        item: "https://gtupapersolution.co.in/study-guides",
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Are previous year papers enough to pass?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Previous year papers are a strong base, but best results come from combining PYQs with syllabus-based concept study and short daily revision.",
        },
      },
      {
        "@type": "Question",
        name: "How to avoid blank mind in exam?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Use timed paper practice, maintain a formula sheet, and revise your own solved steps repeatedly in the final week.",
        },
      },
    ],
  };

  return (
    <>
      <SEO
        title="GTU Study Guides - Practical Exam Preparation Roadmaps"
        description="Detailed GTU study guides by semester and subject. Learn practical revision plans, PYQ strategy, and exam-writing tips for better performance."
        keywords="GTU study guide, GTU exam preparation strategy, GTU PYQ roadmap, GTU semester study plan"
        canonical="https://gtupapersolution.co.in/study-guides"
      />
      <StructuredData id="schema-study-guides-breadcrumb" data={breadcrumbSchema} />
      <StructuredData id="schema-study-guides-faq" data={faqSchema} />
      <div className="main-content">
        <h1>GTU Study Guides</h1>
        <p style={{ color: "#6b533c", lineHeight: "1.75" }}>
          These guides are designed for {branchName} students who want a realistic exam plan, not just random
          paper practice. Use this page with previous year papers to build concept clarity, writing speed, and
          revision discipline before your university exams.
        </p>

        <section style={{ marginTop: "1.5rem", textAlign: "left" }}>
          <h2 style={{ marginBottom: "0.8rem" }}>30-day GTU revision framework</h2>
          <ul style={{ color: "#6b533c", lineHeight: "1.75", paddingLeft: "1.1rem" }}>
            <li>Days 1-10: Complete core concepts unit-wise and solve short PYQ sets.</li>
            <li>Days 11-20: Solve medium and long questions from the latest 3 papers.</li>
            <li>Days 21-26: Attempt full papers under timer and evaluate presentation quality.</li>
            <li>Days 27-30: Final revision of mistakes, formulas, and high-frequency questions.</li>
          </ul>
        </section>

        {Object.entries(branchSubjects).map(([semId, subjects]) => (
          <section key={semId} style={{ marginTop: "2rem", textAlign: "left" }}>
            <h2 style={{ marginBottom: "0.6rem" }}>
              {semesterLabels[Number(semId)] || `Semester ${semId}`} Study Plan
            </h2>
            <p style={{ color: "#6b533c", lineHeight: "1.75" }}>
              Focus first on high-weight and concept-heavy subjects. Build one-page revision notes per unit and
              track repeated PYQ patterns across sessions.
            </p>

            {Object.entries(subjects).map(([subjectId, subject]) => (
              <article
                key={subjectId}
                id={`guide-${subjectId.toLowerCase()}`}
                style={{
                  background: "#dbd4cb",
                  border: "1px solid #b9a185",
                  borderRadius: "12px",
                  padding: "1rem 1.1rem",
                  marginTop: "1rem",
                }}
              >
                <h3 style={{ margin: "0 0 0.5rem", color: "#0c0b07" }}>{subject.name}</h3>
                <p style={{ margin: "0.35rem 0", color: "#6b533c", lineHeight: "1.7" }}>
                  <strong>Concept first:</strong> Spend the first two sessions understanding unit fundamentals for{" "}
                  {subject.name}, then solve recent PYQs to connect theory with exam framing.
                </p>
                <p style={{ margin: "0.35rem 0", color: "#6b533c", lineHeight: "1.7" }}>
                  <strong>Writing strategy:</strong> Practice answers in structured steps, use key terminology, and
                  include diagrams/tables where relevant to improve scoring consistency.
                </p>
                <p style={{ margin: "0.35rem 0", color: "#6b533c", lineHeight: "1.7" }}>
                  <strong>Exam-week target:</strong> Solve at least 3 full papers for {subject.name}, then revise
                  your error log and short notes.
                </p>
                <Link
                  to={`/degree/branch/${branchKey}/semester/${semId}/subject/${subjectId.toLowerCase()}`}
                  style={{ color: "#1C352D", fontWeight: 700 }}
                >
                  Open {subject.name} Papers
                </Link>
              </article>
            ))}
          </section>
        ))}

        <section style={{ marginTop: "2rem", textAlign: "left" }}>
          <h2 style={{ marginBottom: "0.6rem" }}>Frequently asked questions</h2>
          <h3 style={{ marginBottom: "0.4rem" }}>Are previous year papers enough to pass?</h3>
          <p style={{ color: "#6b533c", lineHeight: "1.7" }}>
            They are a strong base, but best results come from combining PYQs with syllabus-based concept study
            and short daily revision.
          </p>
          <h3 style={{ marginBottom: "0.4rem" }}>How to avoid blank mind in exam?</h3>
          <p style={{ color: "#6b533c", lineHeight: "1.7" }}>
            Simulate timed practice, maintain a formula sheet, and revise your own solved steps repeatedly in the
            final week.
          </p>
        </section>
      </div>
    </>
  );
}
