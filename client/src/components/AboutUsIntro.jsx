import React from "react";
import { useNavigate } from "react-router-dom";

/**
 * About Us — intro section.
 *
 * Layout and copy follow the supplied reference: left column holds the
 * heading, lede and two CTAs; right column holds a 2x2 grid of stat cards
 * with an accent bar on the leading edge.
 *
 * The "Watch Video" CTA has no destination yet — see PLACEHOLDER below.
 */

const STATS = [
  { value: "100+", label: "Happy Students" },
  { value: "4+", label: "Countries Served" },
  { value: "16+", label: "Partner Institutions" },
  { value: "100%", label: "Student Satisfaction" },
];

export default function AboutUsIntro() {
  const navigate = useNavigate();

  // PLACEHOLDER — no video URL supplied yet. Wire this to the real asset
  // (modal, YouTube embed, or route) once the file/link is provided.
  const handleWatchVideo = () => {
    console.warn("[AboutUsIntro] PLACEHOLDER: no video source configured yet.");
  };

  return (
    <section className="aboutIntro" id="about-us-intro">
      <div className="aboutIntro-container">
        <div className="aboutIntro-copy">
          <h2 className="aboutIntro-title">About Us</h2>
          <p className="aboutIntro-lede">
            We help students unlock global academic opportunities through
            seamless guidance, expert mentoring, and complete end-to-end
            support. Headquartered in Ireland, we guide students from choosing
            the right country and institution to confidently stepping onto
            campus — supporting them at every stage of their journey.
          </p>

          <div className="aboutIntro-actions">
            <button
              type="button"
              className="aboutIntro-btn aboutIntro-btn--solid"
              onClick={() => navigate("/read-more-info")}
            >
              Learn More
            </button>
            <button
              type="button"
              className="aboutIntro-btn aboutIntro-btn--ghost"
              onClick={handleWatchVideo}
            >
              Watch Video <span aria-hidden="true">▶</span>
            </button>
          </div>
        </div>

        <ul className="aboutIntro-stats">
          {STATS.map((stat) => (
            <li className="aboutIntro-statCard" key={stat.label}>
              <div className="aboutIntro-statValue">{stat.value}</div>
              <div className="aboutIntro-statLabel">{stat.label}</div>
            </li>
          ))}
        </ul>
      </div>

      <style>{`
        .aboutIntro{
          --aboutIntro-accent: #4c54a2;
          --aboutIntro-ink: #1f2748;
          --aboutIntro-muted: #5c6580;
          padding: var(--section-padding, 80px) 0;
          background: #f7f8fc;
          font-family: var(--font-sans, "Mulish", system-ui, sans-serif);
          position: relative;
        }
        @media (max-width: 768px){
          .aboutIntro{ padding: var(--section-padding-mobile, 48px) 0; }
        }

        .aboutIntro-container{
          max-width: 1180px;
          margin: 0 auto;
          padding: 0 24px;
          display: grid;
          grid-template-columns: 0.85fr 1.15fr;
          gap: 56px;
          align-items: center;
        }
        @media (max-width: 960px){
          .aboutIntro-container{
            grid-template-columns: 1fr;
            gap: 32px;
          }
        }

        .aboutIntro-title{
          margin: 0;
          font-size: clamp(1.75rem, 3vw, 2.35rem);
          font-weight: 800;
          letter-spacing: 0.01em;
          text-transform: uppercase;
          color: var(--aboutIntro-ink);
          line-height: 1.1;
        }
        .aboutIntro-lede{
          margin: 22px 0 0;
          color: var(--aboutIntro-muted);
          line-height: 1.85;
          font-size: 0.975rem;
          max-width: 34rem;
        }

        .aboutIntro-actions{
          margin-top: 28px;
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
        }
        .aboutIntro-btn{
          font-family: inherit;
          font-size: 0.95rem;
          font-weight: 600;
          padding: 13px 26px;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.2s ease, color 0.2s ease, transform 0.2s ease,
            box-shadow 0.2s ease;
        }
        .aboutIntro-btn--solid{
          border: 1px solid var(--aboutIntro-accent);
          background: var(--aboutIntro-accent);
          color: #fff;
        }
        .aboutIntro-btn--solid:hover{
          background: #3f4791;
          border-color: #3f4791;
          transform: translateY(-1px);
          box-shadow: 0 10px 22px rgba(76, 84, 162, 0.24);
        }
        .aboutIntro-btn--ghost{
          border: 1.5px solid var(--aboutIntro-accent);
          background: #fff;
          color: var(--aboutIntro-accent);
        }
        .aboutIntro-btn--ghost:hover{
          background: var(--aboutIntro-accent);
          color: #fff;
          transform: translateY(-1px);
          box-shadow: 0 10px 22px rgba(76, 84, 162, 0.2);
        }

        .aboutIntro-stats{
          margin: 0;
          padding: 0;
          list-style: none;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 26px;
        }
        @media (max-width: 560px){
          .aboutIntro-stats{ grid-template-columns: 1fr; gap: 18px; }
        }
        .aboutIntro-statCard{
          position: relative;
          background: #fff;
          border-radius: 14px;
          padding: 40px 24px;
          text-align: center;
          overflow: hidden;
          box-shadow: 0 14px 34px rgba(31, 39, 72, 0.08);
          transition: transform 0.22s ease, box-shadow 0.22s ease;
        }
        .aboutIntro-statCard::before{
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 7px;
          background: var(--aboutIntro-accent);
          border-radius: 14px 0 0 14px;
        }
        .aboutIntro-statCard:hover{
          transform: translateY(-3px);
          box-shadow: 0 20px 42px rgba(31, 39, 72, 0.12);
        }
        .aboutIntro-statValue{
          font-size: clamp(1.75rem, 2.6vw, 2.15rem);
          font-weight: 800;
          color: var(--aboutIntro-ink);
          line-height: 1;
          letter-spacing: -0.01em;
        }
        .aboutIntro-statLabel{
          margin-top: 14px;
          font-size: 0.95rem;
          font-weight: 500;
          color: var(--aboutIntro-muted);
        }

        @media (prefers-reduced-motion: reduce){
          .aboutIntro-btn,
          .aboutIntro-statCard{ transition: none; }
          .aboutIntro-btn:hover,
          .aboutIntro-statCard:hover{ transform: none; }
        }
      `}</style>
    </section>
  );
}
