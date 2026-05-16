// src/components/Contact.jsx
import { useTranslation } from 'react-i18next';
import { coach, tarif } from '../data/creneaux';

function Contact() {
  const { t } = useTranslation();

  return (
    <section id="contact" className="py-12 md:py-20 bg-secondary">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">

          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              {t('contact.title')} <span className="text-primary">{t('contact.title_highlight')}</span>
            </h2>
            <p className="text-gray-400 text-lg">{t('contact.subtitle')}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="space-y-4">
              <div className="bg-black/50 border border-primary/20 rounded-xl p-6">
                <h3 className="text-white font-bold mb-3">{t('contact.address_title')}</h3>
                <p className="text-gray-300">{tarif.lieu}</p>
                <p className="text-accent text-sm mt-1">{tarif.metro}</p>
              </div>

              <div className="bg-black/50 border border-primary/20 rounded-xl p-6">
                <h3 className="text-white font-bold mb-3">{t('contact.phone_title')}</h3>
                <a href={`tel:${coach.tel}`} className="text-gray-300 hover:text-primary transition-colors text-lg font-semibold">
                  {coach.tel}
                </a>
              </div>

              <div className="bg-black/50 border border-primary/20 rounded-xl p-6">
                <h3 className="text-white font-bold mb-3">{t('contact.email_title')}</h3>
                <a href={`mailto:${coach.email}`} className="text-gray-300 hover:text-primary transition-colors">
                  {coach.email}
                </a>
              </div>

              <div className="bg-black/50 border border-primary/20 rounded-xl p-6">
                <h3 className="text-white font-bold mb-3">{t('contact.hours_title')}</h3>
                <p className="text-gray-300">{t('contact.hours_value')}</p>
              </div>
            </div>

            <div className="bg-black/50 border border-primary/20 rounded-xl overflow-hidden">
              <iframe
                title="Citadel Coaching — Paris 17ème"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.134!2d2.2822!3d48.8785!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66fca29b5c3df%3A0x6f7e5a3f9a5b1234!2s15+Boulevard+Gouvion-Saint-Cyr%2C+75017+Paris!5e0!3m2!1sfr!2sfr!4v1"
                width="100%"
                height="100%"
                style={{ minHeight: '300px', border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <div className="bg-gradient-to-r from-primary to-accent rounded-2xl p-8 md:p-12 text-center">
            <h3 className="text-3xl font-bold text-white mb-4">{t('contact.cta_title')}</h3>
            <p className="text-white/90 mb-6">{t('contact.cta_desc')}</p>
            <a
              href="#reservation"
              className="inline-block bg-secondary hover:bg-black text-white font-bold px-8 py-4 rounded-lg transition-all transform hover:scale-105"
            >
              {t('contact.cta_btn')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
