import React from "react";
import { useNavigate } from "react-router-dom";
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
        <div className="bbs-header">
          <h2 className="bbs-title">Browse by Subject</h2>
        </div>

        <div className="bbs-grid">
          {SUBJECTS.map((s) => (
            <button
              key={s.label}
              className="bbs-card"
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

      <style>{`
        .bbs-section {
          padding: var(--section-padding) 0;
          background: var(--color-bg-white);
        }
        @media (max-width: 768px) {
          .bbs-section { padding: var(--section-padding-mobile) 0; }
        }
        .bbs-inner {
          max-width: 1120px;
          margin: 0 auto;
          padding: 0 24px;
        }
        .bbs-header {
          text-align: center;
          margin-bottom: 28px;
        }
        .bbs-title {
          font-size: var(--text-h2);
          font-weight: var(--weight-bold);
          color: var(--color-text-primary);
          margin-bottom: 8px;
        }
        .bbs-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
          margin-bottom: 24px;
        }
        @media (max-width: 1024px) {
          .bbs-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 820px) {
          .bbs-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 520px) {
          .bbs-grid { grid-template-columns: 1fr; }
        }
        .bbs-card {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          padding: 22px 20px;
          background: #fff;
          border: 1px solid rgba(226, 232, 240, 0.9);
          border-radius: 18px;
          cursor: pointer;
          transition: all 0.25s ease;
          font-family: var(--font-sans);
          box-shadow: 0 10px 28px rgba(15, 23, 42, 0.06);
          text-align: left;
        }
        .bbs-card:hover {
          border-color: rgba(73, 29, 110, 0.25);
          box-shadow: 0 18px 44px rgba(15, 23, 42, 0.09);
          transform: translateY(-2px);
        }
        .bbs-card:hover .bbs-icon {
          background: rgba(73, 29, 110, 0.1);
          color: #491d6e;
        }
        .bbs-icon {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          background: rgba(73, 29, 110, 0.08);
          color: #491d6e;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          transition: all 0.25s ease;
          flex-shrink: 0;
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
          justify-content: center;
          flex-wrap: wrap;
        }
        .bbs-more {
          border: 1px solid rgba(226, 232, 240, 0.9);
          background: #fff;
          border-radius: 999px;
          padding: 12px 22px;
          font-weight: 700;
          color: #491d6e;
          cursor: pointer;
          transition: background 0.2s ease, transform 0.2s ease, border-color 0.2s ease;
          font-family: var(--font-sans);
          box-shadow: 0 10px 24px rgba(15, 23, 42, 0.06);
        }
        .bbs-more:hover {
          background: #ffda32;
          color: #0f172a;
          transform: translateY(-1px);
          border-color: rgba(255, 218, 50, 0.7);
        }
      `}</style>
    </section>
  );
}
