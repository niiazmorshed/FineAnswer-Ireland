import React from "react";
import WhyIrelandPageShell from "./WhyIrelandPageShell";

export default function StudentLifeIrelandPage() {
  return (
    <WhyIrelandPageShell
      seoTitle="Student Life in Ireland"
      seoDescription="What day-to-day life can look like for international students in Ireland—housing, transport, community, and wellbeing."
      canonicalPath="/why-ireland/student-life"
      heading="Student life"
      lede="Moving abroad is as much about daily life as it is about lectures. Ireland’s cities are compact, multicultural, and set up for students."
    >
      <section className="why-article__section">
        <h2 className="why-article__h2">Settling in</h2>
        <p className="why-article__p">
          Universities run orientation weeks, peer mentoring, and international offices to help with documents, banking basics, and campus systems.
        </p>
        <p className="why-article__p">
          Most students share accommodation or use purpose-built student housing; start your search early for the best choice near your campus or transport links.
        </p>
      </section>
      <section className="why-article__section">
        <h2 className="why-article__h2">Getting around</h2>
        <p className="why-article__p">
          Public transport cards and student fares make commuting affordable. Cycling is common in Dublin, Cork, Galway, and Limerick where infrastructure is improving year on year.
        </p>
      </section>
      <section className="why-article__section">
        <h2 className="why-article__h2">Community & wellbeing</h2>
        <p className="why-article__p">
          Societies, clubs, and volunteering are the fastest way to meet people. If homesickness hits, on-campus counselling and GP registration are straightforward once you know the steps.
        </p>
      </section>
    </WhyIrelandPageShell>
  );
}
