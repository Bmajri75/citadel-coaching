import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { useLang } from '../context/LangContext'
import { useSEO } from '../hooks/useSEO'

const DISCIPLINES = ['MMA', 'Muay Thai', 'BJJ Gi', 'BJJ NoGi', 'Grappling', 'Musculation', 'Préparation Combat', 'Remise en forme']
const NIVEAUX     = ['Débutant', 'Intermédiaire', 'Avancé', 'Compétiteur']

export default function DemandeCoaching() {
  const { lang } = useLang()

  useSEO({
    title: 'Réserver une séance — Citadel Coaching Paris',
    description: 'Réservez votre séance de coaching privé MMA, Muay Thai ou BJJ à Paris avec Bechir. Paiement en ligne sécurisé — 90€.',
    canonical: 'https://citadel-coaching.fr/demande-coaching',
  })

  const [form, setForm] = useState({
    prenom: '', nom: '', email: '', telephone: '',
    discipline: '', ville: '', objectif: '',
    niveau: '', disponibilites: '', commentaire: '',
    consentement: false,
  })
  const [statut,    setStatut]    = useState('idle') // idle | loading | error
  const [erreurMsg, setErreurMsg] = useState('')

  function change(e) {
    const { name, value, type, checked } = e.target
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  function selectCoach(id) {
    setForm(f => ({ ...f, preferred_coach_id: f.preferred_coach_id === id ? null : id }))
  }

  async function submit(e) {
    e.preventDefault()
    if (!form.consentement) return
    setStatut('loading')
    setErreurMsg('')

    // 1. Enregistrement dans Supabase (INSERT only — pas de SELECT, RLS anonyme)
    let dbError
    try {
      const result = await supabase
        .from('coaching_requests')
        .insert([{
          prenom:             form.prenom,
          nom:                form.nom,
          email:              form.email,
          telephone:          form.telephone,
          discipline:         form.discipline,
          ville:              form.ville,
          objectif:           form.objectif,
          niveau:             form.niveau,
          disponibilites:     form.disponibilites,
          commentaire:        form.commentaire,
          consentement:       form.consentement,
          preferred_coach_id: null,
        }])
      dbError = result.error
    } catch (netErr) {
      setErreurMsg('Erreur réseau : impossible de joindre la base de données. Vérifiez votre connexion et réessayez.')
      setStatut('error')
      return
    }

    if (dbError) {
      const isNetwork = dbError.message?.toLowerCase().includes('fetch') || dbError.message?.toLowerCase().includes('network')
      const msg = isNetwork
        ? 'Erreur réseau : le serveur est temporairement inaccessible. Réessayez dans quelques minutes.'
        : `Erreur (base de données) : ${dbError.message}`
      setErreurMsg(msg)
      setStatut('error')
      return
    }

    // 2. Redirection vers Stripe Checkout
    try {
      const res  = await fetch('/api/create-checkout-session', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          nom:        `${form.prenom} ${form.nom}`,
          email:      form.email,
          tel:        form.telephone,
          discipline: form.discipline,
          ville:      form.ville,
        }),
      })
      const text = await res.text()
      if (!text) throw new Error(`Réponse vide du serveur (HTTP ${res.status}) — vérifiez api/create-checkout-session.php`)
      const data = JSON.parse(text)
      if (!res.ok) throw new Error(data.error ?? `Erreur serveur ${res.status}`)
      window.location.href = data.url
    } catch (err) {
      setErreurMsg(`Erreur (paiement) : ${err.message}`)
      setStatut('error')
    }
  }

  return (
    <main className="pt-24 pb-14 bg-zinc-950 min-h-screen">
      <div className="container-site max-w-2xl">

        <div className="text-center mb-8 md:mb-12">
          <p className="text-amber-400 font-heading uppercase tracking-widest text-sm mb-3">Citadel Coaching</p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold mb-4">Réserver une séance</h1>
          <span className="section-divider mx-auto mb-4" />
          <p className="text-zinc-400 text-sm">Remplissez ce formulaire et payez en ligne — Bechir vous contacte sous 24h.</p>
        </div>

        <form onSubmit={submit} className="flex flex-col gap-6">

          {/* Vos informations */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 flex flex-col gap-5">
            <h2 className="text-xs font-heading uppercase tracking-wide text-zinc-500">Vos informations</h2>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-heading uppercase tracking-wide text-zinc-400 mb-1.5">Prénom *</label>
                <input name="prenom" value={form.prenom} onChange={change} required
                  className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-heading uppercase tracking-wide text-zinc-400 mb-1.5">Nom *</label>
                <input name="nom" value={form.nom} onChange={change} required
                  className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors" />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-heading uppercase tracking-wide text-zinc-400 mb-1.5">Email *</label>
                <input name="email" type="email" value={form.email} onChange={change} required
                  className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-heading uppercase tracking-wide text-zinc-400 mb-1.5">Téléphone</label>
                <input name="telephone" value={form.telephone} onChange={change}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors" />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-heading uppercase tracking-wide text-zinc-400 mb-1.5">Discipline *</label>
                <select name="discipline" value={form.discipline} onChange={change} required
                  className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors">
                  <option value="">Choisir</option>
                  {DISCIPLINES.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-heading uppercase tracking-wide text-zinc-400 mb-1.5">Niveau</label>
                <select name="niveau" value={form.niveau} onChange={change}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors">
                  <option value="">Choisir</option>
                  {NIVEAUX.map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-heading uppercase tracking-wide text-zinc-400 mb-1.5">Ville / Zone *</label>
              <input name="ville" value={form.ville} onChange={change} required placeholder="Ex : Paris 17, Levallois…"
                className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors" />
            </div>

            <div>
              <label className="block text-xs font-heading uppercase tracking-wide text-zinc-400 mb-1.5">Objectif</label>
              <input name="objectif" value={form.objectif} onChange={change} placeholder="Ex : préparer un combat, perdre du poids, débuter…"
                className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors" />
            </div>

            <div>
              <label className="block text-xs font-heading uppercase tracking-wide text-zinc-400 mb-1.5">Disponibilités</label>
              <input name="disponibilites" value={form.disponibilites} onChange={change} placeholder="Ex : matin semaine, week-end…"
                className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors" />
            </div>

            <div>
              <label className="block text-xs font-heading uppercase tracking-wide text-zinc-400 mb-1.5">Message libre</label>
              <textarea name="commentaire" value={form.commentaire} onChange={change} rows={3}
                className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors resize-none" />
            </div>
          </div>

          {/* Paiement */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 flex flex-col gap-5">
            <div className="flex items-center gap-3 p-4 bg-amber-500/5 border border-amber-500/20 rounded-lg">
              <svg className="w-5 h-5 text-amber-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <div>
                <p className="text-sm font-heading font-semibold text-amber-400">Paiement sécurisé — 90€</p>
                <p className="text-xs text-zinc-500 mt-0.5">Visa · Mastercard · Amex · Powered by Stripe</p>
              </div>
            </div>

            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" name="consentement" checked={form.consentement} onChange={change}
                className="mt-0.5 accent-amber-400 w-4 h-4 flex-shrink-0" required />
              <span className="text-zinc-400 text-xs leading-relaxed">
                J'accepte que Citadel Coaching utilise mes informations pour me contacter au sujet de ma demande de coaching. Aucune donnée n'est transmise à des tiers.
              </span>
            </label>

            {statut === 'error' && (
              <p className="text-red-400 text-sm text-center">
                {erreurMsg || 'Une erreur est survenue. Réessayez ou contactez-nous directement.'}
              </p>
            )}

            <button type="submit" disabled={statut === 'loading' || !form.consentement}
              className="btn-primary py-4 text-base font-heading disabled:opacity-50 disabled:cursor-not-allowed">
              {statut === 'loading' ? 'Enregistrement…' : 'Réserver et payer — 90€'}
            </button>

            <p className="text-zinc-600 text-xs text-center">Bechir vous contacte sous 24h · Paris & IDF</p>
          </div>

        </form>
      </div>
    </main>
  )
}
