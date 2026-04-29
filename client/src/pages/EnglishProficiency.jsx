import React, { useState } from "react";
import SEO from "../components/SEO";
import LandingHeader from "../components/LandingHeader";
import Footer from "../components/Footer";
import "./EnglishProficiency.css";

const PREP_CARDS = [
  {
    title: "TOEFL Face to Face/Online",
    price: "Rs.30,000",
    desc: "Unlimited Class duration, Study till you are satisfied in one time fee",
    href: "https://store.icd.org.pk/collections/toefl/products/ets-toefl-preparation-classes-face-to-face",
  },
  {
    title: "IELTS Face to Face/Online",
    price: "Rs.30,000",
    desc: "Unlimited Class duration, Study till you are satisfied in one time fee",
    href: "https://store.icd.org.pk/collections/ielts/products/ielts-face-to-face-preparation-classes",
  },
  {
    title: "PTE Face to Face/Online",
    price: "Rs.30,000",
    desc: "Unlimited Class duration, Study till you are satisfied in one time fee",
    href: "https://store.icd.org.pk/collections/pte-academic/products/pearson-pte-academic-preparation-classes-face-to-face",
  },
  {
    title: "Duolingo Face to Face/Online",
    price: "Rs.30,000",
    desc: "Unlimited Class duration, Study till you are satisfied in one time fee",
    href: "https://store.icd.org.pk/collections/duolingo",
  },
];

const ONLINE_EXAMS = [
  { title: "LinguaSkill (Cambridge)", accepted: "UK, Ireland, and some Australia institutions" },
  { title: "TOEFL Home Edition", accepted: "Worldwide" },
  { title: "Duolingo English Test", accepted: "Ireland, UK, Canada, and US institutions" },
  { title: "Language Cert", accepted: "UK institutions for admissions & visa purposes" },
  {
    title: "English Score by British Council",
    accepted:
      "Test your English on your mobile phone and get a British Council Certificate. Impress colleagues, employer and enhance your CV.",
  },
];

const ICD_CENTERS = [
  {
    title: "Computer Delivered IDP IELTS",
    desc: "Accepted worldwide",
    label: "Learn more about IELTS",
    href: "https://www.icd.org.pk/IELTS",
  },
  {
    title: "PSI UKVI SELT",
    desc: "For student visa purposes. All UK visa categories.",
    label: "Learn more about SELT",
    href: "https://www.icd.org.pk/SELT",
  },
  {
    title: "TOEFL iBT and GRE",
    desc: "Accepted worldwide with focus on US and Canada.",
    label: "Learn more about TOEFL",
    href: "https://www.icd.org.pk/TOEFL",
  },
  {
    title: "Cambridge English Exams",
    desc: "Including Cambridge English Advanced (CAE), First Certificate in English (FCE), and Business English Certificate (BEC). Accepted for UK, Ireland and Australia.",
    label: "Learn more about CAE",
    href: "https://www.icd.org.pk/cae/",
  },
];

