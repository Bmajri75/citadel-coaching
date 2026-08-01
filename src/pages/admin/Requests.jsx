import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminLayout from '../../components/AdminLayout'
import { supabase } from '../../lib/supabase'

const STATUTS = ['', 'nouvelle_demande', 'envoyee_coach', 'acceptee_coach', 'refusee_coach', 'confirmee', 'realisee', 'annulee']
const COULEURS = {
  nouvelle_demande: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  envoyee_coach:    'bg-amber-500/10 text-amber-400 border-amber-500/20',
  acceptee_coach:   'bg-green-500/10 text-green-400 border-green-500/20',
  refusee_coach:    'bg-red-500/10 text-red-400 border-red-500/20',
  refusee_admin:    'bg-red-500/10 text-red-400 border-red-500/20',
  confirmee:        'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  realisee:         'bg-zinc-500/10 text-zinc-400 border-zinc-500/20',
  annulee:          'bg-red-500/10 text-red-400 border-red-500/20',
}

export default function AdminRequests() {
  const navigate = useNavigate()
  const [demandes, setDemandes] = useState([])
  const [filtre,   setFiltre]   = useState('')
  const [loading,  setLoading]  = useState(true)

  useEffect(() => {
    let q = supabase.from('coaching_requests').select('*').order('created_at', { ascending: false })
    if (filtre) q = q.eq('statut', filtre)
    q.then(({ data }) => { setDemandes(data ?? []); setLoading(false) })
  }, [filtre])

  return (
    <AdminLayout>
      <div className="p-4 md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <h1 className="text-2xl font-heading font-bold">Demandes clients</h1>
          <select value={filtre} onChange={e => setFiltre(e.target.value)}
            className="bg-zinc-900 border border-zinc-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500">
            <option value="">Tous les statuts</option>
            {STATUTS.filter(Boolean).map(s => <option key={s} value={s}>{s.replace(/_/g, ' ')}</option>)}
          </select>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden">
            {demandes.length === 0 ? (
              <p className="text-zinc-500 text-sm p-6">Aucune demande{filtre ? ' pour ce statut' : ''}.</p>
            ) : (
              <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[600px]">
                <thead>
                  <tr className="border-b border-zinc-800">
                    {['Client', 'Email', 'Discipline', 'Ville', 'Statut', 'Date', ''].map(h => (
                      <th key={h} className="text-left p-4 text-xs font-heading uppercase tracking-wide text-zinc-500">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {demandes.map(d => (
                    <tr key={d.id} className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors">
                      <td className="p-4 font-medium">{d.prenom} {d.nom}</td>
                      <td className="p-4 text-zinc-400 text-xs">{d.email}</td>
                      <td className="p-4 text-zinc-300">{d.discipline}</td>
                      <td className="p-4 text-zinc-400 text-xs">{d.ville}</td>
                      <td className="p-4">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded border ${COULEURS[d.statut] ?? 'text-zinc-400 border-zinc-700'}`}>
                          {d.statut?.replace(/_/g, ' ')}
                        </span>
                      </td>
                      <td className="p-4 text-zinc-500 text-xs">{new Date(d.created_at).toLocaleDateString('fr-FR')}</td>
                      <td className="p-4">
                        <button onClick={() => navigate(`/admin/demandes/${d.id}`)}
                          className="text-xs text-amber-400 hover:underline">Voir</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
