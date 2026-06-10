import subjectsData from "../data/subjectsData";

const STATIC_PUBLIC_ROUTES = [
  "/",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
  "/disclaimer",
  "/study-guides",
];

const BRANCHES = ["computer-engineering"];

function normalizePath(path) {
  if (!path || path === "/") return "/";
  return path.replace(/\/+$/, "") || "/";
}

export function getPublicPrerenderRoutes() {
  const routes = [...STATIC_PUBLIC_ROUTES];

  for (const branchName of BRANCHES) {
    routes.push(`/degree/branch/${branchName}`);

    const semesters = subjectsData?.degree?.[branchName] || {};
    for (const [semId, subjects] of Object.entries(semesters)) {
      routes.push(
        `/degree/branch/${branchName}/semester/${semId}`
      );

      for (const subjectId of Object.keys(subjects)) {
        routes.push(
          `/degree/branch/${branchName}/semester/${semId}/subject/${subjectId.toLowerCase()}`
        );
      }
    }
  }

  return routes;
}

export function isKnownPublicRoute(pathname) {
  const path = normalizePath(pathname);

  if (STATIC_PUBLIC_ROUTES.includes(path)) {
    return true;
  }

  const branchMatch = path.match(
    /^\/degree\/branch\/([^/]+)$/
  );
  if (branchMatch && BRANCHES.includes(branchMatch[1])) {
    return true;
  }

  const semesterMatch = path.match(
    /^\/degree\/branch\/([^/]+)\/semester\/(\d+)$/
  );
  if (semesterMatch) {
    const [, branchName, semId] = semesterMatch;
    return Boolean(subjectsData?.degree?.[branchName]?.[Number(semId)]);
  }

  const subjectMatch = path.match(
    /^\/degree\/branch\/([^/]+)\/semester\/(\d+)\/subject\/([^/]+)$/
  );
  if (subjectMatch) {
    const [, branchName, semId, subjectId] = subjectMatch;
    const subjects = subjectsData?.degree?.[branchName]?.[Number(semId)];
    if (!subjects) return false;
    return Object.keys(subjects).some(
      (key) => key.toLowerCase() === subjectId.toLowerCase()
    );
  }

  return false;
}

export function findSubjectEntry(subjects, subjectId) {
  if (!subjects || !subjectId) return null;

  const key = Object.keys(subjects).find(
    (entryKey) => entryKey.toLowerCase() === subjectId.toLowerCase()
  );

  if (!key) return null;

  return { key, subject: subjects[key] };
}

export function getCanonicalSubjectPath({
  mode = "degree",
  branchName,
  semId,
  subjectId,
}) {
  const subjects = subjectsData?.[mode]?.[branchName]?.[Number(semId)];
  const match = findSubjectEntry(subjects, subjectId);
  const canonicalId = match ? match.key.toLowerCase() : subjectId.toLowerCase();

  return `/${mode}/branch/${branchName}/semester/${semId}/subject/${canonicalId}`;
}
