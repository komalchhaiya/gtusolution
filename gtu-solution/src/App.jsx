import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./HomePage";
import SemesterPage from "./pages/Subjects";
import BranchSemesterPage from "./pages/BranchSemesterPage";
import Layout from "./Layout";
import LoginPage from "./auth/LoginPage";
import Subjects from "./pages/Subjects";

// ✅ FIXED
import PDFViewerPage from "./pages/PDFViewerPage";
import RequireAuth from "./auth/RequireAuth";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected routes */}
        <Route element={<RequireAuth />}>
          <Route element={<Layout />}>
          <Route path="/" element={<HomePage mode="degree" />} />
          <Route path="/diploma" element={<HomePage mode="diploma" />} />

          <Route path="/:mode/semester/:semId" element={<SemesterPage />} />

          <Route
            path="/:mode/branch/:branchName"
            element={<BranchSemesterPage />}
          />

          <Route
            path="/:mode/branch/:branchName/semester/:semId"
            element={<Subjects />}
          />

          {/* ✅ FIXED */}
   <Route
  path="/:mode/branch/:branchName/semester/:semId/subject/:subId"
  element={<PDFViewerPage />}
/>

          </Route>
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
