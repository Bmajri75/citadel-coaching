import { useState } from 'react'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const liens = [
  { to: '/coach',          label: 'Tableau de bord', icon: '▦' },
  { to: '/coach/demandes', label: 'Mes demandes',    icon: '✉' },
  { to: '/coach/profil',   label: 'Mon profil',      icon: '👤' },
]

export default function CoachLayout({ children }) {
  const { signOut }         = useAuth()
  const navigate            = useNavigate()
  const { pathname }        = useLocation()
  const [ouvert, setOuvert] = useState(false)

  async function deconnexion() { await signOut(); navigate('/login') }

  const pageCourante = liens.find(l => l.to === '/coach' ? pathname === '/coach' : pathname.startsWith(l.to))

  const Sidebar = () => (
    <aside className="w-56 bg-zinc-900 border-r border-zinc-800 flex flex-col h-full">
      <div className="p-5 border-b border-zinc-800 flex items-center justify-between">
        <div>
          <img src="/photos/logo-citadel-2.png" alt="Citadel" className="h-8 w-auto" />
          <p className="text-xs text-zinc-600 mt-2 font-heading uppercase tracking-wide">Espace Coach</p>
        </div>
        <button className="md:hidden text-zinc-500 hover:text-white p-1" onClick={() => setOuvert(false)}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <nav className="flex-1 p-3 flex flex-col gap-1 overflow-y-auto">
        {liens.map(l => (
          <NavLink key={l.to} to={l.to} end={l.to === '/coach'}
            onClick={() => setOuvert(false)}
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
  )

  return (
    <div className="min-h-screen bg-zinc-950 flex">

      {/* Barre mobile */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-30 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between px-4 h-14">
        <div className="flex items-center gap-3">
          <button onClick={() => setOuvert(true)} className="text-zinc-400 hover:text-white p-1">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <span className="text-sm font-heading text-zinc-300">{pageCourante?.label ?? 'Coach'}</span>
        </div>
        <img src="/photos/logo-citadel-2.png" alt="Citadel" className="h-7 w-auto" />
      </div>

      {/* Overlay mobile */}
      {ouvert && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/70" onClick={() => setOuvert(false)} />
      )}

      {/* Sidebar mobile (slide) */}
      <div className={`md:hidden fixed inset-y-0 left-0 z-50 flex transition-transform duration-200 ${ouvert ? 'translate-x-0' : '-translate-x-full'}`}>
        <Sidebar />
      </div>

      {/* Sidebar desktop */}
      <div className="hidden md:flex flex-shrink-0">
        <Sidebar />
      </div>

      <main className="flex-1 overflow-auto mt-14 md:mt-0 min-w-0">
        {children}
      </main>
    </div>
  )
}
