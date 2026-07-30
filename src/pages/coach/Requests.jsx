import { useEffect, useState } from 'react'
import CoachLayout from '../../components/CoachLayout'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../context/AuthContext'

export default function CoachRequests() {
  const { user }   = useAuth()
  const [demandes, setDemandes] = useState([])
  const [loading,  setLoading]  = useState(true)
  const [saving,   setSaving]   = useState(null)

  async function charger() {
    if (!user) return

    // Récupérer coaches.id (≠ auth.uid())
    const { data: coachProfile } = await supabase
      .from('coaches')
      .select('id')
      .eq('user_id', user.id)
      .single()

    if (!coachProfile) { setLoading(false); return }

    const { data } = await supabase
      .from('request_assignments')
      .select('*, coaching_requests(*)')
      .eq('coach_id', coachProfile.id)
      .order('assigned_at', { ascending: false })

    setDemandes(data ?? [])
    setLoading(false)
  }

  useEffect(() => { charger() }, [user])

  async function repondre(assignmentId, requestId, response, note) {
    setSaving(assignmentId)
    await supabase.from('request_assignments').update({
      coach_response: response,
      coach_note:     note,
      responded_at:   new Date().toISOString(),
    }).eq('id', assignmentId)

    await supabase.from('coaching_requests').update({
      statut: response === 'accepted' ? 'acceptee_coach' : 'refusee_coach',
    }).eq('id', requestId)

    setSaving(null)
    await charger()
  }

  return (
    <CoachLayout>
      <div className="p-8">
        <h1 className="text-2xl font-heading font-bold mb-8">Mes demandes</h1>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : demandes.length === 0 ? (
          <p className="text-zinc-500 text-sm">Aucune demande reçue pour le moment.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {demandes.map(a => <DemandeCard key={a.id} assignment={a} onRepondre={repondre} saving={saving === a.id} />)}
          </div>
        )}
      </div>
    </CoachLayout>
  )
}

function DemandeCard({ assignment: a, onRepondre, saving }) {
  const d = a.coaching_requests
  const [note, setNote] = useState('')
  if (!d) return null

  const enAttente = !a.coach_response

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <h3 className="font-heading font-bold text-lg">{d.prenom} {d.nom}</h3>
          <p className="text-zinc-400 text-sm">{d.discipline} · {d.ville} · {d.niveau}</p>
        </div>
        <span className={`text-xs font-semibold px-2 py-0.5 rounded border flex-shrink-0 ${
          a.coach_response === 'accepted' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
          a.coach_response === 'refused'  ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                                            'bg-amber-500/10 text-amber-400 border-amber-500/20'
        }`}>
          {a.coach_response === 'accepted' ? 'Acceptée' : a.coach_response === 'refused' ? 'Refusée' : 'En attente'}
        </span>
      </div>

      <div className="grid sm:grid-cols-2 gap-3 mb-4 text-sm">
        {[['Objectif', d.objectif], ['Disponibilités', d.disponibilites], ['Email', d.email], ['Téléphone', d.telephone]].map(([label, val]) => val && (
          <div key={label}>
            <span className="text-zinc-500 text-xs">{label} </span>
            <span className="text-zinc-300">{val}</span>
          </div>
        ))}
      </div>

      {d.commentaire && (
        <p className="text-zinc-400 text-sm italic mb-4 border-l-2 border-zinc-700 pl-3">"{d.commentaire}"</p>
      )}

      {enAttente && (
        <div className="border-t border-zinc-800 pt-4">
          <textarea value={note} onChange={e => setNote(e.target.value)} placeholder="Note optionnelle pour l'admin…" rows={2}
            className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500 resize-none mb-3" />
          <div className="flex gap-3">
            <button onClick={() => onRepondre(a.id, d.id, 'accepted', note)} disabled={saving}
              className="flex-1 bg-green-600 hover:bg-green-500 text-white text-sm py-2.5 rounded font-semibold transition-colors disabled:opacity-50">
              {saving ? 'Envoi…' : 'Accepter'}
            </button>
            <button onClick={() => onRepondre(a.id, d.id, 'refused', note)} disabled={saving}
              className="flex-1 bg-zinc-700 hover:bg-zinc-600 text-white text-sm py-2.5 rounded font-semibold transition-colors disabled:opacity-50">
              {saving ? 'Envoi…' : 'Refuser'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
