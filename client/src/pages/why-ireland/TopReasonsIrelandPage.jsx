import React from "react";
import { Link } from "react-router-dom";
import SEO from "../../components/SEO";
import WhyIrelandBentoHero from "../../components/WhyIrelandBentoHero";
import "./TopReasonsIrelandPage.css";

const SUBTITLE =
  "Ireland is an island nation on the westernmost edge of Europe, known for world-class education, strong graduate outcomes, and an excellent quality of life. From internationally respected universities to a vibrant innovation ecosystem, Ireland offers a study experience that combines academic depth with real-world relevance. Students benefit from an English-speaking environment, diverse communities, and access to global industries that make it easier to build a career after graduation.";

const COURSE_CHIPS = [
  "Business Analytics",
  "Investment Banking & Finance",
  "Big Data / Data Science",
  "Pharmaceutical Sciences",
  "Construction",
  "Computing",
  "Cybersecurity",
  "Business Studies",
];

export default function TopReasonsIrelandPage() {
  return (
    <>
      <SEO
        title="Top Reasons to Study in Ireland"
        description="Courses, multinationals, enterprise support, part-time work, cost of living, English-medium study, QQI quality, and Irish hospitality—why students choose Ireland."
        canonicalPath="/why-ireland/top-reasons"
      />
      <main className="tr-top">
        <WhyIrelandBentoHero
          title="Top Reasons to Study in Ireland"
          subtitle={SUBTITLE}
          quickFacts={[
            { label: "Programs", value: "5,000+" },
            { label: "Multinationals", value: "1,000+" },
            { label: "Min wage", value: "€13.50/hr" },
          ]}
        />

        <section className="tr-top__card" aria-labelledby="tr-reason-1">
          <h2 id="tr-reason-1" className="tr-top__card-title">
            Wide Range of Courses Leading to Employability
          </h2>
          <p className="tr-top__p">
            Ireland offers over 5,000 programs. Students choose from medicine, engineering, business, science, technology, literature, history, philosophy, psychology and more.
          </p>
          <p className="tr-top__chips-label">Most Popular Courses</p>
          <div className="tr-top__chips" role="list">
            {COURSE_CHIPS.map((label) => (
              <span key={label} className="tr-top__chip" role="listitem">
                {label}
              </span>
            ))}
          </div>
        </section>

        <section className="tr-top__card" aria-labelledby="tr-reason-2">
          <h2 id="tr-reason-2" className="tr-top__card-title">
            Home to 1,000+ Multinational Companies
          </h2>
          <div className="tr-top__stat-block">
            <span className="tr-top__stat-num">1000+</span>
            <span className="tr-top__stat-label">Leading Multinational Companies</span>
          </div>
          <p className="tr-top__p">
            Ireland is the European hub for 1,000+ world-leading multinationals. One third have operated in Ireland for over 20 years. Companies requiring skilled, educated workforces choose Ireland.
          </p>
        </section>

        <section className="tr-top__card" aria-labelledby="tr-reason-3">
          <h2 id="tr-reason-3" className="tr-top__card-title">
            Opportunity to Start Your Own Business
          </h2>
          <p className="tr-top__p">
            Enterprise Ireland offers comprehensive support to set up and grow your business in Ireland and on global markets.
          </p>
        </section>

        <section className="tr-top__card" aria-labelledby="tr-reason-4">
          <h2 id="tr-reason-4" className="tr-top__card-title">
            Part-Time Job While You Study
          </h2>
          <p className="tr-top__p">
            International students in full-time study (min. 1 year) do not need a work permit to work in Ireland.
          </p>
          <p className="tr-top__highlight">Ireland&apos;s minimum wage is €13.50 per hour</p>
        </section>

        <section className="tr-top__card" aria-labelledby="tr-reason-5">
          <h2 id="tr-reason-5" className="tr-top__card-title">
            Low Cost of Living
          </h2>
          <p className="tr-top__p">
            On average, a student spends between €10,000 and €20,000 per year, depending on location, accommodation type, and lifestyle.
          </p>
        </section>

        <section className="tr-top__card" aria-labelledby="tr-reason-6">
          <h2 id="tr-reason-6" className="tr-top__card-title">
            Only English-Speaking Country in the Eurozone
          </h2>
          <p className="tr-top__p">
            Most courses are offered in English. Ireland has a rich English literary tradition and is the only English-speaking country in the Eurozone.
          </p>
        </section>

        <section className="tr-top__card" aria-labelledby="tr-reason-7">
          <h2 id="tr-reason-7" className="tr-top__card-title">
            Internationally Renowned Education
          </h2>
          <p className="tr-top__p">
            Irish education quality is maintained by the QQI body. All Irish Universities rank in the top 3% of institutions worldwide, with many research fields in the top 1% globally. Over 32,000 international students study in Ireland.
          </p>
        </section>

        <section className="tr-top__card" aria-labelledby="tr-hospitality">
          <h2 id="tr-hospitality" className="tr-top__card-title">
            Irish Hospitality — The Friendliest Country
          </h2>
          <ul className="tr-top__numbered">
            <li className="tr-top__numbered-item">
              <span className="tr-top__numbered-index">01</span>
              <p className="tr-top__numbered-text">Ireland ranked 3rd most peaceful country in the world</p>
            </li>
            <li className="tr-top__numbered-item">
              <span className="tr-top__numbered-index">02</span>
              <p className="tr-top__numbered-text">Named in top 10 by Global Peace Index (GPI) 2022</p>
            </li>
            <li className="tr-top__numbered-item">
              <span className="tr-top__numbered-index">03</span>
              <p className="tr-top__numbered-text">
                Ranked 13th happiest country in the world (UN-sponsored index), ahead of USA and UK
              </p>
            </li>
          </ul>
        </section>

        <section className="tr-top__cta" aria-label="Apply">
          <p className="tr-top__cta-text">Are you ready to take the next step toward your future career?</p>
          <Link to="/#contact" className="tr-top__cta-btn">
            Apply Now
          </Link>
        </section>
      </main>
    </>
  );
}
