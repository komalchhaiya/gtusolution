import subjectsData from "../src/data/subjectsData.js";

const STATIC_PUBLIC_ROUTES = [
  "/",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
  "/disclaimer",
  "/study-guides",
  "/404",
];

const BRANCHES = ["computer-engineering"];

export function getPublicPrerenderRoutes() {
  const routes = [...STATIC_PUBLIC_ROUTES];

  for (const branchName of BRANCHES) {
    routes.push(`/degree/branch/${branchName}`);

    const semesters = subjectsData?.degree?.[branchName] || {};
    for (const [semId, subjects] of Object.entries(semesters)) {
      routes.push(`/degree/branch/${branchName}/semester/${semId}`);

      for (const subjectId of Object.keys(subjects)) {
        routes.push(
          `/degree/branch/${branchName}/semester/${semId}/subject/${subjectId.toLowerCase()}`
        );
      }
    }
  }

  return routes;
}

export function getKnownPublicRoutes() {
  return getPublicPrerenderRoutes();
}
