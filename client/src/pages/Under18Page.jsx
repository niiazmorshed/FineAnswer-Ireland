import React, { useState } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import TopUtilityBar from "../components/TopUtilityBar";
import Navbar3 from "../components/navbar3";
import Footer from "../components/Footer";
import "./Under18Page.css";

const JUSTICE_DEPT_URL =
  "https://www.irishimmigration.ie/coming-to-study-in-ireland/what-are-my-study-visa-options/how-to-apply-for-long-term-study-visa/";

const PRICING_ROWS = [
  {
    service: "Guardianship Fees",
    details: "Month 1 (September or January)",
    price: "€700",
  },
  {
    service: "Guardianship Fees",
    details: "Remaining months until student turns 18",
    price: "€167/month",
  },
  {
    service: "Homestay Weekly Rate",
    details:
      "Single room with breakfast, lunch & dinner. Laundry, Wi-Fi, utilities included",
    price: "€295/week",
  },
  {
    service: "Monthly Administration Charge",
    details: "After guardianship ceases",
    price: "€50/month",
  },
  {
    service: "Refundable Deposit",
    details: "Refunded at end of programme",
    price: "€750",
  },
  {
    service: "Christmas Surplus – Guardianship",
    details: "20 December – 8 January",
    price: "€395",
  },
  {
    service: "Christmas Surplus – Homestay",
    details: "Dependent on availability",
    price: "€100/week",
  },
  {
    service: "Special Dietary Requirements",
    details: "Vegan, coeliac, or vegetarian diets",
    price: "€30/week",
  },
  {
    service: "Airport Transfers – Dublin",
    details: "Within Dublin",
    price: "€85/transfer",
  },
  {
    service: "Airport Transfers – Outside Dublin",
    details: "Outside Dublin",
    price: "Quoted on request",
  },
  {
    service: "Additional Visits or Admin",
    details: "Services not included in programme",
    price: "€60/hour",
  },
];

