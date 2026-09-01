import React from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import LandingHeader from "../components/LandingHeader";
import Footer from "../components/Footer";
import "./JourneyPages.css";

/**
 * Post Arrival — the first thirty days in Ireland.
 *
 * Picks up where PreDeparturePage stops: passport control onward. Ordered by
 * dependency rather than importance, because several of these steps genuinely
 * block the next one — no address means no PPS number, no PPS number means no
 * payroll.
 */

const WORK_HOURS = [
  {
    label: "Term time",
    value: "20 hours",
    desc: "The weekly maximum while your course is in session.",
  },
  {
    label: "June–September",
    value: "40 hours",
    desc: "Full-time hours are permitted across these four months.",
  },
  {
    label: "15 Dec – 15 Jan",
    value: "40 hours",
    desc: "The second full-time window, over the winter break.",
  },
  {
    label: "Permission",
    value: "Stamp 2",
    desc: "These rights apply to Stamp 2 holders on an eligible course only.",
  },
];

const BANKS = [
  "AIB, Bank of Ireland and Permanent TSB all offer student current accounts",
  "Bring your passport, IRP or landing stamp, and a student letter with your Irish address",
  "Revolut and N26 open faster and are widely used, but some employers still ask for an Irish IBAN",
  "Ask your institution for the bank letter — most produce one on request for new students",
];

const SETTLING = [
  {
    title: "Get a Leap Card",
    desc: "Ireland's transport card. The Student Leap Card cuts fares substantially and doubles as ID for student discounts.",
  },
  {
    title: "Buy an Irish SIM",
    desc: "Vodafone, Three, Eir and GoMo all sell prepay SIMs. You need an Irish number for banking, work and immigration forms.",
  },
  {
    title: "Register with a GP",
    desc: "Find a local practice and register early rather than when you are already unwell. Your insurance covers the visit terms.",
  },
  {
    title: "Attend orientation",
    desc: "Induction is where you collect your student card, activate your account and meet your international office.",
  },
  {
    title: "Know the emergency numbers",
    desc: "112 and 999 both reach emergency services anywhere in Ireland, free from any phone.",
  },
  {
    title: "Keep your tenancy paperwork",
    desc: "Rented accommodation should be registered with the Residential Tenancies Board. Keep receipts for every payment.",
  },
];

const RESOURCES = [
  {
    title: "Burgh Quay Registration Office — Appointments",
    href: "https://burghquayregistrationoffice.inis.gov.ie/",
  },
  {
    title: "PPS Number — MyWelfare",
    href: "https://www.gov.ie/en/service/12e6de-get-a-personal-public-service-pps-number/",
  },
  {
    title: "Registration and Permission — Immigration Service Delivery",
    href: "https://www.irishimmigration.ie/registering-your-immigration-permission/",
  },
];

