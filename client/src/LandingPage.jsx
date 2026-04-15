import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar3 from "./components/navbar3";
import Footer from "./components/Footer";
import PartnerLogos from "./components/PartnerLogos";
import BrowseBySubject from "./components/BrowseBySubject";
import ScholarshipCTA from "./components/ScholarshipCTA";
import Services from "./components/Services";
import QuickLinks from "./components/QuickLinks";
import FeaturedCourses from "./components/FeaturedCourses";
import SuccessStories from "./components/SuccessStories";
import FAQSection from "./components/FAQSection";
import EnquiryCTA from "./components/EnquiryCTA";
import EventsSection from "./components/EventsSection";
import PackagesSection from "./components/PackagesSection";
import ContactSection from "./components/ContactSection";
import PartnerBank from "./components/PartnerBank";
import CEOQuote from "./components/CEOQuote";
import AboutUs from "./components/AboutUs";
import BentoHero from "./components/BentoHero";
import ParticlesBackground from "./components/ParticlesBackground";

import { AuthContext } from "./pages/Provider/ContextProvider";

import "./LandingPage.css";

export default function LandingPage() {
  const navigate = useNavigate();
  const { user, loading } = useContext(AuthContext);

  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedIntake, setSelectedIntake] = useState("");
  const [activeDropdown, setActiveDropdown] = useState(null);
  const searchRef = useRef(null);

  const COUNTRY = "Ireland";
  const LEVELS = [
    { label: "Postgraduate", value: "Master's (Postgraduate)" },
    { label: "Undergraduate", value: "Bachelor's (Undergraduate)" },
    { label: "Postgraduate Diploma", value: "Postgraduate Diploma" },
    { label: "Higher Diploma", value: "Higher Diploma" },
  ];
  const CATEGORIES = [
    { label: "Business, Management & Law", value: "Business, Management & Law" },
    { label: "Computing, IT & Engineering", value: "Computing, IT & Engineering" },
    { label: "Life Sciences & Health", value: "Life Sciences & Health" },
    { label: "Social Sciences", value: "Social Sciences" },
    { label: "Education & Media", value: "Education & Media" },
    { label: "Others", value: "Others" },
  ];
  const INTAKES = [
    { label: "September", value: "September" },
    { label: "January / February", value: "January/February" },
    { label: "April", value: "April" },
  ];

  const toggleDropdown = (name) =>
    setActiveDropdown((prev) => (prev === name ? null : name));

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (selectedLevel) params.set("level", selectedLevel);
    params.set("country", COUNTRY);
    if (selectedCategory) params.set("category", selectedCategory);
    if (selectedIntake) params.set("intake", selectedIntake);
    navigate(`/search-results?${params.toString()}`);
  };

  useEffect(() => {
    const handler = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target))
        setActiveDropdown(null);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    const onHash = () => {
      const hash = window.location.hash.slice(1);
      if (hash) {
        setTimeout(() => {
          document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    };
    onHash();
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    const els = Array.from(document.querySelectorAll(".scroll-reveal"));
    if (!els.length) return;

    if (window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add("is-visible");
          obs.unobserve(e.target);
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -10% 0px" }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const [showPopup, setShowPopup] = useState(false);
  useEffect(() => {
    if (loading || user) return;
    if (localStorage.getItem("popupShown")) return;
    const t = setTimeout(() => {
      setShowPopup(true);
      localStorage.setItem("popupShown", "true");
    }, 10000);
    return () => clearTimeout(t);
  }, [loading, user]);
  useEffect(() => { if (user) setShowPopup(false); }, [user]);

  return (
    <div className="LandingPage">
      <ParticlesBackground />
      <Navbar3 />

      <BentoHero
        ariaLabel="FineAnswer Ireland"
        title={
          <>
            We take care of your <br />
            Ireland Journey step by step
          </>
        }
        subtitle="Search courses, plan your application, and get visa-ready with a guided, modern experience designed to keep everything simple and trackable."
        ctaLabel="Get Started"
        ctaTo="/search-results?country=Ireland"
        heroSearchDefaults={{ location: "Ireland" }}
        onHeroSearch={({ keyword, location }) => {
          const params = new URLSearchParams();
          params.set("country", location || "Ireland");
          if (keyword) params.set("q", keyword);
          navigate(`/search-results?${params.toString()}`);
        }}
      />

      {/* 2. ABOUT US */}
      <div className="scroll-reveal">
        <AboutUs />
      </div>

      {/* 3. COURSE SEARCH ENGINE */}
      <section className="search-engine-section scroll-reveal" id="search">
        <div className="search-engine-inner">
          <div className="search-engine-header">
            <span className="section-badge">FineAnswer Ireland</span>
            <h2>Course Search Engine</h2>
            <p>Find your ideal program in Ireland</p>
          </div>

          <div className="hero-search-wrapper-new" ref={searchRef}>
            <div className="hero-search-box-new">
              <div className="search-item-wrap">
                <div className="search-item-new">
                  <span className="search-label">Country</span>
                  <span className="search-value">{COUNTRY}</span>
                </div>
              </div>
              <div className="divider" />

              <div className={`search-item-wrap ${activeDropdown === "level" ? "dropdown-open" : ""}`}>
                <button type="button" className="search-item-new" onClick={() => toggleDropdown("level")}>
                  <span className="search-label">Level</span>
                  <span className={`search-value${!selectedLevel ? " search-value--placeholder" : ""}`}>
                    {LEVELS.find((l) => l.value === selectedLevel)?.label || "Select Level"}
                    <span className="search-chevron">▼</span>
                  </span>
                </button>
                {activeDropdown === "level" && (
                  <div className="search-dropdown">
                    {LEVELS.map((l) => (
                      <button key={l.value} type="button" className="search-dropdown-item"
                        onClick={() => { setSelectedLevel(l.value); setActiveDropdown(null); }}>
                        {l.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="divider" />

              <div className={`search-item-wrap search-item-wrap--category ${activeDropdown === "category" ? "dropdown-open" : ""}`}>
                <button type="button" className="search-item-new" onClick={() => toggleDropdown("category")}>
                  <span className="search-label">Category</span>
                  <span className={`search-value${!selectedCategory ? " search-value--placeholder" : ""}`}>
                    {CATEGORIES.find((c) => c.value === selectedCategory)?.label || "All Categories"}
                    <span className="search-chevron">▼</span>
                  </span>
                </button>
                {activeDropdown === "category" && (
                  <div className="search-dropdown">
                    {CATEGORIES.map((c) => (
                      <button key={c.value} type="button" className="search-dropdown-item"
                        onClick={() => { setSelectedCategory(c.value); setActiveDropdown(null); }}>
                        {c.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="divider" />

              <div className={`search-item-wrap ${activeDropdown === "intake" ? "dropdown-open" : ""}`}>
                <button type="button" className="search-item-new" onClick={() => toggleDropdown("intake")}>
                  <span className="search-label">Intake</span>
                  <span className={`search-value${!selectedIntake ? " search-value--placeholder" : ""}`}>
                    {INTAKES.find((i) => i.value === selectedIntake)?.label || "Select Intake"}
                    <span className="search-chevron">▼</span>
                  </span>
                </button>
                {activeDropdown === "intake" && (
                  <div className="search-dropdown">
                    {INTAKES.map((i) => (
                      <button key={i.value} type="button" className="search-dropdown-item"
                        onClick={() => { setSelectedIntake(i.value); setActiveDropdown(null); }}>
                        {i.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button className="search-btn-new" onClick={handleSearch}>Search</button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. BROWSE BY SUBJECT */}
      <div className="scroll-reveal">
        <BrowseBySubject />
      </div>

      {/* 3. PARTNER INSTITUTES */}
      <div className="scroll-reveal">
        <PartnerLogos />
      </div>

      

      

      {/* 6. SERVICES WE OFFER */}
      <div id="services">
        <div className="scroll-reveal">
          <Services />
        </div>
      </div>

      {/* 7. QUICK LINKS */}
      <div className="scroll-reveal">
        <QuickLinks />
      </div>

      {/* 8. FEATURED COURSES */}
      <div className="scroll-reveal">
        <FeaturedCourses />
      </div>

      {/* 9. SUCCESS STORIES */}
      <div className="scroll-reveal">
        <SuccessStories />
      </div>

      {/* 10. FAQ */}
      <div className="scroll-reveal">
        <FAQSection />
      </div>

      {/* 11. ENQUIRY CTA BANNER */}
      <div className="scroll-reveal">
        <EnquiryCTA />
      </div>

      {/* 12. EVENTS */}
      <div className="scroll-reveal">
        <EventsSection />
      </div>

      {/* 13. PACKAGES */}
      <div id="packages">
        <div className="scroll-reveal">
          <PackagesSection />
        </div>
      </div>

      {/* 14. PARTNER BANKS */}
      <div className="scroll-reveal">
        <PartnerBank />
      </div>

      {/* 15. CEO QUOTE */}
      <div className="scroll-reveal">
        <CEOQuote />
      </div>

      {/* 16. CONTACT FORM */}
      <div id="contact">
        <div className="scroll-reveal">
          <ContactSection />
        </div>
      </div>
      {/* 5. SCHOLARSHIP CTA */}
      <div className="scroll-reveal">
        <ScholarshipCTA />
      </div>

      {/* FOOTER */}
      <div className="scroll-reveal">
        <Footer />
      </div>

      {/* POPUP */}
      {showPopup && !loading && !user && (
        <div className="popup-overlay">
          <div className="modern-popup">
            <button className="popup-close" onClick={() => { setShowPopup(false); localStorage.setItem("popupShown", "true"); }}>×</button>
            <h2>Unlock More Opportunities!</h2>
            <p>Login or Register now to access personalized guidance, scholarships, and priority support from our expert team.</p>
            <div className="modern-popup-buttons">
              <button onClick={() => navigate("/login")} className="modern-btn">Login</button>
              <button onClick={() => navigate("/register")} className="modern-btn modern-btn-alt">Register</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
