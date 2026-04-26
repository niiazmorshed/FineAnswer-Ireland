import React, { useEffect, useState } from "react";
import "./Services.css";

import {
  GraduationCap,
  FileCheck2,
  Award,
  Languages,
  ShieldPlus,
  Building2,
  PlaneLanding,
  Landmark,
  BookMarked,
  Globe,
  ClipboardCheck,
  Users,
} from "lucide-react";

const ICON_PROPS = { size: 30, strokeWidth: 1.6 };

const SERVICES = [
  {
    icon: <GraduationCap {...ICON_PROPS} />,
    label: "Admission Counseling",
    desc: "Personal guidance from course shortlisting through offer letters—so every choice feels confident.",
  },
  {
    icon: <FileCheck2 {...ICON_PROPS} />,
    label: "Student Visa Assistance",
    desc: "Document preparation, timelines, and appointment support tailored to Irish immigration requirements.",
  },
  {
    icon: <Award {...ICON_PROPS} />,
    label: "Scholarships Abroad",
    desc: "Identify funding opportunities and strengthen applications with clear eligibility and deadlines.",
  },
  {
    icon: <Languages {...ICON_PROPS} />,
    label: "English Test & Preparation",
    desc: "Structured prep for IELTS and similar tests with feedback that tracks your progress.",
  },
  {
    icon: <ShieldPlus {...ICON_PROPS} />,
    label: "International Health Cover",
    desc: "Compare compliant policies for study in Ireland so you arrive covered from day one.",
  },
  {
    icon: <Building2 {...ICON_PROPS} />,
    label: "Accommodation",
    desc: "Options near campus or city centres with budgeting tips for your first weeks abroad.",
  },
  {
    icon: <PlaneLanding {...ICON_PROPS} />,
    label: "Airport Pick Up",
    desc: "A smooth handover when you land—less stress after a long flight to a new country.",
  },
  {
    icon: <Landmark {...ICON_PROPS} />,
    label: "Fee & Banking",
    desc: "Tuition flows, forex, and Irish banking basics explained in plain language.",
  },
  {
    icon: <BookMarked {...ICON_PROPS} />,
    label: "Course Selection",
    desc: "Match programmes to your goals, intake dates, and career outlook with structured filters.",
  },
  {
    icon: <Globe {...ICON_PROPS} />,
    label: "Visit Ireland",
    desc: "Orientation on cities, transport, and culture so you know what to expect before you arrive.",
  },
  {
    icon: <ClipboardCheck {...ICON_PROPS} />,
    label: "Application Tracking",
    desc: "Stay on top of deadlines and documents with a single view of your Ireland journey.",
  },
  {
    icon: <Users {...ICON_PROPS} />,
    label: "Alumni Network",
    desc: "Connect with peers who have walked the path—insights you will not find in a brochure.",
  },
];

function ServiceFlipCard({ icon, label, desc, accentClass, isFlipped, onToggle }) {
  const onKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onToggle();
    }
  };

  return (
    <div
      className={`service-flip${isFlipped ? " is-flipped" : ""}`}
      onClick={onToggle}
      onKeyDown={onKeyDown}
      role="button"
      tabIndex={0}
      aria-expanded={isFlipped}
      aria-label={`${label}. Click to ${isFlipped ? "close" : "flip for details"}.`}
    >
      <div className="service-flip-inner">
        <div className="service-face service-face--front">
          <span className={`service-icon ${accentClass}`} aria-hidden="true">
            {icon}
          </span>
          <h3 className="service-label">{label}</h3>
          <p className="service-flip-hint">Click for details</p>
        </div>
        <div className="service-face service-face--back">
          <h3 className="service-label service-label--back">{label}</h3>
          <p className="service-desc">{desc}</p>
        </div>
      </div>
    </div>
  );
}

function scrollToContact() {
  const el = document.getElementById("contact");
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

const Services = () => {
  const [flippedLabel, setFlippedLabel] = useState(null);

  useEffect(() => {
    const onDocPointerDown = (e) => {
      const target = e.target;
      if (!(target instanceof Element)) return;
      if (target.closest?.(".service-flip")) return;
      setFlippedLabel(null);
    };
    document.addEventListener("pointerdown", onDocPointerDown, { capture: true });
    return () => document.removeEventListener("pointerdown", onDocPointerDown, { capture: true });
  }, []);

  return (
    <section className="services-section">
      <div className="services-inner">
        <div className="services-layout">
          <div className="services-intro">
            <div className="services-kicker">What we do?</div>
            <h2 className="services-heading">
              Enhance your experience with our expert services designed to meet your unique needs.
            </h2>
            <p className="services-lede">
              Whether you need strategic consultation, application guidance, or on-ground support, our dedicated team is
              here to assist you every step of the way.
            </p>

            <button type="button" className="services-cta" onClick={scrollToContact}>
              Explore Services
            </button>
          </div>

          <div className="services-grid" aria-label="Services list">
            {SERVICES.map((s, i) => {
              const isFlipped = flippedLabel === s.label;
              return (
                <ServiceFlipCard
                  key={s.label}
                  icon={s.icon}
                  label={s.label}
                  desc={s.desc}
                  accentClass={`service-icon--accent-${(i % 6) + 1}`}
                  isFlipped={isFlipped}
                  onToggle={() => setFlippedLabel((cur) => (cur === s.label ? null : s.label))}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
