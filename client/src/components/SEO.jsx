import React from "react";
import { Helmet } from "react-helmet-async";

const DEFAULT_SITE_NAME = "FineAnswer Ireland";
const DEFAULT_URL = "https://www.fineanswer.net/";
const DEFAULT_IMAGE = "https://www.fineanswer.net/logo.svg";

export default function SEO({
  title,
  description,
  canonicalPath = "/",
  image = DEFAULT_IMAGE,
  noindex = false,
  jsonLd,
}) {
  const fullTitle = title ? `${title} | ${DEFAULT_SITE_NAME}` : DEFAULT_SITE_NAME;
  const canonicalUrl = new URL(canonicalPath, DEFAULT_URL).toString();

  return (
    <Helmet>
      <title>{fullTitle}</title>
      {description ? <meta name="description" content={description} /> : null}
      <link rel="canonical" href={canonicalUrl} />
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow"} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={DEFAULT_SITE_NAME} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      {description ? <meta property="og:description" content={description} /> : null}
      <meta property="og:image" content={image} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      {description ? <meta name="twitter:description" content={description} /> : null}
      <meta name="twitter:image" content={image} />

      {jsonLd ? (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      ) : null}
    </Helmet>
  );
}

