import { useParams, useNavigate, Link } from "react-router-dom";
import subjectsData from "../data/subjectsData";
import { trackEvent } from "../firebase/analyticsEvents";
import SEO from "../components/SEO";
import StructuredData from "../components/StructuredData";

export default function PapersPage() {
  const { mode, branchName, semId, subjectId } = useParams();
  const navigate = useNavigate();

  const subject =
    subjectsData?.[mode]?.[branchName]?.[Number(semId)]?.[subjectId];

  if (!subject) {
    return <h2>Subject not found</h2>;
  }

  const readableBranch = (text) =>
    text.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  const canonical = `https://gtupapersolution.co.in/${mode}/branch/${branchName}/semester/${semId}/subject/${subjectId}`;
  const pageTitle = `${subject.name} — GTU Previous Year Papers with Solutions | GTU Paper Solution`;
  const pageDescription = `Browse GTU ${subject.name} previous year question papers with solutions for ${readableBranch(
    branchName
  )}, Semester ${semId}. Open any year in the viewer after signing in to study online.`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://gtupapersolution.co.in/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: readableBranch(branchName),
        item: `https://gtupapersolution.co.in/${mode}/branch/${branchName}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `Semester ${semId}`,
        item: `https://gtupapersolution.co.in/${mode}/branch/${branchName}/semester/${semId}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: subject.name,
        item: canonical,
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How many papers should I solve before exam?",
        acceptedAnswer: {
          "@type": "Answer",
          text: `Solve at least 3 full papers for ${subject.name} and review 5 papers to understand trend and repeatability.`,
        },
      },
      {
        "@type": "Question",
        name: "Should I solve on paper or only read solutions?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Solve on paper first. Reading solutions alone creates false confidence and does not train writing speed or exam-style presentation.",
        },
      },
    ],
  };

  function handleOpenPaper(paper) {
    trackEvent("paper_opened", {
      mode,
      branch: branchName,
      semester: semId,
      subject: subject.name,
      paper_title: paper.title,
    });

    navigate("view", { state: { pdfUrl: paper.pdf } });
  }

  return (
    <>
      <SEO
        title={pageTitle}
        description={pageDescription}
        keywords={`GTU ${subject.name} papers with solutions, GTU ${subject.name} solved papers, ${readableBranch(
          branchName
        )} semester ${semId} GTU`}
        canonical={canonical}
      />
      <StructuredData id="schema-papers-breadcrumb" data={breadcrumbSchema} />
      <StructuredData id="schema-papers-faq" data={faqSchema} />
    <div className="main-content">
      <h1>{subject.name}</h1>
      <p>
        Access previous year GTU question papers with solutions for {subject.name}.
        Each paper is available as a PDF that you can view directly in your browser.
      </p>
      <p style={{ color: "#6b533c", fontSize: "0.95rem", marginBottom: "1.5rem" }}>
        Studying solved papers helps you understand the exam pattern, important topics,
        and question formats for {subject.name}. Prepare smarter for your GTU exams.
      </p>

      <div className="card-grid">
        {subject.papers.map((paper, index) => (
          <div key={index} className="card">
            <h2>{paper.title}</h2>
            <button
              className="btn-open"
              onClick={function () {
                handleOpenPaper(paper);
              }}
            >
              Open
            </button>
          </div>
        ))}
      </div>

      <section style={{ marginTop: "2rem", textAlign: "left" }}>
        <h2 style={{ marginBottom: "0.8rem" }}>
          How to study {subject.name} using past GTU papers
        </h2>
        <p style={{ color: "#6b533c", lineHeight: "1.7" }}>
          Start by reading one paper without solving to understand question distribution. Then solve each section
          with a timer and compare your approach to the expected method. Track weak units and revisit them with
          theory notes before attempting the next paper.
        </p>
        <ul style={{ color: "#6b533c", lineHeight: "1.7", paddingLeft: "1.1rem" }}>
          <li>Identify 10-15 high-frequency questions and master their full solutions.</li>
          <li>Practice writing concise definitions and stepwise answers to improve marks.</li>
          <li>In final revision, focus on diagrams, formulas, and repeated long questions.</li>
        </ul>
      </section>

      <section style={{ marginTop: "1.8rem", textAlign: "left" }}>
        <h2 style={{ marginBottom: "0.8rem" }}>FAQ for {subject.name}</h2>
        <h3 style={{ marginBottom: "0.4rem" }}>How many papers should I solve before exam?</h3>
        <p style={{ color: "#6b533c", lineHeight: "1.7" }}>
          Solve at least 3 full papers for confidence, and review 5 papers to understand trend and repeatability.
        </p>
        <h3 style={{ marginBottom: "0.4rem" }}>Should I solve on paper or only read solutions?</h3>
        <p style={{ color: "#6b533c", lineHeight: "1.7" }}>
          Solve on paper first. Reading solutions alone creates false confidence and does not train writing speed
          or exam-style presentation.
        </p>
        <p style={{ color: "#6b533c", lineHeight: "1.7", marginTop: "0.8rem" }}>
          Want a full semester strategy? Visit our{" "}
          <Link to="/study-guides" style={{ color: "#1C352D", fontWeight: 700 }}>
            GTU Study Guides
          </Link>{" "}
          page.
        </p>
      </section>
    </div>
    </>
  );
}