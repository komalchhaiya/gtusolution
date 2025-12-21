import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = 
  `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function PDFViewer({ file }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div style={{ padding: "1rem", textAlign: "center" }}>
      <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>

      {/* Controls */}
      <div style={{ marginTop: "1rem" }}>
        <button
          onClick={() => pageNumber > 1 && setPageNumber(pageNumber - 1)}
          style={{ marginRight: "1rem" }}
        >
          Previous
        </button>

        <span>
          Page {pageNumber} of {numPages}
        </span>

        <button
          onClick={() => pageNumber < numPages && setPageNumber(pageNumber + 1)}
          style={{ marginLeft: "1rem" }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default PDFViewer;
