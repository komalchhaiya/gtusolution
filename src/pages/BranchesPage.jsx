import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";

function BranchesPage() {
  const navigate = useNavigate();

  const branches = [
    "Computer Engineering",
    "Information Technology",
    "Mechanical Engineering",
    "Civil Engineering",
    "Electronics & Communication",
    "Chemical Engineering",
    "Computer Science",
    "AI & ML"
  ];

  const semesters = [
    "Semester 1",
    "Semester 2",
    "Semester 3",
    "Semester 4",
    "Semester 5",
    "Semester 6",
    "Semester 7",
    "Semester 8"
  ];

  return (
    <>
 
      <div className="main-content">
        <h1 style={{ textAlign: "center", marginBottom: "1rem" }}>
          Popular Branches
        </h1>

        <p style={{ textAlign: "center", marginBottom: "2rem" }}>
          Select your branch → then select semester to view papers.
        </p>

        <div className="grid grid-3">
          {branches.map((branch, i) => (
            <div key={i} className="card">
              <h2 style={{ marginBottom: "1rem" }}>{branch}</h2>

              {/* Semesters list */}
              <div className="grid grid-2">
                {semesters.map((sem, index) => (
                  <button
                    key={index}
                    className="btn btn-primary"
                    style={{ margin: "0.4rem 0" }}
                    onClick={() =>
                      navigate(`/branch/${i + 1}/semester/${index + 1}`)
                    }
                  >
                    {sem}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

     
    </>
  );
}

export default BranchesPage;
