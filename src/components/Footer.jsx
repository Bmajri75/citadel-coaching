// src/components/Footer.jsx
import { Link } from 'react-router-dom';
import { coach } from '../data/creneaux';

function Footer() {
  return (
    <footer className="bg-black border-t border-primary/20 py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-8">

          {/* Colonne 1 — Logo & Description */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="text-3xl">🥊</div>
              <div>
                <h3 className="text-xl font-bold text-white">CITADEL COACHING</h3>
                <p className="text-xs text-accent">MMA • Muay Thai • Grappling</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Coaching sportif privé à Paris 17ème. 20 ans d'expérience au service de votre progression — du débutant au compétiteur.
            </p>
          </div>

          {/* Colonne 2 — Navigation */}
          <div>
            <h4 className="text-white font-bold mb-4">Navigation</h4>
            <nav className="space-y-2">
              <a href="#accueil" className="block text-gray-400 hover:text-primary transition-colors text-sm">Accueil</a>
              <a href="#disciplines" className="block text-gray-400 hover:text-primary transition-colors text-sm">Disciplines</a>
              <a href="#apropos" className="block text-gray-400 hover:text-primary transition-colors text-sm">À propos</a>
              <a href="#tarifs" className="block text-gray-400 hover:text-primary transition-colors text-sm">Tarifs</a>
              <a href="#reservation" className="block text-gray-400 hover:text-primary transition-colors text-sm">Réservation</a>
              <a href="#contact" className="block text-gray-400 hover:text-primary transition-colors text-sm">Contact</a>
              <Link to="/programmes" className="block text-accent hover:text-primary transition-colors text-sm font-semibold">📚 Programmes PDF</Link>
            </nav>
          </div>

          {/* Colonne 3 — Contact */}
          <div>
            <h4 className="text-white font-bold mb-4">Contact</h4>
            <div className="space-y-3 text-gray-400 text-sm">
              <p>
                <a href={`tel:${coach.tel}`} className="hover:text-primary transition-colors">
                  📞 {coach.tel}
                </a>
              </p>
              <p>
                <a href={`mailto:${coach.email}`} className="hover:text-primary transition-colors">
                  📧 {coach.email}
                </a>
              </p>
              <p>📍 15 bd Gouvion-Saint-Cyr<br />75017 Paris</p>
              <p>⏰ 7j/7 — 08h-10h et 14h-17h</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-primary/20 pt-8 text-center text-gray-400 text-sm space-y-1">
          <p>© 2025 Citadel Coaching — {coach.nom}. Tous droits réservés.</p>
          <p>
            Développé par{' '}
            <span className="text-primary font-semibold">Citadel-Tech</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
