import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import SemesterPage from "./pages/Subjects";
import BranchSemesterPage from "./pages/BranchSemesterPage";
import Layout from "./Layout";
import LoginPage from "./auth/LoginPage";
import SignupPage from "./auth/SignupPage";
import Subjects from "./pages/Subjects";

// ✅ FIXED
import PDFViewerPage from "./pages/PDFViewerPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
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

        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
