import { useParams, useNavigate } from "react-router-dom";
import subjectsData from "../data/subjectsData";

export default function Subjects() {
  const { mode, branchName, semId } = useParams();
  const navigate = useNavigate();

  const subjects =
    subjectsData?.[mode]?.[branchName]?.[Number(semId)];

  if (!subjects) {
    return <h2>No subjects found</h2>;
  }

  return (
    <div className="main-content">
      <h1>Subjects</h1>

      <div className="card-grid">
        {Object.entries(subjects).map(([subjectId, subject]) => (
          <div key={subjectId} className="card">
            <h2>{subject.name}</h2>
            <button
              className="btn-open"
              onClick={() => navigate(`subject/${subjectId}`)}
            >
              Open
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
