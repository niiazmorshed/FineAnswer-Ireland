import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import TopUtilityBar from "../../components/TopUtilityBar";
import Navbar3 from "../../components/navbar3";
import Footer from "../../components/Footer";
import StudyInIrelandPage from "./StudyInIrelandPage";
import TopReasonsIrelandPage from "./TopReasonsIrelandPage";
import StudentLifeIrelandPage from "./StudentLifeIrelandPage";
import PlacesToVisitIrelandPage from "./PlacesToVisitIrelandPage";
import "../../css/why-ireland.css";

export default function WhyIrelandHub() {
  return (
    <div className="LandingPage why-ireland-hub">
      <div className="landing-top">
        <TopUtilityBar />
        <Navbar3 />
      </div>
      <Routes>
        <Route index element={<Navigate to="study-in-ireland" replace />} />
        <Route path="study-in-ireland" element={<StudyInIrelandPage />} />
        <Route path="top-reasons" element={<TopReasonsIrelandPage />} />
        <Route path="student-life" element={<StudentLifeIrelandPage />} />
        <Route path="places-to-visit" element={<PlacesToVisitIrelandPage />} />
        <Route path="*" element={<Navigate to="study-in-ireland" replace />} />
      </Routes>
      <Footer />
    </div>
  );
}
