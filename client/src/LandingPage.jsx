import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaGraduationCap,
  FaUniversity,
  FaShieldAlt,
} from "react-icons/fa";

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

import useFadeIn from "./hooks/useFadeIn";
import { AuthContext } from "./pages/Provider/ContextProvider";

import "./LandingPage.css";
import uni1 from "./assets/DCU.jpg";
import uni4 from "./assets/Trinity1.jpg";
import uni2 from "./assets/UL.jpg";
import uni3 from "./assets/setu.jpg";

export default function LandingPage() {
  const navigate = useNavigate();
  const { user, loading } = useContext(AuthContext);

  // fade-in refs
  const [searchRef2, searchVisible] = useFadeIn();
  const [logosRef, logosVisible] = useFadeIn();
  const [subjectRef, subjectVisible] = useFadeIn();
  const [servicesRef, servicesVisible] = useFadeIn();
  const [quickRef, quickVisible] = useFadeIn();
  const [coursesRef, coursesVisible] = useFadeIn();
  const [storiesRef, storiesVisible] = useFadeIn();
  const [faqRef, faqVisible] = useFadeIn();
  const [eventsRef, eventsVisible] = useFadeIn();
  
  const [packagesRef, packagesVisible] = useFadeIn();
  const [ceoRef, ceoVisible] = useFadeIn();
  const [contactRef, contactVisible] = useFadeIn();

  // hero slideshow
  const images = [uni1, uni2, uni3, uni4];
  const [currentImage, setCurrentImage] = useState(0);

  // search state
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

  // close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target))
        setActiveDropdown(null);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // hash scroll
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

  // hero image slider
  useEffect(() => {
    const id = setInterval(() => setCurrentImage((p) => (p + 1) % images.length), 5000);
    return () => clearInterval(id);
  }, [images.length]);

  // popup
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
      <Navbar3 />

      {/* ───────────── 1. HERO ───────────── */}
      <section className="hero-section-new">
        <div className="hero-background">
          {images.map((img, i) => (
            <div
              key={i}
              className={`hero-bg-slide ${i === currentImage ? "active" : ""}`}
              style={{ backgroundImage: `url(${img})` }}
            />
          ))}
        </div>
        <div className="hero-overlay" />

        <div className="hero-content-wrapper">
          <div className="hero-badge"><span>✦</span> FineAnswer Ireland</div>

          <h1 className="hero-title">
            Your Gateway to<br /><span>Irish Education</span>
          </h1>

          <p className="hero-subtitle">
            Discover thousands of courses, verify documents, and connect with
            Irish educational institutions through our comprehensive platform.
          </p>

          <button className="hero-cta-primary" onClick={() => navigate("/search-results?country=Ireland")}>
            View Our Course Search Engine →
          </button>

          {/* Stat cards */}
          <div className="hero-stat-cards">
            <div className="hero-stat-card">
              <span className="hero-stat-icon"><FaGraduationCap /></span>
              <div>
                <strong>3,000+ Courses</strong>
                <p>Find your perfect program from Ireland's top institutions</p>
              </div>
            </div>
            <div className="hero-stat-card">
              <span className="hero-stat-icon"><FaUniversity /></span>
              <div>
                <strong>20+ Institutes</strong>
                <p>Partnered with Ireland's leading educational providers</p>
              </div>
            </div>
            <div className="hero-stat-card">
              <span className="hero-stat-icon"><FaShieldAlt /></span>
              <div>
                <strong>Secure Verification</strong>
                <p>Fast and secure document verification process</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── 2. COURSE SEARCH ENGINE ───────────── */}
      <div ref={searchRef2} className={`fade-section ${searchVisible ? "show" : ""}`}>
        <section className="search-engine-section" id="search">
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
      </div>

      {/* ───────────── 3. PARTNER INSTITUTES ───────────── */}
      <div ref={logosRef} className={`fade-section ${logosVisible ? "show" : ""}`}>
        <PartnerLogos />
      </div>

      {/* ───────────── 4. BROWSE BY SUBJECT ───────────── */}
      <div ref={subjectRef} className={`fade-section ${subjectVisible ? "show" : ""}`}>
        <BrowseBySubject />
      </div>

      {/* ───────────── 5. SCHOLARSHIP CTA ───────────── */}
      <ScholarshipCTA />

      {/* ───────────── 6. SERVICES WE OFFER ───────────── */}
      <div ref={servicesRef} className={`fade-section ${servicesVisible ? "show" : ""}`}>
        <Services />
      </div>

      {/* ───────────── 7. QUICK LINKS ───────────── */}
      <div ref={quickRef} className={`fade-section ${quickVisible ? "show" : ""}`}>
        <QuickLinks />
      </div>

      {/* ───────────── 8. FEATURED COURSES ───────────── */}
      <div ref={coursesRef} className={`fade-section ${coursesVisible ? "show" : ""}`}>
        <FeaturedCourses />
      </div>

      {/* ───────────── 9. SUCCESS STORIES ───────────── */}
      <div ref={storiesRef} className={`fade-section ${storiesVisible ? "show" : ""}`}>
        <SuccessStories />
      </div>

      {/* ───────────── 10. FAQ ───────────── */}
      <div ref={faqRef} className={`fade-section ${faqVisible ? "show" : ""}`}>
        <FAQSection />
      </div>

      {/* ───────────── 11. ENQUIRY CTA BANNER ───────────── */}
      <EnquiryCTA />

      {/* ───────────── 12. EVENTS ───────────── */}
      <div ref={eventsRef} className={`fade-section ${eventsVisible ? "show" : ""}`}>
        <EventsSection />
      </div>

      {/* ───────────── 13. PACKAGES ───────────── */}
      <div id="packages" ref={packagesRef} className={`fade-section ${packagesVisible ? "show" : ""}`}>
        <PackagesSection />
      </div>

      {/* ───────────── 15. PARTNER BANKS ───────────── */}
      <div className={`fade-section ${logosVisible ? "show" : ""}`}>
        <PartnerBank />
      </div>

      {/* ───────────── 16. CEO QUOTE ───────────── */}
      <div ref={ceoRef} className={`fade-section ${ceoVisible ? "show" : ""}`}>
        <CEOQuote />
      </div>

      {/* ───────────── 17. CONTACT FORM ───────────── */}
      <div id="contact" ref={contactRef} className={`fade-section ${contactVisible ? "show" : ""}`}>
        <ContactSection />
      </div>

      {/* ───────────── FOOTER ───────────── */}
      <Footer />

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
