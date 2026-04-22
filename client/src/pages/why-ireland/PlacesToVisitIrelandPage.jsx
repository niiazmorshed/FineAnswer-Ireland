import React from "react";
import WhyIrelandPageShell from "./WhyIrelandPageShell";

export default function PlacesToVisitIrelandPage() {
  return (
    <WhyIrelandPageShell
      seoTitle="Places to Visit in Ireland"
      seoDescription="Highlights for students exploring Ireland outside study hours—coasts, cities, and cultural landmarks."
      canonicalPath="/why-ireland/places-to-visit"
      heading="Places to visit"
      lede="Weekends and breaks are a chance to see why Ireland is famous for landscapes and hospitality. Start with easy trips from your base city."
    >
      <section className="why-article__section">
        <h2 className="why-article__h2">Dublin & surrounds</h2>
        <p className="why-article__p">
          Museums, Georgian architecture, and coastal villages like Howth are a short hop from the city centre—perfect for a Saturday without a long journey.
        </p>
      </section>
      <section className="why-article__section">
        <h2 className="why-article__h2">West & Atlantic coast</h2>
        <p className="why-article__p">
          Galway’s arts scene and the Cliffs of Moher are classic road-trip territory. Allow time for weather changes and book transport in advance during peak season.
        </p>
      </section>
      <section className="why-article__section">
        <h2 className="why-article__h2">South & historic towns</h2>
        <p className="why-article__p">
          Cork and smaller towns such as Kilkenny blend food culture with medieval streets. Ireland’s rail network connects many hubs if you prefer not to drive.
        </p>
      </section>
    </WhyIrelandPageShell>
  );
}
