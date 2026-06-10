import { Route } from "react-router-dom";
import HomePage from "../HomePage";
import BranchSemesterPage from "../pages/BranchSemesterPage";
import Layout from "../Layout";
import Subjects from "../pages/Subjects";
import PapersPage from "../pages/PapersPage";
import PrivacyPolicy from "../PrivacyPolicy";
import AboutUs from "../AboutUs";
import ContactUs from "../ContactUs";
import TermsConditions from "../TermsConditions";
import Disclaimer from "../Disclaimer";
import StudyGuides from "../StudyGuides";
import NotFoundPage from "../pages/NotFoundPage";

export default function PublicRoutes() {
  return (
    <Route element={<Layout />}>
      <Route path="/" element={<HomePage mode="degree" />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/terms" element={<TermsConditions />} />
      <Route path="/disclaimer" element={<Disclaimer />} />
      <Route path="/study-guides" element={<StudyGuides />} />
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
      <Route path="/404" element={<NotFoundPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  );
}
