import React from "react";
import {
  FaGraduationCap,
  FaRoute,
  FaChild,
  FaClipboardCheck,
  FaShieldAlt,
  FaMicrophoneAlt,
  FaStethoscope,
  FaUserFriends,
} from "react-icons/fa";

const LINKS = [
  { icon: <FaGraduationCap />, title: "Post Study", to: "/poststudy" },
  { icon: <FaRoute />, title: "Pathways", to: "/pathway" },
  { icon: <FaChild />, title: "Under 18 Students", to: "/under18" },
  {
    icon: <FaClipboardCheck />,
    title: "Entry Requirements",
    to: "/entry-requirements",
  },
  { icon: <FaShieldAlt />, title: "Health Insurance", to: "/health-insurance" },
  {
    icon: <FaMicrophoneAlt />,
    title: "English Tests",
    to: "/english-tests",
  },
  {
    icon: <FaStethoscope />,
    title: "Study Medicine",
    to: "/study-medicine",
  },
  { icon: <FaUserFriends />, title: "Dependent Visa", to: "/dependent-visa" },
];

export default function QuickLinks() {
  return (
    <section className="ql-section">
      <div className="ql-inner">
        <div className="ql-header">
          <span className="section-badge">Resources</span>
          <h2 className="ql-title">Quick Links</h2>
        </div>

        <div className="ql-grid">
          {LINKS.map((l) => (
            <a
              key={l.title}
              href={l.to}
              className="ql-card"
              target="_blank"
              rel="noopener noreferrer"
              title={`${l.title} — opens in a new tab`}
              aria-label={`${l.title} (opens in new tab)`}
            >
              <span className="ql-icon">{l.icon}</span>
              <span className="ql-card-title">{l.title}</span>
              <span className="ql-arrow">→</span>
            </a>
          ))}
        </div>
      </div>

      <style>{`
        .ql-section {
          padding: var(--section-padding) 0;
          background: var(--color-bg-light);
        }
        @media (max-width: 768px) {
          .ql-section { padding: var(--section-padding-mobile) 0; }
        }
        .ql-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
        }
        .ql-header {
          text-align: center;
          margin-bottom: 36px;
        }
        .ql-title {
          font-size: var(--text-h2);
          font-weight: var(--weight-bold);
          color: var(--color-text-primary);
        }
        .ql-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        @media (max-width: 1024px) {
          .ql-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 480px) {
          .ql-grid { grid-template-columns: 1fr; }
        }
        .ql-card {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 20px 22px;
          background: var(--color-bg-white);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-card);
          cursor: pointer;
          transition: all 0.25s ease;
          font-family: var(--font-sans);
          text-align: left;
          box-shadow: var(--shadow-card);
          text-decoration: none;
          color: inherit;
        }
        .ql-card:hover {
          border-color: var(--color-primary);
          box-shadow: var(--shadow-card-hover);
          transform: translateY(-3px);
        }
        .ql-card:hover .ql-icon {
          background: var(--color-primary);
          color: #fff;
        }
        .ql-card:hover .ql-arrow {
          color: var(--color-primary);
          transform: translateX(4px);
        }
        .ql-icon {
          width: 42px;
          height: 42px;
          border-radius: var(--radius-card);
          background: var(--color-primary-light);
          color: var(--color-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
          flex-shrink: 0;
          transition: all 0.25s ease;
        }
        .ql-card-title {
          flex: 1;
          font-size: 0.9375rem;
          font-weight: 600;
          color: var(--color-text-primary);
        }
        .ql-arrow {
          font-size: 1rem;
          color: var(--color-text-muted);
          transition: all 0.25s ease;
          flex-shrink: 0;
        }
      `}</style>
    </section>
  );
}
