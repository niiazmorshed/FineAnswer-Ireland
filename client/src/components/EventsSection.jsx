import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../config/api";

export default function EventsSection() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/events`);
        const data = await res.json();
        const list = Array.isArray(data) ? data : data?.events ?? data?.data ?? [];
        setEvents(list.slice(0, 4));
      } catch {
        setEvents([]);
      }
    };
    fetchEvents();
  }, []);

  if (!events.length) return null;

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-IE", { day: "2-digit", month: "short", year: "numeric" });
  };

  return (
    <section className="ev-section">
      <div className="ev-inner">
        <div className="ev-header">
          <span className="section-badge">Upcoming</span>
          <h2 className="ev-title">Our Upcoming Events</h2>
        </div>

        <div className="ev-grid">
          {events.map((ev, i) => (
            <div className="ev-card" key={ev._id || i}>
              <div className="ev-img-wrap">
                {ev.image ? (
                  <img src={ev.image} alt={ev.title || "Event"} className="ev-img" />
                ) : (
                  <div className="ev-img-placeholder" />
                )}
                {ev.startDate && (
                  <span className="ev-date-badge">{formatDate(ev.startDate)}</span>
                )}
              </div>
              <div className="ev-body">
                <h3 className="ev-name">{ev.title || ev.name}</h3>
                <p className="ev-desc">
                  {ev.description
                    ? ev.description.length > 120
                      ? ev.description.slice(0, 120) + "…"
                      : ev.description
                    : "Join our upcoming education event to connect with Irish institution representatives."}
                </p>
                <a
                  href={ev.registrationLink || ev.link || "#contact"}
                  target={ev.registrationLink ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="ev-register-btn"
                >
                  Register Now
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .ev-section {
          padding: var(--section-padding) 0;
          background: var(--color-bg-white);
        }
        @media (max-width: 768px) {
          .ev-section { padding: var(--section-padding-mobile) 0; }
        }
        .ev-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
        }
        .ev-header {
          text-align: center;
          margin-bottom: 36px;
        }
        .ev-title {
          font-size: var(--text-h2);
          font-weight: var(--weight-bold);
          color: var(--color-text-primary);
        }
        .ev-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 22px;
        }
        @media (max-width: 1024px) {
          .ev-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .ev-grid { grid-template-columns: 1fr; }
        }

        .ev-card {
          background: var(--color-bg-white);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-card);
          overflow: hidden;
          box-shadow: var(--shadow-card);
          transition: all 0.25s ease;
          display: flex;
          flex-direction: column;
        }
        .ev-card:hover {
          box-shadow: var(--shadow-card-hover);
          transform: translateY(-4px);
        }
        .ev-card:hover .ev-img {
          transform: scale(1.03);
        }

        .ev-img-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          overflow: hidden;
          background: var(--color-primary-light);
        }
        .ev-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }
        .ev-img-placeholder {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, var(--color-primary-light) 0%, var(--color-bg-light) 100%);
        }
        .ev-date-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          padding: 5px 12px;
          border-radius: var(--radius-btn);
          background: var(--color-primary);
          color: #fff;
          font-size: 0.75rem;
          font-weight: 700;
        }

        .ev-body {
          padding: 22px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .ev-name {
          font-size: 1.05rem;
          font-weight: var(--weight-bold);
          color: var(--color-text-primary);
          margin-bottom: 8px;
          line-height: 1.35;
        }
        .ev-desc {
          font-size: 0.875rem;
          color: var(--color-text-secondary);
          line-height: 1.6;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          margin-bottom: 16px;
          flex: 1;
        }
        .ev-register-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 10px 22px;
          border: 2px solid var(--color-primary);
          border-radius: var(--radius-btn);
          color: var(--color-primary);
          font-weight: 600;
          font-size: 0.875rem;
          font-family: var(--font-sans);
          text-decoration: none;
          transition: all 0.2s;
          text-align: center;
        }
        .ev-register-btn:hover {
          background: var(--color-primary);
          color: #fff;
        }
      `}</style>
    </section>
  );
}
