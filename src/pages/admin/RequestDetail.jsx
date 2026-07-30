import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import AdminLayout from '../../components/AdminLayout'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../context/AuthContext'

const STATUTS_SUIVANTS = {
  nouvelle_demande: ['envoyee_coach', 'refusee_admin', 'annulee'],
  envoyee_coach:    ['refusee_admin', 'annulee'],
  acceptee_coach:   ['confirmee', 'refusee_admin', 'annulee'],
  refusee_coach:    ['envoyee_coach', 'refusee_admin', 'annulee'],
  confirmee:        ['realisee', 'annulee'],
  realisee:         [],
  annulee:          [],
  refusee_admin:    [],
}

export default function RequestDetail() {
  const { id }       = useParams()
  const navigate     = useNavigate()
  const { user }     = useAuth()
  const [demande,  setDemande]  = useState(null)
  const [coachs,   setCoachs]   = useState([])
  const [assignment, setAssignment] = useState(null)
  const [note,     setNote]     = useState('')
  const [loading,  setLoading]  = useState(true)
  const [saving,   setSaving]   = useState(false)

  async function charger() {
    const [{ data: d }, { data: c }, { data: a }] = await Promise.all([
      supabase.from('coaching_requests').select('*').eq('id', id).single(),
      supabase.from('coaches').select('id, prenom, nom, user_id').eq('is_published', true),
      supabase.from('request_assignments').select('*, coaches(prenom, nom)').eq('request_id', id).order('assigned_at', { ascending: false }).limit(1).single(),
    ])
    setDemande(d)
    setCoachs(c ?? [])
    setAssignment(a ?? null)
    setLoading(false)
  }

  useEffect(() => { charger() }, [id])

  async function changerStatut(newStatut) {
    setSaving(true)
    await supabase.from('request_status_history').insert([{
      request_id: id, old_status: demande.statut,
      new_status: newStatut, changed_by: user.id, note,
    }])
    await supabase.from('coaching_requests').update({ statut: newStatut }).eq('id', id)
    setNote('')
    await charger()
    setSaving(false)
  }

  async function attribuerCoach(coachId) {
    setSaving(true)
    await supabase.from('request_assignments').insert([{
      request_id: id, coach_id: coachId, assigned_by: user.id,
    }])
    await changerStatut('envoyee_coach')
    setSaving(false)
  }

  if (loading) return (
    <AdminLayout>
      <div className="flex justify-center py-20">
        <div className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
      </div>
    </AdminLayout>
  )

  if (!demande) return <AdminLayout><p className="p-8 text-zinc-500">Demande introuvable.</p></AdminLayout>

  const statutsSuivants = STATUTS_SUIVANTS[demande.statut] ?? []

  async function supprimerDemande() {
    if (!window.confirm(`Supprimer définitivement la demande de ${demande.prenom} ${demande.nom} ?`)) return
    const { error } = await supabase.from('coaching_requests').delete().eq('id', id)
    if (error) { alert('Erreur suppression : ' + error.message); return }
    navigate('/admin/demandes')
  }

  return (
    <AdminLayout>
      <div className="p-8 max-w-3xl">
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => navigate('/admin/demandes')} className="text-zinc-500 hover:text-white text-sm flex items-center gap-1">
            ← Retour
          </button>
          <button onClick={supprimerDemande}
            className="text-xs text-red-400 hover:text-red-300 border border-red-900 hover:border-red-700 px-3 py-1.5 rounded transition-colors">
            Supprimer la demande
          </button>
        </div>

        <h1 className="text-2xl font-heading font-bold mb-2">{demande.prenom} {demande.nom}</h1>
        <p className="text-zinc-500 text-sm mb-8">Demande reçue le {new Date(demande.created_at).toLocaleDateString('fr-FR')}</p>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-5">
            <h2 className="text-xs font-heading uppercase tracking-wide text-zinc-500 mb-4">Informations client</h2>
            {[
              ['Email', demande.email],
              ['Téléphone', demande.telephone],
              ['Discipline', demande.discipline],
              ['Niveau', demande.niveau],
              ['Ville', demande.ville],
              ['Objectif', demande.objectif],
              ['Disponibilités', demande.disponibilites],
            ].map(([label, val]) => val && (
              <div key={label} className="flex gap-3 mb-2.5">
                <span className="text-zinc-500 text-xs w-28 flex-shrink-0 pt-0.5">{label}</span>
                <span className="text-sm text-white">{val}</span>
              </div>
            ))}
            {demande.commentaire && (
              <div className="mt-3 pt-3 border-t border-zinc-800">
                <p className="text-zinc-500 text-xs mb-1">Message</p>
                <p className="text-sm text-zinc-300">{demande.commentaire}</p>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-4">
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-5">
              <h2 className="text-xs font-heading uppercase tracking-wide text-zinc-500 mb-3">Statut actuel</h2>
              <span className="text-sm font-semibold text-amber-400">{demande.statut?.replace(/_/g, ' ')}</span>

              {assignment && (
                <div className="mt-3 pt-3 border-t border-zinc-800">
                  <p className="text-zinc-500 text-xs mb-1">Coach attribué</p>
                  <p className="text-sm text-white">{assignment.coaches?.prenom} {assignment.coaches?.nom}</p>
                  {assignment.coach_response && (
                    <p className="text-xs mt-1">
                      Réponse : <span className={assignment.coach_response === 'accepted' ? 'text-green-400' : 'text-red-400'}>
                        {assignment.coach_response === 'accepted' ? 'Acceptée' : 'Refusée'}
                      </span>
                    </p>
                  )}
                  {assignment.coach_note && <p className="text-xs text-zinc-400 mt-1">"{assignment.coach_note}"</p>}
                </div>
              )}
            </div>

            {demande.statut === 'nouvelle_demande' && coachs.length > 0 && (
              <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-5">
                <h2 className="text-xs font-heading uppercase tracking-wide text-zinc-500 mb-3">Attribuer à un coach</h2>
                <div className="flex flex-col gap-2">
                  {coachs.map(c => (
                    <button key={c.id} onClick={() => attribuerCoach(c.id)} disabled={saving}
                      className="text-left text-sm px-3 py-2 bg-zinc-800 hover:bg-zinc-700 rounded transition-colors disabled:opacity-50">
                      {c.prenom} {c.nom}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {statutsSuivants.length > 0 && (
              <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-5">
                <h2 className="text-xs font-heading uppercase tracking-wide text-zinc-500 mb-3">Changer le statut</h2>
                <textarea value={note} onChange={e => setNote(e.target.value)} placeholder="Note optionnelle…" rows={2}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500 resize-none mb-3" />
                <div className="flex flex-col gap-2">
                  {statutsSuivants.map(s => (
                    <button key={s} onClick={() => changerStatut(s)} disabled={saving}
                      className="text-sm px-3 py-2 bg-zinc-800 hover:bg-amber-500/10 hover:text-amber-400 hover:border-amber-500/30 border border-transparent rounded transition-colors text-left disabled:opacity-50">
                      → {s.replace(/_/g, ' ')}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
