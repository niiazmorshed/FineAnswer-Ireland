import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaAward, FaCalendarAlt, FaGraduationCap } from "react-icons/fa";
import { API_BASE_URL } from "../config/api";
import SEO from "../components/SEO";
import "../styles/Scholarships.css";

/**
 * Public scholarships listing.
 *
 * Shows every record in the `scholarships` collection; the landing page's
 * ScholarshipsSection shows only the first few and links here. Content is
 * managed from /admin/scholarships.
 *
 * Read-only by design: students apply on the provider's own site, so each
 * card links out and there is no application flow here.
 */
export default function Scholarships() {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;

    const fetchScholarships = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/scholarships`);
        const data = await response.json();
        if (cancelled) return;
        if (data.success) {
          setScholarships(Array.isArray(data.data) ? data.data : []);
        } else {
          setError("Failed to load scholarships");
        }
      } catch (err) {
        console.error("Failed to load scholarships:", err);
        if (!cancelled) setError("Unable to connect to the server");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchScholarships();
    return () => {
      cancelled = true;
    };
  }, []);

  const backBar = (
    <div className="schp-nav">
      <button className="schp-back" onClick={() => navigate("/")}>
        <span className="schp-arrow">←</span> Back to Home
      </button>
    </div>
  );

  if (loading) {
    return (
      <div className="schp-page">
        <div className="schp-loader">Loading scholarships</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="schp-page">
        {backBar}
        <div className="schp-empty">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="schp-page">
      <SEO
        title="Scholarships for International Students in Ireland"
        canonicalPath="/scholarships"
        description="Scholarships and funding options for international students heading to Ireland, with amounts, eligibility and deadlines. Apply on each provider's own site."
      />

      {backBar}

      <header className="schp-header">
        <span className="schp-badge">Funding</span>
        <h1>Scholarships for International Students</h1>
        <p>
          Funding options we track for students heading to Ireland. Awards,
          eligibility and deadlines change often, so check each provider&apos;s
          page for the full terms before applying.
        </p>
      </header>

      <main className="schp-container">
        {scholarships.length === 0 ? (
          <div className="schp-empty">
            <p>No scholarships listed yet. Check back soon!</p>
          </div>
        ) : (
          <ul className="schp-grid">
            {scholarships.map((item) => (
              <li className="schp-card" key={item._id ?? item.name}>
                <div className="schp-card-head">
                  <span className="schp-card-icon" aria-hidden="true">
                    <FaAward />
                  </span>
                  <div>
                    <h2 className="schp-card-name">{item.name}</h2>
                    {item.provider && (
                      <p className="schp-card-provider">{item.provider}</p>
                    )}
                  </div>
                </div>

                {item.amount && (
                  <div className="schp-card-amount">{item.amount}</div>
                )}

                <div className="schp-card-meta">
                  {item.level && (
                    <span className="schp-card-metaItem">
                      <FaGraduationCap aria-hidden="true" /> {item.level}
                    </span>
                  )}
                  {item.deadline && (
                    <span className="schp-card-metaItem">
                      <FaCalendarAlt aria-hidden="true" /> {item.deadline}
                    </span>
                  )}
                </div>

                {item.eligibility && (
                  <p className="schp-card-eligibility">{item.eligibility}</p>
                )}

                {item.link && (
                  <a
                    className="schp-card-link"
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View details →
                  </a>
                )}
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