function PostArrivalMain() {
  return (
    <>
      <SEO
        title="Post Arrival Guide for International Students in Ireland"
        description="Your first thirty days in Ireland: immigration at the airport, IRP registration and Stamp 2, PPS number, opening a bank account, transport, and student work rights."
        canonicalPath="/post-arrival"
      />
      <main className="jp-page">
        <header className="jp-hero">
          <p className="jp-hero__eyebrow">Your first thirty days</p>
          <h1 className="jp-hero__title">Post Arrival in Ireland</h1>
          <p className="jp-hero__subtitle">
            Landing is the easy part. The weeks that follow are a short chain of
            appointments and applications, and several of them block each other
            — you cannot get paid without a PPS number, and you cannot get a PPS
            number without an address. Here they are in the order that works.
          </p>
        </header>

        <section className="jp-section" aria-labelledby="pa-airport">
          <h2 id="pa-airport" className="jp-h2">
            At the airport
          </h2>
          <p className="jp-p">
            Your visa lets you travel to Ireland. It is the immigration officer
            at the border who actually grants you permission to enter, so have
            your document folder in hand rather than in the overhead locker.
          </p>
          <ul className="jp-bullets">
            <li>
              Present your passport, offer letter, proof of fees paid, medical
              insurance and evidence of funds.
            </li>
            <li>
              Give the Irish address where you will be living — the one on your
              accommodation booking.
            </li>
            <li>
              You will be given a landing stamp in your passport. It is
              short-term permission to be in the country, not your student
              permission.
            </li>
          </ul>
          <p className="jp-note jp-note--warn">
            <strong>The landing stamp expires.</strong> It covers you only until
            you register with immigration. Book that appointment as soon as you
            have an Irish address — slots go quickly at the start of term.
          </p>
        </section>

        <section className="jp-section" aria-labelledby="pa-order">
          <h2 id="pa-order" className="jp-h2">
            The order to do things in
          </h2>
          <ol className="jp-steps">
            <li className="jp-step">
              <h3 className="jp-step__title">Register at your institution</h3>
              <p className="jp-step__body">
                Complete enrolment, collect your student card and ask the
                international office for a student letter confirming your course
                and address. Almost every later step asks for that letter.
              </p>
            </li>
            <li className="jp-step">
              <h3 className="jp-step__title">
                Register your immigration permission and get your IRP
              </h3>
              <p className="jp-step__body">
                Students living in Dublin book online through the Burgh Quay
                Registration Office. Outside Dublin, you register at your local
                immigration registration office. Bring your passport, offer
                letter, proof of fees, medical insurance and evidence of funds.
              </p>
              <p className="jp-step__body">
                The registration fee is €300. You are issued an Irish Residence
                Permit card carrying Stamp 2 — your actual student permission,
                and the document you will be asked for from then on.
              </p>
            </li>
            <li className="jp-step">
              <h3 className="jp-step__title">Apply for a PPS number</h3>
              <p className="jp-step__body">
                Your Personal Public Service number is what lets an employer put
                you on payroll and tax you correctly. Apply through MyWelfare
                with your passport, IRP and proof of your Irish address. You
                need a reason for the application — an offer of work is the
                usual one.
              </p>
            </li>
            <li className="jp-step">
              <h3 className="jp-step__title">Open a bank account</h3>
              <p className="jp-step__body">
                With your IRP, student letter and proof of address you can open
                an Irish current account. Do this before you start work: many
                employers will not pay into a foreign account.
              </p>
            </li>
            <li className="jp-step">
              <h3 className="jp-step__title">Set up transport and a phone</h3>
              <p className="jp-step__body">
                A Student Leap Card and an Irish SIM are cheap, quick, and both
                are asked for by other services more often than you would
                expect.
              </p>
            </li>
          </ol>
        </section>

        <section className="jp-section" aria-labelledby="pa-work">
          <h2 id="pa-work" className="jp-h2">
            Working while you study
          </h2>
          <p className="jp-p">
            Stamp 2 permission on an eligible course carries limited work rights.
            The limits are firm, and breaching them puts your permission — and
            any later Stamp 1G application — at risk.
          </p>
          <div className="jp-facts jp-facts--four">
            {WORK_HOURS.map((fact) => (
              <article className="jp-fact" key={fact.label}>
                <p className="jp-fact__label">{fact.label}</p>
                <p className="jp-fact__value">{fact.value}</p>
                <p className="jp-fact__desc">{fact.desc}</p>
              </article>
            ))}
          </div>
          <p className="jp-note">
            <strong>Note:</strong> time spent on Stamp 2 does not count toward
            long-term residency or citizenship. Only the years after you move to{" "}
            <Link to="/stamp-1g">Stamp 1G</Link> and beyond are reckonable.
          </p>
        </section>

        <section className="jp-section" aria-labelledby="pa-bank">
          <h2 id="pa-bank" className="jp-h2">
            Banking, in practice
          </h2>
          <ul className="jp-bullets">
            {BANKS.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="jp-section" aria-labelledby="pa-settling">
          <h2 id="pa-settling" className="jp-h2">
            Settling in
          </h2>
          <ul className="jp-checklist">
            {SETTLING.map((item) => (
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
        </section>

        <section className="jp-section" aria-labelledby="pa-renew">
          <h2 id="pa-renew" className="jp-h2">
            Renewing your permission
          </h2>
          <p className="jp-p">
            Stamp 2 is granted for a fixed period, usually a year, and has to be
            renewed for each year of your course. Renew online well before the
            expiry date on your IRP card — you need continuous permission, and a
            gap is treated as a lapse rather than a formality.
          </p>
          <p className="jp-p">
            Students may hold Stamp 2 for a maximum of seven years across all
            their studies in Ireland.
          </p>
        </section>

        <section className="jp-section" aria-labelledby="pa-resources">
          <h2 id="pa-resources" className="jp-h2">
            Official resources
          </h2>
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
          <p className="jp-note">
            Fees, appointment systems and thresholds change. Treat the official
            pages above as authoritative and this guide as the map.
          </p>
        </section>

        <section className="jp-cta" aria-label="Talk to us">
          <p className="jp-cta__text">
            Stuck on registration, a PPS number or your first bank account?
          </p>
          <Link to="/#contact" className="jp-cta__btn">
            Talk to an Advisor
          </Link>
        </section>
      </main>
    </>
  );
}

export function PostArrivalRouteLayout() {
  return (
    <>
      <LandingHeader />
      <div className="LandingPage why-ireland-hub">
        <PostArrivalMain />
        <Footer />
      </div>
    </>
  );
}

export default PostArrivalMain;
