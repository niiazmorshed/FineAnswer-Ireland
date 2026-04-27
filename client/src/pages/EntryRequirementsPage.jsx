import React, { useState } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import LandingHeader from "../components/LandingHeader";
import Footer from "../components/Footer";
import "./EntryRequirementsPage.css";

function displayUrl(href) {
  try {
    const u = new URL(href);
    const path = u.pathname === "/" ? "" : u.pathname;
    return u.hostname.replace(/^www\./, "") + path;
  } catch {
    return href;
  }
}

/** Eight tabs (spec heading said "7 tabs" but listed Tab 1–8). */
const TABS = [
  { id: "irish", label: "Irish Institutes Entry" },
  { id: "alevel", label: "A-Level & IB" },
  { id: "nci", label: "NCI" },
  { id: "tus", label: "TUS" },
  { id: "ucc", label: "UCC" },
  { id: "ucd", label: "UCD" },
  { id: "maynooth", label: "Maynooth" },
  { id: "galway", label: "Univ. of Galway" },
];

const INSTITUTE_ENTRY_ROWS = [
  { institute: "University College Cork", ug: "80%", pg: "3.3 minimum, 75%" },
  { institute: "University College Dublin", ug: "70%", pg: "3.3 minimum, 75%" },
  { institute: "University of Galway", ug: "75%", pg: "3.0 minimum, 70% (vary, some 2.7)" },
  { institute: "University of Limerick", ug: "70%", pg: "3.0 minimum, 70%" },
  { institute: "Atlantic Technological University", ug: "60%", pg: "2.8 minimum" },
  { institute: "Dublin City University", ug: "60%", pg: "3.0 minimum, 70%" },
  { institute: "Dundalk Institute of Technology", ug: "55-60%", pg: "60%" },
  { institute: "Galway Business School", ug: "60%", pg: "3.0 minimum, 70% (vary, some 2.7)" },
  { institute: "Maynooth University", ug: "55-60%", pg: "3.0 minimum, 70%" },
  { institute: "Munster Technological University", ug: "55-60%", pg: "2.8 minimum" },
  { institute: "South East Technological University", ug: "55-60%", pg: "2.7 minimum (vary, some 3.0)" },
  { institute: "Technological University Dublin", ug: "60-70%", pg: "3.0 minimum (vary, some 3.2)" },
  { institute: "Technological University Shannon", ug: "70-80%", pg: "2.7-3.2 minimum" },
  { institute: "Trinity College Dublin", ug: "60%", pg: "3.3 minimum, 75% (vary, some 3.5)" },
  { institute: "IBAT", ug: "55%", pg: "2.5 minimum, 60%" },
  { institute: "DIFC", ug: "50%", pg: "Nil" },
  { institute: "UniHaven", ug: "50%", pg: "Nil" },
  { institute: "CCT College Dublin", ug: "60%", pg: "2.5 minimum, 60%" },
  { institute: "Dorset College", ug: "60%", pg: "Nil" },
  { institute: "Dublin Business School", ug: "55%", pg: "2.2 minimum, or 60%" },
  { institute: "Griffith College", ug: "55-60%", pg: "2.4 minimum, or 60%" },
  { institute: "ICD Business School", ug: "60%", pg: "2.5 minimum, or 60%" },
  { institute: "Independent College Dublin", ug: "60%", pg: "2.5 minimum, 60%" },
  { institute: "National College of Ireland", ug: "75%", pg: "2.8 minimum, 60%" },
];

const APPLICATION_FEE_ROWS = [
  { institute: "University of Limerick", fee: "€50" },
  { institute: "University of Galway", fee: "€35" },
  { institute: "SETU", fee: "Waiver" },
  { institute: "UCC", fee: "€50" },
  { institute: "UCD", fee: "Waiver" },
  { institute: "DCU", fee: "Waiver" },
  { institute: "TCD", fee: "€55" },
  { institute: "Maynooth University", fee: "€50" },
  { institute: "MTU", fee: "€0" },
  { institute: "ATU", fee: "€30" },
  { institute: "TU Dublin", fee: "€50" },
  { institute: "NCAD", fee: "€55" },
  { institute: "Technological University Shannon", fee: "Waiver" },
  { institute: "RCSI", fee: "€75" },
];

