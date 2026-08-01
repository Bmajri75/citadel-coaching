import { useEffect, useState } from 'react'
import AdminLayout from '../../components/AdminLayout'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../context/AuthContext'

export default function AdminInvitations() {
  const { user } = useAuth()
  const [invitations, setInvitations] = useState([])
  const [email, setEmail]   = useState('')
  const [msg,   setMsg]     = useState('')
  const [loading, setLoading] = useState(false)

  async function charger() {
    const { data } = await supabase.from('coach_invitations').select('*').order('created_at', { ascending: false })
    setInvitations(data ?? [])
  }

  useEffect(() => { charger() }, [])

  async function creerInvitation(e) {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    setMsg('')
    const { data, error } = await supabase.from('coach_invitations')
      .insert([{ email: email.trim().toLowerCase(), created_by: user.id }])
      .select()
      .single()
    setLoading(false)
    if (error) { setMsg('Erreur : ' + error.message); return }
    setEmail('')
    setMsg('Invitation créée. Copiez le lien ci-dessous et envoyez-le au coach.')
    await charger()
  }

  function lienActivation(token) {
    return `${window.location.origin}/activation?token=${token}`
  }

  async function copier(token) {
    await navigator.clipboard.writeText(lienActivation(token))
  }

  return (
    <AdminLayout>
      <div className="p-4 md:p-8 max-w-2xl">
        <h1 className="text-2xl font-heading font-bold mb-8">Invitations coachs</h1>

        <form onSubmit={creerInvitation} className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 mb-8">
          <h2 className="text-xs font-heading uppercase tracking-wide text-zinc-500 mb-4">Créer une invitation</h2>
          <div className="flex gap-3">
            <input type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder="email@coach.fr" required
              className="flex-1 bg-zinc-800 border border-zinc-700 rounded px-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors" />
            <button type="submit" disabled={loading}
              className="btn-primary px-5 py-2.5 text-sm disabled:opacity-50 whitespace-nowrap">
              {loading ? 'Création…' : 'Inviter'}
            </button>
          </div>
          {msg && <p className="text-sm text-amber-400 mt-3">{msg}</p>}
          <p className="text-zinc-600 text-xs mt-3">Le lien expire après 48h et ne peut être utilisé qu'une seule fois.</p>
        </form>

        <div className="flex flex-col gap-3">
          {invitations.map(inv => {
            const expire = new Date(inv.expires_at) < new Date()
            return (
              <div key={inv.id} className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white">{inv.email}</p>
                    <p className="text-xs text-zinc-500 mt-0.5">
                      Créée le {new Date(inv.created_at).toLocaleDateString('fr-FR')} · Expire le {new Date(inv.expires_at).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded border ${
                      inv.is_used   ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                      expire        ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                                      'bg-amber-500/10 text-amber-400 border-amber-500/20'
                    }`}>
                      {inv.is_used ? 'Utilisée' : expire ? 'Expirée' : 'Active'}
                    </span>
                    {!inv.is_used && !expire && (
                      <button onClick={() => copier(inv.token)}
                        className="text-xs text-amber-400 hover:underline">Copier le lien</button>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
          {invitations.length === 0 && <p className="text-zinc-500 text-sm">Aucune invitation créée.</p>}
        </div>
      </div>
    </AdminLayout>
  )
}
