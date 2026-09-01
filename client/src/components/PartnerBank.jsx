import React from "react";
import "./PartnerBank.css";

import britishCouncil from "../assets/british.png";
import bylc from "../assets/bylc.png";
import studyAndProtect from "../assets/studyp.png";
import swisscare from "../assets/swisscare-logo.svg";

/**
 * Strategic partners.
 *
 * The Bangladeshi banks that used to sit here (City Bank, NRBC, Premier) have
 * been removed; what remains is the education and student-insurance side of the
 * partnership list, with Swisscare added.
 *
 * `wide` marks a logo whose artwork is a long wordmark rather than a squarish
 * mark — those need more of the bubble's width to stay legible.
 */
const PARTNERS = [
  { name: "British Council", logo: britishCouncil },
  { name: "Swisscare", logo: swisscare, wide: true },
  { name: "Study & Protect", logo: studyAndProtect },
  { name: "BYLC", logo: bylc },
];

const PartnerBank = () => (
  <section className="partner-bank-section">
    <div className="partner-bank-container">
      {/* Left Side: Content */}
      <div className="partner-content">
        <h4 className="partner-badge">STRATEGIC ALLIANCE</h4>
        <h2 className="partner-title">
          Our Strategic <span>Partners</span>
        </h2>
        <p className="partner-description">
          We work with education bodies, leadership organisations and student
          insurance providers so that everything around your course — cover,
          preparation and support — is arranged in one place rather than five.
        </p>
        <div className="partner-stats">
          <div className="p-stat">
            <strong>10+</strong> Global Partners
          </div>
          <div className="p-stat">
            <strong>100%</strong> Verified Support
          </div>
        </div>
      </div>

      {/* Right Side: floating logo bubbles.
          Positions are a staggered two-column arrangement rather than scattered
          offsets — the previous free placement was tuned for six logos and read
          as random once there were four. */}
      <div className="partner-visual">
        <ul className="bubbles-wrapper">
          {PARTNERS.map((item, index) => (
            <li
              key={item.name}
              className={`bank-bubble p${index + 1}${
                item.wide ? " bank-bubble--wide" : ""
              }`}
            >
              <img src={item.logo} alt={item.name} loading="lazy" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);

export default PartnerBank;