const A_LEVEL_EQUIV_ROWS = [
  { grade: "A*", cao3: "192", cao4: "24", ucas: "56", ib: "40-45" },
  { grade: "A", cao3: "165", cao4: "24", ucas: "48", ib: "36-39" },
  { grade: "B", cao3: "142", cao4: "20", ucas: "40", ib: "32-35" },
  { grade: "C", cao3: "120", cao4: "18", ucas: "32", ib: "28-31" },
  { grade: "D", cao3: "100", cao4: "16", ucas: "24", ib: "24-27" },
  { grade: "E", cao3: "67", cao4: "14", ucas: "16", ib: "20-23" },
];

const A_LEVEL_PUBLIC_UNIS = [
  {
    uni: "TU Dublin",
    lines: [
      "Minimum: Grade E at A-Level, Grade D at AS Level, or Grade 4/C at GCSE",
      "English: Minimum Grade 4/C at GCSE, Grade E at A-Level, or Grade D at AS Level",
    ],
  },
  {
    uni: "DCU",
    lines: [
      "Minimum: Grade E at A-Level, Grade D at AS Level, or Grade 4/C at GCSE",
      "Subject Rule: 6 distinct subjects including A-Level Grade C in 2 subjects and passes in English and Mathematics",
    ],
  },
  {
    uni: "UCD",
    lines: [
      "Minimum: At least 3 subjects at A-Level Grade C or better",
      "Subject Rule: 6 distinct subjects; remaining GCSE subjects must be Grade C+",
      "IB: Requires 24+ total points and IB Diploma",
    ],
  },
  {
    uni: "UOL (University of Limerick)",
    lines: [
      "Minimum: 2 subjects at A-Level Grade C AND 4 subjects at GCSE Grade C",
      "Subject Rule: 6 distinct subjects including English, Mathematics, and another language",
    ],
  },
  {
    uni: "UCC",
    lines: [
      "Minimum: 2 subjects at A-Level Grade C and 4 subjects at GCSE Grade C",
      "Subject Rule: 6 distinct subjects for Level 8 degree eligibility",
    ],
  },
  {
    uni: "University of Galway",
    lines: [
      "Minimum: Grade 4(C) in four recognised subjects at GCSE level",
      "A-Level Rule: At least 2 subjects at Grade C at A-Level",
    ],
  },
  {
    uni: "RCSI",
    lines: [
      "Required: Three A-Levels including Chemistry (mandatory) + one Lab Science (Biology or Physics). Third A-Level: Biology, Physics, Mathematics, or Psychology",
      "Minimum Grades: ABB or AAC",
      "GCSE: Minimum 6 subjects including English and Maths at Grade C/4",
    ],
  },
  {
    uni: "TCD",
    lines: [
      "Minimum: Range A*A*A to ABB depending on course. At least 2 at Grade C+ at A-Level",
      "Subject Rule: 6 distinct subjects across GCSE/AS/A-Levels",
      "Mandatory: English, Mathematics, and a Language other than English at Grade 4/C",
      "IB: 30–40 points. 3 subjects at HL (Grade 5) and 3 at SL (Grade 4)",
    ],
  },
];

