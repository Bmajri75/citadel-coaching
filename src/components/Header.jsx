// src/components/Header.jsx
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { setLanguage } from '../hooks/useLanguage';

function Header() {
  const [menuOuvert, setMenuOuvert] = useState(false);
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isFr = i18n.language === 'fr';

  const fermer = () => setMenuOuvert(false);

  const lien = (href, label, externe = false) => {
    if (externe) {
      return (
        <Link to={href} onClick={fermer} className="text-gray-300 hover:text-white transition-colors py-2">
          {label}
        </Link>
      );
    }
    return isHome ? (
      <a href={href} onClick={fermer} className="text-gray-300 hover:text-white transition-colors py-2">
        {label}
      </a>
    ) : (
      <Link to={`/${href}`} onClick={fermer} className="text-gray-300 hover:text-white transition-colors py-2">
        {label}
      </Link>
    );
  };

  const LangToggle = ({ mobile = false }) => (
    <button
      onClick={() => setLanguage(isFr ? 'en' : 'fr')}
      className={`flex items-center gap-1 font-bold text-sm rounded-lg border transition-all ${
        mobile
          ? 'px-4 py-2 border-primary/30 text-white hover:border-primary'
          : 'px-3 py-1.5 border-primary/40 text-white hover:border-primary'
      }`}
      aria-label="Switch language"
    >
      <span>{isFr ? '🇬🇧' : '🇫🇷'}</span>
      <span>{isFr ? 'EN' : 'FR'}</span>
    </button>
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-secondary/95 backdrop-blur-sm border-b border-primary/20">
      <nav className="container mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2" onClick={fermer}>
            <div className="text-2xl">🥊</div>
            <div>
              <p className="text-lg font-bold text-white leading-none">Citadel Coaching</p>
              <p className="text-xs text-accent">MMA • Muay Thai • BJJ</p>
            </div>
          </Link>

          {/* Navigation desktop */}
          <div className="hidden md:flex items-center gap-5">
            {lien('#accueil', t('header.home'))}
            {lien('#disciplines', t('header.disciplines'))}
            {lien('#tarifs', t('header.prices'))}
            {lien('#apropos', t('header.about'))}
            <Link
              to="/programmes"
              className={`transition-colors font-semibold ${location.pathname.startsWith('/programmes') ? 'text-primary' : 'text-gray-300 hover:text-white'}`}
            >
              {t('header.programmes')}
            </Link>
            <Link
              to="/blog"
              className={`transition-colors font-semibold ${location.pathname.startsWith('/blog') ? 'text-primary' : 'text-gray-300 hover:text-white'}`}
            >
              {t('header.blog')}
            </Link>
            {lien('#contact', t('header.contact'))}
            <LangToggle />
            <a
              href="/#reservation"
              className="bg-primary hover:bg-red-700 text-white font-semibold px-5 py-2 rounded-lg transition-all"
            >
              {t('header.book')}
            </a>
          </div>

          {/* Mobile : lang + hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <LangToggle />
            <button
              className="flex flex-col justify-center items-center w-9 h-9 gap-1.5"
              onClick={() => setMenuOuvert(!menuOuvert)}
              aria-label="Menu"
            >
              <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOuvert ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOuvert ? 'opacity-0' : ''}`} />
              <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOuvert ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Menu mobile */}
      {menuOuvert && (
        <div className="md:hidden bg-secondary border-t border-primary/20">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
            {lien('#accueil', t('header.home'))}
            {lien('#disciplines', t('header.disciplines'))}
            {lien('#tarifs', t('header.prices'))}
            {lien('#apropos', t('header.about'))}
            {lien('/programmes', t('header.programmes'), true)}
            {lien('/blog', t('header.blog'), true)}
            {lien('#contact', t('header.contact'))}
            <a
              href="/#reservation"
              onClick={fermer}
              className="mt-2 bg-primary hover:bg-red-700 text-white font-bold text-center px-6 py-3 rounded-lg transition-all"
            >
              {t('header.book')} — 90€ / {isFr ? 'heure' : 'hour'}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
