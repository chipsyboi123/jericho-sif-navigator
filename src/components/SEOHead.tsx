import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
  jsonLd?: Record<string, any>;
  noIndex?: boolean;
}

const SITE_NAME = "Jericho SIF";
const DEFAULT_DESCRIPTION =
  "Compare SIF strategies, track fund performance, and invest through Jericho. India's newest SEBI-regulated asset class.";

const SEOHead = ({
  title,
  description = DEFAULT_DESCRIPTION,
  canonicalUrl,
  jsonLd,
  noIndex = false,
}: SEOHeadProps) => {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} - Navigate India's Newest Asset Class`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  );
};

export default SEOHead;
