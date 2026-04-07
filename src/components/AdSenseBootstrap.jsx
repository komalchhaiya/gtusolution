import { useEffect } from "react";

const CLIENT = "ca-pub-1095012702272179";

let bootstrapStarted = false;

/**
 * Loads AdSense only on layout screens that include publisher content.
 * Do not mount on /login, /signup, or outside Layout (e.g. RequireAuth loading).
 * Callers should also skip PDF viewer routes where ads are not allowed.
 */
function AdSenseBootstrap() {
  useEffect(() => {
    if (bootstrapStarted) {
      return;
    }
    bootstrapStarted = true;

    const runPush = () => {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({
          google_ad_client: CLIENT,
          enable_page_level_ads: false,
        });
      } catch {
        /* ignore */
      }
    };

    if (document.querySelector('script[data-adsense-bootstrap="1"]')) {
      return;
    }

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(
      CLIENT
    )}`;
    script.crossOrigin = "anonymous";
    script.dataset.adsenseBootstrap = "1";
    script.onload = runPush;
    document.head.appendChild(script);
  }, []);

  return null;
}

export default AdSenseBootstrap;
