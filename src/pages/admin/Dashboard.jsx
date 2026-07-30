import { useEffect, useState } from 'react'
import AdminLayout from '../../components/AdminLayout'
import { supabase } from '../../lib/supabase'

const STATUTS_COULEUR = {
  nouvelle_demande: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  envoyee_coach:    'bg-amber-500/10 text-amber-400 border-amber-500/20',
  acceptee_coach:   'bg-green-500/10 text-green-400 border-green-500/20',
  refusee_coach:    'bg-red-500/10 text-red-400 border-red-500/20',
  refusee_admin:    'bg-red-500/10 text-red-400 border-red-500/20',
  confirmee:        'bg-green-500/10 text-green-400 border-green-500/20',
  realisee:         'bg-zinc-500/10 text-zinc-400 border-zinc-500/20',
  annulee:          'bg-red-500/10 text-red-400 border-red-500/20',
}

function KPI({ label, valeur, couleur }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-5">
      <p className="text-zinc-500 text-xs font-heading uppercase tracking-wide mb-2">{label}</p>
      <p className={`text-3xl font-bold font-heading ${couleur ?? 'text-white'}`}>{valeur}</p>
    </div>
  )
}

export default function AdminDashboard() {
  const [stats, setStats]      = useState(null)
  const [demandes, setDemandes] = useState([])
  const [loading, setLoading]  = useState(true)

  useEffect(() => {
    Promise.all([
      supabase.from('coaching_requests').select('statut'),
      supabase.from('coaches').select('statut_verification, expiration_carte_pro, is_published'),
      supabase.from('coaching_requests').select('*').order('created_at', { ascending: false }).limit(5),
    ]).then(([req, coachs, recent]) => {
      const demandes = req.data ?? []
      const coachsData = coachs.data ?? []
      const today = new Date()
      const bientotExpire = coachsData.filter(c => {
        if (!c.expiration_carte_pro) return false
        const diff = (new Date(c.expiration_carte_pro) - today) / (1000 * 60 * 60 * 24)
        return diff > 0 && diff < 60
      }).length

      setStats({
        total:     demandes.length,
        nouvelles: demandes.filter(d => d.statut === 'nouvelle_demande').length,
        confirmees:demandes.filter(d => d.statut === 'confirmee').length,
        realisees: demandes.filter(d => d.statut === 'realisee').length,
        coachsActifs: coachsData.filter(c => c.is_published && c.statut_verification === 'verifie').length,
        bientotExpire,
      })
      setDemandes(recent.data ?? [])
      setLoading(false)
    })
  }, [])

  return (
    <AdminLayout>
      <div className="p-8">
        <h1 className="text-2xl font-heading font-bold mb-8">Dashboard</h1>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
              <KPI label="Demandes totales"    valeur={stats.total}          />
              <KPI label="Nouvelles demandes"  valeur={stats.nouvelles}       couleur="text-blue-400" />
              <KPI label="Confirmées"          valeur={stats.confirmees}      couleur="text-green-400" />
              <KPI label="Réalisées"           valeur={stats.realisees}       couleur="text-zinc-300" />
              <KPI label="Coachs actifs"       valeur={stats.coachsActifs}    couleur="text-amber-400" />
              <KPI label="Cartes pro à renouveler (60j)" valeur={stats.bientotExpire} couleur={stats.bientotExpire > 0 ? 'text-red-400' : 'text-green-400'} />
            </div>

            <h2 className="text-base font-heading font-bold text-zinc-300 mb-4">Dernières demandes</h2>
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden">
              {demandes.length === 0 ? (
                <p className="text-zinc-500 text-sm p-6">Aucune demande pour le moment.</p>
              ) : (
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-zinc-800">
                      <th className="text-left p-4 text-xs font-heading uppercase tracking-wide text-zinc-500">Client</th>
                      <th className="text-left p-4 text-xs font-heading uppercase tracking-wide text-zinc-500">Discipline</th>
                      <th className="text-left p-4 text-xs font-heading uppercase tracking-wide text-zinc-500">Statut</th>
                      <th className="text-left p-4 text-xs font-heading uppercase tracking-wide text-zinc-500">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {demandes.map(d => (
                      <tr key={d.id} className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors">
                        <td className="p-4 font-medium">{d.prenom} {d.nom}</td>
                        <td className="p-4 text-zinc-400">{d.discipline}</td>
                        <td className="p-4">
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded border ${STATUTS_COULEUR[d.statut] ?? 'text-zinc-400 border-zinc-700'}`}>
                            {d.statut?.replace(/_/g, ' ')}
                          </span>
                        </td>
                        <td className="p-4 text-zinc-500 text-xs">{new Date(d.created_at).toLocaleDateString('fr-FR')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  )
}
