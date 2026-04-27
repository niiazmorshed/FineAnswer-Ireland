import React from "react";
import { Link } from "react-router-dom";
import LandingHeader from "../components/LandingHeader";
import "./Payment.css";

export default function PaymentFail() {
  return (
    <>
    <LandingHeader />
    <div className="payment-page">
      <main className="payment-content">
        <section className="payment-card payment-result-card fail">
          <div className="payment-result-icon fail-icon">✕</div>
          <h1 className="payment-title">Payment Failed</h1>
          <p className="payment-subtitle">
            Your payment could not be completed. Please check your card details
            and try again. If the issue persists, contact our support team.
          </p>
          <div className="payment-result-actions">
            <Link to="/dashboard/payment" className="payment-btn">Try Again</Link>
            <Link to="/" className="payment-btn payment-btn--outline">Back to Home</Link>
          </div>
        </section>
      </main>
    </div>
    </>
  );
}
