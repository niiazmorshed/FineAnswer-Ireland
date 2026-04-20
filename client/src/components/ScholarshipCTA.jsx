import React from "react";
import { useNavigate } from "react-router-dom";

export default function ScholarshipCTA() {
  const navigate = useNavigate();

  return (
    <section className="scholarship-cta">
      <div className="scholarship-cta__inner">
        <div className="scholarship-cta__content">
          <h2>Get Your Scholarship</h2>
          <p>
            FineAnswer Ireland assists international students with various
            scholarship programs. There are hundreds of scholarships available
            from the Government of Ireland, Irish higher education institutions,
            and other organisations.
          </p>
          <button
            className="btn-gold"
            onClick={() => navigate("/blog")}
          >
            View Scholarships →
          </button>
        </div>
      </div>

      <style>{`
        .scholarship-cta {
          background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%);
          padding: var(--section-padding) 0;
          position: relative;
          overflow: hidden;
        }
        @media (max-width: 768px) {
          .scholarship-cta { padding: var(--section-padding-mobile) 0; }
        }
        .scholarship-cta::after {
          content: "";
          position: absolute;
          inset: 0;
          opacity: 0.06;
          pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Ccircle cx='200' cy='200' r='180' fill='none' stroke='white' stroke-width='0.5'/%3E%3Ccircle cx='200' cy='200' r='130' fill='none' stroke='white' stroke-width='0.5'/%3E%3Ccircle cx='200' cy='200' r='80' fill='none' stroke='white' stroke-width='0.5'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right -80px center;
          background-size: 480px;
        }
        .scholarship-cta__inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
          position: relative;
          z-index: 1;
        }
        .scholarship-cta__content {
          max-width: 680px;
        }
        .scholarship-cta__content h2 {
          color: #fff;
          font-size: var(--text-h2);
          font-weight: var(--weight-bold);
          margin-bottom: 16px;
        }
        .scholarship-cta__content p {
          color: rgba(255,255,255,0.82);
          font-size: 1.05rem;
          line-height: 1.7;
          margin-bottom: 28px;
        }
      `}</style>
    </section>
  );
}
