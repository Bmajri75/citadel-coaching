import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'

export default function Login() {
  const { signIn, role } = useAuth()
  const navigate = useNavigate()
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [erreur,   setErreur]   = useState('')
  const [loading,  setLoading]  = useState(false)

  async function submit(e) {
    e.preventDefault()
    setErreur('')
    setLoading(true)
    const { data, error } = await signIn(email, password)
    setLoading(false)
    if (error) { setErreur('Email ou mot de passe incorrect.'); return }

    const { data: profile } = await supabase.from('profiles').select('role').eq('id', data.user.id).single()
    if (profile?.role === 'admin') navigate('/admin')
    else if (profile?.role === 'coach') navigate('/coach')
    else setErreur('Accès non autorisé.')
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <img src="/photos/logo-citadel-2.png" alt="Citadel Coaching" className="h-10 w-auto mx-auto mb-6" />
          <h1 className="text-2xl font-heading font-bold">Espace privé</h1>
          <p className="text-zinc-500 text-sm mt-1">Réservé aux coachs et à l'administration</p>
        </div>

        <form onSubmit={submit} className="bg-zinc-900 border border-zinc-800 rounded-lg p-7 flex flex-col gap-4">
          <div>
            <label className="block text-xs font-heading uppercase tracking-wide text-zinc-400 mb-1.5">Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required autoComplete="email"
              className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-heading uppercase tracking-wide text-zinc-400 mb-1.5">Mot de passe</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required autoComplete="current-password"
              className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors" />
          </div>
          {erreur && <p className="text-red-400 text-sm text-center">{erreur}</p>}
          <button type="submit" disabled={loading}
            className="btn-primary py-3 mt-1 disabled:opacity-50 disabled:cursor-not-allowed">
            {loading ? 'Connexion…' : 'Se connecter'}
          </button>
        </form>

        <p className="text-center text-zinc-600 text-xs mt-6">
          Vous avez reçu une invitation ?{' '}
          <a href="/activation" className="text-amber-400 hover:underline">Activer mon compte</a>
        </p>
      </div>
    </div>
  )
}
