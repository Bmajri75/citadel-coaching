// src/components/FAQ.jsx
import { useState } from 'react';

const questions = [
  {
    q: 'Quel est le tarif ?',
    r: '90€ / heure, toutes disciplines — MMA, Muay Thai ou BJJ. Un seul tarif, paiement sécurisé en ligne par Stripe.',
  },
  {
    q: 'Peut-on débuter sans expérience ?',
    r: 'Oui. La majorité de mes élèves arrivent sans aucune base. On reprend depuis zéro, à votre rythme.',
  },
  {
    q: 'Où se situent les cours ?',
    r: '15 bd Gouvion-Saint-Cyr, Paris 17ème — Porte Maillot (Ligne 1) ou Porte de Champerret (Ligne 3 / T3b).',
  },
  {
    q: 'Y a-t-il un engagement ?',
    r: 'Non. Chaque séance est indépendante. Vous réservez quand vous voulez, sans abonnement.',
  },
];

function FAQ() {
  const [ouvert, setOuvert] = useState(null);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((q) => ({
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

          {/* Header */}
          <div className="text-center mb-8 md:mb-14">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-3">
              Questions <span className="text-primary">fréquentes</span>
            </h2>
          </div>

          {/* Accordéon */}
          <div className="space-y-3">
            {questions.map((item, i) => (
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

          {/* CTA */}
          <div className="mt-8 text-center">
            <a
              href="tel:+33753611477"
              className="inline-block bg-secondary border border-primary/40 hover:border-primary text-white font-semibold px-8 py-4 rounded-lg transition-all"
            >
              📞 +33 7 53 61 14 77
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FAQ;
