import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import BranchSemesterPage from "./pages/BranchSemesterPage";
import Layout from "./Layout";
import LoginPage from "./auth/LoginPage";
import SignupPage from "./auth/SignupPage";
import Subjects from "./pages/Subjects";
import PapersPage from "./pages/PapersPage";
import PDFViewerPage from "./pages/PDFViewerPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>

          {/* Home */}
          <Route path="/" element={<HomePage mode="degree" />} />

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


        </Route>

        {/* Auth */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
