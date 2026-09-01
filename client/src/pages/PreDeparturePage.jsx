import React from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import LandingHeader from "../components/LandingHeader";
import Footer from "../components/Footer";
import "./JourneyPages.css";

/**
 * Pre Departure — everything to settle before the flight.
 *
 * Pairs with PostArrivalPage: this one stops at the boarding gate, that one
 * picks up at passport control. Both are linked from Quick Links in the
 * position the student meets them.
 */

/** Carried in hand luggage, never in the hold — immigration asks for these at
 *  Dublin Airport, and a checked bag is not in the room when they do. */
const HAND_LUGGAGE = [
  {
    title: "Passport and visa or preclearance letter",
    desc: "Valid for the full length of your course where possible, plus the approval letter you were issued.",
  },
  {
    title: "Final offer and acceptance letter",
    desc: "The unconditional offer from your Irish institution, showing your course, start date and duration.",
  },
  {
    title: "Tuition fee receipt",
    desc: "Proof of the fees already paid, on institution letterhead or as an official receipt.",
  },
  {
    title: "Medical insurance policy",
    desc: "Private cover is a condition of your permission, so carry the policy document, not just a reference number.",
  },
  {
    title: "Proof of funds",
    desc: "Evidence you can support yourself for the year — statements in your own name, matching what you submitted with your application.",
  },
  {
    title: "Accommodation confirmation",
    desc: "Your booking or tenancy agreement with the Irish address you will give at immigration.",
  },
  {
    title: "Original academic documents",
    desc: "Degree parchments, transcripts and your English test result. Institutions verify originals at registration.",
  },
  {
    title: "Passport photographs",
    desc: "Bring several. They are needed for registration, student cards and bank forms.",
  },
];

const MONEY_FACTS = [
  {
    label: "Currency",
    value: "Euro (€)",
    desc: "Northern Ireland uses pound sterling, so budget separately if you are studying in Belfast.",
  },
  {
    label: "Funds to show",
    value: "€10,000",
    desc: "The figure immigration expects a student to have access to for the first year. Confirm the current amount before you travel.",
  },
  {
    label: "Cards",
    value: "Visa / Mastercard",
    desc: "Widely accepted. Tell your bank you are travelling so the first transactions are not blocked.",
  },
  {
    label: "Cash on arrival",
    value: "€300–€500",
    desc: "Enough for transport, a SIM and the first few days before an Irish account is open.",
  },
];

const PACKING_DO = [
  "Layers, a genuinely waterproof jacket and shoes that survive rain",
  "A Type G plug adapter — Ireland runs 230V on the three-pin UK plug",
  "Prescription medicine in original packaging with a doctor's letter",
  "Spices and dry ingredients that are hard to find, in sealed packaging",
  "A hard copy of every document, alongside a cloud backup",
];

const PACKING_DONT = [
  "Meat and dairy from outside the EU — these are refused at the border",
  "Fresh fruit, vegetables, plants or seeds",
  "Heavy winter coats meant for continental snow; Irish winters are mild and wet",
  "Bedding and kitchenware in bulk — cheaper to buy locally than to fly",
  "Anything that pushes you over the airline's 23–30kg allowance",
];

const RESOURCES = [
  {
    title: "Immigration Service Delivery — Coming to Study",
    href: "https://www.irishimmigration.ie/coming-to-study-in-ireland/",
  },
  {
    title: "Bringing Food or Animal Products into Ireland",
    href: "https://www.gov.ie/en/publication/8e2b6-bringing-food-into-ireland/",
  },
  {
    title: "Education in Ireland — Prepare for Departure",
    href: "https://www.educationinireland.com/en/how-do-i-apply-/before-you-go/",
  },
];

