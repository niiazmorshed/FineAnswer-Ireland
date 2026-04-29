import React, { useEffect, useState } from "react";
import {
  FaCheck,
  FaTimes,
  FaHeart,
  FaWallet,
  FaHome,
  FaIdCard,
  FaUserFriends,
} from "react-icons/fa";
import SEO from "../components/SEO";
import LandingHeader from "../components/LandingHeader";
import Footer from "../components/Footer";
import "./DependentVisaPage.css";

const STAGE_NAV = [
  { id: 1, short: "Stamp 2 (Study)", label: "Student Arrives in Ireland (Stamp 2)" },
  { id: 2, short: "Stamp 1G (PSW)", label: "Post Study Work Visa (Stamp 1G)" },
  { id: 3, short: "Work permit", label: "Secure a Job + Apply for Work Permit" },
  { id: 4, short: "Stamp 1", label: "Get Stamp 1 (Work Visa in Ireland)" },
  { id: 5, short: "Family reunion", label: "Apply for Family Reunification" },
  { id: 6, short: "Processing", label: "Family Visa Processing" },
  { id: 7, short: "After approval", label: "After Approval" },
  { id: 8, short: "Stamp 4 / Citizenship", label: "Long-Term Residence & Citizenship" },
];

function DependentVisaMain() {
  const [activeStage, setActiveStage] = useState(1);

  useEffect(() => {
    const stages = STAGE_NAV.map((s) => document.getElementById(`dv-stage-${s.id}`)).filter(Boolean);
    if (stages.length === 0) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = parseInt(entry.target.id.replace("dv-stage-", ""), 10);
            if (!Number.isNaN(id)) setActiveStage(id);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    stages.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollToStage = (id) => {
    const el = document.getElementById(`dv-stage-${id}`);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <SEO
        title="Ireland Dependent Visa Pathway"
        description="Understand when and how international students can bring their spouse, children, and dependents to Ireland — eligibility, steps, and requirements."
        canonicalPath="/dependent-visa"
      />
      <main className="dv-page">
        <header className="dv-hero">
          <h1 className="dv-title">Ireland Dependent Visa Pathway</h1>
          <p className="dv-subtitle">Reunite with your family while building your future in Ireland</p>
          <p className="dv-desc">
            Understand when and how international students can bring their spouse, children, and dependents to Ireland —
            eligibility, steps, and requirements made simple.
          </p>
          <div className="dv-hero-pills" aria-label="Topics">
            <span className="dv-pill">👨‍👩‍👧 Family Reunification</span>
            <span className="dv-pill">💍 Spouse</span>
            <span className="dv-pill">👶 Children</span>
            <span className="dv-pill">👴 Dependents</span>
          </div>
        </header>

        <section className="dv-process-wrap" aria-labelledby="dv-process-heading">
          <h2 id="dv-process-heading" className="dv-section-title">
            Process Stages
          </h2>

          <div className="dv-process">
            <aside className="dv-sidebar" aria-label="Stage navigation">
              <nav className="dv-sidebar-nav">
                {STAGE_NAV.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    className={`dv-sidebar-link${activeStage === s.id ? " is-active" : ""}`}
                    onClick={() => scrollToStage(s.id)}
                  >
                    <span className="dv-sidebar-num">{s.id}</span>
                    <span className="dv-sidebar-text">
                      <span className="dv-sidebar-short">{s.short}</span>
                      <span className="dv-sidebar-full">{s.label}</span>
                    </span>
                  </button>
                ))}
              </nav>
            </aside>

            <div className="dv-stages">
              {/* STAGE 1 */}
              <article id="dv-stage-1" className="dv-stage">
                <div className="dv-stage-heading">
                  <button
                    type="button"
                    className={`dv-circle${activeStage === 1 ? " is-active" : ""}`}
                    aria-current={activeStage === 1}
                    onClick={() => scrollToStage(1)}
                  >
                    1
                  </button>
                  <h3 className="dv-stage-title">Student Arrives in Ireland (Stamp 2)</h3>
                </div>
                <div className="dv-card">
                  <p className="dv-badge dv-badge--warn">You CANNOT bring dependents at the study stage</p>
                  <p className="dv-lead">
                    Students must complete their degree first. Family reunification starts after you graduate.
                  </p>
                  <div className="dv-two-col">
                    <div className="dv-col dv-col--ok">
                      <h4 className="dv-col-title">YOU CAN DO during study</h4>
                      <ul className="dv-list dv-list--ok">
                        <li>
                          <FaCheck aria-hidden /> Study full-time
                        </li>
                        <li>
                          <FaCheck aria-hidden /> Work 20 hours (term) / 40 hours (holidays)
                        </li>
                        <li>
                          <FaCheck aria-hidden /> Build financial history
                        </li>
                      </ul>
                    </div>
                    <div className="dv-col dv-col--no">
                      <h4 className="dv-col-title">YOU CANNOT DO during study</h4>
                      <ul className="dv-list dv-list--no">
                        <li>
                          <FaTimes aria-hidden /> Invite spouse
                        </li>
                        <li>
                          <FaTimes aria-hidden /> Invite children
                        </li>
                        <li>
                          <FaTimes aria-hidden /> Invite parents
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </article>

              {/* STAGE 2 */}
              <article id="dv-stage-2" className="dv-stage">
                <div className="dv-stage-heading">
                  <button
                    type="button"
                    className={`dv-circle${activeStage === 2 ? " is-active" : ""}`}
                    aria-current={activeStage === 2}
                    onClick={() => scrollToStage(2)}
                  >
                    2
                  </button>
                  <h3 className="dv-stage-title">Post Study Work Visa (Stamp 1G)</h3>
                </div>
                <div className="dv-card">
                  <p className="dv-badge dv-badge--info">After completing the degree, every student receives Stamp 1G</p>
                  <p className="dv-lead">
                    This is the 1–2 year Graduate Stay Back (PSW) period after completing studies.
                  </p>
                  <h4 className="dv-mini-title">What you CAN do on Stamp 1G</h4>
                  <ul className="dv-list dv-list--ok dv-list--inline">
                    <li>
                      <FaCheck aria-hidden /> Work full-time
                    </li>
                    <li>
                      <FaCheck aria-hidden /> Look for a skilled job
                    </li>
                    <li>
                      <FaCheck aria-hidden /> Apply for a work permit
                    </li>
                  </ul>
                  <h4 className="dv-mini-title">Family Reunification on Stamp 1G</h4>
                  <div className="dv-alert dv-alert--danger">
                    <strong>Not allowed —</strong> You still cannot bring spouse/children/parents at Stamp 1G stage.
                  </div>
                  <p className="dv-note">
                    <strong>Purpose:</strong> Allow graduates time to find a work permit job first.
                  </p>
                </div>
              </article>

              {/* STAGE 3 */}
              <article id="dv-stage-3" className="dv-stage">
                <div className="dv-stage-heading">
                  <button
                    type="button"
                    className={`dv-circle${activeStage === 3 ? " is-active" : ""}`}
                    aria-current={activeStage === 3}
                    onClick={() => scrollToStage(3)}
                  >
                    3
                  </button>
                  <h3 className="dv-stage-title">Secure a Job + Apply for Work Permit</h3>
                </div>
                <div className="dv-card">
                  <p className="dv-lead">Once you secure a job offer, you apply for one of two permits.</p>
                  <div className="dv-permit-cards">
                    <div className="dv-permit-card">
                      <h4>Critical Skills Employment Permit (CSEP)</h4>
                      <ul>
                        <li>High-demand jobs</li>
                        <li>Salary: €32,000 – €64,000</li>
                        <li>Best option for fast family reunification</li>
                        <li>Sponsor Category B under 2025 rules</li>
                        <li>Income threshold NOT required for spouse/children</li>
                      </ul>
                    </div>
                    <div className="dv-permit-card">
                      <h4>General Employment Permit (GEP)</h4>
                      <ul>
                        <li>Salary: €30,000+</li>
                        <li>Sponsor Category C</li>
                        <li>Must meet income thresholds for spouse/children</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </article>

              {/* STAGE 4 */}
              <article id="dv-stage-4" className="dv-stage">
                <div className="dv-stage-heading">
                  <button
                    type="button"
                    className={`dv-circle${activeStage === 4 ? " is-active" : ""}`}
                    aria-current={activeStage === 4}
                    onClick={() => scrollToStage(4)}
                  >
                    4
                  </button>
                  <h3 className="dv-stage-title">Get Stamp 1 (Work Visa in Ireland)</h3>
                </div>
                <div className="dv-card">
                  <p className="dv-lead">
                    After approval of your work permit, you register your IRP and get Stamp 1 after work permit
                    approval.
                  </p>
                  <div className="dv-highlight">
                    This is the point where Family Reunification becomes possible ✅
                  </div>
                </div>
              </article>

              {/* STAGE 5 */}
              <article id="dv-stage-5" className="dv-stage">
                <div className="dv-stage-heading">
                  <button
                    type="button"
                    className={`dv-circle${activeStage === 5 ? " is-active" : ""}`}
                    aria-current={activeStage === 5}
                    onClick={() => scrollToStage(5)}
                  >
                    5
                  </button>
                  <h3 className="dv-stage-title">Apply for Family Reunification (Spouse/Children/Parents)</h3>
                </div>
                <div className="dv-card">
                  <p className="dv-lead">Now you can invite dependents based on your permit.</p>

                  <div className="dv-subsection">
                    <h4 className="dv-subsection-title">SUB-SECTION A — If you have CSEP (Category B)</h4>
                    <ul className="dv-bullets">
                      <li>You can apply immediately after receiving Stamp 1</li>
                      <li>Income threshold NOT required for spouse/children</li>
                      <li>Only accommodation + documents required</li>
                    </ul>
                    <p className="dv-tags-label">Allowed dependents</p>
                    <div className="dv-tags">
                      <span className="dv-tag dv-tag--ok">✅ Spouse/partner</span>
                      <span className="dv-tag dv-tag--ok">✅ Children (under 18)</span>
                      <span className="dv-tag dv-tag--ok">
                        ✅ Dependent parents (if financially + medically dependent)
                      </span>
                    </div>
                  </div>

                  <div className="dv-subsection">
                    <h4 className="dv-subsection-title">SUB-SECTION B — If you have GEP (Category C)</h4>
                    <p className="dv-note-strong">Note: You must meet 2025 income requirements</p>
                    <div className="dv-table-wrap">
                      <table className="dv-table">
                        <thead>
                          <tr>
                            <th scope="col">Dependent Type</th>
                            <th scope="col">Income Requirement</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Spouse</td>
                            <td>€30,000 gross income</td>
                          </tr>
                          <tr>
                            <td>1 child</td>
                            <td>€44,300</td>
                          </tr>
                          <tr>
                            <td>2 children</td>
                            <td>€54,200</td>
                          </tr>
                          <tr>
                            <td>Parents</td>
                            <td>€92,789</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <ul className="dv-bullets dv-bullets--notes">
                      <li>Can apply once income + documents are ready</li>
                      <li>Must show strong financial capacity</li>
                    </ul>
                  </div>
                </div>
              </article>

              {/* STAGE 6 */}
              <article id="dv-stage-6" className="dv-stage">
                <div className="dv-stage-heading">
                  <button
                    type="button"
                    className={`dv-circle${activeStage === 6 ? " is-active" : ""}`}
                    aria-current={activeStage === 6}
                    onClick={() => scrollToStage(6)}
                  >
                    6
                  </button>
                  <h3 className="dv-stage-title">Family Visa Processing</h3>
                </div>
                <div className="dv-card">
                  <p className="dv-badge dv-badge--info">Apply as Join Family D-Visa</p>
                  <p className="dv-note-strong">Note: Dependents must apply from outside Ireland.</p>
                  <p className="dv-mini-title">Assessment includes</p>
                  <ul className="dv-icon-list">
                    <li>
                      <FaHeart className="dv-icon-li" aria-hidden /> Genuine relationship
                    </li>
                    <li>
                      <FaWallet className="dv-icon-li" aria-hidden /> Stable income
                    </li>
                    <li>
                      <FaHome className="dv-icon-li" aria-hidden /> Accommodation
                    </li>
                    <li>
                      <FaIdCard className="dv-icon-li" aria-hidden /> Sponsor&apos;s immigration status
                    </li>
                    <li>
                      <FaUserFriends className="dv-icon-li" aria-hidden /> Dependency (parents)
                    </li>
                  </ul>
                </div>
              </article>

              {/* STAGE 7 */}
              <article id="dv-stage-7" className="dv-stage">
                <div className="dv-stage-heading">
                  <button
                    type="button"
                    className={`dv-circle${activeStage === 7 ? " is-active" : ""}`}
                    aria-current={activeStage === 7}
                    onClick={() => scrollToStage(7)}
                  >
                    7
                  </button>
                  <h3 className="dv-stage-title">After Approval</h3>
                </div>
                <div className="dv-card">
                  <p className="dv-badge dv-badge--info">Your family arrives on a D-Visa</p>
                  <p className="dv-lead">After approval, your family arrives and receives:</p>
                  <div className="dv-info-cards">
                    <div className="dv-info-card">
                      <h4>Spouse</h4>
                      <p>→ Stamp 3</p>
                    </div>
                    <div className="dv-info-card">
                      <h4>Children under 16</h4>
                      <p>No stamp required</p>
                    </div>
                    <div className="dv-info-card">
                      <h4>Children 16–18</h4>
                      <p>Stamp 1G (can work)</p>
                    </div>
                  </div>
                </div>
              </article>

              {/* STAGE 8 */}
              <article id="dv-stage-8" className="dv-stage">
                <div className="dv-stage-heading">
                  <button
                    type="button"
                    className={`dv-circle${activeStage === 8 ? " is-active" : ""}`}
                    aria-current={activeStage === 8}
                    onClick={() => scrollToStage(8)}
                  >
                    8
                  </button>
                  <h3 className="dv-stage-title">Long-Term Residence & Citizenship</h3>
                </div>
                <div className="dv-card">
                  <p className="dv-badge dv-badge--muted">After years of legal residence</p>
                  <div className="dv-two-col dv-two-col--stack">
                    <div className="dv-col dv-col--plain">
                      <h4 className="dv-col-title">Column 1 — CSEP holders</h4>
                      <ul className="dv-bullets">
                        <li>Eligible for Stamp 4 after 2 years</li>
                        <li>Fastest track for citizenship</li>
                      </ul>
                    </div>
                    <div className="dv-col dv-col--plain">
                      <h4 className="dv-col-title">Column 2 — GEP holders</h4>
                      <ul className="dv-bullets">
                        <li>Eligible for Stamp 4 after 5 years</li>
                      </ul>
                    </div>
                  </div>
                  <div className="dv-highlight">
                    <strong>After becoming an Irish Citizen</strong>
                    <ul className="dv-bullets dv-bullets--tight">
                      <li>Family gets independent Stamp 4</li>
                      <li>No income requirement</li>
                      <li>No dependence proof</li>
                    </ul>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="dv-timeline-section" aria-labelledby="dv-timeline-heading">
          <h2 id="dv-timeline-heading" className="dv-section-title dv-section-title--center">
            Visual timeline summary
          </h2>
          <div className="dv-flow" role="img" aria-label="Timeline from study to citizenship">
            <span className="dv-flow-node">Stamp 2 (Study)</span>
            <span className="dv-flow-arrow" aria-hidden>
              →
            </span>
            <span className="dv-flow-node">Stamp 1G (PSW)</span>
            <span className="dv-flow-arrow" aria-hidden>
              →
            </span>
            <span className="dv-flow-node">Work Permit</span>
            <span className="dv-flow-arrow" aria-hidden>
              →
            </span>
            <span className="dv-flow-node">Stamp 1</span>
            <span className="dv-flow-arrow" aria-hidden>
              →
            </span>
            <span className="dv-flow-node">Family Reunification</span>
            <span className="dv-flow-arrow" aria-hidden>
              →
            </span>
            <span className="dv-flow-node">D-Visa</span>
            <span className="dv-flow-arrow" aria-hidden>
              →
            </span>
            <span className="dv-flow-node">Stamp 3/1G</span>
            <span className="dv-flow-arrow" aria-hidden>
              →
            </span>
            <span className="dv-flow-node">Stamp 4</span>
            <span className="dv-flow-arrow" aria-hidden>
              →
            </span>
            <span className="dv-flow-node">Citizenship</span>
          </div>
        </section>

        <section className="dv-cta" aria-label="Call to action">
          <p>Are you ready to take the next step toward your future career?</p>
          <a className="dv-cta-btn" href="/#contact">
            Apply Now
          </a>
        </section>
      </main>
    </>
  );
}

export function DependentVisaRouteLayout() {
  return (
    <>
      <LandingHeader />
      <div className="LandingPage why-ireland-hub">
        <DependentVisaMain />
        <Footer />
      </div>
    </>
  );
}

export default DependentVisaMain;
