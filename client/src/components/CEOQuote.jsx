import React from "react";
import "./CEOQuote.css";
import ceoImage from "../images/arif.jpg";

export default function CEOQuote() {
  return (
    <section className="ceoQuote" aria-label="Message from the Founder">
      <div className="ceoQuote__card">
        <div className="ceoQuote__decor" aria-hidden="true" />

        <header className="ceoQuote__header">
          <div className="ceoQuote__avatar" aria-hidden="true">
            <img src={ceoImage} alt="Arif Bhuiyan" loading="lazy" />
          </div>

          <div className="ceoQuote__headerText">
            <p className="ceoQuote__eyebrow">A note from our Founder</p>
            <h2 className="ceoQuote__title">Why FineAnswer exists</h2>
          </div>
        </header>

        <div className="ceoQuote__body">
          <div className="ceoQuote__quoteIcon" aria-hidden="true">
            &ldquo;
          </div>

          <blockquote className="ceoQuote__quote">
            <p>
              FineAnswer is a one-stop global education service provider,
              dedicated to deliver the most accurate, meaningful, and trustworthy
              information to students worldwide.
            </p>
            <p>
              Since our inception, we have established ourselves as the number 1
              study abroad platform for Ireland from Bangladesh, and have
              successfully expanded our services to other countries as well.
            </p>
            <p>
              Backed by an experienced and passionate team, we offer
              comprehensive support beyond just admission and visa processing.
              From the initial consultation to post-arrival assistance, we are
              committed to guiding students through every step of their
              international education journey.
            </p>
            <p>
              We are proud to hold the highest visa success rate from
              Bangladesh, and many of our students have gone on to secure
              professional employment and launch successful international
              careers in Ireland and beyond.
            </p>
            <p>
              If you are interested in studying abroad, please speak to our team
              and you will feel the difference in sha Allah.
            </p>
          </blockquote>
        </div>

        <footer className="ceoQuote__footer">
          <div className="ceoQuote__signature">
            <p className="ceoQuote__name">Arif Bhuiyan (FCA, ACA, MBA, MSc)</p>
            <p className="ceoQuote__role">
              Finance Manager - US Big Tech Multinational; Ex-Apple, Meta, Bank
              of Ireland, Citi, Deloitte; Former Part-Time Faculty - Trinity
              College Dublin. Founder, FineAnswer
            </p>
          </div>
        </footer>
      </div>
    </section>
  );
}


