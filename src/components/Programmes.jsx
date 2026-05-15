// src/components/Programmes.jsx
import { Link } from 'react-router-dom';
import { programmes } from '../data/programmes';

function Programmes() {
  return (
    <div className="min-h-screen bg-secondary">

      {/* Hero */}
      <div className="bg-gradient-to-b from-black to-secondary pt-28 pb-16 px-6 text-center">
        <div className="inline-block mb-4 px-4 py-2 bg-primary/20 border border-primary/40 rounded-full">
          <p className="text-accent text-sm font-semibold">📚 Programmes PDF — Citadel Coaching</p>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          Progressez à votre <span className="text-primary">rythme</span>
        </h1>
        <p className="text-gray-400 text-xl max-w-2xl mx-auto mb-8">
          Des programmes d'entraînement complets, conçus par Bechir Majri — coach diplômé BPJEPS
          et Purple Belt Gracie Barra — pour progresser seul, efficacement.
        </p>
        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
          <span>✅ Téléchargement immédiat</span>
          <span>✅ Accès à vie</span>
          <span>✅ Paiement sécurisé Stripe</span>
        </div>
      </div>

      {/* Catalogue */}
      <div className="container mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {programmes.map((prog) => (
            <div
              key={prog.id}
              className="bg-secondary/80 border border-primary/20 rounded-2xl overflow-hidden hover:border-primary/50 transition-all group"
            >
              {/* Header carte */}
              <div className={`bg-gradient-to-br ${prog.couleur} p-8 text-center relative`}>
                {prog.badge && (
                  <span className="absolute top-4 right-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                    {prog.badge}
                  </span>
                )}
                <div className="text-6xl mb-3">{prog.emoji}</div>
                <h2 className="text-2xl font-bold text-white mb-1">{prog.nom}</h2>
                <p className="text-gray-300 text-sm">{prog.sousTitre}</p>
              </div>

              {/* Infos */}
              <div className="p-6">
                <div className="flex justify-between text-sm text-gray-400 mb-4">
                  <span>📊 {prog.niveau}</span>
                  <span>⏱️ {prog.duree}</span>
                  <span>📄 {prog.pages}</span>
                </div>

                <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                  {prog.accroche}
                </p>

                <ul className="space-y-2 mb-6">
                  {prog.benefices.slice(0, 3).map((b, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                      <span className="text-primary mt-0.5">✓</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="border-t border-primary/20 pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-bold text-white">{prog.prix}€</span>
                    <span className="text-gray-400 text-sm">paiement unique</span>
                  </div>
                  <Link
                    to={`/programmes/${prog.id}`}
                    className="block w-full text-center bg-primary hover:bg-red-700 text-white font-bold py-3 px-6 rounded-xl transition-all transform group-hover:scale-105"
                  >
                    Voir le programme →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Garantie */}
        <div className="max-w-2xl mx-auto mt-16 text-center bg-accent/10 border border-accent/30 rounded-2xl p-8">
          <div className="text-4xl mb-3">🛡️</div>
          <h3 className="text-xl font-bold text-white mb-2">Satisfait ou remboursé 7 jours</h3>
          <p className="text-gray-400 text-sm">
            Si le programme ne correspond pas à vos attentes, contactez-nous dans les 7 jours
            suivant l'achat pour un remboursement complet.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Programmes;
