import React, { useState, useContext, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { AuthContext } from "../pages/Provider/ContextProvider";
import "../css/navbar3.css";
import logo from "../images/logo.png";

export default function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [imgError, setImgError] = useState(false);
  const { user, isAdmin, loading } = useContext(AuthContext);

  const profileImageUrl = user?.picture || user?.photoURL;
  const showImage = profileImageUrl && !imgError;
  const showProfileArea = user || loading;

  useEffect(() => {
    setImgError(false);
  }, [user?.picture, user?.photoURL]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 900) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const getInitials = () => {
    if (user?.name) return user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
    if (user?.email) return user.email[0].toUpperCase();
    return "?";
  };

  const firstName = user?.name?.split(" ")[0] || user?.email?.split("@")[0] || "User";

  const handleProfileClick = () => {
    setMenuOpen(false);
    navigate(isAdmin ? "/admin/dashboard" : "/dashboard");
  };

  const closeMenu = () => setMenuOpen(false);

  const DashboardButton = ({ extraClass = "" }) => (
    <button
      type="button"
      className={`nav-dashboard-btn${extraClass ? ` ${extraClass}` : ""}`}
      onClick={handleProfileClick}
      disabled={loading}
    >
      {loading ? (
        <span className="nav-profile-loading" />
      ) : (
        <>
          <span className="nav-dashboard-avatar">
            {showImage ? (
              <img
                src={profileImageUrl}
                alt={user?.name || "Profile"}
                referrerPolicy="no-referrer"
                onError={() => setImgError(true)}
              />
            ) : (
              <span className="nav-dashboard-initials">{getInitials()}</span>
            )}
          </span>
          <span className="nav-dashboard-text">
            <span className="nav-dashboard-name">{firstName}</span>
            <span className="nav-dashboard-label">
              {isAdmin ? "Admin Panel" : "My Dashboard"}
            </span>
          </span>
        </>
      )}
    </button>
  );

  return (
    <header className={`minimal-navbar minimal-navbar--inspo${scrolled ? " scrolled" : ""}`}>
      <div className="minimal-navbar__bar">
        <div className="nav-inner nav-inner--inspo">

          {/* ── Logo ── */}
          <div
            className="nav-brand"
            onClick={() => { navigate("/"); window.scrollTo({ top: 0, behavior: "smooth" }); closeMenu(); }}
          >
            <span className="nav-brand-mark" aria-hidden />
            <img src={logo} alt="FineAnswer Ireland" className="nav-brand-img" />
          </div>

          {/* ── Nav links ── */}
          <nav className={`nav-menu nav-menu--inspo${menuOpen ? " open" : ""}`} aria-label="Main navigation">
            <NavLink to="/" end onClick={() => { closeMenu(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
              Home
            </NavLink>
            <a href="/#about"    onClick={closeMenu}>About</a>
            <a href="/#services" onClick={closeMenu}>Services</a>
            <a href="/#packages" onClick={closeMenu}>Packages</a>
            <a href="/#contact"  onClick={closeMenu}>Contact</a>
            <NavLink to="/career" onClick={closeMenu}>Career</NavLink>
            <NavLink to="/blog"   onClick={closeMenu}>Blog</NavLink>

            {/* Mobile-only CTA row inside open menu */}
            <div className="nav-mobile-cta">
              {showProfileArea ? (
                <DashboardButton extraClass="nav-dashboard-btn--mobile" />
              ) : !loading ? (
                <button
                  type="button"
                  className="nav-btn nav-btn--login nav-btn--mobile"
                  onClick={() => { closeMenu(); navigate("/login"); }}
                >
                  Login
                </button>
              ) : null}
            </div>
          </nav>

          {/* ── Desktop right: Dashboard (logged in) or Login (guest) ── */}
          <div className="nav-actions-inspo">
            {showProfileArea ? (
              <DashboardButton />
            ) : (
              <button
                type="button"
                className="nav-btn nav-btn--demo"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            )}

            <button
              className="hamburger"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              <span />
              <span />
              <span />
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
