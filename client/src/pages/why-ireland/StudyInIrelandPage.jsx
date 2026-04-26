import React from "react";
import { Link, useLocation } from "react-router-dom";
import SEO from "../../components/SEO";
import WhyIrelandBentoHero from "../../components/WhyIrelandBentoHero";
import TopUtilityBar from "../../components/TopUtilityBar";
import Navbar3 from "../../components/navbar3";
import Footer from "../../components/Footer";
import "./StudyInIrelandPage.css";

const HERO_TEXT =
  "Ireland is known for its Academic excellence and internationally-recognized qualifications. It not only provides vibrant campus life, and abundant growth in research, but also immense employment opportunities.";

function StudyInIrelandMain() {
  const location = useLocation();
  const canonicalPath = location.pathname === "/study" ? "/study" : "/why-ireland/study-in-ireland";

  return (
    <>
      <SEO
        title="Campus — Study in Ireland"
        description="Study levels, NFQ, fees, teaching methods, degree levels, semesters, and pathway programs in Ireland. FineAnswer Ireland supports higher education applicants."
        canonicalPath={canonicalPath}
      />
      <main className="si-campus">
        <WhyIrelandBentoHero
          title="Campus — Study in Ireland"
          subtitle={HERO_TEXT}
          quickFacts={[
            { label: "Typical tuition", value: "€6k–€25k / year" },
            { label: "Popular intake", value: "September" },
            { label: "Language", value: "English" },
          ]}
        />

        <section className="si-campus__section" aria-labelledby="si-levels-heading">
          <h2 id="si-levels-heading" className="si-campus__h2">
            Study Levels in Ireland
          </h2>
          <ul className="si-campus__list si-campus__list--cards">
            <li className="si-campus__list-item">Primary education including pre-primary</li>
            <li className="si-campus__list-item">Post primary education</li>
            <li className="si-campus__list-item">Further education and training</li>
            <li className="si-campus__list-item">Higher education</li>
          </ul>
          <p className="si-campus__note">FineAnswer Ireland assists international students at Higher Education level.</p>
        </section>

        <section className="si-campus__section" aria-labelledby="si-nfq-heading">
          <h2 id="si-nfq-heading" className="si-campus__h2">
            National Framework of Qualifications (NFQ)
          </h2>
          <p className="si-campus__p">
            The NFQ specifies the standards of Irish education qualifications. It measures and compares learning standards and facilitates transfer between institutions. Since NFQ corresponds with the European Qualification Framework, your degree is recognised globally.
          </p>
          <p className="si-campus__p">
            Both Irish universities, Institutes of Technology and HECA private colleges provide third-level qualifications on the NFQ.
          </p>

          <h3 className="si-campus__h3">Qualifications Recognition</h3>
          <p className="si-campus__p">What it does:</p>
          <ul className="si-campus__bullets">
            <li>Provides academic recognition of foreign qualifications</li>
            <li>Assesses school and vocational qualifications</li>
            <li>Assesses higher education qualifications and compares with NFQ level</li>
            <li>Provides information on the Irish education and training system</li>
          </ul>
        </section>

        <section className="si-campus__section" aria-labelledby="si-fee-heading">
          <h2 id="si-fee-heading" className="si-campus__h2">
            Fee Structure
          </h2>
          <p className="si-campus__p si-campus__intro">
            FineAnswer Ireland will assist you in finding a relevant degree that matches your budget. The average degree costs between €6,000 and €25,000 a year.
          </p>
          <div className="si-campus__table-wrap">
            <table className="si-campus__table">
              <thead>
                <tr>
                  <th scope="col">Country</th>
                  <th scope="col">Tuition Fee Per Annum</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Australia</td>
                  <td>Starting from 20,000 AUD</td>
                </tr>
                <tr>
                  <td>Canada</td>
                  <td>Starting from 20,000 CAD</td>
                </tr>
                <tr>
                  <td>UK</td>
                  <td>Starting from 10,000-12,000 GBP</td>
                </tr>
                <tr className="si-campus__table-highlight">
                  <td>
                    Ireland
                    <span className="si-campus__nfq-tag"> Best value</span>
                  </td>
                  <td>Starting from 6,000-10,000 Euro</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="si-campus__section" aria-labelledby="si-teaching-heading">
          <h2 id="si-teaching-heading" className="si-campus__h2">
            Teaching &amp; Delivery Method
          </h2>
          <p className="si-campus__p">
            Universities and colleges in Ireland provide an interactive and innovative learning approach. Students engage with classmates and instructors while understanding topics. Irish system supports international students both in and outside the classroom.
          </p>
          <p className="si-campus__p">
            Independent learning includes assignments, academic reading, and lecture notes. Tutorials are also conducted alongside lectures. Classroom sizes are smaller for more focused attention. English is the medium of instruction.
          </p>
        </section>

        <section className="si-campus__section" aria-labelledby="si-degree-heading">
          <h2 id="si-degree-heading" className="si-campus__h2">
            Degree Levels
          </h2>
          <div className="si-campus__degree-grid">
            <article className="si-campus__degree-card">
              <div className="si-campus__degree-level">Level 7</div>
              <h3 className="si-campus__degree-name">Bachelor&apos;s Degree</h3>
              <p className="si-campus__degree-dur">Duration: 3 years</p>
            </article>
            <article className="si-campus__degree-card">
              <div className="si-campus__degree-level">Level 8</div>
              <h3 className="si-campus__degree-name">Honours Bachelor&apos;s Degree</h3>
              <p className="si-campus__degree-dur">Duration: 3-4 years</p>
            </article>
            <article className="si-campus__degree-card">
              <div className="si-campus__degree-level">Level 9</div>
              <h3 className="si-campus__degree-name">Master&apos;s Degree</h3>
              <p className="si-campus__degree-dur">Duration: 1 year (some 16-24 months)</p>
            </article>
            <article className="si-campus__degree-card">
              <div className="si-campus__degree-level">Level 10</div>
              <h3 className="si-campus__degree-name">Doctoral Degree</h3>
              <p className="si-campus__degree-dur">Duration: 3 years + dissertation</p>
            </article>
          </div>
        </section>

        <section className="si-campus__section" aria-labelledby="si-semester-heading">
          <h2 id="si-semester-heading" className="si-campus__h2">
            Semester Structure
          </h2>
          <div className="si-campus__semester">
            <div className="si-campus__semester-row">
              <span className="si-campus__semester-label">First Semester</span>
              <span className="si-campus__semester-value">September – December</span>
            </div>
            <div className="si-campus__semester-row">
              <span className="si-campus__semester-label">Christmas Break</span>
              <span className="si-campus__semester-value">December / January</span>
            </div>
            <div className="si-campus__semester-row">
              <span className="si-campus__semester-label">Second Semester</span>
              <span className="si-campus__semester-value">Late January – May</span>
            </div>
            <div className="si-campus__semester-row">
              <span className="si-campus__semester-label">Summer Break</span>
              <span className="si-campus__semester-value">May – Early September</span>
            </div>
          </div>
        </section>

        <section className="si-campus__section" aria-labelledby="si-pathway-heading">
          <h2 id="si-pathway-heading" className="si-campus__h2">
            Pathway Programs
          </h2>
          <p className="si-campus__p">
            International students can apply for Pathway programs if they cannot fulfill direct entry requirements. Pre-master pathway programs are also available.
          </p>
          <p className="si-campus__p">
            Irish institutions provide foundation studies in business, social sciences, engineering, and pure/applied sciences. Universities have arrangements with private pathway providers to support students.
          </p>
        </section>

        <section className="si-campus__cta" aria-label="Apply">
          <p className="si-campus__cta-text">Are you ready to take the next step toward your future career?</p>
          <Link to="/#contact" className="si-campus__cta-btn">
            Apply Now
          </Link>
        </section>
      </main>
    </>
  );
}

/** Full page with header/footer — use for <Route path="/study" /> */
export function StudyInIrelandRouteLayout() {
  return (
    <div className="LandingPage why-ireland-hub">
      <div className="landing-top">
        <TopUtilityBar />
        <Navbar3 />
      </div>
      <StudyInIrelandMain />
      <Footer />
    </div>
  );
}

/** Embedded under WhyIrelandHub (no duplicate chrome) */
export default function StudyInIrelandPage() {
  return <StudyInIrelandMain />;
}
