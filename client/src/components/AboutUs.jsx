import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import aboutImg1 from "../images/uni1.jpg";
import aboutImg2 from "../images/uni2.jpg";
import aboutImg3 from "../images/uni3.jpg";
import mapAnimation from "../assets/map.json";

export default function AboutUs() {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [stats, setStats] = useState({ customersA: 0, customersB: 0, support: 0, dedication: 0 });

  const target = useMemo(
    () => ({ customersA: 4000, customersB: 1000, support: 24, dedication: 100 }),
    [],
  );

  useEffect(() => {
    if (!sectionRef.current || hasAnimated) return;

    const el = sectionRef.current;
    const obs = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) return;
        setHasAnimated(true);
      },
      { threshold: 0.25 },
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;

    const start = performance.now();
    const duration = 1200;

    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const ease = 1 - Math.pow(1 - t, 3); // easeOutCubic

      setStats({
        customersA: Math.round(target.customersA * ease),
        customersB: Math.round(target.customersB * ease),
        support: Math.round(target.support * ease),
        dedication: Math.round(target.dedication * ease),
      });

      if (t < 1) requestAnimationFrame(tick);
    };

    const raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [hasAnimated, target]);

  const formatKPlus = (n) => {
    if (n >= 1000) return `${Math.round(n / 1000)}K+`;
    return `${n}+`;
  };

  return (
    <section className="about-section-v2" id="about" ref={sectionRef}>
      <div className="aboutv2-mapBg" aria-hidden="true">
        <Lottie
          animationData={mapAnimation}
          loop
          autoplay
          style={{ width: "100%", height: "100%" }}
          rendererSettings={{ preserveAspectRatio: "xMidYMid slice" }}
        />
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
                <img src={aboutImg1} alt="" />
              </div>
              <div className="aboutv2-photo aboutv2-photo--2">
                <img src={aboutImg2} alt="" />
              </div>
              <div className="aboutv2-photo aboutv2-photo--3">
                <img src={aboutImg3} alt="" />
              </div>
              <div className="aboutv2-photo aboutv2-photo--4">
                <img src={aboutImg1} alt="" />
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
              <div className="aboutv2-statCard">
                <div className="aboutv2-statValue">{formatKPlus(stats.customersA)}</div>
                <div className="aboutv2-statLabel">Satisfied Customers</div>
              </div>
              <div className="aboutv2-statCard">
                <div className="aboutv2-statValue">{formatKPlus(stats.customersB)}</div>
                <div className="aboutv2-statLabel">Satisfied Customers</div>
              </div>
              <div className="aboutv2-statCard">
                <div className="aboutv2-statValue">
                  {stats.support}
                  <span className="aboutv2-statSuffix">/7</span>
                </div>
                <div className="aboutv2-statLabel">Customer Support</div>
              </div>
              <div className="aboutv2-statCard">
                <div className="aboutv2-statValue">
                  {stats.dedication}
                  <span className="aboutv2-statSuffix">%</span>
                </div>
                <div className="aboutv2-statLabel">Dedication</div>
              </div>
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
        }
        @media (max-width: 768px){
          .about-section-v2{ padding: var(--section-padding-mobile, 48px) 0; }
        }
        .aboutv2-mapBg{
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          opacity: 0.32;
          filter: saturate(1.05) contrast(1.02);
        }
        .aboutv2-mapBg svg{
          width: 100%;
          height: 100%;
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
      `}</style>
    </section>
  );
}
