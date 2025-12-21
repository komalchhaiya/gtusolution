import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./HomePage";
import SemesterPage from "./pages/Subjects";
import BranchSemesterPage from "./pages/BranchSemesterPage";
import Layout from "./Layout";
import LoginPage from "./auth/LoginPage";
import SignupPage from "./auth/SignupPage";
import Subjects from "./pages/Subjects";
import PDFViewerPage from "./pages/PDFViewerPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>

          {/* Home */}
          <Route path="/" element={<HomePage mode="degree" />} />
          <Route path="/diploma" element={<HomePage mode="diploma" />} />

          {/* Semester direct */}
          <Route path="/:mode/semester/:semId" element={<SemesterPage />} />

          {/* Branch */}
          <Route
            path="/:mode/branch/:branchName"
            element={<BranchSemesterPage />}
          />

          {/* Subjects */}
          <Route
            path="/:mode/branch/:branchName/semester/:semId"
            element={<Subjects />}
          />

          {/* 🔁 REDIRECT: subject → page/1 */}
          <Route
            path="/:mode/branch/:branchName/semester/:semId/subject/:subId"
            element={<Navigate to="page/1" replace />}
          />

          {/* ✅ PDF Viewer (PAGE-BASED) */}
          <Route
            path="/:mode/branch/:branchName/semester/:semId/subject/:subId/page/:pageNo"
            element={<PDFViewerPage />}
          />

        </Route>

        {/* Auth */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
