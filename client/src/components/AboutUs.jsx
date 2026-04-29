import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import aboutImg1 from "../assets/fine.jpg";
import aboutImg2 from "../assets/Griffith.jpg";
import aboutImg3 from "../assets/DBS.jpg";
import aboutImg4 from "../assets/DCU.jpg";

const stats = [
  { value: "4K+", label: "Satisfied Customers" },
  { value: "1K+", label: "Successful Applications" },
  { value: "24/7", label: "Customer Support" },
  { value: "100%", label: "Dedication" },
];

export default function AboutUs() {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [shouldMountMap, setShouldMountMap] = useState(false);
  const [shouldPlayMap, setShouldPlayMap] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [mapData, setMapData] = useState(null);

  useEffect(() => {
    const query = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!query) return undefined;

    const update = () => setReduceMotion(query.matches);
    update();
    query.addEventListener?.("change", update);
    return () => query.removeEventListener?.("change", update);
  }, []);

  useEffect(() => {
    if (!sectionRef.current || isVisible) return;

    const el = sectionRef.current;
    const obs = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) return;
        setIsVisible(true);
        obs.unobserve(el);
      },
      { rootMargin: "160px 0px", threshold: 0.12 },
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [isVisible]);

  // Lazy-load the heavy map JSON only when the section scrolls into view.
  // This avoids bundling it in the initial JS payload and blocking scroll.
  useEffect(() => {
    if (!shouldMountMap || reduceMotion || mapData) return;
    import("../assets/map.json").then((m) => {
      setMapData(m.default ?? m);
    });
  }, [shouldMountMap, reduceMotion, mapData]);

  useEffect(() => {
    if (!sectionRef.current || reduceMotion) {
      setShouldPlayMap(false);
      return undefined;
    }

    const el = sectionRef.current;
    const obs = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const shouldPlay = Boolean(entry?.isIntersecting);
        if (shouldPlay) setShouldMountMap(true);
        setShouldPlayMap(shouldPlay);
      },
      { rootMargin: "220px 0px", threshold: 0.01 },
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [reduceMotion]);

  return (
    <section className={`about-section-v2${isVisible ? " about-section-v2--visible" : ""}`} id="about" ref={sectionRef}>
      <div className={`aboutv2-mapBg${mapData ? " aboutv2-mapBg--motion" : ""}`} aria-hidden="true">
        {mapData && !reduceMotion && (
          <Lottie
            animationData={mapData}
            loop
            autoplay={shouldPlayMap}
            renderer="canvas"
            rendererSettings={{
              preserveAspectRatio: "xMidYMid slice",
              progressiveLoad: true,
              clearCanvas: true,
            }}
            speed={0.55}
            style={{ width: "100%", height: "100%" }}
          />
        )}
      </div>
      <div className="aboutv2-container">
        <div className="aboutv2-grid">
          {/* Left: 2×2 image grid with doodles */}
          <div className="aboutv2-right" aria-hidden="true">
            <svg className="aboutv2-doodles" viewBox="0 0 560 360" preserveAspectRatio="none">
              <path
                d="M 70 40 C 210 20, 250 80, 300 120"
                className="aboutv2-doodlePath aboutv2-doodlePath--red"
              />
              <path
                d="M 500 90 C 510 160, 510 210, 460 260"
                className="aboutv2-doodlePath aboutv2-doodlePath--green"
              />
            </svg>

            <div className="aboutv2-photoGrid">
              <div className="aboutv2-photo aboutv2-photo--1">
                <img src={aboutImg1} alt="" loading="lazy" decoding="async" fetchPriority="low" />
              </div>
              <div className="aboutv2-photo aboutv2-photo--2">
                <img src={aboutImg2} alt="" loading="lazy" decoding="async" fetchPriority="low" />
              </div>
              <div className="aboutv2-photo aboutv2-photo--3">
                <img src={aboutImg3} alt="" loading="lazy" decoding="async" fetchPriority="low" />
              </div>
              <div className="aboutv2-photo aboutv2-photo--4">
                <img src={aboutImg4} alt="" loading="lazy" decoding="async" fetchPriority="low" />
              </div>
            </div>

            <span className="aboutv2-chip aboutv2-chip--play">▶</span>
            <span className="aboutv2-chip aboutv2-chip--plane">✈</span>
            <span className="aboutv2-chip aboutv2-chip--pin">📍</span>
          </div>

          {/* Right: copy + stats (travel reference) */}
          <div className="aboutv2-left">
            <div className="aboutv2-kicker">WE ARE THE BEST FOR YOU</div>
            <h2 className="aboutv2-title">
              Unlock Your <br />
              Dream Destination
            </h2>
            <p className="aboutv2-sub">
              We guide students step by step—from course shortlisting to visa readiness—so you can
              confidently move towards your ideal study destination.
            </p>

            <div className="aboutv2-stats">
              {stats.map((item, index) => (
                <div className="aboutv2-statCard" style={{ "--stat-delay": `${index * 70}ms` }} key={item.label}>
                  <div className="aboutv2-statValue">{item.value}</div>
                  <div className="aboutv2-statLabel">{item.label}</div>
                </div>
              ))}
            </div>

            <div className="aboutv2-actions">
              <button className="aboutv2-btn" onClick={() => navigate("/read-more-info")}>
                Learn more
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .about-section-v2{
          padding: var(--section-padding, 80px) 0;
          background: var(--color-bg-white, #fff);
          font-family: var(--font-sans, "Mulish", system-ui, sans-serif);
          position: relative;
          overflow: hidden;
          content-visibility: auto;
          contain-intrinsic-size: 620px;
        }
        @media (max-width: 768px){
          .about-section-v2{ padding: var(--section-padding-mobile, 48px) 0; }
        }
        .aboutv2-mapBg{
          position: absolute;
          inset: 8% 0 0;
          z-index: 0;
          pointer-events: none;
          opacity: 0.42;
          background:
            radial-gradient(circle at 18% 24%, rgba(100, 200, 80, 0.14) 0 2px, transparent 3px),
            radial-gradient(circle at 72% 44%, rgba(37, 99, 235, 0.12) 0 2px, transparent 3px),
            linear-gradient(120deg, transparent 0 18%, rgba(100, 200, 80, 0.08) 18% 18.6%, transparent 18.6% 43%, rgba(37, 99, 235, 0.07) 43% 43.5%, transparent 43.5% 100%);
          background-size: 62px 62px, 74px 74px, 100% 100%;
          mask-image: radial-gradient(ellipse at center, #000 0 58%, transparent 78%);
          contain: layout paint style;
          transform: translateZ(0);
        }
        .aboutv2-mapBg--motion{
          opacity: 0.3;
          background: none;
          mask-image: none;
        }
        .aboutv2-mapBg::before,
        .aboutv2-mapBg::after{
          content: "";
          position: absolute;
          border: 1px solid rgba(37, 99, 235, 0.14);
          border-radius: 50%;
          transform: rotate(-12deg);
        }
        .aboutv2-mapBg::before{
          width: 480px;
          height: 210px;
          left: 8%;
          top: 22%;
        }
        .aboutv2-mapBg::after{
          width: 560px;
          height: 240px;
          right: 6%;
          bottom: 12%;
        }
        .aboutv2-mapBg--motion::before,
        .aboutv2-mapBg--motion::after{
          display: none;
        }
        .aboutv2-mapBg canvas{
          width: 100% !important;
          height: 100% !important;
          display: block;
        }
        .aboutv2-container{
          max-width: 1120px;
          margin: 0 auto;
          padding: 0 24px;
          position: relative;
          z-index: 1;
        }
        .aboutv2-grid{
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          gap: 28px;
          align-items: center;
        }
        @media (max-width: 900px){
          .aboutv2-grid{ grid-template-columns: 1fr; }
        }

        .aboutv2-left{
          max-width: 560px;
        }
        .aboutv2-kicker{
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(239,68,68,0.9);
          margin-bottom: 10px;
        }
        .aboutv2-title{
          margin: 0;
          font-size: clamp(1.6rem, 2.8vw, 2.2rem);
          line-height: 1.15;
          letter-spacing: -0.02em;
          color: var(--color-text-primary, #0f172a);
          font-weight: 700;
        }
        .aboutv2-sub{
          margin: 14px 0 0;
          color: var(--color-text-secondary, #64748b);
          line-height: 1.6;
          font-size: 0.98rem;
          max-width: 520px;
        }

        .aboutv2-stats{
          margin-top: 18px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
          max-width: 420px;
        }
        .aboutv2-statCard{
          background: #fff;
          border: 1px solid rgba(212,233,244,0.9);
          border-radius: 16px;
          padding: 14px 14px 12px;
          box-shadow: 0 10px 28px rgba(15,23,42,0.06);
          opacity: 0;
          transform: translate3d(0, 8px, 0);
          transition: opacity 360ms ease var(--stat-delay, 0ms), transform 360ms ease var(--stat-delay, 0ms);
        }
        .about-section-v2--visible .aboutv2-statCard{
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }
        .aboutv2-statValue{
          font-size: 1.25rem;
          font-weight: 800;
          color: #2563eb;
          letter-spacing: -0.02em;
          line-height: 1;
        }
        .aboutv2-statSuffix{
          font-size: 0.9rem;
          font-weight: 700;
          color: #2563eb;
        }
        .aboutv2-statLabel{
          margin-top: 8px;
          font-size: 0.8rem;
          font-weight: 500;
          color: rgba(100,116,139,0.95);
        }

        .aboutv2-actions{ margin-top: 18px; }
        .aboutv2-btn{
          border: none;
          background: var(--color-primary, #64c850);
          color: #fff;
          padding: 12px 18px;
          border-radius: 999px;
          font-weight: 600;
          cursor: pointer;
          box-shadow: 0 12px 24px rgba(100,200,80,0.22);
          transition: transform 0.2s ease, background 0.2s ease;
          font-family: var(--font-sans, inherit);
        }
        .aboutv2-btn:hover{
          background: #ffda32;
          color: #0f172a;
          transform: translateY(-1px);
        }

        /* Right: image grid */
        .aboutv2-right{
          position: relative;
          min-height: 340px;
        }
        /* when the image grid is on the left */
        .aboutv2-grid > .aboutv2-right{
          justify-self: start;
        }
        /* when text is on the right */
        .aboutv2-grid > .aboutv2-left{
          justify-self: end;
        }
        .aboutv2-photoGrid{
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px;
          justify-content: end;
          max-width: 420px;
          margin-right: auto;
          margin-left: 0;
        }
        .aboutv2-photo{
          border-radius: 18px;
          overflow: hidden;
          background: #fff;
          border: 1px solid rgba(212,233,244,0.9);
          box-shadow: 0 16px 40px rgba(15,23,42,0.10);
          aspect-ratio: 1 / 1;
          contain: paint;
        }
        .aboutv2-photo img{
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .aboutv2-doodles{
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0.9;
        }
        .aboutv2-doodlePath{
          fill: none;
          stroke-width: 3.5;
          stroke-linecap: round;
          stroke-dasharray: 2 10;
        }
        .aboutv2-doodlePath--red{ stroke: rgba(239,68,68,0.55); }
        .aboutv2-doodlePath--green{ stroke: rgba(34,197,94,0.45); }

        .aboutv2-chip{
          position: absolute;
          width: 44px;
          height: 44px;
          border-radius: 999px;
          display: grid;
          place-items: center;
          background: #fff;
          border: 1px solid rgba(212,233,244,0.95);
          box-shadow: 0 14px 34px rgba(15,23,42,0.12);
          font-weight: 800;
          color: rgba(15,23,42,0.8);
        }
        .aboutv2-chip--play{ right: 10px; top: 0; color: #f59e0b; }
        .aboutv2-chip--plane{ left: 4px; top: 24px; color: rgba(239,68,68,0.9); }
        .aboutv2-chip--pin{ right: 170px; bottom: -6px; color: #2563eb; }

        @media (max-width: 900px){
          .aboutv2-left{ max-width: none; }
          .aboutv2-right{ min-height: 360px; }
          .aboutv2-photoGrid{ margin: 0; max-width: 520px; }
          .aboutv2-grid > .aboutv2-left,
          .aboutv2-grid > .aboutv2-right{
            justify-self: stretch;
          }
        }
        @media (max-width: 520px){
          .aboutv2-stats{ max-width: none; }
          .aboutv2-photoGrid{ gap: 14px; }
          .aboutv2-chip--pin{ right: 120px; }
        }
        @media (prefers-reduced-motion: reduce){
          .aboutv2-statCard{
            opacity: 1;
            transform: none;
            transition: none;
          }
        }
      `}</style>
    </section>
  );
}
