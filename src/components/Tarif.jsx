// src/components/Tarif.jsx
import { tarif } from '../data/creneaux';

function Tarif() {
  return (
    <section id="tarifs" className="py-20 bg-black">
      <div className="container mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Tarif <span className="text-primary">Simple & Transparent</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Un seul tarif, tous les bénéfices
          </p>
        </div>

        {/* Carte tarif */}
        <div className="max-w-2xl mx-auto">
          <div className="relative bg-gradient-to-br from-secondary via-primary/20 to-secondary rounded-3xl border-2 border-primary p-8 md:p-12 shadow-2xl shadow-primary/20">

            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-accent text-secondary font-bold px-6 py-2 rounded-full text-sm shadow-lg">
                ⭐ OFFRE UNIQUE
              </span>
            </div>

            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-white mb-2">{tarif.nom}</h3>
              <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent my-6">
                {tarif.prix}€
              </div>
              <p className="text-gray-300 text-xl">{tarif.duree} de coaching privé</p>
            </div>

            {/* Inclus */}
            <div className="space-y-4 mb-8">
              {tarif.inclus.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <span className="text-primary text-xl flex-shrink-0">✓</span>
                  <p className="text-gray-300">{item}</p>
                </div>
              ))}
            </div>

            {/* Lieu */}
            <div className="border-t border-primary/30 pt-6 space-y-3">
              <div className="flex items-start gap-3 text-gray-300">
                <span className="text-2xl">📍</span>
                <span>{tarif.lieu}</span>
              </div>
              <div className="flex items-start gap-3 text-gray-300">
                <span className="text-2xl">🚇</span>
                <span>{tarif.metro}</span>
              </div>
              <div className="flex items-start gap-3 text-gray-300">
                <span className="text-2xl">⏰</span>
                <span>{tarif.horaires}</span>
              </div>
            </div>

            <div className="mt-8">
              <a
                href="#reservation"
                className="block w-full bg-primary hover:bg-red-700 text-white text-center font-bold px-8 py-4 rounded-xl transition-all transform hover:scale-105 shadow-lg"
              >
                Réserver maintenant
              </a>
              <p className="text-gray-400 text-sm text-center mt-4">
                🔒 Paiement sécurisé en ligne par Stripe
              </p>
            </div>
          </div>
        </div>

        {/* Avantages */}
        <div className="grid md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto">
          <div className="bg-secondary/30 border border-primary/20 rounded-xl p-6 text-center">
            <div className="text-4xl mb-3">💳</div>
            <h4 className="text-white font-bold mb-2">Paiement en ligne</h4>
            <p className="text-gray-400 text-sm">Carte bancaire, paiement sécurisé Stripe</p>
          </div>
          <div className="bg-secondary/30 border border-primary/20 rounded-xl p-6 text-center">
            <div className="text-4xl mb-3">📅</div>
            <h4 className="text-white font-bold mb-2">7j/7</h4>
            <p className="text-gray-400 text-sm">Disponible tous les jours, matin et après-midi</p>
          </div>
          <div className="bg-secondary/30 border border-primary/20 rounded-xl p-6 text-center">
            <div className="text-4xl mb-3">🎯</div>
            <h4 className="text-white font-bold mb-2">3 minutes pour réserver</h4>
            <p className="text-gray-400 text-sm">Formulaire simple, confirmation immédiate</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Tarif;
