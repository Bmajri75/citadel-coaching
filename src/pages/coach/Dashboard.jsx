import { useEffect, useState } from 'react'
import CoachLayout from '../../components/CoachLayout'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const COULEURS = {
  envoyee_coach:  'bg-amber-500/10 text-amber-400 border-amber-500/20',
  acceptee_coach: 'bg-green-500/10 text-green-400 border-green-500/20',
  refusee_coach:  'bg-red-500/10 text-red-400 border-red-500/20',
  confirmee:      'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  realisee:       'bg-zinc-500/10 text-zinc-400 border-zinc-500/20',
}

export default function CoachDashboard() {
  const { user }   = useAuth()
  const navigate   = useNavigate()
  const [demandes, setDemandes] = useState([])
  const [profil,   setProfil]   = useState(null)
  const [loading,  setLoading]  = useState(true)

  useEffect(() => {
    if (!user) return
    Promise.all([
      supabase.from('coaches').select('prenom, nom, statut_verification, is_published').eq('user_id', user.id).single(),
      supabase.from('request_assignments')
        .select('*, coaching_requests(*)')
        .eq('coach_id', user.id)
        .order('assigned_at', { ascending: false })
        .limit(5),
    ]).then(([{ data: p }, { data: d }]) => {
      setProfil(p)
      setDemandes(d ?? [])
      setLoading(false)
    })
  }, [user])

  return (
    <CoachLayout>
      <div className="p-8">
        <h1 className="text-2xl font-heading font-bold mb-2">
          Bonjour {profil?.prenom ?? ''} 👋
        </h1>
        <p className="text-zinc-500 text-sm mb-8">Bienvenue dans votre espace Citadel Coaching.</p>

        {profil && (
          <div className={`rounded-lg p-4 mb-8 border text-sm ${
            profil.statut_verification === 'verifie' && profil.is_published
              ? 'bg-green-500/5 border-green-500/20 text-green-400'
              : 'bg-amber-500/5 border-amber-500/20 text-amber-400'
          }`}>
            {profil.statut_verification === 'verifie' && profil.is_published
              ? 'Votre profil est vérifié et publié. Vous pouvez recevoir des demandes.'
              : 'Votre profil est en attente de validation par l\'administrateur.'}
          </div>
        )}

        <h2 className="text-base font-heading font-bold text-zinc-300 mb-4">Dernières demandes</h2>
        {loading ? (
          <div className="flex justify-center py-10">
            <div className="w-7 h-7 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : demandes.length === 0 ? (
          <p className="text-zinc-500 text-sm">Aucune demande reçue pour le moment.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {demandes.map(a => {
              const d = a.coaching_requests
              if (!d) return null
              return (
                <div key={a.id} className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium">{d.prenom} {d.nom}</p>
                    <p className="text-xs text-zinc-500 mt-0.5">{d.discipline} · {d.ville}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded border ${COULEURS[d.statut] ?? 'text-zinc-400 border-zinc-700'}`}>
                      {d.statut?.replace(/_/g, ' ')}
                    </span>
                    <button onClick={() => navigate('/coach/demandes')} className="text-xs text-amber-400 hover:underline">Voir</button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </CoachLayout>
  )
}
