import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./BentoHero.css";
import heroPerson from "../assets/student.jpg";

/**
 * Job-board style hero (reference): left headline + search bar, right person + floating cards.
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
  onHeroSearch,
  heroSearchDefaults,
}) {
  const defaults = useMemo(
    () => ({
      keyword: "",
      location: "Ireland",
      ...(heroSearchDefaults || {}),
    }),
    [heroSearchDefaults],
  );

  const [keyword, setKeyword] = useState(defaults.keyword);
  const [location, setLocation] = useState(defaults.location);

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

  const submitSearch = () => {
    if (typeof onHeroSearch === "function") onHeroSearch({ keyword, location });
  };

  return (
    <section className="ireland-hero-bento" aria-label={ariaLabel}>
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
              <form
                className="job-hero__search"
                onSubmit={(e) => {
                  e.preventDefault();
                  submitSearch();
                }}
                aria-label="Hero search"
              >
                <div className="job-hero__inputWrap">
                  <span className="job-hero__inputIcon" aria-hidden>🔎</span>
                  <input
                    className="job-hero__input"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="Course, university, or keyword"
                    aria-label="Keyword"
                  />
                </div>
                <div className="job-hero__inputDivider" aria-hidden />
                <div className="job-hero__inputWrap job-hero__inputWrap--select">
                  <span className="job-hero__inputIcon" aria-hidden>📍</span>
                  <select
                    className="job-hero__select"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    aria-label="Location"
                  >
                    <option>Ireland</option>
                    <option>UK</option>
                    <option>Australia</option>
                  </select>
                </div>
                <button type="submit" className="job-hero__searchBtn" aria-label="Search">
                  Search
                </button>
              </form>
            ) : null}

            <div className="job-hero__trusted">
              <span className="job-hero__trustedLabel">We are trusted by:</span>
              <div className="job-hero__trustedLogos" aria-hidden="true">
                <span className="job-hero__logo job-hero__logo--g">G</span>
                <span className="job-hero__logo job-hero__logo--m">M</span>
                <span className="job-hero__logo job-hero__logo--a">A</span>
                <span className="job-hero__logo job-hero__logo--p">P</span>
              </div>
            </div>

            <div className="job-hero__ctaRow">{ctaEl}</div>
          </div>

          <div className="job-hero__right" aria-hidden="true">
            <div className="job-hero__ring" />
            <div className="job-hero__photo" style={{ backgroundImage: `url(${heroImageSrc})` }} />

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
          </div>
        </div>
      </div>
    </section>
  );
}
