import { useParams, useNavigate } from "react-router-dom";
import subjectsData from "../data/subjectsData";

function SubjectDetails() {
  const { branchName, semId, subId } = useParams();
  const navigate = useNavigate();

  // degree is fixed
  const subjects =
    subjectsData.degree?.[branchName]?.[semId] || [];

  const subject = subjects.find(function (s) {
    return (
      s.name.toLowerCase().replace(/\s+/g, "-") === subId
    );
  });

  if (!subject) {
    return <h2 className="main-content">Subject Not Found</h2>;
  }

  return (
    <div className="main-content">
      <h1>{subject.name}</h1>

      <div className="card">
        <p>Subject Notes / Material</p>

        <button
          className="btn btn-primary"
          onClick={function () {
            navigate(
              "/degree/branch/" +
                branchName +
                "/semester/" +
                semId +
                "/subject/" +
                subId +
                "/page/1"
            );
          }}
        >
          View PDF
        </button>
      </div>
    </div>
  );
}

export default SubjectDetails;