/** Approved universities for Pakistan applicants — sourced from NCI (Jan 2026+ policy) */
const NCI_APPROVED_UNIVERSITIES = [
  { name: "Air University", href: "https://www.au.edu.pk/", campuses: "Islamabad, Multan, Kharian, Kamra" },
  { name: "Bahria University", href: "https://www.bahria.edu.pk/", campuses: "Islamabad, Karachi, Lahore" },
  { name: "Beaconhouse National University (BNU)", href: "https://www.bnu.edu.pk/", campuses: "Lahore" },
  {
    name: "COMSATS Institute of Information Technology",
    href: "https://comsats.edu.pk/",
    campuses: "Islamabad, Lahore, Abbottabad, Wah, Attock, Sahiwal, Vehari",
  },
  { name: "GIKI Swabi (Ghulam Ishaq Khan Institute)", href: "https://giki.edu.pk/", campuses: "Top in KP" },
  { name: "Government College University (only Lahore campus)", href: "https://gcu.edu.pk/", campuses: "Lahore" },
  { name: "Habib University", href: "https://habib.edu.pk/", campuses: "Karachi" },
  { name: "Indus Valley School of Arts", href: "https://www.indusvalley.edu.pk/home", campuses: "Karachi" },
  { name: "Institute of Business Administration (IBA)", href: "https://www.iba.edu.pk/", campuses: "Karachi" },
  { name: "Institute of Business Management (IOBM)", href: "https://www.iobm.edu.pk/", campuses: "Karachi" },
  {
    name: "Iqra University",
    href: "https://iqra.edu.pk/",
    campuses: "Karachi, Islamabad, Gulshan, Bahria Town, Malir, North, Chak Shahzad",
  },
  { name: "Karachi Institute of Economics and Technology", href: "https://kiet.edu.pk/", campuses: "Karachi" },
  { name: "Karachi School of Business and Leadership", href: "https://www.ksbl.edu.pk/", campuses: "Karachi" },
  { name: "Kinnaird College for Women", href: "https://kinnaird.edu.pk/", campuses: "Lahore" },
  {
    name: "Lahore School of Economics",
    href: "https://www.lahoreschoolofeconomics.edu.pk/",
    campuses: "Lahore",
  },
  { name: "Lahore University of Management Sciences (LUMS)", href: "https://lums.edu.pk/", campuses: "Lahore" },
  {
    name: "National University of Computer and Emerging Sciences (FAST)",
    href: "https://www.nu.edu.pk/",
    campuses: "Lahore, Karachi, Islamabad, Chiniot-Faisalabad, Peshawar",
  },
  { name: "National University of Sciences & Technology (NUST)", href: "https://nust.edu.pk/", campuses: "Islamabad" },
  {
    name: "NED University of Engineering & Technology, Karachi",
    href: "https://www.neduet.edu.pk/",
    campuses: "Karachi",
  },
  { name: "NFC Institute of Engineering and Technology", href: "https://www.nfciet.edu.pk/", campuses: "Multan" },
  { name: "Quaid-i-Azam University", href: "https://qau.edu.pk/", campuses: "Islamabad" },
  {
    name: "SZABIST (Shaheed Zulfikar Ali Bhutto Institute of Science and Technology)",
    href: "https://szabist.edu.pk/",
    campuses: "Islamabad, Larkana, Hyderabad, Dubai, Gharo",
  },
  { name: "University of Engineering and Technology Lahore", href: "https://www.uet.edu.pk/home/", campuses: "Lahore" },
  { name: "University of Engineering and Technology Taxila", href: "https://www.uettaxila.edu.pk/", campuses: "Taxila" },
  { name: "University of Karachi", href: "https://www.uok.edu.pk/", campuses: "Karachi" },
];

const INSTITUTION_HUBS = {
  tus: {
    title: "Technological University of the Shannon (TUS)",
    intro:
      "TUS offers pathways for international applicants across its campuses. Entry standards depend on country, qualification type, and programme. Always confirm the latest criteria for your intake year.",
    href: "https://www.tus.ie/international/",
    linkLabel: "TUS International",
  },
  ucc: {
    title: "University College Cork (UCC)",
    intro:
      "UCC publishes country-specific and qualification-specific entry guidance for international students. Competitive programmes may require higher grades than general minima.",
    href: "https://www.ucc.ie/en/study/international/",
    linkLabel: "UCC International Study",
  },
  ucd: {
    title: "University College Dublin (UCD)",
    intro:
      "UCD provides detailed international admissions information, including recognised qualifications and English language requirements. Some courses set higher thresholds than university-wide minima.",
    href: "https://www.ucd.ie/global/",
    linkLabel: "UCD Global / International",
  },
  maynooth: {
    title: "Maynooth University",
    intro:
      "Maynooth University outlines requirements for non-EU applicants by qualification and region. Check faculty pages for programme-specific prerequisites.",
    href: "https://www.maynoothuniversity.ie/international",
    linkLabel: "Maynooth International",
  },
  galway: {
    title: "University of Galway",
    intro:
      "University of Galway sets international entry requirements by school and programme. Use the official international hub for qualification equivalencies and deadlines.",
    href: "https://www.universityofgalway.ie/international-students/",
    linkLabel: "University of Galway International",
  },
};

