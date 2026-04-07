import { useNavigate } from "react-router-dom";

export default function AboutUs() {
  const navigate = useNavigate();

  return (
    <section className="about-section" id="about">
      <div className="about-container">

        {/* Header */}
        <div className="about-header">
          <span className="about-badge">About FineAnswer Ireland</span>
          <h2>
            Your Trusted Partner for<br />
            <span>Studying in Ireland</span>
          </h2>
          <p>
            We guide students from UAE, India, Bangladesh, Brazil and South Asia
            through every step of their Irish education journey — from choosing
            the right university to landing in Dublin.
          </p>
        </div>

        {/* Content grid */}
        <div className="about-grid">
          <div className="about-card about-story">
            <h3>Who We Are</h3>
            <p>
              <strong>FineAnswer Ireland</strong> is a leading study-abroad
              consultancy helping international students access Ireland's
              world-class universities. Our team of experienced counsellors
              provides personalised guidance, from course selection right
              through to visa approval and pre-departure support.
            </p>
            <p>
              With a network of 20+ partner institutions across Ireland and a
              proven track record of successful placements, we make your dream
              of studying in Ireland a reality.
            </p>
            <button
              className="about-learn-btn"
              onClick={() => navigate("/read-more-info")}
            >
              Learn More About Us →
            </button>
          </div>

          <div className="about-features">
            <div className="feature-card">
              <span className="feature-icon">🎓</span>
              <h4>20+ Partner Institutions</h4>
              <p>Access to Ireland's top universities and colleges through our verified partner network.</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">📋</span>
              <h4>End-to-End Service</h4>
              <p>From course shortlisting to visa guidance and pre-departure briefing — we handle it all.</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">🌍</span>
              <h4>Global Student Base</h4>
              <p>Serving students from UAE, India, Bangladesh, Brazil, Kuwait, Qatar and Saudi Arabia.</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">💬</span>
              <h4>Expert Counsellors</h4>
              <p>Our team provides honest, personalised advice tailored to each student's profile and goals.</p>
            </div>
          </div>
        </div>

        {/* Vision & Mission */}
        <div className="about-vm">
          <div className="vm-card">
            <h3>Our Vision</h3>
            <p>
              To become the most trusted study-abroad consultancy for students
              across the Middle East, South Asia and Latin America seeking
              quality education in Ireland.
            </p>
          </div>
          <div className="vm-card">
            <h3>Our Mission</h3>
            <p>
              To deliver transparent, student-first consultancy services by
              providing accurate information, personalised support, and a
              seamless application experience from first enquiry to final enrolment.
            </p>
          </div>
        </div>

      </div>

      <style>{`
        .about-section {
          padding: var(--section-padding, 80px) 0;
          background: var(--color-bg-white, #fff);
          position: relative;
          overflow: hidden;
        }
        @media (max-width: 768px) {
          .about-section { padding: var(--section-padding-mobile, 48px) 0; }
        }

        .about-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
        }

        /* ── Header ── */
        .about-header {
          text-align: center;
          margin-bottom: 56px;
        }
        .about-badge {
          display: inline-block;
          background: var(--color-primary-light, #e6f7f0);
          color: var(--color-primary, #00875a);
          padding: 5px 18px;
          border-radius: 50px;
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin-bottom: 16px;
        }
        .about-header h2 {
          font-size: clamp(1.75rem, 3.5vw, 2.25rem);
          font-weight: 700;
          color: var(--color-text-primary, #1A1A1A);
          line-height: 1.25;
          margin-bottom: 14px;
        }
        .about-header h2 span {
          color: var(--color-primary, #00875a);
        }
        .about-header p {
          font-size: 1rem;
          color: var(--color-text-secondary, #555);
          max-width: 580px;
          margin: 0 auto;
          line-height: 1.65;
        }

        /* ── Grid ── */
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
          margin-bottom: 40px;
          align-items: start;
        }
        @media (max-width: 900px) {
          .about-grid { grid-template-columns: 1fr; }
        }

        /* ── Story card ── */
        .about-story {
          background: var(--color-primary, #00875a);
          color: #fff;
          border-radius: 12px;
          padding: 36px 32px;
        }
        .about-story h3 {
          font-size: 1.25rem;
          font-weight: 700;
          color: #fff;
          margin-bottom: 16px;
        }
        .about-story p {
          color: rgba(255,255,255,0.85);
          font-size: 0.9375rem;
          line-height: 1.7;
          margin-bottom: 14px;
        }
        .about-story strong { color: #fff; }

        .about-learn-btn {
          margin-top: 10px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 11px 22px;
          border-radius: 6px;
          border: 2px solid rgba(255,255,255,0.5);
          background: rgba(255,255,255,0.12);
          color: #fff;
          font-size: 0.875rem;
          font-weight: 600;
          cursor: pointer;
          font-family: var(--font-sans, inherit);
          transition: all 0.2s;
        }
        .about-learn-btn:hover {
          background: #fff;
          color: var(--color-primary, #00875a);
          border-color: #fff;
        }

        /* ── Feature cards ── */
        .about-features {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        @media (max-width: 480px) {
          .about-features { grid-template-columns: 1fr; }
        }

        .feature-card {
          background: var(--color-bg-light, #F8F9FA);
          border: 1px solid var(--color-border, #E0E0E0);
          border-radius: 10px;
          padding: 22px 20px;
          transition: all 0.25s;
        }
        .feature-card:hover {
          border-color: var(--color-primary, #00875a);
          box-shadow: 0 4px 16px rgba(0,135,90,0.1);
          transform: translateY(-2px);
        }
        .feature-icon {
          font-size: 1.5rem;
          display: block;
          margin-bottom: 10px;
        }
        .feature-card h4 {
          font-size: 0.9375rem;
          font-weight: 700;
          color: var(--color-text-primary, #1A1A1A);
          margin-bottom: 6px;
        }
        .feature-card p {
          font-size: 0.8125rem;
          color: var(--color-text-secondary, #555);
          line-height: 1.55;
          margin: 0;
        }

        /* ── Vision & Mission ── */
        .about-vm {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          margin-top: 8px;
        }
        @media (max-width: 640px) {
          .about-vm { grid-template-columns: 1fr; }
        }

        .vm-card {
          background: var(--color-primary-light, #e6f7f0);
          border: 1px solid rgba(0,135,90,0.15);
          border-radius: 10px;
          padding: 28px 26px;
        }
        .vm-card h3 {
          font-size: 1.0625rem;
          font-weight: 700;
          color: var(--color-primary-dark, #0a5c4d);
          margin-bottom: 10px;
        }
        .vm-card p {
          font-size: 0.9rem;
          color: var(--color-text-secondary, #555);
          line-height: 1.65;
          margin: 0;
        }
      `}</style>
    </section>
  );
}
