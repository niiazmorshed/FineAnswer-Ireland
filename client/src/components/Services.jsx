import React, { useEffect, useState } from "react";
import "./Services.css";

/* Icons8 OMG-IMG (3d-fluency) — free use requires a backlink: https://icons8.com/license */
const ICONS8_3D = "3d-fluency";

function icons8Url(slug, size) {
  return `https://img.icons8.com/${ICONS8_3D}/${size}/${encodeURIComponent(slug)}.png`;
}

const SERVICES = [
  {
    icons8Slug: "graduation-cap",
    label: "Admission Counseling",
    desc: "Personal guidance from course shortlisting through offer letters—so every choice feels confident.",
  },
  {
    icons8Slug: "travel-visa",
    label: "Student Visa Assistance",
    desc: "Document preparation, timelines, and appointment support tailored to Irish immigration requirements.",
  },
  {
    icons8Slug: "medal",
    label: "Scholarships Abroad",
    desc: "Identify funding opportunities and strengthen applications with clear eligibility and deadlines.",
  },
  {
    icons8Slug: "language",
    label: "English Test & Preparation",
    desc: "Structured prep for IELTS and similar tests with feedback that tracks your progress.",
  },
  {
    icons8Slug: "shield",
    label: "International Health Cover",
    desc: "Compare compliant policies for study in Ireland so you arrive covered from day one.",
  },
  {
    icons8Slug: "home",
    label: "Accommodation",
    desc: "Options near campus or city centres with budgeting tips for your first weeks abroad.",
  },
  {
    icons8Slug: "airplane-take-off",
    label: "Airport Pick Up",
    desc: "A smooth handover when you land—less stress after a long flight to a new country.",
  },
  {
    icons8Slug: "bank-building",
    label: "Fee & Banking",
    desc: "Tuition flows, forex, and Irish banking basics explained in plain language.",
  },
  {
    icons8Slug: "book",
    label: "Course Selection",
    desc: "Match programmes to your goals, intake dates, and career outlook with structured filters.",
  },
  {
    icons8Slug: "globe",
    label: "Visit Ireland",
    desc: "Orientation on cities, transport, and culture so you know what to expect before you arrive.",
  },
  {
    icons8Slug: "checked-checkbox",
    label: "Application Tracking",
    desc: "Stay on top of deadlines and documents with a single view of your Ireland journey.",
  },
  {
    icons8Slug: "group",
    label: "Alumni Network",
    desc: "Connect with peers who have walked the path—insights you will not find in a brochure.",
  },
];

function ServiceFlipCard({ icons8Slug, label, desc, isFlipped, onToggle }) {
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
          <span className="service-icon" aria-hidden="true">
            <img
              src={icons8Url(icons8Slug, 64)}
              srcSet={`${icons8Url(icons8Slug, 64)} 64w, ${icons8Url(icons8Slug, 128)} 128w`}
              sizes="72px"
              width={72}
              height={72}
              alt=""
              loading="lazy"
              decoding="async"
            />
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

          <div className="services-grid-wrap">
            <div className="services-grid" aria-label="Services list">
              {SERVICES.map((s) => {
                const isFlipped = flippedLabel === s.label;
                return (
                  <ServiceFlipCard
                    key={s.label}
                    icons8Slug={s.icons8Slug}
                    label={s.label}
                    desc={s.desc}
                    isFlipped={isFlipped}
                    onToggle={() => setFlippedLabel((cur) => (cur === s.label ? null : s.label))}
                  />
                );
              })}
            </div>
            <p className="services-icons8-credit">
              Service icons by{" "}
              <a href="https://icons8.com" target="_blank" rel="noopener noreferrer">
                Icons8
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
