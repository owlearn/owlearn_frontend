import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./component/header";
import StartPage from "./pages/StartPage";
import LoginPage from "./pages/LoginPage";
import Diagnosis from "./pages/DiagnosisPage";
import StudyMain from "./pages/studyMain";
import StudyProgress from "./pages/studyProgress";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/diagnosis" element={<Diagnosis />} />
        <Route path="/studyMain" element={<StudyMain />} />
        <Route path="/tale/study" element={<StudyProgress />} />
      </Routes>
    </Router>
  );
}

export default App;
