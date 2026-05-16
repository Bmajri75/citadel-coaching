// src/components/APropos.jsx
import { useTranslation } from 'react-i18next';
import { coach } from '../data/creneaux';

function APropos() {
  const { t } = useTranslation();
  const diplomes = t('about.diplomes', { returnObjects: true });
  const specialties = t('about.specialties', { returnObjects: true });

  return (
    <section id="apropos" className="py-12 md:py-20 bg-gradient-to-b from-secondary to-black">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">

            <div className="relative">
              <div className="rounded-2xl overflow-hidden border-2 border-primary/30 shadow-2xl shadow-primary/10">
                <img
                  src="/photos/walkout.jpg"
                  alt="Bechir Majri — Coach MMA Paris 17"
                  className="w-full h-auto object-cover"
                  style={{ maxHeight: '560px', objectPosition: 'top center' }}
                />
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent"></div>
              </div>
              <div className="absolute -bottom-5 -right-5 bg-primary text-white font-bold px-6 py-3 rounded-xl shadow-xl">
                <p className="text-sm">{t('about.pro_badge')}</p>
              </div>
            </div>

            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                {t('about.title')} <span className="text-primary">{t('about.title_highlight')}</span>
              </h2>

              <h3 className="text-2xl text-accent font-bold mb-1">{coach.nom}</h3>
              <p className="text-gray-400 mb-6">{t('about.coach_title')}</p>

              <div className="flex flex-wrap gap-3 mb-6">
                {diplomes.map((d, i) => (
                  <span key={i} className="bg-primary/20 border border-primary/40 text-accent px-3 py-1.5 rounded-lg font-semibold text-sm">
                    ✓ {d}
                  </span>
                ))}
              </div>

              <div className="space-y-4 text-gray-300 leading-relaxed mb-6">
                {t('about.bio').split('\n\n').map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              <div className="bg-secondary/50 border border-primary/20 rounded-xl p-5">
                <h4 className="text-white font-bold mb-3">{t('about.specialties_title')}</h4>
                <div className="grid grid-cols-2 gap-3">
                  {specialties.map((s, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-primary text-sm">●</span>
                      <span className="text-gray-300 text-sm">{s}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <a
                  href="#reservation"
                  className="inline-block bg-primary hover:bg-red-700 text-white font-bold px-8 py-4 rounded-lg transition-all transform hover:scale-105"
                >
                  {t('about.cta')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default APropos;
