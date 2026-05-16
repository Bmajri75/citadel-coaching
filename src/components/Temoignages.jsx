// src/components/Temoignages.jsx
import { useTranslation } from 'react-i18next';

function Etoiles({ n }) {
  return <span className="text-accent text-lg">{'★'.repeat(n)}</span>;
}

function Temoignages() {
  const { t } = useTranslation();
  const avis = t('temoignages.avis', { returnObjects: true });

  const schemaReviews = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Citadel Coaching',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: String(avis.length),
      bestRating: '5',
    },
    review: avis.map((a) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: a.nom },
      reviewRating: { '@type': 'Rating', ratingValue: 5, bestRating: 5 },
      reviewBody: a.texte,
    })),
  };

  return (
    <section id="temoignages" className="py-12 md:py-20 bg-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaReviews) }}
      />

      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 md:mb-14">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            {t('temoignages.title')} <span className="text-primary">{t('temoignages.title_highlight')}</span>
          </h2>
          <div className="flex items-center justify-center gap-3">
            <span className="text-accent text-2xl">★★★★★</span>
            <span className="text-white font-bold text-xl">5.0 / 5</span>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 md:gap-6 max-w-5xl mx-auto">
          {avis.map((a, i) => (
            <div key={i} className="bg-secondary/50 border border-primary/20 rounded-2xl p-5 hover:border-primary/40 transition-all">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-xl">
                    {a.emoji}
                  </div>
                  <div>
                    <p className="text-white font-bold">{a.nom}</p>
                    <p className="text-gray-400 text-sm">{a.detail}</p>
                  </div>
                </div>
                <Etoiles n={5} />
              </div>
              <p className="text-gray-300 text-sm leading-relaxed italic">"{a.texte}"</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-8 md:mt-12">
          <a
            href="#reservation"
            className="inline-block bg-primary hover:bg-red-700 text-white font-bold px-8 py-4 rounded-lg transition-all transform hover:scale-105"
          >
            {t('temoignages.cta')}
          </a>
        </div>
      </div>
    </section>
  );
}

export default Temoignages;
