import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LandingHeader from "../../components/LandingHeader";
import Footer from "../../components/Footer";
import StudyInIrelandPage from "./StudyInIrelandPage";
import TopReasonsIrelandPage from "./TopReasonsIrelandPage";
import StudentLifeIrelandPage from "./StudentLifeIrelandPage";
import PlacesToVisitIrelandPage from "./PlacesToVisitIrelandPage";
import "../../css/why-ireland.css";

export default function WhyIrelandHub() {
  return (
    <>
      {/* landing-top intentionally OUTSIDE .LandingPage —
          isolation:isolate on .LandingPage traps position:fixed descendants (Chrome/Brave bug) */}
      <LandingHeader />
      <div className="LandingPage why-ireland-hub">
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
    </>
  );
}
