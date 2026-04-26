import React, { useEffect, useMemo, useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { FaChevronRight, FaMapMarkerAlt, FaUniversity } from "react-icons/fa";
import { getSuccessStories } from "../services/successStoriesApi";
import { resolveMediaUrl } from "../utils/resolveMediaUrl";
import "./SuccessStoryDetail.css";

function storyParagraphs(text) {
  if (!text || typeof text !== "string") return [];
  return text
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean);
}

export default function SuccessStoryDetail() {
  const { id } = useParams();
  const location = useLocation();
  const [story, setStory] = useState(location.state?.story || null);
  const [loading, setLoading] = useState(!story);
  const [error, setError] = useState(null);

  const paragraphs = useMemo(() => storyParagraphs(story?.story), [story?.story]);

  useEffect(() => {
    if (story) return;
    let mounted = true;
    (async () => {
      try {
        const data = await getSuccessStories();
        const raw = Array.isArray(data) ? data : data?.stories ?? data?.data ?? [];
        const found = raw.find((s, idx) => s._id === id || String(idx) === id);
        if (mounted) setStory(found || null);
      } catch (err) {
        if (mounted) setError(err.message || "Failed to load story");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => (mounted = false);
  }, [id, story]);

  if (loading) {
    return (
      <div className="story-detail-state story-detail-state--load">
        <p>Loading story…</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="story-detail-state story-detail-state--err">
        <p>{error}</p>
        <Link to="/" className="story-detail-ghost">
          Back to home
        </Link>
      </div>
    );
  }
  if (!story) {
    return (
      <div className="story-detail-state story-detail-state--err">
        <p>Story not found.</p>
        <Link to="/" className="story-detail-ghost">
          Back to home
        </Link>
      </div>
    );
  }

  return (
    <div className="story-detail-page">
      <div className="story-detail-hero" aria-hidden="true" />

      <div className="story-detail-inner">
        <nav className="story-detail-breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span className="story-detail-breadcrumb__sep" aria-hidden="true">
            <FaChevronRight />
          </span>
          <span className="story-detail-breadcrumb__current" aria-current="page">
            Success story
          </span>
        </nav>

        <article className="story-detail-card" itemScope itemType="https://schema.org/Article">
          <div className="story-detail-identity">
            <div className="story-detail-avatar-wrap">
              <img
                src={resolveMediaUrl(story.image)}
                alt={story.name}
                className="detail-avatar"
                itemProp="image"
                width={140}
                height={140}
              />
            </div>
            <h1 className="story-detail-name" itemProp="name">
              {story.name}
            </h1>

            <p className="story-detail-program" itemProp="description">
              {story.program}
            </p>

            <div className="story-detail-chips" aria-label="Location and university">
              <span className="story-chip">
                <FaUniversity className="story-chip__icon" aria-hidden="true" />
                <span className="story-chip__text">{story.university}</span>
              </span>
              <span className="story-chip">
                <FaMapMarkerAlt className="story-chip__icon" aria-hidden="true" />
                <span className="story-chip__text">{story.country}</span>
              </span>
            </div>
          </div>

          <div className="full-story" itemProp="articleBody">
            {paragraphs.length
              ? paragraphs.map((p, i) => (
                  <p key={i} className="full-story__p">
                    {p}
                  </p>
                ))
              : null}
            {!paragraphs.length && <p className="full-story__p">{story.story}</p>}
          </div>

          <div className="story-detail-back">
            <Link to="/" className="back-link">
              ← Back to home
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}
