// src/components/Reservation.jsx
import { useState } from 'react';
import StripeCheckout from './StripeCheckout';
import { disciplines, creneaux } from '../data/creneaux';

function Reservation() {
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

  const today = new Date().toISOString().split('T')[0];

  const getCreneauxDuJour = () => {
    if (!formData.date) return [];
    const date = new Date(formData.date);
    const joursSemaine = [
      'dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi',
    ];
    const jour = joursSemaine[date.getDay()];
    return creneaux[jour] || [];
  };

  const handleNext = () => setEtape(etape + 1);
  const handleBack = () => setEtape(etape - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    setEtape(4);
  };

  return (
    <section
      id="reservation"
      className="py-20 bg-gradient-to-b from-secondary to-black"
    >
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              <span className="text-primary">Réservez</span> Votre Séance
            </h2>
            <p className="text-gray-400 text-lg">
              4 étapes simples pour réserver votre coaching
            </p>
          </div>

          {/* Progress bar */}
          <div className="mb-12">
            <div className="flex justify-between items-center mb-4">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex-1 flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      etape >= step
                        ? 'bg-primary text-white'
                        : 'bg-secondary border-2 border-primary/30 text-gray-500'
                    }`}
                  >
                    {step}
                  </div>
                  {step < 4 && (
                    <div
                      className={`flex-1 h-1 mx-2 ${
                        etape > step ? 'bg-primary' : 'bg-secondary'
                      }`}
                    ></div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between text-xs text-gray-400">
              <span>Discipline</span>
              <span>Date</span>
              <span>Infos</span>
              <span>Paiement</span>
            </div>
          </div>

          {/* Formulaire */}
          <div className="bg-secondary/50 backdrop-blur-sm border border-primary/20 rounded-2xl p-8">

            {/* ÉTAPE 1 : Choix discipline */}
            {etape === 1 && (
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">
                  Choisissez votre discipline
                </h3>
                <div className="space-y-4">
                  {disciplines.map((discipline) => (
                    <button
                      key={discipline.id}
                      onClick={() => {
                        setFormData({ ...formData, discipline: discipline.nom });
                        handleNext();
                      }}
                      className={`w-full text-left bg-black/50 hover:bg-primary/20 border-2 transition-all rounded-xl p-6 ${
                        formData.discipline === discipline.nom
                          ? 'border-primary'
                          : 'border-primary/20'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="text-5xl">{discipline.emoji}</div>
                        <div className="flex-1">
                          <h4 className="text-xl font-bold text-white mb-1">{discipline.nom}</h4>
                          <p className="text-gray-400 text-sm">{discipline.titre}</p>
                        </div>
                        <div className="text-primary text-2xl">→</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ÉTAPE 2 : Date et heure */}
            {etape === 2 && (
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">
                  Choisissez votre créneau
                </h3>

                <div className="mb-6">
                  <label className="block text-white font-semibold mb-3">Date de la séance</label>
                  <input
                    type="date"
                    min={today}
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value, heure: '' })
                    }
                    className="w-full bg-black/50 text-white border-2 border-primary/30 focus:border-primary rounded-xl px-4 py-3 outline-none"
                  />
                </div>

                {formData.date && (
                  <div className="mb-6">
                    <label className="block text-white font-semibold mb-3">
                      Créneaux disponibles le{' '}
                      {new Date(formData.date).toLocaleDateString('fr-FR', {
                        weekday: 'long', day: 'numeric', month: 'long',
                      })}
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {getCreneauxDuJour().length > 0 ? (
                        getCreneauxDuJour().map((creneau) => (
                          <button
                            key={creneau}
                            onClick={() => setFormData({ ...formData, heure: creneau })}
                            className={`py-3 px-4 rounded-lg font-semibold transition-all ${
                              formData.heure === creneau
                                ? 'bg-primary text-white'
                                : 'bg-black/50 text-gray-300 border-2 border-primary/30 hover:border-primary'
                            }`}
                          >
                            {creneau}
                          </button>
                        ))
                      ) : (
                        <p className="col-span-3 text-center text-gray-400 py-4">
                          Aucun créneau disponible ce jour-là
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {formData.discipline && formData.date && formData.heure && (
                  <div className="bg-primary/10 border border-primary/30 rounded-xl p-4 mb-6">
                    <p className="text-white font-semibold mb-2">Récapitulatif :</p>
                    <p className="text-gray-300 text-sm">
                      🥋 {formData.discipline}<br />
                      📅{' '}
                      {new Date(formData.date).toLocaleDateString('fr-FR', {
                        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
                      })}<br />
                      🕐 {formData.heure}
                    </p>
                  </div>
                )}

                <div className="flex gap-4">
                  <button
                    onClick={handleBack}
                    className="px-6 py-3 bg-black/50 hover:bg-black text-white font-semibold rounded-lg border-2 border-primary/30 transition-all"
                  >
                    ← Retour
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={!formData.date || !formData.heure}
                    className="flex-1 px-6 py-3 bg-primary hover:bg-red-700 text-white font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Continuer →
                  </button>
                </div>
              </div>
            )}

            {/* ÉTAPE 3 : Informations personnelles */}
            {etape === 3 && (
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Vos informations</h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-white font-semibold mb-2">Nom complet *</label>
                    <input
                      type="text" required value={formData.nom}
                      onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                      placeholder="Jean Dupont"
                      className="w-full bg-black/50 text-white border-2 border-primary/30 focus:border-primary rounded-xl px-4 py-3 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-semibold mb-2">Email *</label>
                    <input
                      type="email" required value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jean.dupont@email.com"
                      className="w-full bg-black/50 text-white border-2 border-primary/30 focus:border-primary rounded-xl px-4 py-3 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-semibold mb-2">Téléphone *</label>
                    <input
                      type="tel" required value={formData.tel}
                      onChange={(e) => setFormData({ ...formData, tel: e.target.value })}
                      placeholder="06 12 34 56 78"
                      className="w-full bg-black/50 text-white border-2 border-primary/30 focus:border-primary rounded-xl px-4 py-3 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-semibold mb-2">Message (optionnel)</label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Parlez-moi de vos objectifs, votre niveau, vos attentes..."
                      rows="4"
                      className="w-full bg-black/50 text-white border-2 border-primary/30 focus:border-primary rounded-xl px-4 py-3 outline-none resize-none"
                    />
                  </div>
                  <div className="flex gap-4 pt-4">
                    <button
                      type="button" onClick={handleBack}
                      className="px-6 py-3 bg-black/50 hover:bg-black text-white font-semibold rounded-lg border-2 border-primary/30 transition-all"
                    >
                      ← Retour
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-6 py-3 bg-primary hover:bg-red-700 text-white font-bold rounded-lg transition-all"
                    >
                      Procéder au paiement (90€) →
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* ÉTAPE 4 : Paiement Stripe Embedded */}
            {etape === 4 && (
              <StripeCheckout
                formData={formData}
                onBack={handleBack}
              />
            )}

          </div>

          <div className="mt-6 text-center text-gray-400 text-sm">
            <p>🔒 Paiement sécurisé par Stripe • Vos données sont protégées</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Reservation;
