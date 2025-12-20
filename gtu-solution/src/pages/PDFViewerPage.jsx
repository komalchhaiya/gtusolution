import { useParams } from "react-router-dom";
import { Document, Page, pdfjs } from "react-pdf";
import { useState, useEffect, useRef } from "react";
import "./PDFViewerPage.css";

// Configure PDF.js worker - Using local worker file from public folder (most reliable)
pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

// Global AdSense blocker for localhost - prevents script from processing any elements
if (typeof window !== "undefined") {
  const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  
  if (isLocalhost) {
    // CRITICAL: Intercept fetch and XMLHttpRequest to block AdSense network requests
    // This prevents 400 errors even if the script is already loaded
    
    // Block fetch requests to AdSense domains
    const originalFetch = window.fetch;
    window.fetch = function(...args) {
      const url = typeof args[0] === 'string' ? args[0] : args[0]?.url || '';
      if (url.includes('googleads.g.doubleclick.net') || 
          url.includes('pagead2.googlesyndication.com') ||
          url.includes('googlesyndication.com')) {
        console.log('[AdSense Blocker] Blocked fetch request to:', url);
        return Promise.reject(new Error('AdSense blocked on localhost'));
      }
      return originalFetch.apply(this, args);
    };
    
    // Block XMLHttpRequest to AdSense domains
    const originalXHROpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function(method, url, ...rest) {
      if (typeof url === 'string' && (
          url.includes('googleads.g.doubleclick.net') || 
          url.includes('pagead2.googlesyndication.com') ||
          url.includes('googlesyndication.com'))) {
        console.log('[AdSense Blocker] Blocked XHR request to:', url);
        // Override send to prevent the request
        this.send = function() {
          // Block the request
        };
        return;
      }
      return originalXHROpen.apply(this, [method, url, ...rest]);
    };
    
    // Remove any existing AdSense script tags
    const removeAdSenseScripts = () => {
      const scripts = document.querySelectorAll('script[src*="adsbygoogle"], script[data-adsense]');
      scripts.forEach(script => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      });
    };
    
    // Block adsbygoogle.push globally on localhost
    if (!window._adsbygoogleOriginalPush) {
      window._adsbygoogleOriginalPush = window.adsbygoogle?.push;
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push = function(...args) {
        // Silently block all AdSense pushes on localhost
        return;
      };
    }
    
    // Remove any existing AdSense elements from DOM
    const removeAdSenseElements = () => {
      const adElements = document.querySelectorAll('ins.adsbygoogle');
      adElements.forEach(el => {
        if (el.parentNode) {
          el.parentNode.removeChild(el);
        }
      });
    };
    
    // Run immediately
    removeAdSenseScripts();
    removeAdSenseElements();
    
    // Run on DOM ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        removeAdSenseScripts();
        removeAdSenseElements();
      });
    }
    
    // Monitor for new script tags being added
    const observer = new MutationObserver(() => {
      removeAdSenseScripts();
      removeAdSenseElements();
    });
    
    observer.observe(document.head, { childList: true, subtree: true });
    observer.observe(document.body, { childList: true, subtree: true });
  }
}

function loadAdSenseScript(client, testMode = false) {
  if (typeof document === "undefined") return Promise.resolve(false);
  
  // Never load AdSense script on localhost (will cause 400 errors)
  const isLocalhost = typeof window !== "undefined" && 
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
  if (isLocalhost) {
    return Promise.resolve(false);
  }

  const existing = document.querySelector('script[data-adsense="true"]');
  if (existing) return Promise.resolve(true);

  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.async = true;
    // In test mode, load script without client param (Google's recommendation)
    // Otherwise, include client in URL
    script.src = testMode || !client
      ? "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
      : `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(
          client
        )}`;
    script.crossOrigin = "anonymous";
    script.setAttribute("data-adsense", "true");
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.head.appendChild(script);
  });
}

