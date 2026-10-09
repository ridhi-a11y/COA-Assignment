import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import CoaLab from "./pages/CoaLab";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Achievements from "./pages/Achievements";
import AchievementDetail from "./pages/AchievementDetail";
import IuxoaExperience from "./pages/IuxoaExperience";
import Assignment from "./pages/Assignment";
import CustomCursor from "./components/common/CustomCursor";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <Router>
      <CustomCursor />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/coa-lab" element={<CoaLab />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/achievements/:slug" element={<AchievementDetail />} />
        <Route path="/experience/iuxoa" element={<IuxoaExperience />} />
        <Route path="/assignment" element={<Assignment />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