function Under18Main() {
  const [activeTab, setActiveTab] = useState("keypoints");

  return (
    <>
      <SEO
        title="Under 18 Students — FineAnswer Ireland"
        description="Guidance for under 18 students studying in Ireland: guardian requirements, documentation, accommodation, and FineAnswer guardianship support with Godsil Education."
        canonicalPath="/under18"
      />
      <main className="u18-page">
        <header className="u18-hero">
          <h1 className="u18-hero__title">Under 18 Students</h1>
          <p className="u18-hero__subtitle">
            Ireland Education Office can assist under 18 students to study in Ireland with comprehensive
            guidance and support throughout the application process.
          </p>
          <a
            className="u18-hero__ext"
            href={JUSTICE_DEPT_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Under 18 Justice Dept Rules
          </a>
        </header>

        <div
          className="u18-tabs"
          role="tablist"
          aria-label="Under 18 student information"
        >
          <button
            type="button"
            role="tab"
            id="u18-tab-keypoints"
            aria-selected={activeTab === "keypoints"}
            aria-controls="u18-panel-keypoints"
            className={`u18-tabs__btn${activeTab === "keypoints" ? " u18-tabs__btn--active" : ""}`}
            onClick={() => setActiveTab("keypoints")}
          >
            Key Points for Students Under 18
          </button>
          <button
            type="button"
            role="tab"
            id="u18-tab-fineanswer"
            aria-selected={activeTab === "fineanswer"}
            aria-controls="u18-panel-fineanswer"
            className={`u18-tabs__btn${activeTab === "fineanswer" ? " u18-tabs__btn--active" : ""}`}
            onClick={() => setActiveTab("fineanswer")}
          >
            How FineAnswer Helps Under 18 Students
          </button>
        </div>

        <div
          id="u18-panel-keypoints"
          role="tabpanel"
          aria-labelledby="u18-tab-keypoints"
          hidden={activeTab !== "keypoints"}
          className="u18-panel"
        >
          <h2 className="u18-panel__h2">Key Points for Students Under 18</h2>
          <p className="u18-panel__lead">Ireland Education Office Requirements and Guidelines</p>

          <ol className="u18-cards">
            <li className="u18-card">
              <h3 className="u18-card__title">
                <span className="u18-card__num">1</span> Age Requirement
              </h3>
              <p className="u18-card__p">
                Students must normally have turned 17 by January 15 of the year after they will enter university
                in Ireland.
              </p>
            </li>

            <li className="u18-card">
              <h3 className="u18-card__title">
                <span className="u18-card__num">2</span> Legal Guardian in Ireland
              </h3>
              <ul className="u18-bullets">
                <li>
                  If a student under 18 is registering with Irish Immigration, they must have a legal guardian
                  residing in the Republic of Ireland (ROI).
                </li>
                <li>The guardian must provide proof of residence (Irish passport or Irish Residence Permit card).</li>
                <li>
                  If the guardian is not a parent, parents must provide a letter appointing that person as legal
                  guardian.
                </li>
              </ul>
            </li>

            <li className="u18-card">
              <h3 className="u18-card__title">
                <span className="u18-card__num">3</span> Extra Documentation for Unaccompanied Students
              </h3>
              <p className="u18-card__p">If the under-18 student is coming without a parent, these are required:</p>
              <ul className="u18-bullets">
                <li>Birth Certificate of the student.</li>
                <li>
                  Consent from both parents or legal guardians:
                  <ul className="u18-bullets u18-bullets--nested">
                    <li>Should be notarised.</li>
                    <li>
                      Must state who will care for the student in Ireland (school, host family, agency).
                    </li>
                  </ul>
                </li>
                <li>
                  Identification documents for parents/guardians: passport bio-page or national ID card.
                </li>
                <li>If one parent has sole custody, a court order showing that must be provided.</li>
              </ul>
            </li>

            <li className="u18-card">
              <h3 className="u18-card__title">
                <span className="u18-card__num">4</span> Accommodation &amp; Vetting
              </h3>
              <ul className="u18-bullets">
                <li>Must submit where the student will stay in Ireland.</li>
                <li>
                  If a parent joins the student: include the parent&apos;s visa application details or a statement
                  that they will be present.
                </li>
                <li>
                  If parent does not join: The school must get a clearance from the Garda Síochána (Irish police)
                  regarding the student&apos;s living arrangements.
                </li>
              </ul>
            </li>

            <li className="u18-card">
              <h3 className="u18-card__title">
                <span className="u18-card__num">5</span> No Entitlement for Other Family Members
              </h3>
              <p className="u18-card__p">
                Getting a visa for a student under 18 for study does not automatically allow other family members
                to come or stay in Ireland.
              </p>
            </li>
          </ol>
        </div>

        <div
          id="u18-panel-fineanswer"
          role="tabpanel"
          aria-labelledby="u18-tab-fineanswer"
          hidden={activeTab !== "fineanswer"}
          className="u18-panel"
        >
          <h2 className="u18-fa-title">University Educational Guardianship Programme 2025–2026</h2>

          <section className="u18-fa-block" aria-labelledby="u18-fa-a">
            <h3 id="u18-fa-a" className="u18-fa-h3">
              Comprehensive Year-Round Support
            </h3>
            <ul className="u18-bullets">
              <li>
                <strong>Dedicated Guardianship Staff:</strong> Available Monday–Friday throughout the year to
                provide guidance on living and studying in Ireland, offering friendly, local knowledge and advice
                for both students and parents.
              </li>
              <li>
                <strong>Student Welfare Coordinator:</strong>
                <ul className="u18-bullets u18-bullets--nested">
                  <li>Visits students on campus upon arrival.</li>
                  <li>Introduces students through an orientation presentation.</li>
                  <li>
                    Maintains regular contact via email and phone, ensuring students can discuss any personal or
                    academic concerns.
                  </li>
                </ul>
              </li>
              <li>
                <strong>24/7 Emergency Phone Line:</strong> Round-the-clock support for unexpected events such as
                cancelled flights, disciplinary issues, or illness.
              </li>
            </ul>
          </section>

          <section className="u18-fa-block" aria-labelledby="u18-fa-b">
            <h3 id="u18-fa-b" className="u18-fa-h3">
              Immigration Registration Support
            </h3>
            <ul className="u18-bullets">
              <li>Scheduling of immigration appointments with the Garda National Immigration Bureau (GNIB).</li>
              <li>Management and preparation of all necessary documentation for registration.</li>
              <li>
                Accompaniment to the GNIB appointment and official appointment as the student&apos;s educational
                guardian.
              </li>
            </ul>
          </section>

          <section className="u18-fa-block" aria-labelledby="u18-fa-c">
            <h3 id="u18-fa-c" className="u18-fa-h3">
              Homestay Management
            </h3>
            <ul className="u18-bullets">
              <li>
                <strong>Sourcing &amp; Vetting:</strong> Arranging caring Irish homestays, including organisation of
                all police checks on behalf of the student.
              </li>
              <li>
                <strong>Administration:</strong> Managing payments and all related paperwork for homestay fees.
              </li>
              <li>
                <strong>Ongoing Liaison:</strong> Acting as a support service for homestay families throughout the
                year to ensure a positive student experience.
              </li>
              <li>
                <strong>Re-Housing:</strong> Arranging alternative housing if the primary homestay becomes
                unavailable.
              </li>
            </ul>
            <p className="u18-note">
              <strong>Note:</strong> Homestay services are only available in certain locations and upon request.
            </p>
          </section>

          <section className="u18-fa-block" aria-labelledby="u18-fa-d">
            <h3 id="u18-fa-d" className="u18-fa-h3">
              Pricing and Fees
            </h3>
            <div className="u18-table-wrap">
              <table className="u18-table">
                <thead>
                  <tr>
                    <th scope="col">Service</th>
                    <th scope="col">Details</th>
                    <th scope="col">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {PRICING_ROWS.map((row) => (
                    <tr key={`${row.service}-${row.details}-${row.price}`}>
                      <td>{row.service}</td>
                      <td>{row.details}</td>
                      <td className="u18-table__price">{row.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="u18-fa-block" aria-labelledby="u18-fa-e">
            <h3 id="u18-fa-e" className="u18-fa-h3">
              Additional Services (Not Included in Standard Programme)
            </h3>
            <ul className="u18-bullets">
              <li>Arrangement of airport transfers with vetted and experienced drivers.</li>
              <li>Assistance with setting up bank accounts.</li>
              <li>Support with additional visa applications.</li>
              <li>Consultancy or administrative tasks not otherwise listed.</li>
            </ul>
          </section>

          <section className="u18-fa-block" aria-labelledby="u18-fa-f">
            <h3 id="u18-fa-f" className="u18-fa-h3">
              Payment Terms
            </h3>
            <div className="u18-pay-grid">
              <div className="u18-pay-box">
                <strong>Initial Payment:</strong> 30% of the total fee is due at enrolment (non-refundable).
              </div>
              <div className="u18-pay-box">
                <strong>Remaining Balance:</strong> 70% must be paid at least 8 weeks before arrival.
              </div>
              <div className="u18-pay-box">
                <strong>Extra Services:</strong> Additional visits or administration invoiced separately in advance.
              </div>
            </div>
          </section>
        </div>

        <section className="u18-partner" aria-label="Partner">
          <p className="u18-partner__text">
            FineAnswer Ireland has partnered with Godsil Education to provide comprehensive guardianship services
            for under 18 students.
          </p>
          <a
            className="u18-partner__logo"
            href="https://godsil.ie/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="u18-partner__logo-placeholder" aria-hidden="true">
              GE
            </span>
            <span className="u18-partner__logo-label">Godsil Education — visit godsil.ie</span>
          </a>
        </section>

        <section className="u18-cta" aria-label="Apply">
          <p className="u18-cta__text">Are you ready to take the next step toward your future career?</p>
          <Link to="/#contact" className="u18-cta__btn">
            Apply Now
          </Link>
        </section>
      </main>
    </>
  );
}

export function Under18RouteLayout() {
  return (
    <div className="LandingPage why-ireland-hub">
      <div className="landing-top">
        <TopUtilityBar />
        <Navbar3 />
      </div>
      <Under18Main />
      <Footer />
    </div>
  );
}

export default Under18Main;
