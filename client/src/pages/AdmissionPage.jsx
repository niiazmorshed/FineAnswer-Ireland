import React from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import LandingHeader from "../components/LandingHeader";
import Footer from "../components/Footer";
import "./JourneyPages.css";

/**
 * Admission — how an application to an Irish institution actually runs.
 *
 * Sits between Pathways and Dependent Visa in Quick Links: the student has
 * chosen a route, and this is the part where they apply, get an offer and hold
 * their place. It stops at the acceptance letter, which is where the visa
 * application picks up.
 */

const INTAKES = [
  {
    label: "September",
    value: "Main intake",
    desc: "Almost every course runs. Apply from roughly October of the previous year.",
  },
  {
    label: "January / February",
    value: "Second intake",
    desc: "A smaller set of courses, mostly business and computing. Fills quickly.",
  },
  {
    label: "Decision time",
    value: "2–6 weeks",
    desc: "Typical turnaround on a complete application. Incomplete ones sit untouched.",
  },
  {
    label: "Deposit",
    value: "€500+",
    desc: "Paid to hold your place. Amount varies widely by institution and course.",
  },
];

const DOCUMENTS = [
  {
    title: "Academic transcripts",
    desc: "Every year of study, with the grading scale explained if it is not out of 100 or 4.0.",
  },
  {
    title: "Degree parchment or provisional certificate",
    desc: "If you have not graduated yet, a letter confirming your expected completion date.",
  },
  {
    title: "English language evidence",
    desc: "IELTS, TOEFL, PTE or an accepted equivalent. Some institutions waive it if you were taught in English — ask before you book a test.",
  },
  {
    title: "Passport copy",
    desc: "The bio page. Your name must match your academic documents exactly.",
  },
  {
    title: "Statement of purpose",
    desc: "Why this course, why Ireland, and what you intend to do afterwards. Written for the course, not copied between applications.",
  },
  {
    title: "CV and references",
    desc: "Required for most postgraduate courses. Academic references for research routes, professional ones for taught masters.",
  },
];

const STALL_REASONS = [
  "A transcript uploaded without its grading scale, so the institution cannot convert your result",
  "Names that differ between passport, transcript and application form",
  "An English test result that expired before the course start date",
  "A statement of purpose that never names the course or the institution",
  "Missing the deposit deadline on a conditional offer, which releases your place",
];

const STRONG_APPLICATION = [
  "Apply early in the cycle — places, and scholarships, go before the deadline",
  "Submit everything at once; a partial application is not assessed",
  "Match the entry requirements before applying, not after being rejected",
  "Name the course and the modules that drew you to it",
  "Keep one email address for the whole application and check it weekly",
];

const RESOURCES = [
  {
    title: "Education in Ireland — How to Apply",
    href: "https://www.educationinireland.com/en/how-do-i-apply-/",
  },
  {
    title: "CAO — Central Applications Office",
    href: "https://www.cao.ie/",
  },
  {
    title: "PAC — Postgraduate Applications Centre",
    href: "https://www.pac.ie/",
  },
];

