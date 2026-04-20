import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ResponsiveGlobe } from "./Globe";
import britishCouncil from "../assets/british.png";
import bylc from "../assets/bylc.png";
import cityBank from "../assets/city-bank-logo.webp";
import nrbcBank from "../assets/nrbc.webp";
import premierBank from "../assets/pp.webp";
import heroPerson from "../assets/student.jpg";
import studyProtect from "../assets/studyp.png";
import "./BentoHero.css";

/** Same strategic partners as PartnerBank — keeps hero strip aligned with the section below */
const TRUSTED_PARTNERS = [
  { name: "City Bank", logo: cityBank },
  { name: "NRBC Bank", logo: nrbcBank },
  { name: "British Council", logo: britishCouncil },
  { name: "Premier Bank", logo: premierBank },
  { name: "BYLC", logo: bylc },
  { name: "Study Global", logo: studyProtect },
];

const COUNTRY = "Ireland";

const LEVELS = [
  { label: "Postgraduate", value: "Master's (Postgraduate)" },
  { label: "Undergraduate", value: "Bachelor's (Undergraduate)" },
  { label: "Postgraduate Diploma", value: "Postgraduate Diploma" },
  { label: "Higher Diploma", value: "Higher Diploma" },
];

const CATEGORIES = [
  { label: "Business, Management & Law", value: "Business, Management & Law" },
  { label: "Computing, IT & Engineering", value: "Computing, IT & Engineering" },
  { label: "Life Sciences & Health", value: "Life Sciences & Health" },
  { label: "Social Sciences", value: "Social Sciences" },
  { label: "Education & Media", value: "Education & Media" },
  { label: "Others", value: "Others" },
];

const INTAKES = [
  { label: "September", value: "September" },
  { label: "January / February", value: "January/February" },
  { label: "April", value: "April" },
];

/**
 * Hero section with an embedded Course Search Engine.
 * Keeps the existing app functionality by letting the parent handle searches.
 */
