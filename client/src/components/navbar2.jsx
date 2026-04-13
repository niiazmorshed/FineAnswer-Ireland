import React from "react";
import { useNavigate } from "react-router-dom";
import "./navbar2.css";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <header className="navbar navbar--inspo">
      <div className="navbar__bar">
        <div className="navbar__inner">
          <div
            className="navbar-brand"
            onClick={() => {
              navigate("/");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <span className="navbar-brand-mark" aria-hidden />
            <span className="navbar-brand-text">FineAnswer</span>
          </div>
          <nav className="navbar-nav">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                navigate("/");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              Home
            </a>
            <a href="/#search">How it works</a>
            <a href="/#about">About us</a>
            <a href="#" className="navbar-nav-extra" onClick={(e) => e.preventDefault()}>
              Services
            </a>
            <a href="#" className="navbar-nav-extra" onClick={(e) => e.preventDefault()}>
              Countries
            </a>
            <a href="#" className="navbar-nav-extra" onClick={(e) => e.preventDefault()}>
              Events
            </a>
            <a href="#" className="navbar-nav-extra" onClick={(e) => e.preventDefault()}>
              Contact
            </a>
          </nav>
          <button type="button" className="consult-btn consult-btn--demo" onClick={() => navigate("/contact")}>
            Request a demo
          </button>
        </div>
      </div>
    </header>
  );
}
