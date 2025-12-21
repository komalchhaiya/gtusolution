import { useParams, useNavigate } from "react-router-dom";
import subjectsData from "../data/subjectsData";

function Subjects() {
  const { mode, semId, branchName } = useParams();
  const navigate = useNavigate();

  const subjects = subjectsData[mode]?.[branchName]?.[semId] || [];

  return (
    <div className="main-content">
      <h1>
        {mode.toUpperCase()} – {branchName.replace("-", " ").toUpperCase()} – Semester {semId}
      </h1>

      <div className="grid grid-3">
        {subjects.map((sub, i) => (
          <div key={i} className="card">
            <h3>{sub.name}</h3>

            <button
              className="btn btn-primary"
              onClick={() =>
                navigate(
                  `/${mode}/branch/${branchName}/semester/${semId}/subject/${sub.pdf.replace(".pdf", "")}`
                )
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

export default Subjects;
