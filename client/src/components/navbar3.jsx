import React, { useState, useContext, useEffect, useRef } from "react";
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import { AuthContext } from "../pages/Provider/ContextProvider";
import { WHY_IRELAND_NAV } from "../pages/why-ireland/whyIrelandNav";
import "../css/navbar3.css";
import logo from "../images/logo.png";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [hash, setHash] = useState(() =>
    typeof window !== "undefined" ? window.location.hash.replace(/^#/, "") : ""
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const [whySubOpen, setWhySubOpen] = useState(false);
  const whyDropdownRef = useRef(null);
  const whyIrelandActive = location.pathname.startsWith("/why-ireland");

  useEffect(() => {
    setHash((location.hash || "").replace(/^#/, ""));
  }, [location.hash]);

  useEffect(() => {
    const onHashChange = () =>
      setHash((window.location.hash || "").replace(/^#/, ""));
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);
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

  const closeMenu = () => {
    setMenuOpen(false);
    setWhySubOpen(false);
  };

  useEffect(() => {
    setWhySubOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!whySubOpen) return;
    const onDoc = (e) => {
      if (
        whyDropdownRef.current &&
        !whyDropdownRef.current.contains(e.target)
      ) {
        setWhySubOpen(false);
      }
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [whySubOpen]);

  useEffect(() => {
    if (!whySubOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") setWhySubOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [whySubOpen]);

  const isWideNav = () => typeof window !== "undefined" && window.innerWidth > 900;

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
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive && location.pathname === "/" && !hash ? "active" : undefined
              }
              onClick={() => {
                closeMenu();
                if (location.pathname === "/" && hash) {
                  navigate("/", { replace: true });
                }
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              Home
            </NavLink>

            <div
              ref={whyDropdownRef}
              className={`nav-dropdown${whySubOpen ? " nav-dropdown--open" : ""}`}
              onMouseLeave={() => {
                if (isWideNav()) setWhySubOpen(false);
              }}
            >
              <button
                type="button"
                className={`nav-dropdown__trigger${whyIrelandActive ? " active" : ""}`}
                aria-expanded={whySubOpen}
                aria-haspopup="true"
                onMouseEnter={() => {
                  if (isWideNav()) setWhySubOpen(true);
                }}
                onClick={() => setWhySubOpen((o) => !o)}
              >
                Why Ireland
                <span className="nav-dropdown__caret" aria-hidden />
              </button>
              <div className="nav-dropdown__panel" role="menu" aria-label="Why Ireland">
                {WHY_IRELAND_NAV.map((item) => {
                  const dest = item.to ?? `/why-ireland/${item.slug}`;
                  return (
                    <NavLink
                      key={item.to || item.slug}
                      role="menuitem"
                      to={dest}
                      className={({ isActive }) =>
                        `nav-dropdown__link${item.featured ? " nav-dropdown__link--featured" : ""}${isActive ? " is-active" : ""}`
                      }
                      onClick={closeMenu}
                    >
                      {item.label}
                    </NavLink>
                  );
                })}
              </div>
            </div>

            <NavLink to="/study" onClick={closeMenu}>
              Study in Ireland
            </NavLink>

            <a
              href="/#about"
              className={location.pathname === "/" && hash === "about" ? "active" : undefined}
              onClick={closeMenu}
            >
              About
            </a>
            <a
              href="/#services"
              className={location.pathname === "/" && hash === "services" ? "active" : undefined}
              onClick={closeMenu}
            >
              Services
            </a>
            <a
              href="/#packages"
              className={location.pathname === "/" && hash === "packages" ? "active" : undefined}
              onClick={closeMenu}
            >
              Packages
            </a>
            <a
              href="/#contact"
              className={location.pathname === "/" && hash === "contact" ? "active" : undefined}
              onClick={closeMenu}
            >
              Contact
            </a>
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
