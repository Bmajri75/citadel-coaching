import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminLayout from '../../components/AdminLayout'
import { supabase } from '../../lib/supabase'

const STATUT_COULEUR = {
  en_attente: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  verifie:    'bg-green-500/10 text-green-400 border-green-500/20',
  expire:     'bg-red-500/10 text-red-400 border-red-500/20',
  suspendu:   'bg-red-500/10 text-red-400 border-red-500/20',
}

export default function AdminCoaches() {
  const navigate = useNavigate()
  const [coachs, setCoachs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.from('coaches').select('*').order('created_at', { ascending: false })
      .then(({ data }) => { setCoachs(data ?? []); setLoading(false) })
  }, [])

  const today = new Date()
  function joursRestants(date) {
    if (!date) return null
    return Math.ceil((new Date(date) - today) / (1000 * 60 * 60 * 24))
  }

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-heading font-bold">Coachs</h1>
          <button onClick={() => navigate('/admin/invitations')}
            className="btn-primary text-sm py-2 px-4">
            + Inviter un coach
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : coachs.length === 0 ? (
          <p className="text-zinc-500 text-sm">Aucun coach enregistré.</p>
        ) : (
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-800">
                  {['', 'Coach', 'Discipline', 'Carte pro', 'Vérification', 'Publié', ''].map((h, i) => (
                    <th key={i} className="text-left p-4 text-xs font-heading uppercase tracking-wide text-zinc-500">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {coachs.map(c => {
                  const jours = joursRestants(c.expiration_carte_pro)
                  return (
                    <tr key={c.id} className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors">
                      <td className="p-4 w-12">
                        <div className="w-9 h-9 rounded-full overflow-hidden bg-zinc-800 border border-zinc-700 flex-shrink-0">
                          {c.photo_url
                            ? <img src={c.photo_url} alt="" className="w-full h-full object-cover" />
                            : <div className="w-full h-full flex items-center justify-center text-zinc-500 text-sm font-bold">{c.prenom?.[0] ?? '?'}</div>
                          }
                        </div>
                      </td>
                      <td className="p-4 font-medium">{c.prenom ?? '—'} {c.nom ?? ''}</td>
                      <td className="p-4 text-zinc-400">{c.discipline_principale ?? '—'}</td>
                      <td className="p-4">
                        {c.expiration_carte_pro ? (
                          <span className={jours < 60 ? 'text-red-400 text-xs font-semibold' : 'text-zinc-400 text-xs'}>
                            {new Date(c.expiration_carte_pro).toLocaleDateString('fr-FR')}
                            {jours < 60 && ` (${jours}j)`}
                          </span>
                        ) : <span className="text-zinc-600 text-xs">Non renseigné</span>}
                      </td>
                      <td className="p-4">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded border ${STATUT_COULEUR[c.statut_verification] ?? 'text-zinc-400 border-zinc-700'}`}>
                          {c.statut_verification}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className={`text-xs font-semibold ${c.is_published ? 'text-green-400' : 'text-zinc-600'}`}>
                          {c.is_published ? 'Oui' : 'Non'}
                        </span>
                      </td>
                      <td className="p-4">
                        <button onClick={() => navigate(`/admin/coachs/${c.id}`)}
                          className="text-xs text-amber-400 hover:underline">Gérer</button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
