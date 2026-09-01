import React from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import LandingHeader from "../components/LandingHeader";
import Footer from "../components/Footer";
import "./JourneyPages.css";

/**
 * Stamp 1G — the Third Level Graduate Programme, in depth.
 *
 * PostStudyPage covers the whole residency arc from Stamp 2 to citizenship and
 * treats 1G as one stage inside it. This page is the stage itself: who
 * qualifies, for how long, how to apply, and what it does and does not allow.
 * The two cross-link rather than repeat each other.
 */

const DURATIONS = [
  {
    label: "NFQ Level 8",
    value: "12 months",
    desc: "Honours bachelor's degree. Granted once and not renewable.",
  },
  {
    label: "NFQ Level 9 / 10",
    value: "24 months",
    desc: "Master's or doctoral award. Issued as 12 months, then renewed for a further 12.",
  },
  {
    label: "Application window",
    value: "6 months",
    desc: "From the date your results are issued. Miss it and the scheme closes to you.",
  },
  {
    label: "Registration fee",
    value: "€300",
    desc: "Payable each time you register or renew your permission.",
  },
];

const ELIGIBILITY = [
  {
    title: "A qualifying award",
    desc: "An award at NFQ Level 8 or above from a recognised Irish higher education institution.",
  },
  {
    title: "Held Stamp 2 immediately before",
    desc: "You must have been on student permission for the course that produced the award.",
  },
  {
    title: "Applied within six months of results",
    desc: "The window runs from when results are issued, not from your graduation ceremony.",
  },
  {
    title: "Permission still valid",
    desc: "Your Stamp 2 must not have expired. Apply before it lapses, not after.",
  },
  {
    title: "Under the seven-year cap",
    desc: "Total time on student permission in Ireland cannot exceed seven years.",
  },
  {
    title: "Medical insurance in place",
    desc: "Private cover remains a condition, exactly as it was on Stamp 2.",
  },
];

const CAN_DO = [
  "Work full time, up to 40 hours a week, for any employer",
  "Work without an employment permit for the whole of the 1G period",
  "Change employer as often as you like — the permission is yours, not the job's",
  "Count every month toward reckonable residence for long-term residency and citizenship",
  "Apply for an employment permit and move to Stamp 1 at any point",
];

const CANNOT_DO = [
  "Be self-employed or start a business — 1G is for employment only",
  "Bring a spouse, partner, children or parents to join you",
  "Access publicly funded social welfare benefits",
  "Extend beyond 24 months in total, whatever your award level",
  "Renew a Level 8 permission — the 12 months are all you get",
];

const APPLY_DOCS = [
  "Passport, valid for the full period you are applying for",
  "Your current Irish Residence Permit card",
  "Evidence of your award — parchment, or an official transcript or results letter from your institution",
  "Proof of private medical insurance",
  "The €300 registration fee",
];

const RESOURCES = [
  {
    title: "Third Level Graduate Programme — Immigration Service Delivery",
    href: "https://www.irishimmigration.ie/my-situation-has-changed-since-i-arrived-in-ireland/third-level-graduate-programme/",
  },
  {
    title: "Employment Permits — Department of Enterprise",
    href: "https://enterprise.gov.ie/en/what-we-do/workplace-and-skills/employment-permits/",
  },
  {
    title: "Critical Skills Occupations List",
    href: "https://enterprise.gov.ie/en/what-we-do/workplace-and-skills/employment-permits/employment-permit-eligibility/highly-skilled-eligible-occupations-list/",
  },
];

