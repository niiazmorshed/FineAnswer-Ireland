import { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FaGraduationCap,
  FaFolderOpen,
  FaEnvelope,
  FaTasks,
  FaCreditCard,
  FaUser,
  FaArrowRight,
  FaMapMarkerAlt,
} from "react-icons/fa";
import DocumentChecklist from "./DocumentChecklist";
import { AuthContext } from "./Provider/ContextProvider";

const QUICK_ACTIONS = [
  { label: "Progress Tracker", icon: <FaTasks />, to: "/dashboard/progress-tracker" },
  { label: "Documents",        icon: <FaFolderOpen />, to: "/dashboard/documentchecklist" },
  { label: "Messages",         icon: <FaEnvelope />, to: "/dashboard/messages" },
  { label: "Payment",          icon: <FaCreditCard />, to: "/dashboard/payment" },
  { label: "My Profile",       icon: <FaUser />, to: "/dashboard/profile" },
  { label: "Search Courses",   icon: <FaGraduationCap />, to: "/search-results?country=Ireland" },
];

export default function DashboardHome() {
  const { user, isAdmin, getCurrentUser, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await getCurrentUser();
      if (currentUser) setUserData(currentUser);
      else navigate("/login");
    };
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!loading && isAdmin) {
      navigate("/admin/dashboard", { replace: true });
    }
  }, [isAdmin, loading, navigate]);

  if (loading) {
    return <div className="dash-loading"><div className="dash-spinner" /></div>;
  }

  const u = userData || user;
  const userName = u?.name || u?.displayName || u?.email?.split("@")[0] || "User";
  const initials = userName.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);

  return (
    <div className="dash-home">
      {/* Welcome banner */}
      <div className="dash-welcome">
        <div className="dash-welcome__left">
          <div className="dash-welcome__avatar">
            {u?.picture ? (
              <img src={u.picture} alt="" />
            ) : (
              <span>{initials}</span>
            )}
          </div>
          <div>
            <h2 className="dash-welcome__title">Welcome back, {userName}</h2>
            <p className="dash-welcome__sub">
              Track your study abroad journey and manage your applications
            </p>
          </div>
        </div>
        <Link to="/dashboard/profile" className="dash-welcome__edit-btn">
          <FaUser /> Edit Profile
        </Link>
      </div>

      {/* Quick actions */}
      <div className="dash-quick-grid">
        {QUICK_ACTIONS.map((a) => (
          <Link key={a.label} to={a.to} className="dash-quick-card">
            <span className="dash-quick-icon">{a.icon}</span>
            <span className="dash-quick-label">{a.label}</span>
            <FaArrowRight className="dash-quick-arrow" />
          </Link>
        ))}
      </div>

      {/* Profile summary + document checklist */}
      <div className="dash-content-grid">
        {u && (
          <div className="dash-profile-summary">
            <h3 className="dash-card-title">Your Profile</h3>
            <div className="dash-profile-fields">
              {u.email && (
                <div className="dash-field">
                  <span className="dash-field-label">Email</span>
                  <span className="dash-field-value">{u.email}</span>
                </div>
              )}
              {u.phone && (
                <div className="dash-field">
                  <span className="dash-field-label">Phone</span>
                  <span className="dash-field-value">{u.phone}</span>
                </div>
              )}
              {u.country && (
                <div className="dash-field">
                  <span className="dash-field-label">Country</span>
                  <span className="dash-field-value">{u.country}</span>
                </div>
              )}
              {u.highestEducation && (
                <div className="dash-field">
                  <span className="dash-field-label">Education</span>
                  <span className="dash-field-value">{u.highestEducation}</span>
                </div>
              )}
            </div>
            <Link to="/dashboard/profile" className="dash-view-profile-link">
              View Full Profile <FaArrowRight />
            </Link>
          </div>
        )}

        <div className="dash-docs-section">
          <DocumentChecklist />
        </div>
      </div>

      <style>{`
        .dash-home { display: flex; flex-direction: column; gap: 22px; }

        /* ── Loading ──────────────────────────── */
        .dash-loading { display: flex; justify-content: center; padding: 60px 0; }
        .dash-spinner { width: 36px; height: 36px; border: 3px solid var(--color-border, #E0E0E0); border-top-color: var(--color-primary, #00693E); border-radius: 50%; animation: dashSpin 0.7s linear infinite; }
        @keyframes dashSpin { to { transform: rotate(360deg); } }

        /* ── Welcome banner ───────────────────── */
        .dash-welcome {
          display: flex; align-items: center; justify-content: space-between; gap: 20px;
          padding: 24px 28px; border-radius: 12px;
          background: linear-gradient(135deg, var(--color-primary, #00693E) 0%, var(--color-primary-dark, #004D2C) 100%);
          color: #fff;
        }
        .dash-welcome__left { display: flex; align-items: center; gap: 16px; }
        .dash-welcome__avatar {
          width: 52px; height: 52px; border-radius: 50%; flex-shrink: 0;
          background: rgba(255,255,255,0.2); display: flex; align-items: center; justify-content: center;
          font-weight: 700; font-size: 1.1rem; overflow: hidden;
          border: 2px solid rgba(255,255,255,0.3);
        }
        .dash-welcome__avatar img { width: 100%; height: 100%; object-fit: cover; border-radius: 50%; }
        .dash-welcome__title { font-size: 1.25rem; font-weight: 700; margin: 0 0 4px; }
        .dash-welcome__sub { font-size: 0.85rem; color: rgba(255,255,255,0.75); margin: 0; }
        .dash-welcome__edit-btn {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 9px 18px; border-radius: 6px;
          background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.25);
          color: #fff; font-size: 0.8125rem; font-weight: 600; text-decoration: none;
          transition: all 0.2s; flex-shrink: 0;
        }
        .dash-welcome__edit-btn:hover { background: rgba(255,255,255,0.25); color: #fff; }

        @media (max-width: 640px) {
          .dash-welcome { flex-direction: column; align-items: flex-start; padding: 20px; }
          .dash-welcome__edit-btn { align-self: flex-start; }
        }

        /* ── Quick actions ────────────────────── */
        .dash-quick-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;
        }
        .dash-quick-card {
          display: flex; align-items: center; gap: 12px;
          padding: 16px 18px; background: #fff; border-radius: 10px;
          border: 1px solid var(--color-border, #E0E0E0);
          text-decoration: none; color: var(--color-text-primary, #1A1A1A);
          transition: all 0.2s; cursor: pointer;
          box-shadow: 0 1px 4px rgba(0,0,0,0.04);
        }
        .dash-quick-card:hover {
          border-color: var(--color-primary, #00693E);
          box-shadow: 0 4px 16px rgba(0,105,62,0.1);
          transform: translateY(-2px);
        }
        .dash-quick-card:hover .dash-quick-icon { background: var(--color-primary, #00693E); color: #fff; }
        .dash-quick-card:hover .dash-quick-arrow { color: var(--color-primary); transform: translateX(3px); }

        .dash-quick-icon {
          width: 36px; height: 36px; border-radius: 8px;
          background: var(--color-primary-light, #E6F4ED); color: var(--color-primary, #00693E);
          display: flex; align-items: center; justify-content: center;
          font-size: 0.9rem; flex-shrink: 0; transition: all 0.2s;
        }
        .dash-quick-label { flex: 1; font-size: 0.875rem; font-weight: 600; }
        .dash-quick-arrow { color: var(--color-text-muted, #888); font-size: 0.7rem; transition: all 0.2s; flex-shrink: 0; }

        @media (max-width: 768px) { .dash-quick-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 480px) { .dash-quick-grid { grid-template-columns: 1fr; } }

        /* ── Content grid ─────────────────────── */
        .dash-content-grid {
          display: grid; grid-template-columns: 1fr 1.4fr; gap: 20px; align-items: start;
        }
        @media (max-width: 900px) { .dash-content-grid { grid-template-columns: 1fr; } }

        /* ── Profile summary ──────────────────── */
        .dash-profile-summary {
          background: #fff; border-radius: 10px; padding: 22px;
          border: 1px solid var(--color-border, #E0E0E0);
          box-shadow: 0 1px 4px rgba(0,0,0,0.04);
        }
        .dash-card-title {
          font-size: 0.9375rem; font-weight: 700; margin: 0 0 16px;
          color: var(--color-text-primary, #1A1A1A);
          padding-bottom: 12px; border-bottom: 1px solid var(--color-border, #E0E0E0);
        }
        .dash-profile-fields { display: flex; flex-direction: column; gap: 12px; }
        .dash-field { display: flex; flex-direction: column; gap: 2px; }
        .dash-field-label {
          font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;
          color: var(--color-text-muted, #888);
        }
        .dash-field-value { font-size: 0.875rem; color: var(--color-text-primary, #1A1A1A); word-break: break-word; }
        .dash-view-profile-link {
          display: inline-flex; align-items: center; gap: 6px;
          margin-top: 18px; font-size: 0.8125rem; font-weight: 600;
          color: var(--color-primary, #00693E); text-decoration: none; transition: gap 0.2s;
        }
        .dash-view-profile-link:hover { gap: 10px; }

        /* ── Docs section ─────────────────────── */
        .dash-docs-section {
          background: #fff; border-radius: 10px; padding: 22px;
          border: 1px solid var(--color-border, #E0E0E0);
          box-shadow: 0 1px 4px rgba(0,0,0,0.04);
        }
      `}</style>
    </div>
  );
}
