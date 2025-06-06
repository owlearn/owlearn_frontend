import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./component/header";
import StartPage from "./pages/StartPage";
import LoginPage from "./pages/LoginPage";
import Diagnosis from "./pages/DiagnosisPage";
import CreationPage from "./pages/CreationPage";
import StudyMain from "./pages/studyMain";
import StudyProgress from "./pages/studyProgress";
import Quiz from "./pages/quiz";
import QuizAnswer from "./pages/quizAnswer";
import Register from "./pages/register";
import Admin from "./pages/admin";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/diagnosis" element={<Diagnosis />} />
        <Route path="/create" element={<CreationPage />} />
        <Route path="/studyMain" element={<StudyMain />} />
        <Route path="/tale/study" element={<StudyProgress />} />
        <Route path="/tale/quiz" element={<Quiz />} />
        <Route path="/tale/quiz/answer" element={<QuizAnswer />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
