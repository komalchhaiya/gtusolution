import { useParams, useNavigate } from "react-router-dom";
import { Document, Page, pdfjs } from "react-pdf";
import { useState, useEffect, useRef } from "react";
import "./PDFViewerPage.css";

pdfjs.GlobalWorkerOptions.workerSrc =
  new URL("pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url).toString();

function PDFViewerPage() {
  const { mode, branchName, semId, subId, pageNo } = useParams();
  const navigate = useNavigate();
  const containerRef = useRef(null);

  const pdfUrl = `/pdfs/${subId}.pdf`;
  const currentPage = parseInt(pageNo) || 1;

  const [numPages, setNumPages] = useState(null);
  const [error, setError] = useState(null);
  const [width, setWidth] = useState(900);

  function onLoadSuccess(data) {
    setNumPages(data.numPages);
    setError(null);

    if (currentPage < 1 || currentPage > data.numPages) {
      navigate(
        `/${mode}/branch/${branchName}/semester/${semId}/subject/${subId}/page/1`,
        { replace: true }
      );
    }
  }

  function onLoadError() {
    setError("PDF not found or failed to load.");
  }

  function goToPage(page) {
    const p = parseInt(page);
    if (p >= 1 && p <= numPages) {
      navigate(
        `/${mode}/branch/${branchName}/semester/${semId}/subject/${subId}/page/${p}`
      );
    }
  }

  useEffect(function () {
    function resize() {
      if (containerRef.current) {
        setWidth(containerRef.current.offsetWidth - 20);
      }
    }

    resize();
    window.addEventListener("resize", resize);
    return function () {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="pdf-page-wrap">
      <div className="pdf-container" ref={containerRef}>
        <h1 className="pdf-title">{subId} PDF Solution</h1>

        <div className="pdf-viewer-box">
          {error ? (
            <div className="pdf-error">{error}</div>
          ) : (
            <Document
              file={pdfUrl}
              onLoadSuccess={onLoadSuccess}
              onLoadError={onLoadError}
              loading={<div className="pdf-loading">Loading PDF...</div>}
            >
              <Page
                pageNumber={currentPage}
                width={width}
                renderTextLayer={false}
                renderAnnotationLayer={false}
              />
            </Document>
          )}

          {numPages && (
            <div className="pdf-footer-controls">
              <button
                className="pdf-nav-btn"
                disabled={currentPage === 1}
                onClick={() => goToPage(currentPage - 1)}
              >
                Previous
              </button>

              <span className="page-info">
                Page
                <input
                  className="page-input"
                  type="number"
                  min="1"
                  max={numPages}
                  value={currentPage}
                  onChange={(e) => goToPage(e.target.value)}
                />
                of {numPages}
              </span>

              <button
                className="pdf-nav-btn"
                disabled={currentPage === numPages}
                onClick={() => goToPage(currentPage + 1)}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PDFViewerPage;
