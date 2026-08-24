import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaAward, FaCalendarAlt, FaGraduationCap } from "react-icons/fa";
import { API_BASE_URL } from "../config/api";

import kylemoreAbbey from "../assets/ireland/kylemore-abbey.webp";

/**
 * Scholarships listing — sits directly under the partner-universities section.
 *
 * Content is managed from the admin dashboard (/admin/scholarships). This is a
 * read-only listing: students follow `link` through to the provider, there is
 * no application flow on this site.
 *
 * Renders nothing until at least one scholarship exists, matching how
 * FeaturedCourses behaves with an empty result.
 */
export default function ScholarshipsSection({ limit = 6 }) {
  const [scholarships, setScholarships] = useState([]);

  useEffect(() => {
    let cancelled = false;

    const fetchScholarships = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/scholarships`);
        const data = await res.json();
        if (cancelled) return;
        setScholarships(Array.isArray(data?.data) ? data.data : []);
      } catch {
        if (!cancelled) setScholarships([]);
      }
    };

    fetchScholarships();
    return () => {
      cancelled = true;
    };
  }, []);

  if (!scholarships.length) return null;

  const visible = scholarships.slice(0, limit);

  return (
    <section className="schol" id="scholarships">
      <div className="schol-inner">
        <div className="schol-intro">
          <div className="schol-head">
            <span className="section-badge">Funding</span>
            <h2 className="schol-title">Scholarships for International Students</h2>
            <p className="schol-subtitle">
              Funding options we track for students heading to Ireland. Check each
              provider&apos;s page for the full terms before applying.
            </p>
          </div>

          {/* Decorative Ireland imagery — Kylemore Abbey. Presentational only,
              hence a background-image on an aria-hidden div, not an <img>. */}
          <div className="schol-media" aria-hidden="true" />
        </div>

        <ul className="schol-grid">
          {visible.map((item) => (
            <li className="schol-card" key={item._id ?? item.name}>
              <div className="schol-card-head">
                <span className="schol-card-icon" aria-hidden="true">
                  <FaAward />
                </span>
                <div>
                  <h3 className="schol-card-name">{item.name}</h3>
                  {item.provider && (
                    <p className="schol-card-provider">{item.provider}</p>
                  )}
                </div>
              </div>

              {item.amount && <div className="schol-card-amount">{item.amount}</div>}

              <div className="schol-card-meta">
                {item.level && (
                  <span className="schol-card-metaItem">
                    <FaGraduationCap aria-hidden="true" /> {item.level}
                  </span>
                )}
                {item.deadline && (
                  <span className="schol-card-metaItem">
                    <FaCalendarAlt aria-hidden="true" /> {item.deadline}
                  </span>
                )}
              </div>

              {item.eligibility && (
                <p className="schol-card-eligibility">{item.eligibility}</p>
              )}

              {item.link && (
                <a
                  className="schol-card-link"
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View details →
                </a>
              )}
            </li>
          ))}
        </ul>

        {/* Only worth showing once the listing is actually truncated. */}
        {scholarships.length > visible.length && (
          <div className="schol-more">
            <Link to="/scholarships" className="schol-moreLink">
              View all {scholarships.length} scholarships →
            </Link>
          </div>
        )}
      </div>

      <style>{`
        .schol{
          padding: var(--section-padding, 80px) 0;
          background: var(--color-bg-white, #fff);
          font-family: var(--font-sans, "Mulish", system-ui, sans-serif);
        }
        @media (max-width: 768px){
          .schol{ padding: var(--section-padding-mobile, 48px) 0; }
        }
        .schol-inner{
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
        }
        .schol-intro{
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          align-items: center;
          margin-bottom: 32px;
        }
        @media (max-width: 960px){
          .schol-intro{ grid-template-columns: 1fr; gap: 24px; }
        }
        .schol-head{
          max-width: 640px;
        }
        .schol-media{
          min-height: 320px;
          background-image: url(${kylemoreAbbey});
          /* Portrait source in a landscape box: 42% keeps the abbey and its
             reflection in frame and crops the empty sky instead. */
          background-position: center 42%;
          background-size: cover;
          background-repeat: no-repeat;
          border-radius: var(--radius-card, 16px);
        }
        @media (min-width: 1200px){
          .schol-media{ min-height: 420px; }
        }
        @media (max-width: 960px){
          .schol-media{ min-height: 240px; }
        }
        .schol-more{
          margin-top: 26px;
        }
        .schol-moreLink{
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.94rem;
          font-weight: 700;
          color: var(--color-primary-dark, #52a63f);
          text-decoration: none;
        }
        .schol-moreLink:hover{ text-decoration: underline; }

        .schol-title{
          font-size: var(--text-h2, 2rem);
          font-weight: var(--weight-bold, 700);
          color: var(--color-text-primary, #0f172a);
          margin-bottom: 6px;
        }
        .schol-subtitle{
          color: var(--color-text-secondary, #64748b);
          font-size: 1rem;
          line-height: 1.6;
        }

        .schol-grid{
          list-style: none;
          margin: 0;
          padding: 0;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
        }
        @media (max-width: 1024px){
          .schol-grid{ grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 680px){
          .schol-grid{ grid-template-columns: 1fr; }
        }

        .schol-card{
          display: flex;
          flex-direction: column;
          background: var(--color-bg-white, #fff);
          border: 1px solid var(--color-border, #e2e8f0);
          border-radius: var(--radius-card, 16px);
          padding: 22px;
          box-shadow: var(--shadow-card, 0 10px 28px rgba(15,23,42,0.06));
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .schol-card:hover{
          transform: translateY(-3px);
          box-shadow: var(--shadow-card-hover, 0 18px 38px rgba(15,23,42,0.12));
        }

        .schol-card-head{
          display: flex;
          gap: 12px;
          align-items: flex-start;
        }
        .schol-card-icon{
          flex-shrink: 0;
          width: 38px;
          height: 38px;
          border-radius: 10px;
          display: grid;
          place-items: center;
          background: var(--color-primary-light, rgba(100,200,80,0.12));
          color: var(--color-primary, #64c850);
          font-size: 0.95rem;
        }
        .schol-card-name{
          font-size: 1.02rem;
          font-weight: var(--weight-bold, 700);
          color: var(--color-text-primary, #0f172a);
          line-height: 1.35;
        }
        .schol-card-provider{
          margin-top: 3px;
          font-size: 0.85rem;
          color: var(--color-text-secondary, #64748b);
        }

        .schol-card-amount{
          margin-top: 14px;
          font-size: 1.15rem;
          font-weight: 800;
          color: var(--color-primary, #64c850);
          letter-spacing: -0.01em;
        }

        .schol-card-meta{
          margin-top: 12px;
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .schol-card-metaItem{
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 10px;
          border-radius: var(--radius-pill, 999px);
          background: rgba(15, 23, 42, 0.05);
          color: var(--color-text-secondary, #64748b);
          font-size: 0.76rem;
          font-weight: 600;
        }

        .schol-card-eligibility{
          margin-top: 14px;
          font-size: 0.87rem;
          line-height: 1.6;
          color: var(--color-text-secondary, #64748b);
          flex: 1;
        }

        .schol-card-link{
          margin-top: 18px;
          align-self: flex-start;
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--color-primary, #64c850);
          text-decoration: none;
        }
        .schol-card-link:hover{ text-decoration: underline; }

        @media (prefers-reduced-motion: reduce){
          .schol-card{ transition: none; }
          .schol-card:hover{ transform: none; }
        }
      `}</style>
    </section>
  );
}
