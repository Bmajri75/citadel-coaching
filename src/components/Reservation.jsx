// src/components/Reservation.jsx
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import StripeCheckout from './StripeCheckout';
import { disciplines, creneaux } from '../data/creneaux';

function Reservation() {
  const { t, i18n } = useTranslation();
  const [etape, setEtape] = useState(1);
  const [formData, setFormData] = useState({
    discipline: '',
    date: '',
    heure: '',
    nom: '',
    email: '',
    tel: '',
    message: '',
  });

  const disciplineItems = t('disciplines.items', { returnObjects: true });
  const steps = t('reservation.steps', { returnObjects: true });
  const locale = i18n.language === 'fr' ? 'fr-FR' : 'en-US';
  const today = new Date().toISOString().split('T')[0];

  const getCreneauxDuJour = () => {
    if (!formData.date) return [];
    const date = new Date(formData.date);
    const joursSemaine = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
    const jour = joursSemaine[date.getDay()];
    return creneaux[jour] || [];
  };

  const handleNext = () => setEtape(etape + 1);
  const handleBack = () => setEtape(etape - 1);
  const handleSubmit = (e) => { e.preventDefault(); setEtape(4); };

  return (
    <section id="reservation" className="py-12 md:py-20 bg-gradient-to-b from-secondary to-black">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">

          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              <span className="text-primary">{t('reservation.title')}</span> {t('reservation.title_highlight')}
            </h2>
            <p className="text-gray-400 text-lg">{t('reservation.subtitle')}</p>
          </div>

          {/* Progress bar */}
          <div className="mb-8 md:mb-12">
            <div className="flex justify-between items-center mb-4">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex-1 flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${etape >= step ? 'bg-primary text-white' : 'bg-secondary border-2 border-primary/30 text-gray-500'}`}>
                    {step}
                  </div>
                  {step < 4 && (
                    <div className={`flex-1 h-1 mx-2 ${etape > step ? 'bg-primary' : 'bg-secondary'}`}></div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between text-xs text-gray-400">
              {steps.map((s, i) => <span key={i}>{s}</span>)}
            </div>
          </div>

          <div className="bg-secondary/50 backdrop-blur-sm border border-primary/20 rounded-2xl p-6 md:p-8">

            {/* ÉTAPE 1 : Discipline */}
            {etape === 1 && (
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">{t('reservation.step1_title')}</h3>
                <div className="space-y-4">
                  {disciplines.map((d, i) => {
                    const item = disciplineItems[i] || {};
                    return (
                      <button
                        key={d.id}
                        onClick={() => { setFormData({ ...formData, discipline: item.nom }); handleNext(); }}
                        className={`w-full text-left bg-black/50 hover:bg-primary/20 border-2 transition-all rounded-xl p-6 ${formData.discipline === item.nom ? 'border-primary' : 'border-primary/20'}`}
                      >
                        <div className="flex items-center gap-4">
                          <div className="text-5xl">{d.emoji}</div>
                          <div className="flex-1">
                            <h4 className="text-xl font-bold text-white mb-1">{item.nom}</h4>
                            <p className="text-gray-400 text-sm">{item.titre}</p>
                          </div>
                          <div className="text-primary text-2xl">→</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ÉTAPE 2 : Date */}
            {etape === 2 && (
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">{t('reservation.step2_title')}</h3>
                <div className="mb-6">
                  <label className="block text-white font-semibold mb-3">{t('reservation.date_label')}</label>
                  <input
                    type="date"
                    min={today}
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value, heure: '' })}
                    className="w-full bg-black/50 text-white border-2 border-primary/30 focus:border-primary rounded-xl px-4 py-3 outline-none"
                  />
                </div>

                {formData.date && (
                  <div className="mb-6">
                    <label className="block text-white font-semibold mb-3">
                      {t('reservation.slots_label')}{' '}
                      {new Date(formData.date).toLocaleDateString(locale, { weekday: 'long', day: 'numeric', month: 'long' })}
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {getCreneauxDuJour().length > 0 ? (
                        getCreneauxDuJour().map((c) => (
                          <button
                            key={c}
                            onClick={() => setFormData({ ...formData, heure: c })}
                            className={`py-3 px-4 rounded-lg font-semibold transition-all ${formData.heure === c ? 'bg-primary text-white' : 'bg-black/50 text-gray-300 border-2 border-primary/30 hover:border-primary'}`}
                          >
                            {c}
                          </button>
                        ))
                      ) : (
                        <p className="col-span-3 text-center text-gray-400 py-4">{t('reservation.no_slots')}</p>
                      )}
                    </div>
                  </div>
                )}

                {formData.discipline && formData.date && formData.heure && (
                  <div className="bg-primary/10 border border-primary/30 rounded-xl p-4 mb-6">
                    <p className="text-white font-semibold mb-2">{t('reservation.recap')}</p>
                    <p className="text-gray-300 text-sm">
                      🥋 {formData.discipline}<br />
                      📅 {new Date(formData.date).toLocaleDateString(locale, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}<br />
                      🕐 {formData.heure}
                    </p>
                  </div>
                )}

                <div className="flex gap-4">
                  <button onClick={handleBack} className="px-6 py-3 bg-black/50 hover:bg-black text-white font-semibold rounded-lg border-2 border-primary/30 transition-all">
                    {t('reservation.back')}
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={!formData.date || !formData.heure}
                    className="flex-1 px-6 py-3 bg-primary hover:bg-red-700 text-white font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {t('reservation.next')}
                  </button>
                </div>
              </div>
            )}

            {/* ÉTAPE 3 : Infos */}
            {etape === 3 && (
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">{t('reservation.step3_title')}</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-white font-semibold mb-2">{t('reservation.name_label')}</label>
                    <input type="text" required value={formData.nom} onChange={(e) => setFormData({ ...formData, nom: e.target.value })} placeholder={t('reservation.name_placeholder')} className="w-full bg-black/50 text-white border-2 border-primary/30 focus:border-primary rounded-xl px-4 py-3 outline-none" />
                  </div>
                  <div>
                    <label className="block text-white font-semibold mb-2">{t('reservation.email_label')}</label>
                    <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder={t('reservation.email_placeholder')} className="w-full bg-black/50 text-white border-2 border-primary/30 focus:border-primary rounded-xl px-4 py-3 outline-none" />
                  </div>
                  <div>
                    <label className="block text-white font-semibold mb-2">{t('reservation.tel_label')}</label>
                    <input type="tel" required value={formData.tel} onChange={(e) => setFormData({ ...formData, tel: e.target.value })} placeholder={t('reservation.tel_placeholder')} className="w-full bg-black/50 text-white border-2 border-primary/30 focus:border-primary rounded-xl px-4 py-3 outline-none" />
                  </div>
                  <div>
                    <label className="block text-white font-semibold mb-2">{t('reservation.message_label')}</label>
                    <textarea value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder={t('reservation.message_placeholder')} rows="4" className="w-full bg-black/50 text-white border-2 border-primary/30 focus:border-primary rounded-xl px-4 py-3 outline-none resize-none" />
                  </div>
                  <div className="flex gap-4 pt-4">
                    <button type="button" onClick={handleBack} className="px-6 py-3 bg-black/50 hover:bg-black text-white font-semibold rounded-lg border-2 border-primary/30 transition-all">
                      {t('reservation.back')}
                    </button>
                    <button type="submit" className="flex-1 px-6 py-3 bg-primary hover:bg-red-700 text-white font-bold rounded-lg transition-all">
                      {t('reservation.pay')}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* ÉTAPE 4 : Paiement */}
            {etape === 4 && <StripeCheckout formData={formData} onBack={handleBack} />}
          </div>

          <div className="mt-6 text-center text-gray-400 text-sm">
            <p>{t('reservation.stripe_note')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Reservation;