function PreDepartureMain() {
  return (
    <>
      <SEO
        title="Pre Departure Checklist for Students Moving to Ireland"
        description="What to arrange before you fly to Ireland: documents for immigration, money and banking, insurance, packing for Irish weather, and what not to bring."
        canonicalPath="/pre-departure"
      />
      <main className="jp-page">
        <header className="jp-hero">
          <p className="jp-hero__eyebrow">Before you fly</p>
          <h1 className="jp-hero__title">Pre Departure Checklist</h1>
          <p className="jp-hero__subtitle">
            Your visa is approved and your seat is booked. What follows is
            everything worth settling before you reach the airport — the
            documents immigration will ask for, the money you need on day one,
            and the things that are far easier to sort at home than from a room
            in Dublin.
          </p>
        </header>

        <section className="jp-section" aria-labelledby="pd-docs">
          <h2 id="pd-docs" className="jp-h2">
            Documents to carry in your hand luggage
          </h2>
          <p className="jp-p">
            An immigration officer at Dublin Airport can ask to see any of these
            before granting you permission to land. Keep the full set in your
            cabin bag — a checked suitcase is not available to you at the desk.
          </p>
          <ul className="jp-checklist">
            {HAND_LUGGAGE.map((item) => (
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
          <p className="jp-note">
            <strong>Also useful:</strong> scan every document and keep a copy in
            your email or cloud storage. If a folder goes missing in transit, a
            scan is usually enough to get you through the next step.
          </p>
        </section>

        <section className="jp-section" aria-labelledby="pd-money">
          <h2 id="pd-money" className="jp-h2">
            Money and banking
          </h2>
          <p className="jp-p">
            You will not be able to open an Irish bank account until you have an
            address and, in most cases, a student letter — so plan to cover the
            first couple of weeks with what you bring.
          </p>
          <div className="jp-facts jp-facts--four">
            {MONEY_FACTS.map((fact) => (
              <article className="jp-fact" key={fact.label}>
                <p className="jp-fact__label">{fact.label}</p>
                <p className="jp-fact__value">{fact.value}</p>
                <p className="jp-fact__desc">{fact.desc}</p>
              </article>
            ))}
          </div>
          <p className="jp-note jp-note--warn">
            <strong>Declare large amounts:</strong> carrying €10,000 or more in
            cash into the EU must be declared to customs on arrival. Card and
            transfer are simpler and safer than a thick envelope.
          </p>
        </section>

        <section className="jp-section" aria-labelledby="pd-health">
          <h2 id="pd-health" className="jp-h2">
            Health and insurance
          </h2>
          <p className="jp-p">
            Private medical insurance is a condition of your student permission,
            and you will be asked for it again when you register with
            immigration in Ireland. Arrange it before you travel rather than in
            your first week.
          </p>
          <ul className="jp-bullets">
            <li>
              Take out cover that runs for the full length of your permission,
              not just the first term.
            </li>
            <li>
              Carry the policy document itself — a certificate number alone is
              not accepted at registration.
            </li>
            <li>
              Bring prescription medication in its original packaging with a
              signed letter from your doctor naming the drug and the dosage.
            </li>
            <li>
              Carry your vaccination record. Some courses, particularly in
              health and medicine, require proof before placement.
            </li>
          </ul>
          <p className="jp-p" style={{ marginTop: 14 }}>
            We arrange discounted student cover through our insurance partners —
            see <Link to="/health-insurance">Health Insurance</Link> for what
            each policy includes.
          </p>
        </section>

        <section className="jp-section" aria-labelledby="pd-packing">
          <h2 id="pd-packing" className="jp-h2">
            Packing for Ireland
          </h2>
          <p className="jp-p">
            Irish weather is mild and wet rather than cold — rain is the constant,
            not snow. Pack for damp days and pack light: most of what you would
            bring in bulk is cheaper to buy after you land.
          </p>
          <div className="jp-split">
            <div className="jp-split__col jp-split__col--do">
              <h3 className="jp-split__heading">Worth bringing</h3>
              <ul className="jp-bullets">
                {PACKING_DO.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="jp-split__col jp-split__col--dont">
              <h3 className="jp-split__heading">Leave behind</h3>
              <ul className="jp-bullets">
                {PACKING_DONT.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="jp-section" aria-labelledby="pd-lastweek">
          <h2 id="pd-lastweek" className="jp-h2">
            The last week before you fly
          </h2>
          <ol className="jp-steps">
            <li className="jp-step">
              <h3 className="jp-step__title">Confirm your accommodation</h3>
              <p className="jp-step__body">
                Re-confirm the booking, the check-in time and who hands you the
                keys. Landing at night with no way into the building is the most
                common first-day problem, and the easiest one to avoid.
              </p>
            </li>
            <li className="jp-step">
              <h3 className="jp-step__title">Plan the route from the airport</h3>
              <p className="jp-step__body">
                Check whether your institution runs an arrivals pickup. If not,
                Dublin Airport is served by frequent coaches to the city and to
                most university towns; know which one you need before you land.
              </p>
            </li>
            <li className="jp-step">
              <h3 className="jp-step__title">Tell your institution you are coming</h3>
              <p className="jp-step__body">
                Reply to the arrivals or orientation email with your flight
                details. It is how you get onto induction lists and, at some
                institutions, into airport pickup.
              </p>
            </li>
            <li className="jp-step">
              <h3 className="jp-step__title">Sort your phone</h3>
              <p className="jp-step__body">
                Make sure your handset is unlocked so an Irish SIM will work in
                it, and enable roaming for the first day so you are reachable
                between landing and buying one.
              </p>
            </li>
            <li className="jp-step">
              <h3 className="jp-step__title">Weigh your bags</h3>
              <p className="jp-step__body">
                Airline allowances are usually 23–30kg checked. Excess baggage
                paid at the desk costs several times what the same weight costs
                to buy again in Ireland.
              </p>
            </li>
          </ol>
        </section>

        <section className="jp-section" aria-labelledby="pd-resources">
          <h2 id="pd-resources" className="jp-h2">
            Official resources
          </h2>
          <p className="jp-p">
            Requirements and figures change. Check the official pages before you
            travel:
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

        <section className="jp-section" aria-labelledby="pd-next">
          <h2 id="pd-next" className="jp-h2">
            What happens next
          </h2>
          <p className="jp-p">
            Once you land, the clock starts on registration, your PPS number and
            your bank account. <Link to="/post-arrival">Post Arrival</Link> walks
            through the first thirty days in order.
          </p>
        </section>

        <section className="jp-cta" aria-label="Talk to us">
          <p className="jp-cta__text">
            Want us to check your documents before you fly?
          </p>
          <Link to="/#contact" className="jp-cta__btn">
            Talk to an Advisor
          </Link>
        </section>
      </main>
    </>
  );
}

export function PreDepartureRouteLayout() {
  return (
    <>
      <LandingHeader />
      <div className="LandingPage why-ireland-hub">
        <PreDepartureMain />
        <Footer />
      </div>
    </>
  );
}

export default PreDepartureMain;
