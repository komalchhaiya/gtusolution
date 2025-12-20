// src/main.jsx
// CRITICAL: Block AdSense on localhost BEFORE any React code runs
// This prevents 400 errors from AdSense network requests
if (typeof window !== "undefined") {
  const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  
  if (isLocalhost) {
    // Intercept fetch to block AdSense requests
    const originalFetch = window.fetch;
    window.fetch = function(...args) {
      const url = typeof args[0] === 'string' ? args[0] : args[0]?.url || '';
      if (url.includes('googleads.g.doubleclick.net') || 
          url.includes('pagead2.googlesyndication.com') ||
          url.includes('googlesyndication.com')) {
        return Promise.reject(new Error('AdSense blocked on localhost'));
      }
      return originalFetch.apply(this, args);
    };
    
    // Intercept XMLHttpRequest to block AdSense requests
    const originalXHROpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function(method, url, ...rest) {
      if (typeof url === 'string' && (
          url.includes('googleads.g.doubleclick.net') || 
          url.includes('pagead2.googlesyndication.com') ||
          url.includes('googlesyndication.com'))) {
        this.send = function() {}; // Block send
        return;
      }
      return originalXHROpen.apply(this, [method, url, ...rest]);
    };
    
    // Block adsbygoogle.push
    window.adsbygoogle = window.adsbygoogle || [];
    window.adsbygoogle.push = function() { return; };
  }
}

import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
 <StrictMode>
  <AuthProvider>
    <App />
    </AuthProvider>
    </StrictMode>
   

  

);
