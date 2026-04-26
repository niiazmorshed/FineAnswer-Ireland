import React from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle, FaRegClock, FaBriefcase, FaUniversity } from "react-icons/fa";
import student1 from "../assets/student1.jpg";
import student2 from "../assets/student2.jpg";
import student3 from "../assets/student3.jpg";
import student4 from "../assets/student4.jpg";
import student5 from "../assets/student5.jpg";
import "./WhyIrelandBentoHero.css";

export default function WhyIrelandBentoHero({
  title,
  subtitle,
  breadcrumb = "Why Ireland",
  ctaLabel = "Apply Now",
  ctaTo = "/#contact",
  galleryImages = [student1, student2, student3],
  sideImage = student4,
  accentImage = student5,
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
        <div className="wy-bentoHero__gallery" aria-label="Header image gallery">
          {galleryImages.slice(0, 3).map((src, idx) => (
            <div key={`${src}-${idx}`} className="wy-bentoHero__galleryItem" aria-hidden="true">
              <img
                src={src}
                alt=""
                loading={idx === 0 ? "eager" : "lazy"}
                decoding="async"
                className="wy-bentoHero__galleryImg"
              />
            </div>
          ))}
        </div>

        <div className="wy-bentoHero__headerCard">
          <div className="wy-bentoHero__headerLeft">
            <div className="wy-bentoHero__metaRow">
              <span className="wy-bentoHero__breadcrumb">{breadcrumb}</span>
            </div>
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
          </div>

          <div className="wy-bentoHero__headerRight" aria-label="Quick facts panel">
            <div className="wy-bentoHero__factsCard">
              <div className="wy-bentoHero__factsTitle">Quick facts</div>
              {quickFacts?.length ? (
                <div className="wy-bentoHero__factsList">
                  {quickFacts.slice(0, 5).map((f) => (
                    <div key={f.label} className="wy-bentoHero__factsRow">
                      <span className="wy-bentoHero__factsLabel">{f.label}</span>
                      <span className="wy-bentoHero__factsValue">{f.value}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="wy-bentoHero__factsEmpty">Add 2–5 facts for this page.</div>
              )}
            </div>

            <div className="wy-bentoHero__miniBento" aria-hidden="true">
              <div className="wy-bentoHero__miniTile wy-bentoHero__miniTile--photo">
                <div
                  className="wy-bentoHero__miniPhoto"
                  style={{ backgroundImage: `url(${sideImage})` }}
                />
              </div>
              <div className="wy-bentoHero__miniTile wy-bentoHero__miniTile--accent">
                <div
                  className="wy-bentoHero__miniPhoto wy-bentoHero__miniPhoto--accent"
                  style={{ backgroundImage: `url(${accentImage})` }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="wy-bentoHero__highlights" role="list" aria-label="Highlights">
          {highlights.slice(0, 6).map((h, idx) => (
            <div key={`${h.label}-${idx}`} className="wy-bentoHero__tile" role="listitem">
              <span className="wy-bentoHero__tileIcon" aria-hidden="true">
                {h.icon}
              </span>
              <span className="wy-bentoHero__tileText">{h.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

