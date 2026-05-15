// src/components/APropos.jsx
import { coach } from '../data/creneaux';

function APropos() {
  return (
    <section
      id="apropos"
      className="py-20 bg-gradient-to-b from-secondary to-black"
    >
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">

            {/* Colonne gauche — Photo / identité visuelle */}
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-primary/30 to-accent/20 rounded-2xl flex items-center justify-center border-2 border-primary/30 overflow-hidden">
                <div className="text-center px-8">
                  <div className="text-9xl mb-6">🥊</div>
                  <p className="text-white font-bold text-2xl">{coach.nom}</p>
                  <p className="text-accent text-sm mt-1">Citadel Coaching</p>
                </div>
              </div>
              {/* Badge flottant */}
              <div className="absolute -bottom-5 -right-5 bg-primary text-white font-bold px-6 py-3 rounded-xl shadow-xl">
                <p className="text-sm">20 ans d'expérience</p>
              </div>
            </div>

            {/* Colonne droite — Contenu */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Votre <span className="text-primary">Coach</span>
              </h2>

              <h3 className="text-2xl text-accent font-bold mb-1">{coach.nom}</h3>
              <p className="text-gray-400 mb-6">{coach.titre}</p>

              {/* Diplômes */}
              <div className="flex flex-wrap gap-3 mb-6">
                {coach.diplomes.map((diplome, index) => (
                  <span
                    key={index}
                    className="bg-primary/20 border border-primary/40 text-accent px-3 py-1.5 rounded-lg font-semibold text-sm"
                  >
                    ✓ {diplome}
                  </span>
                ))}
              </div>

              {/* Bio */}
              <div className="space-y-4 text-gray-300 leading-relaxed mb-6">
                {coach.bio.split('\n\n').map((paragraphe, index) => (
                  <p key={index}>{paragraphe}</p>
                ))}
              </div>

              {/* Spécialités */}
              <div className="bg-secondary/50 border border-primary/20 rounded-xl p-5">
                <h4 className="text-white font-bold mb-3">Spécialités :</h4>
                <div className="grid grid-cols-2 gap-3">
                  {coach.specialites.map((specialite, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span className="text-primary text-sm">●</span>
                      <span className="text-gray-300 text-sm">{specialite}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="mt-8">
                <a
                  href="#reservation"
                  className="inline-block bg-primary hover:bg-red-700 text-white font-bold px-8 py-4 rounded-lg transition-all transform hover:scale-105"
                >
                  Réserver avec Bechir
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default APropos;
