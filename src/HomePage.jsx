import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

function HomePage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  // Degree branches only
  const branches = [
    "computer-engineering",
    
  ];

  // Function to make text readable
  const readable = (text) =>
    text.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <main className="main-content">
      <section className="section hero">
        <h1>GTU Degree Papers</h1>
        <p>Your smart destination for previous year papers.</p>
      </section>

      {/* BRANCHES */}
      <section className="section">
        <h2>Popular Branches</h2>

        <div className="grid grid-3">
          {branches.map(function (branch, i) {
            return (
              <div key={i} className="card">
                <h3>{readable(branch)}</h3>
                <button
                  className="btn btn-secondary"
                  onClick={function () {
                    navigate("/degree/branch/" + branch);
                  }}
                >
                  Explore
                </button>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}

export default HomePage;
