import React from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import searchAnimation from "../assets/search.json";
import {
  FaCogs,
  FaLaptopCode,
  FaBriefcase,
  FaBalanceScale,
  FaCalculator,
  FaUsers,
  FaLanguage,
  FaPalette,
  FaHeartbeat,
  FaLayerGroup,
  FaFileInvoiceDollar,
  FaFlask,
} from "react-icons/fa";

const SUBJECTS = [
  {
    icon: <FaCogs />,
    label: "Engineering",
    desc: "Programs in computing, IT, and engineering.",
    category: "Computing, IT & Engineering",
  },
  {
    icon: <FaLaptopCode />,
    label: "Computing",
    desc: "Software, data, cloud, and AI pathways.",
    category: "Computing, IT & Engineering",
  },
  {
    icon: <FaBriefcase />,
    label: "Business",
    desc: "Management, marketing, and entrepreneurship.",
    category: "Business, Management & Law",
  },
  {
    icon: <FaBalanceScale />,
    label: "Law",
    desc: "Business law and governance tracks.",
    category: "Business, Management & Law",
  },
  {
    icon: <FaHeartbeat />,
    label: "Health",
    desc: "Life sciences and allied health programs.",
    category: "Life Sciences & Health",
  },
  {
    icon: <FaUsers />,
    label: "Social Science",
    desc: "Humanities, policy, and social research.",
    category: "Social Sciences",
  },
];

