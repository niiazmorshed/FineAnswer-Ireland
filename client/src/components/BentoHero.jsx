import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import heroPerson from "../assets/student.jpg";
import "./BentoHero.css";
import { ResponsiveGlobe } from "./Globe";

const COUNTRY = "Ireland";

/* Served from public/, so this is a plain static file rather than a bundled
   module — the browser streams the mp4 instead of it inflating the JS chunk.

   HeroBackdrop plays this as a playlist, so adding a second clip here is the
   only change needed to bring one back. */
const HERO_CLIPS = [
  {
    id: "university",
    src: "/video/university-hero.mp4",
    poster: "/video/university-hero-poster.jpg",
  },
];

/* Painted as a CSS background before any video exists, so the hero is never
   empty. It is the first clip's own first frame, which makes the handover to
   video invisible. */
const HERO_POSTER = HERO_CLIPS[0].poster;

/**
 * Decorative hero background.
 *
 * The poster paints immediately as a CSS background; the <video> elements are
 * only created later, and only where they are worth the bytes. Nothing here
 * blocks first paint: no video element exists until an idle callback fires, so
 * no mp4 is in flight while the page is still laying out.
 *
 * Skipped entirely on narrow viewports (phones pay the most and see the
 * least), when the viewer prefers reduced motion, and on metered or slow
 * connections. Those cases keep the poster still, which is a complete-looking
 * hero rather than a fallback.
 *
 * Clips run as a playlist: each one ends and the next fades up over it. A clip
 * is not mounted until the one before it can actually play, so they never
 * download against each other, and if one never arrives — 404, decode error,
 * blocked autoplay — the playlist skips it. With a single clip the machinery is
 * dormant and the element simply loops.
 */
function HeroBackdrop() {
  const [mounted, setMounted] = useState(false);
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState(0);
  // Clips that errored out; they are skipped when choosing what to play next.
  const [broken, setBroken] = useState(() => new Set());
  const videoRefs = useRef([]);

  useEffect(() => {
    const wideEnough = window.matchMedia("(min-width: 768px)").matches;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const conn =
      navigator.connection ||
      navigator.mozConnection ||
      navigator.webkitConnection;
    const constrained =
      Boolean(conn?.saveData) ||
      /(^|-)2g$|^3g$/.test(conn?.effectiveType || "");

    if (!wideEnough || reducedMotion || constrained) return undefined;

    let cancelled = false;
    const mount = () => {
      if (!cancelled) setMounted(true);
    };

    // requestIdleCallback keeps this off the critical path; the timeout stops
    // a permanently busy main thread from starving it, and setTimeout covers
    // Safari, which still lacks rIC.
    const idle = window.requestIdleCallback;
    const handle = idle
      ? idle(mount, { timeout: 2500 })
      : setTimeout(mount, 1200);

    return () => {
      cancelled = true;
      if (idle && window.cancelIdleCallback) window.cancelIdleCallback(handle);
      else clearTimeout(handle);
    };
  }, []);

  const markBroken = (index) =>
    setBroken((prev) => {
      if (prev.has(index)) return prev;
      const next = new Set(prev);
      next.add(index);
      return next;
    });

  /**
   * Hand over to the next playable clip. Falls back to replaying the current
   * one when there is nothing to hand over to — the second clip has not
   * mounted yet, or it failed to load.
   */
  const advance = (from) => {
    for (let step = 1; step <= HERO_CLIPS.length; step += 1) {
      const candidate = (from + step) % HERO_CLIPS.length;
      const el = videoRefs.current[candidate];
      if (candidate === from || !el || broken.has(candidate)) continue;
      el.currentTime = 0;
      el.play()?.catch(() => markBroken(candidate));
      setActive(candidate);
      return;
    }

    const current = videoRefs.current[from];
    if (current) {
      current.currentTime = 0;
      current.play()?.catch(() => {});
    }
  };

  return (
    <div className="hero-backdrop" aria-hidden="true">
      <div
        className="hero-backdrop__poster"
        style={{ backgroundImage: `url(${HERO_POSTER})` }}
      />
      {mounted &&
        HERO_CLIPS.map((clip, index) => {
          // Clip 0 mounts on idle; the rest wait until it is actually playing,
          // so they never compete with it for bandwidth.
          if (index > 0 && !ready) return null;

          return (
            <video
              key={clip.id}
              ref={(el) => {
                videoRefs.current[index] = el;
              }}
              className={`hero-backdrop__video${
                index === active && ready ? " is-ready" : ""
              }`}
              src={clip.src}
              poster={clip.poster}
              autoPlay={index === 0}
              /* Native looping is seamless; the onEnded handoff is not, so a
                 lone clip loops itself rather than restarting through
                 advance(). */
              loop={HERO_CLIPS.length === 1}
              muted
              playsInline
              preload={index === 0 ? "none" : "auto"}
              tabIndex={-1}
              onCanPlay={index === 0 ? () => setReady(true) : undefined}
              onEnded={() => advance(index)}
              onError={() => markBroken(index)}
            />
          );
        })}
      <div className="hero-backdrop__scrim" />
    </div>
  );
}

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
  /**
   * Full-bleed video hero: no right-hand column at all, dark scrim, light type.
   * The globe and the floating cards are both suppressed — the footage is the
   * whole composition.
   */
  cinematic = false,
  eyebrow,
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
    <section
      className={`ireland-hero-bento${cinematic ? " ireland-hero-bento--cinematic" : ""}`}
      aria-label={ariaLabel}
      id="search"
    >
      <HeroBackdrop />

      <div className="ireland-hero-bento__inner">
        {showBackLink ? (
          <Link to={backTo} className="ireland-hero-back">
            ← Return to Home
          </Link>
        ) : null}

        <div className={`job-hero${cinematic ? " job-hero--cinematic" : ""}`}>
          <div className="job-hero__left">
            {cinematic ? (
              <p className="job-hero__eyebrow">
                <span className="job-hero__eyebrowRule" aria-hidden="true" />
                {eyebrow}
              </p>
            ) : (
              <div className="job-hero__pill">
                <span className="job-hero__pillTag">NEW</span>
                <span>Stay on track for your next step with FineAnswer</span>
              </div>
            )}

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

            <div className="job-hero__ctaRow">{ctaEl}</div>
          </div>

          {!cinematic && (
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
          )}
        </div>
      </div>
    </section>
  );
}
