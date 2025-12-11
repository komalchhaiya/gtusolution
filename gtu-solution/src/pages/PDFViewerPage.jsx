import { useParams } from "react-router-dom";
import { Document, Page, pdfjs } from "react-pdf";
import { useState, useEffect, useRef } from "react";
import "./PDFViewerPage.css";

// Configure PDF.js worker - Using local worker file from public folder (most reliable)
pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

function PDFViewerPage() {
  const { subId } = useParams();
  const containerRef = useRef(null);

  const pdfUrl = `/pdfs/${subId}.pdf`;
  const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);

  function onLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setError(null);
  }

  function onLoadError(error) {
    console.error("PDF Load Error:", error);
    console.error("Error details:", {
      message: error?.message,
      name: error?.name,
      stack: error?.stack
    });
    setError(`Failed to load PDF: ${subId}.pdf. Error: ${error?.message || "Unknown error"}`);
  }

  // Client-side protection: Disable right-click, keyboard shortcuts, text selection, etc.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Disable right-click context menu
    const handleContextMenu = (e) => {
      e.preventDefault();
      return false;
    };

    // Block keyboard shortcuts (Ctrl+P, Ctrl+S, Ctrl+Shift+I, F12, etc.)
    const handleKeyDown = (e) => {
      // Block Print (Ctrl+P or Cmd+P)
      if ((e.ctrlKey || e.metaKey) && e.key === "p") {
        e.preventDefault();
        return false;
      }
      // Block Save (Ctrl+S or Cmd+S)
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        return false;
      }
      // Block Developer Tools (Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U, F12)
      if (
        (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J")) ||
        (e.ctrlKey && e.key === "U") ||
        e.key === "F12"
      ) {
        e.preventDefault();
        return false;
      }
      // Block Print Screen
      if (e.key === "PrintScreen") {
        e.preventDefault();
        return false;
      }
    };

    // Disable text selection
    const handleSelectStart = (e) => {
      e.preventDefault();
      return false;
    };

    // Disable drag and drop
    const handleDragStart = (e) => {
      e.preventDefault();
      return false;
    };

    // Disable copy (Ctrl+C)
    const handleCopy = (e) => {
      e.preventDefault();
      return false;
    };

    // Disable cut (Ctrl+X)
    const handleCut = (e) => {
      e.preventDefault();
      return false;
    };

    // Add event listeners
    container.addEventListener("contextmenu", handleContextMenu);
    container.addEventListener("keydown", handleKeyDown);
    container.addEventListener("selectstart", handleSelectStart);
    container.addEventListener("dragstart", handleDragStart);
    container.addEventListener("copy", handleCopy);
    container.addEventListener("cut", handleCut);

    // Also add to document for global protection
    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);

    // Cleanup
    return () => {
      container.removeEventListener("contextmenu", handleContextMenu);
      container.removeEventListener("keydown", handleKeyDown);
      container.removeEventListener("selectstart", handleSelectStart);
      container.removeEventListener("dragstart", handleDragStart);
      container.removeEventListener("copy", handleCopy);
      container.removeEventListener("cut", handleCut);
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < numPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPage = (page) => {
    const pageNum = parseInt(page);
    if (pageNum >= 1 && pageNum <= numPages) {
      setCurrentPage(pageNum);
    }
  };

  return (
    <div className="pdf-page-wrap" ref={containerRef}>
      <div className="pdf-container">
        <div className="pdf-header">
          <div>
            <h1 className="pdf-title">PDF Viewer</h1>
          </div>
        </div>

        <div className="pdf-viewer-box">
          {error ? (
            <div className="pdf-error">
              <p>{error}</p>
              <p style={{ marginTop: "10px", fontSize: "0.9rem" }}>
                Trying to load: <code>{pdfUrl}</code>
              </p>
            </div>
          ) : (
            <Document
              file={pdfUrl}
              onLoadSuccess={onLoadSuccess}
              onLoadError={onLoadError}
              loading={<div className="pdf-loading">Loading PDF...</div>}
              error={
                <div className="pdf-error">
                  <p>Failed to load PDF. Please try again.</p>
                  <p style={{ marginTop: "10px", fontSize: "0.9rem" }}>
                    File: <code>{pdfUrl}</code>
                  </p>
                </div>
              }
            >
              <div className="pdf-document">
                <Page
                  pageNumber={currentPage}
                  scale={1.3}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                />
              </div>
            </Document>
          )}

          {numPages && (
            <div className="pdf-footer-controls">
              <button
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                className="pdf-nav-btn"
              >
                Previous
              </button>

              <span className="page-info">
                Page{" "}
                <input
                  type="number"
                  min="1"
                  max={numPages}
                  value={currentPage}
                  onChange={(e) => goToPage(e.target.value)}
                  className="page-input"
                />{" "}
                of {numPages}
              </span>

              <button
                onClick={goToNextPage}
                disabled={currentPage === numPages}
                className="pdf-nav-btn"
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
