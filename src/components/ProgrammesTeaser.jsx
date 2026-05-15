// src/components/ProgrammesTeaser.jsx
import { Link } from 'react-router-dom';

const highlights = [
  { emoji: '🥊', titre: 'MMA Débutant', sous: 'À faire seul à la maison', prix: '29€' },
  { emoji: '🇹🇭', titre: 'Muay Thai Débutant', sous: 'Techniques de base', prix: '29€' },
  { emoji: '🥋', titre: 'BJJ Débutant', sous: 'Jiu-Jitsu Brésilien Gi & NoGi', prix: '29€' },
  { emoji: '💪', titre: 'Musculation Débutant', sous: 'Prise de force', prix: '29€' },
  { emoji: '🏋️', titre: 'Muscu & Sport de Combat', sous: 'Puissance et explosivité', prix: '39€' },
  { emoji: '🔥', titre: 'Programme Minceur', sous: 'Par les sports de combat', prix: '29€' },
];

function ProgrammesTeaser() {
  return (
    <section id="programmes-home" className="py-20 bg-gradient-to-b from-black to-secondary">
      <div className="container mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-block mb-4 px-4 py-2 bg-primary/20 border border-primary/40 rounded-full">
            <p className="text-accent text-sm font-semibold">📚 Programmes PDF — Téléchargement immédiat</p>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Progressez <span className="text-primary">chez vous</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            6 programmes d'entraînement complets conçus par Bechir Majri — pour progresser seul, à votre rythme, depuis chez vous.
          </p>
        </div>

        {/* Grille */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-12">
          {highlights.map((p, i) => (
            <div
              key={i}
              className="bg-secondary/80 border border-primary/20 rounded-xl p-5 hover:border-primary/50 transition-all text-center group"
            >
              <div className="text-4xl mb-3">{p.emoji}</div>
              <p className="text-white font-bold text-sm mb-1">{p.titre}</p>
              <p className="text-gray-400 text-xs mb-3">{p.sous}</p>
              <span className="text-primary font-bold text-lg">{p.prix}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            to="/programmes"
            className="inline-block bg-primary hover:bg-red-700 text-white font-bold px-10 py-4 rounded-xl transition-all transform hover:scale-105 text-lg"
          >
            Voir tous les programmes →
          </Link>
          <p className="text-gray-500 text-sm mt-4">
            ✅ Accès à vie • ✅ Téléchargement immédiat • ✅ Paiement sécurisé Stripe
          </p>
        </div>
      </div>
    </section>
  );
}

export default ProgrammesTeaser;
