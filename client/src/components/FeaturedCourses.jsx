import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaUniversity, FaClock, FaEuroSign, FaCalendarAlt, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { API_BASE_URL } from "../config/api";

export default function FeaturedCourses() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/programs?limit=8&country=Ireland`);
        const data = await res.json();
        const list = Array.isArray(data) ? data : data?.programs ?? data?.data ?? [];
        setCourses(list.slice(0, 8));
      } catch {
        setCourses([]);
      }
    };
    fetchCourses();
  }, []);

  const scroll = (dir) => {
    if (!scrollRef.current) return;
    const amount = 340;
    scrollRef.current.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  if (!courses.length) return null;

  return (
    <section className="fc-section">
      <div className="fc-inner">
        <div className="fc-header">
          <div>
            <span className="section-badge">Programs</span>
            <h2 className="fc-title">Featured Courses</h2>
            <p className="fc-subtitle">
              Explore top programs from leading Irish universities and colleges
            </p>
          </div>
          <div className="fc-nav">
            <button className="fc-nav-btn" onClick={() => scroll("left")} aria-label="Previous">
              <FaChevronLeft />
            </button>
            <button className="fc-nav-btn" onClick={() => scroll("right")} aria-label="Next">
              <FaChevronRight />
            </button>
          </div>
        </div>

        <div className="fc-scroll" ref={scrollRef}>
          {courses.map((c, i) => (
            <div className="fc-card" key={c._id || i}>
              <div className="fc-card-top">
                {c.level && <span className="fc-badge">{c.level}</span>}
                <h3 className="fc-course-name">{c.programName || c.name}</h3>
              </div>

              <div className="fc-divider" />

              <div className="fc-details">
                <div className="fc-detail"><FaUniversity className="fc-detail-icon" /><span>{c.university || "University"}</span></div>
                <div className="fc-detail"><FaClock className="fc-detail-icon" /><span>{c.duration || "1 Year"}</span></div>
                <div className="fc-detail"><FaEuroSign className="fc-detail-icon" /><span>{c.fee || "Contact Us"}</span></div>
                <div className="fc-detail"><FaCalendarAlt className="fc-detail-icon" /><span>{Array.isArray(c.intakes) ? c.intakes.join(", ") : c.intakes || "Sep 2025"}</span></div>
              </div>

              <button
                className="fc-apply-btn"
                onClick={() => navigate("/search-results?country=Ireland")}
              >
                Apply Now
              </button>
            </div>
          ))}
        </div>

        <div className="fc-footer-link">
          <button
            className="btn-outline"
            onClick={() => navigate("/search-results?country=Ireland")}
          >
            View Our Course Search Engine →
          </button>
        </div>
      </div>

      <style>{`
        .fc-section {
          padding: var(--section-padding) 0;
          background: var(--color-bg-white);
          overflow: hidden;
        }
        @media (max-width: 768px) {
          .fc-section { padding: var(--section-padding-mobile) 0; }
        }
        .fc-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
        }
        .fc-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 32px;
          gap: 20px;
          flex-wrap: wrap;
        }
        .fc-title {
          font-size: var(--text-h2);
          font-weight: var(--weight-bold);
          color: var(--color-text-primary);
          margin-bottom: 6px;
        }
        .fc-subtitle {
          color: var(--color-text-secondary);
          font-size: 1rem;
        }
        .fc-nav {
          display: flex;
          gap: 8px;
          flex-shrink: 0;
        }
        .fc-nav-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 1px solid var(--color-border);
          background: var(--color-bg-white);
          color: var(--color-text-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 0.85rem;
        }
        .fc-nav-btn:hover {
          background: var(--color-primary);
          border-color: var(--color-primary);
          color: #fff;
        }

        .fc-scroll {
          display: flex;
          gap: 18px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          padding-bottom: 8px;
          scrollbar-width: none;
        }
        .fc-scroll::-webkit-scrollbar { display: none; }

        .fc-card {
          flex: 0 0 300px;
          scroll-snap-align: start;
          background: var(--color-bg-white);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-card);
          padding: 24px 22px;
          display: flex;
          flex-direction: column;
          box-shadow: var(--shadow-card);
          transition: all 0.25s ease;
        }
        .fc-card:hover {
          box-shadow: var(--shadow-card-hover);
          transform: translateY(-3px);
        }

        .fc-card-top { margin-bottom: 4px; }
        .fc-badge {
          display: inline-block;
          padding: 3px 12px;
          border-radius: var(--radius-pill);
          background: var(--color-primary-light);
          color: var(--color-primary);
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          margin-bottom: 10px;
        }
        .fc-course-name {
          font-size: 1.05rem;
          font-weight: var(--weight-bold);
          color: var(--color-text-primary);
          line-height: 1.35;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .fc-divider {
          height: 1px;
          background: var(--color-border);
          margin: 16px 0;
        }
        .fc-details {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 20px;
          flex: 1;
        }
        .fc-detail {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.85rem;
          color: var(--color-text-secondary);
        }
        .fc-detail-icon {
          color: var(--color-primary);
          font-size: 0.85rem;
          flex-shrink: 0;
          width: 16px;
        }

        .fc-apply-btn {
          width: 100%;
          padding: 12px;
          border: none;
          border-radius: var(--radius-btn);
          background: var(--color-gold);
          color: #fff;
          font-weight: 600;
          font-family: var(--font-sans);
          font-size: 0.9375rem;
          cursor: pointer;
          transition: background 0.2s, transform 0.2s;
        }
        .fc-apply-btn:hover {
          background: var(--color-gold-hover);
          transform: translateY(-1px);
        }

        .fc-footer-link {
          text-align: center;
          margin-top: 32px;
        }
      `}</style>
    </section>
  );
}
