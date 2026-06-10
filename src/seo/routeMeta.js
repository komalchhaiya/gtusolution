import subjectsData from "../data/subjectsData";
import { getSubjectContent } from "../data/subjectContent";
import { findSubjectEntry } from "../utils/routes";

const SITE = "https://gtupapersolution.co.in";

function readable(text) {
  return text.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

const STATIC_META = {
  "/": {
    title: "GTU Paper Solution - Previous Year Question Papers with Solutions",
    description:
      "Access GTU previous year question papers with solutions organized by branch and semester. Free PDF viewer for DBMS, Data Structure, Operating System, OOP, and more.",
    robots: "index, follow",
  },
  "/about": {
    title: "About Us - GTU Paper Solution | Previous Year Papers with Solutions",
    description:
      "Learn about GTU Paper Solution - your trusted platform for GTU previous year question papers with solutions organized by branch and semester.",
    robots: "index, follow",
  },
  "/contact": {
    title: "Contact Us - GTU Paper Solution",
    description: "Contact GTU Paper Solution for questions about GTU previous year papers, solutions, and exam preparation resources.",
    robots: "index, follow",
  },
  "/privacy": {
    title: "Privacy Policy - GTU Paper Solution",
    description: "Privacy policy for GTU Paper Solution covering data collection, Google Sign-In, Analytics, and AdSense.",
    robots: "index, follow",
  },
  "/terms": {
    title: "Terms and Conditions - GTU Paper Solution",
    description: "Terms and conditions for using GTU Paper Solution and its educational paper resources.",
    robots: "index, follow",
  },
  "/disclaimer": {
    title: "Disclaimer - GTU Paper Solution",
    description: "Disclaimer for GTU Paper Solution regarding educational use, accuracy, and third-party content.",
    robots: "index, follow",
  },
  "/study-guides": {
    title: "GTU Study Guides - Practical Exam Preparation Roadmaps",
    description:
      "Detailed GTU study guides by semester and subject. Learn practical revision plans, PYQ strategy, and exam-writing tips.",
    robots: "index, follow",
  },
  "/404": {
    title: "Page Not Found | GTU Paper Solution",
    description: "The page you requested does not exist on GTU Paper Solution.",
    robots: "noindex, follow",
  },
};

export function getRouteMeta(pathname) {
  const path = pathname === "/" ? "/" : pathname.replace(/\/+$/, "") || "/";

  if (STATIC_META[path]) {
    return {
      ...STATIC_META[path],
      canonical: path === "/" ? `${SITE}/` : `${SITE}${path}`,
    };
  }

  const branchMatch = path.match(/^\/degree\/branch\/([^/]+)$/);
  if (branchMatch) {
    const branchName = branchMatch[1];
    const branchDisplay = readable(branchName);
    return {
      title: `${branchDisplay} — GTU Semester Papers with Solutions | GTU Paper Solution`,
      description: `Choose a semester for GTU ${branchDisplay} branch to view subject-wise previous year question papers with solutions.`,
      canonical: `${SITE}${path}`,
      robots: "index, follow",
    };
  }

  const semesterMatch = path.match(
    /^\/degree\/branch\/([^/]+)\/semester\/(\d+)$/
  );
  if (semesterMatch) {
    const [, branchName, semId] = semesterMatch;
    const branchDisplay = readable(branchName);
    return {
      title: `GTU ${branchDisplay} Semester ${semId} Subjects with Solutions - GTU Paper Solution`,
      description: `Access GTU ${branchDisplay} Semester ${semId} previous year question papers with solutions for exam preparation.`,
      canonical: `${SITE}${path}`,
      robots: "index, follow",
    };
  }

  const subjectMatch = path.match(
    /^\/degree\/branch\/([^/]+)\/semester\/(\d+)\/subject\/([^/]+)$/
  );
  if (subjectMatch) {
    const [, branchName, semId, subjectId] = subjectMatch;
    const subjects = subjectsData?.degree?.[branchName]?.[Number(semId)];
    const match = findSubjectEntry(subjects, subjectId);
    if (match) {
      const content = getSubjectContent(match.key);
      const displayName = content?.fullName || match.subject.name;
      return {
        title: `${displayName} — GTU Previous Year Papers with Solutions | GTU Paper Solution`,
        description: `Browse GTU ${displayName} previous year question papers with solutions for ${readable(
          branchName
        )}, Semester ${semId}. ${match.subject.papers.length} papers available.`,
        canonical: `${SITE}${path}`,
        robots: "index, follow",
      };
    }
  }

  return {
    title: "Page Not Found | GTU Paper Solution",
    description: "The page you requested does not exist on GTU Paper Solution.",
    canonical: `${SITE}/404`,
    robots: "noindex, follow",
  };
}

export function injectMetaIntoHtml(html, meta) {
  let output = html;

  output = output.replace(/<title>[^<]*<\/title>/, `<title>${meta.title}</title>`);
  output = replaceMeta(output, "name", "title", meta.title);
  output = replaceMeta(output, "name", "description", meta.description);
  output = replaceMeta(output, "name", "robots", meta.robots);
  output = replaceMeta(output, "property", "og:title", meta.title);
  output = replaceMeta(output, "property", "og:description", meta.description);
  output = replaceMeta(output, "property", "og:url", meta.canonical);
  output = replaceMeta(output, "property", "twitter:title", meta.title);
  output = replaceMeta(output, "property", "twitter:description", meta.description);
  output = replaceMeta(output, "property", "twitter:url", meta.canonical);

  if (output.includes('rel="canonical"')) {
    output = output.replace(
      /<link rel="canonical" href="[^"]*"/,
      `<link rel="canonical" href="${meta.canonical}"`
    );
  } else {
    output = output.replace(
      "</head>",
      `    <link rel="canonical" href="${meta.canonical}" />\n  </head>`
    );
  }

  return output;
}

function replaceMeta(html, attr, name, content) {
  const pattern = new RegExp(
    `<meta ${attr}="${name}" content="[^"]*"\\s*/?>`,
    "i"
  );
  const tag = `<meta ${attr}="${name}" content="${escapeAttr(content)}" />`;

  if (pattern.test(html)) {
    return html.replace(pattern, tag);
  }

  return html.replace("</head>", `    ${tag}\n  </head>`);
}

function escapeAttr(value) {
  return String(value).replace(/"/g, "&quot;");
}
