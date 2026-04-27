import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaUniversity, FaMapMarkerAlt } from "react-icons/fa";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import "./SuccessStories.css";
import { getSuccessStories } from "../services/successStoriesApi";
import { resolveMediaUrl } from "../utils/resolveMediaUrl";

const CAROUSEL_ID = "success-stories-carousel";
const AUTOPLAY_MS = 6000;

function getVisibleCount() {
  if (typeof window === "undefined") return 1;
  if (window.innerWidth >= 1200) return 3;
  if (window.innerWidth >= 720) return 2;
  return 1;
}

function useVisibleCount() {
  const [v, setV] = useState(1);
  useEffect(() => {
    const onResize = () => setV(getVisibleCount());
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return v;
}

export default function SuccessStories() {
  const [stories, setStories] = useState([]);
  const [active, setActive] = useState(0);
  const [timerKey, setTimerKey] = useState(0);
  const visibleCount = useVisibleCount();

  useEffect(() => {
    const fetch = async () => {
      const data = await getSuccessStories();
      const raw = Array.isArray(data) ? data : data?.stories ?? data?.data ?? [];
      setStories(raw || []);
    };
    fetch();
  }, []);

  const n = stories.length;
  const maxIndex = n ? Math.max(0, n - visibleCount) : 0;

  const bumpTimer = useCallback(() => {
    setTimerKey((k) => k + 1);
  }, []);

  // Keep window start index valid when n or column count changes
  useEffect(() => {
    setActive((a) => Math.min(a, maxIndex));
  }, [n, visibleCount, maxIndex]);

  const prev = useCallback(() => {
    if (!n) return;
    setActive((a) => Math.max(0, a - 1));
    bumpTimer();
  }, [n, bumpTimer]);

  const next = useCallback(() => {
    if (!n) return;
    setActive((a) => Math.min(maxIndex, a + 1));
    bumpTimer();
  }, [n, maxIndex, bumpTimer]);

  useEffect(() => {
    if (!n) return;
    const id = setInterval(() => {
      setActive((a) => (a >= maxIndex ? 0 : Math.min(maxIndex, a + 1)));
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [n, maxIndex, timerKey]);

  if (!n) return null;

  const trackPct = maxIndex > 0 ? (100 * active) / n : 0;
  return (
    <section
      className="success-wrapper"
      id="success-stories"
      aria-roledescription="carousel"
    >
      <div className="success-header">
        <h2 className="success-title" id="success-stories-title">
          Success Stories
        </h2>
        <p className="success-sub">Empowering students to achieve their global dreams</p>
      </div>

      <div
        className="carousel-container"
        id={CAROUSEL_ID}
        role="region"
        aria-labelledby="success-stories-title"
        aria-label="Success story testimonials"
      >
        <div className="carousel-stage">
          <button type="button" className="control-btn prev" onClick={prev} aria-label="Previous stories">
            <FiArrowLeft />
          </button>

          <button type="button" className="control-btn next" onClick={next} aria-label="Next stories">
            <FiArrowRight />
          </button>

          <div
            className="carousel-viewport"
            style={{ "--ss-count": n, "--ss-visible": Math.min(visibleCount, n) }}
          >
            <div
              className="carousel-track"
              style={{ transform: `translate3d(-${trackPct}%, 0, 0)` }}
            >
              {stories.map((story, i) => {
                const inView = i >= active && i < active + visibleCount;
                return (
                  <div
                    key={story._id || `story-${i}`}
                    className="carousel-slide"
                    role="group"
                    aria-label={`${i + 1} of ${n}`}
                    aria-hidden={!inView}
                  >
                    <article className={`story-card${i === active ? " is-active" : ""}`}>
                      <div className="user-profile">
                        <img
                          src={resolveMediaUrl(story.image)}
                          alt={story.name}
                          className="user-avatar"
                          loading={i < 3 ? "eager" : "lazy"}
                        />
                      </div>

                      <div className="card-content">
                        <h3 className="user-name">{story.name}</h3>
                        <span className="user-program">{story.program}</span>

                        <div className="user-meta">
                          <span>
                            <FaUniversity /> {story.university}
                          </span>
                          <span>
                            <FaMapMarkerAlt /> {story.country}
                          </span>
                        </div>

                        <p className="user-quote">"{story.story}"</p>

                        <Link to={`/success-story/${story._id || i}`} className="action-link" state={{ story }}>
                          Read full story
                        </Link>
                      </div>
                    </article>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