function AdmissionMain() {
  return (
    <>
      <SEO
        title="Admission to Irish Universities for International Students"
        description="How to apply to an Irish university: intakes and deadlines, documents to submit, conditional and unconditional offers, deposits, and the acceptance letter you need for your visa."
        canonicalPath="/admission"
      />
      <main className="jp-page">
        <header className="jp-hero">
          <p className="jp-hero__eyebrow">Applying</p>
          <h1 className="jp-hero__title">Admission to an Irish Institution</h1>
          <p className="jp-hero__subtitle">
            You have chosen a course and you meet the entry requirements. This is
            the part in between: what you send, what comes back, and what you
            have to do to hold the place once it is offered. It ends with the
            acceptance letter — the document your visa application is built on.
          </p>
        </header>

        <section className="jp-section" aria-labelledby="ad-route">
          <h2 id="ad-route" className="jp-h2">
            Which route you apply through
          </h2>
          <p className="jp-p">
            Ireland has more than one application system, and which one you use
            depends on your level of study and where you are applying from.
          </p>
          <ul className="jp-bullets">
            <li>
              <strong>Non-EU applicants</strong> generally apply directly to the
              institution through its own international application portal, or
              through a representative acting for them.
            </li>
            <li>
              <strong>Undergraduate applicants from Ireland and the EU</strong>{" "}
              apply centrally through the CAO.
            </li>
            <li>
              <strong>Postgraduate applicants</strong> apply directly to the
              institution, though several — including University College Cork,
              University of Galway and Maynooth — take applications through PAC.
            </li>
          </ul>
          <p className="jp-note">
            <strong>Check the course page, not the general one.</strong> Within a
            single institution, one department may take direct applications while
            another routes through PAC. The course listing is authoritative.
          </p>
        </section>

        <section className="jp-section" aria-labelledby="ad-intakes">
          <h2 id="ad-intakes" className="jp-h2">
            Intakes and timing
          </h2>
          <div className="jp-facts jp-facts--four">
            {INTAKES.map((fact) => (
              <article className="jp-fact" key={fact.label}>
                <p className="jp-fact__label">{fact.label}</p>
                <p className="jp-fact__value">{fact.value}</p>
                <p className="jp-fact__desc">{fact.desc}</p>
              </article>
            ))}
          </div>
          <p className="jp-note jp-note--warn">
            <strong>Work backwards from the visa, not the course.</strong> A visa
            decision can take several months, and it cannot start until you hold
            an acceptance letter and a fee receipt. An offer in July for a
            September start is tight.
          </p>
        </section>

        <section className="jp-section" aria-labelledby="ad-docs">
          <h2 id="ad-docs" className="jp-h2">
            What you submit
          </h2>
          <p className="jp-p">
            Requirements vary by course, but almost every application asks for
            this set. Scan everything in colour, as clear PDFs, named so an
            admissions officer can tell what each file is.
          </p>
          <ul className="jp-checklist">
            {DOCUMENTS.map((item) => (
              <li className="jp-check" key={item.title}>
                <span className="jp-check__mark" aria-hidden="true">
                  ✓
                </span>
                <div className="jp-check__body">
                  <h3 className="jp-check__title">{item.title}</h3>
                  <p className="jp-check__desc">{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="jp-p" style={{ marginTop: 14 }}>
            Not sure whether your grades qualify?{" "}
            <Link to="/entry-requirements">Entry Requirements</Link> sets out
            what Irish institutions expect, and{" "}
            <Link to="/english-tests">English Tests</Link> covers the accepted
            language qualifications and scores.
          </p>
        </section>

        <section className="jp-section" aria-labelledby="ad-steps">
          <h2 id="ad-steps" className="jp-h2">
            How the application runs
          </h2>
          <ol className="jp-steps">
            <li className="jp-step">
              <h3 className="jp-step__title">Shortlist and check requirements</h3>
              <p className="jp-step__body">
                Pick three to five courses across different entry levels rather
                than five versions of the same one. Read the entry requirements
                on each course page before you apply, not after.
              </p>
            </li>
            <li className="jp-step">
              <h3 className="jp-step__title">Submit a complete application</h3>
              <p className="jp-step__body">
                Upload every document in one go. Applications missing a
                transcript or an English result are parked rather than assessed,
                and nobody chases you for the gap.
              </p>
            </li>
            <li className="jp-step">
              <h3 className="jp-step__title">Answer follow-up questions quickly</h3>
              <p className="jp-step__body">
                Admissions teams often come back asking for a grading scale, a
                module breakdown or a clearer scan. A reply within a day or two
                keeps you in the current review cycle.
              </p>
            </li>
            <li className="jp-step">
              <h3 className="jp-step__title">Receive your offer</h3>
              <p className="jp-step__body">
                A <strong>conditional</strong> offer lists what is still
                outstanding — final results, an English score, the deposit. An{" "}
                <strong>unconditional</strong> offer means the place is yours once
                you accept it.
              </p>
            </li>
            <li className="jp-step">
              <h3 className="jp-step__title">Accept and pay the deposit</h3>
              <p className="jp-step__body">
                Deadlines here are firm. Once the deposit clears, the institution
                issues the acceptance letter and fee receipt.
              </p>
            </li>
            <li className="jp-step">
              <h3 className="jp-step__title">Move to the visa</h3>
              <p className="jp-step__body">
                With the acceptance letter, fee receipt, medical insurance and
                evidence of funds you can start the study visa application. From
                there, <Link to="/pre-departure">Pre Departure</Link> takes over.
              </p>
            </li>
          </ol>
        </section>

        <section className="jp-section" aria-labelledby="ad-offers">
          <h2 id="ad-offers" className="jp-h2">
            Conditional and unconditional offers
          </h2>
          <div className="jp-table-wrap">
            <table className="jp-table">
              <thead>
                <tr>
                  <th scope="col">Offer type</th>
                  <th scope="col">What it means</th>
                  <th scope="col">What you do next</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Conditional</td>
                  <td>The place is held subject to named conditions</td>
                  <td>Meet each condition and send proof before its deadline</td>
                </tr>
                <tr>
                  <td>Unconditional</td>
                  <td>Nothing academic is outstanding</td>
                  <td>Accept, pay the deposit, collect the acceptance letter</td>
                </tr>
                <tr>
                  <td>Deferred</td>
                  <td>The same offer moved to a later intake</td>
                  <td>Request it in writing; approval is at the institution's discretion</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="jp-note">
            <strong>An offer is not a visa.</strong> It is the document that lets
            you apply for one. Irish immigration assesses your funds, insurance
            and intent separately from the institution's decision.
          </p>
        </section>

        <section className="jp-section" aria-labelledby="ad-strong">
          <h2 id="ad-strong" className="jp-h2">
            What separates a strong application
          </h2>
          <div className="jp-split">
            <div className="jp-split__col jp-split__col--do">
              <h3 className="jp-split__heading">Do</h3>
              <ul className="jp-bullets">
                {STRONG_APPLICATION.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="jp-split__col jp-split__col--dont">
              <h3 className="jp-split__heading">What stalls applications</h3>
              <ul className="jp-bullets">
                {STALL_REASONS.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="jp-section" aria-labelledby="ad-resources">
          <h2 id="ad-resources" className="jp-h2">
            Official resources
          </h2>
          <p className="jp-p">
            Deadlines, fees and application routes are set by each institution
            and do change. Confirm against the official pages:
          </p>
          <div className="jp-link-cards">
            {RESOURCES.map((item) => (
              <a
                key={item.href}
                className="jp-link-card"
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="jp-link-card__title">{item.title}</span>
                <span className="jp-link-card__meta">
                  Official resource — opens in new tab
                </span>
              </a>
            ))}
          </div>
        </section>

        <section className="jp-cta" aria-label="Talk to us">
          <p className="jp-cta__text">
            Want your shortlist and documents checked before you apply?
          </p>
          <Link to="/#contact" className="jp-cta__btn">
            Talk to an Advisor
          </Link>
        </section>
      </main>
    </>
  );
}

export function AdmissionRouteLayout() {
  return (
    <>
      <LandingHeader />
      <div className="LandingPage why-ireland-hub">
        <AdmissionMain />
        <Footer />
      </div>
    </>
  );
}

export default AdmissionMain;
