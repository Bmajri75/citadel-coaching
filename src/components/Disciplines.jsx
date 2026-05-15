// src/components/Disciplines.jsx
import { disciplines } from '../data/creneaux';

const photos = {
  1: '/photos/fight-mma.jpg',
  2: '/photos/fight-kick.jpg',
  3: '/photos/coach-gi.jpg',
};

function Disciplines() {
  return (
    <section
      id="disciplines"
      className="py-20 bg-gradient-to-b from-secondary to-black"
    >
      <div className="container mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Les <span className="text-primary">Disciplines</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Choisissez votre spécialité ou combinez plusieurs disciplines pour un entraînement complet
          </p>
        </div>

        {/* Grille */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {disciplines.map((discipline) => (
            <div
              key={discipline.id}
              className="group bg-secondary/50 rounded-2xl border border-primary/20 hover:border-primary transition-all duration-300 overflow-hidden transform hover:-translate-y-2"
            >
              {/* Photo */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={photos[discipline.id]}
                  alt={discipline.nom}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <span className="text-4xl">{discipline.emoji}</span>
                </div>
                <div className="absolute top-4 right-4 bg-primary/80 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full">
                  {discipline.nom}
                </div>
              </div>

              {/* Contenu */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-1">{discipline.nom}</h3>
                <p className="text-accent font-semibold text-sm mb-4">{discipline.titre}</p>
                <div className="text-gray-300 leading-relaxed mb-6 space-y-3 text-sm">
                  {(discipline.descriptionComplete || [discipline.description]).map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>

                <div className="bg-primary/10 border border-primary/30 rounded-lg p-3 text-center">
                  <p className="text-sm text-accent font-semibold">✅ Inclus dans le tarif unique</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-400 mb-6">
            Pas sûr de quelle discipline choisir ? Je vous guide lors du premier cours !
          </p>
          <a
            href="#reservation"
            className="inline-block bg-primary hover:bg-red-700 text-white font-bold px-8 py-4 rounded-lg transition-all transform hover:scale-105"
          >
            Réserver votre séance découverte
          </a>
        </div>
      </div>
    </section>
  );
}

export default Disciplines;
