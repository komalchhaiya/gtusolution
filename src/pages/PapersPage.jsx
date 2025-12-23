import { useParams, useNavigate } from "react-router-dom";
import subjectsData from "../data/subjectsData";

export default function PapersPage() {
  const { mode, branchName, semId, subjectId } = useParams();
  const navigate = useNavigate();

  const subject =
    subjectsData?.[mode]?.[branchName]?.[Number(semId)]?.[subjectId];

  if (!subject) {
    return <h2>Subject not found</h2>;
  }

  return (
    <div className="main-content">
      <h1>{subject.name}</h1>

      <div className="card-grid">
        {subject.papers.map((paper, index) => (
          <div key={index} className="card">
            <h2>{paper.title}</h2>
            <button
              className="btn-open"
              onClick={() =>
                navigate("view", { state: { pdfUrl: paper.pdf } })
              }
            >
              Open
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
