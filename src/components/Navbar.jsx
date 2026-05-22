import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useLang } from '../context/LangContext'

const TEXTS = {
  fr: { accueil: 'Accueil', programmes: 'Programmes', blog: 'Blog', reserver: 'Réserver' },
  en: { accueil: 'Home',    programmes: 'Programs',   blog: 'Blog', reserver: 'Book'     },
}

export default function Navbar() {
  const { lang, setLang }           = useLang()
  const tx                          = TEXTS[lang]
  const [menuOuvert, setMenuOuvert] = useState(false)
  const [scroll, setScroll]         = useState(false)
  const { pathname }                = useLocation()

  useEffect(() => {
    const onScroll = () => setScroll(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOuvert(false) }, [pathname])

  const liens = [
    { label: tx.accueil,    to: '/'           },
    { label: tx.programmes, to: '/programmes' },
    { label: tx.blog,       to: '/blog'       },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
      scroll || menuOuvert ? 'bg-zinc-950 border-b border-zinc-800' : 'bg-transparent'
    }`}>
      <div className="container-site flex items-center justify-between h-16">

        <Link to="/">
          <img src="/photos/logo-citadel-2.png" alt="Citadel Coaching" className="h-9 w-auto" />
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {liens.map(l => (
            <Link key={l.to} to={l.to} className={`font-heading uppercase tracking-wide text-sm transition-colors ${
              pathname === l.to ? 'text-amber-400' : 'text-zinc-300 hover:text-white'
            }`}>
              {l.label}
            </Link>
          ))}
          <a href="/#reservation" onClick={e => { const el = document.getElementById('reservation'); if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth' }) } }} className="btn-primary text-sm py-2 px-4">{tx.reserver}</a>
          <button
            onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
            className="text-xs font-heading uppercase tracking-widest border border-zinc-700 hover:border-amber-500 text-zinc-400 hover:text-amber-400 px-3 py-1.5 transition-colors"
            aria-label="Changer la langue / Switch language"
          >
            {lang === 'fr' ? 'EN' : 'FR'}
          </button>
        </div>

        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
            className="text-xs font-heading uppercase border border-zinc-700 text-zinc-400 px-2.5 py-1 transition-colors"
          >
            {lang === 'fr' ? 'EN' : 'FR'}
          </button>
          <button
            className="flex flex-col justify-center gap-1.5 w-8 h-8"
            onClick={() => setMenuOuvert(v => !v)}
            aria-label="Menu"
          >
            <span className={`block h-0.5 bg-white transition-transform duration-200 ${menuOuvert ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block h-0.5 bg-white transition-opacity duration-200 ${menuOuvert ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 bg-white transition-transform duration-200 ${menuOuvert ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {menuOuvert && (
        <div className="md:hidden bg-zinc-950 border-t border-zinc-800 px-4 py-6 flex flex-col gap-4">
          {liens.map(l => (
            <Link key={l.to} to={l.to} className="font-heading uppercase tracking-wide text-zinc-300 hover:text-white">
              {l.label}
            </Link>
          ))}
          <a href="/#reservation" onClick={e => { const el = document.getElementById('reservation'); if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth' }) } }} className="btn-primary text-center mt-2">{tx.reserver}</a>
        </div>
      )}
    </nav>
  )
}