function AdSenseAnchor({ position, client, slot, testMode = false }) {
  const insRef = useRef(null);
  const [showPlaceholder, setShowPlaceholder] = useState(false);

  // Check if we're on localhost (AdSense won't serve ads here)
  const isLocalhost = typeof window !== "undefined" && 
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

  // Show placeholder immediately on localhost and prevent any AdSense processing
  useEffect(() => {
    if (isLocalhost) {
      setShowPlaceholder(true);
      
      // Prevent AdSense script from processing any elements on localhost
      // This handles cases where the script was loaded on a previous page
      if (typeof window !== "undefined" && window.adsbygoogle) {
        // Override adsbygoogle.push to prevent processing on localhost
        const originalPush = window.adsbygoogle.push;
        window.adsbygoogle.push = function(...args) {
          console.log(`[AdSense ${position}] Blocked push on localhost`);
          return; // Don't process on localhost
        };
        
        return () => {
          // Restore original on cleanup
          if (window.adsbygoogle && originalPush) {
            window.adsbygoogle.push = originalPush;
          }
        };
      }
    }
  }, [isLocalhost, position]);

  useEffect(() => {
    if (import.meta.env.DEV && !testMode) return;
    if (!client || !slot) return;
    
    // CRITICAL: Never run AdSense on localhost - will always cause 400 errors
    // Even with data-adtest="on", AdSense requires valid slot IDs and approved domains
    if (isLocalhost) {
      console.log(`[AdSense ${position}] ⚠️ Skipping on localhost - AdSense doesn't work on localhost even with test mode`);
      return;
    }

    let cancelled = false;

    (async () => {
      console.log(`[AdSense ${position}] Loading script...`, { client, slot, testMode });
      
      const ok = await loadAdSenseScript(client, testMode);
      if (!ok || cancelled) {
        console.warn(`[AdSense ${position}] Script load failed or cancelled`);
        return;
      }

      const el = insRef.current;
      if (!el) {
        console.warn(`[AdSense ${position}] Element not found`);
        return;
      }

      // Avoid pushing again if AdSense already filled this slot
      const status = el.getAttribute("data-adsbygoogle-status");
      if (status === "done") {
        console.log(`[AdSense ${position}] Already filled`);
        return;
      }

      try {
        console.log(`[AdSense ${position}] Pushing to adsbygoogle...`);
        // eslint-disable-next-line no-undef
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        
        // Check status after a delay
        setTimeout(() => {
          const newStatus = el.getAttribute("data-adsbygoogle-status");
          console.log(`[AdSense ${position}] Status after push:`, newStatus);
          
          // Check if slot ID looks like a placeholder
          const isPlaceholderSlot = slot === '1234567890' || slot === '0987654321' || 
                                   slot === '123456789' || slot.length < 8;
          
          if (isPlaceholderSlot) {
            console.warn(`[AdSense ${position}] ⚠️ Using placeholder slot ID "${slot}" - AdSense won't work. Create real ad units in AdSense and use their slot IDs.`);
            setShowPlaceholder(true);
          } else if (newStatus === "error") {
            console.error(`[AdSense ${position}] AdSense error - check browser console for details`);
            console.error(`[AdSense ${position}] Possible causes: Invalid slot ID, domain not approved, or AdSense account issues`);
            setShowPlaceholder(true);
          } else if (!newStatus || newStatus === "unfilled") {
            // Show placeholder if ad doesn't fill
            console.warn(`[AdSense ${position}] Ad not filled. Status: ${newStatus || 'unfilled'}`);
            setShowPlaceholder(true);
          } else if (newStatus === "done") {
            console.log(`[AdSense ${position}] ✅ Ad successfully loaded!`);
          }
        }, 3000);
      } catch (e) {
        // AdSense can throw in dev/preview or if blocked by extensions.
        console.error(`[AdSense ${position}] Push failed:`, e);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [client, slot, testMode, position, isLocalhost]);

  if (import.meta.env.DEV && !testMode) return null;
  if (!client || !slot) return null;

  // On localhost, only show placeholder - don't render AdSense element to avoid 400 errors
  if (isLocalhost) {
    return (
      <div className={`adsense-anchor adsense-anchor--${position}`}>
        <div className="adsense-anchor__inner">
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "90px",
            color: "#999",
            fontSize: "12px",
            textAlign: "center",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            padding: "8px 12px",
            borderRadius: "4px",
            border: "1px dashed #ccc"
          }}>
            📍 Ad slot placeholder<br />
            <small>localhost - deploy to see real ads</small>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`adsense-anchor adsense-anchor--${position}`}>
      <div className="adsense-anchor__inner">
        <ins
          ref={insRef}
          className="adsbygoogle"
          style={{ display: "block", width: "100%", minHeight: "90px" }}
          data-ad-client={client}
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
          {...(testMode ? { "data-adtest": "on" } : {})}
        />
        {showPlaceholder && (
          <div style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "#999",
            fontSize: "12px",
            textAlign: "center",
            pointerEvents: "none",
            zIndex: 1,
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            padding: "8px 12px",
            borderRadius: "4px",
            border: "1px dashed #ccc"
          }}>
            Ad loading...
          </div>
        )}
      </div>
    </div>
  );
}

function PDFViewerPage() {
  const { subId } = useParams();
  const containerRef = useRef(null);

  const pdfUrl = `/pdfs/${subId}.pdf`;
  const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);

  const adClient = import.meta.env.VITE_ADSENSE_CLIENT;
  const adSlotTop = import.meta.env.VITE_ADSENSE_SLOT_TOP;
  const adSlotBottom = import.meta.env.VITE_ADSENSE_SLOT_BOTTOM;
  const adTestMode = import.meta.env.VITE_ADSENSE_TEST_MODE === "true";

  const showTopAd = Boolean(adClient && adSlotTop);
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const showBottomAd = Boolean(adClient && adSlotBottom && !isFooterVisible);

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

  // Measure header height so the top anchor sits below sticky header.
  useEffect(() => {
    const setHeaderHeightVar = () => {
      const header = document.querySelector("header");
      if (!header) return;
      document.documentElement.style.setProperty(
        "--app-header-height",
        `${header.offsetHeight}px`
      );
    };

    setHeaderHeightVar();
    window.addEventListener("resize", setHeaderHeightVar);
    return () => window.removeEventListener("resize", setHeaderHeightVar);
  }, []);

  // Hide the bottom anchor while footer is visible (prevents overlap).
  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsFooterVisible(Boolean(entry?.isIntersecting));
      },
      { threshold: 0.01 }
    );

    observer.observe(footer);
    return () => observer.disconnect();
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
    <div
      className={[
        "pdf-page-wrap",
        showTopAd ? "pdf-page-wrap--with-top-ad" : "",
        showBottomAd ? "pdf-page-wrap--with-bottom-ad" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      ref={containerRef}
    >
      {showTopAd && (
        <AdSenseAnchor
          position="top"
          client={adClient}
          slot={adSlotTop}
          testMode={adTestMode}
        />
      )}
      {showBottomAd && (
        <AdSenseAnchor
          position="bottom"
          client={adClient}
          slot={adSlotBottom}
          testMode={adTestMode}
        />
      )}
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
