// src/components/FAQ.jsx
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

function FAQ() {
  const { t } = useTranslation();
  const [ouvert, setOuvert] = useState(null);
  const items = t('faq.items', { returnObjects: true });

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((q) => ({
      '@type': 'Question',
      name: q.q,
      acceptedAnswer: { '@type': 'Answer', text: q.r },
    })),
  };

  return (
    <section id="faq" className="py-12 md:py-20 bg-gradient-to-b from-black to-secondary">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">

          <div className="text-center mb-8 md:mb-14">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-3">
              {t('faq.title')} <span className="text-primary">{t('faq.title_highlight')}</span>
            </h2>
          </div>

          <div className="space-y-3">
            {items.map((item, i) => (
              <div
                key={i}
                className="bg-secondary/60 border border-primary/20 rounded-xl overflow-hidden hover:border-primary/40 transition-all"
              >
                <button
                  onClick={() => setOuvert(ouvert === i ? null : i)}
                  className="w-full text-left px-5 py-4 flex items-center justify-between gap-4"
                >
                  <span className="text-white font-semibold leading-snug">{item.q}</span>
                  <span className={`text-primary text-xl flex-shrink-0 transition-transform duration-300 ${ouvert === i ? 'rotate-45' : ''}`}>
                    +
                  </span>
                </button>
                {ouvert === i && (
                  <div className="px-5 pb-4">
                    <p className="text-gray-300 leading-relaxed">{item.r}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <a
              href="tel:+33753611477"
              className="inline-block bg-secondary border border-primary/40 hover:border-primary text-white font-semibold px-8 py-4 rounded-lg transition-all"
            >
              {t('faq.phone_cta')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FAQ;
