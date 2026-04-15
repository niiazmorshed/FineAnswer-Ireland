import React from "react";
import { useNavigate } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import "./PackagesSection.css";

const PACKAGES = [
  {
    key: "basic",
    eyebrow: "Starter",
    name: "Basic",
    nameAccent: "",
    tagline: "Free Forever",
    priceDisplay: "Free",
    priceUnit: null,
    cta: { label: "Get Started", variant: "outline", action: "register" },
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
    backTitle: "Best for",
    backBody:
      "Students who want to explore options and get started quickly with basic guidance and tools.",
  },
  {
    key: "gold",
    eyebrow: "Guided Support",
    name: "Gold",
    nameAccent: "",
    tagline: "Most Popular",
    priceDisplay: "Contact Us",
    priceUnit: "Custom pricing per student",
    cta: { label: "Apply for Gold", variant: "primary", action: "contact" },
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
    backTitle: "Includes",
    backBody:
      "Guided support, structured checklists, and priority support—ideal if you’re ready to start applying seriously.",
  },
  {
    key: "premium",
    eyebrow: "Done For You",
    name: "Premium",
    nameAccent: "",
    tagline: "Full Service",
    priceDisplay: "Contact Us",
    priceUnit: "Full end-to-end service",
    cta: { label: "Apply for Premium", variant: "outline", action: "contact" },
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
    backTitle: "Made for",
    backBody:
      "Applicants who want end-to-end support with a dedicated counselor and full visa + SOP handling.",
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
            Transparent pricing and guided support — pick a plan that matches your Ireland journey.
          </p>
        </div>

        <div className="packages-grid">
          {PACKAGES.map((plan) => (
            <div key={plan.key} className={`plan-wrap ${plan.key === "gold" ? "plan-wrap--featured" : ""}`}>
              {plan.badge ? <div className="plan-badge">{plan.badge}</div> : null}

              <div className={`plan-card plan-card--${plan.key}`}>
                <div className="plan-meta">
                  <div className="plan-eyebrow">{plan.eyebrow}</div>
                </div>

                <div className="plan-name">
                  {plan.name}
                  {plan.nameAccent ? <span className="plan-nameAccent">{plan.nameAccent}</span> : null}
                </div>
                <div className="plan-tagline">{plan.tagline}</div>

                <div className="plan-ctaRow">
                  <button
                    type="button"
                    className={`plan-cta ${plan.cta.variant === "primary" ? "plan-cta--primary" : "plan-cta--outline"}`}
                    onClick={() => handleCta(plan.cta.action)}
                  >
                    {plan.cta.label}
                  </button>

                  <div className="plan-price">
                    <span className="plan-priceValue">{plan.priceDisplay}</span>
                    {plan.priceUnit ? <span className="plan-priceUnit">{plan.priceUnit}</span> : null}
                  </div>
                </div>

                <div className="plan-divider" />

                <ul className="plan-features" aria-label={`${plan.name} features`}>
                  {plan.features.map((f) => (
                    <li key={f} className="plan-feature">
                      <span className="plan-check" aria-hidden="true">
                        <FaCheck size={10} />
                      </span>
                      <span className="plan-featureText">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
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

