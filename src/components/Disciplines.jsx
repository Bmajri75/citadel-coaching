// src/components/Disciplines.jsx
import { useTranslation } from 'react-i18next';
import { disciplines } from '../data/creneaux';

const photos = {
  1: '/photos/fight-mma.jpg',
  2: '/photos/fight-kick.jpg',
  3: '/photos/coach-gi.jpg',
};

function Disciplines() {
  const { t } = useTranslation();
  const items = t('disciplines.items', { returnObjects: true });

  return (
    <section id="disciplines" className="py-12 md:py-20 bg-gradient-to-b from-secondary to-black">
      <div className="container mx-auto px-4 sm:px-6">

        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            {t('disciplines.title')} <span className="text-primary">{t('disciplines.title_highlight')}</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">{t('disciplines.subtitle')}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {disciplines.map((d, i) => {
            const item = items[i] || {};
            return (
              <div
                key={d.id}
                className="group bg-secondary/50 rounded-2xl border border-primary/20 hover:border-primary transition-all duration-300 overflow-hidden transform hover:-translate-y-2"
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={photos[d.id]}
                    alt={item.nom}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <span className="text-4xl">{d.emoji}</span>
                  </div>
                  <div className="absolute top-4 right-4 bg-primary/80 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full">
                    {item.nom}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-1">{item.nom}</h3>
                  <p className="text-accent font-semibold text-sm mb-4">{item.titre}</p>
                  <p className="text-gray-300 leading-relaxed mb-6 text-sm">{item.description}</p>
                  <div className="bg-primary/10 border border-primary/30 rounded-lg p-3 text-center">
                    <p className="text-sm text-accent font-semibold">{t('disciplines.included')}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-400 mb-6">{t('disciplines.cta_text')}</p>
          <a
            href="#reservation"
            className="inline-block bg-primary hover:bg-red-700 text-white font-bold px-8 py-4 rounded-lg transition-all transform hover:scale-105"
          >
            {t('disciplines.cta_btn')}
          </a>
        </div>
      </div>
    </section>
  );
}

export default Disciplines;
