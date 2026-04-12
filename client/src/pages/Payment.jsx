import React, { useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../config/api";
import { AuthContext } from "./Provider/ContextProvider";
import Navbar3 from "../components/navbar3";
import "./Payment.css";

// amounts are in EUR cents (e.g. 20000 = €200.00)
const PAYMENT_OPTIONS = [
  {
    id: "english",
    label: "English Proficiency Fee",
    description: "Pay for English proficiency tests or related assessments.",
    amount: 20000, // €200.00
  },
  {
    id: "medical",
    label: "Medical Insurance Fee",
    description: "Secure your medical insurance coverage for study abroad.",
    amount: 25000, // €250.00
  },
  {
    id: "logistics",
    label: "Logistics Fee",
    description: "Covers logistics, courier, and document handling costs.",
    amount: 42000, // €420.00
  },
  {
    id: "courses",
    label: "Course Fee",
    description: "Pay for course-related fees and training programs.",
    amount: 12000, // €120.00
  },
  {
    id: "other",
    label: "Other",
    description: "Pay a custom amount for any other service or fee.",
    amount: 0,
  },
];

const formatEUR = (cents) =>
  new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
  }).format(cents / 100);

export default function Payment() {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedOption, setSelectedOption] = useState(PAYMENT_OPTIONS[0]);
  const [otherAmount, setOtherAmount] = useState(""); // user enters in EUR (e.g. 150)

  const handlePay = async () => {
    try {
      setLoading(true);
      setError(null);

      // Compute final amount in cents
      let amountInCents;
      if (selectedOption.id === "other") {
        const parsed = parseFloat(otherAmount);
        if (!isFinite(parsed) || parsed < 0.5) {
          setError("Please enter a valid amount (minimum €0.50).");
          setLoading(false);
          return;
        }
        amountInCents = Math.round(parsed * 100);
      } else {
        amountInCents = selectedOption.amount;
      }

      const token = localStorage.getItem("token");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const payload = {
        amount: amountInCents,
        currency: "EUR",
        purpose: selectedOption.label,
        cus_name: user?.name || user?.displayName || user?.email?.split("@")[0] || "Customer",
        cus_email: user?.email || undefined,
        userId: user?._id || undefined,
      };

      const res = await axios.post(
        `${API_BASE_URL}/create-payment`,
        payload,
        { headers },
      );

      if (res?.data?.success && res?.data?.url) {
        // Redirect to Stripe hosted checkout page
        window.location.href = res.data.url;
      } else {
        setError(res?.data?.message || "Could not initiate payment. Please try again.");
      }
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Payment request failed. Please check your connection.",
      );
    } finally {
      setLoading(false);
    }
  };

  const displayAmount =
    selectedOption.id === "other"
      ? otherAmount
        ? `€${parseFloat(otherAmount).toFixed(2)}`
        : "—"
      : formatEUR(selectedOption.amount);

  return (
    <div className="payment-page">
      <Navbar3 />
      <main className="payment-content">
        <section className="payment-card">
          <div className="payment-stripe-badge">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 1L3 5v6c0 5.25 3.75 10.15 9 11.35C17.25 21.15 21 16.25 21 11V5l-9-4z" fill="#00875a" opacity="0.15"/>
              <path d="M12 1L3 5v6c0 5.25 3.75 10.15 9 11.35C17.25 21.15 21 16.25 21 11V5l-9-4z" stroke="#00875a" strokeWidth="1.5" fill="none"/>
            </svg>
            Secured by Stripe
          </div>

          <h1 className="payment-title">Secure Payment</h1>
          <p className="payment-subtitle">
            Select a service and complete your payment securely via Stripe.
            All transactions are encrypted and protected.
          </p>

          <div className="payment-placeholder-box">
            <p className="payment-select-label">Select what you want to pay for:</p>

            <div className="payment-options">
              {PAYMENT_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  className={`payment-option${selectedOption.id === option.id ? " selected" : ""}`}
                  onClick={() => setSelectedOption(option)}
                  disabled={loading}
                >
                  <div className="payment-option-header">
                    <span className="payment-option-title">{option.label}</span>
                    {option.id !== "other" && (
                      <span className="payment-option-amount">
                        {formatEUR(option.amount)}
                      </span>
                    )}
                  </div>
                  <p className="payment-option-description">{option.description}</p>
                </button>
              ))}
            </div>

            {selectedOption.id === "other" && (
              <div className="payment-other-input-wrap">
                <label className="payment-other-label" htmlFor="payment-other-amount">
                  Enter amount (€ EUR)
                </label>
                <div className="payment-other-input-row">
                  <span className="payment-currency-symbol">€</span>
                  <input
                    id="payment-other-amount"
                    className="payment-other-input"
                    type="number"
                    inputMode="decimal"
                    min="0.50"
                    step="0.01"
                    placeholder="e.g. 150.00"
                    value={otherAmount}
                    onChange={(e) => setOtherAmount(e.target.value)}
                    disabled={loading}
                  />
                </div>
              </div>
            )}

            <div className="payment-summary-row">
              <span className="payment-summary-label">
                You are paying for: <strong>{selectedOption.label}</strong>
              </span>
              <span className="payment-summary-amount">{displayAmount}</span>
            </div>

            {error && <p className="payment-error">⚠ {error}</p>}

            <button
              onClick={handlePay}
              className="payment-btn payment-btn--stripe"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="payment-spinner" />
                  Redirecting to Stripe…
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                    <rect x="1" y="4" width="22" height="16" rx="3" stroke="currentColor" strokeWidth="1.8" fill="none"/>
                    <path d="M1 9h22" stroke="currentColor" strokeWidth="1.8"/>
                  </svg>
                  Pay {selectedOption.id !== "other" ? formatEUR(selectedOption.amount) : (otherAmount ? `€${parseFloat(otherAmount).toFixed(2)}` : "")} with Stripe
                </>
              )}
            </button>

            <p className="payment-hint">
              <Link to="/">← Back to Home</Link>
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
