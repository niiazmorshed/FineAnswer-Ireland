import React from "react";
import { useNavigate } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import "./PackagesSection.css";

const PACKAGES = [
  {
    key: "basic",
    badge: null,
    name: "Basic",
    tag: "Free Forever",
    price: "Free",
    priceSubtext: null,
    accent: "var(--color-text-secondary)",
    cta: { label: "Get Started", type: "outline", action: "register" },
    features: [
      "Free profile eligibility check",
      "Course browsing & shortlisting tool",
      "University & country information",
      "Public scholarship listings",
      "IELTS & English test guides",
      "Ireland student visa overview",
      "Student community access",
      "Email support (48hr response)",
    ],
  },
  {
    key: "gold",
    badge: "Most Popular",
    name: "Gold",
    tag: "Guided Support",
    price: "Contact Us",
    priceSubtext: "Custom pricing per student",
    accent: "var(--color-gold)",
    cta: { label: "Apply for Gold", type: "gold", action: "contact" },
    features: [
      "Everything in Basic",
      "1-on-1 counseling (up to 3 sessions)",
      "Personalized course & university recommendations",
      "Applications to up to 3 universities",
      "SOP review & detailed feedback",
      "Document checklist & preparation guidance",
      "Offer letter follow-up with partner universities",
      "Scholarship matching & application help",
      "Visa application guidance & document review",
      "Priority WhatsApp & email support",
      "Pre-departure information pack",
    ],
  },
  {
    key: "premium",
    badge: "Full Service",
    name: "Premium",
    tag: "Done For You",
    price: "Contact Us",
    priceSubtext: "Full end-to-end service",
    accent: "var(--color-primary)",
    cta: { label: "Apply for Premium", type: "primary", action: "contact" },
    features: [
      "Everything in Gold",
      "Unlimited counseling sessions",
      "Applications to unlimited universities",
      "Full SOP writing by our experts",
      "Complete visa file preparation & submission",
      "Scholarship negotiation on your behalf",
      "Accommodation search & booking assistance",
      "Airport pickup arrangement in Ireland",
      "Health insurance guidance & enrollment",
      "Part-time job orientation (post-arrival)",
      "Dedicated personal counselor (direct phone)",
      "Post-arrival support for first 30 days",
      "Exclusive alumni network access",
    ],
  },
];

function scrollToContact() {
  const el = document.getElementById("contact");
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function PackagesSection() {
  const navigate = useNavigate();

  const handleCta = (action) => {
    if (action === "register") {
      navigate("/register");
      return;
    }
    scrollToContact();
  };

  return (
    <section id="packages" className="packages-section">
      <div className="packages-container">
        <div className="packages-header">
          <h2 className="packages-title">Choose Your Plan</h2>
          <p className="packages-subtitle">
            Whether you&apos;re just exploring or ready to apply — we have a package
            that fits your journey.
          </p>
        </div>

        <div className="packages-grid">
          {PACKAGES.map((plan) => (
            <div
              key={plan.key}
              className={`package-card ${plan.key === "gold" ? "package-card--featured" : ""} package-card--${plan.key}`}
            >
              {plan.badge ? (
                <div className="package-badge" style={{ backgroundColor: plan.accent }}>
                  {plan.badge}
                </div>
              ) : null}

              <div className="package-top">
                <div className="package-name" style={{ color: plan.accent }}>
                  {plan.name}
                </div>
                <div className="package-tag">{plan.tag}</div>
                <div className="package-price">{plan.price}</div>
                {plan.priceSubtext ? (
                  <div className="package-price-subtext">{plan.priceSubtext}</div>
                ) : null}
              </div>

              <div className="package-divider" />

              <ul className="package-features">
                {plan.features.map((f) => (
                  <li key={f} className="package-feature">
                    <span className="feature-check" aria-hidden="true">
                      <FaCheck size={10} />
                    </span>
                    <span className="feature-text">{f}</span>
                  </li>
                ))}
              </ul>

              <div className="package-spacer" />

              <button
                type="button"
                className={`package-cta ${
                  plan.cta.type === "outline"
                    ? "package-cta--outline"
                    : plan.cta.type === "gold"
                      ? "package-cta--gold"
                      : "package-cta--primary"
                }`}
                onClick={() => handleCta(plan.cta.action)}
              >
                {plan.cta.label}
              </button>
            </div>
          ))}
        </div>

        <div className="packages-note">
          All plans include access to FineAnswer Ireland&apos;s partner network of 20+
          Irish institutions. Prices for Gold and Premium are determined after a
          free initial assessment.
        </div>
      </div>
    </section>
  );
}

