import React from "react";

/**
 * About Us — introduction section.
 *
 * PLACEHOLDER CONTENT. Every string below is a stand-in and must be replaced
 * with the final copy before this ships. Nothing here is sourced from the
 * business; do not treat any of it as accurate.
 */

const PILLARS = [
  {
    title: "PLACEHOLDER — Pillar one",
    body: "PLACEHOLDER — One or two sentences describing the first thing that sets FineAnswer apart. Replace this entire string.",
  },
  {
    title: "PLACEHOLDER — Pillar two",
    body: "PLACEHOLDER — One or two sentences describing the second differentiator. Replace this entire string.",
  },
  {
    title: "PLACEHOLDER — Pillar three",
    body: "PLACEHOLDER — One or two sentences describing the third differentiator. Replace this entire string.",
  },
];

export default function AboutUsIntro() {
  return (
    <section className="aboutIntro" id="about-us-intro">
      <div className="aboutIntro-container">
        <div className="aboutIntro-head">
          {/* PLACEHOLDER */}
          <div className="aboutIntro-kicker">PLACEHOLDER — SECTION KICKER</div>
          {/* PLACEHOLDER */}
          <h2 className="aboutIntro-title">About Us</h2>
          {/* PLACEHOLDER */}
          <p className="aboutIntro-lede">
            PLACEHOLDER — Opening paragraph introducing FineAnswer Ireland: who
            the company is, who it serves, and what a student can expect. Two to
            four sentences. Replace this entire paragraph with final copy.
          </p>
          {/* PLACEHOLDER */}
          <p className="aboutIntro-body">
            PLACEHOLDER — Second paragraph with supporting detail: background,
            approach, or credentials. Replace this entire paragraph with final
            copy. Do not ship the placeholder text.
          </p>
        </div>

        <ul className="aboutIntro-pillars">
          {PILLARS.map((pillar) => (
            <li className="aboutIntro-pillar" key={pillar.title}>
              <h3 className="aboutIntro-pillarTitle">{pillar.title}</h3>
              <p className="aboutIntro-pillarBody">{pillar.body}</p>
            </li>
          ))}
        </ul>
      </div>

      <style>{`
        .aboutIntro{
          padding: var(--section-padding, 80px) 0;
          background: var(--color-bg-white, #fff);
          font-family: var(--font-sans, "Mulish", system-ui, sans-serif);
          position: relative;
        }
        @media (max-width: 768px){
          .aboutIntro{ padding: var(--section-padding-mobile, 48px) 0; }
        }
        .aboutIntro-container{
          max-width: 1120px;
          margin: 0 auto;
          padding: 0 24px;
        }
        .aboutIntro-head{
          max-width: 720px;
        }
        .aboutIntro-kicker{
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(239,68,68,0.9);
          margin-bottom: 10px;
        }
        .aboutIntro-title{
          margin: 0;
          font-size: clamp(1.6rem, 2.8vw, 2.2rem);
          line-height: 1.15;
          letter-spacing: -0.02em;
          color: var(--color-text-primary, #0f172a);
          font-weight: 700;
        }
        .aboutIntro-lede{
          margin: 14px 0 0;
          color: var(--color-text-secondary, #64748b);
          line-height: 1.65;
          font-size: 1rem;
        }
        .aboutIntro-body{
          margin: 12px 0 0;
          color: var(--color-text-secondary, #64748b);
          line-height: 1.65;
          font-size: 0.96rem;
        }

        .aboutIntro-pillars{
          margin: 32px 0 0;
          padding: 0;
          list-style: none;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
        }
        @media (max-width: 900px){
          .aboutIntro-pillars{ grid-template-columns: 1fr; }
        }
        .aboutIntro-pillar{
          background: #fff;
          border: 1px solid rgba(212,233,244,0.9);
          border-radius: 16px;
          padding: 20px 20px 18px;
          box-shadow: 0 10px 28px rgba(15,23,42,0.06);
        }
        .aboutIntro-pillarTitle{
          margin: 0;
          font-size: 1rem;
          font-weight: 700;
          color: var(--color-text-primary, #0f172a);
          line-height: 1.3;
        }
        .aboutIntro-pillarBody{
          margin: 8px 0 0;
          font-size: 0.9rem;
          line-height: 1.6;
          color: rgba(100,116,139,0.95);
        }
      `}</style>
    </section>
  );
}
