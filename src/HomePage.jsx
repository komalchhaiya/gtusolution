import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import "./App.css";

function HomePage({ mode }) {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const branches =
    mode === "degree"
      ? [
          "computer-engineering",
          "information-technology",
          "mechanical-engineering",
          "civil-engineering",
          "electronics-communication"
        ]
      : [
          "diploma-ce",
          "diploma-it",
          "diploma-mechanical",
          "diploma-civil"
        ];

  const readable = (text) =>
    text.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <>
      {/* <Header /> */}

      {/* DEGREE / DIPLOMA Tabs */}
      <nav className="level-nav">
        <button
          className={mode === "degree" ? "active-tab" : ""}
          onClick={() => navigate("/")}
        >
          Degree
        </button>

        <button
          className={mode === "diploma" ? "active-tab" : ""}
          onClick={() => navigate("/diploma")}
        >
          Diploma
        </button>
      </nav>

      <main className="main-content">
        <section className="section hero">
          <h1>{mode === "degree" ? "GTU Degree Papers" : "GTU Diploma Papers"}</h1>
          <p>Your smart destination for previous year papers.</p>
        </section>

        {/* BRANCHES */}
        <section className="section">
          <h2>Popular Branches</h2>

          <div className="grid grid-3">
            {branches.map((branch, i) => (
              <div key={i} className="card">
                <h3>{readable(branch)}</h3>
                <button
                  className="btn btn-secondary"
                  onClick={() => navigate(`/${mode}/branch/${branch}`)}
                >
                  Explore
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* <Footer /> */}
    </>
  );
}

export default HomePage;
