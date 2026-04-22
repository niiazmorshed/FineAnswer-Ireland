import React from "react";
import { Navigate } from "react-router-dom";
import SEO from "../../components/SEO";
import { WHY_IRELAND_PAGES } from "./pageContent";

export default function WhyArticle({ pageKey }) {
  const data = WHY_IRELAND_PAGES[pageKey];
  if (!data) return <Navigate to="/why-ireland/study-in-ireland" replace />;

  return (
    <>
      <SEO title={data.seoTitle} description={data.seoDescription} canonicalPath={data.canonicalPath} />
      <main className="why-article">
        <header className="why-article__hero">
          <h1 className="why-article__title">{data.heading}</h1>
          <p className="why-article__lede">{data.lede}</p>
        </header>
        <div className="why-article__body">
          {data.sections.map((sec) => (
            <section key={sec.h2} className="why-article__section">
              <h2 className="why-article__h2">{sec.h2}</h2>
              {sec.paragraphs.map((p, i) => (
                <p key={`${sec.h2}-${i}`} className="why-article__p">
                  {p}
                </p>
              ))}
            </section>
          ))}
        </div>
      </main>
    </>
  );
}
