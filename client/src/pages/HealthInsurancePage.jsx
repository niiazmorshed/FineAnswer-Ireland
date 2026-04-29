import React, { useState } from "react";
import SEO from "../components/SEO";
import LandingHeader from "../components/LandingHeader";
import Footer from "../components/Footer";
import "./HealthInsurancePage.css";

const UNITED_BENEFITS = [
  {
    title: "Medical Expenses & Hospitalization Abroad",
    desc: "Covers reasonable costs for hospitalization, surgery, medical fees, and prescribed pharmaceutical products if illness or injury occurs abroad.",
  },
  {
    title: "Transport/Repatriation (Illness or Injury)",
    desc: "Covers transfer or repatriation to a health center or back to home country.",
  },
  {
    title: "Emergency Dental Care",
    desc: "Covers treatment for pain and infection only.",
  },
  {
    title: "Repatriation of Family Member",
    desc: "If hospitalized 15+ days or in case of death, covers travel of an immediate family member or appointed companion.",
  },
  {
    title: "Repatriation of Mortal Remains",
    desc: "Arranges and covers transfer of remains to place of interment, cremation, or funeral in home country.",
  },
  {
    title: "Medical Referral/Appointment",
    desc: "Access to local specialists through company's call center and international network.",
  },
  {
    title: "Connection Service",
    desc: "Assistance with services abroad (car rentals, legal/admin info, referrals).",
  },
  {
    title: "Delayed Departure",
    desc: "If carrier departure delayed 12+ hours (or 8+ hrs), reimburses additional transport, hotel, and meal expenses (with invoices). Requires written confirmation from carrier about delay and reasons; calculation is based on actual departure time.",
  },
  {
    title: "Loss of Credit Card",
    desc: "Advances funds if deprived of cash due to credit card loss (up to plan limit).",
  },
  {
    title: "Loss of Passport",
    desc: "Covers necessary expenses for obtaining a replacement passport or consular document.",
  },
  {
    title: "In-Flight Checked Baggage Loss",
    desc: "Supplements carrier's compensation (minimum 21 days wait to confirm loss). NOT covered for breakage of glass/china (unless conveyance accident), moth/vermin/electrical/mechanical breakdown/gradual wear, cash/travel tickets/credit cards/passports/licenses, confiscation by customs, losses not reported within 24 hrs, sports equipment in use or hired equipment, and contact/corneal lenses.",
  },
  {
    title: "Accidental Death",
    desc: "Pays insured sum to beneficiary; adjusts payment if disability indemnity already paid from same accident.",
  },
];

