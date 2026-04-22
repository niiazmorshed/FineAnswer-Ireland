import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import TopUtilityBar from "../../components/TopUtilityBar";
import Navbar3 from "../../components/navbar3";
import Footer from "../../components/Footer";
import WhyArticle from "./WhyArticle";
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
        <Route path="study-in-ireland" element={<WhyArticle pageKey="study-in-ireland" />} />
        <Route path="top-reasons" element={<WhyArticle pageKey="top-reasons" />} />
        <Route path="student-life" element={<WhyArticle pageKey="student-life" />} />
        <Route path="places-to-visit" element={<WhyArticle pageKey="places-to-visit" />} />
        <Route path="*" element={<Navigate to="study-in-ireland" replace />} />
      </Routes>
      <Footer />
    </div>
  );
}
