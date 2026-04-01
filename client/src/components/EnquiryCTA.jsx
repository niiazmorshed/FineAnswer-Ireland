import React from "react";

export default function EnquiryCTA() {
  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="enquiry-cta">
      <div className="enquiry-cta__inner">
        <h2>Submit Your Enquiry</h2>
        <p>
          Ready to take the next step in your educational journey? Complete our
          quick enquiry form and our team will get back to you with personalized
          guidance and information.
        </p>
        <div className="enquiry-cta__buttons">
          <button className="enquiry-cta__btn-white" onClick={scrollToContact}>
            Submit Your Enquiry Now →
          </button>
          <button
            className="enquiry-cta__btn-outline"
            onClick={() => window.open("https://wa.me/353899893525", "_blank", "noopener,noreferrer")}
          >
            WhatsApp Us
          </button>
        </div>
      </div>

      <style>{`
        .enquiry-cta {
          background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%);
          padding: var(--section-padding) 0;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        @media (max-width: 768px) {
          .enquiry-cta { padding: var(--section-padding-mobile) 0; }
        }
        .enquiry-cta__inner {
          max-width: 720px;
          margin: 0 auto;
          padding: 0 24px;
          position: relative;
          z-index: 1;
        }
        .enquiry-cta h2 {
          color: #fff;
          font-size: var(--text-h2);
          font-weight: var(--weight-bold);
          margin-bottom: 16px;
        }
        .enquiry-cta p {
          color: rgba(255,255,255,0.82);
          font-size: 1.05rem;
          line-height: 1.7;
          margin-bottom: 28px;
        }
        .enquiry-cta__buttons {
          display: flex;
          gap: 14px;
          justify-content: center;
          flex-wrap: wrap;
        }
        .enquiry-cta__btn-white {
          padding: 14px 32px;
          border-radius: var(--radius-btn);
          border: 2px solid #fff;
          background: #fff;
          color: var(--color-primary);
          font-weight: 600;
          font-family: var(--font-sans);
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.2s;
        }
        .enquiry-cta__btn-white:hover {
          background: transparent;
          color: #fff;
          transform: translateY(-1px);
        }
        .enquiry-cta__btn-outline {
          padding: 14px 32px;
          border-radius: var(--radius-btn);
          border: 2px solid rgba(255,255,255,0.6);
          background: transparent;
          color: #fff;
          font-weight: 600;
          font-family: var(--font-sans);
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.2s;
        }
        .enquiry-cta__btn-outline:hover {
          border-color: #fff;
          background: rgba(255,255,255,0.1);
          transform: translateY(-1px);
        }
      `}</style>
    </section>
  );
}
