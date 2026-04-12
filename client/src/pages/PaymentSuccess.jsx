import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import Navbar3 from "../components/navbar3";
import { API_BASE_URL } from "../config/api";
import "./Payment.css";

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [status, setStatus] = useState("verifying"); // "verifying" | "confirmed" | "error"
  const [details, setDetails] = useState(null);

  useEffect(() => {
    if (!sessionId) {
      setStatus("error");
      return;
    }

    axios
      .get(`${API_BASE_URL}/payment/verify?session_id=${sessionId}`)
      .then((res) => {
        if (res.data?.success) {
          setDetails(res.data);
          setStatus("confirmed");
        } else {
          setStatus("error");
        }
      })
      .catch(() => setStatus("error"));
  }, [sessionId]);

  const formatAmount = (cents, currency) => {
    if (!cents || !currency) return "";
    return new Intl.NumberFormat("en-IE", {
      style: "currency",
      currency: currency,
    }).format(cents / 100);
  };

  return (
    <div className="payment-page">
      <Navbar3 />
      <main className="payment-content">
        <section className="payment-card payment-result-card success">

          {status === "verifying" && (
            <>
              <div className="payment-result-icon">
                <span className="payment-spinner payment-spinner--lg" />
              </div>
              <h1 className="payment-title">Verifying Payment…</h1>
              <p className="payment-subtitle">Please wait while we confirm your payment.</p>
            </>
          )}

          {status === "confirmed" && (
            <>
              <div className="payment-result-icon success-icon">✓</div>
              <h1 className="payment-title">Payment Successful!</h1>
              <p className="payment-subtitle">
                Your payment has been completed successfully. Thank you for choosing FineAnswer Ireland!
              </p>

              {details && (
                <div className="payment-detail-box">
                  {details.purpose && (
                    <div className="payment-detail-row">
                      <span>Service</span>
                      <strong>{details.purpose}</strong>
                    </div>
                  )}
                  {details.amount && (
                    <div className="payment-detail-row">
                      <span>Amount Paid</span>
                      <strong>{formatAmount(details.amount, details.currency)}</strong>
                    </div>
                  )}
                  {details.customerEmail && (
                    <div className="payment-detail-row">
                      <span>Email</span>
                      <strong>{details.customerEmail}</strong>
                    </div>
                  )}
                  {details.paymentIntent && (
                    <div className="payment-detail-row">
                      <span>Reference</span>
                      <strong className="payment-ref">{details.paymentIntent}</strong>
                    </div>
                  )}
                </div>
              )}

              <div className="payment-result-actions">
                <Link to="/dashboard" className="payment-btn">Go to Dashboard</Link>
                <Link to="/" className="payment-btn payment-btn--outline">Back to Home</Link>
              </div>
            </>
          )}

          {status === "error" && (
            <>
              <div className="payment-result-icon error-icon">!</div>
              <h1 className="payment-title" style={{ color: "#d97706" }}>
                Verification Pending
              </h1>
              <p className="payment-subtitle">
                We couldn't verify your payment status right now. If your card was charged,
                please contact our support team with your session reference.
              </p>
              {sessionId && (
                <p className="payment-ref-note">
                  Session ID: <code>{sessionId}</code>
                </p>
              )}
              <div className="payment-result-actions">
                <Link to="/dashboard/payment" className="payment-btn">Try Again</Link>
                <Link to="/" className="payment-btn payment-btn--outline">Back to Home</Link>
              </div>
            </>
          )}

        </section>
      </main>
    </div>
  );
}
