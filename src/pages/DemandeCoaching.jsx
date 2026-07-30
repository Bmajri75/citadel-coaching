import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { useLang } from '../context/LangContext'
import { useSEO } from '../hooks/useSEO'

const DISCIPLINES = ['MMA', 'Muay Thai', 'BJJ Gi', 'BJJ NoGi', 'Grappling', 'Musculation', 'Préparation Combat', 'Remise en forme']
const NIVEAUX     = ['Débutant', 'Intermédiaire', 'Avancé', 'Compétiteur']

export default function DemandeCoaching() {
  const { lang } = useLang()

  useSEO({
    title: 'Demande de Coaching — Citadel Coaching Paris',
    description: 'Faites votre demande de coaching MMA, Muay Thai ou BJJ à Paris. Un coach certifié vous contacte sous 24h.',
    canonical: 'https://citadel-coaching.fr/demande-coaching',
  })

  const [form, setForm] = useState({
    prenom: '', nom: '', email: '', telephone: '',
    discipline: '', ville: '', objectif: '',
    niveau: '', disponibilites: '', commentaire: '',
    consentement: false,
  })
  const [statut, setStatut] = useState('idle') // idle | loading | success | error

  function change(e) {
    const { name, value, type, checked } = e.target
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  async function submit(e) {
    e.preventDefault()
    if (!form.consentement) return
    setStatut('loading')

    const { error } = await supabase.from('coaching_requests').insert([{
      prenom:       form.prenom,
      nom:          form.nom,
      email:        form.email,
      telephone:    form.telephone,
      discipline:   form.discipline,
      ville:        form.ville,
      objectif:     form.objectif,
      niveau:       form.niveau,
      disponibilites: form.disponibilites,
      commentaire:  form.commentaire,
      consentement: form.consentement,
    }])

    setStatut(error ? 'error' : 'success')
  }

  if (statut === 'success') return (
    <main className="pt-28 pb-20 bg-zinc-950 min-h-screen flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="w-16 h-16 bg-amber-400/10 border border-amber-400/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-2xl font-heading font-bold mb-3">Demande reçue</h1>
        <p className="text-zinc-400 leading-relaxed">Votre demande a bien été enregistrée. L'équipe Citadel Coaching vous contacte dans les 24h pour confirmer votre séance.</p>
      </div>
    </main>
  )

  return (
    <main className="pt-28 pb-20 bg-zinc-950 min-h-screen">
      <div className="container-site max-w-2xl">

        <div className="text-center mb-12">
          <p className="text-amber-400 font-heading uppercase tracking-widest text-sm mb-3">Collectif Citadel</p>
          <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">Demande de Coaching</h1>
          <span className="section-divider mx-auto mb-4" />
          <p className="text-zinc-400 text-sm">Remplissez ce formulaire. Un coach certifié vous est attribué sous 24h.</p>
        </div>

        <form onSubmit={submit} className="bg-zinc-900 border border-zinc-800 rounded-lg p-8 flex flex-col gap-5">

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

          <label className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" name="consentement" checked={form.consentement} onChange={change}
              className="mt-0.5 accent-amber-400 w-4 h-4 flex-shrink-0" required />
            <span className="text-zinc-400 text-xs leading-relaxed">
              J'accepte que Citadel Coaching utilise mes informations pour me contacter au sujet de ma demande de coaching. Aucune donnée n'est transmise à des tiers.
            </span>
          </label>

          {statut === 'error' && (
            <p className="text-red-400 text-sm text-center">Une erreur est survenue. Réessayez ou contactez-nous directement.</p>
          )}

          <button type="submit" disabled={statut === 'loading' || !form.consentement}
            className="btn-primary py-3.5 text-base font-heading disabled:opacity-50 disabled:cursor-not-allowed">
            {statut === 'loading' ? 'Envoi en cours…' : 'Envoyer ma demande'}
          </button>

          <p className="text-zinc-600 text-xs text-center">Réponse sous 24h · 90€ / séance · Paris & IDF</p>
        </form>
      </div>
    </main>
  )
}
