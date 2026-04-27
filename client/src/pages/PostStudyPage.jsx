import React from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import LandingHeader from "../components/LandingHeader";
import Footer from "../components/Footer";
import "./PostStudyPage.css";

const FLOW_STEPS = [
  "Study",
  "Stamp 1G",
  "Stamp 1",
  "Stamp 4",
  "Permanent Residency",
  "Irish Citizenship",
];

const TIMELINE_ROWS = [
  { stage: "Study", stamp: "Stamp 2", duration: "1–2 years" },
  { stage: "Post-Study Work", stamp: "Stamp 1G", duration: "1–2 years" },
  { stage: "Employment", stamp: "Stamp 1", duration: "2–5 years" },
  { stage: "Permanent Residency", stamp: "Stamp 4", duration: "Ongoing" },
  { stage: "Citizenship", stamp: "—", duration: "Total 8–10 years" },
];

const EXTERNAL_RESOURCES = [
  {
    title: "Stay Back Option – Education in Ireland",
    href: "https://www.educationinireland.com/en/Why-Study-in-Ireland-/Ireland-s-Strengths/Stay-Back-Option-for-International-Students-in-Ireland.html",
  },
  {
    title: "Third Level Graduate Programme – Irish Immigration Service",
    href: "https://www.irishimmigration.ie/my-situation-has-changed-since-i-arrived-in-ireland/third-level-graduate-programme/",
  },
  {
    title: "Critical Skills Occupation List",
    href: "https://enterprise.gov.ie/en/what-we-do/workplace-and-skills/employment-permits/employment-permit-eligibility/highly-skilled-eligible-occupations-list/",
  },
];

