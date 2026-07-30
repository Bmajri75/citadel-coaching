import { useEffect, useState } from 'react'
import CoachLayout from '../../components/CoachLayout'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../context/AuthContext'

const DISCIPLINES = ['mma', 'muay_thai', 'bjj', 'musculation']
const DISCIPLINES_LABEL = { mma: 'MMA', muay_thai: 'Muay Thai', bjj: 'BJJ', musculation: 'Musculation' }

export default function CoachProfile() {
  const { user } = useAuth()
  const [profil,  setProfil]  = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving,  setSaving]  = useState(false)
  const [msg,     setMsg]     = useState('')

  useEffect(() => {
    if (!user) return
    supabase.from('coaches').select('*').eq('user_id', user.id).single()
      .then(({ data }) => { setProfil(data ?? {}); setLoading(false) })
  }, [user])

  function change(e) {
    const { name, value } = e.target
    setProfil(p => ({ ...p, [name]: value }))
  }

  function toggleDisc(disc) {
    setProfil(p => {
      const current = p.disciplines_sec ?? []
      return {
        ...p,
        disciplines_sec: current.includes(disc)
          ? current.filter(d => d !== disc)
          : [...current, disc],
      }
    })
  }

  async function sauvegarder(e) {
    e.preventDefault()
    setSaving(true)
    setMsg('')
    const { error } = await supabase.from('coaches').update({
      prenom:                profil.prenom,
      nom:                   profil.nom,
      bio:                   profil.bio,
      discipline_principale: profil.discipline_principale,
      disciplines_sec:       profil.disciplines_sec ?? [],
      zones:                 profil.zones ? profil.zones.split(',').map(z => z.trim()).filter(Boolean) : [],
      experience:            profil.experience,
      diplome:               profil.diplome,
      updated_at:            new Date().toISOString(),
    }).eq('user_id', user.id)
    setSaving(false)
    setMsg(error ? 'Erreur lors de la sauvegarde.' : 'Profil sauvegardé.')
    setTimeout(() => setMsg(''), 3000)
  }

  if (loading) return (
    <CoachLayout>
      <div className="flex justify-center py-20">
        <div className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
      </div>
    </CoachLayout>
  )

  const zonesStr = Array.isArray(profil?.zones) ? profil.zones.join(', ') : (profil?.zones ?? '')

  return (
    <CoachLayout>
      <div className="p-8 max-w-2xl">
        <h1 className="text-2xl font-heading font-bold mb-2">Mon profil</h1>
        <p className="text-zinc-500 text-sm mb-8">Ces informations seront visibles publiquement après validation par l'admin.</p>

        <form onSubmit={sauvegarder} className="flex flex-col gap-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 flex flex-col gap-4">
            <h2 className="text-xs font-heading uppercase tracking-wide text-zinc-500 mb-1">Identité</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[['Prénom', 'prenom'], ['Nom', 'nom']].map(([label, name]) => (
                <div key={name}>
                  <label className="block text-xs text-zinc-400 mb-1.5">{label}</label>
                  <input name={name} value={profil?.[name] ?? ''} onChange={change}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors" />
                </div>
              ))}
            </div>
            <div>
              <label className="block text-xs text-zinc-400 mb-1.5">Bio (visible sur votre fiche)</label>
              <textarea name="bio" value={profil?.bio ?? ''} onChange={change} rows={4}
                className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors resize-none" />
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 flex flex-col gap-4">
            <h2 className="text-xs font-heading uppercase tracking-wide text-zinc-500 mb-1">Disciplines</h2>
            <div>
              <label className="block text-xs text-zinc-400 mb-1.5">Discipline principale</label>
              <select name="discipline_principale" value={profil?.discipline_principale ?? ''} onChange={change}
                className="bg-zinc-800 border border-zinc-700 rounded px-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500">
                <option value="">Choisir</option>
                {DISCIPLINES.map(d => <option key={d} value={d}>{DISCIPLINES_LABEL[d]}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs text-zinc-400 mb-2">Disciplines secondaires</label>
              <div className="flex gap-2 flex-wrap">
                {DISCIPLINES.map(d => (
                  <button type="button" key={d} onClick={() => toggleDisc(d)}
                    className={`text-xs px-3 py-1.5 rounded border transition-colors ${
                      (profil?.disciplines_sec ?? []).includes(d)
                        ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                        : 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:border-zinc-500'
                    }`}>
                    {DISCIPLINES_LABEL[d]}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 flex flex-col gap-4">
            <h2 className="text-xs font-heading uppercase tracking-wide text-zinc-500 mb-1">Expérience & Zones</h2>
            {[['Diplôme', 'diplome', 'Ex : BPJEPS Sports de Contact'], ['Expérience', 'experience', 'Ex : 10 ans en coaching MMA'], ['Zones (séparées par des virgules)', 'zones', 'Ex : Paris, Levallois, Neuilly']].map(([label, name, ph]) => (
              <div key={name}>
                <label className="block text-xs text-zinc-400 mb-1.5">{label}</label>
                <input name={name} value={name === 'zones' ? zonesStr : (profil?.[name] ?? '')} onChange={change} placeholder={ph}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors" />
              </div>
            ))}
          </div>

          {msg && <p className={`text-sm ${msg.includes('Erreur') ? 'text-red-400' : 'text-green-400'}`}>{msg}</p>}

          <button type="submit" disabled={saving}
            className="btn-primary py-3 text-base disabled:opacity-50 disabled:cursor-not-allowed">
            {saving ? 'Sauvegarde…' : 'Sauvegarder mon profil'}
          </button>
        </form>
      </div>
    </CoachLayout>
  )
}
