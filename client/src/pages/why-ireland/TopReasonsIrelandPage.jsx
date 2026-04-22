import React from "react";
import WhyIrelandPageShell from "./WhyIrelandPageShell";

export default function TopReasonsIrelandPage() {
  return (
    <WhyIrelandPageShell
      seoTitle="Top Reasons to Study in Ireland"
      seoDescription="Practical reasons students choose Ireland: employability, English language, post-study pathways, culture, and value."
      canonicalPath="/why-ireland/top-reasons"
      heading="Top reasons to study in Ireland"
      lede="Every student weighs different factors. Here are the reasons Ireland consistently appears on shortlists for international applicants."
    >
      <section className="why-article__section">
        <h2 className="why-article__h2">Employability & sectors</h2>
        <p className="why-article__p">
          Ireland hosts many global headquarters and scaling firms. That concentration supports internships, graduate programmes, and networking—particularly in technology and life sciences.
        </p>
      </section>
      <section className="why-article__section">
        <h2 className="why-article__h2">Language & mobility</h2>
        <p className="why-article__p">
          Studying in English removes a second-language barrier for many applicants while keeping access to the broader European education and travel space.
        </p>
        <p className="why-article__p">
          Qualifications are widely understood by employers in Ireland, the UK, and further afield when presented with clear transcripts and credential evaluation where needed.
        </p>
      </section>
      <section className="why-article__section">
        <h2 className="why-article__h2">Experience of place</h2>
        <p className="why-article__p">
          From literature and music to sport and festivals, Irish cities balance history with a young, international population—so it is easy to build a social circle while you study.
        </p>
      </section>
    </WhyIrelandPageShell>
  );
}
