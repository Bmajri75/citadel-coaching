import { Link } from 'react-router-dom'
import { useLang } from '../context/LangContext'

const TEXTS = {
  fr: {
    surtitre: 'Transparent et sans surprise',
    titre:    'Tarifs',
    zone:     'Paris & Île-de-France',
    lignes: [
      { service: 'Séance privée',          tarif: '90€ / heure',            detail: 'Sur rendez-vous, 7j/7' },
      { service: 'Déplacement',            tarif: 'Selon la distance',       detail: 'Le coach se déplace chez vous ou en salle' },
      { service: 'Stage',                  tarif: 'Sur devis',               detail: 'Groupes, clubs, entreprises' },
      { service: 'Coaching international', tarif: 'Sur demande',             detail: 'Déplacements possibles à l\'étranger' },
    ],
    note: '* Paiement sécurisé en ligne via Stripe — Visa, Mastercard, Amex',
    cta:  'Réserver une séance',
  },
  en: {
    surtitre: 'Transparent, no surprises',
    titre:    'Pricing',
    zone:     'Paris & Île-de-France',
    lignes: [
      { service: 'Private session',        tarif: '€90 / hour',              detail: 'By appointment, 7 days/week' },
      { service: 'Travel to you',          tarif: 'Distance-based',          detail: 'Coach comes to your location or gym' },
      { service: 'Training camp',          tarif: 'Custom quote',            detail: 'Groups, clubs, corporate events' },
      { service: 'International coaching', tarif: 'On request',              detail: 'Available for international travel' },
    ],
    note: '* Secure online payment via Stripe — Visa, Mastercard, Amex',
    cta:  'Book a session',
  },
}

export default function Tarifs() {
  const { lang } = useLang()
  const tx       = TEXTS[lang]

  return (
    <section id="tarifs" className="py-12 md:py-20 bg-zinc-950">
      <div className="container-site max-w-3xl">

        <div className="text-center mb-6 md:mb-10">
          <p className="text-amber-400 font-heading uppercase tracking-widest text-sm mb-2">{tx.surtitre}</p>
          <h2 className="section-title">{tx.titre}</h2>
          <span className="section-divider mx-auto" />
          <p className="text-zinc-400 text-sm mt-3">{tx.zone}</p>
        </div>

        <div
          className="p-px rounded"
          style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #78350f 50%, #f59e0b 100%)' }}
        >
          <div className="bg-zinc-900 rounded overflow-hidden">
            {tx.lignes.map((l, i) => (
              <div
                key={l.service}
                className={`grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-0 p-4 sm:p-6 items-center ${
                  i < tx.lignes.length - 1 ? 'border-b border-zinc-800' : ''
                } ${i === 0 ? 'bg-amber-500/5' : ''}`}
              >
                <p className={`font-heading uppercase tracking-wide text-sm ${i === 0 ? 'text-amber-400' : 'text-white'}`}>
                  {l.service}
                </p>
                <p className={`font-heading font-bold text-xl sm:text-center ${i === 0 ? 'text-amber-400' : 'text-white'}`}>
                  {l.tarif}
                </p>
                <p className="text-zinc-400 text-sm sm:text-right">{l.detail}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-zinc-600 text-xs text-center mt-4">{tx.note}</p>

        <div className="text-center mt-6 md:mt-8">
          <Link to="/demande-coaching" className="btn-primary">{tx.cta}</Link>
        </div>
      </div>
    </section>
  )
}
