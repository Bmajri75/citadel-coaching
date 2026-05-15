// src/components/FAQ.jsx
import { useState } from 'react';

const questions = [
  {
    q: 'Quel est le tarif d\'un cours de MMA à Paris avec Bechir Majri ?',
    r: 'Le coaching privé est à 90€ de l\'heure, toutes disciplines confondues — MMA, Muay Thai ou BJJ (Jiu-Jitsu Brésilien). Un seul tarif, transparent et sans surprise. Le paiement se fait en ligne par carte via Stripe.',
  },
  {
    q: 'Peut-on débuter le MMA sans aucune expérience ?',
    r: 'Absolument. La majorité de mes élèves arrivent sans aucune expérience en sports de combat. Le coaching privé est particulièrement adapté aux débutants : on reprend les bases depuis zéro, à votre rythme, sans la pression d\'un cours collectif.',
  },
  {
    q: 'Où se situent les cours de coaching à Paris ?',
    r: 'Les séances se tiennent au 15 boulevard Gouvion-Saint-Cyr, Paris 17ème, à proximité immédiate de la station Porte Maillot (Ligne 1) et Porte de Champerret (Ligne 3 et T3b).',
  },
  {
    q: 'Quelle est la différence entre MMA, Muay Thai et BJJ ?',
    r: 'Le MMA (Mixed Martial Arts) combine toutes les disciplines — frappe debout et combat au sol. Le Muay Thai est la boxe thaïlandaise, art des 8 membres (poings, pieds, genoux, coudes). Le BJJ (Jiu-Jitsu Brésilien) est la discipline du combat au sol : projections, contrôles de position et soumissions, pratiqué en Gi (kimono) et NoGi. Vous pouvez vous spécialiser dans l\'une ou combiner plusieurs disciplines.',
  },
  {
    q: 'Y a-t-il un engagement ou un abonnement minimum ?',
    r: 'Non. Chaque séance est indépendante, sans engagement de durée. Vous réservez quand vous voulez, autant que vous voulez. C\'est la flexibilité du coaching privé.',
  },
  {
    q: 'Le coaching convient-il pour perdre du poids ?',
    r: 'Oui, les sports de combat sont parmi les méthodes les plus efficaces pour brûler des calories et se muscler simultanément. Une heure de Muay Thai ou de MMA peut brûler entre 600 et 900 kcal. Combiné à des conseils nutritionnels de base, les résultats en perte de poids sont rapides et durables.',
  },
  {
    q: 'Quelles sont vos disponibilités pour réserver ?',
    r: 'Je suis disponible 7 jours sur 7, en matinée de 08h à 10h et l\'après-midi de 14h à 17h. Vous choisissez votre créneau directement lors de la réservation en ligne.',
  },
  {
    q: 'Proposez-vous des cours en ligne ou uniquement en présentiel ?',
    r: 'Les séances de coaching se font en présentiel à Paris 17ème. Pour progresser à distance, je propose des programmes PDF d\'entraînement complets — MMA, Muay Thai, BJJ et Musculation — en téléchargement immédiat à partir de 29€.',
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
    <section id="faq" className="py-20 bg-gradient-to-b from-black to-secondary">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">

          {/* Header */}
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Questions <span className="text-primary">fréquentes</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Tout ce que vous voulez savoir sur le coaching MMA à Paris
            </p>
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
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4"
                >
                  <span className="text-white font-semibold leading-snug">{item.q}</span>
                  <span className={`text-primary text-xl flex-shrink-0 transition-transform duration-300 ${ouvert === i ? 'rotate-45' : ''}`}>
                    +
                  </span>
                </button>
                {ouvert === i && (
                  <div className="px-6 pb-5">
                    <p className="text-gray-300 leading-relaxed">{item.r}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <p className="text-gray-400 mb-4">Une question non listée ?</p>
            <a
              href="tel:+33753611477"
              className="inline-block bg-secondary border border-primary/40 hover:border-primary text-white font-semibold px-8 py-4 rounded-lg transition-all"
            >
              📞 Appelez directement Bechir — +33 7 53 61 14 77
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FAQ;
