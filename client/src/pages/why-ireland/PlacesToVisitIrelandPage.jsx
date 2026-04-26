import React from "react";
import { Link } from "react-router-dom";
import SEO from "../../components/SEO";
import WhyIrelandBentoHero from "../../components/WhyIrelandBentoHero";
import "./PlacesToVisitIrelandPage.css";

const HERO_SUBTITLE =
  "Here's our guide to the places that will make your educational trip to Ireland one to remember, for a long time.";

/** Stable placeholder images via picsum.photos (unique seed per place) */
const imgSrc = (seed) => `https://picsum.photos/seed/${seed}/800/600`;

const PLACES = [
  { seed: "ie-moher", caption: "A tourism must-see in southern Ireland: the Cliffs of Moher" },
  { seed: "ie-kilmainham", caption: "Prison cells at Kilmainham Gaol in Dublin" },
  { seed: "ie-wildatlantic", caption: "Driving the Wild Atlantic Way between Kenmare and Killarney, County Kerry" },
  { seed: "ie-belfast", caption: "Republican Mural featuring hunger striker Bobby Sands on the Falls Road, Belfast" },
  { seed: "ie-carrick", caption: "Do you dare cross the Carrick-a-Rede rope bridge hanging 30m above rocks and spanning 20m" },
  { seed: "ie-inisheer", caption: "Inisheer (Inis Oírr in Irish), the smallest of the Aran Islands" },
  { seed: "ie-galway-music", caption: "Local street musicians playing Gaelic music on Galway streets" },
  { seed: "ie-beannachan", caption: "The Beannachan — 8th century stone oratory built over the burial site of St. Declan" },
  { seed: "ie-cashel", caption: "The Rock of Cashel, a historical site in County Tipperary" },
  { seed: "ie-adare", caption: "Traditional cottage house in Adare, County Limerick" },
  { seed: "ie-cork-market", caption: "The English Market in Cork City has been open since 1788" },
  { seed: "ie-glendalough", caption: "The round tower at the Glendalough monastic site in County Wicklow" },
  { seed: "ie-garinish", caption: "The walled garden on Garinish Island in Glengarriff Bay, West Cork" },
  { seed: "ie-sheepshead", caption: "View from Sheep's Head Way towards Bantry Bay" },
  { seed: "ie-mountst", caption: "Georgian Mount Street in Dublin" },
  { seed: "ie-phoenix", caption: "Phoenix Park" },
  { seed: "ie-benbulben", caption: "Benbulben mountain — a large rock formation in County Sligo" },
  { seed: "ie-giants", caption: "The Giant's Causeway: Northern Ireland's only UNESCO World Heritage site" },
];

export default function PlacesToVisitIrelandPage() {
  return (
    <>
      <SEO
        title="Places to Visit in Ireland"
        description="A visual guide to iconic places across Ireland — cliffs, cities, islands, and UNESCO sites for students exploring the country."
        canonicalPath="/why-ireland/places-to-visit"
      />
      <main className="pv-page">
        <WhyIrelandBentoHero
          title="Places to Visit in Ireland"
          subtitle={HERO_SUBTITLE}
          quickFacts={[
            { label: "Best for", value: "Weekend trips" },
            { label: "Style", value: "Nature + history" },
            { label: "Tip", value: "Student travel deals" },
          ]}
        />

        <section className="pv-grid" aria-label="Photo gallery of places in Ireland">
          {PLACES.map((place, i) => (
            <figure key={place.seed} className="pv-card">
              <div className="pv-card__media">
                <img
                  className="pv-card__img"
                  src={imgSrc(place.seed)}
                  alt={place.caption}
                  loading={i < 6 ? "eager" : "lazy"}
                  decoding="async"
                  width={800}
                  height={600}
                />
              </div>
              <figcaption className="pv-card__caption">{place.caption}</figcaption>
            </figure>
          ))}
        </section>

        <section className="pv-cta" aria-label="Apply">
          <p className="pv-cta__text">Are you ready to take the next step toward your future career?</p>
          <Link to="/#contact" className="pv-cta__btn">
            Apply Now
          </Link>
        </section>
      </main>
    </>
  );
}
