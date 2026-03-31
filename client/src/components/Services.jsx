import React from "react";
import "./Services.css";

import {
  FaFileAlt,
  FaGlobe,
  FaHandsHelping,
  FaPassport,
  FaPlaneDeparture,
  FaUniversity,
  FaHeartbeat,
  FaSuitcaseRolling,
} from "react-icons/fa";

const cards = [
  {
    icon: <FaGlobe />,
    title: "Free Expert Counseling",
    text: "Get expert guidance to choose the right country, university, and course aligned with your academic profile and career goals — with no file opening charge.",
  },
  {
    icon: <FaUniversity />,
    title: "University & Course Selection",
    text: "Personalized support in selecting the best universities and programs that match your academic background, career goals, and budget.",
  },
  {
    icon: <FaFileAlt />,
    title: "Application & Documentation",
    text: "End-to-end support with university applications and document preparation, including SOPs, LORs, transcripts, and all required academic paperwork.",
  },
  {
    icon: <FaPassport />,
    title: "Visa Processing & Interview Prep",
    text: "Accurate visa processing support including document review, application submission guidance, and mock interview sessions to maximize approval success.",
  },
  {
    icon: <FaPlaneDeparture />,
    title: "Visa Logistics & Document Handling",
    text: "Secure logistics support for transferring visa documents from Bangladesh to India, where the Ireland Embassy processes applications.",
  },
  {
    icon: <FaHandsHelping />,
    title: "International Mentorship",
    text: "Access to international experts and experienced student mentors for scholarship guidance, English proficiency preparation, and academic success strategies.",
  },
  {
    icon: <FaHeartbeat />,
    title: "Medical Insurance Assistance",
    text: "Expert support in selecting the right international medical insurance plan required for your student visa and university enrollment.",
  },
  {
    icon: <FaSuitcaseRolling />,
    title: "Pre-Departure & Post-Arrival Support",
    text: "Comprehensive support including pre-departure briefings, accommodation guidance, airport pickup, and initial settlement support after arrival.",
  },
];

const Services = () => {
  const handleSendEnquiry = () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="services-section">
      <div className="services-left">
        <span className="section-badge">What We Offer</span>
        <h2>Our Services</h2>
        <p>
          From free counseling to post-arrival support — we cover every step
          of your study abroad journey with expert care.
        </p>
        <button onClick={handleSendEnquiry}>Send an Enquiry</button>
      </div>

      <div className="services-grid">
        {cards.map((card, index) => (
          <div
            className="service-card service-card-animate"
            key={index}
            style={{ animationDelay: `${index * 0.08}s` }}
          >
            <div className="icon">{card.icon}</div>
            <h4>{card.title}</h4>
            <p>{card.text}</p>
            <span className="service-card-link">Learn More →</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
