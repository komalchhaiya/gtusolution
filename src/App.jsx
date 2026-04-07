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
import PrivacyPolicy from "./PrivacyPolicy";
import AboutUs from "./AboutUs";
import ContactUs from "./ContactUs";
import AnalyticsTracker from "./auth/AnalyticsTracker";

function App() {
  return (
    <BrowserRouter>
      <AnalyticsTracker />
      <Routes>
        {/* Auth pages - no layout */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Public routes: real HTML content for users and crawlers (AdSense policy) */}
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage mode="degree" />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route
            path="/degree/branch/:branchName"
            element={<BranchSemesterPage />}
          />
          <Route
            path="/:mode/branch/:branchName/semester/:semId"
            element={<Subjects />}
          />
          <Route
            path="/:mode/branch/:branchName/semester/:semId/subject/:subjectId"
            element={<PapersPage />}
          />
        </Route>

        {/* PDF viewer only — requires sign-in; AdSense script is skipped on this path in Layout */}
        <Route element={<RequireAuth />}>
          <Route element={<Layout />}>
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

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;