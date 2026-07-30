import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function Activation() {
  const [params]   = useSearchParams()
  const navigate   = useNavigate()
  const token      = params.get('token')

  const [statut,   setStatut]   = useState('verification') // verification | valide | invalide | complet | erreur
  const [invitation, setInvitation] = useState(null)
  const [password, setPassword] = useState('')
  const [confirm,  setConfirm]  = useState('')
  const [erreur,   setErreur]   = useState('')
  const [loading,  setLoading]  = useState(false)

  useEffect(() => {
    if (!token) { setStatut('invalide'); return }
    supabase
      .from('coach_invitations')
      .select('*')
      .eq('token', token)
      .eq('is_used', false)
      .gt('expires_at', new Date().toISOString())
      .single()
      .then(({ data, error }) => {
        if (error || !data) setStatut('invalide')
        else { setInvitation(data); setStatut('valide') }
      })
  }, [token])

  async function submit(e) {
    e.preventDefault()
    if (password !== confirm) { setErreur('Les mots de passe ne correspondent pas.'); return }
    if (password.length < 8)  { setErreur('Le mot de passe doit contenir au moins 8 caractères.'); return }
    setErreur('')
    setLoading(true)

    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email:    invitation.email,
      password: password,
    })

    if (signUpError) { setErreur(signUpError.message); setLoading(false); return }

    const uid = signUpData.user?.id
    if (!uid) { setErreur('Erreur lors de la création du compte.'); setLoading(false); return }

    await supabase.from('profiles').insert([{ id: uid, role: 'coach' }])
    await supabase.from('coaches').insert([{ user_id: uid }])
    await supabase.from('coach_invitations').update({ is_used: true, used_at: new Date().toISOString() }).eq('token', token)

    setLoading(false)
    setStatut('complet')
    setTimeout(() => navigate('/coach'), 2000)
  }

  if (statut === 'verification') return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
    </div>
  )

  if (statut === 'invalide') return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <div className="text-center max-w-sm">
        <div className="w-14 h-14 bg-red-500/10 border border-red-500/30 rounded-full flex items-center justify-center mx-auto mb-5">
          <svg className="w-7 h-7 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h1 className="text-xl font-heading font-bold mb-2">Lien invalide ou expiré</h1>
        <p className="text-zinc-400 text-sm">Ce lien d'invitation n'est plus valide. Contactez Citadel Coaching pour recevoir une nouvelle invitation.</p>
      </div>
    </div>
  )

  if (statut === 'complet') return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <div className="text-center max-w-sm">
        <div className="w-14 h-14 bg-amber-400/10 border border-amber-400/30 rounded-full flex items-center justify-center mx-auto mb-5">
          <svg className="w-7 h-7 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-xl font-heading font-bold mb-2">Compte activé</h1>
        <p className="text-zinc-400 text-sm">Bienvenue dans Citadel Coaching. Redirection vers votre espace…</p>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <img src="/photos/logo-citadel-2.png" alt="Citadel Coaching" className="h-10 w-auto mx-auto mb-6" />
          <h1 className="text-2xl font-heading font-bold">Activation de compte</h1>
          <p className="text-zinc-500 text-sm mt-1">{invitation?.email}</p>
        </div>

        <form onSubmit={submit} className="bg-zinc-900 border border-zinc-800 rounded-lg p-7 flex flex-col gap-4">
          <div>
            <label className="block text-xs font-heading uppercase tracking-wide text-zinc-400 mb-1.5">Mot de passe</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required minLength={8}
              className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-heading uppercase tracking-wide text-zinc-400 mb-1.5">Confirmer le mot de passe</label>
            <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} required minLength={8}
              className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors" />
          </div>
          {erreur && <p className="text-red-400 text-sm">{erreur}</p>}
          <p className="text-zinc-600 text-xs">Minimum 8 caractères.</p>
          <button type="submit" disabled={loading}
            className="btn-primary py-3 mt-1 disabled:opacity-50 disabled:cursor-not-allowed">
            {loading ? 'Activation…' : 'Activer mon compte'}
          </button>
        </form>
      </div>
    </div>
  )
}
