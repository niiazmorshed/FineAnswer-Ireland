import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AboutUs from "./components/AboutUs";
import BentoHero from "./components/BentoHero";
import BrowseBySubject from "./components/BrowseBySubject";
import CEOQuote from "./components/CEOQuote";
import ContactSection from "./components/ContactSection";
import EventsSection from "./components/EventsSection";
import FAQSection from "./components/FAQSection";
import FeaturedCourses from "./components/FeaturedCourses";
import Footer from "./components/Footer";
import Navbar3 from "./components/navbar3";
import PackagesSection from "./components/PackagesSection";
import ParticlesBackground from "./components/ParticlesBackground";
import PartnerBank from "./components/PartnerBank";
import PartnerLogos from "./components/PartnerLogos";
import QuickLinks from "./components/QuickLinks";
import ScholarshipCTA from "./components/ScholarshipCTA";
import Services from "./components/Services";
import SuccessStories from "./components/SuccessStories";
import TopUtilityBar from "./components/TopUtilityBar";

import { AuthContext } from "./pages/Provider/ContextProvider";

import SEO from "./components/SEO";
import "./LandingPage.css";

const getPageScrollY = () => {
  const scrollingElement = document.scrollingElement || document.documentElement;
  return Math.max(
    0,
    window.scrollY ||
      scrollingElement?.scrollTop ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0
  );
};

const getEventScrollY = (event) => {
  const target = event?.target;
  if (
    target &&
    target !== window &&
    target !== document &&
    target !== document.documentElement &&
    target !== document.body &&
    typeof target.scrollTop === "number"
  ) {
    return target.scrollTop;
  }

  return getPageScrollY();
};

