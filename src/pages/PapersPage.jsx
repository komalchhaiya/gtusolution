import { useParams, useNavigate } from "react-router-dom";
import subjectsData from "../data/subjectsData";
import { trackEvent } from "../firebase/analyticsEvents";
import SEO from "../components/SEO";

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

  const canonical = `https://gtusolution.com/${mode}/branch/${branchName}/semester/${semId}/subject/${subjectId}`;
  const pageTitle = `${subject.name} — GTU Previous Year Papers with Solutions | GTU Paper Solution`;
  const pageDescription = `Browse GTU ${subject.name} previous year question papers with solutions for ${readableBranch(
    branchName
  )}, Semester ${semId}. Open any year in the viewer after signing in to study online.`;

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
    </div>
    </>
  );
}