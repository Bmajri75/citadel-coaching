// src/components/Tarif.jsx
import { useTranslation } from 'react-i18next';
import { tarif } from '../data/creneaux';

function Tarif() {
  const { t } = useTranslation();
  const inclus = t('tarif.inclus', { returnObjects: true });
  const avantages = t('tarif.avantages', { returnObjects: true });

  return (
    <section id="tarifs" className="py-12 md:py-20 bg-black">
      <div className="container mx-auto px-4 sm:px-6">

        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            {t('tarif.title')} <span className="text-primary">{t('tarif.title_highlight')}</span>
          </h2>
          <p className="text-gray-400 text-lg">{t('tarif.subtitle')}</p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="relative bg-gradient-to-br from-secondary via-primary/20 to-secondary rounded-3xl border-2 border-primary p-8 md:p-12 shadow-2xl shadow-primary/20">

            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-accent text-secondary font-bold px-6 py-2 rounded-full text-sm shadow-lg">
                {t('tarif.badge')}
              </span>
            </div>

            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-white mb-2">{t('tarif.session_name')}</h3>
              <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent my-6">
                {tarif.prix}€
              </div>
              <p className="text-gray-300 text-xl">
                {t('tarif.duration')} {t('tarif.coaching_label')}
              </p>
            </div>

            <div className="space-y-4 mb-8">
              {inclus.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-primary text-xl flex-shrink-0">✓</span>
                  <p className="text-gray-300">{item}</p>
                </div>
              ))}
            </div>

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
                <span>{t('tarif.horaires')}</span>
              </div>
            </div>

            <div className="mt-8">
              <a
                href="#reservation"
                className="block w-full bg-primary hover:bg-red-700 text-white text-center font-bold px-8 py-4 rounded-xl transition-all transform hover:scale-105 shadow-lg"
              >
                {t('tarif.book_btn')}
              </a>
              <p className="text-gray-400 text-sm text-center mt-4">{t('tarif.stripe_note')}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mt-8 md:mt-16 max-w-4xl mx-auto">
          {avantages.map((a, i) => (
            <div key={i} className="bg-secondary/30 border border-primary/20 rounded-xl p-6 text-center">
              <div className="text-4xl mb-3">{a.icon}</div>
              <h4 className="text-white font-bold mb-2">{a.title}</h4>
              <p className="text-gray-400 text-sm">{a.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Tarif;