function EnglishTestsMain() {
  const [tab, setTab] = useState("toefl");

  return (
    <>
      <SEO
        title="English Tests"
        description="Discount vouchers, exam booking process, preparation classes, and test center options with FineAnswer Ireland and ICD."
        canonicalPath="/english-tests"
      />
      <main className="ep-page">
        <header className="ep-hero">
          <span className="ep-badge">Save Up to 20% on Exams</span>
          <h1 className="ep-title">Get Discount Vouchers for Exams and Amazing Prices</h1>
          <p className="ep-subtitle">
            With Institute of Career Development, you can save 10-15% on exams. We want to help more students.
          </p>
          <a
            className="ep-hero-btn"
            href="https://store.icd.org.pk/collections/exam-vouchers"
            target="_blank"
            rel="noopener noreferrer"
          >
            Buy Voucher
          </a>

          <div className="ep-steps" aria-label="Discount steps">
            <div className="ep-step">
              <span className="ep-step__num">1</span>
              <span>Choose Your Exam</span>
            </div>
            <span className="ep-step__arrow">→</span>
            <div className="ep-step">
              <span className="ep-step__num">2</span>
              <span>Add Exam to Cart</span>
            </div>
            <span className="ep-step__arrow">→</span>
            <div className="ep-step">
              <span className="ep-step__num">3</span>
              <span>Apply Discount</span>
            </div>
          </div>
        </header>

        <section className="ep-section">
          <h2>Preparation Classes at a Discount</h2>
          <p className="ep-section__subtitle">Offers Preparation Classes at a Discount!</p>
          <div className="ep-prep-grid">
            {PREP_CARDS.map((item) => (
              <article key={item.title} className="ep-prep-card">
                <h3>{item.title}</h3>
                <p className="ep-prep-card__price">{item.price}</p>
                <p>{item.desc}</p>
                <a href={item.href} target="_blank" rel="noopener noreferrer">
                  View Offer
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="ep-banner">
          <p>Save up to 20% on the TOEFL exam when you register through www.store.icd.org.pk</p>
          <a href="https://www.ets.org/toefl.html" target="_blank" rel="noopener noreferrer">
            Register Now
          </a>
        </section>

        <section className="ep-section">
          <h2>Exclusive Discounts by Institute of Career Development (ICD)</h2>
          <p className="ep-section__subtitle">
            Exclusive Discount Process for Exam Bookings – TOEFL, Duolingo, CAE C1 and Language Cert.
          </p>
          <div className="ep-tabs" role="tablist" aria-label="Discount tabs">
            <button className={tab === "toefl" ? "is-active" : ""} onClick={() => setTab("toefl")}>
              TOEFL Exam
            </button>
            <button className={tab === "duolingo" ? "is-active" : ""} onClick={() => setTab("duolingo")}>
              Duolingo English Test
            </button>
            <button className={tab === "langcert" ? "is-active" : ""} onClick={() => setTab("langcert")}>
              Language Cert
            </button>
          </div>

          {tab === "toefl" ? (
            <div className="ep-tab-panel">
              <h3>TOEFL Exam – 20% Discount</h3>
              <div className="ep-card">
                <h4>Step 1:</h4>
                <p>Book your TOEFL exam directly through the official ETS website</p>
                <a href="https://www.ets.org/toefl.html" target="_blank" rel="noopener noreferrer">
                  Register on ETS Website
                </a>
              </div>
              <div className="ep-card">
                <h4>Step 2:</h4>
                <p>Use exclusive TOEFL Discount Code during booking:</p>
                <div className="ep-code-box">PAK1850101</div>
                <div className="ep-qr-placeholder" aria-label="QR code placeholder">
                  QR Code Placeholder
                </div>
              </div>
            </div>
          ) : null}

          {tab === "duolingo" ? (
            <div className="ep-tab-panel">
              <h3>Duolingo English Test – 10% Discount</h3>
              <ol className="ep-ordered">
                <li>
                  Go to the official Duolingo invite link
                  <div>
                    <a
                      href="https://englishtest.duolingo.com/register"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Register Duolingo Test
                    </a>
                  </div>
                </li>
                <li>Fill out the basic information required on the website.</li>
                <li>
                  Share your email address with ICD via WhatsApp:
                  <a href="https://wa.me/923171170216" target="_blank" rel="noopener noreferrer">
                    {" "}
                    +92 317 1170216
                  </a>
                </li>
                <li>Our team will assign your personal Duolingo Discount Code via email.</li>
              </ol>
            </div>
          ) : null}

          {tab === "langcert" ? (
            <div className="ep-tab-panel">
              <h3>Language Cert – 10% Discount</h3>
              <div className="ep-card">
                <h4>Step 1:</h4>
                <p>Go to ICD Store</p>
                <a href="https://store.icd.org.pk/search?q=languagecert" target="_blank" rel="noopener noreferrer">
                  Go To ICD Store
                </a>
              </div>
              <div className="ep-card">
                <h4>Step 2:</h4>
                <p>Apply voucher Discount Code:</p>
                <div className="ep-code-box">ICDEXAM2025</div>
                <div className="ep-qr-placeholder" aria-label="QR code placeholder">
                  QR Code Placeholder
                </div>
                <div className="ep-warning">
                  Discount code is only applicable for the Language Cert Home-based online exam. Not applicable for
                  SELT Exam.
                </div>
              </div>
            </div>
          ) : null}
        </section>

        <section className="ep-section">
          <h2>English Tests with FineAnswer Ireland</h2>
          <p className="ep-section__subtitle">
            FineAnswer Ireland&apos;s partner, Institute of Career Development (www.icd.org.pk) offers various English
            exams approved for student visas and admissions in top Universities. Exams can be attempted at ICD Centers
            or at home. Test fee vouchers can be purchased from FineAnswer Ireland / ICD.
          </p>
        </section>

        <section className="ep-section">
          <h2>Online Exams at Home</h2>
          <p className="ep-section__subtitle">(Attempt at home, quick results, less test fee)</p>
          <div className="ep-feature-grid">
            {ONLINE_EXAMS.map((item) => (
              <article key={item.title} className="ep-feature-card">
                <h3>{item.title}</h3>
                <p>
                  <strong>Accepted at:</strong> {item.accepted}
                </p>
              </article>
            ))}
          </div>
          <p className="ep-note">
            To book these exams / purchase test vouchers and logins see online store at ICD: https://store.icd.org.pk/
          </p>
          <a className="ep-inline-btn" href="https://store.icd.org.pk/" target="_blank" rel="noopener noreferrer">
            Visit ICD Store
          </a>
        </section>

        <section className="ep-section">
          <h2>Appear in English Exams at ICD Managed Centers</h2>
          <div className="ep-feature-grid ep-feature-grid--centers">
            {ICD_CENTERS.map((item) => (
              <article key={item.title} className="ep-feature-card">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                <a href={item.href} target="_blank" rel="noopener noreferrer">
                  {item.label}
                </a>
              </article>
            ))}
          </div>
          <p className="ep-note">
            To book these exams / purchase test vouchers and logins, go to the ICD test web link or see the online
            store:
          </p>
          <a className="ep-inline-btn" href="https://store.icd.org.pk/" target="_blank" rel="noopener noreferrer">
            Visit ICD Store
          </a>
        </section>

        <section className="ep-cta">
          <p className="ep-cta__text">Are you ready to take the next step toward your future career?</p>
          <a href="/#contact">Apply Now</a>
        </section>
      </main>
    </>
  );
}

export function EnglishTestsRouteLayout() {
  return (
    <>
      <LandingHeader />
      <div className="LandingPage why-ireland-hub">
        <EnglishTestsMain />
        <Footer />
      </div>
    </>
  );
}

export default function EnglishProficiency() {
  return <EnglishTestsMain />;
}