export default function BrowseBySubject() {
  const navigate = useNavigate();

  const handleClick = (category) => {
    const params = new URLSearchParams();
    params.set("country", "Ireland");
    params.set("category", category);
    navigate(`/search-results?${params.toString()}`);
  };

  return (
    <section className="bbs-section" aria-label="Browse by Subject">
      <div className="bbs-inner">
        <div className="bbs-layout">
          <div className="bbs-content">
            <div className="bbs-header">
              <div className="bbs-kicker">Find your path</div>
              <h2 className="bbs-title">Browse by Subject</h2>
              <p className="bbs-subtitle">
                Explore your desired subject—discover Irish courses aligned with your ambitions and move from browsing to
                applying with clarity.
              </p>
            </div>

            <div className="bbs-grid" aria-label="Subject categories">
              {SUBJECTS.map((s, i) => (
                <button
                  key={s.label}
                  className={`bbs-card bbs-card--a${(i % 6) + 1}`}
                  onClick={() => handleClick(s.category)}
                  type="button"
                >
                  <span className="bbs-icon" aria-hidden="true">
                    {s.icon}
                  </span>
                  <div className="bbs-cardText">
                    <div className="bbs-label">{s.label}</div>
                    <div className="bbs-desc">{s.desc}</div>
                  </div>
                </button>
              ))}
            </div>

            <div className="bbs-actions">
              <button className="bbs-more" type="button" onClick={() => navigate("/search-results?country=Ireland")}>
                Explore more
              </button>
            </div>
          </div>

          <div className="bbs-visual" aria-hidden="true">
            <div className="bbs-visualFrame">
              <Lottie
                animationData={searchAnimation}
                loop
                autoplay
                style={{ width: "100%", height: "100%" }}
                rendererSettings={{ preserveAspectRatio: "xMidYMid meet" }}
              />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .bbs-section {
          padding: var(--section-padding) 0;
          background: #fff;
          position: relative;
          overflow: hidden;
        }
        @media (max-width: 768px) {
          .bbs-section { padding: var(--section-padding-mobile) 0; }
        }
        .bbs-section::before{
          content:"";
          position:absolute;
          inset:0;
          pointer-events:none;
          background:
            radial-gradient(520px 260px at 12% 22%, rgba(99, 102, 241, 0.10), transparent 60%),
            radial-gradient(520px 260px at 92% 18%, rgba(76, 201, 240, 0.10), transparent 60%),
            radial-gradient(520px 260px at 88% 78%, rgba(46, 196, 182, 0.10), transparent 60%),
            radial-gradient(420px 220px at 18% 86%, rgba(254, 172, 30, 0.12), transparent 60%);
          opacity: 0.9;
        }
        .bbs-section::after{
          content:"";
          position:absolute;
          inset:-2px;
          pointer-events:none;
          opacity: 0.07;
          background-repeat:no-repeat;
          background-position: right 22px top 18px;
          background-size: 520px;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='700' height='700' viewBox='0 0 700 700'%3E%3Cg fill='%2300875a'%3E%3Cpath d='M350 335c-18-60-78-116-146-116-77 0-139 62-139 139s62 139 139 139c55 0 109-34 133-86 6-12 11-25 13-38z'/%3E%3Cpath d='M350 335c18-60 78-116 146-116 77 0 139 62 139 139s-62 139-139 139c-55 0-109-34-133-86-6-12-11-25-13-38z'/%3E%3Cpath d='M350 330c-44-44-55-132-1-186 54-54 141-54 195 0 54 54 54 141 0 195-39 39-98 50-148 31-18-7-34-18-46-31z'/%3E%3Cpath d='M337 520c-6 52-35 96-69 132h164c-34-36-63-80-69-132-5-39-3-75 0-107h-26c3 32 5 68 0 107z'/%3E%3C/g%3E%3C/svg%3E");
        }
        .bbs-inner {
          max-width: 1120px;
          margin: 0 auto;
          padding: 0 24px;
          position: relative;
          z-index: 1;
        }

        .bbs-layout{
          display: grid;
          grid-template-columns: 1fr minmax(280px, 360px);
          gap: 26px;
          align-items: center;
        }
        @media (max-width: 980px){
          .bbs-layout{ grid-template-columns: 1fr; }
        }

        .bbs-visual{
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 360px;
        }
        @media (max-width: 980px){
          .bbs-visual{ order: 2; min-height: 280px; }
        }
        @media (max-width: 520px){
          .bbs-visual{ display: none; }
        }

        .bbs-visualFrame{
          width: 100%;
          max-width: 360px;
          aspect-ratio: 1 / 1;
          border-radius: 22px;
          background: rgba(255,255,255,0.55);
          border: 1px solid rgba(148, 163, 184, 0.30);
          box-shadow: 0 22px 60px rgba(15, 23, 42, 0.08);
          backdrop-filter: blur(8px);
          overflow: hidden;
          position: relative;
        }
        .bbs-visualFrame::after{
          content:"";
          position:absolute;
          inset:0;
          pointer-events:none;
          background: radial-gradient(420px 240px at 20% 0%, rgba(99, 102, 241, 0.10) 0%, rgba(99, 102, 241, 0) 65%),
            radial-gradient(420px 240px at 90% 20%, rgba(236, 72, 153, 0.08) 0%, rgba(236, 72, 153, 0) 60%);
        }

        .bbs-content{ min-width: 0; }
        .bbs-header {
          text-align: left;
          margin-bottom: 22px;
        }
        .bbs-kicker{
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(99, 102, 241, 0.85);
          margin-bottom: 10px;
        }
        .bbs-title {
          font-size: var(--text-h2);
          font-weight: var(--weight-bold);
          color: var(--color-text-primary);
          margin: 0 0 8px;
          letter-spacing: -0.02em;
        }
        .bbs-subtitle {
          max-width: 70ch;
          margin: 0;
          font-size: 0.95rem;
          line-height: 1.65;
          font-weight: 400;
          color: var(--color-text-secondary, #64748b);
        }
        .bbs-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
          margin-bottom: 24px;
        }
        @media (min-width: 1100px) {
          .bbs-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
        }
        @media (max-width: 520px) {
          .bbs-grid { grid-template-columns: 1fr; }
        }
        .bbs-card {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          padding: 18px 16px;
          background: rgba(255, 255, 255, 0.62);
          border: 1px solid rgba(148, 163, 184, 0.30);
          border-radius: 18px;
          cursor: pointer;
          transition: all 0.25s ease;
          font-family: var(--font-sans);
          box-shadow: 0 16px 44px rgba(15, 23, 42, 0.08);
          text-align: left;
          backdrop-filter: blur(10px);
        }
        .bbs-card:hover {
          border-color: rgba(99, 102, 241, 0.35);
          box-shadow: 0 22px 60px rgba(15, 23, 42, 0.12);
          transform: translateY(-2px);
        }
        .bbs-card:focus-visible{
          outline: none;
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.22), 0 22px 60px rgba(15, 23, 42, 0.12);
        }
        .bbs-icon {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          background: rgba(230, 240, 255, 0.95);
          color: rgba(37, 99, 235, 0.95);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          transition: all 0.25s ease;
          flex-shrink: 0;
        }
        .bbs-card--a1 .bbs-icon{ background: rgba(254, 172, 30, 0.20); color: #9a5b00; }
        .bbs-card--a2 .bbs-icon{ background: rgba(255, 241, 188, 0.75); color: #8a5a00; }
        .bbs-card--a3 .bbs-icon{ background: rgba(114, 9, 183, 0.12); color: #7209b7; }
        .bbs-card--a4 .bbs-icon{ background: rgba(46, 196, 182, 0.14); color: #0f766e; }
        .bbs-card--a5 .bbs-icon{ background: rgba(230, 240, 255, 0.95); color: #2563eb; }
        .bbs-card--a6 .bbs-icon{ background: rgba(76, 201, 240, 0.18); color: #0284c7; }

        .bbs-card:hover .bbs-icon{
          transform: translateY(-1px);
          filter: saturate(1.05);
        }
        .bbs-cardText { min-width: 0; }
        .bbs-label {
          font-size: 0.98rem;
          font-weight: 700;
          color: var(--color-text-primary, #0f172a);
        }
        .bbs-desc {
          margin-top: 6px;
          font-size: 0.85rem;
          color: var(--color-text-secondary, #64748b);
          line-height: 1.5;
        }
        .bbs-actions {
          display: flex;
          gap: 14px;
          justify-content: flex-start;
          flex-wrap: wrap;
        }
        .bbs-more {
          height: 40px;
          border: 1px solid rgba(99, 102, 241, 0.35);
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.95), rgba(56, 189, 248, 0.90));
          border-radius: 999px;
          padding: 0 18px;
          font-weight: 800;
          color: #fff;
          cursor: pointer;
          transition: background 0.2s ease, transform 0.2s ease, border-color 0.2s ease;
          font-family: var(--font-sans);
          box-shadow: 0 12px 30px rgba(99, 102, 241, 0.22);
        }
        .bbs-more:hover {
          filter: saturate(1.05) brightness(0.98);
          transform: translateY(-1px);
          border-color: transparent;
        }
      `}</style>
    </section>
  );
}
