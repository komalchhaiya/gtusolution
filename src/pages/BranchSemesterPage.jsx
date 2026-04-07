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
  const pageTitle = `${readable.toUpperCase()} — GTU Semester Papers with Solutions | GTU Paper Solution`;
  const pageDescription = `Choose a semester for GTU ${readable} branch to view subject-wise previous year question papers with solutions and prepare for university exams.`;
  const canonical = `https://gtusolution.com/degree/branch/${branchName}`;

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
    </main>
    </>
  );
}

export default BranchSemesterPage;