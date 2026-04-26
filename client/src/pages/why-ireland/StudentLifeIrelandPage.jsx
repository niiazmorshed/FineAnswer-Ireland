import React from "react";
import { Link } from "react-router-dom";
import { FaGraduationCap, FaShieldAlt, FaLandmark } from "react-icons/fa";
import SEO from "../../components/SEO";
import WhyIrelandBentoHero from "../../components/WhyIrelandBentoHero";
import "./StudentLifeIrelandPage.css";

const SUBTITLE =
  "Studying in Ireland offers more than just world-class education; it’s an opportunity to immerse yourself in a rich culture, explore breathtaking landscapes, and create lifelong memories. From lively student societies and sports to music, festivals, and weekend trips across the country, there’s always something to experience. As an international student, you’ll find Ireland welcoming and easy to settle into, with strong campus support and communities that help you feel at home from day one.";

export default function StudentLifeIrelandPage() {
  return (
    <>
      <SEO
        title="Student Life in Ireland"
        description="Campus life, culture, travel, social connections, and practical tips for international students in Ireland."
        canonicalPath="/why-ireland/student-life"
      />
      <main className="sl-life">
        <WhyIrelandBentoHero
          title="Academic excellence, vibrant culture"
          subtitle={SUBTITLE}
          quickFacts={[
            { label: "Student countries", value: "160+" },
            { label: "Campus support", value: "Strong services" },
            { label: "Travel", value: "Easy Europe trips" },
          ]}
        />

        <section className="sl-life__why" aria-labelledby="sl-why-heading">
          <h2 id="sl-why-heading" className="sl-life__section-title">
            Why Ireland?
          </h2>
          <div className="sl-life__cards">
            <article className="sl-life__card">
              <div className="sl-life__card-icon" aria-hidden>
                <FaGraduationCap />
              </div>
              <h3 className="sl-life__card-title">Top-Quality Education</h3>
              <p className="sl-life__card-text">
                Ireland is renowned for its excellent educational institutions globally recognized. From cutting-edge research to innovative teaching, Irish universities prepare you for a successful career anywhere in the world.
              </p>
            </article>
            <article className="sl-life__card">
              <div className="sl-life__card-icon sl-life__card-icon--safe" aria-hidden>
                <FaShieldAlt />
              </div>
              <h3 className="sl-life__card-title">Safe and Friendly Environment</h3>
              <p className="sl-life__card-text">
                Ranked as one of the safest countries in the world, Ireland is known for its warm hospitality. The Irish people are friendly and welcoming, making it easier for international students to adapt and thrive.
              </p>
            </article>
            <article className="sl-life__card">
              <div className="sl-life__card-icon sl-life__card-icon--culture" aria-hidden>
                <FaLandmark />
              </div>
              <h3 className="sl-life__card-title">Rich Cultural Heritage</h3>
              <p className="sl-life__card-text">
                Ireland boasts a deep cultural history, from ancient castles and green landscapes to its vibrant music and arts scene. Students have countless opportunities to explore through festivals, events, and cultural activities.
              </p>
            </article>
          </div>
        </section>

        <div className="sl-life__stats" role="group" aria-label="Campus highlights">
          <div className="sl-life__stat">
            <span className="sl-life__stat-num">20+</span>
            <span className="sl-life__stat-label">Student organizations and clubs on campus</span>
          </div>
          <div className="sl-life__stat">
            <span className="sl-life__stat-num">80+</span>
            <span className="sl-life__stat-label">Public programs every year</span>
          </div>
          <div className="sl-life__stat">
            <span className="sl-life__stat-num">2,000</span>
            <span className="sl-life__stat-label">Students living in on-campus housing</span>
          </div>
        </div>

        <section className="sl-life__section" aria-labelledby="sl-campus-heading">
          <h2 id="sl-campus-heading" className="sl-life__section-title">
            Life on Campus
          </h2>
          <ul className="sl-life__bullets">
            <li className="sl-life__bullet">
              <strong>A Welcoming Community:</strong> Irish campuses have close-knit communities with a wide range of student organizations, clubs, and societies — from sports and arts to technology and entrepreneurship.
            </li>
            <li className="sl-life__bullet">
              <strong>Student Support Services:</strong> Irish institutions offer comprehensive support including academic assistance, career advice, and personal counseling.
            </li>
            <li className="sl-life__bullet">
              <strong>State-of-the-Art Facilities:</strong> Modern libraries, labs, and sports complexes designed to enhance learning and support personal growth.
            </li>
          </ul>
        </section>

        <section className="sl-life__section" aria-labelledby="sl-explore-heading">
          <h2 id="sl-explore-heading" className="sl-life__section-title">
            Exploring Ireland Beyond the Classroom
          </h2>
          <ul className="sl-life__bullets">
            <li className="sl-life__bullet">
              <strong>Stunning Landscapes:</strong> From the Cliffs of Moher and Giant&apos;s Causeway to serene lakes and rolling hills. Universities offer hiking, kayaking, and field trips.
            </li>
            <li className="sl-life__bullet">
              <strong>Vibrant Cities:</strong> Dublin, Cork, Galway, and Limerick offer historic charm and modern living — lively pubs, trendy cafes, and diverse culinary scenes.
            </li>
            <li className="sl-life__bullet">
              <strong>Work and Study Balance:</strong> International students can work part-time during studies. Ireland&apos;s booming tech and business industries provide excellent internship and employment opportunities.
            </li>
          </ul>
        </section>

        <section className="sl-life__section" aria-labelledby="sl-social-heading">
          <h2 id="sl-social-heading" className="sl-life__section-title">
            Social Life and Making Connections
          </h2>
          <ul className="sl-life__bullets">
            <li className="sl-life__bullet">
              <strong>Meet People from Around the World:</strong> Ireland hosts students from over 160 countries, enriching your social experience and broadening your global perspective.
            </li>
            <li className="sl-life__bullet">
              <strong>Festivals and Events:</strong> St. Patrick&apos;s Day parade, music festivals, and local cultural events — Ireland&apos;s social calendar is always full.
            </li>
            <li className="sl-life__bullet">
              <strong>Travel and Explore Europe:</strong> Ireland&apos;s location makes European travel easy. Affordable flights to France, Spain, UK and more — just a short flight away.
            </li>
          </ul>
        </section>

        <section className="sl-life__section" aria-labelledby="sl-practical-heading">
          <h2 id="sl-practical-heading" className="sl-life__section-title">
            Practical Information
          </h2>
          <ul className="sl-life__bullets">
            <li className="sl-life__bullet">
              <strong>Accommodation:</strong> On-campus housing to private rentals to suit every budget. Many universities assist in finding suitable housing.
            </li>
            <li className="sl-life__bullet">
              <strong>Healthcare:</strong> High-quality healthcare system with access to university health centers and local clinics. Health insurance is important during your stay.
            </li>
            <li className="sl-life__bullet">
              <strong>Transport:</strong> Efficient public transport — buses, trains, and bicycles. Discounted travel passes available for students.
            </li>
          </ul>
        </section>

        <section className="sl-life__banner" aria-labelledby="sl-adventure-heading">
          <div className="sl-life__banner-inner">
            <h2 id="sl-adventure-heading" className="sl-life__banner-title">
              Start Your Irish Adventure Today
            </h2>
            <p className="sl-life__banner-text">
              Living in Ireland as a student is a unique experience that blends academic rigor with cultural richness. It&apos;s not just about earning a degree; it&apos;s about growing as a person, making lifelong friends, and exploring a country filled with history, beauty, and innovation.
            </p>
          </div>
        </section>

        <section className="sl-life__cta" aria-label="Apply">
          <p className="sl-life__cta-text">Are you ready to take the next step toward your future career?</p>
          <Link to="/#contact" className="sl-life__cta-btn">
            Apply Now
          </Link>
        </section>
      </main>
    </>
  );
}
