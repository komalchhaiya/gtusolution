import { useParams, useNavigate, Navigate } from "react-router-dom";
import subjectsData from "../data/subjectsData";
import SEO from "../components/SEO";

export default function Subjects() {
  const { mode, branchName, semId } = useParams();
  const navigate = useNavigate();
  
  const readable = (text) =>
    text.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  
  const pageTitle = `GTU ${readable(branchName)} Semester ${semId} Subjects with Solutions - GTU Paper Solution`;
  const pageDescription = `Access GTU ${readable(branchName)} Semester ${semId} previous year question papers with solutions. Find all subjects and solved papers for exam preparation.`;

  const subjects =
    subjectsData?.[mode]?.[branchName]?.[Number(semId)];

  if (!subjects) {
    return <Navigate to="/404" replace />;
  }

  return (
    <>
      <SEO 
        title={pageTitle}
        description={pageDescription}
        keywords={`GTU ${readable(branchName)} semester ${semId} papers with solutions, GTU papers with solutions, GTU question papers with solutions, ${readable(branchName)} papers with solutions`}
        canonical={`https://gtupapersolution.co.in/${mode}/branch/${branchName}/semester/${semId}`}
      />
    <div className="main-content">
      <h1>Subjects</h1>
      <p style={{ color: "#6b533c", lineHeight: "1.7", marginBottom: "1rem" }}>
        This page lists subject-wise resources for {readable(branchName)} semester {semId}. Open a subject
        to see available GTU previous year papers and prepare unit-by-unit with a practical revision plan.
      </p>

      <div className="card-grid">
        {Object.entries(subjects).map(([subjectId, subject]) => (
          <div key={subjectId} className="card">
            <h2>{subject.name}</h2>
            <p style={{ color: "#6b533c", fontSize: "0.9rem", margin: "0.4rem 0 1rem" }}>
              {subject.papers.length} paper{subject.papers.length === 1 ? "" : "s"} available
            </p>
            <button
              className="btn-open"
              onClick={() => navigate(`subject/${subjectId.toLowerCase()}`)}
            >
              Open
            </button>
          </div>
        ))}
      </div>

      <section style={{ marginTop: "2rem", textAlign: "left" }}>
        <h2 style={{ marginBottom: "0.8rem" }}>Smart preparation guide for semester {semId}</h2>
        <p style={{ color: "#6b533c", lineHeight: "1.7" }}>
          For each subject, begin by checking the syllabus units and then solve past papers in sequence:
          latest exam first, then older exams. This helps you understand current difficulty trends and repeated
          topics. Keep short notes for formulas, definitions, and common derivations.
        </p>
        <ul style={{ color: "#6b533c", lineHeight: "1.7", paddingLeft: "1.1rem" }}>
          <li>Solve topic-wise questions first, then attempt full papers under timer.</li>
          <li>Use model answers to improve structure, not to memorize blindly.</li>
          <li>Revise weak subjects every 2-3 days to maintain retention.</li>
        </ul>
      </section>

      <section style={{ marginTop: "1.8rem", textAlign: "left" }}>
        <h2 style={{ marginBottom: "0.8rem" }}>FAQ</h2>
        <h3 style={{ marginBottom: "0.4rem" }}>Are these enough for GTU preparation?</h3>
        <p style={{ color: "#6b533c", lineHeight: "1.7" }}>
          Previous year papers are a strong foundation, but you should combine them with textbooks, lecture notes,
          and updated syllabus guidance from your faculty.
        </p>
        <h3 style={{ marginBottom: "0.4rem" }}>How should I divide study time?</h3>
        <p style={{ color: "#6b533c", lineHeight: "1.7" }}>
          A practical split is 60% core subjects, 25% medium-weight subjects, and 15% quick revision topics during
          the final two weeks before exams.
        </p>
      </section>
    </div>
    </>
  );
}