function PostStudyMain() {
  return (
    <>
      <SEO
        title="Post Study — Stay Back Option for International Students in Ireland"
        description="Immigration stamps, Stamp 2, Stamp 1G post-study work, employment permits, Stamp 1, Stamp 4, and pathway to Irish citizenship for international students."
        canonicalPath="/poststudy"
      />
      <main className="ps-page">
        <header className="ps-hero">
          <h1 className="ps-hero__title">Stay Back Option for International Students in Ireland</h1>
          <p className="ps-hero__subtitle">
            Ireland offers a transparent, legal, and well-structured immigration pathway for international
            students who wish to study, gain professional experience, and eventually settle long-term.
          </p>
        </header>

        <section className="ps-section" aria-labelledby="ps-s1">
          <h2 id="ps-s1" className="ps-h2">
            Understanding Immigration Stamps in Ireland
          </h2>
          <p className="ps-p">
            Irish immigration permission is granted through residency stamps, each representing a specific legal
            status.
          </p>
          <div className="ps-stamp-grid">
            <article className="ps-stamp-card">
              <h3 className="ps-stamp-card__label">Stamp 2</h3>
              <p className="ps-stamp-card__desc">Student permission (during studies)</p>
            </article>
            <article className="ps-stamp-card">
              <h3 className="ps-stamp-card__label">Stamp 1G</h3>
              <p className="ps-stamp-card__desc">Post-Study Work permission (Third Level Graduate Programme)</p>
            </article>
            <article className="ps-stamp-card">
              <h3 className="ps-stamp-card__label">Stamp 1</h3>
              <p className="ps-stamp-card__desc">Employment-based permission (work permit holder)</p>
            </article>
            <article className="ps-stamp-card">
              <h3 className="ps-stamp-card__label">Stamp 4</h3>
              <p className="ps-stamp-card__desc">Long-term residence / permanent-type status</p>
            </article>
          </div>
          <p className="ps-note">
            <strong>Note:</strong> Stamp 1 is not issued at the study or PSW stage. It appears only after a
            graduate secures a qualifying job and employment permit. Stamp 1G acts as the bridge between
            education and Stamp 1 employment.
          </p>
        </section>

        <section className="ps-section" aria-labelledby="ps-s2">
          <h2 id="ps-s2" className="ps-h2">
            Stage One – Study in Ireland (Stamp 2)
          </h2>
          <p className="ps-p">
            International students are granted Stamp 2 while enrolled in a recognised Irish higher-education
            institution.
          </p>
          <h3 className="ps-h3">Key Features</h3>
          <ul className="ps-bullets">
            <li>Limited work rights during term time</li>
            <li>Full-time work allowed during official holidays</li>
            <li>Valid only for study purposes</li>
          </ul>
          <p className="ps-note ps-note--warn">
            <strong>Important Note:</strong> Time spent on Stamp 2 does not count toward long-term residency or
            citizenship. It is purely a temporary educational status.
          </p>
        </section>

        <section className="ps-section" aria-labelledby="ps-s3">
          <h2 id="ps-s3" className="ps-h2">
            Stage Two – Post-Study Work (Stamp 1G)
          </h2>
          <p className="ps-p">
            After successful completion of a recognised Irish qualification, graduates may apply for Stamp 1G
            under the Third Level Graduate Programme (PSW).
          </p>
          <h3 className="ps-h3">Duration</h3>
          <div className="ps-dual-cards">
            <article className="ps-mini-card">
              <h4 className="ps-mini-card__title">Bachelor&apos;s Degree (NFQ Level 8)</h4>
              <p className="ps-mini-card__value">Up to 12 months</p>
            </article>
            <article className="ps-mini-card">
              <h4 className="ps-mini-card__title">Master&apos;s Degree (NFQ Level 9)</h4>
              <p className="ps-mini-card__value">Up to 24 months</p>
            </article>
          </div>
          <h3 className="ps-h3">Purpose of Stamp 1G</h3>
          <ul className="ps-bullets">
            <li>Work full-time without an employment permit</li>
            <li>Gain Irish professional experience</li>
            <li>Secure a skilled job leading to an employment permit</li>
          </ul>
          <p className="ps-note">
            <strong>Note:</strong> Stamp 1G is temporary and non-renewable beyond the allowed period.
          </p>
        </section>

        <section className="ps-section" aria-labelledby="ps-s4">
          <h2 id="ps-s4" className="ps-h2">
            Transition from Stamp 1G to Stamp 1
          </h2>
          <p className="ps-p">
            Stamp 1G does not automatically convert to Stamp 1. The transition occurs only after securing a
            qualifying job offer and an approved employment permit.
          </p>
          <p className="ps-highlight">
            <strong>Key Requirement:</strong> A full-time job offer from an Irish employer willing to sponsor an
            employment permit.
          </p>
        </section>

        <section className="ps-section" aria-labelledby="ps-s5">
          <h2 id="ps-s5" className="ps-h2">
            Stage Three – Stamp 1 (Employment Permit Holder)
          </h2>
          <p className="ps-p">
            Once an employment permit is approved, the graduate registers and receives Stamp 1. There are two
            main employment permit routes:
          </p>
          <div className="ps-permit-blocks">
            <article className="ps-permit">
              <h3 className="ps-permit__title">
                A. Critical Skills Employment Permit (CSEP) — preferred and fastest route
              </h3>
              <h4 className="ps-permit__sub">Eligibility</h4>
              <ul className="ps-bullets">
                <li>Job listed on Ireland&apos;s Critical Skills Occupation List</li>
                <li>Minimum salary usually between €38,000 – €64,000+, depending on role</li>
              </ul>
              <h4 className="ps-permit__sub">Advantages</h4>
              <ul className="ps-bullets">
                <li>No labour market needs test</li>
                <li>Faster path to Stamp 4 (after 2 years)</li>
                <li>Immediate family reunification eligibility</li>
                <li>High job security and career stability</li>
              </ul>
            </article>
            <article className="ps-permit">
              <h3 className="ps-permit__title">B. General Employment Permit (GEP)</h3>
              <h4 className="ps-permit__sub">Eligibility</h4>
              <ul className="ps-bullets">
                <li>Labour market needs test required</li>
                <li>Minimum salary typically €30,000 – €39,000+</li>
              </ul>
              <h4 className="ps-permit__sub">Features</h4>
              <ul className="ps-bullets">
                <li>Renewable employment permission</li>
                <li>Can later transition to Critical Skills if eligible</li>
                <li>Longer route to Stamp 4</li>
              </ul>
            </article>
          </div>
        </section>

        <section className="ps-section" aria-labelledby="ps-s6">
          <h2 id="ps-s6" className="ps-h2">
            Advantages of Stamp 1
          </h2>
          <ul className="ps-bullets">
            <li>Full-time professional employment</li>
            <li>Legal residence based on employment</li>
            <li>Career progression and employer mobility (after conditions met)</li>
            <li>Progression toward permanent residency</li>
          </ul>
          <p className="ps-note">
            <strong>Note:</strong> Time spent on Stamp 1 counts toward long-term residency and citizenship.
          </p>
        </section>

        <section className="ps-section" aria-labelledby="ps-s7">
          <h2 id="ps-s7" className="ps-h2">
            Stage Four – Stamp 4 (Long-Term Residency)
          </h2>
          <p className="ps-p">
            Stamp 4 is a permanent-type residence permission that removes the need for employment permits.
          </p>
          <h3 className="ps-h3">Eligibility Timeline</h3>
          <ul className="ps-bullets">
            <li>After 2 years on Stamp 1 (Critical Skills route)</li>
            <li>After 5 years on Stamp 1 (General Employment route)</li>
          </ul>
          <h3 className="ps-h3">Rights Under Stamp 4</h3>
          <ul className="ps-bullets">
            <li>Work without a permit</li>
            <li>Start a business</li>
            <li>Sponsor family members</li>
            <li>Live in Ireland without employment restrictions</li>
          </ul>
          <p className="ps-note">
            <strong>Note:</strong> Stamp 4 represents settled status in Ireland.
          </p>
        </section>

        <section className="ps-section" aria-labelledby="ps-s8">
          <h2 id="ps-s8" className="ps-h2">
            Long-Term Residency Calculation
          </h2>
          <div className="ps-split-facts">
            <div className="ps-split-facts__col">
              <h3 className="ps-h3">What Counts</h3>
              <p className="ps-p">Stamp 1G, Stamp 1, Stamp 4</p>
            </div>
            <div className="ps-split-facts__col">
              <h3 className="ps-h3">What Does NOT Count</h3>
              <p className="ps-p">Stamp 2 (student years)</p>
            </div>
          </div>
          <p className="ps-note">
            <strong>Note:</strong> A minimum of 5 years of reckonable residence is required for long-term
            residence and citizenship eligibility.
          </p>
        </section>

        <section className="ps-section" aria-labelledby="ps-s9">
          <h2 id="ps-s9" className="ps-h2">
            Stage Five – Irish Citizenship &amp; Passport
          </h2>
          <h3 className="ps-h3">Citizenship Requirements</h3>
          <ul className="ps-bullets">
            <li>5 years of legal, reckonable residence</li>
            <li>At least 1 continuous year immediately before application</li>
            <li>Good character and lawful conduct</li>
            <li>Compliance with immigration and tax laws</li>
            <li>Knowledge of the English language (and Irish, where applicable to the application process)</li>
          </ul>
          <h3 className="ps-h3">Outcome</h3>
          <ul className="ps-bullets">
            <li>Irish citizenship granted</li>
            <li>Eligibility for Irish passport</li>
            <li>Full EU rights and freedoms</li>
          </ul>
        </section>

        <section className="ps-section" aria-labelledby="ps-s10">
          <h2 id="ps-s10" className="ps-h2">
            Do&apos;s and Don&apos;ts
          </h2>
          <div className="ps-dos-donts">
            <div className="ps-dos-donts__col ps-dos-donts__col--do">
              <h3 className="ps-dos-donts__heading">DO&apos;s</h3>
              <ul className="ps-bullets">
                <li>Maintain continuous legal status</li>
                <li>Apply for permit renewals on time</li>
                <li>Keep employment contracts and tax records</li>
                <li>Remain in full-time lawful employment</li>
                <li>Comply with immigration conditions</li>
              </ul>
            </div>
            <div className="ps-dos-donts__col ps-dos-donts__col--dont">
              <h3 className="ps-dos-donts__heading">DON&apos;Ts</h3>
              <ul className="ps-bullets">
                <li>Overstay visa permissions</li>
                <li>Work without proper authorization</li>
                <li>Remain unemployed for extended periods</li>
                <li>Change employers without approval</li>
                <li>Provide incorrect information to immigration authorities</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="ps-section" aria-labelledby="ps-s11">
          <h2 id="ps-s11" className="ps-h2">
            Final Summary
          </h2>
          <p className="ps-p">
            Ireland provides a clear, lawful, and progressive pathway for international students:
          </p>
          <div className="ps-flow" role="list" aria-label="Immigration pathway steps">
            {FLOW_STEPS.map((label, i) => (
              <React.Fragment key={label}>
                <div className="ps-flow__step" role="listitem">
                  <span className="ps-flow__badge">{i + 1}</span>
                  <span className="ps-flow__label">{label}</span>
                </div>
                {i < FLOW_STEPS.length - 1 ? (
                  <span className="ps-flow__arrow" aria-hidden="true">
                    →
                  </span>
                ) : null}
              </React.Fragment>
            ))}
          </div>
        </section>

        <section className="ps-section" aria-labelledby="ps-s12">
          <h2 id="ps-s12" className="ps-h2">
            Immigration Pathway Timeline Table
          </h2>
          <div className="ps-table-wrap">
            <table className="ps-table">
              <thead>
                <tr>
                  <th scope="col">Stage</th>
                  <th scope="col">Stamp</th>
                  <th scope="col">Approx. Duration</th>
                </tr>
              </thead>
              <tbody>
                {TIMELINE_ROWS.map((row) => (
                  <tr key={row.stage}>
                    <td>{row.stage}</td>
                    <td>{row.stamp}</td>
                    <td>{row.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="ps-info-box">
            <h3 className="ps-info-box__title">Key Points</h3>
            <ul className="ps-bullets">
              <li>Stamp 2 is for study only</li>
              <li>Stamp 1G allows full-time work without permit</li>
              <li>Stamp 1 requires employment permit</li>
              <li>Stamp 4 is permanent residence</li>
              <li>Citizenship after 5 years reckonable residence</li>
            </ul>
          </div>
          <div className="ps-remember">
            <strong>Remember:</strong> Only time spent on Stamp 1G, Stamp 1, and Stamp 4 counts toward long-term
            residency and citizenship. Student years (Stamp 2) do not count.
          </div>
        </section>

        <section className="ps-section" aria-labelledby="ps-s13">
          <h2 id="ps-s13" className="ps-h2">
            Post-Study Work Options
          </h2>
          <p className="ps-p">
            For the most up-to-date and official information regarding post-study work options, please refer to
            the following official resources:
          </p>
          <div className="ps-link-cards">
            {EXTERNAL_RESOURCES.map((item) => (
              <a
                key={item.href}
                className="ps-link-card"
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="ps-link-card__title">{item.title}</span>
                <span className="ps-link-card__meta">Official resource — opens in new tab</span>
              </a>
            ))}
          </div>
        </section>

        <section className="ps-cta" aria-label="Apply">
          <p className="ps-cta__text">Are you ready to take the next step toward your future career?</p>
          <Link to="/#contact" className="ps-cta__btn">
            Apply Now
          </Link>
        </section>
      </main>
    </>
  );
}

export function PostStudyRouteLayout() {
  return (
    <>
      <LandingHeader />
      <div className="LandingPage why-ireland-hub">
        <PostStudyMain />
        <Footer />
      </div>
    </>
  );
}

export default PostStudyMain;