function HealthInsuranceMain() {
  const [mainTab, setMainTab] = useState("study");
  const [subTab, setSubTab] = useState("coverage");

  return (
    <>
      <SEO
        title="Health Insurance"
        description="Health insurance guidance for Ireland student visa requirements with Study & Protect and United Insurance partnership options."
        canonicalPath="/health-insurance"
      />
      <main className="hi-page">
        <header className="hi-hero">
          <h1 className="hi-hero__title">Health Insurance</h1>
          <p className="hi-hero__subtitle">
            FineAnswer Ireland team provides assistance with health insurance to meet the VISA requirement. We have
            arrangements with health cover companies and you can purchase the insurance from us on discount.
          </p>
          <a
            className="hi-hero__cta"
            href="https://form.jotform.com/222753237906459"
            target="_blank"
            rel="noopener noreferrer"
          >
            Get Insurance Now
          </a>
          <div className="hi-badges" aria-label="Trust badges">
            <span>✔ Visa Compliant</span>
            <span>✔ Special Discounts</span>
            <span>✔ Expert Assistance</span>
          </div>
        </header>

        <section className="hi-tabs-wrap">
          <div className="hi-tabs" role="tablist" aria-label="Insurance partners">
            <button
              type="button"
              role="tab"
              aria-selected={mainTab === "study"}
              className={`hi-tab${mainTab === "study" ? " is-active" : ""}`}
              onClick={() => setMainTab("study")}
            >
              Study & Protect Student Insurance
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mainTab === "united"}
              className={`hi-tab${mainTab === "united" ? " is-active" : ""}`}
              onClick={() => setMainTab("united")}
            >
              United Insurance Company
            </button>
          </div>
        </section>

        {mainTab === "study" ? (
          <section className="hi-panel">
            <h2 className="hi-panel__title">Study & Protect Student Insurance</h2>
            <p className="hi-badge">Exclusive FineAnswer Ireland Partnership</p>
            <p className="hi-p">
              FineAnswer Ireland has partnered with Study & Protect Insurance to provide discounted insurance cover for
              students travelling to EU and Ireland. The Study & Protect team are there with you from placement of
              cover and throughout your policy period. There is also a 24 hour multilingual claims assistance hotline
              so students can seek claims advice in their native tongue.
            </p>

            <h3 className="hi-h3">Insurance Policy Details</h3>
            <div className="hi-pricing-grid">
              <article className="hi-price-card">
                <h4>Standard Policy Price</h4>
                <p className="hi-price">€198</p>
                <p>Comprehensive medical & travel cover • 24/7 assistance</p>
              </article>

              <article className="hi-price-card hi-price-card--featured">
                <h4>Buy Directly from Study & Protect</h4>
                <p className="hi-price">€188 (€10 discount)</p>
                <p>Use Agent Reference Code: 40YGS1DM (on behalf of FineAnswer Ireland)</p>
                <a href="https://www.studyandprotect.com/" target="_blank" rel="noopener noreferrer">
                  Buy Policy Directly
                </a>
                <p className="hi-note">Refund available in case of visa refusal</p>
              </article>

              <article className="hi-price-card">
                <h4>Purchase via FineAnswer Ireland</h4>
                <p className="hi-price">€130</p>
                <p>Pay directly to FineAnswer Ireland at discounted rate</p>
                <a href="/contact">Contact Us</a>
                <div className="hi-warning">
                  No refund will be issued for policies purchased via FineAnswer Ireland in the event of visa refusal,
                  due to currency conversion fluctuations and domestic administrative factors.
                </div>
              </article>
            </div>
            <p className="hi-p hi-p--small">
              Support email: <a href="mailto:students@ieo-partnership.com">students@ieo-partnership.com</a>
            </p>

            <div className="hi-subtabs" role="tablist" aria-label="Study and Protect details">
              <button
                type="button"
                className={`hi-subtab${subTab === "coverage" ? " is-active" : ""}`}
                onClick={() => setSubTab("coverage")}
              >
                Coverage & Benefits
              </button>
              <button
                type="button"
                className={`hi-subtab${subTab === "significant" ? " is-active" : ""}`}
                onClick={() => setSubTab("significant")}
              >
                Significant Exclusions
              </button>
              <button
                type="button"
                className={`hi-subtab${subTab === "general" ? " is-active" : ""}`}
                onClick={() => setSubTab("general")}
              >
                General Exclusions
              </button>
              <button
                type="button"
                className={`hi-subtab${subTab === "claim" ? " is-active" : ""}`}
                onClick={() => setSubTab("claim")}
              >
                How to Claim
              </button>
            </div>

            {subTab === "coverage" ? (
              <div className="hi-subpanel">
                <h4>MEDICAL EXPENSES — Up to €2,500,000</h4>
                <p className="hi-p">Includes:</p>
                <ul className="hi-list">
                  <li>Surgical, diagnostic, or remedial treatment by a qualified medical practitioner</li>
                  <li>Nursing home and ambulance charges</li>
                  <li>
                    Complications of pregnancy (doctor/midwife certificate required within 5 days of travel if
                    travelling within 12 weeks of due date)
                  </li>
                  <li>Dental expenses (injury-related) up to €500, incurred within 24 hours</li>
                  <li>Unlimited emergency repatriation expenses</li>
                  <li>Funeral expenses: Up to €7,000</li>
                  <li>
                    Physiotherapy, homeopathy, osteopathy, chiropractic: Limited to €1,000 (only if due to bodily
                    injury)
                  </li>
                </ul>
                <p className="hi-p">
                  <strong>Excess:</strong> First €100 per claim
                </p>
                <p className="hi-p">
                  <strong>Important:</strong> All expenses must be pre-approved by Chubb Assistance
                </p>
                <p className="hi-p">
                  <strong>24/7 Tel:</strong> +353 1 440 1762
                </p>

                <h4>PERSONAL ACCIDENT (Section B):</h4>
                <ul className="hi-list">
                  <li>€10,000 → Death, loss of two+ limbs, or sight in both eyes</li>
                  <li>€5,000 → Loss of one limb or sight in one eye</li>
                </ul>

                <h4>PERSONAL LIABILITY:</h4>
                <p className="hi-p">€5,000,000 indemnity limit</p>
              </div>
            ) : null}

            {subTab === "significant" ? (
              <div className="hi-subpanel">
                <h4>Significant/Unusual Exclusions</h4>
                <ul className="hi-list">
                  <li>Any claim related to COVID-19 or its outbreak</li>
                  <li>The first €100 of any claim</li>
                  <li>Expenses not authorised in advance by Chubb Assistance</li>
                  <li>Costs recoverable under a national health scheme</li>
                  <li>Treatment not confirmed as medically necessary by a doctor</li>
                  <li>Treatment provided by a family member</li>
                  <li>Physiotherapy/homeopathy/osteopathy/chiropractic unless due to bodily injury</li>
                  <li>Cosmetic treatment unless agreed and necessary due to accidental injury</li>
                  <li>Expenses in the Country of Origin unless specifically covered</li>
                  <li>Trips taken for purpose of medical/cosmetic treatment or advice</li>
                  <li>Dental/optical expenses except minimum care to relieve pain/discomfort</li>
                  <li>Medication required or known prior to travel</li>
                  <li>Treatment that could have waited until return home</li>
                  <li>Travelling against medical advice</li>
                  <li>Expenses without receipts</li>
                </ul>
              </div>
            ) : null}

            {subTab === "general" ? (
              <div className="hi-subpanel">
                <h4>General Exclusions</h4>
                <ul className="hi-list">
                  <li>COVID-19 or its mutations/outbreak</li>
                  <li>
                    Travel to areas where Department of Foreign Affairs advises "Avoid non-essential travel" or "Do
                    not travel"
                  </li>
                  <li>War, radioactivity, armed forces service</li>
                  <li>Scuba diving, mountaineering, drink driving</li>
                  <li>Motorbike/scooter riding unless licensed in Ireland</li>
                  <li>Flying other than as a passenger</li>
                  <li>Illegal acts, self-injury/suicide, drug abuse</li>
                  <li>HIV/AIDS or treatment for pre-existing symptoms</li>
                </ul>
              </div>
            ) : null}

            {subTab === "claim" ? (
              <div className="hi-subpanel">
                <h4>Emergency Medical Assistance:</h4>
                <p className="hi-p">Call Chubb Assistance: +353 (0)1 440 1762 (24/7 emergency service)</p>
                <h4>Other Claims:</h4>
                <p className="hi-p">
                  Arachas Study & Protect Team
                  <br />
                  The Courtyard, Carmanhall Rd, Sandyford Business Estate, Dublin 18, D18 X377
                  <br />
                  Tel: 01-6395800
                  <br />
                  Email: <a href="mailto:studyandprotect@arachas.ie">studyandprotect@arachas.ie</a>
                </p>
                <h4>Provide when making a claim:</h4>
                <ul className="hi-list">
                  <li>Type of claim (injury, illness, medical expenses, liability, etc.)</li>
                  <li>Name of Language School/College and Policy/Certificate number</li>
                  <li>Relevant statements, receipts, or accounts to support your claim</li>
                </ul>
              </div>
            ) : null}
          </section>
        ) : (
          <section className="hi-panel">
            <h2 className="hi-panel__title">United Insurance Company</h2>
            <p className="hi-p">
              FineAnswer Ireland has partnered with United Insurance to provide discounted insurance cover for students
              travelling to EU and Ireland.
            </p>
            <div className="hi-united-card">
              <p className="hi-price">Policy Price: PKR 30,000</p>
              <a href="https://form.jotform.com/222753237906459" target="_blank" rel="noopener noreferrer">
                Book Insurance Online
              </a>
            </div>

            <h3 className="hi-h3">Terms & Conditions</h3>
            <ul className="hi-list">
              <li>Student must submit a completed SCS Refund Form</li>
              <li>Insurance company will issue a cheque for refund amount (PKR 14,000)</li>
              <li>Refund requests subject to verification and processing by United Health Insurance</li>
              <li>Refund only issued in cases of visa refusal</li>
              <li>No refund in case of visa decision delay or if student withdraws visa application</li>
              <li>Refunds processed within 4 to 6 weeks</li>
            </ul>

            <h3 className="hi-h3">Personal Assistance Benefits</h3>
            <div className="hi-benefits-grid">
              {UNITED_BENEFITS.map((item, idx) => (
                <article key={item.title} className="hi-benefit-card">
                  <span className="hi-benefit-card__num">{idx + 1}</span>
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </article>
              ))}
            </div>

            <h3 className="hi-h3">General Exclusions</h3>
            <ul className="hi-list">
              <li>Fraud, criminal acts, reckless or negligent actions</li>
              <li>Extraordinary natural phenomena (floods, earthquakes, landslides, etc.)</li>
              <li>Pre-existing conditions known at booking</li>
              <li>If insured was not in Pakistan when policy was issued</li>
              <li>Traveling against physician advice or for treatment/tests abroad</li>
              <li>Terrorism, mutiny, crowd disturbances</li>
              <li>Armed forces or security actions in peacetime</li>
              <li>Wars or military conflicts</li>
              <li>Radioactive/nuclear events</li>
              <li>Participation in bets, challenges, brawls (except self-defense)</li>
              <li>Pre-existing illness/injuries</li>
              <li>
                Sports competitions or dangerous sports: motor racing, big game hunting, scuba diving, private craft
                navigation, horse riding, climbing, boxing, wrestling, martial arts, parachuting, gliding, hot air
                ballooning, free falling, skiing
              </li>
              <li>Permanent residents/students outside home country</li>
              <li>Unauthorized air transport or helicopters</li>
              <li>Work-related accidents</li>
              <li>Recognized epidemics (international/local)</li>
              <li>Chronic ailments pre-dating policy</li>
              <li>Suicide, attempted suicide, or self-inflicted injuries</li>
              <li>Alcohol/drug-related illnesses</li>
              <li>Pregnancy, childbirth, complications, or voluntary termination</li>
              <li>Mental health diseases, venereal diseases, congenital/chronic conditions</li>
              <li>Cardiac/vascular illnesses treated within two years prior to travel</li>
              <li>Non-medically necessary or elective treatments</li>
              <li>Rehabilitation treatments</li>
              <li>Prostheses, orthopedic materials, spectacles</li>
            </ul>

            <h3 className="hi-h3">Steps to Claim</h3>
            <div className="hi-steps">
              <article className="hi-step">
                <h4>Step 1 — Timeframe for Notification</h4>
                <p>
                  Notify the company within 60 days of when the claim occurred or within 30 days after returning to
                  your country of residence.
                </p>
              </article>
              <article className="hi-step">
                <h4>Step 2 — Initial Actions</h4>
                <ul className="hi-list">
                  <li>Minimize the loss: Take all reasonable precautions to prevent further loss</li>
                  <li>Immediate Notification: Telephone the company as soon as possible</li>
                  <li>Do NOT admit liability or make promises or payments on your own</li>
                </ul>
              </article>
              <article className="hi-step">
                <h4>Step 3 — Documentation to Provide</h4>
                <ul className="hi-list">
                  <li>Provide all relevant information and documents within 60 days after requested</li>
                  <li>Keep and submit receipts, invoices, or supporting evidence for any expenses</li>
                </ul>
              </article>
              <article className="hi-step">
                <h4>Step 4 — Approval of Expenses</h4>
                <p>
                  Pre-approval is required for all expenses. Expenses not approved in advance will not be reimbursed.
                </p>
                <p className="hi-note">
                  The company does not pay hospitals directly. You must pay first, then submit your claim for
                  reimbursement.
                </p>
              </article>
              <article className="hi-step">
                <h4>Step 5 — Premium Refunds</h4>
                <p>
                  A premium will be refunded only if you furnish a copy of the rejection letter along with the
                  original documents.
                </p>
              </article>
            </div>

            <section className="hi-contact">
              <h3>For Further Information Please Contact</h3>
              <p>
                Email: <a href="mailto:accounts@icd.org.pk">accounts@icd.org.pk</a>
              </p>
              <p>Phone: +92 317 1170214</p>
            </section>
          </section>
        )}

        <section className="hi-cta">
          <p className="hi-cta__text">Are you ready to take the next step toward your future career?</p>
          <a href="https://form.jotform.com/222753237906459" target="_blank" rel="noopener noreferrer">
            Get Insurance Now
          </a>
        </section>
      </main>
    </>
  );
}

export function HealthInsuranceRouteLayout() {
  return (
    <>
      <LandingHeader />
      <div className="LandingPage why-ireland-hub">
        <HealthInsuranceMain />
        <Footer />
      </div>
    </>
  );
}

export default HealthInsuranceMain;
