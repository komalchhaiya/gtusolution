import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import LoginPage from "./auth/LoginPage";
import SignupPage from "./auth/SignupPage";
import PDFViewerPage from "./pages/PDFViewerPage";
import RequireAuth from "./auth/RequireAuth";
import AnalyticsTracker from "./auth/AnalyticsTracker";
import PublicRoutes from "./routes/PublicRoutes";

function App() {
  return (
    <BrowserRouter>
      <AnalyticsTracker />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        {PublicRoutes()}

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
