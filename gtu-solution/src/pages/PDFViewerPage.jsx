import { useParams } from "react-router-dom";
import { Document, Page, pdfjs } from "react-pdf";
import { useState } from "react";
import workerSrc from "pdfjs-dist/build/pdf.worker.min.mjs?url";

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

function PDFViewerPage() {
  const { subId } = useParams();

  const pdfUrl = `/pdfs/${subId}.pdf`;
  const [numPages, setNumPages] = useState(null);

  function onLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "900px",
        margin: "0 auto",
        padding: "20px 0",
      }}
    >
      <Document file={pdfUrl} onLoadSuccess={onLoadSuccess}>
        {numPages &&
          Array.from({ length: numPages }, (_, i) => (
            <Page key={i} pageNumber={i + 1} scale={1.3} />
          ))}
      </Document>
    </div>
  );
}

export default PDFViewerPage;
