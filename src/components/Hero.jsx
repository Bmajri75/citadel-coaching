// src/components/Hero.jsx
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Hero() {
  const { t } = useTranslation();

  return (
    <section id="accueil" className="min-h-screen flex items-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-secondary via-primary/20 to-black -z-10"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-secondary via-secondary/80 to-transparent -z-10"></div>

      <div className="container mx-auto px-4 sm:px-6 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">

          {/* Colonne gauche */}
          <div>
            <div className="inline-block mb-6 px-4 py-2 bg-primary/20 border border-primary/40 rounded-full">
              <p className="text-accent text-sm font-semibold">🥋 {t('hero.badge')}</p>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
              BECHIR MAJRI
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                {t('hero.coaching')}
              </span>
            </h1>

            <p className="text-xl text-gray-300 mb-3">{t('hero.disciplines')}</p>
            <p className="text-gray-400 mb-8 leading-relaxed">{t('hero.description')}</p>

            <div className="inline-block mb-8 px-6 py-3 bg-secondary/80 border border-primary/30 rounded-xl">
              <p className="text-accent text-sm font-semibold mb-1">{t('hero.session_label')}</p>
              <p className="text-3xl font-bold text-white">
                90€ <span className="text-base text-gray-400">{t('hero.per_hour')}</span>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <a
                href="#reservation"
                className="bg-primary hover:bg-red-700 text-white font-bold px-8 py-4 rounded-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-primary/50 text-center"
              >
                {t('hero.book_btn')}
              </a>
              <Link
                to="/programmes"
                className="bg-secondary/80 hover:bg-secondary text-white font-semibold px-8 py-4 rounded-lg border border-primary/30 hover:border-primary transition-all text-center"
              >
                {t('hero.programmes_btn')}
              </Link>
            </div>

            <div className="flex flex-wrap gap-5 text-gray-400 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-primary">📍</span>
                <span>{t('hero.location')}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-primary">⏰</span>
                <span>{t('hero.hours')}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-primary">✅</span>
                <span>{t('hero.all_levels')}</span>
              </div>
            </div>
          </div>

          {/* Colonne droite — Photo */}
          <div className="relative hidden md:block">
            <div className="relative rounded-2xl overflow-hidden border-2 border-primary/30 shadow-2xl shadow-primary/20">
              <img
                src="/photos/hero.jpg"
                alt="Bechir Majri — Citadel Coaching"
                className="w-full h-auto object-cover"
                style={{ maxHeight: '620px', objectPosition: 'top center' }}
              />
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-secondary to-transparent"></div>
            </div>
            <div className="absolute top-4 right-4 bg-black/70 border border-primary/40 text-white font-semibold px-4 py-2 rounded-lg text-sm backdrop-blur-sm">
              {t('hero.pro_badge')}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#disciplines" className="text-white/40 hover:text-white transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </a>
      </div>
    </section>
  );
}

export default Hero;
