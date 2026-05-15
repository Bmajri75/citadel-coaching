// src/components/SEO.jsx
import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://mb-coaching.vercel.app';
const DEFAULT_IMAGE = `${SITE_URL}/photos/hero.jpg`;

function SEO({ title, description, canonical, image, type = 'website', structuredData }) {
  const fullTitle = title
    ? `${title} | Citadel Coaching — Coach MMA Paris`
    : 'Coach MMA Paris 17 — Bechir Majri | Muay Thai, BJJ | Citadel Coaching';

  const fullDescription = description ||
    'Coach MMA Paris 17ème certifié BPJEPS Sports de Contact, Purple Belt Gracie Barra, ancien professionnel MMA. Coaching privé 90€/h, 7j/7 Porte Maillot.';

  const fullCanonical = canonical ? `${SITE_URL}${canonical}` : SITE_URL;
  const fullImage = image ? `${SITE_URL}${image}` : DEFAULT_IMAGE;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      <link rel="canonical" href={fullCanonical} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={fullImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={fullImage} />

      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
}

export default SEO;
