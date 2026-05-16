// src/components/Footer.jsx
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { coach } from '../data/creneaux';

function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-black border-t border-primary/20 py-12">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-8">

          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="text-3xl">🥊</div>
              <div>
                <h3 className="text-xl font-bold text-white">CITADEL COACHING</h3>
                <p className="text-xs text-accent">MMA • Muay Thai • BJJ</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">{t('footer.description')}</p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">{t('footer.nav_title')}</h4>
            <nav className="space-y-2">
              <a href="#accueil" className="block text-gray-400 hover:text-primary transition-colors text-sm">{t('footer.links.home')}</a>
              <a href="#disciplines" className="block text-gray-400 hover:text-primary transition-colors text-sm">{t('footer.links.disciplines')}</a>
              <a href="#apropos" className="block text-gray-400 hover:text-primary transition-colors text-sm">{t('footer.links.about')}</a>
              <a href="#tarifs" className="block text-gray-400 hover:text-primary transition-colors text-sm">{t('footer.links.prices')}</a>
              <a href="#reservation" className="block text-gray-400 hover:text-primary transition-colors text-sm">{t('footer.links.reservation')}</a>
              <a href="#contact" className="block text-gray-400 hover:text-primary transition-colors text-sm">{t('footer.links.contact')}</a>
              <Link to="/programmes" className="block text-accent hover:text-primary transition-colors text-sm font-semibold">{t('footer.links.programmes')}</Link>
            </nav>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">{t('footer.contact_title')}</h4>
            <div className="space-y-3 text-gray-400 text-sm">
              <p><a href={`tel:${coach.tel}`} className="hover:text-primary transition-colors">📞 {coach.tel}</a></p>
              <p><a href={`mailto:${coach.email}`} className="hover:text-primary transition-colors">📧 {coach.email}</a></p>
              <p>📍 15 bd Gouvion-Saint-Cyr<br />75017 Paris</p>
              <p>⏰ {t('footer.hours')}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-primary/20 pt-8 text-center text-gray-400 text-sm space-y-1">
          <p>© {new Date().getFullYear()} Citadel Coaching — {coach.nom}. {t('footer.rights')}</p>
          <p>{t('footer.dev_by')} <span className="text-primary font-semibold">Citadel-Tech</span></p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