export default function BentoHero({
  ariaLabel = "Hero",
  title,
  subtitle,
  ctaLabel,
  ctaTo,
  ctaOnClick,
  showBackLink,
  backTo = "/",
  showHeroSearch = true,
  heroImageSrc = heroPerson,
  useGlobeHero = false,
  onSearch,
}) {
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedIntake, setSelectedIntake] = useState("");
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown = (name) =>
    setActiveDropdown((prev) => (prev === name ? null : name));

  const handleSearch = () => {
    if (typeof onSearch === "function") {
      onSearch({
        country: COUNTRY,
        level: selectedLevel,
        category: selectedCategory,
        intake: selectedIntake,
      });
    }
  };

  const ctaIsRoute = ctaTo && ctaTo.startsWith("/");

  const ctaEl =
    typeof ctaOnClick === "function" ? (
      <button type="button" className="ireland-hero-cta" onClick={ctaOnClick}>
        {ctaLabel}
      </button>
    ) : ctaIsRoute ? (
      <Link to={ctaTo} className="ireland-hero-cta">
        {ctaLabel}
      </Link>
    ) : (
      <a href={ctaTo || "#"} className="ireland-hero-cta">
        {ctaLabel}
      </a>
    );

  return (
    <section className="ireland-hero-bento" aria-label={ariaLabel} id="search">
      <div className="ireland-hero-bento__inner">
        {showBackLink ? (
          <Link to={backTo} className="ireland-hero-back">
            ← Return to Home
          </Link>
        ) : null}

        <div className="job-hero">
          <div className="job-hero__left">
            <div className="job-hero__pill">
              <span className="job-hero__pillTag">NEW</span>
              <span>Stay on track for your next step with FineAnswer</span>
            </div>

            <h1 className="ireland-hero-title">{title}</h1>
            <p className="ireland-hero-sub">{subtitle}</p>

            {showHeroSearch ? (
              <div className="bento-search-engine">
                <div className="bento-search-intro">
                  <span className="bento-search-badge">FineAnswer Ireland</span>
                  <span className="bento-search-tagline">Course Search · Find your ideal program in Ireland</span>
                </div>
                <div className="bento-search-box" role="group" aria-label="Course search filters">
                  <div className="bento-search-item bento-search-item--fixed">
                    <span className="bento-search-label">Country</span>
                    <span className="bento-search-value">
                      <span className="bento-val-text">{COUNTRY}</span>
                    </span>
                  </div>
                  <div className="bento-divider" />

                  <div className={`bento-search-item-wrap${activeDropdown === "level" ? " bento-open" : ""}`}>
                    <button
                      type="button"
                      className="bento-search-item"
                      onClick={() => toggleDropdown("level")}
                    >
                      <span className="bento-search-label">Level</span>
                      <span className={`bento-search-value${!selectedLevel ? " bento-placeholder" : ""}`}>
                        <span className="bento-val-text">
                          {LEVELS.find((l) => l.value === selectedLevel)?.label || "Select Level"}
                        </span>
                        <span className="bento-chevron" aria-hidden="true" />
                      </span>
                    </button>
                    {activeDropdown === "level" && (
                      <div className="bento-dropdown">
                        {LEVELS.map((l) => (
                          <button
                            key={l.value}
                            type="button"
                            className="bento-dropdown-item"
                            onClick={() => { setSelectedLevel(l.value); setActiveDropdown(null); }}
                          >
                            {l.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="bento-divider" />

                  <div className={`bento-search-item-wrap bento-search-item-wrap--wide${activeDropdown === "category" ? " bento-open" : ""}`}>
                    <button
                      type="button"
                      className="bento-search-item"
                      onClick={() => toggleDropdown("category")}
                    >
                      <span className="bento-search-label">Category</span>
                      <span className={`bento-search-value${!selectedCategory ? " bento-placeholder" : ""}`}>
                        <span className="bento-val-text">
                          {CATEGORIES.find((c) => c.value === selectedCategory)?.label || "All Categories"}
                        </span>
                        <span className="bento-chevron" aria-hidden="true" />
                      </span>
                    </button>
                    {activeDropdown === "category" && (
                      <div className="bento-dropdown">
                        {CATEGORIES.map((c) => (
                          <button
                            key={c.value}
                            type="button"
                            className="bento-dropdown-item"
                            onClick={() => { setSelectedCategory(c.value); setActiveDropdown(null); }}
                          >
                            {c.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="bento-divider" />

                  <div className={`bento-search-item-wrap${activeDropdown === "intake" ? " bento-open" : ""}`}>
                    <button
                      type="button"
                      className="bento-search-item"
                      onClick={() => toggleDropdown("intake")}
                    >
                      <span className="bento-search-label">Intake</span>
                      <span className={`bento-search-value${!selectedIntake ? " bento-placeholder" : ""}`}>
                        <span className="bento-val-text">
                          {INTAKES.find((i) => i.value === selectedIntake)?.label || "Select Intake"}
                        </span>
                        <span className="bento-chevron" aria-hidden="true" />
                      </span>
                    </button>
                    {activeDropdown === "intake" && (
                      <div className="bento-dropdown">
                        {INTAKES.map((i) => (
                          <button
                            key={i.value}
                            type="button"
                            className="bento-dropdown-item"
                            onClick={() => { setSelectedIntake(i.value); setActiveDropdown(null); }}
                          >
                            {i.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <button type="button" className="bento-search-btn" onClick={handleSearch}>
                    Search
                  </button>
                </div>
              </div>
            ) : null}

            <div className="job-hero__trusted">
              <span className="job-hero__trustedLabel">We are trusted by:</span>
              <ul className="job-hero__trustedLogos" aria-label="Strategic partner logos">
                {TRUSTED_PARTNERS.map((p) => (
                  <li key={p.name} className="job-hero__trustedLogo">
                    <img src={p.logo} alt={p.name} loading="lazy" width={40} height={40} />
                  </li>
                ))}
              </ul>
            </div>

            <div className="job-hero__ctaRow">{ctaEl}</div>
          </div>

          <div
            className={`job-hero__right${useGlobeHero ? " job-hero__right--globe" : ""}`}
            aria-hidden="true"
          >
            {!useGlobeHero && <div className="job-hero__ring" />}
            {useGlobeHero ? (
              <div className="job-hero__globeWrap">
                <ResponsiveGlobe />
              </div>
            ) : (
              <div className="job-hero__photo" style={{ backgroundImage: `url(${heroImageSrc})` }} />
            )}

            {!useGlobeHero && (
              <>
                <div className="job-hero__float job-hero__float--top">
                  <span className="job-hero__floatDot" />
                  <div>
                    <div className="job-hero__floatTitle">Congrats!</div>
                    <div className="job-hero__floatSub">You have got an Email</div>
                  </div>
                </div>

                <div className="job-hero__float job-hero__float--mid">
                  <div className="job-hero__miniAvatars">
                    <span />
                    <span />
                    <span />
                  </div>
                  <div className="job-hero__floatSub">10k+ students guided</div>
                </div>

                <div className="job-hero__float job-hero__float--bottom">
                  <div className="job-hero__chatLine" />
                  <div className="job-hero__chatLine job-hero__chatLine--short" />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
