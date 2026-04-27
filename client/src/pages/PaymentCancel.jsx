import React, { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import LandingHeader from "../components/LandingHeader";
import { API_BASE_URL } from "../config/api";
import "./Payment.css";

export default function PaymentCancel() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  // Notify backend to mark this session as cancelled in paymentCollection
  useEffect(() => {
    if (!sessionId) return;
    axios
      .post(`${API_BASE_URL}/payment/update-status`, {
        session_id: sessionId,
        status: "cancelled",
      })
      .catch(() => {});
  }, [sessionId]);

  return (
    <>
    <LandingHeader />
    <div className="payment-page">
      <main className="payment-content">
        <section className="payment-card payment-result-card cancel">
          <div className="payment-result-icon cancel-icon">✕</div>
          <h1 className="payment-title">Payment Cancelled</h1>
          <p className="payment-subtitle">
            You cancelled the payment. No charges were made to your card.
            You can try again whenever you're ready.
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
