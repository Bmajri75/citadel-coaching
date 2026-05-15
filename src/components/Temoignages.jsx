// src/components/Temoignages.jsx

const avis = [
  {
    nom: 'Kévin M.',
    age: '28 ans',
    niveau: 'Débutant MMA',
    note: 5,
    texte: "J'avais zéro expérience en sport de combat. En 3 mois avec Bechir, j'ai appris les bases du MMA, la garde, les enchaînements, le travail au sol. Je me sens enfin à l'aise pour rejoindre un club. Le coaching privé, c'est une autre dimension.",
    emoji: '🥊',
  },
  {
    nom: 'Sandrine L.',
    age: '34 ans',
    niveau: 'Perte de poids',
    note: 5,
    texte: "J'avais essayé la salle classique sans résultats. Avec Bechir j'ai perdu 9 kg en 4 mois. Les séances combat sont intenses, fun, et je n'ai jamais regardé l'heure. La méthode est sérieuse et bienveillante à la fois.",
    emoji: '🔥',
  },
  {
    nom: 'Yassine B.',
    age: '22 ans',
    niveau: 'Compétiteur MMA',
    note: 5,
    texte: "Bechir a remis à plat tout mon jeu de sol. En tant qu'ancien pro, il voit des choses que les autres coachs ratent. Deux mois avant ma compétition, il a restructuré mon grappling et j'ai gagné par soumission au 2ème round.",
    emoji: '🏆',
  },
  {
    nom: 'Thomas R.',
    age: '41 ans',
    niveau: 'Remise en forme',
    note: 5,
    texte: "Je cherchais à me défouler après le travail sans passer des heures en salle. Les séances de Muay Thai avec Bechir sont parfaites : intenses, techniques, et adaptées à mon niveau. Je recommande sans hésiter à tous les Parisiens.",
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
    <section id="temoignages" className="py-20 bg-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaReviews) }}
      />

      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Ce que disent <span className="text-primary">mes élèves</span>
          </h2>
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="text-accent text-2xl">★★★★★</span>
            <span className="text-white font-bold text-xl">5.0 / 5</span>
            <span className="text-gray-400">— Avis de nos élèves</span>
          </div>
          <p className="text-gray-400 text-lg">Paris 17ème • Porte Maillot</p>
        </div>

        {/* Grille */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {avis.map((a, i) => (
            <div
              key={i}
              className="bg-secondary/50 border border-primary/20 rounded-2xl p-6 hover:border-primary/40 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-2xl">
                    {a.emoji}
                  </div>
                  <div>
                    <p className="text-white font-bold">{a.nom}</p>
                    <p className="text-gray-400 text-sm">{a.age} · {a.niveau}</p>
                  </div>
                </div>
                <Etoiles n={a.note} />
              </div>
              <p className="text-gray-300 leading-relaxed italic">"{a.texte}"</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
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
