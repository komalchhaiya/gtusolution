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
        <h1>GTU Degree Paper Solutions</h1>
        <p>Your smart destination for previous year papers.</p>
      </section>
      <p
  style={{
    maxWidth: "900px",
    margin: "20px auto",
    fontSize: "16px",
    lineHeight: "1.7",
     padding:"30px",
    borderRadius:'10px',
    color: "#6b533c",
    textAlign: "center"
  }}
>
  GTU Paper Solution is an educational platform created to help Gujarat
  Technological University students access previous year question papers
  in a simple and organized way. This website is designed to support exam
  preparation by providing reliable academic resources in one place.
</p>
<p
  style={{
    maxWidth: "900px",
    margin: "15px auto",
    fontSize: "16px",
    lineHeight: "1.7",
     padding:"30px",
    borderRadius:'10px',
    color: "#6b533c",
    textAlign: "center"
  }}
>
  By using previous year question papers, students can understand exam
  patterns, important topics, and question formats more effectively.
  Our goal is to make exam preparation smarter and more accessible by
  organizing papers branch-wise and semester-wise.
</p>
<p
  style={{
    maxWidth: "900px",
    margin: "15px auto",
    fontSize: "15px",
    lineHeight: "1.7",
     padding:"30px",
    borderRadius:'10px',
    color: "black",
    background:"#ccbaaaff",
    textAlign: "center"
  }}
>
  All question papers on this platform can be viewed online using an
  integrated PDF viewer, allowing students to quickly access content
  without unnecessary downloads and ensuring a smooth learning experience.
</p>


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
        <p
  style={{
    maxWidth: "900px",
    margin: "30px auto",
    fontSize: "14px",
    padding:"30px",
    borderRadius:'10px',
    lineHeight: "1.6",
    color: "black",
    background:"#ccbaaaff",
    textAlign: "center"
  }}
>
  GTU Paper Solution is intended strictly for educational purposes and
  aims to provide clear, accessible, and helpful academic resources for
  students.
</p>

      </section>
    </main>
  );
}

export default HomePage;
