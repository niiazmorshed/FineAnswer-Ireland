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
  { icon: <FaCogs />, label: "Engineering", category: "Computing, IT & Engineering" },
  { icon: <FaLaptopCode />, label: "Computing", category: "Computing, IT & Engineering" },
  { icon: <FaBriefcase />, label: "Business", category: "Business, Management & Law" },
  { icon: <FaBalanceScale />, label: "Law", category: "Business, Management & Law" },
  { icon: <FaCalculator />, label: "Mathematics", category: "Others" },
  { icon: <FaUsers />, label: "Social Sciences", category: "Social Sciences" },
  { icon: <FaLanguage />, label: "English", category: "Education & Media" },
  { icon: <FaPalette />, label: "Arts", category: "Others" },
  { icon: <FaHeartbeat />, label: "Allied Health", category: "Life Sciences & Health" },
  { icon: <FaLayerGroup />, label: "Foundation", category: "Others" },
  { icon: <FaFileInvoiceDollar />, label: "Accounting", category: "Business, Management & Law" },
  { icon: <FaFlask />, label: "Science", category: "Life Sciences & Health" },
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
    <section className="bbs-section">
      <div className="bbs-inner">
        <div className="bbs-header">
          <span className="section-badge">Explore</span>
          <h2 className="bbs-title">Browse by Subject</h2>
          <p className="bbs-subtitle">
            Find programs across Ireland&apos;s top institutions by field of study
          </p>
        </div>

        <div className="bbs-grid">
          {SUBJECTS.map((s) => (
            <button
              key={s.label}
              className="bbs-card"
              onClick={() => handleClick(s.category)}
              type="button"
            >
              <span className="bbs-icon">{s.icon}</span>
              <span className="bbs-label">{s.label}</span>
            </button>
          ))}
        </div>

        <div className="bbs-actions">
          <button
            className="btn-outline"
            onClick={() => navigate("/search-results?country=Ireland")}
          >
            Universities
          </button>
          <button
            className="btn-outline"
            onClick={() => navigate("/search-results?country=Ireland")}
          >
            Scholarships
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
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
        }
        .bbs-header {
          text-align: center;
          margin-bottom: 40px;
        }
        .bbs-title {
          font-size: var(--text-h2);
          font-weight: var(--weight-bold);
          color: var(--color-text-primary);
          margin-bottom: 8px;
        }
        .bbs-subtitle {
          color: var(--color-text-secondary);
          font-size: 1rem;
          max-width: 480px;
          margin: 0 auto;
        }
        .bbs-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 14px;
          margin-bottom: 32px;
        }
        @media (max-width: 1024px) {
          .bbs-grid { grid-template-columns: repeat(4, 1fr); }
        }
        @media (max-width: 640px) {
          .bbs-grid { grid-template-columns: repeat(3, 1fr); gap: 10px; }
        }
        .bbs-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 24px 12px;
          background: var(--color-bg-white);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-card);
          cursor: pointer;
          transition: all 0.25s ease;
          font-family: var(--font-sans);
          box-shadow: var(--shadow-card);
        }
        .bbs-card:hover {
          border-color: var(--color-primary);
          box-shadow: var(--shadow-card-hover);
          transform: translateY(-3px);
        }
        .bbs-card:hover .bbs-icon {
          background: var(--color-primary);
          color: #fff;
        }
        .bbs-icon {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: var(--color-primary-light);
          color: var(--color-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.15rem;
          transition: all 0.25s ease;
        }
        .bbs-label {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--color-text-primary);
          text-align: center;
        }
        .bbs-actions {
          display: flex;
          gap: 14px;
          justify-content: center;
          flex-wrap: wrap;
        }
        .bbs-actions .btn-outline {
          padding: 10px 28px;
          font-size: 0.9375rem;
        }
      `}</style>
    </section>
  );
}
