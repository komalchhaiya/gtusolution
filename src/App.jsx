import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./HomePage";
import BranchSemesterPage from "./pages/BranchSemesterPage";
import Layout from "./Layout";
import LoginPage from "./auth/LoginPage";
import SignupPage from "./auth/SignupPage";
import Subjects from "./pages/Subjects";
import PapersPage from "./pages/PapersPage";
import PDFViewerPage from "./pages/PDFViewerPage";
import RequireAuth from "./auth/RequireAuth";
import AboutUs from "./AboutUs";
import ContactUs from "./ContactUs";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes - Auth pages */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* All pages with Header, Navbar, Footer */}
        <Route element={<Layout />}>
          {/* Home page */}
          <Route path="/" element={<HomePage mode="degree" />} />

          {/* Public page */}
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs/>}/>

          {/* Protected routes */}
          <Route element={<RequireAuth />}>
            {/* Branch */}
            <Route
              path="/degree/branch/:branchName"
              element={<BranchSemesterPage />}
            />

            {/* Subjects */}
            <Route
              path="/:mode/branch/:branchName/semester/:semId"
              element={<Subjects />}
            />

            <Route
              path="/:mode/branch/:branchName/semester/:semId/subject/:subjectId"
              element={<PapersPage />}
            />

            <Route
              path="/:mode/branch/:branchName/semester/:semId/subject/:subjectId/view"
              element={<PDFViewerPage />}
            />

            <Route
              path="/:mode/branch/:branchName/semester/:semId/subject/:subjectId/view/page/:pageNo"
              element={<PDFViewerPage />}
            />
          </Route>
        </Route>

        {/* Fallback - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
