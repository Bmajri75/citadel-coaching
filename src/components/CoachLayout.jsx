import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const liens = [
  { to: '/coach',          label: 'Tableau de bord', icon: '▦' },
  { to: '/coach/demandes', label: 'Mes demandes',    icon: '✉' },
  { to: '/coach/profil',   label: 'Mon profil',      icon: '👤' },
]

export default function CoachLayout({ children }) {
  const { signOut } = useAuth()
  const navigate    = useNavigate()

  async function deconnexion() { await signOut(); navigate('/login') }

  return (
    <div className="min-h-screen bg-zinc-950 flex">
      <aside className="w-56 bg-zinc-900 border-r border-zinc-800 flex flex-col flex-shrink-0">
        <div className="p-5 border-b border-zinc-800">
          <img src="/photos/logo-citadel-2.png" alt="Citadel" className="h-8 w-auto" />
          <p className="text-xs text-zinc-600 mt-2 font-heading uppercase tracking-wide">Espace Coach</p>
        </div>
        <nav className="flex-1 p-3 flex flex-col gap-1">
          {liens.map(l => (
            <NavLink key={l.to} to={l.to} end={l.to === '/coach'}
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-3 py-2.5 rounded text-sm transition-colors ${
                  isActive ? 'bg-amber-500/10 text-amber-400 font-semibold' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                }`
              }>
              <span className="text-base">{l.icon}</span>{l.label}
            </NavLink>
          ))}
        </nav>
        <div className="p-3 border-t border-zinc-800">
          <button onClick={deconnexion}
            className="w-full text-left flex items-center gap-2.5 px-3 py-2.5 rounded text-sm text-zinc-500 hover:text-red-400 hover:bg-zinc-800 transition-colors">
            <span>⏏</span> Déconnexion
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}
