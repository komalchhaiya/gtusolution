import { useParams, useNavigate } from "react-router-dom";
import { trackEvent } from "../firebase/analyticsEvents";

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
    <main className="main-content">
      <h1>{readable.toUpperCase()}</h1>
      <p>Select a semester</p>

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
  );
}

export default BranchSemesterPage;
