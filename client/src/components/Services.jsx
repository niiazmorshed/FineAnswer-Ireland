import React from "react";
import "./Services.css";

import {
  FaComments,
  FaPassport,
  FaGraduationCap,
  FaMicrophoneAlt,
  FaShieldAlt,
  FaHome,
  FaPlaneDeparture,
  FaUniversity,
  FaSearch,
  FaMapMarkerAlt,
  FaClipboardList,
  FaUserFriends,
} from "react-icons/fa";

const SERVICES = [
  { icon: <FaComments />,       label: "Admission Counseling" },
  { icon: <FaPassport />,       label: "Student Visa Assistance" },
  { icon: <FaGraduationCap />,  label: "Scholarships Abroad" },
  { icon: <FaMicrophoneAlt />,  label: "English Test & Preparation" },
  { icon: <FaShieldAlt />,      label: "International Health Cover" },
  { icon: <FaHome />,           label: "Accommodation" },
  { icon: <FaPlaneDeparture />, label: "Airport Pick Up" },
  { icon: <FaUniversity />,     label: "Fee & Banking" },
  { icon: <FaSearch />,         label: "Course Selection" },
  { icon: <FaMapMarkerAlt />,   label: "Visit Ireland" },
  { icon: <FaClipboardList />,  label: "Application Tracking" },
  { icon: <FaUserFriends />,    label: "Alumni Network" },
];

const Services = () => {
  return (
    <section className="services-section" id="services">
      <div className="services-inner">
        <div className="services-header">
          <span className="section-badge">What We Do</span>
          <h2 className="services-heading">Services We Offer</h2>
        </div>

        <div className="services-grid">
          {SERVICES.map((s, i) => (
            <div className="service-card" key={i}>
              <span className="service-icon">{s.icon}</span>
              <span className="service-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
