import { useParams, useNavigate } from "react-router-dom";
import subjectsData from "../data/subjectsData";
import SEO from "../components/SEO";

export default function Subjects() {
  const { mode, branchName, semId } = useParams();
  const navigate = useNavigate();
  
  const readable = (text) =>
    text.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  
  const pageTitle = `GTU ${readable(branchName)} Semester ${semId} Subjects with Solutions - GTU Paper Solution`;
  const pageDescription = `Access GTU ${readable(branchName)} Semester ${semId} previous year question papers with solutions. Find all subjects and solved papers for exam preparation.`;

  const subjects =
    subjectsData?.[mode]?.[branchName]?.[Number(semId)];

  if (!subjects) {
    return <h2>No subjects found</h2>;
  }

  return (
    <>
      <SEO 
        title={pageTitle}
        description={pageDescription}
        keywords={`GTU ${readable(branchName)} semester ${semId} papers with solutions, GTU papers with solutions, GTU question papers with solutions, ${readable(branchName)} papers with solutions`}
        canonical={`https://gtusolution.com/${mode}/branch/${branchName}/semester/${semId}`}
      />
    <div className="main-content">
      <h1>Subjects</h1>

      <div className="card-grid">
        {Object.entries(subjects).map(([subjectId, subject]) => (
          <div key={subjectId} className="card">
            <h2>{subject.name}</h2>
            <button
              className="btn-open"
              onClick={() => navigate(`subject/${subjectId}`)}
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
