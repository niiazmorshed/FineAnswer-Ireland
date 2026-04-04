import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";

const quickLinks = [
  { label: "Home",          to: "/" },
  { label: "About Us",      to: "/#about" },
  { label: "Services",      to: "/#services" },
  { label: "Packages",      to: "/#packages" },
  { label: "Blog",          to: "/blog" },
  { label: "Career",        to: "/career" },
  { label: "Contact",       to: "/#contact" },
];

const studyLinks = [
  { label: "Study in Ireland",   to: "/ireland" },
  { label: "Study in UK",        to: "/uk" },
  { label: "Study in Australia", to: "/australia" },
  { label: "Search Courses",     to: "/search-results" },
  { label: "English Proficiency",to: "/dashboard/english-proficiency" },
  { label: "Document Checklist", to: "/dashboard/documentchecklist" },
];

const socialLinks = [
  { icon: <FaFacebookF size={15} />, href: "https://www.facebook.com/FineAnswerStudyAbroad", label: "Facebook" },
  { icon: <FaInstagram size={15} />, href: "https://www.instagram.com/fineanswer/",          label: "Instagram" },
  { icon: <FaLinkedinIn size={15} />, href: "https://www.linkedin.com/company/fineanswer/",  label: "LinkedIn" },
  { icon: <FaYoutube size={16} />,   href: "https://www.youtube.com/@FineAnswerStudyAbroad", label: "YouTube" },
  { icon: <FaWhatsapp size={15} />,  href: "https://wa.me/353899893525",                     label: "WhatsApp" },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">

        {/* Col 1 — Brand */}
        <div className="footer-col footer-col--brand">
          <h3 className="footer-brand-name">FineAnswer Ireland</h3>
          <p className="footer-tagline">
            Your trusted partner for studying abroad in Ireland and beyond.
            We guide students from Bangladesh, UAE, India, Brasil and South
            Asia at every step of their academic journey.
          </p>

          <div className="footer-contact-list">
            <a href="tel:+353899893525" className="footer-contact-item">
              <FaPhone size={13} />
              <span>+353 899 893 525</span>
            </a>
            <a href="mailto:info@fineanswer.ie" className="footer-contact-item">
              <FaEnvelope size={13} />
              <span>info@fineanswer.ie</span>
            </a>
            <div className="footer-contact-item footer-contact-item--addr">
              <FaMapMarkerAlt size={14} />
              <span>Dublin, Ireland</span>
            </div>
          </div>

          <div className="footer-socials">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="footer-social-icon"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Col 2 — Quick Links */}
        <div className="footer-col">
          <h4 className="footer-col-title">Quick Links</h4>
          <ul className="footer-link-list">
            {quickLinks.map((l) => (
              <li key={l.label}>
                <Link to={l.to} className="footer-link">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3 — Study Destinations */}
        <div className="footer-col">
          <h4 className="footer-col-title">Study Destinations</h4>
          <ul className="footer-link-list">
            {studyLinks.map((l) => (
              <li key={l.label}>
                <Link to={l.to} className="footer-link">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4 — Newsletter / CTA */}
        <div className="footer-col footer-col--cta">
          <h4 className="footer-col-title">Stay Updated</h4>
          <p className="footer-cta-text">
            Subscribe for the latest scholarship alerts, university updates,
            and study abroad tips delivered to your inbox.
          </p>
          <form className="footer-newsletter" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Your email address"
              className="footer-email-input"
              aria-label="Email address"
            />
            <button type="submit" className="footer-subscribe-btn">
              Subscribe
            </button>
          </form>

          <Link to="/register" className="footer-apply-btn">
            Apply Now →
          </Link>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <span>© {new Date().getFullYear()} FineAnswer Ireland. All rights reserved.</span>
          <div className="footer-bottom-links">
            <Link to="/" className="footer-bottom-link">Privacy Policy</Link>
            <span className="footer-bottom-sep">·</span>
            <Link to="/" className="footer-bottom-link">Terms of Service</Link>
          </div>
        </div>
      </div>

      <style>{`
        /* ── Footer shell ───────────────────────────────── */
        .site-footer {
          background: #1A1A1A;
          color: rgba(255,255,255,0.7);
          font-family: var(--font-sans);
        }

        .footer-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 72px 24px 48px;
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1.4fr;
          gap: 48px;
        }

        /* ── Brand column ───────────────────────────────── */
        .footer-brand-name {
          font-size: 1.375rem;
          font-weight: 700;
          color: #fff;
          margin-bottom: 14px;
        }
        .footer-tagline {
          font-size: 0.875rem;
          line-height: 1.65;
          color: rgba(255,255,255,0.6);
          margin-bottom: 24px;
        }

        .footer-contact-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 24px;
        }
        .footer-contact-item {
          display: flex;
          align-items: center;
          gap: 10px;
          color: rgba(255,255,255,0.65);
          text-decoration: none;
          font-size: 0.875rem;
          transition: color 0.2s;
        }
        .footer-contact-item:hover { color: #fff; }
        .footer-contact-item--addr { cursor: default; }

        .footer-socials {
          display: flex;
          gap: 10px;
        }
        .footer-social-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.2);
          color: rgba(255,255,255,0.65);
          text-decoration: none;
          transition: background 0.2s, border-color 0.2s, color 0.2s, transform 0.2s;
        }
        .footer-social-icon:hover {
          background: var(--color-primary, #00693E);
          border-color: var(--color-primary, #00693E);
          color: #fff;
          transform: translateY(-2px);
        }

        /* ── Generic column ─────────────────────────────── */
        .footer-col-title {
          font-size: 0.9375rem;
          font-weight: 600;
          color: #fff;
          margin-bottom: 18px;
          letter-spacing: 0.02em;
        }

        .footer-link-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .footer-link {
          color: rgba(255,255,255,0.6);
          text-decoration: none;
          font-size: 0.875rem;
          transition: color 0.2s;
        }
        .footer-link:hover { color: var(--color-gold, #F5A623); }

        /* ── CTA / newsletter column ────────────────────── */
        .footer-cta-text {
          font-size: 0.875rem;
          color: rgba(255,255,255,0.6);
          line-height: 1.6;
          margin-bottom: 18px;
        }

        .footer-newsletter {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 20px;
        }
        .footer-email-input {
          width: 100%;
          padding: 11px 14px;
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: var(--radius-btn, 4px);
          background: rgba(255,255,255,0.07);
          color: #fff;
          font-size: 0.875rem;
          font-family: var(--font-sans);
          outline: none;
          transition: border-color 0.2s;
        }
        .footer-email-input::placeholder { color: rgba(255,255,255,0.35); }
        .footer-email-input:focus { border-color: var(--color-primary, #00693E); }

        .footer-subscribe-btn {
          padding: 11px 20px;
          background: var(--color-primary, #00693E);
          color: #fff;
          border: none;
          border-radius: var(--radius-btn, 4px);
          font-size: 0.875rem;
          font-weight: 600;
          font-family: var(--font-sans);
          cursor: pointer;
          transition: background 0.2s;
          width: 100%;
        }
        .footer-subscribe-btn:hover { background: var(--color-primary-dark, #004D2C); }

        .footer-apply-btn {
          display: inline-block;
          padding: 11px 20px;
          border: 1px solid var(--color-gold, #F5A623);
          color: var(--color-gold, #F5A623);
          border-radius: var(--radius-btn, 4px);
          font-size: 0.875rem;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.2s;
          width: 100%;
          text-align: center;
        }
        .footer-apply-btn:hover {
          background: var(--color-gold, #F5A623);
          color: #fff;
        }

        /* ── Bottom bar ─────────────────────────────────── */
        .footer-bottom {
          border-top: 1px solid rgba(255,255,255,0.08);
          background: #111111;
        }
        .footer-bottom-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 18px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.8125rem;
          color: rgba(255,255,255,0.45);
          gap: 12px;
          flex-wrap: wrap;
        }
        .footer-bottom-links {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .footer-bottom-link {
          color: rgba(255,255,255,0.45);
          text-decoration: none;
          transition: color 0.2s;
        }
        .footer-bottom-link:hover { color: rgba(255,255,255,0.8); }
        .footer-bottom-sep { color: rgba(255,255,255,0.25); }

        /* ── Responsive ─────────────────────────────────── */
        @media (max-width: 1024px) {
          .footer-inner {
            grid-template-columns: 1fr 1fr;
            gap: 36px;
          }
          .footer-col--brand { grid-column: 1 / -1; }
        }
        @media (max-width: 640px) {
          .footer-inner {
            grid-template-columns: 1fr;
            padding: 48px 20px 36px;
            gap: 28px;
          }
          .footer-col--brand { grid-column: auto; }
          .footer-bottom-inner { flex-direction: column; text-align: center; }
        }
      `}</style>
    </footer>
  );
}
