import React from "react";
import { useLocation } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./component/header";
import HeaderBeforeLogin from "./component/headerBeforeLogin";
import StartPage from "./pages/StartPage";
import LoginPage from "./pages/LoginPage";
import Diagnosis from "./pages/DiagnosisPage";
import DiagnosisVer2 from "./pages/DiagnosisVer2";
import DiagnosisEnd from "./pages/DiagnosisEnd";
import Prompting from "./pages/Prompting";
import OutputPage from "./pages/OutputPage";
import CreationPage from "./pages/CreationPage";
import LoginProfile from "./pages/LoginProfile";
import AddProfile from "./pages/addProfile";
import StudyMain from "./pages/studyMain";
import StudyProgress from "./pages/studyProgress";
import Quiz from "./pages/quiz";
import QuizAnswer from "./pages/quizAnswer";
import Register from "./pages/register";
import Admin from "./pages/admin";
import AdminInsert from "./pages/adminInsert";
import AdminList from "./pages/adminList";
import AdminEdit from "./pages/adminEdit";
import ParentMain from "./pages/parentMain";
import ParentDetail from "./pages/parentDetail";
import ChildMyPage from "./pages/childMyPage";

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();

  const showHeaderBeforeLogin = [
    "/",
    "/login",
    "/diagnosis",
    "/register",
  ].includes(location.pathname);

  return (
    <>
      {showHeaderBeforeLogin ? <HeaderBeforeLogin /> : <Header />}
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/diagnosis" element={<Diagnosis />} />
        <Route path="/diagnosisVer2" element={<DiagnosisVer2 />} />
        <Route path="/diagnosisEnd" element={<DiagnosisEnd />} />
        <Route path="/prompting" element={<Prompting />} />
        <Route path="/output" element={<OutputPage />} />
        <Route path="/create" element={<CreationPage />} />
        <Route path="/loginProfile" element={<LoginProfile />} />
        <Route path="/addProfile" element={<AddProfile />} />
        <Route path="/studyMain" element={<StudyMain />} />
        <Route path="/tale/study" element={<StudyProgress />} />
        <Route path="/tale/quiz" element={<Quiz />} />
        <Route path="/tale/quiz/answer" element={<QuizAnswer />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/insert" element={<AdminInsert />} />
        <Route path="/admin/list" element={<AdminList />} />
        <Route path="/admin/edit/:taleId" element={<AdminEdit />} />
        <Route path="/parentMain" element={<ParentMain />} />
        <Route path="/parent/:childId/detail" element={<ParentDetail />} />
        <Route path="/mypage" element={<ChildMyPage />} />
      </Routes>
    </>
  );
}

export default App;