export default function LandingPage() {
  const navigate = useNavigate();
  const { user, loading } = useContext(AuthContext);
  const [headerHidden, setHeaderHidden] = useState(false);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const lastHeaderY = React.useRef(0);
  const headerFrame = React.useRef(null);
  const headerHiddenRef = React.useRef(false);
  const headerScrolledRef = React.useRef(false);
  const headerScrollIntent = React.useRef({ direction: 0, distance: 0 });


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
    const revealAtTop = 80;
    const noiseThreshold = 2;
    const hideDistance = 22;
    const showDistance = 8;

    const setHeaderScrolledStable = (next) => {
      if (headerScrolledRef.current === next) return;
      headerScrolledRef.current = next;
      setHeaderScrolled(next);
    };

    const setHeaderHiddenStable = (next) => {
      if (headerHiddenRef.current === next) return;
      headerHiddenRef.current = next;
      setHeaderHidden(next);
    };

    const resetIntent = () => {
      headerScrollIntent.current = { direction: 0, distance: 0 };
    };

    const applyScrollPosition = (y) => {
      const delta = y - lastHeaderY.current;
      lastHeaderY.current = y;

      setHeaderScrolledStable(y > 10);

      if (y <= revealAtTop) {
        resetIntent();
        setHeaderHiddenStable(false);
        return;
      }

      if (Math.abs(delta) < noiseThreshold) return;

      const direction = delta > 0 ? 1 : -1;
      const intent = headerScrollIntent.current;
      if (intent.direction !== direction) {
        intent.direction = direction;
        intent.distance = 0;
      }

      intent.distance += Math.abs(delta);

      if (direction > 0 && !headerHiddenRef.current && intent.distance >= hideDistance) {
        setHeaderHiddenStable(true);
        resetIntent();
      } else if (direction < 0 && headerHiddenRef.current && intent.distance >= showDistance) {
        setHeaderHiddenStable(false);
        resetIntent();
      }
    };

    const scheduleFromScroll = (event) => {
      if (headerFrame.current !== null) return;
      headerFrame.current = window.requestAnimationFrame(() => {
        headerFrame.current = null;
        const y = getEventScrollY(event);
        applyScrollPosition(y);
      });
    };

    lastHeaderY.current = getPageScrollY();
    headerScrolledRef.current = lastHeaderY.current > 10;
    headerHiddenRef.current = false;
    setHeaderScrolled(headerScrolledRef.current);
    setHeaderHiddenStable(false);
    resetIntent();

    window.addEventListener("scroll", scheduleFromScroll, { passive: true });
    document.addEventListener("scroll", scheduleFromScroll, { passive: true, capture: true });

    return () => {
      window.removeEventListener("scroll", scheduleFromScroll);
      document.removeEventListener("scroll", scheduleFromScroll, { capture: true });
      if (headerFrame.current !== null) {
        window.cancelAnimationFrame(headerFrame.current);
        headerFrame.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const els = Array.from(document.querySelectorAll(".scroll-reveal"));
    if (!els.length) return;

    if (window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const reveal = (el) => {
      if (!el.classList.contains("is-visible")) {
        el.classList.add("is-visible");
        obs.unobserve(el);
      }
    };

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) reveal(e.target);
        });
      },
      /**
       * threshold 0 = reveal as soon as any pixel enters the viewport.
       * A high threshold (e.g. 0.16) fails for very tall blocks (Services on mobile):
       * visible height / section height can stay below the ratio, so content stays
       * opacity:0 while still taking layout space — looks like a white gap on slow/prod paints.
       */
      { threshold: 0, rootMargin: "0px 0px 0px 0px" }
    );

    els.forEach((el) => obs.observe(el));

    /** Catch IO edge cases (subpixel, late layout) so sections never stay invisible on-screen */
    const revealAnyAlreadyInView = () => {
      const vh = window.innerHeight;
      els.forEach((el) => {
        if (el.classList.contains("is-visible")) return;
        const r = el.getBoundingClientRect();
        if (r.top < vh && r.bottom > 0) reveal(el);
      });
    };
    requestAnimationFrame(revealAnyAlreadyInView);

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
    <>
    {/* landing-top is intentionally OUTSIDE .LandingPage.
        .LandingPage uses isolation:isolate which traps position:fixed
        descendants (Chrome/Brave bug), making them scroll with the page. */}
    <div className={`landing-top landing-top--home${headerScrolled ? " is-scrolled" : ""}${headerHidden ? " is-hidden" : ""}`}>
      <TopUtilityBar />
      <Navbar3
        autoHide={false}
        withSpacer={false}
        controlledScrolled={headerScrolled}
        controlledHidden={false}
      />
    </div>
    <div className="landing-top-spacer" aria-hidden="true" />
    <div className="LandingPage">
      <SEO
        title="Study in Ireland"
        canonicalPath="/"
        description="Study in Ireland with FineAnswer Ireland. Search courses, shortlist universities, get SOP and visa guidance, and move step-by-step from application to arrival."
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "FineAnswer Ireland",
          url: "https://www.fineanswer.net/",
          potentialAction: {
            "@type": "SearchAction",
            target: "https://www.fineanswer.net/search-results?q={search_term_string}&country=Ireland",
            "query-input": "required name=search_term_string",
          },
        }}
      />
      <ParticlesBackground />

      <BentoHero
        useGlobeHero
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
        onSearch={({ country, level, category, intake }) => {
          const params = new URLSearchParams();
          params.set("country", country || "Ireland");
          if (level) params.set("level", level);
          if (category) params.set("category", category);
          if (intake) params.set("intake", intake);
          navigate(`/search-results?${params.toString()}`);
        }}
      />

      {/* 2. ABOUT US */}
      <div className="scroll-reveal">
        <AboutUs />
      </div>

      {/* 3. Choose an Area of Interest */}
      <div className="scroll-reveal">
        <BrowseBySubject />
      </div>

      {/* 4. SERVICES WE OFFER */}
      <div id="services">
        <div className="scroll-reveal">
          <Services />
        </div>
      </div>

      {/* 5. PARTNER INSTITUTES — directly under Services */}
      <div className="scroll-reveal">
        <PartnerLogos />
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

      {/* 11. EVENTS */}
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
    </>
  );
}
