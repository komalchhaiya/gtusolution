import { useParams, useNavigate } from "react-router-dom";
import subjectsData from "../data/subjectsData";

export default function SubjectDetails() {
  const { mode, semId, branchName, subjectId } = useParams();
  const navigate = useNavigate();

  const subject =
    subjectsData[mode]?.[branchName]?.[semId]?.[subjectId];

  if (!subject) return <h2>Subject Not Found</h2>;

  return (
    <div className="main-content">
      <h1>{subject.name}</h1>

      <button
        className="btn btn-primary"
        onClick={() =>
          navigate(
            `/${mode}/branch/${branchName}/semester/${semId}/subject/${subjectId}/view`
          )
        }
      >
        View PDF
      </button>
    </div>
  );
}
