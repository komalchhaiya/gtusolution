import { useParams, useNavigate, Link, Navigate } from "react-router-dom";
import subjectsData from "../data/subjectsData";
import { getSubjectContent } from "../data/subjectContent";
import { trackEvent } from "../firebase/analyticsEvents";
import SEO from "../components/SEO";
import StructuredData from "../components/StructuredData";
import {
  findSubjectEntry,
  getCanonicalSubjectPath,
} from "../utils/routes";

export default function PapersPage() {
  const { mode, branchName, semId, subjectId } = useParams();
  const navigate = useNavigate();

  const subjects = subjectsData?.[mode]?.[branchName]?.[Number(semId)];
  const match = findSubjectEntry(subjects, subjectId);

  if (!match) {
    return <Navigate to="/404" replace />;
  }

  const { key: canonicalSubjectId, subject } = match;
  const canonicalPath = getCanonicalSubjectPath({
    mode,
    branchName,
    semId,
    subjectId: canonicalSubjectId,
  });

  if (subjectId !== canonicalSubjectId.toLowerCase()) {
    return <Navigate to={canonicalPath} replace />;
  }

  const content = getSubjectContent(canonicalSubjectId);
  const displayName = content?.fullName || subject.name;

  const readableBranch = (text) =>
    text.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  const canonical = `https://gtupapersolution.co.in${canonicalPath}`;
  const pageTitle = `${displayName} — GTU Previous Year Papers with Solutions | GTU Paper Solution`;
  const pageDescription = `Browse GTU ${displayName} previous year question papers with solutions for ${readableBranch(
    branchName
  )}, Semester ${semId}. ${subject.papers.length} papers available — Summer and Winter sessions with online PDF viewer.`;

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
        name: displayName,
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
        name: `What is the GTU exam pattern for ${displayName}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text:
            content?.examPattern ||
            `GTU ${displayName} papers combine theory and application questions. Solve past papers under timed conditions.`,
        },
      },
      {
        "@type": "Question",
        name: "How many papers should I solve before exam?",
        acceptedAnswer: {
          "@type": "Answer",
          text: `Solve at least 3 full papers for ${displayName} and review ${subject.papers.length} available sessions to understand trends.`,
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
        keywords={`GTU ${displayName} papers with solutions, GTU ${displayName} solved papers, ${readableBranch(
          branchName
        )} semester ${semId} GTU`}
        canonical={canonical}
      />
      <StructuredData id="schema-papers-breadcrumb" data={breadcrumbSchema} />
      <StructuredData id="schema-papers-faq" data={faqSchema} />
      <div className="main-content">
        <h1>{displayName}</h1>
        <p>
          Access previous year GTU question papers with solutions for {displayName}
          {content?.gtuSemester ? ` (${content.gtuSemester})` : ""}. Each paper is
          available as a PDF that you can view in your browser after a quick Google
          sign-in.
        </p>
        <p style={{ color: "#6b533c", fontSize: "0.95rem", marginBottom: "1.5rem" }}>
          Studying solved papers helps you understand the exam pattern, important topics,
          and question formats for {displayName}. Prepare smarter for your GTU exams.
        </p>

        <section aria-labelledby="papers-heading">
          <h2 id="papers-heading">Available papers ({subject.papers.length})</h2>
          <p style={{ color: "#6b533c", fontSize: "0.95rem", marginBottom: "1rem" }}>
            Click Open to read the full paper with solutions in our online PDF viewer.
            Paper titles show the GTU exam session (Summer or Winter) and year.
          </p>
          <div className="card-grid">
            {subject.papers.map((paper, index) => (
              <div key={index} className="card">
                <h3>{paper.title}</h3>
                <p style={{ color: "#6b533c", fontSize: "0.9rem", margin: "0.5rem 0 1rem" }}>
                  {displayName} — {readableBranch(branchName)}, Semester {semId}
                </p>
                <button
                  className="btn-open"
                  onClick={function () {
                    handleOpenPaper(paper);
                  }}
                >
                  Open PDF
                </button>
              </div>
            ))}
          </div>
        </section>

        {content && (
          <>
            <section style={{ marginTop: "2rem", textAlign: "left" }}>
              <h2 style={{ marginBottom: "0.8rem" }}>GTU exam pattern for {displayName}</h2>
              <p style={{ color: "#6b533c", lineHeight: "1.7" }}>{content.examPattern}</p>
            </section>

            <section style={{ marginTop: "1.8rem", textAlign: "left" }}>
              <h2 style={{ marginBottom: "0.8rem" }}>Key syllabus topics</h2>
              <ul style={{ color: "#6b533c", lineHeight: "1.7", paddingLeft: "1.1rem" }}>
                {content.keyTopics.map((topic) => (
                  <li key={topic}>{topic}</li>
                ))}
              </ul>
            </section>

            <section style={{ marginTop: "1.8rem", textAlign: "left" }}>
              <h2 style={{ marginBottom: "0.8rem" }}>Study tips for {displayName}</h2>
              <ul style={{ color: "#6b533c", lineHeight: "1.7", paddingLeft: "1.1rem" }}>
                {content.studyTips.map((tip) => (
                  <li key={tip}>{tip}</li>
                ))}
              </ul>
            </section>

            <section style={{ marginTop: "1.8rem", textAlign: "left" }}>
              <h2 style={{ marginBottom: "0.8rem" }}>Sample question types</h2>
              <ol style={{ color: "#6b533c", lineHeight: "1.7", paddingLeft: "1.1rem" }}>
                {content.sampleQuestions.map((question) => (
                  <li key={question}>{question}</li>
                ))}
              </ol>
            </section>
          </>
        )}

        <section style={{ marginTop: "2rem", textAlign: "left" }}>
          <h2 style={{ marginBottom: "0.8rem" }}>
            How to study {displayName} using past GTU papers
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
          <h2 style={{ marginBottom: "0.8rem" }}>FAQ for {displayName}</h2>
          <h3 style={{ marginBottom: "0.4rem" }}>How many papers should I solve before exam?</h3>
          <p style={{ color: "#6b533c", lineHeight: "1.7" }}>
            Solve at least 3 full papers for confidence, and review all {subject.papers.length} available
            sessions on this page to understand trend and repeatability.
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
