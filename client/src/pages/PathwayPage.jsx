import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import TopUtilityBar from "../components/TopUtilityBar";
import Navbar3 from "../components/navbar3";
import Footer from "../components/Footer";
import "./PathwayPage.css";

const FILTER_TABS = [
  { id: "all", label: "All Programs" },
  { id: "foundation", label: "Foundation Year" },
  { id: "premaster", label: "Pre-Master's" },
];

const PROGRAM_ROWS = [
  {
    id: "difc",
    category: "foundation",
    university: "DIFC (Dublin International Foundation College)",
    course: "International Foundation Year (IFY)",
    startDates: "Sept (9 months), Jan (7 months)",
    ielts: "5.0 (most streams) / 5.5 (Health/Medicine)",
    fee: "€15,600 – Business | €16,600 – Science/Engineering | €18,800 – Health Sciences",
    progression: [
      "Progression to 60+ NCUK partner universities (Ireland, UK & globally).",
      "Examples: Trinity, UCD, DCU, University of Galway, University of Limerick, Manchester, Leeds, Sheffield, Aston",
    ],
  },
  {
    id: "oncampus-ifp",
    category: "foundation",
    university: "OnCampus Ireland (based in Maynooth)",
    course: "International Foundation Programme (IFP)",
    startDates: "Sept intake (2 semesters)",
    ielts: "5.0 (Business, Eng/Science) / 5.5 (Medical stream)",
    fee: "€16,330 – Business/Social Sciences & Eng/Science | €20,450 – Medical route",
    progression: [
      "Maynooth, DCU, University of Galway, MTU, SETU, St Patrick's, and others",
    ],
  },
  {
    id: "oncampus-pmp",
    category: "premaster",
    university: "OnCampus Ireland (PMP)",
    course: "Pre-Master's Programme",
    startDates: "Sept intake, Jan intake",
    ielts: "Recognised undergraduate degree (or equivalent) + IELTS 5.5 (min 5.0 each)",
    fee: "€16,330 (2 semesters)",
    progression: [
      "Guaranteed progression to Master's degrees at partner universities.",
      "Subject to meeting degree-specific requirements.",
    ],
  },
  {
    id: "tu-dublin",
    category: "foundation",
    university: "TU Dublin",
    course: "International Foundation Year Programme (TU697)",
    startDates: "Sept 2025, Jan 2026",
    ielts: "Typically 1 band below direct entry (around IELTS 5.0)",
    fee: "€12,500",
    progression: [
      "Guaranteed progression to TU Dublin undergraduate programmes.",
      "Business, Science, Engineering, Social Science",
    ],
  },
  {
    id: "tus",
    category: "foundation",
    university: "TUS (Technological University of the Shannon)",
    course: "International Foundation Programme",
    startDates: "Sept intake (apply by 1st June)",
    ielts: "IELTS 5.0 (or equivalent)",
    fee: "€11,000",
    progression: ["Engineering, Science, Business, Social Sciences, Creative Arts"],
  },
  {
    id: "dcu",
    category: "foundation",
    university: "DCU (Dublin City University)",
    course: "International Foundation Year (DC555)",
    startDates: "Sept intake",
    ielts:
      "Designed for students below direct entry (Direct UG entry = IELTS 6.5 overall, 6.0 each band)",
    fee: "Varies by stream (Business, Engineering, Science, Humanities). Plus NCUK fees.",
    progression: ["Guaranteed progression to DCU undergraduate degrees in chosen stream"],
  },
  {
    id: "dkit",
    category: "foundation",
    university: "DKIT (Dundalk Institute of Technology)",
    course: "Certificate in Foundation Studies",
    startDates: "Sept – June or Jan – Aug (2 semesters)",
    ielts: "IELTS 4.5 (or equivalent)",
    fee: "€7,545 (includes mandatory health insurance & sports fee)",
    progression: [
      "Enables entry into Year 1 of selected Bachelor programmes at DKIT.",
      "Subject to achieving required grades.",
    ],
  },
];

