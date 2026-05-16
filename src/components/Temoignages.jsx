// src/components/Temoignages.jsx

const avis = [
  {
    nom: 'Kévin M.',
    age: '28 ans',
    niveau: 'Débutant MMA',
    note: 5,
    texte: "Zéro expérience au départ. En 3 mois j'ai les bases du MMA — garde, enchaînements, sol. Le coaching privé, c'est une autre dimension.",
    emoji: '🥊',
  },
  {
    nom: 'Sandrine L.',
    age: '34 ans',
    niveau: 'Perte de poids',
    note: 5,
    texte: "9 kg perdus en 4 mois. Les séances sont intenses, fun, et je n'ai jamais regardé l'heure.",
    emoji: '🔥',
  },
  {
    nom: 'Yassine B.',
    age: '22 ans',
    niveau: 'Compétiteur MMA',
    note: 5,
    texte: "Bechir a restructuré mon grappling avant ma compétition. Victoire par soumission au 2ème round.",
    emoji: '🏆',
  },
  {
    nom: 'Thomas R.',
    age: '41 ans',
    niveau: 'Remise en forme',
    note: 5,
    texte: "Muay Thai parfait pour se défouler après le travail. Intensité, technique, adapté à mon niveau.",
    emoji: '🇹🇭',
  },
];

function Etoiles({ n }) {
  return <span className="text-accent text-lg">{'★'.repeat(n)}</span>;
}

function Temoignages() {
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
      reviewRating: { '@type': 'Rating', ratingValue: a.note, bestRating: 5 },
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
        {/* Header */}
        <div className="text-center mb-8 md:mb-14">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Ce que disent <span className="text-primary">mes élèves</span>
          </h2>
          <div className="flex items-center justify-center gap-3">
            <span className="text-accent text-2xl">★★★★★</span>
            <span className="text-white font-bold text-xl">5.0 / 5</span>
          </div>
        </div>

        {/* Grille */}
        <div className="grid sm:grid-cols-2 gap-4 md:gap-6 max-w-5xl mx-auto">
          {avis.map((a, i) => (
            <div
              key={i}
              className="bg-secondary/50 border border-primary/20 rounded-2xl p-5 hover:border-primary/40 transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-xl">
                    {a.emoji}
                  </div>
                  <div>
                    <p className="text-white font-bold">{a.nom}</p>
                    <p className="text-gray-400 text-sm">{a.age} · {a.niveau}</p>
                  </div>
                </div>
                <Etoiles n={a.note} />
              </div>
              <p className="text-gray-300 text-sm leading-relaxed italic">"{a.texte}"</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-8 md:mt-12">
          <a
            href="#reservation"
            className="inline-block bg-primary hover:bg-red-700 text-white font-bold px-8 py-4 rounded-lg transition-all transform hover:scale-105"
          >
            Rejoindre mes élèves — 90€ / séance
          </a>
        </div>
      </div>
    </section>
  );
}

export default Temoignages;
