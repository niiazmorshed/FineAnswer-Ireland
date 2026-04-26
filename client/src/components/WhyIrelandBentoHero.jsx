import React from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle, FaRegClock, FaBriefcase, FaUniversity } from "react-icons/fa";
import heroPhoto from "../assets/student.jpg";
import heroIllustration from "../assets/FAQs-bro.svg";
import "./WhyIrelandBentoHero.css";

export default function WhyIrelandBentoHero({
  title,
  subtitle,
  ctaLabel = "Apply Now",
  ctaTo = "/#contact",
  imageSrc = heroPhoto,
  illustrationSrc = heroIllustration,
  highlights = [
    { icon: <FaUniversity />, label: "Globally recognized degrees" },
    { icon: <FaBriefcase />, label: "Strong career outcomes" },
    { icon: <FaRegClock />, label: "Fast 1-year master’s options" },
    { icon: <FaCheckCircle />, label: "Support from FineAnswer" },
  ],
  quickFacts,
}) {
  return (
    <section className="wy-bentoHero" aria-label="Why Ireland hero">
      <div className="wy-bentoHero__inner">
        <div className="wy-bentoHero__copy">
          <div className="wy-bentoHero__kicker">Why Ireland</div>
          <h1 className="wy-bentoHero__title">{title}</h1>
          <p className="wy-bentoHero__subtitle">{subtitle}</p>

          <div className="wy-bentoHero__actions">
            <Link to={ctaTo} className="wy-bentoHero__cta">
              {ctaLabel}
            </Link>
            <Link to="/why-ireland/top-reasons" className="wy-bentoHero__link">
              Explore top reasons →
            </Link>
          </div>

          <div className="wy-bentoHero__grid" role="list" aria-label="Highlights">
            {highlights.slice(0, 6).map((h, idx) => (
              <div key={`${h.label}-${idx}`} className="wy-bentoHero__tile" role="listitem">
                <span className="wy-bentoHero__tileIcon" aria-hidden="true">
                  {h.icon}
                </span>
                <span className="wy-bentoHero__tileText">{h.label}</span>
              </div>
            ))}
          </div>

          {quickFacts?.length ? (
            <div className="wy-bentoHero__facts" aria-label="Quick facts">
              {quickFacts.slice(0, 3).map((f) => (
                <div key={f.label} className="wy-bentoHero__fact">
                  <div className="wy-bentoHero__factLabel">{f.label}</div>
                  <div className="wy-bentoHero__factValue">{f.value}</div>
                </div>
              ))}
            </div>
          ) : null}
        </div>

        <div className="wy-bentoHero__media" aria-hidden="true">
          <div className="wy-bentoHero__mediaCard wy-bentoHero__mediaCard--photo" style={{ backgroundImage: `url(${imageSrc})` }} />
          <div className="wy-bentoHero__mediaCard wy-bentoHero__mediaCard--illus">
            <img src={illustrationSrc} alt="" loading="lazy" decoding="async" />
          </div>
        </div>
      </div>
    </section>
  );
}

