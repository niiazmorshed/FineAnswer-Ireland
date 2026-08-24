import React, { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";

import kilkennyCastle from "../assets/ireland/kilkenny-castle.webp";

/**
 * About Us — intro section.
 *
 * Layout and copy follow the supplied reference: left column holds the
 * heading, lede and two CTAs; right column holds a 2x2 grid of stat cards
 * with an accent bar on the leading edge.
 *
 * "Watch Video" opens the company video in a lightbox; "Learn More" routes to
 * /read-more-info.
 */

/**
 * Company video, opened in a lightbox from the "Watch Video" CTA.
 *
 * youtube-nocookie.com is YouTube's privacy-preserving embed host: it does not
 * write tracking cookies until the viewer actually plays. autoplay is safe here
 * because the modal only ever opens from a click, so playback is user-initiated
 * rather than something that starts on page load.
 */
const VIDEO_ID = "41B23vpQsIk";
const VIDEO_EMBED_URL = `https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&rel=0`;

const STATS = [
  { value: "100+", label: "Happy Students" },
  { value: "8", label: "Countries Served" },
  { value: "16+", label: "Partner Institutions" },
  { value: "100%", label: "Student Satisfaction" },
];

export default function AboutUsIntro() {
  const navigate = useNavigate();

  const [videoOpen, setVideoOpen] = useState(false);
  // Where focus goes back to on close, so keyboard users are not dumped at the
  // top of the document.
  const triggerRef = useRef(null);
  const closeBtnRef = useRef(null);

  const closeVideo = useCallback(() => setVideoOpen(false), []);

  useEffect(() => {
    if (!videoOpen) return undefined;

    const onKeyDown = (e) => {
      if (e.key === "Escape") closeVideo();
    };
    document.addEventListener("keydown", onKeyDown);

    // Stop the page scrolling behind the modal, restoring whatever the page
    // had set rather than assuming it was "".
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    closeBtnRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
      triggerRef.current?.focus();
    };
  }, [videoOpen, closeVideo]);

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
              onClick={() => setVideoOpen(true)}
              ref={triggerRef}
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

      {/* Decorative Ireland imagery — Kilkenny Castle. Purely presentational,
          so it is a background-image on an aria-hidden div rather than an
          <img> needing alt text. */}
      <div className="aboutIntro-media" aria-hidden="true" />

      {/* Portalled to <body> on purpose. .LandingPage sets isolation:isolate,
          which traps position:fixed descendants so the backdrop covers only
          this section instead of the viewport — the same trap documented on
          .landing-top in LandingPage.jsx. */}
      {videoOpen && createPortal(
        <div
          className="aboutIntro-modal"
          role="dialog"
          aria-modal="true"
          aria-label="FineAnswer Ireland company video"
          // Backdrop click closes; the guard keeps clicks inside the frame
          // (including on the video itself) from bubbling up and closing it.
          onClick={closeVideo}
        >
          <div
            className="aboutIntro-modalFrame"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="aboutIntro-modalClose"
              onClick={closeVideo}
              ref={closeBtnRef}
              aria-label="Close video"
            >
              ×
            </button>
            <div className="aboutIntro-modalVideo">
              <iframe
                src={VIDEO_EMBED_URL}
                title="FineAnswer Ireland company video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>,
        document.body
      )}

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

        .aboutIntro-media{
          /* 1132 = the container's 1180 max-width minus its 2x24px padding,
             and the 48px width inset reproduces that padding as a gutter, so
             the band's edges line up with the copy above it at every width. */
          width: calc(100% - 48px);
          max-width: 1132px;
          margin: 56px auto 0;
          height: clamp(200px, 28vw, 360px);
          background-image: url(${kilkennyCastle});
          background-size: cover;
          background-position: center 62%;
          border-radius: 14px;
        }
        @media (max-width: 960px){
          .aboutIntro-media{ margin-top: 32px; }
        }

        .aboutIntro-modal{
          position: fixed;
          inset: 0;
          /* Above the navbar, which sits in the 1000s */
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          background: rgba(15, 23, 42, 0.82);
          animation: aboutIntroFade 0.18s ease;
        }
        .aboutIntro-modalFrame{
          position: relative;
          width: 100%;
          max-width: 960px;
        }
        .aboutIntro-modalVideo{
          position: relative;
          width: 100%;
          /* 16:9 without the padding-top hack */
          aspect-ratio: 16 / 9;
          background: #000;
          border-radius: 14px;
          overflow: hidden;
          box-shadow: 0 30px 70px rgba(0, 0, 0, 0.45);
        }
        .aboutIntro-modalVideo iframe{
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          border: 0;
        }
        .aboutIntro-modalClose{
          position: absolute;
          top: -46px;
          right: 0;
          width: 36px;
          height: 36px;
          display: grid;
          place-items: center;
          font-size: 1.6rem;
          line-height: 1;
          color: #fff;
          background: rgba(255, 255, 255, 0.14);
          border: 1px solid rgba(255, 255, 255, 0.28);
          border-radius: 50%;
          cursor: pointer;
          transition: background 0.2s ease;
        }
        .aboutIntro-modalClose:hover{ background: rgba(255, 255, 255, 0.28); }
        .aboutIntro-modalClose:focus-visible{
          outline: 2px solid #fff;
          outline-offset: 2px;
        }
        @media (max-width: 560px){
          /* Below ~560px there is no room above the frame, so the button moves
             inside the video's top-right corner instead. */
          .aboutIntro-modalClose{
            top: 8px;
            right: 8px;
            background: rgba(15, 23, 42, 0.65);
          }
        }
        @keyframes aboutIntroFade{
          from{ opacity: 0; }
          to{ opacity: 1; }
        }

        @media (prefers-reduced-motion: reduce){
          .aboutIntro-modal{ animation: none; }
          .aboutIntro-btn,
          .aboutIntro-statCard{ transition: none; }
          .aboutIntro-btn:hover,
          .aboutIntro-statCard:hover{ transform: none; }
        }
      `}</style>
    </section>
  );
}
