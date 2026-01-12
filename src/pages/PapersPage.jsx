import { useParams, useNavigate } from "react-router-dom";
import subjectsData from "../data/subjectsData";
import { trackEvent } from "../firebase/analyticsEvents";

export default function PapersPage() {
  const { mode, branchName, semId, subjectId } = useParams();
  const navigate = useNavigate();

  const subject =
    subjectsData?.[mode]?.[branchName]?.[Number(semId)]?.[subjectId];

  if (!subject) {
    return <h2>Subject not found</h2>;
  }

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
    <div className="main-content">
      <h1>{subject.name}</h1>

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
  );
}
