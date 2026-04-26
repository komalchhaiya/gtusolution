import { useEffect } from 'react';

/**
 * SEO Component - Updates document head for better SEO
 * This works without external dependencies
 */
function SEO({ 
  title = "GTU Paper Solution - Previous Year Question Papers with Solutions",
  description = "Access GTU previous year question papers with solutions organized by branch and semester. Free PDF viewer for exam preparation.",
  keywords = "GTU papers with solutions, GTU previous year papers with solutions, GTU question papers with solutions, GTU solved papers",
  canonical = "",
  ogImage = "/vite.svg"
}) {
  useEffect(() => {
    const currentUrl = window.location.href;

    // Update title
    document.title = title;
    
    // Update or create meta tags
    const updateMetaTag = (name, content, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };
    
    // Update description
    updateMetaTag('description', description);
    
    // Update keywords
    updateMetaTag('keywords', keywords);
    
    // Update Open Graph tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', ogImage, true);
    
    // Update Twitter tags
    updateMetaTag('twitter:title', title, true);
    updateMetaTag('twitter:description', description, true);
    updateMetaTag('twitter:image', ogImage, true);
    
    // Update canonical URL
    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]');
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
      }
      let finalCanonical = canonical;
      try {
        const canonicalUrl = new URL(canonical);
        const current = new URL(currentUrl);
        if (canonicalUrl.host !== current.host) {
          finalCanonical = `${current.origin}${canonicalUrl.pathname}${canonicalUrl.search}${canonicalUrl.hash}`;
        }
      } catch (error) {
        finalCanonical = currentUrl;
      }
      link.setAttribute('href', finalCanonical);
    } else {
      let link = document.querySelector('link[rel="canonical"]');
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
      }
      link.setAttribute('href', currentUrl);
    }
  }, [title, description, keywords, canonical, ogImage]);
  
  return null;
}

export default SEO;
