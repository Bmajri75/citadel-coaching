// src/components/ProgrammesTeaser.jsx
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function ProgrammesTeaser() {
  const { t } = useTranslation();
  const items = t('programmes_teaser.items', { returnObjects: true });

  return (
    <section id="programmes-home" className="py-12 md:py-20 bg-gradient-to-b from-black to-secondary">
      <div className="container mx-auto px-4 sm:px-6">

        <div className="text-center mb-10 md:mb-14">
          <div className="inline-block mb-4 px-4 py-2 bg-primary/20 border border-primary/40 rounded-full">
            <p className="text-accent text-sm font-semibold">{t('programmes_teaser.badge')}</p>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            {t('programmes_teaser.title')} <span className="text-primary">{t('programmes_teaser.title_highlight')}</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">{t('programmes_teaser.subtitle')}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-12">
          {items.map((p, i) => (
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

        <div className="text-center">
          <Link
            to="/programmes"
            className="inline-block bg-primary hover:bg-red-700 text-white font-bold px-10 py-4 rounded-xl transition-all transform hover:scale-105 text-lg"
          >
            {t('programmes_teaser.cta')}
          </Link>
          <p className="text-gray-500 text-sm mt-4">{t('programmes_teaser.guarantees')}</p>
        </div>
      </div>
    </section>
  );
}

export default ProgrammesTeaser;
