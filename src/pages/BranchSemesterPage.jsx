import { useParams, useNavigate } from "react-router-dom";
import { trackEvent } from "../firebase/analyticsEvents";
import SEO from "../components/SEO";

function BranchSemesterPage() {
  const params = useParams();
  const navigate = useNavigate();

  const branchName = params.branchName;

  const semesters = [
    "Semester 3",
    "Semester 4",
    "Semester 5",
    "Semester 6"
  ];

  const readable = branchName.replace(/-/g, " ");
  const branchDisplay = readable
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  const pageTitle = `${readable.toUpperCase()} — GTU Semester Papers with Solutions | GTU Paper Solution`;
  const pageDescription = `Choose a semester for GTU ${readable} branch to view subject-wise previous year question papers with solutions and prepare for university exams.`;
  const canonical = `https://gtupapersolution.co.in/degree/branch/${branchName}`;

  function handleOpenSemester(index) {
    trackEvent("semester_opened", {
      branch: branchName,
      semester: index + 1,
    });

    navigate(
      "/degree/branch/" + branchName + "/semester/" + (index + 1)
    );
  }

  return (
    <>
      <SEO
        title={pageTitle}
        description={pageDescription}
        keywords={`GTU ${readable} papers with solutions, GTU ${readable} semester papers, GTU question papers ${readable}`}
        canonical={canonical}
      />
    <main className="main-content">
      <h1>{readable.toUpperCase()}</h1>
      <p>
        Browse previous year GTU question papers with solutions for {readable} branch.
        Select a semester below to find subject-wise solved papers for your GTU exam preparation.
      </p>
      <p style={{ color: "#6b533c", fontSize: "0.95rem", marginBottom: "1.5rem" }}>
        All papers are organized semester-wise and subject-wise to help you study 
        efficiently and score better in your GTU examinations.
      </p>

      <div className="grid grid-4">
        {semesters.map(function (s, i) {
          return (
            <div key={i} className="card">
              <h3>{s}</h3>
              <button
                className="btn btn-primary"
                onClick={function () {
                  handleOpenSemester(i);
                }}
              >
                Open
              </button>
            </div>
          );
        })}
      </div>

      <section style={{ marginTop: "2rem", textAlign: "left" }}>
        <h2 style={{ marginBottom: "0.8rem" }}>
          How to use {branchDisplay} semester papers effectively
        </h2>
        <p style={{ color: "#6b533c", lineHeight: "1.7" }}>
          Start with your current semester and review at least the last three exam papers for each subject.
          Mark repeated question patterns, then prepare one-page revision notes per unit. Focus on answering
          with proper steps, definitions, and diagrams because GTU evaluations reward clear presentation.
        </p>
        <ul style={{ color: "#6b533c", lineHeight: "1.7", paddingLeft: "1.1rem" }}>
          <li>Practice one timed paper every weekend and check where you lose marks.</li>
          <li>Prioritize topics that appear repeatedly across Summer and Winter sessions.</li>
          <li>Use subject-wise PYQs for revision, not just for last-day preparation.</li>
        </ul>
      </section>

      <section style={{ marginTop: "1.8rem", textAlign: "left" }}>
        <h2 style={{ marginBottom: "0.8rem" }}>Frequently asked questions</h2>
        <h3 style={{ marginBottom: "0.4rem" }}>Which semester should I start with?</h3>
        <p style={{ color: "#6b533c", lineHeight: "1.7" }}>
          Begin with your current semester, then move to the next semester if you want to build an early advantage.
          Do not skip foundational units from earlier semesters.
        </p>
        <h3 style={{ marginBottom: "0.4rem" }}>How many years of papers are enough?</h3>
        <p style={{ color: "#6b533c", lineHeight: "1.7" }}>
          A minimum of 3 years is recommended. If possible, solve 5 years to identify stable patterns and high-weight questions.
        </p>
      </section>
    </main>
    </>
  );
}

export default BranchSemesterPage;