function Stamp1GMain() {
  return (
    <>
      <SEO
        title="Stamp 1G — Post-Study Work Permission in Ireland"
        description="Stamp 1G and the Third Level Graduate Programme: who qualifies, 12 or 24 months, how to apply and register, what it allows, and the route on to Stamp 1 and Stamp 4."
        canonicalPath="/stamp-1g"
      />
      <main className="jp-page">
        <header className="jp-hero">
          <p className="jp-hero__eyebrow">Third Level Graduate Programme</p>
          <h1 className="jp-hero__title">Stamp 1G — Post-Study Work</h1>
          <p className="jp-hero__subtitle">
            Stamp 1G is the permission that lets you stay in Ireland after you
            graduate and work full time without an employment permit. It is the
            bridge between a student visa and a career here — and the first
            immigration status whose months actually count toward long-term
            residency.
          </p>
        </header>

        <section className="jp-section" aria-labelledby="s1g-what">
          <h2 id="s1g-what" className="jp-h2">
            What Stamp 1G is
          </h2>
          <p className="jp-p">
            Ireland's Third Level Graduate Programme grants eligible graduates a
            period of residence to look for work and take it up. During that
            period you hold Stamp 1G, and you can work for any employer, full
            time, with no permit required and no sponsorship needed.
          </p>
          <p className="jp-p">
            That is the whole point of it: a graduate on Stamp 1G is far easier
            to hire than one who needs a permit before day one, which is what
            makes the stamp worth applying for the moment your results land.
          </p>
          <div className="jp-facts jp-facts--four">
            {DURATIONS.map((fact) => (
              <article className="jp-fact" key={fact.label}>
                <p className="jp-fact__label">{fact.label}</p>
                <p className="jp-fact__value">{fact.value}</p>
                <p className="jp-fact__desc">{fact.desc}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="jp-section" aria-labelledby="s1g-eligible">
          <h2 id="s1g-eligible" className="jp-h2">
            Who qualifies
          </h2>
          <ul className="jp-checklist">
            {ELIGIBILITY.map((item) => (
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
          <p className="jp-note jp-note--warn">
            <strong>The six-month window is the one people lose.</strong> It runs
            from the issue of your results. Waiting for a graduation ceremony
            months later has cost graduates the scheme entirely.
          </p>
        </section>

        <section className="jp-section" aria-labelledby="s1g-duration">
          <h2 id="s1g-duration" className="jp-h2">
            How long you get
          </h2>
          <div className="jp-table-wrap">
            <table className="jp-table">
              <thead>
                <tr>
                  <th scope="col">Award</th>
                  <th scope="col">NFQ level</th>
                  <th scope="col">Permission granted</th>
                  <th scope="col">Renewable</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Honours bachelor's degree</td>
                  <td>Level 8</td>
                  <td>12 months</td>
                  <td>No</td>
                </tr>
                <tr>
                  <td>Master's degree</td>
                  <td>Level 9</td>
                  <td>12 months, then a further 12</td>
                  <td>Once, to 24 months total</td>
                </tr>
                <tr>
                  <td>Doctoral degree</td>
                  <td>Level 10</td>
                  <td>12 months, then a further 12</td>
                  <td>Once, to 24 months total</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="jp-note">
            <strong>24 months is the ceiling.</strong> Stacking awards does not
            extend it — a graduate who takes a second master's does not earn a
            second 1G period beyond the cap.
          </p>
        </section>

        <section className="jp-section" aria-labelledby="s1g-rights">
          <h2 id="s1g-rights" className="jp-h2">
            What it allows, and what it does not
          </h2>
          <div className="jp-split">
            <div className="jp-split__col jp-split__col--do">
              <h3 className="jp-split__heading">On Stamp 1G you can</h3>
              <ul className="jp-bullets">
                {CAN_DO.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="jp-split__col jp-split__col--dont">
              <h3 className="jp-split__heading">On Stamp 1G you cannot</h3>
              <ul className="jp-bullets">
                {CANNOT_DO.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
          <p className="jp-p" style={{ marginTop: 16 }}>
            Family reunification only opens up later, on an employment permit
            route. <Link to="/dependent-visa">Dependent Visa</Link> sets out when
            a spouse or child can join you and under which stamp.
          </p>
        </section>

        <section className="jp-section" aria-labelledby="s1g-apply">
          <h2 id="s1g-apply" className="jp-h2">
            How to apply
          </h2>
          <ol className="jp-steps">
            <li className="jp-step">
              <h3 className="jp-step__title">Wait for your results</h3>
              <p className="jp-step__body">
                The six-month window opens when your results are issued. Ask your
                institution for an official results letter or transcript at the
                same time — it is the evidence the application turns on.
              </p>
            </li>
            <li className="jp-step">
              <h3 className="jp-step__title">Book a registration appointment</h3>
              <p className="jp-step__body">
                Students living in Dublin book through the Burgh Quay
                Registration Office. Elsewhere in Ireland, you register at your
                local immigration registration office. Book before your Stamp 2
                expires.
              </p>
            </li>
            <li className="jp-step">
              <h3 className="jp-step__title">Bring the full document set</h3>
              <p className="jp-step__body">
                A missing document means a new appointment, and appointments are
                the scarce part. What you need:
              </p>
              <ul className="jp-bullets">
                {APPLY_DOCS.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </li>
            <li className="jp-step">
              <h3 className="jp-step__title">Register and collect your IRP</h3>
              <p className="jp-step__body">
                Your new Irish Residence Permit card is issued showing Stamp 1G,
                with the expiry date of your graduate permission. From that
                point you can work full time for any employer.
              </p>
            </li>
            <li className="jp-step">
              <h3 className="jp-step__title">
                Renew at 12 months, if you hold a Level 9 or 10 award
              </h3>
              <p className="jp-step__body">
                Master's and doctoral graduates apply once more for the second
                12-month block. Level 8 graduates cannot renew and should be
                working toward an employment permit inside the first year.
              </p>
            </li>
          </ol>
        </section>

        <section className="jp-section" aria-labelledby="s1g-next">
          <h2 id="s1g-next" className="jp-h2">
            What comes after Stamp 1G
          </h2>
          <p className="jp-p">
            Stamp 1G runs out. The point of it is to be holding a qualifying job
            offer before it does, so you can move onto an employment permit and
            Stamp 1 without a gap in your permission.
          </p>
          <ul className="jp-bullets">
            <li>
              <strong>Critical Skills Employment Permit</strong> — for roles on
              the critical skills list, with a lower salary threshold and a
              faster route to Stamp 4.
            </li>
            <li>
              <strong>General Employment Permit</strong> — the broader route,
              usually requiring a labour market needs test.
            </li>
            <li>
              <strong>Stamp 1</strong> — the permission you register once your
              employment permit is approved.
            </li>
            <li>
              <strong>Stamp 4</strong> — long-term residence, typically after two
              years on a Critical Skills permit or five on a General permit.
            </li>
          </ul>
          <p className="jp-note">
            <strong>Time counts from here.</strong> Years on Stamp 2 are not
            reckonable for citizenship. Stamp 1G, Stamp 1 and Stamp 4 are. The{" "}
            <Link to="/poststudy">Post Study</Link> page maps the full timeline
            through to naturalisation.
          </p>
        </section>

        <section className="jp-section" aria-labelledby="s1g-resources">
          <h2 id="s1g-resources" className="jp-h2">
            Official resources
          </h2>
          <p className="jp-p">
            Durations, fees and eligibility are set by the Irish immigration
            authorities and do change. Confirm against the official pages:
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
            Graduating soon and want your Stamp 1G application checked?
          </p>
          <Link to="/#contact" className="jp-cta__btn">
            Talk to an Advisor
          </Link>
        </section>
      </main>
    </>
  );
}

export function Stamp1GRouteLayout() {
  return (
    <>
      <LandingHeader />
      <div className="LandingPage why-ireland-hub">
        <Stamp1GMain />
        <Footer />
      </div>
    </>
  );
}

export default Stamp1GMain;
