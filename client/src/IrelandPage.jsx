import React from "react";

import "./ireland.css";

import LandingHeader from "./components/LandingHeader";

import BentoHero from "./components/BentoHero";



export default function IrelandPage() {

  return (

    <>
    <LandingHeader />
    <div className="ireland-page">

      <BentoHero

        showBackLink

        ariaLabel="Study in Ireland"

        title="Drive Stronger Offers and Hit Your Deadlines With Expert Guidance"

        subtitle="Get more out of your Ireland plan by empowering every step—from shortlisting to visa—with structured support from specialist counsellors."

        ctaLabel="Request early access"

        ctaTo="#keypoints"

        showHeroSearch={false}
      />



      {/* KEY POINTS SECTION */}

      <section className="keypoints" id="keypoints">

        <h2>Key Points</h2>

        <div className="points-grid">

          <div className="point"><strong>IELTS:</strong> 6.0 – 6.5</div>

          <div className="point"><strong>Intakes:</strong> Jan, Sept</div>

          <div className="point"><strong>Tuition Fees:</strong> 14-17 Lac</div>

          <div className="point"><strong>MOI:</strong> Accepted (Some Universities)</div>

          <div className="point"><strong>Language:</strong> English</div>

        </div>

        <button className="apply-btn">Apply for Next Intake</button>

      </section>



      {/* STUDY IN IRELAND DETAILS */}

      <section className="study-details">

        <h2>Study in Ireland</h2>

        <p>

          Ireland is home to some of the world’s top universities and is a global

          hub for technology, pharmaceuticals, finance, and research. The country

          offers high-quality education with excellent post-study career prospects.

        </p>



        <h3>Reasons to Study in Ireland</h3>

        <ul>

          <li>Globally recognized universities with strong academic reputation.</li>

          <li>Home to top multinational companies like Google, Apple, Meta, and Pfizer.</li>

          <li>Strong focus on research, innovation, and industry collaboration.</li>

          <li>Post-study work opportunities for international graduates.</li>

          <li>Safe, friendly, and English-speaking country.</li>

          <li>Shorter degree durations compared to many other countries.</li>

        </ul>



        <h3>Ability to Work</h3>

        <p>

          International students in Ireland are allowed to work

          <b> 20 hours per week</b> during term time and

          <b> 40 hours per week</b> during holidays.

        </p>



        <h3>Post-Study Work Rights</h3>

        <p>

          Ireland offers a post-study stay-back option of up to

          <b> 2 years</b> for master’s graduates under the Third Level Graduate Scheme,

          allowing students to gain valuable international work experience.

        </p>

      </section>

    </div>
    </>

  );

}

