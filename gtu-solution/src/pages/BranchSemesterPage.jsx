

import { useParams, useNavigate } from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";

function BranchSemesterPage() {
  const { mode, branchName } = useParams();
  const navigate = useNavigate();

  const semesters =
    mode === "degree"
      ? [
          "Semester 1","Semester 2","Semester 3","Semester 4",
          "Semester 5","Semester 6","Semester 7","Semester 8"
        ]
      : [
          "Semester 1","Semester 2","Semester 3",
          "Semester 4","Semester 5","Semester 6"
        ];

  const readable = branchName.replace(/-/g, " ");

  return (
    <>
     
      <main className="main-content">
        <h1>{readable.toUpperCase()}</h1>
        <p>Select a semester</p>

        <div className="grid grid-4">
          {semesters.map((s, i) => (
            <div key={i} className="card">
              <h3>{s}</h3>
              <button
                className="btn btn-primary"
                onClick={() =>
                  navigate(`/${mode}/branch/${branchName}/semester/${i + 1}`)
                }
              >
                Open
              </button>
            </div>
          ))}
        </div>
      </main>
  
    </>
  );
}

export default BranchSemesterPage;