function PathwayMain() {
  const [filter, setFilter] = useState("all");

  const filteredRows = useMemo(() => {
    if (filter === "all") return PROGRAM_ROWS;
    return PROGRAM_ROWS.filter((r) => r.category === filter);
  }, [filter]);

  return (
    <>
      <SEO
        title="Foundation and Pathway Programs — FineAnswer Ireland"
        description="International foundation and pre-master's programmes in Ireland — DIFC, OnCampus, TU Dublin, TUS, DCU, DKIT. Start dates, IELTS, fees, and degree progression."
        canonicalPath="/pathway"
      />
      <main className="path-page">
        <header className="path-hero">
          <h1 className="path-hero__title">Foundation and Pathway Programs</h1>
          <p className="path-hero__subtitle">
            Building strong foundations for academic success and creating clear pathways to your future career.
          </p>
        </header>

        <section className="path-section" aria-labelledby="path-programs-heading">
          <div
            className="path-tabs"
            role="tablist"
            aria-label="Filter programmes by type"
          >
            {FILTER_TABS.map((tab) => {
              const selected = filter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  id={`path-tab-${tab.id}`}
                  aria-selected={selected}
                  aria-controls="path-programs-panel"
                  className={`path-tabs__btn${selected ? " path-tabs__btn--active" : ""}`}
                  onClick={() => setFilter(tab.id)}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div
            id="path-programs-panel"
            role="tabpanel"
            aria-labelledby={`path-tab-${filter}`}
          >
            <h2 id="path-programs-heading" className="path-table-title">
              International Foundation Programmes in Ireland Summary for International Students
            </h2>

            <div className="path-table-desktop">
              <div className="path-table-wrap">
                <table className="path-table">
                  <thead>
                    <tr>
                      <th scope="col">University / College</th>
                      <th scope="col">Course Name</th>
                      <th scope="col">Start Dates</th>
                      <th scope="col">IELTS Requirement</th>
                      <th scope="col">Tuition Fee</th>
                      <th scope="col">Progression to Degree</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRows.map((row) => (
                      <tr key={row.id}>
                        <td data-label="University / College">{row.university}</td>
                        <td data-label="Course Name">{row.course}</td>
                        <td data-label="Start Dates">{row.startDates}</td>
                        <td data-label="IELTS Requirement">{row.ielts}</td>
                        <td className="path-table__fee" data-label="Tuition Fee">
                          {row.fee}
                        </td>
                        <td data-label="Progression to Degree">
                          <ul className="path-table__progression">
                            {row.progression.map((line) => (
                              <li key={line}>{line}</li>
                            ))}
                          </ul>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="path-cards" aria-label="Programme list">
              {filteredRows.map((row) => (
                <article key={row.id} className="path-card">
                  <h3 className="path-card__h">{row.university}</h3>
                  <dl className="path-card__dl">
                    <div className="path-card__row">
                      <dt>Course Name</dt>
                      <dd>{row.course}</dd>
                    </div>
                    <div className="path-card__row">
                      <dt>Start Dates</dt>
                      <dd>{row.startDates}</dd>
                    </div>
                    <div className="path-card__row">
                      <dt>IELTS Requirement</dt>
                      <dd>{row.ielts}</dd>
                    </div>
                    <div className="path-card__row">
                      <dt>Tuition Fee</dt>
                      <dd className="path-card__fee">{row.fee}</dd>
                    </div>
                    <div className="path-card__row">
                      <dt>Progression to Degree</dt>
                      <dd>
                        <ul className="path-table__progression path-table__progression--card">
                          {row.progression.map((line) => (
                            <li key={line}>{line}</li>
                          ))}
                        </ul>
                      </dd>
                    </div>
                  </dl>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="path-cta" aria-label="Apply">
          <p className="path-cta__text">
            Are you ready to take the next step toward your future career?
          </p>
          <Link to="/#contact" className="path-cta__btn">
            Apply Now
          </Link>
        </section>
      </main>
    </>
  );
}

export function PathwayRouteLayout() {
  return (
    <div className="LandingPage why-ireland-hub">
      <div className="landing-top">
        <TopUtilityBar />
        <Navbar3 />
      </div>
      <PathwayMain />
      <Footer />
    </div>
  );
}

export default PathwayMain;