function EntryRequirementsMain() {
  const [tab, setTab] = useState("irish");

  return (
    <>
      <SEO
        title="Entry Requirements for Irish Institutes — FineAnswer Ireland"
        description="Undergraduate and postgraduate entry requirements, application fees, A-Level and IB guidance, NCI Pakistan approved universities, and links to Irish university international admissions."
        canonicalPath="/entry-requirements"
      />
      <main className="er-page">
        <header className="er-hero">
          <span className="er-hero__tag">Irish higher education</span>
          <h1 className="er-hero__title">Entry Requirements for Irish Institutes</h1>
          <p className="er-hero__subtitle">
            Your comprehensive guide to admission criteria, application processes, and deadlines for top Irish
            universities and colleges.
          </p>
        </header>

        <div className="er-tabs-wrap">
          <div className="er-tabs" role="tablist" aria-label="Entry requirements sections">
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={tab === t.id}
                id={`er-tab-${t.id}`}
                aria-controls={`er-panel-${t.id}`}
                className={`er-tabs__btn${tab === t.id ? " er-tabs__btn--active" : ""}`}
                onClick={() => setTab(t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div
          id="er-panel-irish"
          role="tabpanel"
          aria-labelledby="er-tab-irish"
          hidden={tab !== "irish"}
          className="er-panel"
        >
          <h2 className="er-panel__h2">Irish Institutes Entry Requirements</h2>
          <p className="er-panel__lead">Undergraduate (UG) and Postgraduate (PG) Requirements with Application Fees</p>

          <h3 className="er-h3">Entry Requirements</h3>
          <div className="er-table-wrap">
            <table className="er-table">
              <thead>
                <tr>
                  <th scope="col">Institute</th>
                  <th scope="col">UG Requirements</th>
                  <th scope="col">PG Requirements</th>
                </tr>
              </thead>
              <tbody>
                {INSTITUTE_ENTRY_ROWS.map((row) => (
                  <tr key={row.institute}>
                    <td>{row.institute}</td>
                    <td>{row.ug}</td>
                    <td>{row.pg}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="er-note">
            <strong>Note:</strong> UG = Undergraduate, PG = Postgraduate. Requirements may vary by specific programs.
          </p>

          <h3 className="er-h3 er-h3--spaced">Application Fees for Public Institutes</h3>
          <div className="er-table-wrap">
            <table className="er-table er-table--fees">
              <thead>
                <tr>
                  <th scope="col">Institute</th>
                  <th scope="col">Fees (Euros)</th>
                </tr>
              </thead>
              <tbody>
                {APPLICATION_FEE_ROWS.map((row) => (
                  <tr key={row.institute}>
                    <td>{row.institute}</td>
                    <td className="er-table__fee">{row.fee}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div
          id="er-panel-alevel"
          role="tabpanel"
          aria-labelledby="er-tab-alevel"
          hidden={tab !== "alevel"}
          className="er-panel"
        >
          <h2 className="er-panel__h2">Entry Requirements for A-Level &amp; IB Students</h2>
          <p className="er-panel__lead">
            Guidelines for counselors and students applying to competitive universities in Ireland
          </p>

          <section className="er-block" aria-labelledby="er-alevel-general">
            <h3 id="er-alevel-general" className="er-h3">
              General Guidelines
            </h3>
            <p className="er-p">
              TCD and UCD are among Ireland&apos;s most competitive universities, therefore students should be
              encouraged to maintain strong academic performance, ideally above the minimum requirements, to improve
              admission chances.
            </p>
            <p className="er-p">
              <strong>UCD:</strong> IB students required to achieve minimum 24 total points for undergraduate
              admission. Specific programs may have higher requirements.
            </p>
            <p className="er-p">
              <strong>TCD:</strong> IB students typically expected to obtain 30–40 total points. Must complete three
              Higher Level (HL) subjects with minimum grade 5 and three Standard Level (SL) subjects with minimum grade
              4.
            </p>
          </section>

          <h3 className="er-h3">A Level Equivalency to CAO, UCAS &amp; IB</h3>
          <div className="er-table-wrap">
            <table className="er-table">
              <thead>
                <tr>
                  <th scope="col">A Level Grade</th>
                  <th scope="col">CAO Points (Best 3)</th>
                  <th scope="col">CAO 4th A-Level/AS Bonus</th>
                  <th scope="col">UCAS Points (UK)</th>
                  <th scope="col">IB Equivalent</th>
                </tr>
              </thead>
              <tbody>
                {A_LEVEL_EQUIV_ROWS.map((row) => (
                  <tr key={row.grade}>
                    <td>{row.grade}</td>
                    <td>{row.cao3}</td>
                    <td>{row.cao4}</td>
                    <td>{row.ucas}</td>
                    <td>{row.ib}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="er-h3 er-h3--spaced">General Entry Requirements for Public Universities</h3>
          <div className="er-table-wrap">
            <table className="er-table er-table--details">
              <thead>
                <tr>
                  <th scope="col">University</th>
                  <th scope="col">Detailed Entry Requirements &amp; Subject Notes</th>
                </tr>
              </thead>
              <tbody>
                {A_LEVEL_PUBLIC_UNIS.map((row) => (
                  <tr key={row.uni}>
                    <td className="er-table__uni">{row.uni}</td>
                    <td>
                      <ul className="er-cell-list">
                        {row.lines.map((line) => (
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

        <div
          id="er-panel-nci"
          role="tabpanel"
          aria-labelledby="er-tab-nci"
          hidden={tab !== "nci"}
          className="er-panel"
        >
          <h2 className="er-panel__h2">National College of Ireland (NCI)</h2>
          <h3 className="er-h3">NCI Admission Policy</h3>
          <p className="er-note er-note--inline">
            <strong>Note:</strong> Effective for January 2026 and future intakes
          </p>
          <p className="er-p">NCI only considers applications from approved universities.</p>

          <h3 className="er-h3 er-h3--spaced">Approved Universities</h3>
          <p className="er-p er-p--small">
            Official list for Pakistan applicants — verify details on{" "}
            <a
              href="https://www.ncirl.ie/Students/International/Your-Country/Pakistan"
              target="_blank"
              rel="noopener noreferrer"
              className="er-inline-link"
            >
              NCI&apos;s Pakistan page
            </a>
            .
          </p>
          <div className="er-table-wrap">
            <table className="er-table er-table--nci">
              <thead>
                <tr>
                  <th scope="col">University</th>
                  <th scope="col">Website</th>
                  <th scope="col">Campus Locations</th>
                </tr>
              </thead>
              <tbody>
                {NCI_APPROVED_UNIVERSITIES.map((row) => (
                  <tr key={row.name}>
                    <td>{row.name}</td>
                    <td>
                      <a href={row.href} target="_blank" rel="noopener noreferrer" className="er-table-link">
                        {displayUrl(row.href)}
                      </a>
                    </td>
                    <td>{row.campuses}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {(["tus", "ucc", "ucd", "maynooth", "galway"]).map((key) => {
          const hub = INSTITUTION_HUBS[key];
          return (
            <div
              key={key}
              id={`er-panel-${key}`}
              role="tabpanel"
              aria-labelledby={`er-tab-${key}`}
              hidden={tab !== key}
              className="er-panel"
            >
              <h2 className="er-panel__h2">{hub.title}</h2>
              <p className="er-p">{hub.intro}</p>
              <a className="er-ext-btn" href={hub.href} target="_blank" rel="noopener noreferrer">
                {hub.linkLabel} — official site
              </a>
              <p className="er-p er-p--muted">
                Programme-specific grades, English tests, and deadlines change by faculty. FineAnswer Ireland can help
                you interpret requirements for your chosen course and intake.
              </p>
            </div>
          );
        })}

        <section className="er-cta" aria-label="Apply">
          <p className="er-cta__text">Are you ready to take the next step toward your future career?</p>
          <Link to="/#contact" className="er-cta__btn">
            Apply Now
          </Link>
        </section>
      </main>
    </>
  );
}

export function EntryRequirementsRouteLayout() {
  return (
    <>
      <LandingHeader />
      <div className="LandingPage why-ireland-hub">
        <EntryRequirementsMain />
        <Footer />
      </div>
    </>
  );
}

export default EntryRequirementsMain;
