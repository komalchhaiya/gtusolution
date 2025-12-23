import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Document, Page, pdfjs } from "react-pdf";
import { useState, useEffect, useRef } from "react";
import "./PDFViewerPage.css";

pdfjs.GlobalWorkerOptions.workerSrc =
  new URL("pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url).toString();

function PDFViewerPage() {
  const { mode, branchName, semId, subjectId, pageNo } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const containerRef = useRef(null);

  const currentPage = parseInt(pageNo) || 1;

  // Store PDF URL in state so it persists across page navigations
  const [pdfUrl, setPdfUrl] = useState(() => {
    return location.state?.pdfUrl || `/pdfs/${subjectId}.pdf`;
  });
  const [numPages, setNumPages] = useState(null);
  const [error, setError] = useState(null);
  const [width, setWidth] = useState(900);

  // Update PDF URL if it comes from navigation state
  useEffect(() => {
    if (location.state?.pdfUrl) {
      setPdfUrl(location.state.pdfUrl);
    }
  }, [location.state]);

  function onLoadSuccess(data) {
    setNumPages(data.numPages);
    setError(null);

    if (currentPage < 1 || currentPage > data.numPages) {
      navigate(
        `/${mode}/branch/${branchName}/semester/${semId}/subject/${subjectId}/view/page/1`,
        { replace: true, state: { pdfUrl } }
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
        `/${mode}/branch/${branchName}/semester/${semId}/subject/${subjectId}/view/page/${p}`,
        { state: { pdfUrl } }
      );
    }
  }

  useEffect(function () {
    function resize() {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        // Adjust padding based on screen size
        const padding = window.innerWidth <= 480 ? 16 : window.innerWidth <= 768 ? 28 : 36;
        setWidth(Math.max(containerWidth - padding, 300)); // Minimum width of 300px
      }
    }

    resize();
    window.addEventListener("resize", resize);
    // Also listen to orientation changes on mobile
    window.addEventListener("orientationchange", resize);
    return function () {
      window.removeEventListener("resize", resize);
      window.removeEventListener("orientationchange", resize);
    };
  }, []);

  return (
    <div className="pdf-page-wrap">
      <div className="pdf-container" ref={containerRef}>
        <h1 className="pdf-title">{subjectId || 'PDF'} Solution</h1>

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
