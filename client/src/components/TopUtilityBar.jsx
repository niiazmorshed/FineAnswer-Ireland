import React from "react";
import { FaWhatsapp, FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube, FaEnvelope, FaPhone } from "react-icons/fa";

export default function TopUtilityBar() {
  return (
    <div className="utility-bar">
      <div className="utility-bar__inner">
        {/* Left: contact info */}
        <div className="utility-bar__left">
          <a
            href="https://wa.me/353899893525"
            target="_blank"
            rel="noopener noreferrer"
            className="utility-bar__link"
            aria-label="WhatsApp"
          >
            <FaWhatsapp size={14} />
            <span>+353 899 893 525</span>
          </a>
          <span className="utility-bar__sep">|</span>
          <a
            href="mailto:info@fineanswer.ie"
            className="utility-bar__link"
            aria-label="Email"
          >
            <FaEnvelope size={13} />
            <span>info@fineanswer.ie</span>
          </a>
        </div>

        {/* Right: social icons */}
        <div className="utility-bar__right">
          <a
            href="https://www.facebook.com/FineAnswerStudyAbroad"
            target="_blank"
            rel="noopener noreferrer"
            className="utility-bar__social"
            aria-label="Facebook"
          >
            <FaFacebookF size={13} />
          </a>
          <a
            href="https://www.instagram.com/fineanswer/"
            target="_blank"
            rel="noopener noreferrer"
            className="utility-bar__social"
            aria-label="Instagram"
          >
            <FaInstagram size={13} />
          </a>
          <a
            href="https://www.linkedin.com/company/fineanswer/"
            target="_blank"
            rel="noopener noreferrer"
            className="utility-bar__social"
            aria-label="LinkedIn"
          >
            <FaLinkedinIn size={13} />
          </a>
          <a
            href="https://www.youtube.com/@FineAnswerStudyAbroad"
            target="_blank"
            rel="noopener noreferrer"
            className="utility-bar__social"
            aria-label="YouTube"
          >
            <FaYoutube size={14} />
          </a>
        </div>
      </div>

      <style>{`
        .utility-bar {
          background-color: #491d6e;
          height: 40px;
          width: 100%;
          display: flex;
          align-items: center;
        }
        .utility-bar__inner {
          max-width: 1280px;
          margin: 0 auto;
          width: 100%;
          padding: 0 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .utility-bar__left,
        .utility-bar__right {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .utility-bar__link {
          display: flex;
          align-items: center;
          gap: 6px;
          color: rgba(255,255,255,0.9) !important;
          font-size: 0.8125rem;
          font-weight: 400;
          text-decoration: none;
          transition: color 0.2s;
        }
        .utility-bar__link:hover {
          color: #fff !important;
        }
        .utility-bar__sep {
          color: rgba(255,255,255,0.4);
          font-size: 0.75rem;
        }
        .utility-bar__social {
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255,255,255,0.85) !important;
          transition: color 0.2s, transform 0.2s;
          text-decoration: none;
        }
        .utility-bar__social:hover {
          color: #fff !important;
          transform: translateY(-1px);
        }

        /* Hide on mobile */
        @media (max-width: 768px) {
          .utility-bar {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
