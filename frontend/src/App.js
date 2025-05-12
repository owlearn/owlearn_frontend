import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./component/header";
import StartPage from "./pages/StartPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
