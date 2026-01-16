import React from "react";
import { useNavigate } from "react-router-dom";
import './App.css'
import SEO from "./components/SEO";

function HomePage() {
  const navigate = useNavigate();

  const branches = ["computer-engineering"];

  const readable = (text) =>
    text.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <>
      <SEO 
        title="GTU Paper Solution - Previous Year Question Papers with Solutions"
        description="Access GTU previous year question papers with solutions organized by branch and semester. Free PDF viewer for DBMS, Data Structure, Operating System, OOP, and more. Perfect for GTU exam preparation."
        keywords="GTU papers with solutions, GTU previous year papers with solutions, GTU question papers with solutions, GTU paper solution, GTU solved papers, Gujarat Technological University papers with solutions, GTU DBMS papers with solutions, GTU Data Structure papers with solutions, GTU OS papers with solutions, GTU OOP papers with solutions"
        canonical="https://gtusolution.com/"
      />
    <div className="home-container">
      {/* Inline CSS - All styling is internal to this component */}
      <style>{`
        .home-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #f4f0ec 0%, #ffffff 70%);
          padding: 2rem 1rem;
        }

        .dark-mode .home-container {
          background: linear-gradient(135deg, #0f1e19 0%, #1a2f28 70%);
        }

        .hero-banner {
          text-align: center;
          padding: 5rem 1rem 4rem;
          position: relative;
          overflow: hidden;
        }

        .hero-banner::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(28,53,45,0.08) 0%, transparent 70%);
          animation: rotate 30s linear infinite;
          z-index: 0;
        }

        .hero-content {
          position: relative;
          z-index: 1;
        }

        .hero-banner h1 {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 3.2rem;
          color: #1C352D;
          margin-bottom: 1rem;
          font-weight: 800;
        }

        .dark-mode .hero-banner h1 {
          color: #F4F0EC;
        }

        .hero-banner p {
          font-size: 1.3rem;
          color: #6b533c;
          max-width: 700px;
          margin: 0 auto;
          line-height: 1.7;
        }

        .dark-mode .hero-banner p {
          color: #d6cfc7;
        }

        .floating-label {
          display: inline-block;
          background: #1C352D;
          color: #F4F0EC;
          padding: 0.6rem 1.4rem;
          border-radius: 50px;
          font-size: 0.9rem;
          font-weight: 600;
          margin: 1.5rem 0.5rem;
          box-shadow: 0 4px 15px rgba(28,53,45,0.2);
          animation: float 6s ease-in-out infinite;
        }

        .dark-mode .floating-label {
          background: #2a4a3e;
          box-shadow: 0 4px 15px rgba(0,0,0,0.4);
        }

        .floating-label:nth-child(1) { animation-delay: 0s; }
        .floating-label:nth-child(2) { animation-delay: 2s; }
        .floating-label:nth-child(3) { animation-delay: 4s; }

        .about-section {
          max-width: 900px;
          margin: 4rem auto;
          text-align: center;
          padding: 0 1rem;
        }

        .about-section p {
          font-size: 1.15rem;
          line-height: 1.8;
          color: #555D50;
          margin-bottom: 2rem;
        }

        .dark-mode .about-section p {
          color: #d6cfc7;
        }

        .features-banner {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin: 4rem auto;
          max-width: 1100px;
          padding: 0 1rem;
        }

        .feature-card {
          background: #ffffff;
          border-radius: 20px;
          padding: 2.5rem 2rem;
          text-align: center;
          box-shadow: 0 10px 30px rgba(28,53,45,0.1);
          transition: all 0.4s ease;
          border: 2px solid transparent;
        }

        .dark-mode .feature-card {
          background: #1a2f28;
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }

        .feature-card:hover {
          transform: translateY(-12px) rotate(1deg);
          border-color: #1C352D;
          box-shadow: 0 20px 40px rgba(28,53,45,0.15);
        }

        .dark-mode .feature-card:hover {
          box-shadow: 0 20px 40px rgba(0,0,0,0.4);
        }

        .feature-card h3 {
          font-family: 'Playfair Display', serif;
          font-size: 1.6rem;
          color: #1C352D;
          margin-bottom: 1rem;
        }

        .dark-mode .feature-card h3 {
          color: #F4F0EC;
        }

        .feature-card p {
          color: #6b533c;
          line-height: 1.7;
        }

        .dark-mode .feature-card p {
          color: #d6cfc7;
        }

        .branches-section {
          max-width: 1000px;
          margin: 5rem auto 3rem;
          text-align: center;
          padding: 0 1rem;
        }

        .branches-section h2 {
          font-family: 'Playfair Display', serif;
          font-size: 2.4rem;
          color: #1C352D;
          margin-bottom: 3rem;
        }

        .dark-mode .branches-section h2 {
          color: #F4F0EC;
        }

        .branches-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 2rem;
        }

        .branch-card {
          background: #ffffff;
          border-radius: 18px;
          padding: 2.5rem 1.5rem;
          box-shadow: 0 8px 25px rgba(28,53,45,0.1);
          transition: all 0.4s ease;
          cursor: pointer;
        }

        .dark-mode .branch-card {
          background: #2a4a3e;
          box-shadow: 0 8px 25px rgba(0,0,0,0.3);
        }

        .branch-card:hover {
          transform: translateY(-10px) scale(1.03);
          box-shadow: 0 20px 40px rgba(28,53,45,0.2);
        }

        .dark-mode .branch-card:hover {
          box-shadow: 0 20px 40px rgba(0,0,0,0.5);
        }

        .branch-card h3 {
          font-size: 1.5rem;
          color: #1C352D;
          margin-bottom: 1.5rem;
        }

        .dark-mode .branch-card h3 {
          color: #F4F0EC;
        }

        .explore-btn {
          background: #1C352D;
          color: #F4F0EC;
          border: none;
          padding: 0.9rem 2rem;
          border-radius: 50px;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          min-height: 44px;
        }

        .explore-btn:hover {
          background: #264a3e;
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(28,53,45,0.3);
        }

        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }

        @media (max-width: 768px) {
          .hero-banner h1 {
            font-size: 2.6rem;
          }
          .hero-banner p {
            font-size: 1.15rem;
          }
          .floating-label {
            display: block;
            margin: 1rem auto;
            width: fit-content;
          }
          .features-banner {
            grid-template-columns: 1fr;
          }
          .branches-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 480px) {
          .hero-banner {
            padding: 3rem 1rem 2rem;
          }
          .hero-banner h1 {
            font-size: 2.2rem;
          }
        }
      `}</style>

      {/* Hero Banner with rotating background effect */}
      <section className="hero-banner">
        <div className="hero-content">
          <h1>GTU Paper Solutions</h1>
          <p>
            Your smart destination for previous year question papers — organized, accessible, and designed to help you excel.
          </p>

          {/* Floating Rotating Labels */}
          <div style={{ marginTop: "2rem" }}>
            <span className="floating-label">Previous Year Papers</span>
            <span className="floating-label">Branch & Semester Wise</span>
            <span className="floating-label">Online PDF Viewer</span>
          </div>
        </div>
      </section>
  <section className="branches-section">
        <h2>Explore Popular Branches</h2>
        <div className="branches-grid">
          {branches.map((branch, i) => (
            <div
              key={i}
              className="branch-card"
              onClick={() => navigate("/degree/branch/" + branch)}
            >
              <h3>{readable(branch)}</h3>
              <button className="explore-btn">Explore Papers →</button>
            </div>
          ))}
        </div>

        
        
      </section>
      {/* About Section */}
      <section className="about-section">
        <p>
          GTU Paper Solution is an educational platform created to help Gujarat Technological University students access previous year question papers in a simple and organized way. This website is designed to support exam preparation by providing reliable academic resources in one place.
        </p>
        <p>
          By using previous year question papers, students can understand exam patterns, important topics, and question formats more effectively. Our goal is to make exam preparation smarter and more accessible.
        </p>
      </section>

      {/* Features Banner - Highlight Cards */}
      <section className="features-banner">
        <div className="feature-card">
          <h3>Integrated PDF Viewer</h3>
          <p>
            All question papers can be viewed directly online using our built-in PDF viewer. No downloads needed — study instantly with a smooth and fast experience.
          </p>
        </div>
        <div className="feature-card">
          <h3>Organized by Branch & Semester</h3>
          <p>
            Papers are neatly categorized by branch and semester, making it easy to find exactly what you need for your current studies.
          </p>
        </div>
        <div className="feature-card">
          <h3>Educational Purpose Only</h3>
          <p>
            This platform is strictly for educational use, providing helpful academic resources to support student learning and exam preparation.
          </p>
        </div>
      </section>

      {/* Popular Branches */}
    
    </div>
    </>
  );
}

export default HomePage;