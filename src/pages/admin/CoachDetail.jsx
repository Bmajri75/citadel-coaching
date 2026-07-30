import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import AdminLayout from '../../components/AdminLayout'
import { supabase } from '../../lib/supabase'

const STATUTS_VERIF = ['en_attente', 'verifie', 'expire', 'suspendu']

export default function CoachDetail() {
  const { id }    = useParams()
  const navigate  = useNavigate()
  const [coach,   setCoach]   = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving,  setSaving]  = useState(false)
  const [msg,     setMsg]     = useState('')

  useEffect(() => {
    supabase.from('coaches').select('*').eq('id', id).single()
      .then(({ data }) => { setCoach(data); setLoading(false) })
  }, [id])

  async function sauvegarder(champs) {
    setSaving(true)
    setMsg('')
    const { error } = await supabase.from('coaches').update({ ...champs, updated_at: new Date().toISOString() }).eq('id', id)
    setSaving(false)
    setMsg(error ? 'Erreur lors de la sauvegarde.' : 'Sauvegardé.')
    if (!error) setCoach(c => ({ ...c, ...champs }))
    setTimeout(() => setMsg(''), 2500)
  }

  if (loading) return (
    <AdminLayout>
      <div className="flex justify-center py-20">
        <div className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
      </div>
    </AdminLayout>
  )

  if (!coach) return <AdminLayout><p className="p-8 text-zinc-500">Coach introuvable.</p></AdminLayout>

  async function supprimerCoach() {
    if (!window.confirm(`Supprimer définitivement le compte de ${coach.prenom ?? ''} ${coach.nom ?? ''} ?`)) return
    const { error } = await supabase.from('coaches').delete().eq('id', id)
    if (error) { alert('Erreur suppression : ' + error.message); return }
    navigate('/admin/coachs')
  }

  return (
    <AdminLayout>
      <div className="p-8 max-w-2xl">
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => navigate('/admin/coachs')} className="text-zinc-500 hover:text-white text-sm flex items-center gap-1">
            ← Retour
          </button>
          <button onClick={supprimerCoach}
            className="text-xs text-red-400 hover:text-red-300 border border-red-900 hover:border-red-700 px-3 py-1.5 rounded transition-colors">
            Supprimer le coach
          </button>
        </div>

        <div className="flex items-center gap-5 mb-6">
          <div className="w-16 h-16 rounded-full overflow-hidden bg-zinc-800 border border-zinc-700 flex-shrink-0">
            {coach.photo_url
              ? <img src={coach.photo_url} alt="" className="w-full h-full object-cover" />
              : <div className="w-full h-full flex items-center justify-center text-zinc-400 text-2xl font-bold">{coach.prenom?.[0] ?? '?'}</div>
            }
          </div>
          <h1 className="text-2xl font-heading font-bold">{coach.prenom ?? '—'} {coach.nom ?? ''}</h1>
        </div>

        <div className="flex flex-col gap-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
            <h2 className="text-xs font-heading uppercase tracking-wide text-zinc-500 mb-4">Vérification & Publication</h2>
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-xs text-zinc-400 mb-1.5">Statut de vérification</label>
                <select value={coach.statut_verification} onChange={e => setCoach(c => ({ ...c, statut_verification: e.target.value }))}
                  className="bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500">
                  {STATUTS_VERIF.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs text-zinc-400 mb-1.5">Numéro carte professionnelle</label>
                <input value={coach.num_carte_pro ?? ''} onChange={e => setCoach(c => ({ ...c, num_carte_pro: e.target.value }))}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500" />
              </div>
              <div>
                <label className="block text-xs text-zinc-400 mb-1.5">Expiration carte pro</label>
                <input type="date" value={coach.expiration_carte_pro ?? ''} onChange={e => setCoach(c => ({ ...c, expiration_carte_pro: e.target.value }))}
                  className="bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500" />
              </div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={coach.is_published} onChange={e => setCoach(c => ({ ...c, is_published: e.target.checked }))}
                  className="accent-amber-400 w-4 h-4" />
                <span className="text-sm text-zinc-300">Publier le profil publiquement</span>
              </label>
              <button onClick={() => sauvegarder({
                statut_verification: coach.statut_verification,
                num_carte_pro: coach.num_carte_pro,
                expiration_carte_pro: coach.expiration_carte_pro,
                is_published: coach.is_published,
              })} disabled={saving}
                className="btn-primary py-2.5 text-sm disabled:opacity-50">
                {saving ? 'Sauvegarde…' : 'Sauvegarder'}
              </button>
              {msg && <p className={`text-sm ${msg.includes('Erreur') ? 'text-red-400' : 'text-green-400'}`}>{msg}</p>}
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
            <h2 className="text-xs font-heading uppercase tracking-wide text-zinc-500 mb-4">Profil public</h2>
            <div className="flex flex-col gap-3">
              {[
                ['Prénom', 'prenom'], ['Nom', 'nom'], ['Bio', 'bio'],
                ['Diplôme', 'diplome'], ['Expérience', 'experience'],
              ].map(([label, key]) => (
                <div key={key}>
                  <label className="block text-xs text-zinc-400 mb-1">{label}</label>
                  {key === 'bio' ? (
                    <textarea value={coach[key] ?? ''} onChange={e => setCoach(c => ({ ...c, [key]: e.target.value }))} rows={3}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500 resize-none" />
                  ) : (
                    <input value={coach[key] ?? ''} onChange={e => setCoach(c => ({ ...c, [key]: e.target.value }))}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500" />
                  )}
                </div>
              ))}
              <button onClick={() => sauvegarder({ prenom: coach.prenom, nom: coach.nom, bio: coach.bio, diplome: coach.diplome, experience: coach.experience })}
                disabled={saving} className="btn-primary py-2.5 text-sm disabled:opacity-50">
                {saving ? 'Sauvegarde…' : 'Sauvegarder le profil'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
