// Formulaire de réservation d'une séance privée
// Au submit : appelle /api/create-checkout-session → redirige vers Stripe Checkout
// Quand la date change : appelle /api/available-slots pour masquer les créneaux déjà pris
import { useState, useEffect } from 'react'
import { useLang } from '../context/LangContext'

const TOUS_CRENEAUX = ['08:00', '09:00', '14:00', '15:00', '16:00']

const TEXTS = {
  fr: {
    surtitre:    'Paiement sécurisé via Stripe',
    titre:       'Réserver une Séance',
    sous:        '70€ / 1h · 7j/7 · Paris & IDF',
    disciplines: ['MMA', 'Muay Thai', 'BJJ Gi', 'BJJ NoGi', 'Grappling', 'Préparation Combat', 'Stage', 'Remise en forme'],
    labels: {
      nom:        'Nom complet *',
      email:      'Email *',
      tel:        'Téléphone',
      discipline: 'Discipline / Objectif *',
      date:       'Date souhaitée *',
      heure:      'Créneau *',
      discChoix:  'Choisir une discipline',
      heureChoix: 'Choisir un créneau',
      complet:    'Complet',
      nomPh:      'Jean Dupont',
      emailPh:    'jean@exemple.fr',
      telPh:      '06 12 34 56 78',
    },
    btnPayant: 'Payer 70€ et confirmer la séance',
    btnCharge: 'Redirection vers le paiement…',
    securite:  'Paiement 100% sécurisé · Visa, Mastercard, Amex · Powered by Stripe',
  },
  en: {
    surtitre:    'Secure payment via Stripe',
    titre:       'Book a Session',
    sous:        '€70 / 1h · 7 days/week · Paris & IDF',
    disciplines: ['MMA', 'Muay Thai', 'BJJ Gi', 'BJJ NoGi', 'Grappling', 'Fight Preparation', 'Training Camp', 'Fitness'],
    labels: {
      nom:        'Full name *',
      email:      'Email *',
      tel:        'Phone',
      discipline: 'Discipline / Goal *',
      date:       'Preferred date *',
      heure:      'Time slot *',
      discChoix:  'Choose a discipline',
      heureChoix: 'Choose a time slot',
      complet:    'Fully booked',
      nomPh:      'John Doe',
      emailPh:    'john@example.com',
      telPh:      '+44 7123 456789',
    },
    btnPayant: 'Pay €70 and confirm',
    btnCharge: 'Redirecting to payment…',
    securite:  '100% secure payment · Visa, Mastercard, Amex · Powered by Stripe',
  },
}

function dateMini() {
  const d = new Date()
  d.setDate(d.getDate() + 1)
  return d.toISOString().split('T')[0]
}

export default function ReservationForm() {
  const { lang }                        = useLang()
  const tx                              = TEXTS[lang]
  const [form, setForm]                 = useState({ nom: '', email: '', tel: '', discipline: '', date: '', heure: '' })
  const [chargement, setChargement]     = useState(false)
  const [erreur, setErreur]             = useState('')
  const [creneauxPris, setCreneauxPris] = useState([])
  const [chargSlots, setChargSlots]     = useState(false)

  // Quand la date change, on récupère les créneaux déjà réservés
  useEffect(() => {
    if (!form.date) { setCreneauxPris([]); return }
    setChargSlots(true)
    setForm(f => ({ ...f, heure: '' })) // reset le créneau sélectionné
    fetch(`/api/available-slots?date=${form.date}`)
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (data?.reserves) setCreneauxPris(data.reserves)
        else setCreneauxPris([])
      })
      .catch(() => setCreneauxPris([]))
      .finally(() => setChargSlots(false))
  }, [form.date])

  const changer = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const soumettre = async (e) => {
    e.preventDefault()
    setErreur('')
    setChargement(true)
    try {
      const res  = await fetch('/api/create-checkout-session', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Une erreur est survenue.')
      window.location.href = data.url
    } catch (err) {
      setErreur(err.message)
      setChargement(false)
    }
  }

  const inputClass = "bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-600 px-4 py-3 text-sm focus:outline-none focus:border-amber-500 transition-colors"
  const labelClass = "text-zinc-400 text-xs uppercase tracking-wide font-heading"

  return (
    <section id="reservation" className="py-20 bg-zinc-950">
      <div className="container-site max-w-2xl">

        <div className="text-center mb-10">
          <p className="text-amber-400 font-heading uppercase tracking-widest text-sm mb-2">{tx.surtitre}</p>
          <h2 className="section-title">{tx.titre}</h2>
          <span className="section-divider mx-auto" />
          <p className="text-zinc-400 text-sm mt-2">{tx.sous}</p>
        </div>

        <form onSubmit={soumettre} className="card p-6 sm:p-8 flex flex-col gap-5">

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className={labelClass}>{tx.labels.nom}</label>
              <input type="text" name="nom" value={form.nom} onChange={changer} required placeholder={tx.labels.nomPh} className={inputClass} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className={labelClass}>{tx.labels.email}</label>
              <input type="email" name="email" value={form.email} onChange={changer} required placeholder={tx.labels.emailPh} className={inputClass} />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>{tx.labels.tel}</label>
            <input type="tel" name="tel" value={form.tel} onChange={changer} placeholder={tx.labels.telPh} className={inputClass} />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>{tx.labels.discipline}</label>
            <select name="discipline" value={form.discipline} onChange={changer} required className={inputClass}>
              <option value="">{tx.labels.discChoix}</option>
              {tx.disciplines.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className={labelClass}>{tx.labels.date}</label>
              <input type="date" name="date" value={form.date} onChange={changer} required min={dateMini()} className={inputClass} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className={labelClass}>
                {tx.labels.heure}
                {chargSlots && <span className="text-zinc-600 ml-2 text-xs">chargement…</span>}
              </label>
              <select name="heure" value={form.heure} onChange={changer} required disabled={!form.date || chargSlots} className={`${inputClass} disabled:opacity-50`}>
                <option value="">{form.date ? tx.labels.heureChoix : '— choisir une date d\'abord —'}</option>
                {TOUS_CRENEAUX.map(h => {
                  const pris = creneauxPris.includes(h)
                  return (
                    <option key={h} value={h} disabled={pris}>
                      {h}{pris ? ` — ${tx.labels.complet}` : ''}
                    </option>
                  )
                })}
              </select>
            </div>
          </div>

          {erreur && (
            <p className="text-red-400 text-sm border border-red-800 bg-red-950/50 px-4 py-3">⚠ {erreur}</p>
          )}

          <button type="submit" disabled={chargement} className="btn-primary w-full text-center py-4 text-base disabled:opacity-50 disabled:cursor-not-allowed">
            {chargement ? tx.btnCharge : tx.btnPayant}
          </button>

          <p className="text-center text-zinc-600 text-xs">{tx.securite}</p>
        </form>
      </div>
    </section>
  )
}
