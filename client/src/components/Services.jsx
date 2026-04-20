import React, { useEffect, useState } from "react";
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
  {
    icon: <FaComments />,
    label: "Admission Counseling",
    desc: "Personal guidance from course shortlisting through offer letters—so every choice feels confident.",
  },
  {
    icon: <FaPassport />,
    label: "Student Visa Assistance",
    desc: "Document preparation, timelines, and appointment support tailored to Irish immigration requirements.",
  },
  {
    icon: <FaGraduationCap />,
    label: "Scholarships Abroad",
    desc: "Identify funding opportunities and strengthen applications with clear eligibility and deadlines.",
  },
  {
    icon: <FaMicrophoneAlt />,
    label: "English Test & Preparation",
    desc: "Structured prep for IELTS and similar tests with feedback that tracks your progress.",
  },
  {
    icon: <FaShieldAlt />,
    label: "International Health Cover",
    desc: "Compare compliant policies for study in Ireland so you arrive covered from day one.",
  },
  {
    icon: <FaHome />,
    label: "Accommodation",
    desc: "Options near campus or city centres with budgeting tips for your first weeks abroad.",
  },
  {
    icon: <FaPlaneDeparture />,
    label: "Airport Pick Up",
    desc: "A smooth handover when you land—less stress after a long flight to a new country.",
  },
  {
    icon: <FaUniversity />,
    label: "Fee & Banking",
    desc: "Tuition flows, forex, and Irish banking basics explained in plain language.",
  },
  {
    icon: <FaSearch />,
    label: "Course Selection",
    desc: "Match programmes to your goals, intake dates, and career outlook with structured filters.",
  },
  {
    icon: <FaMapMarkerAlt />,
    label: "Visit Ireland",
    desc: "Orientation on cities, transport, and culture so you know what to expect before you arrive.",
  },
  {
    icon: <FaClipboardList />,
    label: "Application Tracking",
    desc: "Stay on top of deadlines and documents with a single view of your Ireland journey.",
  },
  {
    icon: <FaUserFriends />,
    label: "Alumni Network",
    desc: "Connect with peers who have walked the path—insights you will not find in a brochure.",
  },
];

function ServiceFlipCard({ icon, label, desc, accentClass }) {
  const [touchFlip, setTouchFlip] = useState(false);
  const [coarsePointer, setCoarsePointer] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: none), (pointer: coarse)");
    const sync = () => setCoarsePointer(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const toggle = () => {
    if (coarsePointer) setTouchFlip((f) => !f);
  };

  const onKeyDown = (e) => {
    if (!coarsePointer && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      setTouchFlip((f) => !f);
    }
  };

  return (
    <div
      className={`service-flip${touchFlip ? " is-flipped" : ""}`}
      onClick={toggle}
      onKeyDown={onKeyDown}
      role="button"
      tabIndex={0}
      aria-expanded={touchFlip}
      aria-label={`${label}. ${coarsePointer ? "Tap to flip for details." : "Hover or activate to read details."}`}
    >
      <div className="service-flip-inner">
        <div className="service-face service-face--front">
          <span className={`service-icon ${accentClass}`} aria-hidden="true">
            {icon}
          </span>
          <h3 className="service-label">{label}</h3>
          <p className="service-flip-hint">{coarsePointer ? "Tap for details" : "Hover for details"}</p>
        </div>
        <div className="service-face service-face--back">
          <h3 className="service-label service-label--back">{label}</h3>
          <p className="service-desc">{desc}</p>
        </div>
      </div>
    </div>
  );
}

const Services = () => {
  return (
    <section className="services-section" id="services">
      <div className="services-inner">
        <div className="services-header">
          <h2 className="services-heading">Services We Offer</h2>
          <p className="services-lede">
            Everything you need to plan, apply, and settle—presented as clear steps you can follow with confidence.
          </p>
        </div>

        <div className="services-grid">
          {SERVICES.map((s, i) => (
            <ServiceFlipCard
              key={s.label}
              icon={s.icon}
              label={s.label}
              desc={s.desc}
              accentClass={`service-icon--accent-${(i % 3) + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
