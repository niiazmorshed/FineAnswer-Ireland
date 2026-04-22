import React from "react";
import SEO from "../../components/SEO";

/**
 * Shared article chrome for /why-ireland/* pages (structure + SEO only).
 * Each route is a separate .jsx file that composes this shell with its own content.
 */
export default function WhyIrelandPageShell({
  seoTitle,
  seoDescription,
  canonicalPath,
  heading,
  lede,
  children,
}) {
  return (
    <>
      <SEO title={seoTitle} description={seoDescription} canonicalPath={canonicalPath} />
      <main className="why-article">
        <header className="why-article__hero">
          <h1 className="why-article__title">{heading}</h1>
          <p className="why-article__lede">{lede}</p>
        </header>
        <div className="why-article__body">{children}</div>
      </main>
    </>
  );
}
