// src/components/Highlights.jsx
import { useTranslation } from 'react-i18next';

function Highlights() {
  const { t } = useTranslation();
  const stats = t('highlights.stats', { returnObjects: true });

  return (
    <section id="highlights" className="py-12 md:py-20 bg-black">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">

          <div className="text-center mb-12">
            <div className="inline-block mb-4 px-4 py-2 bg-primary/20 border border-primary/40 rounded-full">
              <p className="text-accent text-sm font-semibold">{t('highlights.badge')}</p>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              {t('highlights.title')} <span className="text-primary">{t('highlights.title_highlight')}</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">{t('highlights.description')}</p>
          </div>

          <div className="relative rounded-2xl overflow-hidden border-2 border-primary/30 shadow-2xl shadow-primary/20 bg-black">
            <div className="aspect-video">
              <iframe
                src="https://www.youtube.com/embed/ceS3432vSGw?rel=0&modestbranding=1"
                title={t('highlights.video_title')}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
                loading="lazy"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6 mt-10">
            {stats.map((s, i) => (
              <div key={i} className="bg-secondary/60 border border-primary/20 rounded-xl p-6 text-center">
                <p className="text-4xl font-bold text-primary mb-1">{s.value}</p>
                <p className="text-gray-300 text-sm">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <a
              href="#reservation"
              className="inline-block bg-primary hover:bg-red-700 text-white font-bold px-10 py-4 rounded-xl transition-all transform hover:scale-105 text-lg"
            >
              {t('highlights.cta')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Highlights;
