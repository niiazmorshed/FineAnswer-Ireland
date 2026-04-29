import React from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import LandingHeader from "../components/LandingHeader";
import Footer from "../components/Footer";
import "./StudyMedicinePage.css";

function StudyMedicineMain() {
  return (
    <>
      <SEO
        title="Undergraduate Medicine — Ireland"
        description="Key Non-EU Entry Requirements for studying Medicine at top Irish universities."
        canonicalPath="/study-medicine"
      />
      <main className="sm-page">
        <header className="sm-hero">
          <span className="sm-tag">Irish Medical School Requirements</span>
          <h1 className="sm-title">Undergraduate Medicine — Ireland</h1>
          <p className="sm-subtitle">
            Key Non-EU Entry Requirements for studying Medicine at top Irish universities.
          </p>
        </header>

        <section className="sm-cards">
          <article className="sm-card">
            <div className="sm-logo">University Logo Placeholder</div>
            <h2>Royal College of Surgeons in Ireland (RCSI) — Dublin</h2>
            <span className="sm-badge">5 or 6 Year Program</span>

            <h3>A Level Requirements:</h3>
            <ul>
              <li>Non-EU school leavers: five GCE A Levels required</li>
              <li>
                5-year track (direct entry, exempt from foundation): minimum three A Level subjects with grades AAB,
                to include Chemistry, one lab science (Biology or Physics), plus one other from Biology, Physics,
                Mathematics or Psychology
              </li>
              <li>
                All applicants must have minimum six GCSE subjects including Grade 4/C in English and Mathematics
              </li>
              <li>
                6-year track: for applicants who meet AAB but not the exact subject mix — must present at least one
                of Chemistry, Physics or Biology
              </li>
              <li>
                All A Level exams must be taken within two consecutive academic years (years 12 & 13)
              </li>
            </ul>

            <h3>English Language:</h3>
            <p>IELTS 6.5 overall with no band below 6.0</p>

            <h3>Tuition Fees:</h3>
            <p>See official fees page for latest figures</p>

            <div className="sm-btns">
              <a href="https://www.rcsi.com/dublin/undergraduate/medicine/entry-requirements" target="_blank" rel="noopener noreferrer">Entry Requirements</a>
              <a href="https://www.rcsi.com/dublin/undergraduate/medicine/fees-and-funding" target="_blank" rel="noopener noreferrer">Fees & Funding</a>
              <a href="https://apply.educationireland.net/admin/create_an_account" target="_blank" rel="noopener noreferrer">Apply via FineAnswer Ireland</a>
            </div>
          </article>

          <article className="sm-card">
            <div className="sm-logo">University Logo Placeholder</div>
            <h2>University College Dublin (UCD)</h2>
            <span className="sm-badge">6 Year Program</span>

            <h3>A Level Requirements:</h3>
            <p>
              Non-EU applicants typically require at least six recognised subjects — commonly AAA at A Level in core
              science subjects. See UCD&apos;s page for country-specific details.
            </p>

            <h3>English Language:</h3>
            <p>IELTS 6.5 overall (minimum requirements published on UCD&apos;s site)</p>

            <h3>Application Fee:</h3>
            <p>Approximately €50 (confirm on UCD admissions page)</p>

            <h3>Tuition Fees:</h3>
            <p>Refer to UCD&apos;s international undergraduate fees for exact per-year amounts</p>

            <h3>Timeline:</h3>
            <p>
              Applications typically open in October and close in July for non-EU candidates (dates vary by year)
            </p>

            <div className="sm-btns">
              <a href="https://www.ucd.ie/global/study-at-ucd/undergraduate/entryrequirements/" target="_blank" rel="noopener noreferrer">A-Level Entry</a>
              <a href="https://www.ucd.ie/students/fees/noneucoursefees/internationalnon-euundergraduatefees20252026" target="_blank" rel="noopener noreferrer">Fees & Funding</a>
              <a href="https://apply.educationireland.net/admin/create_an_account" target="_blank" rel="noopener noreferrer">Apply via FineAnswer Ireland</a>
            </div>
          </article>

          <article className="sm-card">
            <div className="sm-logo">University Logo Placeholder</div>
            <h2>University College Cork (UCC)</h2>
            <span className="sm-badge">5 Year Program (MB, BCh, BAO)</span>

            <h3>Academic Requirements:</h3>
            <p>
              Cambridge GCE A Levels: minimum grades ABB. Chemistry at A Level is required (subject specific
              requirements apply by country).
            </p>

            <h3>English Language:</h3>
            <p>Acceptable tests include:</p>
            <ul>
              <li>DET 120 (with section minimums)</li>
              <li>TOEFL 90 with section minima</li>
              <li>IELTS overall 6.5 with minimum 6.5 in each band</li>
            </ul>

            <h3>Tuition Fee (Non-EU):</h3>
            <p>See UCC international undergraduate fee schedule for per-year figures</p>

            <h3>Application & Timeline:</h3>
            <p>
              UCC&apos;s international portal opens December; many programs close by May (medicine may have different
              deadlines)
            </p>

            <div className="sm-btns">
              <a href="https://www.ucc.ie/en/study/comparison/undergrad/africa-me-india/pakistan/" target="_blank" rel="noopener noreferrer">Country Entry Guide</a>
              <a href="https://www.ucc.ie/en/financeoffice/fees/schedules/internationalundergraduatefees202627/" target="_blank" rel="noopener noreferrer">Fees & Funding</a>
              <a href="https://apply.educationireland.net/admin/create_an_account" target="_blank" rel="noopener noreferrer">Apply via FineAnswer Ireland</a>
            </div>
          </article>

          <article className="sm-card">
            <div className="sm-logo">University Logo Placeholder</div>
            <h2>Trinity College Dublin (TCD)</h2>
            <span className="sm-badge">5 Year Program (BA MB BCh BAO)</span>

            <h3>Academic Requirements:</h3>
            <p>
              A-Levels: typically Grade B+ and two C&apos;s in two of physics, chemistry, or biology. If you don&apos;t have
              physics, a GCSE (or equivalent) in Mathematics at Grade B or higher may be required.
            </p>

            <h3>English Language:</h3>
            <p>IELTS 6.5–7.0 (expectation varies by year and course)</p>

            <h3>Timeline & Fees:</h3>
            <p>
              Application portal opens in November for the next autumn intake; rolling admission until June. Non-EU
              application fee approx. €55 per course; consult TCD for current tuition fees.
            </p>

            <div className="sm-btns">
              <a href="https://www.tcd.ie/courses/undergraduate/courses/medicine" target="_blank" rel="noopener noreferrer">TCD Course Page</a>
              <a href="https://www.tcd.ie/courses/undergraduate/fees/" target="_blank" rel="noopener noreferrer">Fees</a>
              <a href="https://apply.educationireland.net/admin/create_an_account" target="_blank" rel="noopener noreferrer">Apply via FineAnswer Ireland</a>
            </div>
          </article>
        </section>

        <section className="sm-warning">
          <p>
            Note: Applicants who do not meet the requirements for direct entry may pursue a Foundation Pathway as an
            alternative route to admission.
          </p>
          <Link to="/pathway">More Information about Foundation Pathways</Link>
        </section>

        <section className="sm-cta">
          <p>Are you ready to take the next step toward your future career?</p>
          <a href="/#contact">Apply Now</a>
        </section>
      </main>
    </>
  );
}

export function StudyMedicineRouteLayout() {
  return (
    <>
      <LandingHeader />
      <div className="LandingPage why-ireland-hub">
        <StudyMedicineMain />
        <Footer />
      </div>
    </>
  );
}

export default StudyMedicineMain;
